---
name: Fix tokens, don't report them as expired
description: When a token (Matrix, Slack session, etc.) is expired or invalid, fix it immediately — never just report "token expired" in the report
type: feedback
---

When any token fails (Matrix access/refresh, Slack xoxc/xoxd session tokens, etc.), fix it silently rather than surfacing "token expired" as an alert.

**Why:** The user expects tokens to be maintained automatically. Reporting a token as expired without fixing it is unhelpful and creates noise.

**How to apply:**
- Matrix tokens: try OIDC refresh first; if invalid_grant, use `scripts/matrix-token-refresh.js` with the browser profile at `tmp/matrix-browser-profile/`
- Slack session tokens (Amazing Meds, Equanimity): auto-refresh via crumb extraction + POST login (see workflow)
- Save new tokens to config files immediately after refresh
- Only escalate to the user if ALL refresh methods fail and manual intervention is truly required
