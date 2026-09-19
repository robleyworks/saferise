# Two new pages — Team and Podcast

**14 September 2026.** Structure and content, for the next build pass.

---

## Part 1 · Team

### The decision

The founder account moves off `/about` and onto a **Team** page, linked from the
footer. The page carries **the whole team**, not one person.

⚠ **This leaves a question about `/about`.** Three options — pick one before the
pass runs:

| | |
|---|---|
| **A** | `/about` redirects to `/team`. Simplest. One page, one URL |
| **B** | `/about` becomes the platform's story — why SafeRise exists, what it refuses, the method's origin — with **no people on it**. `/team` carries the people |
| **C** | `/about` is retired entirely |

**Recommended: B.** Two different questions get asked — *what is this* and *who is
behind it* — and they deserve different pages. It also means the founder account
sits beside the team rather than standing alone, which is the point of moving it.

---

### Page structure

**1 · Hero**
Full-bleed banner, edge to edge beneath the nav, per `docs/IMAGERY-BRIEF.md`.

> **The people behind it.**
> A small group, each holding a different part of it.

**2 · The founder account**

This is the longest block on the page and it stays first — it is why the platform
exists and it is the strongest asset on the site.

- The portrait: `assets/img-225-founder-dark.jpg` (1600×2000, already graded)
- The account itself, in first person, in your own words
- Credentials beneath rather than above: Certified Jungian Practitioner · Certified
  Somatic Coach · Meditation Coach · 8+ years enterprise SaaS

⚠ **The copy for this does not exist yet and only you can write it.** Everything
else on the page can be built around a placeholder; this cannot.

**3 · The team**

One card each. Portrait, name, role, two or three lines on what they hold.

| Person | Role as stated in the deck |
|---|---|
| **Andre Robley** | Founder. Method, content, enterprise sales, product direction |
| **Kirsten Morris** | Clinical lead — owns clinical requirements, escalation criteria and protocol review, and sources third-party licensed practitioners when a track requires one |
| **Aleksandra Macura** | Nutrition, the body, behaviour change — track partner and corporate component |
| **Dwight Williams** | Discipline and men's audience — co-branded track and podcast, revenue-shared |


**Four people, including you.** Clara is held for now — she appears when the local
pilot is real and she has agreed to be named.

⚠ **Two things to confirm before this publishes.**

**Every one of these people needs to have agreed to appear**, with the wording they
are comfortable with. A public team page is a commitment on their behalf.

**Kirsten's description must match the risk register**, which correctly states no
licensed clinician is contracted. *Clinical lead who sources licensed practitioners*
is accurate. *Clinician* would not be.

**4 · What we do not claim**

Short block. The same discipline the rest of the site uses:

> Nobody here diagnoses, screens or treats. The clinical lead owns the boundary and
> routes outward when something needs more than we are.

**5 · Close**
A line and a contact route. Not a recruiting pitch.

---

### Portraits

Four needed. **Only the founder's exists.**

```
assets/team/andre.jpg      ✓  use img-225-founder-dark.jpg
assets/team/kirsten.jpg    ✗
assets/team/aleksandra.jpg ✗
assets/team/dwight.jpg     ✗
```

**Specification:** 1200 × 1500 (4:5) · JPG q88 + WebP q82 · real photographs, not
generated · consistent grade across all four so the row reads as one set.

**A four-card row lays out cleanly.** Do not add a fifth slot for someone who is
not yet on the page.

⚠ **Do not generate these.** A synthetic likeness of a real collaborator is a
different problem from a synthetic founder portrait — it is their face. **Ask each
of them for a photograph.** Until one arrives, render the hatch placeholder.

---

## Part 2 · Podcast

### What it is for

Three jobs, in order of value:

**Distribution.** The deck already names podcast as a channel. This is where that
lands.

**SEO.** Once `noindex` comes off, episode pages with real text are the most
indexable content on the site — more so than protocol pages, which sit behind an
account.

**Proof.** A financier reading a deck that claims a content engine can click and
see one running.

---

### Page structure

**`/podcast` — the index**

**1 · Hero** — full-bleed banner, series name, one line on what it is.

**2 · Latest episode**, featured. Player, title, date, a paragraph.

**3 · Episode list.** Newest first. Each: artwork, number, title, duration, date,
two-line description.

**4 · Subscribe row.** Apple · Spotify · YouTube · RSS. Icons at the site's 24×24
stroke convention.

**5 · Close.** What the series is for, and a route to the free track.

**`/podcast/[slug]` — the episode page**

This is the one that earns the SEO. Player, full description, **timestamped chapter
list**, guest details, and — where it exists — a transcript.

⚠ **Transcripts are the highest-value SEO asset on the site and the cheapest to
produce**, since the audio pipeline already exists. One episode transcript is worth
more indexable text than an entire track page.

---

### Technical

| | |
|---|---|
| **Hosting** | Decide before building. If episodes live on a podcast host, the page embeds their player; if self-hosted, it needs its own |
| **Player** | Match the platform's existing audio player. **Do not introduce a second audio component** |
| **RSS** | Required for Apple and Spotify. Generated, not hand-written |
| **Artwork** | 3000 × 3000 for the directories, plus a web derivative |
| **Structured data** | `PodcastEpisode` schema on episode pages. This is what gets them into search results |

⚠ **Two things to settle first.**

**Does the content exist?** An empty podcast page is worse than none. If there are
no episodes, build the page when there are two or three.

**Dwight's co-branded podcast is on record as revenue-shared.** Is this that
series, a separate SafeRise one, or both? The answer changes the branding, the RSS
ownership and who controls the feed.

---

## Where these sit

**Navigation:** `Protocols · Method · Plans · Live sessions · For organisations ·
Podcast`

**Footer:** a column carrying `Team`, `About`, `Contact`, `Podcast`.

Team belongs in the footer rather than the main nav — someone looks for it
deliberately, and the nav is already full.

---

## Effect on the 30 September list

**Changes:**

- "About page has no founder content" becomes **"Team page does not exist"** — same
  work, better home, and it now needs four more portraits
- The founder account copy is still the blocker, still only you can write it

**Added:**

- Team page build + three portraits to source
- Podcast page — **only if episodes exist by then**

⚠ **The podcast page is a candidate to cut for the 30th.** It is a growth asset
rather than a launch requirement, and an empty one damages more than a missing one.
**The team page is not** — a financier will look for who is behind this, and right
now there is nowhere to send them.
