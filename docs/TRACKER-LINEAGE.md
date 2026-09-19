# Tracker lineage

Short note so the v31/v32 mix-up of 18 September is not repeated.

## Current

**`docs/tracker-v34.html`** — 18 Sep 2026, 273 rows, 66 open gates.
Built on v32. Nothing from v32 was dropped and no status went backwards; verified
mechanically before it shipped.

## The chain

| Version | Date | Rows | File default | Note |
|---|---|---|---|---|
| v23 | 10 Sep | — | — | in repo |
| v31 | 14 Sep | 247 | 43% | in repo |
| **v32** | 14 Sep | 253 | 51% | **was NOT in the repo** — added LG-273 to LG-278 and marked 22 items complete |
| v33 | — | — | — | **does not exist.** Built from v31 by mistake and deleted |
| **v34** | 18 Sep | 273 | 50% | current. New rows start at LG-279 |

## What went wrong, and the three rules that come out of it

**v32 lived outside the repo.** The repo held only v23 and v31, so v31 looked current.
A tracker was rebuilt from it, silently discarding v32's six new rows and 22 completions.
That, and not dilution, is why the figure appeared to fall from 51% to 43%.

1. **Check for a newer version outside the repo before rebuilding a tracker.** Ask, or
   search the machine. The repo is not authoritative for this file.
2. **Check the ID ceiling before assigning new rows.** v32's highest id is LG-278.
   An earlier build reused LG-245 to LG-264, which were already taken. Because the tracker
   keys saved state by id in `localStorage`, each duplicate silently shared one state with a
   real item — several of them gated or complete. New rows always go above the current maximum.
3. **The header percentage and the dial are different measurements.** The header is computed
   from the file's own defaults. The dial is computed live and merges whatever the reader has
   set in this browser. Never overwrite the header with a file-derived number without saying so;
   v34's header reads "weighted from the file defaults" for exactly this reason.

## Also worth knowing

- State persists in `localStorage` under the **unversioned** key `saferise-launch-tracker`,
  so a new file inherits whatever the previous one set. Use **Export state** before replacing
  a tracker file.
- v7–v31 were rebuilt from the v4-era 90-row base plus `TRACKER-DELTA-v7`, so any status change
  made in v5 or v6 that the delta did not name is still missing. Rows are more trustworthy than
  the percentage.
- The tracker is an HTML **fragment** — no doctype, no `<head>`. It had no charset declaration
  until v34, so em dashes mojibaked when opened straight from disk. v34 carries
  `<meta charset="utf-8">` as its first line.
- `git status` run through the desktop bridge against this repo returns empty even for files
  that are demonstrably on disk — the mount cannot reliably read working-tree contents. Verify
  staging in a local terminal, not through the bridge.
