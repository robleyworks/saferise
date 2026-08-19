# CLAUDE-CODE-HANDOFF — track pages from a single content source

**Branch:** `feat/track-pages-from-data`
**Register IDs:** SR-050 onward. Commits carry the ID (`feat: SR-050 …`).
**Scope:** integration only. No new copy, no new design, no art generation.

Run all git operations in `/Users/arobley/Documents/GitHub/saferise`. Create the
branch in GitHub Desktop, then quit and relaunch Claude Code before pasting this.

---

## 0 · Blocked until confirmed

Do not start until Andre has signed off the **Track 01 copy edits**. The
plain-language pass rewrote ten lines of previously approved v29 copy. They are
in `tracks.js` already; they must not reach `main` on my say-so.

---

## 1 · Inputs

**All input files are on the Desktop, not in the repo.** First step is to copy
them in, then work from the repo copies only. Do not read from or edit anything
on the Desktop after that — a Desktop file that diverges from the repo is the
same two-sources-of-truth problem this branch exists to end.

```bash
cd /Users/arobley/Documents/GitHub/saferise
mkdir -p content docs
cp ~/Desktop/tracks.js                         content/tracks.js
cp ~/Desktop/PHILOSOPHY.md                     docs/PHILOSOPHY.md
cp ~/Desktop/CLAUDE-CODE-HANDOFF-track-pages.md docs/
# reference only — do NOT copy into the repo:
#   ~/Desktop/mock-01-03-track-template.html
#   ~/Desktop/mock-05-record-audit.html
git status   # confirm you are on feat/track-pages-from-data before committing
```

| File | Lands at | Role |
|---|---|---|
| `tracks.js` | `content/tracks.js` | The content source. Everything the pages say. |
| `PHILOSOPHY.md` | `docs/PHILOSOPHY.md` | Reference file. **Not published, not indexed, not read by code.** Excluded from any sitemap or build glob. |
| `mock-01-03-track-template.html` | *(stays on Desktop)* | The approved rendering. Reference, not the deliverable. |
| `mock-05-record-audit.html` | *(stays on Desktop)* | Proofing surface. Never shipped. |
| `saferise-personal-transformation-v29.html` | already in repo | The page being replaced. Reference for CSS only. |

---

## 2 · Deliverables

### SR-050 · `content/tracks.js`
Drop the file in as-is. It exports `PRICING`, `SHARED`, `TRACKS`, `STATES`,
`FRAMEWORKS`, `META`, `LIFE_LAB`, `frameworkReach()`.

Nothing else in the repo may hold a second copy of any of it.

### SR-051 · One track template, three routes
`/personal-transformation` · `/relationship-healing` · `/professional-performance`

Eleven sections in fixed order, exactly as the mockup renders them:
hero · protocols + journey · cost · range · why-insight · four steps · six areas ·
resources · progress · price · FAQ · scope.

- CSS lifted from v29. **No inline base64** — v29 carries 724KB of it; covers are
  path references now.
- Image slots render the `track.art` brief as a labelled placeholder. Pages must
  work with zero art present.
- Track 04 is `visible:false`. It must not appear in nav, plans copy or routes.
  One flag, not surgery.
- The scope block is required on all three. It is not decorative.

### SR-052 · Repoint the dashboard
`saferise-dashboard-v41.html` holds its own `TRACKS`, `RES`, `SOURCES` and
`TRACKPRICE`. Delete them and read `content/tracks.js`.

**Do this in the same PR as SR-051.** Shipping them separately creates a window
where two files disagree about protocol names and prices.

### SR-053 · Price strings
83 hardcoded price strings across four files, including retired tiers (€27, €47,
€99, €129, €299, €357) still sitting in `SafeRise_Claude_Source_Lite.html`.
All prices come from `PRICING`. Locked values: t1 €9, t2 €19, t3 €29,
workshop €29/person, premium1 €129/hr, premium3 €299/3hr.

### SR-054 · Stale strings, repo-wide
- `Crisis Card` → `Cue Card`
- `Life Companion` → `Somatic Release Activities`
- `Career & Performance` → `Professional Performance`
- Track 03 `Coming Soon` / `Join Waitlist` → live, priced
- Life Laboratory rail: **seven stages → eight**, `LIVE → NOTICE → EXAMINE →
  LEARN → TEST → DOCUMENT → TRANSLATE → SERVE`, from `LIFE_LAB`
- Any surviving `twelve-resource library` → count from `SHARED.resources.length`

### SR-055 · Derived counts on the About page
`Contributes insight to 21 protocols` is hand-counted and wrong. Replace with
`frameworkReach(key).length`. Same for every protocol count on the page.

---

## 3 · Do not

- Write copy. If a string is missing, stop and say which field.
- Generate or source images.
- Touch vocabulary or claims. A credibility pass runs separately.
- Build `/method`, the framework pages, the Life Laboratory, the founder page or
  Elevation. All out of scope, all elsewhere.
- Delete the old track sections in `SafeRise_Claude_Source_Lite.html` until the
  new routes are live and verified. Then remove them in a separate commit.

---

## 4 · Known gaps, do not try to fill

- **`voices[]` does not exist.** No testimonial section. Do not placeholder it.
- **Art:** 16 illustrations, all briefed in `track.art`, none produced.
- **Conditional resources:** `META[].extras` is populated for Track 01 only
  (Proximity Guide on 02/03/04/08/09/10, Invitation to Repair on 02/04/08/09).
  Tracks 02 and 03 are `null`, meaning **unverified, not none**. The protocol
  page must not claim either resource where `extras` is null.
- **Resource reader mismatch.** The reader ships nine resources under different
  names; `tracks.js` has twelve. Track pages promise twelve. Reconciling the
  reader is a separate item and the track pages must not wait for it.

---

## 5 · Validation before handoff

```bash
node --check content/tracks.js
node --check <each JS block>
python3 -c  # div balance, CSS brace balance, unused class detection
```

Then Playwright, per route:

- zero console and page errors
- 10 protocol cards, 18 FAQ items, 12 resource tiles, 8 section bands
- no element under 10.5px computed font size
- step labels and step columns share left offsets
- prices on the page match `PRICING` — assert, do not eyeball
- `grep -c 'base64,'` returns 0

Screenshot every route and check it. The most common failure in this repo is a
string replacement reporting success against text that no longer exists.

---

## 6 · Definition of done

PR merged to `main` with SR-050…SR-055 closed in `docs/fix-register.md`,
three routes live, dashboard reading the same file, and no second copy of any
content record anywhere in the repo.

---

## 7 · Not this

The recording sprint. Ten guided sessions, ten walkthroughs, ten founder
videos — and the per-protocol scripts are not written either, only the
Foundation Protocol. None of the above changes that.
