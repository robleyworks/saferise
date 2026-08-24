# SafeRise — Complete Image Audit

**Report only. Nothing was created, cropped, re-exported, replaced or edited.**
No copy, animation, layout, navigation or interaction system was touched.

*Audited 23 Aug 2026 · against the working tree at `06089b4` · measured in Chromium
at 1440×900 and 390×844 over a local static server at `127.0.0.1:8643`*

---

## Method, and the eight measurement artifacts it had to survive

Two instruments, and the gap between them is most of what this audit found.

| | tells you |
|---|---|
| **PIL 11.3.0** on the file bytes | what the asset *is* — pixels, container format, colour mode, chroma subsampling, luminance |
| **`getBoundingClientRect()`** in the browser | what the visitor *sees* — the laid-out box, after `cover`, after the breakpoint |

Every file dimension below is read from the bytes. Every displayed dimension is a
rendered rect. Neither number was inferred from a `width` attribute, a CSS rule or a
filename. Every live URL was additionally **fetched** and checked for `200` +
`image/*`, because SR-261 established that a background-image failure produces no
console error, no layout shift and no broken-image glyph.

Artifacts encountered and controlled for, recorded so the next run does not pay for
them again:

1. **`naturalWidth` is not the file size when `srcset` is present.** `covers/01-640.webp`
   is 640×853 on disk and over HTTP; the browser reports `naturalWidth = 262` because
   w-descriptors make it density-corrected. Read the file from disk; read the box from
   the rect. This is the disagreement behind the "62 covers" note — the attributes were
   right.
2. **`<picture>` is `display:contents`, so `parentElement` has a zero rect.** A first
   pass reported all ten Track 01 covers overflowing a 0×0 box. The real layout box is
   `span.sr-tile` at 262×349 and nothing overflows. Walk up past `display:contents`
   before asserting an image against its container.
3. **`img.complete === true` with `naturalWidth === 0` is a load-timing state, not a
   broken file.** A first pass flagged ten covers as broken; all ten return `200 image/webp`
   and decode. Await `load`/`error` on every image before measuring.
4. **`loading="lazy"` images never settle on a page you do not scroll**, and
   re-assigning `src` to force them restarts layout and yields transient `1060×0` rects.
   Scroll the slot into view and wait; do not re-kick `src`.
5. **Forcing all ten `prog-overlay`s visible at once distorts the carousels.** Measured
   that way, Track 02 covers report 429–482 px wide. Measured one overlay at a time — the
   way a visitor sees them — every one is 260×347. Measure the state the visitor is in.
6. **A `resize_window` preset can leave `innerWidth` at 0.** Explicit width/height was set
   and `innerWidth` reported alongside every measurement.
7. **A compound `which` returns non-zero if *any* argument is missing.** `which node nodejs
   deno bun` exited 1 because three of four were absent — it said nothing about the fourth.
   Read the output, not the status.
8. **The dev-server preview runner could not launch `tools/serve.py` under its sandbox**
   (`Operation not permitted` on a relative path). The server was started directly and the
   browser pointed at it. Worth knowing before assuming the harness is broken.

---

## 1 · Executive summary

**209 image files on disk. 146 reachable on a live render path, all returning `200` and an
`image/*` content type. Zero broken images anywhere on the site.** The thirteen 404s are all
deliberately commented-out `NEEDS ART` placeholders (SR-059) and none is on a render path.

The picture is not one of breakage. It is one of **provenance and duplication**. Six findings
carry the report.

**A · All thirty protocol covers carry a burned-in `SAFERISE` wordmark.** Lower right, a hairline
rule plus letterspaced caps, present in 30/30 shipped JPEGs *and* in the PNG masters they were
exported from. This is the single hard violation of "no text of any kind in frame" and it cannot
be fixed by re-export — the pixels carry it. Re-render required. It also sits exactly where the
site draws its own label.

**B · `protocol.html` is 73.6% inline base64 PNG.** 4.59 MB of file, 3.38 MB of it two inlined
PNGs. One is pixel-identical to `assets/pt/protocols/anxiety-journey.webp`, which is **60 KB** on
disk. The other is cover 01, which ships as `covers/01.webp` at **32 KB**. 3.38 MB where 92 KB of
existing files would do — a **37× overhead**, on the page members read most. `resource.html`
does the same at smaller scale and inlines the same cover twice.

**C · A 3:4 portrait cover is used as an ultrawide band on three surfaces, keeping 13–18% of its
height.** `protocol.html` `.sechead` keeps 15.8%; `resource.html` `.sr-cover` keeps 13.0%;
`index.html`'s Track 03 protocol page keeps 17.9%. These are portraits of people. A band that
narrow cuts through the face or misses it entirely, and it is the same asset every time.

**D · The affluence-and-staging drift is not confined to those fifteen frames — it holds across
the delivered set.** Four of twelve track editorial images stage wealth rather than regulation:
a motorcycle outside a modernist house, cocktails on a Mediterranean terrace, a whiteboard of
code in an open-plan office, and a suit above an infinity pool. Answer in §2.

**E · `index.html` and the standalone track pages carry genuinely different image sets, and
`index.html` embeds a complete second copy of all three track pages.** Answer in §2 — this is
SR-269 and it resolves.

**F · 61.4 MB of the asset tree — 63 files — is referenced by nothing shipped.** Mostly PNG
delivery masters sitting beside their exported JPEGs, plus nine byte-different duplicates of
images that already exist at one-tenth the size.

Secondary: 22 of 81 JPEGs are **4:2:0** where the standard is 4:4:4; the Track 03 journey band
has **no asset at all** and renders its art brief as visitor-facing text; the Six Areas of Change
scrim design is fully written in CSS and has **no emitter**; and `index.html`'s top-level landing
page contains **zero photographs**.

