# SafeRise — pre-live site audit

Read-only. Nothing in the repo was changed for this pass. No SR IDs were allocated —
per instruction, an SR ID is a claim that a fix exists, and the only evidence here is
this report.

**Method.** Served the repo with a local Python static file server (a second,
threading server on a spare port, not the project's own `tools/serve.py` — see
Environment note below) and drove every page with Playwright/Chromium: real
navigation, real clicks, `naturalWidth`/`getComputedStyle`/`getBoundingClientRect`
read from the live DOM, console and network listeners attached before each
navigation. Four breakpoints: 1440, 1024, 820, 390px. A member session was created
with `SafeRiseAccess.signIn('audit@example.com')` for every member-page load.

**Scope actually covered.** All nine public pages and thirteen member surfaces named
in the brief. "Protocol pages" was sampled rather than exhaustive: `protocol.html`
default (t1-p01), plus one explicit query per track (`?track=2&protocol=01`,
`?track=3&protocol=08` — the second chosen because it's the pair renamed under
SR-347 earlier this session, a natural regression check). All 30 protocols were not
individually loaded; flagged here as a scope decision, not hidden.

**Environment note.** `tools/serve.py` is single-threaded
(`socketserver.TCPServer`, not a threading variant) and stalled the audit script
mid-run when something else held a connection open. A second, throwaway threaded
static server was started on a spare local port for this pass only and is not
part of the repo. Also: this sandbox has no outbound internet access, so any
`https://fonts.googleapis.com` request and any external link's actual reachability
could not be verified — Playwright's `load`/`networkidle` navigation states hang
indefinitely against that font request, so every page load used `domcontentloaded`
instead. This is noted wherever it limits a specific check below.

## Summary table

| Page | Links | Images | Console/Network | Animation | Layout | Copy |
|---|---|---|---|---|---|---|
| index.html | ⚠ pattern noted | ✅ | ✅ | ✅ | ✅ | ✅ |
| method.html | ⚠ pattern noted | ✅ | ✅ | ✅ | ✅ | ✅ |
| plans.html | ⚠ pattern noted | 🔴 BLOCKER | 🔴 BLOCKER | ✅ | ✅ | ✅ |
| live-sessions.html | ⚠ pattern noted | ✅ | ✅ | ✅ | ✅ | ✅ |
| about.html | ⚠ pattern noted | ✅ | ✅ | ✅ | ✅ | ✅ |
| coming-soon.html | ⚠ pattern noted | ✅ | ✅ | ✅ | ✅ | ✅ |
| personal-transformation.html | ⚠ pattern noted | ✅ | ✅ | ✅ | ✅ | ✅ |
| relationship-healing.html | ⚠ pattern noted | ✅ | ✅ | ✅ | ✅ | ✅ |
| professional-performance.html | ⚠ pattern noted | ✅ | ✅ | ✅ | ✅ | ✅ |
| dashboard.html | ⚠ pattern noted | ✅ | ✅ | ⚠ low-confidence | ✅ | ✅ |
| member-frameworks.html | ⚠ pattern noted | ✅ | ✅ | ✅ | ✅ | ✅ |
| member-heartmath.html | ⚠ pattern noted | ✅ | ✅ | ✅ | ✅ | ✅ |
| member-jung.html | ⚠ pattern noted | ✅ | ✅ | ✅ | ✅ | ✅ |
| member-kross.html | ⚠ pattern noted | ✅ | ✅ | ✅ | ✅ | ✅ |
| member-mate.html | ⚠ pattern noted | ✅ | ✅ | ✅ | ✅ | ✅ |
| member-porges.html | ⚠ pattern noted | ✅ | ✅ | ✅ | ✅ | ✅ |
| member-watts.html | ⚠ pattern noted | ✅ | ✅ | ✅ | ✅ | ✅ |
| member-coming-soon.html | ⚠ pattern noted | ✅ | ✅ | ✅ | ✅ | ✅ |
| protocol.html (t1-p01, t2-p01, t3-p08) | ⚠ pattern noted | ✅ | ✅ | ✅ | ✅ | LOW (ID format) |
| resource.html | ⚠ pattern noted | ✅ | ✅ | ✅ | ✅ | ✅ |

