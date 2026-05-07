---
name: Developer-to-project mapping is FLEXIBLE — scan all sheets for every dev
description: Devs no longer have fixed project assignments. Sheets piece must scan ALL task log sheets and aggregate hours per dev across all projects, not trust the static dev→sheet mapping.
type: feedback
---

The dev → project sheet mapping is no longer static. Any dev may log hours in any project sheet (Maddy, James Diamond, John Yi, Rebecca, Paturevision, Generator, Rory, Franc, Aysar, Fountain, etc.) and the assignment changes week to week.

**Why:** User corrected on 2026-05-06 — daily-report skill currently has a hard-coded mapping (e.g. KhanhHH → Generator, LongVV → Maddy + JamesDiamond). KhanhHH 6.5h on Generator was flagged as -1.5h shortfall, but user clarified KhanhHH "work multiple project now". User then directed: "please check all spreadsheet for employee hour, project of them are flexible now".

**How to apply:**
1. Sheets piece must scan ALL configured task log sheet IDs every run, not just the per-dev mapped ones.
2. For each sheet, find the current-week tab (Summary tab gives the date → tab mapping; current week = the W{n} row whose date range contains the reporting day).
3. Read the W{n} tab, filter `col A == "Task dự án"`, group rows by `col G (Owner)` for the reporting date.
4. **Special case — Rebecca sheet** (`1wrsg-lAWDnCEFUNk4YUTcqThMN6hy7GnXWOEW_e8NJ4`): LeNH hours sit in columns Q-T (not col G). Continue to read both col G entries AND col Q-T for LeNH presence. Other devs in Rebecca use col G normally.
5. Aggregate per-dev daily totals across ALL sheets. Compare the aggregate against the dev's daily target (8h default, or the per-dev exception below).
6. Only flag a shortfall if the AGGREGATE total is < target with no leave note. Per-sheet 0h is NEVER alone enough to flag.

**Per-dev exceptions (still valid):**
- LongVV: partial schedule W25 (see `feedback_longvv_partial_week_may.md`)
- TuanNT: 8h target combined across all sheets (John Yi + Rebecca + Paturevision)
- Marcel/DuongDN: adhoc, 0h is expected (see `feedback_marcel_adhoc_project.md`)
- Bailey-DuongDN: inactive (see `feedback_bailey_dev3_not_active.md`)

**Update the daily-report skill:**
- Remove the static dev→sheet table from the Sheets piece (`/daily-report sheets {dev}` argument keeps working but `/daily-report sheets` must scan-all-aggregate-by-owner).
- Memory entries that hard-coded mappings (e.g. `feedback_longvv_not_rebecca`, `feedback_lenh_rebecca_sheet`, `feedback_google_sheets_per_employee`) become floor not ceiling — those sheets are guaranteed to contain the dev, but the dev may also appear in others.