**Counts by status** — 146 live assets:

| status | count | what it covers |
|---|---:|---|
| KEEP | 96 | covers as card art (geometry only), section triptychs, journey bands, `four-steps`, `pt/*`, responsive cover variants |
| CROP ADJUSTMENT | 4 | the three ultrawide portrait-as-band uses, plus multi-panel composites at mobile |
| RESIZE / REEXPORT | 42 | 22 JPEGs at 4:2:0; T2/T3 covers with no responsive variants; the two inline-base64 pages |
| REPLACE | 34 | 30 covers (burned-in wordmark) + 4 editorial frames (brand drift) |

Nothing on this list is blocking. **A and B are the two that should not ship as they are.**

---

## 2 · Global asset findings

### 2.1 SR-269 — answered

> *Are `assets/pt/*.webp` and `assets/t1|t2|t3/*.jpg` the same images at two paths or
> genuinely different sets — and does `index.html` embed complete inline copies of all
> three track pages with their own image inventory?*

**They are genuinely different sets. And yes, `index.html` embeds a complete second copy of
all three track pages.**

**Different sets, measured three ways.**

| | `assets/pt/` | `assets/t1\|t2\|t3/` |
|---|---|---|
| files | 5 (+1 in `pt/protocols/`) | 4 per track, 12 total |
| container | WebP | JPEG |
| dimensions | 1600×533 / 1600×639 / 1600×914 | 1600×700 / 1600×600 / 2400×1000 |
| aspect ratios | 3.00 · 2.50 · 1.75 | 2.286 · 2.667 · 2.400 |
| dated | 13 Aug 2026 | 22–23 Aug 2026 |
| scope | Track 01 only | all three tracks |

No file in one set matches any file in the other on dimensions, ratio or container. A
perceptual-hash sweep across all 209 raster assets confirms it: **not one `pt/` file pairs with
any `tN/` file.** They are different photography of different subjects — `pt/journey-triptych.webp`
is three people on phones and laptops at night; `t1/hero.jpg` is a woman outside a building at
golden hour.

Two genuine cross-path duplicates *do* exist, but neither is the pair asked about:

- **`assets/dashboard/hero-corridor.jpg` (1500×499, 69 KB) and `assets/pt/corridor.webp`
  (1600×533, 44 KB) are the same photograph** at two paths, two containers, two sizes.
- **`assets/shared/four-steps.jpg` (1600×500) and `assets/pt/protocol-foundation.webp`
  (1600×533) are the same four-panel artwork**, re-cropped (hamming 11/256).

**The overlays are a full second copy of the track pages.** `index.html` is 10,538 lines /
1,077,973 bytes. Ten `.prog-overlay` blocks account for **561,680 bytes — 52.1% of the file**.
Three of them are the track pages:

| overlay | lines | bytes | share |
|---|---|---:|---:|
| `prog-personal` | 5431–6161 | 76,481 | 7.1% |
| `prog-couples` | 6162–6768 | 124,251 | 11.5% |
| `prog-corporate` | 6769–7376 | 103,344 | 9.6% |
| **three track overlays** | | **304,076** | **28.2%** |

Section for section, `#personal-portal-view` and the standalone `#page` render the same
editorial spine in the same order — Where to begin · And why it matters now · The state it's
holding · Why naming it isn't enough · What reaches it instead · What changes when it does ·
What you get to work with · How you'll know it's working · What it costs to start · FAQ. The
standalone renders it from `content/tracks.js`; the overlay is hardcoded markup. **They diverge
on every inventory they both carry:**

| | standalone page | `index.html` overlay |
|---|---|---|
| image set | `assets/tN/*.jpg` + `journey/tN-band.jpg` + `shared/four-steps.jpg` | `assets/pt/*.webp` (T1 only); T2/T3 have **no editorial imagery at all** |
| cover delivery | plain `<img src>` at 900×1200 / 1086×1448 | `<picture>` + WebP + 320/640/900 `srcset` |
| resource list | 10 authored names | 10 / 6 / 6 different names |
| FAQ items | 18 | 14 / 12 / 12 |
| testimonial | section omitted | `PLACEHOLDER` / `TODO` blockquote |

So the answer for images specifically: **`prog-personal` is the only overlay with editorial
photography, and it is a different set from the Track 01 page it duplicates.** `prog-couples`
and `prog-corporate` carry only covers and a banner. This is SR-148's stage-two problem at full
scale, and it does make the pricing, duration and resource-vocabulary divergences one cause
rather than three.

### 2.2 Burned-in typography — 30 of 30 covers

Every protocol cover carries a hairline rule and letterspaced `SAFERISE` in the lower right,
verified by cropping the region 55–100% × 89.5–96.5% out of all thirty and reading them as a
strip. It is also present in the delivery masters (`covers/01.png`, `t2/001.png`), so it was
rendered in, not stamped at export. **Re-export cannot remove it.**

Two consequences:

- It violates "no text of any kind in frame" outright.
- It occupies the lower-right quadrant, which is where the site's own label sits. §8.

### 2.3 Format from the bytes, never the extension

209 files sniffed by container. **No extension/format mismatch exists today** — 81 `.jpg` are all
JPEG, 35 `.png` all PNG, 62 `.webp` all WebP, 31 `.svg`. The PNG-behind-`.jpg` class of delivery
error is not currently in the tree.

It *has* reappeared in a different shape: **`protocol.html` inlines 3.38 MB of base64 PNG in
`mode=RGB`** — photographic content, no transparency, in a lossless container, inside an HTML
document. Same defect, different envelope.

### 2.4 Chroma subsampling — 22 of 81 JPEGs are 4:2:0

