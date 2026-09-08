# SAFERISE — SESSION HANDOVER

**Date:** 7 September 2026
**Covers:** homepage copy rebuild v99→v105, live page audit, four Claude Code passes, tracker delta
**Read this before doing anything else in a new chat.**

---

## 1. CORRECTIONS TO CARRIED CONTEXT

Four things I was wrong about across this session. A new chat must not inherit them.

**SR-084 is not what earlier sessions claimed.** The actual register entry covers `index.html` carrying cut resource-case and duration content left over from the SR-077/SR-080 consolidation. It has nothing to do with a "second content store," and nothing to do with the single-page architecture. Three separate problems were being filed under one ID. The single-page architecture and the Track 2/3 hardcoded-prose divergence are both **unlogged** and each need a fresh SR number allocated from `git log --grep="SR-"`.

**The homepage CSS is at `css/saferise-system.css`.** It was never in `index.html`. Selectors are scoped under `.sr-home` — `.sr-home .filmcopy h1`, `.sr-home .router-question`. Earlier sessions guessed `.heroin.filmcopy h1`, which exists nowhere. Do not rebuild homepage CSS from screenshots again; it is findable.

**`pass/HOMEPAGE-WEBP-PASS.md` and `pass/method-sections.txt`** — I told Andre both were placed in the repo. The first was not (now fixed). The second was, and my brief wrongly said it might be missing.

**Cover inventory is 55 JPEG / 11 PNG / 33 WebP in `assets/covers/`,** not 66 JPEGs. See §6.

**The register is far further along than my context suggested.** SR-350 is the highest ID as of this session's last commit. Earlier notes referenced SR-001–SR-016. Never allocate an SR number from notes or memory — always from `git log --grep="SR-"`.

---

## 2. STANDING WORKING RULES

**Delivery format, every coding task, no exceptions:**
1. File(s) to download
2. Terminal commands to place them
3. The script to paste into Claude Code

Never one part alone.

**Git.** Andre does all pushes in GitHub Desktop. Claude Code may commit when explicitly authorised. Never push, branch, merge, checkout or rebase. Netlify auto-deploys from `main` on push, so holding the push holds the deploy.

**Verification.** Always verify in the browser — `naturalWidth`, computed styles, real clicks. Never trust source inspection or console silence.

**Theme.** `sessionStorage['sr-theme']`. Not `localStorage`. Not `sr.theme`. This has silently reverted four times; check it every pass.

**File verification.** Run a bash check against `/mnt/user-data/uploads/` before analysing any file Andre says he attached. Attachments fail often; plain-text pastes and PDF uploads work.

**Andre's style.** Terse, directive, often voice-note dictation. Expects scope interpretation, independent execution, structural calls made rather than asked about, and real pushback when a direction has cost. Confirmed decisions are not re-litigated.

**Copy rules.** Plain human voice. No abstract pronoun placeholders in headings ("none of it", "none of them"). No paragraph may end with a single word alone on a line at any breakpoint. Prohibited vocabulary: quantum, manifest, rewire, spoken durations, outcome promises, a fifth step, "practice" as a product word. "Frequency" is permitted only for physics or when declining a claim, never as a benefit. Dispenza by mechanism only, never named in clinical or investor contexts.

---

## 3. HOMEPAGE — CURRENT STATE

**Committed:** `fa5dd4c` (v103 copy) and `ebf4959` (SR-350). Neither pushed.

**Rendered but not yet passed to Claude Code:** v104 and v105.

### Copy as it stands in v105

**HERO** — eyebrow SAFERISE, then:

> "My unregulated nervous system narrowed my choices for years. *Long enough that it became my personality, and affected my life."*

Play button beneath, unlabelled. Hero sub-line deleted. Film caption deleted. The small grey positioning line deleted in v105 because it duplicated the new H2.

**"SURVIVAL, OR CHOICE" SECTION — DELETED ENTIRELY in v104.** Removed: the H2 "Your life changed on a day that felt like nothing", both body paragraphs, and the pull-quote "I had names for all of it. Quick-tempered. Anxious. Bad with criticism. I thought that was just who I am."

**"GETTING AUTHORSHIP BACK"** — H2 replaced in v105:

