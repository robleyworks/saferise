# Investor and sales collateral

The presentable set, corrected 24 September 2026. These are the documents that
go in front of investors and prospective buyers — the versions that live in
`~/Desktop/B2B:B2C/_v7/` on Andre's machine.

| File | Pages |
|---|---|
| `SafeRise-Investor-Teaser.pdf` | 1 |
| `SafeRise-Protocol-One-Page.pdf` | 1 |
| `SafeRise-Personal-Transformation-One-Pager.pdf` | 1 |
| `SafeRise-Investor-Collaboration-Brochure.pdf` | 3 |

The Investor Deck sits beside this folder at `../SafeRise-Investor-Deck.pptx`
and `.pdf` — it is a PowerPoint file and edits in place.

## Why `src/` exists

The previous versions of these four documents had **no surviving source**. They
had been produced by ReportLab, Chromium print-to-PDF and pypdf in sessions
whose working files were gone, so a one-word correction meant rebuilding the
whole document from its extracted text.

`src/` is that mistake not being repeated. Read `src/README.md` before editing.

**The rule that will bite you:** every page is a fixed 210 × 297 mm box with
`overflow:hidden`. Add two sentences and the footer silently drops onto a second
page, or disappears. Run `node measure.js <file>.html` after any edit — it must
report 0 — then render.

## What the corrections were

`AUDIT-2026-09-24.md` in this folder is the full finding. The short version:
the Teaser and Brochure opened on coaching-as-a-service, which
`../POSITIONING.md` §8 explicitly tells us to abandon; the Personal
Transformation one-pager carried a DESIGN MOCKUP marker and self-assigned 5/5
market-outlook scores; the Brochure read €29 as a live tier; and the deck used
*Fitness Mindset* and *Nutrition & Body* instead of the canonical
**Strength & Return** and **Embodied Nutrition**.

`claude/BUSINESS-DOCS-HANDOVER.md` records what was changed, the judgement calls
made, and the one open question about the clinical lead.
