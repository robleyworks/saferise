# SafeRise — full design audit
**18 September 2026 · measured, not estimated**

Run against the real repo (`~/Documents/GitHub/saferise`) rendered in Chromium and measured through the live DOM: **22 pages × 2 themes × 3 viewports = 132 page renders**, plus a second pass that screenshots the actual pixels behind every piece of text sitting on a photo and computes the real contrast against them.

Scripts: `audit/sr-design-audit.py`, `audit/sr-overimage.py`, `audit/sr-spotcheck.py`
Machine-readable findings for the code pass: `audit/out/design-audit-findings.json`
Full-page screenshots (44): `audit/out/shots/`

**Two limits on this run, stated up front.** The audit container has no outbound network, so (a) Google Fonts did not load and every measurement of *glyph* metrics used fallback fonts — pixel widths, box geometry, colours and contrast are unaffected and exact, but "characters per line" figures are approximate; and (b) the two images hotlinked from `pexels.com` could not load here. Everything else is measured on the real assets.

---

## The short version

Your users are right, and the cause is narrower than "it looks messy". Four things are doing nearly all the damage:

1. **Type is too small almost everywhere.** The stylesheets contain **515 font-size declarations below 12px**, going down to 8px, 7px, 6px and 4px. At runtime, **222 distinct elements render under 12px**.
2. **The Sunrise theme is not finished.** 20 pages carry the toggle. Sunrise is defined in **8 CSS rules covering 4 scopes**. On 11 of the 22 pages I tested, pressing it changes nothing at all. Where it does work, it is *worse* than dark: twice as many contrast failures.
3. **Text on photographs has no reliable scrim.** 167 distinct pieces of text fail contrast against the actual pixels behind them, worst case **1.0 : 1** — literally invisible.
4. **Nothing shares a scale.** 19 corner radii, 154 spacing values (102 off the 4px grid), 102 colours, and on the protocol page alone 41 controls using 6 radii, 7 font sizes and 10 heights. That is what reads as "low quality" even when no single element is wrong.

**What is *not* broken, and worth knowing:** zero horizontal overflow at any viewport, on any page. Only one instance of clipped text site-wide. The grid boxes themselves are geometrically exact — on the home page the three door cards are pixel-identical in size and position. The problems are inside the boxes, not in the layout engine.

---

## 1 · Readability — the "hard to read" complaint

### 1.1 Type size

| Declared size | Occurrences in CSS/HTML |
|---|---|
| 11px | 134 |
| 10px | 114 |
| 9px | 75 |
| 11.5px | 56 |
| 9.5px | 48 |
| 10.5px | 38 |
| 8.5px | 33 |
| 8px | 7 |
| 7.5px | 4 |
| 7px | 2 |
| 6px | 2 |
| 4px | 2 |
| **Total under 12px** | **515** |

The worst offenders by how many pages they appear on:

| Where | Rendered size | Text |
|---|---|---|
| `span#togl` (theme toggle) | 10px | "Midnight" |
| `.sr-pf-col > p.sr-pf-colhead` (footer column heads) | 9px | "Legal" |
| `.sr-ps-lock > span.mark` (player lockup) | 9.6px | "SAFERISE" |
| `.sr-ps-overlay > p.sr-ps-theme` | 9.8px | "Regulate" |
| `.sr-ps-overlay > p.sr-ps-ptitle` (mobile) | **7.5px** | "The Pursue & Withdraw Protocol" |
| `svg > text` in diagrams | 9px | "TURN" |
| `.sr-fw-cardslug > b` | 8.5px | framework card labels |

**Recommendation.** Set a hard floor of **13px** for any label and **16px** for anything that is a sentence. Nothing below 13px ships. The 4px, 6px and 7px declarations should be treated as bugs, not design choices.

### 1.2 Body copy that is set to be hard to read

The home page "doors" (Inside me / Between us / At work) — the first real content a visitor meets — use, simultaneously:

- `text-transform: uppercase`
- `letter-spacing: 2.03px`
- `text-align: center`
- 14.5px
- over a photograph
- running **6 and 7 lines long**

