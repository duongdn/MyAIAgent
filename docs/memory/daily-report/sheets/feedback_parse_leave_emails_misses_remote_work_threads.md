---
name: feedback_parse_leave_emails_misses_remote_work_threads
description: "parse-leave-emails.js only matches 'Đơn xin nghỉ phép' (formal leave) subjects — misses 'Đơn xin làm remote' (remote-work request) threads that resolve into de facto approved absence, causing a false 0h alert"
metadata:
  type: feedback
---

**2026-09-21 recheck:** flagged LeNH 0h on Fri 09-18 as a real alert ("no leave on file") after checking `config/leave-plan.json` and `parse-leave-emails.js` output — both showed nothing for that date. User asked "did you check email" and a direct IMAP search for `SUBJECT "LeNH"` since 09-16 found a 3-message thread `parse-leave-emails.js` never picked up: LeNH emailed 09-18 07:51 asking to work remote (fever + stomach pain), Office Admin forwarded to his manager Nam Tran, who replied 08:47 "em off nghỉ ngơi, ko làm remote" (take the day off, don't work remote) — an approved sick day, not unexcused absence.

**Why it was missed:** `parse-leave-emails.js` only searches/matches subjects shaped like "Đơn xin nghỉ phép" (formal leave request). "Đơn xin làm remote" (remote-work request) is a different subject pattern the script doesn't scan for at all, even though in practice these threads sometimes resolve into an approved day off (manager says rest instead of remote) rather than actual remote work.

**How to apply:** Before flagging ANY 0h day as a real alert — especially for LeNH's strict <1h-shortfall gate — do a direct email search (not just `parse-leave-emails.js` / `leave-plan.json`) for the dev's name in subjects around that date, since remote-work-request threads are a known blind spot. This is now backfilled into `config/leave-plan.json` (`lenh-2026-09-18` entry) as a stopgap; the script itself should ideally be widened to also match "làm remote" subjects, or at minimum surface them for manual review instead of silently dropping them.
