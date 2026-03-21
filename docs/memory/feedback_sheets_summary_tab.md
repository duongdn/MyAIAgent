---
name: Google Sheets Summary tab for week lookup
description: Use the Summary tab to find the correct W{n} tab and per-employee weekly totals — faster than checking A4 of each W tab
type: feedback
---

All NUS task log spreadsheets have a **Summary** tab with this structure:
- Row 1: Project name
- Row 2: "Task Log Summary"
- Row 3: Total row
- Row 4: Column headers (Week, Start date, End date, Actual, ..., per-employee columns)
- Row 5: Employee names per column
- Row 6+: W1, W2, ... with dates and per-employee actual totals

**How to find the correct week tab:**
Read `Summary!A:C` (or A:Z for totals), find the row where column B matches the target Monday date (format: "Month DD, YYYY", e.g., "March 16, 2026"). The value in column A gives the W{n} tab name.

**How to read per-employee totals:**
The Summary tab already aggregates hours per employee per week. Column layout (0-indexed):
- Col 0 (A): W{n}
- Col 1 (B): Week start date
- Col 2 (C): Week end date
- Col 3 (D): Total actual
- Col 7 (H): Notes
- Col 8+: Employee 1 actual, self-rated, charged, rate, Employee 2 actual, ...
Employee names appear in row 5 (index 4, 0-based), repeating in groups of 4 columns (actual, self-rated, charged, rate).

**Why:** Reading W tab row-by-row is slow and fragile (date parsing in A column varies). The Summary tab is structured, one API call per sheet.

**How to apply:** Always read Summary tab first for all NUS task log sheets. Use it to (1) identify correct W{n} tab, (2) get per-employee weekly totals directly. Only open the W tab if you need daily breakdown per employee.

**Also documented in:** `docs/weekly-monitor-workflow.md` (Finding the Correct Week Tab section)
