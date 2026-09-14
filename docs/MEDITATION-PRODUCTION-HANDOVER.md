# SafeRise — Guided Meditation Production Handover

**For a parallel production lane (ChatGPT or equivalent). Self-contained — assume no
prior context.**
Written 12 September 2026.

---

## 0 · How to use this document

You are helping produce finished audio for a nervous-system regulation platform. The
scripts are written and signed off. Your lane is **production**, not authorship.

**Three rules that override anything else you might infer:**

1. **Do not rewrite script text.** The scripts are register-controlled and every line
   has been through a vocabulary pass. If a line reads awkwardly, flag it — do not fix
   it.
2. **Everything you produce goes through a register pass before it reaches the repo or
   any live page.** Nothing you write is final copy.
3. **Decisions marked SETTLED below are not open.** If a tool cannot meet one, report
   the conflict rather than substituting a workable alternative.

⚠ **An older document, `SafeRise_Meditation_Video_Audio_Production_Brief.md`, is
superseded.** It describes Andre recording in his own voice, with AIVA, Descript and
Vimeo. All three of those, and the voice decision, have since changed. Ignore it.

---

## 1 · What is being produced

**30 protocols plus one foundation session (Clearing, `t0-00`) = 31 scripts.**

Each session becomes a guided meditation in **two AI voices**, giving **62 session
audio masters**. The modular Pangolin Anchor adds **two standalone audio masters** —
one SR-F and one SR-M — used by the platform when required. Video is a later option,
not this pass; the same modular assembly rule applies when video is produced.

Three tracks: Personal Transformation (`t1-`), Relationship Healing (`t2-`),
Professional Performance (`t3-`).

**Source of truth for script text:** `SafeRise_AllTracks_RecordingScripts.docx` — the
consolidated booth-marked file, 31 scripts. Per-track script files exist and are
**superseded drafts**; three of them still carry a retired framework naming. Do not
voice from them.

---

## 2 · The voices — SETTLED

Two AI voices, **SR-F (female)** and **SR-M (male)**. The member toggles between them,
and one choice applies to both the audio and video players.

**Andre's own voice is not used for protocol meditations** and is not offered as a
third option. His voice is correct for the founder's account, live sessions, the
podcast and first-person About/Method content — he speaks where he is the subject, not
where the member is.

English only. French and Spanish are roadmap, not scope.

**Open:** which voice is the default for a member who has never chosen.

---

## 3 · Audio specification — SETTLED

```
Channels:       stereo
Integrated:     −16.0 LUFS ±0.5, gated per ITU-R BS.1770-4
True peak:      −1.0 dBTP maximum
Loudness range: ≤ 9 LU  (provisional — verify against first real render)
Measurement:    ffmpeg loudnorm, two-pass. Single-pass is not acceptable.
Tail:           no fade below −45 dBFS in the final 10 s — a track ending in
                true silence reads as a dropped connection.
No autoplay anywhere.
```

**A note to prevent a recurring error.** A figure of **−19 LUFS** appears in older
records. It is not a competing target — it is the **mono** equivalent of the same
perceived level. A mono file measures ~3 LU lower than the same signal played back
across two channels. Delivery is stereo, so the target is −16. If you encounter −19,
it is the same decision expressed for a format that is no longer being used.

**Loudness is a post-process**, applied in batch to finished files. Getting it wrong
costs compute, not regeneration. Do not treat it as a gate on starting.

---

## 4 · The music beds — SETTLED

**One bed per state, platform-wide — not per track.** A bed plays under every protocol
in that state, across all three tracks. Four beds total.

Timing convention: 90 BPM, 3/4, so **one bar = two seconds.**

| Bed | Length | Cycle | Rate | Shape |
|---|---|---|---|---|
| **Agitated** | 5 bars | 2 bars in (4s) / 3 bars out (6s) | 6 breaths/min | Exhale-weighted |
| **Unsteady** | 6 bars | 3 in (6s) / 3 out (6s) | 5 breaths/min | Symmetric |
| **Numb** | 4 bars | 2 in (4s) / 2 out (4s) | 7.5 breaths/min | Symmetric, faster |
| **Clearing / Steady** | — | **no periodic swell** | — | Sustained field |

**Why Agitated is exhale-weighted.** Agitation is sympathetic overdrive and a longer
out-breath is the move that answers it. The 2:3 ratio is deliberately moderate — longer
exhales produce air hunger in exactly this population, and air hunger reads as anxiety.

**Why Numb is faster.** Numb is a shutdown state. Further downregulation is the wrong
direction; the person needs to come back up into range, not be slowed further. This is
the lowest-confidence number in the spec — the direction is well supported, the specific
figure is judgement.

