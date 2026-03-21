---
name: James Diamond + Marcel Matrix report format
description: Correct message format for the weekly James Diamond + Marcel Matrix report
type: feedback
---

Format is **charge/actual** (not actual/plan). No `-` prefix before employee names.

```
Report week {DD/MM}

James Diamond

Web: {charge}/{actual} [(off X day dùng paid leave)]
PhucVT: {charge}/{actual} [(off X day dùng paid leave)]

Mobile: {charge}/{actual}
AnhNH2: {charge}/{actual}

---

Marcel
DuongDN: {hours}
```

Rules:
- PhucVT plan = 40h/week. AnhNH2 has **no fixed plan** — use actual as both values (e.g. 20h/20h)
- If employee has "Nghỉ nửa ngày" (0.5 day off) or "Nghỉ cả ngày" (full day off), append `(off X day dùng paid leave)` to **both** the section line and the individual name line
- Hours as Xh Ym format (not decimal). E.g. 1.33h → 1h 20m

**Why:** User corrected wrong format (was showing actual/plan with `-` prefix, wrong AnhNH2 plan of 18h). Confirmed via 2026-03-21 weekly report session.

**How to apply:** Always use this format when generating the James Diamond + Marcel Matrix message.
