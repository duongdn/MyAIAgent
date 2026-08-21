---
name: project_matrix_static_compat_token
description: Matrix now uses a non-expiring mct_ compat token (issued by nustechnology.com homeserver admin 2026-07-13) — the whole OIDC mat_/mar_ browser-refresh flow should rarely trigger again
metadata: 
  node_type: memory
  type: project
  originSessionId: 24440950-403f-4475-b4b9-1880f7c02519
---

DuongDN asked the `matrix.nustechnology.com` homeserver admin for a permanent credential (to avoid the recurring visible-browser SSO refresh — this used to link to feedback_matrix_refresh_headless_bug and feedback_matrix_token_short_lived, both deleted 2026-07-13 as no-longer-needed now that this static token is confirmed working). Admin replied with a static compatibility token, prefix `mct_` (distinct from the OIDC `mat_` access token / `mar_` refresh token), confirmed non-expiring by the admin.

**Why:** the OIDC/MAS flow's `access_token` only lives ~10min and `refresh_token` capture from the browser was structurally unreliable (MAS doesn't expose it client-side). A static compat token sidesteps this entirely.

**Applied:** `config/.matrix-config.json` `access_token` field set to the `mct_` token, `token_type: "static_compat"` marker field. `scripts/matrix-token-refresh.js`'s fast-path (`whoami` check) already short-circuits and skips the whole browser flow whenever this token is valid.

**Confirmed long-lived** via repeated `whoami` checks spanning 10min through 19h post-issuance — all 200 OK. Treat as durably non-expiring; do not re-verify defensively on every report, only investigate on an actual `whoami` failure.

**How to apply:** Matrix should no longer need `DISPLAY=:1` visible-browser refresh in normal operation. If `whoami` with this `mct_` token ever starts failing, that means the admin's "non-expiring" claim didn't hold or the token was revoked — ask the user before assuming it needs regenerating (don't just declare it expired; confirm live first, e.g. is the token still in `config/.matrix-config.json` unchanged, retry `whoami` once more). Only fall back to `matrix-token-refresh.js` → `matrix-login.js` (visible browser) if the `mct_` token itself is confirmed dead — never `matrix-device-auth.js`, see [[feedback_matrix_never_use_device_auth]].

**🔴 LOST AND RESTORED, 2026-07-25 — the mct_ token itself did NOT expire, but it silently vanished from `config/.matrix-config.json` at some point between 07-14 and 07-25, reverted back to the pre-07-13 `mat_`/`mar_` OIDC pair (file mtime showed 07-10, predating the mct_ setup entirely).** This is the exact clobber pattern from [[feedback_decrypt_secrets_clobbers_live_tokens]] — the mct_ token was hand-edited into the plaintext config on 07-13 and evidently never re-encrypted into `.enc` at that time, so some later `decrypt-secrets.sh` (not run by this session — root cause/timing unconfirmed) silently reverted it. During this session, `fetch-matrix-daily.js`'s auto-refresh saw the dead `mat_` token, tried the OIDC refresh_token grant (`invalid_grant` — that refresh_token was also stale/from the same old pair), then a 5-min visible-browser wait that nobody was there to complete — all of which LOOKED like "token expired," but the user immediately and correctly pushed back: **the mct_ token itself is non-expiring, the bug was that the wrong (old) token was sitting in the config.** User supplied the current mct_ value directly (from wherever they'd kept it — not repeated here, it's a secret); restored to `config/.matrix-config.json` (gitignored) with `token_type: "static_compat"` marker, verified via `whoami` (200, `@duongdn:nustechnology.com`), and immediately re-encrypted via `scripts/encrypt-secrets.sh` this time so a future `decrypt-secrets.sh` won't revert it again.

**Revised how-to-apply:** Before ever concluding "Matrix token expired," check whether `config/.matrix-config.json`'s `access_token` still starts with `mct_` and has `token_type: "static_compat"` set. If it's been silently replaced by a `mat_`/`mar_` pair, that's this clobber bug recurring, not a real expiry — ask the user for the mct_ value (don't assume it's unrecoverable) rather than running the multi-minute OIDC/visible-browser fallback chain, which will just burn time and produce a scary-looking (but wrong) "expired" narrative.
