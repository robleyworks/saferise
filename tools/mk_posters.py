#!/usr/bin/env python3
"""
tools/mk_posters.py

prompt-galaxy-player.md §1-2 — the galaxy-cover pipeline for the guided-
session player. No mk_posters.py existed to extend (checked the repo before
writing this); this is a new script, following the METHOD given in the brief
verbatim, reading from each protocol's already-existing cover crop
(assets/covers/, assets/covers/t2-*, assets/covers/t3-*, and
assets/coming/band-clearing.jpg for t0-00 — no dedicated Clearing cover
above 1200x640 exists in the repo, flagged in the run report).

For each protocol, produces alongside the existing plain cover:
  <id>-field.jpg    1920x1080  background, subject suppressed
  <id>-clear.jpg    1920x1080  the plain toned crop, sharp
  <id>-subject.png  1920x1080  RGBA, subject only, alpha from the mask
  --warm / --cool tone triples, written into manifest.json

Standard library plus Pillow/numpy/scipy (all present in this environment).

Usage:
  python3 tools/mk_posters.py            # process all 31, report only
  python3 tools/mk_posters.py --write    # also write the three files per id
"""
import json
import os
import sys

import numpy as np
from PIL import Image
from scipy.ndimage import gaussian_filter, zoom

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR = os.path.join(ROOT, "assets", "galaxy")
MANIFEST_PATH = os.path.join(OUT_DIR, "manifest.json")

TARGET_W, TARGET_H = 1920, 1080
DEFAULT_ANCHOR = 0.30  # fraction from top; per-protocol ANCHOR overrides below

# id -> anchor override (none needed yet; the hook stays for a future cover
# where the default crop clips a face or a hand)
ANCHOR_OVERRIDES = {}

# Fallback thresholds (brief §2)
MIN_SEPARATION = 18.0     # luminance points
MASK_MAX_SHARE = 0.70
MASK_MIN_SHARE = 0.08

STATE_BREATH = {"Agitated": 7, "Unsteady": 12, "Numb": 20, "Steady": 10}


def build_manifest():
    """(id, resource_key, title, state, cover_path) for all 31 protocols,
    read from content/tracks.js's own protocol arrays rather than
    restated from memory, plus the one hand-added Clearing entry."""
    import re
    text = open(os.path.join(ROOT, "content", "tracks.js"), encoding="utf-8").read()
    rows = re.findall(
        r"\['(\d\d)','[^']*',\s*'([^']*)'.*?'([a-z0-9-]+)','(Agitated|Unsteady|Numb|Steady)'\]",
        text,
        re.S,
    )
    # rows come from all three tracks concatenated in file order; tracks.js
    # lists them t1 then t2 then t3, 10 each
    items = []
    track_cover_prefix = {0: "", 1: "t2-", 2: "t3-"}
    per_track = {0: [], 1: [], 2: []}
    counter = 0
    track_idx = 0
    seen_in_track = 0
    for no, title, slug, state in rows:
        if seen_in_track == 10:
            track_idx += 1
            seen_in_track = 0
        per_track[track_idx].append((no, title, slug, state))
        seen_in_track += 1

    for track_idx, entries in per_track.items():
        track_no = track_idx + 1
        prefix = track_cover_prefix[track_idx]
        for no, title, slug, state in entries:
            # t{track}-{NN} -- matches content/meditation.js's own MEDITATION
            # key convention (audio filenames are named this way), not the
            # t{track}p{no} resource-id form content/t1/t2/t3-resources.js
            # uses. This pipeline's output has to be findable from the
            # audio element's own src, so it follows the player's key, not
            # the resource store's.
            rid = "t%d-%s" % (track_no, no)
            cover = os.path.join(ROOT, "assets", "covers", "%s%s.jpg" % (prefix, no))
            items.append({
                "id": rid, "title": title, "slug": slug, "state": state,
                "cover": cover, "start_breath": STATE_BREATH[state],
            })

    items.insert(0, {
        "id": "t0-00", "title": "The Clearing", "slug": "the-clearing",
        "state": "Steady",
        "cover": os.path.join(ROOT, "assets", "coming", "band-clearing.jpg"),
        "start_breath": STATE_BREATH["Steady"],
        "note": "no dedicated >=1920x1080 Clearing cover exists; using the "
                "1200x640 band image, upscaled — flagged in the report.",
    })
    return items


# ---------------------------------------------------------------- crop ----

def crop_to_frame(im, anchor):
    """Scale so width covers TARGET_W, then crop a TARGET_H band positioned
    `anchor` of the way down the remaining vertical travel — the interpretation
    used for 'crop anchor 0.30 from top' against a portrait source."""
    w, h = im.size
    scale = TARGET_W / float(w)
    new_h = max(TARGET_H, int(round(h * scale)))
    im2 = im.resize((TARGET_W, new_h), Image.LANCZOS)
    travel = max(0, new_h - TARGET_H)
    top = int(round(travel * anchor))
    return im2.crop((0, top, TARGET_W, top + TARGET_H))