**Why Clearing has no cycle.** Clearing is a foundation session for someone who arrives
regulated. A directional rhythm would imply they should be breathing other than they
are. Same instrumentation family, same level under the voice, no pace. Amplitude
variation under ~1 dB across any 30-second window — enough drift that it isn't a frozen
sample, not enough to read as a pace.

### Mix constraints

| Band | Rule | Why |
|---|---|---|
| 100–250 Hz | Bed content kept clear | The speaking voice fundamental lives here |
| 2–4 kHz | Bed content kept soft | Consonant definition |
| Below 60 Hz | Present but controlled | Warmth; nothing structural depends on it |

Bed sits **roughly 18 dB under the voice** — measured, not eyeballed. Bed short-term
level −28 to −30 LUFS beneath voice.

Beds are rooted low, around 41 Hz. **That choice is practical and aesthetic, not
therapeutic.** No pitch has a physiological effect another pitch lacks. Do not describe
it as if it does.

### Bed verification — required, not optional

Generative music will not reliably hit a requested phrase length. **Generate, then
measure.**

1. Import into a DAW.
2. Read the amplitude envelope; find the swell period.
3. Confirm against the table above, within about half a second.
4. Confirm the loop point produces no audible seam.
5. **Reject and regenerate if it misses. Do not adjust the specification to match what
   came back.**

For Clearing, the test inverts: confirm there is *no* periodic envelope. Loop seams are
harder to hide on a sustained pad — sample long enough to find a clean loop point.

**Audition every candidate under a real voice take at −18 dB, never solo.** A bed that
sounds excellent alone is frequently the one that fights speech. Loudness-match
candidates before comparing, or the louder one wins regardless of quality.

---

## 5 · Reading the scripts — the booth markers

| Marker | Meaning |
|---|---|
| `TEAL/BREATH` | A breath, counted |
| `GOLD/PAUSE` | Silence |
| `PURPLE/MUSIC` | Bed cue |
| `RED/ACTION` | A physical instruction — offered, never insisted on |
| `BLUE/ILLUSTRATION` | Visual cue for the video edit and poster — **not spoken** |
| `VOICE` | Register note — **not spoken** |

### Standing rules

- **The count is four in, six out. There is no hold** — the uneven ratio is the
  mechanism.
- **Second person throughout. Never first person.** The distance is what the fourth step
  rests on.
- **No durations are stated anywhere**, in the scripts or in the edit.
- Step headings are the public names. Internal names appear in nothing a member hears.
- **Six protocols open with movement rather than attention** — `t1-07`, `t1-10`,
  `t2-08`, `t2-10`, `t3-08`, `t3-09`. These carry a *Before we start* section and run
  slower throughout.

### The modular opening — SETTLED

The full **Pangolin Anchor is a foundation/onboarding asset, not a mandatory opening
inside every meditation master.** Present it in full in these cases only:

- Clearing (`t0-00`); and
- a member's first-ever protocol encounter, regardless of which protocol they choose.

For a returning protocol session, use the approved brief SafeRise arrival cue and then
go directly into the protocol-specific opening. Keep the full Anchor optionally
replayable.

Produce one approved standalone **SR-F Pangolin Anchor master** and one approved
standalone **SR-M Pangolin Anchor master**. Do not bake the full Anchor into the 62
session audio masters or later video masters. The platform prepends the matching
standalone Anchor dynamically for Clearing and for a member's first-ever protocol
encounter. The member's selected SR-F/SR-M voice applies consistently to the Anchor,
arrival cue and session.

The full Anchor wording remains register-controlled and identical wherever it is used.
The brief SafeRise arrival cue requires one approved wording and one approved master per
voice before returning-session production scales; do not improvise it during voicing.

**Script-level implications — flag only; do not rewrite body copy:**

- Any per-script note that says *Open with the Pangolin Anchor, then continue* is a
  superseded production instruction, not signed-off spoken body text.
- Clearing still begins with the full Anchor in the member experience, but its session
  master remains separate so the platform can assemble the two selected-voice assets.
- For the six movement-first protocols, the returning-session arrival cue comes before
  the existing *Before we start* section. Do not insert new settling language or change
  their slower pacing.
- The consolidated booth-marked source may retain the full Anchor text once as a shared
  modular asset. It must not be duplicated into each protocol script or render.

### File and asset architecture

- Store the two full Anchor masters as shared modular assets, not under any individual
  protocol's final-master directory.
- Store each protocol and Clearing master without the full Anchor baked in.
- Flag Clearing in session metadata as requiring the full Anchor on every play.
- Store a member-level `first protocol encountered` state so the platform prepends the
  selected-voice Anchor exactly once before that member's first protocol session.
