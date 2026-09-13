# SafeRise — session handover

**9 September 2026 · everything from this session, in one place**
Paste this at the start of a new chat.

---

## 1 · How Andre works

- **Claude designs and briefs. Claude Code executes.** Every code change goes
  through a written pass file in `pass/`, never a conversational instruction.
- **Terminal commands and Claude Code prompts are different things.** Label which
  is which — this caused a zsh error once already.
- **One pass at a time, allocated an SR ID from `git log --grep`, committed
  locally.** Andre pushes.
- **Approved designs are HTML mockups** placed in `pass/` before the brief runs.
  A missing mockup stops a pass.
- **Andre wants to be told when something is wrong**, including when Claude is the
  one who broke it. That has happened twice this session and both times the
  correction was more useful than the original work.
- Deliverables are files, not chat. Bundle as `.zip` when a dotfile directory or
  more than four files are involved.

**Standing rules for every pass brief:**
```
MATCH apply · DIFFERS adapt and report · AMBIGUOUS skip that item only and
continue · VERIFY-FAIL revert that step alone and continue.
Your fix-register entries outrank this brief. Report the disagreement.
Allocate an SR ID. Commit locally. Do not push.
```

---

## 2 · What landed this session — SR-365 to SR-376

| SR | What |
|---|---|
| **365/366** | Site readiness: electromagnetic-field claim removed from About, Track 02 FAQ contradiction fixed, `_headers` with CSP report-only, `robots.txt`, `security.txt`, accessibility statement |
| **367** | Retention periods written into the register and privacy policy · two mislabelled Proximity Guide references fixed · **found no protocol had a `slug`** |
| **368** | ⚠ **The gate.** Blank white protocol panel root-caused to `X-Frame-Options: DENY` in the `_headers` file Claude shipped. Fixed to SAMEORIGIN. Card hover rebuilt (was covering 79% of the cover), carousel stop and reduced-motion fixed, contrast failures corrected, CTA bar 106px → 46px |
| **369** | Dashboard hero: corridor welcome slide, copy left, actions removed. Resume slide reverted from light to dark |
| **370** | Split, partially and reported honestly: four page duplications resolved, seven sections retired (150KB), SEO heads on ten pages, first `_redirects` |
| **371** | Auth loop closed. **The confirmation redirect silently did nothing before** — a magic-link member was never signed in. Password reset built and verified live |
| **372** | **Split finished, better than briefed.** The three portals were investigated before moving, found to be dead weight, and *retired* — 313KB markup + 19KB orphaned CSS. `index.html` down 48.8% cumulative. All 30 slugs resolve cold, 60-entry legacy redirect map |
| **373** | Resource renames — **halted on t1-02's collision as instructed.** Sidebar filters fixed, banner signature stripped, **the interactive Decision reflection built** and wired into the dead "Enter the reflection" link |
| **374** | Advisory wording and inverted contrast fixed · `--shut` relit 3.64:1 → 5.41:1 across three CSS files that each declared it |
| **375** | Structured data (Organization/Article/FAQPage, all generated) · **fixed `gen-sitemap.js`, which never emitted the 30 protocol routes** · CSP switched to enforcing after live testing |
| **376** | Internal documents found publicly readable. `robots.txt` + `X-Robots-Tag` landed |

**Everything through SR-375 is pushed and live. SR-376 was committed locally.**

---

## 3 · Two bugs Claude introduced and should not repeat

1. **`X-Frame-Options: DENY`** in `_headers` broke the dashboard's own same-origin
   iframe and produced a blank white protocol page for signed-in members. Headers
   must be checked against whether the site frames itself.
2. **`gen-sitemap.js` only walked `.html` files**, so all 30 `/protocols/{slug}`
   routes — the entire indexable library — were absent from every sitemap. It
   never threw an error.

**Both looked correct and failed silently.** Also caught twice by Claude Code:
closing an HTML comment with `*/` instead of `-->`, which swallows the rest of the
file. Now a line in `CLAUDE.md`.

---

## 4 · Open passes, not yet run

| Pass | State |
|---|---|
| `PASS-block-docs.md` | **Next.** Three `_redirects` rules making `docs/`, `pass/`, `scripts/` return 404 |
| `PASS-indexing-readiness.md` | May have partly run as SR-375 — check first |

**Then push, and verify three URLs return 404** that returned 200 in SR-376:
`docs/saferise-invested-work.html` · `docs/tracker-v22.html` · `docs/fix-register.md`

