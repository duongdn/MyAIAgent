---
name: feedback_tasklog_0h_reminder_complete
description: If the only issue is a missing task log (0h) and a Matrix reminder was sent, still mark the Trello item COMPLETE — reminder IS the action.
metadata:
  type: feedback
---

If a developer has 0h in task log but:
1. No leave marker (so it's a real gap)
2. Matrix reminder was already sent

→ **Mark the Trello item COMPLETE.** The reminder is the full action required. There is nothing more to do on the Trello item.

**Why:** User clarified 2026-05-27: "if issue is only task log and reminder is sent, you can complete it as nothing to do more to complete."

**How to apply:**
- After sending Matrix reminder for 0h dev → complete any Trello item gated on that dev's task log
- Only SKIP Trello items when the gate condition (Slack activity, daily report, etc.) is genuinely unmet — not just because task log is 0h after reminder was sent
- Examples where this applies: TuanNT 0h → reminder sent → complete John Yi, Bailey, Rebecca items; KhanhHH 0h → reminder sent → Elliott item can still complete (if Elliott Slack is clear)

**Note:** Today (2026-05-27) this didn't change any results — KhanhHH/LeNH 0h didn't block their gated Trello items (gates are Slack-only for Rory/Franc/Aysar/Elliott). But applies in future runs where task log is the only blocking factor.

Related: [[reference_trello_gate_mapping]], [[feedback_tuannt_trello_gates]]
