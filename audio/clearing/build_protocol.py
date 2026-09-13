#!/usr/bin/env python3
"""
build_protocol.py — turn a SafeRise script into a finished meditation.

One command. Renders every passage through the ElevenLabs API, inserts the
pauses, masters to the platform spec, writes one mp3. Nothing to download,
rename or reassemble.

    export ELEVENLABS_API_KEY="sk_..."
    python3 build_protocol.py clearing.txt Clearing_t0-00.mp3

    python3 build_protocol.py --list-voices          # find your voice id
    python3 build_protocol.py clearing.txt out.mp3 --speed 0.88 --dry-run

SCRIPT FORMAT
-------------
Plain text. Spoken lines, with pauses on their own line as [[seconds]]:

    There's an engagement ahead of you… Not yet. In a minute.
    [[4]]
    So — what's ahead. Name it, just to yourself. One line.
    [[12]]

Blank lines are ignored. Lines starting with # are comments.
Consecutive spoken lines are rendered as one passage.

Renders are cached in .cache/ keyed by text+voice+settings, so re-running
after changing only a pause length costs nothing and takes seconds.
"""

import argparse, hashlib, json, os, re, subprocess, sys, tempfile, urllib.request

API   = "https://api.elevenlabs.io/v1"
SR, CH, BITRATE = 48000, 2, "192k"
TARGET_I, TARGET_TP, TARGET_LRA = -16.0, -1.0, 11.0
HEAD_TAIL = 0.3

DEFAULTS = dict(
    voice   = os.environ.get("SAFERISE_VOICE_ID", ""),
    model   = "eleven_multilingual_v2",
    speed   = 0.88,      # the setting that stops the racing
    stability = 0.75,    # high — keeps the read even over a long script
    similarity = 0.70,
    style   = 0.0,       # any style push makes this saccharine
    boost   = False,
)


def key():
    k = os.environ.get("ELEVENLABS_API_KEY")
    if not k:
        sys.exit("Set ELEVENLABS_API_KEY first:\n  export ELEVENLABS_API_KEY=\"sk_...\"")
    return k


def api(path, data=None, raw=False):
    req = urllib.request.Request(
        API + path,
        data=json.dumps(data).encode() if data else None,
        headers={"xi-api-key": key(), "Content-Type": "application/json"},
        method="POST" if data else "GET",
    )
    try:
        with urllib.request.urlopen(req) as r:
            return r.read() if raw else json.load(r)
    except urllib.error.HTTPError as e:
        sys.exit(f"ElevenLabs API error {e.code}: {e.read().decode()[:400]}")


def list_voices():
    for v in api("/voices")["voices"]:
        lab = v.get("labels", {})
        bits = " ".join(f"{k}={lab[k]}" for k in ("gender", "accent", "age") if k in lab)
        print(f"{v['voice_id']}  {v['name']}   {bits}")


def parse(path):
    """-> [('speak', text) | ('pause', seconds), ...]"""
    items, buf = [], []
    for line in open(path, encoding="utf-8"):
        s = line.strip()
        if not s or s.startswith("#"):
            continue
        m = re.fullmatch(r"\[\[\s*([\d.]+)\s*\]\]", s)
        if m:
            if buf:
                items.append(("speak", " ".join(buf))); buf = []
            items.append(("pause", float(m.group(1))))
        else:
            buf.append(s)
    if buf:
        items.append(("speak", " ".join(buf)))
    return items


def render(text, cfg, cache):
    h = hashlib.sha1(json.dumps([text, cfg["voice"], cfg["model"], cfg["speed"],
                                 cfg["stability"], cfg["similarity"], cfg["style"]],
                                sort_keys=True).encode()).hexdigest()[:16]
    dst = os.path.join(cache, h + ".mp3")
    if os.path.exists(dst):
        return dst, True
    audio = api(f"/text-to-speech/{cfg['voice']}", {
        "text": text,
        "model_id": cfg["model"],
        "voice_settings": {
            "stability": cfg["stability"],
            "similarity_boost": cfg["similarity"],
            "style": cfg["style"],
            "use_speaker_boost": cfg["boost"],
            "speed": cfg["speed"],
        },
    }, raw=True)
    open(dst, "wb").write(audio)
    return dst, False


