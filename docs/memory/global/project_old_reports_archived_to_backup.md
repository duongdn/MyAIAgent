---
name: old_reports_archived_to_backup
description: Report folders older than 7 days live in reports/backup/YYYY-MM-DD/, moved by every daily-report full run
metadata:
  type: project
---
Since 2026-10-09, every `/me:daily-report` full run (cron + interactive) ends with `bash scripts/archive-old-reports.sh`, moving `reports/YYYY-MM-DD/` older than 7 days into `reports/backup/YYYY-MM-DD/`.
**Why:** user found reports/ too long.
**How to apply:** when looking up an old report (Arthur tracker, money-allocation, past digests), search `reports/backup/*/` too.