---

## 5 · Decisions taken this session

| | |
|---|---|
| **Retention** | 30 days account · 13 months usage events · 24 months correspondence · 30 days logs · 7 years financial |
| **Free entry** | `FREE_TRACK_PREFIX = 't1-'`. Track 01 free **with** an account |
| **URLs** | Track paths stay long. Protocols at `/protocols/{slug}`, explicit slug field |
| **Wistia analytics** | Off. That is what makes a consent banner unnecessary |
| **Protocol count** | **30**, not 31. Clearing is a foundation session with two resources |
| **Resource count** | **Removed entirely.** Six protocols carry nine, one carries twelve, mean 10.2 |
| **Attention Advisory** | A safety notice, not a resource. Label above the player is `BEFORE YOU BEGIN` |
| **`--shut`** | `#7288A0`, 5.41:1 |
| **Voice** | **Two AI voices, male and female, member-toggled. Not Andre's voice** |
| **Founder credential route** | Own certifications only. No clinician, none expected |
| **Internal docs** | Blocked outright via `_redirects`, not just `robots.txt` |

---

## 6 · Open decisions — Andre's

- ⚠ **Premium 1:1 price.** Site says €129/€299, campaigns doc says €129→€180 with
  a €349 pack, deck used €129. Was due end of week
- ⚠ **LG-174 naming split.** `tracks.js` and 14 per-protocol records say *Attention
  Advisory*; `dashboard.html` says *Proximity Guide*. One resource, two systems
- ⚠ **Which voice is the default** for a member who has never chosen
- ⚠ **Loudness target** — `BED-RHYTHM-SPEC.md` says −16, platform rule says −19.
  3 LU apart, 62 re-renders if wrong
- ⚠ **Clearing has no bed.** Its state is Steady; the spec defines three
- ⚠ **`noindex` removal** — the switch, once readiness is confirmed
- ○ Whether `BED-RHYTHM-SPEC.md` is promoted from proposal to rule
- ○ Whether existing recorded audio is retired

---

## 7 · Documents produced, all in `docs/`

`VOICE-ARCHITECTURE.md` · `VOICE-PROFILES.md` · `MEDITATION-PRODUCTION-SPEC.md` ·
`IMAGE-MANIFEST.md` · `SITE-READINESS-ASSESSMENT.md` · `RECORDING-BRIEF.md` ·
`VERTICAL-TRACK-RECOMMENDATIONS.md` · `article-30-register.md` ·
`BACKUP-AND-RECOVERY.md` · `affiliate-terms.md` · `CLAUDE-RULES-ADDENDUM.md` ·
`SEO-HEAD-TEMPLATE.md` · `tracker-v23.html`

**`SafeRise_BD_Assessment_2026.pptx`** — 34 slides, validated. Adds a stated ask
of €120,000, unit economics, five business metrics, population licensing, two
price books, the vertical portfolio, employee provision, and where this is already
standard. Year one models at **€115,984 on five founding licences**; €79,384 on
none.

---

## 8 · The production pipeline, decided but not started

**31 protocols × 2 AI voices = 62 audio + 62 video. Budget ≈ $314 for one
production month.** ElevenLabs Pro $99 · Runway Max $95 · contingency $80 · Claude
share $40. **Hosting ≈ $0** — audio on Cloudflare R2 (zero egress), video on
Wistia Free to roughly 1,140 members.

**Sequence that matters:** fix the five scripts carrying spoken durations and the
one "practising" · notate pacing on `t0-00` and `t1-01` only · generate both
voices · **stop and listen** · then the remaining 29.

**Audio is the product, video is the option** — video suspends on a locked screen
and costs 20× the data.

---

## 9 · The three things blocking revenue

1. **Paddle is not wired.** The plugin install is legitimate — it is in Paddle's
   own docs. The webhook that flips `entitled` **must verify the signature**
2. **`noindex` is still on.** Everything built this week improves a site nobody
   can find
3. **Zero paying members.** Production capacity is proven; willingness to pay is
   entirely untested

---

## 10 · Tracker

**`docs/tracker-v23.html` · 170 rows · 45% weighted · 43 gates.**

Recent: LG-159 split closed · LG-168 slug closed · LG-169 portals closed ·
LG-150/151 auth closed · LG-171 token closed · LG-163 advisory closed.
Open gates include LG-173 doc exposure, LG-167 vertical ACV untested.
