# Track Sweep Report

Diagnosis only. No site files were modified to produce this report. No register IDs were allocated. All facts below were re-verified against the repository at commit `6d38688` on `chore/track-sweep`; nothing in the run brief was taken on trust — several details in it had already diverged (see inline notes) and are corrected here.

---

## Phase A · Animation

### Where the reveal system lives

- `js/saferise-track.js:677-722` (`initReveal()`) is the only place `.sr-tp-revealsec` and `.sr-tp-in` are added. It walks `#page`'s direct children, keeps the ones with class `sr-tp-hero` or `sr-tp-band`, tags each with `.sr-tp-revealsec`, and observes it with `new IntersectionObserver(..., {threshold: 0.12, rootMargin: '0px 0px -8% 0px'})`. On intersect it adds `.sr-tp-in` and `io.unobserve()`s the section — a one-shot reveal, not re-triggered on scroll-back.
- The same call also stages card groups (`.sr-tp-cartrack`, `.sr-tp-costgrid`, `.sr-tp-rangecols`, `.sr-tp-sixgrid`, `.sr-tp-inc`) by adding `.sr-stagger` to each and `.sr-in` once its parent section intersects (`js/saferise-track.js:703-706`).
- `js/saferise-system.js:275-291` runs a **separate** `IntersectionObserver` for `.sr-stagger` grids on the marketing pages (`index.html`, `dashboard.html`) — same shape, independent instance. The two scripts never share one observer; `js/saferise-track.js`'s own comment (lines 662-668) explains this is deliberate, since the track-page file can't load `js/saferise-system.js` (that module also owns the marketing-page carousel/scroll rail).
- **No IntersectionObserver support** degrades to "reveal everything immediately" (`js/saferise-track.js:685-696`) — a plain-state fallback, not a broken one.

### Selectors that depend on the reveal classes

`css/saferise-system.css:201-223`:
- Base (opacity:0, `transform:translateY(16px)`, transition-delay staggered 0/100/200/300ms): `.sr-tp-revealsec .sr-tp-eyebrow`, `h1`, `h2`, `.sr-tp-lede`, `.sr-tp-herorule`, `.sr-tp-body`, `.sr-tp-sechead+*`, `.sr-tp-lede+*`.
- Revealed state (`opacity:1;transform:none`), gated on **both** classes together: `.sr-tp-revealsec.sr-tp-in` + each of the same eight selectors.
- `.sr-stagger>*` (`css/saferise-system.css:178-181`) is the separate card-group mechanism: `opacity:0` by default, `.sr-stagger.sr-in>*{opacity:1;transform:none}`.

### Reduced motion — confirmed gap

`css/saferise-system.css:1828-1834` is the one sitewide `@media (prefers-reduced-motion: reduce)` block. It sets `*,*::before,*::after{transition-duration:.01ms!important;animation-duration:.01ms!important}` and gives **`.sr-stagger>*` an unconditional override**: `opacity:1;transform:none` — card groups are visible immediately under reduced motion, independent of whether `.sr-in` was ever added.

**`.sr-tp-revealsec`/`.sr-tp-in` get no equivalent unconditional override.** The comment at `css/saferise-system.css:196-200` asserts "Reduced motion needs nothing added here" on the theory that the blanket `.01ms` transition-duration rule is sufficient — but that rule only shortens the transition once `.sr-tp-in` is added by the JS observer; it does not put the base state at `opacity:1`. A reduced-motion visitor with JavaScript disabled, or one whose browser lacks `IntersectionObserver` in some future/degraded environment where the JS-level fallback also fails to run, sees text sections stuck at `opacity:0` — a plainly worse failure mode than the `.sr-stagger` groups, which are hard-coded visible regardless of JS state. This is a real inconsistency between two reveal mechanisms living in the same file under the same media query, not a hypothetical.

