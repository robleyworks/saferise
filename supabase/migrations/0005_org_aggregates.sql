-- SafeRise — 0005 · organisation aggregates with suppression (SR-477, B6)
-- The only way anything derived from records_* reaches an organisation.
-- Functions, not views: a view reading records_* would run with its owner's
-- rights and expose every column to whoever can select it; these return only
-- the numbers listed, never a user_id, and check the caller's role first.
--
-- SUPPRESSION. The minimum cohort size is a database setting, not a constant:
--   platform_settings.key = 'min_cohort_size', value = a JSON number.
-- Change it with (service role / SQL editor):
--   insert into public.platform_settings (key, value) values ('min_cohort_size', '<n>')
--   on conflict (key) do update set value = excluded.value, updated_at = now();
-- If the setting is absent or not a positive number, EVERY figure is
-- suppressed (fail closed). A figure resting on fewer distinct members than
-- the threshold returns suppressed = true and value = NULL — never a small number.
--
-- Who may call: exec_viewer and org_admin of that organisation (active seat),
-- and saferise_admin. Everyone else gets no rows.
--
-- Which sessions count: a member's completed sessions while they held an
-- active seat in that organisation (activated_at .. released_at / now()).

create or replace function public.min_cohort_size()
returns integer
language sql stable security definer set search_path = public
as $$
  select case when jsonb_typeof(value) = 'number' and (value)::text::numeric >= 1
              then (value)::text::numeric::integer end
    from public.platform_settings where key = 'min_cohort_size';
$$;
revoke all on function public.min_cohort_size() from public, anon, authenticated;

create or replace function public.org_metrics(p_org uuid)
returns table (metric text, dimension text, value numeric, suppressed boolean)
language plpgsql stable security definer set search_path = public
as $$
declare k integer := public.min_cohort_size();
begin
  if not (public.is_saferise_admin() or public.has_org_role(p_org, array['exec_viewer', 'org_admin'])) then
    return;
  end if;
  return query
  with seats as (
    select m.user_id, m.seat_status, m.activated_at,
           coalesce(m.released_at, now()) as until
      from public.organization_members m
     where m.organization_id = p_org and m.user_id is not null
  ),
  s as (
    select rs.user_id, rs.mode, rs.protocol_id, rs.completed_at
      from public.records_sessions rs
      join seats on seats.user_id = rs.user_id
     where rs.completed_at is not null and rs.deleted_at is null
       and seats.activated_at is not null
       and rs.completed_at between seats.activated_at and seats.until
  ),
  raw as (
    select 'sessions_completed'::text as metric, null::text as dimension,
           count(*)::numeric as value, count(distinct user_id) as cohort from s
    union all
    select 'employees_engaged', null, count(distinct user_id), count(distinct user_id) from s
    union all
    select 'activation_rate', null,
           round(count(*) filter (where activated_at is not null)::numeric
                 / nullif(count(*) filter (where seat_status in ('invited','active','suspended','released')), 0), 4),
           count(*) filter (where activated_at is not null)
      from seats
    union all
    select 'active_7d',  null, count(distinct user_id) filter (where completed_at >= now() - interval '7 days'),
           count(distinct user_id) filter (where completed_at >= now() - interval '7 days') from s
    union all
    select 'active_30d', null, count(distinct user_id) filter (where completed_at >= now() - interval '30 days'),
           count(distinct user_id) filter (where completed_at >= now() - interval '30 days') from s
    union all
    select 'active_90d', null, count(distinct user_id) filter (where completed_at >= now() - interval '90 days'),
           count(distinct user_id) filter (where completed_at >= now() - interval '90 days') from s
    union all
    select 'repeat_rate', null,
           round((select count(*) from (select user_id from s group by user_id having count(*) >= 2) r)::numeric
                 / nullif(count(distinct user_id), 0), 4),
           count(distinct user_id) from s
    union all
    select 'sovereign_share', null,
           round(count(*) filter (where mode = 'sovereign')::numeric / nullif(count(*), 0), 4),
           count(distinct user_id) from s
    union all
    select 'guided_share', null,
           round(count(*) filter (where mode = 'guided')::numeric / nullif(count(*), 0), 4),
           count(distinct user_id) from s
    union all
    select 'track_sessions', split_part(protocol_id, '-', 1), count(*)::numeric, count(distinct user_id)
      from s where protocol_id is not null group by split_part(protocol_id, '-', 1)
  )
  select raw.metric, raw.dimension,
         case when k is null or raw.cohort < k then null else raw.value end,
         (k is null or raw.cohort < k)
    from raw;
end;
$$;
revoke all on function public.org_metrics(uuid) from public, anon;
grant execute on function public.org_metrics(uuid) to authenticated;

comment on function public.org_metrics(uuid) is
  'Aggregates for one organisation, no user_id. Suppressed below '
  'platform_settings.min_cohort_size (fail closed when unset). Orientation '
  'completion is not reported: no orientation record exists yet.';
