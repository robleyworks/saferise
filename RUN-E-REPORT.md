# Run E — reconciling what the site says it charges and what it says it contains

Branch: `fix/pricing-reconcile`
Base: `22137521f11aca77cdc1df5b4c9e717ea28aa2a7` — the `main` merge commit
(`Merge pull request #28 from robleyworks/feat/elevation-hide`, parents `3767fbe` + `4178d5d`).

---

## Phase 0 — base check

| check | result |
|---|---|
| HEAD | `2213752f11aca77cdc1df5b4c9e717ea28aa2a7` |
| merge commit | yes — parents `3767fbe` (old main) + `4178d5d` (Run D tip) |
| `main` == `origin/main` | identical |
| tree | clean |
| `.claude/launch.json` | `["tools/serve.py", 8642]`, port 8642 — committed state |
| port 8642 / listeners | free / zero |
| Run D present | `4178d5d` is an ancestor |

### The branch did not exist — blocker, then an explicit override

`fix/pricing-reconcile` was absent locally and as a remote ref; the session opened on `main`.
Reported and held rather than starting, because committing Run E onto `main` would breach the
standing rules twice — no branch switching, and `main` receives merges only.

Andre granted a **one-action override**: `git switch -c fix/pricing-reconcile` from `main` at
`2213752`. Executed, then verified — branch `fix/pricing-reconcile`, HEAD unchanged at
`2213752`, **no upstream set**, tree clean, `main` unmoved. **The override then expired**: no
further branch switching for the rest of Run E, nothing pushed or merged at any point.

**The relaunch step was waived, deliberately, not skipped.** Its purpose is to stop a session
committing against a stale cached branch when the branch is created externally *after* the
session started. Creating the branch inside the session has no stale state — the branch is
known because it was just set. The safeguard targets a failure mode this path does not have.

*Result: pass, after one reported blocker.*

---

## Phase 0b — resolved `PRICING` (report only)

Read from the live object graph, not the source escapes.

| key | amount | per | words | notes |
|---|---|---|---|---|
| `t1` | €9 | / month | Nine euros a month. | `introductory: true`; `standard` €19 / *Nineteen euros a month.*; `includes ['t1']` |
| `t2` | €29 | / month | Twenty-nine euros a month. | `includes ['t1','t2']` |
| `t3` | €39 | / month | Thirty-nine euros a month. | `includes ['t1','t2','t3']` |
| `workshopPersonal` | €59 | per person | — | **superseded — now €29, see below** |
| `workshopRelationship` | €139 | per couple | — | **superseded — now €49, see below** |
| `premium` | €275 | / session | — | **superseded — key removed, see below** |
| `premium1` | €129 | per hour | — | **zero consumers** |
| `premium3` | €299 | for three hours | — | **zero consumers** |

> **Read this table as a *before* snapshot, not as current state.** SR-168 (21 Aug 2026) added
> this note. Three of its rows were changed **later in this same run** by SR-136 — see
> *Resolved `PRICING`* further down, which records `workshopPersonal` €59 → €29,
> `workshopRelationship` €139 → €49, and `premium` removed, taking 8 keys to 7. The numbers
> above were correct when measured and are **deliberately left as measured**: SR-136's
> before/after pair depends on them, as does the €49 ordering constraint. The current record is
> `content/tracks.js`; the standing count is 8, defined in `docs/fix-register.md`.

### The Phase 1 premise did not hold

`protocol.html`'s €275 / €59 / €139 are **exactly** `premium`, `workshopPersonal` and
`workshopRelationship`. They are correct as rendered. There is no live price contradiction —
SR-127 is a **coupling** defect: the page duplicates three figures with no link to the record.
`protocol.html` carries **zero `<script src>` tags of any kind**, so `tracks.js` is genuinely
absent.

€129 and €299 are `premium1`/`premium3`, and "€29 per person" exists nowhere — workshops are
€59 per person.

**Phases 1, 2 and 5 held** pending Andre's decision on which price set is authoritative.
Phase 5 is held with them because resource counts and pricing copy share surfaces.

---

## Phase 3 — SR-129, the T2/T3 stub blocks

### 1 · Premise proved first

| track | filled promise | filled description | filled symptoms | cost / range / journey / change | faq | price |
|---|---|---|---|---|---|---|
| 01 Personal Transformation | 10/10 | 10/10 | 10/10 | all four populated | 6 | €9 |
| 02 Relationship Healing | 10/10 | 10/10 | 10/10 | all four populated | 6 | €29 |
| 03 Professional Performance | 10/10 | 10/10 | 10/10 | all four populated | 6 | €39 |

Exactly as briefed. The resolved data was correct; only the mechanism was fragile.

### 2 · The fix needed one step the brief did not anticipate

A straight promote **would have thrown**. `TRACKS[2].change.items` and
`TRACKS[3].change.items` are not copies of `CHANGE_PROPOSALS` — they are **the same object**
(`===` confirmed). `CHANGE_PROPOSALS` was declared at line 261, *after* the `TRACKS` literal
at 106–258. Moving T2/T3 into the literal would evaluate `CHANGE_PROPOSALS[2]` at line ~207,
where `var` hoisting leaves the name defined but `undefined` — a `TypeError` that would have
taken the whole module down.

**That ordering dependency is why the stub-and-assign pattern existed at all.** It was not
an oversight; it was a workaround.

So `CHANGE_PROPOSALS` (19 lines, no external references of its own) was hoisted above
`var TRACKS`, with a comment recording why it must stay there. Reported here rather than done
silently: it is one block more than the brief describes.

### 3 · Changed

- `CHANGE_PROPOSALS` moved above `TRACKS`, with a `SR-129` comment explaining the constraint
- `var T2` (117 lines) promoted to `TRACKS[2]`; `var T3` (117 lines) promoted to `TRACKS[3]`
- both stub blocks deleted, and the comment above them — *"Empty strings are the matrix gaps
  and render as visible markers"* — deleted with them
- `TRACKS[2] = T2; TRACKS[3] = T3;` deleted

Every boundary asserted against its neighbours before the edit; no pattern matching.

