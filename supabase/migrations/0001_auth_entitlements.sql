-- SafeRise — auth + entitlements schema
-- Phase 1 of pass/AUTH-PAYMENTS-BRIEF.md. NOT RUN. This is a migration file
-- only — apply it against the real Supabase project (Frankfurt/eu-central-1)
-- once it exists, via the Supabase CLI or SQL editor, not from this repo.
--
-- The paywall lives entirely in this file, not in application code: a member
-- can read and update their own row, but the columns that mean "has paid"
-- (entitled, subscription_status, entitled_until, paddle_*) are writable only
-- by the service role. If that boundary ever slips, there is no paywall.

-- ═══════════════════════════════════════════════════════════════════════
-- members
-- ═══════════════════════════════════════════════════════════════════════
create table public.members (
  id                      uuid primary key references auth.users(id) on delete cascade,
  email                   text,
  created_at              timestamptz not null default now(),
  entitled                boolean not null default false,
  paddle_customer_id      text,
  paddle_subscription_id  text,
  subscription_status     text,  -- active | past_due | canceled | paused
  entitled_until          timestamptz
);

comment on table public.members is
  'One row per auth.users member. entitled/subscription_status/entitled_until/'
  'paddle_* are server-managed — see protect_member_entitlement_columns() below.';

-- The row is created by handle_new_user() (below), triggered off auth.users,
-- never by the client. A client-side INSERT policy would let a member set
-- entitled=true in the same request that creates their own row — an easier
-- bypass than editing it after the fact. No INSERT policy exists for members
-- below on purpose; RLS default-denies INSERT with none defined.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.members (id, email) values (new.id, new.email);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

alter table public.members enable row level security;

-- A member may read their own row.
create policy members_select_own on public.members
  for select
  using (id = auth.uid());

-- A member may update their own row — but see the trigger below, which
-- blocks the entitlement-bearing columns regardless of what this policy
-- allows. This policy is intentionally permissive at the row level; the
-- column-level restriction is enforced separately so the two can be
-- reasoned about independently.
create policy members_update_own on public.members
  for update
  using (id = auth.uid())
  with check (id = auth.uid());

-- No INSERT policy, no DELETE policy for members. Row creation is the
-- trigger above; row deletion cascades from auth.users (or is a service-role
-- admin action), neither of which goes through PostgREST as the member.

-- This is the paywall. auth.role() is Supabase's own helper (defined by the
-- auth extension) returning the JWT's role claim — 'service_role' for the
-- webhook's service-role key, 'authenticated' for a real member session.
-- A member session hitting this trigger with a changed protected column
-- gets a hard error, not a silently-ignored write.
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
    then
      raise exception
        'members.entitled/subscription_status/entitled_until/paddle_* are '
        'server-managed and cannot be changed by a member session';
    end if;
  end if;
  return new;
end;
$$;

create trigger protect_member_entitlement_columns
  before update on public.members
  for each row execute function public.protect_member_entitlement_columns();

-- ═══════════════════════════════════════════════════════════════════════
-- usage_events
-- ═══════════════════════════════════════════════════════════════════════
create table public.usage_events (
  id         bigserial primary key,
  member_id  uuid references public.members(id) on delete cascade,
  event      text not null,  -- signup | session_start | session_complete |
                              -- protocol_open | resource_open | journal_saved
  track      smallint,
  ref        text,           -- e.g. 't1-04', 'rg-12-anger' — an identifier only
  created_at timestamptz not null default now()
);

-- GV-408 / Phase 1 spec: this table is a usage counter, not a content store.
-- event and ref are short identifiers picked from a known, small vocabulary
-- (protocol ids, resource keys). NEVER write journal text, free-text input,
-- or anything a member typed into this table, in this column or any other
-- added to this table later. Journal text stays on the device — that is the
-- whole of GV-408 and it has no exception for "just this once, for metrics."
comment on column public.usage_events.event is
  'A fixed vocabulary label (signup, session_start, ...). Never free text.';
comment on column public.usage_events.ref is
  'An identifier only, e.g. t1-04 or rg-12-anger. Never journal text or any '
  'other free-text member input.';

create index usage_events_member_id_created_at_idx
  on public.usage_events (member_id, created_at desc);

alter table public.usage_events enable row level security;

-- A member may log their own events. No UPDATE, no DELETE, no SELECT policy
-- for members — this table is write-only from the client by design; reads
-- are for the admin dashboard (Phase 7), via the service role.
create policy usage_events_insert_own on public.usage_events
  for insert
  with check (member_id = auth.uid());
