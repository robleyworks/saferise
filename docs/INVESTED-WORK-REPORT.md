# SafeRise Protocol — Invested Work Report

**8 September 2026 · Baseline v1**

Companion to `saferise-invested-work.html`, which holds the live figures.

---

## 1 · What this is, and what it is not

**This measures replacement cost** — what it would cost to commission this body
of work from contractors at market rates today.

**It is not a company valuation.** A valuation reflects what a buyer or investor
would pay for future cash flows, and SafeRise has no revenue, no retention data
and no cohort. Investors do not price sweat equity; they price traction.

**It is not a claim about market value.** Work can be excellent and worth
nothing commercially. The two are independent.

**What it is genuinely useful for.** It answers a question a founder gets in
every early conversation — *what have you actually built?* — with a defensible
number instead of an impression. It also gives an honest floor: below this, an
acquirer or partner is getting the asset for less than it cost to make.

State it that way in a room. Presenting replacement cost as valuation is the
fastest way to lose credibility with anyone who has seen a term sheet.

---

## 2 · Headline

| | |
|---|---|
| **Total hours** | **1,772** |
| **Replacement cost** | **$155,577** |
| Elapsed equivalent | 44.3 full-time weeks · 11.1 months at 40 h/week |
| Product & content | 722 h · $63,793 |
| Web & engineering | 752 h · $57,184 |
| Business & commercial | 298 h · $34,600 |

---

## 3 · Method

Hours are **derived from measured output**, not recalled. Where output could be
counted, it was counted.

**Measured, not estimated:**

| Input | Figure | Source |
|---|---|---|
| Protocol content | 136,758 words | Parsed from the content store |
| Live protocols | 31 | Content store |
| Live resources | 308 | Content store |
| Script documents | 75,560 words | 14 recording and meditation documents |
| Framework & strategy docs | 71,877 words | 29 markdown documents |
| Tracked interventions | 359 | Fix register, SR-001 to SR-359 |
| Scoped work items | 145 | Launch tracker v15 |
| Protocols designed but unbuilt | 30 | Three track prospectuses |

**Productivity assumptions, stated so they can be argued with:**

- **400 finished words per hour** for protocol content. Specialist long-form in
  a regulated-adjacent domain, including research, structure, revision and
  compliance checking. Generalist copy runs 700–1,000; this is slower because
  every line is checked against prohibited vocabulary, outcome-promise rules and
  framework attribution.
- **550 words per hour** for strategy and philosophy documents — less compliance
  load, more thinking per word.
- **33 minutes average** per tracked intervention across 359 register entries.
  Some were one-line string fixes; some were multi-hour diagnostic passes.

**Rates** are mid-market independent contractor, not agency. An agency doing the
same work would bill roughly 2 to 2.5 times these figures. Offshore would be
roughly half. Both are defensible; this sits deliberately in the middle.

---

## 4 · Lane detail

### Product & content — 722 h · $63,793

| Line | Hours | Rate | Cost |
|---|---|---|---|
| Protocol content — 31 protocols, 308 resources | 342 | $85 | $29,061 |
| Meditation & recording scripts | 137 | $85 | $11,677 |
| Framework & philosophy corpus | 131 | $95 | $12,415 |
| Three new track prospectuses — 30 protocols scoped | 72 | $95 | $6,840 |
| Resource architecture & taxonomy | 40 | $95 | $3,800 |

The largest single asset. 136,758 words of finished protocol content across a
twelve-resource architecture, with conditional logic determining which resources
attach to which protocol. The taxonomy line covers work that is invisible in
word count but expensive to redo — the nine-universal-plus-conditional system,
and the overlap boundaries that keep 61 designed protocols from colliding.

### Web & engineering — 752 h · $57,184

| Line | Hours | Rate | Cost |
|---|---|---|---|
| Platform build — public and member surfaces | 320 | $75 | $24,000 |
| Defect and integrity passes — SR-001..SR-359 | 197 | $75 | $14,809 |
| Design system, mockups and iterations | 110 | $80 | $8,800 |
| Infrastructure & integrations | 55 | $85 | $4,675 |
| Media pipeline | 70 | $70 | $4,900 |

Vanilla JS with no build step, across track, protocol, resource and dashboard
surfaces. The defect line is unusual and worth naming rather than hiding: 359
tracked interventions is a lot, and it reflects a codebase built iteratively
under content churn. It is also why integrity is verifiable — every change has
an ID and a register entry.

### Business & commercial — 298 h · $34,600

| Line | Hours | Rate | Cost |
|---|---|---|---|
| Positioning, pricing and market intelligence | 90 | $120 | $10,800 |
| Legal, privacy and compliance | 65 | $120 | $7,800 |
| Launch programme management | 58 | $100 | $5,800 |
| Clinical and framework validation | 45 | $120 | $5,400 |
| Partnerships and go-to-market prep | 40 | $120 | $4,800 |

Smallest lane by hours, highest by rate. The compliance line covers Terms,
Privacy, the Article 30 record and the scope boundaries — work that would
otherwise be a lawyer's bill rather than a founder's evening.

---

## 5 · What is not counted, and why

**Deliberately excluded:**

- **Time spent learning.** Real, and not chargeable to the asset.
- **Abandoned work.** The withdrawn Ambition Recovery protocol, the retired
  Source Insights slot, superseded designs. It informed what exists; it is not
  in what exists.
- **Domain, hosting and tool subscriptions.** Cash out, not work in — track
  separately as expenses.
- **The founder's own recorded audio.** Not yet produced, so not yet an asset.
- **Advisory input from others**, which has no invoice attached.

**Deliberately conservative:**

- No premium for domain expertise, though six-framework grounding in a
  regulated-adjacent field is not generalist work.
- No multiplier for the compliance overhead the vocabulary and claim rules
  impose on every line written.
- Nothing for the 30 protocols scoped but unwritten beyond the scoping itself.

---

## 6 · How to keep it current

`saferise-invested-work.html` is the live document. Open it in a browser; it
saves to that browser under `saferise-invested-work`, and every hours and rate
figure is editable inline.

**Add a line whenever a lane of work completes** — the recording sprint, the
three new tracks when authored, the clinical review. Use **Add a line**, not a
mental note.

**Export state** after any significant edit. That produces a JSON file to keep
in `docs/`, and it is the only thing that survives a cleared browser.

**Review monthly**, not continuously. The point is a defensible running total,
not a timesheet.

**Revisit the rates once a year.** They are the most arguable input and the
easiest to update.

---

## 7 · The honest framing for an investor conversation

> *We have put roughly 1,770 hours into this. At contractor rates that is about
> $155,000 of work — 31 protocols, 308 resources, 137,000 words of finished
> content, a working platform, and the compliance and framework groundwork
> underneath it. That is what exists. What we do not have yet is retention data,
> and that is what we are raising to get.*

That framing works because it separates what is proven from what is not.
Presenting the same number as a valuation invites the obvious question — *based
on what revenue?* — and there is no good answer to it yet.
