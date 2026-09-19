# B2B build — what has to exist

**Companion to `mock-organisations.html`.** What must be duplicated from the consumer
platform, what must be built new, and what must deliberately *not* be duplicated.

---

## 1 · Duplicate from the consumer site

Shared code and tokens. **Do not fork these — import them.** A forked nav or footer is how
the two sites drift apart within a month.

| Item | Notes |
|---|---|
| **Design tokens** | Ground, type scale, `--gold`, `--t1/t2/t3`, serif/sans/caps stacks. One source |
| **Motion vocabulary** | `.rv` reveal, `.3s` default, `scale(1.06)`, `translateX(6px)`, `padding-left:14px`, `brightness(1.09)` |
| **Bezel and emboss** | 1px @ 7%, radius 4px, inset top highlight, `0 18px 55px` |
| **Icon set** | 24×24, `fill:none`, `stroke:currentColor`, 1.4 |
| **Footer shell** | Same structure, different links |
| **Theme toggle** | Midnight/Sunrise, if it stays on the consumer site |
| **Legal pages** | Terms, Privacy, Accessibility — shared, with B2B clauses added rather than a second set |
| **Cookie/consent banner** | Required now Wistia analytics are on. One implementation |
| **Hatch placeholder** | `repeating-linear-gradient(45deg,#141a2a…)` |

---

## 2 · Build new — site surface

| Page | Priority | Notes |
|---|---|---|
| `/organisations` | **1** | The mockup. Highest-value single page |
| `/organisations/sectors` | **2** | Starts as a section; splits out when it grows. **The outbound weapon** |
| `/organisations/security` | **3** | Data, hosting, access control, sub-processors, DPA on request. **A deal stalls a quarter without this** |
| `/organisations/programmes` | 4 | Splits from the homepage section when it gets long |
| `/organisations/platform` | 5 | Seats, admin, access, reporting |
| `/organisations/retreats` | 6 | Two framings — teams and individuals — on one page |
| `/organisations/contact` | 3 | Enquiry form, **not a checkout** |

**Navigation changes on the consumer site:** one nav item (`For organisations`), one
footer column, one line at the very bottom of the homepage. Nothing more.

---

## 3 · Build new — platform capability

**This is the part that is not design work, and it is what actually gates enterprise
deals.**

### Gate-level — a mid-market deal will not close without these

| Capability | Why | Effort |
|---|---|---|
| **Organisation account object** | Seats belong to an org, not to individuals. Nothing in the current data model represents an organisation | **Large** |
| **Seat provisioning** | Invite, activate, deactivate, reassign. Someone leaves, the seat returns | **Large** |
| **Admin console** | One screen: seats used of total, invite, deactivate. Nothing more | Medium |
| **SSO — SAML / OIDC** | Non-negotiable above ~250 seats | **Large** |
| **Quarterly seats-in-use report** | **Already promised in writing.** Nothing currently produces this number | Medium |
| **Invoicing** | Purchase order, bank transfer, annual billing. Paddle card checkout is not enough | Medium |
| **DPA** | Signed document, not a web page | Legal |
| **Security page** | Hosting, encryption, access control, sub-processor list, retention | Small |

### Important, not gating

| Capability | Why |
|---|---|
| **Bulk invite by CSV** | 300 invitations one at a time is not viable |
| **Cohort tagging** | Facilitated sessions run by cohort; the platform needs to know who is in which |
| **Sector bundle presentation** | Same library, different default ordering per contract |
| **Facilitator scheduling** | Currently manual. Fine at three accounts, not at fifteen |
| **Enquiry pipeline** | Where does an enquiry go? Currently nowhere |

⚠ **The seats-in-use report is the sharpest risk.** It is a written commitment on a page
that is about to go live, and nothing in the platform can currently produce the figure.
Either build it or remove the commitment before publishing.

---

## 4 · Content to write

| Item | Notes |
|---|---|
| **Sector bundles** | Six written. **Healthcare and manufacturing bundles name Sleep & Recovery and Exposure & Aftermath, neither of which exists** |
| **Security and data page copy** | Factual, checkable, no marketing |
| **Pilot findings report template** | The artefact that becomes your first evidence |
| **One-page overview PDF** | What gets forwarded internally. Currently nothing exists to send |
| **Manager enablement outline** | Sold in Practice and Partner; not yet designed |
| **Facilitated session format** | What actually happens in 60 minutes with a cohort. **Sold in every tier, not yet specified** |

---

## 5 · Do NOT duplicate

| Item | Why |
|---|---|
| **Consumer pricing** | €19 must never appear on a B2B page. Two models side by side make one look wrong |
| **The film** | Consumer emotional register. Wrong for a buyer |
| **The three "where do you want to start" doors** | Self-selection by state. A buyer is not selecting for themselves |
| **Track carousels** | Beautiful, and wrong here. A buyer wants bundles, not browsing |
| **Premium 1:1 modal** | Consumer product. Confuses the org offer |
| **"Free with an account"** | Undermines the price on the page it sits beside |
| **Founder emotional copy** | *"My unregulated nervous system narrowed my choices"* is a consumer hook |

---

## 6 · Gates before publishing

- **Escalation criteria agreed** — nothing may advertise a live facilitated session
  without them, and every tier on the page includes one
- **Clinician's insurance and permission question answered**
- **Seat reporting verified deliverable** — or the commitment comes off the page
- **Second facilitator identified** before Partner is listed as purchasable
- **`noindex` removed** — currently nobody can find any of this
- **Sleep & Recovery and Exposure & Aftermath** flagged as in development wherever a
  sector bundle names them

---

## 7 · Suggested sequence

**Phase 1 — a page to send people to.** `/organisations` plus sectors and security.
Enquiry by email. No self-serve, no admin console. **This is enough to run outbound and
close a pilot manually.**

**Phase 2 — after the first pilot.** Organisation account object, seat provisioning,
admin console, bulk invite, invoicing, seats-in-use report.

**Phase 3 — mid-market.** SSO, cohort tagging, DPA, security review responses.

⚠ **Do not build Phase 2 before Phase 1 produces an enquiry.** The account model is weeks
of work and it is worth nothing until someone wants to buy seats.

---

## 8 · The one-line summary

**The page can ship in days. The platform underneath it is months.** Sell manually until
something sells, then build the machinery for the second customer — not the first.
