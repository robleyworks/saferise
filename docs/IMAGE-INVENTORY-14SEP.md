# Image inventory — what tonight added

**14 September 2026.** Every image slot created or changed since the 13 Sep audit, with
specifications and casting notes.

⚠ **Check `assets/` and `~/Desktop/unused images` before generating anything.** SR-383
found the previous brief's "39 slots, none exist" premise was wrong — real hero, band, cost
and change images already sat in `content/tracks.js`. **Assume something exists until you
have looked.**

---

## The casting brief — unchanged, restated

| | |
|---|---|
| **Ages** | 27–37 |
| **Origin** | Caribbean and European |
| **Register** | Upper middle class, lively, contemporary |
| **Eyes** | Open. **Maximum two closed across the entire set** |
| **Diversity** | Judged across the SET, not per image |

**Banned:** beige linen · oatmeal · lotus position · yoga mat · candles · sunrise over
water · beach · anything that reads as minimalist wellness.

⚠ **Two standing corrections from tonight's review.** The Professional Performance covers
are all suits and offices — the most corporate set on the site, and off-register against
"lively and contemporary". The Relationship Healing covers are couples on beaches at sunset,
which the brief explicitly bans. **Both sets predate this inventory and still need
revisiting.**

---

## Block 1 · Core library cards — 8 slots

`/plans` and `/organisations`. **The highest-value new set**, because these eight cards are
the first thing a buyer and a member both see of the full library.

| File | Track | Accent | Status |
|---|---|---|---|
| `assets/tracks/t1-card.jpg` | Personal Transformation | `#D4A843` gold | Live track |
| `assets/tracks/t2-card.jpg` | Relationship Healing | `#E87090` rose | Live track |
| `assets/tracks/t3-card.jpg` | Professional Performance | `#4E9AA6` teal | Live track |
| `assets/tracks/t4-card.jpg` | Executive Presence | `#B9A17A` bronze | In development |
| `assets/tracks/t5-card.jpg` | Sleep & Recovery | `#7B87A8` slate | In development |
| `assets/tracks/t6-card.jpg` | Embodied Nutrition | `#8FA37B` sage | In development |
| `assets/tracks/t7-card.jpg` | Strength & Return | `#C08A5E` amber | In development |
| `assets/tracks/t8-card.jpg` | Elevation Series | `#AEB7CE` pale blue | In development |

**Specification**

```
1200 × 800 (3:2) · JPG q88 + WebP q82
object-fit: cover · object-position: 72% 30%   ← subject sits right of centre
Rendered behind a scrim at .96 → .60 opacity, so mid-tones survive, highlights do not
Card is ~280 × 158 at desktop — the image is atmosphere, not a portrait
```

⚠ **Composition rule:** the left 45% of the frame carries the text. **Keep the subject and
any detail in the right third.** A centred face will be half-covered.

**Casting per track**

| Track | What it should show |
|---|---|
| Personal Transformation | One person, alone, indoors, a real room. Not distressed — arrived somewhere |
| Relationship Healing | Two people, mid-conversation, ordinary setting. **Not a couple on a beach.** Could be siblings, colleagues, friends |
| Professional Performance | A working environment that is not a boardroom. Studio, workshop, kitchen pass, site office |
| Executive Presence | One person before a room rather than in one. A corridor, a doorway, a moment of gathering |
| Sleep & Recovery | Night interior. A lamp, a window, a person awake who would rather not be. **No bed-and-candles wellness** |
| Embodied Nutrition | A kitchen in use. Real food, mid-preparation. **Not styled, not overhead, not a bowl** |
| Strength & Return | Training that has been interrupted and resumed. A gym bag by a door, laced shoes, a first set |
| Elevation Series | Space and altitude without cliché. A high window, an early street, a long view from a real place |

---

## Block 2 · Organisations page — 6 slots

| File | Where | Specification |
|---|---|---|
| `assets/org/hero.jpg` | Hero underlay, beneath the nav | **2400 × 1000** · subject right of centre, 96° scrim |
| `assets/org/sec-health.jpg` | Healthcare sector panel | **1400 × 1000** · right-hand column of a split panel |
| `assets/org/sec-finance.jpg` | Finance, legal, professional | 1400 × 1000 |
| `assets/org/sec-tech.jpg` | Technology and engineering | 1400 × 1000 |
| `assets/org/sec-ops.jpg` | Manufacturing and logistics | 1400 × 1000 |
| `assets/org/sec-leaders.jpg` | Leadership and people managers | 1400 × 1000 |

