# Sheets + Scrin Refresh — 2026-04-17 16:48 (+07:00)

**Window since morning baseline:** 2026-04-17 08:50 → 16:48 (+07:00)
**Morning baseline:** `reports/2026-04-17/daily-report.md`

## Sheets Refresh — 16:48 (+07:00)

| Developer | Today (Apr 17) | W3 total | Change vs morning | Status |
|-----------|---------------|----------|-------------------|--------|
| LongVV (Maddy W2) | 0h, no leave note | 16h (Mon 8 + Thu 8) | No change | OK — 16/16h target already met (LongVV only 16h/wk on Maddy; Fri blank expected) |
| PhucVT (James Diamond W21) | 0h, no leave note | 24h (Mon 8 + Wed 8 + Thu 8) | No change | Concern — no Fri entry + no leave at 16:48 |
| TuanNT — John Yi W19 | 0h, "Nghỉ cả ngày" ✓ | 20.3h | No change | OFF (full day) — as expected |
| TuanNT — Rebecca W20 | 0h, "Nghỉ cả ngày" ✓ | 7.7h | No change | OFF (full day) — as expected |
| VietPH (Paturevision W23) | 0h, no leave note (1 empty Task row present) | 24h (Mon 8 + Tue 8 + Thu 8, Wed 0) | No change | Concern — 1 Fri Task row started but hours blank; no leave |
| KhanhHH (Generator W36) | **8h** (6 tasks: Rudi PR review 0.5, Asset Linking 3.5, Timezone/DST 1, redmine 78248 1, OTP length 1.5, redmine 78278 0.5) | **40h** | **+8h NEW** | OK — full week 40h complete |
| LeNH — Rory W7 | 0h, no Fri entry | 0h (no logs all week) | No change | Empty sheet entire week; leave note is only in Rebecca |
| LeNH — Franc W20 | 0h, no Fri entry | 19.17h (Mon-Thu) | No change | — |
| LeNH — Aysar W20 | 0h, no Fri entry | 4.83h (Mon-Thu) | No change | — |
| LeNH — Rebecca W20 | 0h, "Nghỉ cả ngày" ✓ | 8h | No change | OFF (full day) — as expected |
| **LeNH combined** | 0h across 4 sheets | 32h | No change | OFF — leave noted in Rebecca sheet only; combined 32h matches morning |
| **TuanNT combined** | 0h across 2 sheets | 28h | No change | OFF — leave noted in both JY and Rebecca |

## Scrin.io Refresh — 16:48 (+07:00)

| Metric | Morning (08:50) | Now (16:48) | Delta |
|---|---|---|---|
| TuanNT — Apr 17 day total | — | **0h 00m** | No tracking today (consistent with Nghỉ cả ngày) |
| TuanNT — Apr 16 day total | 4h 01m | 4h 01m | No change |
| TuanNT — Week total | 20h 22m | **20h 22m** | No change |
| TuanNT — Month total | 45h 40m | 45h 40m | No change |

John Yi task log Fri 17 = 0h (Nghỉ cả ngày). Scrin Fri 17 = 0h. Match — no over-inflation.

## Alerts

| # | Source | Alert | Severity |
|---|--------|-------|----------|
| 1 | Sheets/KhanhHH | 8h logged Fri since morning; week 40h complete | INFO (positive) |
| 2 | Sheets/VietPH | 0h Fri at 16:48, no leave note, 1 empty Task row present; week 24h (also Wed 0h with no leave) | MEDIUM — may still log late Fri afternoon; recommend reminder if still 0h by EOD |
| 3 | Sheets/PhucVT | 0h Fri at 16:48, no leave note; week 24h (also Tue 0h with no leave) | MEDIUM — recommend reminder if still 0h by EOD |
| 4 | Sheets/TuanNT | Nghỉ cả ngày both JY+Rebecca — leave noted | RESOLVED (expected) |
| 5 | Sheets/LeNH | Nghỉ cả ngày Rebecca — leave noted; other 3 sheets blank Fri (consistent) | RESOLVED (expected) |
| 6 | Sheets/LongVV | 0h Fri, no leave — but already 16/16h target met on 16h/wk Maddy contract | INFO (not alert) |
| 7 | Scrin/TuanNT | 0h Fri, week unchanged — matches task log leave | RESOLVED |

## Summary

- No new alerts since morning except **KhanhHH +8h** completed full week (positive).
- **VietPH** and **PhucVT** remain at 0h Fri afternoon without a leave note — both also have one earlier weekday missing (VietPH Wed, PhucVT Tue) already at 24h week. Below the 40h target by 16h each.
- LeNH and TuanNT leave confirmed across all relevant sheets. Combined weekly totals (32h / 28h) unchanged.
- Scrin.io Fri 0h matches John Yi Fri 0h — no discrepancy.

## Unresolved Questions

1. VietPH Wed 0h and PhucVT Tue 0h (no leave) — these were not flagged in the morning report either. Worth spot-check in Monday review?
2. VietPH Fri Task row 68 has task text "Upgrade Prestashop 9: Check GLS module" but hours cell blank — did VietPH start logging then get interrupted, or will they fill hours EOD?
3. Recommend sending an EOD Matrix reminder to VietPH and PhucVT if they're still at 0h by ~18:00?