Separately: forcing `transition-duration` to `.01ms` is not "no transition runs" — it is a transition that completes in one frame. For the letter of a strict `prefers-reduced-motion` implementation this is a defensible, common pattern (WCAG doesn't require literally zero duration), but it means an automated check for `transitionDuration === '0s'` would fail even though the effect is visually indistinguishable from instant.

### Dynamic verification — what could and could not be confirmed live

No Playwright or Node is installed in this environment (`python3 -c "import playwright"` → `ModuleNotFoundError`; `node` → command not found). `tools/serve.py` was run directly via Bash (`python3 tools/serve.py 8642`, backgrounded) — the harness's own `preview_start` with the existing `.claude/launch.json` entry failed with a sandbox permission error on the relative path, so the server was started manually and the existing Browser-pane tooling (Chromium via CDP) was driven instead, at 1280×800 and 390×844, against all three live track pages (`personal-transformation.html`, `relationship-healing.html`, `professional-performance.html`).

Confirmed live, all three tracks:
- **Hero carries the reveal class on load**: on first paint the hero `<div>` already has `class="sr-tp-hero sr-tp-hero--photo sr-tp-revealsec sr-tp-in"` — both classes present immediately, no visible flash-then-reveal. Verified via `getComputedStyle`/`classList` inspection on `professional-performance.html`, all ten `.sr-tp-band` sections below it correctly start with only `.sr-tp-revealsec` (no `.sr-tp-in`) until scrolled into view.

**Could not reliably confirm — environment limitation, not a site defect**: the "<1000ms from intersection to `.sr-tp-in`" timing budget. `document.visibilityState` reported `"hidden"` throughout these sessions (the Browser-pane tab is backgrounded relative to the OS compositor in this sandboxed setup), which is a well-documented trigger for Chromium's background-tab throttling of `requestAnimationFrame`, timers, and — empirically, in this run — `IntersectionObserver` callback delivery. A `MutationObserver`-based timing harness (armed before the triggering `scrollIntoView()`, using `performance.now()` deltas computed entirely browser-side to rule out tool round-trip latency) recorded one measurement of ~46 seconds from scroll to `.sr-tp-in` appearing — orders of magnitude past any real user-facing delay, and consistent with observer-callback starvation on a hidden document rather than a real 46-second stall. Static reading of the code supports a sub-1000ms budget under normal (foreground, visible) conditions: the observer callback adds the class synchronously with no `setTimeout`/animation-frame delay of its own, threshold is 0.12 with an 8%-bottom root margin, and the sections involved are tall enough (900px+) that a normal scroll gesture crosses that threshold well before the section is fully in view. This should be re-verified with a real headed browser (Playwright, or this tool with the pane genuinely foregrounded/focused) before being treated as passing.

### Nav overflow at 390×844, `professional-performance.html`

Confirmed live via `getBoundingClientRect`/`scrollWidth` on the rendered page (screenshot included below the numbers).

- **What overflows**: `#navlinks` (`.sr-tp-navlinks`), the six-link primary nav (The Journey, About, Personal Transformation, Relationship Healing, Professional Performance, Dashboard).
- **By how many pixels**: container `clientWidth` 346px vs content `scrollWidth` 597px → **251px of overflow**, contained (not leaking to the page) by `overflow-x:auto` on `.sr-tp-navlinks` — confirmed `document.body.scrollWidth` (374px) and `document.documentElement.scrollWidth` (390px) show no page-level horizontal scroll, so this is a self-contained scroll region, not a layout break.
- **Cause**: `css/saferise-system.css:2739`, the `@media(max-width:760px)` block, sets `.sr-tp .sr-tp-navlinks{justify-content:flex-start;flex-wrap:nowrap;overflow-x:auto;scrollbar-width:none}` (and hides the WebKit scrollbar). Six links at `flex-wrap:nowrap` in a 346px-wide row cannot fit; two of the six are multi-word ("Personal Transformation", "Relationship Healing") and wrap to two lines inside their own flex item rather than truncating, so the row's natural width (597px) is driven up further than six single-line labels would need. Because the scrollbar is deliberately hidden (`scrollbar-width:none`) and there is no gradient/arrow affordance signalling more content, **first paint shows "Relationship Healing" clipped mid-word** ("RELATIONSH" / "HEALING" on two lines, cut at the container's right edge) with "Professional Performance" and "Dashboard" entirely off-screen and no visual cue that a horizontal swipe reveals them.
- Not fixed, per instructions — diagnosis only.

---

## Phase B · The second content store

Full findings from dedicated research (method: read `content/tracks.js` in full for the `TRACKS`/`PRICING` objects; cross-referenced literal strings against `index.html`, and confirmed the three standalone track-page files are ~58-line JS-rendering shells with no per-protocol literal content of their own):