The standard is q94 4:4:4. 59 files comply. The 22 that do not:

| file(s) | chroma | q≈ |
|---|---|---|
| `covers/banner-320.jpg`, `banner-640.jpg` | 4:2:0 | 81 |
| `covers/banner.jpg`, `t2-banner.jpg`, `t3-banner.jpg` | 4:2:0 | 94 |
| `t1/hero.jpg`, `t2/hero.jpg`, `t2/cost.jpg`, `t2/change.jpg` | 4:2:0 | 97 |
| `journey/t1-band.jpg`, `journey/t2-band.jpg` | 4:2:0 | 97 |
| `banners/01–10_*_2880x686.jpg` (10 files) | 4:2:0 | 94 |
| `dashboard/hero-corridor.jpg` | 4:2:0 | 78 |

`hero-corridor.jpg` at **q≈78** is the lowest-quality file on a live render path.

### 2.5 Corner luminance against the page ground

Page ground is `#08080C`. Corners sampled at 3% of the short edge; contrast computed WCAG-style.
Nine assets have a corner brighter than 4:1 against the ground — a visible seam wherever the
image meets the page without a scrim covering that corner:

| file | worst corner | which |
|---|---:|---|
| `t2/hero.jpg` | 18.1:1 | top-right |
| `covers/t3-banner.jpg` | 16.6:1 | top-right |
| `t2/cost.jpg` | 16.4:1 | top-right |
| `t3/change.jpg` | 13.1:1 | bottom-right |
| `pt/protocol-foundation.webp` | 9.0:1 | top-right |
| `pt/protocols/anxiety-journey.webp` | 8.4:1 | top-right |
| `dashboard/hero-corridor.jpg` · `pt/corridor.webp` | 6.6:1 | top-right |
| `shared/four-steps.jpg` | 6.0:1 | top-right |
| `t1/hero.jpg` | 5.7:1 | top-right |

The heroes are covered — SR-213's per-track scrim is a real, measured gradient sitting above the
photo in the `background` stack. The **section slots are not**: `.sr-tp-ph` has `::before` and
`::after` with `content: none`, so nothing overlays them. `four-steps.jpg` and
`protocol-foundation.webp` meet the ground bare at 6:1 and 9:1.

### 2.6 Present but referenced by nothing — 63 files, 61.4 MB

| directory | files | note |
|---|---:|---|
| `assets/covers/*.png` | 16 | 1086×1448 masters of the ten T1 covers + banner. **The shipped `NN.jpg` are 900×1200 downscales of these** — which is why T1 covers are 900×1200 and T2/T3 are 1086×1448 |
| `assets/t2/*.png` | 13 | delivery masters; `ChatGPT Image Aug 5…03_04_48.png` is `covers/t2-07.jpg` |
| `assets/t3/*.png` | 11 | delivery masters, `ChatGPT Image …` filenames |
| `assets/banners/*.jpg` | 10 | 2880×686 protocol banners, complete set, nothing links them |
| `assets/media-*.webp` etc. | 13 | see below |

**Nine of the `media-*` files are byte-different duplicates of each other**: `media-06`↔`media-16`,
`07`↔`17`, `09`↔`19`, `10`↔`20`, `11`↔`21`, `12`↔`22`, `13`↔`23`, plus
`sr-v22-somatic-protocol-illustrations.webp`↔`sr-v23-somatic-transparent-illustrations.webp`.
Identical pixels; the high-numbered copy is 10× the file size (e.g. 39 KB vs 370 KB). **3.9 MB of
pure duplication, none of it referenced.**

### 2.7 Referenced but absent — 15, none live

All verified over HTTP (13 return 404; two are documentation patterns). **Every one is inside an
HTML or CSS comment.** Not defects — SR-059's `NEEDS ART` placeholders, deliberately commented so
an uncommented `<img>` never renders a broken glyph:

`assets/method/{method-hero,guided-session,porges-band,heartmath-band,kross-band,mate-band,jung-band,watts-band,res-somatic}.jpg` ·
`assets/anxiety-hero.webp` · `assets/archive-banner.jpg` · `assets/dashboard/journal-banner.jpg` ·
`assets/pangolin-clearing.jpg`.

`assets/covers/NN.jpg` (dashboard.html:14, :796) and `assets/covers/__SENTINEL_DOES_NOT_EXIST__.jpg`
(RUN-D.md) are documentation strings, not paths.

**One real gap, and it is not in this list because there is no path to be absent:**
`TRACKS[3].art.band` declares `ratio: '1400/380'` and **no `src`**. `assets/journey/t3-band.jpg`
does not exist. §6.2.

### 2.8 Brand direction across the full set

Reviewed every editorial frame and all thirty covers.

**The drift you flagged holds. It is not specific to those deliveries.** Four of twelve track
editorial images stage affluence rather than regulation:

| file | what is in frame |
|---|---|
| `t1/change.jpg` | man with a motorcycle outside a large modernist house, golden hour |
| `t2/hero.jpg` | couple with cocktails on a terrace above a Mediterranean bay |
| `t3/hero.jpg` | open-plan tech office, sticky-note whiteboard, code on monitors |
| `t3/change.jpg` | man in a suit on a terrace above an infinity pool and coastline |

Add `t3-01.jpg` (suit, skyline, sunset, corner office) and `t3-07.jpg` (long coat, glass tower)
from the covers and the pattern is consistent: **where the brief asks for a regulated state, the
frame delivers an achieved lifestyle.** Track 03 is the worst affected because "professional"
was read as "executive".

**What is working, and should be the reference for anything commissioned:**

- **All ten Track 01 covers.** Natural light, real faces, no props, no setting doing the work.
  Calm, human, unstaged. This is the brand.
