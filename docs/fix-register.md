# SafeRise — fix register

Canonical record of defects and design decisions. Commits reference the ID:
`fix: SR-0NN …` or `feat: SR-0NN …`.

**Rules — numbering**
- Never renumber an existing ID.
- New items go at the bottom of their severity block with the next free number.
- The number is global — it does not restart per block.
- Items are marked complete when the branch carrying the fix merges to main, not
  when the commit is made.
- **A run script drafted outside this lane must reserve its IDs here before it is written.**
  Never assume the next free number: read this ceiling, extend the reservation, and write the
  script against the numbers it reserved. **Two collisions in two runs** — Run D found
  SR-108–SR-119 issued in commits but absent from the register, and a script queued after
  Run E had independently allocated SR-150, SR-151 and SR-152, which this run had already
  issued to the stale *"Pricing to be announced"* clause, the orphaned *"separately, above"*
  reference, and the carousel-clipping decision. The register is the allocator; a script is a
  consumer.
- **Highest ID issued: SR-166.** Reserved block open: **SR-154 to SR-175**, ceiling
  **SR-175**, reserved 21 Aug 2026 by the pricing-reconcile run. Allocate from SR-167.
  The track-page-regressions run took SR-155 to SR-159 from a script drafted outside this
  lane, then allocated **SR-160**, **SR-161**, **SR-165** and **SR-166** from findings raised mid-run, and **SR-154**
  for the sandbox record — so the block is now contiguous with no gap to explain.
  The previous block (SR-129–SR-150) is exhausted through SR-153; SR-150 was passed because
  the run issued beyond its ceiling and the reservation was extended rather than renumbered.

**Standing invariants — checkable in one command each**
- **Euro escapes exist only inside `PRICING` in `content/tracks.js`.** Current count **9**,
  zero elsewhere in any tracked file, in either case. Any occurrence outside that block is a
  defect by construction. Part of every close-out sweep.
- **No price is spelled out except in `PRICING.words`.** Verified clean at the close of
  Run E: prices in words exist only in the record, one derived span and one comment.
- **`€59`, `€139` and `€275` appear nowhere.** Retired by SR-136/SR-141.
- **SR-044 to SR-166 are issued.** All are written up below except four:
  - **SR-064** — issued and referenced in `dashboard.html:1005` and `:1007`, but never
    written up here. It is the derived-price work `docs/SR-061-065-run-report.md` covers.
    Not free.
  - **SR-073, SR-114, SR-116** — raised and then dropped without ever being issued, so the
    numbers are free. **Do not reach back for them while a higher number is available.**
    They sit inside ranges other branches have already read past, and taking a number from
    the middle of a read range is what caused the three collisions below.

  IDs collided three times because parallel branches each read the ceiling and allocated
  from it at the same moment; reserving the range up front is what stops the fourth. A gap
  between the last written entry and the ceiling is expected — do not "tidy" it by lowering
  the number, and do not allocate inside a reserved range from another branch.

**Rules — method**

Earned across Run C and Run D. Each cost something to learn; the worked example is named so
the rule can be checked rather than taken on trust.

1. **A deliberate non-fix gets a register entry** carrying the reasoning and an explicit
   do-not-tidy line. An undocumented correct refusal is indistinguishable from an oversight,
   and the next run will "fix" it. Worked examples: `extras: null` ([[SR-117]]), the
   `PRICING` launch/standard pair ([[SR-124]]), the relocated
   `#personal-protocol-page .sr-tile` rule ([[SR-123]]).
2. **Reproduce before fixing.** If it does not reproduce, stop and report rather than
   editing toward the brief. **Five items in Run D did not reproduce at all** — [[SR-111]],
   [[SR-112]], [[SR-113]], [[SR-117]], [[SR-118]] — and a sixth, 4c's "remove the
   Elevation-only rows", described a table shape the tree does not have: every row carried
   content in all four columns, so there was nothing to remove. A spec anticipating a case
   the tree lacks is a note for the record, not an instruction to satisfy.
3. **When notes and the tree disagree, the tree is right.** Held six times in one branch,
   including a brief that named a resource key which has never existed and a note claiming
   `SHARED.resources` held twelve entries when it holds nine.
4. **Run the JS parse check first**, before div balance and CSS braces. Neither of those can
   see a broken script brace. A splice that deleted one `}` passed both and took the whole
   page's JS down with it.
5. **Stop server → restore `launch.json` → stage → commit.** In that order. Committing
   first ships a dev-server config pointing at a scratchpad path that exists on no other
   machine.
6. **Anchor structural edits by line and assert against neighbours.** Never by pattern where
   the pattern repeats: `repeat(4,1fr)` appeared three times with one target;
   `€19/mo` sixteen times, three of them carrying the wrong ladder.
7. **Verification globs cover every tracked file and every encoding form.** Never `*.html` —
   SR-096 was declared complete against a `.html` glob and missed `content/tracks.js`, the
   source of truth. Never only the glyph — `PRICING` stores `\u20AC` escapes, so a `€`
   sweep misses the price record itself.
8. **Runtime-built values are invisible to static greps.** `index.html` builds much of
   `RESOURCE_CONTENT` through single-quoted assignments inside IIFEs; `dashboard.html`
   builds prices from `data-sr-price` at load. **Measure the live object graph.**
9. **Prove null results with a sentinel pair, and prove any new probe sensitive before
   trusting it** — but **a sentinel only proves a probe works within its own method. It
   cannot tell you the method itself is wrong.** [[SR-120]] is the worked example: a
   sensitive probe, a confident null, and a conclusion that was false because the whole
   approach could not see runtime-built keys.
10. **Report capture artifacts rather than letting them stand as evidence.** A black
    screenshot or a zero-width viewport invalidates **every** measurement taken in it,
    including ones already reported. A number that looks authoritative and is not is worse
    than no number.
11. **A template cloned into multiple overlays counts once at source and many times in the
    DOM.** `index.html`'s footer is one `<template>` rendered twelve times. Record the
    multiplier so a future count does not read as a discrepancy.
12. **A count is only as good as the artefact it is reconciled against.** Where a finding
    sits in prose but not in the table, **the table is wrong.** Reconcile against the
    enumerated list, and record every movement in a count with its cause — [[SR-110]] moved
    17 → 18 → 19 and both moves are written down.
13. **No undated promises.** "Soon", "coming soon", "opening soon", "TBA" and equivalents
    are marketing claims about something with no date.
14. **A rule with no visible effect is not necessarily dead.** Distinguish **inert** —
    matches nothing, or is fully overridden — from **dormant**: matches, wins on some
    properties, and is masked only on the one that would show. A dormant rule **resumes** the
    moment whatever masks it changes; it does not need re-adding. **Measure computed style,
    not rendered geometry, before concluding anything is dead.** [[SR-123]] is the worked
    example.
15. **A workaround that looks redundant may be load-bearing at a level the diff does not
    show.** Before removing scaffolding, prove what it was scaffolding. Module-level
    ordering, hoisting and object identity are invisible to checks that compare rendered
    output or resolved values. [[SR-129]]: promoting the T2/T3 literals as briefed would
    have thrown a `TypeError` that no div-balance, brace-count or JSON-equality check could
    have predicted.
16. **A brief is not evidence.** Any premise sourced from outside the working tree — a
    snapshot, a mockup, an earlier session's notes — is an unverified claim and must be
    stated as one. **Five premises inverted on contact with the tree in Run E alone**:
    SR-127's price contradiction, SR-130's €19, SR-132's `dispenza` key, SR-131's appendix
    data, and SR-142's seven `href="#"`. Name the source of an asserted value so it can be
    discounted when it conflicts. Rule 3 decides the conflict; this rule stops it being
    invisible.
17. **Facts spelled out in words evade every sweep aimed at symbols or identifiers.**
    "Four programs" survived a sweep for `Elevation`; "Nineteen euros a month" survived a
    sweep for `€19` and `€19`. Both sat in surfaces a dedicated pass had already
    swept. Cover the numeral, the escape **and** the spelled form. Where the record holds a
    canonical spelled value — `PRICING.words` — anything spelling it independently is a
    defect by construction.
18. **An assertion over rendered text only covers surfaces mounted at that moment.**
    Conditional UI — modals, readers, paywalls, overlays — must be opened and measured in
    its rendered state. [[SR-124]] asserted "no €49 anywhere" against
    `document.body.innerText` and was wrong for a release cycle, because the paywall holding
    €49 only exists once a locked resource opens. **This rule paid twice in Run E** — the
    `openReader` paywall and [[SR-149]]. Both were invisible to every static sweep and to a
    page at rest. Defects in conditional UI are found by *exercising* the page, and an
    entry-point inventory is what tells you which controls to exercise.
19. **Replace whole blocks, not first lines.** A multi-line comment or banner replaced by
    its opening line leaves the remainder stranded mid-sentence, attached to whatever
    follows. This happened twice in Run E — the `TRACKS` banner stranded by the SR-129
    hoist, and the SR-057 comment in SR-136. Neither would be caught by a parse check, a
    brace count or a JSON-equality proof, because a stranded comment is syntactically valid.
    Anchor block edits to the block's full extent and assert the closing line as well as the
    opening one.
20. **When a verification cannot run in the environment, test against a known-good control
    in the same environment and compare.** Smooth-scroll animation does not run in this
    preview, so a scroll measurement alone proved nothing; measuring the fixed target
    alongside two that already worked, under identical conditions, established the fix
    behaves identically to things known correct. A control turns an unusable measurement
    into a usable comparison, and separates an environment artifact from a page defect —
    the failure mode Rule 10 warns about, now with a technique attached. [[SR-149]].


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

**Final surface count: 19. It moved twice, and both moves are recorded here so a future
audit does not re-derive them.**