Legend: ✅ nothing found · ⚠ reported, not asserted as a defect (see notes) ·
🔴 BLOCKER present. Two sitewide findings (nav-dropdown `aria-expanded`, sub-44px
nav tap targets) apply identically across every page carrying the public nav and
are written up once below rather than repeated 20 times.

## Sitewide findings (apply to every page carrying the shared public nav)

### HIGH — nav dropdown `aria-expanded` goes wrong on a real mouse click
`.ndrop`'s `mouseenter` handler unconditionally adds the `open` class
(`js/saferise-nav.js:101`, and method.html's own inline copy at line 725, identical
logic). The trigger's `click` handler unconditionally *toggles* the same class
(`js/saferise-nav.js:96-100` / method.html:723-724). A real mouse click is
physically preceded by the pointer arriving on the element — so `mouseenter` fires
first and adds `open`, then the click's `toggle('open')` sees it already present
and **removes** it, setting `aria-expanded="false"` on a menu that is, at that
instant, still visually open.

It is still visually open because visibility is driven by a separate, unconditional
CSS rule — `.ndrop:hover .nmenu, .ndrop:focus-within .nmenu{opacity:1;visibility:
visible;...}` (`css/saferise-system.css:3351`) — which does not read the JS class at
all. So a sighted mouse user sees no functional break: the menu opens on hover and
stays open as long as the pointer remains over it, and its links are fully
clickable throughout. What breaks is only the JS-side state: `aria-expanded`
reports `false` and the `open` class is absent immediately after a click, while the
menu is demonstrably still on screen — a real, verified WCAG state-accuracy defect
for assistive tech, not a defect in the menu's visible behaviour.

**Confirmed, not guessed**: instrumented `addEventListener` directly, traced actual
call order, and separately confirmed keyboard-only interaction (`Tab` then `Enter`,
no mouse movement, so no prior `mouseenter`) sets `aria-expanded="true"` correctly
every time — the bug is specific to the mouse hover-then-click sequence. Reproduced
identically on `index.html` (shared `js/saferise-nav.js`) and `method.html` (its own
un-migrated inline copy), so it is present everywhere this nav renders: all nine
public pages plus the three track pages.

### MEDIUM — primary nav items are under the 44px touch-target guideline, at every breakpoint
`getBoundingClientRect()` on every `<a>`/`<button>` on every page, every breakpoint.
The primary nav row (`Protocols`, `Method`, `Plans`, `Live sessions`, `About`, the
theme toggle) measures 16–34px tall sitewide, **including at 1440px** — this is not
a mobile-only reflow issue, the hit boxes are simply sized to the text with no
padding, at every width tested. Not a blocker (desktop mouse users click precisely;
the links work), but a real, verifiable WCAG 2.5.5-adjacent gap that's most costly
at 390px on a touchscreen.