- **Every `cost` and `range` triptych across all three tracks.** Restrained, emotionally
  intelligent, genuinely observational — `t3/range.jpg` (the same clinician braced, settled,
  absent) is the strongest thing in the set.
- **`pt/cost-triptych.webp` and `pt/nervous-system-range.webp`.**
- **`pt/corridor.webp`** — architectural, quiet, no person performing an emotion.

**Not seen anywhere:** dated wellness cliché (no lotus poses, no sunbeams-through-leaves), heavy
filtering, or overly dramatic emotional performance. The problem is aspiration, not artificiality.

---

## 3 · Homepage — `index.html`

**Finding: the top-level landing page contains no photographs at all.**

Measured at 1440×900 with all ten overlays excluded:

- `<img>` elements outside `.prog-overlay`: **0**
- elements with a CSS `background-image` outside `.prog-overlay`: **0**
- inline `<svg>`: **619**

Every photograph on `index.html` lives inside an overlay that requires a click. Above the fold
the page is type, rule and vector only.

The one image asset the top level *does* carry is invisible: **ten inline base64 JPEG LQIP
placeholders**, 0.01 MB total, sitting as `background-image` behind the Track 01 cover tiles at
262×349. That is correct practice and the only inline base64 on the site that earns its place.

`assets/covers/banner.jpg` / `.webp` / `-320` / `-640` — a complete responsive set — is
referenced by nothing.

**Status: KEEP** (nothing to fix in the image layer). The absence of homepage imagery is a design
question, not an asset defect, and is out of scope here.

---

## 4 · Track 01

### 4.1 `personal-transformation.html` — the standalone page

Every declared ratio in `TRACKS[1].art` matches its file exactly, so `object-fit: cover` is a
**no-op** on all five section slots. There is no crop to adjust.

| file | file px | ratio | desktop rect | mobile rect | fit / pos | crop | status |
|---|---|---|---|---|---|---|---|
| `t1/hero.jpg` | 2400×1000 | 2.400 | **1180×630** (bg) | **344×143** (img) | `cover` / `50% 50%` | desktop **22% of width cut**, 11% each side · mobile **none** | KEEP |
| `journey/t1-band.jpg` | 1400×380 | 3.684 | 1178×320 | 300×81 | `cover` / `50% 50%` | none | KEEP |
| `t1/cost.jpg` | 1600×700 | 2.286 | 1060×464 | 300×131 | `cover` / `50% 0%` | none | KEEP |
| `t1/range.jpg` | 1600×600 | 2.667 | 1060×398 | 300×113 | `cover` / `50% 50%` | none | KEEP |
| `shared/four-steps.jpg` | 1600×500 | 3.200 | 1060×331 | 300×94 | `cover` / `50% 50%` | none | KEEP |
| `t1/change.jpg` | 1600×700 | 2.286 | 1060×464 | 300×131 | `cover` / `50% 50%` | none | **REPLACE** — §2.8 |
| `covers/01–10.jpg` ×10 | 900×1200 | 0.750 | 236×315 | 236×315 | `cover` / `50% 50%` | none | **REPLACE** — §2.2 |

**Hero, both breakpoints — confirmed as designed.** `saferise-system.css` documents it and the
measurement matches: at ≥1024 the photo is layer 3 of a four-layer `background` (glow, scrim,
photo, base) on `.sr-tp-hero` at 1180×630, cropping 11% off each side; below 1024 it stops being
a background and becomes a real `<img>` at 344×143 — **2.406:1 against a 2.400:1 file, so
uncropped.** One correction of terminology: "full-bleed" here means full width of the 1180px page
shell, not of the viewport.

**Hero is fetched twice per desktop load.** `assets/t1/hero.jpg` (675 KB) is present both as the
CSS background *and* as the `<img>` that the mobile layout uses, collapsed to `0×0` at desktop but
still downloaded and decoded. Verified in the network log: two `GET … → 200 OK` for the same URL
on one page load. Same on Track 03 (`t3/hero.jpg`, 686 KB).

**Covers are delivered at 3.8× the size they render, with no responsive path.** The markup is
`<img class="sr-pcover-img" src="assets/covers/01.jpg" … onerror="this.remove()">` — **no `srcset`,
no `<picture>`** — so a 900×1200 / 122 KB file fills a 236×315 box. The variants exist
(`01-320.webp` is 7 KB) and `index.html`'s overlay uses them. **1.2 MB per page load, and it is
the same 1.2 MB on a 390px phone.** Status: RESIZE/REEXPORT — no new asset needed, the files are
already there.

Note `onerror="this.remove()"`: a 404 removes the element silently. Correct as a degrade, but it
is another surface where a missing image produces no signal.

**Multi-panel composites collapse at mobile.** These are three- and four-panel diagonal-split
triptychs rendered edge to edge:

| file | panels | mobile width | per panel |
|---|---:|---:|---:|
| `shared/four-steps.jpg` | 4 | 300 px | **75 px** |
| `t1/cost.jpg` | 3 | 300 px | 100 px |
| `t1/range.jpg` | 3 | 300 px | 100 px |
| `journey/t1-band.jpg` | 3 | 300 px | 100 px |

At 75 px a panel is a thumbnail of a face. The composition carries the argument — *the same
person, three states* — and at that width the argument is not legible. Status: **CROP ADJUSTMENT**
(art-directed stacked mobile variants), not a re-shoot.

### 4.2 `index.html` → `prog-personal` — the second copy

