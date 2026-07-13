---
name: project_matrix_static_compat_token
description: "Matrix now uses a non-expiring mct_ compat token (issued by nustechnology.com homeserver admin 2026-07-13) — the whole OIDC mat_/mar_ browser-refresh flow should rarely trigger again"
metadata:
  type: project
---

DuongDN asked the `matrix.nustechnology.com` homeserver admin for a permanent credential (to avoid the recurring visible-browser SSO refresh — see [[feedback_matrix_refresh_headless_bug]], [[feedback_matrix_token_short_lived]]). Admin replied with a static compatibility token, prefix `mct_` (distinct from the OIDC `mat_` access token / `mar_` refresh token), confirmed non-expiring by the admin.

**Why:** the OIDC/MAS flow's `access_token` only lives ~10min and `refresh_token` capture from the browser was structurally unreliable (confirmed live 2026-07-13: neither localStorage nor response-body sniffing exposed a refresh_token even right after a fresh SSO login — MAS appears to not expose it client-side at all). A static compat token sidesteps this entirely.

**Applied:** `config/.matrix-config.json` `access_token` field set to the `mct_` token, verified via `whoami` → `@duongdn:nustechnology.com`. Added `token_type: "static_compat"` marker field. Old `refresh_token`/`oidc_client_id`/`token_endpoint` fields left in place as legacy fallback only. `scripts/matrix-token-refresh.js`'s existing fast-path (`whoami` check at top of `main()`) already short-circuits and skips the whole browser flow whenever this token is valid — no code change needed, confirmed by running the script (logged "Token valid... Skipping.").

**How to apply:** Matrix should no longer need `DISPLAY=:1` visible-browser refresh in normal operation. If `whoami` with this `mct_` token ever starts failing, that means the admin's "non-expiring" claim didn't hold or the token was revoked — ask the user before assuming it needs regenerating (per [[feedback_matrix_token_never_report_expired]], don't just declare it expired; confirm live first, e.g. is the token still in `config/.matrix-config.json` unchanged, retry `whoami` once more). Only fall back to the old `matrix-token-refresh.js` browser flow if the `mct_` token itself is confirmed dead.
