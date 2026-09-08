# Supabase setup — the runbook

One ordered list. Follow it top to bottom. Every value below was taken
directly from the repo as it stands (`supabase/migrations/0001_auth_entitlements.sql`,
`js/saferise-auth.js`) — nothing here is a guess or a placeholder. Where
something genuinely cannot be determined from the repo, that is stated
explicitly, with what it depends on.

This covers Phase 1 only (the Supabase project and schema) plus the auth
settings the already-built pages (`signup.html`, `login.html`,
`account.html`) require to work. It does not cover Paddle, the webhook, or
the admin dashboard — those are later phases in `pass/AUTH-PAYMENTS-BRIEF.md`
and are not built yet.

---

## 1 · Create the project

1. Go to [supabase.com](https://supabase.com) and create a new project.
2. **Region: Frankfurt (`eu-central-1`).** This is a settled stack decision
   (`pass/AUTH-PAYMENTS-BRIEF.md`, "Stack decisions"), not a default to
   accept — Supabase's project-creation dropdown lists it as "Frankfurt
   (eu-central-1)" or "EU (Frankfurt)" depending on the current UI wording.
3. **Name it.** No name is specified anywhere in the repo. Suggested:
   `saferise-production` (or your own convention) — this is the one value
   in this runbook that genuinely has no repo-derived answer; pick
   anything, it does not appear in any client code or migration.
4. Set a database password when prompted. Store it wherever you keep
   other credentials — nothing in this repo needs it directly (the client
   talks to Supabase over its REST/Auth API, never a direct Postgres
   connection), but the Supabase CLI will ask for it if you use
   `supabase link` in step 3 below.

## 2 · Project URL and anon key → into the repo

Both live on the Supabase dashboard's **Settings → API** page, and both go
into exactly one file:

| Dashboard field | Value goes into | Line |
|---|---|---|
| **Project URL** (e.g. `https://abcdefgh.supabase.co`) | `js/saferise-auth.js` | line 29 — replace `'https://YOUR-PROJECT-REF.supabase.co'` |
| **Project API keys → `anon` `public`** | `js/saferise-auth.js` | line 30 — replace `'YOUR-ANON-KEY'` |

That is the only file that reads Supabase configuration anywhere in this
repo (checked directly — no `.env` file, no other hardcoded reference, no
build-time environment variable exists). The `anon` key is safe to commit
in client-side JS; it is meant to be public, and Supabase's Row Level
Security (already written into the migration, see §3) is what actually
protects the data. **Do not paste the `service_role` key anywhere in this
repo, in this file or any other.** It belongs only in a server-side
environment variable (Netlify, once the Phase 5 webhook function exists —
not built yet) and must never reach a browser-loaded file.

## 3 · Apply the migration

The one migration file is `supabase/migrations/0001_auth_entitlements.sql`
(6.7 KB, written 6 September 2026, never yet applied against a real
project).

**Use the Supabase Dashboard's SQL Editor, not the CLI.** Paste the full
contents of `supabase/migrations/0001_auth_entitlements.sql` into
**SQL Editor → New query** and run it once. This repo has no `supabase/config.toml`
and the Supabase CLI is not installed or initialised anywhere in it (no
`.supabase/` directory, no CLI lockfile) — `supabase db push` or
`supabase migration up` would first require running `supabase init` and
`supabase link --project-ref <ref>` against the new project, which this
pass's own boundary (`no project creation, no credentials`) puts outside
scope. Pasting into the SQL editor needs nothing beyond dashboard access
you already have from step 1, and is the lower-friction path for a single
one-off migration on a brand-new project. If a second migration is ever
added later and the two need to run in sequence with tracked state, that
is the point to set up the CLI properly — not before.

## 4 · Email provider (SMTP)

**Supabase's built-in email sending only delivers to addresses already on
the project's team** — it does not send real member-facing mail. Every
flow that depends on email (see §4 of the audit report this runbook
accompanies) is silently non-functional until a real SMTP provider is
configured here.

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

- **After §1–2:** `js/saferise-auth.js` no longer contains the literal
  strings `YOUR-PROJECT-REF` or `YOUR-ANON-KEY`.
- **After §3:** In the dashboard's **Table Editor**, two new tables exist:
  `members` and `usage_events`, both under the `public` schema. Click
  into each table's own **RLS** toggle (top right of the table view) and
  confirm it reads "RLS enabled" for both — the migration turns this on,
  but confirming it in the dashboard costs one click and catches a
  partial paste.
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
