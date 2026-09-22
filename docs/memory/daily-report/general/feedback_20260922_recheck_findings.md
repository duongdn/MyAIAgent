---
name: feedback_20260922_recheck_findings
description: "2026-09-22 recheck: Workstream SSO again transient (1 retry fixed); Monday-wide task-log lag means 0h != absence — cross-check Matrix activity before alerting; cron wrongly reported OhCleo as stale"
metadata:
  type: feedback
---

**Three reusable lessons from the 2026-09-22 recheck:**

1. **Workstream SSO failed 4× in cron, succeeded on the FIRST retry at recheck** — again. Same as 09-11. The unconditional retry-first rule ([[feedback_recheck_must_always_retry_workstream_first]]) paid off a second time; it is never worth carrying the outage note forward.

2. **🔴 Monday 0h is often team-wide logging lag, not absence — cross-check Matrix before flagging.** On Mon 09-21, TuanNT and LeNH both showed 0h on Workstream with no leave on file (direct IMAP search confirmed). But the Matrix scan showed TuanNT active all day in "NUS - Bailey - Paturevision 2026" (posted a Friday task summary 08:42, onboarded PhucVT, debugged Docker) and LeNH active in "James Diamond - Portfolio" 17:14–17:30. ~8 other devs who logged 8h/day the prior week also showed 0h Monday. **How to apply:** before calling a 0h day an absence alert, grep that day's Matrix transcript for the dev's handle — a dev visibly working is a task-log hygiene gap (different message, different urgency), and a Monday-wide pattern is evidence of lag, not 10 simultaneous no-shows. Report both facts; let the user decide on reminders.

3. **Cron's per-piece "stale / 0 new" claims can be wrong — re-verify, don't copy.** Cron reported OhCleo Slack as "latest messages 09-07/09-08 (stale), no new activity". Re-running `slack-fetch-ohcleo.js` on recheck returned **14 real messages** from 09-21 including a full Tony↔Celine status meeting. A recheck should re-run any piece whose cron result was "nothing found", not just those that errored.

**Real findings that day:** Fountain customer board had 3 kunalsheth comments from 09-18 unanswered 4 days; Bitbucket PR #481 (2 High + 1 Medium, unanswered since 2026-06-06) flagged for the 3rd time — escalate rather than re-note; MPFC Apdex 0.47 chronic with SQLi probes being served at ~50s on `/search/`; customer reported two unexplained API keys (`WCS-NETMAP-01`, `PowerBi`) actively hitting the James Diamond system.
