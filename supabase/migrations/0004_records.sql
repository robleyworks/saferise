-- SafeRise — 0004 · MY RECORDS on the server (SR-477, SR-475 Part B · B3/B5)
-- These records already exist on members' devices. The server ADOPTS them:
--   sr.record.runs      → records_sessions (+ records_transcripts, records_feedback)
--   sr.record.chosen    → records_chosen
--   sr.record.decisions → records_decisions
--   sr.journal.entries  → records_journal
--   sr.clearing.log     → records_clearing
--   sr.resume           → records_resume
--   (saved items)       → records_saved — one table typed by target
-- sr.sessions.booked (live-session bookings) has no table in the brief and is
-- not adopted here — reported.
--
-- ═══ THE PRIVACY BOUNDARY (B5) ═══
-- Every records_* table: ONE policy, owner only, for every command. There is
-- no organisation policy, no org_admin or exec_viewer exception, no
-- saferise_admin policy, and no aggregate-with-user-id view. The only readers
-- of other members' rows are Postgres-owner code paths: the aggregate
-- functions in 0005, which return counts without user_id, and the service
-- role, which Supabase lets bypass RLS by design (server code only).
--
-- ═══ THE DEVICE-TO-SERVER CONFLICT RULE (B3, VB9) ═══
-- 1. Identity: every device record keeps the id the device gave it, as
--    client_id; a record is (user_id, client_id). Importing is an upsert on
--    that pair, so running the import twice changes nothing (idempotent).
-- 2. Union, never replace: records from a second device are added beside the
--    first device's; a record missing from one device is never deleted from
--    the server because of it.
-- 3. Same record on two devices: the copy with the later updated_at wins;
--    an older copy arriving later is ignored (records_guard below).
-- 4. Deletion is sticky: once deleted_at is set, no later write — from any
--    device, however new — clears it or changes the record. A deleted AI
--    feedback block stays deleted (C4).
-- 5. The resume pointer is one row per member: the later updated_at wins.
-- The device keeps its local copy until the server copy is confirmed (Part C).

-- ── the guard shared by every adopted table ─────────────────────────────
create or replace function public.records_guard()
returns trigger
language plpgsql set search_path = public
as $$
begin
  if tg_op = 'INSERT' then
    new.user_id := coalesce(new.user_id, auth.uid());
    return new;
  end if;
  new.user_id := old.user_id;                                  -- ownership never moves
  if old.deleted_at is not null then return old; end if;       -- rule 4: sticky deletion
  if new.updated_at is not null and old.updated_at is not null
     and new.updated_at < old.updated_at then return old; end if; -- rule 3: older loses
  return new;
end;
$$;

-- ── records_sessions ────────────────────────────────────────────────────
create table public.records_sessions (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users(id) on delete cascade,
  client_id     text not null,
  mode          text not null check (mode in ('guided', 'sovereign')),
  protocol_id   text,
  pre_state     smallint check (pre_state between 0 and 10),
  post_state    smallint check (post_state between 0 and 10),
  completed_at  timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  deleted_at    timestamptz,
  unique (user_id, client_id),
  unique (id, user_id)
);
alter table public.records_sessions enable row level security;
create policy records_sessions_owner on public.records_sessions for all
  using (user_id = auth.uid()) with check (user_id = auth.uid());
create trigger records_sessions_guard before insert or update on public.records_sessions
  for each row execute function public.records_guard();
create index records_sessions_user_completed on public.records_sessions (user_id, completed_at desc);

-- ── records_transcripts — per-phase text, keyed to a session ────────────
create table public.records_transcripts (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  client_id   text not null,
  session_id  uuid not null,
  phase       text not null check (phase in ('recognise', 'regulate', 'release', 'rise')),
  seq         integer not null default 0,
  text        text not null,
  edited      boolean not null default false,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  deleted_at  timestamptz,
  unique (user_id, client_id),
  foreign key (session_id, user_id) references public.records_sessions (id, user_id) on delete cascade
);
alter table public.records_transcripts enable row level security;
create policy records_transcripts_owner on public.records_transcripts for all
  using (user_id = auth.uid()) with check (user_id = auth.uid());
create trigger records_transcripts_guard before insert or update on public.records_transcripts
  for each row execute function public.records_guard();

-- ── records_feedback — AI feedback blocks ───────────────────────────────
create table public.records_feedback (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users(id) on delete cascade,
  client_id     text not null,
  session_id    uuid not null,
  lens          text not null,
  text          text not null default '',
  quotes        text[] not null default '{}',
  source_phase  text check (source_phase in ('recognise', 'regulate', 'release', 'rise')),
  edited        boolean not null default false,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  deleted_at    timestamptz,
  unique (user_id, client_id),
  unique (session_id, lens),
  foreign key (session_id, user_id) references public.records_sessions (id, user_id) on delete cascade
);
alter table public.records_feedback enable row level security;
create policy records_feedback_owner on public.records_feedback for all
  using (user_id = auth.uid()) with check (user_id = auth.uid());