> SafeRise offers guided protocols for regulating the states that are hardest to get through, *ready when you need them.*

Pull-quote unchanged: *No course. No schedule. Nothing to install. Free to start.*
Body unchanged: "And it doesn't stay in one place. Steady at work, unreachable at home. Fine with anyone except one person. Solid all week and gone by Sunday night."
Lead unchanged: *Where do you want to start?*

**THREE DOOR CARDS** — approved, unchanged, except "arriving" → "belonging" in card three (SR-350).

### Spacing changes in v105
Hero min-height 660→560, top padding 96→76. Router section 104/118→78/86. Body margin-top 38→30, lead 34→28, doors 40→34. Mobile hero 600→520, padding 70→58.

Page height 2,634px → 1,979px at 1440.

### Open on the homepage
1. **The hero quote is unattributed** and sits over a photograph of a specific person. In quotation marks it reads as a testimonial. Raised four times, never answered.
2. **The play button has no label.** The caption that explained it was deleted.
3. **The H2 runs five lines at 48px** and now reads as the page's main argument rather than its offer. Dropping to ~36px would give three lines.
4. **The body paragraph is stranded.** "And it doesn't stay in one place" was written to follow a claim about states; following a description of what SafeRise sells, "it" has no antecedent. Either move the paragraph above the H2 or change "it" to "the state."
5. **The film modal still contains four numbered vignettes** even though the caption describing them is gone.

### Rejected copy — do not resurrect
- "None of them looked like the moment your life changed." — abstract pronoun
- "You can't fix a temperament. You can regulate a state." — disliked
- "You get to decide who arrives." — disliked
- "The state came first. The name came later." — disliked
- "A state that keeps repeating starts to look like a personality. It is still a state." — replaced
- "And lost touch with reality." — withdrawn after pushback; clinical overreach on a page carrying a safety notice

---

## 4. THE BLOCKING DECISION — PRICING

Three records disagree and every pass hits this.

| Source | Model |
|---|---|
| `content/tracks.js` PRICING | Cumulative ladder €19 / €29 / €39, higher includes lower. Marked "locked 2026-08" with founder confirmations SR-124 (20 Aug) and SR-308 (28 Aug), plus a comment warning against simplifying it. |
| This session's working assumption | Track 01 free, single €19/month unlocks everything else. |
| Longer-term project notes | $29/month founding rate for the first 1,000 members, ~$249/year annual. |

`tracks.js` is the documented single source of truth and is dated and signed. Treat it as canonical until Andre rules otherwise. **The ruling must land in `tracks.js` with a dated comment**, or the next pass reopens it.

Separately true and not a contradiction: Track 01 content is free to browse via `FREE_TRACK_PREFIX='t1-'` in `js/saferise-access.js`. That is access gating, not pricing.

Most `€` figures on the page are `<span data-sr-price="t1|t2|t3">` placeholders filled from PRICING at load, so they track the record automatically. Two hardcoded exceptions in `protocol.html:977,982` (workshop prices) currently match but are a latent drift risk.

---

## 5. WHAT LANDED THIS SESSION

**Commit `fa5dd4c`** — homepage v103 copy. Hero quote, survival and authorship sections, `.sr-home .filmcopy h1 em{display:block}` and `.sr-home .router-question em{display:block}` so gold clauses break to their own line. Two `&nbsp;` fixes at 390 (`.filmdesc`, `.scope`).

**Commit `ebf4959` — SR-350.** t3-06 stale Ambition Recovery description replaced at `index.html:6007`; door card three "arriving" → "belonging" at `index.html:1246`. Register entry added to `docs/fix-register.md`, cross-referencing SR-347 which fixed the same card's landing description but missed the `.simple-expand` body.

**Commit `117906d`** — footer clone-list change, method sound section, WebP review page. **See §7 — the footer part of this needs reversing.**

**WebP SSIM verification complete.** All 94 files scored, min 0.981, max 0.9993, mean 0.9899. Nothing below 0.98, let alone the 0.95 flag threshold. The flat line-art tiles in `assets/frameworks/` scored *highest* (0.997–0.999), contradicting the expectation that they'd degrade first. Zero source files carried alpha. `pass/webp-review.html` built showing the 20 lowest scorers; it is gitignored and lives on disk only. **No regeneration needed.**

