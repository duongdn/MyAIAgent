---
name: feedback_timeline_update_critical
description: CRITICAL — MUST update .monitoring-timelines.json at end of EVERY monitoring run, recurring failure
type: feedback
---

MUST update config/.monitoring-timelines.json at the end of EVERY monitoring run (daily report, refresh, alert).

**Why:** User extremely frustrated — "what the hell??? why you keep not update the timeline. This is SILLY mistake happen multiple time!!!" This has failed at least 3 times. Non-negotiable.

**How to apply:**
1. After writing report file, IMMEDIATELY update the corresponding timeline in .monitoring-timelines.json
2. daily_report run → update daily_report.last_run AND alert.last_run
3. refresh run → update ONLY refresh.last_run
4. alert run → update ONLY alert.last_run
5. Verify the file was written by reading it back
6. NEVER skip this step, NEVER defer it
