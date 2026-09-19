# SafeRise — session handover

**14–15 September 2026.** Everything from this session that a new chat needs to continue.

---

## 1 · Where things stand

| | |
|---|---|
| **Repo** | `~/Documents/GitHub/saferise` — the only one. `~/dev/saferise` was a stale mirror at SR-378 and has been deleted |
| **Highest SR** | **SR-390**. The register's *Highest ID issued* pointer was stuck at SR-372 for thirteen passes and has been corrected |
| **Tracker** | **v32 — 253 rows, 50.5% weighted, 60 open gates.** `docs/tracker-v32.html` |
| **Unpushed** | `60239d2` · `f905608` · `2af2c2b` · `ed5f8ce` and anything since |
| **Site** | `noindex` still on. No paying members. No revenue |

---

## 2 · Passes completed this session

| SR | What |
|---|---|
| **SR-386** | `/plans` rebuilt; `/pricing` redirects to it; `noindex` removed; surface code `sr-pl-` claimed; −993 lines of the retired €19/€29/€39 ladder |
| **SR-387** | Defect sweep — 12 closed, 5 already correct, 1 flagged. Found **two** `</div>` bugs in six of eight `member-*.html` that cancelled in a naive count |
| **SR-388** | Headcount waterfall published; seats-in-use commitment removed; eight core tracks; `tools/check-sitemap.py` built and run |
| **SR-389** | Layout — five reported symptoms traced to **one root cause**: `.sr-org-page p{margin:0}` was outranking every closing-line rule and silently zeroing their margins |
| **SR-390** | Tabs — the named fault did not reproduce; SR-385 had already shipped a working handler. One reduced-motion gap closed |

---

## 3 · The pass queued and ready to run

**`pass/PASS-organisations-full.md`** with **`pass/mock-organisations-sections.html`**.

Consolidates and supersedes three earlier briefs. Three parts:

**A · Carousels.** Five cards in view derived from the container, not hardcoded. **The card
text does not show on hover or click — diagnose before fixing.** If it is bound to `:hover`
only, touch users have never seen the protocol descriptions. Convert the dashboard Library
carousel from `transform` to native scroll.

**B · Four organisations sections** from the mockup — the model, the impact pathway, what
people receive, ways to work together.

**C · Removals** — the band table, the free lunch-and-learn, "banded/waterfall" in public
copy, and the retreat pricing change.

---

## 4 · Decisions made this session — these are settled

### Pricing

| | |
|---|---|
| Track 01 | **Free with an account** |
| Membership | **€19/month · €190/year.** €19 buys Tracks 02–04; **€29 buys all eight** once the library doubles |
| Premium 1:1 | **€129 · €349 for three.** Launch rate **€79 · €199** while the market is tested |
| Workshops | **€29 single · €39 per couple** |
| Organisation workshop | **€1,800** |
| Half-day retreat | ⚠ **€2,400 to 50 · €3,500 for 51–120 · scoped above 120** — changed this session |
| Annual access | **Priced on total headcount, waterfall.** Bands: 1–100 €95/head · 101–300 €80 · 301–750 €62 · 751–1,500 €48 · 1,501+ €32. Minimum €6,000 |
| Founder salary | **€90,000 from close**, rising to €105k then €120k |
| Raise | **Path A €350,000** to breakeven · **Path B €500,000** to €1.7M in year two |

⚠ **Per-seat pricing is retired entirely** — it implies counting individual usage, which
contradicts the device-only privacy commitment.

⚠ **The free 45-minute lunch-and-learn is removed.** No free entry point.

### Product

**Eight core tracks:** Personal Transformation · Professional Performance · Relationship
Healing · Executive Presence · Sleep & Recovery · Embodied Nutrition · Strength & Return ·
Elevation Series. **Five have not shipped** and must carry an *in development* marker.

**Three-layer model — we work all three**, not just capacity. Capacity: Personal
Transformation, Elevation Series. Substrate: Sleep, Nutrition, Strength. Application:
Professional, Relationship, Executive Presence, plus sector tracks.

⚠ **The substrate qualifier is load-bearing:** *we work the states around sleep, eating and
training — not the plans. No diets, no programmes, no targets. Routes outward on deficiency
or injury.*

**Sleep & Recovery copy is written** (`COPY-sleep-and-recovery.md`) but ⚠ **the track exists
nowhere else in the codebase** — not on coming-soon, not in `tracks.js`. LG-273.

### Team

**Four people:** Andre · **Kirsten Morris — clinical lead**, owns escalation criteria and
sources licensed practitioners · **Aleksandra Macura** — nutrition and body ·
**Dwight Williams** — discipline and men's audience. **Clara is held** until the local pilot
is real.

⚠ **Kirsten's description must not say "clinician"** — the risk register correctly states
none is contracted.

**The founder account moves off `/about` to a new `/team` page in the footer.** ⚠ **Three
portraits need requesting — real photographs, not generated.** Longest real-world lead time
on the launch list.

### Design

**Four organisations colour tokens:** gold `216,170,67` (what we train) · sage `143,163,123`
(the continuing layer) · slate `110,134,168` (observed, not claimed) · bronze `181,150,102`
(the blend). ⚠ **Not yet system tokens — must be added to `saferise-system.css`.**

