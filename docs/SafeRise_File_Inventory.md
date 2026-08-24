# SafeRise — File Inventory

**Report only. Nothing was moved, renamed, copied or deleted. Nothing was written to
`~`, `~/Desktop` or `~/Downloads`.** The only file created is this one, inside the repo.

*Compiled 23 Aug 2026 · `~/Desktop` and `~/Downloads` to depth 4 · repo at `06089b4`*

---

## Scope and method

**964 files, 1,255.1 MB** matched the filter: `.md .docx .pdf .html .css .js .json .csv .zip`
and images (`.png .jpg .jpeg .webp .gif .svg .avif`). Dotfiles, `.DS_Store`, `__MACOSX`,
`node_modules` and `.git` were excluded; no `.app`, `.bundle` or `.framework` tree was entered.
No directory below depth 4 was descended into.

**Every file was hashed (SHA-256).** The inventory is **keyed by content hash, not by path**.
A file at four paths is one entry with four locations.

**964 files → 814 unique contents.** 75 contents exist at more than one path, accounting for
225 files and **52.5 MB of redundancy**. All 27 zips were opened and listed; two contain a
nested zip and both were opened as well. Zip contents were matched against loose files and
against the repo by CRC-32 + size.

The repo working tree (270 files, 269 unique contents) was hashed the same way, so
"already in the repo" means **byte-identical**, not "same name".

Two measurement notes:

- Five files reported `st_blocks == 0` (iCloud-offloaded) on the first pass and blocked a
  read for minutes. They materialised on retry and all 964 are hashed. If a future sweep
  appears to hang, that is why.
- A compound `which node nodejs deno bun` exits non-zero if **any** argument is missing.
  It says nothing about the ones that resolved. Read the output, not the status.

---

## A · Entries, ordered by how much confusion each is causing

### A1 · `SHARED-awareness-moves.md` — the register cites a path that does not exist in the repo

**This is the "not where stated" failure, located.**

[`docs/fix-register.md:2634`](docs/fix-register.md:2634) (SR-221) states:
*"`content/shared/SHARED-awareness-moves.md` is **partially** updated"* and cites lines
`:382`, `:194`, `:132` and `:82`.

`content/shared/` **does not exist in the repo.** `content/` holds six `.js` files and no
markdown. The file exists in two versions, in three places, none of them the repo:

| hash | size | lines | mtime | location |
|---|---:|---:|---|---|
| `808fab8f` | 25.3 KB | **393** | — | `~/Downloads/content handover build.zip` → `SafeRise-BUILD-HANDOVER.zip` → **`content/shared/SHARED-awareness-moves.md`** |
| `c3e7999f` | 20.0 KB | 312 | 2026-08-22 12:29 | `~/Desktop/SafeRise-Track02-Complete/content/SHARED-awareness-moves.md` |
| `c3e7999f` | 20.0 KB | 312 | — | `~/Downloads/SafeRise-Track02-Complete.zip` → `content/SHARED-awareness-moves.md` |

**Only the nested copy satisfies the citation.** Verified by reading the cited lines:

| line | `808fab8f` (nested, 393 lines) | `c3e7999f` (loose, 312 lines) |
|---|---|---|
| `:82` | *"…Move B carries a further risk on the professional protocols…"* | same |
| `:132` | `t3-06 Ambition Recovery` | same |
| `:194` | `t3-06 Ambition Recovery` | same |
| `:382` | **`t3-06 Belonging Gap`** | **file has only 312 lines** |

SR-221's central observation — *"a newer table at `:382` already reads t3-06 Belonging Gap,
while two older ones still read t3-06 Ambition Recovery"* — is **only true of the nested
copy**. The loose copy mentions Belonging Gap zero times.

**Newest / authoritative:** `808fab8f`, and it is two zips deep in `~/Downloads`.
**In the repo:** no. **Matches the repo version:** there is no repo version.

---

### A2 · `journey/t3-band.jpg` — four versions, six folders, none usable, and one is a PNG

The image audit found Track 03's journey band renders an art brief as visitor-facing text
because `TRACKS[3].art.band` declares a ratio with no `src`. **The asset exists on disk four
times over.**

| hash | dimensions | ratio | format | size | mtime | locations |
|---|---|---:|---|---:|---|---|
| `5ecb3734` | 1400×583 | 2.401 | JPEG 4:4:4 | 184.1 KB | **08-23 07:39** ← newest | `~/Desktop/assets 4/journey/`, `~/Downloads/assets 3/journey/` |
| `7fdc2be1` | 1400×583 | 2.401 | JPEG 4:4:4 | 192.6 KB | 08-23 07:33 | `~/Downloads/assets 2/journey/` |
| `e03a435a` | 1400×583 | 2.401 | JPEG 4:4:4 | 213.6 KB | 08-22 17:39 | `~/Desktop/assets/journey/`, `~/Desktop/assets 2/journey/`, `~/Downloads/assets/journey/`, `~/Desktop/Personal/untitled folder/assets/journey/` |
| `4f527f0f` | 1907×825 | 2.312 | **PNG behind a `.jpg` extension** | **1700.2 KB** | 08-22 15:38 | `~/Desktop/assets/t3/band.jpg`, `~/Desktop/assets 2/t3/band.jpg`, `~/Desktop/Personal/untitled folder/assets/t3/band.jpg` |

