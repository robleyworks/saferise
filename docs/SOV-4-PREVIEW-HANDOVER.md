# SOV-4 (SR-469) — deploy-preview handover

Everything that could be built and tested without a Netlify runtime is committed and
verified locally (see the SR-469 register entry). What remains must run on a Netlify
deploy preview, in this order. **The flag does not flip until every step passes.**

## 0. Before the push

1. **Anthropic account — data retention.** Zero data retention is an *organisation /
   workspace data-retention setting* on the Anthropic account, arranged with
   Anthropic; it is not a request parameter and no code can turn it on or prove it.
   Confirm on the account (Anthropic Console → organisation / workspace settings →
   data retention) whether ZDR is in place for the key's workspace. Until it is
   confirmed, no copy anywhere may claim zero retention — including the privacy
   paragraph in §3, whose retention sentence is left as a placeholder.
2. **Netlify environment variables** (Site configuration → Environment variables;
   scope them to Functions; never commit them):

   | Variable | Value |
   |---|---|
   | `SR_READING_API_KEY` | the Anthropic API key for the ZDR-configured workspace |
   | `SR_READING_ENDPOINT` | `https://api.anthropic.com` |
   | `SR_READING_MODEL` | `claude-haiku-4-5` |
   | `SR_READING_API_STYLE` | `anthropic` (default; may be omitted) |
   | `SR_READING_TIMEOUT_MS` | `8000` (default; keep under the 10 s function limit) |
   | `SR_READING_LIMIT_DAY` | `4` (default) |
   | `SR_READING_LIMIT_30D` | `40` (default) |
   | `SR_READING_ID_SALT` | a long random secret (hashes member ids in the allowance store) |
   | `SR_SUPABASE_URL` | `https://mynjjgtjytzyfsuqqlhg.supabase.co` |
   | `SR_SUPABASE_ANON_KEY` | the publishable key already in `js/saferise-auth.js` |

3. **New build step.** `package.json` (added by SR-469) makes Netlify install
   `@netlify/blobs` for the function. Confirm the deploy log shows the install and
   the function `sv-reading` deployed, and that pages are otherwise unchanged.

## 1. Live checks on the preview

Open `https://deploy-preview-N--<site>.netlify.app/protocol.html?sovereign=1`
(the override works on deploy-preview hosts only) while **signed in**.

1. **Function reachable.** `GET /.netlify/functions/sv-reading` → 405. `POST` with no
   token → 401 `{"status":"withheld","reason":"signin"}`.
2. **V1 — key not in client files.** Fetch every `.js`, `.html`, `.css` the preview
   serves and search for the key's first 12 characters and `sk-ant-`: zero hits.
   `GET /netlify/functions/lib/provider.js` → 404.
3. **V2 — full session, network log.** Run a complete session with DevTools →
   Network recording. Expected outbound, in full: same-origin page assets, the
   one-time `/assets/vendor/speech/*` download (first run only), and **one** `POST
   /.netlify/functions/sv-reading` whose body is exactly
   `{"pre":n,"post":n,"transcript":[{"phase":"…","text":"…"}]}` with an
   `authorization: Bearer …` header. No audio, no other host. Record the list.
4. **V3 — ordering.** In that log the `sv-reading` request starts after the "Close
   the session" click; no `sv-reading` request exists before it.
5. **V4 — the guard, live.** The guard is proven by unit test (tests/sv-reading,
   52/52). Live: open the record; every block's quotes must appear verbatim in "Your
   words". Report any that do not.
6. **V5 — reading off.** Switch "AI reading" off; run a session: zero `sv-reading`
   requests; record written; settling line "AI reading switched off".
7. **V6 — limit, server-side.** Run five sessions within 24 h as one member: the fifth
   returns 429 `{"status":"withheld","reason":"limit"}` and shows "No more readings
   for now"; the record is still written. Then `curl` the function directly with the
   same token and a body carrying `"limitOverride":true,"memberId":"x"`: still 429.
8. **V7 — failure.** Temporarily set `SR_READING_ENDPOINT` to an unreachable host,
   redeploy the preview, run a session: one request, "The reading isn't available
   this time", record written, no retry. Repeat with `SR_READING_TIMEOUT_MS=1`.
   Restore both.
9. **V8 — edit/delete** on the preview's own records, then reload: persisted.
10. **V9 — dashboard.** From `/dashboard.html`, open a protocol, switch to Sovereign,
    run a complete session with the real microphone (the frame carries
    `allow="microphone"`).
11. **V11 — phone.** A complete session on a real phone.
12. **V13 — cost.** Netlify → Functions → `sv-reading` → logs: each reading logs
    `sv-reading usage {"input_tokens":…,"output_tokens":…}`. Cost per reading =
    input × $1/MTok + output × $5/MTok (claude-haiku-4-5). Record the median.

## 2. The flag

Only after §0 and §1 pass: set `window.SR_FLAGS.sovereign = true` in
`js/saferise-flags.js`, as its own commit, and publish the privacy paragraph (§3)
in the same release, once approved.

## 3. Privacy paragraph — DRAFT for founder review (not published)

> **The AI reading (Sovereign).** When a Sovereign session ends, and only if the AI
> reading is switched on, the written record of that session — the transcript text,
> which part of the session each passage was spoken in, and your two ratings — is sent
> to Anthropic, PBC, which provides the AI model that writes the reading and acts as
> our subprocessor for this purpose. Your voice recording is never sent anywhere:
> speech is turned into text on your own device and the audio is discarded as it is
> transcribed. Nothing that identifies you — your name, email address, account or
> organisation — is sent with it. **[RETENTION AND TRAINING SENTENCE — to be written
> only once the founder has confirmed the account's data-retention setting.]** The
> reading is on by default. You can switch it off at any time, on the Sovereign
> session screens or in your account settings; when it is off nothing is sent, and
> your sessions, transcripts and ratings are still saved on your device.
