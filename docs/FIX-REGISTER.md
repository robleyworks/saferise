# Fix register

`SR-0NN` IDs referenced by commits and by code comments. Until now these
lived only in commit messages; this file is the index.

Entries are either **fixed** (shipped, recorded for traceability) or **open**
(a constraint or a debt that outlives the branch that found it). Open entries
are not TODOs to be closed quietly — they change what later work is allowed
to assume.

---

## Open

### SR-037 · Track 01 is 92 resources, not 89
**Found:** `feat/resource-reader` · **Affects:** anything counting or iterating Track 01 resources

`READER_PROTOCOLS` lists 82 Track 01 keys statically. A tenth resource,
`p<N>-decision` ("The Decision", Identity & Embodiment), is spliced into
**every** Track 01 protocol at runtime by the identity layer
(`index.html`, the `Object.keys(IDENTITY_DATA).forEach` block that ends in
`proto.keys.splice(insertAt, 0, key)`). It is inserted before the first key
matching `crisis` or `support`, so it lands between disclosure and the crisis
card.

The real total is **92**. Any count derived by reading the source array is
wrong by ten. Count at runtime, after the identity layer has run.

### SR-038 · Widget hydrators are coupled to the Reader's DOM contract
**Found:** `feat/resource-reader` · **Affects:** any future work on any reader surface

Resource bodies are not self-contained. Several ship empty or partial in
`RESOURCE_CONTENT` and are filled in afterwards by scripts that query the
Reader's DOM directly:

- **7** script blocks monkey-patch `openReader()`; **7** patch `selectReaderTab()`
- **115** references to `data-reader-page`
- **106** references to `.reader-page-body`
- **6** `querySelectorAll('.reader-page')` hydrators

`p<N>-decision` is the extreme case: it ships as `body:['']` and gets all
~3,800 characters of its content from `hydrateDecisionPages()`. The founder
video, protocol-guide video, evidence cards, resource rows and the
reference-case person card are all hydrated the same way.

**Constraint:** a new reader surface must either preserve the inner contract
`.reader-page[data-reader-page] > .reader-page-body` **and** let content be
built through `openReader()`, or port seven layers of hydration. The
standalone reader (SR-034) does the former — it calls `openReader()`, un-shows
the overlay in the same synchronous turn, and relocates the built node. Do not
"simplify" that indirection away; it is the only reason the reader renders
anything but empty pages.

### SR-039 · 91 eyebrow labels outstanding
**Found:** `feat/resource-reader` · **Owner:** copy, not engineering

`READER_META_COPY` carries the written eyebrow chain for **p1 only** (nine
labels: origin, practise, understand, recognise, release, choose, tell,
become, carry). The other **91** resources across p2–p10 have `eyebrow: null`
and fall back to the resource's kind label, which renders correctly but does
not chain down the rail as an argument the way p1 does.

Eyebrow copy is register-sensitive and is written by hand. It is deliberately
**not** generated. Do not derive it.

### SR-040 · No PDF assets exist
**Found:** `feat/resource-reader` · **Affects:** the reader's download region

The repo contains **zero** `.pdf` files, though resource metadata advertises
them ("PDF · 4 pages · Printable") and a `.pdf-placeholder` component exists.
`readerMeta().hasPdf` is therefore `false` for all 92 Track 01 resources and
the download region does not render at all — no disabled state, no
placeholder. It begins rendering on its own once `hasPdf` can return true.

### SR-041 · node and Playwright are not installed
**Found:** `feat/resource-reader` · **Affects:** what verification can claim

Neither `node` nor Homebrew is present on the development machine, so the
brief's `node --check` and "Playwright over screenshot QA" cannot run.
Verification for SR-032/033/034 used the in-app browser instead: inline
scripts were parsed by loading the page and reading the console, and
behaviour was driven programmatically rather than by screenshot comparison.

Two environment facts worth keeping, both of which produced misleading
readings before they were understood:

- **CSS transitions do not advance while the browser pane is backgrounded**,
  and `requestAnimationFrame` never fires. Measure end states with
  transitions suppressed rather than trusting timed reads.
- Scrolled screenshots can composite stale while the pane is hidden. An
  unscrolled capture is trustworthy; a scrolled one may not be.

### SR-042 · Safari is untested; there is no cross-browser coverage
**Found:** `feat/resource-reader` · **Affects:** every visual and behavioural claim made so far

A gap, not an oversight. Playwright's absence ([[SR-041]]) means everything
verified for SR-032 through SR-036 was verified in **one** Chromium-based
browser pane. This product is Safari-primary and mobile-first, so the browser
that matters most is the one with no automated coverage at all.

