# Desktop image libraries vs the provisioning manifest — complete, 19 September

Supersedes the partial review of the same date. Every file in
`~/Desktop/Unused Images` (137) and `~/Desktop/used images` (143, including
five nested `IMAGES/` sub-folders) has now been measured, and cross-referenced
against the 77 rows of `docs/IMAGE-PROVISIONING-2026-09-19.csv` and the 348
files in `assets/`.

The earlier review was blocked by iCloud placeholders. They are downloaded and
every file read cleanly.

---

## Verdict in one line

**Tomorrow's list drops from 14 assets to 9.** Three MISSING rows can be filled
from art already sitting on the Desktop. The five UPSCALED and three
SOFT-RETINA rows still need new masters — one of them now has a better source
than the manifest assumed. The 63 galaxy rows are untouched.

The review also turned up **~7 MB of oversized JPEG fallbacks shipping today**
that nothing in the audit had flagged.

---

## 1 · MISSING — all three closeable from existing art

The manifest calls these "new art". They are not: the library holds usable
candidates at or above the required resolution. What is needed is an art pick,
not a shoot.

**How the coming-soon bands are built.** Every band on disk is 1200×640, and
the masters they were cut from are **1717×916 PNGs** — confirmed because
`Unused Images/hero-04.png` and `used images/ban-04.png` are byte-identical
(2,145,292 bytes), and `assets/coming/band-06.jpg` was shipped at 1717×916
without being resized. There are **eight unallocated masters at exactly that
size**, plus five wider plates that exceed the target and can be cropped down.

| Row | Target | Recommended candidate | Why |
|---|---|---|---|
| `coming/band-09` | 1200×640 | `Codex Image 13 Sept 2026, 22_58_03.png` **1920×819** | man on a headland at sunrise, arms open. Reads as Rise; matches band-08's single-subject cinematic register |
| | | alt: `hero-06.png` **1717×916** | man in a doorway with a gym bag, dawn light — same register, exact master size |
| | | alt: `Codex 4 Sept 17_56_22.png` **1717×916** | friends on a roof terrace at night, warm |
| `anxiety-hero.webp` | 1200×640 | `exec-593163c0-….png` **1983×793** | a hand resting on a bare arm, sunlit — self-soothing, no face, works under a scrim |
| `method/res-somatic.jpg` | 1200×640 | `used images/exec-7caaf864-….png` **1672×941** | seated woman, hand at her middle, low light — literally the somatic resource |

Other unallocated wide plates worth keeping for future bands:
`exec-a71d74a4` 2048×768 (a crowded, warm social gathering) ·
`exec-e81cb658` 2048×768 (empty sunlit interior, no people) ·
`exec-ad63514a` 1919×820 (water caustics, pure abstract texture) ·
`Codex 9 Sept 00_36_57` 1717×916 (gym, battle ropes).

One caution: `Codex Image 2 Sept 2026, 03_54_45.png` is a **four-up contact
sheet** with `home-01.jpg`…`home-03.jpg` burnt into the corners, not a usable
frame. Several of the 1536×1024 and 1254×1254 batches are the same — check
before allocating any file from this library.

---

## 2 · UPSCALED — one improves, four unchanged

| Row | Target | Best source found | Verdict |
|---|---|---|---|
| `journey/t1-band` | 2880×908 | **`used images/band.jpeg` 1941×810** | **partial.** Confirmed by eye as the same triptych now shipping at 1400×380 — headphones / aeroplane window / man with a golden retriever. Corroborated by `journey/t1-band@2x.jpg`, which is 1941×527: same width, already cut from it. Re-cutting gives **1941×612 — 67% of target, up from 49%.** Better, not solved |
| `journey/t2-band` | 2880×908 | — | **nothing.** No wider copy of the couples triptych anywhere in either folder |
| `journey/t3-band` | 2880×908 | — | **nothing.** No wider copy of the chef / laptop / night-office triptych |
| `coming/band-professional-performance` | 2848×1584 | — | **nothing** at that aspect above 1672px wide |
| `frameworks/guided-session` | 2848×864 | `exec-9b0f6619-….png` 2172×724 | **not a master — a different picture.** Live is a single woman in headphones on a sofa; this is a four-panel strip of a seated man practising. A substitute if you want one, and your call, but it does not upscale the existing frame |

---

## 3 · SOFT-RETINA — all three unchanged

| Row | Target | Library has | Verdict |
|---|---|---|---|
| `dashboard/state-banner` | 1920×480 | `state-banner.jpg`, `d-08-state-range-banner.jpg`, both 1200×300 | identical to live |
| `dashboard/journal-banner` | 1800×468 | `journal-banner.jpg`, `d-09-journal-banner.jpg`, both 1000×260 | identical to live |
| `frameworks/range-photograph` | 2584×578 | — | **nothing.** `range copy.jpg` at 2048×768 is a *different image* — live `range-photograph.jpg` is a shelf still-life (lamp, books, brass bowl); `range copy.jpg` is a three-panel portrait sequence. It belongs to `t*/range.jpg` instead — see §5 |

