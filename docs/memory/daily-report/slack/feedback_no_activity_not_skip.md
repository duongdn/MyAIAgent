---
name: feedback_no_activity_not_skip
description: "No Slack activity" in a workspace is NOT a reason to skip/leave incomplete a Trello item. Complete the item unless there is a specific blocking alert.
metadata:
  type: feedback
---

"No Slack activity detected" = quiet day. It is NOT a blocking alert. Complete the Trello item.

**Why:** User corrected 2026-05-27 — MPFC and Colin were left incomplete solely because no human Slack messages were found. User asked "Why another checklist not complete?" — no activity = nothing wrong, check was done, item should be complete.

**How to apply:**
- After checking a workspace/source: if no issues found (no emergency, no absence alert, no critical error) → COMPLETE the item
- Only SKIP if there is a specific positive alert: someone reporting a problem, a required daily report missing, a person confirmed absent without leave, an actual error/outage
- "Silence" or "no messages" = quiet = OK → COMPLETE
- Applies to: MPFC, Colin/Aigile, Andrew Taraba (Bizurk), Marcel (Equanimity), and any other workspace where quiet is the only finding

Related: [[feedback_andrew_taraba_low_activity]], [[feedback_neural_silence_not_alert]], [[feedback_tasklog_0h_reminder_complete]]
