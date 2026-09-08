# Supabase setup — the runbook

One ordered list, in order. **§1–3 are done** — recorded below with what
actually happened, not left as instructions to follow, so this file
matches reality rather than describing a state that's already passed.
§4–6 are still Andre's own dashboard steps. Every value below was taken
directly from the repo or the live project — nothing here is a guess or a
placeholder. Where something genuinely cannot be determined, that is
stated explicitly, with what it depends on.

This covers Phase 1 only (the Supabase project and schema) plus the auth
settings the already-built pages (`signup.html`, `login.html`,
`account.html`) require to work. It does not cover Paddle, the webhook, or
the admin dashboard — those are later phases in `pass/AUTH-PAYMENTS-BRIEF.md`
and are not built yet.

---

## 1 · The project — done

- **Name:** SafeRise EU.
- **Region:** Frankfurt (`eu-central-1`) — the settled stack decision
  (`pass/AUTH-PAYMENTS-BRIEF.md`, "Stack decisions"), confirmed on the
  live project, not just requested.
- **Project ref:** `mynjjgtjytzyfsuqqlhg`.
- **Project URL:** `https://mynjjgtjytzyfsuqqlhg.supabase.co`.
- **Status:** `ACTIVE_HEALTHY` as of this entry.

An earlier project, ref `bsdiqhwkjmnqlwtenzld`, was created and then
deleted before this one — grepped the repo for that ref: zero hits, so
nothing here ever pointed at it and nothing needed cleanup.

The database password was set by Andre when the project was created and
is not recorded here or anywhere in this repo — nothing in the built
pages needs it directly (the client talks to Supabase over its REST/Auth
API, never a direct Postgres connection).

## 2 · Project URL and publishable key — done

Both now live in the one file that reads Supabase configuration anywhere
in this repo (checked directly — no `.env` file, no other hardcoded
reference, no build-time environment variable exists):

| Dashboard field | Value goes into | Line |
|---|---|---|
| **Project URL** | `js/saferise-auth.js` | line 29 — `'https://mynjjgtjytzyfsuqqlhg.supabase.co'` |
| **Publishable key** (`sb_publishable_…`, not the legacy JWT anon key) | `js/saferise-auth.js` | line 30 — `'sb_publishable_1SB0yturyH6LRVrz8kjkcg_tGIqEQ4-'` |

The publishable key is safe to commit in client-side JS; it is meant to be
public, and Supabase's Row Level Security (§3) is what actually protects
the data. **The `service_role` key and the database password are not in
this repo, this commit, or this file — neither was created, requested, or
handled at any point in this pass.** The service-role key belongs only in
a server-side environment variable (Netlify, once the Phase 5 webhook
function exists — not built yet) and must never reach a browser-loaded
file.

## 3 · The migration — applied

`supabase/migrations/0001_auth_entitlements.sql` (6.7 KB, written 6
September 2026) was applied against the live project via the Supabase
management API — not the CLI, not a manual SQL-editor paste. This repo
still has no `supabase/config.toml` and no CLI state (no `.supabase/`
directory), so a future second migration should either go through the
same route this one did, or — if the CLI is set up properly for a
sequence of migrations — via `supabase link --project-ref
mynjjgtjytzyfsuqqlhg` and `supabase db push`, at the point someone sets
that up. It wasn't needed for one file.

**Confirmed on the live project, not assumed from the file:**
- Tables created: `public.members`, `public.usage_events`.
- **RLS is enabled on both** — `rls_enabled: true` for each, read directly
  from the project, not inferred from the migration text.
- A follow-up security-advisor check (`get_advisors`, type `security`)
  flagged one item, not something this migration got wrong so much as a
  Supabase default worth knowing about: `handle_new_user()` and
  `protect_member_entitlement_columns()` are `SECURITY DEFINER` functions
  in the `public` schema, which PostgREST auto-exposes as callable RPC
  endpoints (`/rest/v1/rpc/handle_new_user`, etc.) to `anon` and
  `authenticated` roles by default. In practice this is low-risk here —
  both are declared `returns trigger`, and Postgres refuses to execute a
  trigger-typed function outside an actual trigger context, so a direct
  RPC call errors rather than running — but it's a real advisor finding,
  not silently patched in this pass (that would be a schema change beyond
  "apply the migration and report"). If it's worth closing anyway,
  `revoke execute on function public.handle_new_user() from anon,
  authenticated;` (and the same for the other function) in a follow-up
  migration removes the RPC exposure without touching the trigger
  behaviour.

