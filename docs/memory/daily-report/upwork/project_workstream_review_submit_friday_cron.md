---
name: project_workstream_review_submit_friday_cron
description: Friday 17:30 (+07) system cron auto-submits the weekly Workstream "Check memo logs in Upwork Tracker" request, skipping when already submitted
metadata:
  type: project
---

Added 2026-10-09: crontab `30 17 * * 5 scripts/workstream-review-submit-cron.sh`.

- First a cheap Workstream API precheck. If every "Check memo logs in Upwork Tracker…" request is already Submitted, it exits with no Claude run (user often submits manually earlier).
- Otherwise it runs `claude -p "/me:workstream-review-submit --submit"`.
- Logs go to `tmp/workstream-review-submit-logs/`.

**Why:** the user asked for automation but may run it by hand before 17:30.

**How to apply:** do not create a second cron for this. To change the time, edit that crontab line.
