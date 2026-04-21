# Piece 4 — Google Sheets (2026-04-21 08:27 +07)
Target: Mon 2026-04-20

Source: `scripts/check-task-logs-apr20.py` (filter A="Task dự án", owner col G, skip first empty row per day, exclude Part-time).

| Developer | Mon hours | Weekly (W) | Status |
|---|---:|---:|---|
| LongVV    | 8.00h | 8.00h (Maddy W3 + Rebecca W21) | OK |
| PhucVT    | 8.00h | 8.00h (James Diamond W22) | OK |
| KhanhHH   | 8.00h | 8.00h (Generator W37) | OK |
| VietPH    | 8.00h | 8.00h (Paturevision W24) | OK |
| LeNH      | 0.00h | 0.00h (Rory W8 + Franc W21 + Aysar W21 + Rebecca W21) | ALERT — 0h no leave |
| TuanNT    | 0.00h | 0.00h (John Yi W20 + Rebecca W21) | ALERT — 0h no leave |

## Detail per dev

- **LongVV** — Maddy sheet W3 logged 8h Mon 20/04 (Task dự án, owner=LongVV). Rebecca W21 Mon empty. Total Mon=8h. Week (W3/W21) cumulative=8h (first day of new week). OK.
- **PhucVT** — James Diamond W22 Mon 20/04 = 8h logged. Week cum=8h. OK.
- **KhanhHH** — Generator W37 Mon 20/04 = 8h logged (6 split Task dự án rows). Week cum=8h. OK.
- **VietPH** — Paturevision W24 Mon 20/04 = 8h logged (7.6h + 0.4h split). Week cum=8h. OK.
- **LeNH** — All 4 sheets Mon 20/04 empty: Rory W8, Franc W21, Aysar W21, Rebecca W21. No "Nghỉ cả ngày"/"Nghỉ nửa ngày" marker in any. Prev-week totals (W20/W7) were 32h (Franc 19.17 + Aysar 4.83 + Rebecca 8 + Rory 0). ALERT.
- **TuanNT** — John Yi W20 Mon 20/04 empty (no leave note). Rebecca W21 Mon empty; col P="Chưa" on first row (normal per rules — NOT alert). Prev-week W19/W20 total = 28h (JohnYi 20.30 + Rebecca 7.70). ALERT.

## Alerts (0h without leave)

1. **LeNH — 0h Mon 20/04, no leave marker across all 4 sheets (Rory/Franc/Aysar/Rebecca).** → Send Matrix reminder.
2. **TuanNT — 0h Mon 20/04, no leave marker across John Yi + Rebecca sheets.** → Send Matrix reminder.

Other 4 devs (LongVV, PhucVT, KhanhHH, VietPH) logged full 8h EOD Monday — no alert.

## Unresolved Questions

- Is LeNH's all-4-sheet 0h on Mon 20/04 a pending leave (Fri 17 was "Nghỉ cả ngày" on Rebecca W20) that extended into Monday? Confirm via Matrix reminder response.
- TuanNT John Yi sheet used W20 (prev-week Fri had full_day_off); does a new W21 tab exist for John Yi that wasn't checked? Current script used W20 for Mon 20/04 — verify the week-tab boundary for John Yi sheet.
