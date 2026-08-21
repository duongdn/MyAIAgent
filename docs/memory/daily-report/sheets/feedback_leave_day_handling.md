---
name: feedback_leave_day_handling
description: "Weekly hour targets must be pro-rated for approved leave days (from leave-plan.json) before computing shortfall — raw actual-vs-full-target math is wrong on any leave day"
metadata:
  node_type: memory
  originSessionId: 754a9366-d1fc-446c-b7d4-a6661c260ab2
  type: feedback
---

# 🔴 Leave Day Handling — read EVERY time you compute shortfalls or flag 0h

Leave status per dev/date comes from `config/leave-plan.json` (see [[project_leave_plan_system]]) — full day or half day.

## Three places the rule applies — DO NOT skip any

### 1. Daily report missing (Slack/Discord daily-report check)
If the period covered was a leave day, absence of a daily report = expected. Mark Trello complete, no alert.

### 2. 0h check (Workstream/sheets piece)
Full-day leave → 0h day is OK, no alert, no Matrix reminder. Half-day leave → ≥4h is OK.

### 3. Weekly hour-target shortfall (weekly-monitor, daily report tables)  ⚠️ **MOST MISSED**
**Pro-rate the target before computing shortfall.**

```
adjusted_target = full_target × (5 − full_leave_days − 0.5 × half_leave_days) / 5
shortfall = adjusted_target − actual
```

**Concrete examples:**
- LongVV 16h/wk, Fri full leave → target 16×4/5 = **12.8h**. Actual 8h → −4.8h gap.
- 8h/day dev 40h/wk, Wed full leave → target 40×4/5 = **32h**. Actual 30h → −2h gap.
- 8h/day dev 40h/wk, Tue half leave → target 40 − 4 = **36h**. Actual 36h → ✓.

**Never** write shortfall as `actual vs full_target` when any leave day exists. The table cell MUST show the adjusted target and reflect the leave in the Status column:

```
✓ DO:   | LongVV | Maddy | 8h | 12.8h (Fri leave) | ⚠️ −4.8h (Tue–Thu 0h unexplained) |
✗ DON'T | LongVV | Maddy | 8h | 16h               | ⚠️ SHORTFALL −8h                     |
```

## Why this memory exists

User pushback `2026-05-23`: weekly-monitor W27 flagged LongVV "⚠️ SHORTFALL −8h" (8h vs 16h) — the report text BELOW the table correctly noted the Fri leave but the table row didn't reflect it. Rule now lived only as a one-line bullet in the (since-removed) old sheets-parsing memory — didn't say *pro-rate the weekly target*, so data was visible but math wasn't adjusted.

## Application checklist (run BEFORE writing any hour table)

1. Check `config/leave-plan.json` for each dev, for the reporting week's exact dates.
2. Count full-day and half-day leave entries → compute `adjusted_target`.
3. Write the table cell as `actual | adjusted_target ({leave-day description}) | ⚠️ −Xh ({remaining gap location})`.
4. If `actual ≥ adjusted_target` → ✓ OK, **never** flag as shortfall even when `actual < full_target`.
5. Cross-check: the prose sentence about leave days must match the table number. If table says `−8h` but prose says "Fri leave excused", one of them is wrong.

Related: [[feedback_longvv_consolidated]] (LongVV-specific 16h Maddy target), [[feedback_lenh_consolidated]] (sub-8h alert rule applies AFTER pro-rating).

## 🔴 Always check leave-plan.json for the EXACT date, not just "today"

**2026-07-10:** `config/leave-plan.json` had TWO separate KhanhHH entries: `khanhhh-2026-07-09` (full day, dentist) AND `khanhhh-2026-07-10` (full day, recovery) — both approved, both real. Report only surfaced the Jul-10 entry and, when evaluating her Jul-9 0h separately, described it as "mid-day dental disruption" instead of re-checking leave-plan.json for that date too — which would have shown it was ALSO a full approved leave day. User caught it: "KhanhHH off 2 hôm nay mà!!!" (she's off 2 days!).

**Rule:** when explaining ANY dev's 0h/shortfall for a specific date, re-check `config/leave-plan.json` for THAT exact date (grep by dev_id + date, not just whatever leave was mentioned in the report header). A dev can have multiple, separate leave-plan entries covering consecutive days — each needs its own lookup, don't assume "today's leave line" is the only one relevant.
