---
name: Task-log 0h alert does NOT block client-project Trello completion
description: Internal dev task-log 0h alerts are handled by Matrix reminder; they do NOT block the client-project Trello item when the client-side Slack/Discord monitoring is clean. Only client-facing alerts (urgency, missing required daily reports, production errors) block Trello.
type: feedback
---

When a Trello Check Progress item is mapped to both a client-side source (Slack/Discord) AND a dev task-log sheet, a 0h-no-leave alert on the task-log alone must NOT cause the Trello item to be skipped.

**How to decide:**
- Client-side monitoring (Slack/Discord) clean → complete the Trello item
- Send Matrix reminder to the dev for the 0h gap (separate action)
- Only SKIP Trello if the alert is itself client-facing: client urgency, missing required client daily report, production error, auth failure affecting the client integration

**Examples (2026-04-21 run):**
- John Yi - Amazing Meds: Slack 8 msgs no alert; TuanNT 0h → reminder sent, Trello ✓
- Rory/Aysar/Franc: client Slack channels clean; LeNH 0h → reminder sent, Trello ✓
- Rebecca - William Will: WB Slack 0 msgs normal; TuanNT 0h → reminder sent, Trello ✓
- Marcel: URGENT Equanimity→Carrick xid-technologies escalation → real client alert, Trello SKIP

**Why:** User flagged 6 items left incomplete after first pass with "Check again, so many checklist not done". Original interpretation of `feedback_alert_means_no_complete.md` was too aggressive — it conflated internal dev alerts with client-project alerts. The Trello checklist tracks client-project monitoring; task-log gaps are handled by reminders.

**How to apply:**
- Run client-side sources first, classify each finding
- Task-log 0h → send reminder AND complete Trello (if client-side clean)
- Client urgency / production / auth → SKIP Trello + escalate to owner
