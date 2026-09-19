# SafeRise Protocol — Voiceover Script Handover

Prepared 18 Sep 2026. Context for continuing the meditation script → ElevenLabs Studio pipeline.

---

## 1. The standing job

Andre pastes or attaches meditation scripts. Each one is returned as plain-text blocks, ready to
copy straight into ElevenLabs Studio, which has a **5,000-character hard limit per render**.

### Formatting rules (always applied)

- **Plain text only.** No markdown, no asterisks, no italics, no `###` headings.
- **Remove**: document titles, script code headers, stage directions / delivery notes
  ("spoken slowly, allow silences"), and any preamble the drafting tool added
  ("Here is the fully enhanced treatment…").
- **Straighten** curly apostrophes and quotes to ASCII.
- **Paragraph the text into beats** — blank line between each. Where the source is one wall of
  text, group into beats of roughly 150–170 characters. Where sentences are very short and clipped,
  group several per beat; one-sentence-per-line produces a stilted, over-paused read.
- **Force a paragraph break** before each section marker and before breath instructions
  ("Breathe in for four…", "One more slow breath…").
- **Ellipsis on the turn of the breath**: "in for four... and out for six" — gives the out-breath air.
- **Report the character count** of every block.

### Splitting rules

- Under 5,000 → single render.
- Over 5,000 → split at a paragraph boundary, but **split evenly**, not at the last break under
  5,000. A 4,982 / 638 split is wrong; ~50/50 at a section boundary is right.
- Many scripts arrive pre-split by the author as Part 1 / Part 2. Keep their split.
- Anything at 4,950+ should be trimmed — no headroom for later edits.

### Section markers

The four phases are **Recognise, Regulate, Release, Rise**. They must be audible. Two accepted styles:

1. **Standalone spoken line** — `Recognise.` on its own with blank lines either side.
2. **Woven into the prose** — "So let us begin by recognising where this sits…", "Now we
   regulate—not to reduce anything, but to…", "That second current is the only thing we release
   here", "we rise—not away from it, but into quiet continuity."

Newer scripts use the woven style. Andre asked for it explicitly on the sensitive scripts.

### ElevenLabs settings (constant across the library)

- Speed **0.9** (Grief Integration: 0.85)
- Stability **0.65**
- Similarity **0.75**
- Style exaggeration **0**

Render a script's two parts in the same session with identical settings, or the seam is audible.

---

## 2. Two modes — know which one is being asked for

**Mode A — formatting only.** His wording untouched. Only titles/markdown/spacing change.
He pushed back once when word substitutions were made unasked: *"go back to my versions but
just add the words into the script. dont change my sentences."* When in doubt, this is the default.

**Mode B — enhancement.** Explicitly requested ("enhance these", "holistic treatment",
"same treatment"). Then apply the stack below. Always state what was added so he can revert.

### The enhancement stack (Mode B)

Five elements he is building toward. Assessed and added in this order of value:

1. **Somatic release** — the biggest recurring gap. Scripts name where tension sits and then
   never discharge it. Every Regulate section should release *the exact places its own Recognise
   section named*: hands opened/spread/dropped, jaw and tongue, throat, shoulders down, chest
   band slack, belly soft. Overwhelm gets hands shaken out (electric charge needs an exit).
2. **Frequency work** — a low hum on the out-breath, twice in Regulate, called back at the
   closing breath. Justify it physically: it lengthens the exhale without counting, and it
   vibrates the chest/throat. Strongest fit where the script names a gripped throat.
