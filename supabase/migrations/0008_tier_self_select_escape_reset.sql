-- ════════════════════════════════════════════════════════════════════════
-- 0008_tier_self_select_escape_reset.sql
--
-- set_my_tier() clears its own escape.
--
-- 0007 set saferise.tier_self_select transaction-locally and left it set.
-- Any statement later in the SAME transaction could then write members.tier
-- directly, bypassing the trigger. PostgREST gives each request its own
-- transaction, so this was never reachable over HTTP — but the escape should
-- be live for exactly the one UPDATE it exists for, not for whatever happens
-- to follow it.
--
-- Found by running I6a against SafeRise EU on 2 October 2026, on the
-- sr-verify-sr360 account, before anything shipped. Measured, not reasoned:
--
--   direct UPDATE on members.tier, escape never set     → refused
--   same UPDATE issued after set_my_tier(), one txn     → ACCEPTED
--   same UPDATE after this migration, one txn           → refused
--
-- Nothing else changes. The trigger, the switch table and every grant are
-- exactly as 0007 left them.
-- ════════════════════════════════════════════════════════════════════════

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
  perform set_config('saferise.tier_self_select', '', true);

  return public.member_tier(auth.uid());
end;
$$;
revoke all on function public.set_my_tier(text) from public, anon;
grant execute on function public.set_my_tier(text) to authenticated;

comment on function public.set_my_tier(text) is
  'PRE-LAUNCH TEST ONLY. Sets the calling member''s tier with no payment, '
  'gated on test_switches.tier_self_select. Writes members.tier and nothing '
  'else; entitled and paddle_* remain server-managed. The trigger escape is '
  'set and cleared around the single UPDATE (0008). Withdraw by setting that '
  'switch false — no deploy required.';
