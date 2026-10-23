---
name: feedback_fb_post_cron_failures_path_and_logout
description: FB post cron 10-21→23 failures — PC off at 07:00, cron PATH lacked claude/node, FB never network-idle, automation profile logged out; fixes applied
metadata:
  type: feedback
---

From 2026-10-21 to 10-23 no draft got posted. The user said: "ko thấy facebook post chạy".
1. **Cron time.** At 07:00 the PC is off (it boots around 08:15). The cron now runs at 08:45.
2. **Cron PATH.** It has no ~/.local/bin (claude) and no nvm (node), so the script failed with `/usr/bin/claude: No such file`. `autorun-fb-post.sh` now sets PATH before resolving claude.
3. **FB page waits.** FB never reaches `networkidle2`, so goto timed out. The script now uses `domcontentloaded` and waits for the composer opener.
4. **Logged-out automation profile.** FB logged out `tmp/facebook-profile`, leaving a "Continue / Use another profile" screen while the URL stayed /me. The user re-logs in their REAL Chrome (Profile 9), not the automation profile. The session lib now re-seeds FB cookies from Profile 9 on every launch via `scripts/get-chrome-profile9-site-cookies.py facebook`, which also serves strava.

**Why:** the user only noticed after 2 silent missed days.
**How to apply:** when a cron "doesn't run", first read `tmp/alert-logs/fb-post-cron.log`. For a login problem, ask the user to log into facebook.com in Chrome Profile 9; never ask them to run the --login of the automation profile. Related: [[project_fb_daily_post_draft_is_only_me]]
