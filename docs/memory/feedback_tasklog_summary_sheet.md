---
name: Task log — use Summary sheet for weekly hours lookup
description: Every task log spreadsheet has a Summary sheet with week labels, date ranges, and Actual hours in col D. Use it instead of scanning individual W-sheets.
type: feedback
---

Every Google Sheets task log has a **Summary** sheet. Use it to look up weekly hours instead of iterating through individual W-sheets.

**Summary sheet structure:**
- Row 4: headers (Week, start date, end date, Actual, ...)
- Row 5: employee names
- Row 6+: W1, W2, etc. with columns: week label (A), start date (B), end date (C), Actual hours (D)
- Find the row where start date matches reporting week Monday, read col D for total hours

**Why:** Scanning W-sheets one-by-one is slow and wasteful. Summary sheet gives all weeks in one API call.

**How to apply:** For Monday Report (and any weekly hours lookup), read `Summary!A6:D60` in one call, find the row matching the target week by date range, read column D.
