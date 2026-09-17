📋 GALAXY PLAYER — REFINEMENTS TO SR-401–404

Three changes to the player built in SR-401 to SR-404. Reference
build: galaxy-journey-v3.html, supplied separately.

This is a refinement pass on a system that already exists. Do not
rebuild it, do not create a parallel system, and do not change the
pipeline or the manifest.

RUN STRAIGHT THROUGH. One report at the end.

════════════════════════════════════════════
0 · THE GOVERNING RULE, AMENDED
════════════════════════════════════════════
SR-401's rule was: no layer translates or rotates, except the five
wander stars.

That rule stands for every layer EXCEPT the subject, which now
carries a small translate INSIDE its breath keyframe.

Why this is safe and the earlier build was not: the sickness came
from three layers on three different periods moving in different
directions — competing optical-flow cues. This is one element, one
period, one easing curve, travelling under 1.6% of the frame. A
single coherent rise and fall reads as a chest, not as the world
sliding.

STILL FORBIDDEN: translate or rotate on .field, .clear, .lights,
.subjwrap, .stage, or any wrapper. No parallax. No Ken Burns.

Report if anything in this brief appears to break that.

════════════════════════════════════════════
1 · THE BREATH SWELL
════════════════════════════════════════════
Replace the `breathe` keyframe with:

  @keyframes breathe{
    0%  {transform:scale(1.014) translate3d(-0.35%, 0.82%, 0)}
    22% {transform:scale(1.036) translate3d( 0.28%, 0.10%, 0)}
    40% {transform:scale(1.062) translate3d( 0.46%,-0.74%, 0)}
    68% {transform:scale(1.038) translate3d(-0.22%,-0.18%, 0)}
    100%{transform:scale(1.014) translate3d(-0.35%, 0.82%, 0)}}

Five keyframes, so the subject traces a path rather than rising in a
straight line. Peak expansion stays at 40%, which is what keeps the
4-out 6-back ratio.

The entrainment mechanism does not change — this must still run via
Animation.playbackRate, not a duration rewrite.

════════════════════════════════════════════
2 · THE AURA SWELLS WITH IT
════════════════════════════════════════════
The aura currently sits fixed while the subject moves beneath it.
Give it the same period and curve:

  animation: auraSwell var(--breath,10s) cubic-bezier(.37,0,.63,1) infinite;

  @keyframes auraSwell{
    0%  {transform:scale(1)     translate3d(-0.2%, 0.5%, 0)}
    40% {transform:scale(1.034) translate3d( 0.3%,-0.45%,0)}
    100%{transform:scale(1)     translate3d(-0.2%, 0.5%, 0)}}

CAREFUL — the aura's transform is already used for the audio
response and for --release. Those are set inline as
scale(1 + amp*.03 + release*.04).

You cannot have a keyframe animation and an inline transform on the
same element; one will win and the other will be silently lost.

Report how you resolve this before implementing. The likely answer
is a wrapper element carrying the swell with the responsive
transform on the inner — but check what the existing code does
rather than assuming.

════════════════════════════════════════════
3 · THE LOCKUP
════════════════════════════════════════════
Confirm the SafeRise lockup renders inside the stage on every
player. In the supplied mockup its CSS had been lost, so it rendered
as unstyled text with no rule — verify the repo version is correct.

Geometry, from the cover lockup scaled by width share:

  .lock{position:absolute;right:6.63%;bottom:5.39%;z-index:6;
    display:flex;align-items:center;gap:2.03cqw;opacity:.92;
    pointer-events:none}
  .lock .rule{display:block;width:11.79cqw;height:1px;
    background:var(--text);opacity:.75}
  .lock .mark{font-family:'Cinzel',serif;font-weight:400;
    font-size:1.00cqw;letter-spacing:.34em;color:var(--text);
    white-space:nowrap;text-shadow:0 1px 12px rgba(0,0,0,.85)}

The lockup NEVER animates. It is the one fixed element in the frame.

Report whether sr-medplayer.js already renders a lockup outside the
stage — if so, this would be the second one, and that is a decision,
not a fix. Do not add a duplicate; report it.

════════════════════════════════════════════
4 · APPLIES TO ALL 31
════════════════════════════════════════════
These changes are to the shared component, so they apply to every
protocol — including the 21 on the plain-poster fallback, which
still carry the breath.

Confirm the fallback path picks up the new swell. If it does not,
report why.

════════════════════════════════════════════
5 · VERIFY
════════════════════════════════════════════
For one protocol per state:
  - the subject's computed transform at 0%, 40% and 100% of its
    cycle, showing all three differ in BOTH scale and translate
  - the aura's computed transform at the same three points
  - --amp still changing the aura while audio plays, WITH the swell
    running — confirm neither cancels the other
  - --release still non-zero only in the third quarter
  - the lockup's computed position and font-size at 1440px and 390px
  - prefers-reduced-motion: subject and aura both static

CONFIRM EXPLICITLY: grep the emitted CSS and report every rule with
a non-zero translate or rotate. The only permitted results are the
five wander stars, the subject's breathe keyframe, and the aura's
auraSwell keyframe. Anything else is a regression.

════════════════════════════════════════════
6 · COMMIT
════════════════════════════════════════════
One commit. Next free SR ID from git log --grep. Do not push.
