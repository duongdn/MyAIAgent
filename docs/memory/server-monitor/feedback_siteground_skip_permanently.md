---
name: feedback-siteground-skip-permanently
description: "Skip Siteground storage check (Bailey) in server-monitor from now on — user opted out due to CAPTCHA/manual-login friction"
metadata:
  type: feedback
---

Do NOT run `node scripts/siteground-storage.js` in server-monitor anymore. User decision 2026-08-28: "Skip siteground from now" after repeated CAPTCHA/manual-login timeouts (visible DISPLAY=:1 browser opened, login page requires human CAPTCHA solve, unattended runs always time out).

**Why:** Login requires live human CAPTCHA solving every time — not automatable, wastes ~3min/run waiting on a timeout that never resolves unattended.

**How to apply:** In Bailey's server group, skip step 1 (Siteground) entirely. Only run steps 2-4 (Console, Redis, Staging). Mark Bailey Trello checklist item complete once those 3 are done — do not block on Siteground.

[[feedback_server_safety_consolidated]]
