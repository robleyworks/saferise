-- SafeRise — 0002 · platform role and member tier (SR-477, SR-475 Part B)
-- Migrations and policies only. RLS is written in the same migration that
-- creates each table: nothing is ever created open and locked later.

-- ═══════════════════════════════════════════════════════════════════════
-- saferise_admin — a PLATFORM role, not an organisation role
-- ═══════════════════════════════════════════════════════════════════════
-- It is not a row in organization_members and not a Postgres role: it is
-- membership of this table, which only the service role can write (no
-- policies at all → PostgREST cannot read or write it as any member). The
-- helper below is how every policy asks the question.
create table public.platform_admins (
  user_id     uuid primary key references auth.users(id) on delete cascade,
  granted_at  timestamptz not null default now(),
  note        text
);
alter table public.platform_admins enable row level security;
-- (no policies: service role only)

create or replace function public.is_saferise_admin()
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (select 1 from public.platform_admins where user_id = auth.uid());
$$;
revoke all on function public.is_saferise_admin() from public;
grant execute on function public.is_saferise_admin() to authenticated;

-- ═══════════════════════════════════════════════════════════════════════
-- Platform settings — configurable values stored in the database
-- ═══════════════════════════════════════════════════════════════════════
-- min_cohort_size (the aggregate suppression threshold, B6) lives here, so
-- it is changed with an UPDATE, never a code change. Readable by nobody
-- through PostgREST; functions read it as definer.
create table public.platform_settings (
  key         text primary key,
  value       jsonb not null,
  updated_at  timestamptz not null default now()
);
alter table public.platform_settings enable row level security;
-- (no policies: service role only)

-- ═══════════════════════════════════════════════════════════════════════
-- Member tier — consumer subscriptions
-- ═══════════════════════════════════════════════════════════════════════
-- WHERE IT LIVES: on public.members, beside the subscription columns that
-- are already there (entitled, subscription_status, entitled_until,
-- paddle_*). members IS the consumer subscription record; a second table
-- would split one subscription across two rows. billing_period models the
-- eight consumer products (four tiers × monthly|annual).
alter table public.members
  add column tier            text,
  add column billing_period  text;

alter table public.members
  add constraint members_tier_valid
    check (tier is null or tier in ('free', 'standard', 'premium', 'sovereign')),
  add constraint members_billing_period_valid
    check (billing_period is null or billing_period in ('monthly', 'annual'));

comment on column public.members.tier is
  'free | standard | premium | sovereign. Server-managed. NULL and anything '
  'unknown resolve to free via public.member_tier() — never to a paid tier.';
comment on column public.members.billing_period is
  'monthly | annual — the period of the current subscription. Server-managed.';

-- The paywall trigger (0001) now also guards tier and billing_period.
create or replace function public.protect_member_entitlement_columns()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  if auth.role() <> 'service_role' then
    if new.entitled               is distinct from old.entitled
    or new.subscription_status    is distinct from old.subscription_status
    or new.entitled_until         is distinct from old.entitled_until
    or new.paddle_customer_id     is distinct from old.paddle_customer_id
    or new.paddle_subscription_id is distinct from old.paddle_subscription_id
    or new.tier                   is distinct from old.tier
    or new.billing_period         is distinct from old.billing_period
    then
      raise exception
        'members.entitled/subscription_status/entitled_until/paddle_*/tier/'
        'billing_period are server-managed and cannot be changed by a member session';
    end if;
  end if;
  return new;
end;
$$;
revoke execute on function public.protect_member_entitlement_columns() from public, anon, authenticated;

-- The one resolver. Unknown or missing → 'free'. Never an error, never paid.
-- A member with no row, a NULL tier, or a value outside the four resolves free.
create or replace function public.member_tier(p_user uuid default auth.uid())
returns text
language sql stable security definer set search_path = public
as $$
  select coalesce(
    (select m.tier from public.members m
      where m.id = p_user and m.tier in ('free', 'standard', 'premium', 'sovereign')),
    'free');
$$;
revoke all on function public.member_tier(uuid) from public;
grant execute on function public.member_tier(uuid) to authenticated, service_role;
-- A member may ask only about themselves: the parameter is ignored for
-- anyone but the service role.
create or replace function public.my_tier()
returns text
language sql stable security definer set search_path = public
as $$ select public.member_tier(auth.uid()); $$;
revoke all on function public.my_tier() from public;
grant execute on function public.my_tier() to authenticated;
revoke execute on function public.member_tier(uuid) from authenticated;
