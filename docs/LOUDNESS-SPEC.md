# SafeRise — Loudness Specification

Status: **rule**, adopted 12 September 2026. Supersedes any other loudness figure
found in project records.

---

## The target

```
Channels:       stereo
Integrated:     −16.0 LUFS ±0.5, gated per ITU-R BS.1770-4
True peak:      −1.0 dBTP maximum
Loudness range: ≤ 9 LU
Bed:            −28 to −30 LUFS short-term beneath voice
                (roughly 18 dB below the spoken passages)
Measurement:    ffmpeg loudnorm, two-pass. Single-pass loudnorm is not
                acceptable — it estimates rather than measures.
Tail:           no fade below −45 dBFS in the final 10 s. A track ending
                in true silence reads as a dropped connection.
No autoplay anywhere.
```

**The loudness range cap (9 LU) and the bed offset (18 dB) are provisional** — they
are judgement calls, not standards, and are to be checked against the first real
render.

**Loudness is a post-process**, applied in batch to finished files. A wrong target
costs compute, not regeneration. It is not a gate on starting production.

---

## Why −19 is not a competing figure

A figure of **−19 LUFS** appears in existing project records. It is not a
competing target and was never in conflict with −16. It is the *mono* expression
of the same perceived level: a mono file measures roughly 3 LU lower than the
same signal played back across two channels, so −19 mono and −16 stereo arrive
at the listener identically.

Delivery is stereo, so the figure that governs is −16.

Stereo was chosen because the bed's whole job is to be present without crowding
the voice. The mix constraints exist to keep the bed out of the voice's
frequency bands; stereo adds a spatial axis to that, letting the voice stay
centred while the bed opens around it. In mono every separation must be won with
EQ alone.

This paragraph exists specifically so the −19 figure is not re-litigated the
next time someone finds it.

See also `pass/BED-RHYTHM-SPEC.md` for the bed architecture and rhythm
specification that this loudness target applies under.
