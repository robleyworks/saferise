📋 GALAXY PLAYER — ALL 31 PROTOCOLS

The guided-session player becomes a two-layer galaxy derived from
each protocol's own cover. The ground never travels. The subject
breathes. The frame resolves across the session.

Reference build: galaxy-journey.html, supplied separately. Read it
for values and structure. It is a mockup — do not lift it wholesale.

RUN STRAIGHT THROUGH. One report at the end.

════════════════════════════════════════════
0 · THE RULE THAT GOVERNS EVERYTHING
════════════════════════════════════════════
**NO LAYER TRANSLATES OR ROTATES.**

An earlier build drifted the field, counter-drifted a star layer and
added rotation. It caused motion sickness — competing optical-flow
cues, the same mechanism as VR nausea. Members arrive here
dysregulated; this is a harm, not a polish issue.

Permitted motion:
  - opacity and brightness on any layer
  - scale from a fixed centre on the SUBJECT only
  - translate on the five individual wander stars only, under 2%
    of the frame each, on independent periods

Forbidden: translate or rotate on the field, on the star layer, on
the subject, or on the stage. No parallax. No Ken Burns.

If any section below appears to ask for movement that breaks this,
this section wins. Report the conflict.

════════════════════════════════════════════
1 · THE PIPELINE — extend mk_posters.py
════════════════════════════════════════════
For each of the 31 covers, produce alongside the existing plain crop:

  <id>-field.jpg    1920×1080  background, subject suppressed,
                               stars weighted to the original's brights
  <id>-clear.jpg    1920×1080  the plain toned crop, sharp — this is
                               what the frame resolves TO
  <id>-subject.png  1920×1080  RGBA, subject only, alpha from the mask
  two tones                    warm and cool, written to CSS

METHOD — as proven:
  detail mask = |grey − gaussian(grey,σ3)| ×4, gaussian σ18,
                normalised, clipped (d−0.12)/0.62
  galaxy      = downsample ÷6 → upsample → gaussian σ26 →
                saturation ×1.9 → contrast ×1.35 →
                blue +34×(1−lum), red +22×lum → ×0.62
  field       = galaxy × (1 − mask×0.72) + stars
  subject     = galaxy(σ14) ×1.18, alpha = clip(mask×1.15)
  stars       = density 0.0010, weighted orig_lum × (1−mask)
  tones       = warmest and coolest 4000 px of the toned crop

Crop anchor 0.30 from top unless an ANCHOR override exists.
Tone to mean luminance 39 ±4.

════════════════════════════════════════════
2 · REPORT WHICH COVERS FAIL — before wiring
════════════════════════════════════════════
The treatment needs tonal separation between subject and background.
Tested: strong on a silhouette against a sunset, workable on a dark
subject against a bright sky, FAILED on a dark subject in a dark
room — the frame became mud.

For all 31 report:
  - mean absolute luminance difference, masked subject vs field
  - proportion of frame the mask selects

Flag separation under 18 points, or a mask selecting over 70% or
under 8%.

A flagged cover does NOT get the galaxy. It falls back to the plain
poster with the breath only. Report the list.

════════════════════════════════════════════
3 · LAYERS
════════════════════════════════════════════
Extend js/saferise-poster.js and css/saferise-poster.css. Do not
create a parallel system.

Back to front:
  .field      galaxy, blur lifts as the session runs
  .clear      the sharp photograph, fades up as the session runs
  .lights     two fixed point sets, brightening in place
  .wander     five individual stars, drift + glow
  .subjwrap > .subject   the breath
  .aura       screen-blended, responds to voice and to Release
  .scrim      existing bottom gradient
  .overlay    control, theme, protocol title — recedes on play
  .stepnow    the current step, named in the frame
  .lock       wordmark, static
  .edge       state hairline

Per-protocol custom properties from the pipeline: --warm --cool

════════════════════════════════════════════
4 · THE SESSION PROGRESS VARIABLE
════════════════════════════════════════════
One variable drives the arc. On each animation frame while playing:

  --p = currentTime / duration   (0 to 1)

Everything reads from it:
  .field  filter: blur(calc((1 - var(--p)) * 1.2px))
  .clear  opacity: calc(var(--p) * var(--p) * .72)
          saturate(calc(.55 + var(--p) * .45))
          brightness(calc(.86 + var(--p) * .2))
  .lights opacity: calc(1 - var(--p) * .45)
  .wander opacity: calc(1 - var(--p) * .55)