All-caps removes the word-shape cues that readers use to recognise words without decoding them letter by letter. For your stated market — Caribbean, American, European, **a lot of non-native English speakers** — that is the single most costly typographic decision on the site. Letter-spacing on top of it widens the gap further, centring removes the stable left edge the eye returns to, and 6 lines is well past the length all-caps can carry.

**Recommendation.** Sentence case, left-aligned, `letter-spacing: normal`, 16px, maximum 3 lines. Keep all-caps only for the 2–4 word eyebrows, where it works.

### 1.3 Line length

22 blocks run past a comfortable measure. Worst:

| Page | Width | Element |
|---|---|---|
| plans | 1120px (~197ch) | `.wrap > p.sr-pl-hint` |
| for-organisations | 1092px (~163ch) | `div > p` |
| organisations | 1132px (~149ch) | `details > p` |
| method | 1120px (~149ch) | `.wrap > p` |
| protocol | 948px (~119ch) | `#resources > p.resource-note` |

**Recommendation.** `max-width: 68ch` on every paragraph. It is one rule and it fixes all 22.

### 1.4 Faded and tight text

- `.sr-fw-step > p` renders at **alpha 0.5**; `.sr-mi-step > span.sr-mi-stepdesc` at **alpha 0.4**. Both are instructional copy.
- 9 headings run at line-height below 1.35×, tightest `h1 > em` at **1.06×** — the descenders and ascenders collide.

---

## 2 · Contrast

### 2.1 Against solid backgrounds — 227 distinct failures

Worst, all measured with full background compositing up the DOM tree and the element's inherited opacity applied:

| Ratio | Need | Size | Colours | Where |
|---|---|---|---|---|
| **1.00** | 4.5 | 18px | `#0000ee` on `#3a4663` | `a.skip` — "Skip to content" (4 pages, Sunrise) |
| **1.00** | 4.5 | 10.2px | `#9b86d6` on `#8492b4` | `.sr-org-track-body > span` — "Beyond" |
| **1.00** | 4.5 | 9.9px | `#9b86d6` on `#8492b4` | `.sr-org-soon-tag` — "In development" |
| 1.04 | 4.5 | 10.2px | `#c97b5a` on `#8492b4` | "Capacity" |
| 1.42 | 4.5 | 9.5px | `#2e2e3a` on `#0e0e1a` | `.sr-dash-slotbtn` — "Waitlist" |
| 1.52 | 4.5 | 9.5px | `#33323e` on `#0e0e1a` | `.sr-mi-step > b` — "Step 01" |
| 1.74 | 4.5 | 11px | `#3c3b47` on `#0e0e1a` | `.sr-fw-stepno` — "Step 01" |
| 2.06 | 4.5 | 12.5px | `#474651` on `#0e0e1a` | step descriptions |
| 2.10 | 4.5 | 18px | `#0000ee` on `#0a0a0f` | `a.skip` (7 pages, dark) |

**The skip link is unstyled.** `#0000ee` is the browser's default link blue — no rule has ever been written for `a.skip`. It is the first element a keyboard or screen-reader user meets on every page, and it is invisible in both themes. One rule fixes it everywhere.

**The `.sr-org-*` track labels on `organisations.html` are the worst cluster on the site**: 10px coloured text on a mid-blue panel, ratios of 1.00–1.45. That page is the one you would send to an institutional buyer.

### 2.2 Against photographs — 167 distinct failures

This is the measurement that matters for "too dark". For each piece of text I made the glyphs transparent, screenshotted exactly its box, and computed the luminance distribution of the real pixels behind it — then the contrast at the darkest 10%, the median, and the brightest 10% of that backdrop. Text is only reliably readable if the *worst* part passes, because the eye reads the whole line.

| Worst | Typical | Size | Where | Text |
|---|---|---|---|---|
| **1.00** | 1.06 | 10px | organisations `.sr-rail-in > button.sr-on` | "For organisations" |
| **1.01** | 1.41 | 13.5px | protocol `.chargeends > span` | "Peak alarm" |
| **1.03** | 1.00 | 39px | coming-soon `.sr-cs-name2` | "Nutrition" |
| **1.04** | 1.04 | 14px | protocol `div > button.pill` | "Log this session" |
| 1.07 | 1.07 | 10.5px | protocol `.sr-book-cta--solid` | "Book a session →" |
| 1.14 | 1.17 | 9.5px | personal-transformation `.sr-tp-carddoor2` | "Regulate" |
| 1.63 | 1.63 | 9.5px | protocol `.sr-book-sbtn.is-off` | "Waitlist" |

