---
name: feedback_decrypt_secrets_clobbers_live_tokens
description: decrypt-secrets.sh can silently revert a freshly-refreshed token (Matrix etc.) to the stale committed .enc — fixed via auto re-encrypt helper + 3-layer defense
metadata: 
  node_type: memory
  type: feedback
  originSessionId: dfe7f05b-a9d4-478d-b486-74205dbcb84b
  modified: 2026-07-28T03:56:29.533Z
---

**Rule:** Don't reflexively run `bash scripts/decrypt-secrets.sh` at session start out of habit ([[feedback_decrypt_before_reading]]) without considering it can destroy a token refreshed more recently than the last `.enc` commit. Token-refresh scripts previously only wrote the plaintext `config/*.json`, never re-encrypted back to `.enc` — so any later `decrypt-secrets.sh` reverted to whatever was last committed, forcing an unnecessary re-auth.

**Why:** 2026-07-08 — Matrix token was refreshed and working fine at 08:54 and 10:01 (confirmed via real Matrix room fetches). Ran `decrypt-secrets.sh` reflexively at session start ~10:51, which overwrote the live token with the `.enc` committed 2026-07-07 10:36 — instantly breaking a working session and forcing a full re-login. User was rightly frustrated ("dùng cả ngàn lần lâu nay rồi sao giờ lại lỗi") since this wasn't a real Matrix/session problem — it was self-inflicted by the decrypt call.

**Fix applied (2026-07-08):** created `scripts/lib/save-secret-config.js` (`saveSecretConfig(path, config)` — writes JSON then immediately runs `encrypt-secrets.sh` with single-file arg). Wired into all 3 Matrix token-refresh scripts' save points (`matrix-token-refresh.js`, `matrix-device-auth.js`, `matrix-token-cdp-refresh.js`). Any future refreshed token is now immediately persisted to `.enc`.

**2nd occurrence, worse variant, 2026-07-13 (Arthur Piece 13 daily run):** this time it wasn't a revert-to-stale, it was a full **deletion**. The "Solid Code Team" Slack account entry (`config/.slack-accounts.json`, added 2026-07-06/07 per `feedback_solid_code_new_workspace_unwired`) had been added directly to the plaintext JSON and **never once re-encrypted into `.enc`** (it predates `saveSecretConfig` and was never migrated). Sometime the morning of 2026-07-13 a `decrypt-secrets.sh` run overwrote `config/.slack-accounts.json` with the old `.enc` (which never contained Solid Code at all) — the account didn't revert to stale, it vanished from the account list entirely. Left unresolved — token needs re-extraction next time the desktop is free.

**3rd occurrence, 2026-07-25 (Maddy Bitbucket token):** NOT a genuine token expiration. Working token `=66B4AA4B` (confirmed Jul 15, commit `023afe5`) was overwritten by dead token `=4CAEE0F8` in auto commit `198b7d2` (Jul 25 09:59). Root cause: `encrypt-secrets.sh` (no-arg bulk mode) locked whatever stale plaintext was on disk into `.enc` for all 24 configs. A prior `decrypt-secrets.sh` run had clobbered the working plaintext with the stale `.enc` containing dead `=4CAEE0F8`. Token `=66B4AA4B` was recovered from git history (`git show 023afe5:config/.bitbucket-config.json.enc`) and confirmed still alive (HTTP 200, 9 open PRs).

**3-layer defense deployed 2026-07-28 (commit `4970e2c`):**
1. **`encrypt-secrets.sh`** — killed no-arg bulk mode. Now REQUIRES explicit file arg(s). Running without args prints error and exits.
2. **`.githooks/post-merge`** — only decrypts `.enc` files that actually changed in the merged HEAD (via `git diff-tree`), not all 24 files. Biggest single clobber trigger eliminated.
3. **`decrypt-secrets.sh`** — mtime-safety check. If plaintext is newer than its `.enc`, blocks with warning listing affected files. `--force` bypasses (fresh clone only).

**How to apply:** If any other script (Slack xoxc, Workstream login, etc.) writes a decrypted config in place after a refresh, wire it through the same `saveSecretConfig` helper, not raw `fs.writeFileSync`. Before assuming "token expired" when a call fails: check `stat` mtime of plaintext vs `.enc` git commit date, decrypt old `.enc` from git history and test that credential live before concluding root cause — see [[feedback_verify_config_history_before_blaming_external_credential]]. NEVER run `encrypt-secrets.sh` without file args — it's now blocked anyway.