### 4 · Equivalence proved, not assumed

`JSON.stringify(TRACKS)` **before: 30,467 bytes, hash 2778865564. After: 30,467 bytes, hash
2778865564.** Byte-identical. **No diff to report — that is the result.**

Object identity also preserved: `TRACKS[2].change.items === CHANGE_PROPOSALS[2]`,
`TRACKS[3].change.items === CHANGE_PROPOSALS[3]`, `TRACKS[2].price === PRICING.t2`,
`TRACKS[3].price === PRICING.t3` — all still true. `T2` and `T3` no longer exist as globals.

### 5 · Probe proved sensitive first

One character appended inside `TRACKS[2].protocols[4][3]` moved the snapshot from
30,467 / 2778865564 to 30,468 / 3854109202; restoring returned both exactly.

### Verification

JS parse **first**: `personal-transformation.html` 1 block, `professional-performance.html` 1,
`index.html` 11, `dashboard.html` 1 — **all parse**, sentinel `caught SyntaxError`.
Div balance 7/7, 7/7, 2812/2812, 175/175. `tracks.js` braces 92/92, brackets 286/286,
parens 52/52.

All three track pages render on a cold load: **10 protocol cards, 18 FAQ entries, 9 resources,
0 empty headings, `SR_TRACK_MISSING` empty**, prices €9 / €29 / €39. Console clean on a fresh
tab.

**One console reading discarded:** the reused tab reported eight `ERR_CONNECTION_REFUSED`
entries left over from the previous server across a stop/start. A fresh tab reported none.

### Free observation for the held Phase 2

Not acted on. `relationship-healing.html` currently renders **€29** everywhere it shows a
price — sticky bar *"Get Started — €29/month"*, panel numeral *"€29 / month"*, and the words
*"Twenty-nine euros a month."* Track 03 renders €39, Track 01 €9. **SR-130's premise — Track
02 showing €19 — does not reproduce in this tree.** Recorded now while the evidence was in
front of me; Phase 2 stays held.

*Result: pass. Data byte-identical, mechanism removed.*

---

## Phase 4 — SR-132. **Does not reproduce. Nothing changed.**

**There is no `dispenza` key in `FRAMEWORKS`.** The six keys are `porges, heartmath,
distance, mate, jung, watts`, and the fourth is:

```js
distance: { name: 'Distance & rehearsal',
            person: 'Kross & Ayduk · Best Possible Self literature',
            short: 'Kross & Ayduk',
            register: 'peer-reviewed', step: 4, colour: 'var(--gold)' }
```

Every specific in the brief inverts: `kross` and `ayduk` **are** present, `Distance &
rehearsal` **is** the name, the register **is** `peer-reviewed`, the colour **is** gold.
`dispenza` appears **zero times** in any non-doc tracked file, checked plain and
`\u`-escaped; every hit is under `docs/`. **`mock-05-record-audit.html` is not in the
repo** — untracked, absent, and no `*record*` / `*audit*` file exists.

Duplicate of Run D's [[SR-118]], closed as *"already removed; the key is `distance`"*.

### 1 · The six META entries — mapped to `distance`

| key | track | protocol | other frameworks |
|---|---|---|---|
| `t1-09` | 01 | Anchor — The Insecurity Anchor Protocol | `jung` |
| `t1-10` | 01 | Reclaim — The Powerlessness & Despair Protocol | `porges`, `watts` |
| `t2-08` | 02 | Appreciate — The Appreciation & Support Protocol | `heartmath` |
| `t3-03` | 03 | Dissolve — The Imposter Dissolution Protocol | `jung` |
| `t3-08` | 03 | Decide — The Decision Fatigue Protocol | `porges` |
| `t3-10` | 03 | Unlock — The Creative Flow Protocol | `watts` |

### 2 · Surfaces printing a framework `short` or `name`: **none**

Nothing reads `.short`, `.name`, `.person`, `.register` or `.colour`. The only consumer is
`frameworkReach(key)` ([content/tracks.js:570](content/tracks.js:570)), which returns protocol
keys; the hydrator at [index.html:10477](index.html:10477) prints **a count, never a name**.
Framework names on pages are hardcoded prose.

### 3 · The band split is inert

`register` and `colour` are declared and read by nothing. Gold/teal exists only as hardcoded
CSS ([css/saferise-method.css:88](css/saferise-method.css:88)) and prose
(`method-porges.html:311–313`). Changing `register` moves nothing.

### Carried for the register — SR-107 evidence

Five `data-sr-reach` cards: `porges`, `heartmath`, `mate`, `jung`, `watts`. **No `distance`
card**, so its six protocols surface nowhere. Live reach across 30 META entries: porges 16,
mate 14, jung 11, heartmath 7, watts 7, **distance 6**.

---

## Phase 6 — SR-131. **Does not reproduce as briefed — and the truth is the inverse.**

### Reproduced against the repo, all three track pages

| page | section heading | items | "proposed" / "appendix" / "not yet live" on page |
|---|---|---|---|
| Personal Transformation | *Change becomes visible across daily life.* | Mind, Body, Rest, Energy, Relationships, Identity | **NONE** |
| Relationship Healing | *Change becomes visible in the room.* | Conversation, Repair, Predictability, Reactivity, Closeness, Separateness | **NONE** |
| Professional Performance | *Change becomes visible at work.* | Presence, Recovery, Endurance, Judgement, Conflict, Standing | **NONE** |

The string *"Six areas of change — proposed for Track 02"* **does not exist in the repo.**
The rendered kicker is `Six areas of change`, hardcoded in the renderer at
[js/saferise-track.js:256](js/saferise-track.js:256), with no track name and no "proposed".
The only occurrence of *proposed* or *appendix* anywhere outside `docs/` is the comment
itself, at [content/tracks.js:106](content/tracks.js:106).

### The comment is what is wrong, not the rendering

`CHANGE_PROPOSALS[2]` and `[3]` are the **`items` of the live `change` section** for Tracks
02 and 03 — [content/tracks.js:334](content/tracks.js:334) and
[:452](content/tracks.js:452). Their `eyebrow`, `h2`, `lede` and `close` are ordinary live
copy authored around them. This is the same object identity Phase 3 found.

