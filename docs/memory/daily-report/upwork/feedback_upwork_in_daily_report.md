---
name: feedback_upwork_in_daily_report
description: Upwork monitoring must be included in daily report — 5 workrooms across 3 accounts
type: feedback
---

Upwork weekly hours must be checked as part of the daily report and refresh cycles.

**Why:** User asked "I see no Upwork report, why?" — Upwork was missing from workflow doc but config and scripts exist. User confirmed it should be included.

**How to apply:**
1. Run `node scripts/upwork-weekly-hours.js` to fetch all 5 workrooms
2. Include Upwork section in daily report with: workroom, client, developer, this week hours, daily breakdown
3. Compare Upwork hours with task log (sum ALL rows including Part-time for Upwork comparison)
4. Flag discrepancies > 1h between Upwork and task log
5. Workrooms: Rory (LeNH), Aysar (LeNH), Bailey-VietPH, Bailey-DuongDN, Neural Contract (external, messages only)