- Expose the full Anchor as an optional replay asset.
- Voice selection must resolve before assembly: SR-F session uses SR-F arrival/Anchor;
  SR-M session uses SR-M arrival/Anchor.
- If the player cannot assemble modular audio/video while preserving continuous
  playback, report the implementation conflict. Do not create 31 duplicated Anchor
  renders as a workaround.

---

## 6 · Prohibited vocabulary — hard constraint

These do not appear in any member-facing output, including anything you draft:

> **practice · quantum · frequency · manifest · rewire · Joe Dispenza (by name) ·
> outcome promises · spoken durations**

**Never promise an outcome.** Not sleep, not calmer reactions, not better
relationships. The platform's claim is narrower and deliberate: a regulated state gives
you attention you can place, which lets you see what is actually there — and what you do
next is yours.

**Also prohibited structurally:** streaks, scores, badges, progress metrics, performance
targets, countdowns, scarcity, percentage-off framing. Members arrive on their worst
day; a broken streak is a punishment.

**Register test for any copy you draft:** would you say it out loud across a kitchen
table? If an abstract noun is doing the emotional work, cut it and say the thing.

---

## 7 · Framework claims — do not extend

If you write anything describing why this works, these are the only frameworks that may
be cited, and the register governs how:

- **Peer-reviewed, load-bearing:** Porges (autonomic states) · HeartMath (cardiac
  coherence) · Kross & Ayduk (distance and rehearsal)
- **Clinical practice:** Maté (compassionate inquiry)
- **Ways of thinking, named as such:** Jung (shadow) · Watts (non-resistance)

Dispenza is removed entirely and is not to be reintroduced under any phrasing.

Do not add neuroscience explanation, brainwave claims, frequency claims, or
physiological mechanisms not in the list above. If a claim feels like it would
strengthen the copy, that is the signal to leave it out.

---

## 8 · Production sequence — follow in order

1. **Confirm script cleanliness** before voicing anything. Treat instructions that say
   every protocol opens with the full Anchor as superseded production notes; do not
   rewrite signed-off protocol body text.
2. **Approve the brief SafeRise arrival cue** and notate the standalone full Anchor,
   `t0-00` and `t1-01`. Do not notate all 31 sessions up front.
3. **Generate the standalone Anchor in both voices**, plus `t0-00` and `t1-01` in both
   voices — six files. The two session masters do not contain the full Anchor.
4. **Test the platform assembly:** full matching-voice Anchor + Clearing; full
   matching-voice Anchor + first-ever `t1-01`; and brief matching-voice arrival cue +
   returning `t1-01`.
5. **Stop and listen.** This is a real checkpoint, not a formality. Voice character,
   pacing, transitions and bed interaction are all judged here.
6. **Then the remaining 29 session masters**, both voices, without a baked-in full
   Anchor.
7. **Batch loudness normalise** all session, arrival-cue and Anchor masters to the spec
   in §3.
8. **Verify** a sample against the spec in a meter, not by ear, and verify seamless
   dynamic prepending in both voices.

**Audio is the product; video is the option.** Video suspends on a locked screen and
costs roughly 20× the data. Do not let video work delay audio delivery.

---

## 9 · Toolchain

| Function | Tool |
|---|---|
| Voice generation | ElevenLabs |
| Music beds | ElevenLabs Music (Suno is ruled out — July 2026 GEMA ruling) |
| Audio cleanup | Adobe Podcast Enhance |
| Video (later) | Runway; Wistia for hosting |
| Audio hosting | Cloudflare R2 (zero egress) |

Indicative production-month budget ≈ **$314**: ElevenLabs Pro $99, Runway Max $95,
contingency $80, AI assistance $40. Audio hosting ≈ $0.

---

## 10 · Open items — report, do not decide

- **Default voice** for a member who has never chosen.
- **Loudness range cap (9 LU) and bed offset (18 dB)** — provisional, to be checked
  against the first real render.
- **Naming collision:** `Steady` is currently both a state and a door label on a Track 03
  protocol. A rename is under consideration. Do not standardise on either use.
- **`t1-05`** is a significant length outlier (~1,738 words against a track average near
  850). A trim is pending. Do not voice it until that is resolved.
- **Retired step-name forms** appear in the booth script headers. A migration may be
  pending. If you see both forms, do not normalise them yourself — report it.

---

## 11 · What to send back

For each item produced: the file, the measured integrated loudness and true peak, and —
for beds — the measured swell period and a note on the loop seam.

Flag anything in a script that reads wrong. Do not correct it.
