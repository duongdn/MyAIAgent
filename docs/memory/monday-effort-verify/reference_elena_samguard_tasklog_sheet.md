---
name: reference_elena_samguard_tasklog_sheet
description: Google Sheet task log for the "Elena Klebanov"/SamGuard/Precognize project — resolves the Workstream blind spot for this project in monday-effort-verify
metadata:
  type: reference
---

**Sheet:** `1dH14D_XShHiVPReInjZ33YDP27cIBuV0q5BS9Nx-DRQ` (user calls it "Task log mới của Elena"). Same project as "Elena Klebanov" column in ThuyLTT's weekly hours image — confirmed via `Project Info` tab: client is SamGuard (`mobile-test-01.client.samguard.co`), internal name "Elena"/Active Alerts/Digital Plant, Precognize (`lena.klebanov@samsongroup.com`).

**Why this matters:** [[project_matrix_static_compat_token]]'s sibling command `/me:monday-effort-verify-with-thuyltt` flagged "Elena Klebanov" as an unverifiable blind spot for 3 consecutive weeks (2026-06-22 through 2026-07-13) — the project never appears in DuongDN's Workstream self `/time/projects` membership list at any date, and `/admin/projects` is 403. This sheet is the independent source that closes that gap.

**Structure:** Per-week tabs named `W{n}`, but **the tab number is NOT the calendar week number** — it's offset from Project Start (Thursday 2026-04-02, per `Project Info` tab). Confirmed empirically: `W16` tab = calendar week 2026-07-06 to 07-12 (not week 16 of the year). Always verify the date range printed in column A (`Mon, DD/MM/YY` rows) before trusting a tab number — same gotcha seen historically in the Fountain/Paturevision sheets.

**Row format:** header row 3 = `Item | Project | Description | Reference | Task ID | Status | Owner | Actual | Self-rated | Charged | Notes`. Filter rows where column G (`Owner`) = `DuongDN`, sum column H (`Actual`) in hours (not minutes — unlike Workstream's `weekStats.actual` which is minutes).

**Verified 2026-07-13 (week 2026-07-06):** DuongDN row — Mon 06/07, "samguard.co CSP error", Actual 0.25h. Matched ThuyLTT's image (0.25h) exactly. First real resolution of this blind spot.

**How to apply:** in future `/me:monday-effort-verify-with-thuyltt` runs, check this sheet for the Elena Klebanov column instead of treating it as unverifiable. Find the correct `W{n}` tab by checking date rows, not by computing an offset (the offset could drift/be off-by-one — always confirm from the sheet itself).

**Also confirmed same session:** Bailey (Speedventory) hours similarly never in Workstream — user confirmed directly ("Bailey: tương tự, ko dùng workstream"), consistent with existing memory.

**Update 2026-08-17 (week 2026-08-10):** the Workstream blind spot for Samguard is now CLOSED — since 2026-08-10 the project appears in DuongDN's live `/time/projects` self-membership list (project ID `cmqyvio6u0021qo0xljhu70q8`, see [[project_monday_effort_verify_thuyltt_context]]), and `GET {api_base}/time/projects/{id}/week?date=...` self-view now returns real data for it. This run cross-checked both: Workstream self-view = 0h, this sheet's `W21` tab (date row confirms `Mon, 10/08/26`) = 0h, ThuyLTT's image = 0.00 — all three agree. Going forward, Workstream self-view is sufficient for Samguard; this sheet is now a redundant cross-check rather than the only source, but still fine to use if Workstream ever blind-spots again.
