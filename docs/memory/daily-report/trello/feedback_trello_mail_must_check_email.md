---
name: Trello mail must check email first
description: /daily-report trello mail MUST actually check all 6 email accounts before marking Trello items complete, and update refresh timelines after
type: feedback
---

`/daily-report trello mail` means: check emails THEN mark Trello complete. NOT just mark Trello complete.

**Why:** User corrected after agent marked all 6 Check Mail items complete without reading any emails — that defeats the purpose of the monitoring task.

**How to apply:**
1. Read all 6 email accounts via IMAP (same as `/daily-report email`)
2. Analyze content, flag alerts
3. Mark Trello Check Mail items complete
4. Update `refresh.email.*.last_run` timestamps in `.monitoring-timelines.json`
5. Write report with actual email summaries (not just Trello status)

Rule: Any `/daily-report trello` piece that maps to a monitoring source must CHECK that source first, not just toggle Trello.