**In the repo:** none of the four. **Matches the repo:** no repo version exists.

Two things settle this, and neither favours any candidate:

1. **The slot declares `ratio: '1400/380'` = 3.684:1. All three JPEG candidates are 1400×583
   = 2.401:1.** The committed `assets/journey/t1-band.jpg` and `t2-band.jpg` are both 1400×380.
   The t3 band was rendered at the wrong aspect ratio — plausibly why it was never committed.
2. **`4f527f0f` is the PNG-behind-`.jpg` delivery error**: PNG data, `.jpg` extension,
   1700 KB against 184–214 KB for its JPEG siblings — **9.2×**, matching the known failure
   mode exactly.

**Not ambiguous — none is canonical.** What would settle it is a re-render at 1400×380.
Picking the newest would ship a 2.4:1 image into a 3.68:1 slot.

**The same wrong-ratio batch caught `t1-band` too:**

| hash | dimensions | ratio | chroma | size | location |
|---|---|---:|---|---:|---|
| `0529fd33` | 1400×380 | 3.684 | 4:2:0 | 170.4 KB | **`assets/journey/t1-band.jpg` (repo)** and `~/Desktop/saferise-out/assets/journey/` — identical |
| `71b14cbd` | **1400×583** | 2.401 | 4:4:4 | 201.9 KB | `~/Desktop/assets 3/journey/t1-band.jpg` |

`assets 3` holds a re-render of an already-shipped asset at the wrong ratio. Do not let it
overwrite the committed file.

---

### A3 · Thirteen `assets` directories — three byte-identical, two byte-identical

Every directory on disk with an `assets` path segment:

| directory | files | size | identical to repo |
|---|---:|---:|---:|
| `~/Desktop/assets` | 6 | 3.2 MB | 4 |
| `~/Desktop/assets 2` | 6 | 3.2 MB | 4 |
| `~/Desktop/Personal/untitled folder/assets` | 6 | 3.2 MB | 4 |
| `~/Desktop/assets 3` | 5 | 1.4 MB | 4 |
| `~/Desktop/assets 4` | 5 | 1.5 MB | 4 |
| `~/Downloads/assets` | 5 | 1.5 MB | 4 |
| `~/Downloads/assets 2` | 5 | 1.5 MB | 4 |
| `~/Downloads/assets 3` | 5 | 1.5 MB | 4 |
| `~/Desktop/saferise-out/assets` | 11 | 3.2 MB | 6 |
| `~/Desktop/SafeRise-Track02-Complete/assets` | 58 | 1.7 MB | 31 |
| `~/Desktop/SafeRise-Tracks-02-03-Brief/assets` | 31 | 0.1 MB | 0 |
| `~/Desktop/SafeRise_Claude_Pack/assets` | 16 | 0.6 MB | 0 |
| `~/Desktop/SafeRise-Handover-02/assets` | 2 | 0.1 MB | 0 |

**Byte-identical content sets — this is the "three identical copies" already found:**

- **Group 1 (3 folders):** `~/Desktop/assets` · `~/Desktop/assets 2` ·
  `~/Desktop/Personal/untitled folder/assets`
- **Group 2 (2 folders):** `~/Desktop/assets 4` · `~/Downloads/assets 3`

File-by-file across the eight `assets*` siblings (`*` = byte-identical to the repo):

| relative path | D/a | D/a 2 | D/a 3 | D/a 4 | Dl/a | Dl/a 2 | Dl/a 3 | in repo |
|---|---|---|---|---|---|---|---|---|
| `t3/hero.jpg` | `601be8`* | `601be8`* | — | `601be8`* | `601be8`* | `601be8`* | `601be8`* | yes |
| `t3/cost.jpg` | `1cde9e`* | `1cde9e`* | — | `1cde9e`* | `1cde9e`* | `1cde9e`* | `1cde9e`* | yes |
| `t3/change.jpg` | `008519`* | `008519`* | — | `008519`* | `008519`* | `008519`* | `008519`* | yes |
| `t3/range.jpg` | `c5e275`* | `c5e275`* | — | `c5e275`* | `c5e275`* | `c5e275`* | `c5e275`* | yes |
| `journey/t3-band.jpg` | `e03a43` | `e03a43` | — | `5ecb37` | `e03a43` | `7fdc2b` | `5ecb37` | **NO** |
| `t3/band.jpg` | `4f527f` | `4f527f` | — | — | — | — | — | **NO** |
| `t1/cost.jpg` | — | — | `e35bda`* | — | — | — | — | yes |
| `t1/range.jpg` | — | — | `a7e885`* | — | — | — | — | yes |
| `t1/change.jpg` | — | — | `58c9fa`* | — | — | — | — | yes |
| `shared/four-steps.jpg` | — | — | `088b47`* | — | — | — | — | yes |
| `journey/t1-band.jpg` | — | — | `71b14c` | — | — | — | — | **NO** |

