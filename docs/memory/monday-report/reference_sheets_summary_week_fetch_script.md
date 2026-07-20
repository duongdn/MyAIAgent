---
name: reference_sheets_summary_week_fetch_script
description: scripts/sheets-summary-week-fetch.js — fetch Summary!A6:D60 Actual hours for multiple sheets in one call, matching a target Monday date
metadata:
  type: reference
---

`node scripts/sheets-summary-week-fetch.js <YYYY-MM-DD-monday> '{"Name":"sheetId",...}'` reads each sheet's `Summary!A6:D60` tab and returns the row (week label, start date, end date, actual hours) matching the given Monday. Built 2026-07-20 for Monday report so all 8 project sheets can be queried in one script run instead of one-off per-project reads.

**Known fix baked in:** date parsing must NOT use `new Date(str).toISOString()` — Summary sheet dates are plain strings like "July 13, 2026" with no timezone, and converting through `Date`+`toISOString()` shifts the date back one day for any UTC+ timezone server (midnight local → previous-day UTC). The script parses "Month Day, Year" manually instead.

**How to apply:** Always cross-check the Summary sheet's Actual figure against Workstream `weekTotal` (see [[feedback_monday_report_hours_and_scope]]) — Summary can show a stale `0.00` while the underlying weekly tab (e.g. `W15`) is genuinely unfilled, which is a stronger staleness signal than just a zero.
