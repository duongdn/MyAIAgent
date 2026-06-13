---
name: feedback_recheck_must_fill_missing_data
description: Recheck mode must re-run sources to supply missing data (BLOCKED, expired, unavailable), not just fix Trello items
metadata:
  type: feedback
---

Recheck is NOT only about Trello items. If the existing report has any section with missing data, the recheck MUST also re-run those sources and fill in real data.

**Why:** On 2026-06-13, recheck only fixed Trello items but left Fountain "BLOCKED: Matrix token expired" and Upwork "All sessions expired" in the report unchanged. User said "why the recheck not supply missing info".

**How to apply:** After fixing Trello, scan the report for: "BLOCKED", "token expired", "session expired", "All sessions expired", "Data unreliable", "cached plan". For each: refresh auth → re-run fetch → overwrite section with real data. Only accept failure after 2 genuine attempts.