### LOW — Terms/Privacy footer links go nowhere, confirmed rather than assumed
`href="#"`, no `terms.html`/`privacy.html` anywhere in the repo (checked the full
file listing). This is one of the very few `href="#"` instances this audit can
report with confidence, because most of the ~150 other `href="#"` controls
sitewide (`Read ▸`, `Enter the reflection →`, carousel arrows, the resource-open
links, etc.) are wired through **delegated** `document.addEventListener('click', ...)`
handlers rather than an inline `onclick` — confirmed for the resource-open pattern
specifically, earlier this same session (SR-348's investigation). An automated
`onclick`-attribute check cannot see a delegated listener, so this audit does not
claim those are dead; it would take an individual click-and-observe pass per
control to confirm each one, which was out of scope for this pass. Reported as a
methodology limit (⚠), not papered over.

### LOW — internal protocol-ID attributes are inconsistently formatted, not user-visible
`data-resource`/`data-jprog-key` on `index.html`'s Track 2/3 cards use unpadded,
sometimes track-prefix-less IDs (`t3-p8`, `p1`) against `protocol.html`'s own
canonical `t{track}-p{2-digit}` (`t1-p01`) computed at
`protocol.html:1209/1228`. Not visible to a visitor (dev-tools only) — reported
because the brief asked for it, graded LOW because nothing a user reads is affected.

## Per-page findings

### index.html
- Links: the nav-dropdown finding above applies. Public→member links: only the
  documented exceptions found — `Log In`, and the protocol-preview cards (`.pc`
  links inside the `pcname`/carousel tickers, `href="protocol.html?track=…"` × 60
  DOM nodes, i.e. 30 unique protocols rendered twice each for the seamless-scroll
  loop — nothing outside the two documented exceptions). Zero undocumented
  public→member links.
- Images: 0 broken (after correcting this audit's own first-pass bug — see
  Methodology note below).
- Console/network: clean.
- Animation: `filmDrift` (hero background Ken-Burns drift) confirmed running;
  confirmed frozen under `prefers-reduced-motion: reduce`.
- Layout: no horizontal scroll, no hero/headline overlap at any of the four
  widths (SR-344's fix holds).
- Copy: protocol-carousel titles re-verified against `content/tracks.js` by direct
  source extraction (not the live-DOM pass, which double-counts due to the
  scroll-loop's duplicate nodes) — 30/30 match, 0 mismatches. (Two were found and
  fixed as SR-347 earlier this session; this is the confirming re-check, not a new
  finding.)

### method.html
- Links: nav-dropdown finding applies (own inline copy of the same bug,
  `method.html:719-744`). Public→member: only `Log In`. Terms/Privacy → `#`, no
  target page (see sitewide LOW above).
- Images, console/network, animation, layout, copy: clean.

### plans.html — 🔴 BLOCKER
- **`assets/pages/plans-hero.jpg` returns 404.** Confirmed three independent ways:
  the image's own `naturalWidth === 0`, a console error ("Failed to load resource:
  ... 404"), and a network response logged at status 404. `curl` against the
  served path confirms the file is genuinely absent from the repo, not a serving
  quirk. This is the page's own hero image — the first thing a visitor sees.
- Links: nav-dropdown finding applies. Public→member: `Log In` **and** "Already a
  member? Sign in" (`.ctaalt`) — both point at `dashboard.html`; treated as the
  same documented Log-In exception (a second sign-in CTA to the same page), not a
  new violation, but flagged here since it's not literally "the Log In nav item."
- Console/network: the 404 above; nothing else.
- Animation, layout, copy: clean.

### live-sessions.html
- Links: nav-dropdown finding applies. `Log In` only for public→member.
- Images, console/network, animation, layout, copy: clean.

### about.html
- Links: nav-dropdown finding applies. `Log In` only.
- Images, console/network, animation, layout, copy: clean. (Not part of this pass's
  scope, but noted in an earlier session: a "Why a pangolin" section further down
  this page has two genuinely empty image slots, `IMG-A1`/`IMG-A2` — real, but
  outside this audit's own image check because they render as a labelled slot
  panel, not an `<img>` tag with a `src`, so `naturalWidth` doesn't apply. Carried
  forward here for completeness since it's the same page.)

### coming-soon.html
- Links: nav-dropdown finding applies. `Log In` only.
- Images: 0 broken. (First pass of this audit falsely flagged 7 images here as
  broken — `coming-hero.jpg` and six `band-0N.jpg` — purely because they carry
  `loading="lazy"` and this audit checked `naturalWidth` before scrolling them
  into view. Confirmed by `curl` that every one of those files serves 200. Fixed
  the check, re-ran; corrected result is 0 broken. Reported so the false trail
  isn't repeated by a future pass reading only this file.)
- Console/network, animation, layout, copy: clean.

### personal-transformation.html
- Links: nav-dropdown finding applies (shared module). `Log In` only.
- Images: 0 broken (same lazy-load correction as coming-soon.html — `hero.jpg`,
  `t1-band.jpg`, `cost.jpg`, `range.jpg`, `four-steps.jpg`, `change.jpg` all serve
  200 and load once scrolled into view).
- Console/network: clean.
- Animation: 5 named animations confirmed running (`srTpFastPulse`,
  `srTpSlowPulse`, `srTpBreathDraw`, `srTpFourLight`, `srTpLoadDraw` — matches this
  track's documented diagram set); confirmed 0 still running under reduced motion.
- Layout, copy: clean.

### relationship-healing.html
- Same shape as personal-transformation.html. Animation: `srTpHalfPulse`,
  `srTpBreathDraw`, `srTpFourLight`, `srTpOrbitOut`, `srTpOrbitIn` running;
  0 under reduced motion. Links, images, console, layout, copy: clean.

### professional-performance.html
- Same shape. Animation: `srTpRoomPulse`, `srTpBracedDim`, `srTpSteadyLight`,
  `srTpBreathDraw`, `srTpFourLight`, `srTpLoadDraw` running; 0 under reduced
  motion. Links, images, console, layout, copy: clean.

### dashboard.html
- Links: no nav-dropdown control here (dashboard uses its own rail nav, not
  `#ptrig`) — not applicable, not a defect. `protocol.html` links (member→member,
  expected, not a public-page violation).
- Images: 0 broken.
- Console/network: clean.
- Animation: ⚠ **low-confidence, not asserted as a defect.** One element
  (`.sr-proto`, a one-shot 0.6s entrance animation, `css/saferise-dashboard.css:
  997-998`) reported `animationPlayState: 'running'` under reduced motion. `.sr-
  proto` is `display:none` by default and only shown via `body.reading
  .sr-proto{display:block}` (dashboard.css:323/325) — this audit's check ran on a
  fresh page load with nothing in a "reading" state, so the element most likely
  was never actually painted, and Chromium may report a timeline as "running" for
  an animation that never started rendering. Did not chase this further within
  this pass's budget; flagged rather than guessed at.
- Interactive: the record modal was reached by calling its real click handler
  directly (`document.querySelector('[data-modal="record"]').click()`) rather
  than Playwright's locator-based click, because **both** of the page's own
  trigger buttons (`data-modal="record"`, appearing twice) sit inside
  `display:none` summary panels (`.sr-sum-acts`, `.sr-cadence`) that only populate
  once a member has logged real sessions — expected and correct for a brand-new
  test account, not a defect. The modal itself opens correctly and closes on
  `Escape`.
- Layout, copy: clean.

### member-frameworks.html, member-heartmath.html, member-jung.html, member-kross.html, member-mate.html, member-porges.html, member-watts.html, member-coming-soon.html
- No `#ptrig`/`.themetog` on any of these (dashboard-family layout, own nav) — not
  applicable.
- Links: member→member only (`dashboard.html`, `member-frameworks.html`) —
  expected, no public-page violation since these aren't public pages.
- Images: 0 broken on any of the seven (spot-verified `member-heartmath.html`
  carries 4 real `<img>` elements, all loading, to confirm this "clean" reading
  isn't just an empty page).
- Console/network, animation, layout, copy: clean on all seven.

### protocol.html (t1-p01, t2-p01, t3-p08)
- Links: nav-dropdown not present (protocol pages use their own nav). Back-link to
  `dashboard.html` (member→member, expected).
- Images: 0 broken across all three protocol/track samples.
- Console/network: clean.
- Animation: none detected; not applicable for reduced-motion.
- Interactive: `<details>` (the FAQ accordion) spot-verified to toggle correctly
  (`open` → click → closed) using the real DOM state — this audit's first blanket
  pass wrongly reported "does not open on click" for every page, which turned out
  to be the audit's own test assuming every `<details>` starts closed; the first
  one on this page starts **open**, so a click correctly closes it. Corrected and
  re-verified directly. Did not exhaustively click every FAQ row on every page.
- Copy: rendered protocol title matches `content/tracks.js` for all three sampled
  IDs (Anxiety Reset / t1-p01, Safe Conversation / t2-p01, and — the specific
  regression check — **Decision Fatigue**, not "Decision Fatigue & Isolation," for
  t3-p08, confirming SR-347 held). ID-format finding: see sitewide LOW above.
  `mailto:?subject=...&body=...` (the "Email" share link) has no address before
  the `?` — that's the correct shape for a compose-new-email share link, not a
  malformed address; this audit's first pass incorrectly flagged it, corrected.

### resource.html
- Links: `Compare Plans`, back-to-practice — no nav-dropdown control present.
- Images: none broken (page carries no rendered `<img>` in the default embed
  state reached without `?embed=1` context).
- Console/network, animation, layout, copy: clean.

## The smallest fix set that clears every BLOCKER

Only one BLOCKER exists in this pass:

1. **Restore or correct `assets/pages/plans-hero.jpg`.** Either the file needs to
   be added at that exact path, or `plans.html`'s hero `<img>` needs its `src`
   corrected to wherever the intended asset actually lives. This alone clears the
   only 🔴 in this report.

Nothing else in this audit rises to BLOCKER. The HIGH nav-`aria-expanded` finding
and the MEDIUM tap-target finding are real and worth scheduling, but neither
breaks a journey or 404s — they're reported for prioritization, not as a gate.
