---
name: feedback_matrix_never_use_device_auth
description: Never use matrix-device-auth.js (URL+code flow) for Matrix re-auth — user clicks directly in the visible DISPLAY=:1 browser window, no external link/code needed
metadata:
  type: feedback
---

Rule: when Matrix token + refresh_token both expire, do NOT fall back to `scripts/matrix-device-auth.js` (device-code flow requiring the user to visit an external URL and type a code). Use `DISPLAY=:1 node scripts/matrix-token-refresh.js` (or `matrix-login.js`) instead — this opens a real browser window on the user's visible DISPLAY :1 (VNC) that they click/login in directly, same as any other manual browser step in this project.

Why: user explicitly said (2026-07-09) "we open the browser and I clicked, never need such one, this is bad way" — reacted with frustration to being asked to visit a URL+code. The skill doc's documented fallback chain (browser SSO → device-code) is wrong for this user's actual setup; device-code should be treated as removed/forbidden, not a fallback.

How to apply: on any Matrix token failure, only ever run the visible-browser refresh script and give the user time to click in that window (it's already open on their screen). If it times out, retry the same visible-browser script again rather than escalating to device-auth. If truly stuck after a few visible-browser retries, ask the user directly rather than switching flows.
