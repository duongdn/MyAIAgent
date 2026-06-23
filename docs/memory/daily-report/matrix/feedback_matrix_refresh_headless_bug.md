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
1. Clear stale profile locks first: `rm -f tmp/matrix-browser-profile/Default/LOCK tmp/matrix-browser-profile/SingletonLock`
2. Run `DISPLAY=:1 node scripts/matrix-login.js` — NUS SSO has an active system session, browser auto-confirms, token captured in ~10s. **NO manual user interaction needed.**

**Why it works:** `matrix-login.js` is `headless: false` on DISPLAY=:1. The NUS SSO has a live system-level session so no credentials need to be typed.

**How to apply:** If `matrix-token-refresh.js` fails → clear locks → run `matrix-login.js` on DISPLAY=:1. Fully automated, no user action required. Do NOT ask user to run it manually.