**Headline fact**: `index.html` loads `content/tracks.js` (line ~1152) but **never once reads `TRACKS[` or `TRACKS.` anywhere in its own inline scripts** (`rg -c "TRACKS\[|TRACKS\." index.html` → 0). The only thing it reads from that file at runtime is `PRICING`, via `hydrateTrackPrices()` (~line 10494) and two other call sites. Every protocol title, description, resource label, and duration string visible anywhere in `index.html` is independently hand-authored — a genuine second (in Track 1's case, third) content store, already measurably out of sync with `content/tracks.js`.

### a) Protocol title instances

| fact | tracks.js | index.html | track page | agree? |
|---|---|---|---|---|
| Track 1 titles (10) | 1 each (canonical) | 4-9 each across four literal structures: `PT_PROTOCOLS` (~L3991), `READER_PROTOCOLS` (~L4836), `#protoList` grid `<h3>`+`aria-label` (~L5477/5487); protocol 1 additionally appears in two decorative "device mockup" panels (~L1549/1684/1738/2533/2587) | 0 (renders from tracks.js via `js/saferise-track.js`) | No — literal duplicates in 4 distinct index.html structures, none read from `TRACKS` |
| Track 2 titles (10) | 1 each | 3-5 each, all from one source: the "All Plans" pricing panel's flat name list (~L2755) | 0 | No, but lower drift surface (one list, not four) |
| Track 3 titles (10) | 1 each | 5 each for 8/10 titles (same pricing-panel list, ~L2775) | 0 | **No — 2 of 10 already drifted** |
| "The Decision Fatigue Protocol" | canonical | index.html instead reads **"The Decision Fatigue & Isolation Protocol"** (L2775) | 0 | **Confirmed mismatch** |
| "The Burnout & Overload Protocol" | canonical | index.html instead reads **"The Burnout & Chronic Overload Protocol"** (L2775) | 0 | **Confirmed mismatch** |

Track 1's titles in the same pricing panel also appear in a fifth, shorter form ("Anxiety Reset", "Anger Alchemy" — no "The"/"Protocol"), invisible to a full-title grep.

### b) Price strings

| fact | tracks.js | index.html total | literal (non-hydrated) | track page | agree? |
|---|---|---|---|---|---|
| t1 €19 / t2 €29 / t3 €39 | canonical, `PRICING.t1/t2/t3` | 22 / 13 / 8 raw hits | **0** — every live price sits inside `<span data-sr-price="t1|t2|t3">`, overwritten from `PRICING` by `hydrateTrackPrices()` on load | 0 | **Yes** — the one genuinely programmatic surface found; prices do not drift |

(Nearby literal `€47/€270/€40/€357` "value stack" figures are unrelated marketing numbers, not sourced from `PRICING`, out of this scope.)

### c) Resource names

Track 1 sample: `index.html` carries its own `RESOURCE_CONTENT` object (~L3859, 60 keys, `p1-*`…`p10-*`, **Track 1 only**) with independently authored `title`/`meta`/`body` fields, already diverged in wording from `content/t1-resources.js`'s equivalent entries (example: `t1-resources.js`'s `t1p1-companion.title` is the generic "Somatic Release Activities"; `index.html`'s `RESOURCE_CONTENT["p1-companion"].title` is the fully different "Rhythmic walking, a weighted blanket, worry stones — daily companions between sessions"). This is a third, independently-authored resource store for Track 1 that does not exist at all for Tracks 2/3. Shared "kind" labels (Guided Meditation, Cue Card, etc.) recur 0-19× in `index.html` as generic UI labels — lower drift risk, small closed vocabulary.

### d) Image paths

| fact | tracks.js | index.html | track page | agree? |
|---|---|---|---|---|
| All 14 `art.*.src` paths (hero/band/cost/range/change × 3 tracks, minus t3's unset band) | 1 each | **0** | **0** | **Yes** — no literal duplication anywhere |

### e) Duration strings

`tracks.js` itself has no live duration strings (2 hits are inside a historical code comment). `index.html` has ~30 raw hits, ~7 real after filtering "section" false positives — all original prose, not copied from tracks.js/resources, so "agreement" here is coincidental rather than sourced. One is worth flagging on its own, adjacent to but outside the tracks/protocols scope: `index.html:2670` tags the founder 1:1 as "**50-minute** windows" while `index.html:4459` tags the same offer "**60 minutes**" elsewhere on the same page.

### Direct answers

**How many distinct surfaces inside `index.html` render track content?** Six hand-authored surfaces, plus one genuine data read:
1. `PT_PROTOCOLS` (~L3991) — full protocol-detail data, Track 1 only.
2. `READER_PROTOCOLS` (~L4836) — titles + resource keys for the in-page Reader, Track 1 only.
3. `RESOURCE_CONTENT` (~L3859, 60 entries) — full resource copy, Track 1 only, independently diverged from `content/t1-resources.js`.
4. `#protoList` static grid (~L5472) — 10 literal `<article>` cards, Track 1 only.
5. Two decorative "device mockup" panels (~L1540-1738, ~L2490-2600) illustrating protocol 1 specifically.
6. The "All Plans" pricing section (~L2727+) — the *only* surface touching Track 2/3 names, three panels hardcoding each track's 10 protocol names.
7. (Genuine read) `hydrateTrackPrices()` (L10494) — the sole place `index.html` actually consumes `TRACKS`/`PRICING` programmatically.

**How many total strings would change twice if a copy pass ran before the store were collapsed?** Roughly **51**, counting only titles/prices/resource-kind labels/paths/durations: 30 protocol-title strings (28 correctly mirrored, 2 already wrong and thus doubly wrong), 10 Track-1 short-form names unique to the pricing panel, and ~11 reused generic resource-kind labels. Prices (0, hydrated) and image paths (0, clean) impose no burden. **Not included** in that count, because it isn't a simple duplicate needing one more edit: the 60-entry `RESOURCE_CONTENT` store, a parallel Track-1 resource-content system already diverged in wording from `content/t1-resources.js`, which needs reconciliation or removal rather than a copy-edit pass.

---

## Phase C · Copy register sweep

Scope: `index.html`, all three track-page shells (confirmed to carry almost no literal text of their own), `dashboard.html`, `content/tracks.js` as specified, **plus an expanded pass** over `content/t1/t2/t3-resources.js`, `content/guidance.js`, `content/inventory.js` (flagged separately below since outside the original file list). Report-only; nothing fixed.

### Flagged terms

| term | hits | notable examples |
|---|---|---|
| quantum | 0 | — |
| frequency | 1 | `index.html:4582` — "Reduce access, **frequency**, intensity, or dependence" — plain-English boundary-setting copy, likely not a register violation |
| manifest/manifestation | ~15 | **`index.html:9535-9536`** — visible section eyebrow "**Manifest** the shift" + body "**Manifestation** here is practical..." — the clearest literal register hit found in this sweep. Remainder are CSS/JS identifiers (`.id-manifest*`, JS var `manifestations`, a `"manifest"` data-field key) |
| rewire | 0 | — |
| streak | 0 | — |
| badge | 26 | All CSS-class/UI-element uses: `.jprog-tier-badge` (×24, wraps plain-language tier labels like "Early Signs", not reward icons), `.id-resource-badge` (×2, icon wrapper). No literal visible word "badge" |
| score | ~140 | Dominated by the named "Safety Score" feature (Track 2, numeric 1-5 average, "opening score" saved and compared later) repeated across 10 protocol entries + widget UI + resource cards. Also ~10 idiomatic uses ("keep score" describing a relational pattern) and 5 explicit anti-scoring disclaimers ("never used to score you", "not a score — there is no target"). **Internal inconsistency worth flagging on its own**: `index.html:5999-6002`'s chart aria-label ("scores improve across eight sessions") and axis label ("01 · SCORE") sit awkwardly next to `dashboard.html:1734/1821`'s explicit "not a score, no numeric target" copy |
| progress bar | 0 | — |
| graduate/graduation | 0 | — |
| completion/completed/complete | ~30 | Mostly plain-English "complete" (thoroughness, not achievement). Two worth a closer look: `index.html:3340` field named `"Progress Check"`; `index.html:9416`, an 8×-repeated "Complete: 'I choose to be someone who…'" fill-in-the-blank CTA |
| performance target | 0 | — |

### Track 03-only additional terms

| term | hits | example |
|---|---|---|
| high performer | 1 | `content/tracks.js:433` — "Ten protocols for the states that follow **high performers** into every room" |
| output | 2 | `content/t3-resources.js:2159, 2452` — "Sustained **output** without adequate recovery..." / "...about the person rather than the **output**" |
| productivity, optimise/optimize, efficiency, elite, edge, peak | 0 genuine | Loose substring search on "peak"/"edge" produced false positives inside "speak"/"knowledge"; confirmed not real matches on word-boundary re-check |

### Duration strings (pure inventory, 30 total)

Concentrated in `dashboard.html` (session lengths, coaching-call windows — "60 min" ×5, "15/40/45/20 minutes" for the four relationship-repair segments) and `index.html` (mostly repeated "60 minutes" for the founder 1:1, plus a handful of somatic-exercise timings "10-20 seconds", "30-60 seconds"). None found in the resource data files. Full line-by-line list available in the Phase C working data; the one cross-page inconsistency (50 vs 60 minutes for the same founder-1:1 offer) is called out under Phase B/duration above.

### Headings beginning with a negation word

Three hits, all `lede` fields (the sub-line under an `h2`) in `content/tracks.js`, none a literal `<h1-3>` tag:
- L224 (Track 1): "**Not** the crisis. The ordinary hours it quietly takes..."
- L373 (Track 2): "**Not** the arguments you remember. The ordinary evenings in between..."
- L533 (Track 3): "**Not** the crisis quarter. The ordinary weeks..."

No `<h1>/<h2>/<h3>` tag in `index.html` (152 checked) or `dashboard.html` begins with a negation word.

### Literal "PLACEHOLDER" in visitor-facing text

Zero. All 105 combined hits across `index.html`/`dashboard.html` are legitimate `placeholder="..."` form attributes, CSS class names (`.video-placeholder`, `.audio-placeholder`, `.sr-dash-jplaceholder`), or internal code comments about missing art — none render the literal word as visible stub copy.

**Total flagged occurrences across all categories: ~250**, heavily weighted by the "Safety Score" feature name's 10-protocol repetition and by CSS/JS-internal identifiers reusing "badge"/"score"/"complete" as class or variable names rather than visible copy. The two highest-value items for a human pass: the literal "Manifest the shift" / "Manifestation" copy at `index.html:9535-9536`, and the score-vs-no-score internal contradiction between `index.html:5999-6002` and `dashboard.html:1734/1821`.

---

## Phase D · The t3-06 rename

Ground truth (re-verified, not assumed): `content/tracks.js:500`, Track 3 protocol 6, internal id `t3-06` — title correctly reads **"The Belonging Gap Protocol"**. Its description and trigger phrases are genuinely belonging-framed, no ambition/achievement language. `content/t3-resources.js`'s ten `t3p6-*` resource entries are likewise fully rewritten around belonging/editing/persona. `docs/fix-register.md` already documents this history (SR-216 renamed it, SR-258 supplied the four `tracks.js` card strings, SR-279/SR-284 previously swept and reported most of the findings below as report-only/open).

### Sweep 1 — literal "Ambition Recovery" survivors

| file | line | quoted text | rendering surface |
|---|---|---|---|
| `content/tracks.js` | 494-501 | dev comment quoting the old name for history | internal comment — deliberate historical record, in scope's exemption (SR-258) |
| `index.html` | 7054 (`proto-landing-desc`) | "Reconnect to what originally drove you, and recover momentum when **ambition** has gone flat." | **visible card description**, under "The Belonging Gap Protocol" title on the series landing page |
| `index.html` | 7054 (`proto-trigger`, hidden) | "Reconnecting to drive when the mission has gone flat or cynical" | hidden search/match field tied to t3-06's card |
| `index.html` | 7054 (`JPROG_PROMPTS["t3-6"]`) | "What was hardest to release — the old version of the **ambition**, or the guilt about losing it?" + "reconnecting to the mission" / "the flatness" throughout all four prompt groups | **journal-prompt UI text shown while running the protocol** — not previously reported in fix-register |
| `dashboard.html` | 1069 | "Flat about work you used to want has its own protocol." (mood-lookup `'flat\|work'`) | check-in suggestion text, correctly titled "The Belonging Gap Protocol" alongside, but body sentence still Ambition-Recovery-subject |
| `content/tracks.js` | 565 | "**Ambition**, identity and what you were trained to want sit in this layer..." | Track-3-wide "Go Deeper" copy — generic track-level theme, not naming t3-06 specifically |
| `dashboard.html` | 872 | "**Ambition**, burnout, and decisions you are too depleted to make well." | same — Track-3-wide "Go Deeper" note |
| `index.html` | 6753, 7419, 8375 | word "ambition" as a general professional-track theme | Track-3-level marketing copy, not protocol-specific |

No hits at all in `protocol.html`, `resource.html`, `content/inventory.js`, `content/guidance.js`, or the three track-page shells. No slug-cased `ambition-recovery` variant found anywhere.

### Sweep 2 — subject survival under the new name

| file | line | quoted text | rendering surface |
|---|---|---|---|
| `index.html` | 7054 (`t3-p6-guide`) | "Low-arousal flattening — motivation present in memory but absent in the body, sometimes masking exhaustion or grief for work that used to feel alive." | **resource preview body** — directly contradicts the real `t3p6-guide` in `content/t3-resources.js`, which describes an *Unsteady* state (chest unsteadiness, watchfulness, throat tightening); `index.html` carries a stale duplicate never touched by the rename |
| `content/t3-resources.js` | 1385 | diagram alt: "The flatness and Reproaching yourself: two things running at once..." | Reader diagram alt text — SR-256 already corrected the alt *string*; the underlying SVG asset (`img-067-release-t3-06.svg`) itself still visually depicts the old subject (flatness/self-reproach) rather than the new one (editing/reading the room) |

Everything else in the ten `t3p6-*` resource entries reads clean — no achieve/achievement/arrival/striving hits actually tied to t3-06 (other hits of those words in the same file belong to different protocols, e.g. t3-08/t3-10, out of scope).

### Verdict

**The rename is not complete**, by the repo's own standard (`CLAUDE.md`'s rename-pass rule: a sweep must return "nothing but deliberate historical records," and "where the new name requires new copy, the rename is not complete until that copy exists"). The internal id, `tracks.js` title/description/triggers, and all ten `t3-resources.js` bodies are cleanly reframed — that part is done well. But `index.html` carries a second, unreconciled content store for Track 3 (the same phenomenon documented sitewide in Phase B) that SR-216/SR-258 never touched: its visible card description, hidden trigger field, `t3-p6-guide` preview text, and the `JPROG_PROMPTS["t3-6"]` journal-prompt block still describe Ambition Recovery's subject — motivation, drive, "the mission," flatness, the literal word "ambition" — rendered where visitors see it. `dashboard.html`'s `flat|work` suggestion has the same defect at smaller scale. The `content/tracks.js` comments and the dated `docs/` mentions (fix-register.md, SafeRise_File_Inventory.md, and similar) are the rule's own exempted "deliberate historical records," confirmed intentional, not violations.

---

## Phase E · Image provisioning audit

See `docs/image-provisioning-audit.csv` for the per-asset table (127 rows: 94 KEEP, 15 UNVERIFIABLE, 13 MISSING, 3 CROP ADJUSTMENT, 2 RESIZE/RE-EXPORT — 6 P1, 12 P2, 109 P3, 0 P0; no P0 was assigned — see the priority-count note at the end of this section for why). Findings below are the ones that needed code-reading or live-rendering to establish, not just a file listing.

**Scan scope and method**: 159 distinct real (non-comment, non-placeholder-token) file paths were resolved across all 27 in-scope files (`index.html`, all three track-page shells, `dashboard.html`, `protocol.html`, `resource.html`, `method.html` + six `method-*.html` pages, all six `content/*.js` data files, all three CSS files, all three shared JS files). Every match's surrounding context was checked by hand for whether it's live markup/JS or sits inside an HTML/CSS/JS comment (`<!-- -->` / `/* */`) as a documentation placeholder — several apparent "missing assets" turned out to be exactly that, and are called out below as such rather than reported as broken. **0 extension/MIME mismatches** were found among files that exist on disk (every `.jpg` real JPEG, every `.webp` real WebP, every `.svg` real SVG, per `file --mime-type`).

### Confirmed, code- and render-verified findings

**1. `.sr-tp-costimg` crops ~43% of every track's "cost" photograph — a real, sitewide bug, not a hypothetical.** `content/tracks.js` declares `art.cost.ratio: '16/7'` identically for all three tracks (t1 L198, t2 L317, t3 L463), and `js/saferise-track.js`'s `slot()` function (line 91) applies that ratio as an **inline `aspect-ratio` style on the inner `.sr-tp-ph` div**. But `css/saferise-system.css:2581` independently hardcodes the **outer** wrapper, `.sr-tp-costimg{...aspect-ratio:2172/545}` (≈3.99:1, vs. 16/7≈2.29:1) with `overflow:hidden`. The inner box is taller (relative to its width) than the outer box allows, so the outer clips it. Live-measured on `personal-transformation.html` at 1280×800: wrapper renders 1060×266, but the `<img>` inside renders 1060×464 — **198px, or 43%, of the image's vertical content is clipped**. Reproduced identically at 390×844 (wrapper 300×75 vs. image 300×131, same ~43%). Affects `assets/t1/cost.jpg`, `assets/t2/cost.jpg`, `assets/t3/cost.jpg` — every track's "cost" section image, at every breakpoint. (`.sr-tp-rangeimg`/`.sr-tp-pfimg`/`.sr-tp-sixwrap`, the sibling wrappers for range/four-steps/change art, carry no such conflicting `aspect-ratio` of their own and were not found to have the same defect — `.sr-tp-rangeimg img`/`.sr-tp-pfimg img` instead use `height:auto`, which lets the image render at its own natural proportions.)

**2. Does any 1400×380 asset exist? Yes** — `assets/journey/t1-band.jpg` (1400×380 exactly) and `assets/journey/t2-band.jpg` (1400×380 exactly), both matching `tracks.js`'s declared `art.band.ratio: '1400/380'` for those tracks precisely — no scaling/cropping mismatch on these two.

**3. Track 3 has no band photograph at all — confirmed missing, not merely unreferenced, and already fully diagnosed in-repo.** `content/tracks.js:460-461`, Track 3's `art.band` entry has `ratio` and `brief` fields but **no `src` field**. Per `slot()`'s degrade path this renders the dashed-border labelled placeholder ("corridor moments before the room, desk log, reading at day's end") instead of a photograph — confirmed by direct code read, matching the file's own comment ("Track 03 has no files and exercises this immediately," `js/saferise-track.js:72-73`). No `assets/journey/t3-band.*` file exists on disk (checked directly). The adjacent code comment (`content/tracks.js:456-459`) and `docs/fix-register.md`'s **SR-224** entry both document why: a `t3-band.jpg` was delivered at some point measuring **1400×583 (2.401:1)** against the 1400×380 (3.684:1) the slot and its two siblings require — installing it would letterbox or crop it — so it was correctly left uninstalled rather than force-fit. SR-224 additionally records **a third, unused candidate** (`t3/band.jpg`, 1907×825, 2.312:1, matching neither ratio) and notes the file was last located in duplicate across `~/Desktop/assets`, `~/Desktop/assets 2`, and `~/Downloads/assets` — **none of these exist in the current working tree** (checked directly: `assets/journey/` holds only `t1-band.jpg` and `t2-band.jpg`).

**4. `t3-01` through `t3-09` covers do NOT carry burned-in numerals — confirmed both by direct visual inspection and by commit history, and the history explains why this wasn't always true.** `assets/covers/t3-01.jpg` (1086×1448, exactly 3:4, matching `.sr-cover .sr-tile{aspect-ratio:3/4}`) was opened and viewed directly: an AI-generated portrait photograph with a small "SAFERISE" wordmark in the bottom-right corner and no numeral overlay anywhere in the frame. `docs/fix-register.md`'s own history corroborates this and adds the part a single image can't show: **SR-179** originally flagged the *installed* covers as defective — `assets/covers/01.jpg` carried "REGULATE" burned in top-left and a large "01" bottom-right, and `t3-01.jpg` carried the same pattern. **SR-189** (dated 22 Aug 2026) replaced all 30 cover files at 1086×1448 with clean versions carrying "no top word and no numeral, only the locked rule + SAFERISE lockup" — and every `t2-*`/`t3-*` cover file's on-disk modification time (`Aug 22 20:32`) matches that fix date exactly. So: the numerals were real, they were fixed, and the fix is dated and file-timestamp-confirmed, not just visually spot-checked. (Only `t3-01.jpg` was individually re-opened and viewed directly in this pass; the other eight `t3-0N` files share the same SR-189 replacement batch and modification timestamp, so the same clean state is inferred rather than re-confirmed pixel-by-pixel for each.)

**5. `assets/covers-t2/` and `assets/covers-t3/` are empty, dead directories** — 0 files in each. The run brief's premise that Track 2/3 covers might live there is wrong: `coverPath()` (`js/saferise-track.js:95-98`) resolves them to `assets/covers/t2-NN.jpg` / `assets/covers/t3-NN.jpg`, and those files **do** exist (confirmed: `t2-01.jpg` through `t2-10.jpg` + `t2-banner.jpg`; `t3-01.jpg` through `t3-10.jpg` + `t3-banner.jpg`, all present in `assets/covers/`). `covers-t2/`/`covers-t3/` themselves are pure dead weight — safe to flag for removal, not touched here.

**6. `assets/pt/` is live infrastructure, not a legacy directory — do not assume it is dead.** It is referenced six times by `index.html`'s Track-1 protocol-detail surfaces (`#personal-protocol-page`/`pt-page-wrap`, confirmed via live DOM inspection of `index.html` at 1280×800): `journeyImage` (L4008), and four `<img>` tags at L5692/5747/5776/5846 plus one more at L5894, covering `journey-triptych.webp`, `cost-triptych.webp`, `nervous-system-range.webp`, `protocol-foundation.webp`, and `corridor.webp`. All five files exist on disk in `assets/pt/`. This directory should not be flagged or removed as legacy without separately confirming these five index.html surfaces are themselves being retired.

**7. `protocol.html` embeds ~3.5MB of raster images as inline base64, not file references — a distinct provisioning category the path-based scan methodology cannot see, and both embeds duplicate files that already exist on disk.** The file is 4.8MB across only 1,355 lines; two lines account for nearly all of it. Both were decoded and inspected directly: one is a `background-image:url('data:image/png;base64,...')` (1,777,075 bytes decoded, PNG, **1086×1448** — pixel-identical to `assets/covers/t3-01.jpg`); the other is an `<img class="journey-new" src="data:image/png;base64,...">` (1,765,413 bytes decoded, PNG, **2172×724** inside a `.journey-visual` figure — pixel-identical to `assets/pt/protocols/anxiety-journey.webp`). Both matches are exact-dimension, not approximate, which is strong evidence these are the same source content re-encoded as PNG and inlined rather than referenced. Embedding as base64 adds ~33% size over the binary, defeats HTTP caching (the "image" re-downloads with every page load instead of being cached once as its own resource), and can't be optimized by a normal resize/re-export pass without first extracting it back to a real file. `resource.html` has the same pattern at a much smaller, non-problematic scale — two ~52KB base64 JPEGs (900×1200, matching `assets/covers/01.jpg`'s dimensions), not flagged as an issue given the size. Flagged as its own lines in the CSV rather than folded into the path-based rows, since they have no `repo path` in the conventional sense.

