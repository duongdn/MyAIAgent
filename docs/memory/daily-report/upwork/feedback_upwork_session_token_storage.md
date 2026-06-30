---
name: feedback_upwork_session_token_storage
description: After Upwork VNC login, extract and store OAuth token in config so cron never needs re-login
metadata:
  type: feedback
---

After every successful Upwork VNC login (`bash scripts/vnc-login-session.sh upwork`), extract the OAuth token from the browser session and store it in `config/.upwork-config.json` under `accounts[].oauth_token`. This avoids repeated VNC logins for cron.

**Why:** User instruction 2026-06-30: "store token so this never need to run again." Session cookies in `tmp/upwork-profile-carrick/` expire; a stored oauth token can be used for direct API/header auth.

**How to apply:**
1. After successful VNC login, extract cookies (look for `oauth2_global_js_token` or similar Upwork session cookie) from the browser profile
2. Save the token to `config/.upwork-config.json` → `accounts[].oauth_token`
3. Modify `upwork-weekly-hours.js` headless re-login to first try the stored token as a cookie injection before falling back to full browser login
4. If re-injection fails → then and only then, prompt user to run VNC login again