So the data described as *"for the appendix, not yet live"* **is** the live Track 02/03
content, and has been since T2/T3 were authored. The comment records an intention that was
superseded.

**Hiding it would delete the six-areas section from two of the three track pages.** That is
the opposite of the brief's intent, which was to stop unfinished material leaking to the
public. There is no leak: this is finished, track-specific copy, distinct per track and
matched to each track's voice.

**Nothing changed.** No visibility flag was added — there is nothing to hide, and per the
Phase 3 note any flag would have had to avoid mutating an object with two consumers.

The stale comment is worth correcting, but the correct wording depends on what Andre intends
the appendix to be, so it is logged rather than guessed.

*Result: does not reproduce. No code touched.*

---

## SR-133 — the stale `CHANGE_PROPOSALS` comment

Issued from the reservation. Comments only; no data or logic touched.

Replaced the header above `CHANGE_PROPOSALS` with one that states what the object actually
is: the `items` of the live `change` section on Tracks 02 and 03, referenced **by identity**
at :334 and :452 and never copied, so mutating an entry changes what the track page renders.
It carries the **DO NOT MOVE THIS BELOW `var TRACKS`** note with the reason — the literal
reads it during evaluation, so a later declaration leaves the binding hoisted-but-undefined
and throws — and records that the name is historical.

No occurrence of *proposed*, *appendix* or *not yet live* survives anywhere in the file.

**One thing my own Phase 3 edit had left broken, fixed here.** Hoisting `CHANGE_PROPOSALS`
stranded the `/* ── TRACKS · four records ── */` banner above it, so the file read as though
that banner described `CHANGE_PROPOSALS`. The banner is back above `var TRACKS`, now
cross-referencing the ordering note.

**A trap I walked into and had to back out of:** my first draft of the new comment *quoted*
the phrases it was replacing — "not yet live" — which failed the constraint that no
draft-status wording survive. Caught by the assertion, rewritten to describe rather than
quote. Same shape as Run D's `Tell me when it opens` comment.

**Verified:** `JSON.stringify(TRACKS)` is **30,467 bytes, hash 2778865564** — identical to the
Phase 3 baseline. Object identity intact on both tracks.

Raw bracket counts moved (`[]` 286→284, `()` 52→54) purely because the comment prose contains
brackets. Recorded because it is a useful demonstration that **raw character counting includes
comments and is not a structural check** — the JSON equality is what proves the data unchanged.

**Follow-up logged, not done:** the name `CHANGE_PROPOSALS` is itself now misleading.
Renaming touches three references plus the `module.exports` line and is a separate change.

---

## Phase 7 — SR-126. **Premise check: there is no label to reword.**

Per Rule 16 the premise was checked before editing. Result: **no introductory or launch-rate
label exists on any surface in the tree.** Count of surfaces carrying the current label:
**zero**.

| probe | result |
|---|---|
| `introductory` / `launch rate` / `for as long as you stay` / `founder pricing` in any tracked non-doc file | **no rendered copy** — only `content/tracks.js` comments and the `PRICING.t1.introductory` flag itself |
| nodes carrying `data-sr-intro` on `index.html` | **16** |
| of those, any with accompanying label text | **0** |
| CSS targeting `[data-sr-intro]` or `[data-sr-standard]` | **none** |
| label text anywhere in the rendered DOM | **none** |

The sixteen flagged nodes render bare: `€9/mo`, `Today, just €9/mo`, `Start — €9/mo`,
`Unlock — €9/mo`, `Get Started — €9/mo`. The hook Run D installed is set by the hydrator at
[index.html:10528](index.html:10528) and **read by nothing** — exactly as SR-126 recorded it.

**So this is not a rewording. It is authoring the label for the first time**, and it is larger
than the phase describes — stopped and reported rather than edited.

### What it would actually touch

**Two rendering paths, not one.**

1. **`index.html` — 16 nodes**, all `data-sr-price="t1"` spans hydrated at load. A label can
   attach off the existing `data-sr-intro` hook with no new data.
2. **`personal-transformation.html` — 2 surfaces** that never touch the hydrator: the price
   numeral and the "Get Started" pill, both built by `rPrice()` in
   [js/saferise-track.js:300–306](js/saferise-track.js:300), plus the sticky bar at :406.
   These read `t.price.amount` / `t.price.words` directly, so the hook does not reach them and
   a second mechanism is needed.

The footer `<template>` is **not** involved — it carries no price.

### Decisions I am not making

- Whether all 16 index nodes get the label, or only the primary CTAs. Sixteen repetitions of a
  20-word line would dominate the page.
- Placement: inline after the price, or a separate line beneath.
- Whether the track-page path gets it via `priceNote` (which already carries the
  cumulative-access sentence) or a new element.

*Result: does not reproduce as briefed — no existing label. Held for a decision.*

---

## Phase 7 — SR-126, the introductory label (and a worse defect found on the way)

### The premise check found no label — and a live contradiction instead

There was **no introductory label anywhere**: zero rendered surfaces, 16 `data-sr-intro`
nodes all bare, no CSS targeting the hook. The hook Run D installed was set and read by
nothing.

Checking where the label should go surfaced something worse. `#pt-start`, the primary
conversion panel, rendered:

> **The full track. Nineteen euros a month.** · **€9** / month · Get Started — **€9**/mo

The heading was a hardcoded literal at [index.html:6008](index.html:6008) carrying the
**standard** wording while every figure around it hydrated to the **charged** price. One
panel, two prices, in words against digits.

`personal-transformation.html` was never affected — it renders `t.price.words` and read
*"Nine euros a month."* correctly. This was the last hardcoded price string on `index.html`;
a sweep for `euros a month` across every tracked file now returns only `content/tracks.js`
and a comment.

### Changed

1. **[index.html:6008](index.html:6008)** — wrapped as
   `<span data-sr-price="t1" data-sr-price-form="words">`. Existing mechanism, no new data,
   no new hook.
