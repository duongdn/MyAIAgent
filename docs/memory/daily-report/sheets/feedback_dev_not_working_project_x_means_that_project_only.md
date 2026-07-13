---
name: feedback_dev_not_working_project_x_means_that_project_only
description: "When a dev says 'not working on Project X today', that means Project X only — they may still have hours on other projects."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 93d3428d-d58a-4cde-9afe-1610d3aceef8
---

When a dev's Matrix/Slack message says they didn't work on a specific project, **only that project is 0h**. Never conclude the dev didn't work at all.

**Why:** On 2026-06-09, TuanNT said "hôm qua John Yi k làm" (John Yi didn't work yesterday). Report wrote "RESOLVED — not working Jun 8". In reality TuanNT had 8h total: 6.5h Paturevision + 1.5h Neural. User: "TuanNT work 8h yesterday !!!"

**How to apply:**
- "Not working [project]" → set that project's hours to 0, don't skip the dev's other sheets
- Always check ALL known sources before concluding a dev has 0h for the day — since 2026-07-13, Workstream is primary for every project except Bailey (see [[reference_workstream]]), so "all sources" now means all Workstream projects + the Bailey/Paturevision sheet, not "all 11 Google Sheets" the way it used to.
- For TuanNT specifically: do NOT hardcode a fixed source count (has been claimed as 3, 4, and 5 sheets in different old notes — all superseded, and now largely moot since most of those projects moved to Workstream). Check all Workstream projects + Bailey/Paturevision sheet every time, per [[feedback_tuannt_consolidated]] and [[feedback_check_workstream_before_flagging_shortfall]] — hardcoded subsets are the single most common cause of false 0h/shortfall alerts for this dev.
