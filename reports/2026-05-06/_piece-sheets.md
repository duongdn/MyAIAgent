# Sheets Piece — 2026-05-06 (reporting Tue 05/05)

## Tuesday 05/05/2026 hours

| Dev | Hours | Breakdown | Status |
|---|---|---|---|
| LongVV | 4.00 | Maddy 0h + JD 4h | ALERT (-4h, no leave) |
| PhucVT | 8.00 | JD 8h | OK |
| TuanNT | 8.00 | JY 6.5h + Rebecca 1.5h + Paturevision 0h | OK |
| VietPH | 8.00 | Paturevision 8h | OK |
| KhanhHH | 6.50 | Generator 6.5h | ALERT (-1.5h, no leave) |
| LeNH | 0.00 | Rory 0h + Franc 0h + Aysar 0h + Rebecca 0h | ALERT (-8h, no leave) |

## Wed 06/05 (partial — early morning)

| Dev | Hours | Note |
|---|---|---|
| LongVV | 0.00 | partial day, no alert |
| PhucVT | 0.00 | partial day, no alert |
| TuanNT | 0.00 | partial day, no alert |
| VietPH | 0.00 | partial day, no alert |
| KhanhHH | 0.00 | partial day, no alert |
| LeNH | 0.00 | partial day, no alert |

## Alerts

| Sev | Dev | Issue | Reminder needed | Matrix room |
|---|---|---|---|---|
| HIGH | LeNH | 0h on Tue 05/05, all 4 sheets empty, no leave note | Y | !OIrgPraJWrcDTnRVLQ:nustechnology.com |
| MED | LongVV | Only 4h on Tue 05/05 (Maddy empty), -4h shortfall, no leave | Y | !mYZBGNoLFVpMVIJtPu:nustechnology.com |
| LOW | KhanhHH | 6.5h on Tue 05/05, -1.5h shortfall, no leave | Y | !rwLbvLBnrRAYMaOPaD:nustechnology.com |

## Verification log

Direct re-read of day-header rows (rows 19-34 typically, 22-37 for Generator W39) for every dev with 0h finding:

- **maddy / LongVV / W5**: Tue 05/05/26 header row 19, H column total = 0; rows 20-34 all empty (only `Task dự án` placeholder rows with no Owner/Hours). Confirmed 0h.
- **paturevision_t / TuanNT / W26**: Tue 05/05/26 header row 19, H total = 8 (VietPH); only row 20 has data (G=VietPH, H=8). No TuanNT rows. Confirmed 0h for TuanNT on this sheet.
- **rory / LeNH / W10**: Tue 05/05/26 row 19, H=0; rows 20-34 empty. Confirmed 0h.
- **franc / LeNH / W23**: Tue 05/05/26 row 19, H=0; rows 20-34 empty. Confirmed 0h.
- **aysar / LeNH / W23**: Tue 05/05/26 row 19, H=0; rows 20-34 empty. Confirmed 0h.
- **rebecca_lenh / LeNH / W23**: Tue 05/05/26 row 19, Q/S/T columns empty for LeNH; row 20 only has "Chưa/Chưa/Chưa" markers (not a real entry, no hours). Confirmed 0h.
- **generator / KhanhHH / W39**: Tue 05/05/26 header row 22, H total = 17.5; row 23 G=KhanhHH H=6.5 (only KhanhHH row); other rows = NamNN 8h, NghiepNQ 3h. Confirmed 6.5h for KhanhHH.
- **james_long / LongVV / W24**: Tue 05/05/26 row 19, H total = 12; row 20 G=LongVV H=4, row 22 G=PhucVT H=8. Confirmed LongVV 4h.

All days have proper day-headers Mon→Sun (rows 4/19/35/51/67/83/99 in standard sheets, 4/22/38/54/70/86/102 for Generator). Tabs are correct (same week as Mon 04/05).

No "Nghỉ cả ngày" or "Nghỉ nửa ngày" markers found for any of the 0h devs — these are real shortfalls.

Scripts:
- /home/nus/projects/My-AI-Agent/scripts/sheets-tue-may5.py
- /home/nus/projects/My-AI-Agent/scripts/sheets-tue-may5-deep-verify.py
- Output JSON: /tmp/sheets_tue_may5.json

## Unresolved questions

- None. Data fetched and verified directly from sheets.