2. **Two labels only**, at the points of commitment: the plans-strip Personal panel
   ([:2702](index.html:2702), matching its own `11.5px / var(--text3)` supporting line) and
   `#pt-start` ([:6013](index.html:6013), reusing `.pt-note`). The other 14 `€9` nodes stay
   bare.
3. **`TRACKS[1].priceNote`** — introductory line first, then cancel, then prerequisite, with
   a comment recording why the order matters.

### Verified by hydration, not by grep

The `Start — /mo` failure mode was the specific risk: a wired span that never hydrates
renders empty, which here would have left the heading reading *"The full track."* with
nothing after it.

| assertion | result |
|---|---|
| words span found | yes |
| **words span non-empty** | **yes** — `"Nine euros a month."` |
| matches `PRICING.t1.words` exactly | **yes** |
| empty price spans anywhere on the page | **0 of 27** |
| label instances | **exactly 2**, in `.sr-panel` plans-strip and `#pt-start` |

**Sentinel:** setting `PRICING.t1.words` to `SENTINEL WORDS.` and re-hydrating moved the
heading to that value; restoring returned `"Nine euros a month."` exactly. The span derives
rather than holding a lucky literal.

### The four surfaces now agree

| surface | renders |
|---|---|
| heading | The full track. **Nine euros a month.** |
| numeral | **€9** / month |
| CTA | Get Started — **€9**/mo |
| note | *Introductory rate — yours for as long as you stay subscribed* · Cancel anytime… · Personal **€9**/month · Relationship €29/month… |

### Track page, and no leakage

`personal-transformation.html` price box: heading *"The full track. Nine euros a month."*,
numeral **€9 / month**, CTA **€9/month**, and a three-line note of **208 characters** with the
introductory line first.

**Tracks 02 and 03 untouched and correctly bare** — Track 02 reads *"Twenty-nine euros a
month."* / **€29** with its own two-line note and **no introductory label**; `Introductory
rate` appears exactly once in `content/tracks.js` and in neither track page's source.

JS parse first: 11 inline blocks on `index.html`, all pass, sentinel `caught SyntaxError`.
Div 2812/2812, span 1378/1378. Console clean.

*Result: pass. One label, two placements, and a live price contradiction closed with it.*

---

## Phase 8 — SR-128, cumulative inclusion. **Reproduces.**

### Reproduced first

The table renders four header cells — blank, **Personal**, **Couples**, **Career** — and six
body rows, with **no statement anywhere in the table that access is cumulative**.

The two things that might have satisfied it do not reach the table:

- `PRICING[t].includes` is data, read by nothing on this surface.
- `TRACKS[1].priceNote` states the rule, but renders on `personal-transformation.html`, not
  inside `#prog-compare`.

Inclusion language inside the compare overlay is limited to **one plans card** —
Relationship's *"Cancel anytime · includes Personal Transformation"*. **Professional's card
says nothing about inclusion**, and the table says nothing at all. A visitor reading the
table alone sees three prices and three products.

### Changed — one line, nothing else

Inserted directly beneath the *"Detailed Comparison"* kicker, above the table wrapper:

> Each track includes the ones before it.

Anchored by line, asserted against both neighbours. Muted `12px` DM Sans in `var(--text3)`,
matching the page's supporting-line idiom.

### Verified

**Run D's three-column shape untouched:** 4 header cells, 6 body rows, 4 cells in every row,
headers unchanged. One instance of the line, positioned before the table
(`compareDocumentPosition` confirmed). No new columns, no restructuring.

Rendered at a **real 1440×1000 viewport**: line 12px, single line, no wrap, 12px below the
kicker and 18px above the table, table not overflowing. JS parse first — 11 blocks, sentinel
`caught SyntaxError`. Div 2812/2812, `<p>` 1389/1389, `<table>` 2/2. Console clean.

### ⚠ A viewport collapse, caught and recovered

The first measurement pass reported `window.innerWidth: 0, innerHeight: 0` — the same
collapse that invalidated a full set of Run D measurements. **No geometry claim was made from
that pass**; the structural assertions used DOM position and element counts, which a
zero-width viewport does not affect.

**An explicit `resize_window` to 1440×1000 recovered it**, and every geometry figure above was
taken after that and with `viewport_usable: true` asserted alongside. That is the procedure
for Phase 10.

### Found in passing — reported, not fixed

**`#prog-compare` still says "Four programs".** Its lede reads *"One methodology. **Four
programs.** Find the right starting point for where you are."* The table beneath shows three.

This survived Run D's entire 19-surface Elevation removal because it **names a number, not the
track** — no sweep for `Elevation` could find it. Exactly the same class as
`index.html:6008`'s *"Nineteen euros a month"*, which survived SR-124's pricing sweep for the
same reason: **the fact was spelled out in words.**

Two independent confirmations in one run that spelled-out forms evade every sweep aimed at
symbols or identifiers.

*Result: pass. One line added; three-column shape intact.*

---

## SR-134 — spelled-out counts that survived the Elevation removal

Issued from the reservation. Swept the whole tree before editing, as instructed.

### The sweep

245 raw hits for `<number-word> <noun>` across all tracked non-doc files — too broad to act on,
so narrowed to the two classes that can actually be wrong:

**Class B · prices in words — clean.** Spelled prices exist only in `content/tracks.js`
(`PRICING.words`, the canonical record), the now-derived span at `index.html:6009`, and one
comment. Nothing spells a price independently.

**Class A · counts of tracks / programmes / series / tiers / plans — two rendered defects.**

| file · line | text | reality below it |
|---|---|---|
| [index.html:2690](index.html:2690) | *"**Four plans.** Each one nested inside the next."* | grid `1.7fr 1fr 1fr` with **3** panels |
| [index.html:7359](index.html:7359) | *"One methodology. **Four programs.**"* | grid `repeat(3,1fr)` with **3** cards |
| [index.html:2693](index.html:2693) | `<!-- Four plan tiers -->` | stale comment |
| [index.html:7362](index.html:7362) | `<!-- Four program cards -->` | stale comment |

