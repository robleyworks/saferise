# `~/Desktop/Unused Images` — reviewed 19 September

Checked against `docs/IMAGE-PROVISIONING-2026-09-19.csv` to find work that is
already done. 137 files: 70 PNG, 66 JPG.

**Headline: it does not reduce tomorrow's shoot.** Every candidate for the five
upscaled and three soft-on-retina files is at the *same* resolution as the copy
already shipping, or below target. There are three genuine upgrades and a set of
unallocated art, listed below.

**This review is partial.** Many files are iCloud placeholders that are not
downloaded — 5 of 40 in the first batch, 8 of 12 in the second — and cannot be
read until they are opened in Finder. Everything in the "not yet reviewable"
section below is unassessed.

---

## 1 · Exact duplicates — already shipping, identical dimensions

No action. These are copies of live assets, not newer masters.

| Unused file | Dimensions | Site file | Site has |
|---|---|---|---|
| `panel-t1.jpg` `panel-t2.jpg` `panel-t3.jpg` | 2400×1000 | `assets/home/panel-t*` | 2400×1000 |
| `film-poster.jpg` | 2400×1350 | `assets/home/film-poster` | 2400×1350 |
| `hero-film.jpg` | 3840×1600 | `assets/home/hero-film` | 3840×1600 |
| `coming-hero.jpg` | 3840×1200 | `assets/coming/coming-hero` | 3840×1200 |
| `hero.jpg` | 2400×1000 | `assets/t1/hero` | 2400×1000 |
| `change.jpg` `cost.jpg` | 1600×700 | `assets/t1/change` `cost` | 1600×700 |
| `calendar.jpg` `workshops.jpg` `premium-1on1.jpg` | 900×450 | `assets/sessions/*` | 900×450 |
| `clearing-tile.jpg` `left-off-tile.jpg` | 900×600 | `assets/dashboard/*` | 900×600 |
| `band-clearing-asis.jpg` | 1200×640 | `assets/coming/band-clearing.jpg` | 1200×640 |
| `door-t1.jpg`, `door-t1 copy.jpg`, `door-t3.png` | 1086×1448 | `assets/home/door-t1` | 1086×1448 |

Several carry `1`-suffixed twins (`change1.jpg`, `cost1.jpg`, `hero1.jpg`,
`d-0X-…1.jpg`) that are the same image at a different compression. Nothing to
recover from them.

---

## 2 · Does NOT solve the upscale problem — confirm before shooting

These are the files the audit flagged as rendered larger than source. The
unused folder has same-size copies, not bigger ones. **Still needs a new
master or a re-shoot.**

| Provisioning need | Target | Unused folder has | Verdict |
|---|---|---|---|
| `journey/t3-band` | 2880×908 | `t3-band.jpg` **1400×380** | identical to live — no help |
| `journey/t1-band` | 2880×908 | `journey.jpg` 1400×583 | different crop, still under |
| `dashboard/state-banner` | 1920×480 | `state-banner.jpg`, `d-08-state-range-banner.jpg` both **1200×300** | identical to live — no help |
| `dashboard/journal-banner` | 1800×468 | `journal-banner.jpg`, `d-09-journal-banner.jpg` both **1000×260** | identical to live — no help |
| `coming/band-professional-performance` | 2848×1584 | — | nothing |
| `frameworks/guided-session` | 2848×864 | — | nothing |

---

## 3 · Three genuine upgrades — take these

| Unused file | Dimensions | Replaces | Currently | Gain |
|---|---|---|---|---|
| `door-t2.jpg` | **1200×1600** | `assets/home/door-t2` | 1086×1448 | +10% linear, same 0.75 aspect |
| `door-t3.jpg` | **1200×1600** | `assets/home/door-t3` | 1086×1448 | +10% linear, same 0.75 aspect |
| `hero-corridor.jpg` | **2400×900** | `assets/coming/band-welcome-corridor` | 2360×800 | taller crop, more room for the scrim |

`range.jpg` / `range copy.jpg` at **1600×600** are bigger than the live
`frameworks/range-photograph` at 1340×300 — but the aspect differs (2.67 vs
4.47), so it is a different crop rather than a larger version of the same
image. A judgement call, not a drop-in. Target remains 2584×578.

---

## 4 · Unallocated art — provisioned but never placed

Nothing on the site points at these. Worth a decision before commissioning
anything similar.

| File | Dimensions | Likely slot |
|---|---|---|
| `live-premium-1to1.jpg` | 1800×1100 | `live-sessions.html` — the page has offers with no art |
| `live-online-workshop.jpg` | 1800×1100 | same |
| `live-conference-event.jpg` | 1800×1100 | same |
| `live-retreat.jpg`, `live-org-office.jpg`, `live-hero-remote.jpg` | — | iCloud placeholders, not yet readable |
| `method-hero.jpg` | 2400×1000 | `method.html` hero |
| `begin-tile.jpg` | 900×600 | dashboard tile, matches the other two at 900×600 |
| `band-clearing-mirrored.jpg` | — | a mirrored variant of the live band |

---

## 5 · ~66 large generated PNGs — unallocated, in dated batches

`Codex Image *` (≈44) and `exec-*` (≈22), 1.6–2.7 MB each. They fall into
aspect-ratio batches, which suggests each batch was generated for a different
slot type:

| Batch | Aspect | Sample dimensions | Reads as |
|---|---|---|---|
| 13 Sept | **1.78** (16:9) | 1671×941 | coming-soon band art — the one opened is a family-kitchen nutrition scene, matching the "Nutrition" band on `coming-soon.html` |
| 2 Sept | 1.50 | 1536×1024 | — |
| 4 Sept | 1.33 | 1448×1086 | — |
| 9 Sept | **0.75** | 1086×1448 | protocol cover ratio |

**Relevant to the galaxy question:** the 16:9 batch is the right *shape* for a
galaxy plate but 1671×941 against a 1920×1080 requirement — about 13% short on
each axis. Usable as a source to re-render from, not as a drop-in.

The 0.75 batch is at exactly the protocol-cover dimension (1086×1448), so those
may be unused cover candidates.

None of these can be allocated without looking at them. That is an art
decision, not a measurement.

---

## 6 · Not yet reviewable — iCloud placeholders

These failed to stage because macOS has not downloaded them locally. Open the
folder in Finder and let it sync, then this review can be completed:

`Codex Image 9 Sept 2026, 00_32_55.png` · all sampled `exec-*.png` ·
`hero-04.png` · `hero-06.png` · `fb0873bf-….png` · `39844b29-….png` ·
`live-retreat.jpg` · `live-org-office.jpg` · `live-hero-remote.jpg` ·
`method-integration.jpg` · `method-lineage.jpg` · `method-states.jpg`

---

## What this changes for Sunday

- **Track 2 does not shrink.** The five upscaled and three soft files still
  need new masters. Do not go looking in this folder for them.
- **Add three quick swaps** to Track 2: `door-t2`, `door-t3`, `hero-corridor`.
  Existing files, better dimensions, no shoot required.
- **Decide on the live-sessions art** before commissioning any — three usable
  1800×1100 images are sitting there unplaced.
- **Look at the 16:9 batch** before starting galaxy work. Wrong resolution to
  drop in, but they may be the source the plates were meant to come from.

There is also a `~/Desktop/used images` folder that has **not** been reviewed.
If masters live anywhere, that is the next place to look.