**Method sound section** landed in `method.html` as `<section class="sec2">` before `</main>`, H2 "What the music is doing" plus six paragraphs, converted verbatim from `pass/COPY-frequency-answer.md`. Two things left open — no numbered eyebrow (siblings all have one), and straight apostrophes preserved instead of the site's curly convention.

---

## 6. STRUCTURAL FINDINGS

**`index.html` is 968,757 bytes and renders the entire site** — Tracks 01/02/03, plans, services, Premium 1:1, workshops, retreats, About, the Foundation protocol. One URL, ten `.prog-overlay` panels plus `#main-content`. Unlogged. Needs an SR ID.

**Three different protocol template conventions:**
- Track 1 — dynamic `<div class="proto-expand">`, empty in HTML, populated by JS at runtime. Cannot drift.
- Track 2 — static `.simple-expand` with "Who this serves:" / "Science frameworks:" paragraphs.
- Track 3 — static `.simple-expand` with "What you may notice in your body:" / "Subject matter voices:" paragraphs.

The static Track 2 and 3 prose is what drifted from `tracks.js` and produced the t3-06 defect. Only t3-06 was mismatched; the other 19 static cards describe their own protocols correctly. **The inconsistency itself is unlogged and needs an SR ID.**

Protocol count: `tracks.js` holds 30. The 31st is the Foundation Protocol, which has no comparable expand panel. Its FAQ mention differs from `tracks.js` by one word — "a version of it" vs "a variation on it" (`index.html:5021` vs `tracks.js:832`). Noted, unfixed.

**`assets/covers/`** — 55 JPEG, 11 PNG, 33 WebP, 99 files. Track 1's ten covers plus banner ship a full responsive set: JPEG at full/320w/640w as fallback, WebP at the same three sizes, served through `<picture><source type="image/webp">`, 20 references, confirmed working. **Tracks 2 and 3 are JPEG-only** — no derivatives, no `<picture>`. The 11 PNGs are unreferenced pre-crop originals at **1086×1448**, which is the stated cover spec, while the shipping JPEGs are **900×1200**. The spec and the repo disagree about cover dimensions, not just format. Andre's call.

**`method.html#faq` is dead.** Linked from 16 places — 15 via the Help column in `js/saferise-footer.js`, one from the hand-written `.foot`. No `id="faq"` exists on `method.html`. Real FAQ content exists as three `.sr-faq-cols` blocks trapped inside the `prog-personal`, `prog-couples` and `prog-corporate` overlay panels. There is no general FAQ destination.

**`method.html` totals 2,873 words**, of which the three sections earmarked for cutting account for 408. The page is not as bloated as assumed; a cut spec may not be warranted.

---

## 7. PENDING — HIGHEST PRIORITY FIRST

### The footer regression, unfixed
Commit `117906d` removed `#main-content` from the footer template's clone list. That left the homepage with `.foot` only — seven plain links and **none** of the `showProg()` routes. `.sr-foot` is the sole home of Compare Plans, Services, About SafeRise and The Journey. The primary view now has a poorer footer than every overlay panel.

The instruction that caused this was mine and it was wrong; the execution was correct. `pass/FOOTER-CORRECTION-PASS.md` reverses it properly — restore the `#main-content` clone, delete the hand-written `.foot`, and move any of Contact / Billing / Support that `.sr-foot` lacks into it first.

### `pass/FOOTER-CORRECTION-PASS.md` — written, in repo, NOT RUN
Five tasks: footer reversal; t3-06 somatic line; method section eyebrow and punctuation; remove the dead FAQ link; Track 2/3 responsive cover sets.

Approved t3-06 replacement copy, verbatim:

> What you may notice in your body: Sustained low-grade vigilance — the body reading a safe room for whether you count in it, and the sentence rewritten in your throat before it leaves.

This exists because the SR-350 fix copied the closest available `tracks.js` string, which described a cognitive act rather than a sensation while its siblings say "Acute sympathetic spike" and "Shame-adjacent activation." Claude Code flagged the register mismatch rather than composing new copy, which was correct.

