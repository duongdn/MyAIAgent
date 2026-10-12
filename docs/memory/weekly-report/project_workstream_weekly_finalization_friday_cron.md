---
name: project_workstream_weekly_finalization_friday_cron
description: Fri 18:00 weekly-report cron first auto-submits Workstream Weekly Report Finalization when task log is complete (logs present, leave-aware, no Pending review; hours NOT checked)
metadata:
  type: project
---

Added 2026-10-12 after a BinhNT reminder in the Direct Manager room: every Friday the DM must review All Task Log and submit the weekly report for finance.

- API: `GET /finalization/status?projectId&weekStart`, `POST /finalization/submit {projectId, weekStart}`; returns 422 if charged rows are still Pending review.
- Scripts: `workstream-weekly-finalization-submit.js` (dry-run by default, `--submit`) + `workstream-weekly-tasklog-completeness-check.js`.
- Cron: `0 18 * * 5 scripts/weekly-report-cron.sh` runs finalization, then `/me:weekly-report`. Logs are in `tmp/weekly-report-cron-logs/`.
- Submit rule (user-defined): every active dev (logged on the project this week or last week) has a task log each working day except full-day leave, and nothing is Pending review. **Never check hours/40h**: the user said many devs also work on projects they don't manage.
- Project list = live `GET /review/scope` (open projects only). 403 "Project is closed" = closed project (WordPress Update, Amazing Meds, Elevate365, LegalAtoms as of 2026-10-12), NOT a permission issue. Some projects show `userIsManager:false` though the user says he is DM of all of them.
- Separate from the 17:30 Upwork memo cron [[project_workstream_review_submit_friday_cron]].

**Why:** the user wants this fully automatic. Whatever can't be submitted must be explained clearly in the weekly report.
**How to apply:** weekly-report #3 lists every project with ✅/🔴 reason/❌. Don't add another cron.
