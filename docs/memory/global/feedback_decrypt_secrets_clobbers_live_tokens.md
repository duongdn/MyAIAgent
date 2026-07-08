---
name: feedback_decrypt_secrets_clobbers_live_tokens
description: decrypt-secrets.sh can silently revert a freshly-refreshed token (Matrix etc.) to the stale committed .enc — fixed via auto re-encrypt helper
metadata:
  type: feedback
---

**Rule:** Don't reflexively run `bash scripts/decrypt-secrets.sh` at session start out of habit ([[feedback_decrypt_before_reading]]) without considering it can destroy a token refreshed more recently than the last `.enc` commit. Token-refresh scripts previously only wrote the plaintext `config/*.json`, never re-encrypted back to `.enc` — so any later `decrypt-secrets.sh` reverted to whatever was last committed, forcing an unnecessary re-auth.

**Why:** 2026-07-08 — Matrix token was refreshed and working fine at 08:54 and 10:01 (confirmed via real Matrix room fetches). Ran `decrypt-secrets.sh` reflexively at session start ~10:51, which overwrote the live token with the `.enc` committed 2026-07-07 10:36 — instantly breaking a working session and forcing a full re-login. User was rightly frustrated ("dùng cả ngàn lần lâu nay rồi sao giờ lại lỗi") since this wasn't a real Matrix/session problem — it was self-inflicted by the decrypt call.

**Fix applied:** created `scripts/lib/save-secret-config.js` (`saveSecretConfig(path, config)` — writes JSON then immediately runs `encrypt-secrets.sh`). Wired into all 3 Matrix token-refresh scripts' save points (`matrix-token-refresh.js`, `matrix-device-auth.js`, `matrix-token-cdp-refresh.js`). Any future refreshed token is now immediately persisted to `.enc`.

**How to apply:** If any other script (Slack xoxc, Workstream login, etc.) writes a decrypted config in place after a refresh, wire it through the same `saveSecretConfig` helper, not raw `fs.writeFileSync`. Before assuming "token expired" when a call fails right after a `decrypt-secrets.sh` run, check whether the decrypt itself just clobbered a live token — verify via `whoami`/equivalent before jumping to a re-auth flow.
