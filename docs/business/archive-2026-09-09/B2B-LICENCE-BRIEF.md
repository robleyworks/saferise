# B2B Licence Packaging — Selling Through HR

*How to package the corporate tracks as an annual organisational licence.
Companion to `CORPORATE-STRATEGY.md`.*

Status key: ● done · ◑ in progress · ○ open · ⚠ decision held

---

## The reframe

**A workshop is a day. A licence is an asset on their side of the wall.**

The workshop is how you land. The licence is the business — recurring, renewable,
procurement-approved, and priced on population rather than on the founder's
calendar. Everything below is about making the licence the thing that renews
without a facilitator in the room.

---

## 1 · Licence the whole library, not the work track

**The instinct is to licence Track 03. Don't.**

An employee struggling in a performance review is very often the same employee
struggling at home. Restricting a corporate licence to the work track sells them
a third of the person and puts SafeRise into the same narrow box every
workplace-wellbeing tool already occupies.

| Scope | Marginal delivery cost | Differentiation |
|---|---|---|
| Track 03 only | — | Low. Competes with every leadership tool |
| **All live tracks** | **Zero** | **High. Nobody else licences relationship and personal work into a workplace** |

Marginal cost of including Tracks 01 and 02 is zero — the content is written and
hosted. It doubles the perceived value at no cost and makes the offer difficult
to compare against anything in the category.

**Sell: full platform access. Position: Track 03 is the reason they buy; the
rest is the reason employees actually use it.**

---

## 2 · The unit of sale — population, not seats

Two models are available. They are not equivalent.

| Model | Mechanics | Problem |
|---|---|---|
| Per-seat | Employer buys N seats, employees request enrolment | **An employee requesting a seat has disclosed something.** The request itself is a signal |
| **Population licence** | Whole employee population has access by default | **Using it discloses nothing, because everyone already has it** |

**Take the population licence.** It is not just simpler commercially — it is the
only model consistent with the product. The entire proposition rests on nobody
having to declare a difficulty to get help. Seat requests reintroduce exactly the
disclosure the architecture removes.

It also removes seat-management overhead, renewal true-ups, and the awkward
conversation about who gets a seat.

---

## 3 · The measurement problem, and its resolution

This is the crux of every HR conversation and it must be settled before the first
call.

**HR must report something to renew a budget line. Track 03 forbids outcome
claims, and the platform publishes that usage is never reported by name.**

### What can and cannot be reported

| Layer | Reportable | Why |
|---|---|---|
| Provisioning | ✅ Yes | "400 people have access." The employer already knows this |
| Live workshop attendance | ✅ Yes | Attendance at a scheduled event, not private use |
| Voluntary testimonial | ✅ Yes | The employee chose to say it |
| Employer-run anonymous survey | ✅ Yes | Their instrument, their data, never touches SafeRise |
| Private protocol usage | ❌ No | The promise. Breaking it destroys the reason it works |
| Individual records or journals | ❌ Never | Device-only. Technically unavailable, not merely withheld |

### The resolution

**Bundle a measurable live component into every licence.**

Live delivery is countable. Private use is not. Give HR a quarterly facilitated
session inside the licence and they have attendance figures, session feedback and
a visible programme to point at — while the private layer stays completely dark.

> "You will be able to report on the sessions. You will never be able to report
> on the individuals — and that is exactly why people use it."

**⚠ Decision needed.** Anonymised aggregate activation counts — "62% of the
population has activated an account" — sit in a grey zone. They identify nobody,
they are standard EAP practice, and they make renewal materially easier. They
also reopen a door the architecture was built to close. This needs an explicit
ruling before a buyer asks, because the answer must be instant and identical
every time.

---

## 4 · The procurement advantage nobody else has

**Device-only records collapse the security review.**

This is worth more in a B2B sale than any feature. When a wellbeing vendor is
onboarded, procurement and InfoSec run a data-protection review proportional to
the sensitivity of what the vendor holds. Most hold detailed emotional and
behavioural data on employees.

**SafeRise holds almost none of it.**

| Data | Where it sits |
|---|---|
| Journal entries, records, protocol progress | **The employee's own device.** Never transmitted |
| Account and authentication | Supabase, Frankfurt (eu-central-1) |
| Billing | Employer-level, no employee data |

**Consequences for the sale**

