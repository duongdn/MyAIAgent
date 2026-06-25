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

**Corrected 2026-06-25 — only applies to ALREADY-REALIZED hours, never to a still-in-progress week:** The original example (LeNH, Friday) worked because Friday is the LAST workday — by then the full week's hours were already banked and the total was a real, completed fact. User caught a wrong application 2026-06-25: TuanNT was 0.7h short on Wednesday (Mon=8h, Tue=8h exactly, no surplus banked), and this was excused as "within weekly tolerance" by reasoning that Thu/Fri could still make it up — but those days hadn't happened yet, so that's an unrealized assumption, not a fact. User: "ko đúng, 7.3h là thiếu rồi, nếu trước đó làm dư thì ko nói" (not correct, 7.3h IS short — only excuse it if PRIOR days already had genuine surplus).

**Revised rule:** Only excuse a daily shortfall using "weekly tolerance" if:
- The week (or the days checked so far) are fully in the past — i.e. you're looking at Friday or later, evaluating the whole completed week, OR
- The PRIOR days in the same week already contain a real, already-logged surplus that offsets today's gap (e.g. Mon=9h, Tue=8.3h would offset a Wed shortfall).
Never excuse a mid-week shortfall by assuming future days will cover it — that's a prediction, not a fact. Report it as a real (if minor) shortfall, and only revisit once the week is actually complete.