| count | when | why it changed |
|---|---|---|
| 17 | Run C's §1e table | the original inventory |
| 18 | Phase 3 | `TEXTMAP:1262` was in Run C's **prose** but not its **table**. The table is the artefact that gets reconciled against, so the table was wrong. |
| **19** | during [[SR-124]] | `dashboard.html:1004` `OWNED` still carried key `4` |

`OWNED[4]` was unreachable — its only reader is `OWNED[track]` at :1047, and `track` comes
from the recommender, whose covers map (`COVERDIR`) has keys 1–3 only. Dead rather than live,
so it was not worth reopening a closed phase; it was removed with [[SR-123]] as a one-line
change. **All 19 closed.**

**Remaining: 4c only** — the comparison-table column. Exactly one rendered "Elevation" text
node survives in `index.html`, and it is that `<th>`.

**Done — 4c, the comparison table (20 Aug 2026).** The `Elevation` `<th>` and the Elevation
`<td>` from all six body rows. Table goes from five columns to four — label plus Personal,
Couples, Career — with 6 rows × 4 cells, **zero empty cells**, no `colspan`/`rowspan`, and
no rendered "Elevation" anywhere in `index.html`.

**The spec's "Elevation-only rows removed rather than emptied" had no work to do.** Every
one of the six rows carried content in all four track columns — Format, Protocols, Who it's
for, Entry price, Best for, Available. There were no Elevation-only rows and no empty cells
before or after. Recorded so nobody looks for the removal later.

**"Equal widths" was NOT delivered — deliberately.** Before the removal the columns already
sized to content (200 / 123 / 123 / 121 / 133 px), and after it they were uneven again. A
`.sr-cmp-col{width:calc((100% - 200px)/3)}` rule was written into `saferise-system.css` with
a class on the three `<th>`s, then **reverted** when the preview viewport collapsed to 0×0
and every width and overflow number became unmeasurable — including the ones taken minutes
earlier. Shipping an unverifiable layout change would have contradicted this run's own
standard. The structural removal is verified by DOM facts, which the collapsed viewport does
not affect; column widths need one measurement in a real viewport before the rule is
restored. **Open sub-item, not forgotten.**

Two naming notes found while in the table, not acted on: the headers read "Couples" and
"Career", not the record's `Relationship Healing` and `Professional Performance`. [[SR-111]]
scanned for the full names and so never saw these. And the table still shows "TBA" /
"Coming Soon" for both — see [[SR-122]].

*Status:* open — one sub-item: comparison-table column widths, pending a usable viewport · *Raised:* 19 Aug 2026 · *Entry written:* 20 Aug 2026

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

### SR-124 · `index.html` contradicts the price record, and itself
`content/tracks.js` holds the canonical ladder, marked *locked 2026-08*:

```
PRICING.t1 €9 / month   ·   PRICING.t2 €19 / month   ·   PRICING.t3 €29 / month
```

`index.html` loads `content/tracks.js` and then ignores it, carrying **two different
hardcoded ladders of its own**:

| source | Personal | Relationship | Professional |
|---|---|---|---|
| `content/tracks.js` — the record | **€9** | **€19** | **€29** |
| [index.html:4746](index.html:4746) locked-resource mapping | €19 | €29 | €49 |
| [index.html:6103](index.html:6103) `.pt-note` | €19 | €29 | **€39** |

Every track disagrees with the record, and the two in-page ladders disagree with each other
on Professional (€49 vs €39). A visitor comparing the resource paywall against the pricing
note is told two different prices for the same plan.

This looks like [[SR-063]]'s consolidation reaching the dashboard but never reaching
`index.html`, leaving an older ladder — or ladders — behind. **Which ladder is correct is a
commercial decision, not a code fix**, so nothing was changed. Once it is settled the fix is
the same shape as SR-063: read `PRICING` from `content/tracks.js`, which the page already
loads, rather than typing figures into markup.

**It was live and public.** `personal-transformation.html` rendered **€9** for Personal
Transformation while `index.html` rendered **€19** for the same product, at the same time,
both reachable. Two prices for one thing, not a code-quality issue.

Found while logging [[SR-122]]; not part of the Elevation work and deliberately not fixed
inside it.

**Resolution (20 Aug 2026).** Ladder confirmed by Andre: standard **€19 / €29 / €39**,
access cumulative, and **€9 is an introductory rate on Track 01 only**. `index.html:6103`
was the correct ladder; `:4746` was wrong on Professional; `PRICING` was right only on t1.

`PRICING` now carries launch and standard **separately**:

```js
t1: { amount:'€9', per:'/ month', words:'Nine euros a month.',
      introductory:true,
      standard:{ amount:'€19', per:'/ month', words:'Nineteen euros a month.' },
      includes:['t1'] },
t2: { amount:'€29', …, includes:['t1','t2'] },
t3: { amount:'€39', …, includes:['t1','t2','t3'] },
```

`amount` keeps its existing meaning — **what a member is charged today** — so no consumer
changed behaviour as a side effect and Track 01 keeps showing €9. Making `amount` mean
*standard* was considered and rejected: it would have silently removed €9 from the live site
the moment it merged, and a data refactor must not change what a customer is charged.
`standard` holds the list price it returns to; deleting either figure destroys the evidence
that a promotion ran. **Both are correct. Do not collapse them** — the comment above `t1`
says so in place, same class of deliberate double-record as `extras: null` ([[SR-117]]).

`includes` states cumulative access as data rather than as copy.

**`index.html` now derives.** All 23 track-price strings replaced — 20 markup nodes using the
`data-sr-price` convention `dashboard.html` already had, plus the three-price cumulative
sentence at :6103, plus three JS assignments in the resource paywall that now read
`PRICING.tN.amount`. A hydrator mirroring `dashboard.html`'s `hydratePrices()` fills them at
load, with a `data-sr-price-form` attribute for the site's `€19` / `€19/mo` / `€19/month` /
`€19 / month` / word forms. Nodes for an introductory track also receive `data-sr-intro` and
`data-sr-standard`, so a label can be attached without a second lookup.

Anchored by line and asserted against neighbours, never by pattern — three of the lines
carried the wrong ladder and `€19/mo` appears sixteen times, so a pattern edit would have
been the `repeat(4,1fr)` hazard again.

**A pre-existing defect fixed as a side effect.** `index.html` already carried two
`data-sr-price="t3"` spans — markup wired for derivation with **no hydrator on the page**, so
they rendered empty. The public Professional section read *"part of the Professional plan —
/mo"* and a button read **"Start — /mo"**. Both now render €39.

Verified cold: 26 nodes hydrate, **0 empty after hydration**, no `€49` anywhere, 16 nodes
carry the introductory flag, the paywall reads €9 / €29 / €39 for t1/t2/t3, 11 inline blocks
parse, console clean. Nodes proved to genuinely derive by a sentinel — setting
`PRICING.t3.amount` to `€777` moved every t3 node and restoring returned them exactly.

Out of scope and untouched: competitor and value-stack figures, workshops, premium 1:1,
retreats, and `protocol.html` — see [[SR-126]] and [[SR-127]].

*Status:* complete on merge · *Raised:* 20 Aug 2026 · *Fixed:* 20 Aug 2026

### SR-125 · The declared library and the Reader's manifest are two different inventories
Every protocol page and the dashboard describe a resource library. **Two unrelated sources
answer that question, and neither knows about the other.**

| | `SHARED.resources` — the *declared* library | `READER_PROTOCOLS[pk].keys` — the *served* manifest |
|---|---|---|
| shape | one fixed 9-item list, identical for all 30 protocols | a per-protocol list, authored individually |
| filtered by | `META[].extras` and `CONDITIONAL_RESOURCES` | nothing — it is the literal content list |
| counted by | `protocolResourceCount()` | the Reader's own page-building loop |
| vocabulary | resource **titles** — "Proximity Guide", "Your Record" | key **suffixes** — `advisory`, `founder`, `decision` |

**The vocabularies do not correspond.** Three concepts line up cleanly — `crisiscard` = Cue
Card, `companion` = Somatic Release Activities, `disclosure` = Disclosure & Support. The rest
do not. The manifest carries `founder` (Founder Video), `decision` (The Decision) and
`safety` (Safety Score), **none of which appear in `SHARED.resources` at all**; the declared
library carries Guided Meditation, Safe Practice, How This Works and Your Record, none of
which has a matching key suffix.

### Measured, live, across all thirty protocols

| track | `protocolResourceCount` claims | Reader manifest serves | every manifest key has content? |
|---|---|---|---|
| 01 | 7 – 9 | 6 – 8 | **yes** |
| 02 | 7 (all ten) | **2** (all ten) | **yes** |
| 03 | 7 (all ten) | **2** (all ten) | **yes** |

### It is **missing content**, not a mapping artifact

This was the question worth settling, and the answer is unambiguous. Of **112**
`RESOURCE_CONTENT` keys, **112 are referenced** by a Reader manifest or a `data-resource`
attribute — **zero orphans**. There is no hidden Track 02/03 content sitting under names
nothing looks up. Track 02 has 20 content records for ten protocols; Track 03 has 20; Track
01 has 71.

Both probes were proved sensitive before their null results were trusted: injecting an
unbacked key into a manifest produced exactly one missing-content report, and injecting an
unreferenced record produced exactly one orphan. Both restored cleanly.

So Track 02 and Track 03 genuinely carry **two resources per protocol** — T2 a Session Guide
and a Safety Score, T3 a Meditation Script and Somatic Release Activities — against a page
that names nine.

### Where it is claimed — all derived, none hardcoded

| surface | file · line | derived from | renders |
|---|---|---|---|
| Track-page "What's included" list | [js/saferise-track.js:276](js/saferise-track.js:276) | `SHARED.resources` | **all nine, by name**, on all three track pages |
| Track-page copy numeral | [js/saferise-track.js:163](js/saferise-track.js:163) `resourceCount()` | `SHARED.resources.length` | nothing currently — no track copy contains a numeral+"resources" string, so the substitution is live but idle |
| Dashboard fold title | [dashboard.html:1262](dashboard.html:1262) | `SHARED.resources.length` | **"Nine resources, one for each kind of moment."** |
| `protocolResourceCount()` | [content/tracks.js:547](content/tracks.js:547) | `SHARED.resources` − conditionals | **nothing** — zero callers outside `tracks.js` and its `module.exports` |

