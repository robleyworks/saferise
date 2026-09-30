# My Records — the member's records hub

29 September 2026, banner section revised 30 September. Supersedes the five-tab
"Your Saved Records" shape in
`SafeRise_Sovereign_AI_Your_Saved_Records_Claude_Master_Handover.docx` and the
separate-destination proposal in `REVIEW-BACKLOG-2026-09-25.md` (MR-42).

Built as ORG-1 / SOV-1, in one schema pass with the organizational tables.
Shipped as SR-478 (`1a6778d`).

---

## Founder rulings

| # | Ruling |
|---|---|
| **L1** | **One hub, not two destinations.** The Clearing, Chosen Self and Decisions do not become three places; Chosen Self and Decisions become tabs here |
| **L2** | **The Clearing stays out.** It is a practice you do, not a record you keep. It is reached from the rail, not the dashboard *(revised 30 September 2026, SR-485: its dashboard card beside Resume and Start New was removed; the rail entry stays)* |
| **L3** | **Favourites live here**, in a Saved tab. This resolves MR-35 — saved resources, content and protocols all land in one place |
| **L4** | **Sovereign sessions get no tab of their own.** They thread through All Sessions, Chosen Self and Decisions like any other run |
| **L5** | **All Sessions carries a Guided / Sovereign filter.** A filter on one list, never a sixth destination |
| **L6** | **The hub is named "My Records".** One name, no subtitle. "The Lab" is not used |
| **L7** | **The banner rail is the five tabs.** Not a separate set of phrases. What the rail names, the page has |

---

## Naming (L6)

**My Records.** First person, plain, and accurate to what the page does: it is
where a member reads back what happened — sessions, statements, decisions,
journal entries, saved items.

"The Lab" was considered and rejected. A lab is somewhere you *do* something,
and this page currently only lets a member read, edit and delete. The name
would have over-promised. If a generative surface is built later — setting a
direction, working on statements rather than storing them — that is a new
thing and can carry its own name then.

The page title, the nav label and every reference say **My Records**.

---

## The five tabs

| Tab | Holds | Device store, as built |
|---|---|---|
| **All Sessions** | Every protocol run, guided and Sovereign, newest first | `sr.sv.records` |
| **The Chosen Self** | Statements spoken in Rise — only what the member actually said | `sr.sv.records` Rise lines, plus `sr.record.chosen` |
| **Decisions** | What they named as needing a decision, conversation or action | `sr.decision.<protocolId>`, plus `sr.record.decisions` |
| **Journal** | Written entries, including ones started from a resource | `sr.journal.entries` |
| **Saved** | Favourited resources, content and protocols | `sr.saved`, plus the dashboard heart's `sr-saved-v1` |

The handover's fifth tab was "Logs". Journal and Saved replace it.

`records_saved` is **one** table typed by target. Do not build three stores for
three kinds of favourite. Two stores currently back the Saved tab because the
dashboard heart predates it; merging them onto `sr.saved` is an open item.

There is no writer for guided runs, so the Guided filter says so honestly rather
than showing fabricated rows.

---

## Why Sovereign has no tab of its own (L4)

A member does not go looking for "my Sovereign stuff". They go looking for
*what I said*, and it should be where it always is.

A separate Sovereign tab would split a member's own history by which mode they
happened to use that day — organising their record around a product feature
rather than around what happened to them.

So:

- **All Sessions** — a Sovereign run is a session like any other. One row in
  the same list. Opening it shows the per-phase transcript, the AI feedback
  and the pre/post ratings together.
- **The Chosen Self** — statements spoken in Rise land here, attributed to the
  session they came from.
- **Decisions** — what they named at the bridge question lands here, with the
  conversation or action they named.

## The filter (L5)

Inside All Sessions: Guided / Sovereign. Sovereign sessions are the ones
carrying a transcript and AI feedback, so members will want to find them — but
that is a filter on one list.

---

## The page banner — founder-approved 30 September

Full page width, 2400 × 806, same ratio as the Sovereign banner so the two
read as one system. Copy in the left third, a pull quote at the right, and the
five-item rail across the bottom on its own dark ground.

Photograph: `assets/records/mr-banner.webp`, with a `.jpg` beside it. Two
subjects at a window in late sun, city beyond — a different shoot, setting and
wardrobe from the Sovereign banner. Both present, per the standing imagery
brief. Self-assured and composed, looking out. No mug, no notebook, no table.

**Kicker** · WHAT I AM BUILDING

**Headline** · My Records

**Subhead** · *You are not the same person who started.*

**Body** ·
> Statements spoken in Rise. Decisions named. Where you started and where you
> finished, in your own words.
>
> Read back far enough and you can see the distance.

**Pull quote**, right-aligned, italic · *Proof, in my own words.*

**Rail**, five items, each the tab it opens (L7):

| Label | Line |
|---|---|
| EVERY SESSION | Guided and Sovereign, newest first. |
| THE CHOSEN SELF | Statements I spoke. Never a line I did not say. |
| DECISIONS | The conversations and actions I named for myself. |
| JOURNAL | Written, whenever I wanted to. |
| SAVED | What I kept to come back to. |

JOURNAL was "Written or spoken" until 30 September 2026 (SR-485). Nothing saves a
spoken journal entry yet, so the longer form returns only when one can be saved.

The copy is first person throughout — the member's voice about their own
record, not the product describing itself. That is the whole style: *"Statements
I spoke. Never a line I did not say."* is the member saying it, which is what
makes the promise land.

### What this replaces

The earlier draft in this document had a six-item rail of separate phrases
(MY OWN WORDS, WHAT I DECIDED, MINE ALONE) that did not match the tabs, a
kicker of SAME YOU. WRITTEN DOWN., and third-person body copy. Superseded.

The earlier "a closed notebook, not an open one" note is also withdrawn — it
conflicts with the standing rule that no notebooks appear in SafeRise imagery.

---

## Constraints carried in

- Chosen Self and Decisions **already hold real member data on-device**. The
  migration adopts what is there; it does not overwrite it. The local copy
  stays intact until the server copy is confirmed.
- A member who used one device and then signs in on a second must not lose
  what is on the first. The conflict rule is decided in ORG-1, not discovered
  later.
- **No employer sees any of this**, in any form. Enforced in row-level
  security, not in the interface. Verified in
  `SCHEMA-VERIFICATION-PART-B.md`: an org_admin and an exec_viewer both return
  zero rows against an employee's records, against a passing control.
- SafeRise never adds a statement the member did not speak. The surface says
  so, and the AI feedback is bound by the same rule.
