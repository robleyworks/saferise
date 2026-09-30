# My Records — the member's records hub

29 September 2026. Supersedes the five-tab "Your Saved Records" shape in
`SafeRise_Sovereign_AI_Your_Saved_Records_Claude_Master_Handover.docx` and the
separate-destination proposal in `REVIEW-BACKLOG-2026-09-25.md` (MR-42).

Built as ORG-1 / SOV-1, in one schema pass with the organizational tables.

---

## Founder rulings

| # | Ruling |
|---|---|
| **L1** | **One hub, not two destinations.** The Clearing, Chosen Self and Decisions do not become three places; Chosen Self and Decisions become tabs here |
| **L2** | **The Clearing stays out.** It is a practice you do, not a record you keep. It remains on the dashboard beside Resume and Start New |
| **L3** | **Favourites live here**, in a Saved tab. This resolves MR-35 — saved resources, content and protocols all land in one place |
| **L4** | **Sovereign sessions get no tab of their own.** They thread through All Sessions, Chosen Self and Decisions like any other run |
| **L5** | **All Sessions carries a Guided / Sovereign filter.** A filter on one list, never a sixth destination |
| **L6** | **The hub is named "My Records".** One name, no subtitle. "The Lab" is not used |

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

| Tab | Holds | Device key it adopts |
|---|---|---|
| **All Sessions** | Every protocol run, guided and Sovereign, newest first | `sr.record.runs` |
| **The Chosen Self** | Statements spoken in Rise — only what the member actually said | `sr.record.chosen` |
| **Decisions** | What they named as needing a decision, conversation or action | `sr.record.decisions` |
| **Journal** | Written entries, including ones started from a resource | `sr.journal.entries` |
| **Saved** | Favourited resources, content and protocols | new |

The handover's fifth tab was "Logs". Journal and Saved replace it.

`records_saved` is **one** table typed by target. Do not build three stores for
three kinds of favourite.

---

## Why Sovereign has no tab of its own (L4)

A member does not go looking for "my Sovereign stuff". They go looking for
*what I said*, and it should be where it always is.

A separate Sovereign tab would split a member's own history by which mode they
happened to use that day — organising their record around a product feature
rather than around what happened to them.

So:

- **All Sessions** — a Sovereign run is a session like any other. One row in
  the same list. Opening it shows the per-phase transcript, the framework
  reading and the pre/post ratings together.
- **The Chosen Self** — statements spoken in Rise land here, attributed to the
  session they came from.
- **Decisions** — what they named at the bridge question lands here, with the
  conversation or action they named.

## The filter (L5)

Inside All Sessions: Guided / Sovereign. Sovereign sessions are the ones
carrying a transcript and a reading, so members will want to find them — but
that is a filter on one list.

---

## The page banner

Full page width, 2400 × 806, same ratio as the Sovereign banner so the two
read as one system. Copy in the left third, subject right of centre, a
six-item rail across the bottom.

Kicker · SAME YOU. WRITTEN DOWN.
Headline · **My Records**
Subhead · *Everything I have said, chosen and decided.*

Body · This is where the work accumulates. Sessions run, statements spoken in
Rise, decisions named, entries written, and everything saved to come back to.
**Nothing here was written for me.**

Rail · EVERY SESSION · MY OWN WORDS · WHAT I DECIDED · MY JOURNAL · SAVED ·
MINE ALONE

The subject must be a different person, setting and wardrobe from the
Sovereign banner — the two sit one click apart and must not read as the same
shoot. No mug. A closed notebook, not an open one: this page is about what has
already been done.

---

## Constraints carried in

- Chosen Self and Decisions **already hold real member data on-device**. The
  migration adopts what is there; it does not overwrite it. The local copy
  stays intact until the server copy is confirmed.
- A member who used one device and then signs in on a second must not lose
  what is on the first. The conflict rule is decided in ORG-1, not discovered
  later.
- **No employer sees any of this**, in any form. Enforced in row-level
  security, not in the interface.
- SafeRise never adds a statement the member did not speak. The surface says
  so, and the framework reading is bound by the same rule.
