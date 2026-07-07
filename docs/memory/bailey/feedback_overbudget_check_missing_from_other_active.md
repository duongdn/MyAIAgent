---
name: feedback_overbudget_check_missing_from_other_active
description: bailey-task-monitor.py only checks overbudget on the "Has Bug" list — 6 fixed-cost tasks were silently overbudget (up to +148.7%) with no bug flag, so the script never surfaced them
metadata:
  type: feedback
---

`scripts/bailey-task-monitor.py`'s overbudget check (`actual > est_buffer`, using Col J "Estimated for Dev with buffer") only runs inside `fmt_bug_bullet` for tasks in the `has_bugs` list. The "Other Active Tasks" section computes and displays `est_buffer` but never compares it to actual — so a fixed-cost task can be significantly over budget and render as a plain unflagged bullet.

**Why:** Manual 2026-07-07 run found 6 such tasks, 3 of them >30% over (Mobile Location management +148.7%, Grazing Software Filters +78.1% and still in-progress, Mobile Picking & Stock +59.6%). None had a bug flag so the script's own bug-only overbudget check missed all of them. [[feedback_customer_direct_ask_universal_gate]] — same pattern as the Franc miss: template output covered the letter of the check, not the actual risk.

**How to apply:**
- When running `bailey-task-monitor.py`, manually compute `actual - est_buffer` for every fixed-cost row in "Other Active Tasks", not just "Has Bug" — flag anything over 0, call out >30% over as high-severity.
- Better: fix the script to add the same `overbudget`/`over_pct` computation and ⚠️ marker to the "Other Active Tasks" formatter (`fmt_task_bullet` around line ~145 and the inline loop ~200), not just `fmt_bug_bullet`.
- [[feedback-bailey-paturevision-billing]] — these are fixed-cost/WBS billed tasks, so overage eats margin rather than auto-billing the client; still worth flagging to the user.
