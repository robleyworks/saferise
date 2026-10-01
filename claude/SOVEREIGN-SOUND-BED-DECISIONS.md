# Sovereign sound beds — verification and decisions

1 October 2026. Written against the `HANDOVER-SOUND-BEDS.md` supplied in
`Desktop/SafeRise Guided Meditation Production/Sound Beds/`. Closes **S1** in
`SOVEREIGN-SESSION-SCREEN-SPEC.md` — the audio handover that blocked the bed.

All 31 files are present and the handover's content table matches what is on
disk. Durations verified against the table: t1-03f/m 300.0 s, t1-07 600.0 s,
t1-06 1057.5 s (17:37), t3-01 550.9 s. No discrepancies.

---

## 1 · The dedupe claim is right, its method statement is wrong

The handover says the 13 shared sessions were *"verified by checksum."* They were
not, and anyone re-running a checksum dedupe will get the opposite answer and
ship 434 MB.

**All 31 files have distinct MD5s.** What is actually true is that the audio is
identical and only the ID3 tag differs — `cmp` puts the first difference at byte
169 and finds 354–356 differing bytes in a 14.4 MB file, which is the embedded
filename, nothing more.

Verified properly by comparing decoded PCM (`ffmpeg -f s16le` → hash), which is
the test that should have been run:

| Decoded-audio hash | Sessions | Bed |
|---|---|---|
| `9ede9fe47b` | t1-07, t1-10, t2-08, t2-10, t3-08, t3-09 | song 7, 10:00 |
| `f07de728de` | t1-09, t2-02, t2-05, t2-06, t2-09 | song 1, 10:00 |
| `33275b27db` | t3-07, t3-10 | song 10 + 11, 8:50 |

A further trap in the same area: the eleven ten-minute files all have **byte size
14407256**, because 10:00 at 192 kbps CBR is the same size whatever the music is.
Size is not evidence of sameness here, and two different songs sit inside that
group.

**One correction to the handover's own table.** It lists t1-03f and t1-03m as the
same bed (*"song 8"* twice). They are **not identical** — different decoded
audio, same 5:00 length. Whatever the intent, these are two distinct renders and
only one ships.

**Decision D1 · Dedupe to decoded audio, never to file hash.** Twenty unique
assets cover all thirty protocols. Roughly 285 MB rather than 434 MB.

**Decision D2 · t1-03 ships the female bed**, matching the meditation ruling in
the install handover — one voice across the library, male take stays on the
Desktop until the member-toggled voice architecture exists.

## 2 · The fade-out is a pacing cue, and a Sovereign session has no clock

This is the finding that changes the build.

Measured on t1-07: RMS −21.7 dB over the first 3 s against −17.0 dB steady, and
the last 6 s fall to **−36.0 dB**. The 3 s fade in and 8 s fade out are real.

For a guided meditation that is correct — the bed is cut to the voice and ends
when she stops. **A Sovereign session has no length.** M1 and M2 rule that the
member advances, with no timer and no progress indicator of any kind. So a bed
that fades to silence at a fixed point tells a member still in Release that their
time is up. **That is a timer, delivered through the speakers**, and it lands at
the worst available moment — while someone is activated and mid-sentence.

The standing rule is no durations, timers or progress bars on any practice
surface. A fade-out at 9:52 is all three at once.

**Decision D3 · The beds ship as supplied. No loop, no re-export, fades intact.**
Founder-ruled 1 October, against the recommendation above. My objection is on the
record in S4 of the screen spec and is not re-argued here: the ruling stands and
the build follows it.

What the ruling settles, and it settles a good deal — no export pass, no new
musical decisions, no second version of thirty-one files in git history, and the
twenty verified assets go in as they are. Against the standing no-pacing rule it
accepts that a bed shorter than the session ends audibly.