**No borders anywhere.** Bezel and shadow only, 16px radius, one row treatment (wash and
indent on hover), one pill CTA, one accent base-edge device.

**Heroes and banners run full page width** beneath the nav. ⚠ **Track page banners are
currently inset — that is a defect.**

---

## 5 · Open gates — nothing ships past these

| | |
|---|---|
| **Clinical governance** | Escalation criteria drafted, not agreed. **Blocks every live facilitated sale** |
| **Paddle approval** | Outside your control. The free tier launches without it; the conversion number does not |
| **Audio tone-break** | `build_protocol.py` renders passages separately so tone lurches across seams. **ElevenLabs Studio untested. Test in week one — 62 renders sit behind this** |
| **Organisation data model** | Seats belong to individuals. Nothing represents an organisation |
| **Facilitator capacity** | ~4 hours a month exists. Partner tier cannot be sold before a second facilitator |
| **`noindex`** | Still on. Nobody can find any of this |
| **Consent banner** | Required now analytics are on |

---

## 6 · Known defects and unresolved items

| | |
|---|---|
| **LG-273** | Sleep & Recovery promised on the org page, exists nowhere else |
| **LG-274** | Sitemap diverged — `/organisations` and `/pricing` missing; 30 `/protocols/*` URLs the generator cannot produce |
| **LG-275** | `assets/brand/logo.png` genuinely missing — only `pangolin.svg` exists |
| **LG-277** | `--gold-lt` duplicated: `#ECC96A` vs `#E8C877` |
| **LG-271** | `#journey` fragment target does not exist anywhere |
| **Carousel text** | Does not show on hover or click. **Possibly `:hover`-only, meaning touch users have never seen it** |
| **Imagery** | Nine beach/sunset images across all three cover sets · five corporate-stiff Professional Performance covers · `hero-film.webp` subject erased by its scrim · two Pexels hotlinks on `live-sessions.html` |
| **Vocabulary** | ~608 occurrences of practice/practise across 25 files — core resource vocabulary. The rule needs narrowing to product surfaces |

---

## 7 · Documents produced this session

**In the repo or ready to move:**
`docs/IMAGERY-BRIEF.md` · `docs/IMAGE-INVENTORY-14SEP.md` · `docs/tracker-v32.html` ·
`tools/check-sitemap.py`

**Ready to move to `pass/`:**
`PASS-organisations-full.md` · `mock-organisations-sections.html` ·
`PASS-sleep-track.md` · `COPY-sleep-and-recovery.md` · `PASS-plans-final.md` ·
`PASS-org-pricing-tracks.md` · `PASS-org-layout.md` · `PASS-org-tabs.md`

**Business:**
`SafeRise-Investor-Deck.pptx` (41 slides) · `SafeRise-Financial-Model.xlsx` (387 formulas,
zero errors) · `LAUNCH-LIST-30SEP.md` · `TRACTION-AND-ROLLOUT.md` · `BRIDGE-PLAN-15K.md` ·
`PAGES-team-and-podcast.md` · `DECK-UPDATE-PACK.md`

⚠ **Retire** `SAFERISE-BUSINESS-SUMMARY.md` and its deck — superseded.

---

## 8 · Canonical figures

```
2,316 hours · $202,860 replacement cost
Product & content $83,750 / 940h · Web & engineering $73,910 / 972h
Business & commercial $45,200 / 404h
30 protocols · 308 resources · 151,773 words · 14 framework assets
Entity: Kenor International B.V.
Andre: 8+ years enterprise SaaS · €5M+ ARR · 470+ logos · 360+ territory
```

⚠ **Superseded:** 1,770h / $155,577 / 136,758 words · **€2.6M ARR** · the €19/€29/€39 ladder
· per-seat pricing · the free lunch-and-learn.

⚠ **Still blank in the model:** actual cash spent to date. A $10,000 reconstruction exists
in the session but is **estimated, not recorded** — label it as such.

---

## 9 · Working conventions

**Claude designs and briefs. Claude Code executes via pass files in `pass/`.**

**Standing rule block, top of every brief:**

```
MATCH apply · DIFFERS adapt and report · AMBIGUOUS skip that item only and
continue · VERIFY-FAIL revert that step alone and continue.
Your fix-register entries outrank this brief. Report the disagreement.
Allocate an SR ID. Commit locally. Do not push.
```

**Verification runs through the member's actual route, not by opening files.**

⚠ **Read real class names and real rules before writing any specification.** Four defects
this session came from briefs written against guessed selectors or assumed markup — the
nav construction in SR-383, an entire hero built against a nav that did not exist, a
`.sm` modifier styled as a panel, and a stray closing tag that let a section escape its
container. **Tell the agent to read the live file and report what it found.**

⚠ **Never state a protocol, resource or script count** in product copy — derive it from
data.

---

## 10 · What I would do next

1. **Run `PASS-organisations-full.md`** — it is the largest queued item
2. **Request the three team portraits today** — real-world lead time you do not control
3. **Test ElevenLabs Studio on one protocol** — 62 audio renders sit behind that decision
4. **Resolve LG-273** — Sleep & Recovery is promised on a live page and exists nowhere else
5. **Push the four local commits**
6. **Reconcile the retreat pricing** across the deck, the model and the live page
