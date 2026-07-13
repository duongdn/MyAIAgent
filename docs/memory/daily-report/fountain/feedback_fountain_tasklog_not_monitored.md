---
name: feedback_fountain_tasklog_not_monitored
description: "Fountain still runs the full MANDATORY 5-part checklist (incl. task log actuals + plan-vs-actual) — this file ONLY turns off per-dev 0h ALERTING/reminders, it does not remove Part 2/3 from the report. Re-confirmed by user 2026-07-13: Trinh still sends weekly Matrix plan, task log still tracked."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 93d3428d-d58a-4cde-9afe-1610d3aceef8
---

Do NOT send a Matrix reminder or flag a Trello-blocking ALERT for an individual Fountain dev's 0h day (ViTHT, ThinhT, VuTQ, PhatDLT, HungPN, HaVS, etc.). This does NOT mean skip retrieving/reporting the data — see [[feedback_fountain_kunal_checklist]], the 5-part checklist is still mandatory and unaffected by this file.

**Why:** 2026-06-09 — user: "No need to track time of Fountain anymore, this is not my job anymore" (said in the context of not wanting per-dev reminder nagging, not about dropping the report sections — re-confirmed 2026-07-13 when this file was flagged as possibly stale: Trinh still sends the weekly Matrix plan and task-log tracking is still active).

**How to apply:**
- Part 1 (Matrix weekly plan), Part 2 (task log actuals), Part 3 (plan vs actual table), Part 4 (capacity/runway), Part 5 (over-estimate tracking) — ALL still required every report, per [[feedback_fountain_kunal_checklist]].
- The only thing this file turns off: don't treat a single dev's 0h day as a Trello-blocking alert, and don't send them a Matrix reminder for it (unlike other projects' 0h handling).
- If a dev is significantly under plan for the WEEK (not just one 0h day), that's still visible via the Plan vs Actual table (Part 3) — just don't escalate it as a person-status alert.
