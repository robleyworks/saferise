# Go-to-Market Forecast — 60 Days on $1,000–$2,000

*Companion to `OPERATING-TRACKER.md`, workstream 02. Figures in USD unless
marked. Platform pricing is in EUR; conversion assumed ~1.08.*

Status key: ● done · ◑ in progress · ○ open · ⚠ decision held

---

## Strategic call: launch all three tracks at day 45

*Supersedes the earlier Track 01-only recommendation.*

All 31 protocols across Tracks 01–03 are written — 308 resources, 151,772 words.
What remains is finishing work against pipelines that already exist.

**Outstanding for a three-track launch**

| Item | Volume | Note |
|---|---|---|
| Posters | 29 | `mk_posters.py` built and verified; t1-01 produced. Mechanical once covers are final |
| t3-01–t3-09 covers | 9 | Generative removal of burned-in numerals, then lockup |
| t3-06 cover | 1 | New sourcing — The Belonging Gap |
| Stage A–D code pass | — | Blocked on handover zip placement |
| `member-*.html` `</div>` mismatch | 6 files | Needs a new SR ID |

**Why three beats one.** €19 / €29 / €39 with cumulative access gives a far
better ARPU and a real upgrade path from day one. Launching Track 01 alone would
have left the two finished tracks earning nothing.

**Realistic window: 45 days.** Tighter than 60 because none of it is writing.

**New tracks are not in this window.** Three new tracks would be 30 protocols,
~150,000 words, 30 covers, 30 posters and 30 recordings — a duplicate of
everything built to date. Track 08 (Training & The Body, no clinical or external
dependency) starts under tranche 2, after launch. See
`SUPPORTER-NOTE-STRUCTURE.md`.

---

## Critical path: two external gates

*Corrected. Supersedes the earlier CX Pay framing.*

LG-67 is closed: **Supabase (Frankfurt, eu-central-1)** for auth and database,
**Paddle as merchant of record.** Paddle being MoR is what solves the Sint Maarten
problem — Paddle becomes the seller of record, so Stripe's country support stops
mattering. CX Pay / Orco is held only as a possible second provider behind the
adapter at `js/saferise-pay.js`.

| Gate | Ref | State |
|---|---|---|
| Supabase project created, Frankfurt | LG-96 | ○ Not started. Everything built for auth is un-run SQL until this exists |
| Paddle seller account approved | LG-97 | ○ Not started. Unblocks the remaining payment phases |
| International transfer mechanism | LG-99 | ⚠ Blocked. Frankfurt data, Sint Maarten controller, no adequacy decision |

**Neither gate blocks the free tier.** Track 01 free is already implemented —
`FREE_TRACK_PREFIX='t1-'` in `js/saferise-access.js`. Phase 0 can run while both
approvals are in process.

---

## Budget — 60 days

### Fixed stack

| Item | Tier | Monthly | 60 days | Note |
|---|---|---|---|---|
| Netlify | Free | $0 | $0 | Sufficient for noindex, low traffic |
| Supabase | Free → Pro | $0–25 | $0–50 | Frankfurt eu-central-1 |
| Paddle | MoR | rev-share | — | ~5% + fees, no monthly cost |
| Wistia | Free | $0 | $0 | 25 GB storage, 200 GB/mo bandwidth, 1 user — holds for a small cohort |
| ElevenLabs | Starter | $6 | $12 | Voice work largely delivered; drop from Creator |
| Domain | — | — | ~$5 | Amortised |
| **Subtotal** | | **$6 + ⚠** | **$17 + ⚠** | |

*Wistia's paid entry is now $79/mo annual, $99/mo monthly — the old $19 Plus
tier is retired. Stay on free until bandwidth forces the move; that is a
launch-month problem, not a today problem.*

*Adobe CC Pro and Canva Pro already carried — not charged to this tranche.*

### One-time launch costs

| Item | Range | Priority | Note |
|---|---|---|---|
| Counsel session — consumer terms, health disclaimer, refund policy, and the convertible note | $300–500 | **Critical** | One session covering both. Highest-risk item to skip on a nervous-system platform taking payment |
| Paddle onboarding | $0 | **Critical** | No setup fee; revenue share only |
| Workshop venue + materials | $100–200 | High | Or $0 with a partner space |
| Contingency | $150 | — | |
| **Subtotal** | **$700–1,150** | | |

### Optional

| Item | Range | Verdict |
|---|---|---|
| Paid acquisition test | $200–300 | **Hold.** With a noindex site and no payment rail this measures nothing useful. If run at all, run it to measure cost-per-email on one landing page — not to acquire subscribers |
| Wistia Business | $99/mo | Only if bandwidth caps hit |

### Totals

| Scenario | 60-day spend |
|---|---|
| Lean — free tiers, partner venue, no ads | **~$720 + auth/billing** |
| Realistic — paid venue, contingency used | **~$1,020 + auth/billing** |
| Upper — plus a small paid test | **~$1,320 + auth/billing** |

$1,000 is workable. $1,500 is comfortable. $2,000 covers a vendor surprise.