3. **Heart coherence** — the pacing (4-in/6-out = 10s = 0.1 Hz) is already correct. The missing
   third component is an **evoked warm feeling** at the chest. Choose the object per script:
   - Insecurity → *someone you love* (loving can't be graded by the audit)
   - Grief → *the love itself*, which is still present — never a substitute gratitude
   - Conflict → something from **outside** the conflict entirely; forcing appreciation toward an
     adversary reads as false
   - Overwhelm → "one small thing that is genuinely fine right now"
4. **Metacognitive dwell time** — the observer separation is the strongest idea in these scripts
   but passes in half a sentence. Add a beat at each layer: "Stay there. Let that be true for one
   full breath." **Exception:** grief and overwhelm — Andre explicitly does **not** want
   shadow-peeling there. "The truth is already obvious. Nothing is hiding from you."
5. **Old wisdom made load-bearing** — drop the "There is an old wisdom that reminds us" preamble
   and let the image speak, then carry it through the whole script and return it at the close.
   Working examples: the knot given slack (Performance Anxiety), lowering the sails (Anxiety
   Reset), the burning coal (Conflict Navigation), the river (Safe Conversation), the tree and its
   roots (Insecurity).

**Plus, consistently valuable:** name the resistance in Release. Every script asks the listener to
put something down without acknowledging why they're holding it. "A part of you does not want to
drop the audit, because it feels like the only thing between you and being caught out."

### Closing cue (standardised at his request)

Replaces "gently move your hands and feet":

> Feel the floor beneath you. Roll your shoulders slowly, letting the tension in your neck loosen.
> Stretch your arms out. And open your eyes when you are ready.

Split into separate sentences so the voice leaves room to actually do each movement.

---

## 3. Recurring defects to check on arrival

- **Placeholder one-word descriptors.** "Agitated" appears across many scripts, "Unsteady" across
  others, regardless of the sensations that script just described. Flag; substitute per script only
  in Mode B (e.g. *hot*, *shaken*, *tight*, *exposed*, *outside*, *dropping*, *wired*).
- **"Clinically, …"** — puts a lab coat on the narrator mid-meditation. Andre has asked for it
  removed every time it appears. Also "genuine clinical compassion" → "genuine compassion".
- **"…into your breath stream and let it circulate out"** — he prefers
  "put that where your breath is, and let it go out with it."
- **Stage directions and drafting-tool preambles** left in the file.
- **Repeated refrains across scripts**: "Weather passes through a room, but the room doesn't
  become the weather", "Striving is just another form of fighting", and the four-driver list
  (losing control / left alone / being the problem / running out of time). Fine as deliberate
  protocol repetition; flag so it stays a choice.
- **Duplicated sentences within a script**, mid-sentence capitals after em-dashes, stray commas
  ("that quiet, hum"), missing words in opening lines.
- **Missing parts.** T3-05 arrived labelled "Part 1" with no Part 2 — Release and Rise had to be
  written. Always check all four phases are present.

---

## 4. Script inventory — 30 scripts

Voice casting deliberately omitted; Andre is reconciling that separately.
Character counts are for the processed blocks as last delivered.

### Tier 1 — internal states

| Code | Script | Parts | Chars |
|---|---|---|---|
| T1-01 | Anxiety Reset | 2 | 3,928 / 2,652 |
| T1-02 | Anger Alchemy | 2 | 3,202 / 2,934 |
| T1-03 | Overwhelm Threshold | 2 | 4,268 / 3,216 |
| T1-04 | Abandonment Wound | 2 | 2,907 / 3,806 |
| T1-05 | Shame Dissolution | 1 | 4,779 |
| T1-06 | Grief Integration | 2 | 4,312 / 3,124 |
| T1-08 | Jealousy Release | 1 | 3,535 |
| T1-09 | Insecurity Anchor | 1 | 4,413 |

### Tier 2 — relational

| Code | Script | Parts | Chars |
|---|---|---|---|
| T2-01 | Safe Conversation | 2 | 4,186 / 3,092 |
| T2-02 | Rupture & Repair | 1 | 3,802 |
| T2-03 | Trust & Betrayal | 2 | 2,826 / 2,626 |
| T2-04 | Resentment Release | 1 | 3,527 |
| T2-05 | Intimacy Barrier | 1 | 3,967 |
| T2-07 | Projection Clarity | 2 | 2,304 / 3,983 |
| T2-09 | Pursue & Withdraw | 1 | 3,689 |

### Tier 3 — performance and work

| Code | Script | Parts | Chars |
|---|---|---|---|
| T3-01 | High-Stakes Presence | 2 | 2,668 / 3,366 |
| T3-02 | Conflict Navigation | 2 | 4,181 / 3,250 |
| T3-03 | Imposter Dissolution | 1 | 4,451 |
| T3-04 | Perfectionism Release | 2 | 2,651 / 2,615 |
| T3-05 | Performance Anxiety | 2 | 4,247 / 2,594 |
| T3-06 | Belonging Gap | 1 | 4,589 |
| T3-09 | Burnout & Overload | 2 | 4,940 / 488 |
| T3-10 | Creative Flow | 1 | 4,903 |

### Uncoded — arrived without a T-number

| Working title | Parts | Chars |
|---|---|---|
| Shutdown / Numb (butterfly; "your body goes quiet first") | 2 | 2,845 / 2,225 |
| Ending / Grief ("It's ending, or it has ended") | 2 | 2,562 / 2,561 |
| Unappreciated / Invisible | 2 | 2,490 / 2,550 |
| Unchangeable Situation ("something can't be changed") | 2 | 2,751 / 2,917 |
| Double Standard (unfair rule applied to you) | 1 | 3,894 |
| Career Crossroad (two paths, decision bracing) | 1 | 4,925 |
| Insecurity (tree / audit — newest, most developed) | 2 | 4,996 / 3,905 |

---

## 5. Open items

**Numbering gaps.** If the scheme is T1×9, T2×9, T3×10 = 28, then **T1-07, T2-06, T2-08, T3-07,
T3-08** are unfilled. Five gaps, seven uncoded scripts. Most uncoded scripts are probably the
missing numbers. Map them before rendering — once these are audio files named by code, an
unnumbered script is hard to place.

**Probable duplicates.**
- **Insecurity (tree/audit)** vs **T1-09 Insecurity Anchor** — same territory, same word
  "unsteady", same audit mechanic. The tree version is substantially stronger and likely
  supersedes T1-09.
- **Ending / Grief** vs **T1-06 Grief Integration** — distinguishable but close, and both open by
  refusing to console. Titles need to work harder: "Ending" vs "Bereavement".

**T3-09 Burnout & Overload needs re-splitting.** Currently 4,940 / 488. Rebalance to roughly
2,800 each at the Step 3 boundary.

**Insecurity (tree) Part 1 is 4,996 characters** — four under the limit. Trim one line before
rendering; any future edit breaks it.

**Guide persona — unresolved and consequential.** The newest Insecurity script has Andre's own
edits adding Italian-English inflection: three "no?" tags and the sign-off "Perfetto, ciao."
As a persona it's warm and distinctive, but it commits the library to an Italian-inflected guide.
None of the previously considered voices fit it, and a non-Italian TTS voice will flatten or
mispronounce "Perfetto". Decide: one signature guide across all 30 (recast around that persona),
or per-script voices (drop the Italianisms). Mixed by accident is the outcome to avoid.

**Also in that script:** the closing reveal currently reads "I said I wouldn't tell you, but I
lied... you are enough!" The timing instinct is right — reassurance lands at the end, after the
audit is quieted, where it would have been discounted at the start. But "I lied" spends the oath
the script is built on ("I am not going to assess you"), and for a listener whose insecurity sits
on trust wounds, a guide admitting deception makes the other promise checkable too. Suggested
rewording that keeps the gift and the promise:

> "One more thing before you go. I told you I wouldn't say it, and I meant it — an hour ago you'd
> have checked the source and set it straight back down. But you're not in the audit now. So I'll
> say it once, and you can do what you like with it. You are enough. You always were."

**Grief Integration** is the script most likely to reach someone in real distress. It has internal
exits ("if this is more than you can hold alone today, then holding it alone is not the
assignment — stop here, and go and be near someone"), but if this ships publicly that script
warrants a crisis resource in the surrounding UI rather than in the audio.

**Regulate sections are converging.** The hum, the warm-feeling step and the four-driver list now
appear across most scripts. Legitimate as a protocol the listener learns by repetition — but it
should be a decision, not drift.