**No hardcoded count exists anywhere.** [[SR-078]] and [[SR-054]] did that work and it held.
The overstatement is not a stale numeral — it is that the derived number is derived from the
wrong list.

**The sharpest surface is not a number.** `relationship-healing.html` renders all nine
resources **by title**, Proximity Guide and Invitation to Repair included, while the Reader
delivers two. A wrong numeral is a typo; a named list of nine is a specific promise.

### Not fixed. This is a product decision.

Three routes, and they are not equivalent:

1. **Make the count derive from the manifest.** Honest immediately, and Track 02/03 pages
   then advertise two resources.
2. **Author the missing Track 02/03 content** so the nine-item library is real.
3. **Reconcile the vocabularies** so one source answers the question.

Fixing the number without deciding the copy silently changes what the site promises, so
nothing was changed. [[SR-120]] is blocked on the same question: `p1-advisory` exists but is
*attention-inward* guidance, not the Proximity Guide's *relational distance*, so whether
`advisory` names one resource or two has to be settled before `t1-01`'s `extras` can be
corrected honestly.

*Status:* open · *Raised:* 20 Aug 2026

### SR-135 · A second paywall held a price ladder that no longer existed
`index.html` has **two** locked-resource paywalls. [[SR-124]] converted
`openResourceModal()` ([index.html:4664](index.html:4664)); **`openReader()`
([:5004](index.html:5004)) was never touched** and hardcoded `€19 / €29 / €49` — a ladder
retired in Run D.

Two independent reasons it survived every sweep, and both are now rules.

1. **It used a lowercase `€` escape.** Every sweep in Runs D and E targeted the glyph
   or the uppercase escape (Rule 7).
2. **The surface does not exist in the DOM until a locked resource is opened**, so SR-124's
   assertion over `document.body.innerText` could not see it (Rule 18).

**Resolution.** Converted to `PRICING.tN.amount + '/mo'`, mirroring the other paywall exactly.
Verified by *opening* a locked resource per track — €9 / €29 / €39, no €49 — after first
reproducing the blind spot: zero `.reader-page-locked` nodes and no €49 in body text before
opening, which is precisely the state SR-124 measured.

*Status:* complete on merge · *Raised:* 21 Aug 2026 · *Fixed:* 21 Aug 2026

### SR-136 · The price record carried two wrong service figures and a duplicate key
`workshopPersonal` €59 → **€29**, `workshopRelationship` €139 → **€49**, and the `premium`
key (€275 / session) removed. 8 keys → 7.

**The €49 ordering constraint.** The stale *track* €49 left the tree in [[SR-135]]; the live
*couples-workshop* €49 arrived here. Between those two commits a `€49` sweep returns only a
historical comment — **the only window in which the two unrelated values can be told apart
mechanically.** Preserve that order if these commits are ever reordered or cherry-picked.

**The intermediate state is visibly broken but does not throw**, and that is the finding:
`dashboard.html`'s hydrator guards with `if (rec)`, so the four orphaned `premium` spans
rendered **empty strings** — `/ session`, `Book this time ·`, a dangling `90 min ·` — with a
**clean console**. See the guard note under [[SR-137]]. **This branch must not merge between
SR-136 and SR-137.**

*Status:* complete on merge · *Raised:* 21 Aug 2026 · *Fixed:* 21 Aug 2026

### SR-137 · `premium` and `premium1` were one offer under two names
`dashboard.html` and `protocol.html` sold "Premium 1:1" at **€275 / 90 min**; `index.html`
sold the same named product at **€129 / 60 min**. Not a retired product — a **stale second
representation of a live one**. The brief framed it as removal; the evidence overturned that
and it was a de-duplication and a re-pricing.

All four dashboard nodes repointed to `premium1`; `protocol.html:858` corrected as a literal
(that page has no hydrator — see [[SR-127]]). `protocol.html`'s internal contradiction
resolved: :860 said *"A private hour"* while :862 said *"Ninety minutes"*.

**The `if (rec)` guard, recorded as a finding in its own right.** A missing `PRICING` key
renders an **empty string**, with no exception and a clean console. That is the `Start — /mo`
failure mode as *designed behaviour*: it makes missing keys **invisible to error monitoring**.
**Any key removal must be verified by reading rendered text, never by absence of errors.**

*Status:* complete on merge · *Raised:* 21 Aug 2026 · *Fixed:* 21 Aug 2026

### SR-149 · A purchase CTA scrolled to an element that did not exist
[index.html:8204](index.html:8204)'s *"Start Personal Transformation — €9/mo"* called
`scrollIntoView` on `#personal-pricing`, which exists nowhere. The overlay opened and the call
threw a `TypeError`, on a purchase-intent control.

**Option 1 applied — the id already existed.** `#pt-start` is the section holding the price,
the introductory label and the CTA, and **two other CTAs already anchor to it** via
`href="#pt-start"`. Retargeted to the established convention rather than inventing an id or
guarding the call; losing the scroll would have cost the CTA its promise.

Verified by clicking that exact control — a clean load proves nothing when the error is
conditional. Zero console errors where the TypeError fired. **Rule 20 was written from this
item**: smooth-scroll animation does not run in the preview, so the fix was measured against
two known-good targets under identical conditions — `#pt-start` moves 8543 → 130 exactly as
`#corporate-pricing` moves 3764 → 130.

Swept all four pages for `getElementById('literal')` with a same-line property access and a
missing target: **0, 0, 0, 0.** This was the only one.

**Found only because [[SR-145]]'s entry-point inventory said which CTAs to exercise.**

*Status:* complete on merge · *Raised:* 21 Aug 2026 · *Fixed:* 21 Aug 2026

### SR-155 · Mockup scaffolding was live on the served domain
A persona switcher labelled **"Mockup control — not part of the build"** rendered at the top
of `protocol.html` — 51px tall, the first thing above the banner — reading *PREVIEW AS · FIRST
TIME · RETURNING · ANXIOUS · ESTABLISHED · 6 SESSIONS*. The brief named one. **There were
two**: `resource.html` carried the same component with different buttons — *"Open decisions ·
Proximity guide: off (p1 has none)"*, labelled *"Mockup only — not in the repo"*, which is
false twice over: it is in the repo and it is served.

**The "renders then disappears" report was a load-order artifact, and it is measurable.** The
embed bridge that hides this chrome under `?embed=1` sits at the very end of each file. On
`protocol.html` the statebar starts at byte **2,417,128** and the `<style>` that hides it is
injected at byte **4,802,722** — **2,385,594 bytes of markup in between**, on the exact path
the dashboard uses (`#srProtoFrame` loads `protocol.html?embed=1`). The same gap on
`resource.html` is 89,585 bytes. Removing the elements removes the flash; nothing else could.

**Rule 15 paid again.** `setState('new')` at the foot of `protocol.html` was not a mockup
call: it seeds the empty log and journal states, opens the journey details and closes the
journal. Its first line was
`['new','ret','est'].forEach(function(k){document.getElementById('btn-'+k).classList.toggle(...)})`.
Deleting the three buttons while leaving that line and its load-time call would have thrown a
`TypeError` on `null` and taken every script below it down, while still looking clean in a
diff. The seeding was kept as `seedArrivalState()`; only the persona branches went.

**Deliberately kept — do not tidy.** `advisoryOn` in `resource.html` is **dormant, not dead**
(Rule 14): `visible()` splices the `PROXIMITY` resource into the reader rail when it is true,
so the flag controls rail composition. Only the removed switcher ever set it. The variable and
the branch stay, with a comment naming what they control. Rail composition proved unchanged:
`RESOURCES` holds exactly 6 keys and 6 rail items render.

**Reported and not removed:** `protocol.html`'s `.bnavlinks` (5 links, all `href="#"`) and
`resource.html`'s `.sr-topnav` (6 links, all `href="#"`). Both are scaffold navs, but each is
its page's *only* navigation and four of five targets exist. Routing them is [[SR-156]], not
deletion work.

Verified on all nine served pages loaded fresh, and inside the dashboard shell with a protocol
open in the iframe: zero rendered hits for *mockup*, *preview as*, *not part of the build*,
*not in the repo*, *open decisions*, *you are here*, or any persona label. The remaining
source hits are this run's own explanatory comments, which do not render.

*Status:* complete on merge · *Raised:* 21 Aug 2026 · *Fixed:* 21 Aug 2026

### SR-160 · Invented member figures in a hidden block on protocol.html
`#resume` on `protocol.html` read **"Welcome back. Last practised 3 days ago · 4 sessions
logged · average drop -3.2"**. It carried `.hidden`, and **the only thing that ever revealed
it was the persona switcher [[SR-155]] removes** — so it was one CSS change from visible, which
is deferred, not safe.

Container and contents were separated before acting, as briefed. The container is not a real
surface with fake copy: **its entire text is the figures**, `#resume-count` exists only to hold
the session count, and there is no template, writer or data binding behind any of it. Nothing
else was bound to it — the only two `classList.remove('hidden')` calls on the page target
`invitation` and `cue`, and the page's sole `message` listener handles `type === 'theme'`
only. **The whole block went**, with its `.resume` rules, and with the `resume` variable it
would have left dangling in `seedArrivalState()` — the same null-reference trap as [[SR-155]].
`resource.html` carried an orphan copy of the `.resume` CSS with no `.resume` element anywhere;
inert, removed with it.

**Why this generalises:** the platform has no streaks, no scores, no completion and no targets,
because members arrive on their worst day. *"Average drop -3.2"* is a score. [[SR-085]] already
made this call once, on the dashboard, for the same reason.