`D` = `~/Desktop`, `Dl` = `~/Downloads`.

**Read across:** the four Track 03 section images are already committed and identical in all
seven folders — **28 files carrying nothing new**. The only content not in the repo is the
`t3-band` / `t1-band` question in A2. `~/Desktop/assets 3` is a Track 01 delivery whose four
useful files are already committed.

---

### A4 · `content handover build.zip` — the only copy of a large amount of authored content

`~/Downloads/content handover build.zip` (1,472 KB) contains one file and one nested zip.
`SafeRise-BUILD-HANDOVER.zip` (1,483 KB) contains **106 files**:

| folder | files | also loose on disk | in the repo |
|---|---:|---:|---:|
| `content/track-01/` | 10 | **0** | **0** |
| `content/track-02/` | 10 | 9 | **0** |
| `content/track-03/` | 10 | **0** | **0** |
| `content/shared/` | 6 | 2 | **0** |
| `content/clearing/` | 1 | **0** | **0** |
| `data/` (`tracks-SR098-patched.js`, `SR-098-PATCH.md`) | 2 | **0** | **0** |
| `diagrams/png/` | 16 | **0** | **0** |
| `diagrams/svg/` | 39 | 31 | 30 |
| `specs/` | 8 | 2 | **0** |
| `design/` | 3 | 3 | **0** |
| `BUILD-HANDOVER.md` | 1 | **0** | **0** |

**Twenty of the thirty protocol source documents exist nowhere else** — not loose on disk,
not in the repo, not in any other archive. Same for all 16 diagram PNGs, `tracks-SR098-patched.js`,
`SR-098-PATCH.md`, `t0-00-the-clearing.md` and six of eight specs.

**In the repo:** 30 of 106 (the SVG diagrams). **Newest:** it is the only copy, so it is
newest by default. It is also the copy that satisfies A1.

The older sibling, `~/Desktop/files copy.zip` → `SafeRise-Track01-Handover.zip`, holds 20
files, Track 01 only, with `specs/resource-audit.csv` (41.2 KB) found nowhere else.

---

### A5 · Track 02 protocol content — three generations, and the newest is the odd one out

Ten `t2-*.md` files exist in three trees. Two trees are byte-identical to each other; the
third differs on every file.

| tree | mtime | hash of `t2-01` | relationship |
|---|---|---|---|
| `~/Desktop/SafeRise-Handover-02/content-t2/` | 08-22 04:26 | `ca71e659` | identical to Tracks-02-03-Brief |
| `~/Desktop/SafeRise-Tracks-02-03-Brief/content-t2/` | 08-22 05:08 | `ca71e659` | identical to Handover-02 |
| `~/Desktop/SafeRise-Track02-Complete/content/` | **08-22 12:29** | `d934171a` | **newest, and different** |

The difference is substantive, not cosmetic — the newer version rewrites the opening and adds
the `GOLD/PAUSE` marker:

```
- Sit somewhere you won't be interrupted. Eyes closed if they'll close, or one spot on the floor.
+ There's a conversation you haven't had yet.
+
+ > **GOLD/PAUSE**
+
+ And you've had it eleven times already, in your head, with both parts written.
```

**Newest:** `SafeRise-Track02-Complete`. **In the repo:** no — no `.md` protocol source is
committed. **Note:** the nested `SafeRise-BUILD-HANDOVER.zip` (A4) carries a *fourth*
`content/track-02/` at 24.5 KB, matching 9 of 10 loose files.

---

### A6 · `saferise-protocol-covers` — 33 files, eight locations, only partly overlapping

| location | files | size | unique contents |
|---|---:|---:|---:|
| `~/Desktop/saferise-protocol-covers/` | 33 | 9.6 MB | 33 |
| `~/Desktop/Saferise images/saferise-protocol-covers/` | 33 | 9.6 MB | 33 |
| `~/Downloads/design output/saferise-protocol-covers/` | 33 | 9.9 MB | 33 |
| `~/Downloads/design output/saferise-protocol-covers 2/` | 33 | 9.9 MB | 33 |
| `~/Desktop/saferise-protocol-covers.zip` | 33 | 9.8 MB | — |
| `~/Desktop/saferise-protocol-covers 02.08.11.zip` | 33 | 9.6 MB | — |
| `~/Downloads/design output/saferise-protocol-covers.zip` | 33 | 9.8 MB | — |
| `~/Downloads/saferise-protocol-covers.zip` | 33 | 9.6 MB | — |

