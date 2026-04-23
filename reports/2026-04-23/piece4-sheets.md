# Piece 4 — Google Sheets Task Logs (2026-04-23 +07)
Target: Tue 2026-04-21, Wed 2026-04-22

Source: `scripts/check-task-logs-apr21-22.py` (filter A="Task dự án", owner col G, hours col H, exclude Part-time). Week-sheet boundaries verified: Mon 20 → Fri 24 all in the same W-sheet (LongVV=W3, PhucVT=W22, KhanhHH=W37, VietPH=W24, Rory=W8, Franc=W21, Aysar=W21, JohnYi=W20, Rebecca=W21).

## Hours table

| Developer | Tue 21 | Wed 22 | Status |
|---|---:|---:|---|
| LongVV (Maddy + James Diamond) | 8.00h | 8.00h | OK — all in James Diamond W22 |
| PhucVT (James Diamond) | 8.00h | 8.00h | OK |
| KhanhHH (Generator) | 8.00h | 8.00h | OK |
| VietPH (Paturevision) | 8.00h | 8.00h | OK |
| LeNH (Rory+Franc+Aysar+Rebecca-QT) | 8.17h | 0.00h | ALERT — Wed 0h, no leave |
| TuanNT (JohnYi+Rebecca+Paturevision) | 8.00h | 8.00h | OK |

> **Post-review correction (2026-04-23):** This piece originally listed LongVV as "Maddy + Rebecca" with 0h both days. That is wrong — LongVV's two sheets are Maddy + **James Diamond** (per memory `project_longvv_james_diamond.md`). Rescan of James Diamond sheet W22 confirmed LongVV: **8h Tue + 8h Wed**. No alert. See `scripts/check-longvv-james-apr21-22.py`. Feedback memory saved: `feedback_longvv_not_rebecca.md` + `feedback_longvv_direct_matrix.md`.

## Per-sheet detail

- **LongVV** — Maddy W3: Tue 0h, Wed 0h (all "Task dự án" rows empty G/H). Rebecca W21 (col G LongVV): Tue 0h, Wed 0h. No leave marker anywhere.
- **PhucVT** — James Diamond W22: Tue 8h, Wed 8h.
- **KhanhHH** — Generator W37: Tue 8h, Wed 8h.
- **VietPH** — Paturevision W24: Tue 8h, Wed 8h.
- **LeNH** — Rory W8, Franc W21, Rebecca W21 cols Q-T all empty ("Chưa"/blank) Tue & Wed. **Aysar W21: Tue 8.17h** (row 19, owner=LeNH). **Aysar W21 Wed 22: 0h** (all rows empty, no leave marker).
- **TuanNT** — John Yi W20: Tue 7.33h, Wed 4.00h. Rebecca W21 G-col: Tue 0.67h, Wed 4.00h. Paturevision W24 for TuanNT: 0h both days. Sum: Tue 8.00h, Wed 8.00h.

## Alerts (0h without leave)

1. ~~LongVV Tue 21/04 0h~~ RESOLVED — was checking wrong sheet (Rebecca). Real hours = 8h in James Diamond W22.
2. ~~LongVV Wed 22/04 0h~~ RESOLVED — same root cause. Real hours = 8h in James Diamond W22.
3. **LeNH — Wed 22/04 0h, no leave marker across all 4 sheets (Rory W8, Franc W21, Aysar W21, Rebecca W21 Q-T).** Aysar is the usually-active sheet but Wed row is blank. → Send Matrix reminder.

LeNH Tue 21 is OK (Aysar 8.17h). TuanNT both days OK (8h split across John Yi + Rebecca, matches 8h/day target).

## Leave days

None detected for either day across any sheet (no "Nghỉ cả ngày" or "Nghỉ nửa ngày" rows found for the 6 devs on Tue 21 or Wed 22).

## Unresolved Questions

- LongVV had the same all-sheets-empty pattern on Mon 20/04 (previous report flagged as ALERT). If LongVV has been 0h Mon→Wed, this may be an unlogged leave or sheet misconfiguration — confirm via Matrix.
- LeNH pattern: Tue logged (Aysar 8.17h) but Wed blank. Could be end-of-day logging delay (report is morning of Thu 23); re-verify in afternoon refresh.
- John Yi W20 showed only 7.33h Tue / 4h Wed — TuanNT made up the gap via Rebecca sheet. Confirm this split is intentional and not under-logged.

File written: `/home/nus/projects/My-AI-Agent/reports/2026-04-23/piece4-sheets.md`
