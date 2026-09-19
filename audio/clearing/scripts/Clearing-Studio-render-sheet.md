# Clearing (t0-00) — ElevenLabs Studio render sheet

**Voice:** SR-F · `fbmnBhl0AKROCH04b4hT`  
**Model:** Eleven Multilingual v2 — it honours `<break>` tags. v3 does not.  
**Speed:** 0.88  ·  **Stability:** 75%  ·  **Style:** 0  ·  **Speaker boost:** off

---

## How this works

Paste the whole script into **one Studio project**, as separate blocks — one per numbered
item below. Studio reads the project as a single continuous performance, so the voice holds
its tone across the whole session instead of resetting each time.

`<break>` tags inside a block are honoured up to 3 seconds — those are already written in.
The longer gaps go **between** blocks, set on the timeline. Lengths are listed after each.

Total timeline silence: **220 s (3 min 40 s).** Finished length lands near **7 min 30 s.**

---

### 1
```
There's an engagement ahead of you… Not yet. In a minute. Right now you're on the way to it — and this is that part… Most of the time, nobody stops here. You move from one situation straight into the next… and find out afterwards what you carried across. <break time="3s" /> So — what's ahead. Name it, just to yourself. One line.
```
**Gap after: 8 s**

### 2
```
Good. Leave it there. We'll come back to it. <break time="3s" /> Four moves. Recognition. Regulation. Release. Rise. You're running them on the way in.
```
**Gap after: 6 s**

### 3
```
Where are you, right now?
```
**Gap after: 8 s**

### 4
```
Not why. Just what's here.
```
**Gap after: 5 s**

### 5
```
Start with the body — because it answers faster than anything else. <break time="3s" /> Jaw. <break time="3s" /> Shoulders. <break time="3s" /> Hands. <break time="3s" /> Stomach. <break time="3s" /> Breath — where it's sitting. How far down it's going.
```
**Gap after: 8 s**

### 6
```
No verdict on any of it. Just what's there.
```
**Gap after: 8 s**

### 7
```
Now — attention. Where has it been circling?
```
**Gap after: 8 s**

### 8
```
A conversation that didn't finish. A task left open. A sentence you're still composing… Whatever it is — notice it's where attention keeps landing.
```
**Gap after: 8 s**

### 9
```
One word for where you are. Whatever's true. It doesn't need to be interesting.
```
**Gap after: 8 s**

### 10
```
That's the skill, and it's the whole of this step. You just found your own state — without anything forcing you to look.
```
**Gap after: 6 s**

### 11
```
Four counts in… Six out. Longer out than in.
```
**Gap after: 10 s**  ← breathing. One full four-six cycle.

### 12
```
Nothing to fix. You're not trying to feel different. You're arriving.
```
**Gap after: 10 s**  ← breathing. One full four-six cycle.

### 13
```
Attention to the middle of your chest… If it helps — a hand there. Flat, light.
```
**Gap after: 20 s**  ← breathing. Two cycles.

### 14
```
Same count you'd use in the worst hour of a bad week. Nothing about it changes.
```
**Gap after: 10 s**  ← breathing. One full four-six cycle.

### 15
```
Some of what's here belongs to what's ahead. Most of it doesn't.
```
**Gap after: 5 s**

### 16
```
Nothing to get rid of. It simply doesn't need to come with you. <break time="3s" /> That unfinished situation attention kept circling — it can stay where it is. It'll still be there afterwards. It doesn't need you right now.
```
**Gap after: 8 s**

### 17
```
And whatever the body's holding — let as much of it settle as wants to. Not all of it. Whatever goes.
```
**Gap after: 8 s**

### 18
```
What's left, leave alone. You don't have to be clear of everything to walk into what's next.
```
**Gap after: 6 s**

### 19
```
And a question, while it's quiet. <break time="3s" /> What's running… that you didn't choose?
```
**Gap after: 8 s**

### 20
```
Not a fault. A pattern doing its job on old instructions — a way of reading a room, a habit of checking, a tone you arrive with before anyone's spoken.
```
**Gap after: 8 s**

### 21
```
If an answer surfaced, leave it where it is. If none did — that's ordinary. This question answers slowly.
```
**Gap after: 6 s**

### 22
```
Step outside it. <break time="3s" /> Someone on their way in. Not in trouble. Breathing four and six before they go.
```
**Gap after: 5 s**

### 23
```
Speak to them as you… You know where you are. Go in with that.
```
**Gap after: 8 s**

### 24
```
Now — the engagement you named at the start. Bring it back.
```
**Gap after: 6 s**

### 25
```
Not how you want it to go. That does nothing for you. Just the first move. Where you'll be. What you'll say first — or what you'll wait for.
```
**Gap after: 8 s**

### 26
```
And notice — you get to decide where attention sits going in. That's what this is for.
```
**Gap after: 8 s**

### 27
```
One detail already here, before you finish. Not gratitude in general. One specific detail. In the room. Now.
```
**Gap after: 8 s**

### 28
```
Now put down everything except that.
```
**Gap after: 5 s**

### 29
```
Go when you're ready. <break time="3s" /> You'll have noticed there wasn't much to it. That's the point. This is the one that fits on the way in… Recognition. Regulation. Release. Rise. Four moves — on the way through.
```

---

## Export

Export as WAV or 192 kbps MP3, then master to the platform spec:

```bash
ffmpeg -i Clearing_studio.wav -af "adelay=300|300,apad=pad_dur=0.3,loudnorm=I=-16:TP=-1:LRA=11" \
  -ar 48000 -ac 2 -b:a 192k Clearing_t0-00.mp3
```

That gives stereo, −16.0 LUFS integrated, −1.0 dBTP, with 300 ms of digital silence at head
and tail so the first syllable does not clip on web playback.
