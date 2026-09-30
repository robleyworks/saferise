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

## Open · the seat figures are unratified

`proposal-7kq3m9x2.html` states €1,800 / €4,200 / €9,500 and seats at
€15 / €13 / €11. **No founder ruling sets those numbers** — not this document,
and not `MEMBERSHIP-TIERS.md`, which is a consumer ladder and unrelated. They
predate both and have never been approved.

SR-487 correctly left them unchanged rather than guessing. They stay as they
are until the founder rules on them. Until then the sheet is a draft the
founder sends deliberately, not an approved price list — which the unlisted URL
already makes true in practice.
