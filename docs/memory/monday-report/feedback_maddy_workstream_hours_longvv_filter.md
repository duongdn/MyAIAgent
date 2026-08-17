---
name: feedback_maddy_workstream_hours_longvv_filter
description: Monday report Maddy dev hours must filter Workstream weekTotal to LongVV only, not sum all members
metadata:
  type: feedback
---

Maddy (Xtreme Soft Solutions) Workstream data returns multiple members logging under the project (ThanhNX, LongVV, TuanTT), but Monday report's Maddy dev-hours figure must count **LongVV only**. Summing all members' `weekTotal` overstates it.

**Why:** 2026-08-17 run (week 2026-08-10..08-16): computed Maddy = ThanhNX 8.5 + LongVV 3.25 + TuanTT 2.5 = 14.25h from Workstream `/review/week`. User corrected: "Maddy chỉ có LongVV làm thôi" (Maddy only has LongVV working on it) → correct figure is LongVV's 3.25h alone. This info already existed in [[project_monday_report_sheets]] ("Maddy (LongVV only since 2026-04-06)") but wasn't applied when pulling the Workstream multi-member breakdown — the sheet-ID table annotation was read but not cross-referenced against the WS member list before computing the sum.

**How to apply:** When Maddy's sheet Summary shows stale 0.00 and Workstream `/review/week` is used as the cross-check (per [[feedback_monday_report_hours_and_scope]]), filter the `members[]` array to `name === "LongVV"` and use only that member's `weekTotal` — do not sum across ThanhNX/TuanTT/others even though they show real logged hours on the same Workstream project. Other members' hours on the Maddy WS project are for different work (not the tracked Monday-report scope).
