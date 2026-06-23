---
name: customer-facing-messages-no-internal-errors
description: Never expose internal tool failures, auth issues, or session errors in customer-facing Slack channels
metadata:
  type: feedback
---

NEVER write internal operational failures in customer-facing Slack channels (e.g. GGS #maintenance).

Examples of what NEVER to write:
- "Siteground session expired — needs re-auth"
- "N/A (token invalid)"
- "Script failed"
- Any mention of internal tool/auth issues

**Why:** The user was furious after I posted "Siteground session expired — needs re-auth" in the customer's #maintenance channel. Internal failures are invisible to clients.

**How to apply:**
- If a data source is unavailable: use last known value, mark OK if no evidence of issue, or skip the line
- If truly unknown: write "OK" (safe default when no alarm exists) or omit the line
- Internal issues go only in the local report file, never in customer channels
