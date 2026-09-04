# SafeRise — public-page invariants

This file exists because a hand-delivered drop of `plans.html`, `method.html`,
`live-sessions.html` and `about.html` silently reverted a committed fix (theme
persistence, `sessionStorage['sr-theme']` → `localStorage['sr.theme']`) along
with several other divergences from ground truth that had never been written
down anywhere. The fix was invisible in the drop's diff against itself — it
only showed up by comparing the new files against `dashboard.html` line by
line. This list exists so the next drop is checked against it, rather than
rediscovered.

Any hand-delivered public page must carry:

- **Theme**: `sessionStorage`, key `'sr-theme'`. Implementation copied
  verbatim from `dashboard.html`'s `setTheme`/`THEME_KEY` block — never
  reimplemented from a description of what it should do.
- **"Rests on:" lines**: verbatim from `dashboard.html`'s `SOURCES` object.
  Not paraphrased, even lightly — these are credibility claims, not
  descriptive copy.
- **Icons**: from `dashboard.html`'s `ICO` map, matched to the resource the
  same way `dashboard.html`'s `RES` array matches them (i.e. `gear` →
  "How This Works", `card` → "Cue Card", etc.).
- **Nav**: current public structure — Protocols ▾ (three tracks +
  coming-soon) · Method · Plans · Live sessions · About · Log in.
- `dashboard.html`'s member nav is a separate structure and must never be
  replaced by, or merged with, the public nav.
- **Prices**: €19 / €29 / €39 monthly tiers; €29 person and €39 couple
  workshops; €129 1:1; Elevation shows no figure.
- **Protocol titles**: from `content/tracks.js`, never from memory or an
  earlier drop.
- **Terms and Privacy**: remain `href="#"` until those pages exist.

## The two surfaces (SR-320)

Every page on this site belongs to exactly one of two surfaces. A third
visual language is not permitted — a new page is either public or member,
never something in between.

**PUBLIC · decorated.** Headings in Cormorant Garamond 300 with italic
gold-lt accents, gradient band/card fills
(`linear-gradient(145deg,rgba(24,24,34,.86),rgba(14,14,21,.92))`), 18px
band radius, ground `#0A0A0F`, hairline `rgba(245,237,216,.09)`. Public
pages persuade someone who has not joined yet.

- `plans.html`, `method.html`, `live-sessions.html`, `about.html`,
  `coming-soon.html`, `anxiety-reset.html` — hand-authored, own inline `<style>`.
- `personal-transformation.html`, `relationship-healing.html`,
  `professional-performance.html` — rendered by `js/saferise-track.js`
  from `content/tracks.js`, styled by the `.sr-tp` block in
  `css/saferise-system.css`.

**MEMBER · restrained.** Cinzel headings, flat card fills, no gradient.
Member pages get out of the way while someone is in a difficult state —
this is deliberate, not an oversight to "fix" toward the public look.

