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

## Slack session tokens (xoxc) — structural API limitation
AmazingMeds and Equanimity use xoxc tokens. These tokens:
- Pass `auth.test` reliably (valid)
- **ALWAYS fail `search.messages` and `conversations.list`** — this is a structural limitation of xoxc session tokens with the search API, NOT token expiry
- `invalid_auth` from `search.messages` with xoxc = expected, NOT an alert

**Never flag Amazing Meds or Equanimity `search.messages` failures as token errors.** They will always fail this way.

**Before flagging ANY Slack token as expired, run:** `node scripts/slack-verify-tokens.js`
It uses `auth.test` via POST (correct method for xoxc). This is the authoritative check.
Confirmed 2026-05-19: 14/14 OK including Amazing Meds (nick) + Equanimity (carrick).

**For Amazing Meds monitoring:** Use Nick's email (nick@nustechnology.com) for John Yi content — this is the correct source.
**For Equanimity monitoring:** Marcel is adhoc (0h expected). No Slack scan needed for his status.

**Why flagging is wrong:** This trap caused false alarms 2026-04-17 and 2026-05-19. User has corrected multiple times.

## Auth failure = HIGH severity
Auth failure on any monitoring source = HIGH (blind spot). But FIRST verify the token works before flagging:
- Discord: 3-step curl check (`/users/@me`, `/guilds`, `/channels`)
- Slack: `auth.test` API call
- Matrix: refresh token before scan (expires every 5 min)

**Why:** False auth alarms from bad API usage are equally wasteful as real failures. User has corrected both: flagging valid tokens as expired, AND not escalating real auth failures.
