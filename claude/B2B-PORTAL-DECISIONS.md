# B2B Organizational Portal — founder rulings

29 September 2026. Written against `SafeRise_B2B_Portal_Handover.docx`
(md5 `1aca28dcf3d7` — the same document also circulated as
`SafeRise_B2B_Organizational_Portal_Claude_Handover.docx`; the two files are
byte-identical).

Copied into the repository 30 September (SR-492) — see `_SYNC-NOTE.md`.

---

## Rulings

| # | Ruling |
|---|---|
| **B1** | **Per-seat pricing is correct for B2B.** Licences, seat states and seat utilisation are the commercial model, not just a provisioning convenience. This supersedes the earlier headcount-waterfall rule for the organizational product |
| **B2** | **Build the Industry and Role protocol slots empty.** The entitlement architecture, routing and portal assignment are built now. Protocol content is uploaded into place when written. The build does not wait on the content, and the content does not wait on the build |
| **B3** | **Checkout handles purchase orders and credit cards.** Both rails, not one. This resolves the open enterprise-billing question — Paddle alone is insufficient because it cannot invoice or accept a PO |

**No seat price is set here.** B1 establishes per-seat as the *model*, not the
figure. See the open item at the foot of this document.

---

## What B2 means in practice

Every Industry and Role protocol is a record with a defined shape and no body.
The portal can licence, group-assign and display an entitlement whose content
is not yet present, and the employee sees nothing until it is.

Requirements this places on the build:

- Entitlements reference protocol IDs that may not yet resolve to content
- An unfilled entitlement never renders as a broken page, an empty state or a
  "coming soon" to an employee — it simply does not appear in their library
- Adding content later is a content deploy, not a schema change or a release
- The admin-side program page may show a licensed protocol as not yet
  available; the employee side may not

## What B3 means in practice

Two payment paths behind one contract record:

- **Card** — self-serve or assisted, immediate activation
- **Purchase order** — order form, invoice, terms, activation on agreed
  conditions rather than on payment clearing

The contract record is the same either way. Seat provisioning must not be
coupled to a cleared payment, or a PO customer waits weeks for access they
have already committed to buy.

---

## Sequencing

The organizational schema and the Saved Records schema (SOV-1) touch the same
user identity and should be designed in **one** schema pass rather than two
that are reconciled later.

*Status, 30 September: done.* Applied to production as migrations 0002–0006.
The privacy boundary is verified by query — an org_admin and an exec_viewer
both return zero rows against an employee's records, against a passing control.
See `SCHEMA-APPLIED-TO-PRODUCTION.md`.

## Standing constraints that did not change

- No Outseta code, assumptions or data-model references
- One shared protocol and resource engine for B2C and B2B employees
- No consumer pricing or Premium 1:1 access inside employer-sponsored accounts
- Workshops are contracted services, never an employee marketplace
- Employer reporting is aggregate only, with a **configurable** suppression
  threshold — not hard-coded before privacy review
  *(set to 5 distinct members in `platform_settings.min_cohort_size`; fails
  closed when unset)*
- No employer access to journals, transcripts, recordings, AI synthesis,
  Chosen Self, Decisions, Saved Records or individual activation scores
- Account health is commercial and programme health, never psychological
  scoring
- SLA times are stored by tier from the start and published only when they can
  be met

---

---

## Rulings, 30 September 2026 (SR-494)

| # | Ruling |
|---|---|
| **B4** | **Two organisational licence plans: Premium and Sovereign.** Not one undifferentiated seat. Premium is the whole library; Sovereign is the library plus the voice system and AI feedback. Two entitlement sets against one contract record — configuration, not new architecture |
| **B5** | **Seats are priced annually**, per seat. This affirms B1: per-seat is the model, and the figures are annual, not monthly |
| **B6** | **A 30-day proof of concept, converting to a full-year licence.** One contract record moving from PoC to licence. Activation runs off contract status, not payment status (B3), so the conversion needs no payment event to unlock access |
| **B7** | **At most two PoCs are free. Every other PoC is paid.** This preserves the two-unpaid-pilot cap in `GTM-PRICING-HANDOVER.md` §2 and shortens its six-week box to 30 days. The named-testimonial and usage-summary trade still applies to the free two. Any "usage summary" is the suppressed aggregate from `org_metrics()` — never individual usage, and never a figure resting on fewer than five distinct members |
| **B8** | **Sovereign is sold to organisations.** The privacy policy is to be updated before any Sovereign seat is sold. Founder-ruled against the recommendation to hold Sovereign for B2B until zero data retention is granted — recorded here so the reasoning is not lost, not to reopen it |

