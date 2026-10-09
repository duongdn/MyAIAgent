---
name: feedback_upwork_memo_check_run_headless_never_open_windows
description: Run upwork-memo-check.js with env -u DISPLAY (headless); never open Chrome tabs/windows on the shared desktop for Upwork
metadata:
  type: feedback
---

`upwork-memo-check.js` opens a VISIBLE Chrome whenever DISPLAY is set. Always run it as `env -u DISPLAY node scripts/upwork-memo-check.js ...` so nothing pops up on the screen.

**Why:** 2026-10-09: user had already logged in to Upwork (Profile 9 / Tokenlite). Claude kept opening Chrome tabs plus visible Puppeteer windows anyway. User was annoyed ("đã nói là login rồi mà sao cứ mở ra vậy"). Headless run worked fine once the user was logged in.

**How to apply:** If a check hits login_failed, ask the user to log in. Do not open tabs yourself. Once the user says they have logged in, rerun headless only. This overrides the "open the page in the real browser" step in [[upwork_access_token_needs_live_browser_touch]].
