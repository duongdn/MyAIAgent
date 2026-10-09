# Sheets — Wed 2026-05-06

Reporting day: Wed 2026-05-06 (W25 = week of Mon 04/05/26).
Method: scan ALL 10 task-log sheets, find current-week tab via Summary, locate Wed 06/05/26 day-header, sum hours per Owner (col G) on `Task dự án` rows. Rebecca special: also scan cols Q-T for LeNH.

## Per-dev aggregate (target devs)

| Dev | Wed 06/05 | Per-sheet breakdown | Status |
|---|---|---|---|
| LongVV | 0.00h | Maddy 0h + JamesDiamond 0h | OK (PARTIAL W25 — no alert per feedback rule) |
| PhucVT | 8.00h | JamesDiamond 8h | OK |
| TuanNT | 0.00h | JohnYi 0h + Rebecca 0h + Paturevision 0h | ALERT (-8h, no leave note) |
| VietPH | 8.00h | Paturevision 8h (0.5+2.5+5) | OK |
| KhanhHH | 4.00h | Generator 4h (2+1+1) | LOW (<6h floor; multi-project rule — soft alert) |
| LeNH | 8.00h | Rory 4h + Franc 4h + Aysar 0h + Rebecca(Q-T) 0h | OK |
| Marcel | n/a | not present in any scanned sheet | OK (adhoc) |
| DuongDN | n/a | not present in any scanned sheet | OK (adhoc / Bailey-inactive) |

## Other devs found in cross-scan

| Dev | Hours | Where |
|---|---|---|
| AnhNH2 | 4.00h | JamesDiamond |
| HaVS | 1.75h | Paturevision (1.75 only — second row blank) |
| NamNN | 8.00h | Paturevision 4h + Generator 4h |
| ViTHT | 0.00h | Fountain (8 task rows, all blank H) |
| PhatDLT | 2.00h | Fountain (0.5+1+0.5) |
| HungPN | 0.00h | Fountain (2 rows, blank H) |
| ThinhT | 4.00h | Fountain (3+1) |
| DatNT | 7.50h | Fountain (1.5+1.5+1+1+2+0.5) |
| LamLQ | 2.00h | Fountain Task dự án (2h); plus 6h "Việc công ty khác" (Ons) — not counted in Task dự án total |

Week-tab map: Maddy=W5, JamesDiamond=W24, JohnYi=W22, Rebecca=W23, Paturevision=W26, Generator=W39, Rory=W10, Franc=W23, Aysar=W23, Fountain=W25.

## Direct verification rows (Wed 06/05/26)

**maddy (LongVV) W5** row 35 header H=0; rows 36-49 all `Task dự án` placeholders, every G+H empty. Confirmed 0h.

**james_long (LongVV/PhucVT/TuanNT) W24** row 35 H=12; row 37 G=PhucVT H=8 (Upgrade and clone form for test property...), row 41 G=AnhNH2 H=4. No LongVV row. No TuanNT row. Confirmed PhucVT 8h, LongVV 0h.

**johnyi (TuanNT) W22** row 35 H=0; rows 36-49 all empty. Confirmed TuanNT 0h.

**rebecca (TuanNT/LeNH(Q-T)) W23** row 35 H=0; row 36 Q=Chưa S=Chưa T=Chưa (status placeholders, not hours). All other rows blank in G and Q-T. Confirmed TuanNT 0h, LeNH(Q-T) 0h.

**paturevision (VietPH/TuanNT) W26** row 35 H=13.75; row 36 G=VietPH H=0.5, row 37 G=VietPH H=2.5, row 38 G=VietPH H=5, row 40 G=NamNN H=4, row 44 G=HaVS H=1.75, row 45 G=HaVS H=blank. No TuanNT row. Confirmed VietPH 8h.

**generator (KhanhHH) W39** row 38 H=8; row 39 G=KhanhHH H=2 (Leads Engagement Report task 250), row 40 G=KhanhHH H=1 (Release 292), row 41 G=KhanhHH H=1 (Fix 'Attempt to read property id'), row 45 G=NamNN H=4. KhanhHH total 4h confirmed.

**rory (LeNH) W10** row 35 H=4; row 36 G=LeNH H=4 (Investigate accounts without correct phone). Confirmed.

**franc (LeNH) W23** row 35 H=4; row 36 G=LeNH H=4 (Resolve conflicts with latest software/plugin). Confirmed.

**aysar (LeNH) W23** row 35 H=0; rows 36-49 all empty. Confirmed 0h on Aysar.

**fountain (team) W25** row 55 H=22; per-row breakdown matches "Other devs" table above. No target-dev rows.

No "Nghỉ cả ngày" or "Nghỉ nửa ngày" markers anywhere on Wed 06/05/26. Leave dict empty across all sheets.

## ALERTS

| Sev | Dev | Issue | Reminder | Matrix room |
|---|---|---|---|---|
| HIGH | TuanNT | 0h aggregate across JohnYi+Rebecca+Paturevision; no leave note | Y | TuanNT DM |
| LOW | KhanhHH | 4h on Generator only — below 6h floor; multi-project rule means he may be logging elsewhere; ask before firing reminder | Soft (ask first) | KhanhHH DM |

**Not alerts (per exceptions):**
- LongVV 0h — PARTIAL W25, no alert, no reminder.
- PhucVT 8h, VietPH 8h, LeNH 8h aggregate — OK.
- Marcel/DuongDN absent from sheets — adhoc/inactive, OK.
- Fountain devs HungPN 0h, ViTHT 0h — not in target dev list; flag only via Fountain piece if needed.

## Devs to remind via Matrix today

1. **TuanNT** — 0h on Wed 06/05, no leave. Send reminder to log hours.
2. **KhanhHH** — 4h on Generator W39 only. Per `feedback_khanhhh_multi_project.md` rule, ask user before firing reminder OR ask KhanhHH which other sheet has his remaining hours. Soft alert.

## Scripts

- /home/nus/projects/My-AI-Agent/scripts/sheets-all-cross-project-wed-may6.py (aggregate scan)
- /home/nus/projects/My-AI-Agent/scripts/sheets-wed-may6-deep-verify.py (direct row verification)
- Output: /tmp/sheets_wed_may6.json

## Unresolved questions

- KhanhHH 4h on Generator only — is the remainder logged in a sheet not in our 10-sheet config? Per `feedback_khanhhh_multi_project.md` TODO, this needs the user to confirm the additional sheet ID. Until then, soft-alert only.
- HaVS row 45 (Paturevision) has a description but blank H — log entry incomplete? Not a target dev so just noting.
- LamLQ has 6h "Việc công ty khác" (Ons / on-site) plus 2h Task dự án in Fountain — total daily 8h but only 2h counts toward project hours per rule #5 (skip non-`Task dự án`). Treat as OK.
