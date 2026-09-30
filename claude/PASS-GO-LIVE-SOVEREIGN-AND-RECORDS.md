# Go-live — Sovereign and My Records

30 September 2026. Written after Part C (`1a6778d`) landed.

This pass reconciles the privacy copy with what the product now does, and names
the model provider. **It does not turn the flag on.** The flag flip is a separate
two-line pass once the founder has set the environment variables, obtained zero
data retention, and had the copy here read by a lawyer.

---

## The contradiction, stated plainly

Six live lines promise that what a member writes never leaves their device. That
was true until R14 and until My Records. It is now false in two directions:

- the written record of a Sovereign session is sent to a cloud model for the
  AI feedback (R14, on by default)
- the records hub is designed to sync to Supabase (SOV-1), though no sync is
  built yet

R13 exists to stop privacy copy running ahead of the mechanism. This is the same
failure in reverse: the mechanism has moved and the copy has not. Until these six
lines change, turning on `SR_FLAGS.sovereign` publishes a false statement.

| File | Line | Current |
|---|---|---|
| `legal.html` | 41 | "what you write in your record stays on your device and is never sent to us" |
| `privacy.html` | 41 | "Your journal entries and session notes stay on your own device. We never receive them and cannot read them." |
| `privacy.html` | 74 | "stored **on your device only**. They are not uploaded, not backed up by us, and not readable by us." |
| `privacy.html` | 85 | "**Your journal stays on your device.** … It is not sent to us." |
| `privacy.html` | 142 | "**Your journal:** on your device, under your control." |
| `terms.html` | 99–100 | same paragraph as privacy 85 |

## The distinction the new copy must carry

The honest version is not "we changed our minds about privacy". It is that there
are now **three** different things with three different answers, and the old copy
collapsed them into one:

1. **Your voice.** Never leaves the device. Unchanged, and still the strongest
   claim on the site. Transcription runs in the browser on a WASM model; the
   audio is discarded as it is transcribed.
2. **What you write by hand** — journal, decisions, statements typed in. Still on
   the device. Unchanged today.
3. **The written record of a Sovereign session**, when AI feedback is on. Sent to
   a named provider, read, and the reflection returned. Never used for training,
   and never visible to anyone at the member's organisation.

Keep 1 and 2 as absolute as they are. Do not soften them to cover 3. Give 3 its
own paragraph and let the member switch it off.

---

## Provider decision — founder-ruled 30 September

**Anthropic, direct API. Model: Claude Haiku 4.5.**

The function already supports this with no code change: `SR_READING_API_STYLE`
defaults to `'anthropic'`, and `netlify/functions/lib/provider.js` already
implements that wire format. This is configuration only.

**Do not use a Fable- or Mythos-class model.** Those families carry a mandatory
30-day retention requirement and cannot use zero data retention. Haiku 4.5 can.

### Two consequences the copy has to carry honestly

**Retention is not zero by default.** The standard commercial API retains
inputs and outputs for 30 days. Zero data retention is granted per-organisation
on request through Anthropic sales. **Until it is granted, no page may say the
record is not retained.** This pass therefore ships the copy in the form marked
*before ZDR* below; the *after ZDR* variant is a one-line change when the founder
confirms it is in place.

**Processing is outside the EEA.** The API offers `inference_geo` of `us` or
`global` only; there is no EU residency. Set `us` explicitly so the location is
known and statable rather than "wherever capacity is". This is the first thing in
the stack that processes a member's words outside the EEA — account data is in
Frankfurt — so section 6's unresolved `[TRANSFER MECHANISM]` placeholder now
carries real weight. Do not invent a mechanism. Leave the placeholder, add the
Anthropic transfer to its scope, and report it.

---

## What this pass does

### 1. Configuration only — no provider code change

Set `inference_geo: "us"` on the outbound request in
`netlify/functions/lib/provider.js`'s anthropic path, so the processing location
is deterministic and matches what the privacy page will say. That is the only
code change in this pass.

Environment variables stay as documented in `sv-reading.mjs`. **Never put a key
value in code, in a comment, or in any client-delivered file.** The founder sets
them in Netlify.

### 2. The six copy lines

Replace exactly these. Do not rewrite surrounding paragraphs.

**`privacy.html` line 41 — the short version.** Replace the one line with three:

> Your voice is never sent anywhere. Speech becomes text on your own device and
> the recording is discarded as it goes.
>
> What you type — journal entries, decisions, your own statements — stays on your
> device. We never receive it and cannot read it.
>
> If you use a Sovereign session with AI feedback on, the written record of that
> session is sent to be read, and the reflection comes back to you. It is never
> used to train anything, and nobody at your organisation can see it. You can
> switch it off.

**`privacy.html` line 74, under "What you write".** Keep the paragraph, add the
boundary:

> Your journal entries, session notes and personal record are stored **on your
> device only**. They are not uploaded, not backed up by us, and not readable by us.
>
> The one exception is a Sovereign session with AI feedback switched on. That
> session's written record — the transcript and your two ratings — is sent to our
> model provider to be read. Your name, email and account id are not sent with it.
> See section 5.

Leave the "if you clear your browser data" paragraph exactly as it is.

**`privacy.html` line 85, under "Technical information".** Replace the bold
sentence run with:

> **What you type stays on your device.** Journal entries, decisions and
> statements you write are stored on the device you wrote them on. We cannot read
> them, we do not back them up, and we could not recover them for you.
>
> **Your voice is never sent anywhere.** In a Sovereign session, speech becomes
> text in your own browser and the audio is discarded as it goes. It is not
> uploaded, not stored, and not recoverable — by us or by anyone.

