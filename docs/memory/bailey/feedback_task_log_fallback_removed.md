---
name: feedback_task_log_fallback_removed
description: bailey-task-monitor.py no longer falls back to stale Sheet K/L hours when a task has no Workstream match — shows "no WS data" instead
metadata:
  type: feedback
---

User (2026-09-04) said to drop the Sheet task-log fallback entirely: "bỏ task log đi, không dùng nữa". Previously `scripts/bailey-task-monitor.py` used stale Sheet K/L ("Actual"/"Charged") hours whenever a task's Task ID WS didn't match Workstream data (see [[feedback_bailey_dev_actuals_now_on_workstream]]). Now `actual`/`charged` are `None` when there's no WS match, rendered as "no WS data" / "⚠️ no WS data" instead of a stale number.

**Why:** Sheet hours are stale since the 2026-08-16 Workstream migration; showing them (even flagged) risked being read as real numbers. User prefers no data over wrong data.

**How to apply:**
- Tasks without a WS match now show 0 alerts for weekly-monitor-not-paid and no overbudget % (both gated on `actual is not None`) — this REDUCES alert coverage for unmatched tasks (e.g. Grazing Software Desktop/Filters overbudget no longer computed). If overbudget/payment alerts on Sheet-only tasks matter, fix the Task ID WS tagging in the Sheet/Workstream instead of restoring the fallback.
- Sheet columns COL_ACTUAL/COL_CHARGED (K/L) are now unused in the script — only COL_EST_BUFFER (J) and metadata columns are read from Sheet.
