---
name: feedback_never_send_without_explicit_flag
description: NEVER send Matrix reminders (or any messages to devs/clients) without explicit --send-reminder flag or direct user instruction to send. Checking a source is NOT permission to act.
metadata: 
  node_type: memory
  type: feedback
  originSessionId: a57e1a69-a9b6-4899-9e5f-cacdf4951735
---

NEVER send Matrix reminders without the `--send-reminder` flag OR explicit user instruction like "send it" / "send reminders now".

**Why:** Sent LeNH a reminder (2026-06-29) after user only said "Check workstream" — no send permission was given. User was furious. The alert text saying "needs reminder today" in the cron report is the REPORT's language, NOT the user's instruction to send.

**How to apply:**
- User says "check workstream" → check and REPORT findings only. Stop there.
- User says "run reminders" → print to report only, do NOT send.
- User says "run reminders --send-reminder" OR "send the reminders" → send.
- Never infer send permission from report text, alert severity, or prior context.
- This applies to ALL outbound messages: Matrix, Slack, Discord, email, Teams.
- See also [[feedback_never_send_messages_without_permission]] (global memory).