And the opposite failure — **light text over the bright parts of a photo**, where the backdrop luminance swings by more than 0.25 within a single line:

| Backdrop swing | Fails at | Where | Text |
|---|---|---|---|
| 0.85 | 1.00 | personal-transformation `g > text` | "two numbers · ten seconds" |
| 0.51 | 1.59 | personal-transformation `.sr-tp-cardtext2 > h3` | "Anxiety Reset" |
| 0.43 | 1.12 | protocol `.kicker > span.eyebrow` | "Guided Meditation Experience" |
| 0.41 | 2.11 | protocol `h1#pp-title` | "The Pursue & Withdraw Protocol" |
| 0.38 | 1.13 | personal-transformation `.sr-tp-cardtext2 > p` | "Calm fear responses…" |

The protocol page's own `h1` drops to **2.11 : 1** where the galaxy image is bright.

**Almost none of this text carries a text-shadow or sits on a scrim.**

**Recommendation.** One scrim utility, applied wherever text sits on imagery:
```css
.sr-scrim{position:relative}
.sr-scrim::after{content:"";position:absolute;inset:0;pointer-events:none;
  background:linear-gradient(to top,rgba(6,6,13,.88) 0%,rgba(6,6,13,.62) 42%,rgba(6,6,13,.18) 100%)}
.sr-scrim > *{position:relative;z-index:1}
```
Plus `text-shadow:0 1px 14px rgba(0,0,0,.85)` on anything over a photo. That is a bezel/overlay, not a border, so it stays inside the house rule.

### 2.3 Sunrise makes contrast worse

| | Fails in dark only | Fails in Sunrise only | Fails in both |
|---|---|---|---|
| Over photos | 21 | **42** | 104 |

Sunrise has twice as many of its own contrast failures as dark does. The cause is structural, not per-element — see §3.

---

## 3 · The Sunrise theme is not finished

20 pages carry `data-theme` toggle markup. Sunrise is defined by **8 rules across 4 scopes** (`.sr-public`, `.sr-home`, `.nav`, `.foot`) in 2 of the 8 stylesheets. `saferise-dashboard.css`, `saferise-method.css`, `saferise-poster.css`, `saferise-rail.css`, `sr-clearing-player.css` and `sr-resource-read.css` contain **zero** Sunrise rules.

Measured effect of pressing the toggle, by page:

| Sunrise works | Toggle does nothing |
|---|---|
| home, about, coming-soon, for-organisations, live-sessions, organisations, plans, pricing | **dashboard, protocol (both), resource, member-heartmath, member-frameworks, personal-transformation, login, signup, account, privacy, accessibility, getting-help** |

So a member switches to Sunrise on the marketing site, signs in, and the entire product — dashboard, every protocol, every resource, the whole practice surface — silently reverts to dark. `method.html` reports as "changes" only because its nav and footer flip; its body stays dark.

**This is the biggest single defect in the audit**, because it is the one a user experiences as the product being broken rather than as a matter of taste.

**Recommendation — pick one before launch:**

- **(a) Finish it.** Sunrise needs token definitions in the 6 stylesheets that have none. This is the larger job and it will re-open every contrast number in §2 for the light surface. Realistically not a pre-30-September task.
- **(b) Ship dark only.** Remove the toggle from all 20 pages, keep `data-theme` support in the CSS for later. One pass, low risk, and it makes the product consistent immediately. **This is what I would do for the beta.**
- **(c) Scope it honestly.** Keep the toggle on the 8 public pages where it works, hide it on member surfaces. Cheapest, but a member who saw it on the marketing site will notice it disappear.

Note that (b) also retires 42 Sunrise-only contrast failures and the worst cluster on `organisations.html` at a stroke.

---

## 4 · Alignment and rhythm

