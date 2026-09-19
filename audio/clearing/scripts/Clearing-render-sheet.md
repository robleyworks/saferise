# Clearing (t0-00) — render sheet

One render per row. **Save each as the filename shown, into `renders/`.**

Settings for every render:

| Control | Value |
|---|---|
| Voice | your chosen SR-F |
| Speed | **0.88** |
| Stability | high, ~70–80% |
| Style exaggeration | 0 |
| Speaker boost | off |

Paste the text exactly as written. The ellipses are doing pacing work inside a
passage — the silences *between* passages are handled by the manifest, so don't
try to add them here.

---

## § 1 · Opening

**`01-opening-a.mp3`**
```
There's an engagement ahead of you… Not yet. In a minute. Right now you're on the way to it — and this is that part… Most of the time, nobody stops here. You move from one situation straight into the next… and find out afterwards what you carried across.
```

**`02-name-it.mp3`**
```
So — what's ahead. Name it, just to yourself. One line.
```

**`03-leave-it.mp3`**
```
Good. Leave it there. We'll come back to it.
```

**`04-four-moves.mp3`**
```
Four moves. Recognition. Regulation. Release. Rise. You're running them on the way in.
```

---

## § 2 · Recognition

**`05-where-are-you.mp3`**
```
Where are you, right now?
```

**`06-not-why.mp3`**
```
Not why. Just what's here.
```

**`07-body-intro.mp3`**
```
Start with the body — because it answers faster than anything else.
```

**`08-jaw.mp3`**
```
Jaw.
```

**`09-shoulders.mp3`**
```
Shoulders.
```

**`10-hands.mp3`**
```
Hands.
```

**`11-stomach.mp3`**
```
Stomach.
```

**`12-breath.mp3`**
```
Breath — where it's sitting. How far down it's going.
```

**`13-no-verdict.mp3`**
```
No verdict on any of it. Just what's there.
```

**`14-attention.mp3`**
```
Now — attention. Where has it been circling?
```

**`15-circling.mp3`**
```
A conversation that didn't finish. A task left open. A sentence you're still composing… Whatever it is — notice it's where attention keeps landing.
```

**`16-one-word.mp3`**
```
One word for where you are. Whatever's true. It doesn't need to be interesting.
```

**`17-thats-the-skill.mp3`**
```
That's the skill, and it's the whole of this step. You just found your own state — without anything forcing you to look.
```

---

## § 3 · Regulation

**`18-four-six.mp3`**
```
Four counts in… Six out. Longer out than in.
```

**`19-nothing-to-fix.mp3`**
```
Nothing to fix. You're not trying to feel different. You're arriving.
```

**`20-chest-hand.mp3`**
```
Attention to the middle of your chest… If it helps — a hand there. Flat, light.
```

**`21-same-count.mp3`**
```
Same count you'd use in the worst hour of a bad week. Nothing about it changes.
```

---

## § 4 · Release

**`22-belongs-ahead.mp3`**
```
Some of what's here belongs to what's ahead. Most of it doesn't.
```

**`23-nothing-rid-of.mp3`**
```
Nothing to get rid of. It simply doesn't need to come with you.
```

**`24-can-stay.mp3`**
```
That unfinished situation attention kept circling — it can stay where it is. It'll still be there afterwards. It doesn't need you right now.
```

**`25-let-it-settle.mp3`**
```
And whatever the body's holding — let as much of it settle as wants to. Not all of it. Whatever goes.
```

**`26-leave-alone.mp3`**
```
What's left, leave alone. You don't have to be clear of everything to walk into what's next.
```

**`27-a-question.mp3`**
```
And a question, while it's quiet.
```

**`28-didnt-choose.mp3`**
```
What's running… that you didn't choose?
```

**`29-old-instructions.mp3`**
```
Not a fault. A pattern doing its job on old instructions — a way of reading a room, a habit of checking, a tone you arrive with before anyone's spoken.
```

**`30-answers-slowly.mp3`**
```
If an answer surfaced, leave it where it is. If none did — that's ordinary. This question answers slowly.
```

---

## § 5 · Rise

**`31-step-outside.mp3`**
```
Step outside it.
```

**`32-someone-on-way.mp3`**
```
Someone on their way in. Not in trouble. Breathing four and six before they go.
```

**`33-speak-as-you.mp3`**
```
Speak to them as you… You know where you are. Go in with that.
```

**`34-bring-it-back.mp3`**
```
Now — the engagement you named at the start. Bring it back.
```

**`35-first-move.mp3`**
```
Not how you want it to go. That does nothing for you. Just the first move. Where you'll be. What you'll say first — or what you'll wait for.
```

**`36-you-decide.mp3`**
```
And notice — you get to decide where attention sits going in. That's what this is for.
```

**`37-one-detail.mp3`**
```
One detail already here, before you finish. Not gratitude in general. One specific detail. In the room. Now.
```

**`38-put-down.mp3`**
```
Now put down everything except that.
```

---

## § 6 · Close

**`39-go-when-ready.mp3`**
```
Go when you're ready.
```

**`40-close.mp3`**
```
You'll have noticed there wasn't much to it. That's the point. This is the one that fits on the way in… Recognition. Regulation. Release. Rise. Four moves — on the way through.
```

---

## Then

```bash
cd ~/Documents/GitHub/saferise/audio/clearing
python3 assemble.py manifest.txt ./renders Clearing_t0-00.mp3
```

**A note on the one-word passages.** Jaw, Shoulders, Hands, Stomach and
`31-step-outside` are very short, and a model given three words has no run-up —
they can land clipped or brisk. If they do, render each with a short throwaway
sentence before it and trim the front in any audio editor. Do that only if they
actually sound wrong.
