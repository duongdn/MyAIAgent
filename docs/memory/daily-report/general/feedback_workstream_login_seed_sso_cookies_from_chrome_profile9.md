---
name: feedback_workstream_login_seed_sso_cookies_from_chrome_profile9
description: "workstream-login.js 'SSO redirected but API never fired' = Keycloak session in tmp/workstream-browser-profile is dead (and the script then deletes that profile). Fix: seed auth.nustechnology.com cookies from real Chrome Profile 9 via WORKSTREAM_SSO_COOKIES"
metadata:
  type: feedback
---

2026-10-02: `workstream-login.js` failed 4 times in a row with "SSO redirect detected — Keycloak cookies alive … no token captured (SSO redirected but API never fired)". That log line is misleading: any request to auth.nustechnology.com sets it, including landing on the login form. After 2 failed attempts the script deletes `tmp/workstream-browser-profile`, so retrying the same command cannot work — it is headless and has no session left.

**Why:** the stored `refresh_token` cannot be redeemed server-side ([[reference_workstream]]), so the only way to mint a token is a browser that already holds a Keycloak session.

**How to apply:**
1. The user's real Chrome **Profile 9** holds a live Keycloak session (`KEYCLOAK_IDENTITY`, `KEYCLOAK_SESSION`, `AUTH_SESSION_ID` on `auth.nustechnology.com`, expiry 2027). Check with `sqlite3 "file:$HOME/.config/google-chrome/Profile 9/Cookies?mode=ro&immutable=1" "select count(*) from cookies where host_key like '%auth.nustechnology.com%'"`.
2. Export them with `browser_cookie3.chrome(cookie_file='…/Profile 9/Cookies', domain_name='auth.nustechnology.com')` (system python3, not the venv) to a private JSON array of `{name,value,domain,path,secure,expires}` in the scratchpad.
3. Run `WORKSTREAM_SSO_COOKIES=<that file> DISPLAY=:1 node scripts/workstream-login.js` — the script seeds the cookies before navigating (added 2026-10-02). Token captured on the first attempt, ~10s.
4. Delete the cookie file afterwards.

Same "use the real logged-in profile" pattern as Upwork (Profile 1), OhCleo (Profile 25), Solid Code (Profile 15). Related: [[feedback_recheck_must_always_retry_workstream_first]], [[feedback_workstream_sso_recheck_fixed]].
