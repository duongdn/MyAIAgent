---
name: upwork_access_token_needs_live_browser_touch
description: Rory/Aysar/Neural Upwork "session expired" on financial pages (timesheet, reports) despite valid cookies — real fix is a live page load in carrick's real Chrome, not re-login
metadata:
  type: feedback
---

Cookie-injection auth (see [[reference_upwork_workrooms]] / [[feedback_neural_consolidated]] "PERMANENT FIX") works fine for `/nx/wm/` (workroom messages) but can silently fail on stricter pages — `/timesheet`, `/nx/reports/freelancer` — with `status: session_expired` even though carrick's saved session is genuinely alive.

**Root cause (confirmed 2026-09-14):** the specific cookie `user_oauth2_slave_access_token` in carrick's real Chrome Profile 1 is short-lived and only refreshes when carrick's browser actually loads a page on upwork.com (client-side silent refresh using `master_refresh_token`, which itself lasts longer ~2 weeks). A frozen cookie-DB snapshot used for injection can carry an already-expired access token even though `master_refresh_token`/`recognized` still look valid for weeks — messages pages apparently don't hard-check this token, timesheet/reports pages do.

**Fix — do this before assuming a real login is needed:**
1. Check `sqlite3 "/home/nus/.config/google-chrome/Profile 1/Cookies" "select name,datetime(expires_utc/1000000-11644473600,'unixepoch') from cookies where host_key like '%upwork%' and name='user_oauth2_slave_access_token'"` (copy the file first if locked: `cp ... /tmp/x.db`). If missing/expired, that's the cause — not a login problem.
2. Launch `DISPLAY=:1 google-chrome-stable --profile-directory="Profile 1" "https://www.upwork.com/nx/wm/"` — if a real Chrome instance is already running (common on this shared desktop), this opens a new tab via IPC ("Opening in existing browser session") rather than a fresh process; either way the page load triggers Upwork's silent token refresh.
3. Wait ~5s, retry `upwork-memo-check.js` / `upwork-weekly-hours.js` — cookie injection now works with no login/headless-relogin needed.

**Never write "session expired, needs manual re-login" without doing steps 1-2 first** — this is a ~10-second automated fix, not a human-blocking one. Confirmed working 2026-09-14: fixed Rory/Aysar memo-check mid-session, found real valid memo data for Aysar (09-07/08/11).

See also [[feedback_gui_automation_risk_on_shared_desktop]] — this uses a normal browser page-open, not xdotool/synthetic input, so it's lower-risk than GUI automation, but it does touch the real shared desktop's Chrome window (opens a visible tab) — fine for a quick fetch, avoid doing this repeatedly/noisily.
