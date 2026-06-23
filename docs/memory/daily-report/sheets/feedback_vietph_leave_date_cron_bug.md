---
name: feedback_vietph_leave_date_cron_bug
description: Leave notes read at cron time may apply to wrong date — always verify leave note is for PREV_DATE, not PREV_DATE-1
metadata:
  type: feedback
---

Cron scripts reading leave notes at 05:00 can incorrectly apply the PREVIOUS day's leave note to PREV_DATE's hours check. VietPH was marked "leave day" Jun 10 because the script read Jun 9's "Nghỉ cả ngày" note as if it applied to Jun 10.

**Why:** Jun 11 daily report showed VietPH "leave day, 0h OK" but he actually worked 8h on Jun 10. User: "not nghỉ cả ngày Wednesday, this on Tuesday." Cron had read the Jun 9 row's leave note and incorrectly flagged Jun 10 as leave.

**How to apply:**
- When verifying a dev worked or was on leave for PREV_DATE, confirm the leave note is on PREV_DATE's day header row — not PREV_DATE-1
- Sheet date headers format: "Wed, 10/06/26" — parse the date from the header, don't assume adjacency
- If cron says "leave day" and it seems wrong → verify manually by reading the sheet date header for PREV_DATE
- See [[feedback_sheets_scan_prev_date_for_daily_hours]] — leave notes use today's tokens but must be checked against PREV_DATE's row