**No two folders are identical.** Overlaps: 30/33 · 32/33 · 23/33 · 22/33 · 21/33 · 20/33.
Four near-copies of a 33-file set, each 1–13 files different from the next. **~39 MB.**

**In the repo:** zero. The shipped covers are `assets/covers/*.jpg` at 900×1200 and
`t2-*/t3-*.jpg` at 1086×1448; none of these 33-file sets matches byte-for-byte.

---

### A7 · `saferise-t3-sections` — four zips, all different, all fully duplicated by loose files

| zip | size | files | contents also loose | in repo |
|---|---:|---:|---:|---:|
| `~/Desktop/saferise-t3-sections.zip` | 1577.6 KB | 5 | 5 | 4 |
| `~/Desktop/Personal/untitled folder/saferise-t3-sections.zip` | 1577.6 KB | 5 | 5 | 4 |
| `~/Desktop/saferise-t3-sections copy.zip` | 1556.5 KB | 5 | 5 | 4 |
| `~/Desktop/saferise-t3-sections_1.zip` | 1548.1 KB | 5 | 5 | 4 |

Three distinct sizes, so at least three distinct versions. **Every file in every one of them
already exists loose on disk, and four of five are already committed.**

---

### A8 · `image-manifest.csv` — three versions, six copies, all 13.1 KB

| hash | mtime | locations |
|---|---|---|
| `430c441b` | **08-22 19:03** ← newest | `~/Desktop/saferise-protocol-covers/`, `~/Desktop/Saferise Docs/` (18:39) |
| `0f1e1364` | 08-22 00:02 | `~/Desktop/Saferise images/saferise-protocol-covers/`, `~/Downloads/design output/saferise-protocol-covers/` (08-21 19:42), `…covers 2/` (08-21 19:42) |
| `571796c6` | 08-21 16:19 | `~/Downloads/html output and operationsla files/` |

Identical size, three different contents. **In the repo:** none. `image-manifest.html` shows
the same three-way split.

---

### A9 · `~/Desktop/saferise-out/` — a superseded build output, unambiguously

Eleven assets in the shipped directory layout. **The repo is newer or equal on every one.**

| asset | saferise-out | repo | verdict |
|---|---|---|---|
| `journey/t1-band.jpg` | 08-22 14:33 · 170 KB | 08-22 20:32 · 170 KB | identical |
| `journey/t2-band.jpg` | 08-22 14:33 · 187 KB | 08-22 20:32 · 187 KB | identical |
| `t1/hero.jpg` | 08-22 14:33 · 659 KB | 08-22 20:32 · 659 KB | identical |
| `t2/hero.jpg`, `t2/cost.jpg`, `t2/change.jpg` | 08-22 14:29–14:33 | 08-22 20:32 | identical |
| `shared/four-steps.jpg` | 226 KB | **08-23 · 238 KB** | repo newer |
| `t1/change.jpg` | 239 KB | **08-23 · 404 KB** | repo newer |
| `t1/cost.jpg` | 206 KB | **08-23 · 244 KB** | repo newer |
| `t1/range.jpg` | 284 KB | **08-23 · 306 KB** | repo newer |
| `t2/range.jpg` | 284 KB | **08-22 20:32 · 316 KB** | repo newer |

Same pixel dimensions throughout; only file size differs — these are lower-quality earlier
exports. **Nothing here is needed.**

---

### A10 · `~/Desktop/Saferise htmls/` — 478 MB of superseded monoliths

63 `.html` files, **478.2 MB**, none matching anything in the repo. Five are 75.5–75.6 MB each:

| size | mtime | file |
|---:|---|---|
| 75.6 MB | 07-30 21:16 | `index.original.html` |
| 75.6 MB | 07-30 18:06 | `SafeRise_v29_Resource_Reading_System.html` |
| 75.5 MB | 07-30 16:33 | `SafeRise_v27_Source_Insights_Live_Fix.html` |
| 75.5 MB | 07-30 15:58 | `SafeRise_v26_Content_Sequence_Typography_Improvements.html` |
| 75.5 MB | 07-30 14:56 | `SafeRise_v24_v23Base_Identity_Transformation.html` |

A `v15 → v29` version ladder predating the repo's current `index.html` (1.03 MB). **38% of
everything scanned, by weight.**

---

### A11 · Word `~$` lock files — 7 files, all zero-length, one content

`cfd8c6fc` appears at 7 paths (`~$feRise_DisciplinedMan_Partnership_Summary_1.docx`,
`~$feRise_Life_Companion_Guide.docx`, `~$nor_ExecSummary_Plain.docx` and four more).
These are Word's open-document locks. Not content.

---

## B · Archives

**27 zips. Two nest another zip.**

### B1 · Nested

