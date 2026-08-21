---
name: feedback_siteground_disk_81pct_staging_copies
description: 2026-08-21 Bailey monitor found Siteground disk at 81% used (WARNING threshold), mostly staging site copies under ~/www — candidate for cleanup
metadata:
  type: feedback
---

2026-08-21 run (via SSH `Bailey.cpanel`, see [[feedback_siteground_captcha_no_ssh_fallback]]) found Siteground SSD at 81% used — crosses the >70% WARNING threshold in the skill's status rules (`.claude/commands/me/bailey-monitor.md` Subtask 7/8). Breakdown showed the bulk is staging site copies under `~/www`, not the live site or genuine growth.

**Why:** First run where the SSH fallback actually returned data (prior runs reported Siteground unavailable), so this is the first real visibility into disk composition — likely been climbing unnoticed.

**How to apply:** Flag as WARNING in future Bailey monitor local reports until addressed. Unresolved question for the user: whether to clean up old staging copies. Don't silently downgrade to OK once the underlying zips/staging dirs are actually removed — re-check via SSH `du -sh */` each run.
