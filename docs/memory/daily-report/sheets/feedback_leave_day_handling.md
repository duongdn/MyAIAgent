---
name: ""
metadata: 
  node_type: memory
  originSessionId: 754a9366-d1fc-446c-b7d4-a6661c260ab2
---

# 🔴 Leave Day Handling — read EVERY time you compute shortfalls or flag 0h

Vietnamese leave markers appear in **column A** of the task log sheet for that date row:

| Marker | Meaning | Day hours OK | Weekly target adjustment |
|--------|---------|--------------|--------------------------|
| `Nghỉ cả ngày` | Full day off | 0h | Subtract 1 full day from target |
| `Nghỉ nửa ngày` | Half day off | ≥4h | Subtract 4h from target (or 0.5 day) |
| (none) | Regular workday | full target | none |

## Three places the rule applies — DO NOT skip any

### 1. Daily report missing (Slack/Discord daily-report check)
If the period covered was a leave day, absence of a daily report = expected. Mark Trello complete, no alert.

### 2. Task log 0h check (sheets piece)
If `Nghỉ cả ngày` → 0h day is OK, no alert, no Matrix reminder. If `Nghỉ nửa ngày` → ≥4h is OK.

### 3. Weekly hour-target shortfall (weekly-monitor, daily report tables)  ⚠️ **MOST MISSED**
**Pro-rate the target before computing shortfall.**

```
adjusted_target = full_target × (5 − full_leave_days − 0.5 × half_leave_days) / 5
shortfall = adjusted_target − actual
```

**Concrete examples:**
- LongVV 16h/wk, Fri Nghỉ cả ngày → target 16×4/5 = **12.8h**. Actual 8h → −4.8h gap.
- 8h/day dev 40h/wk, Wed Nghỉ cả ngày → target 40×4/5 = **32h**. Actual 30h → −2h gap.
- 8h/day dev 40h/wk, Tue Nghỉ nửa ngày → target 40 − 4 = **36h**. Actual 36h → ✓.

**Never** write shortfall as `actual vs full_target` when any leave day exists. The table cell MUST show the adjusted target and reflect the leave in the Status column:

```
✓ DO:   | LongVV | Maddy | 8h | 12.8h (Fri leave) | ⚠️ −4.8h (Tue–Thu 0h unexplained) |
✗ DON'T | LongVV | Maddy | 8h | 16h               | ⚠️ SHORTFALL −8h                     |
```

## Why this memory exists

User pushback `2026-05-23`: weekly-monitor W27 flagged LongVV "⚠️ SHORTFALL −8h" (8h vs 16h) — the report text BELOW the table correctly noted "Fri = Nghỉ cả ngày (leave, 0h OK)" but the table row didn't reflect it. User: *"did you see 'nghỉ cả ngày on Friday !!!' ... a issue happen multiple time !!! Recheck and refactor memory to make sure you read and understand all !"*

Prior recurrence trail:
- 2026-03-23 daily report **did** handle correctly: `| Maddy | LongVV | 0h | OK — "Nghỉ cả ngày" (full-day off Thu+Fri) |`
- 2026-05-06 sheets piece **did** check: `"No 'Nghỉ cả ngày' or 'Nghỉ nửa ngày' markers found"`
- 2026-05-23 weekly-monitor **failed**: prose noted the leave but the shortfall math ignored it

**Pattern of the failure:** rule lived only in `feedback_google_sheets_per_employee.md` as a one-line bullet ("Nghỉ cả ngày = full day off (0h OK)") and in `feedback_leave_day_no_report_needed.md` (narrow scope: missing-report alerts only). Neither said *pro-rate the weekly target*. So the data was visible but the math wasn't adjusted.

## Application checklist (run BEFORE writing any hour table)

1. For each dev row, scan column A of the dev's task log sheet for the reporting week.
2. Count `Nghỉ cả ngày` and `Nghỉ nửa ngày` entries → compute `adjusted_target`.
3. Write the table cell as `actual | adjusted_target ({leave-day description}) | ⚠️ −Xh ({remaining gap location})`.
4. If `actual ≥ adjusted_target` → ✓ OK, **never** flag as shortfall even when `actual < full_target`.
5. Cross-check: the prose sentence about leave days must match the table number. If table says `−8h` but prose says "Fri leave excused", one of them is wrong.

Related: [[feedback_longvv_consolidated]] (LongVV-specific 16h Maddy target, confirmed still active 2026-07-13), [[feedback_lenh_consolidated]] (sub-8h alert rule applies AFTER pro-rating).

## 🔴 Always check leave-plan.json for the EXACT date, not just "today"

**2026-07-10:** `config/leave-plan.json` had TWO separate KhanhHH entries: `khanhhh-2026-07-09` (full day, dentist/wisdom tooth removal) AND `khanhhh-2026-07-10` (full day, recovery) — both approved, both real. Report only surfaced the Jul-10 entry in the header ("Leave plan: KhanhHH — full-day remote/off 2026-07-10") and, when evaluating her Jul-9 0h separately (Sheets/Workstream section), described it as "mid-day dental appointment disruption" instead of checking leave-plan.json again for that date — which would have shown it was ALSO a full approved leave day, not a partial disruption. User caught it: "KhanhHH off 2 hôm nay mà!!!" (she's off 2 days!). This wrongly kept Aysar/Elliott Trello items flagged as "KhanhHH hours unverified" when her 0h both days was fully explained.

**Rule:** when explaining ANY dev's 0h/shortfall for a specific date, re-check `config/leave-plan.json` for THAT exact date (grep by dev_id + date, not just whatever leave was mentioned in the report header or inferred from a Matrix message). A dev can have multiple, separate leave-plan entries covering consecutive days — each needs its own lookup, don't assume "today's leave line" is the only one relevant.