| outer | nested | nested files |
|---|---|---:|
| `~/Downloads/content handover build.zip` | `SafeRise-BUILD-HANDOVER.zip` | 106 — see A4 |
| `~/Desktop/files copy.zip` | `SafeRise-Track01-Handover.zip` | 20 |

`SafeRise-Track01-Handover.zip` also exists standalone at
`~/Desktop/Saferise Docs/Saferise track01 handover/` (124.5 KB), where only 4 of its 20 files
exist loose.

### B2 · Fully duplicated by loose files — 15 zips carry nothing unique

| zip | files | also loose | in repo |
|---|---:|---:|---:|
| `~/Desktop/SafeRise-Tracks-02-03-Brief.zip` | 38 | 38 | 0 |
| `~/Desktop/saferise-protocol-covers.zip` | 33 | 33 | 0 |
| `~/Desktop/saferise-protocol-covers 02.08.11.zip` | 33 | 33 | 0 |
| `~/Downloads/saferise-protocol-covers.zip` | 33 | 33 | 0 |
| `~/Downloads/design output/saferise-protocol-covers.zip` | 33 | 33 | 0 |
| `~/Desktop/SafeRise-Handover-02.zip` | 15 | 15 | 0 |
| `~/Downloads/design output/files.zip` | 9 | 9 | 0 |
| `~/Desktop/files.zip` | 5 | 5 | 0 |
| `~/Downloads/files.zip` | 4 | 4 | 0 |
| `~/Desktop/saferise-t3-sections.zip` | 5 | 5 | 4 |
| `~/Desktop/saferise-t3-sections copy.zip` | 5 | 5 | 4 |
| `~/Desktop/saferise-t3-sections_1.zip` | 5 | 5 | 4 |
| `~/Desktop/Personal/untitled folder/saferise-t3-sections.zip` | 5 | 5 | 4 |
| `~/Downloads/saferise-t1-sections.zip` | 5 | 5 | 4 |
| `~/Downloads/SafeRise-BodyMap-Brief.zip` | 5 | 5 | 1 |

`~/Downloads/SafeRise-Track02-Complete.zip` (75 files) is 74/75 duplicated by
`~/Desktop/SafeRise-Track02-Complete/`, with 31 already committed.

### B3 · Already in the repo

`~/Downloads/Mastered Resource Guidance.zip` — 11 files, **10 already committed**, 0 loose.

### B4 · Archives holding content found nowhere else

| zip | unique files | note |
|---|---:|---|
| `~/Downloads/content handover build.zip` | ~59 of 106 | the A4 finding |
| `~/Desktop/Saferise Docs/Saferise track01 handover/SafeRise-Track01-Handover.zip` | 16 of 20 | incl. `resource-audit.csv` |
| `~/Downloads/t1 guided meditaiton script files.zip` | 10 of 10 | |
| `~/Downloads/Track01-Section-Handoffs.zip` | 6 of 6 | |
| `~/Downloads/t2 guided meditation script files.zip` | 8 of 10 | |
| `~/Downloads/posters.zip` · `runway framework brief.zip` · `Resource Gauidance.zip` | 2 each | |
| `~/Downloads/all covers style reference.zip` | 1 of 4 | 24.7 MB |

---

## 1 · Near-duplicates — same filename, different content

**46 filenames have more than one distinct content.** Prioritised: handovers, briefs, specs
and data files first; the image sets after.

### 1a · Documents and data

| filename | versions | detail |
|---|---:|---|
| `SHARED-awareness-moves.md` | 2 | **A1** — 393 lines vs 312; only the longer satisfies the register |
| `image-manifest.csv` | 3 | **A8** — all 13.1 KB, three contents, six copies |
| `image-manifest.html` | 3 | same three-way split |
| `t2-01-safe-conversation.md` … `t2-10-*.md` (10 files) | 2 each | **A5** — rewritten opening + `GOLD/PAUSE` |
| `Kenor_International_Audit_Checklist` | 3 | `.docx` 15.1 KB (07-16) · `.md` 12.0 KB (07-15 00:06) · `_1.md` 23.3 KB (07-15 00:27). **Different project.** |
| `SafeRise_Complete_Project_Handoff` | 1 content, 2 names | `05228d7a` at both `.docx` and `_1.docx` — an identical copy, not a version |
| `Resource_Reader_Integration_Brief` | 2 | `.md` 4.9 KB (08-15 22:04) → `-v2-FINAL.md` 9.2 KB (08-16 02:10). Different names, one lineage |
| `TRACK-01-BUILD-HANDOVER.md` | 1 content, 2 paths | `5c6f5873` — identical |
| `TRACK-02-COMPLETE-HANDOVER.md` | 1 content, 2 paths | `e3eb7114` — identical |
| `TRACKS-02-03-BUILD-BRIEF.md` | 1 content, 2 paths | `f139bf88` — identical |
| `HANDOVER-02.md` | 1 content, 2 paths | `43767e2e` — identical |
| `DIAGRAM-THEMING-SPEC.md` | 1 content, 3 paths | `1ae3616e` — identical |