*Status:* complete on merge · *Raised:* 21 Aug 2026 · *Fixed:* 21 Aug 2026

### SR-161 · The dashboard's "Step 03 of 07" ribbon is a literal
Raised by the sweep [[SR-160]] called for, and fixed in the same run.

`dashboard.html:885` holds `var CURRENT = 'The Anxiety Reset Protocol';` — a hardcoded literal.
Every visitor, including one who has opened nothing, sees the Anxiety Reset card ribboned
**"Step 03 of 07"** with a **"Continue"** action while every other card reads "Begin".
Confirmed in rendered text rather than source: the ribbon renders **twice**, because the card
set is doubled for the carousel loop.

`dashboard.html:915` writes the string into the card template with nothing behind it. Nothing
writes `sr.resume`, so `CURRENT` cannot be derived today — exactly what [[SR-085]] found for
the resume card and answered with an honest empty state. The same shape of fix applies: derive
it, or drop the ribbon and let the action read "Begin".

**Everything else the sweep turned up is derived or editorial**, recorded so a later run does
not re-raise it: `Sessions logged` / `Protocols run` / `Most run` compute from `runs.length`
and `Store`; `07 of 08` and `87%` at `dashboard.html:2194` sit inside the [[SR-085]] comment
describing what was removed; `index.html`'s *"No sessions logged yet"* is an honest empty
state; `1 of 1` at `index.html:3829` is initial markup overwritten at runtime; *"Session 1 of
7"* names a Practice Workbook item, not member progress; and the track pages' *"15-20% of
adults"* and the SVG label *"SESSION 01"* are editorial content. `protocol.html` renders no
metric-shaped string at all after [[SR-160]].

**The fix, in three parts.**

`CURRENT` is now **derived at render time**, not declared: `sr.resume`'s `protocol` first, then
the most recent `sr.journal.entries` protocol — the only `sr.*` key anything writes. Both empty
returns `''`, which matches no item, so every card reads **Begin** and none is ringed. It is
read inside `render()` rather than at the top of the IIFE because `Store` is assigned further
down the same closure.

**"Step 03 of 07" was deleted, not derived, and the reason generalises: where no writer exists
for a measurement, the nearest available number is a DIFFERENT measurement, and substituting it
is worse than showing nothing.** Nothing in the record holds a step position. The nearest
number is `resource N of total`, which is what `sr.resume` defines and what the resume card
reads — a different thing counted differently. [[SR-081]] refused exactly this substitution when
it declined to map a 0-10 activation reading onto a named nervous-system state, and wrote
`before`/`after` as null instead. The ribbon now emits **only** when `sr.resume` supplies both
`resource` and `resourceTotal`, phrased as the resume card phrases it, and emits nothing
otherwise. Today that is nothing.

`Continue` and the `is-current` accent stay: both derive cleanly from "which protocol you were
last in" and both vanish with no state.

**The template needed no guard — it already degraded correctly.** `cur === false` was live on 18
of 20 cards before the fix, and on all 20 of a locked track, so the empty path was already
proven in the page.

**Verified on both sides, because an empty path cannot otherwise be told from a broken one
(Rule 20).** Seeded `sr.resume` → **2 ribbons reading "Resource 07 of 08", 2 ringed, both named
"The Overwhelm Threshold Protocol"** — the protocol the record names, not the one that used to be
hardcoded — and 18 Begin. Entries only, no `sr.resume` → **2 ringed on "The Grief Integration
Protocol", 2 Continue, 0 ribbons**: the fallback fires and refuses to invent a position.
`localStorage` cleared → **20 cards, 0 ribbons, 0 ringed, 0 Continue, 20 Begin**, and no
`step N of M` string anywhere in the rendered page. Counter `1 / 10` throughout — `updateCount()`
already halves the doubled set, so the duplication was never the defect; it only doubled the
exposure of one. Zero new console errors.

**One test failure worth recording, because it was mine and not the page's.** The first fallback
probe seeded `"The Self-Worth Restoration Protocol"`, a name that exists in no track. Nothing
ringed, and for a moment that read as the fallback failing. It was the code behaving correctly:
an unknown or stale name degrades to *no card ringed* rather than throwing or ringing the wrong
one. Rule 16 applies to the tester's own fixtures as much as to a brief.

*Status:* complete on merge · *Raised:* 21 Aug 2026 · *Fixed:* 21 Aug 2026

### SR-165 · Nothing writes `sr.resume` — the platform has no progress writer
**Blocked, deliberately, and not on effort.** [[SR-161]] derives the current protocol from
`sr.resume` and falls back to journal entries. `sr.resume` has a reader (`buildResume`), a known
shape — `{protocol, no, track, resource, resourceTotal, resourceName, percent}` — and **no
writer anywhere in the repo**. The same is true of `sr.record.runs` and `sr.sessions.booked`.
The single `sr.*` write in the entire tree is `protocol.html:1089`,
`Store.set('sr.journal.entries', …)`.

Having `openProtocol()` write `sr.resume` is the obvious next move and **would give the platform
its first progress writer** — the thing [[SR-085]], [[SR-160]] and [[SR-161]] have each worked
around rather than solved.

**It belongs with the auth work, not here.** `Store` writes to `localStorage` only, with no
account behind it, so a progress writer would record progress **for whoever last used the
browser** — a shared machine hands one person's practice history to the next. That is a worse
defect than the empty state it would replace.

*Status:* blocked — needs accounts · *Raised:* 21 Aug 2026


### SR-156 · The Dashboard control answered "You are here" instead of going home
The rail's Dashboard button opened `mRoute` reading *"This page / You are here. / /dashboard"*
**over a protocol that stayed open behind it** — verified by clicking, with a protocol in the
shell: `body.reading` stayed `true` and the iframe kept its src. A control that reports success
while doing nothing.

**Two premises corrected against the tree (Rule 16 / Rule 3).**

1. **It is not on the protocol page.** `protocol.html` contains no `openRoute`, no `data-route`
   and no Dashboard control — zero occurrences. The button is `dashboard.html`'s own rail, which
   stays on screen while a protocol is open in the shell, which is what the report described.
2. **The `|| ROUTES.dashboard` fallback was latent, not live.** Every key that can reach
   `openRoute` was enumerated — rail `data-route` (4), `data-route-link` (3), `TEXTMAP` (11),
   and the `#route=` hash — and the union is **exactly the fourteen keys `ROUTES` defines**. The
   hash path is separately guarded at `:1216` by
   `if(PAGES[key] || !(LAYERS[key] || ROUTES[key])) return;`. Nothing fell through it. It was
   removed anyway, because the next `TEXTMAP` row or `data-route` typo would have landed on
   "You are here" **silently**, and a fallback that turns a typo into a confident wrong answer
   is worth removing before it fires, not after.

**The fix is a view, not a destination.** `dashboard` is intercepted before the `ROUTES` lookup
and calls `goHome()`: `closeModals()`, `closeProtocol()`, clear a `#route=` hash if one brought
us here, put the rail back on Dashboard. No navigation, so no reload — proved by a marker on
`window` surviving the click, with the URL unchanged. The `ROUTES.dashboard` entry was deleted
with it: **describing the page you are already standing on is what produced that copy.**
`method.html` and `method-porges.html` already had the right answer in their own
`PAGES = { method:…, dashboard: 'dashboard.html' }` — only `dashboard.html` lacked it.

**The distinction worth keeping, because it decided what NOT to touch.** The brief asked for
targetless routes to fail visibly instead of claiming success. **They already do.** *"Account &
plan · Not built yet · /account"* names the thing, names the path and states plainly that it
does not exist. **A control that reports its own absence is not the same defect as one that
silently claims success** — the first is honest signposting, the second is a lie. Replacing the
twelve with dead buttons would have removed information and added nothing. [[SR-103]] reached
this conclusion first, by clicking all six. The instruction was withdrawn; all twelve stand
unchanged.

**Nine dead nav links wired**, using the track pages' own `renderNav` map as the source of
truth rather than inference: `protocol.html`'s `.bnavlinks` (The Journey → `method.html`, and
the three track pages) and `resource.html`'s `.sr-topnav` (the same, plus About → `method.html`).

**Two left dead and blocked, deliberately — do not tidy:** *"My Practice"* on `protocol.html`
and *"Compare Plans"* on `resource.html`. No page answers to either. Inventing a destination
would be worse than the dead link, and pointing them at a near-miss would be worse still. They
resolve when a page exists.

**Verified by clicking (Rule 18), not by reading `href`s.** Every rail control and route-link
exercised: `coaching` → `mLayer`; `account`, `chosen`, `decisions` → `mRoute` with "Not built
yet" and the right path; `method` → navigates; `dashboard` → protocol closed, layer closed,
hash cleared, scroll lock released, rail reset, **no reload**. An unregistered key was injected
into a live rail button and clicked: **zero modals opened** and the console carried
`openRoute: no route registered for "sr156-nonexistent-key"`. For the nav links, a
capture-phase probe confirmed nothing swallows the click (`defaultPrevented: false` at document
level) and recorded each resolved URL, with a full click-through on one link per page as the
control (Rule 20) — landing on `relationship-healing.html` and `professional-performance.html`.

*Status:* complete on merge · *Raised:* 21 Aug 2026 · *Fixed:* 21 Aug 2026


### SR-162 · The protocol cover is now one component, shared by two surfaces
The track pages cropped a 900x1200 portrait cover to a landscape band. `.sr-tp-pimg` carried a
fixed `height:152px` on a 236px card — but the real cause was worse and no rule anywhere
described it: **there was no `.sr-tp-pimg img` rule at all.** The image rendered unstyled at
212x283 inside a 152px flex box with `align-items:flex-end`, which put it **119px above its own
container**; the card's `overflow:hidden` clipped it to the strip that was visible. Measured
live before the fix: container top 1178, image top 1059.

