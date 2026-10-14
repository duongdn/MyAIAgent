---
name: zero_hours_check_prior_report_leave_before_alert_or_reminder
description: Before flagging 0h or sending a reminder for a past day, read that day's daily report leave plan. leave-plan.json can miss sick leave
metadata:
  type: feedback
---
On 2026-10-14 the cron flagged TuanNT 0h for 10-12 and 10-13. Recheck sent a reminder ("0h for 10-12 and 10-13"). Both were wrong:
- 10-12 = off sick. This was already recorded in the 10-13 report (email 06:57 + Resource Arrangement), but missing from `config/leave-plan.json` (parser missed it).
- 10-13 = 8h on Speedventory. The rows appeared in WS between 08:52 and 09:05.

User: "TuanNT log rồi mà ???", "ngày 12 off mà !!!"

**Why:** leave-plan.json is not complete. The previous day's report has the verified leave line.
**How to apply:** For any 0h day D, grep `reports/{D and D+1}/daily-report.md` (and `reports/backup/`) for that dev's leave/off/nghỉ before alerting. Re-fetch WS immediately before sending, and list only the days that are still genuinely 0h. Add missed leave entries to leave-plan.json. Related: [[verify_workstream_zero_hours_before_alerting]] [[parse_leave_emails_misses_remote_work_threads]]
