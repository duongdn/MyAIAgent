---
name: Filter official time — exclude Part-time rows
description: Task logs have "Part-time" in column A for extra hours — only count "Task dự án" rows as official time
type: feedback
---

When calculating employee hours from Google Sheets task logs, column A contains the item type:
- "Task dự án" = official/project task hours → count these
- "Part-time" = extra/part-time hours → do NOT count as official

Only sum "Task dự án" rows per owner (column G) for the official time. Part-time rows are extra hours on top of the contracted 8h/day.

**Why:** User corrected when LeNH showed 9.83h on Thursday — actually 5.66h official + 4.17h part-time. Week official total was exactly 40h.
**How to apply:** Always filter by column A = "Task dự án" when summing official hours. Report part-time separately if relevant. Compare weekly official total against 40h, not just daily against 8h.
