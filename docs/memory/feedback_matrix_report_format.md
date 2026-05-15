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
- **James Diamond Web is a 40h/week TEAM contract**, not per-dev. The Web section charge is ALWAYS 40h (the contract), regardless of which dev(s) deliver it.
- **Web section MUST include LongVV** alongside PhucVT from W23 (2026-04-20) onward. Web total = PhucVT + LongVV (+ any other backfill dev).
- PhucVT plan = 40h/week (when full week). AnhNH2 has **no fixed plan** — use actual as both values (e.g. 20h/20h).
- **LongVV on James Diamond = BACKFILL role**, not a fixed 24h/week target. When PhucVT takes paid leave, LongVV (or another dev) covers the missing hours so the team still delivers the 40h contract. The previous "LongVV 24h/week" interpretation was wrong.
- **Paid leave handling — backfill rule:**
  1. PhucVT line: charge = plan − leave hours, actual = on-duty hours. E.g. PhucVT plan 40h, 1 paid day off → `PhucVT: 32h/32h`.
  2. Backfill dev (LongVV) line: charge = actual = backfill hours. E.g. LongVV covered 1 day → `LongVV: 8h/8h`.
  3. Web section: charge = 40h (contract), actual = sum of dev actuals (e.g. 32 + 8 = 40h). → `Web: 40h/40h (off 1 day dùng paid leave)`.
  4. Append `(off X day dùng paid leave)` to both the Web section line and the leaving dev's line. Backfill dev's line does NOT get the annotation.
- **Why (2026-05-15):** User corrected my sent message that had `Web: 48h/40h` + `PhucVT: 40h/32h`. Correct was `Web: 40h/40h` + `PhucVT: 32h/32h`. Reason: "for internal, we only have 40h, if dev off, we need use paid leave or use another dev". LongVV's 8h JD W26 was NOT his own contract — it was covering PhucVT's Wed paid leave.
- Hours as Xh Ym format (not decimal). E.g. 1.33h → 1h 20m

**Why:** User corrected wrong format (was showing actual/plan with `-` prefix, wrong AnhNH2 plan of 18h). Confirmed via 2026-03-21 weekly report session. **2026-04-25:** User explicitly corrected omission of LongVV from Web — "Why no LongVV on web dev ????". Standalone message sent without LongVV had to be corrected.

**How to apply:** Always use this format when generating the James Diamond + Marcel Matrix message. When in doubt about who belongs on Web/Mobile, ASK before sending — do not default to "old format" if a developer has been added to the project.
