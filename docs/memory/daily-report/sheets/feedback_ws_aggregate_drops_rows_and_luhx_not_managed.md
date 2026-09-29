---
name: feedback_ws_aggregate_drops_rows_and_luhx_not_managed
description: "2026-09-29: workstream-fetch-project-week.js members[] missed TuanNT's 8h Speedventory rows (raw /review/week had them) → false 0h; LuHX on Maddy is a different, unmanaged role (no Kai gate)"
metadata:
  type: feedback
---
1. **Before flagging any dev 0h, query raw `/review/week?projectId=..&date=<mid-week>` rows by employeeName** — the aggregate script's `members[].days` showed only DatNC on speedventory for Mon 09-28, while raw rows showed TuanNT 8h. User corrected: "TuanNT có Bailey".
   **Why:** false 0h → wrong reminder risk. **How to apply:** raw-row check per dev before any 0h claim/reminder; fix the aggregation bug when touching the script.
2. **LuHX logging on Maddy = different role, not managed by us** (user 2026-09-29). Never treat LuHX hours as Kai-role; Kai daily-report gate stays on LongVV only.
Related: [[feedback_kai_daily_report_gate]], [[feedback_verify_workstream_zero_hours_before_alerting]]
