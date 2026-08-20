# SafeRise — fix register

Canonical record of defects and design decisions. Commits reference the ID:
`fix: SR-0NN …` or `feat: SR-0NN …`.

**Rules**
- Never renumber an existing ID.
- New items go at the bottom of their severity block with the next free number.
- The number is global — it does not restart per block.
- Items are marked complete when the branch carrying the fix merges to main, not
  when the commit is made.
- Highest ID currently issued: **SR-119**. Ceiling of the current reservation: **SR-120**.
- **SR-096 to SR-119 are issued.** Reserved 19 Aug 2026 for the index.html / entity /
  noindex pass, which allocated from SR-096; the block was then drawn down further by the
  accents/rails/a11y run (SR-108, SR-109) and the track-pages/audit run (SR-110 to
  SR-119). All are written up below. The previous block ran out mid-pass, which is what
  that reservation was for.
- **SR-114, SR-116 and SR-120 were never issued and are free.** They are gaps inside a
  range other branches have already read past, so allocate **SR-120** — the top of the
  reservation — before reaching back for SR-114 or SR-116. Taking a number out of the
  middle of a read range is what caused the three collisions described below.
- **SR-085 to SR-095 are issued** by the correctness pass and written up below. The
  three findings that pass had no ID for — recorded inside SR-092 and SR-093 — are
  now issued as SR-104, SR-105 and SR-106. SR-096 to SR-103 and SR-107 are issued by
  the index.html / entity / noindex pass.
- **SR-073 and SR-081 to SR-084 are reserved, not yet issued.** SR-068 to
  SR-072 were taken on 19 Aug 2026 for the modal-shell work and are written up
  below. SR-073 was raised in that pass and then found to be already fixed by
  32238c1, so it was never issued and the number is free. SR-074 to SR-083 are
  taken for the content-consolidation pass, and the block runs to SR-095 to
  leave headroom.

  IDs collided three times because parallel branches each read this ceiling and
  allocated from it at the same moment; reserving the range up front is what
  stops the fourth. A gap between the last written entry and this ceiling is
  expected — do not "tidy" it by lowering the number, and do not allocate
  inside the reserved range from another branch.

*Note: IDs SR-001 to SR-043 were tracked in an earlier artifact and covered work that
has since shipped. Numbering continues from SR-044 so no ID is ever reused.*

---

## BLOCKER

*None open.*

---

## HIGH

### SR-045 · Track accent tokens conflict between design system and dashboard
`css/saferise-system.css` defines `--sr-track02:#FF6FA8`, `--sr-track03:#5BC8D8`,
`--sr-track04:#B57BFF`. The member dashboard defined a parallel set `--t2:#E87090`,
`--t3:#4E9AA6`, `--t4:#9B7FD4`. `--t1` and `--sr-track01` agreed at `#D4A843`.
A member moving between the marketing site and the dashboard would see the same track
in two different hues.

**Resolution.** System values adopted as the single source of truth. Dashboard
duplicates removed; `saferise-system.css` now loads in `dashboard.html` before the
dashboard stylesheet. If a hue reads wrong on the dashboard's darker ground, change it
in `saferise-system.css` so both surfaces move together — never fork it back.

`--t1`–`--t4` deleted from the dashboard's `:root`; all ten usages repointed to
`var(--sr-track01..04)` across `css/saferise-dashboard.css` (the `--accent`
default) and the `TRACKS` / `JOURNEY` objects in `dashboard.html`. Loading the
system sheet exposed [[SR-048]].

*Status:* complete · *Raised:* 17 Aug 2026 · *Merged:* 17 Aug 2026

### SR-046 · Class collisions between dashboard, index.html and the design system
- `.sr-hero`, `.sr-hero-title`, `.sr-hero-sub`, `.sr-hero-cta` are defined in both
  `index.html`'s inline style and the dashboard CSS, with different geometry.
- `.sr-player` carries 15 rules in `saferise-system.css`, including descendant
  selectors such as `.sr-player .exp-tabs`. The dashboard defines its own
  `.sr-player`.

Both were inert only because the two stylesheets never loaded together — a condition
SR-045 removes. Precedent: `.sr-dash-next`, dead code from a removed column, silently
restyled the carousel's next arrow into a 62×46 oval and went undetected until it
rendered.

**Resolution.** Dashboard classes namespaced to `sr-dash-hero*` and `sr-dash-player*`.
`index.html` and `saferise-system.css` untouched.

23 tokens renamed, 70 occurrences across `dashboard.html` (34) and
`css/saferise-dashboard.css` (36). The renames include the JS string literals
that build the hero slides and the `querySelectorAll('.sr-hero-slide')` /
`'.sr-hero-dot'` lookups, which is where a partial rename would have passed
static inspection and broken the slider at runtime. Verified live: four slides, four
dots, both arrows, dot↔slide index in sync, arrow wrap at both ends, and the
Clearing cover still opens `#mMedia` with `.sr-dash-player` styled by the
dashboard sheet.

*Status:* complete · *Raised:* 17 Aug 2026 · *Merged:* 17 Aug 2026

### SR-058 · Porges page rests on a live, unresolved scientific dispute
`method-porges.html` section 04 reports the February 2026 *Clinical Neuropsychiatry*
exchange: Grossman et al., "Why the Polyvagal Theory Is Untenable" (23(1), 100–112),
and Porges's rebuttal in the same issue (23(1), 113–128). The dispute is live and
public, so the section is accurate today and will go stale without anyone noticing.

Two decisions are outstanding and neither is a copy edit. First, the page needs a
review date and an owner — a claim this load-bearing cannot sit unchecked. Second,
Porges is currently framework 01 of 06 and the lead credibility anchor for the whole
`/method` section; if the dispute resolves against the theory, cardiac coherence
(HeartMath) is the candidate to take that position, because it carries the one
specific empirical claim SafeRise makes.

Section 04 and the sources list are not to be edited outside this item. Every
citation was verified against the published record; changes go through the register.

*Status:* open · *Raised:* 18 Aug 2026

### SR-060 · Duration-free copy rule
No page states or implies a session length — no "10 minutes", no "ten-minute", no
"≈10 min", no runtime on a player. Session lengths vary by protocol and by track, and
the real figures are not known until the recording sprint is complete. The rule holds
across all pages until every meditation audio and video asset is finished; only then
is it revisited against actual runtimes. It is a factual-accuracy rule, not a style
preference.

`method.html` and `method-porges.html` are clean and carry an inline comment saying
why, so the rule survives the next person to edit them.

**Known pre-existing conflict, out of scope for this branch.** The Track 03 scripts are
all built to ≈10 minutes, and `SafeRise_Claude_Source_Lite.html` renders "10:00" on
every audio player. Both contradict this rule. They need their own item when that page
is next touched — do not fix them here.

*Status:* open · *Raised:* 18 Aug 2026

### SR-108 · Track accent tokens did not hold the values the site renders
[[SR-045]] made `saferise-system.css` the single source of truth for the four track
accents, but tokens 02/03/04 still carried the pre-consolidation hues while `index.html`
restated the shipped ones as colour literals. The token and the rendered pixel disagreed,
so anyone editing the token moved nothing.

**Resolution.** Tokens 02/03/04 repointed to the values the site actually renders; 183
literals in `index.html` converted to `var(--sr-trackNN)`; the cover helpers repointed at
the tokens. `index.html` verified value-preserving across 217,680 probed element-rows.
`dashboard.html` shifts 7/6/9 elements on tracks 02/03/04 — that shift is the correction,
not a regression. No contrast pair falls below 4.5:1.

Deliberately not converted: the accent `rgba()` restatements — `--sr-accent-wash`,
`--sr-accent-border`, the nav-tab `border-bottom-color` and several tinted panel grounds.
A hex token cannot go inside `rgba()`; closing those needs an `--sr-trackNN-rgb` channel
triple, which is its own item and was not invented here.

Shipped `b9e5ff5`, merged to main in `7ba529b`. Run B — `docs/runs/RUN-B-accents-rails-a11y.md`.

*Status:* complete · *Raised:* 19 Aug 2026 · *Entry written:* 20 Aug 2026

### SR-109 · The modal layer did not keep the promise `aria-modal` makes
Seven dialogs declared `aria-modal="true"` with no focus trap and no inert background, so
Tab walked straight out of the dialog into the page behind it. Six close buttons carried
no accessible name.

**Resolution.** Focus trap and background `inert` added to the shared modal controller —
one place, all seven dialogs. Six close buttons named. Verified by running the actual
keystroke sequence, and regression-checked across all seven dialogs.

**Part (c) did not reproduce and was not edited.** The brief placed the mis-wired
Elevation CTA in `index.html`; it is in `dashboard.html`, and `index.html`'s Elevation
waitlist is a real, working Netlify form. Carried forward and issued as its own item —
see [[SR-110]].

Shipped `f259e1e`, merged to main in `7ba529b`. Run B — `docs/runs/RUN-B-accents-rails-a11y.md`.

*Status:* complete · *Raised:* 19 Aug 2026 · *Entry written:* 20 Aug 2026

### SR-110 · Track 04 is hidden in the data and sold on every public surface
`TRACKS[4].visible` is `false`, and that flag is read in **exactly two places in the whole
repo** — [js/saferise-track.js:352](js/saferise-track.js:352) (`renderNav`) and
[js/saferise-track.js:399](js/saferise-track.js:399) (`renderTrack`). Both live in the
track-page renderer, loaded only by the three track pages. `index.html`, `dashboard.html`
and `protocol.html` never read it.

There is no routing layer to fix. The site is static HTML served directly; Track 04 has no
page of its own and therefore no route to remove. Every Elevation surface is hardcoded
markup or hardcoded JS inside three pages, so `visible: false` never had anything to act
on. `renderNav` additionally gates on `ROUTES[k]`, which has no key `4` — Track 04 is
excluded twice over on the surfaces that consult the data, and not at all on the surfaces
that do not.

**17 surfaces, inventoried by Run C** — `index.html` 13, `dashboard.html` 3,
`protocol.html` 1. Not routes: they include a live Netlify waitlist form
(`name="elevation-waitlist"`, real `onsubmit`), a seven-record block in `RESOURCE_CONTENT`,
a public pricing tier (`€222 one-time`), a column in the plan comparison table, a workshop
card, and three pieces of body copy naming Elevation inside sentences about other tracks.

