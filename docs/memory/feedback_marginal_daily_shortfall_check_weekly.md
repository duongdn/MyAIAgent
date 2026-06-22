---
name: feedback_marginal_daily_shortfall_check_weekly
description: Marginal daily shortfall (< 1h) — check weekly total before flagging. If weekly hours on track, per-day variance is NOT an alert.
metadata:
  type: feedback
---

**Rule:** Before flagging a marginal daily shortfall (< ~1h short), check the dev's WEEKLY total across all sources. If weekly total is within 1h of their weekly target, the daily variance is covered — do NOT alert, do NOT send reminder.

**Why (2026-06-22):** LeNH flagged as "ALERT (marginal): 0.67h short Fri Jun19." But LeNH had 1 day off that week → adjusted target = 4×8h = 32h. Weekly total = 32h exactly on target. Daily 0.67h shortfall on Friday was covered by the weekly hours. The per-day check missed this context entirely. User: "he worked 32h last week, 1 day off, how can you calculate 39.33???"

**How to apply:**
1. When a daily shortfall is < 1h: pull that dev's hours for ALL days of that week (Mon–Fri).
2. Sum weekly total across ALL 11 sheets + ALL Workstream projects (same scan, different date range).
3. If weekly_total ≥ weekly_target − 1h → no alert, note "within weekly tolerance."
4. If weekly_total < weekly_target − 1h → real alert, flag with weekly context shown: "X daily shortfall, Yh weekly vs Zh target."
5. Weekly targets: 8h/day × 5 = 40h/week (most devs); LongVV = 16h/week; part-timers per contract.

**Note:** For large daily shortfalls (> 2h), still flag regardless of weekly total — a dev can't skip whole days without notice even if they plan to catch up later.
