# Source for the corrected B2B:B2C documents

Built 24 September 2026. These are the sources the four PDFs in `_v7/` were
rendered from. **Keep them.** The previous versions of these documents had no
surviving source, which is why they had to be rebuilt rather than edited.

## Files

| Source | Produces |
|---|---|
| `teaser.html` | SafeRise-Investor-Teaser.pdf — 1 page |
| `onepager.v7.html` | SafeRise-Protocol-One-Page.pdf — 1 page |
| `pt.html` | SafeRise-Personal-Transformation-One-Pager.pdf — 1 page |
| `brochure.html` | SafeRise-Investor-Collaboration-Brochure.pdf — 3 pages |
| `_base.css` | Shared type, palette and components for the three rebuilt documents |
| `img/` | Banner and the B2C/B2B/role/industry photography |
| `cov/` | All thirty protocol covers at 320px |

The Investor Deck is not here — it is a `.pptx` and edits in place.

## Rendering

Chromium via Playwright, A4, print backgrounds on.

```
node render.js teaser.html   out.pdf  out.png
node measure.js teaser.html            # reports per-page overflow in px
```

`onepager.v7.html` uses `topdf-v7.js` instead, which carries its own paths.

## The one rule that will bite you

**Every page is a fixed 210 × 297 mm box with `overflow:hidden`.** Add two
sentences and the footer silently drops onto a second page, or vanishes.

So after any edit, run `measure.js` first. It reports overflow per page in
pixels. **It must read 0.** Only then render. All four documents currently sit
within a few pixels of full, so there is no slack — if you add something, take
something out.

## Where the copy comes from

- `docs/business/POSITIONING.md` — §3A the position, §4 the sentence and the
  refusal list, §6 the price book
- `docs/business/MASTER-TRACK-REGISTER.md` — canonical track names
- `docs/business/TRACK-PORTFOLIO-FORECAST.md` — which tracks are held and why

## Open item

The Protocol One-Page previously read *"Clinical lead attached — Dr. Keny F.
Bastien."* That claim contradicts the clinical hold recorded in
`TRACK-PORTFOLIO-FORECAST.md` and `POSITIONING.md` §7, so it was replaced with
the position that is defensible either way:

> **Clinical governance is a gate, not a footnote.** Four tracks stay unbuilt
> until a licensed clinician is contracted.

If the lead is in fact contracted, restore the named line — it is one bullet in
`onepager.v7.html` — and lift the holds in the forecast at the same time.
