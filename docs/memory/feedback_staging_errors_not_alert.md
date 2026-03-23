---
name: Staging environment errors are not critical alerts
description: BugSnag/error tracking alerts from staging environments are INFO, not blocking alerts — only production errors matter
type: feedback
---

Staging environment errors (BugSnag, Rollbar, etc.) are not a big deal. Only production errors should be flagged as alerts.

**Why:** User said "staging is not the big deal" when Fountain staging BugSnag errors were flagged as MEDIUM alert blocking Trello completion.
**How to apply:** When categorizing error tracking alerts (BugSnag, Rollbar, Sentry), check if they're from staging or production. Staging = INFO at most, do not block Trello checklist completion. Only production errors warrant MEDIUM+ severity.