**The brief said port the dashboard's card outward. The tree says the dashboard is only half
right, and the half it is right about is not the half that was assumed.** `.sr-dash-cardart`
had the correct image treatment — `aspect-ratio:3/4`, `object-fit:cover`, full bleed — but its
number and label came from a `.sr-dash-fallback` tile carrying
`onload="…querySelector('.sr-dash-fallback').remove()"`. **They deleted themselves the moment
the cover loaded**, because the number is burned into the current art. With covers being reshot
**bare**, that tile stops being a fallback and becomes the only thing that would carry the
number — while still removing itself. The track card was the closer of the two here: its
`.sr-tp-pkick` and `.sr-tp-pno` are drawn from the record (`p[1]`, `p[0]`) and persist.

So neither surface was the reference. The shared component takes the dashboard's art treatment
and the track card's record-drawn overlay, made permanent on both.

**One source, not two copies** — [[SR-125]], [[SR-148]] and [[SR-153]] are all second
inventories, and this was on its way to being a fourth. `js/saferise-card.js` owns the markup
and is loaded by `dashboard.html` and all three track pages; the CSS lives in
`css/saferise-system.css`, **the one stylesheet both of them already load** —
`saferise-dashboard.css` is the dashboard's alone. What is *not* shared is deliberate: the two
cards genuinely differ below the art, and the frame stays with each card because the dashboard
frames the cover directly while the track card frames the whole card and clips the cover with
it.

**Named `sr-pcover`, and the check mattered.** `sr-cover-*` is taken — `.sr-cover`,
`.sr-cover-art`, `.sr-cover-scrim`, `.sr-cover-kick`, `.sr-cover-sub` belong to the Clearing
card and the index tiles. CLAUDE.md's `.track` warning is this exact trap. `sr-pcover` was
confirmed at zero occurrences across every css, js and html file before a line was written.

**Removed:** the 152px height, `.sr-tp-pimg:before` (104x104) and `:after` (92x145),
**thirteen** nth-child rules — ten per-card gradients plus 2n/3n/4n pseudo-element variants, not
the ten in the brief — `.sr-tp-pkick`, `.sr-tp-pno`, the orphan `.sr-tp-pimgnote`, and on the
dashboard side `.sr-dash-cardart`, `.sr-dash-fallback`, `.sr-dash-verb`, `.sr-dash-no`. Six
dashboard rules plus seven `.t-N` ground gradients were repointed at `.sr-pcover`; specificity
keeps the per-track grounds winning over the shared default even though the shared sheet loads
last.

**`.sr-tp-pimgnote` did not reproduce as briefed.** It existed only as `display:none` in the
stylesheet with **no markup emitting it anywhere in the repo**. Nothing was emitting an asset
path as hidden text. Removed as an inert rule describing a defect that no longer existed, not
as the defect.

**Verified by rect equality, not by "it renders"** — the failure being fixed was an image
sitting 119px outside its own box while still rendering perfectly well.

| | track page | dashboard |
|---|---|---|
| image vs container | `dLeft 0, dTop 0, dW 0, dH 0` | fills the **padding box** exactly: `dW 0, dH -0.34` (sub-pixel), offset by exactly the 1px border |
| aspect | 0.7492 | 0.7489 (3/4 = 0.7500) |
| `object-fit` | cover | cover |
| natural | 900x1200 | 900x1200 |
| label after load | "Regulate", inside, visible | "Regulate", inside, visible |
| number after load | "01", inside, **low-right** | "01", inside, **low-right** |
| legacy classes | 0 | 0 |

Checked at 420px as well: cover still fills exactly, no horizontal overflow. Locked track 2
keeps its `saturate(.3) brightness(.62)` and its `.t-2` ground, with label and number intact.

*Status:* complete on merge · *Raised:* 21 Aug 2026 · *Fixed:* 21 Aug 2026

### SR-163 · The track carousel, and why "it does not move" was not the binding
**The briefed cause did not reproduce.** `initCarousel()` does not return early — `#carViewport`,
`#carPrev` and `#carNext` are all emitted by `rProtocols`. Clicking Next ran `go()`, advanced
the counter and set `track.style.transform` to `translateX(-512px)` correctly. Two other things
were wrong.

**One — two mechanisms driving one strip.** `.sr-tp-carviewport` carried `overflow-x:auto` with
`scroll-snap-type:x mandatory` *and* was moved by a JS transform. The tell was `scrollLeft: 56`
**at rest, with nobody having touched it** — snap had already moved the container. The viewport
is now a plain clip; the transform is the only mover. `scrollLeft` is **0** at rest and stays 0
through every step. The 56px gutter moved from padding to margin so the clip happens at the
gutter instead of inside it — otherwise a card sliding out shows through the padding.

**Two — `step()` returned `card.width + 18` while the gap is `14px`.** Four pixels of overshoot
per step, forty across ten cards. It now reads `columnGap` from the computed style, so it cannot
drift out of step with the stylesheet again.

**The counter became dots.** `1 / 10` reported the active index while four cards were on screen
— a position asserted, not measured. One dot per page of visible cards, active dot filled, same
pattern as the hero's `#srHeroDots` rather than a new one. **The last page is clamped, not a
full stride**, so its label says what it actually shows: with ten cards and four visible the
dots read *1 to 4 · 5 to 8 · **7 to 10***, not "9 onward". Getting that wrong would have been the
counter's own defect again, in words.

**Verified against a control, per Rule 20 — this measurement cannot be taken directly here.**
CSS transitions do not advance in this preview ([[SR-149]] found the same for smooth scroll), so
a computed transform read after a click is always the from-value. With `transition:none`
suppressing the ease, the same code path lands immediately and the transform is measurable:
rest `translateX(0)` first card at 107 → Next `-1008px`, first card at **-901** (a delta of
exactly 1008 = 4 x 252, the true border-box stride) → Next `-1512px`, clamped, `next` disabled →
dot 1 returns to `-1008px` → dot 0 to `0`. `scrollLeft` 0 at every step. **This is a
control-based result about the transform, not a claim that the animation was observed.**

At 420px `per()` falls to 1 and the rail correctly becomes ten dots, one per protocol.

**Not shared, deliberately — see [[SR-166]].** The dashboard runs a continuous constant-velocity
drift over a doubled card set; this is a stepped pager. Unifying them means choosing one model
for both, which is a design decision, not a refactor.

*Status:* complete on merge · *Raised:* 21 Aug 2026 · *Fixed:* 21 Aug 2026

### SR-166 · The two carousels are different interaction models
**Blocked on a design decision, not on effort.** `dashboard.html` moves its protocol row by
continuous constant-velocity drift over two identical card sets, wrapping by exactly one set's
width so the loop is invisible, easing to a halt on hover. The track pages step by a page of
visible cards with prev/next and a dot rail.

[[SR-162]] shared the cover because the cover is one thing rendered twice. **The carousels are
two different answers to two different questions** — the dashboard's row is ambient and browsable
while you decide, the track page's is an index you page through — and sharing them means picking
one behaviour for both surfaces. That is Andre's call. Recorded so the next run does not read
the duplication as drift and unify them by default.

*Status:* blocked — needs a design decision · *Raised:* 21 Aug 2026

### Premise withdrawn · there is no hover subtitle to port
Recorded so it is not re-raised. The brief held that the dashboard card reveals a subtitle on
hover and the track card only tints its border. **Both are border tints**, differing only in
alpha: `.sr-dash-card:hover .sr-pcover` at `rgba(212,168,67,.5)` and `.sr-tp-pcard:hover` at
`rgba(212,168,67,.45)`. The subtitle belongs to `.sr-cover-sub` on the Clearing card — a
different component — and is `display:block`, always visible, never revealed. Hover left as it
is on both.


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

### SR-122 · Undated promises on surfaces for tracks that have a price
Three surfaces on `index.html` still say a shipping track is unpriced or unavailable. They
fail the no-undated-promises rule independently of the Elevation removal, and were left
alone during [[SR-110]] because rewording them is not the fix.

| # | surface | where | what it promises | is it about the track or the team programme? | does that thing have a price in the data? |
|---|---|---|---|---|---|
| 1 | Plans-strip Professional panel | `index.html`, the four-panel strip under the plans heading | *"Coming Soon"* + *"Pricing TBA"* | **The track.** The panel sits beside Personal and Relationship panels and lists the same per-track contents. | **Yes** — `PRICING.t3` = €29/month, locked 2026-08 |
| 2 | Professional plans card | `index.html`, the three-card plans grid | *"Coming Soon"* + *"Pricing to be announced · team programmes priced separately"* | **Both, in one line.** The card is the track's; the trailing clause is about team programmes. | **Track: yes**, `PRICING.t3` = €29/month. **Team programmes: no** — no key for them exists in `PRICING`. |
| 3 | Comparison table, Relationship and Professional columns | `index.html`, `#prog-compare` | *"Entry price: TBA"* for both, *"Available: Coming Soon"* for both | **The tracks.** | **Yes for both** — `PRICING.t2` = €19/month, `PRICING.t3` = €29/month |

So surfaces 1 and 3 are **stale, not undecided** — the price exists and is locked. Surface 2
is a mixed case: the track half is stale, and the team-programme half names something that
genuinely has no price anywhere in the data, so **removing that clause is the fix rather
than filling it in**.

Blocked on [[SR-124]]: the page carries two hardcoded price ladders and both disagree with
the record, so writing a figure into these surfaces now would just add a third. Settle the
ladder first, then have these read `PRICING`.

*Status:* open · *Raised:* 20 Aug 2026

### SR-126 · The introductory rate has no label, on any surface
`PRICING.t1` is €9 with `introductory: true` and a standard of €19. **No surface says so.**
After [[SR-124]], sixteen nodes on `index.html` carry `data-sr-intro="true"` and
`data-sr-standard="€19…"`, and the three track pages render `t.price.amount` through
[js/saferise-track.js:302](js/saferise-track.js:302) — none of them prints a label.

