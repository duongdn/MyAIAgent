---
name: feedback_elena_sheet_permission_error
description: Elena Google Sheet (KhanhHH's 4th source) returns "caller does not have permission" for the daily-agent service account — sheets-tasklog-scan.js silently reports "no week tab found for date" instead of surfacing the auth error
metadata:
  type: feedback
  originSessionId: add6bc25698ff71ae
---

**Found 2026-07-03** (checking 2026-07-02 task logs): direct `spreadsheets.get` call with the service account (`config/daily-agent-490610-7eb7985b33e3.json`) against Elena sheet ID `1dH14D_XShHiVPReInjZ33YDP27cIBuV0q5BS9Nx-DRQ` returns `The caller does not have permission` — not a date/tab-mapping issue.

**Why this matters:** `sheets-tasklog-scan.js`'s `fetchRange()` swallows the error into a fake row (`["ERROR: ..."]`), which `discoverWeekTab()` then silently skips (doesn't match `/^W\d+/`), producing the misleading stderr line `Elena: no week tab found for date`. This looks like a benign date-mapping gap but is actually a total access failure — ALL of Elena sheet's data is invisible to every scan right now, including KhanhHH's 4th tracked source (see [[feedback_khanhhh_aysar_consolidated]]).

**Impact:** KhanhHH shortfall checks currently cannot verify the Elena source at all. On 2026-07-02, KhanhHH showed 5.5h combined (Baamboozle 1.5h + Generator 4h) via Workstream — Elena sheet could not be checked as a supplementary source. Not treated as a confirmed shortfall alert given the pattern of undercounting on this dev, but flagged as a real blind spot.

**Action needed:** Service account needs to be re-shared (Editor/Viewer) on the Elena sheet by whoever owns it — this is an infra fix outside a monitoring run's scope. Until fixed, any report checking KhanhHH must note "Elena sheet unreachable (permission error)" rather than treating the silent skip as "checked, clean."