**93 distinct near-miss alignments** between 0.5px and 8px. A near-miss is worse than an obvious offset: the eye registers it as wrong without being able to say why. That is the "messy" complaint.

The clearest example, on the home page — and a good illustration that the problem is not the grid:

| Card | Box x | Box y | Box w×h | Title y |
|---|---|---|---|---|
| Inside me | 160.0 | 1172.8 | 362.7 × 429.5 | **1319.0** |
| Between us | 538.7 | 1172.8 | 362.7 × 429.5 | **1337.6** |
| At work | 917.3 | 1172.8 | 362.7 × 429.5 | **1295.8** |

The three boxes are pixel-perfect. The three titles are **41.8px out of line with each other**, because the text block is bottom/centre-anchored and "At work" wraps to 7 lines while the others take 6. Every visitor sees three headings at three different heights.

**Fix:** anchor the text block to the bottom of the card with a fixed inner height, or top-align the titles from a shared baseline. Do not solve it by editing the copy to equal lengths — it will break again at the next viewport.

Others worth naming:

| Δ | Page | What |
|---|---|---|
| 8.0px | pricing | `.wrap > h1` is 540px wide, `.wrap > p` is 532px — same container, two widths |
| 8.0px | method | `.sr-mt-fwmark` vs `h3` top edges |
| 7.4px | for-organisations | two `td` in the same row: 161.3px vs 168.7px |
| 7.3px | dashboard | `.sr-dash-arc > svg` vs its legend |
| 7.1px | home | door heading vs door body left edges (mobile) |
| 6.0px | protocol | `#decision` 954px vs `.resource-note` 948px inside `#resources` |
| 6.0px | about, live-sessions | `.eyebrow` 330px vs `h1` 324px vs `.herorule` 330px |

### Token sprawl

| | Count | Note |
|---|---|---|
| Distinct colours in use | **102** | protocol pages alone use 28 |
| Distinct corner radii | **19** | 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 16, 18, 20, 22, 24, 50 |
| Distinct spacing values | **154** | of which **102 sit off the 4px grid** (31,892 uses) |

The house radius is 16px. It accounts for 1,182 uses — against 2,892 at 4px, 1,448 at 2px and 1,080 at 3px.

**The primary button on the protocol page — "Log this session", the main conversion action — has a 3px radius.** So does "Save entry". "Book a session" has 8px. The chips have 16px. "Open" has 22px.

One page, 41 interactive controls:

| | Distinct values |
|---|---|
| Corner radii | 6 — `0px, 3px, 7px, 8px, 16px, 22px` |
| Font sizes | 7 — `9.5, 10.5, 11, 13, 13.5, 14, 16` |
| Heights | 10 — `17, 18, 20, 23, 29, 34, 40, 42, 44, 47` |

**Recommendation.** Three radii only: `16px` (cards, panels, buttons), `999px` (pills/chips), `0` (rules). Spacing restricted to `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96`. Two button heights: 44px and 52px. This is the change that will do most for "low quality" per hour spent.

---

## 5 · Borders — the house rule

**401 distinct border rules are rendering, 257 of them at alpha ≥ 0.5.** The standing rule is *no borders anywhere — bezel, inset ring and shadow only*.

Most widespread:

| Pages | Border | Element |
|---|---|---|
| 8 | `#8492b4` 1px solid, alpha 1 | `.sr-pf-wrap > div.sr-pf-cols` (footer) |
| 8 | `#8794b5` 1px solid, alpha 0.81 | `nav.nav` bottom |
| 8 | `#8794b5` 1px solid, alpha 0.81 | `footer.sr-pf-foot` top |
| 7 | `#8694b5` 1px solid, alpha 0.82 | `#srNav > nav.nav` bottom |
| 3 | `#e0b658` 1px solid, alpha 1 | `.brand > span.brandmark` (all four sides) |
| 2 | `#ecc96a` 1px solid, alpha 0.8 | `.sr-ps-overlay > button.sr-ps-ctrl` — **the player's play button** |
| 2 | `#2c2c3c` 1px solid | `.pbody > div.crisis`, `section#log`, `.attention-advisory`, `.journey > figcaption` |

