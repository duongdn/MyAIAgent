---
name: feedback_monday_discord_scan_friday_window
description: Monday Discord/Slack scan must start from FRIDAY (not Saturday). Jun 5=Fri, Jun 6=Sat — wrong date = miss Friday reports
metadata:
  node_type: memory
  type: feedback
  originSessionId: current
---

# Monday Report: Window Starts Friday, NOT Saturday

## Rule

**Monday daily report window = last Friday 08:00 +07 → Monday 08:00 +07.**

When computing the Discord/Slack/Matrix scan window on Monday, always go back to FRIDAY, not Saturday or Sunday.

**Why:** Vinn posted Friday Jun 5 17:32 "Just report my process today:..." — missed because scan started Jun 6 (Saturday) 08:00 instead of Jun 5 (Friday) 08:00. User had to manually correct.

**How to apply:**
- If today = Monday: `window_start = last_friday_08:00+07`
- `last_friday = today - 3 days` (Mon - 3 = Fri)
- In JS: `new Date(mondayDate - 3*24*60*60*1000)` then set hours to 08:00
- NEVER start Monday window from Sunday or Saturday
- This also applies to the autorun script's SEARCH_AFTER date

## Incident 2026-06-08

Scan used `new Date('2026-06-06T01:00:00Z')` (Jun 6 Sat 08:00+07) instead of `new Date('2026-06-05T01:00:00Z')` (Jun 5 Fri 08:00+07). Missed Vinn's Friday report. All 4 incomplete items ended up blocked by this single wrong date.

Related: [[feedback_monday_friday_timestamp]], [[feedback_vinn_daily_report_format]]
