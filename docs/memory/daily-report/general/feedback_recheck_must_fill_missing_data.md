---
name: feedback_recheck_must_fill_missing_data
description: Recheck mode must re-run sources to supply missing data (BLOCKED, expired, unavailable), not just fix Trello items
metadata:
  type: feedback
---

Recheck is NOT only about Trello items. If the existing report has any section with missing data, the recheck MUST also re-run those sources and fill in real data.

**Why:** On 2026-06-13, recheck only fixed Trello items but left Fountain "BLOCKED: Matrix token expired" and Upwork "All sessions expired" in the report unchanged. User said "why the recheck not supply missing info".

**How to apply:** After fixing Trello, scan the report for: "BLOCKED", "token expired", "session expired", "All sessions expired", "Data unreliable", "cached plan". For each: refresh auth → re-run fetch → overwrite section with real data. Only accept failure after 2 genuine attempts.

**Also re-apply classification rules, not just auth fixes (added 2026-06-25):** Recheck must also catch items left ○ for reasons OTHER than auth failure — e.g. "no activity" was used as a skip reason on Franc/MPFC/Marcel/Raymond/Andrew Taraba/Bailey-GGS even though [[feedback_no_activity_not_skip]] and [[feedback_low_activity_devs_not_alert]] already say silence ≠ alert for those exact items. A recheck that only chases "token expired" strings and ignores wrongly-skipped no-activity items will under-complete the Trello card. Scan the Trello status list itself, not just the report's error strings, and cross-check each ○ item's actual gate condition before assuming it needs new data.
