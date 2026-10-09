---
name: feedback_holding_reply_and_our_side_done_are_not_alerts
description: Holding/temporary reply to a customer counts as answered; an item already done on our side is not an alert; Elliott paused → Ignore List
metadata:
  type: feedback
---

User corrected 2026-10-09 after the recheck left Franc, Maddy and Elliott unticked:
- **Franc:** a holding reply had already gone to dmetiner. Any holding or acknowledgement reply counts as "answered". Before flagging a reply as missing, look for one (thread replies included), and look again after the cron window.
- **Maddy:** the flagged points (invoice message, Anoma's image request, JIRA est/log) were already done on our side. Don't keep a Maddy alert open for things our team has already handled. Only alert on things that are still genuinely pending from our team.
- **Elliott:** paused for a long time. It's now on the Ignore List in `.claude/commands/me/daily-report.md` and is auto-completed with no gate.

**Why:** These false alerts left Trello items unticked and the user had to correct them by hand.
**How to apply:** Before leaving an item unticked, confirm the customer ask truly has no reply (a holding reply is enough) and the work isn't already done on our side. Never gate Elliott. Related: [[feedback_customer_direct_ask_universal_gate]].