---

## 4 · RECROP — the manifest's premise is wrong

`covers/01.jpg` is 900×1200, but **`assets/covers/01.png` at 1086×1448 is
already in the repo** — a 1.18 MB portrait master. The landscape recompose to
2000×1124 still stands, but it starts from 1086px wide, not 900. Correct the
row.

---

## 5 · GALAXY — 63 rows, nothing found. Confirmed.

Not a single file in either folder is 1920×1080, and nothing 16:9 exceeds
1672×941 — 13% short on each axis. The closest batch by aspect is the six
1672×941 files, which are the right shape and the wrong size.

`used images` does hold **all 30 protocol cover masters** at 1086×1448
(`t1-01`…`t1-10`, `t2-01`…`t2-10`, `t3-01-master`…`t3-10-master`). They are
portrait covers, so they cannot serve a landscape plate — and in any case the
21 protocols without galaxy art were rejected by the `separation` quality gate,
not left undone. Track 3 stands as written.

---

## 6 · Not on the manifest — ~7 MB shipping today for nothing

Four JPEG fallbacks on disk are raw masters that were never resized. Each has
a correctly-sized `.webp` beside it, so the moment PASS C's `<picture>` wrapper
lands the browser stops requesting them — but until then they are what loads:

| File | On disk | Its `.webp` | Waste |
|---|---|---|---|
| `assets/home/door-t3.jpg` | 1086×1448, **1823 KB** | 86 KB | 1.74 MB |
| `assets/coming/band-06.jpg` | **1717×916**, 1769 KB — the only band not resized to 1200×640 | 74 KB | 1.66 MB |
| `assets/home/door-t2.jpg` | 1086×1448, **1745 KB** | 71 KB | 1.63 MB |
| `assets/home/door-t1.jpg` | 1086×1448, **1645 KB** | 53 KB | 1.55 MB |

Re-encoding the four at JPEG q82 costs one command and recovers most of
**6.6 MB** even before the markup changes. `band-06.jpg` should also be
resized to 1200×640 to match the other seven bands.

---

## 7 · CORRECTED 19 Sep — these are NOT upgrades, they are different photographs

**An earlier version of this section was wrong and is retracted.** It listed
seven files as "same image, larger master — drop-in re-export". They were
matched on filename, dimensions and aspect ratio, and never opened. When they
were opened, four of them turned out to be **entirely different pictures**:

| Claimed as an upgrade | What it actually is |
|---|---|
| `door-t1.jpg` 1200×1600 | a different man, seated on the floor against a green wall — live is a man on a sofa in a bright room |
| `door-t2.jpg` 1200×1600 | a different couple, in a café — live is a couple in a kitchen at night |
| `door-t3.jpg` 1200×1600 | a woman in a grey coat on a staircase — live is a man in a blue blazer in an office |
| `hero-corridor.jpg` 2400×900 | a dark timber-and-plaster corridor — live `band-welcome-corridor` is a bright white corridor opening to the sea |

Swapping any of them would have silently changed the art direction of the
homepage doors. **Do not treat matching dimensions as evidence of the same
picture.**

`change copy 2.jpg` (1897×829), `cost copy 2.jpg` (1819×865) and
`range copy.jpg` (2048×768) are **unverified**. They are plausibly the masters
of `t*/change`, `t*/cost` and `t*/range`, but note that each of those exists
separately for t1, t2 and t3 at different byte sizes, so even if the picture
matches, *which track it belongs to* is an open question. Open them before any
swap.

**The one upgrade that does hold:** `used images/band.jpeg` at 1941×810 is
genuinely the master of `journey/t1-band`, confirmed by eye — same triptych,
and `t1-band@2x.jpg` is 1941×527, already cut from it.

## What this changes for Sunday

- **Track 2 drops from 14 assets to 9.** The three MISSING rows become art
  picks from the shortlist in §1 — minutes, not a shoot.
- **Add §6 to Track 1, before anything else.** Four `cwebp`/`cjpeg` commands,
  6.6 MB, no markup and no artwork. It is the cheapest win in the whole image
  programme and it was not in the audit.
- **Do NOT do the §7 re-exports.** That finding was wrong — see §7. Only
  `band.jpeg` → `t1-band` survives, and it is a partial improvement, not a fix.
- **Still needs new masters:** `journey/t2-band`, `journey/t3-band`,
  `coming/band-professional-performance`, both dashboard banners,
  `frameworks/range-photograph`, both About portraits, the `covers/01` recrop.
  `journey/t1-band` improves to 1941px but does not reach 2880.
- **Track 3 unchanged.** No galaxy art exists in either folder.
