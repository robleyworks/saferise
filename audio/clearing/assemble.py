#!/usr/bin/env python3
"""
Assemble a SafeRise protocol from per-passage renders.

Nothing is cut. Each rendered passage is used whole, with the exact silence
from the manifest placed after it. Word endings cannot be clipped because no
boundary is ever guessed.

Usage:
    python3 assemble.py manifest.txt ./renders out.mp3 [--tempo 1.0]

manifest.txt lines:   <filename>  <silence_after_seconds>
Lines starting with # and blank lines are ignored.
"""
import subprocess, sys, os, tempfile, argparse

SR, CH, BITRATE = 48000, 2, "192k"
TARGET_I, TARGET_TP, TARGET_LRA = -16.0, -1.0, 11.0
HEAD_TAIL = 0.3          # digital silence at start and end

def run(cmd):
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode: sys.exit(f"ffmpeg failed:\n{' '.join(cmd)}\n{r.stderr[-800:]}")
    return r

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("manifest"); ap.add_argument("folder"); ap.add_argument("output")
    ap.add_argument("--tempo", type=float, default=1.0,
                    help="speech speed; 1.0 = as rendered, 0.92 = 8%% slower")
    a = ap.parse_args()

    rows, missing = [], []
    for line in open(a.manifest, encoding="utf-8"):
        line = line.strip()
        if not line or line.startswith("#"): continue
        parts = line.rsplit(None, 1)
        if len(parts) != 2: sys.exit(f"bad manifest line: {line}")
        name, pause = parts[0].strip(), float(parts[1])
        path = os.path.join(a.folder, name)
        (rows if os.path.exists(path) else missing).append((path, pause, name))

    if missing:
        print("MISSING — render these and re-run:")
        for _, _, n in missing: print("   ", n)
        sys.exit(1)

    tmp = tempfile.mkdtemp()
    parts, total_speech, total_silence = [], 0.0, 0.0

    for i, (path, pause, name) in enumerate(rows):
        dur = float(run(["ffprobe","-v","error","-show_entries","format=duration",
                         "-of","default=nw=1:nk=1",path]).stdout)
        seg = os.path.join(tmp, f"s{i:03d}.wav")
        af  = f"atempo={a.tempo}" if a.tempo != 1.0 else "anull"
        run(["ffmpeg","-y","-v","error","-i",path,"-af",af,
             "-ar",str(SR),"-ac",str(CH),seg])
        parts.append(seg); total_speech += dur / a.tempo

        if pause > 0:
            sil = os.path.join(tmp, f"p{i:03d}.wav")
            run(["ffmpeg","-y","-v","error","-f","lavfi","-i",
                 f"anullsrc=r={SR}:cl=stereo","-t",str(pause),sil])
            parts.append(sil); total_silence += pause

    lst = os.path.join(tmp, "list.txt")
    with open(lst,"w") as f:
        for p in parts: f.write(f"file '{p}'\n")

    run(["ffmpeg","-y","-v","error","-f","concat","-safe","0","-i",lst,
         "-af", f"adelay={int(HEAD_TAIL*1000)}|{int(HEAD_TAIL*1000)},"
                f"apad=pad_dur={HEAD_TAIL},"
                f"loudnorm=I={TARGET_I}:TP={TARGET_TP}:LRA={TARGET_LRA}",
         "-ar",str(SR),"-ac",str(CH),"-b:a",BITRATE,a.output])

    total = total_speech + total_silence + 2*HEAD_TAIL
    print(f"passages   {len(rows)}")
    print(f"speech     {total_speech/60:5.2f} min")
    print(f"silence    {total_silence/60:5.2f} min  ({total_silence/total*100:.0f}% of run time)")
    print(f"total      {total/60:5.2f} min")
    print(f"written    {a.output}")

if __name__ == "__main__":
    main()