| file | file px | ratio | rect | fit / pos | crop | status |
|---|---|---|---|---|---|---|
| `pt/journey-triptych.webp` | 1600×914 | 1.750 | 980×560 | `fill` / — | none (1.750 = 1.750) | KEEP |
| `pt/cost-triptych.webp` | 1600×533 | 3.000 | 980×246 | `cover` / `50% 0%` | **~1% height**, top-aligned | KEEP |
| `pt/nervous-system-range.webp` | 1600×639 | 2.504 | 980×391 | `fill` / — | none | KEEP |
| `pt/protocol-foundation.webp` | 1600×533 | 3.000 | 980×326 | `fill` / — | none | KEEP |
| `pt/corridor.webp` | 1600×533 | 3.000 | 980×598 | `cover` / `100% 50%` | **45% of width cut**, right-anchored | CROP ADJUSTMENT |
| `pt/protocols/anxiety-journey.webp` | 2172×724 | 3.000 | in-carousel | `cover` / `50% 43%` | minor | KEEP |
| `covers/NN-640.webp` ×10 | 640×853 | 0.750 | 260×347 in a 262×349 tile | `cover` / `50% 50%` | none | REPLACE — §2.2 |

`pt/corridor.webp` at `object-position: 100% 50%` into a 1.639:1 box discards **45% of the
frame's width** and keeps only the right edge. The walking figure sits at ~72% width and survives,
but the corridor — the whole point of the image — does not. Worth a look; not urgent.

**The cover delivery here is correct and is the model for §4.1**: `<picture>` with a WebP
`<source>` at 320/640/900 and `sizes="(max-width:680px) 45vw, 262px"`. It resolves `-640.webp`
(19 KB) on a 2× display where the standalone page ships 122 KB.

---

## 5 · Track 02

`relationship-healing.html` renders through the same `SafeRiseTrack.render()` path as Track 01,
so the geometry is identical. All declared ratios match their files; no crop on any section slot.

| file | file px | ratio | desktop rect | fit | crop | status |
|---|---|---|---|---|---|---|
| `t2/hero.jpg` | 2400×1000 | 2.400 | 1180×~630 (bg) | `cover` | 22% width, desktop only | **REPLACE** — §2.8 |
| `journey/t2-band.jpg` | 1400×380 | 3.684 | 1178×320 | `cover` | none | KEEP · 4:2:0 |
| `t2/cost.jpg` | 1600×700 | 2.286 | 1060×464 | `cover` | none | KEEP · 4:2:0 |
| `t2/range.jpg` | 1600×600 | 2.667 | 1060×398 | `cover` | none | KEEP |
| `shared/four-steps.jpg` | 1600×500 | 3.200 | 1060×331 | `cover` | none | KEEP |
| `t2/change.jpg` | 1600×700 | 2.286 | 1060×464 | `cover` | none | KEEP · 4:2:0 |
| `covers/t2-01–10.jpg` ×10 | 1086×1448 | 0.750 | 236×315 | `cover` | none | **REPLACE** — §2.2 |
| `covers/t2-banner.jpg` | 1654×630 | 2.625 | 1440×549 in overlay | `cover` | none | KEEP · 4:2:0 |

**Track 02 covers are 4.6× oversampled with no responsive path** — 1086×1448 files, ~250 KB each,
into a 236×315 box. Worse than Track 01 because these were never downscaled: the T1 covers ship at
900×1200 (a downscale of the 1086×1448 masters in `assets/covers/*.png`) while T2/T3 ship the
master resolution directly. **`relationship-healing.html` is the heaviest page on the site at
4.97 MB of imagery.**

**`index.html` → `prog-couples` carries no editorial imagery at all** — ten covers plus
`t2-banner.jpg` (1440×549, no crop) and nothing else. The overlay's "What's Included", cost and
change sections are type-only where the standalone page has photographs.

**Brand:** `t2/hero.jpg` is the clearest single instance of the drift — two people with cocktails
on a terrace above a Mediterranean bay, which reads as a holiday, not as a relationship under
repair. The Track 02 covers themselves are largely good; `t2-03.jpg` (a couple asleep in a car at
sunset) and `t2-04.jpg` (matching athleisure, back-to-back on a headland at pink hour) are the two
that lean staged.

---

## 6 · Track 03

### 6.1 `professional-performance.html`

| file | file px | ratio | desktop rect | fit / pos | crop | status |
|---|---|---|---|---|---|---|
| `t3/hero.jpg` | 2400×1000 | 2.400 | **1180×658** (bg) + a 0×0 `<img>` | `cover` / `50% 50%` | **25.3% of width cut**, 12.7% each side | **REPLACE** — §2.8 |
| `journey/t3-band.jpg` | — | 1400/380 declared | 1180×322 placeholder | — | — | **MISSING** — §6.2 |
| `t3/cost.jpg` | 1600×700 | 2.286 | 1060×464 | `cover` / `50% 0%` | none | KEEP |
| `t3/range.jpg` | 1600×600 | 2.667 | 1060×398 | `cover` / `50% 50%` | none | KEEP |
| `shared/four-steps.jpg` | 1600×500 | 3.200 | 1060×331 | `cover` / `50% 50%` | none | KEEP |
| `t3/change.jpg` | 1600×700 | 2.286 | 1060×464 | `cover` / `50% 50%` | none | **REPLACE** — §2.8 |
| `covers/t3-01–10.jpg` ×10 | 1086×1448 | 0.750 | 236×315 | `cover` / `50% 50%` | none | **REPLACE** — §2.2 |

The Track 03 hero panel is 658 px tall against Track 01's 630, so its crop is tighter: **25.3% of
the frame's width is discarded at desktop** versus 22.0%. Uncropped at mobile, same as Track 01.

### 6.2 The Track 03 journey band has no asset, and its art brief is visitor-facing

`TRACKS[3].art.band` declares `ratio: '1400/380'` and carries **no `src`**. `slot()` in
`js/saferise-track.js:82–91` emits the `<span>` label alone when there is no source, so what
renders at 1180×322 is a dashed-border placeholder containing:

