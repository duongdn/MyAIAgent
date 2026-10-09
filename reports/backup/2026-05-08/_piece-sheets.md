# Sheets — Thu 2026-05-07

Reporting day: Thu 2026-05-07 (W23 calendar = week of Mon 04/05/26).
Method: scan ALL 10 task-log sheets, find current-week tab via Summary (or first-date scan for Aysar non-calendar W{n}), locate Thu 07/05/26 day-header, sum hours per Owner (col G) on `Task dự án` rows. Rebecca special: also scan cols Q-T for LeNH. Paturevision: skip first empty row (write reserved).

## Per-dev aggregate (target devs)

| Dev | Thu 07/05 | Per-sheet breakdown | Status |
|---|---|---|---|
| LongVV | 8.00h | Maddy 8h (0.5+0.5+1+1.5+4+0.5) | OK |
| PhucVT | 8.00h | JamesDiamond 8h | OK |
| TuanNT | 8.00h | JohnYi 7.5h + Rebecca 0.5h + Paturevision 0h | OK |
| VietPH | 8.00h | Paturevision 8h (1.5+4+2.5) | OK |
| KhanhHH | 8.17h | Generator 2.50h + Aysar 5.67h | OK (sub-contract: KhanhHH does Aysar work, LeNH's tracker bills) |
| LeNH | 0.00h | Rory 0 (KhoaTD 8h instead) + Franc 0 + Aysar 0 (KhanhHH 5.67h instead) + Rebecca(Q-T) 0 | OK on sheets — LeNH subcontracts; Upwork tracker bills (cross-check piece) |
| Marcel | n/a | not present in any scanned sheet | OK (adhoc) |
| DuongDN | n/a | not present in any scanned sheet | OK (adhoc / Bailey-inactive) |

## Other devs found in cross-scan

| Dev | Hours | Where |
|---|---|---|
| AnhNH2 | 4.00h | JamesDiamond |
| KhoaTD | 8.00h | Rory W10 (2h Everest tab + 6h New PT booking flow) — sub-contract under LeNH |
| NamNN | 2.50h | Paturevision (2.5 + one row with 0h) |
| NghiepNQ | 6.00h | Generator W39 (0.25+5.75) |
| ViTHT | 0.00h | Fountain (3 task rows, all blank H) |
| PhatDLT | 2.00h | Fountain |
| DatNT | 8.00h | Fountain (4+4) |
| LamLQ | 2.00h | Fountain (0.5+1.5) — ALSO has "Nghỉ nửa ngày" leave row at row 91 |

Week-tab map: Maddy=W5, JamesDiamond=W24, JohnYi=W22, Rebecca=W23, Paturevision=W26, Generator=W39, Rory=W10, Franc=W23, Aysar=W23, Fountain=W25.

## Direct verification rows (Thu 07/05/26)

**maddy (LongVV) W5** Thu header found. 6 Task dự án rows for LongVV totaling 8.00h: LIFM2-259 (0.5h), LIFM2-260 (0.5h), LIFM2-432 (1h), LIFM2-438 (1.5h), LIFM2-434 (4h), LIFM2-428 (0.5h). LongVV 8h confirmed. (W25 partial-schedule rule not triggered — sheet uses W5 internal numbering.)

**james_long (LongVV/PhucVT/TuanNT) W24** Thu header H=12. PhucVT 8h ("Working on UI/validation of Task 1 — Assign corrective actions"), AnhNH2 4h ("daily report — Implement..."). No LongVV row. No TuanNT row.

**johnyi (TuanNT) W22** Thu header H=7.5. TuanNT 7.5h ("payment Authorize.net plugin production site / Update code log"). Confirmed.

**rebecca (TuanNT/LeNH(Q-T)) W23** Thu header H=0.5. TuanNT 0.5h ("discus with cus, check issue task"). Q-T cols all blank (only "Chưa" placeholders in row 52). LeNH(Q-T) 0h confirmed.

**paturevision (VietPH/TuanNT) W26** Thu header H=10.5. VietPH rows: 1.5h + 4h + 2.5h = 8h. NamNN row 2.5h + a 0h row. No TuanNT row. VietPH 8h confirmed. (Note: first VietPH row had H=1.5 and is the actual write-reserved row used; total is 8h either way.)

**generator (KhanhHH) W39** Thu header H=8.5. KhanhHH 4 rows: 0.33h (Review Rudi's PR) + 0.5h (used_rsvp fix) + 0.5h (Attempt to read property fix) + 1.17h (Merged/release Dev Done) = 2.50h. NghiepNQ 0.25h + 5.75h = 6h.

**rory (LeNH) W10** Thu header H=8. KhoaTD 8h (2h Everest tab + 6h New PT booking flow). LeNH literal 0h — sub-contract pattern.

**franc (LeNH) W23** Thu header H=0. All Task dự án rows under Thu block empty (G, H all blank, only "Chưa" placeholders). LeNH 0h on Franc.

**aysar (LeNH→KhanhHH) W23** Thu header H=5.67. KhanhHH 5.67h ("Change Team Ownership #533"). LeNH literal 0h — KhanhHH does the work, LeNH's Upwork tracker bills it.

**fountain (team) W25** Thu block: ViTHT 3 rows all 0h, PhatDLT 2h (Test smart link function and UI), DatNT 4h (UI browse XXL) + 4h (Sort & search filter), LamLQ 0.5h (Shop ready-to-ship cocktail kits) + 1.5h (Investigate bug). LEAVE marker row 91 "Nghỉ nửa ngày" (likely LamLQ — which is consistent with LamLQ logging only 2h Task dự án). No target-dev rows.

No "Nghỉ cả ngày" markers anywhere on Thu 07/05/26. One "Nghỉ nửa ngày" at Fountain row 91 (LamLQ context).

## ALERTS

| Sev | Dev | Issue | Reminder | Matrix room |
|---|---|---|---|---|
| — | — | No alerts. All target devs at 8h aggregate (or covered by sub-contract pattern). | N | — |

**Not alerts (per exceptions):**
- LongVV 8h on Maddy — full day logged, no W25 partial-schedule concern this day.
- PhucVT 8h, VietPH 8h, TuanNT 8h, KhanhHH 8.17h aggregate — all at target.
- LeNH 0h on sheets — sub-contract pattern (KhoaTD on Rory, KhanhHH on Aysar). Upwork piece confirms LeNH's tracker is billing the sub-contracted hours. Per rule "0h in one sheet OK if working another" — OK.
- Marcel/DuongDN absent — adhoc/inactive, OK.

## Cross-check observations

- **Upwork-vs-Sheets for Rory:** Yesterday's upwork piece flagged "Rory (LeNH) Tue 4.5h Upwork vs Sheets 0h" as a discrepancy. Today Rory W10 Thu shows KhoaTD 8h directly — confirms the sub-contract pattern (KhoaTD logs the work in sheet, LeNH's Upwork tracker bills it). The previous "discrepancy" is actually expected behavior.
- **Aysar contract ACTIVE confirmed:** Aysar W23 Thu has KhanhHH 5.67h on "Change Team Ownership #533". Memory entry "Aysar inactive ~Mar 9" is stale — already flagged in upwork piece for memory update.

## Devs to remind via Matrix today

None. All target devs at target hours.

## Scripts

- /home/nus/projects/My-AI-Agent/scripts/sheets-thu-may7.py (aggregate scan)
- /home/nus/projects/My-AI-Agent/scripts/debug-aysar-franc-rory-thu7.py (direct row verification)
- Output: /tmp/sheets_thu_may7.json

## Unresolved questions

- Aysar tab auto-detection in main script returned None (W23 candidate beyond first-6 sort window). Worked around via debug script direct fetch. Should refactor `find_week_tab_by_first_date` to scan more candidates (e.g. top-12) — minor follow-up.
- LamLQ "Nghỉ nửa ngày" at Fountain row 91 — half-day leave should mean 4h target. LamLQ logged 2h Task dự án. Not a target dev so does not affect alerts but worth noting if Fountain piece monitors it.
