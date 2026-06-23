---
name: Never report Matrix token as expired without exhausting refresh paths
description: Matrix token refresh via scripts/matrix-token-refresh.js is reliable. The "browser profile corrupted" excuse has been wrong every time — try the script first, no excuses.
type: feedback
---

NEVER write "Matrix token expired" or "headless refresh fails" or "browser profile corrupted" in any report without first running `node scripts/matrix-token-refresh.js` and reading its actual output.

**Why:** User has corrected this multiple times, including 2026-05-05. The Fountain piece falsely reported "Matrix token expired, headless refresh fails (browser profile corrupted). Falling back to W24 plan; W25 unverified" — but when re-attempted, `scripts/matrix-token-refresh.js` succeeded immediately, found a valid token already in config, and the W25 plan was posted (trinhmtt 05-04 11:56). The corruption claim was unverified speculation.

**How to apply:**
1. When Matrix API returns M_UNKNOWN_TOKEN, the FIRST recovery step is `node scripts/matrix-token-refresh.js`. Read its actual stdout.
2. If the script reports "Token valid" — config already has a working token; the original API call had a stale token. Re-read config and retry.
3. If OIDC refresh_token returns invalid_grant, that's expected when the placeholder `mar_expired_test_token` is in config — fall through to browser SSO path automatically.
4. Browser profile lock files (`tmp/matrix-browser-profile/Singleton*`) can be removed safely; this is NOT corruption.
5. The correct homeserver for API calls is `https://matrix.nustechnology.com` (not `chat.nustechnology.com` which serves the web client and returns 405 on PUT).
6. **`matrix-send-message.js` ALSO refreshes the token internally via browser.** If `matrix-token-refresh.js` times out waiting for user login, do NOT report blocked — instead run `node scripts/matrix-send-message.js <room> <msg>` directly. It uses the saved browser profile (tmp/matrix-browser-profile/) which has the SSO session and auto-logs in. This has worked successfully when refresh-only script timed out (2026-05-29).
7. **NEVER surface token errors to the user.** Fix silently, send the message, only report success. Reporting "expired" or "blocked" is a repeated violation that angers the user.