All four corrected to **Three**. Anchored by line, each asserted against the grid beneath it
so the claim was checked against the thing it describes, not just replaced.

### Reported, not changed — these say "four" and are correct

- `content/tracks.js:3` *"all four tracks"* — `TRACKS` genuinely has four keys; Elevation is
  `visible:false`, retained by decision.
- `css/saferise-dashboard.css:20`, `dashboard.html:37` — *"four track accents"*; four accent
  tokens genuinely exist.
- `CLAUDE.md` / `AGENTS.md` *"ALL FOUR series"* — governance documents describing the design,
  not a rendered surface. Not mine to edit.
- *"Three tiers"* (Proximity Guide), *"all ten Track 01 protocol pages"* — accurate.

### Verified

At a **real 1440×1000 viewport** with `viewport_usable: true` asserted:

| surface | claim | rendered |
|---|---|---|
| plans strip | *"Three plans. Each one nested inside the next."* | **3** panels |
| compare lede | *"One methodology. Three programs."* | **3** cards — Personal Transformation, Relationship Healing, Professional Performance |

`four plans/programs/programmes/tracks/series/tiers` in the rendered DOM: **NONE**. Table
headers unchanged. JS parse first — 11 blocks, sentinel throws. Div 2812/2812, `<p>`
1389/1389, `<h2>` 37/37. Console clean on a fresh tab.

**Two measurement artifacts caught and discarded:** a first pass reported `cards_rendered: 5`
because my selector grabbed the first `repeat(3,1fr)` grid on the page rather than the one in
the overlay — re-scoped by document position, it reads 3. And the reused tab again showed
eight stale `ERR_CONNECTION_REFUSED` across a server restart; a fresh tab was clean.

### Worth recording

`index.html:2690`'s second clause — *"Each one nested inside the next"* — **already states
cumulative inclusion**, on the plans strip. So the site said it in one place and not in the
comparison table, which is what SR-128 closed.

*Result: pass. Two rendered claims and two comments corrected; the rest verified accurate.*

---

## Phase 2A — the price audit that changed the run

Reported in full to Andre; two findings changed later work.

**A · There are two locked-resource paywalls in `index.html`, and SR-124 only converted one.**
`openResourceModal()` at :4664–4666 reads the record. **`openReader()` at :5004–5006 never
did** — it hardcoded a `€19 / €29 / €49` ladder that no longer exists anywhere else.

**B · It used lowercase `€`.** Every sweep in Runs D and E targeted `€` or uppercase
`€`. Case is a fourth representation.

Also established: `premium1` (€129) and `premium3` (€299) hold **correct** values with **zero
consumers**, while `index.html` renders those same figures as literals. Not retired tiers —
live products sold from copies. Copy, FAQ, `priceNote` and `meta` fields are **clean**: no
service price appears in prose anywhere except one sentence at `index.html:7513`.

---

## Phase 2B · Commit 1 — SR-135, the second paywall

`openReader()`'s paywall converted to `PRICING.tN.amount + '/mo'`, mirroring
`openResourceModal()` exactly — same expression, same mechanism, no second pattern invented.
Anchored by line, with all three target lines asserted verbatim **including their lowercase
escapes**, and the already-converted paywall asserted as the template.

**Verified by opening a locked resource in the Reader, not by sweeping body text.**

The blind spot, reproduced first: before any resource is opened, `.reader-page-locked` nodes
in the DOM = **0**, and `document.body.innerText` contains no `€49`. **That is exactly the
state SR-124 measured**, and why it declared "no €49 anywhere" while €49 sat in the source.

Then instantiated, per track:

| resource | paywall mounted | button | expected |
|---|---|---|---|
| `p1-guide` | yes | **Unlock — €9/mo** | €9/mo ✓ |
| `t2-p1-guide` | yes | **Unlock — €29/mo** | €29/mo ✓ |
| `t3-p1-guide` | yes | **Unlock — €39/mo** | €39/mo ✓ |

All three non-empty, all three matching the record, **no €49 in any paywall**.

**Sentinel:** forcing `PRICING.t3.amount` to `€777` moved the button to *"Unlock — €777/mo"*;
restoring returned *"Unlock — €39/mo"* exactly.

**Euro escapes now exist in exactly one place:** `content/tracks.js`, 9 occurrences, all
inside `PRICING`. Zero in any other tracked file, either case.

JS parse first — 11 blocks, sentinel `caught SyntaxError`. Div 2812/2812. Console clean.

*Result: pass. A wrong price that survived a full release cycle, closed.*

---

## Phase 2B · Commit 2 — SR-136, correct the record

### The €49 boundary, proved

**Before the edit:** a sweep for `€49` / `€49` / `€49` / *"forty-nine euros"*
across every tracked non-doc file returned **one hit — a historical comment** at
`dashboard.html:1005` recording that the old TRACKPRICE said €29 and €49. **Zero live
values.** Commit 1 fully cleared the stale track €49 before the live couples €49 entered.

**After the edit:** two hits — `content/tracks.js:52` (`workshopRelationship`, the new live
value) and the same historical comment. Exactly as intended.

That ordering is deliberate and must survive any reorder or cherry-pick: **the stale €49
leaves in Commit 1, the live €49 arrives in Commit 2.** Between them a `€49` sweep is clean,
which is the only window where the two can be told apart mechanically.

### Resolved `PRICING`

| key | before | after |
|---|---|---|
| `t1` | €9 / month | unchanged |
| `t2` | €29 / month | unchanged |
| `t3` | €39 / month | unchanged |
| `workshopPersonal` | **€59** per person | **€29** per person |
| `workshopRelationship` | **€139** per couple | **€49** per couple |
| `premium` | **€275 / session** | **removed** |
| `premium1` | €129 per hour | unchanged |
| `premium3` | €299 for three hours | unchanged |

8 keys → **7**. Comments record why `premium` must not be re-added, and SR-057 is marked
answered rather than left open.

