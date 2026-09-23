# Voice Architecture — two voices, member-selectable

**9 September 2026 · decided, for building before the library exists**

---

## The decision

**Every guided meditation exists in a male voice and a female voice. The member
toggles between them, once, and it applies everywhere.**

Neither is the founder's voice.

## Why, and it is not about scale

Scale is the obvious reason — 110 protocols across eleven tracks cannot be voiced
by one person. But it is the weaker one.

**The real reason is that the founder's voice couples the product to the founder's
reputation.** Andre is active on The Disciplined Man and in other public work
where he holds positions people will disagree with. A podcast is opt-in; a shame
protocol is not. Someone who bounces off him publicly should not lose access to
the product, and right now they would.

**And a woman working through Abandonment Wound, Intimacy Barrier, or anything on
the women's track may simply not want a man's voice.** That is not a preference to
argue with.

⚠ **This turns one dimension of key-person risk into a solved problem**, which is
worth a line on the defensibility slide. The product survives the founder being
disliked, unavailable, or publicly wrong about something.

---

## What it costs

| Scope | Files | Generation | Storage |
|---|---|---|---|
| 31 protocols, EN | 62 | $30 | 0.6 GB |
| 31, EN + FR + ES | 186 | $91 | 1.8 GB |
| 110 protocols, EN | 220 | $107 | 2.1 GB |
| 110, EN + FR + ES | 660 | $322 | 6.4 GB |

**Cost is not the constraint at any scale.** The file count is, and so is
everything that has to name, store, select and remember them.

---

## Four things to settle before more audio exists

### 1 · Filenames carry voice and language

```
{protocol}-gm--{voice}--{lang}.mp3

t1-01-gm--f--en.mp3
t1-01-gm--m--en.mp3
t1-01-gm--f--fr.mp3
```

⚠ **Retrofitting a naming scheme across 660 files is a job nobody does.** Decide
it now, apply it to the first file.

`f` and `m` rather than voice names, so a voice can be replaced without renaming
the library.

### 2 · The preference is global, set once, device-only

**Not per protocol.** A member who wants a female voice wants it everywhere. Being
asked again on every protocol is the opposite of what this product is for.

**Device-only**, consistent with everything else — which means a second device
starts from the default, and the default has to be a deliberate choice rather than
whatever happens to be first in an array.

⚠ **Copy the `sr-theme` pattern exactly.** Midnight/Sunrise already solves this
problem on this platform: set once, remembered, visible but not intrusive. One
storage pattern, not two.

### 3 · The toggle sits beside the theme control, not in the player

**A member in distress should not be choosing a voice.** The selection belongs
where Midnight/Sunrise already lives — set before, remembered after.

**One exception:** on first play, the toggle should be visible near the player, so
somebody discovers it exists. After that it stays in settings.

⚠ **No preview, no A/B sample, no "which do you prefer" screen.** Every one of
those is a decision placed in front of somebody who came for something else.

### 4 · Storage, and it is not Git

6.4 GB of audio does not belong in a repository.

**Report before deciding:** whether Wistia is in the member path yet — it was
provisioned but not wired as of the last review — and what the guided meditation
currently loads from.

---

## The pipeline rule

**A protocol is not finished until both voices exist.**

Not "generate the female first and catch up later." A toggle that works on some
protocols and not others is worse than no toggle, because it breaks exactly when
somebody trusts it.

Add to `CLAUDE.md` and to the production checklist.

---

## Voice selection — what to look for

**Neither voice should sound like a meditation app.** The register that works here
is the one already in the scripts: plain, unhurried, and not performing calm.

| | |
|---|---|
| **Pace** | Around 105 words a minute. Slower than reading aloud |
| **Warmth** | Present, not applied. A voice doing sympathy is worse than a neutral one |
| **Range** | Must hold up over fifteen minutes — Shame Dissolution is 1,580 words |
| **Accent** | Something that does not place the listener geographically |

⚠ **Test on `t1-05` Shame Dissolution before committing to a voice.** It is the
longest and the most emotionally loaded. A voice that survives it survives
everything; a voice chosen on a 500-word sample will flatten by minute nine.

**And test the two against each other on the same script.** They need to feel like
two people reading the same thing, not two different products.

---

## What Andre still records

Cloning is off the table for the protocols. **But his voice is still the right one
for the things that are actually him:**

- The founder's account
- Live sessions and workshops
- The podcast
- Anything on the About or Method pages that speaks in first person

**The distinction is clean:** he speaks where he is the subject. He does not speak
where the member is.

---

## Disclosure

**Say that the meditations are AI-generated, once, plainly, somewhere findable.**

The platform publishes eleven things it will never say and audits its own
framework separation. An undisclosed synthetic voice would sit badly against that.
Disclosed, it costs nothing — and it is the honest version of what most of the
category already does quietly.

Suggested placement: the method page, near the guided meditation description, and
one line in the FAQ.

---

## Open decisions

- ⚠ Which voice is the default — this needs to be a decision, not an accident
- ⚠ Whether the founder's voice is offered as a third option, or not at all
- ○ Voice sourcing — ElevenLabs library, Voice Design, or licensed talent
- ○ Storage: Wistia, an object store, or Netlify Large Media
- ○ Whether existing recorded audio is retired or kept as a third option
