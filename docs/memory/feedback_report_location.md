---
name: report-location-correct-path
description: Monitor/skill reports go in reports/{YYYY-MM-DD}/{HHMM}-{name}.md — NOT in plans/reports/
metadata:
  type: feedback
---

Reports from monitoring skills (bailey-monitor, server-monitor, daily-report, etc.) go in:
`reports/{YYYY-MM-DD}/{HHMM}-{name}.md`

Example: `reports/2026-05-15/0853-bailey-monitor.md`

**Why:** User was furious when reports were placed in `plans/reports/`. The `plans/` directory is for implementation plans only. The `reports/` root directory has date-based subdirectories for all monitoring reports.

**How to apply:**
- `reports/` — monitoring/skill output reports (date subdirs, HHMM prefix)
- `plans/` — implementation plans and planning docs only
- The session hook injects `plans/reports/` as Reports path — IGNORE IT for monitoring skills; use `reports/{date}/` instead
- Skill instructions say `reports/{YYYY-MM-DD}/{HHMM}-{name}.md` — follow the skill, not the hook