def ff(cmd):
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode:
        sys.exit(f"ffmpeg failed:\n{' '.join(cmd)}\n{r.stderr[-600:]}")


def dur(p):
    return float(subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration",
         "-of", "default=nw=1:nk=1", p], capture_output=True, text=True).stdout)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("script", nargs="?"); ap.add_argument("output", nargs="?")
    ap.add_argument("--voice"); ap.add_argument("--model")
    ap.add_argument("--speed", type=float); ap.add_argument("--stability", type=float)
    ap.add_argument("--list-voices", action="store_true")
    ap.add_argument("--dry-run", action="store_true",
                    help="show passages, pauses and estimated cost; render nothing")
    a = ap.parse_args()

    if a.list_voices:
        list_voices(); return
    if not a.script or not a.output:
        ap.error("need a script and an output filename")

    cfg = dict(DEFAULTS)
    for f in ("voice", "model", "speed", "stability"):
        if getattr(a, f) is not None:
            cfg[f] = getattr(a, f)
    if not cfg["voice"]:
        sys.exit("No voice set. Run --list-voices, then either pass --voice <id>\n"
                 "or: export SAFERISE_VOICE_ID=\"<id>\"")

    items = parse(a.script)
    speak = [t for k, t in items if k == "speak"]
    chars = sum(len(t) for t in speak)
    pause_total = sum(t for k, t in items if k == "pause")

    print(f"passages   {len(speak)}")
    print(f"characters {chars:,}  (~{chars:,} credits)")
    print(f"pauses     {pause_total:.0f}s = {pause_total/60:.1f} min")
    if a.dry_run:
        for k, t in items:
            print(f"  [{t:>5.1f}s pause]" if k == "pause" else f"  {t[:90]}")
        return

    cache = os.path.join(os.path.dirname(os.path.abspath(a.script)), ".cache")
    os.makedirs(cache, exist_ok=True)
    tmp = tempfile.mkdtemp()
    parts, speech, cached = [], 0.0, 0

    i = 0
    for kind, val in items:
        if kind == "speak":
            src, was_cached = render(val, cfg, cache)
            cached += was_cached
            seg = os.path.join(tmp, f"s{i:03d}.wav")
            ff(["ffmpeg", "-y", "-v", "error", "-i", src,
                "-ar", str(SR), "-ac", str(CH), seg])
            parts.append(seg); speech += dur(seg)
            print(f"  {'cached ' if was_cached else 'rendered'}  {val[:70]}")
        else:
            sil = os.path.join(tmp, f"p{i:03d}.wav")
            ff(["ffmpeg", "-y", "-v", "error", "-f", "lavfi",
                "-i", f"anullsrc=r={SR}:cl=stereo", "-t", str(val), sil])
            parts.append(sil)
        i += 1

    lst = os.path.join(tmp, "list.txt")
    with open(lst, "w") as f:
        for p in parts:
            f.write(f"file '{p}'\n")

    ff(["ffmpeg", "-y", "-v", "error", "-f", "concat", "-safe", "0", "-i", lst,
        "-af", f"adelay={int(HEAD_TAIL*1000)}|{int(HEAD_TAIL*1000)},"
               f"apad=pad_dur={HEAD_TAIL},"
               f"loudnorm=I={TARGET_I}:TP={TARGET_TP}:LRA={TARGET_LRA}",
        "-ar", str(SR), "-ac", str(CH), "-b:a", BITRATE, a.output])

    total = speech + pause_total + 2 * HEAD_TAIL
    print(f"\nspeech     {speech/60:5.2f} min")
    print(f"silence    {pause_total/60:5.2f} min")
    print(f"total      {total/60:5.2f} min")
    print(f"cached     {cached}/{len(speak)} passages (no credits spent on those)")
    print(f"written    {a.output}")


if __name__ == "__main__":
    main()
