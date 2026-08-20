# Run A — SR-105, SR-108, SR-106

Branch: `fix/css-ownership-and-covers`
Base: `76c5212` (= `origin/main`, PR #24 merge). SR-096 present as `a7a4916`. Base verified
before any edit; not stale.

Verification surface: `dashboard.html` rendered at 1440 via `tools/serve.py` on :8642.
A `tools/serve.py` from an earlier run was already bound to 8642 and serving this repo —
confirmed by fetching `/css/saferise-dashboard.css` and matching the file header — so it
was reused rather than restarted.

---

## SR-105 · Stylesheet load order on dashboard.html

### Step 1 — audit before editing

Both sheets were parsed (comments stripped, grouped selectors split, at-rule context
tracked). Three passes were run, because exact selector-string matching alone would miss
rules that hit the same elements through different selector text:

| pass | method | result |
|---|---|---|
| exact selector string | 1247 system selectors vs 551 dashboard selectors | **5 overlaps** |
| class-level | every class touched by both sheets, filtered to classes present in `dashboard.html` | **4 classes** |
| bare element selector | tag selectors declared in both | **1 (`section`)** |
| `:root` custom properties | property-name collisions between the two token blocks | **0** |

`:root` deserves its own line: the two sheets appear to overlap on `:root` but define
**disjoint** property namespaces — system owns `--sr-*`, dashboard owns `--bg/--gold/--text/…`.
Zero property-name collisions, and dashboard already *consumes* a system token
(`--accent: var(--sr-track01)`). The `:root` overlap is therefore nominal, not real.

### Step 2 — every real overlap, who wins today, who wins after

| # | selector | today (dashboard last) | after swap (system last) | real? |
|---|---|---|---|---|
| 1 | `section` | `padding-block:0` (dashboard) | `padding-block:clamp(72px,9vw,128px)` (system) | **YES — load-bearing** |
| 2 | `.eyebrow` | `letter-spacing:.24em` (dashboard) | `letter-spacing:.38em` (system) | **YES — 2 of 7 instances** |
| 3 | `.sr-cover` | `background:#0C0C14` (dashboard) | `background:none` (system) | **YES — 1 declaration** |
| 4 | `*` (reduced motion) | `transition:none!important` (dashboard) | `transition-duration:.01ms!important` (system) | no — equivalent effect |
| 5 | `.is-next`, `.open` | — | — | no — see below |

**#1 `section` is the dangerous one.** `css/saferise-dashboard.css:39` is a documented
deliberate reset from SR-048; its own comment states it removed *2048px of dead space
across nine sections* and that "Cascade order carries it; no `!important` needed." The swap
removes exactly the mechanism that comment relies on. Left alone, the swap re-opens SR-048.

**#2 `.eyebrow`** — 7 instances in the markup. Four sit inside `.sr-dash-sechead`, protected
by `.sr-dash-sechead .eyebrow` (0,2,0); one (`.sr-dash-entryhead`) has its own rule. The
remaining two (`.sr-begin-head`, and the one inside `.sr-dash-foldbtn`) are matched only by
the bare `.eyebrow` rule at equal specificity (0,1,0), so order alone decides them.

**#3 `.sr-cover`** — the case the register named. Only one declaration actually conflicts:
`background`. Every other shared property carries an identical value (`display`, `border`,
`padding`, `text-align`, `cursor`), and dashboard's `position:relative`, `overflow:hidden`
and `min-height` are untouched by the system sheet. Worth recording: the system sheet's
`flex:0 0 clamp(212px,19vw,262px)` and `transition:transform .38s` **already apply today**
(computed `flex: 0 0 262px`) because the dashboard sheet never declares them — that is
pre-existing, not introduced by this swap.

**#4 `*`** — both sheets kill motion under `prefers-reduced-motion`, by different
declarations with the same effect. No action. (Per CLAUDE.md reduced motion is handled
centrally in the system CSS; the dashboard's copy is redundant but harmless, and removing
it is out of scope for this run.)

**#5 `.is-next` / `.open`** — these look like overlaps at class level but are not. The
system rules are all compounds anchored to `.sr-sec-box`, `.sr-logdrop`, `.sr-journal`,
`.sr-player` or `.proto-item`; the dashboard rules are anchored to `.sr-dash-card` and
`.sr-dash-fold`. `dashboard.html` contains **zero** occurrences of `sr-sec-box` and
**zero** of `proto-item`, so the system compounds never match on this page. No conflict.

### Step 3 — stop-and-report gate

Four overlaps, three of them single-declaration. That is a handful, not a redesign, so the
run continued. The count stayed small only because the two sheets are genuinely well
namespaced (`sr-dash-*` vs `sr-*`); the audit did not have to hunt.

### Steps 4–5 — the swap, and what it took to keep it neutral

`dashboard.html` now loads `saferise-dashboard.css` first and `saferise-system.css` last.
Three declarations were re-anchored so they survive the new order. **No `!important` was
added.** All three use raised specificity:

| declaration | was | now | why this selector |
|---|---|---|---|
| section padding reset (SR-048) | `section` (0,0,1) | `body section` (0,0,2) | beats system's `section` on specificity, so order stops mattering |
| `.eyebrow` tracking | `.eyebrow` (0,1,0) | `body .eyebrow` (0,1,1) | system's `.eyebrow` is equal specificity, so only order separated them |
| `.sr-cover` ground | `.sr-cover` (0,1,0) | `body .sr-cover` (0,1,1) | holds `background:#0C0C14` against system's `background:none` |

Specificity was chosen over moving the rules because these are *page-scoped overrides of a
shared system*, which is what specificity is for; moving them into the system sheet would
put dashboard-only decisions in the file that four other pages read.

**Both** `.sr-cover` rules were bumped, not just the first. The base rule sets
`min-height:300px` and a later top-level rule overrides it to `340px`, both originally at
(0,1,0) and separated only by source order. Bumping only the base rule would have made
`300px` beat `340px` and quietly shortened the Clearing cover by 40px. Bumping both keeps
them at equal specificity so their relative order still decides, and
`.sr-begin-card--media .sr-cover{min-height:280px}` (0,2,0) still beats both below 1100px.
This was caught while writing the change, not by the render.

### Verification

Rendered at 1440 before and after. Rather than eyeballing two screenshots — the hero is an
autoplaying carousel, so consecutive loads are never pixel-identical — every element in the
page was probed and diffed: position, size, padding, margin, letter-spacing, font-size,
background-color and color, for all **924** elements under `<body>`.

```
before: 924 elements, scrollHeight 4217
after:  924 elements, scrollHeight 4217
differing rows: 5
```

All five differences are the hero carousel's own rotation state — the `on` class sitting on
slide index 61 instead of 51, and the active dot (20px wide, gold) at a different index.
No geometry, spacing, type or colour difference anywhere on the page. **The swap is
behaviour-neutral.**

Syntax checked after the edit: 1 inline block (77,324 chars) and `content/tracks.js`
(56,655 chars) both parse clean; console reports zero errors on load.

> Note on tooling: `node` is not installed on this machine, so `node --check` could not be
> run as the brief specified. Syntax was verified instead by parsing each block with the
> browser's own JS parser via `new Function(src)`, which rejects exactly the same syntax
> errors without executing the code, backed by a zero-error console check on a real load.

### Two verification traps hit along the way — both invalidated a result before it was used

1. **A stale server from a previous run was serving different files.** Port 8642 was already
   bound by a `tools/serve.py` whose working directory was
   `…/93335e08-…/scratchpad/mirror` — a *previous session's* mirror. Its `dashboard.html`
   and `saferise-dashboard.css` hashed differently from this branch's `HEAD`. The first
   "before" screenshot captured that foreign copy. It was discarded, the stale process
   stopped, and a mirror of *this* working tree served instead. Checking `lsof` on the
   listening PID is what surfaced it; the page looked plausible, so nothing else would have.
2. **The browser cached the stylesheets across the swap.** The second attempt showed the
   `<link>` order changed in the served HTML while `document.styleSheets` still reported the
   old order and the `body`-prefixed rules were absent from the parsed sheet — the CSS was
   being served from cache. Left undetected this would have reported "no visual change" for
   the wrong reason. The mirror sync now stamps a unique `?v=` on every local css/js
   reference (in the mirror only, never in the repo) so a stale sheet cannot be served.

The uncached, correctly-sourced run is the one reported above. Worth recording that the
intermediate run with the swap applied but the overrides still cached showed exactly the
predicted damage — `padding-top:128px` on all eight sections, `scrollHeight` 4217 → 6435
(+2218px), eyebrows at 4.18px, cover background transparent. That is what SR-105 would have
shipped without the three re-anchored rules, and it is the SR-048 regression returning.

Note the preview sandbox cannot read the project directory at all (`Operation not
permitted`), which is why a scratchpad mirror is required here — the previous run's mirror
existed for the same reason.

---

## SR-108 · Track accent token conflict — STOPPED, NOT EDITED

**No code was changed for this item.** The brief describes a file and a mechanism that do
not exist in this repository, and the real conflict is roughly two orders of magnitude
larger than "alias two variables". Reporting instead of improvising, per the run's standing
constraint.

### What the brief expected vs what is actually here

| brief | reality |
|---|---|
| file `saferise-plans-v1.html` | **does not exist** — not in the working tree, not in any of the 20 local/remote branches, and never added in any commit (`git log --all --diff-filter=A --name-only` matches nothing containing "plan") |
| custom properties `--t2` / `--t4` | **do not exist** — zero occurrences of `--t2`/`--t4` anywhere in any `.html`, `.css` or `.js` |
| "two files define the same track accents" | the split is between **`css/saferise-system.css`** and **`index.html`**, and `system.css` carries *both* palettes itself |
| fix = alias two vars | would require rewriting **~183 hardcoded hex literals in `index.html`** |

### Step 1 — every definition of track accent colours in the repo

The canonical tokens have exactly **one** definition site, so there is no third *token*:

```
css/saferise-system.css:42   --sr-track01:#D4A843;
css/saferise-system.css:43   --sr-track02:#FF6FA8;
css/saferise-system.css:44   --sr-track03:#5BC8D8;
css/saferise-system.css:45   --sr-track04:#B57BFF;
```

Consumers of those tokens: `dashboard.html` (11), `css/saferise-method.css` (2),
`css/saferise-dashboard.css` (2). Note the dashboard is the *only* page wired to them.

But the accents also exist as a second, **hardcoded** palette, and that one is far more
widely used:

| track | system token | hardcoded alternate | alternate occurrences |
|---|---|---|---|
| 01 Personal Transformation | `#D4A843` | `#D4A843` | **no conflict — they agree** |
| 02 Relationship Healing | `#FF6FA8` | `#E87090` | 26 in `index.html`, 2 in `system.css` |
| 03 Professional | `#5BC8D8` | `#38C8BE` | 78 in `index.html`, 2 in `system.css` |
| 04 Elevation | `#B57BFF` | `#9B7FD4` | 79 in `index.html` |

### Step 2 — Tracks 01 and 03, as instructed

The brief was right to ask. **Track 03 conflicts too** (`#5BC8D8` vs `#38C8BE`, 78
occurrences) — it was simply not spotted when the register entry was written. **Track 01
agrees** across both palettes at `#D4A843`, so it is the only clean one.

### The third definition the brief suspected — it is inside system.css itself

`css/saferise-system.css` does not merely disagree with another file; it **contains the
competing palette**, with a comment explaining why:

```
844  inline on the .prog-overlay root (rose #E87090 for couples,
845  teal #38C8BE for corporate) — one shared rule renders in each
...
863  .sr-cover-rose{--c1:#3A0F1E;--c2:#E87090;--c3:#1A0509}
864  .sr-cover-teal{--c1:#06282A;--c2:#38C8BE;--c3:#031415}
```

So "system.css is the source of truth and wins" does not resolve anything on its own: the
source of truth currently states both values. `--sr-track02` is `#FF6FA8`, while
`.sr-cover-rose` — the cover treatment for the same Relationship Healing track — is
`#E87090`. Whichever palette is chosen, `system.css` has to be made self-consistent first.
That is the part the register entry does not account for.

### Why this stopped

The instructed action ("point the plans page at the system tokens; alias `--t2` rather than
renaming call sites") has no target. The nearest real equivalent is replacing ~183 hardcoded
literals across `index.html` — the main marketing page, which is **not** one of this run's
two verification surfaces, and whose program overlays (`#prog-couples`, `#prog-corporate`,
`#prog-elevation`) set accents inline on their roots. That is a different change with a
different blast radius, and the run's constraint is explicit: do not expand scope inside the
run.

### For Andre — the decision this actually needs

The resolution rule ("system.css wins") is sound but under-specified here. Someone has to
decide **which of the two palettes system.css should hold**, because it currently holds both:

- The `--sr-trackNN` values (`#FF6FA8`, `#5BC8D8`, `#B57BFF`) are the more saturated set and
  are live on **one** page (the dashboard).
- The hardcoded values (`#E87090`, `#38C8BE`, `#9B7FD4`) are the softer set and are live
  across **index.html**, i.e. everything a visitor currently sees.

As instructed, no values were changed and no aesthetic call was made. Stating the honest
observation the brief asked for: rendered on the marketing page's ground, the softer set is
the one the whole site is already built around, and adopting the `--sr-trackNN` values would
re-tint ~183 literals across `index.html` rather than nudging two hues. The brief predicted
"accents should shift hue slightly; nothing else should move" — that prediction holds for a
plans page that does not exist, not for `index.html`. **Andre's call.**

Suggested split for a later run, once the palette is chosen:
1. make `css/saferise-system.css` internally consistent (`--sr-trackNN` vs `.sr-cover-*`);
2. replace `index.html`'s literals with `var(--sr-trackNN)` — mechanical but wide, and it
   needs `index.html` as its verification surface.

---

## SR-106 · Ten protocol covers load eagerly — ALREADY FIXED, plus one self-caught defect

**Net code change: none.** One edit was made, verified, found to introduce a latent defect,
and reverted. Details below, because the defect is the useful part.

### Step 3 first — markup or injected?

Injected. The carousel is built in the inline block at `dashboard.html:930-941`; each card's
`<img>` is assembled as a string and the row is filled via `row.innerHTML`. The attribute
therefore belongs on the creating code, not on markup — which is where it already is.

Also worth knowing: `row.innerHTML = t.items.length > 3 ? CARDS + CARDS : CARDS` renders
**two** identical sets for the seamless loop, so there are **20** `<img>` elements for 10
covers, not 10.

### The register's premise does not hold

> "The dashboard requests all ten covers … with no `loading="lazy"` on the below-fold ones."

`loading="lazy"` is on **every** carousel cover, and has been since `c35c923`
(*feat: SR-044 add member dashboard*). It is present in this run's base commit `76c5212`.
All 20 injected images carry it. Measured, cold, caching disabled at the server:

| | 1440×900 | 375×812 (mobile) |
|---|---|---|
| requests on load | 6 → **5** cover-free | 6 |
| **cover requests on load** | **1** | **1** |
| **cover bytes on load** | **0** | **0** |
| carousel row position | 153px below fold | 1070px below fold |
| after scrolling to the carousel | **10 covers, 1,416,905 bytes** | — |

So the ~1.5 MB in the register is real (1.35 MB measured), but it is **already deferred
until scroll**, at desktop and mobile alike. The item as written is complete.

The single cover requested before any scroll was **not** a carousel cover — it was the cue
card's, at `dashboard.html:717`, the one `<img>` on the page without the attribute.

### Why the register got it wrong — and why I nearly did too

Lazy-loading measurements are extremely sensitive to tab state, and I produced the register's
wrong answer twice before getting a trustworthy one:

- In a **reused** tab that had already been scrolled, all 11 cover requests appeared on load
  and every `transferSize` read `0` — memory-cache reuse being replayed as fresh requests.
- At mobile in that same tab, all 10 covers reported as loading on load *with full byte
  counts*, despite the row sitting 1070px below the fold — which is not physically possible
  for a working lazy image and was the tell.

Only a **brand-new tab**, sized before navigation, with the server sending
`Cache-Control: no-store`, gives a stable reading: 1 cover request, 0 cover bytes, at both
widths. Any future measurement of this should use a fresh tab or it will reproduce the
register's error.

### Step 1, as instructed — and the defect it turned up

Following the brief ("add `loading="lazy"` to every cover below the fold"), the cue-card
cover at `:717` was the only candidate. It sits inside `.sr-modal{display:none}`
(`saferise-dashboard.css:696`), is never seen until a click, and was being fetched on every
page load. Adding the attribute did exactly what was wanted — cover requests on load went
**1 → 0**, total requests **6 → 5**.

Then the attribute was checked rather than assumed, with a control:

| image | placement | while modal hidden | **after modal opens** |
|---|---|---|---|
| A — `loading="lazy"` | inside `.sr-modal{display:none}` | not requested | **still never requested** |
| B — no attribute (control) | same place | requested immediately, `naturalWidth 900` | loaded |

A was still unrequested six seconds after the modal opened, while fully laid out and visible
at 280×568 within the viewport. **`loading="lazy"` on an image that begins inside a
`display:none` ancestor prevents it from ever loading, including after the ancestor becomes
visible.** The lazy-load observer never re-arms for an element that had no box when it was
registered.

The edit was therefore **reverted**. It would have traded one wasted request per page load
for a cue card that renders no artwork at all — and it would have looked harmless in review,
because that image is *already* broken for an unrelated reason (below), so nothing on screen
would have changed. That is precisely the kind of change that survives review and fails
later.

The correct fix for that one image is to assign `src` when the modal opens, which is a
restructure the brief explicitly rules out ("Lazy-loading is the whole fix. Do not
restructure them."). Left alone and reported instead.

### Not fixed, needs registering — the cue-card cover points at a deploy preview

`dashboard.html:717` hardcodes an absolute URL to a Netlify **deploy preview**:

```
https://deploy-preview-14--the-saferise-protocol.netlify.app/assets/covers/01.jpg
```

It is the only external asset the dashboard requests, it fails to load in local rendering
(`naturalWidth 0`, hidden by its own `onerror`), and the identical file exists in the repo at
`assets/covers/01.jpg`. A deploy-preview host is not a durable address — preview 14 will
eventually stop resolving. Not changed here: swapping the source changes what renders, which
is outside a lazy-loading fix. Worth its own SR.

### The real remaining win on mobile, for a later run

The covers are served at their full size — 900px wide, 115–205 KB each — into cards that
render at **174×233 CSS px**. The repo *already contains* the responsive variants:

```
assets/covers/01.jpg 145,031   01-640.jpg 43,837   01-320.jpg 14,636
assets/covers/01.webp 34,548   01-640.webp 20,872  01-320.webp 8,110
```

`01-320.webp` is **8,110 bytes against 145,031** — a 94% reduction, and 320px still covers a
174px card at DPR 2. Wiring `srcset`/`<picture>` to the existing variants would cut the
carousel's 1.35 MB to roughly 100 KB. That is the mobile win the item was reaching for, it
needs no new art, and it is a bigger effect than lazy-loading. Out of scope for this run —
the brief says lazy-loading is the whole fix and not to restructure the covers — so it is
recorded, not done.

---

## Run summary

| item | outcome |
|---|---|
| **SR-105** | **done** — committed `95592fc`, verified behaviour-neutral across all 924 elements |
| **SR-108** | **stopped, not edited** — target file does not exist; real conflict is ~183 literals in `index.html` and `system.css` holds both palettes |
| **SR-106** | **already fixed** in the base commit; one attempted addition reverted after it was shown to break the image permanently |

Nothing was pushed, merged or opened as a PR; no branch was switched. `.claude/launch.json`
was repointed at a scratchpad mirror during rendering (the preview sandbox cannot read the
project directory) and **restored to its committed contents** before each commit.

### Raised by this run, for the register
1. Cue-card cover hardcodes a Netlify deploy-preview URL (`dashboard.html:717`) — external,
   currently failing, local file exists.
2. `loading="lazy"` cannot be used on any image inside `.sr-modal{display:none}` — it never
   loads. Applies to any future modal artwork, not just this one.
3. Covers are served at 900px into 174px cards while 320/640 JPEG and WebP variants already
   exist unused — ~94% saving available.
4. Track 03 accent conflicts (`#5BC8D8` vs `#38C8BE`, 78 occurrences) — missed by SR-108's
   entry, which names only 02 and 04.
