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
