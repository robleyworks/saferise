# Run B — SR-108, SR-104, SR-109

Branch: `fix/accents-rails-a11y`
Base: `2e6a0c5` (= `origin/main`, PR #25 merge). SR-105 (`95592fc`) verified present in
`origin/main` via `git merge-base --is-ancestor` before any edit. Not cut from Run A's
branch, not stale.

Verification surface: a mirror of this working tree served on :8643 with
`Cache-Control: no-store` and a unique `?v=` stamp on every local css/js reference
(mirror only, never the repo). Run A lost three measurements to cache; the stamp plus
`no-store` makes a stale sheet impossible to serve. Ports checked before starting —
8642/8643/8644 free; :5000 is held by macOS ControlCenter, so it was avoided.

`node` is not installed on this machine (`command -v node` → nothing), so every JS block
touched was parsed with the browser's own parser via `new Function(src)`, which rejects
exactly the same syntax errors without executing, backed by a zero-error console check on
a real load.

---

## SR-108 · Track accent single source of truth

### The Track 01 check, first — no stop needed

The brief asked for Track 01's accent before anything else, because a teal-family Track 01
would put `#38C8BE` too close to it.

**Track 01 is `#D4A843` — gold, not teal.** It is the only track whose token and rendered
literal already agreed, and it is the same value as the site-wide `--primary` declared at
`index.html:17`. Track 03 therefore takes `#38C8BE` as decided; no differentiation problem,
no decision needed from Andre.

The `#4E9AA6` the brief named as the teal-family reference does exist in `index.html` — 21
occurrences — but it is **not** a track accent. It is `--pt-teal` (`index.html:5412`), a
secondary illustration hue used inside the Personal Transformation editorial SVGs for the
"slower route", "expand" and "before" series. It is also declared as `--teal` in
`saferise-dashboard.css:27` and `saferise-method.css:22`. It was left alone — see
"literals not converted" below.

### What was changed

**1 — the tokens (`css/saferise-system.css:47-50`)**

| token | was | now |
|---|---|---|
| `--sr-track01` | `#D4A843` | `#D4A843` (unchanged) |
| `--sr-track02` | `#FF6FA8` | `#E87090` |
| `--sr-track03` | `#5BC8D8` | `#38C8BE` |
| `--sr-track04` | `#B57BFF` | `#9B7FD4` |

The comment above the block now records why: the tokens held a more saturated set that only
`dashboard.html` ever rendered, while every page a visitor actually sees used the softer
set. The rendered design wins, so the tokens carry it.

**2 — the literals in `index.html`: 183 converted, 0 left**

| track | literal | converted to | count |
|---|---|---|---|
| 02 Relationship Healing | `#E87090` | `var(--sr-track02)` | **26** |
| 03 Professional | `#38C8BE` | `var(--sr-track03)` | **78** |
| 04 Elevation | `#9B7FD4` | `var(--sr-track04)` | **79** |
| | | **total** | **183** |

Zero occurrences of any of the three remain in the file. Every one of the 183 sat in a CSS
property position — `color` (93), `border-top` (26), `background` (22), `stroke` (19),
`border` (9), `fill` (6), `border-bottom-color` (3), `--sr-accent` (3), `border-left` (2).
None was inside an HTML comment, a `data:` URI, a `<meta>` tag or a JS string, so all 183
accept `var()` without restructuring.

Twenty-five of them are SVG **presentation attributes** (`fill=`/`stroke=`), which are the
one context where `var()` is not obviously safe. Two checks were run before converting them:
the browser resolves `fill="var(--sr-track03)"` correctly (verified by injecting a probe
rect and reading computed `fill`), and `index.html` already relies on the same pattern —
418 existing `fill="var(--primary)"` and 204 `stroke="var(--primary)"`. This is the file's
established idiom, not a new one.

**3 — the cover helper classes (`css/saferise-system.css:868-870`)**

```
.sr-cover-rose{--c1:#3A0F1E;--c2:var(--sr-track02);--c3:#1A0509}
.sr-cover-teal{--c1:#06282A;--c2:var(--sr-track03);--c3:#031415}
.sr-cover-gold{--c1:#2E2308;--c2:var(--sr-track01);--c3:#140E03}
```

`--c2` is the accent in each; `--c1`/`--c3` are the deep ground and shadow of the cover
gradient and are not track accents, so they stay as literals. `.sr-cover-gold` was converted
too even though its value never changes — leaving one of three restating a hex is how the
next disagreement starts. The comment block at `:849-850` that documented the per-track
inline accents was updated to name the tokens rather than the old hexes.

This is the part Run A flagged as blocking: `system.css` was the "source of truth" while
holding **both** palettes — `--sr-track02:#FF6FA8` alongside `.sr-cover-rose{--c2:#E87090}`
for the same track. It is now internally consistent.

### Literals deliberately NOT converted

| what | where | why not |
|---|---|---|
| `#D4A843` × 183 | `index.html` | This is `--primary`, the site-wide brand gold — page chrome, hero gradients, PT illustrations, the Reader — not a track-01 accent. It already equals `--sr-track01`, and the brief marks Track 01 unchanged. Converting it would silently re-point the whole site's primary colour at a track token. |
| `#4E9AA6` × 21 | `index.html:5412` and below | `--pt-teal`, a Personal Transformation illustration hue. Looks like a track accent (teal, editorial, adjacent to Track 03) but is a one-off — flagged, not converted. |
| `.sr-svc-group{--accent:#5BC8D8}` | `saferise-system.css:402` | **Worth flagging.** It restates the *old* `--sr-track03` value, but it is not a track accent: it is the "Join A Monthly Workshop" services card, and it renders the same teal on the Relationship (02) and Professional (03) sections alike — it does not vary by track. Pointing it at `var(--sr-track03)` would have re-tinted a couples-track surface with the corporate accent. Left as a literal; it is now the only place in the repo still carrying `#5BC8D8`. |
| `--sr-c04-2:#FF6FA8`, `--sr-c05-2:#B57BFF` | `saferise-system.css:33-34` | Protocol-identity cover colours for Abandonment and Shame. They coincidentally equal the old track02/track04 token values. The comment at `:860-866` records that these vars are already unreferenced. Not track accents. |
| `rgba(232,112,144,…)`, `rgba(56,200,190,…)`, `rgba(155,127,212,…)` | `index.html` (wash/border variants) | The same three accents restated at reduced alpha — `--sr-accent-wash`, `--sr-accent-border`, `border-bottom-color` on the nav tabs, tinted panel grounds. A hex token cannot be used inside `rgba()`, so these cannot be converted without introducing an `--sr-trackNN-rgb` channel triple. Out of scope for this item; they are the remaining restatement and are worth their own register entry. |

### Verification — render at 1440, before and after

Every element under `<body>` was probed in **all twelve program views** (`main` plus the
eleven `.prog-overlay` pages), capturing position, size, `color`, `background-color`, all
four border colours, `fill`, `stroke`, `stop-color`, `outline-color`,
`text-decoration-color`, `background-image`, `box-shadow`, `opacity`, `font-size`,
`letter-spacing`, `padding-top` and `margin-top`. Screenshot comparison was not used — the
hero is an autoplaying carousel, so consecutive loads are never pixel-identical.

```
views: 12       elements per view: 18,140      rows compared: 217,680
scrollHeight before: 12012    after: 12012
differing element-rows: 0
```

**Zero.** That is the correct result, and it is worth being explicit about why, because the
brief predicted "only the three accents should change" on this page: the decided values
*are* the values `index.html` was already rendering. The conversion is exactly
value-preserving there. Nothing on the marketing page moves, shifts hue, or reflows.

Zero diff could also mean the vars silently failed and coincidentally resolved to the same
colours — it cannot, since a failed `var()` would compute to black and show up — but a
positive test was run anyway. Each token was repointed at a sentinel colour at runtime and
the followers counted:

| token repointed | couples overlay | corporate overlay | elevation overlay |
|---|---|---|---|
| `--sr-track02` | **257** elements follow | 0 | 0 |
| `--sr-track03` | 0 | **258** elements follow | 0 |
| `--sr-track04` | 0 | 0 | **27** elements follow |

The conversion is real, and each token drives only its own track. No cross-contamination.

### Where the change *is* visible — `dashboard.html`

The dashboard is the only page that consumed `--sr-trackNN` before this run, so it is the
only page whose pixels change. Measured by A/B within a single page load (tokens repointed
to the old values, computed styles diffed, tokens restored — no reload, so no cache risk):

| dashboard state | elements changed | shift |
|---|---|---|
| default (track 01 selected) | **0** | track 01 is unchanged |
| track 02 selected | **7** | `rgb(255,111,168)` → `rgb(232,112,144)` |
| track 03 selected | **6** | `rgb(91,200,216)` → `rgb(56,200,190)` |
| track 04 selected | **9** | `rgb(181,123,255)` → `rgb(155,127,212)` |

That is the intended effect of the decision: the dashboard now shows the same accents as
the rest of the product. The affected nodes are the journey-rail SVGs and the accent tags
built by `renderJourney`/`render` from `TRACKMETA` (`dashboard.html:796-801`). Nothing else
on the page moved.

### Contrast

Every element that carries an accent **as text colour** and is actually rendered was
measured: effective background composited up the ancestor chain (including ancestor
opacity), effective opacity applied to the foreground, WCAG 2.1 ratio, large-text threshold
applied where `font-size ≥ 24px` or `≥ 18.66px` at weight ≥ 700.

```
100 rendered text instances across the twelve views, 21 distinct colour pairs
pairs below threshold: 0
```

| accent | worst pair found | on |
|---|---|---|
| 02 `#E87090` | **5.70:1** | `rgb(28,28,46)` — plan-card ground |
| 03 `#38C8BE` | **8.11:1** | `rgb(28,28,46)` — plan-card ground |
| 04 `#9B7FD4` | **4.56:1** | `rgb(38,36,59)` — "Right For You If" kicker, services view |

All pass 4.5:1. Track 04's 4.56:1 is the narrowest margin in the set — it passes, but there
is no headroom, so any future darkening of that card ground will break it.

Out of the brief's scope but cheap to state, since it is on the revenue path: where an
accent **fills** a button, contrast depends on the text colour sitting on it.

| accent fill | with `#fff` text | with `var(--bg)` `#080810` text |
|---|---|---|
| 02 `#E87090` | **2.94:1** | 6.79:1 |
| 03 `#38C8BE` | 2.06:1 (not used) | 9.67:1 |
| 04 `#9B7FD4` | 3.29:1 (not used) | 6.06:1 |

Most accent-filled controls already use the dark text and are fine. The Relationship track
has buttons using **white on `#E87090` at 2.94:1** (e.g. `index.html:6354`). Pre-existing,
not introduced here, and explicitly outside this item — **reported, not adjusted**.

### Syntax

All 10 inline `<script>` blocks in `index.html` (largest 179,750 chars), plus
`content/tracks.js` and `js/saferise-system.js`, parse clean via `new Function`. The browser
reports 959 rules parsed from `saferise-system.css` and zero console errors on load.


---

## SR-104 · Method rails land on the dashboard without opening what they name

### Step 1 — reproduced first, by clicking

Before any edit, every rail button on both pages was clicked with a real mouse click at
1440×900 and the landing state read back — URL, which modal was open, which rail button
carried `on`.

| from | button | lands on | modal open | verdict |
|---|---|---|---|---|
| `method.html` | Dashboard | `dashboard.html` | — | correct, the dashboard *is* the destination |
| `method.html` | Where the method comes from | stays on `method.html` | — | correct, already here |
| `method.html` | **Sessions & workshops** | `dashboard.html` | **none** | **defect** |
| `method.html` | **Account & plan** | `dashboard.html` | **none** | **defect** |
| `method-porges.html` | Dashboard | `dashboard.html` | — | correct |
| `method-porges.html` | Where the method comes from | stays on `method-porges.html` | — | **see "reported, not fixed"** |
| `method-porges.html` | **Sessions & workshops** | `dashboard.html` | **none** | **defect** |
| `method-porges.html` | **Account & plan** | `dashboard.html` | **none** | **defect** |

The register's description holds exactly. `PAGES` on those pages was
`{ method, dashboard }`, so `coaching` and `account` matched nothing and fell through to
`window.location.href = PAGES[key] || 'dashboard.html'` — a bare redirect. The member
arrives on the dashboard with the view they asked for never opened.

For the record, what "arriving correctly" looks like was established by clicking the same
two buttons on the dashboard's own rail, where they work:

| dashboard rail button | opens |
|---|---|
| Sessions & workshops | `#mLayer`, the Sessions view — heading "Your booked dates" |
| Account & plan | `#mRoute` — "Account & plan · Not built yet · /account" |

### The fix — the route travels with the navigation

The dashboard already resolves every rail route through `openRoute()`, which checks `PAGES`
→ `LAYERS` → `ROUTES`. Rather than teach the method pages a second copy of that logic, they
now hand the route over and let the one resolver answer:

`method.html` / `method-porges.html` — a route with no page of its own leaves for
`dashboard.html#route=<key>` instead of a bare `dashboard.html`.

`dashboard.html` — an arrival handler reads the hash and calls the same `openRoute()` the
rail here uses. Four details are load-bearing:

- **Deferred to `DOMContentLoaded`.** `openModal()` reads `MODALS` and `VIEWS`, which are
  `var`s assigned further down the same 78,606-char inline block. Function declarations
  hoist; their data does not. Running the handler where it is written in source would call
  `openModal` with `MODALS` still `undefined`.
- **`PAGES` keys are ignored.** A stray `#route=method` would otherwise send the member
  straight back to the page they just left, in a loop. Verified: `dashboard.html#route=method`
  stays on the dashboard, opens nothing, and does not bounce.
- **Unknown keys are ignored.** `#route=nonsense` opens nothing and throws nothing.
- **The hash is cleared with `history.replaceState` before the route opens**, so a reload
  lands on the dashboard rather than reopening the layer. Verified by reloading after arrival:
  no modal, rail back to `dashboard`.

The rail's `on` state is moved to the arriving route as well, but only when a rail button
for that route actually exists — otherwise a route with no rail button would strip `on` from
every button and leave the rail showing nothing.

### Verification — by clicking, all four paths

Real mouse clicks at 1440×900, fresh page load before each, mirror re-synced and served
`no-store`:

| from | button | lands on | modal open | rail `on` | hash |
|---|---|---|---|---|---|
| `method.html` | Sessions & workshops | `dashboard.html` | **`mLayer` — "Your booked dates"** | `coaching` | cleared |
| `method.html` | Account & plan | `dashboard.html` | **`mRoute` — "Account & plan", `/account`** | `account` | cleared |
| `method-porges.html` | Sessions & workshops | `dashboard.html` | **`mLayer` — "Your booked dates"** | `coaching` | cleared |
| `method-porges.html` | Account & plan | `dashboard.html` | **`mRoute` — "Account & plan", `/account`** | `account` | cleared |

Focus after arrival lands on the modal's close button (`BUTTON.sr-modalclose`), the same as
opening the layer from the dashboard's own rail.

Whole-rail regression, also by clicking: the Dashboard button on both pages still lands on a
plain dashboard with nothing open; the method button on `method.html` still no-ops; the
dashboard's own rail still opens both views. No console errors on any page. All four inline
`<script>` blocks across the three files parse clean via `new Function`.

`method.html` and `method-porges.html` and `dashboard.html` are the only three files in the
repo carrying `.sr-dash-navrailbtn`, and no `PAGES[key] || 'dashboard.html'` fall-through
remains anywhere.

### Reported, not fixed — one more control that names a destination it does not reach

On **`method-porges.html`**, the rail button labelled **"Where the method comes from"** is
marked `on` and returns early on `key === 'method'` — "already here". But this page is
`method-porges.html`, a framework sub-page; `method.html` is a different page, and the
backbar directly above the rail links to it. Clicking the rail button does nothing at all.

Verified by clicking: URL and title unchanged, nothing opens.

This is the same shape as the item just fixed — a control naming a destination it does not
reach — but it is a *different* control on a *different* condition, so per the brief it is
**reported, not fixed**. The fix is one line (`if(key === 'method' && /method\.html$/.test(location.pathname)) return;`)
but it changes which page the rail considers "here", which is a decision about how the
framework sub-pages sit under the method section, not a bug fix. New register item.
