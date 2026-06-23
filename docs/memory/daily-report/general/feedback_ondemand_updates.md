---
name: On-demand monitoring updates separate from daily report
description: User wants ability to re-check all monitoring sources on-demand without affecting the daily report. Use separate timestamped files.
type: feedback
---

Support two monitoring modes:
1. **Daily report** (morning): `reports/YYYY-MM-DD-daily-report.md` — summarizes yesterday's full activity
2. **On-demand update** (anytime): `reports/YYYY-MM-DD-HHMM-update.md` — fetches latest activity since daily report or last update

**Why:** User needs real-time visibility into channels throughout the day, not just a morning summary. Daily report must remain intact for the next day's run.
**How to apply:** When user asks to "check again", "refresh", "update", or "rerun monitoring" — generate an update file with current timestamp. Don't overwrite the daily report. Tomorrow's daily report still covers the full previous day as normal.
