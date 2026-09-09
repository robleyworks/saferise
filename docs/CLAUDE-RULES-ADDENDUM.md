# Append to `CLAUDE.md`

Four standing rules. Each exists because it was already broken once.

---

## Rule — CSS class namespacing

**Every class SafeRise defines is `sr-` plus a two-letter surface code plus the
component. A generic class name is a defect, not a style preference.**

```
.sr-cs-card        ✅  coming-soon card
.sr-mt-lineage     ✅  method-page lineage grid
.card  .wrap  .big  .close  .sec  .two  .note  ❌
```

### Surface codes in use

| Code | Surface |
|---|---|
| `sr-cs-` | Public coming-soon |
| `sr-mi-` | Member interior — **shared between `member-coming-soon.html` and `member-frameworks.html`** |
| `sr-hb-` | Dashboard hero banner |
| `sr-mt-` | Public method page |
| `sr-tp-` | Track and protocol surfaces |

**Claim a new code in this table before using it.** Two surfaces sharing a code
is how `.sr-mi-card` ended up governing two pages that must now change
independently.

### Why

- `.close` was already the closing section on a live page. A new component
  claiming it would have restyled the footer area of a page nobody asked to touch.
- `.sr-mi-card` and `.sr-mi-grid` are shared across two member pages, so
  restyling one restyles the other. That is now a permanent constraint.
- The method page mockup arrived with **51 of 53 generic classes** — including
  `.wrap`, `.sec`, `.cta`, `.two`, `.big` and `.small`. Every one was a live
  collision waiting to happen.

### Before shipping any new component

1. Grep the repo for each class name you intend to use.
2. If it appears anywhere, rename yours.
3. If it appears nowhere but has no `sr-xx-` prefix, rename yours anyway.

---

## Rule — never modify a shared selector to fix one page

If a rule is used by more than one page, **add a scoped rule rather than editing
the shared one.** Changing `.sr-mi-card` to fix the coming-soon page changes the
frameworks page, which is a page nobody asked to change.

When a page needs a different presentation, **swap its markup onto a different
namespace** rather than restyling the shared one.

---

## Rule — no member telemetry, ever

Aggregate, cookieless, page-level analytics is permitted. **Anything that records
what an individual did inside a session is not.**

**Never deploy:** session replay · heatmaps · scroll depth on protocol or journal
surfaces · individual user journeys · any tool whose value comes from watching one
person.

`public.usage_events` holds identifiers only — `t1-04` and the like. **It must
never hold free text.** The moment it does, Article 9 applies and the privacy
page becomes untrue.

The corporate argument is *"records are device-only, never opened to
leadership."* A replay tool contradicts that in a way an enterprise security
review will find.

---

## Rule — error monitoring is opt-in per surface, and scrubs by default

Error monitoring may run on **public marketing pages**. On member surfaces it
either scrubs aggressively or is not deployed.

Default Sentry configuration captures form field contents, full URLs and
breadcrumb text. On a page where someone is writing about shame, that is the most
sensitive data the platform holds.

Use `js/sentry-init.js` as delivered. **Do not simplify it** — every exclusion in
it is deliberate.
