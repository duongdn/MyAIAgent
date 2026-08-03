---
name: feedback_monday_report_must_write_file
description: Monday report must always write a report file to reports/{date}/{HHMM}-monday-report.md — was previously ad-hoc/skipped
metadata:
  type: feedback
---

Monday report skill did not consistently write an output file — `monday_report.output_file` in `config/.monitoring-timelines.json` stayed `null` for most runs; only 3 runs ever had a file (2026-05-11, 2026-05-25, 2026-06-29), out of many weekly runs since the skill existed.

**Why:** User caught the gap 2026-08-03 and asked for a file every time, going forward, and for the command itself to be updated so this isn't optional/forgotten again.

**How to apply:** `.claude/commands/me/monday-report.md` now has an explicit step 6 "Write report file" (mandatory, test or live mode) with a template, and `.claude/commands/util/report.md` naming table has a `Monday report` row (`{HHMM}-monday-report.md`). After every run, update `monday_report.output_file` in the timeline with the actual path. Don't skip the file write even for test-mode runs.

Related: [[project_monday_report_sheets]], [[feedback_monday_report_hours_and_scope]]
