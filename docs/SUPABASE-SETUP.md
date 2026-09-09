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
  the "from" address), landing wherever §5's Redirect URL points.
  **SR-371 closed the gap this used to flag here:** the confirmation
  redirect now signs the member in automatically — no manual sign-in step
  needed afterward. See §7 below for the exact sequence.
- **Full end-to-end verification** — sign-up through sign-out, confirming
  `account.html` renders correctly and a signed-out visitor is actually
  blocked from gated content — is §4 of the audit report this runbook
  accompanies, and needs the project live to run. It was skipped when
  this runbook was first written, because the project didn't exist yet.
  The project is live now (SR-359); §7 below is that sequence, run for
  the two flows SR-371 built. `account.html`/gated-content behaviour
  itself is unchanged by SR-371 and still worth a pass of its own.

## 7 · Manual test sequence — confirmation redirect and password reset (SR-371)

Written per `pass/PASS-auth-loop.md` §4's own instruction: the project is
live, so this is the sequence to run rather than a "once it's live" note.
This session verified the client-side mechanics (fragment parsing, session
establishment, hash clearing, error display) against the real project using
constructed tokens — real signature rejection came back exactly as
expected, confirming the request format and error handling both work — but
could not verify receiving and clicking a real email, which needs an inbox
this session doesn't have. Two sequences below cover that gap.

**A — confirmation / magic-link redirect**

1. On `signup.html`, create an account with an address you control.
2. Confirm the email arrives (see §6 above for provider/from-address
   checks) and note where its link points — it should be the domain root
   (`https://thesaferiseprotocol.com/#access_token=...&type=signup`), since
   nothing in `js/saferise-auth.js` passes an explicit `redirectTo` for
   sign-up or magic-link.
3. Click it. **Expect:** the homepage loads, a banner appears near the top
   reading "You're signed in. Taking you to your dashboard…", the URL's
   `#access_token=...` fragment disappears from the address bar within the
   same instant (check history — it should not be there either), and the
   page redirects to `dashboard.html` about 1.4 seconds later.
4. On `dashboard.html`, confirm you are shown as signed in (not the signed-
   out state) without doing anything further.
5. Reload `dashboard.html`. **Expect:** still signed in — the session is in
   `localStorage`, not memory-only (only the entitlement flag is
   memory-only, by design — see `js/saferise-auth.js`'s own header
   comment).
6. Click an already-used copy of the same confirmation link again, or wait
   for a link to expire and click it. **Expect:** the homepage loads, the
   same banner area shows a plain message ending in "That link no longer
   works" (or Supabase's own expiry wording) plus **Sign in** / **create an
   account** links — not a blank page, not a silent failure.

**B — password reset**

1. On `login.html`, click **Forgot your password?** — lands on
   `reset-password.html` showing the request form.
2. Enter an email you control and submit. **Expect:** the same neutral
   note regardless of whether the address has an account —
   "If there's an account for {email}, a reset link is on its way." — and
   the email field then disabled so a second click can't fire a second
   request.
3. Confirm the email arrives, and that its link points at
   `https://thesaferiseprotocol.com/reset-password.html#access_token=
   ...&type=recovery` — **this one does carry an explicit `redirectTo`**
   (`requestPasswordReset()` sets it), unlike flow A above, so it should
   land on the reset page directly rather than the homepage.
4. Click it. **Expect:** `reset-password.html` loads straight into the
   "Set a new password" view (not the request form), the URL's fragment is
   gone immediately.
5. Enter two different passwords and submit. **Expect:** an inline error,
   "Those two passwords don't match" — no network request, no page change.
6. Enter the same password twice (8+ characters) and submit. **Expect:**
   redirect to `dashboard.html`, signed in as that account, and the new
   password works on a subsequent `login.html` sign-in while the old one
   no longer does.
7. Click an already-used or expired reset link. **Expect:** the "That link
   no longer works" view, with a **Request a new link** control back to
   step 1 — not the set-password form, and not a blank page.

**What this session actually verified, and what it could not:** the
client-side mechanics of both flows (1–4 above, minus the real email step)
were exercised directly against the live project using hand-built tokens.
A `type=signup` fragment with a validly-shaped (but unsigned) token
produced a working sign-in, correct hash clearing and the correct
redirect; a `type=recovery` fragment did the same, landing on the
set-password view; an `error=access_denied&error_code=otp_expired`
fragment produced the plain failure message with both links, on both
`index.html` and (by the same shared function) `reset-password.html`;
submitting a genuinely mismatched password pair produced the client-side
error with no request sent; submitting a matching pair against a real
(necessarily invalid, since it wasn't signed by this project's own secret)
token produced a real rejection from the live server —
`invalid JWT: unable to parse or verify signature, token signature is
invalid: signature is invalid` — displayed correctly rather than crashing,
which is the strongest evidence available without a real inbox that a
genuine, correctly-signed token would succeed the same way. Receiving and
clicking a real confirmation or reset email, and confirming SMTP delivery
end to end, needs a real inbox — that is what steps A2/A3 and B3 above are
for, and Andre is the one who can run them.