- The DPA is short, because the processing is minimal
- Special-category data risk under Article 9 is largely absent from the employer's
  side — there is no health data held by the vendor to breach
- A security questionnaire has few uncomfortable answers
- Data residency is already EU, which pre-answers the standard European objection
- No employee-level data means no employer liability for what the vendor does with it

**Lead the technical review with this.** It converts the longest, most painful
stage of enterprise procurement into a short one. Say so on the first call —
"your InfoSec review will be unusually quick, and here is why."

⚠ Note honestly: the Chapter V question remains open. Remote operational access
from Sint Maarten to Frankfurt data may itself constitute a transfer, and the
Transfer Impact Assessment is scoped but not complete. Close this before signing
a European enterprise, because their DPO will find it.

---

## 5 · Pricing architecture

Banded by headcount. Never by usage — banding on company size never touches who
used what, so the privacy promise survives the pricing model intact.

| Band | Headcount | Annual licence | Per employee |
|---|---|---|---|
| Foundation | Under 100 | €4,500 | €45+ |
| Growth | 100–500 | €12,000 | €24–120 |
| Scale | 500–2,000 | €28,000 | €14–56 |
| Enterprise | 2,000+ | Custom | Negotiated |

**Benchmark.** Employee assistance programmes typically run €15–40 per employee
per year for a service with famously low utilisation. This sits inside that range
while delivering 30 protocols and 308 resources rather than a helpline number.

**Included in every band**
- Full platform access for the whole population
- One facilitated remote session per quarter
- Launch communications kit for the internal announcement
- A named contact

**Priced separately**
- Additional workshops beyond the quarterly session
- Half-day retreats (€1,800 / €3,500)
- Executive Presence per-leader tier, once built
- In-person delivery — travel and time

**⚠ The current €4,500 flat rate is materially underpriced above 500 employees.**
A 1,000-person company paying what a 20-person company pays reads as unserious to
a buyer who signs six-figure SaaS contracts routinely.

---

## 6 · The land-and-expand motion

Enterprise HR does not buy an annual population licence cold. Nobody does.

| Stage | Offer | Price | Purpose |
|---|---|---|---|
| **0 · Room** | Lunch-and-learn, 45 min, remote | Free | Entry. Needs no track record to sell |
| **1 · Pilot** | One department or site, 3 months, capped population | €2,500 | A real deployment with a real end date |
| **2 · Licence** | Full population, 12 months | Band price | The renewal asset |
| **3 · Expand** | Additional sites, regions, or Executive Presence tier | Incremental | Growth without a new sale |

**The pilot is the whole motion.** It is small enough to sign without board
approval, long enough to produce testimonials, and it converts the annual licence
from a decision into a renewal — which is a far easier conversation.

**Pilot terms that matter**
- Fixed end date, not open-ended
- Named internal sponsor who will be quoted at the end
- One facilitated session inside the pilot, so there is something to attend
- Agreed conversion price stated at the start, so expansion is not a renegotiation

---

## 7 · What HR is actually buying

Not productivity. Their real problems, in the order they feel them:

| Their problem | What the licence answers |
|---|---|
| **Previous wellbeing spend failed** | Staff did not engage because they assumed the employer could see. Device-only records are a structural answer to the exact objection that killed the last purchase |
| **EAP utilisation is dismal** | Nobody phones a helpline. Everybody opens something that requires no disclosure and no appointment |
| **Duty of care and psychosocial risk** | A provisioned, documented, always-available resource is evidence of provision — without a claim about outcomes |
| **Nothing for the middle** | The gap between "fine" and "needs clinical referral" is where most of the workforce sits and where nothing exists |
| **Manager capability** | Track 03 protocols are written for the person under pressure, including the manager |

**The line that opens the conversation:**

> "Everything you have bought before required someone to raise their hand. This
> doesn't."

---

## 8 · Objection handling

| Objection | Answer |
|---|---|
| "How do we measure ROI?" | You will measure the sessions, not the people. If a vendor offers you individual engagement data on emotional content, ask what they are doing with it |
| "We already have an EAP" | Keep it. An EAP is for crisis and referral. This is for the ordinary Tuesday that is not a crisis and never reaches the EAP |
| "Is this clinical? What is our liability?" | It is self-guided education and training in nervous-system regulation. Not therapy, not treatment, no diagnosis. Where a situation is targeted — discrimination, an unsafe environment — the protocol stops and routes to people with authority. That protects you as much as the employee |
| "What happens to the data?" | Records never leave the device. Account data sits in Frankfurt. Your InfoSec review will be short |
| "It is one person" | The corpus is written, the method is documented, and the platform runs without me. Collaborators are contracted by name. Here is the handover architecture |
| "Can we white-label it?" | No. The refusal to promise outcomes is the product, and it does not survive being rebranded by an employer |

