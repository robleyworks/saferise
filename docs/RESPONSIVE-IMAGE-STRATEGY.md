# Responsive image strategy

**Decided 18 September 2026, from measurement.** This determines what gets
provisioned, so read it before generating any new asset.

Measured by loading ten pages at three viewports in Chromium, recording the
real transferred bytes of every image, the real displayed size from the DOM,
and re-encoding each file at the size that viewport actually needs.

---

## What the site does today

| Viewport | Image bytes downloaded | If each slot were served correctly | Waste |
|---|---|---|---|
| Mobile 390px @3× | **6.27 MB** | 2.26 MB | **64%** |
| Tablet 1024px @2× | 6.49 MB | 2.36 MB | 64% |
| Desktop 1440px @2× | 6.43 MB | 3.45 MB | 46% |

Across ten pages. Two thirds of everything a phone downloads in images is waste.

Worst pages on mobile:

| Page | Actual | Ideal | Saved |
|---|---|---|---|
| dashboard | 1.67 MB | 0.49 MB | 1.18 MB |
| organisations | 1.36 MB | 0.37 MB | 0.99 MB |
| personal-transformation | 1.02 MB | 0.20 MB | 0.82 MB |
| method | 0.41 MB | 0.03 MB | 0.38 MB |
| plans | 0.50 MB | 0.25 MB | 0.25 MB |
| protocol | 0.23 MB | 0.23 MB | — already correct |

---

## The decisive finding: it is mostly FORMAT, not size

Splitting the two causes on the worst fourteen slots:

- **Serving WebP instead of JPEG: 76% of the win**
- **Serving the right dimensions: 24%**

And a large part of the format win needs **no new files at all** — the `.webp`
siblings already exist on disk and the markup loads the `.jpg` anyway.

| Referenced raster files | Count | Action |
|---|---|---|
| Already WebP | 67 | nothing |
| JPEG/PNG **with** a `.webp` sibling on disk | **34** | markup change only — **6.45 MB** |
| JPEG/PNG **without** one | **35** | generate once — **3.50 MB** |

**Total format win: ~9.95 MB across the library, for one batch job and a
markup pattern.** That is the whole answer to "what matters before we generate
more variants."

---

## Order of work

### 1 · Use the siblings that exist — 34 files, 6.45 MB, no new assets

Wrap in `<picture>` so the browser picks:

```html
<picture>
  <source srcset="assets/home/panel-t2.webp" type="image/webp">
  <img src="assets/home/panel-t2.jpg" width="2400" height="1000" alt="" decoding="async" loading="lazy">
</picture>
```

Worst offenders, all with the `.webp` already sitting there unused:
`home/film-poster.jpg` 406K→77K · `home/panel-t2.jpg` 320K→75K ·
`home/panel-t3.jpg` 271K→51K · `covers/03-640.jpg` 93K→32K ·
`covers/08-640.jpg` 89K→30K · `covers/02-640.jpg` 83K→29K

### 2 · Generate the 35 missing WebP — 3.50 MB

One batch. **Two encoder settings, and the difference matters:**

- **25 opaque files** → WebP quality 78, method 5.
- **10 files carry transparency** → WebP quality 80 **with alpha preserved**.
  These are the galaxy subject cutouts. Encoding them as RGB drops the alpha
  and destroys the cutout. It also makes the saving look three times better
  than it is — measured naively at 4.49 MB, the honest figure with alpha kept
  is 3.50 MB.

```bash
# opaque
cwebp -q 78 -m 5 in.jpg -o in.webp
# transparency
cwebp -q 80 -m 5 -alpha_q 100 in.png -o in.webp
```

Biggest: `galaxy/t3-08-subject.png` 433K→157K (alpha) ·
`galaxy/t3-08-clear.jpg` 326K→126K · `galaxy/t3-10-clear.jpg` 240K→75K ·
`coming/band-live-session.jpg` 185K→53K ·
`coming/band-relationship-healing.jpg` 186K→55K

File list: `docs/webp-worklist.json`.

### 3 · Then dimensions — the remaining 24%

Only worth it where the dimensional waste is material after the format fix.
These are already WebP, so their entire waste is size:

| File | Served | Needed at 390px@3× |
|---|---|---|
| `assets/t1/hero.webp` | 196 KB | 60 KB |
| `assets/coming/coming-hero.webp` | 120 KB | 25 KB |
| `assets/home/door-t3.webp` | 88 KB | 63 KB |
| `assets/coming/band-04.webp` | 83 KB | 52 KB |

**Do not** put srcset on everything. It multiplies the asset count and the
build cost for a quarter of the benefit. Apply it to full-bleed heroes, bands
and panels — the slots whose displayed width changes a lot between phone and
desktop. Covers shown at a fixed 131px do not need it; one well-sized file
does.

---

## The width ladder

Derived from measured displayed sizes, not invented:

| Slot | Displayed | Generate at |
|---|---|---|
| Cover / tile | 131px | **320, 640** |
| Carousel band | 268–358px | **640, 1080** |
| Home panel | 326–328px | **640, 1080** |
| Full-bleed hero | 390px → 1440px | **640, 1280, 2880** |
| Section band | 1024px → 1440px | **1280, 2880** |
| Galaxy plate | fixed 962×541 stage | **1920** only |

Standard ladder where a slot does not fit the above: **320 · 640 · 1280 ·
1920 · 2880**.

```html
<picture>
  <source type="image/webp"
          srcset="assets/coming/band-04-640.webp 640w,
                  assets/coming/band-04-1080.webp 1080w"
          sizes="(max-width: 700px) 92vw, 268px">
  <img src="assets/coming/band-04.jpg" width="1200" height="640" alt="" …>
</picture>
```

`sizes` must describe the CSS width the slot occupies, not the file width.
Getting `sizes` wrong is worse than omitting srcset — the browser will pick
the largest candidate.

---

## What every new asset must ship as, from tomorrow

1. **WebP as the primary**, original format as the `<picture>` fallback.
   Never WebP alone — the fallback is the compatibility floor.
2. **Transparency stays PNG as the fallback**, WebP-with-alpha as the primary.
3. **Only the widths in the ladder above**, and only for slots in §3. A fixed
   -size slot gets one file.
4. **`width` and `height` attributes** on every `<img>`, set to the intrinsic
   pixel size of the fallback file. All 188 `<img>` tags currently lack them,
   which is the page-jump on load.
5. Quality: WebP 78 opaque, 80 with alpha; JPEG 82; PNG only where alpha is
   needed.

---

## What this replaces

The design audit of 18 Sep said "the srcset variants exist but several slots
pick the wrong one because `sizes` is missing." That was wrong. There is
exactly **one** `srcset` in the entire site — a single-candidate `<source>` in
`dashboard.html:133` — and the 120 `-320`/`-640` variant files are selected by
JS string concatenation in that one file and nowhere else. There was no
responsive strategy to fix; there was none at all.

The same audit called thirteen images "oversized, costing bandwidth". They
total 1.2 MB between them. Oversized in pixels, not in weight. Ignore that row.
