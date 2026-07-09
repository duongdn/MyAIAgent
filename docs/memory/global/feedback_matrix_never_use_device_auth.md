---
name: feedback_matrix_never_use_device_auth
description: Never use matrix-device-auth.js (URL+code flow) for Matrix re-auth — user clicks directly in the visible DISPLAY=:1 browser window, no external link/code needed
metadata:
  type: feedback
---

Rule: when Matrix token + refresh_token both expire, do NOT fall back to `scripts/matrix-device-auth.js` (device-code flow requiring the user to visit an external URL and type a code). Use `DISPLAY=:1 node scripts/matrix-token-refresh.js` (or `matrix-login.js`) instead — this opens a real browser window on the user's visible DISPLAY :1 (VNC) that they click/login in directly, same as any other manual browser step in this project.

Why: user explicitly said (2026-07-09) "we open the browser and I clicked, never need such one, this is bad way" — reacted with frustration to being asked to visit a URL+code. The skill doc's documented fallback chain (browser SSO → device-code) is wrong for this user's actual setup; device-code should be treated as removed/forbidden, not a fallback.

How to apply: on any Matrix token failure, only ever run the visible-browser refresh script and give the user time to click in that window (it's already open on their screen). If it times out, retry the same visible-browser script again rather than escalating to device-auth. If truly stuck after a few visible-browser retries, ask the user directly rather than switching flows.

**Related — same principle for other login-gated accounts (2026-07-09):** for the Arthur/Meta-Stamp "Solid Code" Slack workspace, DO NOT rely on cookie-file extraction scripts (`get-david-slack-cookies.py` / `get-david-google-cookies.py` feeding into `slack-extract-solid-code-team-token.js`) as the primary path — the extracted Google cookies can show as "Signed out" in the extraction browser even when David's real Chrome profile is actively logged in elsewhere. User: "đã nói bao nhiêu lần rồi mà, dùng profile David vô xem" (told you many times, use David's profile). **Correct method: open David's REAL Chrome profile directly** — `DISPLAY=:1 google-chrome --profile-directory="Profile 15" "https://solid-code-team.slack.com/"` (opens in the existing visible Chrome instance since Chrome is a singleton) — confirm with the user it shows logged in, then extract the live xoxc token from that profile's own `Local Storage/leveldb/*.log` (`grep -o '"token":"xoxc-[^"]*"'`) and the `d` cookie via `get-david-slack-cookies.py` (which already reads Profile 15's real Cookies DB, not a stale copy). This is the "use the real logged-in profile" pattern — the same family of fix as the Matrix visible-browser rule above, generalized: when an account has a known persistent browser profile, always drive that profile directly rather than any cookie-copy/export intermediate step.