**The one constraint that comes with it.** The end of the bed must not become an
event anywhere in the build: no auto-advance, no phase change, no state change,
no element appearing or disappearing, no unprompted offer to restart. The audio
element's `ended` event is wired to nothing. Music stops; the session carries on
exactly as it was. The fade is already a signal — the screen must not confirm it.

## 3 · The composites are cut to a voice that isn't playing

Which raises the question of whether these are the right asset at all.

Read the handover's content column: *song 18 to 7:20, 18.1 + 4 drum in at 7:15*
· *song 3.2, song 4 in at 5:40, song 3.4 closing* · *song 23, spliced at 8:29
back to 6:27*. Every one of those timings exists to land a musical movement under
a specific moment in the recorded voice — the handover's own phrase is *"same
movements, same handover points."*

In a Sovereign session nothing is on that timeline. The member sets the pace, and
the four phases take as long as they take. A seam engineered for 7:20 arrives
during whatever the member happens to be doing at 7:20, which is a different
phase for every person and every session. **The structure that makes these beds
good under the guided voice does nothing here, and the fades actively work
against the ruling set.**

What S1 ruled is sound — *the bed is the one from that protocol's own guided
meditation* — and it can be honoured more cheaply and more correctly by the
**underlying song rather than the composite**: loop-safe, no fades, and for the
two-song composites, the song carrying the body of the session. That is roughly
fourteen song families across all thirty protocols instead of twenty composites,
each one shorter because a loop does not need to run to length.

**Ruled 1 October: the twenty composites, as supplied.** The seams stay where they
are and land wherever the member happens to be. Accepted cost, recorded here so
nobody later reads the content table as intentional for this surface — *song 18 to
7:20* means something in the guided session and nothing in a Sovereign one.

The repo cost in §4 therefore lands in full: about 285 MB on top of 450 MB of
`.git` and 409 MB of working-tree audio. §5 keeps bitrate open, which is now the
only lever left on that number.

## 4 · Where the beds are served from, and why it is not Supabase Storage

The repo is at **450 MB of `.git` and 409 MB of working-tree audio**, with three
more meditations still to register (about 45 MB) and four masters expected to be
replaced. Git keeps every version permanently. Netlify's publish directory is the
repo root, so everything in it is uploaded on every deploy.

Twenty composites would add about 285 MB to both numbers. The looped-song set
would add a fraction of that.

Object storage is the obvious escape, and **Supabase Storage is the wrong escape
here.** `privacy.html` §4 says which protocol a member opened is *"suggestive,"*
that it is treated as sensitive for that reason, kept aggregated, and *"never
looked at person by person."* The subprocessor table gives Supabase accounts,
subscription status and usage events; it gives Netlify server logs only.

A bed fetched from Supabase Storage is a per-member, per-protocol, timestamped
request with an IP attached, sitting in the same account as the member's
identity — an unaggregated per-person record of which protocol was opened and
when, in the one place it is most linkable. Serving the bed from the same origin
as the page puts it in the Netlify server logs that privacy.html already
discloses, at 30-day retention, under legitimate interests, with no new claim to
make and no new subprocessor.

**Decision D4 · Beds are served same-origin, from the repo, like the
meditations.** The repo-size problem gets solved by reducing bytes, not by moving
them somewhere that costs a privacy claim. The standing rule applies: always
update the privacy copy to reflect the truth — and the cheapest way to keep that
true is not to change the truth.

## 5 · Open

- **Bitrate.** The only lever left on the 285 MB. 192 kbps is right for a solo
  listening asset and more than a bed under a member's own speech needs. Worth
  settling before the files go in, because re-encoding later leaves another
  permanent copy in git history — and a re-encode is not a re-export, so it costs
  no studio time.
- **T0-00 has no bed and needs none.** The Clearing remains guided
  (founder-ruled 1 October), so it has no Sovereign session. The handover offers
  to produce it; decline.
- **Whether the bed-off preference persists** across sessions — carried over
  from the screen spec, still open.

