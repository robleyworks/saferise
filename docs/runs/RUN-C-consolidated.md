# Run C (consolidated) — SR-110 … SR-119

Branch: `fix/track-pages-and-audit`
Base: `7ba529b`, byte-identical to `origin/main` (`git rev-list --left-right --count
origin/main...HEAD` → `0  0`, merge-base = HEAD). Run B's three commits verified present
in that base before any measurement: SR-108 `b9e5ff5`, SR-104 `860dae3`, SR-109 `f259e1e`.
Not cut from Run B's branch, not stale. Tree clean at start.

Verification surface: `scratchpad/coldserve.py` on :8642, explicit root, `Cache-Control:
no-store` + `Pragma: no-cache` + `Expires: 0` on every response, with a unique `?cb=`
stamp per measurement. Port confirmed free before starting (`lsof -nP -iTCP:8642` → empty);
no previous session's server was holding it. The repo's own `tools/serve.py` could not be
used — the preview runner's sandbox denies the relative path (`can't open file
'tools/serve.py': Operation not permitted`), which is why the scratchpad copy exists. The
copy differs from `tools/serve.py` only by an absolute `ROOT` and the no-store headers.
The template comparison in §1b ran on a second server (:8643, also confirmed free) rooted
at the Desktop project directory, stopped immediately afterwards.

`node` is not installed (`node --version` → not found), so every measurement below was
taken by rendering in the browser and reading the live object graph, not by static parsing.

---

# PHASE 1 — investigation. No files were edited.

**Headline: five of the nine briefed items do not reproduce against this tree.** Four were
completed by earlier runs and the brief is working from notes that predate them; one cites
a source file that does not exist. The two items that do reproduce exactly are SR-115 and
the dashboard Elevation CTA. Details per item below, and a consolidated verdict table at
the end of this phase.

---

## 1a · What does the live Track 01 page actually use?

**It uses the render functions. All three track pages already exist in the repo and all
three are already fully data-driven.**

| page | body | data |
|---|---|---|
| [personal-transformation.html](personal-transformation.html) | 1,878 B | `SafeRiseTrack.render(1)` |
| [relationship-healing.html](relationship-healing.html) | 1,865 B | `SafeRiseTrack.render(2)` |
| [professional-performance.html](professional-performance.html) | 1,872 B | `SafeRiseTrack.render(3)` |

Each is a shell: `<nav id="navlinks">` empty, `<div id="page">` empty, then

```html
<script src="content/tracks.js"></script>
<script src="js/saferise-track.js"></script>
<script>SafeRiseTrack.render(N);</script>
```

`js/saferise-track.js` (420 lines) is the repo's descendant of the template's renderer.
It is not a hand-built copy of the layout — it is the same twelve-section assembly, with
the template's `GAPS` counter renamed `MISSING` and surfaced on `window.SR_TRACK_MISSING`
instead of a visible counter, "so a live page stays quiet" ([js/saferise-track.js:43](js/saferise-track.js:43)).

**Consequence for Phase 5: there is nothing to wire.** SR-112 is not a two-page job or a
three-page job. It is already done. See the verdict table.

---

## 1b · Template `TRACKS` versus repo `content/tracks.js`

**Zero fields present in one and absent in the other, in either direction.** The field
sets are identical:

```
id  visible  status  name  kicker  heroTitle  heroRule  heroBody  relation  price
art  protocols  cost  range  journey  change  priceList  priceNote  stickyLine  faq
```

Identical for tracks 1, 2 and 3. `TRACKS[4]` is `{id, visible, status, name}` in both.
`SHARED` keys identical in both: `fourSteps  resources  resourceNote  insight  progress
scope  faq`. `art` sub-keys identical in both: `band  cost  range  change`.

The differences are all in **values**, and in every case **the repo is the newer of the
two**:

| | template | repo |
|---|---|---|
| `SHARED.resources` | 12 | **9** — `Why I Built This One`, `Source Insights`, `Reference Case` removed |
| `PRICING` | one `workshop` key, €29 | `workshopPersonal` €59, `workshopRelationship` €139, `premium` €275 (SR-091) |
| HTML entities | `&amp;` in data strings | literal `&` |
| `SHARED.faq` | 12 items | 12 items, **different copy** |
| `TRACKS[1].faq` | 6 items | 6 items, **byte-identical** (hash `490186133` both sides) |
| `TRACKS[2].faq` | 6 items | 6 items, same questions, different answer copy |
| `TRACKS[3].faq` | 6 items | 6 items, Q4 differs: *"I do not have ten minutes."* → *"I do not have time for a full session."* |

The `Desktop/Saferise htmls/Tracks.js` sitting beside the template is the same older
generation (728 lines vs the repo's 793; 304 diff lines). **The template is a stale
snapshot of the repo, not a source for it.** Nothing in it should be copied inward.

---

## 1c · GAPS for Tracks 02 and 03, measured against the repo's `tracks.js`

Measured cold, fresh tab per track, `?cb=` stamped, reading `window.SR_TRACK_MISSING`.

| | GAPS / `MISSING` | protocol cards | sections | FAQ items | nav entries |
|---|---|---|---|---|---|
| Track 01 | **0** | 10 | 12 | 18 | 3 tracks |
| Track 02 | **0** | 10 | 12 | 18 | 3 tracks |
| Track 03 | **0** | 10 | 12 | 18 | 3 tracks |

**No `data-field` names are marked, on any track.** The expectation stated in the brief
is confirmed and extends to Track 01: hero, ten protocols, cost, range, change, price,
priceList, priceNote and stickyLine are all populated on all three.

The template's own counter reads `GAPS 0` for Track 1 as well, so the two agree.

**Image slots are the only thing outstanding**, and they are outstanding by design —
`brief()` degrades every art slot to a labelled brief rather than an error. Five per track,
listed in Phase 5's section below rather than here.

---

## 1d · THE RESOURCE CONTENT AUDIT

### Where the content actually lives

**One location: `index.html`.** `RESOURCE_CONTENT` ([index.html:3942](index.html:3942)) and
`READER_PROTOCOLS` ([index.html:4920](index.html:4920)). Nothing else in the repo holds any.

| file | `RESOURCE_CONTENT` | `READER_PROTOCOLS` | t2-/t3- keys | loads `tracks.js` |
|---|---|---|---|---|
| `index.html` | 119 entries | 30 entries | yes | yes |
| `resource.html` | 0 | 0 | 0 | no |
| `protocol.html` | 0 | 0 | 0 | no |
| `Desktop/…/saferise-resource-reader.html` | 0 | 0 | 0 | no |

The brief's expectation holds: `resource.html` (`<title>SafeRise — Anxiety Reset · Resource
Reader</title>`) and `protocol.html` (`<title>SafeRise — Anxiety Reset Protocol</title>`)
are both hardcoded to Anxiety Reset with no protocol keying, as is the Desktop standalone.
None of the three holds content the other locations lack — they hold **no** keyed content
at all.

### The taxonomy problem — read this before the grid

`RESOURCE_CONTENT` is **not keyed to the nine resources in `SHARED.resources`.** It uses a
different, per-track taxonomy, and the two only partially overlap. This is the single most
important finding in the audit, because it means "how many of the nine are written" cannot
be read off the content store directly.

Actual `RESOURCE_CONTENT` inventory, by track and suffix:

| group | `kind` | n | verdict | maps to which of the nine |
|---|---|---|---|---|
| `p{1-10}-guide` | Protocol Guide | 10 | written | **none** — no equivalent in the nine |
| `p{1-10}-companion` | Somatic Release | 10 | written | Somatic Release Activities |
| `p{1-10}-crisiscard` | Cue Card | 10 | written | Cue Card |
| `p{1-10}-disclosure` | Disclosure & Support | 10 | **9 stub, 1 written** | Disclosure & Support |
| `p{…}-advisory` | Attention Advisory | 7 | written | Proximity Guide (cond.) |
| `p{…}-repair` | Invitation to Repair | 4 | written | Invitation to Repair (cond.) |
| `p{1-10}-founder` | Founder Video | 10 | **stub ×10** | *(was "Why I Built This One")* |
| `p{1-10}-decision` | The Decision | 10 | **absent — `body:[""]`** | **none** |
| `t2-p{1-10}-guide` | Session Guide | 10 | written | **none** |
| `t2-p{1-10}-safety` | Safety Score | 10 | written | **none** |
| `t3-p{1-10}-guide` | Meditation Script | 10 | written | Guided Meditation |
| `t3-p{1-10}-companion` | Somatic Release Activities | 10 | written | Somatic Release Activities |

Classification rule, applied uniformly and reproducibly: body text stripped of markup and
whitespace-normalised; **absent** = empty; **stub** = byte-identical to at least one other
protocol in the same group (i.e. boilerplate, not protocol-specific); **written** =
unique to that protocol. No character-count threshold was used, so a genuinely short but
specific entry (several of the T3 companions run 107–160 chars) still counts as written.

Three of the nine — **How This Works**, **Safe Practice**, **Your Record** — have **no
content anywhere, on any of the thirty**. Two `RESOURCE_CONTENT` kinds (`Protocol Guide`,
`The Decision`, plus T2's `Session Guide` and `Safety Score`) have no counterpart among
the nine at all.

### "Why I Built This One" — reported separately, as instructed

It is **no longer one of the nine.** It was removed from `SHARED.resources` by SR-089 and
both its players were removed from `index.html` by SR-097. It survives only as
`p{1-10}-founder`, `kind: "Founder Video"`, and all ten bodies are the **same 105-character
sentence**:

> "A short video on why this protocol exists, and how it fits into the wider Personal
> Transformation series."

So the brief's characterisation is right in substance — knowingly unwritten across the
board — but it is **stub ×10 on Track 01 only and absent on Tracks 02 and 03**, and it sits
outside the denominator rather than inside it. It distorts nothing in the grid below.

### The 30 × 9 grid

`w` = written · `s` = stub · `—` = absent · `n/a` = conditional, not applicable per `extras`
· `n/a?` = conditional, **denominator unknown** because `extras` is `null`

| | Guided Med. | Cue Card | How This Works | Somatic Rel. | Safe Practice | Proximity (c) | Disclosure | Invitation (c) | Your Record |
|---|---|---|---|---|---|---|---|---|---|
| t1-01 | — | w | — | w | — | n/a | s | n/a | — |
| t1-02 | — | w | — | w | — | w | **w** | w | — |
| t1-03 | — | w | — | w | — | w | s | n/a | — |
| t1-04 | — | w | — | w | — | w | s | w | — |
| t1-05 | — | w | — | w | — | n/a | s | n/a | — |
| t1-06 | — | w | — | w | — | n/a | s | n/a | — |
| t1-07 | — | w | — | w | — | n/a | s | n/a | — |
| t1-08 | — | w | — | w | — | w | s | w | — |
| t1-09 | — | w | — | w | — | w | s | w | — |
| t1-10 | — | w | — | w | — | w | s | n/a | — |
| t2-01 … t2-10 | — | — | — | — | — | n/a? | — | n/a? | — |
| t3-01 … t3-10 | **w** | — | — | **w** | — | n/a? | — | n/a? | — |

(Tracks 02 and 03 are uniform across all ten rows — every one of the twenty is identical
to its track's row above. Track 02: nothing among the nine. Track 03: Guided Meditation and
Somatic Release Activities, both written, on all ten.)

### Totals against each protocol's real denominator

Denominators derived from `extras`, per instruction — never assumed to be nine.

**Track 01** (denominators known: 7 where `extras: []`, 8 with one flag, 9 with both)

| | written | stub | absent | conditional n/a | denominator |
|---|---|---|---|---|---|
| t1-01 | 2 | 1 | 4 | 2 | 7 |
| t1-02 | 5 | 0 | 4 | 0 | 9 |
| t1-03 | 3 | 1 | 4 | 1 | 8 |
| t1-04 | 4 | 1 | 4 | 0 | 9 |
| t1-05 | 2 | 1 | 4 | 2 | 7 |
| t1-06 | 2 | 1 | 4 | 2 | 7 |
| t1-07 | 2 | 1 | 4 | 2 | 7 |
| t1-08 | 4 | 1 | 4 | 0 | 9 |
| t1-09 | 4 | 1 | 4 | 0 | 9 |
| t1-10 | 3 | 1 | 4 | 1 | 8 |
| **Track 01 total** | **31** | **9** | **40** | **10** | **80** |

**Track 02** — 0 written, 0 stub, 70 absent, 20 conditional-indeterminate. Denominator
per protocol is **7 minimum, 9 maximum** and cannot be fixed until 8b is decided.
Of the nine, Track 02 has **nothing**.

**Track 03** — 20 written (Guided Meditation ×10, Somatic Release Activities ×10),
0 stub, 50 absent, 20 conditional-indeterminate. Same 7-to-9 denominator caveat.

**All thirty, against the nine: 51 written, 9 stub, 160 absent, 50 conditional-indeterminate.**

### What the site actually delivers, versus what it claims

This is the number the launch decision turns on, and it is worse than the grid alone
suggests. `protocolResourceCount()` in `tracks.js` is what tells a member how many
resources a protocol has. `READER_PROTOCOLS[].keys.length` is how many pages the Reader
can actually build.

| | claims (`protocolResourceCount`) | delivers (Reader pages) | short by |
|---|---|---|---|
| t1-01 | 7 | 7 | 0 |
| t1-02 | 9 | 7 | **2** |
| t1-03 | 8 | 7 | 1 |
| t1-04 | 9 | 8 | 1 |
| t1-05 / 06 / 07 | 7 | 6 | 1 each |
| t1-08 | 9 | 8 | 1 |
| t1-09 | 9 | 8 | 1 |
| t1-10 | 8 | 8 | 0 |
| **t2-01 … t2-10** | **7** | **2** | **5 each** |
| **t3-01 … t3-10** | **7** | **2** | **5 each** |

Eight of ten Track 01 protocols overstate by one or two. **Every Track 02 and Track 03
protocol overstates by five** — the page says seven resources and the Reader has two.
And the Reader's two include `Session Guide` / `Safety Score` / `Meditation Script`, which
are not among the nine the count is derived from, so the overlap is smaller still.

**Recommendation for the launch plan: Tracks 02 and 03 are not shippable at launch on
resource completeness.** Track 02 has no content for any of the nine. Track 03 has two of
seven. `visible: false` on both, or the price and the `priceList` copy have to stop
promising a library that is not there.

### One orphan found

`p1-advisory` exists and is written, and `READER_PROTOCOLS.p1` lists it — but
`META['t1-01'].extras` is `[]`, which says the Proximity Guide does **not** apply to
Anxiety Reset. Content and data disagree, and the Reader follows the content. Everywhere
else the two agree exactly (the four `*-repair` keys match the four `invitation` flags
precisely). Worth a register entry; not fixed in this run.

---

## 1e · Track 04 routes, and why `visible: false` did not stop them

### The mechanism — this is the part that matters

`visible` is read in **exactly two places in the entire repo**, both inside
`js/saferise-track.js`:

- [js/saferise-track.js:352](js/saferise-track.js:352) — `renderNav`, deciding nav links
- [js/saferise-track.js:399](js/saferise-track.js:399) — `renderTrack`, refusing to render a hidden record

Both live in the track-page renderer, which is loaded by exactly three files — the three
track pages. `index.html`, `dashboard.html` and `protocol.html` **never read it**.
(`index.html:220` has `.reveal.visible`, an unrelated CSS class — it will match a careless
grep.)

**There is no routing layer to fix.** The site is a set of static HTML files served
directly; Track 04 has no page of its own and therefore no route to remove. Every Elevation
surface is hardcoded markup or hardcoded JS inside three pages. `visible: false` never had
anything to act on, and adding a routing-layer guard is not possible without inventing a
router — which is well outside this run.

Note also that `renderNav` gates on `t.visible && ROUTES[k]`, and `ROUTES` has no key `4`.
Track 04 is excluded twice over on the surfaces that do consult the data, and not at all
on the surfaces that do not.

### Every surface that reaches Elevation

**`index.html` — 13 surfaces**

| line | surface |
|---|---|
| 830, 865, 887 | CSS comments + `#elevation-protoList.pcard-grid` rule |
| **1257** | main nav tab — `onclick="setActive(this);showProg('elevation')"` |
| **2849–2865** | plans strip panel, "Elevation Series / Coming Soon", `toggleProtoList('reslist-elevation')`, Join Waitlist button |
| **3006** | footer link — `<a href="javascript:void(0)" onclick="showProg('elevation')">` |
| 3949 | `RESOURCE_CONTENT` — seven `elev-1…7` records, all `locked: true` |
| 4758 | locked-plan mapping — `elev-` → `'Elevation Series'`, `'€222 one-time'` |
| 5087–5090 | `SERIES_CONFIG.elevation` — badge "Track 04 · Premium Tier · Phase 4 · Coming Soon" |
| **7562–7605** | `<div id="prog-elevation" class="prog-overlay">` — the Elevation page itself: hero mount, seven protocol cards, whats-included mount, **and a live Netlify waitlist form** (`name="elevation-waitlist"`, `data-netlify="true"`, real `onsubmit`) |
| **7658–7662** | plans card, "Track 04 — Premium · Premium tier · Waitlist open now" + `showProg('elevation')` |
| 7676 | comparison-table column header "Elevation" |
| 7789 | workshops copy — "Professional & Elevation workshops coming soon" |
| **8107–8111** | workshop card, "Elevation / Coming Soon" + `showProg('elevation')` |
| 8489 | button — "See all plans — Relationship, Professional & Elevation" |