---

## Revenue path — where traction actually comes from

Paid acquisition is not the lever at this budget. These three are:

| Channel | Unit | Volume (60d) | Gross |
|---|---|---|---|
| Group workshop — Personal | €59/person | 1 × 10 people | €590 |
| Premium 1:1 | €275/session | 2 sessions | €550 |
| Subscriptions, three tracks | €19–39/mo, ~€26 avg | 8–15 | €208–390 |
| **Total** | | | **€1,348–1,530** (~$1,455–1,650) |

The workshop does three things at once: books revenue, produces testimonials with
permission, and hands you a warm list that converts to subscription far better
than cold traffic. Run it before the subscription launch, not after.

Cohort sourcing is free: personal network, Dr. Bastien's referrals, and the
Disciplined Man audience via Dwight (adjacent audience, separate track).

**Net position at day 60:** roughly break-even. That is the point. You are not
buying growth with this tranche — you are buying the evidence that makes the
next conversation about a business rather than an idea.

---

## Gate A — justifies opening for paid users

All eight must be true. Binary, verifiable, no partial credit.

| # | Benchmark | Status |
|---|---|---|
| A1 | Payment rail live — one real transaction taken, settled, **and refunded** end-to-end | ○ |
| A2 | Legal pages live — terms, privacy, health disclaimer, refund policy | ○ |
| A3 | **All three tracks complete** — 31 protocols, 30 covers, 31 posters, audio mastered | ◑ |
| A4 | Beta cohort of 20–30 people recruited and onboarded | ○ |
| A5 | ≥50% of cohort completes one protocol end-to-end, all four steps | ○ |
| A6 | ≥30% return within 7 days unprompted | ○ |
| A7 | ≥5 testimonials captured with written permission | ○ |
| A8 | Zero P1 defects on member surface — `naturalWidth` verified in browser, six `member-*.html` templates clean | ◑ |

A5 and A6 are the two that matter. Completion says the protocol works. Return
says it works enough to come back to. Everything else is hygiene.

---

## Gate B — justifies tranche 2

| # | Benchmark | Floor | Target | Strong |
|---|---|---|---|---|
| B1 | Paying subscribers | 8 | 15 | 25 |
| B2 | MRR | €208 | €390 | €650 |
| B3 | Day-30 retention, first cohort | 50% | 60% | 75% |
| B4 | Workshops delivered | 1 | 1 | 2 |
| B5 | Corporate conversations at proposal stage (€4,500/yr) | 0 | 1 | 2 |
| B6 | Known cost-per-signup on ≥1 channel | — | ✓ | ✓ |
| B7 | Track 08 build underway, scope dated | ✓ | ✓ | ✓ |

**Hitting target changes the ask.** Tranche 2 is no longer "$1–2K for runway" —
it is "$1–2K to open Track 02 against a base of 15 paying members with 60% day-30
retention and a corporate proposal live." Same money, different conversation,
and a defensible basis for the conversion terms.

**Below floor** is also information. If A5 and A6 clear but B1 does not, the
protocol works and the distribution does not — that is a channel problem, and
more money aimed at the same channel will not fix it.

---

## 60-day sequence

| Days | Focus |
|---|---|
| 1–7 | Supabase project created. Paddle seller application submitted. Handover zip placed. Git hang cleared. |
| 8–24 | Posters (29 remaining). t3 cover removal pass + t3-06 sourcing. Legal pages drafted, counsel booked. Beta cohort recruited. |
| 25–38 | Beta cohort runs the protocols. A5/A6 measured. Workshop scheduled and filled. Payment rail tested with a live transaction. |
| 39–45 | Workshop delivered. Testimonials captured. **Gate A reviewed — T2 releases.** |
| 46–60 | Open for paid. First 1:1s delivered. Corporate outreach opened. Track 08 build starts. |

---

## Open items

- ⚠ Tranche structure — one-off, or monthly for a defined period? Changes the note.
- ⚠ Currency — USD or EUR for the note
- ⚠ Track 01 price — €19 on the tracker vs. €9 in earlier notes. Must be settled before A1.
- ⚠ Cumulative vs. standalone track access — affects ARPU and billing config
- ⚠ International transfer mechanism — LG-99, blocked, needs counsel
- ○ Wistia bandwidth headroom untested against a 30-person cohort

---

*Planning figures, not predictions. Revenue lines are targets to test against,
not forecasts. I'm not a financial advisor — the note structure and its
conversion terms need counsel before signature.*

## Review log

| Date | Note |
|---|---|
| 2026-09-08 | Initial forecast. Track 01-only launch recommended. CX Pay underwriting identified as sole critical path to Gate A. |
| 2026-09-08 | Revised. Three-track launch at day 45 — content already written, remaining work is finishing not writing. Track 01-only call withdrawn. Revenue and Gate B figures rebased on ~€26 blended ARPU. |
| 2026-09-08 | Payment corrected: Supabase (Frankfurt) + Paddle as merchant of record, per closed LG-67. CX Pay demoted to possible second provider. Launch gates are LG-96 and LG-97. |