**A stranded comment fragment, caught before commit.** Replacing the first line of the
two-line SR-057 comment left its second line orphaned mid-sentence — *"the repo renders
either one. Left in place pending that decision. \*/"*. Repaired by replacing the whole
block. Same class as the banner my Phase 3 hoist stranded.

### The intermediate state — it does not throw, and that is the problem

`dashboard.html`'s hydrator guards with `if (rec)`, so a missing key **silently skips the
node**. The 4 `premium` spans render **empty strings** — not `undefined`, no exception,
console clean.

What a member sees on the dashboard right now:

| surface | renders |
|---|---|
| offer price | `/ session` |
| booking note | `per session. Reschedule free up to 72 hours before…` |
| button | `Book this time ·` |
| slot | `03 Sep · Premium 1:1 with Andre · Three times available · 90 min ·` |

**This is the `Start — /mo` failure mode exactly** — stranded units and dangling separators
where a price should be.

**Answering the question directly: Commit 3 can stay a separate commit.** Nothing throws,
the page functions, and the guard contains the damage. But the intermediate state ships
visibly broken UI, so **this branch must not merge between Commit 2 and Commit 3** — the same
constraint Run D carried between 4a and 4b.

The other keys prove the hydrator still works: `workshopPersonal` renders **€29** across 6
nodes, `workshopRelationship` **€49** across 2 — both picking up this commit's new values.

### Escape invariant

**9 euro escapes, all inside `PRICING` in `content/tracks.js`, zero anywhere else, either
case.** Now checkable in one command and part of every close-out sweep.

JS parse first — dashboard 1 block, passes. `tracks.js` braces 91/91, brackets 284/284,
parens 55/55. Console clean.

*Result: pass, with a reported broken intermediate state.*

---

## Phase 2B · Commit 3 — SR-137, `premium` and `premium1` were one offer under two names

### Reported before editing, and the framing changed

The brief called this "removal of a retired offer, not re-pricing". The evidence overturned
it:

| | `dashboard.html` + `protocol.html` | `index.html` `prog-premium1on1` |
|---|---|---|
| name | **Premium 1:1** | **Premium 1:1** |
| price | €275 / session | €129 single · €299 series |
| duration | 90 min | 60 min |

Same product name, two prices, two durations. These blocks were not selling a retired
product — they were a **stale second representation of the live one**. Andre confirmed and
overturned the framing: repoint, do not remove.

Removal would have deleted a live product from the member dashboard and stranded
`protocol.html:852`'s comment describing "**two** offers".

### Changed

All four `dashboard.html` nodes repointed `premium` → `premium1` — the offer card price
(:325), the modal footer sentence (:624) and button (:625), and the calendar slot (:643).
`protocol.html:858`'s literal corrected €275 → €129 (that page has no hydrator; derivation is
logged as a follow-up).

**`protocol.html`'s self-contradiction resolved:** :860 said *"A private **hour** with
Andre"* while :862 said *"**Ninety minutes**, online"*. The hour is correct; :862 now reads
*"Sixty minutes, online"*. That also completes the `protocol.html:862` item listed under
Commit 4 — it does not need doing twice.

**A comment of my own corrected.** The SR-136 note I wrote one commit earlier said *"the key
was removed rather than re-priced"* — which this commit proves wrong. Rewritten to record
what actually happened: a duplicate key removed and every surface repointed, so the 1:1 now
has one price in one place.

### Verified by reading rendered text, not by absence of errors

The `if (rec)` guard means a missing key renders empty with a clean console, so those are
different tests.

| surface | renders |
|---|---|
| offer card | **Premium 1:1 · €129 / session** |
| modal footer | **€129 per session.** Reschedule free up to 72 hours before… |
| modal button | **Book this time · €129** |
| calendar slot | 03 Sep · Premium 1:1 with Andre · Three times available · 90 min · **€129** |
| `protocol.html` | **€129 / session**, *"A private hour"*, *"Sixty minutes, online"* |

**0 empty price spans of 12** on the dashboard. `premium` nodes remaining: **0**.
`'premium' in PRICING`: **false**. `protocol.html` still renders **2** offers, no fragment.

Repo-wide, the only `PRICING.premium` reference left is inside the do-not-re-add comment —
the same comment-matches-its-own-grep pattern seen in Run D.

**Still wrong, and Commit 4's job:** the dashboard says *"Ninety minutes"* and *"90 min"*, and
`protocol.html`'s workshop block says *"Two hours"*.

Div balance 175/175 and 126/126. `tracks.js` braces 91/91. Console clean.

*Result: pass. One product, one price, one place.*

---

## Phase 2B · Commit 4 — SR-139, durations

### Changed — 21 strings, six more than the brief listed

**`dashboard.html` (17)** · 1:1 in the words idiom: `:329`, `:602` "Ninety" → "Sixty".
1:1 in the numeral idiom: `:384, 617, 618, 619, 643` "90 min" → "60 min". Workshop time
ranges: `:366, 375, 393, 581, 582, 583, 641, 642, 645` `18:00–20:00` → `18:00–19:00`.
Plus **`:346`** — *"Two hours, online or in person"* on the Workshops offer card, **not in the
brief**, identical in shape to the approved `protocol.html:879`.

**`protocol.html` (4)** · `:879` → *"One hour, online or in person"*, and **three more not in
the brief** — `:898` and `:914` time ranges, `:906` "90 min". That page carries its own
sessions module mirroring the dashboard's; leaving them would have shipped a page
contradicting itself and the dashboard.

`protocol.html:862` was completed in Commit 3 and **was not re-done**.

Each time range asserted **verbatim in full** before editing, with a single-occurrence check
per line — never a bare `20:00`.

### Verified

`dashboard.html`: `18:00–19:00` ×9, `18:00–20:00` **0**, `60 min` ×5, `90 min` **0**,
"Sixty minutes" ×2, "Ninety minutes" **0**. Offer cards read *"Premium 1:1 · €129 / session ·
Sixty minutes, online"* and *"Workshops from €29 · One hour, online or in person"*. Modal h3:
*"Sixty minutes, private, with Andre"*.

