---
name: feedback_matrix_token_short_lived
description: "🔴 FALLBACK-ONLY since 2026-07-13 — the PRIMARY Matrix token is now a static non-expiring mct_ compat token (see project_matrix_static_compat_token), no short-lived behavior. This file's 'expires within minutes' warning applies ONLY if you've fallen back to the old OIDC matrix-token-refresh.js flow because the static token itself died."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: eadc01d0-f29a-44b8-8009-792373f2d6cf
---

🔴 **Normal operation no longer hits this at all** — the static `mct_` token in `config/.matrix-config.json` doesn't expire in minutes, it's meant to be long-lived (see [[project_matrix_static_compat_token]]). Everything below describes the OLD OIDC `access_token`/`refresh_token` behavior, relevant again only in the rare fallback case where the static token has failed and you're using `matrix-token-refresh.js`.

After `matrix-token-refresh.js` saves a new OIDC `access_token` (fallback path only), it stays valid for only a few minutes (confirmed 2026-06-25: a token verified working via `whoami` went back to `M_UNKNOWN_TOKEN` ~10 minutes later). The saved `refresh_token` is often ALSO already stale by the time you'd use it for an OAuth2 `grant_type=refresh_token` call, because the refresh script's response-interception logic only captures a new `refresh_token` when it appears in a `/oauth2/token` POST response body — when it captures the access_token via request-header sniffing instead (the common path), `refresh_token` in config is left unchanged from the PREVIOUS (already-consumed) value, so a direct refresh-token-grant retry fails with `invalid_grant`.

**Why:** Caused a `M_UNKNOWN_TOKEN` failure on a Fountain Matrix-plan fetch that ran a few minutes after a successful, verified `matrix-token-refresh.js` call — the gap between refresh and use was enough for the token to expire.

**How to apply:**
1. Treat `matrix-token-refresh.js` as having a short usability window — run it immediately before the actual data fetch, in the same session/turn, not as a separate "fix it now, use it later" step.
2. If a fetch fails with `M_UNKNOWN_TOKEN` shortly after a refresh, just re-run `matrix-token-refresh.js` again immediately before retrying — don't try the OAuth2 refresh_token grant directly via curl/node (it will likely 400 `invalid_grant` since the captured refresh_token is usually stale).
3. Never report this gap as "token expired" to the user — it's an internal timing detail, fix by re-refreshing right before use.

Related: [[feedback_matrix_token_never_report_expired]], [[feedback_matrix_refresh_headless_bug]]
