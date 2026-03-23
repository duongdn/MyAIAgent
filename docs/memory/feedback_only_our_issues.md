---
name: Only flag issues caused by our team
description: Daily report alerts should only flag issues relevant to NUS team — client-side production errors (Rollbar, BugSnag) are informational, not alerts
type: feedback
---

Only flag issues that are caused by or relevant to NUS team's work. Client-side production errors (e.g., LegalAtoms Rollbar alerts, third-party service issues) are informational, not critical alerts.

**Why:** User corrected when LegalAtoms Rollbar prod alerts were flagged as MEDIUM alert — "we will only care about issue of us."
**How to apply:** When categorizing alerts, ask: "Is this our team's responsibility?" If it's a client's existing production issue or third-party service, mark as INFO. Only escalate if it's caused by our code/deploy or blocks our team's work.