`protocol.html`: all four wrong forms absent; renders *"A private hour"*, *"Sixty minutes,
online"*, *"One hour, online or in person"*, `18:00–19:00`, *"Three times available · 60 min"*.

Console clean on both. JS parse first, div 175/175 and 126/126.

**A measurement artifact caught:** a first count via `body.textContent.match(/60 min\b/g)`
returned **2** where a tree-walk found **5**. The regex undercounted across concatenated text
nodes. The tree walk is authoritative; the `match()` figure was discarded.

### ⚠ Held — cannot be fixed without inventing a commercial fact

**`dashboard.html:567` and its agenda at `:572–575`.** The line reads *"**Two hours**,
facilitated live"* and the agenda beneath it is:

| segment | minutes |
|---|---|
| Arrival and Clearing | 15 |
| The four steps, run together | 40 |
| Facilitated discussion | 45 |
| Close and integration | 20 |
| **total** | **120** |

Changing :567 to "One hour" alone would leave a run-sheet summing to twice the stated length.
Reworking it means **inventing four new segment lengths**, which is content authoring.
Reported, untouched. This is the only remaining "Two hours" in the tree.

### ⚠ Reported, deliberately not touched — index.html workshop durations

The brief said *"index.html is already correct — do not touch it."* **That is true of the
1:1** (`:7691` "Length: 60 minutes", `:6733`/`:7340` "60 minutes"). **It is not true of
workshops.** `prog-workshops` says:

| line | text |
|---|---|
| 7741 | *"Live video, small group, roughly **90 minutes**."* |
| 7781 | *"Roughly **90 minutes**, one evening."* |
| 7835 | *"◆ Length: approximately **90 minutes**, live video"* |

Three public strings stating a workshop length that the confirmed fact contradicts. **Not
edited**, because the instruction not to touch `index.html` was explicit and the rules say to
report a conflict rather than resolve it silently.

`:7888` and `:7975` also say 60–90 minutes but describe **retreat segments** within a half
day — a different product, and correct as they stand.

`content/tracks.js:55` retains "90 min" inside the SR-137 comment, which is historical record.

*Result: pass, with one block held and three index.html strings reported.*

---

## Phase 2B · Commit 5 — SR-143, index.html workshop durations

Andre scoped his "index.html is already correct" to the 1:1 and confirmed the three workshop
strings were wrong. Corrected, each hedge and idiom preserved:

| line | before | after |
|---|---|---|
| 7741 | *"small group, **roughly 90 minutes**."* | *"small group, **roughly 60 minutes**."* |
| 7781 | *"**Roughly 90 minutes**, one evening"* | *"**Roughly 60 minutes**, one evening"* |
| 7835 | *"Length: **approximately 90 minutes**, live video"* | *"Length: **approximately 60 minutes**, live video"* |

`:7888` and `:7975` **untouched and asserted intact** — retreat segments within a half day, a
different product.

### Verified by tree walk, per overlay

**`prog-workshops`** — *"roughly 60 minutes"*, *"Roughly 60 minutes, one evening"*,
*"Length: approximately 60 minutes"*. **`prog-premium1on1`** — *"One hour, live video"*,
*"What Makes One Hour Enough"*, *"Length: 60 minutes"*: already correct, untouched.
**`prog-retreats`** — *"60–90 minute segments"*, *"half day (approx. 3–4 hours)"*: intact.

`90 minutes` / `Ninety minutes` anywhere in the rendered DOM: **false**. Console clean,
11 blocks parse, div 2812/2812.

### Remaining duration sweep on index.html

Only `:7888` and `:7975` still mention 90 minutes, both retreat segments and both correct.
Nothing else on the page implies a workshop or 1:1 length other than one hour.

---

## SR-144 — the workshop agenda, blocked on Andre

`dashboard.html:567` reads *"**Two hours**, facilitated live"* and the run-sheet at
`:572–575` is:

| segment | minutes |
|---|---|
| Arrival and Clearing | 15 |
| The four steps, run together | 40 |
| Facilitated discussion | 45 |
| Close and integration | 20 |
| **total** | **120** |

Both left exactly as they are, by decision: **a heading that disagrees with its own run-sheet
is better than a run-sheet with invented numbers.** The four segment lengths are a
facilitation decision. Recorded here so they can be rebalanced to 60 in one pass.

This is the only remaining "Two hours" in the tree.

---

## Phase 2B · Commits 6–8

### Commit 6 — SR-138, the 1:1 prices derive

`index.html:7674, :7676, :7680, :7683` converted to `data-sr-price` spans. Verified by
hydration: `premium1` **€129** ×2, `premium3` **€299** ×2, all four non-empty and matching the
record, **0 empty spans of 31**. CTAs read *"Book Single Session — €129"* and *"Book
3-Session Series — €299"* rather than trailing off after the dash.

**Sentinel:** forcing both keys to €111/€333 moved all four nodes; restoring returned them
exactly.

**Reported, not converted:** `:7681` renders *"≈€99.67/session"* — arithmetic over
`premium3`, not a record value. Deriving it needs a computed-price mechanism that does not
exist; adding one is larger than this commit. **Closes SR-057.**

### Commit 7 — SR-140, `premium3.per`

`'for three hours'` → `'for three sessions'`. One string aligned to seven that already agreed:
*"3-Session Series"*, *"≈€99.67/session"*, *"tracked across multiple sessions"*, *"Space
sessions out as you need"*, *"the 3-session series lets you space sessions out"*. With the 1:1
at one hour, a single three-hour block cannot coexist with sessions spaced as you need.

**No rendered sentence changed, and that is the honest result.** `premium3.per` has **zero
consumers**: no `data-sr-price-form="per"` node exists anywhere, and every `.per` reader in
the tree operates on **track** prices. The string was **inert** — corrected because the record
is the source of truth and a wrong value there is a defect by construction. Series copy is
byte-identical before and after; *"three hours"* appears nowhere in the rendered DOM.

### Commit 8 — SR-141, workshop prices