### v104/v105 homepage changes — no pass written yet
The section deletion and the H2 replacement exist only as mockups. Nothing has been passed to Claude Code. The four open homepage questions in §3 should be settled first.

### Not yet pushed
Three commits sit on local `main`. Until Andre pushes, production still serves `href="#"` for Terms and Privacy, the old homepage copy, the t3-06 stale description and "arriving" on card three.

---

## 8. BLOCKERS OUTSIDE THE BUILD

**Supabase project, Frankfurt eu-central-1** — does not exist. `supabase/migrations/0001_auth_entitlements.sql` is un-run SQL until it does. `js/saferise-auth.js`, `signup.html`, `login.html`, `account.html` all built and waiting.

**Paddle seller account** — not created. Merchant of record. Stripe does not support Sint Maarten; Mollie ruled out; CX Pay / Orco Bank held as a possible second provider behind `js/saferise-pay.js`.

**`saferise@kenorinternational.com`** — not created. The legal documents reference it; the footer uses `contact@thesaferiseprotocol.com`. Neither exists. Pick one.

**Legal publication, WL-01→WL-06** — dates on all three documents, email provider, international transfer mechanism (**needs a lawyer**: Frankfurt data, Sint Maarten controller, no adequacy decision, likely SCCs plus a transfer impact assessment), email creation, Kenor registration number on Terms, checkout consent line for the 14-day waiver.

**No exclusively-paid audio exists.** The ten guidance clips at `assets/audio/guidance/rg-0N-*.mp3`, indexed by `content/guidance.js`, are keyed by resource type and shared across all three tracks including free Track 01. They cannot be gated. Track 02/03 meditations must go to Supabase Storage behind signed URLs, not `assets/`.

**31 meditation sessions unrecorded** in Andre's voice. Sprint scoped Tue/Wed/Thu, one track per day, T1 Tuesday. Four pre-flight items unanswered: the t3-06 script must be Belonging Gap not the withdrawn Ambition Recovery; no script may name Dispenza; filename convention matching `rg-NN-name.mp3`; the roster gives 32 rows for 31 sessions.

**Loudness conflict unresolved** — platform rule −19 LUFS mono / −1 dBTP versus a recording chain at −16.

**Logo** — deferred by decision, but it blocks posters, T3 covers t3-01 through t3-09, IMG-031–050 and the investor deck.

---

## 9. BUNDLED FILES

**`mock-home-v105.html`** — the current homepage mockup. Real markup, reconstructed CSS. Open it in a browser to see exactly what was approved. This is the only copy; it does not exist in the repo.

**`check.py`** — orphan detector. Walks text nodes with a TreeWalker, measures each word's bounding rect through the Range API, groups by top offset, reports the last line's word count per selector at 1440 and 390. Run as `python3 check.py <file.html>`. Requires Playwright and chromium. This is how every "no single word alone on a line" check was done and it should be run on any future copy change.

**`saferise-home-v105-1440.png` / `-390.png`** — rendered proof at both breakpoints.

Already in the repo and not bundled: `pass/FOOTER-CORRECTION-PASS.md`, `pass/HOMEPAGE-COPY-v103-FULL.md`, `pass/T306-DOORCARD-PASS.md`, `pass/HOMEPAGE-WEBP-PASS.md`, `pass/COPY-frequency-answer.md`, `pass/method-sections.txt`, `pass/webp-review.html` (untracked, on disk only).

Also delivered this session and worth adding to the project if not already there: `TRACKER-DELTA-v7.md`.

---

## 10. TRACKER

The copy in project files is **v4-era** and carries superseded decisions — Outseta plus Stripe, AIVA for music beds, a €9/€29/€49 ladder, `saferiseprotocols.com`, and Dwight Williams gating Track 03. Dwight relates only to The Disciplined Man track and the planned podcast; he has no role in Tracks 01, 02 or 03.

Do not rebuild from that file. `TRACKER-DELTA-v7.md` holds eight status changes, four stale row corrections and eleven new rows to apply to the live v6 artifact. Two further updates from the last report: LG-48 moves to Partial with the SSIM result recorded, and LG-95 (double footer) is In progress rather than resolved, since the fix needs reversing.
