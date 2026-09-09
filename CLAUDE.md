```text
==================================================
CRITICAL — PRESERVE PROTOCOL TITLES + ICONS
==================================================

Across ALL FOUR series:

- Personal Transformation
- Relationship Healing
- Professional
- Elevation

PRESERVE every ORIGINAL protocol title exactly as it currently exists in the project.

PRESERVE every ORIGINAL protocol icon and keep each icon associated with its correct protocol.

DO NOT:
- rewrite protocol titles
- shorten protocol titles
- invent new protocol names
- use the example protocol names from the reference image
- replace existing icons
- redesign the icons
- remove the icons

The reference image is ONLY a reference for the grid layout, spacing, hierarchy, and overall presentation.

==================================================
RENAMING A PROTOCOL
==================================================

Renaming a protocol is a founder decision and requires a rename pass, never a
find-and-replace. A protocol's name appears in its filename, its register entries, its
card copy, its alt text, its diagram descriptions, its section headings, and in prose on
other pages. Several of these are invisible to a diff — an alt text describing a
regenerated diagram, or a heading naming the old protocol, will pass every structural
check.

A rename is complete only when a sweep for the old name across every tracked file, in
every representation including spelled-out and possessive forms, returns nothing but
deliberate historical records. Where the new name requires new copy, the rename is not
complete until that copy exists — a protocol carrying its predecessor's promise is worse
than one not yet renamed.

==================================================
PROTOCOL CARD DESCRIPTIONS
==================================================

Each card shows a short, NEW advisory-style description beneath the title — one calm,
practical sentence describing what the protocol helps the user do (not the original
trigger/symptom-list copy).

Each card should contain:

[EXISTING ORIGINAL ICON]

[EXISTING ORIGINAL PROTOCOL TITLE]

[NEW short advisory description — one sentence, track-specific, not copied between tracks]

Open Protocol →

For example, if the original data contains:

Icon
Anger Alchemy
Injustice, boundary violation, disrespect, loss of control
Open Protocol →

The card renders as:

Icon
Anger Alchemy
Turn anger into clarity, protect what matters, and choose your response.
Open Protocol →

The protocol title "Anger Alchemy" must remain unchanged.
Its existing icon must remain unchanged.
The ORIGINAL description ("Injustice, boundary violation...") is not deleted — it stays
present in the markup/data, just not rendered on the card. The visible line is new
advisory copy, added as an additional field alongside it.

IMPORTANT:
Do this by changing the card rendering, NOT by deleting the original descriptions from
the underlying protocol data. Add the new advisory copy as a separate field
(e.g. a `landingDescription`/`proto-landing-desc` value) rather than overwriting the
original description in place.

The original descriptions may be used elsewhere in the application and must remain
intact in the data source.

Do not modify:
- protocol data
- protocol descriptions stored in the data model
- protocol IDs
- slugs
- routes
- resource associations
- icons
- ordering

Only the SERIES LANDING PAGE protocol cards render the new advisory description in place
of the original description.

Apply this consistently across all four series — same structure, same description
length/tone, but track-specific content (do not reuse one track's wording on another).

The cards should feel clean, compact, and premium while preserving the existing
identity of every protocol.
```

## Design system

All visual styling lives in `css/saferise-system.css` and `js/saferise-system.js`.
`docs/INTEGRATION.md` is the markup contract — read it before touching any UI.

- Do NOT add styles to page files. New styling goes in the system CSS.
- Prefix every new class `sr-`. A collision has already cost real time:
  `.track` was the video scrubber at `height:3px`, and the carousel
  silently collapsed to 36px when it reused the name.
- Never use `<button>` as a card containing an aspect-ratio child.
  Chromium renders the child and leaves the button at zero height.
  Use `<article role="button" tabindex="0">`.
- Never put a literal closing script tag inside a .js file, including
  in comments. It terminates the tag if the file is ever inlined.
- Reduced motion is handled centrally in the system CSS. Do not add
  per-component `prefers-reduced-motion` blocks.
- The system CSS must load LAST, after every existing stylesheet.
  It wins by cascade order, not by `!important`.

## Platform landmines

- All Track 02 resources route through the Reader via `READER_PROTOCOLS`,
  never simple modals. A new resource type must hook into BOTH
  `openResourceModal` and the Reader's page-building loop.
- Widget injection goes after `contentEl.appendChild(page)` in `openReader`,
  branching on `data.kind`.
- Fixed nav and resource modals have a history of z-index conflicts.
- Waveform loop init is tied to audio player IDs.

## Standing rules — added by PASS-site-readiness.md

Four standing rules. Each exists because it was already broken once.

### Rule — CSS class namespacing

**Every class SafeRise defines is `sr-` plus a two-letter surface code plus the
component. A generic class name is a defect, not a style preference.**

```
.sr-cs-card        ✅  coming-soon card
.sr-mt-lineage     ✅  method-page lineage grid
.card  .wrap  .big  .close  .sec  .two  .note  ❌
```

#### Surface codes in use

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

#### Why

- `.close` was already the closing section on a live page. A new component
  claiming it would have restyled the footer area of a page nobody asked to touch.
- `.sr-mi-card` and `.sr-mi-grid` are shared across two member pages, so
  restyling one restyles the other. That is now a permanent constraint.
- The method page mockup arrived with **51 of 53 generic classes** — including
  `.wrap`, `.sec`, `.cta`, `.two`, `.big` and `.small`. Every one was a live
  collision waiting to happen.

#### Before shipping any new component

1. Grep the repo for each class name you intend to use.
2. If it appears anywhere, rename yours.
3. If it appears nowhere but has no `sr-xx-` prefix, rename yours anyway.

### Rule — never modify a shared selector to fix one page

If a rule is used by more than one page, **add a scoped rule rather than editing
the shared one.** Changing `.sr-mi-card` to fix the coming-soon page changes the
frameworks page, which is a page nobody asked to change.

When a page needs a different presentation, **swap its markup onto a different
namespace** rather than restyling the shared one.

### Rule — no member telemetry, ever

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

### Rule — error monitoring is opt-in per surface, and scrubs by default

Error monitoring may run on **public marketing pages**. On member surfaces it
either scrubs aggressively or is not deployed.

Default Sentry configuration captures form field contents, full URLs and
breadcrumb text. On a page where someone is writing about shame, that is the most
sensitive data the platform holds.

Use `js/sentry-init.js` as delivered. **Do not simplify it** — every exclusion in
it is deliberate.

## Definition of done