Scope confirmed 20 Aug 2026 as **all 17**, not the bounded subset. A partial removal leaves
the site arguing with itself — a hidden track with a public price is a worse state than
either a shipped track or an absent one. The comparison table goes to three columns
(Personal Transformation, Relationship Healing, Professional Performance), equal widths,
Elevation-only rows removed entirely rather than left empty, and no "coming soon"
placeholder column: an empty row asks the reader what was there.

Full inventory with line numbers: `docs/runs/RUN-C-consolidated.md` §1e.

**Done so far — the dashboard waitlist CTA and its route (20 Aug 2026).** Carried in from
[[SR-109]] §c. `dashboard.html:919` rendered
`<a class="sr-dash-go" href="#">Tell me when it opens →</a>` inside the `.sr-dash-empty`
block, and `TEXTMAP` carried `[/tell me when it opens/i,'plans']`. The delegated handler
matches on **text content**, so the control that promised a waitlist opened the Plans
route dialog — *"Not built yet · Plans · /plans"*. Reproduced by clicking it before any
edit.

Both removed, not repointed: there is no waitlist to reach, and a control promising one
that does not exist is worse than no control. A comment in place records why, so the next
reader does not restore it.

**Inventory correction.** `TEXTMAP:1262` is not one of Run C's 17 surfaces — the §1e table
lists three dashboard surfaces (240, 862, 917–919) and the route row is documented only in
the prose below it. The real dashboard total is **4**, and the repo-wide total **18**, not
17. Counted here so the end-of-run reconciliation balances.

**Still open — 16 surfaces, Phase 4.** The `.sr-dash-empty` block still renders its `<h3>`
and a paragraph ending *"Opening after the recording sprint"*, which is an undated promise
and goes with the rest of the block.

**Done — 4a, the bounded removals (20 Aug 2026).** Overlay, four navigation entries, the
routes and data behind them, and the live Netlify form.

- `index.html` — the whole `#prog-elevation` overlay (52 lines: back button, hero and
  head mounts, seven `elev-` protocol cards, workshop/1:1 pair, waitlist panel and the
  form); the `tab-purple` nav tab and its "Soon" badge; the footer `<li>`;
  `SERIES_CONFIG.elevation`; the seven `elev-1…7` records in `RESOURCE_CONTENT`; the dead
  `#elevation-protoList.pcard-grid` rule.
- `dashboard.html` — the `data-track="4"` rail button and its "Coming soon" meta.
- `protocol.html` — the inert `Elevation Series` footer link.

**The Netlify form.** `name="elevation-waitlist"`, `data-netlify="true"`, honeypot
`bot-field`, POST to `/`. Confirmed by Andre as holding **no submissions**; that was taken
on his word, not independently checked — this run has no Netlify credentials and did not
attempt to acquire any. Removing the markup stops collection and drops the form from
Netlify's next build detection; it does **not** delete anything already collected. Any
submissions remain in Netlify's own store under the site's Forms tab until deleted there.
The unrelated `affiliate-application` form is untouched and still present.

`TRACKS[4]` in `content/tracks.js` untouched throughout.

**Exposed by the removal — reported, not acted on.** See `docs/runs/RUN-D.md` §4a for the
full list with line numbers. The two that matter:

1. **`showProg('elevation')` now blanks the page.** `showProg` hides `#main-content` and
   activates `prog-<id>`; with no such overlay it activates nothing, leaving a blank
   viewport. Three callers remain — the plans-strip panel, the plans card and the workshop
   card — all of them 4b/4c surfaces. Reproduced. **This branch must not merge between 4a
   and 4b.**
2. **`SERIES_CONFIG` existed only to drive the Elevation overlay.** The only
   `hero-mount-*` / `protocols-head-mount-*` / `whats-included-mount-*` elements in
   `index.html` were the three `-elevation` ones — verified against `HEAD` before the edit,
   so this predates this run. `SERIES_CONFIG`, `renderSeriesHero`,
   `renderProtocolBrowseHead`, `renderWhatsIncludedHTML` and the `DOMContentLoaded` mount
   loop are now a closed island of dead code (~110 lines). The other three tracks render
   their heroes from hardcoded markup and are unaffected. Whether it goes is Andre's call.

**Done — 4b, copy fragments and the pricing tier (20 Aug 2026).**

- `index.html` — the plans-strip Elevation panel (*"Coming Soon / Pricing TBA"*), the
  Track 04 plans card (*"Premium tier · Waitlist open now"*), the Elevation workshop card,
  and the `key.indexOf('elev-')` branch carrying **`'€222 one-time'`** — verified
  unreachable first: 112 `RESOURCE_CONTENT` keys, none beginning `elev-`, and zero
  `[data-resource^="elev-"]` in the DOM.
- Two sentences rewritten to name only shipping tracks: the workshops line now ends
  *"…Relationship from €139/couple."* — the *"Professional & Elevation workshops coming
  soon"* clause went **entirely** rather than being trimmed to "Professional", because it
  fails the no-undated-promises rule on its own; and the button now reads **"See all
  plans"**.
- `dashboard.html` — `ENTITLED[4]`, `TRACKMETA[4]`, `JOURNEY[4]` and the `.sr-dash-empty`
  branch. All four were unreachable once the rail button went, and the branch existed only
  to render Track 04: every shipping track carries ten protocols, so `items.length` is
  never 0. A comment records that a future empty track needs its own copy, not the retired
  one's.

Three four-column grids closed to three — `1.7fr 1fr 1fr 1fr` → `1.7fr 1fr 1fr`,
`repeat(4,1fr)` → `repeat(3,1fr)`, `1fr 1fr 1fr 1fr` → `1fr 1fr 1fr`. Each verified at 3
children / 3 tracks with Professional last and no empty cell. Two *other* `repeat(4,1fr)`
grids on the page are unrelated and were not touched — the edits are anchored by line, not
by pattern.

**`showProg` now guards.** It resolves `prog-<id>` **first** and returns if absent, instead
of hiding `#main-content` and then activating nothing. Before: `{active: [], main: "none"}`
— a blank viewport with no way back. After: `{active: [], main: ""}`. Verified for both
`elevation` and a nonsense id, with a real overlay still opening from the same state. Any
future hidden series hits the same lookup, so the guard is general rather than a patch for
this removal.

**Remaining: 4c only** — the comparison-table column. Exactly one rendered "Elevation" text
node survives in `index.html`, and it is that `<th>`.

*Status:* open — 4c (comparison table) only · *Raised:* 19 Aug 2026 · *Entry written:* 20 Aug 2026

### SR-115 · A dashboard cover loads from an ephemeral Netlify deploy preview
[dashboard.html:717](dashboard.html:717) sources a protocol cover from
`https://deploy-preview-14--the-saferise-protocol.netlify.app/assets/covers/01.jpg`. Deploy
previews are torn down; the member dashboard would show a broken cover the moment PR 14's
preview expires, and until then it makes the dashboard depend on a build of a branch.

Run C confirmed it at exactly that line and confirmed it is the **only** URL of that shape
in the repo — the two other grep hits are Run A's log describing it. The local
`assets/covers/01.jpg` exists.

**Resolution.** Replaced with `assets/covers/01.jpg` — document-relative, no leading
slash, no `./`, which is the convention every other asset reference on the page already
uses: `assets/dashboard/hero-corridor.jpg` at :106, `var COVER_01 = "assets/covers/01.jpg"`
at :784, `var BASE = 'assets/covers/'` at :1057. The page's own header comment at :13
already documented `assets/covers/01.jpg` as the intended path — line 717 was the single
survivor of the standalone-mockup era, when the file was reviewed outside the repo and had
no local assets to point at. One line changed; nothing invented.

Verified on a cold load (fresh tab, `no-store`, cache-busted, mirror served from the
working tree): the request resolves to `assets/covers/01.jpg` → 200, the image decodes at
900×1200, `onerror` does not fire, and the page issues **zero** requests to any
`netlify.app` host. The probe was proved live by repointing the same `<img>` at a
non-existent sentinel path — `naturalWidth` fell to 0 and the `onerror` handler set
`display:none` — then restored.

No `netlify.app` URL remains in any tracked non-doc file. The four remaining matches are
this register and the Run A / Run C logs describing the defect, which is historical record.

*Status:* complete on merge · *Raised:* 19 Aug 2026 · *Fixed:* 20 Aug 2026

---

## MEDIUM

### SR-047 · Mobile hero: theme toggle overlaps slide kickers below ~560px
At 390px the Midnight/Sunrise toggle occupies x 182–354, y 38–70. Hero kickers sit at
x 36, y 60–77. Slides 3 ("Opening 1 September") and 4 ("The SafeRise podcast") run
underneath it; slides 1 and 2 clear.

**Resolution.** Toggle leaves the hero below 560px and sits as a static right-aligned
row above it. Deliberately not fixed by reflowing the kickers — the hero is a rotating
slider, so clearance tuned to the current slides expires the moment a new one is added.

Implemented as a single `@media(max-width:560px)` block turning `.sr-themewrap`
static and right-aligned; the slider track then begins beneath it. Measured at
390px: toggle occupies y 22–66, track starts at y 66, and all four slides report
zero overlapping elements. At 561px the toggle is `position:absolute`, top 16px,
right 20px inside the hero — unchanged.

*Status:* complete · *Raised:* 17 Aug 2026 · *Merged:* 17 Aug 2026

### SR-048 · System stylesheet's section padding is additive on the dashboard
Loading `saferise-system.css` (see [[SR-045]]) exposes
`section{padding-block:clamp(72px,9vw,128px)}`, written for the marketing page's
full-bleed bands. The dashboard spaces its sections with `margin-top:56px`, so the
padding is purely additive: 128px top and bottom across nine sections took the page
from 4737px to 6785px.

