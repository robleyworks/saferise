# SafeRise — fix register

Canonical record of defects and design decisions. Commits reference the ID:
`fix: SR-0NN …` or `feat: SR-0NN …`.

**Rules**
- Never renumber an existing ID.
- New items go at the bottom of their severity block with the next free number.
- The number is global — it does not restart per block.
- Items are marked complete when the branch carrying the fix merges to main, not
  when the commit is made.
- Highest ID currently issued: **SR-055**.

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