A member who subscribes at €9 and later sees €19 without having been told has been switched,
whatever the intent.

**The promise, confirmed 20 Aug 2026:** early subscribers keep €9 **for as long as they stay
subscribed**. Cancel and return, and they return at the standard rate. That is not a
countdown, so the label must not read as one — "€9 for now" or any expiry framing fails the
no-undated-promises rule and misdescribes the offer besides.

**Where the label is needed** — reported, wording not written:

| surface | what renders €9 today |
|---|---|
| `personal-transformation.html` | the `€9` price numeral and the "Get Started — €9/month" pill, both from `rPrice()` |
| `index.html` — 16 nodes | the hero and plan CTAs, the compare row, the pricing note, the foundation panel, the resource paywall button |
| `dashboard.html` | no €9 surface today — Track 01 is the owned track, so no price is shown for it |

The hook exists and is unused: any node with `data-sr-intro` can be labelled without a second
lookup. On the track pages the natural place is the `priceNote` beneath the price, which
already carries the cumulative-access sentence.

**Resolution of the team-programme half (21 Aug 2026) — it does not reproduce.** The clause
*"team programmes priced separately"* was to be cut as an undated promise. **A team programme
exists and is priced:** `prog-retreats` sells the Corporate Retreat — intake, half-day agenda,
written debrief — at **€1,800 flat** up to 50 people and **€3,500 flat** over 50. The clause is
**accurate**, and cutting it would have removed a true statement about a sellable product.
Nothing was cut.

The defect on that line is the **other** clause, *"Pricing to be announced"*, now stale since
Track 03 is €39/mo — [[SR-151]]. A third occurrence at `index.html:6744` points at content
that is not there — [[SR-150]].

The two track-price halves of this entry were resolved by [[SR-124]] landing.

*Status:* open — the "Pricing to be announced" clause only, see SR-151 · *Raised:* 20 Aug 2026

### SR-127 · `protocol.html` prices have no connection to the record
`protocol.html` renders **€275**, **€59** and **€139** as hardcoded literals at :858, :875 and
:880. It **does not load `content/tracks.js` at all**, so `PRICING` is not merely unread — it
is unreachable.

Those three figures happen to match `PRICING.premium`, `workshopPersonal` and
`workshopRelationship` today. Nothing keeps them matching. This is the same defect class as
[[SR-124]] one layer removed: SR-124 was a page that loaded the record and ignored it; this is
a page that never sees it.

Fixing it means adding a `<script src="content/tracks.js">` to a page that currently has no
dependency on it, then converting three literals to `data-sr-price` nodes and adding the
hydrator — small, but it changes what the page loads, so it was not folded into SR-124.

Not in the Elevation or pricing-reconciliation scope. Logged, not fixed.

*Status:* open · *Raised:* 20 Aug 2026

### SR-128 · The comparison table prices three tracks as three products
`#prog-compare` on `index.html` shows Personal / Couples / Career with an **Entry price** row
and no statement anywhere in the table that access is cumulative. Three prices in three
columns read as three things to buy.

They are not. `PRICING[t].includes` now records it as data ([[SR-124]]): €29 buys Tracks
01–02 and €39 buys all three. Every other price surface says so in prose — the track pages
carry *"Access is cumulative — Relationship Healing includes the whole of Personal
Transformation"*, and `index.html`'s pricing note spells out all three. **The comparison
table, the one surface built specifically for comparing, is the only one that does not.**

The effect is the wrong way round: shown as three products, €39 is the expensive option;
shown with its inclusion, €39 is the obvious one.

Two further things the table says that no longer match the record — both resolved by
[[SR-122]] and its dependency on SR-124, listed here so the table is assessed once:
*"Entry price: TBA"* for Relationship and Professional, which both have prices; and
*"Available: Coming Soon"* for both.

Not fixed. The fix is a copy and layout decision — what the row is called, whether inclusion
is a row or a footnote, whether "Entry price" survives — and that is authoring, not a
correction. The data it would need is in place.

*Status:* open — copy and design decision · *Raised:* 20 Aug 2026

### SR-129 · `TRACKS[2]` and `TRACKS[3]` were defined twice
Empty skeletons in the literal, with the real objects declared 300 lines later as `var T2` /
`var T3` and assigned over them. The resolved data was correct; the mechanism was fragile —
anything reading `TRACKS` before the assignment got blank copy rather than an error.

**The stub pattern was a workaround, not an oversight, and Rule 15 came from finding out
why.** `TRACKS[2].change.items` **is** `CHANGE_PROPOSALS[2]` — the same object by identity —
and `CHANGE_PROPOSALS` was declared *after* the literal. A straight promote would have
evaluated it against a hoisted-but-undefined binding and thrown. `CHANGE_PROPOSALS` is now
hoisted above `TRACKS` with a do-not-move note.

**Equivalence proved, not assumed:** `JSON.stringify(TRACKS)` is **byte-identical** before and
after — 30,467 bytes, hash 2778865564 — with the probe proved sensitive by a one-character
perturbation first.

*Status:* complete on merge · *Raised:* 21 Aug 2026 · *Fixed:* 21 Aug 2026

### SR-134 · Spelled-out counts survived the Elevation removal
[index.html:2690](index.html:2690) read *"**Four plans.**"* above a grid of **three** panels,
and [:7359](index.html:7359) *"One methodology. **Four programs.**"* above **three** cards.
Two stale comments said the same. All four corrected.

They survived Run D's 19-surface removal because they **name a number, not the track** — no
sweep for `Elevation` could reach them. **Rule 17 was written from this and from
[[SR-126]]'s "Nineteen euros a month".**

Each claim was **asserted against the grid it describes**, not string-replaced — that pattern
is now standard for any count claim.

*Status:* complete on merge · *Raised:* 21 Aug 2026 · *Fixed:* 21 Aug 2026

### SR-139 · Sessions and workshops are one hour
21 duration strings corrected across `dashboard.html` and `protocol.html` — **six more than
the brief listed**, including a whole sessions module on `protocol.html` mirroring the
dashboard's. Time ranges `18:00–20:00` → `18:00–19:00`, asserted **verbatim in full** with a
single-occurrence check per line, never a bare end time.

*Status:* complete on merge · *Raised:* 21 Aug 2026 · *Fixed:* 21 Aug 2026

### SR-141 · Workshop prices are €29 per person and €49 per couple
Five `index.html` surfaces now derive from `PRICING`, including the services sentence, which
reads correctly at the new figures. `protocol.html`'s two corrected as literals — **that page
loads no external scripts at all**, so there is no mechanism to derive from; reported rather
than adding one ([[SR-127]]).

*Status:* complete on merge · *Raised:* 21 Aug 2026 · *Fixed:* 21 Aug 2026

### SR-145 · index.html navigation routes to the standalone track pages
**Stage one of a two-stage migration.** Navigation goes to real URLs; in-page CTAs keep
opening overlays until the standalone pages carry what the overlays hold ([[SR-148]]).

Three nav tabs converted `<button onclick>` → `<a href>`, and three footer-template links
repointed. **The decisive reason is sequencing, not cost:** every block moved into the record
shrinks the eventual overlay retirement, while every block copied out of the overlays creates
another inventory to keep in step.

**The brief said three links; there are 19 call sites.** Its count came from a DOM figure
inflated by the footer template — **the second time a template multiplier has produced a wrong
count in a brief** (Rule 11). Source 19 → DOM 48; the three footer edits alone produce 33 DOM
instances across 11 cloned footers.

**A passing check worth recording:** all three overlays have **zero euro literals** — every
price is a `data-sr-price` node. There is no second pricing inventory. The drift concern holds
for content, not prices.

*Status:* complete on merge · *Raised:* 21 Aug 2026 · *Fixed:* 21 Aug 2026

### SR-147 · Thirteen in-page CTAs still open overlays
*"Begin Free — No Registration"* ×3, *"Start — €9/mo"*, *"Start Personal Transformation"*,
*"Back to…"*, five *"Join Waitlist"*, *"Start — €29/mo"* ×2. Deliberately untouched by
[[SR-145]]: repointing them now would delete four content blocks with no destination.
Blocked on stage two ([[SR-148]]).

*Status:* open — blocked on SR-148 · *Raised:* 21 Aug 2026

### SR-148 · The standalone pages and the overlays are not a superset either way
**Overlays have, standalone does not:** "What's Included" (hardcoded markup, ~10,934 chars per
overlay — see [[SR-153]]), the workshops and 1:1 cards (one JS template at
[index.html:4436](index.html:4436), ~1,411 chars, **needs nothing from the record**), and ten
inline per-protocol detail views (generated from `PT_PROTOCOLS`, **Track 01 only**, coupled to
Reader and identity-layer ordering — by far the largest).

**Standalone has, overlays do not:** 18 FAQ items, the 9-item resource list, the introductory
rate label. **All three already derive from the record**, and `index.html` already loads
`content/tracks.js`, so the overlays could read the same source — a mount point and a render
call, no new content.

**Decision: reverse direction first**, for the sequencing reason above rather than the cost
difference.

*Status:* open — stage two · *Raised:* 21 Aug 2026

### SR-153 · A third resource inventory
The overlay "What's Included" is **hardcoded markup** listing **6 / 6 / 10** items whose names
match neither each other nor `SHARED.resources`' **9**. [[SR-125]] covers the first two
inventories; this is the third.

Its copy is **genuinely track-specific** — *"both of you"*, *"each of your nervous systems"* —
so it **cannot** be replaced by the shared list. A per-track record structure
(`TRACKS[n].included[]`) would be needed, carrying ~22 item descriptions currently living in
markup.

*Status:* open — blocked on Andre · *Raised:* 21 Aug 2026

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
`[]` would assert a verification nobody performed. Do not "tidy" this in a later pass.

