---
name: feedback_matrix_token_short_lived
description: Matrix OIDC access_token is short-lived (expires within minutes) — must fetch data in the SAME script run immediately after matrix-token-refresh.js, not as a separate later step
metadata:
  type: feedback
---

After `matrix-token-refresh.js` saves a new `access_token`, it stays valid for only a few minutes (confirmed 2026-06-25: a token verified working via `whoami` went back to `M_UNKNOWN_TOKEN` ~10 minutes later). The saved `refresh_token` is often ALSO already stale by the time you'd use it for an OAuth2 `grant_type=refresh_token` call, because the refresh script's response-interception logic only captures a new `refresh_token` when it appears in a `/oauth2/token` POST response body — when it captures the access_token via request-header sniffing instead (the common path), `refresh_token` in config is left unchanged from the PREVIOUS (already-consumed) value, so a direct refresh-token-grant retry fails with `invalid_grant`.

**Why:** Caused a `M_UNKNOWN_TOKEN` failure on a Fountain Matrix-plan fetch that ran a few minutes after a successful, verified `matrix-token-refresh.js` call — the gap between refresh and use was enough for the token to expire.

**How to apply:**
1. Treat `matrix-token-refresh.js` as having a short usability window — run it immediately before the actual data fetch, in the same session/turn, not as a separate "fix it now, use it later" step.
2. If a fetch fails with `M_UNKNOWN_TOKEN` shortly after a refresh, just re-run `matrix-token-refresh.js` again immediately before retrying — don't try the OAuth2 refresh_token grant directly via curl/node (it will likely 400 `invalid_grant` since the captured refresh_token is usually stale).
3. Never report this gap as "token expired" to the user — it's an internal timing detail, fix by re-refreshing right before use.

Related: [[feedback_matrix_token_never_report_expired]], [[feedback_matrix_refresh_headless_bug]]
