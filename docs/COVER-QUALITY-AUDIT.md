# COVER QUALITY AUDIT — measurement pass

**No repo writes. No commits. No SR ID.** This pass answers two open questions with
numbers so they can be decided. Any files you generate go to `/tmp/sr-probe/` and
nowhere else. `git status` must be clean when you finish.

## How to read this brief

Every state claim below is **reported**, not established. Four errors in this repo
survived multiple passes because each brief inherited the previous brief's assertion
instead of re-checking it. Verify each claim yourself before you rely on it, and say
so in your report when a claim turns out to be wrong. A contradicted claim is the most
useful thing this pass can produce.

---

## Task 1 — SSIM broken out by size band

Reported: 35 of 60 new cover WebPs score below 0.95 SSIM, lowest 0.928 at
`t2-07-320w`. Track 1's own covers reportedly range 0.945–0.975 on the same encoder
profile. Verify by recomputing; do not reuse figures from any earlier report.

Produce a table of every cover WebP in `assets/covers/` — Tracks 1, 2 and 3, all
three widths — grouped by size band:

| band | count | min SSIM | median | max | count < 0.95 |
|---|---|---|---|---|---|
| `-320w` | | | | | |
| `-640w` | | | | | |
| full | | | | | |

Then the same table split by track, so a Track 1 / Track 2–3 difference shows up if
one exists.

**The question this decides:** if the sub-0.95 scores cluster in the 320w
derivatives, they render at 320 CSS px and the loss is not visible. If full-size
covers are scoring 0.93, it is. Report which.

Also report, per band, the actual byte sizes — WebP vs its JPEG source — so the
quality question can be weighed against what the WebP is saving.

## Task 2 — probe re-encode, sample only

Pick three covers spanning the observed range: the worst scorer, a median one, and
one that already clears 0.95. Re-encode each at two higher WebP quality bands above
whatever the current profile uses (determine the current setting from the existing
files rather than assuming a value).

For each: SSIM and byte size at the current setting and at both higher bands, all
three widths. Write everything to `/tmp/sr-probe/`. Nothing enters `assets/`.

**The question this decides:** what a higher band actually buys, in SSIM points and
in bytes, before committing to re-encoding 60 files.

## Task 3 — the 11 PNGs

Reported: `assets/covers/` holds 11 unreferenced PNGs at 1086×1448, described as
pre-crop originals. Track 1 is ten covers plus one banner — also eleven assets.

Establish:

1. The 11 PNG filenames and their exact dimensions.
2. Whether they correspond to Track 1's ten covers plus banner, or to something else.
3. Whether each PNG is the same image content as the Track 1 JPEG it would pair with
   — compare downscaled, since the JPEG is reportedly 900×1200 and the PNG 1086×1448.
   A high SSIM after matching scale means the JPEG is a downscale of the PNG.
4. Whether any Track 2 or Track 3 cover has a PNG counterpart.

**The question this decides:** whether bringing Track 1 to the 1086×1448 spec is a
re-export from masters already in the repo, or requires re-sourcing. Do not
re-export anything in this pass — just establish which it is.

Note also: if Tracks 2 and 3 ship at 1086×1448, then 1086×1448 is a shipping
dimension, not a "pre-crop" one. Say whether the pre-crop framing holds.

## Task 4 — poster crop dependency

`mk_posters.py` reportedly crops at `(0, 300, 900, 806)`, calibrated against Track 1
at 900×1200. Confirm the actual crop parameters in the script.

Then state plainly, without changing anything:

- What that box does when applied to a 1086×1448 cover.
- Whether the script derives the box from image dimensions or hard-codes it.
- Whether any produced poster other than `t1-01` exists.

## Task 5 — the contradicting sentence

`SAFERISE-HANDOVER-2026-09-07.md` §6 contains, in the covers paragraph, the sentence
*"Tracks 2 and 3 are JPEG-only — no derivatives, no `<picture>`."* Confirm against
the repo that this is now false. Report it; do not edit the file.

---

## Report format

Findings only. For each task: what you measured, how, the numbers, and any point
where the brief above turned out to be wrong. No fixes, no commits, no files in the
repo. End with `git status` output.