> *"corridor moments before the room, desk log, reading at day's end"*

That is art direction, and it is on a public page. Tracks 01 and 02 have `t1-band.jpg` and
`t2-band.jpg`; Track 03 does not. **Provision `assets/journey/t3-band.jpg` at 1400×380.**

The same `<span>` sits behind all four of the other slots and is correctly covered by the image
(verified: the brief's rect is contained by the image's rect on all four). If any of those files
404s, `onerror="this.remove()"` removes the image and the brief becomes visible — the documented
degrade, and worth knowing it is one 404 away on every track page.

### 6.3 `index.html` → `prog-corporate` — the portrait-as-banner crop

`prog-corporate` carries ten covers plus `t3-banner.jpg` (1654×630 → 1440×549, no crop) and no
editorial imagery.

Opening a protocol swaps to `#corporate-protocol-page`, which renders **`covers/t3-01.jpg`
(1086×1448 portrait) as a 1440×343 banner**. `cover` at 4.198:1 keeps **17.9% of the source
height**, centred. On a full-length standing portrait that band lands across the torso. And it is
`t3-01` regardless of which protocol is open.

Status: **CROP ADJUSTMENT** — the slot needs a landscape asset, not a portrait cover.

---

## 7 · Dashboard and product experience

### 7.1 Route in — no auth exists, everything is directly reachable

There is no authentication anywhere in the tree. Every product surface is a static file served
from the root and opens on a direct GET. **No surface is UNREACHABLE.**

| surface | URL | notes |
|---|---|---|
| Dashboard | `dashboard.html` | opens fully; `#route=<key>` opens a rail destination (`coaching`, `method`, `account`, `dashboard`) |
| Protocol page | `protocol.html?track=N&protocol=NN` | `protocol` is the **two-digit number**, not a slug. `?protocol=anxiety-reset` renders the SR-182 not-found state. With no params the page keeps its authored Track 01 content |
| Resource reader | `resource.html` | opens directly; `?theme=sunrise` switches theme |
| Embedded chrome | `…?embed=1` on `protocol.html` / `resource.html` | drops the page's own nav and footer and posts height to the parent — how the dashboard frames them |
| Method pages | `method.html`, `method-{porges,heartmath,kross,mate,jung,watts}.html` | direct |
| Getting help | `getting-help.html` | direct — **zero images** |

Seeded `localStorage` is not needed for any image to render. Every measurement below is from a
cold, unauthenticated load.

### 7.2 `dashboard.html`

| file | file px | ratio | rect | fit / pos | crop | status |
|---|---|---|---|---|---|---|
| `dashboard/hero-corridor.jpg` | 1500×499 | 3.006 | 1292×331 | `cover` / `64% 42%` | **23% of height cut** — ~48 px off the top, ~57 px off the bottom | RESIZE/REEXPORT |
| `covers/01–10.jpg` ×10 | 900×1200 | 0.750 | 174×233 | `cover` / `50% 50%` | none | REPLACE — §2.2 |

`hero-corridor.jpg` is the same photograph as `pt/corridor.webp` at a second path (§2.1), at
**q≈78 and 4:2:0** — the lowest-quality asset on any live surface, and it is the first thing a
member sees. Re-export from the same source at q94 4:4:4, or point the dashboard at
`pt/corridor.webp`.

**Covers are 5.2× oversampled here** — the steepest ratio on the site — with no responsive path.

One defect, minor: `<img class="sr-dash-resultthumb" id="srResultThumb" src="" …>` carries an
**empty `src`**, which makes `currentSrc` resolve to `dashboard.html` itself and fires the
element's `onerror` on every load. Verified in the network log that Chromium issues **no extra
request** — modern engines treat `src=""` as a no-op — so there is no bandwidth cost today. It is
invalid markup with a latent cost in older engines, and it is masked by `onerror="this.hidden=true"`
exactly the way SR-261 describes.

### 7.3 `protocol.html` — 73.6% of a 4.59 MB file is inline base64 PNG

Measured at `?track=3&protocol=05` (The Performance Anxiety Protocol). **No file-based image
loads at all.** Two inline PNGs, both `mode=RGB`, both hardcoded and therefore identical on all
thirty protocols:

| what renders | inline size | dimensions | identical on disk to | disk size | overhead |
|---|---:|---|---|---:|---:|
| `<img class="journey-new">` | **1.68 MB** PNG | 2172×724 | `pt/protocols/anxiety-journey.webp` (hamming **0**) | **60 KB** | **28×** |
| `.sechead` background ×2 | **1.69 MB** PNG | 1086×1448 | `covers/01.png` = `covers/01.jpg` = `01.webp` | **32 KB** (webp) | **53×** |

**3.38 MB inline against 92 KB of files that already exist.** `js/saferise-track.js:92` carries the
comment *"Covers are path references. No inline base64 anywhere on this page."* — the standard is
already written down; `protocol.html` predates it.

Two further consequences of the payloads being hardcoded:

- **A Track 03 protocol page renders Track 01's cover and Track 01's Anxiety Reset journey band.**
- `.sechead` is 1018×215 (**4.735:1**) and the payload is a 0.75:1 portrait, so `cover` keeps
  **15.8% of the source height** at `50% 46%`. §2 finding C.

Status: **RESIZE/REEXPORT**, priority 1.

### 7.4 `resource.html` — the same pattern, smaller

0.22 MB file, **0.10 MB inline base64 JPEG (46.3%)**. Two payloads, and they are **the same
payload twice** — cover 01 at 900×1200, 52 KB each. 0.05 MB duplicated outright.

It renders as the background of `.sr-cover` at **1130×196 (5.765:1)** with `background-position:
50% 42%`, keeping **13.0% of the source height** — the tightest band on the site.