- `dashboard.html`, `protocol.html`, `resource.html`.
- `member-frameworks.html` and the six `member-*.html` framework pages
  (jung, kross, watts, mate, porges, heartmath) — styled by
  `css/saferise-method.css`. **SR-324 · moved here from PUBLIC**, reversing
  part of SR-320/321: these seven were briefly given the decorated
  treatment, then confirmed member-only and reverted — Cinzel 400 headings
  again, flat `#15151F`/`#0E0E1A` card and band fills, `#08080C` ground,
  `#22222E` hairlines. Sunrise support and `sessionStorage['sr-theme']`
  were never removed and still carry. All seven already used
  `dashboard.html`'s member nav-rail (`.sr-dash-navrail`) — that part of
  SR-320/321 never touched it, so there was nothing to add. **SR-335 ·
  the rail is no longer nine separate copies.** `SafeRiseRail.render()`
  (`js/saferise-rail.js`) now owns the markup, the `PAGES` map, click
  delegation and the theme toggle; `css/saferise-rail.css` is the one
  source of `.sr-dash-navrail*`. A page that carries the rail loads both
  files and calls `SafeRiseRail.render(activeRoute)` — it does not paste
  the markup or the CSS in again. See that module's own header comment
  for the `onRoute`/`theme` options `dashboard.html` needs and no other
  page does.

  **SR-336 · the same is now true of the public footer.** The grouped
  four-column footer (Tracks / SafeRise / Help / Legal) is
  `SafeRiseFooter.render()` (`js/saferise-footer.js`), styled by
  `css/saferise-footer.css` under `sr-pf-*` class names — deliberately
  NOT `.foot`/`.scope`, which `css/saferise-system.css` already defines
  unscoped for `index.html`'s own footer (SR-332); a page loading both
  stylesheets would otherwise get whichever `.foot` rule happened to
  load last. Nine public pages call it: `about.html`, `anxiety-reset.html`,
  `coming-soon.html`, `live-sessions.html`, `method.html`, `plans.html`,
  and the three track pages. `index.html` is deliberately NOT one of the
  nine — it keeps its own SR-332 `.foot` and the separate, older
  `sr-footer-template` partial (still feeding `#main-content` and every
  `.prog-overlay`), both untouched; see the SR-336 fix-register entry for
  the resulting stacked-footer state there, reported rather than
  resolved.

  **SR-339 · the six self-contained public pages' own tokens are no
  longer six copies either.** `.sr-public` in `css/saferise-system.css`
  carries the `--bg`/`--gold`/`--hair`/etc. block SR-336 already confirmed
  byte-identical across `about.html`, `anxiety-reset.html`,
  `coming-soon.html`, `live-sessions.html`, `method.html` and `plans.html`
  — each now adds `class="sr-public"` to `<body>` and loads
  `css/saferise-system.css`, rather than carrying its own copy of the
  block. Scoped for the same reason `.sr-home`/`.sr-tp` are: a bare
  `:root` would repaint `index.html`'s own unscoped tokens and
  `dashboard.html`'s/the three track pages' differently-valued ones.
  Each page's own `<style>html,body{background:…}</style>`
  flash-prevention snippet stays inline, deliberately — it predates the
  token system and exists so the browser has something to paint before
  any stylesheet arrives.
  **`member-` is now this repo's convention for a member-surface page
  whose name would otherwise collide with, or be confused for, a
  public one** — the rename that prompted it: `method.html` (public) and
  the old bare `frameworks.html`/`method-*.html` (member) shared the word
  "method," which read as one system from a filename alone when they are
  two. `dashboard.html`, `protocol.html` and `resource.html` predate the
  convention and keep their bare names — there is no public page any of
  those three could be mistaken for.
  **`method.html` (public, a narrative explainer of the six frameworks)
  and `member-frameworks.html` (member, the full attribution/credits
  register) are DIFFERENT PAGES and must not be conflated** — this is the
  exact confusion the rename exists to prevent.

  **SR-341 · the public nav is no longer copied per page either, though
  only the three track pages have been moved onto the shared module yet.**
  `SafeRiseNav.render(current)` (`js/saferise-nav.js`) owns the markup and
  the dropdown open/close/theme script; `css/saferise-system.css`'s
  `.nav`/`.ndrop`/`.nmenu` block (SR-332, completed by SR-341's gap-bridge
  fix and current-page marker) is the one CSS source. The six
  self-contained public pages (`about.html`, `anxiety-reset.html`,
  `coming-soon.html`, `live-sessions.html`, `method.html`, `plans.html`)
  still hand-carry their own copy of this same nav rather than calling the
  module — that consolidation is a later step, not yet done. A hand-
  delivered drop of any of those six should still be checked for nav drift
  against `method.html`'s own copy (the one with the gap-bridge fix
  already inline) until they're migrated too.
- The resource reader inside `index.html` (`openReader`/`READER_PROTOCOLS`
  and everything `docs/INTEGRATION.md` and `CLAUDE.md`'s platform-landmines
  section describe).

**Never differs across either line** — same value in both palettes, both
surfaces: `--gold` `#D4A843`/`#FFD894` (sunrise), `--gold-lt`, `--teal`,
`--text`, `--text2`, `--text3`, `--mob`, `--safe`, `--shut` (autonomic
states, not tracks — never rename or repurpose them), the icon set, and
`sessionStorage['sr-theme']` plus both its palettes (midnight and
sunrise render differently, but the same two palettes apply everywhere
that theme is implemented at all). A page that changes any of these to
look more "its own" has drifted off both surfaces at once.

