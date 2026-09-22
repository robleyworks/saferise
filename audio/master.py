#!/usr/bin/env python3
"""
SafeRise master chain — two-pass loudnorm to the shipped-library target.

Target adopted 22 Sep 2026 after measuring the 21 shipped masters, which sit at
-14.3 to -14.7 LUFS rather than the -16.0 that LOUDNESS-SPEC.md documented.
Matching them is deliberate: a 1.5 LU step between protocols is audible, and on
a meditation track it reads as the guide receding.

Linear normalisation is preferred and the LRA target is deliberately permissive.
Meditation audio is *supposed* to have a wide loudness range -- twenty-second
silences between spoken passages are the content, not a fault. Forcing LRA down
to 9 would compress the gaps upward and flatten exactly what the form depends on.

Usage:
    python3 master.py in.mp3 out.mp3
    python3 master.py --measure file.mp3      # report only, write nothing
"""
import subprocess, sys, json, argparse, os

TARGET_I, TARGET_TP, TARGET_LRA = -14.13, -1.0, 20.0   # ask -14.13, land -14.5 after encode
PRE_TP = -2.0   # headroom before lossy encode: MP3 raises inter-sample peaks
TOL_I, SR, CH, BITRATE = 0.5, 48000, 2, "192k"

def ff(cmd):
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode:
        sys.exit("ffmpeg failed:\n" + " ".join(cmd) + "\n" + r.stderr[-900:])
    return r

def measure(path):
    r = ff(["ffmpeg","-nostdin","-i",path,"-af",
            f"loudnorm=I={TARGET_I}:TP={TARGET_TP}:LRA={TARGET_LRA}:print_format=json",
            "-f","null","-"])
    txt = r.stderr
    blob = txt[txt.rindex("{"):txt.rindex("}")+1]
    return json.loads(blob)

def tail_ok(path):
    """Spec: no fade below -45 dBFS in the final 10 s. A track ending in true
       silence reads as a dropped connection."""
    dur = float(ff(["ffprobe","-v","error","-show_entries","format=duration",
                    "-of","default=nw=1:nk=1",path]).stdout)
    start = max(0, dur - 10)
    r = ff(["ffmpeg","-nostdin","-ss",str(start),"-i",path,"-af","volumedetect",
            "-f","null","-"])
    for line in r.stderr.splitlines():
        if "max_volume" in line:
            return float(line.split(":")[1].strip().split()[0]), dur
    return None, dur

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("src"); ap.add_argument("dst", nargs="?")
    ap.add_argument("--measure", action="store_true")
    a = ap.parse_args()

    m = measure(a.src)
    print(f"  in   I={m['input_i']:>7} LUFS  TP={m['input_tp']:>6} dBTP  LRA={m['input_lra']:>6} LU")
    if a.measure or not a.dst:
        return

    # pass two: feed the measured values back so ffmpeg applies a known gain
    # rather than estimating one. Single-pass loudnorm is not acceptable here.
    f = (f"loudnorm=I={TARGET_I}:TP={PRE_TP}:LRA={TARGET_LRA}"
         f":measured_I={m['input_i']}:measured_TP={m['input_tp']}"
         f":measured_LRA={m['input_lra']}:measured_thresh={m['input_thresh']}"
         f":offset={m['target_offset']}:linear=true:print_format=summary")
    ff(["ffmpeg","-nostdin","-y","-v","error","-i",a.src,"-af",f,
        "-ar",str(SR),"-ac",str(CH),"-b:a",BITRATE,a.dst])

    v = measure(a.dst)
    i, tp, lra = float(v["input_i"]), float(v["input_tp"]), float(v["input_lra"])
    mx, dur = tail_ok(a.dst)
    ok_i  = abs(i - (-14.5)) <= TOL_I
    ok_tp = tp <= TARGET_TP + 0.05
    ok_tl = mx is not None and mx > -45.0
    print(f"  out  I={i:>7.2f} LUFS  TP={tp:>6.2f} dBTP  LRA={lra:>6.2f} LU  "
          f"tail_max={mx} dBFS  {dur/60:.1f} min")
    print(f"  {'PASS' if (ok_i and ok_tp and ok_tl) else 'FAIL'} "
          f"[I {'ok' if ok_i else 'OUT'} · TP {'ok' if ok_tp else 'OVER'} · tail {'ok' if ok_tl else 'SILENT'}]")

main()