**`privacy.html` line 142 — the retention list item.**

*Before ZDR is confirmed — ship this:*

> **What you write:** on your device, under your control. Deleting it there
> deletes it entirely. A Sovereign session record sent for AI feedback is held by
> our model provider for up to 30 days for their own abuse monitoring, then
> deleted. It is never used to train anything.

*After the founder confirms ZDR — change to:*

> **What you write:** on your device, under your control. Deleting it there
> deletes it entirely. A Sovereign session record sent for AI feedback is not
> stored by our model provider once the reflection is returned.

**`terms.html` lines 99–100.** Replace both with:

> As explained in the Privacy Policy, what you type is stored on your own device
> and is not transmitted to us. Your voice is never transmitted at all.
>
> **One exception, and it is yours to switch off.** If you run a Sovereign session
> with AI feedback on, that session's written record is sent to our model provider
> to be read, and the reflection is returned to you. It is never used for
> training. Switch AI feedback off in your account settings and nothing is sent.

**`legal.html` line 41.** Replace the trailing clause of the intro:

> Four documents, kept separate so each one can be read on its own. The shortest
> answer to the question most people arrive with: your voice is never sent
> anywhere, and what you write stays on your device unless you turn on AI feedback
> for a Sovereign session.

### 3. `privacy.html` section 5 — the subprocessor row

Add to the provider table, in the same voice as the existing rows:

```html
<tr><td><strong>Anthropic</strong> (United States)</td>
    <td>Reads the written record of a Sovereign session and returns the reflection</td>
    <td>The session transcript and your two ratings. Not your name, email or account id</td></tr>
```

Add one sentence under the table:

> What is sent for AI feedback is never used to train any model. If you switch AI
> feedback off, nothing is ever sent.

### 4. `privacy.html` section 6 — where data is held

The existing paragraph says account and usage data are in Frankfurt. That stays
true. Add after it:

> One exception: if you turn on AI feedback, that session's written record is
> processed in the United States by Anthropic, our model provider. Your account
> data does not leave Frankfurt.

Then extend the scope of the existing `[TRANSFER MECHANISM]` sentence so it
covers both the Sint Maarten access and the Anthropic transfer. **Leave the
placeholder itself and the review comment untouched.** Do not name a mechanism.
Report that it now covers two transfers, not one.

### 5. `privacy.html` section 11 — automated decisions

The current text says there is no profiling and no algorithmic recommendation.
That stays true, but it now sits next to a feature that reads a member's words,
so it must say what AI feedback is and is not:

> We do not make automated decisions about you that have legal or similarly
> significant effects. There is no profiling. We do not recommend protocols based
> on your behaviour.
>
> AI feedback is not a decision about you and not an assessment of you. It reads
> back what you said in your own words — what you returned to, what changed
> between the start and the end — and it is bound to what is actually in the
> record. It does not diagnose, it does not infer a condition, and it never adds a
> statement you did not make. Nothing follows from it automatically: no score, no
> flag, no change to your account, and nothing sent to anyone.

### 6. `privacy.html` section 4 — legal basis

Add one row to the legal-basis table for the Sovereign session record. State the
purpose as delivering the AI feedback the member asked for. Do not assert a
basis the founder has not confirmed — if it is not obvious from the existing
rows' pattern, leave it as `[LEGAL BASIS — see note]` in the same style as the
existing placeholder and report it.

### 7. Leave alone

- The `[TRANSFER MECHANISM]` and `[EMAIL PROVIDER]` placeholders. Report them.
- The flag. `SR_FLAGS.sovereign` stays `false` in this pass.
- `SOVEREIGN-ARCHITECTURE-DECISIONS.md` is not in this repo — it lives in the
  claude.ai Project. It still says SOV-4 is "Not written" when SR-469 built it.
  Nothing to do here. The founder corrects it on that side.

---

## VERIFY G

| # | Check |
|---|---|
| G1 | `grep -rn "stays on your device\|never sent\|not sent to us\|on your device only" privacy.html terms.html legal.html` returns only lines that are still true — voice, and typed entries |
| G2 | No page claims the Sovereign record stays on the device |
| G3 | No page claims the Sovereign record is not retained — ZDR is not confirmed yet |
| G4 | `privacy.html`, `terms.html` and `legal.html` render at 375, 1024 and 1440 with no console errors and no sideways scroll |
| G5 | The subprocessor table has the new row and still fits at 375 |
| G6 | `grep -rniE "sk-ant\|api[_-]?key *= *['\"]" --include=*.js --include=*.html --include=*.mjs .` returns nothing — no key value anywhere in the tree |
| G7 | `SR_FLAGS.sovereign` is still `false` |
| G8 | `inference_geo` is set to `us` on the outbound request, and the existing provider tests still pass |
| G9 | Screenshots of the three legal pages at 1440, and the subprocessor table at 375 |

Report which checks passed, which failed, and which could not be run.
Do not mark anything verified that was not actually run.

---

## Not in this pass, and why

- **Turning the flag on.** Blocked on three founder items: the environment
  variables set in Netlify, zero data retention granted by Anthropic, and a
  lawyer reading this copy.
- **The device-to-server migration.** Ruled out until the records hub syncs.
- **The B2B DPA.** Anthropic has to be named there too. Separate document, not in
  this repo.
