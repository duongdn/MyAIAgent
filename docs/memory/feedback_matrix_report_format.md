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
LongVV: {charge}/{actual} [(off X day dùng paid leave)]   <-- include from W23 (2026-04-20)

Mobile: {charge}/{actual}
AnhNH2: {charge}/{actual}

---

Marcel
DuongDN: {hours}
```

Rules:
- **Web section MUST include LongVV** alongside PhucVT from W23 (2026-04-20) onward. Web total = PhucVT + LongVV. Do NOT omit LongVV "to match the old memorized format" — that is wrong.
- PhucVT plan = 40h/week. AnhNH2 has **no fixed plan** — use actual as both values (e.g. 20h/20h)
- LongVV on James Diamond = 24h/week target (he also does 16h on Maddy, total 40h). Use 24h/week as charge if hit, otherwise actual/actual.
- If employee has "Nghỉ nửa ngày" (0.5 day off) or "Nghỉ cả ngày" (full day off), append `(off X day dùng paid leave)` to **both** the section line and the individual name line
- Hours as Xh Ym format (not decimal). E.g. 1.33h → 1h 20m

**Why:** User corrected wrong format (was showing actual/plan with `-` prefix, wrong AnhNH2 plan of 18h). Confirmed via 2026-03-21 weekly report session. **2026-04-25:** User explicitly corrected omission of LongVV from Web — "Why no LongVV on web dev ????". Standalone message sent without LongVV had to be corrected.

**How to apply:** Always use this format when generating the James Diamond + Marcel Matrix message. When in doubt about who belongs on Web/Mobile, ASK before sending — do not default to "old format" if a developer has been added to the project.
