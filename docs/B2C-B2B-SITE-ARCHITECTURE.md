# Separating B2C and B2B

**Draft, 13 September 2026.**

---

## 1 · The principle

**Do not split the homepage. Build a second front door.**

A homepage that tries to address a person in distress and a head of people operations at
the same time serves neither. The consumer arrives with a state; the buyer arrives with a
problem, a budget and a committee. They need different first sentences, different proof
and different next actions.

**The homepage stays B2C.** It is the consumer funnel and the free-track wedge, and it is
already working for that.

**`/organisations` becomes a full second site** — its own hero, its own navigation, its own
proof, its own pricing, its own close. Not a page. A destination.

---

## 2 · Why this works, and why a split hero does not

**B2B buyers almost never arrive via the consumer homepage.** They arrive from outbound
email, a LinkedIn post, a referral, a link in a deck, or a search for something specific.
Every one of those paths can point directly at `/organisations`.

So the question is not *how do we catch the buyer on the homepage* — it is *how good is
the page they land on when we send them there*.

**What to avoid:**

| Pattern | Why not |
|---|---|
| **Audience toggle in the hero** — "I'm an individual / I'm a business" | Forces a choice before either audience knows what this is. Halves the impact of the first screen |
| **Split hero, two columns** | Both halves get weaker. The consumer message is emotional and needs the whole screen |
| **Business content down the homepage** | Consumers scroll past it; buyers never scroll that far |
| **Separate domain** | Splits authority, doubles maintenance, and the method is the same |

---

## 3 · The one homepage entry point

A single, quiet, deliberate link. Not a banner, not a toggle, not a popup.

**Where:** the footer, in its own column, plus **one nav item**.

**Nav:** `Protocols · Method · Plans · Live sessions · For organisations · About`

That is enough. A buyer scanning a navigation bar finds it in under a second; a consumer
in distress does not notice it.

**Optionally, one line at the very bottom of the homepage**, after the consumer close —
past the point a consumer is still reading, exactly where a researching buyer looks:

> **Bringing this into an organisation?** Programmes, platform access and retreats for
> teams. → *For organisations*

---

## 4 · What `/organisations` contains

Its own page set, with its own sub-navigation.

```
/organisations                 the B2B homepage
/organisations/programmes      delivered work — pilot, programme, partner
/organisations/platform        seats, access, admin, reporting
/organisations/retreats        in-person, scoped
/organisations/sectors         the industry bundles
/organisations/security        data, DPA, hosting, access control
/organisations/contact         enquiry form, not a checkout
```

### The B2B homepage, section by section

**1 · Hero — the operating problem, not the emotional one**

> Your people are being asked to perform judgement work on degraded substrate. Then a hard
> conversation lands and there is nothing left to meet it with.

Different register entirely. No "the distance between your best self and your worst
reaction" — that is consumer copy.

**2 · The three layers** — substrate, capacity, application. This is the argument that
separates you from an EAP and a meditation app, and it belongs high on the page.

**3 · Why what they already have does not reach the moment**

| They have | Why it does not reach |
|---|---|
| EAP | Reactive, stigmatised, single-digit utilisation |
| Coaching panel | Rationed to leadership, scheduled weeks out |
| Meditation app | General calm, no situational specificity |
| Resilience training | One session, no transfer, nothing to return to |

**4 · Sectors** — the bundles. This is what makes the conversation specific rather than
generic, and it is the section a buyer will screenshot.

**5 · How it is delivered** — facilitated sessions, platform between them, manager
enablement. **Lead with the delivered layer**, because that is what justifies the price.

**6 · Programmes and pricing** — Foundation, Practice, Partner, with the pilot as the
qualifying step. Retreats on enquiry.

**7 · What we do not do** — no diagnosis, no individual usage reporting, no progress
scores, no clinical treatment. **This section wins trust faster than any claim**, and it
is where the quarterly seats-in-use commitment goes.

**8 · Close** — enquiry, not checkout. B2B does not buy through a card form.

---

## 5 · Retreats

Retreats sit awkwardly because they serve both audiences. **Give them one page under
`/organisations` and link to it from the consumer Live Sessions page.**

Two framings on the same page:

- **For teams** — an offsite with a method rather than a facilitator and a flipchart
- **For individuals** — a small cohort, on enquiry

Same page, two sections. Do not build it twice.

---

## 6 · The pricing split

**Never show seat pricing on a consumer page, and never show €19 on the B2B pages.**

Two people comparing €19 a month against €50 a seat a year will conclude one of them is
being overcharged. They are different products — one is self-guided access, the other is a
delivered programme with platform access inside it.

| Surface | Shows | Never shows |
|---|---|---|
| `/plans` | Free · €19 · €190 · workshops · 1:1 | Seat rates, programme prices |
| `/organisations` | Foundation · Practice · Partner · pilot · seats | €19, "free with an account" |

**One crossing point only.** The consumer plans page carries a single line: *Bringing this
into an organisation? → For organisations.* The B2B pages do not mention consumer pricing
at all.

---

## 7 · How buyers actually arrive

Design for these paths rather than for homepage discovery:

| Path | Lands on |
|---|---|
| Outbound email | `/organisations/sectors` — their sector, specifically |
| LinkedIn post or article | `/organisations` |
| Referral from a pilot | `/organisations/programmes` |
| Search: "nervous system regulation for teams" | `/organisations` |
| Procurement due diligence | `/organisations/security` |
| Consumer who becomes an internal champion | Homepage → footer → `/organisations` |

⚠ **That last path is the one the single homepage link exists for** — and it may be the
most valuable of all. Someone who uses this personally and then suggests it at work is a
warmer introduction than any outbound sequence. Make sure they can find the page.

---

## 8 · Build order

1. **`/organisations` homepage** — the single highest-value page, and everything else can
   wait behind it
2. **`/organisations/sectors`** — what makes outbound specific
3. **Nav item and footer link** on the consumer site
4. **`/organisations/security`** — a deal stalls a quarter without it
5. **Programmes and platform pages** — can start as sections of the B2B homepage and split
   out when they get long
6. **Retreats** — after the first organisational contract

⚠ **Nothing on `/organisations` should advertise a live delivered session until the
escalation criteria are agreed.** Platform access and the pilot can be described;
facilitated sessions are gated.

---

## 9 · The short version

- **Homepage stays consumer.** Do not dilute it
- **`/organisations` is a second site**, not a page
- **One quiet link each way**, nav and footer
- **Separate pricing entirely** — the two models must never appear together
- **The sectors page is the outbound weapon.** Build it early
- **Enquiry, not checkout**