**`dashboard.html` — 3 surfaces**

| line | surface |
|---|---|
| **240** | nav rail button — `Elevation Series` / `Coming soon` |
| 862 | track record — `4:{note:'Elevation Series · opening soon', …}` |
| **917–919** | empty-state block — `<h3>Elevation Series</h3>` + `<a class="sr-dash-go" href="#">Tell me when it opens →</a>` |

**`protocol.html` — 1 surface**

| line | surface |
|---|---|
| **952** | footer nav — `<a href="#">Elevation Series</a>`, inert `href`, hardcoded name (the same row hardcodes the other three names too, and calls Track 03 "Professional") |

### ⚠ This is larger than the brief describes — flagging per the standing rule

Phase 3 reads "remove the page and every route found in 1e". In this tree that is **17
surfaces across three files**, and it is not confined to routes. It includes a live Netlify
form, a seven-record block inside `RESOURCE_CONTENT`, a pricing tier (`€222 one-time`), a
column in the plan comparison table, a workshop card, and three pieces of body copy that
name Elevation inside sentences about other things ("Professional **& Elevation** workshops
coming soon"; "See all plans — Relationship, Professional **& Elevation**").

Removing the overlay and the four navigation entries is a clean, bounded change. Removing
the pricing column, the workshop card and the sentence fragments is **marketing-copy
editing on the live pricing surface**, and the residue (a comparison table that silently
loses a column, a plans strip that loses a panel) needs a layout decision, not a delete.

**Held for review rather than executed.** See the decision list at the end.

### The waitlist CTA — reproduces exactly

Run B's entry is accurate; it is in `dashboard.html`, not `index.html`.

- [dashboard.html:919](dashboard.html:919) — `<a class="sr-dash-go" href="#">Tell me when it opens →</a>`
- [dashboard.html:1262](dashboard.html:1262) — `TEXTMAP` carries `[/tell me when it opens/i,'plans']`

The delegated click handler at [dashboard.html:1277](dashboard.html:1277) matches on the
element's **text content**, calls `preventDefault()`, and routes to `openRoute('plans')`.
So the control says "waitlist" and opens the Plans dialog. Confirmed by reading the source;
the mechanism is unambiguous.

`index.html`'s Elevation waitlist is a different and *working* thing — a real Netlify form
at :7604. The two should not be conflated: one is mis-wired, one is functional but promotes
a track that is not being built.

---

## 1f · Hardcoded track names

Counts are occurrences of the exact name string per file.

| file | Personal Transformation | Relationship Healing | Professional Performance | Elevation Series | `corporate` (internal key) | reads `tracks.js`? |
|---|---|---|---|---|---|---|
| `index.html` | 29 | 20 | 15 | 22 | 35 | **yes** |
| `dashboard.html` | 5 | 3 | 2 | 3 | 0 | **yes** |
| `protocol.html` | 2 | 2 | 0 | 1 | 0 | no |
| `resource.html` | 1 | 1 | 0 | 0 | 0 | no |
| `method.html` | 0 | 0 | 0 | 0 | 0 | no |
| `method-porges.html` | 0 | 0 | 0 | 0 | 0 | no |
| `personal-transformation.html` | 1 | 0 | 0 | 0 | 0 | yes |
| `relationship-healing.html` | 0 | 1 | 0 | 0 | 0 | yes |
| `professional-performance.html` | 0 | 0 | 1 | 0 | 0 | yes |

**No stale values were found.** Every occurrence of a Track 01–03 name matches
`TRACKS[n].name` exactly. `Professional Performance` is the name in `tracks.js` and the
name in the markup. (`CLAUDE.md` lists the third series as "Professional" — that is the
document that is out of step with the data, not the pages.)

The three track pages' single occurrence each is the `<title>` and `<meta name="description">`
in the static head; `renderTrack` overwrites `document.title` from `t.name` at runtime
([js/saferise-track.js:411](js/saferise-track.js:411)), so the served title is data-driven
and the static one is a no-JS fallback.

**So SR-111 is not a stale-copy defect.** It is a coupling question: 121 correct strings
that are not bound to the record. The nav on the three track pages — the only nav the brief
tabulates — is already bound and already correct.

---

# Verdict table — brief versus tree

| item | brief says | tree says | reproduces? |
|---|---|---|---|
| **1a / Phase 5 · SR-112** | Track 02 and 03 pages need building | all three pages exist, data-driven, 0 gaps, 10 cards, 18 FAQ | **no — already done** |
| **1b** | template has fields the repo lacks | field sets identical; repo is newer on every value | **no** |
| **1c** | verify T2/T3 populated | confirmed, and T1 too — 0 gaps all three | yes (as expected) |
| **1d** | produce the grid | produced above | — |
| **1e / Phase 3 · SR-110** | a Track 04 *page* + routes | no page exists; 17 hardcoded surfaces in 3 files; `visible` has only 2 readers, both in the track renderer | **partly — larger and different in kind** |
| **1f / Phase 2 · SR-111** | nav shows stale/wrong track names | every name matches the record; track-page nav already binds to `tracks.js` | **no** |
| **Phase 4 · SR-113** | `faq` missing from `tracks.js`, lives only in the template | `SHARED.faq` at [content/tracks.js:603](content/tracks.js:603) (12), `TRACKS[1].faq` :655, `TRACKS[2].faq` :676, `TRACKS[3].faq` :697 (6 each) — 18 rendering per page | **no — already done** |
| **Phase 6 · SR-115** | deploy-preview URL at `dashboard.html:717` | confirmed at exactly that line — `https://deploy-preview-14--the-saferise-protocol.netlify.app/assets/covers/01.jpg`; the local `assets/covers/01.jpg` exists, and this is the **only** URL of that shape in the repo (the two other hits are Run A's log describing it) | **yes — reproduces** |
| **Phase 7 · SR-118** | 7 `dispenza` in `tracks.js`, 6 in `META[].frameworks` | **0 in `tracks.js`.** `FRAMEWORKS.distance` exists ([content/tracks.js:507](content/tracks.js:507)) and the six named protocols carry `'distance'` — t1-09, t1-10, t2-08, t3-03, t3-08, t3-10, exactly the brief's list | **no — already done, key is `distance`** |
| **Phase 7 · SR-119** | re-run the verification across all file types | done — 2 files, both docs | yes (clean) |
| **Phase 8a · SR-117** | `extras: null` crashes consumers | `extras` is read in **one place**, `protocolResources` ([content/tracks.js:539](content/tracks.js:539)), which uses `Object.prototype.toString.call(extras) === '[object Array]'` — explicitly null-safe. **No consumer throws.** | **no** |
| **Phase 8b · SR-117** | `null` is an unfilled field, not a decision | [content/tracks.js:523](content/tracks.js:523) and :532 document it as a deliberate sentinel — *"null means UNVERIFIED, not none"* | **no — it is a considered decision** |

---

## SR-119 — the all-file-types re-run, done properly

`git ls-files -z | xargs -0 grep -ni dispenza` — every tracked file, every extension.

| file | line | what |
|---|---|---|
| `docs/fix-register.md` | 445, 610, 614, 631, 632, 675, 863, 865, 866, 875, 879, 880, 881, 1044, 1045, 1047, 1207 | historical record of the removal — acceptable |
| `docs/reference/portal-personal-target.html` | 536, 701 | **live rendered strings** in a reference page — names Dispenza among "the six frameworks" and in a sourcing paragraph |

**`content/tracks.js`: clean. `index.html`: clean. All `.js`, `.css`, `.json`, config: clean.**

The one non-doc-comment residue is `docs/reference/portal-personal-target.html`, which the
fix register at :881 already identifies as SR-084 and deliberately out of scope. It is a
reference target under `docs/`, not a served page. Reported, not touched.

---

## SR-117 §8a — every consumer of `extras`, as required

Repo-wide, `extras` appears in **four places, all in `content/tracks.js`**: three comment
lines (523, 529, 532) and one read:

```js
function protocolResources(key) {
  var extras = (META[key] || {}).extras;
  return SHARED.resources.filter(function (r) {
    var needs = CONDITIONAL_RESOURCES[r[1]];
    if (!needs) return true;
    return Object.prototype.toString.call(extras) === '[object Array]' &&
           extras.indexOf(needs) > -1;
  });
}
```

| consumer | throws on `null`? |
|---|---|
| `protocolResources` ([content/tracks.js:538](content/tracks.js:538)) | **no** — array-checks before `.indexOf` |
| `protocolResourceCount` (:547) | no — delegates to the above |
| anything else, anywhere in the repo | **there is nothing else** |

`protocolResources`, `protocolResourceCount` and `CONDITIONAL_RESOURCES` have **zero
callers** outside `tracks.js` and its `module.exports`. Verified live:
`protocolResourceCount('t2-01')` → `7`, no error, console clean on all three track pages.

**The crash does not exist, so per the standing rule the twenty `null` values were not
changed.** There is also a positive reason not to change them: SR-078 wrote `null` to mean
*unverified*, distinct from `[]` meaning *verified, none*. Ten Track 01 protocols use `[]`
deliberately. Rewriting the twenty to `[]` would assert a verification that has not
happened and would erase the only marker of which tracks still need it.

---

## SR-117 §8b — report only

**1 · What `advisory` and `invitation` actually do**

`advisory` surfaces the **Proximity Guide** ("How close to stay" — three tiers for what to
stay engaged with, what to take distance from, and what is beyond self-regulation).
`invitation` surfaces the **Invitation to Repair** ("Reopening it with them" — a structured
way to open repair with another person when the pattern involves them).

Concretely, today, a flag changes exactly one thing: the number
`protocolResourceCount(key)` returns — 7 with neither, 8 with one, 9 with both. That number
feeds the `priceList` copy through `resourceCount()` in the track renderer. **It does not
currently gate what the Reader shows** — `READER_PROTOCOLS` lists its pages explicitly and
independently, which is how `p1-advisory` ends up reachable on a protocol whose `extras`
is `[]`.

**2 · Does any T2/T3 resource content assume a flag?**

**No.** Tracks 02 and 03 have no `*-advisory` and no `*-repair` keys in `RESOURCE_CONTENT`
at all. Their only content is `-guide` and `-safety` (T2) and `-guide` and `-companion`
(T3), none of which is conditional. So nothing in the repo is currently blocked by the
flags being `null`.

**3 · ⚠ The document the brief cites does not exist**

`SafeRise_Track02_Invitation_ThirdParty_Scripts.docx` is **not present anywhere on this
machine** (searched `~/Desktop` and `~/Documents`). What exists is:

- `Desktop/Saferise Docs/Protocol Resources/SafeRise_Track02_DisclosureSupportGuide.docx` ✓ (as cited)
- `Desktop/Saferise Docs/Saferise Video scripts/SafeRise_Track02_RelationshipHealingRecordingScripts.docx` — **recording scripts, not invitation scripts**

The 8b argument rests on both documents existing. One does, one does not, and the
near-miss filename is a video-script file. The argument that Track 02 is
Relationship Healing and therefore implausibly carries no `invitation` on any protocol
still stands on its own merits — but it should be decided on that reasoning, not on a
citation that does not resolve.

**4 · The twenty protocols, for mark-up**

Track 02 · Relationship Healing

| id | protocol |
|---|---|
| t2-01 | The Safe Conversation Protocol |
| t2-02 | The Rupture & Repair Protocol |
| t2-03 | The Trust & Betrayal Protocol |
| t2-04 | The Resentment Release Protocol |
| t2-05 | The Intimacy Barrier Protocol |
| t2-06 | The Double Standard Protocol |
| t2-07 | The Projection Clarity Protocol |
| t2-08 | The Appreciation & Support Protocol |
| t2-09 | The Pursue & Withdraw Protocol |
| t2-10 | The Conscious Separation Protocol |

Track 03 · Professional Performance

| id | protocol |
|---|---|
| t3-01 | The High-Stakes Presence Protocol |
| t3-02 | The Conflict Navigation Protocol |
| t3-03 | The Imposter Dissolution Protocol |
| t3-04 | The Perfectionism Release Protocol |
| t3-05 | The Performance Anxiety Protocol |
| t3-06 | The Ambition Recovery Protocol |
| t3-07 | The Career Transition Protocol |
| t3-08 | The Decision Fatigue Protocol |
| t3-09 | The Burnout & Overload Protocol |
| t3-10 | The Creative Flow Protocol |

---

## Decisions needed before Phase 2 begins

1. **Phase 3 / SR-110 scope.** 17 surfaces, not a page and some routes. Confirm whether to
   remove only the bounded set (the `#prog-elevation` overlay, the nav tab, the footer
   link, the dashboard rail button and empty state, the `protocol.html` footer link) and
   leave the pricing column, workshop card and copy fragments for a marketing pass — or to
   take all 17.
2. **Phases 2, 4, 5 and 7 have nothing to do.** Confirm they close as
   already-satisfied rather than being re-done.
3. **SR-111 residue.** If binding the 121 correct-but-hardcoded names in `index.html` and
   `dashboard.html` to `tracks.js` is wanted, that is a real piece of work and should be
   its own item, distinct from the nav fix the brief describes.
4. **The `p1-advisory` orphan** — register entry, and decide whether `t1-01` gains
   `'advisory'` or the content is retired.
