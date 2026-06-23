---
name: Alert classification — only our issues, ignore checklist text, staging is INFO
description: Only flag issues caused by our team. Checklist item text is user's notes, not alerts. Staging errors are INFO, only production matters.
type: feedback
originSessionId: 85e129a4-19bd-49e1-b39d-0b3c5a2cb7a7
---
## Only flag our team's issues
Client-side production errors (Rollbar, BugSnag from client apps), third-party service issues = INFO, not alerts. Only escalate if caused by our code/deploy or blocks our team.

## Checklist item text is NOT an alert
Trello checklist items contain user's personal notes/reminders (e.g., "Aysar - đang rất RISK - HẾT TASK"). NEVER treat them as alerts blocking completion. Only MONITORING DATA determines alerts.

## Staging errors = INFO
BugSnag/Rollbar/Sentry from staging environments = INFO at most. Only production errors warrant MEDIUM+ severity.

## "Chưa" in task log = normal
Column P "Chưa" is default state. Never mention it in reports at all — not even as "normal".

**Why:** User corrected all of these: "we will only care about issue of us", "Please never read the checklist item contain as risk, this is my note only", "staging is not the big deal".
