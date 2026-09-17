📋 PLACEHOLDER AUDIO ON ALL 31 PLAYERS

Wire The Clearing's audio file to every protocol's player so the
component can be seen running live on all of them.

This is temporary. The founder knows. Do not add warning labels or
disclaimers to the UI.

RUN STRAIGHT THROUGH. One report at the end.

════════════════════════════════════════════
1 · FIND THE SOURCE RESOLUTION
════════════════════════════════════════════
Find where a protocol's audio source is resolved — sr-medplayer.js,
a data file, or per-page markup.

Report what it looks up today and why 30 protocols resolve to
nothing.

════════════════════════════════════════════
2 · ADD A FALLBACK
════════════════════════════════════════════
Where a protocol has no audio of its own, fall back to t0-00's file.

ONE change at the resolution point. Do not edit 30 pages, do not
duplicate the file, do not add 30 config entries.

Behind a single constant:

  const PLACEHOLDER_AUDIO = true;

Setting it false must restore the real behaviour everywhere in one
edit. Report where you put it.

════════════════════════════════════════════
3 · MAKE SURE EVERY PLAYER ACTUALLY RENDERS
════════════════════════════════════════════
Audio alone is not enough — SR-404 reported that 30 protocols have
neither a button nor a mount call.

For each of the 31:
  - if the page renders a player but SRClearing.mount() is not
    called, wire it
  - if no player renders at all, report what the page carries
    instead and what it would take to add one

The goal is 31 working players. Report how many you reach and what
blocks the rest.

════════════════════════════════════════════
4 · VERIFY EVERY ONE
════════════════════════════════════════════
Load all 31 protocol pages. For each report:
  - player renders · yes / no
  - poster · galaxy or fallback
  - audio plays · yes / no
  - breath period matches its state
  - lockup renders inside the stage
  - console errors

A table, 31 rows. Not a summary.

Then take one screenshot per track — t1, t2, t3 — of a player
mid-playback, and include them.

════════════════════════════════════════════
5 · RECORD IT
════════════════════════════════════════════
Add to docs/page-invariants.md: PLACEHOLDER_AUDIO must be false
before public launch, and where the constant lives.

════════════════════════════════════════════
6 · COMMIT
════════════════════════════════════════════
Next free SR ID from git log --grep. Do not push. Report first.
