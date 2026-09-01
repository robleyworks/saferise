#!/usr/bin/env python3
"""Repair the four defective Track 03 landing-page photos (band, cost, range,
change). READ-ONLY against the repo and the inventory tree — every original
is copied, never modified or moved. Outputs go entirely to
~/Desktop/SafeRise Fixed/.

Pipeline per slot, in order:
  1. open, convert to RGB
  2. measure Laplacian variance BEFORE any processing; denoise with
     MedianFilter(size=3) only if genuinely noisy (skip if already soft —
     blurring a soft image makes it worse)
  3. content-aware crop to the target aspect ratio: faces (Haar cascade) ->
     saliency (cv2.saliency) -> edge energy -> centre/45%-from-top, in that
     priority order, biasing the crop window toward the region of interest
     rather than the frame centre
  4. resize to the exact target pixel size, LANCZOS resampling
  5. UnsharpMask(radius=1.4, percent=110, threshold=3)
  6. save as a real baseline JPEG: quality 92, optimize, progressive, sRGB
"""
import csv
import os
import shutil
from pathlib import Path

from PIL import Image, ImageFilter, ImageCms
import numpy as np

try:
    import cv2
    CV2_AVAILABLE = True
except ImportError:
    CV2_AVAILABLE = False

# The installed opencv-contrib-python-headless build ships an EMPTY
# cv2/data/ directory — no haarcascade_*.xml files at all, so frontal/profile
# face detection cannot run without fetching an external file, which this
# run does not have standing permission to do. Detected once at import time
# so every image's report row states the real reason face detection was
# skipped, rather than silently falling through.
FACE_CASCADE_PATH = None
if CV2_AVAILABLE:
    _candidate = os.path.join(cv2.data.haarcascades, "haarcascade_frontalface_default.xml")
    if os.path.exists(_candidate):
        FACE_CASCADE_PATH = _candidate

HOME = Path.home()
REPO = HOME / "Documents/GitHub/saferise"
INVENTORY = HOME / "Desktop" / "SafeRise to Inventory"
OUT_ROOT = HOME / "Desktop" / "SafeRise Fixed"

DIR_ORIGINAL = OUT_ROOT / "01-original"
DIR_FIXED = OUT_ROOT / "02-fixed"
DIR_CURRENT = OUT_ROOT / "03-current"
REPORT_CSV = OUT_ROOT / "_report.csv"

# ---- STEP 1: derive target specs from t1/t2, cross-checked against the
# ratios declared in content/tracks.js (art.band/cost/range/change). ----
T1_T2_PAIRS = {
    "band":   (REPO / "assets/journey/t1-band.jpg", REPO / "assets/journey/t2-band.jpg"),
    "cost":   (REPO / "assets/t1/cost.jpg",          REPO / "assets/t2/cost.jpg"),
    "range":  (REPO / "assets/t1/range.jpg",         REPO / "assets/t2/range.jpg"),
    "change": (REPO / "assets/t1/change.jpg",        REPO / "assets/t2/change.jpg"),
}
DECLARED_RATIOS = {
    "band": (1400, 380),
    "cost": (16, 7),
    "range": (16, 6),
    "change": (16, 7),
}
REPO_SLOT_PATH = {
    "band":   REPO / "assets/t3/band.jpg",
    "cost":   REPO / "assets/t3/cost.jpg",
    "range":  REPO / "assets/t3/range.jpg",
    "change": REPO / "assets/t3/change.jpg",
}

# ---- STEP 2: REVIEW-DEFECT sources in the inventory tree. Where a slot
# has more than one candidate, the largest by pixel area wins (decided at
# runtime in pick_source(), not hardcoded here). ----
CANDIDATES = {
    "band": [INVENTORY / "assets 2/t3/band.jpg", INVENTORY / "band.jpeg"],
    "cost": [INVENTORY / "cost.jpg"],
    "range": [INVENTORY / "range.jpg"],
    "change": [INVENTORY / "change.jpg"],
}


def real_dims_and_format(path):
    with Image.open(path) as im:
        fmt = (im.format or "unknown").lower()
        w, h = im.size
    return w, h, fmt


