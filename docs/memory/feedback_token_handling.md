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
- `Cookie: d={cookie_value}` (from `config/.slack-accounts.json` `cookie` field)
Missing Cookie returns `invalid_auth` — looks like expired but isn't.

**Before flagging ANY Slack token as expired, run:** `node scripts/slack-verify-tokens.js`
It tests all 14 workspaces with correct headers and prints OK/FAIL per workspace. This is the authoritative check — agent-side `conversations.history`/`search.messages` failures are NOT proof of expiry. Reason: this trap has caused false alarms multiple times (latest 2026-04-17) for AmazingMeds + Equanimity.

## Auth failure = HIGH severity
Auth failure on any monitoring source = HIGH (blind spot). But FIRST verify the token works before flagging:
- Discord: 3-step curl check (`/users/@me`, `/guilds`, `/channels`)
- Slack: `auth.test` API call
- Matrix: refresh token before scan (expires every 5 min)

**Why:** False auth alarms from bad API usage are equally wasteful as real failures. User has corrected both: flagging valid tokens as expired, AND not escalating real auth failures.
