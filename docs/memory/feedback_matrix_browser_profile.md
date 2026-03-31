---
name: Matrix token refresh via browser profile
description: When OIDC refresh_token is expired (invalid_grant), use scripts/matrix-token-refresh.js with tmp/matrix-browser-profile/ — it works automatically via SSO
type: feedback
---

Matrix password login is disabled on this server (OIDC-only). When both access_token and refresh_token are expired:

1. Try OIDC refresh first (POST token_endpoint with refresh_token)
2. If invalid_grant → run `scripts/matrix-token-refresh.js` using Puppeteer browser profile at `tmp/matrix-browser-profile/`
   - The profile holds a valid SSO session cookie for chat.nustechnology.com
   - Script intercepts outgoing Authorization header to capture fresh access_token
   - Works headlessly and automatically — no manual intervention needed
3. Save new access_token to `.matrix-config.json` immediately

**Why:** The refresh_token expires and cannot self-rotate via the script (SSO flow doesn't expose it). But the browser profile SSO session stays valid longer.
