---
name: never-report-matrix-token-as-expired-without-exhausting-refresh-paths
description: "🔴 UPDATED 2026-07-13 — Matrix's PRIMARY credential is now a static non-expiring mct_ token (see project_matrix_static_compat_token), not the OIDC refresh flow. The old 'run matrix-token-refresh.js first' advice below is now FALLBACK-ONLY, for the rare case the static token itself dies."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 754a9366-d1fc-446c-b7d4-a6661c260ab2
---

🔴 **Since 2026-07-13, `config/.matrix-config.json`'s `access_token` is a static, non-expiring `mct_` compat token issued by the homeserver admin — see [[project_matrix_static_compat_token]]. It should just work, indefinitely, without any refresh step.** The content below (originally "always run matrix-token-refresh.js first") describes the OLD OIDC flow, which is now a fallback used only if the `mct_` token itself starts failing.

NEVER write "Matrix token expired" or "headless refresh fails" or "browser profile corrupted" in any report without first confirming the static `mct_` token in config actually fails (retry the API call once), and only THEN running `node scripts/matrix-token-refresh.js` as the fallback recovery step.

**Why (original incident, 2026-05-05, still instructive for the fallback path):** The Fountain piece falsely reported "Matrix token expired, headless refresh fails (browser profile corrupted). Falling back to W24 plan; W25 unverified" — but when re-attempted, `scripts/matrix-token-refresh.js` succeeded immediately, found a valid token already in config, and the W25 plan was posted. The corruption claim was unverified speculation.

**How to apply:**
1. First: retry the actual Matrix API call once with the existing static `mct_` token — most "failures" are transient network issues, not token death.
2. If the static token is genuinely dead (401/403 repeatedly): run `node scripts/matrix-token-refresh.js` (fallback OIDC flow). Read its actual stdout.
3. If the script reports "Token valid" — config already has a working token; the original API call had a transient issue. Re-read config and retry.
4. If OIDC refresh_token returns invalid_grant, that's expected when a placeholder/stale token is in config — fall through to the visible-browser SSO path (`DISPLAY=:1 node scripts/matrix-login.js`) automatically. NEVER `matrix-device-auth.js` — banned, see [[feedback_matrix_never_use_device_auth]].
5. Browser profile lock files (`tmp/matrix-browser-profile/Singleton*`) can be removed safely; this is NOT corruption.
6. The correct homeserver for API calls is `https://matrix.nustechnology.com` (not `chat.nustechnology.com` which serves the web client and returns 405 on PUT).
7. Only escalate as "blocked" if the static token is confirmed dead AND the fallback script errors AND every documented fallback fails. Even then, show the actual error output, not a guess.
