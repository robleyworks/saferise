# VIDEO — 1080p RESOLUTION RULING

Status: **resolved for 70 frames.** Standing rule established by measurement.
Date: 2026-09-23

---

## 1. The ruling

Every film frame must deliver **1920×1080 after crop**. That is now met by
70 conformed frames staged at `pass/_film-1080/`.

The instrument is **Lanczos resampling, no sharpening** — not an AI upscaler.
Runway's upscaler is neither needed nor wanted for this set. See §3.

**Standing rule (validated, replaces the earlier estimate):**

> A frame may be resampled up to **×1.31**. Beyond that, re-source it.
> Never sharpen a resampled frame.

Andre's original ">1.3× shows" instinct was correct. It is now measured.

---

## 2. What the measurement showed

Round-trip test: take a true 1920×1080 reference, downscale to simulate a
deficient source, resample back to 1920×1080, compare to the original.
Run on three detail-rich photographs (laplacian variance 414–1273), *not*
on the galaxy set — which turned out to be uniformly soft (variance ≤100)
and therefore useless as a proxy.

| deficit | PSNR | SSIM | high-frequency detail kept | verdict |
|---|---|---|---|---|
| ×1.08 | 44–50 | ≥0.998 | 72–99% | invisible |
| ×1.20 | 42–49 | ≥0.998 | 59–95% | invisible |
| **×1.31** | 38–45 | ≥0.992 | 48–88% | **limit — acceptable** |
| ×1.50 | 34–41 | ≥0.992 | 33–76% | starts to show |
| ×2.00 | 28–34 | 0.948–0.983 | 11–43% | visibly soft |
| ×3.25 | 24–31 | 0.849–0.966 | **2–9%** | destroyed |

**Sharpening does not recover information.** At ×3.25 an unsharp pass moved
detail from 3% to 4% while *lowering* PSNR. At low factors it pushed measured
detail to 177% of the original — i.e. it invents high-frequency energy that
was never there, which is the plasticky over-sharpened look. Hence: no
sharpening at any factor.

---

## 3. Why not the Runway upscaler

Two independent reasons, either sufficient:

1. **It is unreachable from the session.** The upload host
   (`runway-datasets.s3.us-east-1.amazonaws.com`) is refused by the egress
   policy — gateway answers 403 to CONNECT. The device shell has no outbound
   network at all. Reported, not routed around.
2. **It is the wrong instrument anyway.** It is generative: it hallucinates
   plausible detail, and `ultraDetail` defaults to 30. On a documentary film
   with real actors' faces, invented skin texture and hair is a real risk, and
   `photo` flavour is 2× only — so the ×3.25 cases would need two passes,
   compounding the invention. For the ≤×1.31 cases it is unnecessary; Lanczos
   is already invisible there.

So the blocked tunnel is **moot**. No Runway credits are needed for resolution.

---

## 4. What was produced

`pass/_film-1080/` (gitignored), JPEG q94 4:4:4 progressive, all 1920×1080:

| tier | count | note |
|---|---|---|
| `native/` | 34 | at or above 1080 already — no invention |
| `resampled/` | 36 | ×1.07–×1.31, measured invisible |
| rejected | 71 | above ×1.31 — **not** upscaled |

`manifest.json` records every source, its native size, its max 16:9 crop and
the exact factor applied.

**Crop review.** The automated centre crop was reviewed by eye, not assumed.
One frame was broken — `img-225-founder-dark.jpg` (1600×2000 portrait) was
decapitated by a centre band. Portrait and near-square sources (aspect < 1.45)
were re-cut with the band anchored at 22% from the top. Both re-cuts verified
visually. All other frames crop cleanly because they were already near-16:9.

---

## 5. What is still genuinely short

The **71 rejected frames are almost entirely site furniture** — 800×800 method
arena tiles, 900×1200 about portraits, 2880×686 protocol banners, 2360×800 org
bands. These were never film frames and need no action.

The one real gap is the **four supplied stills from the hero-film handover**,
cut from a 1774×887 triptych. Worst panel is 591×887 → a 16:9 crop of
591×332, needing **×3.25**, which keeps 2–9% of detail.

**These must not be upscaled.** The correct fix is the original files. If the
originals cannot be found, those four beats should be re-cast from the
conformed pool rather than shipped soft.

---

## 6. Note on the galaxy set

The 31 galaxy frames are native 1920×1080 but measure ≤100 laplacian
variance — soft by design (dark, atmospheric, defocused variants). They are
correct for the "hold still while a sentence lands" beats and survive any
handling. But they are *1080p in pixel count, not in information*, and should
not carry a beat that needs visible detail.
