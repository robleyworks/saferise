# PASS-J · organisations.html — the Base, the Foundation 8, and four carried fixes

SR-436. Follows PASS-I (SR-434, `298f203`), whose §1, §2, §4a and §5 are already
live. Written 23 September, 20:00, against `organisations.html` at **422 lines /
53,041 bytes**.

**Reference build:** `https://claude.ai/artifact/RMQ4UUmr7Rc52hbX1Hmdne`
Open it before reading the prose. It is the agreed layout, built on the real
tokens and the real class names. Where this brief and the reference disagree,
the reference is right and you should report the difference.

⚠ **Read every file live and report before editing.** The file has moved twice
today. Every line number below was verified at 20:00; confirm each one rather
than trusting it.

⚠ **Git is unreliable through this mount.** `git log` returned *"fatal: your
current branch appears to be broken"* on the last check, and diff/status have
been erroring all day. Do not conclude anything from an empty git result. Read
files directly.

Commit locally. Do not push.

---

## §1 · The Base — ring beside the copy, photograph out, reveal out

**Anchors:** section `#sr-org-base` at line **151**; `.sr-org-eband--base` at
**153**; `#srOrgM1` at **156**; `.sr-org-ermore` at **157**. CSS for the band at
`css/saferise-system.css:5643`.

### 1a · Two columns

`#sr-org-base`'s head becomes a two-column grid: copy left, the ring right,
vertically centred. Roughly `1.08fr .92fr` with the page's `--sr-org-s7` gap.
One column below 1000px, copy first.

⚠ `.sr-org-head` is deliberately `grid-template-columns:1fr` sitewide across
eleven sections — see the FB-14 comment above it. **Scope this to
`#sr-org-base` only.** Do not touch the base class.

### 1b · The background photograph comes out

Remove `.sr-org-eband.sr-org-eband--base` from the markup at line 153. The
section sits on `--bg` with no underlay. Leave the CSS rule at 5643 in place —
`--plustwo` still uses the same machinery — but report if `--base` becomes the
only orphan.

### 1c · The read-more reveal comes out

All three paragraphs render. Remove the `.sr-org-ermore` button (157), the
`#srOrgM1` wrapper (156), and whatever script toggles them. Check nothing else
on the page uses the same toggle before deleting the handler.

### 1d · The ring

Ten equal segments, eight gold, one slate for role, one sage for industry, on a
`rgba(245,237,216,.045)` track. Lift the SVG verbatim from the reference build —
it is generated, not hand-written, and the arithmetic matters:

`viewBox="0 0 320 320"`, `r="128"`, `stroke-width="24"`, `pathLength="100"`,
each segment `stroke-dasharray="8.4 91.6"` with
`stroke-dashoffset="-(i*10 + 0.8)"` for i = 0…9, the group rotated `-90`.

Centre reads **10 / TRACKS / PER PERSON**. The key sits beneath: *8 foundation —
everyone · 1 for their role · 1 for their industry*.

⚠ Ten equal segments is the point. An earlier attempt stacked three circles with
competing dash patterns and produced unequal spans.

⚠ No count of roles, sectors or combinations anywhere near it — PASS-I §4a
removed those and they do not come back.

---

## §2 · The shared-resources line gets air

**Anchor:** `.sr-org-ef8base` at line **204**.

> Every track carries the same shared resources: guided practice, cue cards,
> expert insights, safe practice, private journaling and progress reporting,
> decision support, and communication and repair resources.

It currently sits tight against the block above and the grid below. Give it a
hairline rule above and below, `--sr-org-s5` padding inside those rules, and
`--sr-org-s7` margin outside them. Measure caps at 70ch. Lead with *"Every track
carries the same shared resources:"* in `--text`, the list in `--text2`.

---

## §3 · The Foundation 8 — header, cards, and how the detail opens

**Anchors:** `#srOrgF8` at **183**, `#srOrgF8Detail` at **184**. CSS at
`css/saferise-system.css:5694` (`.sr-org-ef8`) and `:5696` (`.sr-org-ecard`).

### 3a · The header

`THE FOUNDATION 8` is currently a small caps label. It becomes a **1.9rem
Cormorant Garamond heading**, `The Foundation 8`, with *select any track to read
it* staying small beside it on the same baseline — `.86rem`, `--text3`.

### 3b · The cards lose their borders

No inset ring, no outline. The image fills a **4:3** area at the top of the card,
`object-fit:cover`, 4px radius, with the layer-tinted corner flag kept. Below it:
the layer name in the layer tint, the track name in Cormorant, the lead in
`--text3`. Hover lifts 4px — nothing else.

⚠ This changes the cover shape. PASS-I §3 specified **portrait 1086 × 1448** for
these covers; landscape 4:3 cards need a different crop of the same
photographs. **Confirm with Andre before re-cutting** — the files staged at
`pass/_f8-covers/` are portrait.

