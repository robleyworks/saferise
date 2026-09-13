# Run order — after SR-372

**Where things stand.** SR-367 through SR-372 landed and are pushed. The split is
complete: the three portals were retired rather than moved, `index.html` is down
48.8%, all 30 slugs resolve cold, and `_redirects` carries a 60-entry legacy map.

**Three passes are written and unrun.** Order matters — the second depends on a
rename in the first, and the third encodes content into structured data, so it
must run last.

---

| # | Pass | Why here |
|---|---|---|
| **1** | `PASS-resource-list-and-reflection.md` | The largest. Resource renames, the sidebar, the protocol banner, and the reflection build |
| **2** | `PASS-advisory-and-token.md` | Depends on §1 freeing the name "Attention Advisory" |
| **3** | `PASS-indexing-readiness.md` | Last. Structured data must encode settled titles, not stale ones |

⚠ **Pass 1 §1a can stop on its own item.** If the "Where to Direct Your Attention"
resource overlaps with Proximity Guide on any protocol, the rename halts there and
reports. **That is the correct outcome, not a failure** — merging two resources is
a content decision and Andre's to make. Everything else in pass 1 continues.

---

## Why this order

**1 before 2.** Pass 1 renames Proximity Guide to Attention Advisory. Pass 2 then
renames the safety label above the player to `BEFORE YOU BEGIN`, because that name
is no longer free. Running 2 first leaves two things called Attention Advisory.

**3 last, and this matters.** Pass 3 generates `Article` and `FAQPage` JSON-LD
from `content/tracks.js`. If it runs before the renames, **every protocol page
ships structured data naming a resource that no longer exists** — and Google treats
a mismatch between visible and structured content as a violation rather than a
typo.

## What each carries

**Pass 1** — Proximity Guide becomes Attention Advisory across 14 protocols ·
Guided Meditation and Cue Card leave the reader sidebar · the body signature and
three quotes come off the protocol banner · resource counts removed rather than
corrected · **The Decision gains the nine fields from `pass/mock-decision-reader-v2.html`**
· Your Record and The Decision each get a line saying which is which.

**Pass 2** — the label above the player becomes `BEFORE YOU BEGIN` · *"practice"*
becomes *"guided meditation experience"*, and nothing else in that copy changes ·
the advisory block goes to one text colour at 4.5:1 · `--shut` moves to `#7288A0`.

**Pass 3** — 31 becomes 30 and stale resource figures go · JSON-LD for
Organization, Article and FAQPage · sitemap including all 30 protocol routes · CSP
from report-only to enforced, **only if the violation list is empty** · confirm the
member coming-soon parity swap landed · one line into `CLAUDE.md` about the
`*/`-instead-of-`-->` bug, now caught three times.

## Standing rules for all three

- **Single pass each. Do not stop**, except where §1a explicitly says to.
- **Your own fix-register entries outrank these briefs** wherever they disagree.
  Report the disagreement.
- **Allocate a separate SR ID per pass** from `git log --grep`.
- **Commit locally after each. Push nothing** until all three report clean.
- **`noindex` stays.** Pass 3 asks for an assessment of readiness; removing it is
  Andre's switch.
- **Every new class is `sr-xx-` prefixed.** See `docs/CLAUDE-RULES-ADDENDUM.md`.
