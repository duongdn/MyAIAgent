---
name: project_finance_report_detail_skill
description: /me:finance-report-detail skill — full 6-sheet equity report per ticker, matching FPT/VEA style, created 2026-07-27
metadata:
  type: project
---

New skill `.claude/commands/me/finance-report-detail.md` (2026-07-27): given 1 ticker, builds the same 6-sheet Google Sheets analysis structure as was hand-built for FPT and VEA earlier: raw BCTC sheet, Định tính, Định lượng, Định giá, Benjamin Graham, Báo cáo 2 (final formatted summary).

**Why:** User liked the FPT/VEA report format enough to want it repeatable for any ticker, without redoing the whole ad-hoc build process each time.

**How to apply:** Not a one-shot automated script — data sourcing (see [[reference_cafef_data_source]]) and Google Sheets formatting (merge/hyperlink/row-height gotchas already learned from the FPT/VEA build) still require multiple verification passes. Core discipline carried over unchanged: never fabricate financial figures — missing/contradictory data means stop and ask the user, not estimate.

🔴 **Apply the raw-sheet + Định lượng visual formatting (see [[reference_raw_sheet_formatting_spec]]) as part of the build, not as a fix-up after the user points out it's missing** — this was missed on the first SAB pass (2026-07-27) and had to be corrected reactively. The 4 reusable format/group scripts exist specifically so this is a 4-command step, not optional polish.
