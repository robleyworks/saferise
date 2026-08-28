#!/usr/bin/env python3
"""Move files out of the SafeRise inventory tree into an archive, bucket by
bucket, driven by a partition CSV. Never deletes anything — every action is
a move, and every move is logged to _move-log.csv.

Usage: python3 partition_move.py [bucket ...]
  With no arguments, runs all four archive buckets in order:
    ARCHIVE-BULK, ARCHIVE-DUPLICATE, ARCHIVE-DOCS, ARCHIVE-CANDIDATE
  Pass one or more bucket names to run only those (still in the fixed order).
"""
import csv
import shutil
import sys
from pathlib import Path

HOME = Path.home()
PARTITION_CSV = HOME / "Downloads" / "saferise-partition.csv"
SOURCE_ROOT = HOME / "Desktop" / "SafeRise to Inventory"
ARCHIVE_ROOT = HOME / "Desktop" / "SafeRise Archive"
MOVE_LOG = ARCHIVE_ROOT / "_move-log.csv"

SKIP_BUCKETS = {"LIVE", "REVIEW-DEFECT"}
BUCKET_ORDER = ["ARCHIVE-BULK", "ARCHIVE-DUPLICATE", "ARCHIVE-DOCS", "ARCHIVE-CANDIDATE"]

LOG_FIELDS = ["bucket", "source_path", "destination_path", "bytes", "status"]


def load_partition_rows():
    if not PARTITION_CSV.exists():
        print(f"ERROR: partition CSV not found at {PARTITION_CSV}", file=sys.stderr)
        sys.exit(1)
    with open(PARTITION_CSV, encoding="utf-8") as f:
        return list(csv.DictReader(f))


def unique_destination(dest):
    """If dest exists, append -1, -2, ... before the extension until free."""
    if not dest.exists():
        return dest, False
    stem, suffix = dest.stem, dest.suffix
    n = 1
    while True:
        candidate = dest.with_name(f"{stem}-{n}{suffix}")
        if not candidate.exists():
            return candidate, True
        n += 1


def append_log_rows(rows):
    is_new = not MOVE_LOG.exists()
    ARCHIVE_ROOT.mkdir(parents=True, exist_ok=True)
    with open(MOVE_LOG, "a", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=LOG_FIELDS)
        if is_new:
            w.writeheader()
        for row in rows:
            w.writerow(row)


def run_bucket(bucket, rows):
    print(f"\n=== {bucket} ===")
    bucket_rows = [r for r in rows if r["bucket"] == bucket]
    if not bucket_rows:
        print("  (no rows for this bucket)")
        return {"moved": 0, "mb": 0.0, "errors": 0}

    log_rows = []
    moved = 0
    total_bytes = 0
    errors = 0

    for r in bucket_rows:
        relpath = r["relpath"]
        src = SOURCE_ROOT / relpath
        dest = ARCHIVE_ROOT / bucket / relpath

        if not src.exists():
            print(f"  MISSING: {relpath}")
            log_rows.append({
                "bucket": bucket, "source_path": str(src),
                "destination_path": str(dest), "bytes": "",
                "status": "missing-source",
            })
            errors += 1
            continue

        try:
            size = src.stat().st_size
            dest.parent.mkdir(parents=True, exist_ok=True)
            final_dest, renamed = unique_destination(dest)
            shutil.move(str(src), str(final_dest))
            status = "moved-renamed" if renamed else "moved"
            if renamed:
                print(f"  RENAMED (destination existed): {relpath} -> {final_dest.name}")
            log_rows.append({
                "bucket": bucket, "source_path": str(src),
                "destination_path": str(final_dest), "bytes": size,
                "status": status,
            })
            moved += 1
            total_bytes += size
        except OSError as e:
            print(f"  ERROR moving {relpath}: {e}")
            log_rows.append({
                "bucket": bucket, "source_path": str(src),
                "destination_path": str(dest), "bytes": "",
                "status": f"error: {e}",
            })
            errors += 1

    append_log_rows(log_rows)

    mb = total_bytes / (1024 * 1024)
    print(f"  moved: {moved}   MB moved: {mb:.1f}   errors: {errors}")
    return {"moved": moved, "mb": mb, "errors": errors}


def main():
    requested = sys.argv[1:] if len(sys.argv) > 1 else BUCKET_ORDER
    for b in requested:
        if b not in BUCKET_ORDER:
            print(f"ERROR: unknown bucket '{b}'. Valid: {BUCKET_ORDER}", file=sys.stderr)
            sys.exit(1)

    rows = load_partition_rows()

    skipped = [r for r in rows if r["bucket"] in SKIP_BUCKETS]
    print(f"Partition CSV: {len(rows)} rows total. "
          f"Skipping {len(skipped)} rows (LIVE/REVIEW-DEFECT — left in place).")

    ARCHIVE_ROOT.mkdir(parents=True, exist_ok=True)

    summary = {}
    for bucket in requested:
        summary[bucket] = run_bucket(bucket, rows)

    # copy the partition CSV itself into the archive root as an index
    shutil.copy2(PARTITION_CSV, ARCHIVE_ROOT / PARTITION_CSV.name)

    print("\n=== Summary ===")
    total_moved = total_mb = total_errors = 0
    for bucket in requested:
        s = summary[bucket]
        print(f"  {bucket}: {s['moved']} files, {s['mb']:.1f} MB, {s['errors']} errors")
        total_moved += s["moved"]
        total_mb += s["mb"]
        total_errors += s["errors"]
    print(f"  TOTAL: {total_moved} files, {total_mb:.1f} MB, {total_errors} errors")

    remaining = sum(1 for p in SOURCE_ROOT.rglob("*")
                     if p.is_file() and p.name != ".DS_Store" and not p.name.startswith("._"))
    print(f"\nFiles remaining in source tree ({SOURCE_ROOT}): {remaining}")
    print(f"Move log: {MOVE_LOG}")


if __name__ == "__main__":
    main()