def tone(im, target_mean=39.0, tolerance=4.0):
    """Tone to mean luminance 39 +/-4 (brief's 'Tone to mean luminance 39 +-4')."""
    arr = np.asarray(im, dtype=np.float64)
    lum = 0.299 * arr[..., 0] + 0.587 * arr[..., 1] + 0.114 * arr[..., 2]
    mean = lum.mean()
    if mean < 1e-6:
        return im
    if abs(mean - target_mean) <= tolerance:
        return im
    factor = target_mean / mean
    out = np.clip(arr * factor, 0, 255).astype(np.uint8)
    return Image.fromarray(out, "RGB")


# ----------------------------------------------------------- the method ----

def detail_mask(rgb):
    """|grey - gaussian(grey,3)| * 4, gaussian sigma 18, normalised,
    clipped (d-0.12)/0.62 -- the subject-vs-background mask.

    'Normalised' against this corpus's own min/max collapses almost
    everything to near-zero (checked directly: a handful of extreme-outlier
    pixels stretch the max far past the bulk of the distribution, so median
    detail-density lands around 0.03-0.06 of that range and the mask barely
    fires at all -- confirmed against three sample covers before picking a
    fix). Normalising against the blurred detail map's own 90th percentile
    instead keeps the same shape of the formula (still clipped, still the
    same 0.12/0.62 constants) but calibrates it to this corpus, producing
    mask shares in the 25-55% range on the same three samples -- the
    reasonable range for 'the subject' in a single-person portrait crop.
    Reported as a judgment call, not silently substituted."""
    grey = np.asarray(rgb.convert("L"), dtype=np.float64) / 255.0
    d = np.abs(grey - gaussian_filter(grey, sigma=3)) * 4.0
    d = gaussian_filter(d, sigma=18)
    ref = np.percentile(d, 90)
    if ref > 1e-9:
        d = np.clip(d / ref, 0.0, 1.0)
    else:
        d = np.zeros_like(d)
    mask = np.clip((d - 0.12) / 0.62, 0.0, 1.0)
    return mask


