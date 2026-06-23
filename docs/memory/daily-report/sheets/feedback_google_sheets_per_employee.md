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
- **Scrin.io cross-reference**: Compare ONLY John Yi project hours vs Scrin.io — NOT the total across all 3 projects. Scrin.io tracks "john yi" company only. **Also check the `Project`/`Client`/`Note` fields in the raw API response** — sessions tagged `"No project"`/`"No client"` are generic untagged screen-activity, NOT confirmable as John-Yi-specific work. Never write "Nick worked X hours on John Yi" from Scrin alone without that tagging; phrase it as "Nick tracked Xh in the 'john yi' Scrin workspace (untagged)".
- Each project sheet has different week numbering (project-specific, not calendar weeks)
- "Nghỉ cả ngày" = full day off (0h OK), "Nghỉ nửa ngày" = half day (4h OK)

**CORRECTED 2026-06-18 — the James Diamond sheet has the SAME multi-employee trap:** PhucVT's sheet (`1XUJ7Ww8dyxv6L42wtQ_7jz4GCGvBzDUXEc7YTHrKgeI`) also has **AnhNH2** logging hours in it — but AnhNH2 works a completely different app ("Bullitt Chat" — unrelated to James Diamond/AirAgri). The `daily-sheets-scan-*.js` script's PhucVT section used `sum(jdH)` (sum of ALL owners in that sheet) instead of filtering to `owner.includes("PhucVT")` like the VietPH section correctly does a few lines below it — produced "PhucVT: 12h" when PhucVT's actual hours were 8h (the other 4h was AnhNH2's, on an unrelated project). **When writing/regenerating these daily scan scripts, always filter every dev's total to their own name — copy the VietPH filtering pattern, never copy the PhucVT summing pattern.** AnhNH2's own hours can be reported separately if relevant, but never folded into another dev's number.