**The `_1` / `_2` / `_v2` docx family** in `~/Desktop/Saferise Docs/` — `Disciplined_Man_Executive_Summary`
exists as base, `_1`, `_2` and `_v2`; `SafeRise_Protocol_Workbook_Updated` and
`_Updated_1`; `SafeRise_Source_Insights_ProtocolGuide` and `_1`;
`SafeRise_Reference_Cases_TrueStories` and `_1`; `SafeRise_Life_Companion_Guide` and `_1`;
`SafeRise_Disclosure_Support_Guide` and `_1`. All July 2026, all different sizes, none in the
repo. **Six document families with a silent `_1` sibling.**

### 1b · Images

| filename | versions | detail |
|---|---:|---|
| `range.jpg` | 6 | across `assets*`, `saferise-out`, repo |
| `change.jpg` | 5 | |
| `cost.jpg` | 5 | |
| `hero.jpg` | 3 | |
| `t3-band.jpg` | 3 | **A2** — plus `t3/band.jpg` as a fourth candidate |
| `t1-band.jpg` | 2 | **A2** — 1400×380 committed vs 1400×583 loose |
| `four-steps.jpg` | 2 | `saferise-out` 226 KB vs repo 238 KB |
| `img-067-release-t{1,2,3}-{01..10}.svg` | 2 each (30 files) | loose set vs the nested-zip set; **30 of them are already committed** |
| `files.zip` | 3 | 34.2 / 14.6 / 3324.7 KB — same name, unrelated payloads |
| `saferise-protocol-covers.zip` | 3 | **A6** |

---

## 2 · Already in the repo — safe to ignore

**73 distinct contents, 100 files on disk, byte-identical to committed files.**

| location | files already committed |
|---|---:|
| `~/Desktop/SafeRise-Track02-Complete/` | 31 |
| `~/Desktop/Saferise images/` | 28 |
| `~/Desktop/saferise-out/` | 6 |
| `~/Desktop/assets` · `assets 2` · `assets 3` · `assets 4` | 4 each = 16 |
| `~/Downloads/assets` · `assets 2` · `assets 3` | 4 each = 12 |
| `~/Desktop/Personal/untitled folder/assets` | 4 |
| `~/Desktop/Saferise Docs/` | 2 |
| `~/Downloads/SafeRise-BodyMap-Brief/` | 1 |

Named individually because they are documents, not assets:

- `~/Desktop/Saferise Docs/CLAUDE-CODE-HANDOFF-track-pages.md` = `docs/CLAUDE-CODE-HANDOFF-track-pages.md`
- 30 `img-067-release-*.svg` = `assets/diagrams/release/*`
- The four Track 03 section images and four Track 01 section images across the `assets*` folders

---

## 3 · Never used

**590 files match nothing in the repo and their filename appears in no document** — not in any
`.md`, `.html`, `.css`, `.js`, `.json` or `.csv` on disk or in the repo. Reported, not judged.

### 3a · By volume

| location | files | size | mix |
|---|---:|---:|---|
| `~/Desktop/Saferise working screen shots/` | 152 | 221.6 MB | `.png`×148 `.avif`×4 |
| `~/Desktop/Saferise htmls/` | 45 | 467.1 MB | `.html` — **A10** |
| `~/Desktop/Saferise images/` | 65 | 73.1 MB | `.png`×46 `.jpg`×12 |
| `~/Desktop/Saferise designs/` | 37 | 54.7 MB | `.png`×31 `.svg`×6 |
| `~/Desktop/Kenor international /` | 29 | 46.6 MB | **different project** |
| `~/Downloads/design output/` | 31 | 35.9 MB | |
| `~/Desktop/T1/T2/T3 landing images/` | 17 | 32.7 MB | |
| `~/Desktop/Saferise Docs/` | 55 | 5.9 MB | `.docx`×36 `.md`×14 `.pdf`×4 |
| loose Desktop screenshots (`Screenshot 2026-08-23 at *`) | 22 | ~35 MB | |

### 3b · Documents (120, excluding 7 Word lock files) — the ones that matter

Newest first, most recent fifteen:

