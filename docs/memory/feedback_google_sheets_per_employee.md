---
name: Google Sheets task log — filter by Owner column, not day total
description: Task log sheets have multiple employees per day. Must filter by Owner column (G), not read day total row. TuanNT splits across 3 projects — sum all.
type: feedback
---

Google Sheets task logs have MULTIPLE employees per day section. The day header row (e.g., "Mon, 16/03/26") shows the TOTAL for ALL employees. Must filter task rows by **Owner column (G)** to get per-employee hours.

**Why:** User caught error: "you dont check the name of employee and the row status, you sum the day, totally wrong!!!"

**How to apply:**
- Never use the day total row (col H of the date row) as a single employee's hours
- Iterate task rows within each day, check Owner column (G) matches target employee
- TuanNT splits across 3 projects (Bailey/Paturevision, Rebecca/William Bills, John Yi/Amazing Meds) — must SUM hours across all 3 sheets
- TuanNT = Nick (external name on John Yi/Scrin.io)
- **Scrin.io cross-reference**: Compare ONLY John Yi project hours vs Scrin.io — NOT the total across all 3 projects. Scrin.io tracks "john yi" company only.
- Each project sheet has different week numbering (project-specific, not calendar weeks)
- "Nghỉ cả ngày" = full day off (0h OK), "Nghỉ nửa ngày" = half day (4h OK)