| site | before | after |
|---|---|---|
| `index.html:7513` sentence | from €59/person · from €139/couple | **derives** |
| `index.html:7809, :7812` | €59 | **derives** `workshopPersonal` |
| `index.html:7816, :7819` | €139 | **derives** `workshopRelationship` |
| `protocol.html:875, :880` | €59 / €139 | **literals corrected** to €29 / €49 |

**The sentence reads correctly at the new figures:** *"Live group sessions for teams or
communities — a single offsite session or an ongoing series, run through the same four-step
methodology. Personal Transformation from **€29**/person · Relationship from **€49**/couple."*
Both figures now derive; the `/person` and `/couple` units sit outside the spans and are
unaffected.

**Where the mechanism does not exist, reported rather than added:** `protocol.html` loads
**no external scripts at all** and has no hydrator, so its two figures were corrected as
literals. Wiring it is SR-127's follow-up and was explicitly out of scope.

**Verified across all three pages.** `index.html`: `workshopPersonal` **€29** ×3,
`workshopRelationship` **€49** ×3, 0 empty of 37, cards read *"Book — €29"* /
*"Book — €49/couple"*. `dashboard.html`: `premium1` €129 ×4, `workshopPersonal` €29 ×6,
`workshopRelationship` €49 ×2, 0 empty of 12. `protocol.html`: *"from €29"*, *"Personal €29 ·
Relationship €49 per couple"*.

**€59, €139 and €275 appear nowhere in any tracked non-doc file, in any form.**

Console clean on fresh tabs; one more stale `ERR_CONNECTION_REFUSED` set discarded from a
reused tab across a restart. Div 2812/2812 and 126/126, spans 1388/1388 and 96/96.

---

## Phase 9 — SR-122. **Does not reproduce.**

The clause *"team programmes priced separately"* ([index.html:7385](index.html:7385)) was to
be cut as an undated promise naming a product that does not exist.

**A team programme exists and is priced.** `prog-retreats` sells the Corporate Retreat —
intake, half-day agenda, written debrief — at **€1,800 flat** for groups up to 50 and
**€3,500 flat** for over 50. The clause is **accurate**. Cutting it would have removed a true
statement about a sellable product. **Nothing was cut.**

The defect on that same line is the **other** clause — *"Pricing to be announced"* — stale
since Track 03 is €39/mo. Logged as [[SR-151]]. A third occurrence at
[index.html:6744](index.html:6744) says team programmes are billed *"separately, **above**"*
while nothing above it in that overlay describes them — [[SR-150]].

Two of the three clauses this entry originally covered were resolved by SR-124 landing.

---

## Phase 10 — SR-110, measurement only. Nothing changed.

Measured on `personal-transformation.html`, fresh tab, `resize_window` called explicitly at
each width, `viewport_usable` asserted **true** alongside every figure.

| viewport | `viewport_usable` | carousel | card | fully visible | first clipped | clipped by |
|---|---|---|---|---|---|---|
| 1440 × 1000 | true | 1178 | 238 | 4 | **5th** | **68px** |
| 1280 × 1000 | true | 1178 | 238 | 4 | **5th** | **68px** |
| 1024 × 900 | true | 958 | 238 | 3 | **4th** | **36px** |
| 768 × 900 | true | 702 | 238 | 2 | **3rd** | **40px** |
| 390 × 844 | true | 300 | 238 | 1 | **2nd** | **190px** |

**The mockup claim reproduces exactly at 1440** — "1 / 10" with the fifth card clipped.

1440 and 1280 are identical because the container caps at **1178px**. Card width is a constant
**238px** at every viewport — the carousel does not reflow, it scrolls (`scrollWidth` 2562).

**The counter reads "1 / 10" at every width** — it reports the active card, never how many are
visible. So at 1440 a visitor sees four and a fraction while being told "1 / 10".

**No page-level horizontal overflow at any width**, so the clipping is inside the scroller,
which is the intended pattern.

**Not a defect I can call.** A partially-visible card is a common affordance signalling "more
this way". At 390 it is different in kind: the second card shows **48px of 238**, which reads
as a layout error rather than a hint. Design decision — logged as [[SR-152]], nothing changed.

---

## Phase 11 — close-out

### Register

**106 entries**, zero duplicates, zero missing a `*Status:*` line, **Rules 1–20 present.**

One duplicate caught and merged: Run D had already opened **SR-122**, and this run's
non-reproduction finding was folded into that entry rather than shipping two headings under
one ID.

**Rules 15–20 added**, each naming the item it was earned from: 15 (SR-129, load-bearing
scaffolding), 16 (five inversions in one run), 17 (spelled-out facts evade sweeps), 18
(conditional UI — paid twice, SR-135 and SR-149), 19 (replace whole blocks — stranded twice),
20 (test against a known-good control).

**Reservation extended: SR-154 → SR-175, ceiling SR-175.** The previous block is exhausted
through SR-153; SR-150 was passed because the run issued beyond its ceiling, and the
reservation was extended rather than renumbered.

**Standing invariants recorded, each checkable in one command:** euro escapes exist only
inside `PRICING`; no price is spelled out except in `PRICING.words`; €59, €139 and €275 appear
nowhere.

**Also recorded:** the `if (rec)` silent-skip guard, the €49 ordering constraint, and that
**SR-136 and SR-137 must not be split by a merge**.

### Verification sweep

JS parse **first** across all eight pages — index 11, dashboard 1, protocol 2, resource 2,
three track pages 1 each, method 2 — **all pass**, sentinel `caught SyntaxError`.

Div balance 2812/2812, 175/175, 126/126, 46/46. CSS braces 663/299/1084. `tracks.js`
91/91, 284/284, 54/54.

**Invariant: 11 euro escapes, all inside `PRICING`, zero elsewhere in either case.**

Retired figures — `€59`, `€139`, `€275`, `18:00–20:00`, `Ninety minutes` — appear **nowhere**.
Three `90 min` hits remain and all three are correct: one historical comment in the SR-137
note, and two retreat segments describing a different product.

Dashboard renders `premium1` €129 ×4, `workshopPersonal` €29 ×6, `workshopRelationship` €49
×2 — **0 empty of 12**. Console clean on fresh tabs.