| mtime | size | file |
|---|---:|---|
| 08-23 16:28 | 27.5 KB | `~/Downloads/SafeRise_Tracks_01_03_Copy_Animation_Handover.pdf` |
| 08-23 14:49 | 37.3 KB | `~/Desktop/SafeRise_Relationship_Healing_Landing_Page_Claude_Handover.docx` |
| 08-23 11:07 | 36.6 KB | `~/Desktop/SafeRise_Journey_Within_Each_Protocol_Claude_Update_Script.docx` |
| 08-23 10:11 | 36.7 KB | `~/Desktop/SafeRise_Track02_Where_To_Begin_Protocol_Section_Claude_Update_Script.docx` |
| 08-23 10:00 | 36.6 KB | `~/Downloads/SafeRise_Track02_Relationship_Healing_Hero_Banner_Copy_Update_Script.docx` |
| 08-23 04:52 | 37.7 KB | `~/Downloads/SafeRise_Track01_State_Its_Holding_Handover.docx` |
| 08-23 00:48 | 13.0 KB | `~/Downloads/SafeRise_ResourceGuidance_Scripts.docx` |
| 08-22 20:15 | 21.4 KB | `~/Desktop/Saferise Docs/SafeRise_Resource_Inventory.docx` |
| 08-22 19:57 | 89.8 KB | `~/Desktop/Saferise Docs/SafeRise_AllTracks_RecordingScripts.docx` |
| 08-22 19:22 | 3.7 KB | `~/Desktop/Saferise Docs/CLAUDE-CODE-cover-swap-t2-05-t3-06.md` |
| 08-22 19:03 | 6.7 KB | `~/Desktop/saferise-protocol-covers/SafeRise_Image_Inventory.md` |
| 08-22 18:39 | 6.7 / 8.4 KB | `~/Desktop/Saferise Docs/SafeRise_T2_/T3_Landing_Image_Brief.md` |
| 08-22 14:50 | 2.5 KB | `~/Downloads/SafeRise-BodyMap-Brief/BODYMAP-CHATGPT-PROMPT.md` |
| 08-22 12:29 | 11.7 KB | `~/Desktop/SafeRise-Track02-Complete/specs/MEDITATION-ARC-AUDIT.md` |
| 08-21 20:57 | 5.4 KB | `~/Downloads/html output and operationsla files/SafeRise_Image_Slots_PROVISIONED.md` |

**Six `*_Claude_Update_Script.docx` / `*_Claude_Handover.docx` dated 08-23, all 36–38 KB,
none referenced by anything.** These are the newest project documents on the machine and the
repo knows nothing about them.

Also never-referenced: the `CLAUDE-CODE-RUN-A/B/C.md` set, `RUN-D-ADDENDUM.md`,
`PHASE-2-GO.md`, `T2-T3-AUDIT.md`, `SafeRise_Fix_Register_1.md` (11.5 KB, 08-14 — an early
ancestor of `docs/fix-register.md`, now 317 KB), `HOMEPAGE-HANDOVER.md`, `STUDIO-HANDOFF.md`,
`CANVA_37_COVERS.md`, and seven `SR-0xx-*.md` run notes in `~/Desktop/Saferise Docs/`.

**Out of project entirely:** `~/Desktop/Kenor international /` (29 files), `~/Desktop/trading/`
(2), `~/Desktop/Personal/` CVs (4), `~/Downloads/*.txt` transcripts, `Zo Zo Moran Road.m4a`.

---

## 4 · The canonical set

### Handover documents

| kind | canonical | reasoning |
|---|---|---|
| Content build handover | **`~/Downloads/content handover build.zip` → `SafeRise-BUILD-HANDOVER.zip` → `BUILD-HANDOVER.md`** | Only handover whose referenced payload is complete — 30 protocols, 3 tracks, shared, data, diagrams, specs. Every other handover is a subset. |
| Track 01 handover | **`~/Desktop/Saferise Docs/TRACK-01-BUILD-HANDOVER.md`** (`5c6f5873`) | Two copies, byte-identical, so no ambiguity. Superseded in scope by BUILD-HANDOVER but still the Track 01 record. |
| Track 02 handover | **`~/Desktop/Saferise Docs/TRACK-02-COMPLETE-HANDOVER.md`** (`e3eb7114`) | Two copies, byte-identical. |
| Tracks 02–03 brief | **`~/Desktop/Saferise Docs/TRACKS-02-03-BUILD-BRIEF.md`** (`f139bf88`) | Two copies, byte-identical. |
| Handover 02 | **`~/Desktop/HANDOVER-02.md`** (`43767e2e`) | Two copies, byte-identical; the loose one is the same bytes as the one inside its folder. |
| Reader integration brief | **`~/Desktop/Saferise Docs/Resource_Reader_Integration_Brief-v2-FINAL.md`** | Later mtime, nearly double the length, and named FINAL by the author. |
| Repo-side handover | **`docs/CLAUDE-CODE-HANDOFF-track-pages.md`** | Already committed; the Desktop copy is byte-identical. |

**Ambiguous — do not pick yet:** the six `*_Claude_Update_Script.docx` / `*_Claude_Handover.docx`
dated 2026-08-23. They are the newest documents on the machine, they are not versions of each
other (different subjects), and none is referenced anywhere. **What would settle it:** whether
each has been applied to the repo. Opening each and checking one distinctive sentence against
`index.html` / `content/tracks.js` decides it in minutes.