Status: **RESIZE/REEXPORT**. `covers/01-320.jpg` (21 KB) already exists.

### 7.5 Method pages

- `method.html` — **zero raster images**, 12 inline SVG. Two art slots present and empty. SR-059
  holds: every real `<img>` is commented out beside its `NEEDS ART` spec.
- `method-porges.html` — the only method page with live imagery: `covers/01.jpg` and
  `covers/07.jpg`, both at **419×235 (1.783:1)** from a 0.75:1 portrait. `cover` keeps **42.1% of
  the source height**, centred. Tighter than a card, far looser than the §7.3/§7.4 bands. **The
  burned-in wordmark falls outside this crop** — the only surface where it does. Status: KEEP.
- The other five method pages render no raster imagery.

### 7.6 Guided meditation, progress, journal, premium and coaching areas

Reached through `dashboard.html` (`#route=coaching`, `#route=account`) and the embedded
`protocol.html` / `resource.html` panes. **None of these areas carries any image asset of its
own.** They are type, inline SVG and the shared cover art already inventoried above. Not
UNREACHABLE — reached, and empty of images.

---

## 8 · Protocol covers — all thirty

### 8.1 Consistency

| property | Track 01 | Track 02 | Track 03 | verdict |
|---|---|---|---|---|
| aspect ratio | 0.750 | 0.750 | 0.750 | **consistent, all thirty** |
| file dimensions | 900×1200 | 1086×1448 | 1086×1448 | **inconsistent** — T1 downscaled on export, T2/T3 not |
| responsive variants | 320/640/900 in JPEG + WebP | none | none | **inconsistent** |
| container | JPEG (+ WebP, PNG master) | JPEG (+ PNG master) | JPEG (+ PNG master) | consistent |
| chroma | 4:4:4 | 4:4:4 | 4:4:4 | **consistent** |
| mean luminance | 40.8 – 170.2 | 49.5 – 111.5 | 22.4 – 78.4 | T3 markedly darker |
| burned-in wordmark | 10/10 | 10/10 | 10/10 | **30/30 — REPLACE** |

