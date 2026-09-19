# Clearing (t0-00) — ElevenLabs pacing instructions

**What to set in the UI, then the script to paste.**

---

## 1 · The honest constraint, first

**No text-to-speech model will hold a ten-second silence.** Long gaps get
compressed no matter how they're written — that is what happened on both takes so
far. So the goal here is **not** to get the full meditation pacing out of
ElevenLabs. It is to get:

- an unhurried *speaking* rate
- a clear, consistent **hierarchy** of pauses — short, medium, long

The actual silences get set afterwards, in the edit. A render that comes back at
four to five minutes is correct and expected; it becomes ten or eleven once the
gaps are opened.

---

## 2 · Settings

| Control | Set to | Why |
|---|---|---|
| **Speed** | **0.85–0.90** | The single most effective control. This is what stops the racing. Start at 0.88. |
| **Stability** | **High** (~70–80%) | Keeps the read even across a long script. Low stability makes the voice perform, which reads as insincere here. |
| **Similarity** | Moderate (~60–75%) | High values can exaggerate breathiness over a long file. |
| **Style exaggeration** | **0, or as low as it goes** | Any style push turns this warm. The script is warm already; the delivery should not add to it. |
| **Speaker boost** | Off | Adds presence the mix does not need. |

**Model.** If the voice you're keeping is a v3 render, stay on v3 — the voice is the
priority. Be aware v3 largely ignores `<break>` tags, which is why the pacing
collapsed; the punctuation method below is what works there.

---

## 3 · How pacing is written into the text

**Do not use `<break>` tags.** They were the failure both times.

Use punctuation and line spacing instead. These work on every model:

| Want | Write |
|---|---|
| Short beat | `—` or a comma |
| Medium pause | `…` (single ellipsis) |
| Long pause | `…` then a **blank line** |
| Section break | **two blank lines** |

Sentence fragments on their own line also slow the read. Short sentences beat long
ones for this — the script is already written that way.

---

## 4 · Render in sections, not in one pass

Paste **one numbered section at a time**, render, download. Six files.

Two reasons: a model's pacing drifts faster over a long input, and section
boundaries become the exact points where the long silences are inserted later —
so the splits are useful rather than a chore.

---

## 5 · The script — paste each section separately

### § 1 — Opening

```
There's an engagement ahead of you…

Not yet. In a minute.

Right now you're on the way to it — and this is that part…

Most of the time, nobody stops here. You move from one situation straight into the next… and find out afterwards what you carried across…

So — what's ahead.

Name it, just to yourself. One line…

Good. Leave it there. We'll come back to it…

Four moves. Recognition. Regulation. Release. Rise.

You're running them on the way in.
```

### § 2 — Recognition

```
Where are you, right now?…

Not why. Just what's here…

Start with the body — because it answers faster than anything else.

Jaw…

Shoulders…

Hands…

Stomach…

Breath — where it's sitting. How far down it's going…

No verdict on any of it. Just what's there…

Now — attention. Where has it been circling?…

A conversation that didn't finish. A task left open. A sentence you're still composing…

Whatever it is — notice it's where attention keeps landing…

One word for where you are. Whatever's true.

It doesn't need to be interesting…

That's the skill, and it's the whole of this step. You just found your own state — without anything forcing you to look.
```

### § 3 — Regulation

```
Four counts in…

Six out. Longer out than in…

Nothing to fix. You're not trying to feel different.

You're arriving…

Attention to the middle of your chest…

If it helps — a hand there. Flat, light…

Same count you'd use in the worst hour of a bad week.

Nothing about it changes.
```

### § 4 — Release

```
Some of what's here belongs to what's ahead. Most of it doesn't…

Nothing to get rid of. It simply doesn't need to come with you…

That unfinished situation attention kept circling — it can stay where it is.

It'll still be there afterwards. It doesn't need you right now…

And whatever the body's holding — let as much of it settle as wants to.

Not all of it. Whatever goes…

What's left, leave alone. You don't have to be clear of everything to walk into what's next…

And a question, while it's quiet…

What's running… that you didn't choose?…

Not a fault. A pattern doing its job on old instructions — a way of reading a room, a habit of checking, a tone you arrive with before anyone's spoken…

If an answer surfaced, leave it where it is.

If none did — that's ordinary. This question answers slowly.
```

### § 5 — Rise

```
Step outside it…

Someone on their way in. Not in trouble. Breathing four and six before they go…

Speak to them as you…

You know where you are. Go in with that…

Now — the engagement you named at the start. Bring it back…

Not how you want it to go. That does nothing for you.

Just the first move. Where you'll be. What you'll say first — or what you'll wait for…

And notice — you get to decide where attention sits going in.

That's what this is for…

One detail already here, before you finish. Not gratitude in general.

One specific detail. In the room. Now…

Now put down everything except that.
```

### § 6 — Close

```
Go when you're ready…

You'll have noticed there wasn't much to it. That's the point.

This is the one that fits on the way in…

Recognition. Regulation. Release. Rise.

Four moves — on the way through.
```

---

## 6 · The gaps to open in the edit

Silence to insert **after** each section, and at the marked points inside them.

| Position | Silence |
|---|---|
| After "Name it, just to yourself. One line." | **12 s** |
| End of § 1 | 5 s |
| After "Where are you, right now?" | **12 s** |
| After each body part (Jaw / Shoulders / Hands / Stomach) | 4 s each |
| After "Just what's there." | 10 s |
| After "Where has it been circling?" | 10 s |
| After "It doesn't need to be interesting." | **12 s** |
| End of § 2 | 5 s |
| After "Four counts in. / Six out." | **10 s** — one breath cycle |
| After "You're arriving." | 10 s |
| After "a hand there. Flat, light." | **20 s** — two cycles |
| End of § 3 | 10 s |
| After "Whatever goes." | 10 s |
| After "…that you didn't choose?" | **15 s** |
| After the "old instructions" line | 10 s |
| End of § 4 | 5 s |
| After "Just the first move…what you'll wait for." | **12 s** |
| After "In the room. Now." | 8 s |
| End of § 5 | 5 s |

Everything else: **3 s** between paragraphs.

---

## 7 · Master

Once assembled: **stereo, −16.0 LUFS integrated, −1.0 dBTP.**
300 ms of digital silence at head and tail so the first syllable doesn't clip on
web playback.