The nav and footer carry visible 1px rules on every page. The galaxy player's own control button has a gold border. Note the 144 hairline borders at alpha < 0.5 (`.navcta` at 0.16, footer at 0.09) read as intended separators — those are a judgement call, but the 257 opaque ones are not.

**Recommendation.** Replace every opaque border with `box-shadow: inset 0 0 0 1px rgba(...)` or a bezel gradient, per the house rule. The nav/footer rules should become a 1px gradient element, not a border.

---

## 6 · Tap targets

**117 distinct controls under 40px tall at 390px.** The 44×44 minimum is the threshold below which mis-taps rise sharply.

| Size | Control |
|---|---|
| **22 × 2** | `.sr-org-dots > button.sr-org-dot` — carousel dots on organisations |
| **20 × 7 / 7 × 7** | `#srHeroDots > button.sr-dash-hero-dot` — dashboard hero carousel dots |
| 178 × 14 | `footer > a` — "contact@thesaferiseprotocol.com" |
| 33 × 14 | `footer > a` — "Terms" |
| 39 × 14 | `footer > a` — "Privacy" |
| 62 × 17 | `.sr-dash-footlinks > a` — "CONTACT", "FAQ", "BILLING"… (8 links) |
| 113–139 × 18 | `.sr-book-link` — "How a session runs", "See the full calendar" |
| 147 × 20 | `.footer-col > a` — "Personal Transformation" |

The carousel dots at **2px and 7px tall** are effectively untappable on a phone. Everything else is a width problem only in the footer, where the fix is vertical padding.

**Recommendation.** `min-height:44px` with the hit area expanded via padding or an `::after` overlay — the dot itself can stay 8px while its tappable box is 44×44.

---

## 7 · Images

### 7.1 Missing — referenced by the code, absent from disk

| File | Referenced by | Verdict |
|---|---|---|
| `assets/coming/band-09.webp` | `coming-soon.html` | **Real 404.** The `.jpg` sibling exists; only the WebP is missing. Renders as a 604×435 hole. |
| `assets/anxiety-hero.webp` | | Referenced, never created |
| `assets/method/res-somatic.jpg` | `method.html` | Referenced, never created |
| `assets/covers/NN.jpg` | — | Template token in code, not a real file. Ignore. |

### 7.2 Hotlinked from a third party — fix before launch

| URL | Used on | Size shown |
|---|---|---|
| `images.pexels.com/photos/4098997/…?w=1800` | about | 1440 × 759 |
| `images.pexels.com/photos/6937837/…?w=1800` | about | 328 × 260 |

These load from Pexels' servers at page render. If Pexels changes the URL, rate-limits, or the visitor is on a network that blocks it, the About page shows two holes. It is also a licence and privacy exposure you do not need.

**Action:** download both, convert to WebP + JPEG at the specs below, self-host under `assets/about/`, and record the Pexels licence in the repo.

### 7.3 Resolution problems

Display sizes are the largest measured across all three viewports. "Need" is display width × device pixel ratio.

**Upscaled — visibly soft right now:**

