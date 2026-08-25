---
name: feedback_maddy_low_hours_high_bugs_is_real_gap
description: Monday report — Maddy showing few WS hours but multiple bugs fixed is a real Kai task-log undercapture, not a data error; verify via raw Slack timestamps before assuming miscounted bugs
metadata:
  type: feedback
---

2026-08-24 run (week 2026-08-17..08-23): Maddy showed 3h WS hours (LongVV) but 4 external bugs fixed. User flagged the ratio as suspicious ("so strange, why 4 external bug but no more Maddy work???"). Verified by dumping raw Slack `search.messages` timestamps for the Xtreme Soft Solutions workspace and converting epoch→+07 date — confirmed all 4 bugs (restock qty after refund, LIFM2-459 buy-tab, Xero connection expired, overseas orders wrong tax code) were real, distinct, timestamped within the reporting week (08-17 to 08-21), with Kai (LongVV) actively debugging/fixing in real time. Not duplicate-thread inflation.

**Why:** Kai's Workstream task-log entries chronically undercount his actual dev time on Maddy — a known identity/tracking gap (see [[project_monday_report_sheets]], [[feedback_maddy_workstream_hours_longvv_filter]]). This is the same root pattern as Maddy's other data gaps, just showing up as an hours/bugs mismatch instead of a stale-sheet mismatch.

**How to apply:** If Maddy (or any project) shows a low-hours/high-bug-count ratio that looks off, don't assume the bug count is wrong — pull raw Slack messages with real timestamps and verify each bug is (a) within the reporting week and (b) a distinct issue, not a thread continuation. If confirmed real, present the discrepancy to the user directly rather than silently adjusting either number. User's call 2026-08-24: keep WS hours as submitted (don't inflate hours to match bug count), just note the gap in the report.

Related: [[feedback_maddy_workstream_hours_longvv_filter]], [[feedback_external_bug_counting_judgment_calls]]