---

## 9 · The paper you do not yet have

**These are the actual blockers.** A licence sale stops dead at legal without
them, and HR cannot fix that for you.

| Document | State | Note |
|---|---|---|
| Master Services Agreement | ○ Not drafted | Term, scope, liability cap, IP, termination |
| Data Processing Agreement | ○ Not drafted | Short, because processing is minimal — but required |
| Security questionnaire pack | ○ Not drafted | Pre-answer the standard 40 questions once, reuse forever |
| Transfer Impact Assessment | ⚠ Scoped, incomplete | European enterprise will ask. Close it |
| Insurance certificate | ○ Unknown | Professional indemnity. Frequently a procurement gate |
| Order form / licence schedule | ○ Not drafted | Band, headcount, term, sessions included |
| Launch communications kit | ○ Not drafted | HR will not write it. If you do not supply it, activation collapses |

**Same counsel engagement** as the consumer terms and the convertible note.
Drafting these three together is cheaper than three separate instructions.

**⚠ Billing rail.** Paddle as merchant of record is built for consumer
subscriptions. Annual enterprise licensing needs invoicing, purchase-order
handling and bank transfer. This is an unsolved operational gap and it will
surface at the first signature.

---

## 10 · Timing and triggers

HR buys on cycles and events, not on interest.

| Trigger | Window |
|---|---|
| Budget planning | Typically Q3–Q4 for the following year. Be in the conversation before the budget is set, not after |
| Post-engagement-survey | Results land and something must be seen to be done |
| Post-restructure or redundancy | Duty of care becomes acute and visible |
| Wellbeing week or mental health day | A programme needs content. Low-friction entry point |
| New CHRO or People Director | First 100 days, actively looking for initiatives to own |
| Psychosocial risk compliance | Rising regulatory attention on workplace psychological safety |

---

## 11 · The launch kit — the thing that decides renewal

Activation is where corporate wellbeing dies. The employer announces it once, and
nothing happens.

**Supply the whole internal launch.** HR has no time to write it and no
confidence in the tone.

- Announcement email from leadership, drafted
- Intranet copy block
- A one-page explanation of what it is and what it is not
- Explicit privacy statement, in plain language, that reads as credible rather than legal
- The first quarterly session scheduled *before* the announcement goes out, so there is somewhere to go
- A three-week follow-up sequence

**The privacy statement is the activation lever.** Employees do not open
employer-provided wellbeing tools because they assume someone is watching. Say
plainly, in the employer's own announcement, that records never leave the device
and the employer cannot see usage. That single paragraph does more for activation
than any feature.

---

## Sequence

| Phase | Days | Action |
|---|---|---|
| Paper | 1–30 | MSA, DPA, security pack, order form drafted. TIA closed. Billing rail resolved |
| Assets | 15–35 | Licence one-pager, launch kit, pilot terms sheet |
| Pipeline | 15–45 | Warm network worked. Target list of European tech HR built and qualified |
| Rooms | 30–60 | Two free lunch-and-learns delivered |
| Pilot | 60–120 | First paid pilot signed and delivered. Sponsor quote captured |
| Licence | 120–180 | First annual population licence converted from pilot |

---

## Open items

- ⚠ Anonymised aggregate activation reporting — permitted or refused? Answer must be instant and identical every time
- ⚠ Licence pricing bands confirmed
- ⚠ Enterprise billing rail — Paddle cannot invoice
- ○ TIA completed before any European enterprise signature
- ○ Professional indemnity insurance status
- ○ Whether the quarterly session is delivered by Andre or, at scale, a contracted facilitator
- ○ Executive Presence per-leader tier pricing, once the track exists

---

## Review log

| Date | Note |
|---|---|
| 2026-09-09 | Brief created. Population licence model selected over per-seat — seat requests reintroduce the disclosure the architecture removes. Full library licensed rather than Track 03 alone, at zero marginal cost. Measurement resolved by bundling a countable live session so the private layer can stay dark. Device-only architecture identified as the primary procurement advantage. |