Set --p on the stage element. Use requestAnimationFrame throttled to
about 4Hz — this does not need 60.

On pause, --p HOLDS. On reset it returns to 0.

════════════════════════════════════════════
5 · THE BREATH ENTRAINS
════════════════════════════════════════════
The subject's breath period starts at the state's own rhythm and
slows toward 10s (4 out, 6 back) across the session.

  start: Agitated 7s · Unsteady 12s · Numb 20s · Steady 10s
  live:  period = start + (10 − start) × pow(--p, 0.7)

Written as --breath on the stage; the keyframe is a single shared
`breathe` animation, scale 1.014 → 1.058 at 40% → 1.014.

Steady begins and ends at 10s — it is already there, which is the
point.

Report how you set --breath without restarting the animation on
every update. A naive rewrite will cause a visible stutter.

════════════════════════════════════════════
6 · THE FOUR STEPS
════════════════════════════════════════════
Segment the transport into Recognise · Regulate · Release · Rise,
each filling as its quarter runs.

Name the current step in the frame, italic, top centre, fading in on
play.

During Release only, the aura opens:
  --release = sin(within × π)   where `within` is progress through
  that quarter
  .aura opacity gains var(--release) × .3, scale gains × .04

**If the real audio carries step markers or chapter cues, use those
instead of quarters.** Report whether it does. Even quarters are a
stand-in.

════════════════════════════════════════════
7 · AUDIO-REACTIVE AURA
════════════════════════════════════════════
A Web Audio AnalyserNode on the playing audio writes --amp (0–1) to
the stage on each frame.

  .aura opacity gains var(--amp) × .46
  .aura scale gains var(--amp) × .03

Smoothed RMS or time-domain envelope, not a raw FFT bin. It should
read as breath, not a level meter.

One AnalyserNode per player, created once, disconnected on pause.
Report where you put it.

════════════════════════════════════════════
8 · TIME OF DAY
════════════════════════════════════════════
  shift = clamp((localHour − 8) / 14, 0, 1)
  --warmshift on the stage; the bloom gradient's alpha becomes
  calc(.26 + var(--warmshift) * .16)

No storage, no tracking, no request. Read the clock once on load.

════════════════════════════════════════════
9 · WHAT PAUSES
════════════════════════════════════════════
ON PLAY: the overlay recedes to 18% opacity over 1.6s. Lights,
wander stars, breath and aura all continue.

OFF-SCREEN: every animation pauses via IntersectionObserver toggling
animation-play-state — the SR-343 pattern, not a scroll listener.

prefers-reduced-motion: every layer static in its resting state.
--p still advances, so the frame still resolves — that is a state
change, not motion. The breath, lights, wander and aura response all
stop. Report your reading of this before implementing.

════════════════════════════════════════════
10 · WEIGHT
════════════════════════════════════════════
Three images per protocol instead of one. Report total added weight
and the per-protocol figure.

Over roughly 600KB per protocol, reduce the field JPEG quality first
— it is heavily blurred and will not show the loss. Do not reduce
dimensions.

Lazy-load all three. None should block first paint.

════════════════════════════════════════════
11 · VERIFY — measurements, not assertions
════════════════════════════════════════════
For one protocol per state, report:
  - computed animation-name and duration on subject, lights, wander
  - the subject's transform at two points in its breath cycle
  - --breath at --p = 0.1 and at --p = 0.9, showing entrainment
  - .clear opacity and .field blur at three values of --p
  - --amp changing while audio plays
  - --release non-zero only during the third quarter
  - animation-play-state for every layer when scrolled off-screen
  - computed state under prefers-reduced-motion

CONFIRM, EXPLICITLY: no element has a non-zero translate or rotate
at any point in any animation, except the five wander stars. Grep
the emitted CSS and report the result.

Then load four protocols side by side, one per state, no audio. If
you cannot tell the states apart, say so.

════════════════════════════════════════════
12 · COMMIT
════════════════════════════════════════════
Pipeline · layers and motion · session arc · audio aura.
Four commits. Next free SR IDs from git log --grep.
Do not push.