*Correction, same day:* this entry originally pointed at [[SR-120]] as the contrasting case
where `[]` is a wrong value. **It is not** — SR-120 was investigated and does not reproduce.
No `[]` in the tree contradicts its content. The `null` / `[]` distinction still stands as
written above; only the example was wrong.

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

### SR-121 · `SERIES_CONFIG` and its three renderers were dead code
A closed island of 117 lines in `index.html`: `SERIES_CONFIG`, `renderSeriesHero`,
`renderProtocolBrowseHead`, `renderWhatsIncludedHTML`, and the `DOMContentLoaded` loop that
wired them to `hero-mount-*` / `protocols-head-mount-*` / `whats-included-mount-*`.

**It had no mount targets.** Checked against the tree before [[SR-110]] touched anything:
the only such elements in `index.html` were the three `-elevation` ones. The `personal`,
`couples` and `corporate` entries in `SERIES_CONFIG` had **never** rendered — those overlays
carry hardcoded hero markup. So this predates the Elevation removal; removing the overlay
only made it visible.

Verified as a closed island across every tracked file: the four symbols appear nowhere
except their own definitions and each other, and no mount id exists anywhere.

**Proved by rendering, not by reasoning.** Each of the seven surviving overlays was
fingerprinted before and after removal — rendered `innerHTML` byte length, normalised text
length, element count, `.proto-item` count, and a content hash over the full markup. **All
seven are byte-identical, hashes included.** `prog-personal` 319,380 B / hash 2607618881,
`prog-couples` 278,929 B / 3406980494, `prog-corporate` 237,185 B / 1164681881, and the four
non-track overlays likewise. The three track heroes still render their own headings. The
fingerprint was proved sensitive by appending one character to a paragraph, which moved both
byte count and hash, then restoring it.

After removal the four symbols throw `ReferenceError`, all ten inline blocks parse, and the
console is clean.

Removed rather than documented as a deliberate non-fix: there is no reason for it to stay.
Given its own ID and its own commit so it is revertable and reviewable apart from the
Elevation work.

*Status:* complete on merge · *Raised:* 20 Aug 2026 · *Fixed:* 20 Aug 2026

### SR-123 · `<style id="sr-series-hero">` is now dead
The block at [index.html:823](index.html:823) defines two families: `.sr-hero-badge` /
`.sr-hero-eyebrow` / `.sr-hero-accent`, and everything scoped under `.pcard-grid`.

Both are now unused on the page. The hero classes were emitted by `renderSeriesHero`,
removed by [[SR-121]]; the only `.pcard-grid` element was `#elevation-protoList`, removed by
[[SR-110]]. Measured on a cold load: **0** `.pcard-grid` elements, **0** `.sr-hero-*`
elements. The 62 surviving `.proto-item` elements sit outside any `.pcard-grid` and are
styled by the base rules defined earlier in the file, which the block's own comment says are
deliberately left untouched — so nothing regresses.

The three track pages do **not** load this block; they are separate documents rendered by
`js/saferise-track.js`. Repo-wide, `pcard-grid` and `pcard-cols` appear only inside this
block's own rules and comments.

**One of the 26 rules was not dead, and the block description was wrong.** The last rule,
`#personal-protocol-page .sr-tile{aspect-ratio:auto;height:240px}`, has nothing to do with
series heroes — it is a Personal-portal fix that happened to be appended to this block. It
**matches and applies**: the view-swap script relocates a `.proto-item` into
`#personal-protocol-page`, and the rule caps the tile there.

Its rendered effect is nil, because
[css/saferise-system.css:562](css/saferise-system.css:562) —
`#personal-protocol-page .proto-item .sr-tile{display:none}` — loads later and wins.
Measured with the view swap triggered, by deleting the rule from the live CSSOM and
restoring it:

| | rule present | rule removed |
|---|---|---|
| computed `aspect-ratio` | `auto` | `3 / 4` |
| computed `height` | `240px` | `auto` |
| rendered box | **0 × 0** | **0 × 0** |
| page height | **4051px** | **4051px** |

Computed style differs; nothing renders differently. **Deleting it would have looked safe and
been wrong** — the hazard it prevents (a 3/4 tile scaling to ~1300px in the full-width mount)
is real and merely masked. Remove the `display:none`, or stop nesting the tile inside
`.proto-item`, and the rule becomes load-bearing again with nothing connecting the two events.

**Resolution (20 Aug 2026).** The rule was **relocated into
`css/saferise-system.css`, directly adjacent to the `display:none` it interacts with**, under
a comment recording what it prevents, why it currently shows no effect, and that it must not
be tidied. Registered as a deliberate keep, same class as `extras: null` ([[SR-117]]) and the
launch/standard pair in `PRICING` ([[SR-124]]).

The move was proved cascade-neutral rather than assumed. `saferise-system.css` loads last and
wins by cascade order ([[SR-105]]), and the two properties do not collide with the
`display:none`; with the view swap triggered, computed `aspect-ratio`, `height`, `display` and
the rendered rect are **identical before and after**, and the rule is now served by
`saferise-system.css`.

The block then went — all 26 rules, 83 lines. After removal: `<style id="sr-series-hero">`
absent, **0** `.sr-hero*` elements, **0** `.pcard-grid` elements, 62 `.proto-item` elements
unaffected (they are styled by the base rules defined earlier, which the block's own comment
said were deliberately left alone). All ten surviving overlays fingerprinted before and after
— **byte-identical, hashes included** — with the probe proved sensitive by a one-character
perturbation that moved both byte count and hash and restored exactly.

*Status:* complete on merge · *Raised:* 20 Aug 2026 · *Fixed:* 20 Aug 2026

### SR-120 · `t1-01` extras — **reproduces.** My first finding was wrong.
Raised as: `p1-advisory` is written and the Reader serves it, but `META['t1-01'].extras` is
`[]`, so content and data disagree and the `[]` is a wrong value rather than an unverified
one.

**`p1-advisory` exists, and the Reader serves it.** Measured on the live object graph:
`RESOURCE_CONTENT['p1-advisory']` is present with `kind: 'Attention Advisory'`, title
*"Anxiety Reset — Where to Direct Your Attention"*, and `READER_PROTOCOLS['p1'].keys` lists
it **first** of seven.

**How I got this wrong the first time, and it matters.** My initial sweep matched
`"p1-advisory"` — double-quoted, the JSON-literal form. This resource is created by a
runtime assignment at [index.html:4691](index.html:4691),
`RESOURCE_CONTENT['p1-advisory'] = {…}`, single-quoted, inside an IIFE added by SR-002.
`index.html` builds a large part of `RESOURCE_CONTENT` this way — several later blocks add
and overwrite entries after the literal is parsed. **A static grep cannot enumerate this
file's resource keys.** Only the live object graph can. That is now the method for any
resource-key question here.

**The `extras` → content-key mapping, which is still worth recording.** The second
conditional is keyed `-repair`, not `-invitation` — the value in `extras` and the suffix in
the content key do not share a name, so any audit matching by name reports a gap that is not
there:

| conditional | `extras` key | content key | protocols claiming it | content present for |
|---|---|---|---|---|
| Proximity Guide | `advisory` | `pN-advisory` | t1-02, 03, 04, 08, 09, 10 | p1, p2, p3, p4, p8, p9, p10 |
| Invitation to Repair | `invitation` | `pN-repair` | t1-02, 04, 08, 09 | p2, p4, p8, p9 |

`p1` is the one row where content exists and `extras` does not claim it. Every other cell
matches in both directions, and no `extras` entry anywhere claims content that is absent.

**So `t1-01: extras: []` is wrong** — `[]` asserts *verified, neither conditional applies*,
while the Reader serves an Attention Advisory for that protocol. `protocolResourceCount('t1-01')`
returns **7**, omitting the Proximity Guide, while the Reader's `p1` manifest carries
`p1-advisory`.

**Not fixed yet, and it should not be fixed in isolation.** The two inventories are not the
same list — see [[SR-125]]. `p1-advisory` is *"how do I turn attention inward safely"*, while
`SHARED.resources`' Proximity Guide is *"How close to stay"* — relational distance, which is
the `p2-advisory` content. Setting `extras: ['advisory']` on `t1-01` would make the count 8
by claiming a **Proximity Guide the protocol does not have**. The honest fix depends on
whether `advisory` means one resource or two, which is the SR-125 question.

*Status:* open — reproduces; blocked on [[SR-125]] · *Raised:* 20 Aug 2026

### SR-133 · The `CHANGE_PROPOSALS` comment described unfinished material
It called live member-facing copy appendix material. Rewritten to state what the object is —
the `items` of the live `change` section on Tracks 02 and 03, referenced **by identity** and
never copied — with a **DO NOT MOVE BELOW `var TRACKS`** note and its reason.

Also repaired the `TRACKS` banner stranded by [[SR-129]]'s hoist. **Rule 19 was written from
that and from the SR-057 comment in [[SR-136]]** — both stranded by replacing a block's first
line, both syntactically valid, neither catchable by a parse check.

**A trap recorded:** the first draft *quoted* the phrases it replaced, failing the constraint
that no draft-status wording survive. Rewritten to describe rather than quote.

Follow-up: the name `CHANGE_PROPOSALS` is now misleading; renaming touches three references
plus `module.exports`.

*Status:* complete on merge · *Raised:* 21 Aug 2026 · *Fixed:* 21 Aug 2026

### SR-138 · The 1:1 prices derived from nothing
`index.html` rendered €129 and €299 as literals while `premium1`/`premium3` held the same
values with **zero consumers** — correct figures sitting in the record unrendered while copies
of them shipped. All four converted to `data-sr-price` spans. **Closes [[SR-057]]**: not
retired tiers, live products with no derivation.

