---
name: feedback_workstream_tasklog_date_must_be_friday
description: "Bailey Weekly Monitor task-log entry to Workstream must use Friday's date of that week, not the actual run date (monitor often runs Thu or other days)."
metadata:
  type: feedback
---

`scripts/workstream-write-tasklog.js speedventory <date> "Weekly Monitor {Month} {Year}" 1` must be called with `<date>` = the **Friday** of the current week, even if the monitor run happens on a different day (e.g. run on 2026-09-03 Thursday, but must log as 2026-09-04 Friday).

**Why:** User corrected 2026-09-04: "nó cần log vào thứ 6" (it needs to log on Friday) — weekly monitor task log convention expects the entry dated to the week's Friday, same as the old Paturevision Sheets convention (see `util:tasklog-write.md`'s example row uses `Fri, 30/05/26`). [[feedback_bailey_moved_to_workstream_speedventory]] only documents the Workstream migration, not this date rule.

**How to apply:**
- Before calling `workstream-write-tasklog.js` for Bailey's weekly monitor entry, compute the Friday of the current ISO week (not `date +%F` / today) and pass that as the date arg.
- If catching up a late/retry write (like the 2026-09-03 401-outage retry done 2026-09-04), still date it to that week's Friday, not the day the retry actually succeeded.