create trigger records_feedback_guard before insert or update on public.records_feedback
  for each row execute function public.records_guard();

-- ── records_chosen — Chosen Self statements ─────────────────────────────
create table public.records_chosen (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  client_id   text not null,
  session_id  uuid,
  statement   text not null,
  kept        boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  deleted_at  timestamptz,
  unique (user_id, client_id),
  foreign key (session_id, user_id) references public.records_sessions (id, user_id) on delete set null (session_id)
);
alter table public.records_chosen enable row level security;
create policy records_chosen_owner on public.records_chosen for all
  using (user_id = auth.uid()) with check (user_id = auth.uid());
create trigger records_chosen_guard before insert or update on public.records_chosen
  for each row execute function public.records_guard();

-- ── records_decisions — decisions named in a session ────────────────────
create table public.records_decisions (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  client_id   text not null,
  session_id  uuid,
  kind        text check (kind in ('conversation', 'action')),
  text        text not null,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  deleted_at  timestamptz,
  unique (user_id, client_id),
  foreign key (session_id, user_id) references public.records_sessions (id, user_id) on delete set null (session_id)
);
alter table public.records_decisions enable row level security;
create policy records_decisions_owner on public.records_decisions for all
  using (user_id = auth.uid()) with check (user_id = auth.uid());
create trigger records_decisions_guard before insert or update on public.records_decisions
  for each row execute function public.records_guard();

-- ── records_journal — written or spoken, optionally attached ────────────
create table public.records_journal (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  client_id    text not null,
  input        text not null default 'written' check (input in ('written', 'spoken')),
  text         text not null,
  session_id   uuid,
  resource_id  text,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  deleted_at   timestamptz,
  unique (user_id, client_id),
  foreign key (session_id, user_id) references public.records_sessions (id, user_id) on delete set null (session_id)
);
alter table public.records_journal enable row level security;
create policy records_journal_owner on public.records_journal for all
  using (user_id = auth.uid()) with check (user_id = auth.uid());
create trigger records_journal_guard before insert or update on public.records_journal
  for each row execute function public.records_guard();

-- ── records_clearing — the Clearing log ─────────────────────────────────
create table public.records_clearing (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  client_id   text not null,
  logged_at   timestamptz not null,
  note        text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  deleted_at  timestamptz,
  unique (user_id, client_id)
);
alter table public.records_clearing enable row level security;
create policy records_clearing_owner on public.records_clearing for all
  using (user_id = auth.uid()) with check (user_id = auth.uid());
create trigger records_clearing_guard before insert or update on public.records_clearing
  for each row execute function public.records_guard();

-- ── records_saved — ONE table, typed by target ──────────────────────────
create table public.records_saved (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  client_id    text not null,
  target_type  text not null check (target_type in ('resource', 'content', 'protocol')),
  target_id    text not null,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  deleted_at   timestamptz,
  unique (user_id, client_id),
  unique (user_id, target_type, target_id)
);
alter table public.records_saved enable row level security;
create policy records_saved_owner on public.records_saved for all
  using (user_id = auth.uid()) with check (user_id = auth.uid());
create trigger records_saved_guard before insert or update on public.records_saved
  for each row execute function public.records_guard();

-- ── records_resume — the continue pointer, one per member ───────────────
create table public.records_resume (
  user_id      uuid primary key references auth.users(id) on delete cascade,
  protocol_id  text,
  track        smallint,
  resource     text,
  updated_at   timestamptz not null default now(),
  deleted_at   timestamptz
);
alter table public.records_resume enable row level security;
create policy records_resume_owner on public.records_resume for all
  using (user_id = auth.uid()) with check (user_id = auth.uid());
create or replace function public.records_resume_guard()
returns trigger
language plpgsql set search_path = public
as $$
begin
  if tg_op = 'INSERT' then new.user_id := coalesce(new.user_id, auth.uid()); return new; end if;
  new.user_id := old.user_id;
  if new.updated_at < old.updated_at then return old; end if;   -- rule 5: the later pointer wins
  return new;
end;
$$;
create trigger records_resume_guard before insert or update on public.records_resume
  for each row execute function public.records_resume_guard();

-- ── the one-time migration's own trail, visible to the member ───────────
create table public.records_migrations (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users(id) on delete cascade,
  device_id     text not null,
  started_at    timestamptz not null default now(),
  confirmed_at  timestamptz,
  counts        jsonb not null default '{}',
  unique (user_id, device_id)
);
alter table public.records_migrations enable row level security;
create policy records_migrations_owner on public.records_migrations for all
  using (user_id = auth.uid()) with check (user_id = auth.uid());
