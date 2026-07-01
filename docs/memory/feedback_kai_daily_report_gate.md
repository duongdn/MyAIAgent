---
name: feedback-kai-daily-report-gate
description: Kai (Xtreme/Maddy) daily report only required when Kai has active tasks that day — absence is not an alert if no work assigned
metadata:
  type: feedback
---

Only flag "no Kai daily report" as a Maddy alert if Kai had active tasks/assignments that day.

**Why:** User confirmed 2026-07-01 — Kai had no work on Jun 30, so no daily report was expected. Flagging it as an alert was wrong.

**How to apply:** Before flagging Maddy ○ for missing Kai report, check if Kai had any active JIRA tickets or Xtreme Slack task mentions that day. If no tasks → skip the Kai report gate, Maddy can still complete (unless other alerts exist like Madhuraka unanswered messages).
