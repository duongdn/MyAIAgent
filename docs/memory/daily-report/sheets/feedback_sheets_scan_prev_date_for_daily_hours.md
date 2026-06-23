---
name: feedback_sheets_scan_prev_date_for_daily_hours
description: "Sheets daily-hours scan must use PREV_DATE (yesterday) tokens, not TARGET_DATE (today). Today's data = 0h at 05:00 since devs haven't started."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 93d3428d-d58a-4cde-9afe-1610d3aceef8
---

When running the daily sheets scan for a report covering work done YESTERDAY, use **yesterday's date tokens** (e.g. `MON_TOKENS` for Jun 8 rows), NOT today's tokens.

**Why:** On 2026-06-09, `daily-sheets-scan-260609-tue.js` had `TARGET_DATE = Jun 9` and used `TUE_TOKENS` for all hour lookups. The report was generated at 05:00 before devs started. Using Jun 9 tokens = 0h for everyone because no one had logged Jun 9 hours yet. All Jun 8 actual hours were missed.

**How to apply:**
- `TARGET_DATE` = today (used for leave note detection, Summary tab tab discovery)
- `PREV_DATE` = yesterday (used for extracting daily hours in task log rows)
- Always define `MON/TUE/WED/THU/FRI_TOKENS` for the previous workday
- PhucVT/VietPH leave notes = use today's tokens (they show up in today's block)
- KhanhHH/LeNH/TuanNT hours = use yesterday's tokens