def derive_specs():
    """STEP 1. Returns {slot: (target_w, target_h)} or raises SystemExit
    with a report if t1/t2 disagree or contradict the declared ratio."""
    print("=== STEP 1 · deriving target specs from Track 01 / Track 02 ===")
    targets = {}
    for slot, (p1, p2) in T1_T2_PAIRS.items():
        w1, h1, _ = real_dims_and_format(p1)
        w2, h2, _ = real_dims_and_format(p2)
        declared_w, declared_h = DECLARED_RATIOS[slot]
        declared_ratio = declared_w / declared_h

        if (w1, h1) != (w2, h2):
            print(f"\nSTOP — {slot}: t1 and t2 disagree.")
            print(f"  t1 ({p1.relative_to(REPO)}): {w1}x{h1}")
            print(f"  t2 ({p2.relative_to(REPO)}): {w2}x{h2}")
            raise SystemExit(1)

        agreed_ratio = w1 / h1
        if abs(agreed_ratio - declared_ratio) > 0.01:
            print(f"\nSTOP — {slot}: agreed t1/t2 size contradicts the declared ratio.")
            print(f"  t1/t2 agree at {w1}x{h1} (ratio {agreed_ratio:.4f})")
            print(f"  content/tracks.js declares {declared_w}/{declared_h} (ratio {declared_ratio:.4f})")
            raise SystemExit(1)

        targets[slot] = (w1, h1)
        print(f"  {slot:8s} t1={w1}x{h1}  t2={w2}x{h2}  declared_ratio={declared_w}/{declared_h}  "
              f"-> target {w1}x{h1}  (agree: yes)")
    return targets


def pick_source(slot):
    """STEP 2. Pick the largest-by-pixel-area candidate for this slot;
    report every candidate considered and which was rejected."""
    cands = [c for c in CANDIDATES[slot] if c.exists()]
    if not cands:
        return None, []
    scored = []
    for c in cands:
        w, h, fmt = real_dims_and_format(c)
        scored.append((c, w, h, fmt, w * h))
    scored.sort(key=lambda t: t[4], reverse=True)
    chosen = scored[0]
    print(f"  {slot}: {len(cands)} candidate(s) found.")
    for c, w, h, fmt, area in scored:
        tag = "CHOSEN" if c == chosen[0] else "rejected"
        print(f"    [{tag}] {c}  {w}x{h}  ({area:,} px^2)  real_format={fmt}")
    return chosen[0], [r[0] for r in scored[1:]]


def measure_sharpness(pil_im):
    """Laplacian-variance blur/noise proxy, via cv2 (numpy-backed, no scipy
    dependency needed)."""
    gray = np.array(pil_im.convert("L"))
    lap = cv2.Laplacian(gray, cv2.CV_64F)
    return float(lap.var())


# Noise vs. softness is a matter of degree, not a hard binary. A genuinely
# noisy image's Laplacian variance is high (lots of high-frequency energy
# from sensor/compression noise); an already-soft image's is low. 150 is a
# conservative floor above which MedianFilter is applied — anything softer
# is left alone rather than blurred further, per the brief.
NOISE_THRESHOLD = 150.0


# ───────────────────────── content-aware ROI detection ─────────────────────

def detect_faces(cv_bgr):
    """Priority 1: Haar cascade frontal + profile face detection.
    Returns (roi_box, faces_list) or (None, []) if unavailable/none found."""
    if not FACE_CASCADE_PATH:
        return None, []
    gray = cv2.cvtColor(cv_bgr, cv2.COLOR_BGR2GRAY)
    frontal = cv2.CascadeClassifier(FACE_CASCADE_PATH)
    faces = list(frontal.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5))
    profile_path = os.path.join(cv2.data.haarcascades, "haarcascade_profileface.xml")
    if os.path.exists(profile_path):
        profile = cv2.CascadeClassifier(profile_path)
        faces += list(profile.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5))
    if not faces:
        return None, []
    xs0 = [x for (x, y, w, h) in faces]
    ys0 = [y for (x, y, w, h) in faces]
    xs1 = [x + w for (x, y, w, h) in faces]
    ys1 = [y + h for (x, y, w, h) in faces]
    roi = (min(xs0), min(ys0), max(xs1), max(ys1))
    return roi, faces


