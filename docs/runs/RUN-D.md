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
