-- SafeRise — 0003 · organisations, seats, contracts, entitlements (SR-477)
-- Every table's RLS is in this migration, beside its CREATE TABLE.
--
-- THE ADMINISTRATION LAYER. Who sees what (B5):
--   org_admin      organisation, members, invitations, groups, licences,
--                  entitlements — of their own organisation
--   billing_admin  contracts and invoices of their own organisation
--   exec_viewer    contracts, and aggregates (0005) — nothing about individuals
--   employee       nothing in this layer
--   saferise_admin everything in this layer (never records_*: see 0004)
-- Only an ACTIVE seat carries a role's powers.

-- ═══════════════════════════════════════════════════════════════════════
-- organizations
-- ═══════════════════════════════════════════════════════════════════════
create table public.organizations (
  id              uuid primary key default gen_random_uuid(),
  name            text not null,
  slug            text not null unique,
  status          text not null default 'pending'
                  check (status in ('pending', 'active', 'suspended', 'closed')),
  plan            text,
  support_tier    text,
  seat_limit      integer not null default 0 check (seat_limit >= 0),
  industry        text,
  employee_count  integer check (employee_count is null or employee_count >= 0),
  contract_start  date,
  contract_end    date,
  renewal_date    date,
  created_at      timestamptz not null default now()
);
alter table public.organizations enable row level security;

create table public.organization_groups (
  id               uuid primary key default gen_random_uuid(),
  organization_id  uuid not null references public.organizations(id) on delete cascade,
  name             text not null,
  is_default       boolean not null default false,
  unique (organization_id, name)
);
create unique index organization_groups_one_default
  on public.organization_groups (organization_id) where is_default;
alter table public.organization_groups enable row level security;

-- A seat. Deleting a seat never touches the user: user_id references
-- auth.users with NO cascade from here to anything the member owns, and the
-- member's records (0004) do not reference organisations at all.
create table public.organization_members (
  id               uuid primary key default gen_random_uuid(),
  organization_id  uuid not null references public.organizations(id) on delete cascade,
  user_id          uuid references auth.users(id) on delete set null,
  role             text not null default 'employee'
                   check (role in ('employee', 'org_admin', 'billing_admin', 'exec_viewer')),
  seat_status      text not null default 'invited'
                   check (seat_status in ('available', 'invited', 'active', 'suspended', 'released')),
  group_id         uuid references public.organization_groups(id) on delete set null,
  invited_at       timestamptz,
  activated_at     timestamptz,
  suspended_at     timestamptz,
  released_at      timestamptz,
  check (seat_status = 'available' or user_id is not null),
  unique (organization_id, user_id)
);
create index organization_members_user_idx on public.organization_members (user_id);
alter table public.organization_members enable row level security;

create table public.organization_invitations (
  id               uuid primary key default gen_random_uuid(),
  organization_id  uuid not null references public.organizations(id) on delete cascade,
  email            text not null,
  token            text not null unique default replace(gen_random_uuid()::text || gen_random_uuid()::text, '-', ''),
  role             text not null default 'employee'
                   check (role in ('employee', 'org_admin', 'billing_admin', 'exec_viewer')),
  group_id         uuid references public.organization_groups(id) on delete set null,
  sent_at          timestamptz not null default now(),
  accepted_at      timestamptz,
  expires_at       timestamptz not null default now() + interval '14 days',
  revoked_at       timestamptz
);
alter table public.organization_invitations enable row level security;

-- ═══════════════════════════════════════════════════════════════════════
-- Role helpers. SECURITY DEFINER so a policy on organization_members can
-- ask about organization_members without recursing into its own RLS.
-- Only an ACTIVE seat carries a role.
-- ═══════════════════════════════════════════════════════════════════════
create or replace function public.org_role(p_org uuid)
returns text
language sql stable security definer set search_path = public
as $$
  select om.role from public.organization_members om
   where om.organization_id = p_org and om.user_id = auth.uid() and om.seat_status = 'active'
   limit 1;
$$;
create or replace function public.has_org_role(p_org uuid, p_roles text[])
returns boolean
language sql stable security definer set search_path = public
as $$ select coalesce(public.org_role(p_org) = any (p_roles), false); $$;
revoke all on function public.org_role(uuid) from public;
revoke all on function public.has_org_role(uuid, text[]) from public;
grant execute on function public.org_role(uuid) to authenticated;
grant execute on function public.has_org_role(uuid, text[]) to authenticated;

-- organizations: the administration roles read their own; only saferise_admin writes.
create policy organizations_read on public.organizations for select
  using (public.is_saferise_admin() or public.has_org_role(id, array['org_admin', 'billing_admin', 'exec_viewer']));
