-- SafeRise — 0006 · close two execute gaps the Supabase advisors found (SR-482)
-- ALREADY APPLIED TO PRODUCTION (SafeRise EU) by the founder. It is written here
-- so that the repo and the database agree. It was NOT applied from this repo. Do not re-apply it.
--
-- Gap 1: trigger functions must never be callable directly. They run as
-- triggers only, so nobody needs execute on them.
-- Gap 2: the anon role (signed out) has no business calling the role and tier
-- helpers. Signed-in members keep execute where earlier migrations granted it.

revoke execute on function public.enforce_seat_limit()   from public, anon, authenticated;
revoke execute on function public.protect_seat_limit()   from public, anon, authenticated;
revoke execute on function public.stamp_seat_status()    from public, anon, authenticated;
revoke execute on function public.records_guard()        from public, anon, authenticated;
revoke execute on function public.records_resume_guard() from public, anon, authenticated;

revoke execute on function public.member_tier(uuid)          from anon;
revoke execute on function public.is_saferise_admin()        from anon;
revoke execute on function public.my_tier()                  from anon;
revoke execute on function public.my_org_entitlements()      from anon;
revoke execute on function public.org_role(uuid)             from anon;
revoke execute on function public.has_org_role(uuid, text[]) from anon;
revoke execute on function public.org_is_active(uuid)        from anon;
revoke execute on function public.org_metrics(uuid)          from anon;
