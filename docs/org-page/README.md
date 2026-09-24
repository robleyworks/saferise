# Organisation page — developed material

Everything produced for `organisations.html` that was previously only in
`pass/` (gitignored) or in the claude.ai Project. Copied here 23 September 2026
so it survives outside a scratch folder.

**Nothing in this folder is served.** These are sources and records. The deploy
step is separate — see "Not yet deployed" below.

---

## What is here

| folder | contents |
|---|---|
| `source-images/f8-covers/` | Foundation 8 covers f01-f03, `as-supplied/` and `graded/`, 1086x1448, cover encoder. **One variant must be chosen for all three.** |
| `source-images/gap/` | `gap-moment` 1086x1358 for the Gap section, plus a graded variant. Ship as supplied — see PASS-I §7. |
| `source-images/twospace/` | `twospace-shared` / `twospace-private`, 1600x1000, exposure-matched to a shared target. PASS-I §8. |
| `source-images/pool-sheets/` | contact sheets used for selection, including `hr-banner-candidates.jpg` — the 21 banner-shaped images proofed for the HR band, none of which show the buyer. |
| `source-images/cover-remediation/` | Track 01 cover remediation set at 320/640/full. |
| `reference/` | `f8-tracks.json`, `b2b-protocols.json` and the two PASS-F reference HTML files the explorer and sections were ported from. |
| `mockups/` | the standalone HTML mockups: impact pathway, organisations sections, three layers, ways to work, what people receive. |
| `passes/` | the 18 execution briefs for this page, including PASS-I and PASS-J. |

---

## Not yet deployed

The images above are **not** in `assets/`, so the page does not use them. The
page currently references only four image files and the two-space section still
shows images reused from elsewhere on the same page.

Root cause and the full account: `claude/ORG-PAGE-INSTRUCTION-HANDOVER.md` §3.

The deploy pass (PASS-K) is blocked on two decisions, recorded in §5 of that
file and in PASS-I's own open-decisions table:

1. Foundation covers — **as-supplied or page-graded**?
2. Cover shape — **portrait 1086x1448**, or **landscape 4:3** to match the band?
   PASS-I specifies portrait; the current markup declares `aspect-ratio:4/3`.

---

## A note on PASS-I §1

PASS-I records the Foundation 8 reveal fix as executed at
`js/saferise-org-explorer.js:180` (`f8inner.className`). That symbol is no longer
in the file. It was not reverted — **SR-436 (PASS-J) rebuilt the whole Base and
Foundation 8 section**, replacing that code path with the `.sr-org-f8dwrap`
structure, a `300px 1fr` grid that opens the detail beside the card. The
behaviour PASS-I describes is present; the implementation is PASS-J's.

Both records are kept as written rather than reconciled after the fact.

---

## Never carried out

**The HR band (PASS-I §6).** The specification is complete — 2360x640, subject
right of centre because the scrim runs dark-left, casting and disqualifiers all
written. Candidates were proofed. Neither the selection nor the placement was
ever made. This is the one instruction from the page's development that was
simply dropped.
