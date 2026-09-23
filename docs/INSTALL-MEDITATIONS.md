# Installing mastered meditations into the site

Adds finished meditation masters to `assets/audio/meditation/` and registers them in
`content/meditation.js`. `protocol.html` looks up `MEDITATION[galaxyId]`, so once a key is
registered its protocol page plays its own audio instead of falling back to The Clearing.

Masters live in `~/Desktop/SafeRise Guided Meditation Production/` named
`MASTER_<CODE>_<Name>.mp3`. The repo wants `<code>-<slug>.mp3`, lowercase.

## Rules this script follows

- **`tracks.js` stays the source of truth for copy.** `eyebrow` and `sub` are read out of the
  protocol records there, never authored in `meditation.js`.
- **Never claim a path that isn't on disk.** Every `src` is verified before commit.
- **Only missing keys are inserted.** Existing entries are left alone, so this is safe to run
  against a `meditation.js` someone else has edited.

## 1 · Add the rows, then run

Edit the `ROWS` block for whatever is being installed. Currently pending:

| Code | Slug | Title | Master filename |
|---|---|---|---|
| t1-04 | abandonment-wound | Abandonment Wound | `MASTER_T1-04_Abandonment-Wound.mp3` |
| t2-07 | projection-clarity | Projection Clarity | `MASTER_T2-07_Projection-Clarity.mp3` |
| t3-01 | high-stakes-presence | High-Stakes Presence | `MASTER_T3-01_High-Stakes-Presence.mp3` |

Still unmastered, for when they land: `t1-03 overwhelm-threshold`, `t1-05 shame-dissolution`,
`t1-06 grief-integration`, `t2-01 safe-conversation`, `t3-02 conflict-navigation`,
`t3-03 imposter-dissolution`, `t3-06 belonging-gap`.

```bash
cd ~/Documents/GitHub/saferise

SRC="$HOME/Desktop/SafeRise Guided Meditation Production"
DST="assets/audio/meditation"

# code|slug|Title|master filename
ROWS='
t1-04|abandonment-wound|Abandonment Wound|MASTER_T1-04_Abandonment-Wound.mp3
t2-07|projection-clarity|Projection Clarity|MASTER_T2-07_Projection-Clarity.mp3
t3-01|high-stakes-presence|High-Stakes Presence|MASTER_T3-01_High-Stakes-Presence.mp3
'

echo "$ROWS" | grep -v '^$' | while IFS='|' read -r code slug title file; do
  if [ -f "$SRC/$file" ]; then
    cp "$SRC/$file" "$DST/$code-$slug.mp3" && echo "copied  $code-$slug.mp3"
  else
    echo "MISSING $file"
  fi
done

ROWS="$ROWS" python3 - <<'PY'
import os, re

rows = [l.split('|') for l in os.environ['ROWS'].strip().splitlines() if l.strip()]
src  = open('content/tracks.js', encoding='utf-8').read()

# Strip /* ... */ comments before matching. Two rows need this: several protocol records
# have comment blocks inside them, and t3-06 carries an extra sixth element the other
# twenty-nine do not, so the slug is not at a fixed position. The (?:...)*? before the slug
# absorbs any extra fields. A naive line-by-line regex silently drops t3-06.
flat = re.sub(r'/\*.*?\*/', ' ', src, flags=re.S)
Q    = r"(?:[^'\\]|\\.)*"
pat  = (r"\[\s*'(\d\d)'\s*,\s*'([^']*)'\s*,\s*'(%s)'\s*,\s*'(%s)'\s*,\s*'(%s)'\s*,\s*\[[^\]]*\]"
        r"(?:\s*,\s*'%s')*?\s*,\s*'([a-z0-9-]+)'\s*,\s*'([A-Za-z]+)'\s*\]") % (Q, Q, Q, Q)
by_slug = {m[5]: {'verb': m[1], 'sub': m[3]} for m in re.findall(pat, flat, re.S)}
if len(by_slug) < 30:
    raise SystemExit('parsed only %d protocol records from tracks.js, expected 30' % len(by_slug))

med = open('content/meditation.js', encoding='utf-8').read()
esc = lambda s: s.replace('\\', '\\\\').replace("'", "\\'")
added, skipped = [], []

for code, slug, title, _ in rows:
    if re.search(r"^\s*'%s':" % re.escape(code), med, re.M):
        skipped.append(code); continue
    if slug not in by_slug:
        raise SystemExit('no protocol record in tracks.js for slug: ' + slug)
    r = by_slug[slug]
    block = ("  '%s': {\n"
             "    key:     '%s',\n"
             "    eyebrow: '%s',\n"
             "    title:   '%s',\n"
             "    sub:     '%s',\n"
             "    src:     MEDITATION_BASE + '%s-%s.mp3'\n"
             "  }") % (code, code, esc(r['verb']), esc(title), esc(r['sub']), code, slug)
    # append inside the MEDITATION object, before its closing brace
    i = med.rindex('\n};')
    med = med[:i] + ',\n' + block + med[i:]
    added.append(code)

open('content/meditation.js', 'w', encoding='utf-8').write(med)
print('added:', ' '.join(added) or '(none)', '| already present:', ' '.join(skipped) or '(none)')
PY

# Verify every declared path exists before committing — src is a claim, not a fact.
node -e "
var m=require('./content/meditation.js'), fs=require('fs'), bad=0;
Object.keys(m.MEDITATION).forEach(function(k){
  var p=m.MEDITATION[k].src;
  if(!fs.existsSync(p)){ console.log('MISSING',p); bad++; }
  else if(fs.statSync(p).size < 1000000){ console.log('SUSPECT small',p); bad++; }
});
if(bad) process.exit(1);
console.log('ok — all '+Object.keys(m.MEDITATION).length+' assets present');
"
```