## 6 · The bed-only listening asset

The handover asks whether these ship as a second asset alongside each guided
session, and flags that a bare bed carries no instruction.

The Sovereign session answers that: the member's own prompts are on screen for
the whole phase (P2), so the bed is never playing without instruction. **A
bed-only track with nothing attached is a different product and is not needed for
this.** The handover's other caution stands on its own merits — four beds hold
one emotional level for their full length because flattening removed the arcs,
and seventeen minutes of Grief at one altitude is a long time.

## 7 · The mapping

Thirty protocols, twenty assets. Path in the data module, never in markup,
following `content/meditation.js`:

```
assets/audio/beds/bed-<code>-<slug>.mp3
```

| Protocol | Bed asset |
|---|---|
| t1-01 Anxiety Reset | `bed-t1-01-anxiety-reset` |
| t1-02 Anger Alchemy | `bed-t1-02-anger-alchemy` |
| t1-03 Overwhelm Threshold | `bed-t1-03-overwhelm-threshold` (female take, D2) |
| t1-04 Abandonment Wound | `bed-t1-04-abandonment-wound` |
| t1-05 Shame Dissolution | `bed-t1-05-shame-dissolution` |
| t1-06 Grief Integration | `bed-t1-06-grief-integration` |
| t1-07 Shutdown Recovery | `bed-song-07` **(shared)** |
| t1-08 Jealousy Release | `bed-t1-08-jealousy-release` |
| t1-09 Insecurity Anchor | `bed-song-01` **(shared)** |
| t1-10 Powerlessness & Despair | `bed-song-07` **(shared)** |
| t2-01 Safe Conversation | `bed-t2-01-safe-conversation` |
| t2-02 Rupture & Repair | `bed-song-01` **(shared)** |
| t2-03 Trust & Betrayal | `bed-t2-03-trust-betrayal` |
| t2-04 Resentment Release | `bed-t2-04-resentment-release` |
| t2-05 Intimacy Barrier | `bed-song-01` **(shared)** |
| t2-06 Double Standard | `bed-song-01` **(shared)** |
| t2-07 Projection Clarity | `bed-t2-07-projection-clarity` |
| t2-08 Appreciation & Support | `bed-song-07` **(shared)** |
| t2-09 Pursue & Withdraw | `bed-song-01` **(shared)** |
| t2-10 Conscious Separation | `bed-song-07` **(shared)** |
| t3-01 High-Stakes Presence | `bed-t3-01-high-stakes-presence` |
| t3-02 Conflict Navigation | `bed-t3-02-conflict-navigation` |
| t3-03 Imposter Dissolution | `bed-t3-03-imposter-dissolution` |
| t3-04 Perfectionism Release | `bed-t3-04-perfectionism-release` |
| t3-05 Performance Anxiety | `bed-t3-05-performance-anxiety` |
| t3-06 Belonging Gap | `bed-t3-06-belonging-gap` |
| t3-07 Career Transition | `bed-song-10-11` **(shared)** |
| t3-08 Decision Fatigue | `bed-song-07` **(shared)** |
| t3-09 Burnout & Overload | `bed-song-07` **(shared)** |
| t3-10 Creative Flow | `bed-song-10-11` **(shared)** |

The three shared assets are renamed to what they are rather than to the first
session that happened to use them, so nothing implies t1-07 owns a bed that five
other protocols also play. The handover's own filenames carry that implication
and it will cause a wrong deletion eventually.

Two beds that differ from what is live, carried over from the handover and
unresolved: **t3-07 and t3-10** are rebuilt with the song 10 → 11 handover at
3:50 rather than the masters' 4:25, so the bed and its meditation do not match.
Both masters are already queued for rebuild. And **t1-03 has no bed for its first
eight minutes** as a guided session — which does not apply to a looped Sovereign
bed, so under the §3 ruling this stops being a defect.
