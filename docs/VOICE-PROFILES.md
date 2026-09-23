# Voice Profiles — SR-F and SR-M

**Two voices. One choice, applied to both the video and the audio player.**
Companion to `docs/VOICE-ARCHITECTURE.md`.

---

## The register, taken from the scripts

> *"Do it with me. This one doesn't want to be looked at. That isn't incidental —
> it's most of what it is."*
>
> *"You got here. That took more than it looks like from where you are."*

**The scripts say "do it with me."** That is a companion doing the thing
alongside, not a guide instructing from outside it. Everything below follows from
that one phrase.

⚠ **Neither voice is characterised differently from the other.** Not a warm woman
and an authoritative man — that is lazy, and it makes the toggle a choice about
tone when it should be a choice about who is in your ear. **Same job, same
register, two people.** The only difference is timbre.

---

## What both voices must do

| | |
|---|---|
| **Pace** | ~105 words per minute. Noticeably slower than reading aloud, never drowsy |
| **Register** | Talking. Not intoning, not narrating, not performing calm |
| **Warmth** | Present, never applied. A voice *doing* sympathy is worse than a neutral one |
| **Authority** | Alongside, not above. It has done this too |
| **Range** | Must hold across 15 minutes without flattening |
| **Accent** | Unplaced. The listener should not be able to locate it geographically |
| **Age impression** | Mid-thirties to mid-forties. A peer, not a youth and not an elder |

## What both must not do

- **No breathiness.** It reads as intimacy the member did not ask for
- **No downward inflection on every sentence.** The meditation-app tic, and it
  makes the voice sound certain about things it should not be
- **No smiling tone.** Several protocols are about shame and grief
- **No rising warmth on hard lines.** *"That took more than it looks like"* is
  said flatly or it becomes pity
- **No emphasis on instruction verbs.** *"**Notice** the...", "**Let** your..."* —
  the scripts do not push and the voice should not either

---

## SR-F · the female voice

**Slug `f`. Filenames `t1-01-gm--f--en.mp3`, `t1-01-gm--f--en.mp4`.**

Lower than the meditation default — chest rather than head. The category
overwhelmingly uses a light, high, airy female voice and it is the single most
recognisable sound in wellness audio. **Sounding unlike it is the point.**

Someone who would be believable saying *"I have been in this"* and is not going
to make a moment of it.

**Reference points, for direction not imitation:** a documentary narrator rather
than a wellness app · a good radio interviewer at the moment they stop asking and
just wait.

## SR-M · the male voice

**Slug `m`. Filenames `t1-01-gm--m--en.mp3`, `t1-01-gm--m--en.mp4`.**

Mid-range, unhurried, no gravel. **Avoid the low, resonant, slightly-too-close
male voice** the category uses — it reads as authority and, on tracks about
relationships and shame, as the wrong person entirely.

Should be able to say *"Would your toes move?"* without any trace of amusement,
and *"nothing here asks you to say anything out loud, to anyone, ever"* without
solemnity.

⚠ **Explicitly not Andre.** If it can be mistaken for him it fails the purpose of
having it.

---

## Generation settings — starting point, then tune

| Parameter | Start at | Why |
|---|---|---|
| **Stability** | 0.55–0.65 | High enough that fifteen minutes stays consistent, low enough that it does not go robotic |
| **Similarity** | 0.75–0.85 | Keeps the voice identity across 31 files |
| **Style exaggeration** | 0.0–0.15 | Near zero. Style is what produces the meditation-app tic |
| **Speaker boost** | On | |
| **Model** | Multilingual v2/v3 | Better long-form prosody than Flash, and the corpus is small enough that the cost difference is a few dollars |

**Pacing is authored in the text, not in the settings.** The scripts carry no
pause markers — that gap is now an advantage. Notate the breaths and holds once,
in the script, and every file gets identical pacing. That is the thing recording
by voice could never have delivered.

---

## Audition protocol

⚠ **Do not choose a voice on a short sample.** A voice picked on 500 words will
flatten by minute nine.

**Audition on two scripts, both in full:**

1. **`t1-05` Shame Dissolution** — 1,580 words, the longest and most loaded. Opens
   on *"This one doesn't want to be looked at."* **A voice that survives this
   survives everything.**
2. **`t1-07` Shutdown Recovery** — 556 words, the flattest. Opens on *"You got
   here. That took more than it looks like from where you are."* **This is where
   pity creeps in.** If the voice softens on that line, reject it.

**Then run both candidates on the same script, back to back.** They must sound
like two people reading the same thing — not two different products.

### Reject on any of these

- Sympathy on *"That took more than it looks like from where you are"*
- Amusement on *"Would your toes move?"*
- Solemnity on *"nothing here asks you to say anything out loud, to anyone, ever"*
- Audible flattening after minute nine
- Anything that sounds like it is being read

---

## Sourcing

**Try the library first.** ElevenLabs' voice library is large and free to audition,
and a library voice needs no training data and no licensing conversation.

**Voice Design second**, if nothing in the library holds up across the two
audition scripts. It generates from a text description, which means the register
above can be described directly.

**Licensed talent third.** More control, real cost, and it reintroduces a person
who can become unavailable.

⚠ **Check the commercial licence for whichever voice is chosen**, and record the
voice ID, model version and settings in the fix register. **A regenerated file two
years from now must match the ones beside it** — and a voice that has been retired
or re-tuned upstream will not.

---

## The pipeline rule

**A protocol is not finished until SR-F and SR-M both exist, in audio and video.**

Four assets. Not "generate one and catch up later" — a toggle that works on some
protocols and not others fails exactly when somebody trusts it.

---

## Open

- ⚠ Which voice plays for a member who has never chosen. This is a decision, not
  a default to inherit from whichever file loads first
- ○ Voice IDs, model version and settings, once selected — recorded permanently
- ○ Whether the existing recorded audio is retired or kept
