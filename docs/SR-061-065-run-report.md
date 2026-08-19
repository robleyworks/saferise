# SR-061 – SR-065 · run report (`feat/modal-shell`)

**Outcome: HARD STOP before the first edit. Nothing in the product was changed.**
This file is the only thing this run wrote.

Run mode: unattended, no approval gate.
Date: 19 Aug 2026.

---

## 1 · Hard-stop gate

| Gate | Result |
|---|---|
| Current branch is `feat/modal-shell` | **PASS** — on `feat/modal-shell` |
| Working tree clean at start | **PASS** — clean |
| Dashboard has an existing `openModal` controller | **PASS** — `dashboard.html:1249` `function openModal(key)`, with `MODALS` at `dashboard.html:1248` holding exactly the six keys the handoff names (`workshop, oneone, calendar, route, media, crisis`) |
| `content/tracks.js` is where the handoff expects it | **FAIL — this is the stop** |

`content/tracks.js` does not exist on this branch. There is no `content/`
directory at all:

```
$ ls content/
(no content/ directory on feat/modal-shell)
$ rg -n 'LIFE_LAB' --type html --type js
(no matches)
```

SR-062 is specified entirely against that file — "In `content/tracks.js`, **do
not delete `LIFE_LAB`.** Comment the whole object out as a single block…",
"Remove `LIFE_LAB` from the `module.exports` object", and the acceptance test
`node -e "require('./content/tracks.js')"`. None of that can run here.

Per the run rules — *"`content/tracks.js` is not where the handoff expects it …
write the reason, change nothing, and end the run"* — the run ends here rather
than completing the four items that do not touch that file.

### Where the file actually is

`content/tracks.js` exists only on **`feat/track-pages-from-data`**, which is
unmerged. That branch introduces it, and also introduces the only `LIFE_LAB`
consumer in the repo. Nothing was switched, created or merged to confirm this —
it is read from the branch listing and that branch's own commits.

---

## 2 · Blocker: the approved mockup is not present

SR-063 says "Take the shell from the mockup" and names
`saferise-modal-shell-v1.html`, to be placed on the Desktop before starting.

```
$ ls ~/Desktop/saferise-modal-shell-v1.html
  NOT PRESENT on Desktop
```

Even with `content/tracks.js` in place, SR-063 could not have been built as
specified. The handoff lists fifteen new selectors (`.sr-view`, `.sr-empty`,
`.sr-statgrid`, …), a `Store` adapter to port "as-is" including its write-probe
and in-memory fallback, and a device-only footer line to ship "verbatim". None
of those have a source in this repo. Inventing them would be substituting a
different approach, which the run rules forbid.

---

## 3 · SR ID collision — needs resolving before this branch is renumbered

This is the second handoff in a row whose ID block is already spent.

`docs/fix-register.md` on `main` states **"Highest ID currently issued:
SR-060"** and **"no ID is ever reused"**, and carries headings for SR-044
through SR-060 inclusive.

- **SR-061 … SR-065**, which this handoff claims, are already used by six
  commits on `feat/track-pages-from-data` for unrelated work (the content
  source, the three track routes, the dashboard repoint, stale strings and the
  derived framework counts). That branch also issues SR-066 and SR-067 and
  raises the register's high-water mark to SR-067.
- The handoff also refers to "a separate branch (SR-058 to SR-060)" for resource
  counts. On `main` those three IDs are the Porges scientific dispute, the
  framework-page art slots, and the duration-free copy rule. The reference does
  not point at what the handoff thinks it does.

**First genuinely free ID, counting the unmerged branch: SR-068.**
No renumbering was performed — that is Andre's call, not this run's.

---

## 4 · Direct conflict between this branch and `feat/track-pages-from-data`

These two cannot both merge as written:

- `feat/track-pages-from-data` commit `32238c1` makes the dashboard's Life
  Laboratory route copy **read from `LIFE_LAB`** — the stage count and both
  endpoint names are derived, replacing a hardcoded "seven stages".
- This handoff's SR-062 requires `LIFE_LAB` to be **commented out** and removed
  from `module.exports`.

Merging both leaves `dashboard.html` referencing a commented-out identifier,
which throws at evaluation. Whichever lands second has to reconcile this.