### Image folders

| kind | canonical | reasoning |
|---|---|---|
| Track section images (t1/t2/t3 `hero`, `cost`, `range`, `change`, `shared/four-steps`) | **the repo** — `assets/` | Repo is newest or equal on all 11 files versus `saferise-out`, and identical to all seven `assets*` folders on the four Track 03 files. |
| `journey/t3-band.jpg` | **none — see A2** | All three JPEG candidates are 1400×583 against a declared 1400×380 slot; the fourth is a PNG mislabelled `.jpg`. **What would settle it:** a re-render at 1400×380. |
| `journey/t1-band.jpg` | **the repo** (`0529fd33`, 1400×380) | The `assets 3` copy is 1400×583 — wrong ratio, and a regression on a shipped file. |
| Protocol covers | **the repo** — `assets/covers/` | The four 33-file `saferise-protocol-covers` sets differ from each other and none matches what ships. They are a design lane, not the shipped set. |
| Diagram SVGs | **the repo** — `assets/diagrams/release/` | 30 of 39 already committed and identical. |

**Ambiguous:** which of the four `saferise-protocol-covers` folders is the design master.
**What would settle it:** `image-manifest.csv` is meant to be that answer, and it exists in
three versions (A8). Resolve the manifest first; it names the set.

### Content bundles

| kind | canonical | reasoning |
|---|---|---|
| Protocol source markdown (all 30) | **`SafeRise-BUILD-HANDOVER.zip` → `content/`** | The only complete set. Track 01 and Track 03 sources exist nowhere else at all. |
| `SHARED-awareness-moves.md` | **`SafeRise-BUILD-HANDOVER.zip` → `content/shared/`** (`808fab8f`, 393 lines) | The only version the register's line citations resolve against. |
| Track 02 protocol markdown | **`~/Desktop/SafeRise-Track02-Complete/content/`** among the loose trees | Newest (08-22 12:29) and substantively different. But see the caveat below. |
| Diagram PNGs | **`SafeRise-BUILD-HANDOVER.zip` → `diagrams/png/`** | Only copy. |
| `tracks-SR098-patched.js` | **`SafeRise-BUILD-HANDOVER.zip` → `data/`** | Only copy. |

**Ambiguous:** Track 02 markdown — `SafeRise-Track02-Complete/content/` (newest loose,
`d934171a`) versus `SafeRise-BUILD-HANDOVER.zip` → `content/track-02/` (24.5 KB, matches 9 of
10 loose files). Both plausible. **What would settle it:** whether the `GOLD/PAUSE` marker
that distinguishes `Track02-Complete` also appears in the nested-zip copy. That is one grep
once the zip is extracted somewhere safe.

### Briefs

| kind | canonical | reasoning |
|---|---|---|
| Body-map brief | **`~/Downloads/SafeRise-BodyMap-Brief/`** (loose) | The `.zip` beside it is byte-identical; the loose folder is easier to read. |
| Landing image briefs (T2, T3) | **`~/Desktop/Saferise Docs/SafeRise_T2_/T3_Landing_Image_Brief.md`** | Single copies, no competitors. |
| Image provisioning | **ambiguous** — `~/Downloads/html output and operationsla files/SafeRise_Image_Slots_PROVISIONED.md` (08-21) vs `~/Desktop/saferise-protocol-covers/SafeRise_Image_Inventory.md` (08-22 19:03) vs the `SafeRise_Image_Provisioning_Spec_T1.md` inside `SafeRise-Track01-Handover.zip`. Three documents, three names, one subject. **What would settle it:** whether any names `assets/journey/t3-band.jpg` and at what dimensions — that is the open slot from A2. |
| Fix register | **`docs/fix-register.md` in the repo** (317 KB) | `~/Desktop/SafeRise_Fix_Register_1.md` is 11.5 KB from 08-14 — an early ancestor, not a competitor. |

---

## What this adds up to

- **52.5 MB** of the 1,255 MB scanned is exact duplication across paths — 225 files carrying
  75 distinct contents.
- **100 files** are already committed byte-for-byte and can be disregarded entirely.
- **478 MB** is one folder of superseded HTML monoliths; **222 MB** is one folder of screenshots.
  Between them, 56% of everything scanned.
- **Roughly 59 files of authored project content exist in exactly one place**, and that place
  is two zips deep inside `~/Downloads`.
- **One asset the live site is currently missing** exists on disk in four versions, and none of
  them is the right shape.

The pattern behind "not where stated" is visible in A1: the register cites repo-relative paths
for files that were never committed, so the citation is accurate about the document and wrong
about the location. Anything that resolves this should start by deciding whether
`content/*.md` belongs in the repo at all — every other ambiguity above is downstream of that.

---

*Nothing was moved, renamed, copied or deleted. No file was written outside this repo.*
