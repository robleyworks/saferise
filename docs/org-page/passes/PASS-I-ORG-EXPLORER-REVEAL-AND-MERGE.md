# PASS-I · organisations.html — explorer, covers, sections, imagery

SR-434. Follows SR-429 (`7b47c08`).

**Part of this pass has been executed** — `298f203`, 23 September 15:50,
*"SR-434 · organisations.html: F8 reveal, dead anchor, and the counts"*. The
file is now **431 lines** and every line number in the original brief has moved.

**Re-read the live files and report before editing.** Do not trust a line number
in this document without confirming it first.

Commit locally. Do not push.

---

## Executed — verified live at 20:13

| § | What | Evidence |
|---|---|---|
| **§1** | F8 reveal, missing class | `js/saferise-org-explorer.js:180` — `f8inner.className = 'sr-org-edinner';` set before the write, matching the wall handler |
| **§2** | The ring | ported from `PASS-F-reference-explorer.html` as inline SVG, replacing `.sr-org-eeq` |
| **§4a** | The counts | `14 to draw from`, `16 to draw from` and `224 combinations` removed |
| **§5** | Dead hero anchor | now `href="#sr-org-explorer"` |

---

## §3 · The Foundation 8 covers — open, awaiting one choice

`content/f8-tracks.js` carries **no image field of any kind**. That is why the
explorer still renders the typographic plate.

**The slot stays portrait at 1086 x 1448**, matching every other cover on the
site. Tracks 01-03 take new supplied art; 04-08 take portrait crops of the
bands in `#sr-org-curriculum`.

`journey/t1-band` and `journey/t3-band` are triptychs — three photographs with
slanted seams — so no portrait window could be cut from either. Both are replaced
rather than cropped.

| # | Track | Source |
|---|---|---|
| 01 | Personal Transformation | supplied — man at sunrise, ridge |
| 02 | Relationship Healing | supplied — couple seated, terrace at golden hour |
| 03 | Professional Performance | supplied — chef in whites, pass behind |
| 04 | Executive Presence | `assets/coming/band-08.webp`, portrait crop |
| 05 | Embodied Nutrition | `assets/coming/band-04.webp`, portrait crop |
| 06 | Strength & Return | `assets/coming/band-03.webp`, portrait crop |
| 07 | Sleep & Recovery | `assets/coming/band-09.webp`, portrait crop |
| 08 | Elevation Series | `assets/coming/band-01.webp`, portrait crop |

The chef is right for 03 on its own merits: **Professional Performance now reads
as hospitality rather than suits and glass towers** — the documented first market,
and the idiom that set was already flagged off-register for.

**Staged:** `docs/org-page/source-images/f8-covers/as-supplied/` and `/graded/`,
both at 1086 x 1448 with the cover encoder (JPEG q94 progressive 4:2:0, WebP q78
method 6). Measured f01 100 -> 84, f02 104 -> 86, f03 67 -> 63. **02 is what the
decision turns on** — as supplied it is a bright golden-hour frame beside seven
darker covers. Andre picks one variant for all three; the pass byte-copies that
folder into `assets/org/covers/` as `f01`-`f03`.

WARNING **The chef is 493 x 718** — a 2.2x upscale to 1086. Fine at the sizes this
page renders, below spec as a stored asset; all 27 existing org covers are native.
Ask Andre for the original and re-cut before this is final.

WARNING **f01 carries a burned-in SAFERISE wordmark** bottom-right. No other cover
in `assets/org/covers/` has one.

**The work:** add a `cover` field to each of the eight objects in
`content/f8-tracks.js`, render it in both the card and the detail panel, keep the
plate as the fallback — the same `coverOrPlate` pattern the wall uses.

---

## §4b · The duplicated Foundation 8 — executed under SR-434

`#sr-org-curriculum` was SR-385's. `#sr-org-base`, inside `#sr-org-explorer`, is
SR-429's. Both listed the same eight Foundation tracks — once with photographs
and no detail, once with detail and no photographs. Merged into
`#sr-org-explorer`; `#sr-org-curriculum` deleted.

---

## §6 · The buyer is not pictured anywhere on their own page — OPEN, NEVER DONE

Twenty-one banner-shaped images exist (width >= 1100, aspect >= 1.9), proofed at
`docs/org-page/source-images/pool-sheets/hr-banner-candidates.jpg`. **Not one
shows the buyer.** Every workplace image is either the employee SafeRise serves,
or somebody standing at the front of a room presenting to a seated group — and
that second posture is the argument the page is written against. New photography
or generation.

### Specification — `assets/org/band-hr`

**2360 x 640**, `.webp` q78 method 5 with a `.jpg` sibling at q82 progressive —
identical to `band-base` and `band-plustwo`. Add `.sr-org-eband--hr` alongside
them in `css/saferise-system.css`, same `image-set()` pattern with the plain
`url()` fallback first.

**Composition is set by the scrim, not by taste.** `.sr-org-eband::after` runs a
90deg gradient from `rgba(8,8,12,.97)` to `.5` — dark left, clear right — because
the copy sits over the left. So the subject sits **right of centre**, the left 40%
is empty ground, the frame is wide with the subject low, available light only.

