-- ════════════════════════════════════════════════════════════════════════
-- 0007_tier_self_select_test.sql
--
-- PRE-LAUNCH TEST AFFORDANCE. A signed-in member may set their own tier,
-- with no payment, so upgrade and downgrade can be tested across the whole
-- membership ladder (free < standard < premium < sovereign) before the
-- payment rail exists. Sovereign becomes reachable this way.
--
-- THIS MUST BE WITHDRAWN BEFORE PAYMENTS GO LIVE. One statement does it,
-- with no deploy and no code change:
--
--   update public.test_switches set enabled = false
--    where name = 'tier_self_select';
--
-- What this does NOT touch, by design. members.entitled,
-- subscription_status, entitled_until, paddle_customer_id,
-- paddle_subscription_id and billing_period stay server-managed and stay
-- refused for a member session — including inside this migration's own RPC.
-- Only `tier` moves. That keeps the paywall path that Paddle will write to
-- exactly as 0001 and 0002 left it, and it means a member on sovereign by
-- test switch still reads as not entitled. That gap is intentional and is
-- the thing being observed.
--
-- The tier still resolves through public.my_tier() like any other tier, so
-- js/saferise-access.js resolve() is exercised rather than bypassed. No
-- client-side override is involved; ?srtier= remains dev-host-only.
-- ════════════════════════════════════════════════════════════════════════

-- ── 1 · the switch ──────────────────────────────────────────────────────
-- Service-role only. RLS on with no policies, so nothing reachable from a
-- member or anon session can read it or write it.

create table if not exists public.test_switches (
  name    text primary key,
  enabled boolean not null default false,
  note    text
);
alter table public.test_switches enable row level security;
revoke all on table public.test_switches from public, anon, authenticated;

comment on table public.test_switches is
  'Pre-launch test affordances, each one off-by-default and withdrawable in '
  'one statement. Service-role only: RLS is on and there are no policies.';

insert into public.test_switches (name, enabled, note) values
  ('tier_self_select', true,
   'A member may set their own tier with no payment, to test upgrade and '
   'downgrade across the ladder. MUST be false before the payment rail goes '
   'live. Read by public.set_my_tier().')
on conflict (name) do update
  set enabled = excluded.enabled,
      note    = excluded.note;

-- ── 2 · the paywall trigger, narrowed ───────────────────────────────────
-- Re-created from 0002's version. Every guarded column is guarded exactly as
-- before. The ONLY change is that `tier` carries an additional condition: it
-- is refused unless the transaction-local setting saferise.tier_self_select
-- is 'on', which only public.set_my_tier() sets and which cannot outlive its
-- own transaction (set_config's third argument is true).
--
-- A direct PATCH on members.tier from a member session is still refused,
-- because nothing but that RPC sets the flag. entitled, subscription_status,
-- entitled_until, paddle_* and billing_period are refused unconditionally,
-- including from inside set_my_tier() itself — the RPC writes none of them,
-- so nothing is lost and the blast radius is one column.

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
    or new.billing_period         is distinct from old.billing_period
    or (new.tier is distinct from old.tier
        and coalesce(current_setting('saferise.tier_self_select', true), '') <> 'on')
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

-- The trigger itself is unchanged and is not re-created; 0001 attached it
-- before update on public.members and create or replace function above
-- swaps the body underneath it.

-- ── 3 · the RPC ─────────────────────────────────────────────────────────
-- Refuses unless the switch is on, the caller is signed in, and the value is
-- one of the four tiers. Writes `tier` and nothing else. Returns what the
-- server actually holds afterwards, via the existing resolver, so the client
-- never has to trust its own argument.

create or replace function public.set_my_tier(p_tier text)
returns text
language plpgsql
security definer set search_path = public
as $$
begin
  if not exists (
    select 1 from public.test_switches
     where name = 'tier_self_select' and enabled
  ) then
    raise exception 'tier self-select is not enabled';
  end if;

  if auth.uid() is null then
    raise exception 'not signed in';
  end if;

  if p_tier is null or p_tier not in ('free', 'standard', 'premium', 'sovereign') then
    raise exception 'unknown tier';
  end if;

  perform set_config('saferise.tier_self_select', 'on', true);
  update public.members set tier = p_tier where id = auth.uid();

  return public.member_tier(auth.uid());
end;
$$;
revoke all on function public.set_my_tier(text) from public, anon;
grant execute on function public.set_my_tier(text) to authenticated;

comment on function public.set_my_tier(text) is
  'PRE-LAUNCH TEST ONLY. Sets the calling member''s tier with no payment, '
  'gated on test_switches.tier_self_select. Writes members.tier and nothing '
  'else; entitled and paddle_* remain server-managed. Withdraw by setting '
  'that switch false — no deploy required.';
