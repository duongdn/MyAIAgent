---
name: project_workstream_weekly_finalization_friday_cron
description: Friday 17:40 cron auto-submits Workstream Weekly Report Finalization (DM "Submit weekly report") for all projects; 422 = pending review blocks
metadata:
  type: project
---

Added 2026-10-12 after BinhNT reminder in Direct Manager room: DM must review All Task Log + submit weekly report every Friday for finance.

- API: `GET /finalization/status?projectId&weekStart`, `POST /finalization/submit {projectId, weekStart}`; 422 PENDING_REVIEW_BLOCKING if charged hours still Pending.
- Script `scripts/workstream-weekly-finalization-submit.js` (dry-run default, `--submit`, `--week`, `--project`); cron `40 17 * * 5 scripts/workstream-weekly-finalization-cron.sh`, logs `tmp/workstream-weekly-finalization-logs/`.
- Separate from the 17:30 Upwork memo cron [[project_workstream_review_submit_friday_cron]].

**Why:** user wanted it automated like the Upwork memo cron.
**How to apply:** weekly-report #3 shows status per project; don't add a second cron.
