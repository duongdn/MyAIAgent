# Monday Report — Week 2026-08-10–2026-08-16

**Submitted:** 2026-08-17 09:04 +07 (Marcel corrected 09:21 +07) | **Mode:** TEST | **Form submissions:** 9/8 (Marcel resubmitted with correction) ✓ | **Trello:** n/a — test mode

---

## Submitted Data

| Project | Dev Hours | Internal Bugs | External Bugs | Note |
|---|---|---|---|---|
| Maddy - Xtreme Soft Solutions | 3.25 | 2 | 0 | LongVV only (per memory: Maddy=LongVV-only since 2026-04-06). 2 internal bugs: #80373 padding, #80364 text mismatch. No external bugs — client Slack msgs were process/status questions, not defect reports. |
| Aysar Khalid - Baamboozle | 17 | 0 | 2 | KhanhHH 17h. External bugs: #678 game count wrong in multiple places (reported+fixed), TEAM subscription expiry date wrong after PR 603 release. |
| James Diamond - Portfolio | 59.5 | 0 | 0 | AnhNH2 20h + LeNH 39.5h. |
| Bailey Joey - Speedventory | 17.5 | 1 | 0 | Sheet-only (no Workstream). 1 internal bug: #80302 Validate Map UI issue. |
| Marcel Fuessinger - Tokenlite | 1.5 | 0 | 3 | DuongDN 0.5h + LongVV 1h. 3 external bugs (corrected — see caveats): device scan failures 13-14 Aug, SGBuildex fields empty/UAT-prod mismatch, invalid worker FIN/NRIC data. |
| Neural Contract - Neural Contract - Test Job | 0 | 0 | 0 | No activity this week. |
| Raymond Huang - LegalAtoms | 0 | 0 | 0 | No direct client ask to us this week (Raymond has many unrelated sub-projects). |
| Andrew Taraba - Portfolio | 0 | 0 | 0 | No Bizurk Discord activity this week. |

---

## Data Sources

- **Dev hours:** Google Sheets `Summary!A6:D60` for week 2026-08-10 (all 7 of 8 non-Bailey sheets showed stale 0.00 — per memory, cross-checked against Workstream `weekTotal` via `workstream-fetch-project-week.js` for maddy/baamboozle/james_diamond/marcel/neural_contract/legalatoms; Bailey uses sheet only (no Workstream); Andrew Taraba has neither WS project nor sheet data, trusted sheet 0.00.
- **Internal bugs:** Redmine `issues.json` (tracker_id=1, created_on 2026-08-10..2026-08-16) for maddy-extreme-soft-solutions, james-bonsey-jaden, bailey-paturevision. Others always 0 per skill.
- **External bugs:** Slack search.messages for Xtreme Soft Solutions (Maddy), Baamboozle, LegalAtoms workspaces (date range after:2026-08-09 before:2026-08-17). Discord message-search for James Diamond (AirAgri guild only — HOMIEAPP excluded per policy) and Andrew Taraba (Bizurk guild). Redmine "external" subject/desc check for Bailey (none found).

## Caveats

- **Marcel external bugs correction:** initial pass reported 0 external bugs because Marcel/Tokenlite has no Slack workspace literally named "Marcel"/"Tokenlite" and the skill text says "External Bugs: Always 0" for this project — skipped checking Slack entirely. User caught this. The client's actual company is "Equanimity® (Blockchain) Holdings" (found via Workstream `/pinfo/projects/{id}` customer field) which matches the **Equanimity** Slack workspace already in `config/.slack-accounts.json` (xoxc session, refreshed via `slack-xoxc-refresh-equanimity.js`). Found 3 distinct external bugs in the `xid-technologies` channel: (1) device scan failures 13-14 Aug causing missing clock-in/clock-out (reported by komal.bailur relaying Ken-Pal team, escalated by Marcel re: 21 Aug recurrence), (2) SGBuildex-related fields empty in RealTimeLogs / data that worked in UAT not populating in production, (3) invalid per-worker data (FIN/NRIC format, nationality) flagged by komal, fixed by carrick. Resubmitted Marcel row (external 0→3) after initial submission. Same class of error as the already-documented "always 0" hours mistake for Neural/LegalAtoms/Taraba — the skill's static defaults are unreliable and must be checked against live sources, not trusted at face value.
- **Maddy hours correction:** initially computed as full-team WS total (14.25h: ThanhNX+LongVV+TuanTT) — user corrected to LongVV-only (3.25h), consistent with existing memory that Maddy tracking is LongVV-only since 2026-04-06. Sheet ID's own annotation in memory was overlooked on first pass; corrected before submission.
- **James Diamond Discord scope:** per mandatory policy (CLAUDE.md monitoring rules + `feedback_discord_only_airagri_bizurk`), only AirAgri guild was searched — HOMIEAPP is excluded even though the monday-report skill text names it for James Diamond. No Diamond-related messages found in AirAgri (searched "jdiamond"/"diamond" content, zero hits) — external-bug figure may be incomplete if James Diamond activity happens in HOMIEAPP.
- **External-bug judgment calls confirmed by user:**
  - Maddy: anomawasala's Shopify-stock-after-return question treated as a process question, not a bug report → 0.
  - Baamboozle: counted 2 of 4 candidate items (#678 game count, TEAM expiry-date display) — excluded "view >2 pages of users" (feature request) and nusdev-vs-production landing/search mismatches (staging QA loop, not production defect) and Ronan's nusdev-URL-leak follow-up (continuation of a pre-window issue already fixed).
  - LegalAtoms: 8 Slack messages found this week, none a direct ask to DuongDN — per memory, Raymond has many unrelated sub-projects, so external bugs = 0.
- Sheet staleness (0.00 across 6/8 projects) is a recurring pattern this week, not a one-off — Workstream remains the reliable source for Maddy/Baamboozle/James Diamond/Marcel while their sheets lag.

## Unresolved Questions

- None.