Three other system rules also began matching and were measured as harmless:
`section{position:relative;z-index:1}` (no stacking regression — nav rail 50, modals
80, sections 1, and the Cue Card still resolves topmost), `.eyebrow{letter-spacing:.38em}`
(the dashboard's `.24em` wins by cascade order — computed 2.64px either way), and
`.sr-cover` (dashboard rules already win on every property that affects the render).
`section{border-top:0!important}` cannot be overridden, but no `<section>` in the
dashboard draws a top border, so it lands on nothing.

**Resolution.** Neutralised locally with `section{padding-block:0}` in
`css/saferise-dashboard.css`, placed with the other reset rules near the top rather
than in the ALIGNMENT block, which stays single-purpose. The shared sheet is not
edited, so `index.html` is unaffected.

*Status:* complete · *Raised:* 17 Aug 2026 · *Merged:* 17 Aug 2026

### SR-050 · Iframe painted white before the embedded document resolved
An iframe paints white until its own document's background resolves, so opening a
protocol flashed white across the full frame width before the dark ground arrived.

**Resolution.** `protocol.html` and `resource.html` carry
`<meta name="color-scheme" content="dark">` and `<style>html,body{background:#08080C}</style>`
as the first two entries in `<head>`, before the stylesheet; `.sr-proto-frame` carries
`background:var(--bg)` and `color-scheme:dark`. Verified at 1440, 1100 and 390: the
frame's own background computes to `rgb(8,8,12)` before load and the embedded document's
`html` and `body` both resolve to the same value on arrival, so there is no frame at
which either surface is unpainted.

*Status:* complete · *Raised:* 18 Aug 2026

### SR-051 · Theme change eased in the reader but snapped in shell and protocol page
Only the reader carried a transition, so Midnight/Sunrise moved the three tiers at
different rates and read as a glitch rather than a change of light.

**Resolution.** All three tiers share
`transition: background-color 1.4s ease, border-color 1.4s ease, color 1.4s ease`.
Verified with a protocol open: the shell hero, the Begin row and `.sr-proto-frame` all
compute that transition, and the embedded body eases on the same 1.4s. Both toggles stay
in sync. Note when measuring this: sampling sooner than ~1.4s after the click catches the
ease in flight and reads the outgoing palette, which looks like a failure and is not.

*Status:* complete · *Raised:* 18 Aug 2026

### SR-052 · Embedded pages constrained to 1020px inside a 1292px frame
The protocol page's `.inner` and the reader's `.shell` kept their standalone max-width in
embed mode, so the embedded text sat well inside the dashboard's text line and the
two-line alignment system broke at the iframe boundary.

**Resolution.** Embed-mode CSS widens both to the frame with a 30px gutter. Measured at
1440: frame at x111 by 1292 wide, `.inner` 1232 wide at x30, embedded content landing on
x141 — the dashboard's text line exactly. At 1100: frame x98, content x128, dashboard
x128. Incomplete below 640px; see [[SR-054]].

*Status:* complete · *Raised:* 18 Aug 2026

### SR-054 · Embed gutter did not follow --pad below 640px
The embed-mode gutter added by [[SR-052]] is a fixed 30px, but the shell's `--pad` drops
to 20px at 640px and the embedded pages define no `--pad` of their own. At 390px the
embedded text sat at x46 against the dashboard's x36 — a 10px break in the same alignment
system SR-052 exists to hold, visible only at mobile widths.

**Resolution.** A `@media(max-width:640px)` rule in the embed CSS of both pages takes the
gutter to 20px. Embed mode only; standalone rendering is untouched. Measured at 390:
embedded content x36, dashboard x36. 1440 and 1100 unchanged at 30px.

*Status:* complete · *Raised:* 18 Aug 2026

### SR-055 · Preview server cannot read the repo under macOS file protection
`.claude/launch.json` ran `python3 -m http.server`, which dies before parsing arguments:
that module evaluates `os.getcwd()` as an argparse default at import, and the preview
runner's process is denied it. Replacing the module with `tools/serve.py`, which derives
its root from `__file__`, clears that — but the process then cannot open any file under
the repo either.

Probed directly from the preview process: `~/Documents` and `~/Desktop` both return
`Operation not permitted`, while `~/.claude`, `/etc` and `/private/tmp` all read
normally. That is macOS TCC file protection, not a repo or config fault — the Bash tool
has been granted Documents access and reads the repo fine; the preview runner has not.

**Resolution.** `tools/serve.py` added and `launch.json` repointed at it, which is the
correct configuration and fixes the half that is fixable. The remaining half needs a
grant that only Andre can give: System Settings → Privacy & Security → Files and Folders
(or Full Disk Access) for the app running Claude Code. Until then, local preview runs
against a sha256-verified mirror under the session scratchpad, which is what this
session's measurements were taken from.

*Status:* partial — repo-side fixed, needs a macOS permission grant · *Raised:* 18 Aug 2026

### SR-056 · Five /method framework pages not built
`/method` ships with one of six framework pages. `method-porges.html` exists; HeartMath,
Maté, Jung, the observer stance and Watts do not. On `method.html` those five cards
render as non-anchor `<div class="sr-mi-card … soon">` rather than links, mirroring the
`.sr-dash-navlinks a.soon` treatment from `css/saferise-dashboard.css` — restated in
`css/saferise-method.css` because the `/method` pages do not load the dashboard sheet.

Stub pages were considered and rejected: five stubs would be forgotten, and a card that
navigates to an empty page is worse than one that says it is not ready.

The pager on `method-porges.html` is single-item for the same reason — the HeartMath
"next" card is removed, not disabled, and comes back when page 02 lands.
`method-porges.html` is the template the other five are built against.

*Status:* open · *Raised:* 18 Aug 2026

### SR-057 · css/saferise-method.css carries its own :root token block
`css/saferise-method.css` opens with a `:root` block defining `--bg`, `--band`, `--hair`,
`--gold` and the rest. Those duplicate `css/saferise-dashboard.css:22` **by value** —
the four watched tokens are byte-identical.

The duplication is currently harmless because it is page-isolated: `method.html` and
`method-porges.html` load `saferise-method.css` and nothing else, and `dashboard.html`
loads system + dashboard and never loads method. No page resolves two competing `:root`
blocks, so there is no cascade collision to trip over.

**One token genuinely diverges.** The method sheet sets `--accent:var(--gold)`; the
dashboard sets `--accent:var(--sr-track01)`, sourced from `saferise-system.css`. The
method pages do not load `saferise-system.css`, so aligning them to the repo would
resolve `--accent` to nothing and silently kill the accent on `.sr-mi-step.on` and the
interpretive-layer cards. Do not "fix" this without moving the token source first.

Consolidation is deferred deliberately, not overlooked. The canonical token source is
still unresolved — see [[SR-045]], which is the same argument between the design system
and the dashboard. Merging the method sheet into either now would bury that question
rather than answer it.

*Status:* open · *Raised:* 18 Aug 2026

### SR-112 · Track 02 and 03 pages — already built, already data-driven
Raised on the belief that only the Track 01 page existed and that Tracks 02 and 03 needed
building. **All three pages exist and all three are fully data-driven.** Each is a shell —
empty `<nav id="navlinks">`, empty `<div id="page">` — that loads `content/tracks.js` and
`js/saferise-track.js` and calls `SafeRiseTrack.render(N)`:

| page | body | data |
|---|---|---|
| `personal-transformation.html` | 1,878 B | `SafeRiseTrack.render(1)` |
| `relationship-healing.html` | 1,865 B | `SafeRiseTrack.render(2)` |
| `professional-performance.html` | 1,872 B | `SafeRiseTrack.render(3)` |

Measured live by Run C: 0 gaps on all three, 10 protocol cards each, 18 FAQ entries each.
The renderer's template-inherited `GAPS` counter is renamed `MISSING` and surfaced on
`window.SR_TRACK_MISSING` rather than rendered, "so a live page stays quiet"
([js/saferise-track.js:43](js/saferise-track.js:43)).

Nothing to wire. Closed without code.

*Status:* closed — already satisfied · *Raised:* 19 Aug 2026 · *Closed:* 20 Aug 2026

### SR-113 · FAQ data — already in `content/tracks.js`, not only in the template
Raised on the belief that `faq` lived only in the upstream template. It is in the repo's
own data: `SHARED.faq` at [content/tracks.js:603](content/tracks.js:603) (12 entries), and
`TRACKS[1].faq` :655, `TRACKS[2].faq` :676, `TRACKS[3].faq` :697 (6 each). **18 render per
track page**, confirmed live on all three.

Run C's field-set comparison found zero fields present in the template and absent from the
repo, in either direction, for tracks 1–3 — and found the repo newer than the template on
every value that differs. Closed without code.

*Status:* closed — already satisfied · *Raised:* 19 Aug 2026 · *Closed:* 20 Aug 2026

### SR-118 · Dispenza in the track data — already removed; the key is `distance`
Raised as 7 `dispenza` occurrences in `content/tracks.js` and 6 in `META[].frameworks`.
**`content/tracks.js` has zero.** The framework is present under its real key:
`FRAMEWORKS.distance` at [content/tracks.js:507](content/tracks.js:507), and the six named
protocols carry `'distance'` — `t1-09`, `t1-10`, `t2-08`, `t3-03`, `t3-08`, `t3-10`,
exactly the list the brief named. [[SR-089]] did this work; the brief predated it.

The only non-comment residue repo-wide is `docs/reference/portal-personal-target.html`
lines 536 and 701, which this register already scopes out at [[SR-084]] as a reference
target under `docs/`, not a served page. Reported by Run C, not touched. Closed without code.

*Status:* closed — already satisfied · *Raised:* 19 Aug 2026 · *Closed:* 20 Aug 2026

---

## LOW

### SR-059 · Framework page art slots unfilled
The `/method` pages carry placeholder markup for every art slot, with the real `<img>`
commented out beside a `NEEDS ART` / `Reuse` / `Tonal fallback` span stating exact
dimensions. Outstanding: six 1340×360 section bands (slot B, one per framework, the only
genuinely new commission) and six 200×200 symbol tiles (slot A, reused at 88px on the
index cards and 64px on the pager).

Two slots are already filled: the arrival check-in and Shutdown Recovery load cards on
`method-porges.html` point at `assets/covers/01.jpg` and `assets/covers/07.jpg`, both of
which exist in the repo. Every other `<img>` stays commented out — uncommenting one
without the asset produces a broken image, which is worse than the placeholder.

Covers carry their kicker word and number inside the image. Do not add CSS overlay text
to a cover or the text doubles.

*Status:* open · *Raised:* 18 Aug 2026

### SR-111 · Hardcoded track names — all correct; a coupling question, not a defect
Raised as nav showing stale or wrong track names. Run C read every occurrence of a Track
01–03 name across eight files: **121 strings, and every one matches `TRACKS[n].name`
exactly.** No stale value exists in the tree.

The nav the brief tabulates — the three track pages' — is already bound to `tracks.js` and
already correct. The three pages' one static occurrence each is the `<title>` and
`<meta name="description">`; `renderTrack` overwrites `document.title` from `t.name` at
runtime ([js/saferise-track.js:411](js/saferise-track.js:411)), so the served title is
data-driven and the static one is a no-JS fallback.

What remains is coupling, not correctness: 121 correct strings that are not bound to the
record and would go stale together if a track were ever renamed. That is a separate,
lower-value item and was not opened here.

Noted in passing: `CLAUDE.md` names the third series "Professional" where the data says
"Professional Performance". The document is out of step with the data, not the pages.

Closed without code.

*Status:* closed — already satisfied · *Raised:* 19 Aug 2026 · *Closed:* 20 Aug 2026

### SR-117 · `extras: null` — no consumer throws, and `null` is the intended value
Raised as `extras: null` crashing consumers. **There is one reader in the repo.**
`extras` appears in four places, all in `content/tracks.js`: three comment lines (523, 529,
532) and one read, `protocolResources` ([content/tracks.js:538](content/tracks.js:538)),
which array-checks before use:

```js
return Object.prototype.toString.call(extras) === '[object Array]' &&
       extras.indexOf(needs) > -1;
```

`protocolResourceCount` (:547) delegates to it. Neither has a caller outside `tracks.js`
and its `module.exports`. Verified live: `protocolResourceCount('t2-01')` → `7`, no error,
console clean on all three track pages. **The crash does not exist.**

§8b, on whether `null` is an unfilled field: it is not. [[SR-078]] wrote it as a
deliberate sentinel, documented in place at [content/tracks.js:523](content/tracks.js:523)
and :532 — *"null means UNVERIFIED, not none"* — distinct from `[]`, which means verified
and empty.

**Standing decision, 20 Aug 2026: the twenty `null` values stay `null`.** Changing them to
`[]` would assert a verification nobody performed. Do not "tidy" this in a later pass. This
is not the same as a wrong `[]` — see [[SR-120]], where `[]` contradicts content that
demonstrably exists.

Closed without code.

*Status:* closed — already satisfied · *Raised:* 19 Aug 2026 · *Closed:* 20 Aug 2026

### SR-119 · Dispenza re-verification across all tracked file types
The earlier sweep had been run over a subset of extensions. Re-run properly:
`git ls-files -z | xargs -0 grep -ni dispenza` — every tracked file, every extension.

Two files hit, both under `docs/`: this register (historical record of the removal,
acceptable) and `docs/reference/portal-personal-target.html` at 536 and 701, already scoped
out at [[SR-084]]. `content/tracks.js`, `index.html`, and every `.js`, `.css`, `.json` and
config file: clean.

Closed — verification performed, result clean, no code required.

*Status:* closed — already satisfied · *Raised:* 19 Aug 2026 · *Closed:* 20 Aug 2026

---

## BACKLOG

### SR-053 · Frameworks fold promoted to a /method rail destination
"Where the method comes from" is removed from the dashboard and becomes a rail
destination at `/method`, with the six frameworks to follow as their own pages. The fold
markup, its initialiser entry and the section are gone; a rail button sits between The
Life Laboratory and Sessions & workshops; `ROUTES` carries the entry; and each resource's
`Rests on:` line in the twelve-resource reader now ends with a `Read the framework →`
link, handled by a `[data-route-link]` branch in the click handler. Until `/method`
exists both open the route layer, as every unbuilt destination does.

Verified: 9 rail buttons with `method` sixth, between `laboratory` and `coaching`; no
`#srFoldMethod` or `.sr-dash-sixgrid` anywhere in the page; the rail button and the
in-reader link both open `mRoute` without navigating away.

*Status:* complete · *Raised:* 18 Aug 2026

### SR-044 · Member dashboard integrated into the repo
Adds `dashboard.html`, `protocol.html` and `resource.html`. Styles extracted to
`css/saferise-dashboard.css`; hero image extracted to
`assets/dashboard/hero-corridor.jpg`. `index.html` untouched.

Two defects found and fixed during integration:
- Surplus `</div>` after the footer put div balance at −1.
- Selecting Elevation Series retained the previous track's paywall CTA
  ("Professional Performance is not on your plan yet… ADD FOR €49 / MONTH"), because
  the empty-track branch returned before the CTA-clearing block.

**Both recurred in v41 and were re-applied.** The design source is regenerated from a
base that predates this register, so neither fix survives a new drop. The surplus
`</div>` and the Elevation Series paywall both came back and were fixed again during
the v40/v41 integration. Any future dashboard drop should be checked for both before
anything else — the div balance check catches the first, and cycling all four track
tabs catches the second.

**Correction to the integration handoff.** The handoff states that
`scroll-behavior:auto` is "pinned on the viewport because the page sets
`html{scroll-behavior:smooth}` globally, which was competing for the same
property." No such declaration exists on `.sr-dash-carviewport`, and none is
needed: `scroll-behavior` is not an inherited property, so the rule on `html`
never reached the viewport. It computes to `auto` as the initial value. The
carousel's behaviour is correct and unchanged — only the stated mechanism was
wrong. The element is `overflow:hidden` and never scrolls in any case.

*Status:* complete · *Raised:* 17 Aug 2026 · *Merged:* 17 Aug 2026

### SR-049 · 335 orphaned CSS rules removed from the dashboard stylesheet
`css/saferise-dashboard.css` carried whole components whose markup was cut from the
design before integration: the Clearing panel, the Protocol Foundation band, the
Reflection lab, "Understanding SafeRise", older Begin/Resume/Hero variants, and the
`sr-proto-*` internals that styled the protocol page back when it was inlined rather
than iframed. Also the four `sr-dash-heroart` / `herocard` / `herogrid` / `heroscrim`
leftovers orphaned by [[SR-046]].

A rule was removed only when **every** comma-separated part of its selector names at
least one class absent from `dashboard.html`. A part naming no class at all
(`section`, `h1`, `body.reading`) counts as live.

**An earlier count of 343 was wrong.** It tested the union of classes across the whole
selector, which marks `.live, .dead` dead on account of `.dead` alone. Eight rules were
rescued by switching to per-part testing, among them the ALIGNMENT block's
`.sr-dash-jcols > .sr-dash-jcol:first-child, …` and the `body.shifting …` reading-mode
transition — both live, both would have been deleted. The audit is sound only because
no class name in this file is built by concatenation; the single dynamic case,
`className = 'sr-dash-carrow ' + t.cls`, takes `t.cls` from string literals present in
the file.

Three `NEEDS ART` markers sat inside the declaration blocks of removed rules and were
carried over to a labelled block near the top of the file rather than deleted with
their rules — the pangolin illustration in particular is still live outstanding work.
The total of 15 across both files is unchanged.

335 rules, 33.0 KB, and 8 emptied `@media` blocks plus 1 emptied `@supports` block
removed; stylesheet 99.5 KB → 67.2 KB. Verified with the stylesheet swapped in place
on a single page load, hero slide pinned to remove slider rotation as a variable:
page height, both alignment lines, `--pad`, and hero / Begin row / carousel / card /
footer heights are **byte-identical at 1440, 1100 and 390**, with zero horizontal
overflow and zero slide/toggle overlap at 390.

*Status:* complete · *Raised:* 17 Aug 2026 · *Merged:* 17 Aug 2026

### SR-061 · No single content source; every page held its own copy
`content/tracks.js` lands as the one record of PRICING, SHARED, TRACKS, STATES,
FRAMEWORKS, META, LIFE_LAB and `frameworkReach()`. Pages read it; pages never author.

Validated with JavaScriptCore (`jsc`, ships with macOS) rather than `node --check` —
node is not installed on this machine, so the handoff's validation gate could not run
as written. All three live tracks carry ten protocols, six own FAQ items and complete
cost/range/journey/change records. The approved mockup's Appendix C claims those fields
are Track 01 only; that appendix is stale and the delivered data is complete.

*Status:* complete on merge · *Raised:* 19 Aug 2026

### SR-062 · One track template, three routes
`personal-transformation.html`, `relationship-healing.html` and
`professional-performance.html` are thin shells over `js/saferise-track.js`, differing
only in the track id they pass. Eleven beats in the mockup's fixed order; the scope
block is unconditional.

Namespaced `sr-tp-`, not plain `sr-`: five template class names (`.note` `.on` `.scope`
`.sechead` `.pbody`) already existed under `sr-`. `.gold` keeps its literal name — it is
embedded in sixteen spans of copy inside the content source.

Covers are path references, verified 10/10 loading per track. No inline base64. Art is
unproduced, so every image slot renders its `track.art` brief as a labelled placeholder
and the pages are correct with zero art present.

*Status:* complete on merge · *Raised:* 19 Aug 2026

### SR-063 · Dashboard carried its own TRACKS, TRACKNAME and TRACKPRICE
All three duplicated the content source and all three had drifted — `TRACKPRICE` said
t2 €29 / t3 €49, the retired tiers. The local record is renamed `DASHTRACKS`, since
`content/tracks.js` owns the global `TRACKS` and shadowing it would give the two files a
silent disagreement. Accent token, theme class and plan entitlement stay local: those
are facts about a viewer, not about a track.

`RES` and `SOURCES` are deliberately retained. They are not duplicates of
`SHARED.resources` — both hold twelve entries but only four names overlap, and `RES`
carries per-resource "why" copy that exists nowhere else. See [[SR-067]].

*Status:* complete on merge · *Raised:* 19 Aug 2026

### SR-065 · Stale strings repo-wide, and Track 03 still on a waitlist
`Crisis Card` → `Cue Card` (22), `Life Companion` → `Somatic Release Activities` (59),
`Career & Performance` → `Professional Performance` (4), all in `index.html`. Verified
safe first: `KIND_CLASS` keys on eight resource kinds, none of them these, and the
reader's only `kind` comparisons are Founder Video, Protocol Guide, Reference Case and
Safety Score.

`SERIES_CONFIG.corporate` loses its "Track 03 · Coming Soon" badge and its Join Waitlist
CTA now points at `corporate-protoList`, which already holds ten protocols. The
"content is in production — join the waitlist" sentence is deleted rather than reworded,
being a claim that is no longer true.

The Life Laboratory count in the dashboard's route table said "seven stages"; `LIFE_LAB`
holds eight. Now derived. Note there is **no stage rail** anywhere in this repo — that
one sentence was the only place the count appeared.

*Status:* complete on merge · *Raised:* 19 Aug 2026

### SR-066 · Framework protocol counts on the About page were hand-tallied
Every one of the six was wrong: Porges 21→16, HeartMath 21→7, Dispenza 15→6,
Maté 15→14, Jung 15→11, Watts 10→7. Now read from `frameworkReach()` over `META` at
load, along with the `+N more` overflow pill which carried the same bad arithmetic.

Five cards on that page — Mooji, David Bayer, Peter Levine, Kübler-Ross, Weller — have
no key in `FRAMEWORKS`, so there is nothing to derive them from. Left untouched.

*Status:* complete on merge · *Raised:* 19 Aug 2026

### SR-067 · Resource reader and content source name different resources
`SHARED.resources` and the dashboard's `RES` both hold twelve entries, but only four
names match: Cue Card, How This Works, Source Insights, Reference Case. The reader has
Guided Experience, Breathwork, Progress Journal, Progress Tracking, Protocol Guide,
Attention Advisory and Disclosure & Invitation; the content source has Guided
Meditation, Why I Built This One, Somatic Release Activities, Safe Practice, Proximity
Guide, Disclosure & Support and Invitation to Repair.

The track pages promise the content source's twelve. `RES` additionally carries
per-resource "why" copy with no home in `tracks.js`, so this cannot be resolved by
deleting either side — it needs a decision about which set of twelve is real.

*Status:* open · *Raised:* 19 Aug 2026

### SR-068 · Protocol Library, Your Record and Journal still in nav
Three nav destinations with nothing behind them. Removing the markup is only half of
it: the dashboard resolves in-page links by their text through `TEXTMAP`, so a route
stays reachable from any link carrying matching text even after its button is gone.

Removed the icon-rail buttons, the "Protocol Library" and Journal links in the top
nav, the three `ROUTES` entries, and every `TEXTMAP` row resolving to one of them —
`/full archive|in the archive/` and `/try source insights/` (record), `/all entries/`
(journal), `/browse your library/` (library). The last two matched no control text
anywhere in the markup and were already dead.

"My Journey" is a separate route and was not named by this item, so it stays.
`/write an entry/` → `entry` (`/journal/new`) also stays: SR-071 moves writing to the
protocol page, which leaves that control pointing at a concept that no longer exists.
Flagged rather than changed — it was not in scope.

*Status:* complete on merge · *Raised:* 19 Aug 2026

### SR-069 · Life Laboratory out of production until the Elevation Series
Every surface removed — rail button, `ROUTES` row, `TEXTMAP` row, identity card, and
the `sr-dash-identity--three` modifier and `sr-dash-idcard--lab` rule that existed only
for it. `SR_NUMWORD()`, added by SR-065 solely to word the stage count in that route
copy, went with them.

Done in the order agreed in Phase 0.2, option 1: reads removed first, confirmed at zero
by grep, and only then the object commented out in `content/tracks.js` — headed with
the reservation, the canonical eight-stage list including LEARN, and the rule that
`caveat` is never omitted from a surface showing the stages. `extension` and `caveat`
stay inside the block. Line comments, not a block comment: the object carries block
comments of its own. Removed from `module.exports`, which throws on require otherwise.

The `LIFE LABORATORY` header in `css/saferise-dashboard.css` had drifted — most of the
rules under it (`.sr-dash-readsrc`, `.sr-cadence`) are unrelated and live. Only the
Life Laboratory rules were removed, `.sr-lab` among them, which had no markup anywhere.

`method.html` and `method-porges.html` keep their laboratory rail button until SR-075
on `feat/method-updates`. Until that lands, the removal is incomplete on those two
pages.

*Status:* complete on merge, pending SR-075 for the two method pages · *Raised:* 19 Aug 2026

### SR-070 · Modal shell — one layer, three views
Record, Journal and Sessions render into a single `#mLayer` dialog driven by the same
`openModal()`/`closeModals()` pair as the six booking modals. `openModal` now takes a
view key and sets kicker, title, lede, art class and footer from a `VIEWS` config;
`openRoute()` no longer opens `#mRoute` itself but calls through the same function, so
scroll lock and focus handling live in one place. `closeModals()` restores focus to the
opening element — behaviour the old controller never had.

Two mockup selectors were deliberately not shipped. `.sr-modallabel` already exists and
is reused. `.sr-arrow` is already a 46px circular carousel button in
`saferise-system.css`, which loads last and wins by cascade, so the state-shift glyph is
emitted as bare text — the same class of collision as `.track` and the video scrubber.
The `.sr-dot` state modifiers are namespaced rather than the mockup's bare
`.d-mob`/`.d-shut`/`.d-safe`.

Helpers are `srEsc`/`srFmtDate`/`srShift`/`srEmpty`: the dashboard IIFE already has an
`esc()` for the track renderer that escapes only `&` and `<`, and a second
`function esc` would have replaced it for the whole scope.

The third stat card ships as `Most run / <protocol name>`, counted from logged runs. The
mockup's "Early signs / Where you land" is a tier the page cannot compute from local
data. "Build a protocol report" and "Open the full archive" are gone with the `report`
route; two further controls stranded by the SR-068 route removals were repointed at the
record and journal views rather than left dead.

*Status:* complete on merge · *Raised:* 19 Aug 2026

### SR-071 · Journal entries on the protocol page never persisted
The write block on `protocol.html` wrote to the DOM only — the entry vanished on reload
and never reached the dashboard. Now appends to `sr.journal.entries` through the same
`Store` adapter: read, push, write, never assigning a fresh array over the key.

Entries carry the full schema. `protocolId` (`t1-p01`, following the track/protocol key
already used for cover paths) is the join key the Journal view filters on, while display
groups on `protocol`.

`before`/`after` ship as null. The log on that page measures activation 0–10; the shift
row names a nervous-system state. They are not the same measurement, and mapping one
onto the other would be invention. Whether those two readings should be reconciled is
an open decision.

*Status:* complete on merge · *Raised:* 19 Aug 2026

### SR-072 · Sessions view — booked dates, no provider chosen
Shipped inside the SR-070 commit rather than its own: the sessions view is one of the
three bodies the shell renders, and there was no code to separate from it. Recorded
here so the ID stays traceable.

Booked dates only — booking itself stays with the third-party tool. Zoom and Calendly
are both still open, so the dashed `.sr-provider` block ships as the mockup has it,
naming the open decision. Nothing embeds either widget, loads either SDK, or calls an
API against a provider that has not been picked.

`sr.sessions.booked` has no writer anywhere in the repo, so the empty state is what
every member sees on day one. It reads as correct rather than broken, and the provider
block sits below it.

Reached from the "Sessions & workshops" rail button, through a `LAYERS` map inside
`openRoute()` rather than a `data-modal` on the button — the rail has its own click
listener that calls `openRoute()` for every rail button, so a `data-modal` there opens
two layers at once.

Verified in Chromium at 1440 and 390: empty state by default, and seeded data renders
the confirmed and awaiting-link states.

*Status:* complete on merge · *Raised:* 19 Aug 2026

### SR-076 · Method pages, rendered check
Chromium, 1440 and 390, both pages, Midnight and Sunrise. No console errors, no
horizontal overflow at 390, and the rail collapses to the bottom bar as designed.

**Measurement.** At 1440 every top-level enclosure sits on x=111 and body text on
x=141, as specified. Two classes of element sit 1–2px inside that, and both were
traced rather than padded back:

- `.sr-mi-claim`, `.sr-mi-veh` and `.sr-mi-note` carry `border:1px`, so their text
  starts at 142.
- `.sr-fw-limit` carries `border-left:2px`, so `.sr-fw-rests` lands on 113 and its
  text on 143.

Both rules are byte-identical to the mockups, so nothing was lost in the port — the
111/141 rule describes elements that are not nested inside a bordered container.

**Step rail.** Confirmed on the peer band from a live IntersectionObserver fire:
01, 02 and 04 lit, 03 unlit, railnote correct. The clinical and interpretive states
were confirmed by asserting the same mapping `light()` applies and reading the DOM
back — `all` puts every step into `.beneath` with `border-left-style: dashed`.

*Not fully settled in this harness.* The preview pane reports `document.hidden = true`
even when fronted, so IntersectionObserver only delivers when a screenshot forces a
composite, and `.sr-mi-step` transitions `opacity` and `border-color` over .45s — with
no frames being produced, `getComputedStyle` returns mid-transition values. The class
logic is proven; the settled *visual* states for the clinical and interpretive bands
need a real browser. Deep scroll offsets also return blank screenshots on both pages,
which is why every capture above was taken near the top of the document.

*Status:* complete on merge, visual rail states need a Safari pass · *Raised:* 19 Aug 2026

### SR-074 · Method page content deltas
Both pages diffed against the Desktop mockups and content applied only; structure, the
extracted stylesheet and the `soon` states are untouched. The repo was not where the
handoff described it — `method.html` was already clear of Dispenza and of "Where the
evidence stops"; `method-porges.html` was the page still holding the split columns.

Index: a third peer card (03 Distance & rehearsal, Kross & Ayduk), Maté 03→04, Jung
04→05, Dispenza deleted, `data-steps` 01,02→01,02,04 and 04→all with the `.beneath`
rail state, the breath-cycle SVG on the ≈6 claim, the five-voice footnote block, the
guided-meditation section with its image slot, and the founder-note side column
replaced by one affiliation line in the footer. Porges: section 04 rewritten as five
findings in a single `.sr-fw-rests` list, the 2026 dispute carried by one closing
paragraph.

`.sr-fw-split` / `.sr-fw-splitcol` confirmed orphaned before removal — the only markup
using them was the section this item replaces. `.sr-mi-noteside` went with the side
column.

Deliberate divergences: the five unbuilt framework pages stay `soon`, so the mockups'
"Read the page" links and the porges pager's HeartMath tile are not adopted — either
would have shipped a dead link. `rg "we do not claim"` still matches once, inside the
TEMPLATE REGION 5 comment the handoff says to port verbatim; it is a comment and
renders nothing.

Left open: `FRAMEWORKS.dispenza` and seven `META[].frameworks` references remain in
`content/tracks.js`, so `frameworkReach('dispenza')` returns protocols pointing at a
framework with no card and no page. The data layer was out of scope for this item.

Also open: the index hero still reads "three of them research, three of them ways of
seeing". After the reshuffle the six are three peer-reviewed, one clinical and two
interpretive, so the second half is wrong. The mockup carries the same line, so this
was flagged rather than silently rewritten — it needs a decision, not a guess.

*Status:* complete on merge · *Raised:* 19 Aug 2026

### SR-075 · Method rails still linked to four deleted routes
Both pages carried a copy of the dashboard rail taken before SR-068 and SR-069.
Protocol library, Journal, Your record and The Life Laboratory were live on both and
every one pointed at a route that no longer exists, so the buttons dropped the member
on dashboard.html with nothing matching what they clicked. All four removed; the
remaining set, order and wiring are identical to the dashboard.

The Cue Card button carries `data-modal`, not `data-route`, and was being caught by the
`|| 'dashboard.html'` fallback. Going to the dashboard is right — the crisis modal only
exists there — so it now says so in a comment instead of happening by omission. Same
root cause as SR-083.

*Status:* complete on merge · *Raised:* 19 Aug 2026

### SR-077 · Twelve resources to nine
`SHARED.resources` is now exactly the nine specified. Why I Built This One removed from
tracks.js, the dashboard RES strip, protocol.html (where it was live as "Why this
protocol exists") and the resource.html reader. Source Insights merged into How This
Works, which keeps "Why it works" as its subtitle and now carries the framework
attribution on every surface, including the dashboard `SOURCES` map. Reference Case
removed entirely — it was live on protocol.html naming a specific living public figure
and attributing a psychological pattern to her, which is what put this cut first.

Two consequences handled rather than left: the dashboard suggestion pointing at Source
Insights now names How This Works, and resource.html's hardcoded `n:'NN'` numbering —
which also supplied the "N of M" total from the last record — is derived from position
and length instead. Cutting two records had left the rail reading 02, 03, 05, 06, 07,
08 and the summary claiming "of 08" for a six-item list.

A third surfaced only on rendering: the reader opened on `var current=6`, an index that
no longer existed, so `renderMain()` threw before painting. The opening resource is
named now and its index looked up, with a clamp so a future cut cannot repeat it.

Left open: the merged How This Works body in resource.html still names Dispenza, which
SR-074 removed as a framework card.

*Status:* complete on merge · *Raised:* 19 Aug 2026

### SR-078 · Resource counts are derived
The word "nine" is not written anywhere. The three hardcoded twelves in tracks.js are
gone, `resourceCount()` in the track renderer now matches the spaced form as well as
the hyphenated one — "each with twelve resources" had slipped past it and gone stale on
its own — and `priceList` is passed through it, having rendered raw.

`protocolResources(key)` / `protocolResourceCount(key)` sit next to `META`. The
Proximity Guide and the Invitation to Repair are conditional on `META[].extras`;
`extras:null` means UNVERIFIED, not none, so null and `[]` both yield the unconditional
set. A protocol carrying neither shows seven, which is exactly why a hardcoded number
would have been wrong on every T2 and T3 protocol.

The dashboard fold title is set from `SHARED.resources.length` at load.

*Status:* complete on merge · *Raised:* 19 Aug 2026

### SR-079 · The three-column Get Started block
Renders from two places — `dashboard.html`'s `JOURNEY` and `TRACKS[n].journey` in
tracks.js, which the track pages draw on. Both were stale the same way and both were
fixed. Column 1 no longer names "the Protocol Foundation Meditation" or states a
length; column 2 was correct and untouched; column 3 was already corrected by SR-077
and SR-078. Structure, headings and tone unchanged.

*Status:* complete on merge · *Raised:* 19 Aug 2026

### SR-080 · No page states a session length
The rule applies site-wide, not just to `method*.html`. Every stated or implied
meditation length is gone from `content/tracks.js`, `js/saferise-track.js`,
`dashboard.html`, `protocol.html` and `resource.html`, including all nine JOURNEY
metadata strips, which were removed outright rather than trimmed. Players keep their
elements and lose their numbers — the dashboard bar, both protocol scrubbers and the
reader scrubber render empty and fill from the media once real files exist. No
placeholder was substituted.

Two things the greps could not have caught, both found by looking at the rendered page:
"Ten guided minutes" in the Clearing modal, which the acceptance regex does not match;
and the hero rendering the literal word "undefined" after the article slide lost its
"2 min read", because that field was concatenated unguarded.

Kept deliberately, and reported rather than hidden: workshop clock times
(18:00–20:00), the Premium 1:1 slot times and "90 min", "Ninety minutes, online",
"Two hours", the workshop agenda (15 / 40 / 45 / 20 minutes) and the 48- and 72-hour
cancellation windows. These are booked live events with a human on the other end;
their lengths are contractual and already known, which is the opposite of the
unrecorded meditation assets the rule exists for. "Six breaths a minute" is kept as
well — it is a rate, and the one specific empirical claim SafeRise makes.

`docs/reference/portal-personal-target.html` is excluded by decision: it is a stored
snapshot, and editing it would stop it being an accurate record of that page.

*Status:* complete on merge · *Raised:* 19 Aug 2026

### SR-081 · Journal shift row rendered for data that never arrives
Checked first, as specified: the arrival check-in state is not available in scope on
`protocol.html`. Its "Preview as" statebar is a prototype viewer control, labelled in
the markup "Mockup control — not part of the build"; the only state words on the page
are the slider endpoints Settled and Peak alarm on a 0–10 activation scale; and the
dashboard's arrival field is free text on another page, matched against `STATES` only
to suggest a protocol and never stored per session.

The repo also carries two incompatible state vocabularies — `STATES` is Agitated /
Unsteady / Numb, the shift row uses Mobilised / Shutdown / Settled / Braced / Present.

So the second branch applies: `before`/`after` stay null and the row is removed from
the Journal view. Activation and nervous-system state are different measurements and
mapping one onto the other would be invention.

The Record view keeps its shift row, which this item does not cover — though
`sr.record.runs` has no writer either, so it is equally unpopulated in practice.

*Status:* complete on merge · *Raised:* 19 Aug 2026

### SR-082 · Dead "Write an entry" control
`/write an entry/` resolved to the `entry` route at `/journal/new`, a route that does
not exist and a concept that stopped existing when SR-071 moved writing onto the
protocol page. Control, route and TEXTMAP row removed. Removed rather than repointed:
a control labelled "Write an entry" opening a read-only journal would have been a
second wrong answer.

*Status:* complete on merge · *Raised:* 19 Aug 2026

### SR-083 · Cue Card rail button opened two modals
Pre-existing, reproduced at `0c16c84` during the modal-shell pass and logged then
rather than fixed. The rail listener called `openRoute(data-route || 'dashboard')` for
every rail button; the Cue Card carries `data-modal` and fell to that default, opening
`mRoute` while the `[data-modal]` handler opened `mCrisis`. One click, two layers.

A rail button with no `data-route` is not a route — the listener returns early and
leaves it to whichever handler owns it. It also no longer takes the rail's active mark,
since the Cue Card is a layer over the current page rather than a destination.

*Status:* complete on merge · *Raised:* 19 Aug 2026

### SR-084 · index.html still carries the cut resources and every duration
Deferred from the SR-077 / SR-080 pass by decision, so the public page lands as one
reviewable change rather than buried in a ten-item consolidation. Nothing in
`index.html` was touched.

Inventory as of this branch:

- **Reference Case** — 50 literals and 205 `refcase` references, spanning
  `RESOURCE_CONTENT`, the `STORIES` prepare() wiring, `RES_META`, carousel copy and
  roughly fifteen dedicated CSS blocks. Includes named public figures in body copy,
  which is the specific risk that put the cut first.
- **Source Insights** — 32 literals, plus the six-perspective editorial grid and the
  four "visual chapters" CSS.
- **Why I Built This One** — 2 literals plus the `p1-story` hero tab.
- **Durations** — 80 strings matching the SR-080 acceptance pattern.

The acceptance greps for SR-077 and SR-080 will keep matching `index.html` until this
lands. That is expected and was reported, not hidden.

*Status:* open · *Raised:* 19 Aug 2026

### SR-085 · Dashboard showed fabricated member data
The page rendered a populated practice belonging to nobody, to every visitor, with
empty storage: twenty sessions logged, a twelve-bar before/after chart, an arc dot
marking where the last session finished, "Fourteen entries · about 2,100 words since
June", two dated entries, four recurring themes, a Chosen Self last revised 2 August,
four decisions recorded, and three suggestions citing entries nobody had written. The
Record modal on the same page read "Nothing logged yet", so the page contradicted
itself and the honest half was the modal.

Every surface in Your record now computes from `Store` or does not appear, reusing
`srEmpty` rather than introducing new empty states. Where the platform records nothing
the surface is removed rather than estimated: entry themes have no tagging behind them,
and minutes-to-settle is not recorded anywhere. Bar height is the state band the arc
legend already names, not an invented score — there is no numeric rating in the record
and adding one would have been the same defect in a new place.

Two surfaces not in the original list were fabricating the same way and were fixed with
the rest: the suggestions panel, and the "Where you left off" card above the fold, which
claimed the member was on "Resource 07 of 08 · The Decision" with an 87% progress rail.
Nothing writes `sr.resume` yet, so it follows the pattern already set for
`sr.sessions.booked` — the empty state is what every member sees on day one.

Found by rendering, not by grep: the arc dot carried `hidden` and stayed painted,
because the UA sheet's `[hidden]{display:none}` does not reach children of an `<svg>`.

*Status:* complete on merge · *Raised:* 19 Aug 2026

### SR-086 · Cue Card removed from the rail
The Cue Card is protocol-specific — four lines drawn from the protocol being run. With
no protocol in context the rail button showed the wrong card, and from the method pages
it did not even do that: those rails carry no `mCrisis`, so `PAGES[null]` fell through
to `dashboard.html` and the click bounced there, needing a second click to open.

Removed from all three rails with its wiring: the SR-083 guard for a routeless rail
button is gone, since every remaining button is a destination carrying `data-route`.
The card stays on `protocol.html`, and `mCrisis` stays reachable from the dashboard
resources strip, which is a real resource entry rather than a global control.

`LAYERS` was kept. Its comment attributes it to the Cue Card, but it is what lets
`coaching` be a rail destination that opens a view while keeping the active mark —
still needed, and needed more now that the routeless-button guard is gone.

*Status:* complete on merge · *Raised:* 19 Aug 2026

### SR-087 · Three dashboard controls going nowhere
The Chosen Self and Your Decisions were `<a href="#">`, so both advertised
`dashboard.html#` on hover and reached `openRoute()` only by matching their own label
text in `TEXTMAP`. Now `<button data-route-link>`: no false URL, and the route no longer
depends on the visible copy staying the same.

"Run a protocol" carried only `data-close`, so the one control in the Record empty state
did nothing but shut the modal it was written in. `srEmpty` now takes a destination — a
`.html` dest renders a real link, anything else is a `MODALS` key. Fixed in all three
empty states, not just the named one: Journal and Sessions were dead the same way.

*Status:* complete on merge · *Raised:* 19 Aug 2026

### SR-088 · Protocol names double-escaped to a literal `&amp;`
The entity lived in the data, not the renderer. `content/tracks.js` stored twenty
strings with HTML entities baked in, because `js/saferise-track.js` injects them raw.
The dashboard carousel escapes properly via `esc()`, so it escaped the escape.

Fixed at source: the data holds plain text, and the entity- and tag-preserving `esc()`
that the track renderer already defined but never called is wired at the ten sites that
consume those fields. It leaves `<br>` and `<span class="gold">` alone, which is why it
was written that way and why it is safe on fields carrying markup.

*Status:* complete on merge · *Raised:* 19 Aug 2026

### SR-089 · Dispenza was half-deleted from the framework data
Framework 05 was cut from `method.html` and replaced there by Distance & rehearsal, but
`content/tracks.js` still carried `FRAMEWORKS.dispenza` and six `META[].frameworks`
references. `frameworkReach('dispenza')` returned six protocols pointing at a framework
with no card and no page. Note the original report said seven references: it is six
`META` entries plus the record itself.

Replaced rather than deleted, by decision. Deleting would have left `FRAMEWORKS` at five
records while every surface says six sources, and dropped real attribution from six
protocols. The record is now Distance & rehearsal — Kross & Ayduk, Best Possible Self,
register peer-reviewed, step 4 — and record order now matches method.html's 01–06 cards.

`resource.html`'s How This Works named Dispenza on a member-facing surface. Rewritten to
describe the mechanism and move it into the measured band, leaving Jung as interpretive.

**Not closed:** `index.html` still carries twenty references including a full Dr. Joe
Dispenza expert bio whose counter is driven live by `frameworkReach` via
`data-sr-reach="dispenza"`, which now resolves to zero protocols. That file is SR-084
and deliberately out of scope, so `rg -ni "dispenza"` cannot come back clean until it
lands. Expected and reported, not hidden.

*Status:* complete on merge, with the index.html remainder open under SR-084
*Raised:* 19 Aug 2026

### SR-090 · Method index hero stated a split that is no longer true
"Three of them research, three of them ways of seeing." After Distance & rehearsal was
promoted into the peer-reviewed band the six are three peer-reviewed, one clinical
practice, two interpretive — wrong on the page whose whole argument is evidentiary
precision. Count dropped rather than restated: the register chips and three band headers
already say the split three ways, and a count in prose is a fourth place to drift. The
mockup in `docs/reference` carries the same stale line and was left alone, not copied.

*Status:* complete on merge · *Raised:* 19 Aug 2026

### SR-091 · Sessions and workshops pricing contradicted itself
`PRICING.workshop` held €29 — Track 03's monthly price, never a workshop price — so the
block advertised "from €29" directly above its own bullet reading Personal €59 ·
Relationship €139. One key could never have been right: workshops are priced per format.
Replaced with `workshopPersonal` €59 and `workshopRelationship` €139; the block reads
"from €59". Premium 1:1 was €275 hardcoded in four places; added `PRICING.premium` and
bound it. Twelve `data-sr-price` nodes, no euro amount left in the markup.

Durations kept — booked live events with a human on the other end, contractual and known.

Audited the rest of the record as asked: `t1`/`t2`/`t3` are each attached to the track
they are named for, and Elevation is priceless and hidden. `workshop` was the only key
named for one product and used for another.

`premium1` (€129/hr) and `premium3` (€299/3hr) left exactly as they were — SR-057 is an
open decision. Nothing in the repo renders either one; noted beside them in the data so
the next reader does not assume they are live.

**Remainder, no ID left in the reserved block:** `protocol.html` carries its own booking
block with €275 hardcoded twice. It cannot bind, because it does not load
`content/tracks.js` at all — so making it match the dashboard means giving that page the
pricing record first. Out of scope here, which was the dashboard block, but it is the
same defect and the same €275 that SR-091 was raised for.

*Status:* complete on merge, with the protocol.html booking block outstanding
*Raised:* 19 Aug 2026

### SR-092 · Dead links on the method pages — audited, none found
Every `href` on both pages resolves to a file that exists, all five unbuilt frameworks
are `<div class="soon">` rather than anchors, and neither page carries an `onclick`.
No change was needed; the item is closed as verified rather than fixed.

One adjacent gap found and **not** fixed, as it is outside this item: the method rails'
`coaching` and `account` buttons navigate to `dashboard.html` without opening the view
they name, because `PAGES` has no entry for either and the default is a bare redirect.
That is the same shape as the Cue Card bounce closed in SR-086 and needs its own ID.

*Status:* verified, no change · *Raised:* 19 Aug 2026

### SR-093 · Performance and layout shift — measurement
Profiled rather than optimised, per the item. No fix applied.

**Page weight, as served**

| page | doc | render-blocking in `<head>` | notes |
|---|---|---|---|
| `protocol.html` | 4.58 MB | 2.31 MB | `<body>` does not open until byte 2,417,113 — 50.3% into the file |
| `index.html` | 1.36 MB | 199 K inline CSS | 532 K inline JS |
| `resource.html` | 220 K | 127 K inline CSS | 83 K inline JS at 60% |
| `dashboard.html` | 118 K | 242 K external CSS | + 60 K `tracks.js`, + 1.5 MB of covers |
| `method.html` | 30 K | 35 K external CSS | cheapest page in the repo |

**Where protocol.html's 4.58 MB actually is:** two base64 PNGs, and nothing else of
consequence. One is 1086×1448px / 1.69 MB, embedded as a `url()` inside the head
`<style>` — so it is render-blocking. The other is 2172×724px / 1.68 MB as an `<img>`
in the body. Both are photographic content stored as PNG.

**The reflow is the webfont swap, not late CSS.** The stated hypothesis was
partially-styled content rendering before CSS resolves. That is not what happens: every
stylesheet on `protocol.html` is in `<head>` and blocking, so there is no window in
which unstyled content paints. The Google Fonts link carries `display=swap`, and the
measured metric gap is large:

| face | fallback width | webfont width | shift |
|---|---|---|---|
| Cinzel | 576 px | 775 px | **+34.6%** |
| Cormorant Garamond | 629 px | 551 px | −12.5% |
| DM Sans | 638 px | 658 px | +3.0% |

Cinzel sets every heading. Headings paint at fallback width and then jump a third wider
when the face arrives — "paints at one width and then reflows", exactly.

**Not measured, and why:** the preview pane keeps the page `document.hidden === true`,
so Chromium emits no `paint` entries and records no `layout-shift`. Time to first paint
and CLS could not be captured here and need a visible browser. Parse timings on
localhost were: `protocol.html` domInteractive 193 ms against 38 ms responseEnd — 155 ms
of it parsing; `dashboard.html` 83 ms; `resource.html` 33 ms; `method.html` 17 ms.

**Recommendations, logged as SR-094 and SR-095 below.** Two further findings need IDs
beyond the reserved range and are recorded here rather than left in a run report:
`dashboard.html` loads `saferise-system.css` *before* `saferise-dashboard.css`, against
the rule in CLAUDE.md that the system sheet loads last (blast radius is one class,
`.sr-cover`, but the ordering is wrong); and the dashboard requests all ten protocol
covers, ~1.5 MB, without `loading="lazy"` on the below-fold ones.

*Status:* measurement complete · *Raised:* 19 Aug 2026

### SR-094 · protocol.html carries 4.5 MB in two embedded PNGs
Extract both to `assets/`, convert to JPEG or WebP, and size them to the box they are
drawn in. At their rendered dimensions these are roughly 100–250 K each, so the page
goes from 4.58 MB to under 500 K — the largest single win available in the repo. The
head one matters twice over: it sits inside a `url()` in the render-blocking `<style>`,
so 2.26 MB of base64 must be parsed before the stylesheet can be used at all.

Not done in the SR-093 pass because the item asked for measurement only, and because
moving an image out of a data URI changes what the page requests at runtime — it wants
its own before/after render, not a drive-by edit.

*Status:* open · *Raised:* 19 Aug 2026

### SR-095 · Heading reflow on every page from the Cinzel swap
`display=swap` plus a 34.6% metric gap between Cinzel and its `serif` fallback means
every heading on the site paints narrow and then jumps. Options, cheapest first: add
`size-adjust` / `ascent-override` metric overrides on an `@font-face` for the fallback
so the two agree; self-host the three faces and preload the Cinzel weights actually used
(400 and 500); or accept the swap and stop the jump mattering by not sizing anything off
heading width. Measure with a visible browser — see the note in SR-093 about why CLS
could not be captured in the preview pane.

*Status:* open · *Raised:* 19 Aug 2026

### SR-104 · Method rails land on the dashboard without opening what they name
Found during SR-092 and recorded there for want of an ID. On `method.html` and
`method-porges.html` the rail's `coaching` and `account` buttons navigate to
`dashboard.html` and stop. `PAGES` on those pages holds only `method` and `dashboard`,
so both fall through to a bare redirect and the member arrives at the dashboard with
neither the Sessions view nor Account open.

Same shape as the Cue Card bounce closed in SR-086: a control that names a destination
and does not reach it. The dashboard already routes both through `openRoute`, so the fix
is a deep link the dashboard reads on load rather than new wiring on the method pages.

*Status:* open · *Raised:* 19 Aug 2026

### SR-105 · dashboard.html loads the system stylesheet before the dashboard one
Found during SR-093. `dashboard.html` loads `css/saferise-system.css` and then
`css/saferise-dashboard.css`, against the rule in CLAUDE.md that the system sheet loads
last and wins by cascade order rather than `!important`.

Blast radius today is one class, `.sr-cover`, which both files define — so the dashboard
copy currently wins where the system copy should. Small, but the ordering is wrong and
the next shared class will be a silent regression rather than a visible one. Swapping the
two lines is not trivially safe: it changes which declaration wins for any overlapping
selector, so it needs a render pass, which is why SR-093 measured it and left it.

*Status:* open · *Raised:* 19 Aug 2026

### SR-106 · Ten protocol covers load eagerly on the dashboard
Found during SR-093. The dashboard requests all ten covers — roughly 1.5 MB — with no
`loading="lazy"` on the below-fold ones. Only the first two or three are visible before
the carousel is scrolled.

Note the covers carry their kicker word and number inside the image, so they cannot be
swapped for a text overlay; lazy-loading is the whole fix.

*Status:* open · *Raised:* 19 Aug 2026

### SR-096 · Dispenza on index.html
Live regression from the SR-089 merge. `FRAMEWORKS.dispenza` was replaced by `distance`,
and index.html's expert card reads its count from `frameworkReach()` through
`data-sr-reach="dispenza"` — so the public page rendered "Contributes insight to 0
protocols". Reproduced in the browser before anything was touched.

53 occurrences, not the ~20 the line count suggested: lines 4009 and 4022 are
single-line JSON blobs carrying the same strings nine times over.

The `.expert-card2` bio and the `.sci-card` in the science strip were removed whole.
Both grids drop six to five and reflow 3+2; they are `auto-fit`, so the five keep full
width and the empty cell reads as whitespace.

**Deviation, easy to overturn:** the framework *lists* keep six. Dropping to five would
contradict method.html's "Six sources, one sequence" and the six records still in
FRAMEWORKS — the drift SR-089 and SR-090 were raised to end. The name became the
mechanism instead, "Mental rehearsal", which `SHARED.fourSteps` already uses for step 4,
so nothing was invented and no count changed. "the Quantum Field" attributions went with
the name rather than being reworded: that framing is his, not the method's.

**Not closed:** no card now carries the step-4 distancing framework that replaced him.
Logged as SR-107.

*Status:* complete on merge · *Raised:* 19 Aug 2026

### SR-097 · Reference Case, Source Insights and Why I Built This One on index.html
Taken in the order the handoff set, Reference Case first.

**Reference Case** assigned a psychological pattern to 30 named, identifiable people —
Monica Lewinsky, Simone Biles, Lady Gaga, Nelson Mandela, the Obamas, Jacinda Ardern to
burnout — each with a source URL and each labelled "true reference case" and "TRUE STORY
· RECENT HISTORY". Not a list but an ID convention through five layers. Nine dedicated
blocks removed whole (including the 84 KB `sr-v17-reference-system-runtime` holding the
29-person `STORIES` map, and four `anger-reference-case-v13..v16` pairs holding a 30th,
Terry Crews), 30 `RESOURCE_CONTENT` entries, 31 key-array members, 22 `res-item` blocks,
the map rows, and 19 refcase rules from *inside* the shared 151-rule sr-v29 stylesheet.

**Source Insights** was wired deeper still: 8 script blocks, 5 style blocks, 45
`data-v29-kind="insights"` selectors. Seven dedicated blocks removed whole, plus 20
`RESOURCE_CONTENT` entries, 32 key-array members, 12 `res-item` blocks, two feature
cards, the SR-002 title binder whose target no longer exists, and the p2 override.

**Why I Built This One** was two hero tabs and two slides. Both players are left with a
single tab — functional and correctly labelled, but a tab bar with nothing to switch to.
Reported, not changed; it is a design call.

index.html 1,413,723 → 1,104,000 chars.

Three things rendering and reading caught that grep did not:

- `ptResFromContent('refcase', …)` dereferences `RESOURCE_CONTENT[pk+'-refcase'].title`,
  so removing the data alone would have thrown a TypeError on every protocol page.
- Deleting the two builders orphaned whole CSS families — nothing sets
  `data-unified-reference` or emits `.rr-*`/`.sr28-*` any more. 53 + 29 rules removed
  after verifying nothing feeds them, and the `:where()` lists pruned; one emptied
  completely and would have shipped as `:where()` with no selector.
- **My own regex broke the file.** Stripping `'*-insights'` members assumed array
  position, but `READER_QUOTES` is an object literal keyed the same way, so it collapsed
  `'p1-insights':'…'` pairs into `'a':'b':'c'`. Audited across both passes afterwards:
  `-refcase` had zero key-style occurrences, so only that one object was affected.

*Status:* complete on merge · *Raised:* 19 Aug 2026

### SR-098 · No stated session length on index.html
Same rule and same precedent as SR-080: players keep their elements and lose their
numbers, no placeholder substituted. 147 `.v-time` / `.audio-time` readouts render empty.

Removed 80 static readouts, both dynamic ones, 10 `audioLabel` suffixes, 10 `audioMin`
properties, the `FOUNDER_VIDEOS` runtimes and the "Video · 2:50" meta they fed, 10
track-03 audio labels, 10 session-guide metas, and the prose. Three FAQ questions asked
"How long does a session take…" — the question changed with the answer, since answering
it without a length leaves it hanging.

Kept and reported: 60 minutes with the founder, 90-minute workshop and retreat segments,
half-day lengths, live-video booking lines, and "Walk for 5–15 minutes" in a Somatic
Release activity — an instruction, not the length of an unrecorded asset.

Two more found by reading rather than grepping. The journey strip concatenated
`parseInt(d.audioMin)` unguarded and would have shipped "One continuous experience · NaN
minutes" — the same defect class as the "undefined" SR-080 hit. And emptying the two
*dynamic* readouts terminated their JS strings early, leaving `<span class="v-time">'`;
JavaScriptCore caught it as Unexpected EOF.

Fixed in passing: a founder video caption read "Andre Robin", not Andre Robley.

*Status:* complete on merge · *Raised:* 19 Aug 2026

### SR-099 · Kenor International BV removed
SafeRise Protocol is independent and owned by Andre Robley personally. Wider than
scoped: Kenor was on six shipped pages and index.html was not one of them — the three
track pages, method.html twice (footer and founder signature) and method-porges.html;
index.html and protocol.html carried a bare "Sint Maarten".

The jurisdiction went with the company and nothing replaced it: no address, registration
number or trading name is settled. No sentence broke. `docs/INTEGRATION.md` updated too,
since it is the markup contract new pages are built from.

*Status:* complete on merge · *Raised:* 19 Aug 2026

### SR-100 · Site noindexed until soft launch
The domain was live and resolving with no crawl protection of any kind. `robots.txt` at
the root and `<meta name="robots" content="noindex, nofollow">` in all nine shipped
heads. Both, because robots.txt alone does not reliably keep a linked page out of an
index — the meta is what prevents indexing, and the crawler has to be allowed to read
the page to see it.

Verified served: each page fetched and parsed with `parentElement === HEAD` confirmed. A
meta landing after `</head>` is silently relocated into body and a source grep would not
have shown it.

**Comes off on soft-launch day**, both the file and the nine metas.

*Status:* complete on merge · *Raised:* 19 Aug 2026

### SR-101 · Social-proof strip corrected; no placeholder testimonials exist
The premise did not hold. There are no placeholder testimonial blocks and no "replace
before launch" anywhere in the repo, and no star ratings or attributed quotes. The
section already reads "Built and ready. Not yet reviewed… Nothing here is borrowed or
invented in the meantime", which is honest and was kept.

What was wrong was the stat strip, which a grep for "testimonial" does not reach. Each
claim checked against tracks.js under JavaScriptCore: "37 Modules Across 4 Tracks" was
false twice over (30 protocols, 3 visible tracks — Elevation is `visible:false` with no
protocols and no price) and "14m To Your First Shift" was a promised time to an outcome
on a page saying "Not yet reviewed" two lines above, and a duration SR-098's patterns
missed. "6 Science Frameworks" and "€0 To Begin" verified true and kept.

Found by screenshot: the same false counts were also in the **hero eyebrow**, above the
fold, the first factual claim a visitor reads.

*Status:* complete on merge · *Raised:* 19 Aug 2026

### SR-102 · Contact route added
No way to contact the business existed anywhere; the only `mailto:` was a share link
with an empty recipient. Raised as blocked, and `contact@thesaferiseprotocol.com`
supplied and confirmed as a live mailbox. One line beside the entity line on eight
pages — including index.html, whose footer is a `<template>` cloned into all twelve
surfaces, verified live rather than in source.

`resource.html` is the exception: the Reader has no footer element and no copyright line
at all, so there is nowhere to put it without inventing a component. It is always
reached from a page that carries the footer.

*Status:* complete on merge · *Raised:* 19 Aug 2026

### SR-103 · Dead footer legal links removed
Audited against what resolves, not intent. `index.html`'s `/terms`, `/privacy` and
`/cookies` all returned HTTP 404 against the server; `protocol.html`'s Terms, Privacy
and Cookies were `href="#"` and clicking each opened nothing — verified in the browser,
since `href="#"` alone does not tell you whether a handler is attached. All removed,
along with the `.footer-legal` CSS they orphaned.

`dashboard.html`'s FAQ, Account, Billing, Support, Terms and Privacy were kept: all six
open `mRoute`, confirmed opening, which renders "Not built yet" and names the path.

**Still missing, for scheduling:** Terms, Privacy, Cookies and a refund policy. They name
a contracting party and a data controller, so they need the entity question settled
first. When the privacy policy is written it has to state that journals never leave the
device — `Store` writes to localStorage only and there is no backend behind any of it.

*Status:* complete on merge · *Raised:* 19 Aug 2026

### SR-107 · No card carries the step-4 distancing framework
SR-096 removed the Dispenza expert card and science-strip card, leaving five of each
where there are six frameworks in `FRAMEWORKS`. The sixth — Distance & rehearsal, Kross
& Ayduk, the Best Possible Self literature, already written up on method.html by
SR-089/SR-090 — has no card on index.html, and no `data-sr-reach="distance"` anywhere,
so its six protocols are not shown.

Adding one means writing a bio, a role and an avatar for a literature rather than a
person, which is content authoring rather than a fix, so it was deliberately not done in
the removal pass.

*Status:* open · *Raised:* 19 Aug 2026