### 3c · The detail opens beside the card, not below it

Currently the panel unrolls under the whole grid. Instead:

1. Clicking a card **hides the grid** and shows the detail in its place.
2. The detail is a two-column grid, **300px rail + 1fr**: the card's own image at
   the top of the rail, then the layer chip, then *Who it serves*, then a
   `← All eight tracks` control.
3. That control restores the grid and returns scroll to the top of the block.

This is the same reading order as the 30-protocol wall below, which is what Andre
asked it to match.

⚠ PASS-I §1 fixed the F8 handler's missing `sr-org-edinner` class. That fix
stays relevant — the rail/text split is the same component.

### 3d · The detail body is restructured

The current panel puts one short line in the left column, a wall of text in the
right, and the ten protocols far below a large gap. Replace with:

- **Full width:** `Track NN · Foundation` kicker, track name, lead.
- **Two equal columns**, `--sr-org-s6` gap:
  - **What people are stuck in** — the pain, in ordinary language.
  - **What becomes reachable at work** — the translation, in `--text`.
- **Full width, above a hairline:** *Ten protocols* as a **two-column** ordered
  list, five per column.
- **Full width:** the guard note, quiet, capped at 70ch.

Paragraph rhythm is fixed: `12px` between paragraphs inside a block, `--sr-org-s6`
between blocks. No paragraph wider than 58ch.

---

## §4 · The three benefit cards move out

**Anchors:** `.sr-org-ebenefits` at **160**; the three articles at **163**, **169**
and **175**. CSS at `css/saferise-system.css:5672`.

> One vocabulary · Nobody nominated · Private by construction

They sit between the Base argument and the Foundation 8 catalogue and break the
run from one to the other.

**Move them into `#sr-org-privacy` (line 67), "One method, two spaces."** That
section already argues the organisation funds access while the person keeps what
happens inside it — *Private by construction* is its thesis, and the other two
are the same claim from the access side. Place them above the two existing photo
cards.

Carry the markup, the icons and the hover reveal intact. Report anything in
`.sr-org-ebenefits`' CSS that assumed its old neighbours.

---

## §5 · Four fixes carried from earlier today

### 5a · The hero note sits on the wrong spacing step

`css/saferise-system.css` — `.sr-org-hero-note{margin-top:24px}`.

The FB-13 comment above it sets the page's scale and says what each step is for:
**8px small, 24px medium (label to what it labels), 44px large (group to
group)**. The note is not a caption on the buttons; it is a third statement in
the hero. Change to **44px**. The button row then has 44 above and 44 below.

### 5b · The model panel's body copy is unreadable as a serif

`css/saferise-system.css:5317` — `.sr-org-panel p` is body copy in **Cormorant
Garamond 400 at 1.06rem**. Every colour in that panel already passes AA
comfortably (body 7.12:1, the slate heading 6.73:1); the failure is stroke
weight, not contrast — a display serif's hairlines drop below a pixel at 17px on
near-black.

```css
.sr-org-panel p{color:var(--text);font:400 1.02rem/1.62 'DM Sans',system-ui,sans-serif;max-width:46ch}
.sr-org-panel .sr-org-pt{color:var(--text2)}
.sr-org-panel .sr-org-ph2{color:color-mix(in srgb, rgb(var(--c)) 78%, #fff)}
```

Body 7.12 → 16.92:1. Closer 5.17 → 7.12:1. Heading, per layer: slate 6.73 →
8.88, gold 8.92 → 10.72, sage 8.69 → 10.66. Keep Cormorant on `.sr-org-ph2` —
a display serif belongs on the heading.

### 5c · The Gap section takes a diagram

Reference build: `https://claude.ai/artifact/SgQMfaZE8H2y2CaBTVkraN`

The BEFORE / DURING / AFTER list becomes a **narrowing channel** — vertical is
how much of a person's judgement is reachable, horizontal is one difficult
moment and what follows. Wide, pinched, and reopening only partly.

⚠ **Do not reuse the model diagram's arc.** Three wedges around a hub means
"three co-equal layers", which is the opposite of this content.

Two annotations carry the argument: a bracket over BEFORE reading *EAPs, coaching
and training reach here*, and a marker at the pinch reading *SafeRise works here*.

**A three-step reveal cycles on its own** at 3400ms, lighting one band of the
channel, its annotation and its row of copy together. It starts on intersection
at 0.35, not on load; pauses on pointer-enter and focus-within; stops permanently
once a dot is pressed. Under `prefers-reduced-motion` all three light at once.
The axis caption and the closing gold line **do not** cycle.

### 5d · The impact pathway, if the underlay goes in

Both from the earlier mock (`https://claude.ai/artifact/Q42yfxboZRzear1GNA27NM`):

