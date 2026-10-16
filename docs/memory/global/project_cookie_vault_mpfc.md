---
name: project_cookie_vault_mpfc
description: How the headless mpfc cron gets Workstream/Upwork sessions — cookie vault + real Chrome on Xvfb with Turnstile click; company PC is only on 08:00+
metadata:
  type: project
---
Built 2026-10-16. mpfc (headless DO server) cron failed on browser-session sources. **Company PC (local) is only on during work hours (user arrives 08:00) — never schedule anything on it before 08:00** (a 04:40 cron was added by mistake and removed).

- **Cookie vault:** local `scripts/cookie-vault-sync.sh` → `cookie-vault-export.py` exports Keycloak (Profile 9), carrick Upwork (Profile 1) and duongdn Upwork (Profile 9, Tokenlite) cookies → scp to mpfc `tmp/cookie-vault/` (chmod 600, never git). Local crontab: only `*/30 --if-stale` (re-push when mpfc writes `tmp/cookie-vault/STALE` via `markVaultStale()` in `scripts/lib/cookie-vault.js`). The Upwork login marker is `oauth2_global_js_token`, not `user_oauth2_slave_access_token` (that cookie is gone).
- **Workstream on mpfc:** ✅ `workstream-login.js` seeds the vault Keycloak cookies (expire 2027) → token. Needs only an occasional push.
- **Upwork on mpfc:** headless Chrome is stuck on Cloudflare from the DO IP. `scripts/lib/upwork-server-browser.js` runs real `/usr/bin/google-chrome` on Xvfb `:99` with a persistent profile (`tmp/upwork-profile-<account>`) and clicks Turnstile (widget is in a closed shadow root; locate it by its 300x65 size, fallback 511,295). Verified 10-16: Rory + Aysar memos ✅ (2/2 runs), Neural ✅ (intermittent: 1 fail, 1 pass). **Tokenlite (duongdn) still `cloudflare_blocked`** even after cookie seeding — open issue.
- mpfc pulls can hit an autostash conflict on `config/.workstream-config.json.enc` (re-encrypted locally by the login). Keep mpfc's version (`git checkout --theirs`, `git reset`, `git stash drop`).
- Not covered: MS Teams (IndexedDB), WhatsApp/Zalo (E2EE).

**How to apply:** if mpfc reports Upwork `cloudflare_blocked`, it's the Turnstile step, not a session problem (check `tmp/turnstile-fail.png` on mpfc). Workstream SSO failure on mpfc → check the vault file age + the STALE flag. Related: [[project_mpfc_cron_server]], [[feedback_workstream_login_seed_sso_cookies_from_chrome_profile9]], [[feedback_upwork_memo_check_run_headless_never_open_windows]].