Related: SR-062 requires editing `content/tracks.js`, while "Out of scope" says
"Do not touch … any `tracks.js` content record." Those instructions point in
opposite directions on the same file. `LIFE_LAB` is arguably not a *resource*
record, but the tension is worth naming rather than resolving unilaterally.

---

## 5 · Toolchain divergence

**`node` is not installed on this machine** (nor `deno`, `bun` or `npx`). Both
acceptance commands in this handoff — `node --check <file>` and
`node -e "require('./content/tracks.js')"` — cannot run as written.

A working substitute is JavaScriptCore, which ships with macOS:

```
/System/Library/Frameworks/JavaScriptCore.framework/Versions/A/Helpers/jsc
```

It parses and evaluates the files fine and was used for equivalent checks on the
other branch. `rg` **is** present, so the map commands ran as given.

One correction to the handoff text: it says removing `LIFE_LAB` from
`module.exports` is needed "or the export throws under Node". Referencing a
commented-out identifier throws in any JS engine, not only Node, and only when
the file is evaluated — the fix is right, the reason is narrower than stated.

---

## 6 · Map built before stopping (read-only, no edits)

Recorded so the next run does not have to re-derive it.

### Modal system — one controller, already shared

| Symbol | Location |
|---|---|
| `MODALS` (6 keys) | `dashboard.html:1248` |
| `openModal(key)` | `dashboard.html:1249` |
| `closeModals` | `dashboard.html`, 4 references |
| `TEXTMAP` | `dashboard.html`, 4 references |
| `data-modal` attributes | `dashboard.html` ×14, `method.html` ×1 |
| `.sr-modal*` classes | `dashboard.html` ×47 |
| `openLayer` (the mockup's standalone opener) | **absent** — nothing to collide with yet |

The handoff's instruction to extend `openModal` rather than ship a second system
is sound: there is exactly one controller and `method.html` already depends on
`data-modal`, so a parallel system would split behaviour across two pages.

### SR-063 removal targets — located

```
dashboard.html:452   Build a protocol report        (control)
dashboard.html:494   Open the full archive          (control)
dashboard.html:532   comment referencing the archive
dashboard.html:1176  ROUTES.record      -> /record
dashboard.html:1188  ROUTES.report      -> /record/report
dashboard.html:1221  TEXTMAP [/full archive|in the archive/i, 'record']
dashboard.html:1222  TEXTMAP [/protocol report/i, 'report']
```

### SR-061 / SR-062 nav targets — located

```
dashboard.html:50    <span>Journal</span>
dashboard.html:52    <span>The Life Laboratory</span>
dashboard.html:1176  ROUTES.laboratory  (also carries the stale "seven stages" copy)
dashboard.html:1222  TEXTMAP [/all entries/i, 'journal']
dashboard.html:1222  TEXTMAP [/life laboratory/i, 'laboratory']
```

The handoff's warning that removing nav markup alone is insufficient is correct
— every one of these routes is reachable through `TEXTMAP` by link text alone.

Nav surfaces carrying their own copies, all of which need checking for SR-061:
`dashboard.html`, `method.html`, `method-porges.html`, `resource.html`,
`protocol.html`, `index.html`, plus `css/saferise-dashboard.css` and
`css/saferise-system.css` for the rail styling.

---

## 7 · Unrelated: work lost from the previous branch

Noted because it is not recoverable from this branch and someone will look for
it. On `feat/track-pages-from-data`, the index.html price consolidation
(SR-064 there) was applied to the working tree and deliberately held uncommitted,
pending a review of the old→new table. The branch switch to `feat/modal-shell`
discarded it. The six committed items on that branch are intact; the index.html
price work is gone and would need redoing.

---

## 8 · What the next run needs

1. A decision on SR numbering. SR-068 onward is free.
2. `saferise-modal-shell-v1.html` placed on the Desktop.
3. Either `feat/modal-shell` branched from `feat/track-pages-from-data` so
   `content/tracks.js` exists, or SR-062 rewritten against wherever `LIFE_LAB`
   is meant to live on this branch.
4. A decision on the SR-062 / `32238c1` conflict above.
5. Optional: install node, or restate the acceptance commands against `jsc`.

No commits were made to product files. No branches were created, switched,
pushed or merged. No history was rewritten.