## 4 · Email provider (SMTP)

**Supabase's built-in email sending only delivers to addresses already on
the project's team** — it does not send real member-facing mail. Every
flow that depends on email (see SR-358's report in `docs/fix-register.md`
for the full audit) is silently non-functional until a real SMTP provider
is configured here.

1. **Choose a provider.** Not decided anywhere in this repo or in
   `pass/AUTH-PAYMENTS-BRIEF.md` — this is an open decision for you, not
   one this pass can make. Any standard transactional-email provider
   (Postmark, Resend, SendGrid, Amazon SES, etc.) works; Supabase's own
   docs list the exact SMTP fields it expects.
2. In the dashboard: **Settings → Authentication → SMTP Settings**. Enable
   "Custom SMTP" and paste in the provider's host, port, username and
   password/API key.
3. Send a test email from that same settings page before moving on —
   Supabase's dashboard has a built-in test-send button; use it.

## 5 · Auth settings that must change from their defaults

1. **Settings → Authentication → URL Configuration:**
   - **Site URL:** `https://thesaferiseprotocol.com` (the production
     domain, confirmed live in `terms.html`'s own "using the site at
     thesaferiseprotocol.com" clause — the only place the repo states its
     own domain outright).
   - **Redirect URLs:** add `https://thesaferiseprotocol.com/*` (or the
     specific pages, at minimum `https://thesaferiseprotocol.com/login.html`).
     No page in this repo passes an explicit `redirectTo` to Supabase's
     signup or magic-link calls (`js/saferise-auth.js`'s `gotrue('signup', …)`
     and `gotrue('otp', …)` both omit it), so Supabase falls back to the
     Site URL above for every confirmation and magic-link email.
   - **⚠ Known gap, not fixed by this runbook:** no page in this repo
     — not `login.html`, not `signup.html`, not anywhere else — reads the
     `#access_token=…&refresh_token=…&type=…` fragment Supabase appends to
     that redirect after a member clicks a confirmation or magic-link
     email. Setting the values above makes the redirect land on a real
     page instead of erroring, but the member will **not** be
     automatically signed in when they arrive — they will need to enter
     their password on `login.html` manually (which will then work,
     since their account is confirmed by that point). Closing this gap
     needs a small code change (a hash-parsing handler on the redirect
     target, calling the equivalent of `setSessionFromAuthResponse`) that
     is outside this audit-and-runbook pass's own scope — flagged here so
     it isn't mistaken for "done" once the dashboard settings are saved.
2. **Settings → Authentication → Providers → Email:** leave "Confirm
   email" **ON** (the default). `signup.html`'s own code
   (`js/saferise-auth.js`'s `signUp()`) explicitly expects no session to
   come back from a fresh signup and shows "Check your email to confirm
   your account, then sign in." — turning confirmation off would change
   that expected behaviour without any corresponding code change.
3. No other auth setting needs to change from Supabase's shipped default
   for the pages currently built (password minimum length, JWT expiry,
   etc. — nothing in the client code assumes a non-default value for any
   of these).

## 6 · How to know it worked

After each step above, here is what you should see:

- **§1–3, already confirmed done:** `js/saferise-auth.js` carries the real
  project URL and publishable key (no `YOUR-PROJECT-REF`/`YOUR-ANON-KEY`
  left); the dashboard's **Table Editor** shows `members` and
  `usage_events` under the `public` schema, each with its **RLS** toggle
  reading "RLS enabled" — verified directly against the live project for
  this entry, not left for you to re-check, though it costs one click if
  you want to see it yourself.
- **After §4:** the test-send button in **SMTP Settings** delivers to
  your own inbox.
- **After §5:** open `signup.html` on the live site, create a real
  account with an address you control. You should receive a confirmation
  email within a minute or two, sent from your configured provider (check
  the "from" address), landing wherever §5's Redirect URL points — not
  automatically signed in, per the flagged gap above. Signing in manually
  afterward on `login.html` should succeed and land on `dashboard.html`
  (or wherever `?next=` pointed).
- **Full end-to-end verification** — sign-up through sign-out, confirming
  `account.html` renders correctly and a signed-out visitor is actually
  blocked from gated content — is §4 of the audit report this runbook
  accompanies, and needs the project live to run. It was skipped this
  pass because the project doesn't exist yet; re-run it once every step
  above is done.
