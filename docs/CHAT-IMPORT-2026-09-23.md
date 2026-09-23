# Chat Import — 23 September 2026

Fifteen documents produced in chat sessions between 7 and 19 September that had
never reached this repository. Imported verbatim; none was edited on the way in.

**Read this before trusting any of them.** They were written before SR-376 and
this repo is at SR-428. Where one of them contradicts `docs/fix-register.md`,
`docs/SUNDAY-2026-09-20.md` or anything in `docs/business/`, the repo wins. They
are imported for the reasoning they carry, not as current state.

---

## What came in, and where

### `docs/`

| File | Written | What it holds |
|---|---|---|
| `VOICE-ARCHITECTURE.md` | 17 Sep | **Two AI voices, male and female, member-toggled — explicitly not Andre's voice.** The reasoning is that his voice couples the product to his reputation through the podcast and his public positions. This decision is settled and is the one document here least likely to be superseded |
| `VOICE-PROFILES.md` | 17 Sep | The voice specifications |
| `MEDITATION-PRODUCTION-SPEC.md` | 17 Sep | Session construction spec. **Probably superseded** by `MEDITATION-PRODUCTION-ROADMAP.md` and `LOUDNESS-SPEC.md` — check before using |
| `RECORDING-BRIEF.md` | 17 Sep | Script review and recording prep. **Probably superseded** by `MEDITATION-REVIEW-AND-SIGNOFF.md` |
| `COVER-QUALITY-AUDIT.md` | 17 Sep | Cover-by-cover quality assessment. Predates `SafeRise_Complete_Image_Audit_Report.md` |
| `SITE-READINESS-ASSESSMENT.md` | 18 Sep | Design drift, security, telemetry, analytics, SEO, tooling recommendations. Much of it has since been executed in SR-373 through SR-376 |
| `LEGAL-INTERIM-PACK.md` | 18 Sep | Interim legal position |

### `docs/business/`

| File | Written | What it holds |
|---|---|---|
| `TRACK-PORTFOLIO-FORECAST.md` | 9 Sep | 14 candidate tracks scored. Department tracks beat industry tracks because they reach departmental budgets without going through HR. €103,090 total build against €824,000 mature annual revenue |
| `TRACK-PROGRAMME-MODEL.md` | 9 Sep | Programme structure |
| `NEXT-THREE-TRACKS.md` | 9 Sep | Sequencing |
| `ELEVATION-PROSPECTUS-v3.md` | 9 Sep | Track scoping. v1 and v2 deliberately not imported |
| `EXECUTIVE-PRESENCE-PROSPECTUS-v3.md` | 9 Sep | Track scoping. v1 and v2 deliberately not imported |
| `SEX-INTIMACY-PROSPECTUS.md` | 9 Sep | Track scoping |
| `SAFERISE-COLLABORATORS-AND-GENDERED-TRACKS.md` | 9 Sep | Partner structure |

These overlap `docs/business/MASTER-TRACK-REGISTER.md` and
`INDUSTRY-PROTOCOL-ROADMAP.md`, both of which are newer. **The register is
authoritative on what a track is; these are authoritative on why it was
ranked where it was.**

### `pass/`

| File | State |
|---|---|
| `mock-card-sleep-recovery.html` | Approved design for the ninth coming-soon card, resting and opened states. Pairs with `pass/PASS-sleep-track-coming-soon.md`, which was already here |

---

## The one claim in these worth re-testing

`TRACK-PORTFOLIO-FORECAST.md` puts €103,090 of build against €824,000 of mature
annual revenue, and its own closing section says the whole model rests on an
untested assumption: **that a vertical track closes at €14,000–18,000.** No
vertical track exists and none has been sold. The document's own recommendation
is to sell one before committing the wave. That has not changed.

---

## Deliberately not imported

| What | Why |
|---|---|
| `IMAGE-MANIFEST.md`, `IMAGE-INVENTORY.md` (19 Sep) | The repo is further along — `IMAGE-PRODUCTION-MANIFEST.md`, `IMAGE-PROVISIONING-GAPS.md`, `IMAGE-PROVISIONING-2026-09-19.csv` and `SafeRise_Complete_Image_Audit_Report.md` all supersede them. Importing would have created a second image inventory, which is this project's documented recurring failure mode |
| `GUIDED-MEDITATION-SCRIPTS.md` (155KB) | Duplicates `SafeRise_Scripts_ReadingCopy.md` and `SafeRise_AllTracks_RecordingScripts_v9.md` |
| `mock-method-v20.html` (217KB) | The method page was built from it in SR-365 |
| ~20 intermediate mockups, 18 tracker renders, ~50 executed pass briefs | Superseded or already run and recorded in the fix register |

Everything listed here also exists in the claude.ai project knowledge base under
`claude/`, indexed by `claude/KNOWLEDGE-BASE-INDEX-2026-09-19.md`.