**Lighting and tone.** Track 01 is the most coherent set on the site: natural light, golden hour
or overcast, single subject, eyes closed or middle distance, no props. Track 02 is warmer and
more interior, and drifts toward couples-stock in three frames. Track 03 is much darker
(mean 22.4–78.4 against Track 01's 40.8–170.2) and reads as corporate rather than regulated —
suits, glass towers, night skylines in six of ten.

**Subject placement.** Consistent and correct across all thirty: the subject occupies the centre
and upper two-thirds, faces are in the upper half, and the lower third is ground, sky or blur.
The 3:4 card crop is exact, so nothing is lost on the card.

### 8.2 The overlay quadrants — measured

The site draws a number in the top left and a label in the lower right. Both zones were sampled
on all thirty (top-left = 0–42% × 0–22%; bottom-right = 55–100% × 86–100%) for mean luminance and
standard deviation. High σ means detail behind the type.

**Bottom right — clear on 29 of 30, but occupied.** σ > 38 on only `t2-05.jpg`. Mean luminance
10–77 on 28 of 30, so it is reliably dark and a light label will hold contrast. **But the
burned-in `SAFERISE` sits in exactly this zone on all thirty.** The quadrant is geometrically
clear and typographically taken. Any drawn label lands on or beside a second wordmark.

**Top left — busy on 14 of 30.** These have σ > 38, meaning the number is drawn over subject or
high-contrast detail:

`02` · `t2-01` · `t2-02` · `t2-03` · `t2-04` · `t2-05` · `t2-06` · `t2-08` · `t2-10` ·
`t3-01` · `t3-02` · `t3-06` · `t3-07` · `t3-09`

Track 02 is the worst affected — **8 of 10**.

**Top-left luminance spans the full range**, which is the harder problem: `t3-05.jpg` reads **2.8**
(near-black) and `05.jpg` reads **217.0** (near-white), with `02.jpg` at 199.0 and `t2-09.jpg` at
205.3. **No single overlay colour can hold 4.5:1 across that span.** Either the number needs a
per-cover treatment (a local scrim, a mix-blend mode, or a token per cover) or the covers need a
consistent dark corner. This is separate from the wordmark and survives fixing it.

### 8.3 Covers used outside the card

Four surfaces reuse a 3:4 portrait in a landscape slot. Ranked by severity:

| surface | slot | ratio | source height kept |
|---|---|---:|---:|
| `resource.html` `.sr-cover` | 1130×196 | 5.765:1 | **13.0%** |
| `protocol.html` `.sechead` | 1018×215 | 4.735:1 | **15.8%** |
| `index.html` `#corporate-protocol-page` | 1440×343 | 4.198:1 | **17.9%** |
| `method-porges.html` slot | 419×235 | 1.783:1 | 42.1% |

The first three are the finding. A 13–18% horizontal band through a standing portrait is not a
crop of the photograph, it is a different photograph.

---

## 9 · Replacement priority list

**P1 — should not ship as they are**

1. **Re-render all thirty protocol covers without the `SAFERISE` wordmark.** 30 files. The
   masters carry it, so re-export will not help. While re-rendering, hold a dark, low-detail
   top-left corner so the drawn number has one contrast target across the whole set (§8.2).
2. **Repoint `protocol.html` at files instead of inlining 3.38 MB of base64 PNG.** Both payloads
   already exist on disk at 60 KB and 32 KB. Removes 3.38 MB from a 4.59 MB page and fixes the
   fact that every protocol shows Track 01's artwork.
3. **Repoint `resource.html` at `covers/01-320.jpg`** and drop the duplicated inline payload.

**P2 — visible brand damage**

4. **Replace `t3/hero.jpg`** — whiteboard of code, open-plan office. Furthest from brief on the
   site.
5. **Replace `t3/change.jpg`** — suit above an infinity pool.
6. **Replace `t2/hero.jpg`** — cocktails on a terrace.
7. **Replace `t1/change.jpg`** — motorcycle outside a modernist house.
8. **Reconsider `t3-01`, `t3-07`** (and review the rest of Track 03) against the Track 01 covers,
   which are the reference.

**P3 — crop and slot**

9. **Provision a landscape asset for the protocol-page banner slot** — 1440×343-class, ~4.2:1 —
   so `protocol.html`, `resource.html` and `#corporate-protocol-page` stop cropping portraits to
   13–18% bands.
10. **Provision `assets/journey/t3-band.jpg` at 1400×380** — removes the visitor-facing art brief.
11. **Art-direct mobile variants for the multi-panel composites** — `four-steps` at 75 px per
    panel is the worst; the three triptychs at 100 px follow.
12. **Reconsider `pt/corridor.webp`'s `object-position: 100% 50%`**, which discards 45% of the
    frame's width.

**P4 — hygiene**

13. **Re-export the 22 4:2:0 JPEGs at 4:4:4**, starting with `dashboard/hero-corridor.jpg`
    (q≈78, first thing a member sees) and the two `banner-320/640.jpg` (q≈81).
14. **Give Track 02 and Track 03 covers the responsive treatment Track 01 already has** —
    320/640/900 in WebP + JPEG. Saves ~4 MB across two pages.
15. **Add `srcset` to the standalone track pages' covers.** The variants exist and are unused
    there; `index.html`'s overlay already does it correctly.
16. **Remove the duplicate `<img>` hero fetch** on the track pages (675–686 KB downloaded twice
    per desktop load).
17. **Prune 61.4 MB of unreferenced assets** — or move the delivery masters out of the deployed
    tree. Nine `media-*` pairs are byte-different duplicates at 10× size.
18. **Fix `dashboard.html`'s `<img src="">`.**
19. **Unify cover master dimensions** — 900×1200 or 1086×1448, not both.

---

## 10 · Provisioning checklist

Rules first, because each one has already cost rework.

### Non-negotiable

- [ ] **Exact path.** The path in the record is a claim the asset exists. `TRACKS[3].art.band`
      declares a ratio with no `src` and renders an art brief to the public as a result.
- [ ] **Exact dimensions**, matching the declared `ratio` in `content/tracks.js`. Every current
      section slot matches exactly, which is why there is no crop to fix on any of them — that is
      the standard, and it works.
- [ ] **JPEG, quality 94, chroma 4:4:4** unless transparency is genuinely needed. Subsampling
      shows on hairlines and type. 22 files currently ship 4:2:0.
- [ ] **A PNG renamed `.jpg` is not a JPEG.** Verify the container from the bytes, never the
      extension. The same error in a new envelope: `protocol.html` ships 3.38 MB of `mode=RGB`
      PNG inside `data:` URIs.
- [ ] **No text of any kind in frame.** No wordmark, no caption, no UI, no signage. 30 of 30
      covers currently fail this, in the masters as well as the exports.
- [ ] **No inline base64 in a page.** `js/saferise-track.js:92` already states it: *"Covers are
      path references. No inline base64 anywhere on this page."* The one exception is a sub-2 KB
      LQIP placeholder, which `index.html` does correctly.

### Per-asset acceptance

- [ ] File opens in PIL; reported format matches the extension.
- [ ] Dimensions match the slot's declared ratio to the pixel.
- [ ] `Image.open(f).mode == 'RGB'` — no stray alpha on an opaque photograph.
- [ ] Chroma subsampling reads `4:4:4`.
- [ ] All four corners under 4:1 contrast against `#08080C`, **or** the slot has a live scrim.
      `.sr-tp-ph`'s `::before`/`::after` are `content: none` — the scrim rules are inert, so
      section slots have no scrim to rely on.
- [ ] Fetched over HTTP: `200` and `image/*`. A background-image 404 is silent.
- [ ] Measured in the browser: rendered rect asserted against the **layout box**, walking up past
      any `display:contents` wrapper.
- [ ] Measured at **both** breakpoints. The hero is a cropped background at ≥1024 and an uncropped
      stacked band below.
- [ ] Multi-panel composites: per-panel width at 390 px viewport is ≥ 120 px, or a stacked mobile
      variant is supplied.

### Slots currently open

| path | dimensions | ratio | for |
|---|---|---|---|
| `assets/journey/t3-band.jpg` | 1400×380 | 3.684 | Track 03 journey band — **currently renders its art brief** |
| *(new)* protocol-page banner, per protocol | ~1440×343 | ~4.2:1 | ends the 13–18% portrait crop on three surfaces |
| `assets/method/method-hero.jpg` | per `NEEDS ART` spec | — | SR-059 |
| `assets/method/guided-session.jpg` | per spec | — | SR-059 |
| `assets/method/{porges,heartmath,kross,mate,jung,watts}-band.jpg` | 1340×360 | 3.722 | SR-059, six section bands |
| `assets/method/res-somatic.jpg` | per spec | — | SR-059, shared across six pages |
| six 200×200 framework symbol tiles | 200×200 | 1:1 | SR-059, reused at 88 px and 64 px |

### Re-render queue

30 protocol covers (wordmark) · `t1/change.jpg` · `t2/hero.jpg` · `t3/hero.jpg` · `t3/change.jpg`
(brand direction) — **34 frames**.

---

*Report ends. No image was created, cropped, re-exported or replaced. No copy, animation, layout,
navigation or interaction system was modified.*