**Who.** One person, forties to fifties, who reads as the person signing this
off — an HR director, a people lead, a head of operations. Caribbean first market
casting, per `claude/B2B-PROTOCOL-REGISTER.md`.

**Doing.** Thinking, or in a one-to-one **seated at the same level as the other
person**. Reading at their own desk. A moment of their working day, not a
performance of their role.

**Disqualifiers, and they are the point:** presenting to a group or standing while
others sit; lanyard, clipboard, badge, branded wall; the handshake or
welcome-aboard table; laptop-and-coffee stock; eye contact with the camera.

**Placement.** `#sr-org-privacy` — the only section that addresses the buyer about
their own decision, and the only one of the three without a band. Confirm before
generating; a hero placement has different scrim geometry.

---

## §7 · The gap section takes a new photograph — STAGED, NOT DEPLOYED

`.sr-org-gap`. Replaces `assets/home/panel-t3.jpg` with a supplied triptych —
three professionals, each alone in a workplace moment.

WARNING **Do not overwrite `panel-t3`.** It is used in three places:
`organisations.html`, `index.html`, `js/saferise-plans.js`. Overwriting would
silently change the home page and the plans carousel. **Ship a new asset and
repoint the org line only.**

**The file:** `docs/org-page/source-images/gap/gap-moment.{jpg,webp}` ->
`assets/org/gap-moment.*`. **1086 x 1358**, the 4:5 the slot renders:

```css
.sr-org-image-copy figure img{width:100%;height:100%;object-fit:cover;aspect-ratio:4/5}
```

Source was 1086 x 1448; 90px off the bottom. No upscale.

**No grade.** As supplied it measures mean luma 56.4 against the house reference
of ~55. A graded variant sits at `gap/graded/` but only desaturates (chroma 0.324
-> 0.265). **Ship as supplied.**

New alt — the current one describes a single person:

```html
alt="Three professionals, each alone in a moment at work"
```

WARNING **The mobile crop clips a head.** Below 820px the slot switches to 16/9; a
4:5 source under `object-fit:cover` shows the vertical centre slice, which cuts
the top of the middle figure's head. One scoped line fixes it:

```css
@media(max-width:820px){.sr-org-gap .sr-org-image-copy figure img{object-position:top}}
```

Verify at phone width, not only in a resized desktop window.

---

## §8 · One method, two spaces — a new pair, exposure matched — STAGED, NOT DEPLOYED

`#sr-org-privacy`. Both photographs replaced:

| | Was | Now |
|---|---|---|
| The shared space | `assets/sessions/workshops.webp` | a laptop on a desk, four people on a call |
| The private space | `assets/frameworks/guided-session.webp` | a man on a sofa in headphones |

WARNING **Do not overwrite either existing asset.** Both are reused:

| Asset | Also used at |
|---|---|
| `assets/sessions/workshops.webp` | `organisations.html` (delivery), `css/saferise-dashboard.css` |
| `assets/frameworks/guided-session.webp` | `organisations.html` (close), `member-frameworks.html` |

**Ship new assets and repoint the two-space line only.**

**The files:** `docs/org-page/source-images/twospace/twospace-shared.{jpg,webp}`
and `twospace-private.{jpg,webp}` -> `assets/org/`. **1600 x 1000**, the 16:10
the slot renders:

```css
.sr-org-photo-cards img{width:100%;aspect-ratio:16/10;object-fit:cover}
```

### The exposure match

As supplied the pair were **54 points apart** — shared mean 65.3, private mean
118.9 with highlights clipping at 254. The private frame is a sunlit apartment;
on a near-black page beside a lamplit desk it read as a different product.

Both were taken to an explicit shared target — **mean 66, highlight ceiling 214,
chroma 0.30** — rather than each being pulled a bounded distance toward the house
reference. A shared target is the right instrument here because the requirement
is that the two match *each other*, not that each sits near an average.

Landed: shared **64.4 / p99.5 219 / chroma 0.288**, private **73.0 / p99.5 196 /
chroma 0.298**. Nine apart instead of fifty-four.

Method, for the record: highlight shoulder to the common ceiling; exposure to the
common mean as a **power curve**, not a linear multiply, so the blacks do not lift
or crush under a 0.55x move; chroma to target with the skin mask restoring faces
exactly; then the house split-tone, local contrast, vignette and grain so the
pair sit with the rest of the page.

WARNING **The shared image is 900 x 450**, cropping to 720 x 450 at 16:10 — a
**2.22x upscale** to 1600. The card renders about 740 CSS px, so a 2x display
wants ~1480 and this supplies 720. It will be visibly soft on a retina screen.
**Ask Andre for the original.** The private image is 1586 x 992 and is
effectively native.

WARNING One honest limit: the private frame is a bright daylight apartment and no
exposure match makes it feel like the dark, enclosed meditation frame it replaces.
The pair now share a tonal world; they do not share a time of day. If that matters
it is a casting question, not a grade one.

---

## Open decisions

| | Question | Blocks |
|---|---|---|
| 1 | Covers **as supplied** or **page-graded** — one variant for all three | §3 |
| 2 | The chef original, and the wordmark on f01 | §3 final |
| 3 | HR band placement — `#sr-org-privacy` or the hero — then generate | §6 |
| 4 | The original of the shared-space laptop frame | §8 final |
