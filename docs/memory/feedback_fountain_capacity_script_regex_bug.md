---
name: feedback_fountain_capacity_script_regex_bug
description: Fountain capacity/over-estimate scripts must match BOTH bare-numeric task names (e.g. "2640") and dash/underscore-named tasks (e.g. "2524-duplicate-charge") — a prior script only matched the latter and silently dropped most rows
metadata:
  type: feedback
---

On 2026-06-21, the Fountain capacity report showed only 42h remaining across 4 NS+IP tasks. On 2026-06-22, a full re-scan of the same "Est vs Charged" tab found 219h remaining across 27 NS+IP tasks — a 5x discrepancy that was NOT a real capacity spike.

**Root cause (inferred):** the 2026-06-21 script's task-name matching regex only caught dash/underscore-formatted names (e.g. "2524-duplicate-charge") and silently skipped bare-numeric-named rows (e.g. "2640", "2669", "2671", "2695", "2702", "2716", "2735", "2742", "2775", "2783", "2811", "2822", "2869", "2870", "2872", "2885", "2912" — 23 of 27 tasks found on the 2026-06-22 full scan).

**Why:** These Fountain/sheets scripts are rewritten fresh each day (per [[feedback_sheets_scan_script_reuse_wrong_day]] pattern) and have repeatedly dropped rows due to narrow regex/filter assumptions. This is the same class of bug, applied to task-name matching instead of date tokens.

**How to apply:**
- When writing/adapting a Fountain "Est vs Charged" capacity or over-estimate script, verify the row-selection logic counts ALL rows with a non-empty task identifier in the relevant column — do not filter by a name-format regex (dash/underscore) that assumes a particular naming convention. Test by counting total qualifying rows and sanity-checking against the sheet's visible row count before trusting the output.
- If a day's capacity/remaining-hours figure differs sharply (e.g. 5x+) from the previous report, treat it as a likely script bug first, not a real week-over-week spike — re-verify row counts before reporting a "spike".
- Related known sheet data-quality issue: task **#2380** has a duplicate row in this same tab (two different Est values, same Actual) — a source-data problem, not a script bug; flag to the Fountain/Kunal team to fix at the source rather than trying to de-dupe in the script.
