---
name: feedback-kai-daily-report-gate
description: Kai (Xtreme/Maddy) daily report only required when Kai has active tasks that day — absence is not an alert if no work assigned
metadata:
  type: feedback
---

Only flag "no Kai daily report" as a Maddy alert if Kai had active tasks/assignments that day.

**Why:** User confirmed 2026-07-01 — Kai had no work on Jun 30, so no daily report was expected. Flagging it as an alert was wrong.

**How to apply:** Before flagging Maddy ○ for missing Kai report, check if Kai had any active JIRA tickets or Xtreme Slack task mentions that day. If no tasks → skip the Kai report gate, Maddy can still complete (unless other alerts exist like Madhuraka unanswered messages).

**🔴 REPEAT VIOLATION 2026-07-08:** Flagged "Kai's report missing 07-07" again without checking whether anyone actually worked Maddy that day. User caught it ("tương tự!!!" — same as the Aysar catch minutes earlier). Live Workstream: LongVV logged 7h Maddy on Mon 07-06, but **0h Tue 07-07** (worked OhCleo instead that day) — consistent with the JIRA sheet already showing 0h/no tickets W14. No active Maddy work 07-07 → dropped as an alert driver. Maddy stayed incomplete anyway that day, but for the *separate* legitimate reason of the standing Bitbucket PR backlog (#481 + 4 others, unaddressed Critical/High findings) — don't conflate "report missing" with "PR backlog unresolved", they are two different checks with different validity conditions.
