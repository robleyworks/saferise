# RECORDS INDEX — what is in the repo, what is not

23 September 2026. Written when the session's records were copied into `claude/`.

---

## In the repo now

| file | what it settles |
|---|---|
| `claude/VIDEO-RESOLUTION-RULING.md` | the x1.31 resampling rule, measured; why the Runway upscaler is not used |
| `claude/VIDEO-FRAME-MANIFEST.md` | every conforming frame, what qualifies, what was excluded and why |
| `claude/VIDEO-SHOT-BRIEF-BY-BEAT.md` | both films, every shot, what the picture must mean where it sits |
| `claude/VIDEO-STOCK-SOURCING-ROUND-1.md` | Adobe Stock sourcing, the casting rule, what passed and what was rejected |
| `claude/VIDEO-DIVERSITY-CALL-SHEET.md` | casting options per people slot, African American and European |
| `claude/ORG-PAGE-INSTRUCTION-HANDOVER.md` | all 19 organisation-page instructions reconciled against the files |
| `claude/COPY-ASSESSMENT-ORGANISATIONS.md` | (pre-existing) |
| `claude/PROTOCOL-NAME-CONFLICTS.md` | (pre-existing) |
| `claude/VIDEO-SCRIPTS-THREE-SURFACES-V2.md` | (pre-existing) |

---

## Two gaps worth knowing about

### 1 · The pass briefs have no backup in git

`pass/` is **line 5 of `.gitignore`**. Every execution brief written for Claude
Code lives only there and in the claude.ai Project:

- `pass/PASS-H-LANDING-IMAGE-REPLACEMENT.md`
- `pass/PASS-I-ORG-EXPLORER-REVEAL-AND-MERGE.md` (SR-434)
- `pass/PASS-J-ORG-BASE-AND-FOUNDATION-8.md` (SR-436)
- and roughly ninety earlier PASS files

The commits they produced are in history, so the *changes* are recoverable. The
*instructions* are not. Ignoring `pass/` looks deliberate — it keeps working
files out of the repo — so this is flagged rather than changed. If the briefs
should be retained, the cleanest move is a tracked `docs/passes/` folder holding
the ones that shipped, leaving `pass/` as the scratch area it currently is.

### 2 · The staged imagery cannot deploy from where it sits

Same cause. Everything prepared for the organisation page is under `pass/`:

| folder | files |
|---|---|
| `pass/_f8-covers/as-supplied` + `/graded` | 12 |
| `pass/_org-gap` | 4 |
| `pass/_org-twospace` | 4 |
| `pass/_film-1080` (video frames) | 80 |

Git cannot see any of it. See `claude/ORG-PAGE-INSTRUCTION-HANDOVER.md` §3 for
the full account. The fix is PASS-K, blocked on two decisions recorded in §5 of
that file.

---

## Still in the claude.ai Project only

The Project holds ~179 documents; the repo holds these nine. The video set that
would complete the record here:

- `claude/VIDEO-IMAGE-BRIEF-AND-POOL.md`
- `claude/VIDEO-HERO-HANDOVER-ASSESSMENT.md`
- `claude/VIDEO-B2B-V10-AND-RUNTIME.md` — carries the v10 script and the pace question
- `claude/VIDEO-SCREENPLAY-PROVISIONING.md` — **superseded for B2B**, still lists v9

Everything else in the Project is historical and does not need mirroring unless
it is being worked on.

---

## Live artifacts

Not files, but part of the record:

- Frame manifest — https://claude.ai/artifact/UK8HPDfmHfUavnDfWWDgPk
- Film animatic — https://claude.ai/artifact/J26267BBph1DpDQXMZbZbA
