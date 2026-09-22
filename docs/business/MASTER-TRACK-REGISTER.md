# SafeRise — master track register

**Reconciled 22 September** across the B2C roadmap, the B2B protocol register,
the master handover and the live site. Per Rule 7, nothing has been silently
merged: where generations disagree they are both recorded and the conflict is
named.

---

## The finding that resolves most of the apparent conflict

**Two different objects are both being called a "track".**

| | Size | Example |
|---|---|---|
| **Track** | 10 protocols | Personal Transformation, Sleep & Recovery, Sales & Quota |
| **Context protocol** | **1** protocol | R03 Sales Growth, I01 Healthcare |

The 14 Role and 16 Industry entries in `B2B-PROTOCOL-REGISTER.md` are *context
protocols* — one each, assigned as the "+2" on top of the Foundation 8. The
master handover's department and industry lists are *full 10-protocol tracks*.

So **"Sales & Quota" and "R03 Sales Growth" are not rival names for the same
thing.** One is a ten-protocol track sold into a sales-enablement budget; the
other is a single context protocol inside an 8 + 2 enterprise seat. Both can
exist. But they must not share a name on the website or a buyer will think
they're buying the larger one.

That accounts for almost all of the apparent contradiction between the two B2B
lists. What remains is set out below.

---

## Foundation 8 — the canonical names

Verified against the rendered curriculum grid in `organisations.html`.

| # | Track | Layer | Status |
|---|---|---|---|
| 01 | Personal Transformation | Capacity | **Live** — 10 protocols |
| 02 | Relationship Healing | Relational | **Live** — 10 protocols |
| 03 | Professional Performance | Application | **Live** — 10 protocols |
| 04 | Executive Presence | Application | In development — 10 protocol titles defined |
| 05 | Embodied Nutrition | Substrate | In development |
| 06 | Strength & Return | Substrate | In development |
| 07 | Sleep & Recovery | Substrate | In development |
| 08 | Elevation Series | Beyond | In development |

Not "Nutrition" and "Fitness" — those appear in the v6 Executive Summary and
the packaging framework and are wrong against the product. Still uncorrected at
source.

**Executive Presence is filed twice.** It is Foundation 8 #04 *and* the master
handover lists it as a B2B department track. It is one object. Treating it as a
separate B2B product would double-count it in any protocol total.

---

## Coming-soon page — nine bands, and they are not the Foundation 8

`coming-soon.html` carries nine bands. Five are Foundation 8 members; four are
not, and three of those four are not in any current build plan.

| Band | Track | In Foundation 8? | In the next seven? |
|---|---|---|---|
| band-01 | Elevation Series | yes | **yes** |
| band-02 | Sex & Intimacy | no | **yes** |
| band-03 | Strength & Return | yes | **yes** |
| band-04 | Embodied Nutrition | yes | **yes** |
| band-05 | Entrepreneur's | no | no |
| band-06 | Money | no | no |
| band-07 | Addiction Recovery | no | no — **clinical hold** |
| band-08 | Executive Presence | yes | **yes** |
| band-09 | Sleep & Recovery | yes | **yes** |

Two consequences worth deciding on.

**Sex & Intimacy is in the next seven but is not a Foundation 8 track.** Either
the Foundation 8 becomes a 9, or Sex & Intimacy is a B2C track outside the
Foundation set. It cannot be both "one of the eight every employee receives"
and a separate consumer track — the B2B proposition depends on the eight being
a fixed, nameable set.

**Entrepreneur's, Money and Addiction Recovery are visible on the site but
scheduled nowhere.** They are advertised and unplanned. Addiction Recovery
should carry a clinical hold in any case, per the safety position.

**Sales & Quota is in the next seven but has no band and no page presence** —
the only one of the seven that is invisible to a visitor.

---

## The three B2B generations

| Generation | Shape | Status |
|---|---|---|
| Departments ×6 / verticals ×7 | curated emphasis from the existing library | **superseded** — still live on `/organisations` |
| Roles ×14 / Industries ×16 | one context protocol each, 8 + 2 | **current** — 30 covers made |
| Departments ×7 / Industries ×7 | full 10-protocol tracks | **a different layer**, see above |

Mapping the third onto the second: most of it is the same territory at greater
depth — Sales & Quota ≈ R03, Customer Support ≈ R04/R05, Engineering & On-Call
≈ R09, HR & People ≈ R10, Legal & Compliance ≈ R07, Finance & Audit ≈ R06,
Frontline Hospitality ≈ I03, Clinical Staff ≈ I01, Educators ≈ I07, First
Responders ≈ I02.

**Three are genuinely new and have no context protocol behind them:**

- **Contact Centre** — already flagged twice as deserving early priority. Queue
  pressure, monitoring, metrics, no control over volume, seconds between calls.
- **Shift & Night Work** — cross-cutting rather than an industry; it applies
  inside healthcare, manufacturing, security and hospitality alike.
- **Field Service & Trades** — no equivalent anywhere in the current sixteen.

Contact Centre is the one with a developed 10-protocol architecture already
written. It is the strongest candidate of the three and the cleanest addition.

---

## Status vocabulary

Per the master handover, six states: **Live · In Development · Coming Soon ·
Research · Deferred · Clinical Hold**. Nothing currently uses them.

Note the tension to resolve: the handover asks for visible product-status
categories on the site; the instruction of 22 September is that development
status is not customer-facing. These are reconcilable — the coming-soon page
*is* the status, so it needs no per-card chips — but the six-state vocabulary
should then live in this register and the tracker, not on the page.

---

## What I would decide, in order

1. **Is Sex & Intimacy inside the Foundation 8 or outside it?** Everything B2B
   rests on the eight being fixed.
2. **Entrepreneur's, Money, Addiction** — schedule, defer or hold. They are
   advertised today with nothing behind them.
3. **Contact Centre in or out**, as a track and/or as I17.
4. **Sales & Quota needs a band** if it is one of the next seven.
5. Correct Embodied Nutrition and Strength & Return in the v6 summary.