**Follow-up, not done:** [:7681](index.html:7681) renders *"≈€99.67/session"* — arithmetic
over `premium3`, not a record value. Deriving it needs a computed-price mechanism that does
not exist. **If `premium3` changes, that figure goes stale silently.**

*Status:* complete on merge · *Raised:* 21 Aug 2026 · *Fixed:* 21 Aug 2026

### SR-140 · `premium3` is three sessions, not three hours
`per: 'for three hours'` → `'for three sessions'`. One string aligned to seven that already
agreed; with the 1:1 at one hour, a three-hour block cannot coexist with *"space sessions out
as you need"*.

**No rendered sentence changed, and that is the honest result.** `premium3.per` had **zero
consumers** — no `data-sr-price-form="per"` node exists, and every `.per` reader operates on
track prices. The string was **inert**.

**This is the inverse of Rule 14.** Dormant *code* resumes when whatever masks it changes;
dormant *data* is read the moment someone adds a consumer. A wrong value in the record is a
defect by construction regardless of current readers.

*Status:* complete on merge · *Raised:* 21 Aug 2026 · *Fixed:* 21 Aug 2026

### SR-143 · index.html workshop durations
Three strings in `prog-workshops` said 90 minutes; corrected to 60 with each hedge and idiom
preserved. The retreat segments at :7888 and :7975 describe a **different product** and were
asserted intact.

The brief said index.html was already correct — **true of the 1:1, not of workshops.**

*Status:* complete on merge · *Raised:* 21 Aug 2026 · *Fixed:* 21 Aug 2026

### SR-144 · The workshop agenda sums to two hours
`dashboard.html:567` reads *"Two hours, facilitated live"* above a run-sheet of
**15 + 40 + 45 + 20 = 120 minutes**. Both left exactly as they are, by decision: **a heading
that disagrees with its own run-sheet is better than a run-sheet with invented numbers.** The
four segment lengths are a facilitation decision. The only remaining "Two hours" in the tree.

*Status:* open — blocked on Andre · *Raised:* 21 Aug 2026

### SR-146 · Thirty-nine dead links on the member pages
`dashboard.html` **11**, `protocol.html` **22**, `resource.html` **6**; `index.html` **0**.
Highest-value: `protocol.html:599–600`, a five-item nav all dead on a page members read, and
:867/:884 — *"Book a session"* and *"Reserve a place"* — dead directly beneath the prices this
run corrected.

**Not all are dead**: `dashboard.html`'s TEXTMAP delegated handler wires several by text
content, so each must be **clicked**, not read (Rule 18). Targets that exist: `method.html`,
the three track pages, `dashboard.html`. Terms/Privacy/Support have **no target file**.

Queued and not started — the run closed first.

*Status:* open · *Raised:* 21 Aug 2026

### SR-150 · `protocol.html:6744`'s "billed separately, above" points at nothing
The corporate portal line reads *"Corporate team programmes are billed separately, **above**"*,
but nothing above it in that overlay describes team programmes — the preceding content is the
back-link and the hero. Found during [[SR-122]].

*Status:* open · *Raised:* 21 Aug 2026

### SR-151 · The Professional plans card says "Pricing to be announced"
[index.html:7385](index.html:7385) reads *"Pricing to be announced · team programmes priced
separately"* on a card that also says *"Coming Soon"* and *"Join Waitlist"*. **Track 03 has a
price** — €39/mo in `PRICING`, rendered correctly everywhere else after [[SR-124]]. The
*second* clause is accurate ([[SR-122]]); the first is stale. Copy decision.

*Status:* open · *Raised:* 21 Aug 2026

### SR-152 · The protocol carousel clips a card at every viewport
Measured on `personal-transformation.html`, `viewport_usable` asserted at each. Card width is
a constant **238px**; the carousel is a real scroller (`scrollWidth` 2562) and **the counter
reads "1 / 10" at every width**, never the number visible.

| viewport | carousel | full | clipped card | clipped by |
|---|---|---|---|---|
| 1440×1000 | 1178 | 4 | **5th** | **68px** |
| 1280×1000 | 1178 | 4 | **5th** | **68px** |
| 1024×900 | 958 | 3 | **4th** | **36px** |
| 768×900 | 702 | 2 | **3rd** | **40px** |
| 390×844 | 300 | 1 | **2nd** | **190px** |

1440 and 1280 are identical because the container caps at 1178. **No page-level horizontal
overflow at any width** — the clipping is inside the scroller, which is the intended pattern.
The mockup claim of *"1/10 with the fifth card clipped"* **reproduces exactly at 1440**.

Whether a partially-visible card is a defect or an affordance is a design decision. At 390 the
2nd card shows only 48px of 238, which reads as a layout error rather than a hint.

*Status:* open — design decision · *Raised:* 21 Aug 2026

### SR-142 · Seven dead `href="#"` on index.html — does not reproduce
Raised as three dead track cards at `:958, :965, :971` among seven `href="#"`.

**`index.html` contains zero `href="#"`.** Lines 958/965/971 are **CSS inside `<style>`
blocks**. The three track links are `href="javascript:void(0)"` with live handlers; all three
were clicked and all three opened their overlays. Of **113 anchors**, none has a dead href
with no handler.

**Cause, recorded because it is the fifth inversion in one run:** the brief was written from a
standalone homepage mockup that is not in the repo and is unrelated to `index.html` — Rule 16,
broken by its author.

The real finding was different in kind: **`index.html` links to no other HTML page in the
tree**, which became [[SR-145]]. The genuine dead links are on the member pages — [[SR-146]].

*Status:* closed — does not reproduce · *Raised:* 20 Aug 2026 · *Closed:* 21 Aug 2026

### SR-130 · Track 02 sold at Track 01's price — does not reproduce
`relationship-healing.html` renders **€29** in all three surfaces — sticky bar, panel numeral,
and the words *"Twenty-nine euros a month."* Track 03 renders €39, Track 01 €9. Observed
incidentally during [[SR-129]] while the evidence was in front of the run; Phase 2 was
formally held at the time and never needed to open.

*Status:* closed — does not reproduce · *Raised:* 20 Aug 2026 · *Closed:* 21 Aug 2026

### SR-131 · The appendix renders on the track pages — does not reproduce, and inverts
No track page renders *"proposed"* or *"appendix"*; the string *"Six areas of change —
proposed for Track 02"* **does not exist in the repo**. The rendered kicker is
*"Six areas of change"*, hardcoded in the renderer with no track name.

**`CHANGE_PROPOSALS[2]` and `[3]` are the `items` of the live `change` section** on Tracks 02
and 03, wrapped in ordinary live copy. **Following the brief would have deleted the six-areas
section from two of three track pages** — the most consequential near-miss of the run. The
comment was the defect; corrected under [[SR-133]].

*Status:* closed — does not reproduce · *Raised:* 20 Aug 2026 · *Closed:* 21 Aug 2026

### SR-132 · `FRAMEWORKS` still carries Dispenza — does not reproduce
**There is no `dispenza` key.** The fourth key is `distance` — `name: 'Distance & rehearsal'`,
`person: 'Kross & Ayduk'`, `register: 'peer-reviewed'`, gold. Every specific in the brief
inverts. Zero `dispenza` in any non-doc tracked file, plain or escaped, and
`mock-05-record-audit.html` **is not in the repo**. Duplicate of [[SR-118]]; briefed from a
pre-merge snapshot.

Carried for [[SR-107]]: five `data-sr-reach` cards exist — porges, heartmath, mate, jung,
watts — and **no `distance` card**, so its six protocols surface nowhere. Live reach across 30
META entries: porges 16, mate 14, jung 11, heartmath 7, watts 7, distance 6.

**`register` and `colour` are declared and read by nothing.** The gold/teal band split exists
only as hardcoded CSS and prose, so changing `register` moves nothing on any page — the same
class as `PRICING[t].includes`, which no `#prog-compare` surface reads. Fields that look
authoritative and drive nothing.

*Status:* closed — does not reproduce · *Raised:* 20 Aug 2026 · *Closed:* 21 Aug 2026

### SR-154 · The preview server cannot read the repo under this sandbox
Environmental, not a repo defect, and it will recur in every run until the sandbox changes.

`.claude/launch.json` as committed — `python3 tools/serve.py 8642` — fails to start:

```
/Library/Developer/CommandLineTools/usr/bin/python3: can't open file 'tools/serve.py':
[Errno 1] Operation not permitted
```

An absolute path fails identically, and a scratchpad script pointed at the repo fails one step
later:

```
PermissionError: [Errno 1] Operation not permitted:
'/Users/arobley/Documents/GitHub/saferise/dashboard.html'
```

The preview runner has no read access to `~/Documents` at all. **`tools/serve.py` is unchanged
and correct** — it runs normally from a shell. Do not "fix" it.

**Procedure:** run the server from the scratchpad against an `rsync -a --delete` mirror of the
working tree, with `launch.json` temporarily repointed at the scratchpad script and **restored
before staging** (Rule 5).

**The mirror needs a control, because a silently failed sync leaves you verifying a pre-edit
copy and reporting a pass with numbers that all look plausible.** Before each verification:
write a unique token into the file just edited, sync, confirm it appears in the mirror **and
that it is absent from a control file**, then remove it and sync again. Rule 20 applied to the
measurement path itself.

**Two capture artifacts this environment produces, both Rule 10:**
- `resize_window` with a **preset** leaves `innerWidth`/`innerHeight` at **0**, and every
  measurement taken there is void — the statebar measured 231px tall at zero width and 51px at
  1280x860. Set explicit `width`/`height` and report `viewport_usable` with each measurement.
- The browser **serves a cached page after an edit**. The first post-[[SR-155]] measurement
  showed the removed statebar still present, while `curl` against the same server returned a
  file that did not contain it. Cache-bust every verification URL and treat a stale reading as
  void.

*Status:* closed — environmental, recorded for reuse · *Raised:* 21 Aug 2026


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