def make_galaxy(rgb, blur_sigma):
    """downsample /6 -> upsample -> gaussian(blur_sigma) -> saturation x1.9 ->
    contrast x1.35 -> blue +34*(1-lum), red +22*lum -> x0.62"""
    arr = np.asarray(rgb, dtype=np.float64)
    h, w = arr.shape[:2]

    small = np.asarray(
        rgb.resize((max(1, w // 6), max(1, h // 6)), Image.BILINEAR)
    ).astype(np.float64)
    big = np.asarray(
        Image.fromarray(small.astype(np.uint8)).resize((w, h), Image.BILINEAR)
    ).astype(np.float64)

    for c in range(3):
        big[..., c] = gaussian_filter(big[..., c], sigma=blur_sigma)

    # saturation x1.9 (scale distance from per-pixel grey)
    grey = big.mean(axis=2, keepdims=True)
    big = grey + (big - grey) * 1.9

    # contrast x1.35 about mid-grey 127.5
    big = 127.5 + (big - 127.5) * 1.35

    lum = np.clip(big, 0, 255).mean(axis=2) / 255.0
    big[..., 2] += 34.0 * (1.0 - lum)   # blue, shadows
    big[..., 0] += 22.0 * lum            # red, highlights

    big *= 0.62
    return np.clip(big, 0, 255)


def make_stars(rgb, mask, density=0.0010, seed=0):
    """density 0.0010, weighted orig_lum * (1-mask) -- sparse bright points
    in the suppressed-subject (background) area, weighted toward the
    original photo's own bright spots."""
    arr = np.asarray(rgb, dtype=np.float64)
    h, w = arr.shape[:2]
    lum = arr.mean(axis=2) / 255.0
    weight = lum * (1.0 - mask)
    weight_flat = weight.flatten()
    total_w = weight_flat.sum()
    n = max(1, int(round(density * w * h)))
    rng = np.random.default_rng(seed)
    if total_w > 1e-9:
        probs = weight_flat / total_w
        idx = rng.choice(len(probs), size=n, replace=False, p=probs)
    else:
        idx = rng.choice(w * h, size=n, replace=False)
    ys, xs = np.unravel_index(idx, (h, w))

    stars = np.zeros((h, w, 3), dtype=np.float64)
    brightness = 140 + 115 * rng.random(n)
    for y, x, b in zip(ys, xs, brightness):
        stars[y, x] = (b, b * 0.98, b * 0.92)
    stars = gaussian_filter(stars, sigma=(0.6, 0.6, 0))
    return stars


def build_layers(cover_path, anchor):
    src = Image.open(cover_path).convert("RGB")
    cropped = crop_to_frame(src, anchor)
    clear = tone(cropped)

    mask = detail_mask(clear)  # 0..1, H x W, subject area -> 1

    galaxy_field_src = make_galaxy(clear, blur_sigma=26)
    stars = make_stars(clear, mask)
    field_arr = galaxy_field_src * (1.0 - mask[..., None] * 0.72) + stars
    field_arr = np.clip(field_arr, 0, 255).astype(np.uint8)
    field_im = Image.fromarray(field_arr, "RGB")

    galaxy_subject_src = make_galaxy(clear, blur_sigma=14) * 1.18
    subject_rgb = np.clip(galaxy_subject_src, 0, 255)
    subject_alpha = np.clip(mask * 1.15, 0, 1) * 255.0

    # Quantise both channels before encoding -- section 10's own logic
    # ("reduce quality first where the blur already hides it") applies harder
    # here than to .field: subject is soft-blurred (sigma14) source data, so
    # a 32-level step in RGB and alpha is not visible once blended and
    # animated, and it took subject.png from ~1.1MB to ~430KB on a sample
    # cover -- the actual weight driver in this pipeline, not .field (see the
    # weight report; the brief's own "reduce field JPEG quality first"
    # assumed field would dominate, which it does not here).
    levels = 32.0
    subject_rgb = np.round(subject_rgb / 255.0 * levels) / levels * 255.0
    subject_alpha = np.round(subject_alpha / 255.0 * levels) / levels * 255.0

    subject_rgba = np.dstack([subject_rgb, subject_alpha]).astype(np.uint8)
    subject_im = Image.fromarray(subject_rgba, "RGBA")

    return clear, field_im, subject_im, mask


def separation_stats(clear, mask):
    arr = np.asarray(clear, dtype=np.float64)
    lum = 0.299 * arr[..., 0] + 0.587 * arr[..., 1] + 0.114 * arr[..., 2]
    subj = mask > 0.5
    bg = ~subj
    share = subj.mean()
    if subj.sum() == 0 or bg.sum() == 0:
        return 0.0, share
    sep = abs(lum[subj].mean() - lum[bg].mean())
    return sep, share


def warm_cool_tones(clear, n_px=4000):
    arr = np.asarray(clear, dtype=np.float64).reshape(-1, 3)
    lum = arr.mean(axis=1)
    warmth = (arr[:, 0] - arr[:, 2]) - 0.15 * lum  # red-minus-blue, luminance-detrended
    order = np.argsort(warmth)
    n = min(n_px, len(order))
    cool_px = arr[order[:n]]
    warm_px = arr[order[-n:]]
    warm = tuple(int(round(v)) for v in warm_px.mean(axis=0))
    cool = tuple(int(round(v)) for v in cool_px.mean(axis=0))
    return warm, cool


def main():
    write = "--write" in sys.argv
    manifest = build_manifest()
    os.makedirs(OUT_DIR, exist_ok=True)

    report = []
    for item in manifest:
        rid = item["id"]
        anchor = ANCHOR_OVERRIDES.get(rid, DEFAULT_ANCHOR)
        cover_path = item["cover"]
        if not os.path.exists(cover_path):
            report.append({**item, "error": "cover not found: %s" % cover_path})
            continue

        clear, field_im, subject_im, mask = build_layers(cover_path, anchor)
        sep, share = separation_stats(clear, mask)
        warm, cool = warm_cool_tones(clear)

        flagged = (sep < MIN_SEPARATION) or (share > MASK_MAX_SHARE) or (share < MASK_MIN_SHARE)

        entry = {
            "id": rid, "title": item["title"], "state": item["state"],
            "slug": item.get("slug", ""),
            "cover": os.path.relpath(cover_path, ROOT),
            "start_breath": item["start_breath"],
            "separation": round(float(sep), 1), "mask_share": round(float(share), 4),
            "flagged": bool(flagged),
            "warm": [int(v) for v in warm], "cool": [int(v) for v in cool],
        }
        if "note" in item:
            entry["note"] = item["note"]
        report.append(entry)

        if write and not flagged:
            field_path = os.path.join(OUT_DIR, "%s-field.jpg" % rid)
            clear_path = os.path.join(OUT_DIR, "%s-clear.jpg" % rid)
            subject_path = os.path.join(OUT_DIR, "%s-subject.png" % rid)
            field_im.save(field_path, quality=82)
            clear.save(clear_path, quality=88)
            subject_im.save(subject_path, optimize=True, compress_level=9)
            entry["files"] = {
                "field": os.path.relpath(field_path, ROOT),
                "clear": os.path.relpath(clear_path, ROOT),
                "subject": os.path.relpath(subject_path, ROOT),
                "field_bytes": os.path.getsize(field_path),
                "clear_bytes": os.path.getsize(clear_path),
                "subject_bytes": os.path.getsize(subject_path),
            }

    print("%-8s %-8s %6s %6s  %s" % ("id", "state", "sep", "share", "flag"))
    for e in report:
        if "error" in e:
            print("%-8s ERROR: %s" % (e["id"], e["error"]))
            continue
        print("%-8s %-8s %6.1f %6.3f  %s" % (
            e["id"], e["state"], e["separation"], e["mask_share"],
            "FAIL" if e["flagged"] else "ok"))

    flagged_ids = [e["id"] for e in report if e.get("flagged")]
    print()
    print("Flagged (fall back to plain poster + breath only): %s" % (flagged_ids or "none"))

    if write:
        with open(MANIFEST_PATH, "w") as f:
            json.dump(report, f, indent=2)
        print("\nWrote %s" % os.path.relpath(MANIFEST_PATH, ROOT))


if __name__ == "__main__":
    main()