| File | Have | Shown | Need | Provision at |
|---|---|---|---|---|
| `assets/journey/t1-band.webp` | 1400 × 380 | 1440 × 454 @2× | 2880 | **2880 × 908** |
| `assets/journey/t2-band.webp` | 1400 × 380 | 1440 × 454 @2× | 2880 | **2880 × 908** |
| `assets/journey/t3-band.webp` | 1400 × 380 | 1440 × 454 @2× | 2880 | **2880 × 908** |
| `assets/coming/band-professional-performance.jpg` | 1200 × 640 | 1424 × 792 @2× | 2848 | **2848 × 1584** |
| `assets/frameworks/guided-session.webp` | 1340 × 420 | 1424 × 432 @2× | 2848 | **2848 × 864** |
| `assets/covers/01.jpg` | 900 × 1200 | 998 × 561 @2× | 1996 | **2000 × 1124** (note: the source is portrait and it is being shown landscape — recrop, don't just upscale) |

**Soft on retina — acceptable on 1×, mushy on a modern phone or laptop:**

| File | Have | Shown | Need | Provision at |
|---|---|---|---|---|
| `assets/dashboard/state-banner.webp` | 1200 × 300 | 960 × 111 @2× | 1920 | **1920 × 480** |
| `assets/dashboard/journal-banner.webp` | 1000 × 260 | 900 × 111 @2× | 1800 | **1800 × 468** |
| `assets/frameworks/range-photograph.webp` | 1340 × 300 | 1292 × 300 @2× | 2584 | **2584 × 578** |

**Oversized — costing bandwidth for no visible gain:**

| File | Have | Shown | Wasting |
|---|---|---|---|
| `assets/home/hero-film.webp` | 3840 × 1600 | 394 × 706 @3× on mobile | 3.2× more pixels than needed |
| `assets/coming/coming-hero.webp` | 3840 × 1200 | 402 × 853 @3× | 3.2× |
| `assets/home/panel-t1/t2/t3.webp` | 2400 × 1000 | 328 × 156 @3× | 2.4× |
| `assets/home/panel-t2.jpg`, `panel-t3.jpg` | 2400 × 1000 | 326 × 245 @3× | 2.4× |
| `assets/home/film-poster.webp` | 2400 × 1350 | 326 × 245 @3× | 2.4× |
| `assets/frameworks/band-heartmath.webp` | 2680 × 720 | 342 × 260 @3× | 2.6× |
| `assets/coming/band-01/03/04/08.webp` | 1200 × 640 | 272 × 230 @2× | 2.2× |

These are not defects a user sees, but on a Caribbean mobile connection they are the difference between a page that arrives and one that doesn't.

### 7.4 Recommended specification, going forward

**Every image ships in three widths and two formats.**

| Slot | Widths (CSS px) | Provision at | Aspect | Format |
|---|---|---|---|---|
| Full-bleed hero | 390 / 1024 / 1440 | 1170, 2048, 2880 | 16:9 desktop, 3:4 mobile crop | AVIF + WebP, JPEG fallback |
| Section band | 390 / 1024 / 1440 | 1170, 2048, 2880 | 32:9 (e.g. 2880 × 810) | AVIF + WebP |
| Protocol cover | 320 / 640 | 640, 1280 | 3:4 portrait | WebP + JPEG |
| Card / tile | 280 / 360 | 720, 1080 | 4:3 | WebP |
| Carousel band | 268 / 604 | 536, 1208 | 15:8 | WebP |
| Galaxy field / clear | 962 × 541 stage | 1924 × 1082 | 16:9 | JPEG q82 (field), JPEG q88 (clear) |
| Galaxy subject cutout | — | 1400px tall | transparent | **PNG-24 with alpha** |

**Quality and weight ceilings:** AVIF q50 / WebP q78 / JPEG q82. Hero ≤ 320KB, band ≤ 180KB, cover ≤ 90KB, tile ≤ 45KB.

**Every `<img>` needs** `width` and `height` attributes (prevents layout shift), `loading="lazy"` below the fold, `decoding="async"`, a real `alt`, and a `sizes` attribute that matches the CSS — right now the `srcset` variants exist (`-320`, `-640`) but several slots pick the wrong one because `sizes` is missing.

**Still outstanding from earlier work:** the **21 missing subject cutouts** for the universal-galaxy protocols. Spec: transparent PNG-24, subject isolated with a soft 2px feather, 1400px tall, subject occupying 62–70% of frame height, centred horizontally, no drop shadow baked in.

---

## 8 · The media player

Measured on `protocol.html?track=1&protocol=1` at 1440px. The galaxy layers mount correctly and the stage is 962 × 541. Three problems:

1. **The step bar is invisible.** `Recognise / Regulate / Release / Rise` render at **8.5px in `#6a6874`** — roughly 1.9:1 on the stage. That is why you could not see them.
2. **Each label is rendered twice** — once inside `.sr-ps-seg` at 16px and again as a child at 8.5px. Only the 8.5px one is visible.
3. **`.sr-ps-stepnow` never populates** — computed `opacity: 0`, height 0, empty text content. The current-step callout is dead.
4. The lockup mark renders at **9.6px** and the protocol title at **7.5px on mobile**.
5. `button.sr-ps-ctrl` carries a `1px solid #ecc96a` border — a house-rule violation on the most-looked-at control in the product.

**Recommendation.** Step labels at 13px minimum, `rgb(var(--text2))` for inactive and `rgb(var(--gold))` for active; delete the duplicate 16px node; either wire up `.sr-ps-stepnow` or remove it; lockup mark to 11px; play button border → inset ring.

---

## 9 · Page length

| Page | Mobile height | Phone screens | Elements |
|---|---|---|---|
| organisations | 31,059px | **36.8** | 909 |
| about | 27,288px | **32.3** | 725 |
| method | 17,917px | **21.2** | 570 |
| plans | 14,401px | 17.1 | 577 |
| coming-soon | 12,794px | 15.2 | 899 |

Thirty-seven screens of scrolling is not a design problem you can style your way out of. `organisations.html` and `about.html` need to be split or made navigable (sticky section nav, collapsed sections). This is also where the "messy" impression compounds: the more sections, the more chances for the rhythm to break.

---

## 10 · Fonts

- **Five different Google Fonts URLs** across 33 pages, requesting different weight sets (`Cinzel:wght@400;500` on 23 pages, `400;600` on 10). Nothing self-hosted; **zero** `.woff2` files in the repo.
- Stacks are `'DM Sans',sans-serif` and `'Cinzel',serif` — no metric-matched fallback. 177 `Cormorant Garamond` declarations have no Georgia fallback while 172 do.
- `display=swap` is set on all 33 pages, so the site renders in Arial/Times first and reflows when the fonts land. On a slow connection that first impression is the whole impression.

**Recommendation.** Self-host all three families as `.woff2` under `assets/fonts/`, one `@font-face` block in `saferise-system.css`, `font-display:swap` retained, and a `size-adjust` fallback so the reflow is invisible. This removes the third-party dependency, the five-URL inconsistency, and the reflow in one pass.

---

## 11 · Recommended order of work

Ranked by user-visible improvement per hour. Each is a self-contained pass.

| # | Pass | Fixes | Effort |
|---|---|---|---|
| **1** | **Type floor** — 13px labels / 16px sentences; kill uppercase+tracking+centre on body copy; `max-width:68ch` | 515 declarations, 222 elements, the whole "hard to read" complaint | M |
| **2** | **Sunrise decision** — recommend ship dark-only for beta; remove toggle from 20 pages | The worst defect; retires 42 contrast failures | S |
| **3** | **Scrim utility** — one class + text-shadow on all text over imagery | 167 over-photo failures | S |
| **4** | **Contrast sweep** — `a.skip`, `.sr-org-*` labels, `.sr-dash-slotbtn`, step numbers | 227 solid-background failures | M |
| **5** | **Token discipline** — 3 radii, 9 spacing steps, 2 button heights | 19 radii → 3; 154 spacings → 9; the "low quality" impression | M |
| **6** | **Player** — step labels, duplicate node, `stepnow`, lockup, button border | The surface members spend the most time on | S |
| **7** | **Borders** — 257 opaque → inset rings | House rule | M |
| **8** | **Tap targets** — 44px minimum, carousel dots first | 117 controls | S |
| **9** | **Images** — 3 missing, 2 de-hotlinked, 6 re-exported, 13 downsized, `sizes` attributes | §7 | M |
| **10** | **Alignment** — door card titles, the 93 near-misses | The "messy" complaint | M |
| **11** | **Self-host fonts** | Reflow + third-party dependency | S |
| **12** | **Split organisations / about** | 37 and 32 screens | L |

Passes 1–3 alone would answer nearly all of what your users have reported.

---

## Appendix — how to reproduce

```bash
cd audit
python3 sr-design-audit.py    # 132 renders → out/audit-raw.json + out/shots/
python3 sr-overimage.py       # real backdrop luminance → out/overimage.json
python3 sr-spotcheck.py       # targeted geometry → out/spot.json
```

`out/design-audit-findings.json` holds every finding with selector, page list, theme list, measured values and severity — structured for a Claude Code pass to work through directly rather than re-deriving from this document.
