---
name: feedback_sheets_scan_script_reuse_wrong_day
description: daily-sheets-scan-*.js must be freshly written each morning with today's PREV_TOKENS — silently reusing yesterday's script reports an entire day's data under the wrong date, with no error
metadata:
  type: feedback
---

🔴 **CRITICAL — verify before trusting any sheets row in a daily report.**

The `daily-sheets-scan-{date}-{day}.js` scripts hardcode `PREV_TOKENS` (e.g. `["Wed, 17/06/26", "17/06/26"]`) for the specific date they were written for. On 2026-06-19, no fresh script existed for that morning — the cron silently executed the previous day's script (`daily-sheets-scan-260618-thu.js`, tokens hardcoded to Jun 17). It ran without any error and confidently returned Jun 17's numbers labeled as Jun 18's for **every dev row in the Sheets piece** (TuanNT, Elena, KhanhHH, PhucVT, VietPH all affected — PhucVT/VietPH only "looked" correct because they happened to log identical hours both days).

**Why this is dangerous:** unlike a missing-script error, this fails silently and produces plausible-looking wrong numbers. It went undetected through the cron run and an initial interactive recheck pass, and was only caught because the user spotted that TuanNT's reported hours matched a description that read like a Wednesday task.

**Consequence when this happened:** TuanNT's real Jun18 0h (no leave) was masked as "4h, no alert," which gates 3 Trello client items (John Yi, Bailey, Rebecca per [[feedback_tuannt_trello_gates]]) — all 3 were wrongly auto-completed.

**How to apply:**
1. Before trusting a daily-sheets-scan output, check that a script dated for *today* actually exists: `ls scripts/daily-sheets-scan-{YYMMDD}*.js`. If it doesn't exist and the cron ran anyway, the data is suspect — re-verify manually.
2. When writing a new day's script, grep the old one's `PREV_TOKENS` / `PREV_DATE` comment and confirm the new file's tokens actually changed — don't copy-paste without editing the date.
3. Spot-check at least one dev's hours against the actual sheet's day-block header (e.g. "Thu, 18/06/26") before accepting cron output as fact, especially before using it to gate Trello completions.
4. If a discrepancy is found, assume EVERY row in that script's output is suspect, not just the one that was caught — re-verify all of them (this is what happened: catching TuanNT led to also finding Elena and KhanhHH wrong in the same run).

See [[feedback_vietph_leave_date_cron_bug]] for the related but distinct single-lookup version of this date-off-by-one family.
