---
name: Token handling — fix silently, verify before flagging, session tokens need Cookie
description: Fix expired tokens automatically (Matrix browser profile, Slack refresh). Verify tokens with API before reporting expired. xoxc tokens need both Authorization + Cookie headers.
type: feedback
originSessionId: 85e129a4-19bd-49e1-b39d-0b3c5a2cb7a7
---
## Fix tokens, don't report them
When any token fails, fix it silently:
- **Matrix:** try OIDC refresh → if invalid_grant → `scripts/matrix-token-refresh.js` with browser profile at `tmp/matrix-browser-profile/` (headless SSO, works automatically)
- **Slack session (xoxc):** auto-refresh via crumb extraction
- Save new tokens to config files immediately
- Only escalate if ALL refresh methods fail

## Slack session tokens (xoxc) need both headers
AmazingMeds and Equanimity use xoxc tokens. MUST send BOTH:
- `Authorization: Bearer {xoxc_token}`
- `Cookie: d={cookie_value}`
Missing Cookie returns `invalid_auth` — looks like expired but isn't.

## Auth failure = HIGH severity
Auth failure on any monitoring source = HIGH (blind spot). But FIRST verify the token works before flagging:
- Discord: 3-step curl check (`/users/@me`, `/guilds`, `/channels`)
- Slack: `auth.test` API call
- Matrix: refresh token before scan (expires every 5 min)

**Why:** False auth alarms from bad API usage are equally wasteful as real failures. User has corrected both: flagging valid tokens as expired, AND not escalating real auth failures.
