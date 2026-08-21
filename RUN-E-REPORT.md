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
| `workshopPersonal` | €59 | per person | — | |
| `workshopRelationship` | €139 | per couple | — | |
| `premium` | €275 | / session | — | |
| `premium1` | €129 | per hour | — | **zero consumers** |
| `premium3` | €299 | for three hours | — | **zero consumers** |

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