- The standfirst moves **below the rail**. Beside the headline it was a second
  focal point at the same weight, and it is the caveat the rail's own *Not
  promised* label already makes.
- If a photographic underlay is used on `.sr-org-pathsheet`, **mask it to fade
  out at 70–86%** so the rail's small caps sit on clean ground. Over the
  photograph they measure 2.55–3.42:1 against 5.17:1 on `#0A0A0F`, and at
  .62rem they need the full 4.5:1.

---

## §6 · Content still to write — not code

`content/f8-tracks.js` needs two new fields per track, `stuck` and `win`, plus
the `cover` path from PASS-I §3.

**Tracks 01 and 02 are written** and live in the reference build. The register is
set there and should be matched exactly:

- *What people are stuck in* — second person, ordinary words, no clinical terms,
  names the moment rather than the mechanism.
- *What becomes reachable at work* — **access, not outcome**. What a person can
  get to, never what the organisation will get back. "The first ten minutes of a
  hard meeting become available again" is inside the rule; "meetings run better"
  is not.

⚠ This is the standing constraint the whole page depends on. The impact-pathway
section spends its entire length refusing to promise outcomes. Track copy that
promises them contradicts it three screens earlier.

**RULED, 23 September 20:15 — track 01 is the register. Track 02 is rewritten below.**

### The field label changes for every track

`What becomes reachable **at work**` becomes **`What becomes reachable`**, on all
eight. Track 02 cannot answer the old label honestly — Relationship Healing is
about relationships, and forcing its payoff into the workplace is what produced
both faults found in the draft: a stuck column about a marriage answered by a win
column about colleagues, and *"the team stops spending its capacity on managing
each other"*, which is an organisational outcome rather than access.

Dropping two words fixes it without weakening track 01, whose copy still reads
correctly under the shorter label. **This is not a softening of the B2B
argument.** The Base already makes it: these eight *"reach past the desk — into
sleep, into food, and into what people carry in on Monday and carry home again on
Friday."* A track about close relationships answering in workplace terms
contradicts the section three screens above it.

### Track 02 · Relationship Healing — replacement copy

**`serves`** — replace *"Partners, people dating or separating, and adults
navigating recurring patterns in close relationships"* with:

> Adults navigating recurring patterns in close relationships.

⚠ *"dating or separating"* is consumer register and reads oddly on a page an HR
lead is reading. The pattern is the subject; the relationship status is not.

**`stuck`** — **unchanged.** It was the strongest part of the draft:

> The same argument, in different words, for years. You finish the conversation
> in your head before it starts and arrive already defending. Or you say nothing,
> again, and the distance grows by one more thing unsaid.
>
> Nobody is being unreasonable. Both people are protecting something, and neither
> can hear the other well enough to find out what.

**`win`** — replaced in full:

> You can say the difficult thing while it is still small, instead of carrying it
> until it arrives as something else.
>
> A disagreement can stay a disagreement rather than hardening into what you both
> are. The person who goes quiet has a way back in. Repair becomes reachable —
> not owed and not demanded, but available to whoever moves first.

⚠ Every clause is something a person **can get to**. Nothing states what changes
as a result, for the relationship or for the employer. That is the rule.

**`guard`** — **unchanged.** *"Personal choice and safety come first; repair is
never an obligation."* It is load-bearing on this track.

### Now tracks 03–08 can be drafted

Against track 01's register and this label. Two still carry the same trap and
need the same treatment — **05 Embodied Nutrition** and **06 Strength & Return**
are about the body, not the desk, and their win columns must not reach for a
workplace payoff either.

---

## Order of work

| | | Depends on |
|---|---|---|
| 1 | §5a, §5b — two CSS values | nothing |
| 2 | §1, §2 — the Base | nothing |
| 3 | §4 — move the three cards | nothing |
| 4 | §3a, §3b, §3c, §3d — the Foundation 8 | §3b waits on the cover-shape ruling |
| 5 | §5c — the Gap diagram | nothing |
| 6 | §5d — the impact pathway | only if the underlay is adopted |
| 7 | §6 — tracks 03–08 | Andre approving 01 and 02 |

**Open questions for Andre, all of them blocking something above:**

1. Foundation 8 covers — portrait 1086 × 1448 as PASS-I decided, or landscape 4:3
   as these cards now need?
2. Does the register in tracks 01 and 02 land?
3. Is the impact-pathway underlay adopted at all?
4. PASS-I §3 still needs one variant chosen — covers as supplied or page-graded.
---

## §7 · Three items carried in, 23 September evening

Added after the brief was written. Independent of everything above — none of
them touch `organisations.html`.

### 7a · `_headers` has no cache rule for `/css/` or `/js/` — do this first

`_headers` sets `Cache-Control` for exactly two paths: `/assets/*` gets a year
and `immutable`, `/*.html` gets `max-age=0, must-revalidate`. **`/css/*` and
`/js/*` have no rule at all** and fall through to the host default.