**Casting — the B2B register is different from consumer.**

These show **environments containing people**, not portraits. A buyer is looking for their
own workplace, not for someone's inner life.

- **Healthcare** — a corridor, a handover, a break room at the wrong hour. **Not a ward, not
  a patient, no clinical procedure**
- **Finance and legal** — a real desk under real pressure. Not a boardroom table with eight
  smiling people
- **Technology** — screens, but from behind or beside. Not a hero developer at a hero desk
- **Manufacturing and logistics** — a shift environment, protective equipment, natural
  light. **No therapeutic vocabulary in the imagery either**
- **Leadership** — one person holding something alone, in a workplace. The isolation of the
  role

⚠ **Nobody in any organisational image may look unwell, distressed or in crisis.** The B2B
argument is about capacity under load, not about illness. That distinction is legally as
well as commercially load-bearing.

---

## Block 3 · Plans page — 5 slots

| File | Where | Specification |
|---|---|---|
| `assets/pages/plans-hero.jpg` | Hero banner | **2400 × 1000** · already referenced, may exist |
| `assets/tracks/t1-band.jpg` | Track 01 section underlay | **2000 × 900** · runs full-bleed behind the index |
| `assets/tracks/t2-band.jpg` | Track 02 section underlay | 2000 × 900 |
| `assets/tracks/t3-band.jpg` | Track 03 section underlay | 2000 × 900 |
| `assets/pages/s-1to1.jpg` · `s-workshop.jpg` · `s-retreat.jpg` | Live-session cards | **1200 × 800** each |

**The three track bands sit behind a heavy left-weighted scrim** — `.96` at the left where
the title sits, `.62` at the right. **Detail belongs in the right half.** These read as
atmosphere at 25–30% effective opacity; anything busy becomes noise.

---

## Block 4 · Investor deck — 4 slots

Not web assets. **2400 × 1050 or wider**, since slides are 13.33″ × 7.5″ and these run
full-bleed behind type.

| Slide | Need |
|---|---|
| Cover | Currently uses `cost.jpg`, lifted. **Works, but it also appears on slide 4** — one of the two should change |
| The position (4) | Something that is not a person at a window |
| Expansion (18) | Reach, breadth, a wider frame |
| Team (23) | Only if you want a founder portrait on it |

---

## Totals

| Block | Slots | Priority |
|---|---|---|
| Core library cards | **8** | **Highest** — two pages, first impression of the full library |
| Organisations | 6 | High — the B2B front door |
| Plans page | 5 | High — the page the nav points at |
| Investor deck | 4 | Medium — the deck works without them |
| | **23** | |

**Plus outstanding from the previous audit, still unresolved:** `assets/method/m-attention.jpg`,
`m-vessel.jpg`, `m-built.jpg`, `m-outward.jpg`, `res-somatic.jpg` — **five method-page
images.**

**And the two sets needing replacement rather than provisioning:** ten Relationship Healing
covers (beach couples) and ten Professional Performance covers (suits and towers).

---

## Rules that apply to every slot

- **WebP alongside JPG.** The site serves WebP with JPG fallback throughout
- **Never leave a slot blank.** Render the hatch —
  `repeating-linear-gradient(45deg,#141a2a,#141a2a 10px,#182034 10px,#182034 20px)` — under
  the normal scrim
- **Never substitute an unrelated image.** A single-person protocol cover behind a section
  about teams is worse than a placeholder
- **Judge legibility per image, not per set.** Where text fails contrast, adjust that
  image's scrim rather than all of them
- **A human decides which image belongs to which track.** That is a casting call, not a file
  operation — an agent should report unmatched slots rather than guess

---

## What I would do first

**The eight core library cards.** They appear on both the consumer and the organisational
page, they are the first sight of the full library for either audience, and five of the
eight currently advertise tracks that do not exist — so the image is carrying the promise.

**Then the organisations hero and the six sector panels**, because that page is the B2B
front door and it currently has no imagery at all.
