---
name: Leave day means no daily report needed
description: When task log column A shows "Nghỉ cả ngày" (full day off), no daily report is expected — do not flag as missing/alert
type: feedback
---

If column A in the task log sheet shows "Nghỉ cả ngày" (full day off) for a given day, the developer/team does NOT need to submit a daily report for that period. Do not flag this as a missing daily report alert.

**Why:** A leave day has no work to report. Flagging it as "daily report missing" creates false alerts and wastes PM review time.

**How to apply:** When checking for daily reports (Slack search for "progress"/"daily report"), always cross-check column A of the corresponding task log sheet for leave notes. If the period covered was a leave day ("Nghỉ cả ngày"), treat the absence of a daily report as expected — mark Trello item complete, not incomplete.