Specific things in this branch that are worth a careful manual Safari pass:

- `:has()` — used for the page-padding reduction and for
  `html:has(body.rd-soft)`. Supported in current Safari; the overscroll
  colour rule in particular has no fallback.
- `display:contents` on `.sr-main` / `.sr-utility` below 780, which is what
  produces the entire mobile stacking order.
- `background-attachment` / fixed-layer behaviour on `.sr-sky` during scroll,
  historically a Safari weak point.
- The 6.5s/8s Sunrise transition in motion — never observed running in **any**
  browser (see [[SR-041]]).

Manual Safari testing before merge was planned by the author of this branch's
review; this entry exists so the gap is recorded rather than assumed closed.

### SR-043 · The approved mockup carries both defects fixed in SR-036
**Found:** `feat/resource-reader` · **Affects:** anyone integrating from the mockup again

`SafeRise-Resource-Reader-v2-FINAL.html` still contains both defects that
SR-036 fixed in the repo. Working from that file again will reintroduce them:

1. The enclosure is a `<section>`. Harmless in the standalone mockup, which
   has no bare-`section` styling; in this repo `section` is a page-section
   primitive carrying `border-top:0!important` and
   `padding-block:clamp(72px,9vw,128px)`, which strips the enclosure's top
   border and injects 72px of dead space above the cover.
2. The `@media(max-width:780px)` block assigns an order to every region
   except `.sr-close`, leaving the journal block at the flex default of `0`
   so it renders above the cover — first thing on the page. §3 puts it at the
   foot of the centre column.

Neither is visible in the mockup itself, which is why both survived sign-off.
The repo is correct; the mockup is not. Fix the mockup, or treat these two
points as known corrections on every future pass.

### SR-045 · Sunrise sky layer never paints; approved look is the flat surround
**Found:** `feat/resource-reader` · **Affects:** §4, and any future Sunrise work

**Revisit deliberately. This is a design decision, not an integration fix.**

`.sr-sky` has never painted — not in this repo, and not in the approved mockup
either. It is a child of `<body>` at `z-index:-1`, and `body.rd-soft` carries an
opaque `background-color:#354268`. A stacking context paints negative-z children
*before* in-flow backgrounds, so body's own background covers the sky
completely. Verified by toggling `.sr-sky` off in
`SafeRise-Resource-Reader-v2-FINAL.html`: the rendering is pixel-identical.

Origin, per the brief's author: `body.rd-soft{background-color}` was added to
fix a white band on long scrolls, and the sky was never re-verified afterward.
So §4 describes a layer — warm sun radial at top centre, vignette holding night
at the periphery, blue vertical run `#647496 → #354268`, 6.5s opacity / 8s
transform — that has never been on screen. **What was approved visually is the
flat `#354268` surround.**

SR-044 matches that approved rendering deliberately: the sky element was moved
back to `<body>` (it had drifted inside `#prog-personal`, where it *was*
painting and washing every translucent panel pale), and the overlay is themed
to the same `#354268`.

Making the sky genuinely visible is not a small change. The panels are
translucent — `--recess: rgba(24,30,60,.2)` — and read as recessed only because
they sit on a flat dark ground. Over a live gradient they lift and wash out,
which is exactly the defect SR-044 fixed. Doing it properly means opaque panels
and a fresh pass over every Sunrise surface.

Two of the three transitions §4 describes do work: the surface transitions on
panels, hairlines and text, and `.sr-cover-sun`'s wash over the cover. Only the
sky itself is inert.

---

## Fixed

| ID | Summary |
|---|---|
| SR-002 | Bound Source Insights title; added the Anxiety Reset attention advisory to per-protocol data. Supersedes any source claiming p1 has no advisory — seven protocols have one, not six. |
| SR-027 | Track 01 protocol page brought to the approved mockup. |
| SR-029 | Empty WATCH pane replaced with an honest "not yet available" state. |
| SR-030 | Go Deeper card subtitles unified with Reader titles. |
| SR-031 | Founder video title grammar fixed for p4 and p10. |
| SR-032 | Resource reader CSS (B18) + nav theming. `.sr-cover`/`.sr-head` renamed to `.sr-rdcover`/`.sr-rdhead` to clear live collisions. |
| SR-033 | Reader data: advisory/repair moved before disclosure; `p2-crisiscard` made reachable; `READER_META` scaffold added. |
| SR-034 | Standalone resource reader page for Track 01, theme layer, guidance light. |
| SR-035 | §6 back link: both pages share one position, size and type; reader break-out to the banner's 1100px column. |
| SR-036 | §7 verification: enclosure was a bare `<section>` (lost its top border, gained 72px dead padding); journal block rendered first below 780. |