### The per-seat contradiction, resolved

`AUDIT-EXTERNAL-AI-HANDOVERS-2026-09-26.md` carries the line **"Never per seat.
Per-seat pricing requires counting individual usage. The pricing model and the
privacy promise are the same decision."** That objection does not hold and is
withdrawn.

A seat is *provisioned access*, not usage. `B2B-ENTERPRISE-LAYER.md` §1 already
lists provisioning as reportable — "400 people have access" — and private usage
as never reportable. The schema reflects exactly that: `seat_status` and
`activated_at` record that a seat exists and when it was taken up. There is no
usage counter anywhere in `organization_members`. Per-*usage* pricing would
break the promise; per-seat does not.

**The investor deck still says the opposite.** Slide 17: *"Annual access is
banded by company size and tiered as a waterfall, never priced per seat."* The
deck also carries a different programme ladder (workshop EUR 1,800; half-day
retreat EUR 1,800 / 3,500) from the sheet's EUR 1,800 / 4,200 / 9,500. The
closed-conflict ruling on the deck covered **consumer** pricing only. This is a
separate, open contradiction and needs resolving in the deck, not here.

### Open — must be settled before a Sovereign seat is sold

**1 · Who holds the AI feedback switch.** Row-level security already stops an
employer *reading* a record. It does not answer whether an org_admin can *enable*
AI feedback on an employee's behalf. Proposed rule, pending founder ruling:

> The employee holds the switch. An organisation may buy the Sovereign
> capability; only the seat holder may turn AI feedback on, and only they may
> turn it off. No organisational role can set it, default it on, or see that it
> is on.

Without this written down, an employer could buy a feature that transmits an
employee's words to a third party without that employee choosing it.

**2 · The legal basis is harder in B2B than B2C.** `[LEGAL BASIS]` is still an
open placeholder in `privacy.html` for the Sovereign session record. In an
employment context consent is the weakest available basis, because a regulator
treats consent given to an employer as not freely given by default. B8 says the
privacy policy will be updated; this is the specific question it has to answer,
and it is a lawyer's question, not a writer's.

**3 · A per-seat session allowance.** Sovereign carries real per-session
inference cost. An annual per-seat price against unbounded use is an open
liability. The consumer tier has a per-member allowance; the organisational
plan needs one, stated in the contract rather than discovered in a bill.

**4 · Zero data retention is not granted.** Applied for, not returned. Until it
is, no material may say the Sovereign record is not retained — the honest line
is that it is held up to 30 days for the provider's own abuse monitoring, then
deleted, and is never used to train anything.

### Open — the figures

B5 settles that seats are annual. It does not set the numbers, and the sheet's
current ones cannot survive being read as annual:

| | Per person per year |
|---|---|
| Consumer Premium | EUR 228 |
| Consumer Sovereign | EUR 468 |
| Retired per-head waterfall, top band | EUR 95 (minimum EUR 6,000) |
| **Seat sheet as written, read as annual** | **EUR 15** |

At EUR 15 a seat a year, 25 seats is EUR 375 — an entire company for less than
two consumer subscriptions. The Premium bands want to land between the retired
EUR 95 and the consumer EUR 228. Sovereign sits above Premium and must clear
inference cost.

Until the founder sets them, the sheet states a price that is either wrong or
ambiguous.

### Cannot be fulfilled yet

A PoC can be signed today. Its seats cannot be provisioned:

- **No member can be put on a tier.** Sovereign is gated to the founder's
  account alone; no mechanism assigns a tier to anyone else
- **There is no billing integration.** No Paddle checkout, no webhook, no price
  objects. Subscription state is set by hand
- **Device-to-server sync is not built.** The records tables exist and are
  verified; nothing writes to them

These are a build pass that has to land **before** the first PoC starts, not
after it.
