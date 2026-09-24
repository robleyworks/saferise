# VIDEO — STILL FRAME SPECIFICATION MANIFEST

Companion to `claude/VIDEO-RESOLUTION-RULING.md`. Andre selects; this specifies.
Date: 2026-09-23

**Interactive manifest:** https://claude.ai/artifact/UK8HPDfmHfUavnDfWWDgPk
Thumbnails, full specs, slot mapping, filters. This file is the written record.

---

## 1. The headline

**Seven of fifteen photographic slots have a qualifying frame. All six B2B
slots have none.**

Every B2B photographic slot was to be served by an org band at **2360×640**.
That yields **1137×640** on a 16:9 crop — **×1.69**, well past the ×1.31 limit.
The bands are fine where they are on the site; they are simply the wrong shape
to become film frames. The B2B film has **no qualifying photography in the
repository at all**, and that is the largest single gap in the slate.

| | slots | with a candidate | without |
|---|---|---|---|
| B2C | 9 | 7 | 2 |
| B2B | 6 | **0** | **6** |

---

## 2. Slot status

### Filled

| slot | beat | candidates | strongest |
|---|---|---|---|
| B2C-01 | the opening, 0:00–0:20 | 10 | `galaxy/t1-10-field` — darkest, nothing to read |
| B2C-02 | three in the morning | 6 | `galaxy/t3-08-clear` — native, awake, looking at nothing |
| B2C-07 | the stillest frame | 11 | `galaxy/t1-04-field` — most abstract in the pool |
| B2C-09 | none of that left | 1 | `extracted/cca81f63093e48a8` — see caveat |
| B2C-13 | what changes | 3 | `extracted/55bf27100326c489` — concourse, ×1.08 |
| B2C-R1 | the meeting | 1 | `method/m-outward` — through glass, ×1.20 |
| B2C-R2 | a nervous system decides | 6 | `galaxy/t1-04-clear` — native, animate this still |

### Empty — each needs an answer

| slot | why | was |
|---|---|---|
| B2C-08 | lost to the rule | `coming/band-welcome-corridor` at ×1.35 |
| B2C-12 | never had one | — |
| B2B-01 | lost to the rule | `org/band-plustwo-alt` at ×1.69 |
| B2B-03 | never had one | — |
| B2B-08 | lost to the rule | `org/band-plustwo` at ×1.69 |
| B2B-10 | lost to the rule | `org/band-base` at ×1.69 |
| B2B-R1 | never had one | — |
| B2B-R2 | never had one | — |

**B2C-09 caveat.** Its one candidate stands alone. B2C-08 and B2C-09 were
designed as the same picture cut tighter — that continuity is the whole point
of the pair. With B2C-08 gone the continuity is broken, so the frame is usable
only if B2C-08 is re-sourced to match it.

---

## 3. What was excluded from the pool, and why

Started from 70 conformed frames. The manifest carries **48**.

- **19 removed — the somatic body-map illustrations** (`assets/media-*`) plus
  the Reading Room screenshot. Product graphics, not photography. Worth naming
  because they measured as the *highest* detail energy in the whole set (up to
  1288) and had luminance 185–224 — they would have topped a sort by sharpness
  and are flatly unusable. Measurement alone would have misled the selection;
  they were caught by looking.
- **3 removed — exact duplicates**, confirmed by content hash:
  `home/film-poster` = `extracted/3ae657460600c371`;
  `home/panel-t1` = `extracted/cca81f63093e48a8`;
  `home/panel-t3` = `extracted/55bf27100326c489`.

Of the 48 remaining, **17 are disqualified on content** — off-register idiom (4),
readable interface or laptop (4), posterisation in the sky gradient (5),
meditation stock (1), consulting-room read (1), studio key light (1), wrong
idiom (1).

**31 frames are eligible.**

---

## 4. How to read the specs

Each frame carries four numbers:

- **native size** — the source on disk.
- **factor** — what was applied to reach 1920×1080. `native` means none.
- **detail** — laplacian variance. Below 10 the frame is effectively
  featureless: correct for a hold, wrong for anything that must read. The
  galaxy `-field` set sits at 61–68; the `-subject` posterised set at 0–5.
- **lum** — mean luminance. The grade deepens blacks, so a bright source has
  little to work with. Anything above ~150 has nothing to grade.

---

## 5. Selection is open

Nothing is committed and nothing spends credits. Propose against slot IDs by
path. The eight empty slots need a decision either way — a larger original,
new photography, or generation — and the six B2B ones are the critical path.
