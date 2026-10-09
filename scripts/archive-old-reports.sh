#!/usr/bin/env bash
# Move reports/YYYY-MM-DD folders older than N days (default 7, UTC+7) into reports/backup/YYYY-MM-DD.
# Usage: scripts/archive-old-reports.sh [days] [--dry-run]
set -euo pipefail
cd "$(dirname "$0")/.."
DAYS="${1:-7}"; DRY="${2:-}"
CUTOFF=$(TZ='Asia/Ho_Chi_Minh' date -d "-${DAYS} days" +%F)
mkdir -p reports/backup
moved=0
for d in reports/????-??-??; do
  [ -d "$d" ] || continue
  day=$(basename "$d")
  [[ "$day" < "$CUTOFF" ]] || continue
  dest="reports/backup/$day"
  if [ -n "$DRY" ]; then echo "would move $d -> $dest"; moved=$((moved+1)); continue; fi
  if [ -d "$dest" ]; then
    # merge into existing backup folder, then drop the emptied source
    cp -an "$d"/. "$dest"/ && rm -rf "$d"
  else
    mv "$d" "$dest"
  fi
  moved=$((moved+1))
done
echo "Archived $moved report folder(s) older than $CUTOFF into reports/backup/"
