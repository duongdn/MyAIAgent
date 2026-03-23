---
name: Monday daily report starts from last Friday
description: When running daily report on Monday, the period starts from last Friday 8AM
type: feedback
---

On Monday, the last daily report was Friday. So the monitoring period is Friday 8AM → Monday current time. Do NOT blindly trust the `last_run` value in `.monitoring-timelines.json` — it may be stale.

**Why:** User corrected when Thursday's timestamp was used instead of Friday.
**How to apply:** Always calculate expected last run: Mon → last Fri. Tue-Fri → previous weekday. Use the calculated date if the file value is older.
