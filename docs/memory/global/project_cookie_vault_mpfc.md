---
name: project_cookie_vault_mpfc
description: Cookie vault pushes real-browser cookies (Workstream SSO, Upwork) from local to headless mpfc cron; Upwork still Cloudflare-blocked on mpfc IP
metadata:
  type: project
---
Built 2026-10-16 (user picked "option B"). mpfc (headless) can't open a browser, so its cron failed on cookie/token sources.

- Local `scripts/cookie-vault-sync.sh` exports cookies via `cookie-vault-export.py` (Keycloak from Chrome Profile 9, carrick Upwork from Profile 1) → scp to mpfc `tmp/cookie-vault/` (chmod 600, never git). Local crontab: `40 4 * * 1-5` (before the 05:00 mpfc cron) + `*/30 --if-stale`.
- mpfc side: `workstream-login.js` seeds vault SSO cookies by default. `get-carrick-upwork-cookies.py` copies the vault file when Profile 1 is missing. Failures call `markVaultStale()` (`scripts/lib/cookie-vault.js`) → writes `tmp/cookie-vault/STALE` → the local job re-exports, opening upwork.com in Profile 1 at most once per 3h if the access token has expired.
- Verified on mpfc 2026-10-16: Workstream login + fetch ✅ via vault. **Upwork ❌ `cloudflare_blocked` from the mpfc IP even with valid cookies.** Cookies can't fix this; Upwork pieces still need a local run.
- Not covered: MS Teams (IndexedDB), WhatsApp/Zalo (E2EE). Slack works on mpfc already (token+cookie in config).

**How to apply:** if mpfc reports Workstream SSO failure, check `tmp/cookie-vault-sync.log` locally + the STALE flag on mpfc before re-diagnosing. Upwork failures on mpfc = IP/Cloudflare, not session — recheck locally. Related: [[project_mpfc_cron_server]], [[feedback_workstream_login_seed_sso_cookies_from_chrome_profile9]].
