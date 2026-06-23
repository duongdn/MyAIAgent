---
name: Upwork comparison matches by task ID, not whole spreadsheet
description: When comparing Upwork hours vs task log, filter by the specific task ID that corresponds to the Upwork contract, not all rows by that person
type: feedback
---

Upwork workroom hours must be compared against task log rows matching the **specific task ID** for that contract, not all rows by the developer.

**Why:** DuongDN logs hours in Paturevision for multiple task IDs. Bailey DEV3 Upwork contract = "[Maintenance] Update PHP version on Prestashop". Only rows with that task ID should be summed (2.66h), not all DuongDN rows (3.66h which includes unrelated "Weekly Monitor" task).

**How to apply:**
- Each Upwork workroom maps to a specific task ID in the task log
- Bailey DEV3 → Paturevision sheet, task ID "[Maintenance] Update PHP version on Prestashop"
- Bailey DEV1 (VietPH) → also Paturevision sheet, same task ID
- Filter by Owner column AND Task ID column when summing hours for comparison