This is the likeliest cause of a recurring and expensive symptom: a change is
committed, pushed and deployed, the markup is demonstrably correct on disk, and
the live page still looks old. It has cost several rounds of debugging already.

Add explicit rules:

```
/css/*
  Cache-Control: public, max-age=0, must-revalidate

/js/*
  Cache-Control: public, max-age=0, must-revalidate
```

⚠ **Do not add `immutable` or a long max-age.** These filenames are not content
hashed — `saferise-dashboard.css` keeps its name across every edit, so a long
TTL means members hold a stale stylesheet until it expires.

⚠ Leave `/assets/*` exactly as it is. Those files genuinely are immutable.

**Verify:** `curl -sI <deployed>/css/saferise-dashboard.css | grep -i cache` and
report the header verbatim, before and after.

### 7b · A second count survives in the wall lede — LG-320

PASS-I §4a removed `224 combinations`, `14 to draw from` and `16 to draw from`
from the equation strip. A second **"Fourteen … sixteen …"** construction remains
in the 30-protocol wall's own lede.

Same standing rule, same reasoning, one string. Find it, remove the count, keep
the sentence working. ⚠ **`10 tracks per person` is not a count of inventory and
stays** — it is the promise, and the ring's centre depends on it.

### 7c · The orientation strip never retired itself — LG-318, report only

`dashboard.html` line ~104 documents that the orientation strip retires once its
three steps are done. **Nothing implements it.** No code hides `.sr-begin`,
before or after SR-435 moved the library above it.

**Do not build the retirement in this pass.** Confirm the finding by reading the
code, and report whether the comment or the behaviour should change. It is a
documentation failure, not a regression — SR-435 did not break it.

---

## §8 · Correction to §3b — the cover contradiction is real, but not as stated

Measured 23 September, 20:15, rather than inferred.

§3b says PASS-I §3 settled on portrait 1086 × 1448. **It did not.** Andre chose
the band-shaped slot, and the implementation matches it: `content/f8-tracks.js`
points at landscape band assets, and the detail panel renders them at a measured
16:7.

| Source | Measured |
|---|---|
| `assets/journey/t1-band.webp`, `t3-band.webp` | 1400 × 380 — ratio 3.68 |
| `assets/org/track-t2.webp` and the five `assets/coming/band-0*.webp` | 1200 × 640 — ratio 1.875 |

**But `pass/_f8-covers/` does hold portrait files** — `as-supplied/f01.jpg` and
`graded/f01.jpg` both measure exactly **1086 × 1448**. They are staged and **not
wired in**; nothing in `content/f8-tracks.js` references that directory.

So there are two competing cover sets, and the live one is the band set.

**RULED, 23 September 20:15 — the portrait set ships. §3b is unblocked.**

`content/f8-tracks.js` repoints from the band assets to `pass/_f8-covers/`, all
eight tracks, and the 4:3 card crops from portrait 1086 × 1448 — full width kept,
44% of the height cropped.

**Why, so it is not reversed a third time.** The band decision was right when the
slot was a band. A 4:3 card is not, and the arithmetic changes with it: cropping
1200 × 640 to 4:3 costs 29% of the width, but `t1-band` and `t3-band` sit at
ratio 3.68 and lose **64%** — and those two are Personal Transformation and
Professional Performance, the two tracks that can least afford to look soft.
Portrait is the only set that solves them. This supersedes PASS-I §3's band
ruling; it does not contradict it, because the slot it was made for no longer
exists.

⚠ **Use `graded`, not `as-supplied`** — that is the page-graded variant and the
page has a graded palette. Report the choice; if the two are visually
indistinguishable at card size, say so.

⚠ **Do not delete the band assets.** `t1-band` and `t3-band` are used elsewhere
(`assets/journey/`), and `assets/coming/band-0*.webp` are the coming-soon page's
own art. Only the `cover` field in `content/f8-tracks.js` changes.

⚠ **Copy the eight into a served path** — `pass/` carries
`X-Robots-Tag: noindex` and `Cache-Control: no-store` in `_headers`, so it is
staging, not a home for live assets. `assets/f8/` is the obvious place. Report
the paths used.

⚠ **Verify every one renders before committing.** Eight cards, network panel, no
404s — the same check that caught 38 untracked images on 23 September.

⚠ This also settles open question 4 at the foot of this brief — as-supplied or
page-graded only matters if the portrait set is the one that ships.

---

## Filename note

⚠ **A different `pass/PASS-J.md` already exists** — the meditation install plus
four items carried from the old PASS-G, committed as SR-431. It is unrelated to
this brief. Two files called PASS-G stalled a pass on 22 September for exactly
this reason. **This file is the one with the full name.** Do not run `PASS-J.md`
expecting this work, or the reverse.
