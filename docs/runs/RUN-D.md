# Run D — Elevation hidden, register reconciled

Branch: `feat/elevation-hide`
Base: `3767fbe7c5578d706d10573a52eefb0df22361ff` — byte-identical to `origin/main`
(`git rev-parse origin/main` returns the same SHA). Tree clean at start. Run C's
`4fed45c` verified present by `git merge-base --is-ancestor` before any edit, so this
branch is cut from main and not from Run C's branch.

`node` is not installed on this machine, so the standing `node --check` on JS blocks is
substituted per Run B's method — the browser's own parser via `new Function(src)`, which
rejects the same syntax errors without executing — backed by a zero-error console read on
a real cold load. Recorded here rather than silently skipped.

---

## Phase 0 — base and hygiene

| check | result |
|---|---|
| HEAD cut from `origin/main` | yes — `3767fbe`, 0 ahead / 0 behind |
| tree clean | yes — `git status --porcelain` empty |
| Run C `4fed45c` present | yes — ancestor of HEAD, directly below the PR #27 merge |
| port 8642 (Run C's cold server) | free — `lsof -ti:8642` empty |
| any other stray server | none — `lsof -nP -iTCP -sTCP:LISTEN` had zero python/node/ruby/php rows; `ps` clean for `http.server`, `SimpleHTTPServer`, `npx serve`, `live-server`, `http-server` |

Nothing needed killing. This run inherited no processes.

### The register had a twelve-ID hole

`docs/fix-register.md` carried 62 written entries running SR-044 → SR-107. **SR-108
through SR-119 existed only in commit subjects and in `docs/runs/RUN-B` / `RUN-C`.** Two
of them (SR-108, SR-109) had already shipped and merged to main. The header was stale in
both directions:

- line 12 — "Highest ID currently issued: **SR-120**" — SR-120 was never issued, it was
  the ceiling of a reservation.
- line 13 — "**SR-096 to SR-120 are reserved, not yet issued**" — SR-096–SR-113, SR-115
  and SR-117–SR-119 were by then all issued, and eighteen of them written up or shipped.

Never issued anywhere in the repo, any branch, or any run log: **SR-114, SR-116, SR-120**.

**Next free ID: SR-120**, the top of the reservation. SR-114 and SR-116 are also free but
sit in the middle of a range other branches have already read past — which the register's
own header records as the cause of three previous ID collisions. Phase 5 allocates
SR-120; Phase 7 opens a fresh reserved block and records the new ceiling.

*Result: pass. No code touched.*

---

## Phase 1 — close the satisfied items (register only, no code)

The brief said "mark each closed". There was nothing to mark — none of the five had an
entry. The phase became *authoring* the missing entries at closed status, confirmed as
within intent before starting. Ten entries written, placed at the bottom of their severity
block per the register's own rule, and the stale header corrected.

| ID | block | status written | evidence |
|---|---|---|---|
| SR-108 | HIGH | complete | shipped `b9e5ff5`, merged `7ba529b` |
| SR-109 | HIGH | complete | shipped `f259e1e`, merged `7ba529b`; part (c) carried to SR-110 |
| SR-110 | HIGH | **open** | 17-surface inventory, scope confirmed as all 17 — Phase 4 |
| SR-115 | HIGH | **open** | reproduces at `dashboard.html:717`; fix spec now recorded — Phase 2 |
| SR-112 | MEDIUM | closed — already satisfied | all three track pages exist and render from `content/tracks.js`; 0 gaps, 10 cards, 18 FAQ each |
| SR-113 | MEDIUM | closed — already satisfied | `SHARED.faq` at `content/tracks.js:603` (12) + `TRACKS[1..3].faq` :655/:676/:697 (6 each) = 18 per page |
| SR-118 | MEDIUM | closed — already satisfied | zero `dispenza` in `content/tracks.js`; `FRAMEWORKS.distance` at :507, carried by t1-09, t1-10, t2-08, t3-03, t3-08, t3-10 |
| SR-111 | LOW | closed — already satisfied | 121 track-name strings, all matching `TRACKS[n].name`; track-page nav already bound |
| SR-117 | LOW | closed — already satisfied | one reader, `protocolResources` at :538, array-checks before `.indexOf`; `null` documented at :523/:532 as a sentinel |
| SR-119 | LOW | closed — already satisfied | `git ls-files -z \| xargs -0 grep -ni dispenza` — 2 files, both docs, one already scoped out at SR-084 |

Eight of the ten are open-and-shut. Two are open on purpose: SR-110 and SR-115 are this
run's actual work and their entries carry the confirmed fix specs so a later run does not
have to re-derive them from a run log.

### Header corrections

Both stale lines replaced. SR-096–SR-119 recorded as issued rather than reserved; the
ceiling separated from the highest-issued number; and SR-114 / SR-116 / SR-120 recorded as
free with the instruction to take SR-120 first rather than reach into the middle of a range
other branches have read past.

### Standing decision recorded in the register, not just in this log

`extras: null` stays `null` — twenty values, a documented sentinel meaning *unverified*,
distinct from `[]` meaning *verified, none*. Written into the SR-117 entry with an explicit
"do not tidy this in a later pass", because a run log is not where a standing decision
survives. It is cross-linked to SR-120, where `[]` is a genuinely wrong value.

### Verification

- 62 entries before, **72 after**. No duplicate headings.
- Every one of the 72 entries carries a `*Status:*` line (parsed, not eyeballed).
- `git status` — two files, both under `docs/`. **No code touched**, as the phase requires.

*Result: pass.*

---

## Phase 2 — SR-115, the deploy-preview cover URL

**Reproduced first.** [dashboard.html:717](dashboard.html:717), inside the Cue Card modal
`#mCrisis`, sourced its cover from
`https://deploy-preview-14--the-saferise-protocol.netlify.app/assets/covers/01.jpg`.

### The convention, found rather than invented

Every other asset reference on the page is **document-relative — no leading slash, no
`./`**:

| line | reference |
|---|---|
| 106 | `src="assets/dashboard/hero-corridor.jpg"` |
| 784 | `var COVER_01 = "assets/covers/01.jpg";` |
| 1057 | `var BASE = 'assets/covers/';` |

And the page's **own header comment at :13** already names the intended path —
`· Protocol cover 01 ....... assets/covers/01.jpg (the real Anxiety Reset cover)`.

So the convention was not a judgement call. Line 717 was the single survivor of the
standalone-mockup era, when the file was reviewed outside the repo and had no local assets
to point at; the header comment at :8 still says so — *"embedded here for review; in the
repo these become file paths"*. Everything else was converted. This one was missed.

**Change: one line.** `src="assets/covers/01.jpg"`.

### Verification — cold, fresh tab, and proved live

The preview runner's sandbox refuses `tools/serve.py` by relative path (`Errno 1,
Operation not permitted`) — Run C hit this too. It also **cannot read the project
directory at all**: an absolute-`ROOT` server pointed at the repo returned 404 for every
path. So verification ran against a scratchpad mirror of the tracked files, copied from the
working tree so it carried the fix, served with `Cache-Control: no-store` + `Pragma:
no-cache` + `Expires: 0`. `.claude/launch.json` was repointed at that server and **restored
to its committed contents before the commit** — confirmed by `git diff` returning empty for
that file.

Port 8642 confirmed free before starting.

| check | result |
|---|---|
| fresh tab, cache-busted (`?cb=srd115cold3render`), never a reused tab | — |
| resolved URL | `http://localhost:8642/assets/covers/01.jpg` → **200** |
| image decoded | `naturalWidth` 900, `naturalHeight` 1200, `complete` true |
| `onerror` fired? | **no** — `style.display` stayed empty |
| rendered on screen with the modal open | 163 × 150 at top 57 |
| requests to any `netlify.app` host | **zero** |
| console errors on a clean cold load | **zero** |
| div balance `dashboard.html` | 176 / 176 |
| CSS brace balance, all three sheets | 663/663, 299/299, 1083/1083 |
| JS parse | `node` not installed; inline block (81,770 B) parsed clean via `new Function` |

**Both null results were proved real, per the standing rule.**

- *Image probe:* the same `<img>` was repointed at
  `assets/covers/__SENTINEL_DOES_NOT_EXIST__.jpg`. `naturalWidth` fell 900 → **0** and the
  `onerror` handler set `display:none`. Restored to 900. The probe can see failure.
- *Parse probe:* `new Function('var x = ;')` threw `SyntaxError`. The check can fail.

One honest correction during the phase: the first attempt to open the modal used
`.classList.add('open')` and reported `display:none` with a 0×0 image. The class is `.on`
([css/saferise-dashboard.css:698](css/saferise-dashboard.css:698)), not `.open`. That was
my error, not a defect — re-run with `.on`, the modal opened and the cover rendered.

### Uniqueness re-confirmed before committing

`git ls-files -z | xargs -0 grep -nI 'deploy-preview'` — **every tracked file, every
extension, never a `*.html` glob.** Four matches remain, all under `docs/`: this register
and the Run A / Run C logs describing the defect. That is historical record and stays.
**No `netlify.app` URL remains in any tracked non-doc file.**

### Teardown

Server stopped via `preview_stop`. `lsof -ti:8642` → free. `lsof -nP -iTCP -sTCP:LISTEN` →
zero rows. `ps` → no `coldserve` or `serve.py`. `.claude/launch.json` restored.

*Result: pass. One line changed.*

---

## Phase 3 — the Elevation CTA

### Reproduced first, by clicking

Cold mirror of the **pre-change** tree, fresh tab, `?cb=srd3repro1`. Elevation selected
through the real rail control (`.sr-dash-railbtn[data-track="4"]`), not by calling
`render(4)` directly. The CTA was then clicked as a real mouse click on the resolved
element reference — `left_click at (467, 360)` — not a synthetic `dispatchEvent`.

**Result: `mRoute` opened, `aria-label="Destination"`, reading *"Not built yet · Plans ·
What each track includes and what it costs. Access is cumulative. · /plans"*.**

A control that says *"Tell me when it opens"* opened a price list. Confirmed, not inferred.

### The structure it sat in — checked before deciding how far to cut

The CTA was the third child of a JS-built block:

```
.sr-dash-empty
  ├── <h3>Elevation Series</h3>
  ├── <p>Seven protocols … Opening after the recording sprint.</p>
  └── <a class="sr-dash-go" href="#">Tell me when it opens →</a>   ← removed
```

That branch is reached only when `t.items.length` is 0. `DASHTRACKS[n].items` derives from
`TRACKS[n].protocols`; tracks 1–3 carry 10 each and `TRACKS[4]` has no `protocols` key at
all — so **the empty state exists solely to render Elevation.**

Removing the `<a>` therefore does **not** leave an empty framed box. It leaves a heading
and the paragraph that explains it — a coherent passive empty state with no control, which
is a valid intermediate. The `<h3>` and `<p>` are the remainder of Run C's surface
`917–919` and belong to Phase 4, so the phase boundary held. Measured after the change:
`.sr-dash-empty` renders at 156 × 406 with **0** controls inside it.

### Changed

- `dashboard.html:919` — the `<a>` removed, with a comment in its place recording what was
  there and why it is not coming back.
- `dashboard.html:1262` — the `TEXTMAP` row `[/tell me when it opens/i,'plans']` removed.

`TRACKS[4]` in `content/tracks.js` untouched, as instructed.

### Verified cold — and the route proved dead by sentinel pair

Fresh tabs, `no-store`, cache-busted, re-mirrored from the working tree.

| check | result |
|---|---|
| controls inside `.sr-dash-empty` after Elevation selected | **0** |
| any `<a>`/`<button>` in the DOM matching the CTA text | **0** |
| modal opened on selecting Elevation | none |
| console errors, clean cold load | **zero** |
| div balance | 176 / 176 |
| CSS braces | 663/663, 299/299, 1083/1083 |
| JS parse (`node` absent — `new Function`) | 82,030 B, OK; parser sentinel `caught SyntaxError` |

**Sentinel pair on the route itself.** A link carrying the exact removed text was injected
into the exact old parent and clicked → **no modal opened**. Then a link reading `Account`
was injected into the same parent and clicked → **`mRoute` opened**. So the route is dead
*and* the delegated handler is still alive at that position; the negative result is real
and not an artifact of injecting into an excluded container.

### One measurement I could not take

Screenshots of this tab returned uniformly black frames, before and after the change, at
every scroll position and with the tab fronted. The DOM disagrees with the image —
`#mRoute` measured 1280 × 720, `opacity: 1`, `visibility: visible`, box 560 × 374 at
top 56 — and `computer{action:"scroll"}` timed out with *"The Browser pane is currently
hidden."* So this is a capture artifact of the preview pane in this session, not a page
defect. **Every visual claim in this phase rests on measured DOM geometry and computed
style, not on a screenshot.** Recorded rather than passed off.

### Siblings found — reported, not removed

Phase boundary kept deliberately so the surface count stays checkable.

| where | text | Run C surface |
|---|---|---|
| `.sr-dash-railname` / `.sr-dash-railmeta` (dashboard:240) | "Elevation Series" / "Coming soon" | #1 — Phase 4 |
| `p.note` from `JOURNEY[4]` (dashboard:862) | "Elevation Series · opening soon" | #2 — Phase 4 |
| `.sr-dash-empty p` (dashboard:918) | "…**Opening after the recording sprint**." | remainder of #3 — Phase 4 |
| `.sr-dash-jbody` from `JOURNEY[4]` | "Resource library to be confirmed." | inside #2 — Phase 4 |

No second waitlist and no second live form on this surface. Two further undated strings —
`band photograph pending`, `Banner photograph pending` — are asset placeholders, not
product promises, and are not Elevation surfaces; they sit outside this run's scope and are
noted only so the sweep is complete.

### Inventory correction against Run C

**`TEXTMAP:1262` is not one of the 17.** Run C's §1e table lists three dashboard surfaces
(240, 862, 917–919); the route row appears only in the prose beneath it. Phase 3 removed
one surface-part plus that route, so the true totals are **4 dashboard surfaces and 18
repo-wide**, not 3 and 17. Recorded now so the Phase 7 reconciliation balances rather than
appearing to overshoot.

### Teardown

`preview_stop` called. `lsof -ti:8642` → free. Zero listening sockets. No `coldserve` or
`serve.py` processes. `.claude/launch.json` restored — `git diff` on it is empty.

*Result: pass. Two removals, one comment added.*

---

## Phase 4a — bounded removals

### The Netlify form — what I checked and what I did not

The form is real: `name="elevation-waitlist"`, `method="POST"`, `data-netlify="true"`,
`netlify-honeypot="bot-field"`, hidden `form-name`, a required `email` input and a submit
button, posting through `srSubmit` → `srPost` → `fetch('/')`. Confirmed live in the DOM
before removal.

**Submission count: taken on Andre's word, not verified here.** He confirmed the form is
empty. This run has no Netlify credentials, did not attempt to obtain any, and did not open
the Netlify dashboard. That is the honest state of the evidence — the removal proceeded on
an explicit instruction, not on a check I performed.

**Do submissions survive removal? Yes.** Netlify stores submissions server-side against the
site, not in the repository. Deleting the markup stops new submissions and drops the form
from form detection on the next build; **it does not delete anything already collected.**
Anything previously submitted stays in Netlify's own store, under the site's Forms tab,
until someone deletes it there. Nothing in this commit can destroy a submission.

The unrelated `affiliate-application` Netlify form is untouched and still present —
verified after the change.

### Reproduced before removing — all four surfaces

| surface | reproduction |
|---|---|
| `index.html` nav tab | clicked → `prog-elevation` active, `#main-content` hidden |
| `index.html` footer link | clicked → `prog-elevation` active |
| `dashboard.html` rail button | Phase 3, clicked → track 4 empty state rendered |
| `protocol.html` footer link | clicked → inert; `href="#"`, no `onclick`, URL gains a bare `#` |

The overlay carried 7 protocol cards and the form. All four reproduced. **Nothing failed to
reproduce.**

### Drift found against Run C

**The footer link is one source line but twelve rendered links.** `index.html` holds a
single `<template id="sr-footer-template">` cloned into `#main-content` and every
`.prog-overlay` ([index.html:3036](index.html:3036)). Run C's count of one footer surface is
correct at source level; the DOM carried **12** Elevation links. Removing the one `<li>`
removed all twelve, and removing the overlay dropped a clone target — footers went 12 → 11.
Recorded because a DOM-level audit would otherwise read as a twelve-fold discrepancy.

**One index.html surface missing from Run C's inventory:** a code comment at what is now
[index.html:5342](index.html:5342) naming "Elevation's single-preview resources". Not in the
§1e table. Left in place — see below.

### Removed

**`index.html`**

| what | detail |
|---|---|
| `#prog-elevation` overlay | 52 lines — back button, two mounts, 7 `elev-` cards, workshop/1:1 pair, whats-included mount, waitlist panel **and the Netlify form** |
| nav tab | `.nav-link.tab-purple` + its absolute-positioned "Soon" badge |
| footer `<li>` | the `showProg('elevation')` link inside the footer template |
| `SERIES_CONFIG.elevation` | badge *"Track 04 · Premium Tier · Phase 4 · Coming Soon"* |
| `RESOURCE_CONTENT` | seven `elev-1…7` records, each *"Coming Soon"*, *"Not yet in production"*, *"Join the waitlist below"* |
| CSS | `#elevation-protoList.pcard-grid .proto-item{…}` — dead selector |

**`dashboard.html`** — the `data-track="4"` rail button and its "Coming soon" meta.
**`protocol.html`** — the inert `Elevation Series` footer link.

`TRACKS[4]` untouched.

### A mistake I made, and how it was caught

The `SERIES_CONFIG` splice used `before[:-3]` where it needed `[:-2]`. That deleted the
**closing brace of the `corporate` entry**, not just the trailing comma, and produced
`SyntaxError: Unexpected token ';'` — which took `renderProtocolPage` and `READER_ICONS`
down with it. The whole page's JS was broken.

It was caught on the cold load, by console errors. **It would have been caught before the
load if I had run the JS parse check with the div and CSS balance checks instead of after
them** — I ran `<div>` balance and CSS braces, both of which passed, and treated that as
sufficient. Neither can see a JS brace. Fixed by restoring the brace, then re-verified with
the parse check run *first*: 10 inline blocks, all parse, parser sentinel
`caught SyntaxError`.

Recorded rather than quietly repaired, because the process lesson is the useful part: **the
balance checks and the JS check are not interchangeable, and the JS check has to run before
the render, not after it.**

### Verified cold — fresh tabs, `no-store`, cache-busted

| check | before | after |
|---|---|---|
| `#prog-elevation` | present | **absent** |
| `form[name="elevation-waitlist"]` | 1 | **0** |
| other `data-netlify` forms | `affiliate-application` | `affiliate-application` (untouched) |
| nav tabs | 8, incl. "Elevation SeriesSoon" | **7**, no Elevation |
| footer Elevation links (rendered) | 12 | **0** |
| cloned footers | 12 | 11 (one fewer overlay) |
| `.prog-overlay` count | 11 | 10 |
| dashboard rail buttons | 4 | **3**, no `data-track="4"` |
| dashboard Elevation / "coming soon" text nodes | present | **0** |
| `protocol.html` track links | 4 | **3** |
| console errors | — | **zero** |
| JS parse | — | 10 blocks OK; sentinel `caught SyntaxError` |
| div balance | — | index 2840/2840, dashboard 176/176, protocol 126/126 |
| CSS braces | — | 663/663, 299/299, 1083/1083 |

**Regression check.** All five surviving overlays still open — `prog-personal`,
`prog-couples`, `prog-corporate`, `prog-compare`, `prog-services` — and all three surviving
dashboard rail buttons still render (20 cards each, identical across tracks).

**Sentinel pair.** A `nav-link tab-purple` button carrying
`showProg('elevation')`, injected into the real nav bar and clicked → **no overlay
activated**. The same button shape carrying `showProg('corporate')`, same parent → opened
`prog-corporate`. Route dead, mechanism live.

### ⚠ Exposed by 4a — reported, not acted on

**1. `showProg('elevation')` now blanks the page. Reproduced.**
`showProg` hides `#main-content`, then activates `prog-<id>` if it exists. With the overlay
gone it hides main content and activates nothing: `{active: [], main: "none"}` — a blank
viewport. `showMain()` recovers it, but nothing calls that automatically.

Three callers remain, all 4b/4c surfaces:
[index.html:2863](index.html:2863) plans-strip panel · [index.html:7599](index.html:7599)
plans card · [index.html:8048](index.html:8048) workshop card.

**This branch must not merge between 4a and 4b.** 4b/4c remove all three callers and the
hazard closes. Flagged rather than fixed because the boundary instruction was explicit and
these are 4b/4c surfaces — but a guard in `showProg` is one line if you would rather the
intermediate state be safe.

**2. `SERIES_CONFIG` existed only to serve Elevation.** The `.sr-dash-empty` pattern again,
and larger. Checked against `HEAD` before the edit: the **only** `hero-mount-*`,
`protocols-head-mount-*` and `whats-included-mount-*` elements in `index.html` were the
three `-elevation` ones. The `personal`, `couples` and `corporate` entries in
`SERIES_CONFIG` had no mount points and never rendered — they were already dead before this
run.

So `SERIES_CONFIG` (now 3 entries), `renderSeriesHero` (:4986),
`renderProtocolBrowseHead` (:5003), `renderWhatsIncludedHTML` (:5016) and the
`DOMContentLoaded` mount loop (:5086) are a closed island — no callers outside each other,
no mount targets left. **~110 lines of dead code.** The three surviving overlays render
their heroes from hardcoded markup and are unaffected, confirmed by opening all three.
Left in place; whether it goes is a judgement for Andre.

**3. Smaller residue, all left alone**

| where | what | why left |
|---|---|---|
| [index.html:47-49](index.html:47) | `.nav-link.tab-purple` rules | dead once the tab went; harmless |
| [index.html:830](index.html:830), [:865](index.html:865) | CSS comments naming Elevation as a live 4th track | now stale, but rewriting comments is copy editing |
| [index.html:5342](index.html:5342) | code comment naming "Elevation's single-preview resources" | same; also missing from Run C's inventory |
| [index.html:4755](index.html:4755) | `key.indexOf('elev-')` → `'Elevation Series'`, **`'€222 one-time'`** | dead branch now, but it carries the pricing tier — **4b** |

Items 2863, 7595–7599, 7613, 7726, 8044–8048, 8426 in `index.html` and 858, 913 in
`dashboard.html` are the 4b/4c surfaces and were not touched.

### Surface reconciliation

Corrected total **18**. Closed so far: **6** — the CTA and its `TEXTMAP` route (Phase 3),
plus overlay, index nav tab, index footer link, dashboard rail button, protocol.html footer
link (4a). Counting the routes/data removals as part of the overlay surface rather than
separately, as Run C's table does. **12 remain**, all 4b/4c.

### Teardown

`preview_stop` called. `lsof -ti:8642` → free. Zero listening sockets. No `coldserve` or
`serve.py`. `.claude/launch.json` restored — `git diff` empty.

*Result: pass, with one self-inflicted syntax error found and fixed before commit.*

---

## Phase 4b — copy fragments and the pricing tier

**Process change in force from here:** the JS parse check runs **first**, before div
balance and CSS braces. 4a proved those two cannot see a broken script brace.

### Reproduced before removing

| surface | reproduction |
|---|---|
| plans-strip panel | grid measured 4 children / 4 tracks, last = *"Coming Soon Elevation Series Coming Soon Pricing TBA"* |
| plans card | grid 4 children, last = *"Track 04 — Premium Elevation Series…"* |
| workshop card | grid 4 children, last = *"Coming Soon Elevation Coming Soon Pricing TBA"* |
| workshops copy | *"…Relationship from €139/couple · Professional & Elevation workshops coming soon."* |
| "See all plans" button | *"See all plans — Relationship, Professional & Elevation"* |
| `€222` branch | **already unreachable** — 112 `RESOURCE_CONTENT` keys, **zero** beginning `elev-`, zero `[data-resource^="elev-"]`. A dead branch carrying a live price. |

### A trap found before it was sprung

`index.html` has **three** grids matching `repeat(4,1fr)` and only one is a plans grid — the
others hold "Guided Video…Workbook" and "Founder-Led…Logistics Arranged". A pattern-based
edit would have collapsed two unrelated layouts. **Every grid edit was anchored by line
number and asserted against its neighbours instead.**

### Changed

`index.html` — plans-strip panel, plans card, workshop card, the `elev-` → `'€222
one-time'` branch. Workshops sentence now ends *"…Relationship from €139/couple."*; the
*"Professional & Elevation workshops coming soon"* clause went **entirely**, not trimmed to
"Professional", because it fails the no-undated-promises rule independently. Button now
reads **"See all plans"**.

`dashboard.html` — `ENTITLED[4]`, `TRACKMETA[4]`, `JOURNEY[4]`, and the `.sr-dash-empty`
branch. All unreachable once the rail button went; the branch existed solely to render
Track 04, since every shipping track has ten protocols and `items.length` is never 0. A
comment records that a future empty track needs its own copy, not the retired one's.

Three grids closed to three columns. Verified: 3 children, 3 computed tracks, Professional
last, **no empty cell in any of them**.

### `showProg` guard — taken

```js
const target = document.getElementById('prog-' + id);
if (!target) return;
```

resolved first, before anything is hidden.

| call | before | after |
|---|---|---|
| `showProg('elevation')` | `{active: [], main: "none"}` — blank page | `{active: [], main: ""}` |
| `showProg('does-not-exist')` | blank page | `{active: [], main: ""}` |
| `showProg('corporate')` (sentinel) | opens | **still opens** |

General, not a patch for this removal — any future hidden series hits the same lookup.

### Verified cold

| check | result |
|---|---|
| JS parse (**run first**) | index 10 blocks OK, dashboard 1 block OK; sentinel `caught SyntaxError` |
| div balance | index 2822/2822, dashboard 175/175, protocol 126/126 |
| CSS braces | 663/663, 299/299, 1083/1083 |
| console errors, index + dashboard | **zero** |
| `showProg('elevation')` callers | **0** |
| `€222` anywhere in the DOM | **false** |
| rendered "Elevation" text nodes, index | **1** — the comparison-table `<th>`, which is 4c |
| dashboard rendered residue (Elevation / opening soon / coming soon / recording sprint / to be confirmed) | **none** |
| dashboard `.sr-dash-empty` | absent |
| **regression** — all three dashboard tracks | 20 cards + 3 journey columns each, correct notes |

### Reported, not touched

Two undated promises survive on `index.html`, both about **Track 03, a shipping track**,
not Elevation: *"Coming Soon / Pricing TBA"* on the Professional plans-strip panel and
*"Pricing to be announced · team programmes priced separately"* on the Professional plans
card. They fail the no-undated-promises rule on their own but are outside the Elevation
scope. They need their own item and a date or a price.

### Reconciliation

**14 of 18 closed.** Remaining: the comparison-table column (4c) and the three residue
items already listed in 4a — the `tab-purple` CSS and the stale comments at 830 / 865 /
5342, which are documentation rather than surfaces.

*Result: pass.*

---

## SR-121 — `SERIES_CONFIG`, removed on its own ID

Split out of SR-110 deliberately: it is a separate finding, it predates this run, and
burying 117 deleted lines inside an Elevation commit would make both diffs harder to read.

### Condition 1 — no live caller. Checked across every tracked file.

`SERIES_CONFIG`, `renderSeriesHero`, `renderProtocolBrowseHead` and
`renderWhatsIncludedHTML` appear **only** in their own definitions and in each other. No
`hero-mount-`, `protocols-head-mount-` or `whats-included-mount-` id exists anywhere in the
repo. A closed island. Nothing turned up, so nothing to stop for.

### Condition 2 — prove the hardcoded-markup claim by rendering

Not reasoned from. Each of the seven surviving overlays was fingerprinted **before** the
removal and again **after**, on cold loads: rendered `innerHTML` byte length, normalised
text length, element count, `.proto-item` count, and a rolling content hash over the full
markup.

| overlay | before | after |
|---|---|---|
| `prog-personal` | 319,380 B · 5,131 el · hash 2607618881 | **identical** |
| `prog-couples` | 278,929 B · 5,048 el · hash 3406980494 | **identical** |
| `prog-corporate` | 237,185 B · 4,069 el · hash 1164681881 | **identical** |
| `prog-compare` | 17,601 B · 144 el · hash 1798882367 | **identical** |
| `prog-services` | 20,943 B · 179 el · hash 2173745352 | **identical** |
| `prog-workshops` | 22,113 B · 173 el · hash 911637805 | **identical** |
| `prog-about` | 53,412 B · 523 el · hash 785733212 | **identical** |

All seven byte-identical, hashes included. The three track heroes still render their own
headings — "PersonalTransformation", "RelationshipHealing", "Career& Performance".

**Fingerprint proved sensitive:** appending a single character to one paragraph moved
`prog-personal` from 319,380 B / 2607618881 to 319,381 B / 2135190279; restoring it returned
both exactly. A probe that cannot see a one-character change would not have been evidence.

### After removal

117 lines gone. All four symbols throw `ReferenceError`. Ten inline blocks parse (sentinel
`caught SyntaxError`). Console clean. Div balance 2812/2812.

---

## A rule I broke, and the correction

**`.claude/launch.json` was committed pointing at the scratchpad server** in the first 4b
commit. I restored it *after* committing instead of before — the teardown ran in the wrong
order relative to `git commit`.

Audited all five commits: **only that one** was affected; `1a4ef46`, `52ed940`, `ca2a39c`
and `0f4668d` all carry `tools/serve.py`.

Corrected by amending rather than stacking a fixup, because a merge to main would otherwise
carry a commit pointing the dev server at a scratchpad path that exists on no other machine.
The SERIES_CONFIG work was held aside, the amend applied, then the work restored.

**The 4b commit SHA changed: `6615107` → `2bb754b`.** Every commit re-audited afterwards;
all five now carry `tools/serve.py`.

The order that actually works, and which the standing rules should say explicitly: stop the
server, restore `launch.json`, *then* stage and commit.

---

## Phase 4c — the comparison table

### Reproduced first

`#prog-compare` holds one table: a header row of 5 `<th>` — blank, Personal, Couples,
Career, Elevation — and 6 body rows of 5 cells each.

| row | Personal | Couples | Career | Elevation |
|---|---|---|---|---|
| Format | Self-Paced | Self-Paced | Self-Paced | Self-Paced |
| Protocols | 10 | 10 | 10 | 7 |
| Who it's for | Individuals | Couples | Individuals | Advanced practitioners |
| Entry price | Free → €19/mo | TBA | TBA | Waitlist |
| Best for | Anxiety, anger… | Rupture, intimacy… | Pressure, rejection… | Wealth, health… |
| Available | Now | Coming Soon | Coming Soon | Coming Soon |

**The spec's "Elevation-only rows removed entirely rather than left with empty cells" had
no work to do.** Every row carried content in all four track columns; `empty_cells` measured
**0** before the edit. There were no Elevation-only rows. Reported rather than invented —
the spec anticipated a shape this table does not have.

### Changed

One `<th>` and one `<td>` from each of the six rows. Anchored by line: the header neighbours
were asserted in order (`Personal` / `Couples` / `Career` / `Elevation` / `</tr>`) before
the delete, and **each removed `<td>` was matched against its expected Elevation text** —
`Self-Paced`, `7`, `Advanced practitioners`, `Waitlist`, `Wealth, health, wisdom,
creativity, purpose`, `Coming Soon` — with a cell-count assertion of 5 before and 4 after on
every row. No pattern matching anywhere.

### Verified

JS parse first: 10 blocks, all OK, sentinel `caught SyntaxError`. Div balance 2812/2812.
CSS braces 663/299/1083.

Tag balance run properly this time: `<table>` 2/2, `<thead>` 2/2, `<tbody>` 2/2, `<tr>`
14/14, `<th>` 8/8, `<td>` 48/48. **A first pass reported `<th>` 10/8** — a false alarm from
counting `<th` as a prefix, which also matches `<thead`. Re-run with `\b` boundaries and it
balances. Recorded because a naive tag counter is exactly the kind of check that looks
authoritative and is not.

DOM after: 4 headers, 6 rows, **4 cells in every row**, **0 empty cells**, 0
`colspan`/`rowspan`, **0 rendered "Elevation" text nodes anywhere on the page**, console
clean.

### ⚠ "Equal widths" was not delivered, and why

The spec asked for equal widths. The table uses `table-layout:auto`, so columns size to
content — they were **already unequal before this run** (200 / 123 / 123 / 121 / 133).

I wrote `.sr-cmp-col{width:calc((100% - 200px)/3)}` into `css/saferise-system.css` — the
system sheet rather than an inline style, per CLAUDE.md — with the class on the three track
`<th>`s. Then the measurements started disagreeing with each other, and the cause turned out
to be that **the preview viewport had collapsed to 0×0**: `window.innerWidth`, `innerHeight`,
`document.documentElement.clientWidth` and `body.getBoundingClientRect().width` all returned
**0**. A new tab and `resize_window` to the desktop preset did not recover it. Earlier in
this same run the pane reported 1280×720, so it degraded mid-session — the same class of
artifact as the black screenshots in Phase 3.

**Every width and overflow number I took in this phase is therefore invalid, including the
"253 / 275 / 252, no overflow" reading I took before noticing.** A table inside a 0-width
`overflow-x:auto` wrapper collapses to its `min-width:700px` and reports overflow
unconditionally; none of it describes a real browser.

**So the rule and the class were reverted.** `css/saferise-system.css` is byte-identical to
`HEAD`. Shipping a layout change I could not measure would have contradicted the standard
this run has held to everywhere else. The structural removal stands on DOM facts — cell
counts, empty-cell counts, text content — which a collapsed viewport does not affect.

**Outstanding:** one measurement in a real viewport, then restore the rule if the columns
are uneven. Logged on SR-110 as an open sub-item.

### Found in passing, not acted on

The headers read **"Couples"** and **"Career"**, not the record's `Relationship Healing` and
`Professional Performance`. SR-111 scanned for the full track names and so never saw these
short forms. Not a 4c surface; noted on SR-110.

### Teardown — in the corrected order

Server stopped → `lsof -ti:8642` free, zero listeners → `.claude/launch.json` restored,
`git diff` empty → **then** staged and committed.

---

## Phase 4c (part 2) — documentation residue

Separate commit from the table, as instructed.

### Removed

`.nav-link.tab-purple` × 3 rules at [index.html:47](index.html:47). Confirmed dead first:
`tab-purple` appeared **3 times in the whole repo**, all three being those rules, and **0**
elements carried the class in the DOM.

### Corrected — and then corrected again

Three comments named Elevation as a live thing. My first rewrite of the
`<style id="sr-series-hero">` header said *"Applies to all 3 track pages"*.

**That was false, and I caught it before committing.** The block is inline in `index.html`;
the three track pages are separate documents rendered by `js/saferise-track.js` and never
load it. Worse, the block is now dead on `index.html` too — measured on a cold load: **0**
`.pcard-grid` elements, **0** `.sr-hero-*` elements. Trading one false comment for another
would have been the worst outcome of the phase.

Final state of the three:

| line | now says |
|---|---|
| 823 header | that the block is **currently unused**, why (SR-110 took the only `.pcard-grid`, SR-121 took the `.sr-hero-*` emitter), that the track pages do not load it, and points at SR-123 |
| 861 `--pcard-cols` | that the only grid ever setting it above the default was Elevation's 7-item list, and nothing sets it now |
| 5211 reader fallback | names `crisis-p10` — verified as **the only one of 91 resource keys** that fails the protocol-key pattern and takes the popup path — instead of Elevation's removed previews |

### Verified

JS parse first: 10 blocks OK, sentinel `caught SyntaxError`. Div 2812/2812.
`.tab-purple` 0, `.pcard-grid` 0, `.sr-hero-*` 0, `.proto-item` **62** (unaffected, base
rules), overlays 10, **rendered "Elevation" text nodes: 0**.

Outside `<style>`, `<script>` and comments, `index.html` contains the string "Elevation"
**zero** times. The two remaining occurrences are in the SR-referencing comments above.

**One console reading discarded.** The reused `seed` tab reported eight
`ERR_CONNECTION_REFUSED` errors — stale, from that tab hitting the previous server across a
stop/start. A fresh tab on the running server reported none. The stale reading is recorded
rather than quietly dropped.

### Three findings logged, none fixed

- **SR-124 · HIGH — `index.html` contradicts the price record, and itself.**
  `content/tracks.js` holds `PRICING` marked *locked 2026-08*: **€9 / €19 / €29**.
  `index.html` loads that file and ignores it, carrying two hardcoded ladders:
  [:4746](index.html:4746) says €19 / €29 / **€49**, and [:6103](index.html:6103) says
  €19 / €29 / **€39**. Every track disagrees with the record, and the two in-page ladders
  disagree with each other on Professional. Found while answering question 3 of the SR-122
  brief. Which ladder is correct is commercial, not technical.
- **SR-122 · MEDIUM — the undated promises**, recorded with the three data points asked for.
  Surfaces 1 and 3 are **stale, not undecided** — `PRICING.t3` exists and is locked. Surface
  2 is mixed: the track half is stale; the *"team programmes priced separately"* clause names
  something with **no price anywhere in the data**, so removing that clause is the fix.
  Blocked on SR-124 — writing a figure now would add a third ladder.
- **SR-123 · LOW — the dead `sr-series-hero` block**, same shape as SR-121, left for its own
  commit.

### Teardown — corrected order

Server stopped → `lsof -ti:8642` free, zero listeners → `launch.json` restored, `git diff`
empty → **then** staged and committed.

---

## Phase 5 — SR-120. **Does not reproduce. Nothing changed.**

ID confirmed before writing, not assumed: SR-120 was reserved for exactly this, is
cross-linked from SR-117, and had no entry.

### The premise is false

The brief: *"`p1-advisory` is written and the Reader serves it, but `META['t1-01'].extras`
is `[]`."*

**`p1-advisory` has never existed in this repo.** The advisory keys are `p2-`, `p3-`, `p4-`,
`p8-`, `p9-`, `p10-advisory`. `p1`'s seven keys are `companion`, `crisiscard`, `disclosure`,
`guide`, `listen`, `walkthrough`, `watch` — no conditional resource among them.

### The mapping is right in both directions

The second conditional is keyed **`-repair`, not `-invitation`**, which is what makes this
easy to get wrong from the outside:

| conditional | `extras` value | content key | claimed by | content exists for |
|---|---|---|---|---|
| Proximity Guide | `advisory` | `pN-advisory` | t1-02, 03, 04, 08, 09, 10 | p2, p3, p4, p8, p9, p10 |
| Invitation to Repair | `invitation` | `pN-repair` | t1-02, 04, 08, 09 | p2, p4, p8, p9 |

Both exact. Swept **all thirty protocols across all three tracks**: **zero** cases where
`extras` claims content that does not exist.

### The null result was proved real before being trusted

The sweep was re-run against a sentinel copy of `content/tracks.js` in which `t1-01` was
given an `'advisory'` it has no content for. It reported **exactly one** mismatch —
`t1-01 -> p1-advisory` — and the real tree reported zero. A probe that could not see the
defect it was looking for would not have been evidence.

### Confirmed live

On `personal-transformation.html`, cold: `protocolResourceCount('t1-01')` → **7** (the seven
unconditional resources, neither conditional present). `protocolResourceCount('t1-02')` →
**9** (both present). `SHARED.resources.length` → 9.

**`t1-01: extras: []` is correct** — verified, and neither conditional applies. It is not
the "wrong `[]`" the brief described.

### A correction to my own earlier work

The SR-117 entry I wrote in Phase 1 said the `null` sentinel *"is not the same as a wrong
`[]` — see SR-120, where `[]` contradicts content that demonstrably exists."* **That
sentence was wrong**, written from the brief before the item was investigated. The entry now
carries the correction in place. The `null` / `[]` distinction itself still stands; only the
example was false.

*Result: does not reproduce. Register updated, no code touched.*
