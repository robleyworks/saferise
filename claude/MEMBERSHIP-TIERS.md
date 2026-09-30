# Membership tiers

29 September 2026. Founder-set. Supersedes the two-price shape (€19 / €29) in
earlier documents, which becomes the middle of a four-tier ladder.

Copied into the repository 30 September (SR-492) — see `_SYNC-NOTE.md`.

---

## The ladder

**All prices are monthly.**

| | **Free** | **Standard €19** | **Premium €29** | **Sovereign €39** |
|---|---|---|---|---|
| Track access | First track only | The tracks released so far | Every track, as it releases | Every track, as it releases |
| Guided protocols | Yes | Yes | Yes | Yes |
| Resources behind each protocol | Yes | Yes | Yes | Yes |
| My Records — sessions, journal, Chosen Self, Decisions, Saved | Yes | Yes | Yes | Yes |
| **Voiced sessions** | — | — | — | **Yes** |
| **Voiced journal entries** | — | — | — | **Yes** |
| **On-device transcription** | — | — | — | **Yes** |
| **AI reading — metacognitive** | — | — | — | **Yes** |
| **AI reading — structural** | — | — | — | **Yes** |
| Live sessions and workshops | Purchasable separately at every tier | | | |

Sovereign is Premium plus the voice system. Everything below the line is what
€10 buys.

> **Naming.** This document's working language is "AI reading". The
> customer-facing name is **AI feedback**, per `NAMING-DECISIONS.md` (N2), which
> governs every surface a member, customer or investor sees. Internal
> specification documents may keep their own working language; product copy may
> not.

---

## What the Sovereign tier actually is

Not "voice notes". A delivery system with three parts, and the value is in all
three together:

**1 · Speak instead of type, anywhere it matters.** Sovereign sessions, journal
entries, Chosen Self statements, decisions, and the before/after ratings. The
member's hands are free and their eyes can stay closed — which is the point of
a practice done in a raised state.

**2 · Transcription that never leaves the device.** A speech model runs in the
browser. The audio is discarded as it is transcribed; only the written record
is kept. This is what makes the rest of it safe to offer.

**3 · AI reading of what they said** — on by default in this tier:

- **Metacognitive** — what they returned to, what shifted between the start and
  the end, how they spoke about themselves, the gap between what they wanted
  and what they said they would do.
- **Structural** — how they moved through Recognise, Regulate, Release and
  Rise. Where the weight of the session actually sat.

Every line quotes them. Nothing is invented, nothing is graded, nothing is
diagnosed. The reading appears only after they have rated their own closing
state.

---

## Downgrade — founder ruling

**The member loses the feature. The records remain.**

A member leaving Sovereign keeps every voiced session, transcript, reading,
journal entry, Chosen Self statement and decision they have already made.
Those are theirs. What they lose is the ability to make new ones.

This must be stated in copy at the point of downgrade, because the alternative
reading — that their own words are taken away with the subscription — is the
one a member will assume unless told otherwise.

The same applies to content tiers: dropping from Premium to Standard removes
access to tracks, never the member's own record of sessions they ran while
they had it.

---

## What the tiers decide in the build

**Voice is the Sovereign line.** Free, Standard and Premium members type. Only
Sovereign members speak. Gated in one place — the shared voice service — not
at each calling surface.

**The speech model downloads only for Sovereign members**, on first voice use.
Nobody waits for a download to try something they have not bought.

**The AI reading exists only in the Sovereign tier.** R14's "on by default"
applies *within* that tier, not universally. A Free, Standard or Premium
member never sends a record anywhere, because they have no voiced entries to
send. The only records leaving a device belong to members who bought the
feature that sends them.

**Cost sits entirely in one tier.** Model calls, model-download bandwidth and
the reading allowance are all Sovereign-only. Per-member rate limiting belongs
to that tier's entitlement.

---

## What this obliges

- **Four recurring products in checkout**, both payment rails (B3).
- **Tier-aware entitlement code.** The existing access gate predates this
  ladder and needs a tier concept, not a binary paid/unpaid.
- **Free enforced as first-track-only** — a content boundary, not just an
  account boundary.
- **Upgrade paths.** Standard to Premium is a content unlock. Premium to
  Sovereign is a capability unlock and triggers the model download and the
  microphone consent on first use.
- **Downgrade paths preserve records** and say so before the member confirms.
- **Monthly recurring on the card rail.** The purchase-order rail is for
  organizations and is contract-term, not monthly.

---

## Open — the counts rule

Standing rule: **never state a protocol, resource or track count in product
copy.** The tiers are defined by track scope, so the pricing page needs to
express scope without numbers:

- Free — *the first track, in full*
- Standard — *the tracks released so far*
- Premium — *every track, as it releases*
- Sovereign — *every track, and your own voice*

If the founder wants explicit numbers on the pricing page specifically, that
needs to be a stated exception to the rule rather than a drift away from it.

**The investor deck conflict is closed.** The founder ruled the deck will be
updated and the conflict is not to be raised again.

---

## Scope — consumer only

**This document sets no organisational or per-seat figure.** The seat prices on
the private seat sheet (`proposal-7kq3m9x2.html`) are not ratified by this
document or by `B2B-PORTAL-DECISIONS.md`, which establishes per-seat as the
commercial model without setting any number. Do not treat the sheet's figures
as approved, and do not align them to anything here — the two are unrelated
ladders. SR-487 was correct to leave them untouched.