## 2 · Commit

**`git commit` crashes on this repo with a bus error** when run through the Claude device
bridge — the index doesn't survive being memory-mapped over that filesystem. It works fine in
a normal Terminal. From the bridge, build the commit with plumbing instead:

```bash
cd ~/Documents/GitHub/saferise
rm -f .git/index.lock

# Four files can't be read through the bridge and break git's index refresh.
git update-index --assume-unchanged \
  .claude/launch.json .well-known/security.txt AGENTS.md CLAUDE.md 2>/dev/null

git add assets/audio/meditation content/meditation.js 2>/dev/null
rm -f .git/index.lock

TREE=$(git write-tree)
C=$(git commit-tree "$TREE" -p "$(git rev-parse HEAD)" -m \
"SR-393 · Install mastered meditations

Adds masters to assets/audio/meditation/ and registers them in
content/meditation.js. eyebrow and sub are copied from the protocol
records in tracks.js; tracks.js stays the source of truth for copy.
All src paths verified present on disk before commit.")
git update-ref HEAD "$C"

# Put these back or git will silently ignore future edits to them.
git update-index --no-assume-unchanged \
  .claude/launch.json .well-known/security.txt AGENTS.md CLAUDE.md 2>/dev/null

git log --oneline -1
```

Then `git push origin main` from a normal Terminal — the bridge shell has its own home
directory, so GitHub credentials aren't visible to it.

## 3 · Things to know

**`PLACEHOLDER_AUDIO` is `true`** at `protocol.html:1297`. Protocols with no master fall back
to The Clearing. Turn it off once all 31 are registered, or members get the wrong session with
no error.

**Overwhelm Threshold needs a decision before it can be installed.** It's being mastered in two
voices, male and female, and `MEDITATION` holds one `src` per key. The Sept 9 handover has
member-toggled male/female voices as the intended architecture, so either that toggle lands
first, or `t1-03` ships as a single voice with the other held back.

**Repo size.** The audio takes it past 500 MB and git keeps every version forever, so a master
replaced later leaves its predecessor in history permanently. Four currently in the repo are
expected to be replaced: `t1-09` and `t2-02` are built from takes being re-rendered, and
`t3-07` and `t3-10` are the seam-forced pacing pending a decision.

## 4 · Master spec, for reference

Speech-referenced level — momentary loudness p90 of −12.6 LUFS, calibrated to the approved
`t1-07`. True peak ≤ −1.8 dBFS, 192 kbps, 44.1 kHz stereo. Integrated LUFS is deliberately
*not* the target: these files run up to half silence and R128 gating counts the music-only
stretches, which reads low on pause-heavy sessions and over-drives them when corrected.
