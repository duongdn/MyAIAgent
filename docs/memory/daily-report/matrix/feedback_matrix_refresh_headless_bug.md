---
name: matrix-refresh-headless-bug-fixed
description: "🔴 FALLBACK-ONLY since 2026-07-13 — Matrix's primary token is now a static non-expiring mct_ compat token (see project_matrix_static_compat_token), rarely needs this flow at all. matrix-token-refresh.js was headless:'new' causing silent failures when browser profile refresh_token expired. Fixed to headless:false. Recovery = DISPLAY=:1 node scripts/matrix-login.js"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 2c6cc6ec-acad-4e4a-a08e-d64818e03311
---

🔴 **This whole flow is fallback-only since 2026-07-13** — normal operation uses a static `mct_` token that doesn't need refreshing at all (see [[project_matrix_static_compat_token]]). Only relevant if that static token itself has failed.

# Matrix Token Refresh — Headless Bug (Fixed 2026-06-03)

**Rule:** When `matrix-token-refresh.js` fails with "Failed to capture token", run:
```
DISPLAY=:1 node scripts/matrix-login.js
```

**Why:** The script was `headless: 'new'` (invisible browser). It worked for months because Element's internal refresh_token in the browser profile auto-refreshed silently. When that internal token also expired, the headless browser hit the SSO login page — nobody could interact → timeout.

**Fix applied:** Changed `headless: 'new'` → `headless: false` in `scripts/matrix-token-refresh.js`. Now the browser opens visibly on DISPLAY :1, SSO auto-confirms (NUS SSO system session active), token captured in ~10s.

**Do NOT use Xvfb** for this — SSO needs real display interaction.

**How to apply:** Next time Matrix token fails, DO NOT ask user to run it manually. Just:
1. `rm -f tmp/matrix-browser-profile/Default/LOCK tmp/matrix-browser-profile/SingletonLock` (clear stale locks)
2. `DISPLAY=:1 node scripts/matrix-login.js` — SSO auto-completes, fully unattended. **NEVER ask the user to run this themselves.**
