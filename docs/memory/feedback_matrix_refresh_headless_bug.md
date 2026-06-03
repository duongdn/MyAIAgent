---
name: matrix-refresh-headless-bug-fixed
description: matrix-token-refresh.js was headless:'new' — worked only while browser profile had valid internal refresh_token. When both tokens expired, needed headless:false to show real browser. Fixed 2026-06-03.
metadata:
  type: feedback
---

# Matrix Token Refresh — Root Cause & Fix

## Rule
`scripts/matrix-token-refresh.js` MUST run with `headless: false` and `DISPLAY=:1` (or real display).

**Why:** The script captures the token by intercepting Element's internal token refresh call. This works headlessly ONLY while the browser profile's internal refresh_token is valid (lasts months). When both the config token AND the browser profile's refresh_token expire, the headless browser redirects to SSO login — but nobody can interact with a headless browser, so it times out.

**Fixed:** Changed `headless: 'new'` → `headless: false` in the script on 2026-06-03.

## When it fails again
Run `DISPLAY=:1 node scripts/matrix-login.js` — opens a visible browser, user clicks confirm (SSO auto-login), token captured in ~10s.

**Why it works:** `matrix-login.js` is already `headless: false`. The NUS SSO has an active session (system-level), so the browser auto-confirms without typing credentials.

**How to apply:** If `matrix-token-refresh.js` ever outputs "Failed to capture token", run `matrix-login.js` on real display. Do NOT use Xvfb (virtual display) — SSO needs visible interaction.