**8. `dashboard.html`'s own band-photograph wiring is an empty object, independent of the Track 3 gap above.** `dashboard.html` declares `var BAND = {}` — no keys at all — so a text placeholder ("band photograph pending") renders for every track's band slot on the dashboard, not just Track 3's. The nearby comment (`dashboard.html:833-834`) names the four files it eventually expects (`t1-band.jpg · t2-band.jpg · t3-band.jpg · t4-band.jpg`, "all at 1400×380") but none are currently consumed by any dashboard.html code path — this is a second, dashboard-specific instance of the same provisioning gap, not the same bug as Track 3's `art.band` on the track page itself.

### Six areas of change (per-track "Change" section — Mind/Body/Rest/Energy/Relationships/Identity)

Confirmed **markup-based, not raster images**: `content/tracks.js`'s `change.items` array (e.g. t1 L263-270) supplies a single Unicode glyph per row (◍ ◇ ☾ ⚡ ◎ ◈) plus a hex colour, rendered as inline text/CSS by `js/saferise-track.js`'s `rChange()` — no image files, no dimensions, no cropping surface. Nothing to provision here; flagged only because the brief asked this section be reported on separately.

### Rendered-CSS-size methodology note

Given the number of distinct image references sitewide (index.html alone resolves 138 live `<img>` elements plus several `url()` backgrounds at first paint), rendered sizes in the accompanying CSV were derived **per shared CSS component class** (e.g. every `.sr-cover .sr-tile` instance shares the same `flex:0 0 clamp(212px,19vw,262px)` + `aspect-ratio:3/4` rule regardless of which specific cover image fills it) rather than by individually querying every DOM occurrence — the two approaches are equivalent here because this codebase consistently reuses a small set of named image slots (`.sr-art`/`.sr-cover`, `.sr-tp-herostack`, `.sr-tp-costimg`/`.sr-tp-rangeimg`/`.sr-tp-pfimg`/`.sr-tp-sixwrap`, `.sr-tp-slotimg`, dashboard's `.sr-dash-hero-art`/`.sr-crisis-art`/`.sr-resume-art img`, `.sr-fw-bandart`/`.sr-fw-cardart`, `.sr-pcover-img`) rather than one-off inline sizing per image. Per-class numbers were confirmed against at least one live instance at both 1280px and 390px (see the `.sr-tp-costimg` figures above as the worked example); the full per-asset mapping is in the CSV.

Also worth noting for the record: **138 `<img>` elements resolve on `index.html` at first load**, the large majority (all but a handful of hero/decorative elements) sitting inside track-carousel/`#prog-*` overlay structures that are `display:none` until a visitor opens them — their `getBoundingClientRect()` is legitimately `0×0` until that interaction, which is expected behavior, not a bug, and is called out here only so the CSV's rendered-size column isn't misread as "broken" for those rows.

### Duplicate/legacy inventory (flagged, not deleted)

| Location | State | Note |
|---|---|---|
| `assets/covers-t2/`, `assets/covers-t3/` | Empty (0 files) | Dead. See finding 5 — real covers live in `assets/covers/t2-NN.jpg`/`t3-NN.jpg` instead. |
| `assets/banners-t2/`, `assets/banners-t3/` | Empty (0 files) | Dead, unreferenced anywhere in scope. |
| `assets/banners/` | 10 files (`01_anxiety_reset_banner_2880x686.jpg` … `10_powerlessness_despair_banner_2880x686.jpg`, ~1.45MB total) | **Populated but entirely unreferenced** by any scanned file — different naming and dimensions (2880×686) from anything `assets/covers/` uses, so not a simple duplicate of a live asset, just orphaned. |
| `assets/method/` | **Does not exist as a directory** | Referenced by `method.html` and all six `method-*.html` pages, but every one of those references sits inside an HTML comment behind a "NEEDS ART" placeholder (see finding above) — so the missing directory doesn't currently 404 anything live. |
| `assets/pt/` | 6 files, all in active use | **Confirmed live, not legacy.** See finding 6 — do not treat as a dead pattern. |
| `assets/t2/`, `assets/t3/` | Each holds the 4 live art files (hero/cost/range/change) **plus** raw AI-generation source PNGs never cleaned up — `assets/t2/` has 9 unreferenced PNGs (~19.4MB: `001.png`…`010.png`, `cover.png`, three `"ChatGPT Image …"` files), `assets/t3/` has 11 unreferenced `"ChatGPT Image …"` PNGs (~20.4MB). |
| `assets/covers/` | Holds the live responsive set (`NN.jpg`/`.webp`/`-320`/`-640`) **plus** unreferenced full-res `NN.png` originals (~1–2.5MB each × 10 ≈ 12.7MB) and unreferenced `banner-320.*`/`banner-640.*`/`banner.png`/`banner.webp` — only `banner.jpg` itself (the `<video poster>`) is actually consumed; its sibling derivatives were generated but never wired in. |

**Total: ~63 files, ~61.4MB, sitting on disk and referenced by nothing** in any of the 27 scanned source files — dominated by raw AI-generation originals in `assets/t2/`/`assets/t3/` and unused derivative sizes in `assets/covers/`. Full per-file listing (paths and byte sizes) is preserved in this run's working data and can be regenerated on request; not reproduced in full here to keep this report at a readable length. Flagged only — nothing deleted.

Full asset-by-asset detail for every *referenced* asset (path, page, section, dimensions, MIME, status, priority) is in `docs/image-provisioning-audit.csv`.

### On priority: why nothing here is P0

Per the brief's own rule, P0 is reserved for "demo/launch blocking," each requiring a one-clause justification. Nothing in this pass met that bar: the `.sr-tp-costimg` crop and the two `protocol.html` base64 duplicates (P1, 6 rows total) are real, confirmed defects, but each degrades to a merely-imperfect-but-functional page rather than a broken one — cropped art still shows *an* image, and an oversized inline PNG still renders correctly, just slowly and uncached. The `MISSING` rows (13, mostly P2) all already degrade to a deliberately-designed labelled placeholder rather than a broken-image icon or a blank gap, by the codebase's own `slot()`/"NEEDS ART" conventions — so none of them break the page, only leave it visibly unfinished in a spot the team already flagged itself. If "demo" means a specific investor/customer-facing walkthrough with a known script, some of the P1/P2 rows above may deserve reclassifying to P0 depending on which pages that script actually visits — that judgment needs the human calling this run, not this pass.
