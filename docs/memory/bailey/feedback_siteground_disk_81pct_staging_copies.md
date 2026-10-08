---
name: feedback_siteground_disk_81pct_staging_copies
description: 2026-08-21 Bailey monitor found Siteground disk at 81% used (WARNING threshold), mostly staging site copies under ~/www — candidate for cleanup
metadata:
  type: feedback
---

2026-08-21 run (via SSH `Bailey.cpanel`, see [[feedback_siteground_captcha_no_ssh_fallback]]) found Siteground SSD at 81% used — crosses the >70% WARNING threshold in the skill's status rules (`.claude/commands/me/bailey-monitor.md` Subtask 7/8). Breakdown showed the bulk is staging site copies under `~/www`, not the live site or genuine growth.

**Why:** First run where the SSH fallback actually returned data (prior runs reported Siteground unavailable), so this is the first real visibility into disk composition — likely been climbing unnoticed.

**How to apply:** Flag as WARNING in future Bailey monitor local reports until addressed. Unresolved question for the user: whether to clean up old staging copies. Don't silently downgrade to OK once the underlying zips/staging dirs are actually removed — re-check via SSH `du -sh */` each run.

**UPDATE 2026-10-02 (recheck 09:40):** now **86% used** (139G/164G on `/home/customer`, 25G free) — crosses the >85% **NOT OK** threshold. `~/www` 41G: pre9.paturevision.fr 23G (was 20G — this is the dir that grows), je-pature 9.0G, staging-sg 6.9G, live paturevision.fr 2.2G (unchanged). Cleanup still never actioned. The 02:05 cron run could not reach Siteground (alias missing at that moment) and posted storage "OK" to customer Slack as the safe default — the alias was back by 09:40, so the safe default hid a real threshold breach. **How to apply:** when Siteground is unavailable and the last known value was already WARNING (≥70%), do not treat "OK safe default" as settled — retry SSH in recheck the same day and carry the last known value into the local report's unresolved list.

**UPDATE 2026-10-09:** Customer (U01B7QMKXD1) asked in #maintenance ~2026-10-04 to delete old Prestashop staging copies ("only need one staging and live"); Nick replied he'd verify first. Until done, keep Prestashop storage NOT OK (86%) in Slack even when Siteground is unreachable, and reference the pending cleanup. Deleting `prestashop2-new`-related staging may also kill the chronic PHP7.2 RuntimeException ([[feedback_prestashop2_php72_composer_chronic_error]]).
