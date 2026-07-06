---
name: feedback_workstream_vs_sheets_migration_gaps
description: workstream-fetch-project-week.js was missing 7+1 projects (Amazing Meds, Elevate365, Neural Contract, Radio Data Center, Speedventory, LegalAtoms, BXR App, Crystal lang); TuanNT logs Charles Chang hours ONLY in Sheets despite being a registered WS member; Speedventory (Bailey/Paturevision) has no dev registered in WS at all
metadata:
  type: feedback
---

Fixed 2026-07-06: `scripts/workstream-fetch-project-week.js` PROJECTS list was missing 8 of 18 live Workstream projects (amazing_meds, elevate365, neural_contract, radio_data_center, speedventory, legalatoms, bxr_app, crystal_lang) — same recurring gap as [[feedback_workstream_all_projects_in_script]]. Added all 8. Always re-verify PROJECTS list against a live `GET /time/projects` call, not the static reference file, since new projects appear without notice.

**New discovery — "Crystal lang" project (customer alias "Arthur"):** completely untracked — no Trello item, no Google Sheet, not in [[reference_workstream]] table before this fix. Roster: DuongDN (Tech Lead), PhucVT (Developer), TienND (Manager — unfamiliar name, not in [[project_php_team]]). Matches Matrix room "Arthur - Meta-Stamp" (`!BEXEdVUmvWclPLELFf:nustechnology.com`). PhucVT logged 4h there on 2026-07-03 — this likely explains some of PhucVT's past "mystery 0h" false alarms on James Diamond (he was actually working Crystal lang/Meta-Stamp, a project our monitoring didn't check at all).

**RESOLVED 2026-07-06 (partial):** User added `davidztv19@gmail.com` as a Gmail IMAP account to monitor for this project — see [[reference_email_accounts_all10]]. **No Trello checklist item added** — daily-report rules explicitly forbid creating new Trello cards/checklist items (Power-Up auto-creates them); if the user wants a Check Progress gate for Arthur/Meta-Stamp, that item must appear on the board first via Trello itself, then map it in [[reference_trello_gate_mapping]]. Workstream `crystal-lang` project (`cmqezgh7z080hp81vo5yqd24z`) is already live-queryable via `sheets-tasklog-scan.js` — no further code change needed there.

**Sheets-vs-Workstream migration gap confirmed via `sheets-tasklog-scan.js 2026-07-03 TuanNT LongVV PhucVT KhanhHH LeNH`:**
- KhanhHH, LeNH: fully migrated — 0h in Sheets, all hours in Workstream.
- TuanNT: NOT migrated for Charles Chang — logged 0.5h in the "CharlesChang" Google Sheet, but WS `family_app` project roster explicitly lists TuanNT as a Developer member with ZERO task-log rows that week. He's a registered WS member who simply isn't using it, still filing the old sheet instead.
- TuanNT's Paturevision hours (7.5h, Bailey/Speedventory client) don't appear in WS at all — but this is a **setup gap, not a habit gap**: the `speedventory` WS project roster only has DuongDN (Manager), no developer member added yet. There's nowhere in WS for TuanNT to even log Paturevision/Bailey hours.

**How to apply:**
1. When a dev's WS hours look artificially low/zero for a project they're known to work on, check the project's `roster` (via `/review/week`) — if they're a registered member with 0 rows, it's a real migration gap (flag to user); if they're not a member at all, it's a WS setup gap (need to add them as a project member first).
2. Before trusting any "0h" or "empty" WS result, live-query `GET /time/projects?date={date}` for the full current project list (see `sheets-tasklog-scan.js` for the pattern) — don't rely on the static reference table alone.
3. This is a structural monitoring gap, not just a data-freshness issue — worth periodically re-running this exact cross-check (Sheets vs WS roster+rows per dev) to catch new dual-tracking drift.

Related: [[feedback_workstream_all_projects_in_script]], [[reference_workstream]], [[feedback_dev_project_mapping_flexible]]
