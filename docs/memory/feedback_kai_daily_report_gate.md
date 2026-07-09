---
name: feedback-kai-daily-report-gate
description: NEVER flag "Kai no daily report" as a Maddy alert — this check is retired, repeat false positive
metadata:
  type: feedback
---

🔴🔴 RETIRED CHECK — DO NOT flag "Kai's daily report missing / 0 Slack messages in Xtreme" as a Maddy alert, ever, under any circumstance. Stop checking it entirely.

**Why:** This exact false positive has now been caught by the user 3+ times (2026-07-01, 2026-07-08, 2026-07-09) each time it was actually true that Kai simply didn't work that day. There is no reliable/fast way for the agent to confirm "did Kai work today" before writing the report, so every attempt at this check produces a false alarm. The user's Jul-9 reaction was explicit anger ("why you cannot understand a very small thing... he not work this day!!!") — this is not a nuance to get right next time, the check itself must be removed from the Maddy workflow.

**How to apply:** When running the Maddy 4-part check (Slack + JIRA + est/actual + PR), the "Slack" part only looks for: (a) unanswered Madhuraka/client messages, (b) explicit blocker/escalation posts. "0 messages that day" or "no report posted" by itself is NEVER a line item, NEVER goes in ALERTS SUMMARY, NEVER goes in the per-source table as a ⚠️. Maddy's alert status is driven ONLY by: PR backlog (unaddressed Critical/High Bitbucket findings), JIRA est/actual overruns, and unanswered direct client asks. If none of those are present, Maddy completes regardless of Kai's Slack activity that day.