A page's surface is fixed by what kind of moment it serves, not by when
it was built or who built it. When adding a new page, decide which
surface it belongs to before writing its first line of CSS — never
average the two, and never invent a third look because a mockup made it
look like a nice middle ground.

### `index.html`'s homepage: nav, theme toggle, and the `.sr-home` scoping trap (SR-332)

`index.html` closes the gap SR-322 deliberately left open ("this page has no theme toggle yet
... when a toggle is added here it must use the sessionStorage['sr-theme'] mechanism already
used everywhere else"). `#main-nav` (legacy, inline-styled) is replaced by the same
`.nav`/`.ndrop`/`.foot` pattern every other public page uses, with its own real theme toggle.
`.nav` and `.foot` sit OUTSIDE `.sr-home` in the markup (`.nav` as a sibling of `#main-content`,
`.foot` nested as the last child of `.sr-home` alongside `#filmModal`) — each carries its own
small local `--bg`/`--gold`/… token block in `css/saferise-system.css` rather than relying on
`.sr-home`'s, for the same reason PART C's own comment gives for `.sr-tp`: index.html already
has an unscoped `:root` that the reader, resource modals and every `.prog-overlay` still depend
on, so nothing here may touch a bare `:root`.

**The scoping trap this caused, twice, in one pass:** prefixing every selector in a page's own
CSS with `.sr-home ` to bring it into the shared system sheet is *not* a mechanical find-and-
replace. A selector whose first component is `.sr-home`'s own ANCESTOR — `:root`, `html`, or
`body[data-open="…"]` — breaks if `.sr-home` is prepended in front of it: `.sr-home :root` and
`.sr-home body[...]` can never match anything, since `.sr-home` is always a *descendant* of
`body`/`html`, never an ancestor of them. The fix is selector-dependent, not one rule: `:root`
and `html` become `.sr-home` itself (it already carries the equivalent of a local `:root`);
`body[data-open="t1"] #step-t1` needs `.sr-home` inserted *after* `body[...]`, not before it
(`body[data-open="t1"] .sr-home #step-t1`) — exactly the pattern the pre-existing
`body[data-open] .sr-home .door` rule from the same file already used correctly. The same
mistake bit the door-controller JS too: `document.querySelector('.sr-home .ndrop')` returned
null because `.ndrop` lives in `.nav`, a sibling of `.sr-home`, not a descendant — and because
that line sat inside the same IIFE as the film-modal listeners, the null-reference error
silently aborted everything defined after it in that function. Any future pass that lifts
another page's CSS or JS into a `.sr-home`/`.sr-tp`-scoped block should check every selector
and every `querySelector` call against where the referenced element actually lives in *this*
page's DOM, not assume the source page's flat structure carries over.

## No public page links to a member page (SR-325)

**No public page links to a member page.** The only exception is the
"Log in" nav item. If a public page needs to reference member content, it
describes it in text rather than linking — the six framework names on
`method.html`'s register are the model: named, attributed, and marked
peer-reviewed / clinical practice / interpretive, all as plain text, no
`<a>`.

**The one documented exception**, and it stays an exception rather than a
loophole: the 30 protocol-preview cards on the three public track pages
link to `protocol.html` (a member page) by design. They are the
carousel's core content interaction, not navigation — a visitor is
opening a specific protocol, not browsing to "the member area" — and
`protocol.html` itself decides what a signed-out visitor sees there
(the soft gate, SR-326). Do not remove this link reflexively because it
matches the pattern; it was confirmed as the one place the rule doesn't
apply.

**Why this file exists, restated with the sharper example:** `SR-318`'s
hand-delivered drop didn't just revert the theme mechanism
(`sessionStorage['sr-theme']` → `localStorage['sr.theme']`, the incident
that opened this file) — it also silently reverted a **second**,
independently-committed fix in the same drop: `method.html`'s six
framework names had been wrapped in links to their framework pages in an
earlier pass, and the drop's stale snapshot predated that pass, so the
links were gone with no diff to flag it. Two committed fixes, lost by the
same hand-delivered page, for the same underlying reason — a page
generated from a snapshot older than the fixes it silently undid. Check
every invariant in this file against a hand-delivered drop, not just the
one that broke last time.
