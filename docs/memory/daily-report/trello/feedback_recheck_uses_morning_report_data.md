---
name: feedback_recheck_uses_morning_report_data
description: When rechecking Trello items, use data already captured in the morning report — NEVER re-query today's channels
metadata:
  type: feedback
---

When doing recheck (Piece 11 or any afternoon recheck), the Trello "Check Progress" items are gates on **YESTERDAY's** developer activity — which is already captured in the morning report.

**Why:** User has said this multiple times. The daily report skill scans the window from last_run to ~08:00+07 (yesterday's activity). Rechecking Trello at 3PM means checking if yesterday's data meets the gate — NOT re-querying today's Slack/email. Re-querying today returns false negatives ("Kai no report today" when Kai already reported yesterday).

**How to apply:**
- At recheck time, READ the existing daily report sections (Slack, email, Discord, etc.)
- Use the data already captured there to evaluate each Trello gate
- Only re-query live sources if: (a) the morning cron failed to capture that source, or (b) the gate explicitly requires live/real-time data (e.g. Aysar MPDM ~17:00)
- Never say "X no report" based on today's channel when the morning report shows X DID report yesterday
