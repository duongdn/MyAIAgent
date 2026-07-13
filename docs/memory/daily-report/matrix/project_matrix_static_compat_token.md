---
name: project_matrix_static_compat_token
description: Matrix now uses a non-expiring mct_ compat token (issued by nustechnology.com homeserver admin 2026-07-13) — the whole OIDC mat_/mar_ browser-refresh flow should rarely trigger again
metadata: 
  node_type: memory
  type: project
  originSessionId: 24440950-403f-4475-b4b9-1880f7c02519
---

DuongDN asked the `matrix.nustechnology.com` homeserver admin for a permanent credential (to avoid the recurring visible-browser SSO refresh — this used to link to feedback_matrix_refresh_headless_bug and feedback_matrix_token_short_lived, both deleted 2026-07-13 as no-longer-needed now that this static token is confirmed working). Admin replied with a static compatibility token, prefix `mct_` (distinct from the OIDC `mat_` access token / `mar_` refresh token), confirmed non-expiring by the admin.

**Why:** the OIDC/MAS flow's `access_token` only lives ~10min and `refresh_token` capture from the browser was structurally unreliable (confirmed live 2026-07-13: neither localStorage nor response-body sniffing exposed a refresh_token even right after a fresh SSO login — MAS appears to not expose it client-side at all). A static compat token sidesteps this entirely.

**Applied:** `config/.matrix-config.json` `access_token` field set to the `mct_` token, verified via `whoami` → `@duongdn:nustechnology.com`. Added `token_type: "static_compat"` marker field. Old `refresh_token`/`oidc_client_id`/`token_endpoint` fields left in place as legacy fallback only. `scripts/matrix-token-refresh.js`'s existing fast-path (`whoami` check at top of `main()`) already short-circuits and skips the whole browser flow whenever this token is valid — no code change needed, confirmed by running the script (logged "Token valid... Skipping.").

**How to apply:** Matrix should no longer need `DISPLAY=:1` visible-browser refresh in normal operation. If `whoami` with this `mct_` token ever starts failing, that means the admin's "non-expiring" claim didn't hold or the token was revoked — ask the user before assuming it needs regenerating (don't just declare it expired; confirm live first, e.g. is the token still in `config/.matrix-config.json` unchanged, retry `whoami` once more). Only fall back to `matrix-token-refresh.js` → `matrix-login.js` (visible browser) if the `mct_` token itself is confirmed dead — never `matrix-device-auth.js`, see [[feedback_matrix_never_use_device_auth]].

**Verification done (2026-07-13, user pushed back "chắc ko, coi lại xem token có bị expire ko"):** researched MAS docs — default `compat_token_ttl` is 300s (5min) when a refresh_token is issued alongside; this token was handed over as a bare string with no refresh_token, so it was genuinely unclear whether it's a special long-lived grant or just a normal compat session about to die. Live-polled `whoami` every 30s for 10 minutes (`t+0s` through `t+603s`) — all 200 OK, survived well past the 300s default.

**Re-verified later same day (2026-07-13, during a memory review):** `whoami` with the same token still 200 OK (`@duongdn:nustechnology.com`), several hours after the first check — further evidence this is a genuinely long-lived grant, not just surviving past the 5min default. Still technically "provisional, not proven" for true indefinite non-expiry, but confidence is now high enough that this token should be treated as the default/primary credential without hedging in reports — only escalate if a live check actually fails.
