# Sheets Piece — Mon 2026-05-04 (+07:00)

Window: 2026-04-24 → 2026-05-04. Workdays checked: Apr 24 (Fri), Apr 27 (Mon), Apr 28 (Tue), Apr 29 (Wed), May 4 (Mon, today).
Holidays: Apr 30 (Thu) + May 1 (Fri) — no expected hours.
Today (5/4) shown as `—` because it is morning and most logs have not been filled yet.

## Sheets — HH:MM (+07:00)

| Developer | 4/24 (Fri) | 4/27 (Mon) | 4/28 (Tue) | 4/29 (Wed) | 5/4 (today) | Status |
|---|---|---|---|---|---|---|
| LongVV (Maddy 16h + James Diamond 24h /wk) | 0h (Nghỉ cả ngày) | 0h | 8h (Maddy) | 8h (Maddy) | — | OK on logged days; 4/27 ALERT (no leave note) |
| PhucVT (James Diamond, 8h/day) | 8h | 0h | 8h | 8h | — | OK except 4/27 ALERT |
| KhanhHH (Generator, 8h/day) | 8h | 0h | 8h | 8h | — | OK except 4/27 ALERT |
| VietPH (Paturevision, 8h/day) | 8h | 0h | 8h | 8h | — | OK except 4/27 ALERT |
| TuanNT (John Yi 1.25h + Rebecca 6.75h = 8h on 4/24; John Yi only on 4/28-29) | 8h (1.25 JY + 6.75 Rebecca) | 0h | 8h (JY) | 8h (JY) | — | OK except 4/27 ALERT |
| LeNH (Rory 0 / Franc 5.83 / Aysar 1.5 / Rebecca 0 on 4/24 = 7.33h) | 7.33h | 0h (Aysar marked Nghỉ cả ngày) | 4.17h (Aysar) | 0h | — | 4/27 has leave note (OK); 4/29 ALERT (0h, no leave note); 4/28 short (4.17h vs 8h) |

### Per-sheet breakdown (raw)

| Sheet | Dev | 4/24 | 4/27 | 4/28 | 4/29 | 5/4 |
|---|---|---|---|---|---|---|
| Maddy (W3/W4/W5) | LongVV | 0 (Nghỉ cả ngày) | 0 | 8 | 8 | 0 |
| James Diamond (W22/W23/W24) | LongVV | 0 | 0 | 0 | 0 | 0 |
| James Diamond (W22/W23/W24) | PhucVT | 8 | 0 | 8 | 8 | 0 |
| Generator (W37/W38/W39) | KhanhHH | 8 | 0 | 8 | 8 | 0 |
| Paturevision (W24/W25/W26) | VietPH | 8 | 0 | 8 | 8 | 0 |
| Paturevision (W24/W25/W26) | TuanNT | 0 | 0 | 0 | 0 | 0 |
| John Yi (W20/W21/W22) | TuanNT | 1.25 | 0 | 8 | 8 | 0 |
| Rebecca (W21/W22/W23) | TuanNT | 6.75 | 0 | 0 | 0 | 0 |
| Rory (W8/W9/W10) | LeNH | 0 | 0 | 0 | 0 | 0 |
| Franc (W21/W22/W23) | LeNH | 5.83 | 0 | 0 | 0 | 0 |
| Aysar (W21/W22/W23) | LeNH | 1.5 | 0 (Nghỉ cả ngày) | 4.17 | 0 | 0 |
| Rebecca col Q-T (W21/W22/W23) | LeNH | 0 | 0 | 0 | 0 | 0 |

## ALERTS

### 4/27 (Mon) — universal 0h, no leave notes (HIGH)
Every monitored developer logged 0h on 4/27 with no `Nghỉ cả ngày` note in any sheet:
- LongVV (Maddy + James Diamond)
- PhucVT
- KhanhHH
- VietPH
- TuanNT (Paturevision + John Yi + Rebecca)
- LeNH (Rory + Franc + Rebecca; Aysar has the leave note already)

Likely cause: Apr 27 was the substitute long-weekend day for the Apr 30 / May 1 holidays (Vietnam often shifts the 30/4–1/5 break to include adjacent weekdays). If that is the case, devs should still log `Nghỉ cả ngày`. Either it is a real holiday (then leave note is missing) or backfill is required.

### 4/29 (Wed) — LeNH 0h, no leave note (HIGH)
LeNH logged 0h across all 4 sheets on Wed 4/29 with no `Nghỉ cả ngày` note. Aysar 4/27 already marked off; 4/29 must be either backfilled or marked off.

### 4/28 (Tue) — LeNH only 4.17h (MEDIUM)
LeNH logged 4.17h on Aysar only (no half-day note). Below 8h target. Worth confirming.

## Devs needing Matrix reminder

Send Matrix reminders for missing 4/27 + 4/29 backfills:
- **LongVV** — 4/27 Maddy + James Diamond (route to direct room `!mYZBGNoLFVpMVIJtPu`, NOT Maddy Xtreme room — per `feedback_longvv_direct_matrix`)
- **PhucVT** — 4/27 James Diamond
- **KhanhHH** — 4/27 Generator
- **VietPH** — 4/27 Paturevision
- **TuanNT** — 4/27 John Yi + Rebecca (and Paturevision shows 0h all week; might be expected if not assigned)
- **LeNH** — 4/27 (Rory/Franc/Rebecca - Aysar already has note) + 4/29 entire workday + 4/28 underlogged

If Apr 27 was a confirmed holiday: ask devs to add `Nghỉ cả ngày` retroactively. Otherwise full backfill needed.

## Unresolved questions

1. Was Apr 27 (Mon) an officially-declared substitute holiday for the 4/30 + 5/1 break? If yes, devs need to add `Nghỉ cả ngày` retroactively. If no, this is mass missing-log (CRITICAL).
2. Is TuanNT still expected to log on Paturevision sheet, or is he now exclusively John Yi + Rebecca? (4/24 has 0h Paturevision but 8h split JY+Rebecca = full 8h, so probably no longer Paturevision.)
3. LongVV James Diamond shows 0h every workday — is the project still active on his side, or is all his time captured under Maddy this week?