create policy organizations_admin_write on public.organizations for all
  using (public.is_saferise_admin()) with check (public.is_saferise_admin());

-- groups, members, invitations: org_admin of that organisation, and saferise_admin.
create policy organization_groups_admin on public.organization_groups for all
  using (public.is_saferise_admin() or public.has_org_role(organization_id, array['org_admin']))
  with check (public.is_saferise_admin() or public.has_org_role(organization_id, array['org_admin']));
create policy organization_members_admin on public.organization_members for all
  using (public.is_saferise_admin() or public.has_org_role(organization_id, array['org_admin']))
  with check (public.is_saferise_admin() or public.has_org_role(organization_id, array['org_admin']));
create policy organization_invitations_admin on public.organization_invitations for all
  using (public.is_saferise_admin() or public.has_org_role(organization_id, array['org_admin']))
  with check (public.is_saferise_admin() or public.has_org_role(organization_id, array['org_admin']));

-- ═══════════════════════════════════════════════════════════════════════
-- SEAT RULES — in the database, not the UI
-- ═══════════════════════════════════════════════════════════════════════
-- An assigned seat is invited, active or suspended (a suspended member still
-- holds the seat until released). Assigned seats never exceed seat_limit.
-- The organisation row is locked first, so two concurrent inserts cannot both
-- take the last seat. Releasing returns the seat and never deletes the user.
create or replace function public.enforce_seat_limit()
returns trigger
language plpgsql security definer set search_path = public
as $$
declare lim integer; used integer;
begin
  if new.seat_status not in ('invited', 'active', 'suspended') then return new; end if;
  if tg_op = 'UPDATE' and old.seat_status in ('invited', 'active', 'suspended')
     and old.organization_id = new.organization_id then return new; end if;
  select seat_limit into lim from public.organizations where id = new.organization_id for update;
  select count(*) into used from public.organization_members
   where organization_id = new.organization_id
     and seat_status in ('invited', 'active', 'suspended')
     and id <> new.id;
  if used + 1 > lim then
    raise exception 'seat limit reached for organization % (% of % assigned)', new.organization_id, used, lim
      using errcode = 'check_violation';
  end if;
  return new;
end;
$$;
create trigger organization_members_seat_limit
  before insert or update of seat_status, organization_id on public.organization_members
  for each row execute function public.enforce_seat_limit();

-- Timestamps follow the status, so "released" always carries released_at.
create or replace function public.stamp_seat_status()
returns trigger
language plpgsql set search_path = public
as $$
begin
  if tg_op = 'INSERT' or new.seat_status is distinct from old.seat_status then
    if new.seat_status = 'invited'   and new.invited_at   is null then new.invited_at   := now(); end if;
    if new.seat_status = 'active'    and new.activated_at is null then new.activated_at := now(); end if;
    if new.seat_status = 'suspended' then new.suspended_at := now(); end if;
    if new.seat_status = 'released'  then new.released_at  := now(); end if;
  end if;
  return new;
end;
$$;
create trigger organization_members_stamp
  before insert or update of seat_status on public.organization_members
  for each row execute function public.stamp_seat_status();

-- The seat limit is saferise_admin's, not the customer's.
create or replace function public.protect_seat_limit()
returns trigger
language plpgsql security definer set search_path = public
as $$
begin
  if new.seat_limit is distinct from old.seat_limit
     and auth.role() <> 'service_role' and not public.is_saferise_admin() then
    raise exception 'seat_limit is changed by SafeRise, not by an organisation';
  end if;
  return new;
end;
$$;
create trigger organizations_protect_seat_limit
  before update on public.organizations
  for each row execute function public.protect_seat_limit();

-- ═══════════════════════════════════════════════════════════════════════
-- contracts and invoices (B4) — schema only
-- ═══════════════════════════════════════════════════════════════════════
create table public.contracts (
  id               uuid primary key default gen_random_uuid(),
  organization_id  uuid not null references public.organizations(id) on delete cascade,
  type             text not null,
  status           text not null default 'draft'
                   check (status in ('draft', 'active', 'suspended', 'ended', 'terminated')),
  signed_at        timestamptz,
  effective_from   date,
  effective_to     date,
  payment_rail     text not null check (payment_rail in ('card', 'purchase_order')),
  po_number        text,
  order_form_ref   text,
  check (payment_rail <> 'purchase_order' or po_number is not null)
);
alter table public.contracts enable row level security;
create policy contracts_read on public.contracts for select
  using (public.is_saferise_admin() or public.has_org_role(organization_id, array['billing_admin', 'exec_viewer']));
