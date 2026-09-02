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
  SR-320/321 never touched it, so there was nothing to add.
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