def detect_saliency(cv_bgr):
    """Priority 2: static spectral-residual saliency, thresholded (Otsu),
    largest connected component's bounding box."""
    sal = cv2.saliency.StaticSaliencySpectralResidual_create()
    success, sal_map = sal.computeSaliency(cv_bgr)
    if not success:
        return None
    sal_map = (sal_map * 255).astype("uint8")
    _, thresh = cv2.threshold(sal_map, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    n_labels, labels, stats, _ = cv2.connectedComponentsWithStats(thresh, connectivity=8)
    if n_labels <= 1:
        return None
    # label 0 is background; pick the largest non-background component
    areas = stats[1:, cv2.CC_STAT_AREA]
    largest = 1 + int(np.argmax(areas))
    x = stats[largest, cv2.CC_STAT_LEFT]
    y = stats[largest, cv2.CC_STAT_TOP]
    w = stats[largest, cv2.CC_STAT_WIDTH]
    h = stats[largest, cv2.CC_STAT_HEIGHT]
    if w <= 0 or h <= 0:
        return None
    return (int(x), int(y), int(x + w), int(y + h))


def detect_edge_energy(cv_bgr):
    """Priority 3 (OpenCV-unavailable fallback) / cross-check: Sobel gradient
    energy, middle-80% window per axis."""
    gray = cv2.cvtColor(cv_bgr, cv2.COLOR_BGR2GRAY) if cv_bgr.ndim == 3 else cv_bgr
    gx = cv2.Sobel(gray, cv2.CV_64F, 1, 0, ksize=3)
    gy = cv2.Sobel(gray, cv2.CV_64F, 0, 1, ksize=3)
    energy = np.abs(gx) + np.abs(gy)

    col_energy = energy.sum(axis=0)
    row_energy = energy.sum(axis=1)

    def middle_80_bounds(profile):
        cum = np.cumsum(profile)
        total = cum[-1]
        if total <= 0:
            return 0, len(profile)
        lo = np.searchsorted(cum, total * 0.10)
        hi = np.searchsorted(cum, total * 0.90)
        return int(lo), int(max(hi, lo + 1))

    x0, x1 = middle_80_bounds(col_energy)
    y0, y1 = middle_80_bounds(row_energy)
    return (x0, y0, x1, y1)


def detect_roi(pil_im):
    """Runs the priority chain and returns (method_used, roi_box, faces_detected)."""
    if not CV2_AVAILABLE:
        w, h = pil_im.size
        return "centre-45pct", (0, 0, w, h), 0, "opencv not available"

    cv_bgr = cv2.cvtColor(np.array(pil_im), cv2.COLOR_RGB2BGR)

    face_roi, faces = detect_faces(cv_bgr)
    if face_roi is not None:
        return "faces", face_roi, len(faces), ""

    face_note = "" if FACE_CASCADE_PATH else "cascade files not present in this cv2 build (empty cv2/data/)"

    sal_roi = detect_saliency(cv_bgr)
    if sal_roi is not None:
        return "saliency", sal_roi, 0, face_note

    edge_roi = detect_edge_energy(cv_bgr)
    if edge_roi is not None:
        return "edge-energy", edge_roi, 0, (face_note + "; saliency found no distinct region").strip("; ")

    # Final fallback: the original centre/45%-from-top rule, expressed as a
    # thin full-width ROI at 45% down so fit_ratio_window()'s centroid-based
    # positioning reproduces it exactly (horizontal centre, vertical anchor
    # at 45% from the top) rather than a naive full-frame centre.
    w, h = pil_im.size
    anchor_y = round(h * 0.45)
    roi = (0, max(0, anchor_y - 1), w, min(h, anchor_y + 1))
    return "centre-45pct", roi, 0, (face_note + "; saliency and edge-energy both failed").strip("; ")


def fit_ratio_window(roi, target_ratio, src_w, src_h):
    """Smallest window of target_ratio that fully contains roi, if it fits
    inside the source; else the largest target_ratio window (bounded by the
    source) positioned to keep as much of roi as possible. Returns
    (crop_box, roi_retained_pct, fully_contained)."""
    rx0, ry0, rx1, ry1 = roi
    roi_w, roi_h = max(rx1 - rx0, 1), max(ry1 - ry0, 1)
    roi_cx, roi_cy = (rx0 + rx1) / 2, (ry0 + ry1) / 2
    roi_area = roi_w * roi_h

    # smallest ratio-window containing the full ROI
    cand_w = roi_w
    cand_h = cand_w / target_ratio
    if cand_h < roi_h:
        cand_h = roi_h
        cand_w = cand_h * target_ratio

    fully_contained = cand_w <= src_w and cand_h <= src_h

    if not fully_contained:
        # cap the window at the source's own bounds, at the target ratio
        if src_w / src_h > target_ratio:
            cand_h = src_h
            cand_w = cand_h * target_ratio
        else:
            cand_w = src_w
            cand_h = cand_w / target_ratio

    cand_w = min(cand_w, src_w)
    cand_h = min(cand_h, src_h)

    # centre the window on the ROI centroid, clamped inside the source
    x0 = roi_cx - cand_w / 2
    y0 = roi_cy - cand_h / 2
    x0 = max(0, min(x0, src_w - cand_w))
    y0 = max(0, min(y0, src_h - cand_h))
    x1, y1 = x0 + cand_w, y0 + cand_h

    # overlap between the crop window and the ROI, as % of ROI area
    ix0, iy0 = max(x0, rx0), max(y0, ry0)
    ix1, iy1 = min(x1, rx1), min(y1, ry1)
    inter_area = max(0, ix1 - ix0) * max(0, iy1 - iy0)
    retained_pct = 100.0 * inter_area / roi_area if roi_area > 0 else 100.0

    return (round(x0), round(y0), round(x0 + cand_w), round(y0 + cand_h)), retained_pct, fully_contained


def crop_content_aware(im, target_w, target_h, slot):
    """STEP 3. Content-aware crop to the target aspect ratio. Returns
    (cropped_im, meta_dict)."""
    src_w, src_h = im.size
    target_ratio = target_w / target_h

    method_used, roi, faces_detected, note = detect_roi(im)

    crop_box, roi_retained_pct, fully_contained = fit_ratio_window(roi, target_ratio, src_w, src_h)

    face_clipped = "n"
    if method_used == "faces":
        fx0, fy0, fx1, fy1 = roi
        cx0, cy0, cx1, cy1 = crop_box
        if fx0 < cx0 or fy0 < cy0 or fx1 > cx1 or fy1 > cy1:
            # Stop for THIS image only — report it and let the run continue
            # with the other slots, rather than aborting the whole script.
            raise ValueError(
                f"{slot}: face bounding box would be clipped by the target-ratio "
                f"window (roi={roi} crop={crop_box}) — no valid non-clipping window"
            )

    print(f"    ROI method: {method_used}"
          f"{' (' + note + ')' if note else ''}"
          f"  roi={roi}  crop={crop_box}"
          f"  retained={roi_retained_pct:.1f}%"
          f"  fully_contained={fully_contained}")

    cropped = im.crop(crop_box)
    meta = {
        "method_used": method_used,
        "roi_box": f"{roi}",
        "roi_retained_pct": f"{roi_retained_pct:.1f}",
        "crop_box": f"{crop_box}",
        "faces_detected": faces_detected,
        "any_face_clipped": face_clipped,
    }
    return cropped, meta


def to_srgb(im):
    """Attach/convert to sRGB so 'save as sRGB' is an actual colour-managed
    step, not just an assumption. If the source carries no embedded
    profile, PIL treats it as already sRGB (correct for these consumer
    photos) and this is a no-op."""
    icc = im.info.get("icc_profile")
    if not icc:
        return im
    try:
        import io
        src_profile = ImageCms.ImageCmsProfile(io.BytesIO(icc))
        srgb_profile = ImageCms.createProfile("sRGB")
        return ImageCms.profileToProfile(im, src_profile, srgb_profile, outputMode="RGB")
    except Exception as e:
        print(f"    (sRGB conversion skipped: {e})")
        return im


_SRGB_ICC_BYTES = ImageCms.ImageCmsProfile(ImageCms.createProfile("sRGB")).tobytes()


def process_one(slot, source_path, target_w, target_h):
    im = Image.open(source_path)
    im = to_srgb(im)
    im = im.convert("RGB")

    sharpness_before = measure_sharpness(im)
    denoise = sharpness_before >= NOISE_THRESHOLD
    if denoise:
        im = im.filter(ImageFilter.MedianFilter(size=3))
        print(f"    denoise: APPLIED (Laplacian var {sharpness_before:.1f} >= {NOISE_THRESHOLD})")
    else:
        print(f"    denoise: SKIPPED (Laplacian var {sharpness_before:.1f} < {NOISE_THRESHOLD} — already soft)")

    im, crop_meta = crop_content_aware(im, target_w, target_h, slot)
    im = im.resize((target_w, target_h), Image.LANCZOS)
    im = im.filter(ImageFilter.UnsharpMask(radius=1.4, percent=110, threshold=3))

    sharpness_after = measure_sharpness(im)

    DIR_FIXED.mkdir(parents=True, exist_ok=True)
    out_path = DIR_FIXED / f"{slot}.jpg"
    im.save(out_path, "JPEG", quality=92, optimize=True, progressive=True,
             icc_profile=_SRGB_ICC_BYTES)

    return sharpness_before, denoise, sharpness_after, out_path, crop_meta


def main():
    print(f"cv2 available: {CV2_AVAILABLE}"
          f"{'  (face cascades MISSING from this build)' if CV2_AVAILABLE and not FACE_CASCADE_PATH else ''}")

    targets = derive_specs()

    print("\n=== STEP 2 · selecting sources from REVIEW-DEFECT files ===")
    chosen_sources = {}
    for slot in ("band", "cost", "range", "change"):
        chosen, rejected = pick_source(slot)
        if chosen is None:
            print(f"  {slot}: NO CANDIDATE FOUND — skipping this slot.")
        chosen_sources[slot] = chosen

    print("\n=== STEP 3 · processing (content-aware crop) ===")
    DIR_ORIGINAL.mkdir(parents=True, exist_ok=True)
    DIR_CURRENT.mkdir(parents=True, exist_ok=True)
    report_rows = []

    for slot in ("band", "cost", "range", "change"):
        source_path = chosen_sources[slot]
        target_w, target_h = targets[slot]
        repo_slot = REPO_SLOT_PATH[slot]
        repo_slot_populated = repo_slot.exists()

        print(f"\n-- {slot} --")
        if source_path is None:
            report_rows.append({
                "slot": slot, "source_path": "", "source_dims": "",
                "source_real_format": "", "target_dims": f"{target_w}x{target_h}",
                "denoise_applied": "", "sharpness_before": "", "sharpness_after": "",
                "output_path": "", "repo_slot_path": str(repo_slot),
                "repo_slot_populated": repo_slot_populated,
                "method_used": "", "roi_box": "", "roi_retained_pct": "",
                "crop_box": "", "faces_detected": "", "any_face_clipped": "",
            })
            continue

        src_w, src_h, src_fmt = real_dims_and_format(source_path)
        print(f"    source: {source_path}  {src_w}x{src_h}  real_format={src_fmt}")

        orig_copy = DIR_ORIGINAL / f"{slot}{source_path.suffix}"
        shutil.copy2(source_path, orig_copy)

        try:
            sharp_before, denoise_applied, sharp_after, out_path, crop_meta = process_one(
                slot, source_path, target_w, target_h
            )
        except ValueError as e:
            print(f"    STOP for this image — {e}")
            report_rows.append({
                "slot": slot, "source_path": str(source_path),
                "source_dims": f"{src_w}x{src_h}", "source_real_format": src_fmt,
                "target_dims": f"{target_w}x{target_h}", "denoise_applied": "",
                "sharpness_before": "", "sharpness_after": "", "output_path": "",
                "repo_slot_path": str(repo_slot), "repo_slot_populated": repo_slot_populated,
                "method_used": "faces", "roi_box": "", "roi_retained_pct": "",
                "crop_box": "", "faces_detected": "", "any_face_clipped": "y (STOPPED)",
            })
            continue

        if repo_slot_populated:
            cur_copy = DIR_CURRENT / f"{slot}{repo_slot.suffix}"
            shutil.copy2(repo_slot, cur_copy)
            print(f"    repo slot currently populated: {repo_slot} -> copied to 03-current/")
        else:
            print(f"    repo slot currently EMPTY: {repo_slot} (no src in content/tracks.js)")

        row = {
            "slot": slot,
            "source_path": str(source_path),
            "source_dims": f"{src_w}x{src_h}",
            "source_real_format": src_fmt,
            "target_dims": f"{target_w}x{target_h}",
            "denoise_applied": denoise_applied,
            "sharpness_before": f"{sharp_before:.2f}",
            "sharpness_after": f"{sharp_after:.2f}",
            "output_path": str(out_path),
            "repo_slot_path": str(repo_slot),
            "repo_slot_populated": repo_slot_populated,
        }
        row.update(crop_meta)
        report_rows.append(row)

    print("\n=== STEP 4 · writing report ===")
    fieldnames = ["slot", "source_path", "source_dims", "source_real_format",
                  "target_dims", "denoise_applied", "sharpness_before",
                  "sharpness_after", "output_path", "repo_slot_path",
                  "repo_slot_populated", "method_used", "roi_box",
                  "roi_retained_pct", "crop_box", "faces_detected",
                  "any_face_clipped"]
    with open(REPORT_CSV, "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=fieldnames)
        w.writeheader()
        for row in report_rows:
            w.writerow(row)

    print(f"Wrote: {REPORT_CSV}")
    print(f"01-original/: {DIR_ORIGINAL}")
    print(f"02-fixed/:    {DIR_FIXED}")
    print(f"03-current/:  {DIR_CURRENT}")
    print("\nNothing in the repo or the inventory tree was modified.")


if __name__ == "__main__":
    main()
