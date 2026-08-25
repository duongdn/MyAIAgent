# Monday Report — Week Aug 17–23, 2026

**Submitted:** 2026-08-24 10:04 +07 | **Mode:** LIVE | **Form submissions:** 8/8 ✓ | **Trello:** 8/8 marked complete

---

## Submitted Data

| Project | Dev Hours | Internal Bugs | External Bugs | Note |
|---|---|---|---|---|
| Maddy - Xtreme Soft Solutions | 3.0 | 0 | 4 | Kai/LongVV WS hours (3h) undercounts real work vs 4 bugs fixed this wk: restock qty after refund, LIFM2-459 buy-tab, Xero connection expired, overseas orders wrong tax code to Xero (urgent, in progress) |
| Aysar Khalid - Baamboozle | 4.17 | 0 | 0 | Clean week, no client-reported bugs |
| James Diamond - Portfolio | 60.0 | 0 | 2 | AnhNH2 20h + LeNH 40h full week. AirAgri UAT found: missing Offline badge on hazard detail, no max-radius validation on circle hazards |
| Bailey Joey - Speedventory | 71.0 | 12 | 0 | 12 internal bugs (Console/PrestaShop/Grazing SW Desktop). No distinct external-tagged bug this wk |
| Marcel Fuessinger - Tokenlite | 3.67 | 0 | 2 | Equanimity Slack: SGBuildex validation error, duplicate device-swipe record (7011/7027) flagged by komal.bailur |
| Neural Contract - Test Job | 0 | 0 | 0 | Quiet week |
| Raymond Huang - LegalAtoms | 0 | 0 | 0 | Quiet week, no direct asks to us |
| Andrew Taraba - Portfolio | 0 | 0 | 0 | Quiet week |

---

## Data Sources

- **Dev hours:** Workstream `weekTotal` per project (`scripts/workstream-fetch-project-week.js 2026-08-17 <project>`), cross-checked against each project's Google Sheets Summary tab (`scripts/sheets-summary-week-fetch.js`) — all 8 sheets showed stale/near-0.00 this week, WS trusted per [[feedback_monday_report_hours_and_scope]]. Maddy filtered to LongVV only per [[feedback_maddy_workstream_hours_longvv_filter]]; Bailey summed across all 7 WS members per project convention.
- **Internal bugs:** Redmine `tracker_id=1`, `created_on` window 2026-08-17..2026-08-23, projects `maddy-extreme-soft-solutions` (0), `james-bonsey-jaden` (0), `bailey-paturevision` (12). Baamboozle/Marcel/Neural/LegalAtoms/Taraba always 0 per skill.
- **External bugs:** Slack `search.messages` — Xtreme Soft Solutions (Maddy, live-verified via raw message dump), Baamboozle (0), Equanimity/xid-technologies (Marcel), LegalAtoms (0, internal chatter only, excluded per [[feedback_legalatoms_ray_many_subprojects_ignore_unless_direct_ask]]), GLOBAL GRAZING SERVICES (Bailey, billing/arch chat only, no new bug). Discord: AirAgri (James Diamond, via `discord-monitor.js`), Bizurk (Andrew Taraba, 0). Merge-same-thread + exclude-investigation-only rules applied per [[feedback_external_bug_counting_judgment_calls]].

## Caveats

- **Maddy hours/bugs mismatch investigated and confirmed real:** user flagged 3h dev hours vs 4 external bugs as suspicious. Verified live Slack timestamps (all 08-17→08-21, distinct issues, not thread duplicates) — Kai (LongVV) was actively debugging/fixing all week but his Workstream task-log entries don't capture that time. User decision: keep WS 3h as the submitted figure, gap noted in the form Note field. Not a data-collection error on this run's part.
- All 8 project Summary sheets showed 0.00 or near-0 this week — treated as stale/unsynced per established pattern, Workstream used as source of truth throughout.
- No unresolved questions.
