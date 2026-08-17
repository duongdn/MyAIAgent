# Monday Report — Week 2026-08-10–2026-08-16

**Submitted:** 2026-08-17 09:28 +07 | **Mode:** LIVE | **Form submissions:** 8/8 ✓ | **Trello:** 8/8 marked complete

---

## Submitted Data

| Project | Dev Hours | Internal Bugs | External Bugs | Note |
|---|---|---|---|---|
| Maddy - Xtreme Soft Solutions | 3.25 | 2 | 0 | LongVV only (Maddy tracking is LongVV-only since 2026-04-06). 2 internal bugs: #80373 padding, #80364 text mismatch. No external bugs — client Slack msgs were process/status questions, not defect reports. |
| Aysar Khalid - Baamboozle | 17 | 0 | 2 | KhanhHH 17h. External bugs: #678 game count wrong in multiple places (reported+fixed), TEAM subscription expiry date wrong after PR 603 release. |
| James Diamond - Portfolio | 59.5 | 0 | 0 | AnhNH2 20h + LeNH 39.5h. |
| Bailey Joey - Speedventory | 17.5 | 1 | 0 | Sheet-only (no Workstream). 1 internal bug: #80302 Validate Map UI issue. |
| Marcel Fuessinger - Tokenlite | 1.5 | 0 | 3 | DuongDN 0.5h + LongVV 1h. 3 external bugs via Equanimity Slack (client=Equanimity® Holdings, not literally named "Marcel"): device scan failures 13-14 Aug (missing clock-in/out), SGBuildex fields empty/UAT-prod mismatch, invalid worker FIN/NRIC data. |
| Neural Contract - Neural Contract - Test Job | 0 | 0 | 0 | No activity this week. |
| Raymond Huang - LegalAtoms | 0 | 0 | 0 | No direct client ask to us this week (Raymond has many unrelated sub-projects). |
| Andrew Taraba - Portfolio | 0 | 0 | 0 | No Bizurk Discord activity this week. |

---

## Data Sources

- **Dev hours:** Google Sheets `Summary!A6:D60` for week 2026-08-10 (6/8 sheets showed stale 0.00 — cross-checked against Workstream `weekTotal` via `workstream-fetch-project-week.js` for maddy/baamboozle/james_diamond/marcel; Neural Contract/LegalAtoms confirmed empty on both sheet and WS. Bailey uses sheet only (no Workstream). Andrew Taraba: no WS project, sheet 0.00 trusted.
- **Internal bugs:** Redmine `issues.json` (tracker_id=1, created_on 2026-08-10..2026-08-16) for maddy-extreme-soft-solutions, james-bonsey-jaden, bailey-paturevision. Others always 0 per skill.
- **External bugs:** Slack search.messages for Xtreme Soft Solutions (Maddy), Baamboozle, LegalAtoms, **Equanimity** (Marcel/Tokenlite — client company name, not the project alias) workspaces. Discord message-search for James Diamond (AirAgri guild only) and Andrew Taraba (Bizurk guild). Redmine "external" subject/desc check for Bailey (none found).

## Caveats

- This LIVE run reuses data gathered and twice-corrected during the same-morning TEST run (09:04–09:21):
  1. **Maddy hours** initially miscomputed as full-team Workstream sum (14.25h: ThanhNX+LongVV+TuanTT) — corrected to LongVV-only (3.25h) per existing memory that Maddy tracking is LongVV-only since 2026-04-06.
  2. **Marcel external bugs** initially reported 0 because the skill text says "always 0" and there's no Slack workspace literally named "Marcel"/"Tokenlite" — user caught it ("marcel có 3 external bug mà, ko check slack à?"). Found the client's Slack is under company name **Equanimity** (confirmed via Workstream `/pinfo/projects` customer field); found and confirmed 3 real external bugs. Saved as feedback memory (both locations) — same class of stale-default error as the earlier-documented Neural/LegalAtoms/Taraba hours mistake.
- **James Diamond Discord scope:** only AirAgri guild searched — HOMIEAPP excluded per mandatory policy (CLAUDE.md + `feedback_discord_only_airagri_bizurk`), even though the skill text names it for James Diamond. No Diamond-related messages found in AirAgri.
- **External-bug judgment calls (user-confirmed):** Baamboozle counted 2 of 4 candidates (excluded a feature request and staging/QA-only nusdev-vs-production mismatches). Maddy's Shopify-stock question treated as process question, not a bug.
- Sheet staleness (0.00 across most projects) is a recurring pattern, not a one-off — Workstream remains the reliable cross-check source.

## Unresolved Questions

- None.
