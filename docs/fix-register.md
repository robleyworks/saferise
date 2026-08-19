# SafeRise — fix register

Canonical record of defects and design decisions. Commits reference the ID:
`fix: SR-0NN …` or `feat: SR-0NN …`.

**Rules**
- Never renumber an existing ID.
- New items go at the bottom of their severity block with the next free number.
- The number is global — it does not restart per block.
- Items are marked complete when the branch carrying the fix merges to main, not
  when the commit is made.
- Highest ID currently issued: **SR-080**.
- **SR-068 to SR-080 are reserved, not yet issued.** The block was taken in
  advance on 19 Aug 2026 for the modal-shell work. IDs collided three times
  because parallel branches each read this ceiling and allocated from it at the
  same moment; reserving the range up front is what stops the fourth. A gap
  between the last written entry and this ceiling is expected — do not "tidy"
  it by lowering the number, and do not allocate inside the reserved range
  from another branch.

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
