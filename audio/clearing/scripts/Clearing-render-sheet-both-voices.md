# Clearing — t0-00 · render sheet

Both voices. Everything needed to produce the finished audio.

---

## Voices

| | ID | |
|---|---|---|
| **SR-F** | `fbmnBhl0AKROCH04b4hT` | female, 33–40 |
| **SR-M** | `7DhKLMri1c2Bkve4m7Ro` | male, 28–34 |

## Settings — identical for both

```
Model        eleven_multilingual_v2
Speed        0.88          ← the setting that stops the racing
Stability    0.75
Similarity   0.70
Style        0             ← any style push makes this saccharine
Speaker boost  off
```

**Model must be v2.** It honours `<break>` tags. v3 ignores them, which is what collapsed
the pacing on two earlier attempts.

## Master

```
Channels     stereo
Integrated   −16.0 LUFS ±0.5
True peak    −1.0 dBTP
Head / tail  300 ms digital silence
```

---

## How pacing works here

**Two mechanisms, and they are not interchangeable.**

`<break time="3s" />` sits **inside** a passage. Up to 3 seconds, honoured by v2, and the
model reads through it as one continuous thought — which is what keeps the tone even.

`[[n]]` is **real silence between passages**, inserted after rendering. No TTS model will
hold a gap of 8 or 20 seconds; every attempt to make one collapsed. These are cut in.

**28 passages · 220 seconds of programmed silence · finished length ≈ 7:30.**

---

## The build

```bash
cd ~/Documents/GitHub/saferise/audio/clearing

python3 build_protocol.py clearing.txt Clearing_SRF.mp3 --voice f
python3 build_protocol.py clearing.txt Clearing_SRM.mp3 --voice m
```

Renders are cached by text **and** voice, so the two coexist and re-running either is
free. Changing a pause length costs nothing and takes seconds.

---

## The script

Pause lengths shown after each passage. **Four are longer than 8 seconds because they
follow a breathing instruction** — those are marked.

---

**1.** There's an engagement ahead of you… Not yet. In a minute. Right now you're on the way to it — and this is that part… Most of the time, nobody stops here. You move from one situation straight into the next… and find out afterwards what you carried across. `<break 3s>` So — what's ahead. Name it, just to yourself. One line.

→ **8 s**

**2.** Good. Leave it there. We'll come back to it. `<break 3s>` Four moves. Recognise. Regulate. Release. Rise. You're running them on the way in.

→ **6 s**

**3.** Where are you, right now?

→ **8 s**

**4.** Not why. Just what's here.

→ **5 s**

**5.** Start with the body — because it answers faster than anything else. `<break 3s>` Jaw. `<break 3s>` Shoulders. `<break 3s>` Hands. `<break 3s>` Stomach. `<break 3s>` Breath — where it's sitting. How far down it's going.

→ **8 s**

**6.** No verdict on any of it. Just what's there.

→ **8 s**

**7.** Now — attention. Where has it been circling?

→ **8 s**

**8.** A conversation that didn't finish. A task left open. A sentence you're still composing… Whatever it is — notice it's where attention keeps landing.

→ **8 s**

**9.** One word for where you are. Whatever's true. It doesn't need to be interesting.

→ **8 s**

**10.** That's the skill, and it's the whole of this step. You just found your own state — without anything forcing you to look.

→ **6 s**

**11.** Four counts in… Six out. Longer out than in.

→ **10 s** · *one full breath cycle*

**12.** Nothing to fix. You're not trying to feel different. You're arriving.

→ **10 s** · *one cycle*

**13.** Attention to the middle of your chest… If it helps — a hand there. Flat, light.

→ **20 s** · *two cycles*

**14.** Same count you'd use in the worst hour of a bad week. Nothing about it changes.

→ **10 s** · *one cycle*

**15.** Some of what's here belongs to what's ahead. Most of it doesn't.

→ **5 s**

**16.** Nothing to get rid of. It simply doesn't need to come with you. `<break 3s>` That unfinished situation attention kept circling — it can stay where it is. It'll still be there afterwards. It doesn't need you right now.

→ **8 s**

**17.** And whatever the body's holding — let as much of it settle as wants to. Not all of it. Whatever goes.

→ **8 s**

**18.** What's left, leave alone. You don't have to be clear of everything to walk into what's next.

→ **6 s**

**19.** And a question, while it's quiet. `<break 3s>` What's running… that you didn't choose?

→ **8 s**

**20.** Not a fault. A pattern doing its job on old instructions — a way of reading a room, a habit of checking, a tone you arrive with before anyone's spoken.

→ **8 s**

**21.** If an answer surfaced, leave it where it is. If none did — that's ordinary. This question answers slowly.

→ **6 s**

**22.** Step outside it. `<break 3s>` Someone on their way in. Not in trouble. Breathing four and six before they go.

→ **5 s**

**23.** Speak to them as you… You know where you are. Go in with that.

→ **8 s**

**24.** Now — the engagement you named at the start. Bring it back.

→ **6 s**

**25.** Not how you want it to go. That does nothing for you. Just the first move. Where you'll be. What you'll say first — or what you'll wait for.

→ **8 s**

**26.** And notice — you get to decide where attention sits going in. That's what this is for.

→ **8 s**

**27.** One detail already here, before you finish. Not gratitude in general. One specific detail. In the room. Now.

→ **8 s**

**28.** Now put down everything except that. `<break 3s>` Go when you're ready. `<break 3s>` You'll have noticed there wasn't much to it. That's the point. This is the one that fits on the way in… Recognise. Regulate. Release. Rise. Four moves — on the way through.

→ *end*

---

## Known issue — read before committing to a library run

**Per-passage rendering breaks tone across seams.** Each passage is a separate API call
with no knowledge of the ones around it, so the model guesses a reading each time. Across
28 guesses, some land in a different register from their neighbours — which is why an
earlier attempt sounded incoherent rather than merely slow.

The merged passages here reduce it; they don't solve it.

**The untested alternative is ElevenLabs Studio**, which renders a whole script as one
continuous performance and lets the gaps be set on a timeline afterwards. That gives tone
coherence and arbitrary pause lengths together, at the cost of being hands-on per
protocol.

**Build Clearing both ways and compare before committing to the rest.** The seam problem
costs nothing to discover on one script and a great deal to discover on sixty-two files.
