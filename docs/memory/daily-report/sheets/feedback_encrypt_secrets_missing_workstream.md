---
name: feedback_encrypt_secrets_missing_workstream
description: encrypt-secrets.sh was missing .workstream-config.json (+newrelic+rollbar) from its file list even though decrypt-secrets.sh handles them — silently dropped every Workstream token refresh, a root cause of the recurring "Workstream SSO expired" pattern
metadata:
  type: feedback
---

`scripts/encrypt-secrets.sh`'s `SECRET_FILES` array did not include `config/.workstream-config.json`, `config/.newrelic-config.json`, or `config/.rollbar-config.json` — even though `scripts/decrypt-secrets.sh` decrypts all three at the start of every session. Fixed 2026-06-25 by adding them to the array.

**Why:** Every time `workstream-login.js` refreshed the token and the session later ran `encrypt-secrets.sh`, the new token never made it into `.workstream-config.json.enc`. The next session's `decrypt-secrets.sh` would restore the STALE pre-refresh token from git, making Workstream look "expired" again — even though it had been successfully fixed just hours before. This is a second, independent root cause alongside the already-documented double-`/api/api/` bug in [[reference_workstream]] — that one caused false expiry via a URL bug, this one caused TRUE token loss via a build/encrypt gap.

**How to apply:** If Workstream (or NewRelic/Rollbar) token expiry recurs immediately after a session that should have fixed it, check first whether `encrypt-secrets.sh`'s file list still matches `decrypt-secrets.sh`'s — don't re-diagnose as an auth/SSO problem before checking this. Any time a NEW `config/.*.json` secret file is added to `decrypt-secrets.sh`, it MUST also be added to `encrypt-secrets.sh` in the same change.

Related: [[reference_workstream]], [[feedback_workstream_config_not_gitignored]]
