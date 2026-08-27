---
name: feedback_maddy_complaint_missed_in_recheck_hours_only_gate
description: "Recheck completed Maddy Trello item on WS-hours check alone, missed a real customer QA complaint already surfaced in the same run's own Matrix section"
metadata:
  type: feedback
---

2026-08-26: during recheck, Maddy's Trello item was completed purely because Workstream showed LongVV logged hours (ad-hoc, no shortfall). But the SAME run's 07:10 Matrix scan had already surfaced a real customer complaint: chientx relaying (in "Project Wrap Up - Preventive Actions" room, 15:47) "continuing to receive complaints from the customer that we are not doing our testing/QA properly... asking us to work for free to fix" + a direct ask to review forwarded email/dev issues. User caught this: "Maddy complain, sao ko detect ra?"

**Why:** Trello gate-mapping tables (e.g. [[reference_trello_gate_mapping]]) list "sources to run first" per item (Slack + Sheets/Workstream for Maddy), but don't say to cross-check the Matrix action-items table already compiled in the same report run. A recheck that only re-runs the mapped gate sources for an ○ item can complete it while a real, already-known alert about that same project sits untouched elsewhere in the report.

**How to apply:** Before completing ANY Trello item during a recheck, scan the current report's own ⚠️ ALERTS SUMMARY and Matrix ⚠️ action-items table for that project/person's name — not just the item's mapped gate sources. If a live complaint/alert already exists anywhere in the report for that project, do not complete the item on gate-source data alone; the complaint itself is the higher-priority reason to keep it ○. This applies to every project, not just Maddy — see also [[feedback_dont_bury_real_issues_as_context]] (same root problem: a real issue getting treated as background noise instead of its own blocking alert).