create policy contracts_admin_write on public.contracts for all
  using (public.is_saferise_admin()) with check (public.is_saferise_admin());

create table public.invoices (
  id           uuid primary key default gen_random_uuid(),
  contract_id  uuid not null references public.contracts(id) on delete cascade,
  amount       numeric(12, 2) not null check (amount >= 0),
  currency     text not null default 'EUR',
  issued_at    timestamptz not null default now(),
  due_at       timestamptz,
  paid_at      timestamptz,
  status       text not null default 'issued'
               check (status in ('draft', 'issued', 'paid', 'overdue', 'void'))
);
alter table public.invoices enable row level security;
create policy invoices_read on public.invoices for select
  using (public.is_saferise_admin() or exists (
    select 1 from public.contracts c
     where c.id = contract_id and public.has_org_role(c.organization_id, array['billing_admin'])));
create policy invoices_admin_write on public.invoices for all
  using (public.is_saferise_admin()) with check (public.is_saferise_admin());

-- BINDING: activation is driven by CONTRACT status, not payment status. A
-- purchase-order customer is active with an unpaid invoice. Invoices are
-- deliberately not consulted here.
create or replace function public.org_is_active(p_org uuid)
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (
    select 1 from public.organizations o
      join public.contracts c on c.organization_id = o.id
     where o.id = p_org and o.status = 'active' and c.status = 'active'
       and (c.effective_from is null or c.effective_from <= current_date)
       and (c.effective_to   is null or c.effective_to   >= current_date));
$$;
revoke all on function public.org_is_active(uuid) from public;
grant execute on function public.org_is_active(uuid) to authenticated;

-- ═══════════════════════════════════════════════════════════════════════
-- licences and entitlements
-- ═══════════════════════════════════════════════════════════════════════
create table public.organization_licenses (
  id                  uuid primary key default gen_random_uuid(),
  organization_id     uuid not null references public.organizations(id) on delete cascade,
  purchased           integer not null check (purchased >= 0),
  term_start          date,
  term_end            date,
  source_contract_id  uuid references public.contracts(id) on delete set null
);
alter table public.organization_licenses enable row level security;
create policy organization_licenses_admin on public.organization_licenses for all
  using (public.is_saferise_admin() or public.has_org_role(organization_id, array['org_admin']))
  with check (public.is_saferise_admin());

-- The content an entitlement can point at. Protocols live in the site's
-- content modules; this is the server's list of which ids exist with
-- content, kept in step by the application. An entitlement to an id that is
-- not here resolves to nothing (VB6) rather than to an error.
create table public.content_protocols (
  protocol_id  text primary key,
  track_id     text not null,
  has_content  boolean not null default true
);
alter table public.content_protocols enable row level security;
create policy content_protocols_read on public.content_protocols for select using (true);

create table public.organization_entitlements (
  id               uuid primary key default gen_random_uuid(),
  organization_id  uuid not null references public.organizations(id) on delete cascade,
  track_id         text,
  protocol_id      text,
  feature_key      text check (feature_key is null or feature_key in
                   ('sovereign_ai', 'industry_protocol', 'role_protocol', 'workshop', 'support_tier')),
  group_id         uuid references public.organization_groups(id) on delete cascade,
  enabled          boolean not null default true
);
alter table public.organization_entitlements enable row level security;
create policy organization_entitlements_admin on public.organization_entitlements for all
  using (public.is_saferise_admin() or public.has_org_role(organization_id, array['org_admin']))
  with check (public.is_saferise_admin() or public.has_org_role(organization_id, array['org_admin']));

-- What the signed-in member is entitled to through an organisation. Only an
-- ACTIVE seat in an ACTIVE organisation (contract-driven) counts: suspended
-- and released members get nothing, immediately. A protocol entitlement
-- resolves only when the protocol exists with content; otherwise it is
-- silently absent. The member's own records are never involved.
create or replace function public.my_org_entitlements()
returns table (organization_id uuid, track_id text, protocol_id text, feature_key text)
language sql stable security definer set search_path = public
as $$
  select e.organization_id, e.track_id, e.protocol_id, e.feature_key
    from public.organization_entitlements e
    join public.organization_members m
      on m.organization_id = e.organization_id and m.user_id = auth.uid() and m.seat_status = 'active'
   where e.enabled
     and public.org_is_active(e.organization_id)
     and (e.group_id is null or e.group_id = m.group_id)
     and (e.protocol_id is null or exists (
           select 1 from public.content_protocols p where p.protocol_id = e.protocol_id and p.has_content));
$$;
revoke all on function public.my_org_entitlements() from public;
grant execute on function public.my_org_entitlements() to authenticated;
