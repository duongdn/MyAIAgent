---
name: LeNH partial-hour shortfall is still an alert
description: Any shortfall vs 8h target (even 0.17h) without a leave note must be flagged and reminded — never silently call <8h "OK"
type: feedback
---

LeNH (and any 8h/day dev) at <8h with no leave note is an ALERT, not "OK". Even a 0.17h gap must be flagged and a Matrix reminder sent.

**Why:** User corrected on 2026-05-05 — daily report listed LeNH "Franc 4.00h + Aysar 3.83h = 7.83h | OK" because the gap was small and "likely rounding". User pushed back: "not 8h, why OK?" Trivializing small gaps misses real shortfalls and erodes trust in the OK column.

**How to apply:**
- Threshold for OK is exactly 8h (or matching leave note). 7.99h with no leave note = alert.
- Don't excuse shortfalls as "rounding" or "trivial". Either it's 8h+, or it's flagged.
- Send Matrix reminder to the dev's room when shortfall < 8h with no leave (room mapping in reference_matrix_rooms.md).
- The Trello checklist completion can stay (don't un-complete for tiny gaps), but the report must mark Status as ⚠️ and include the reminder line.
