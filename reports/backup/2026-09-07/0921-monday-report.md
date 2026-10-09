# Monday Report — Week Aug 31–Sep 6, 2026

**Submitted:** 2026-09-07 09:21 +07 | **Mode:** LIVE | **Form submissions:** 8/8 ✓ | **Trello:** 8/8 marked complete

---

## Submitted Data

| Project | Dev Hours | Internal Bugs | External Bugs | Note |
|---|---|---|---|---|
| Maddy - Xtreme Soft Solutions | 2.5 | 0 | 1 | Shopify qty-after-refund confusion (anomawasala). Mostly LIFM2-459/462 feature/estimate work this week. |
| Aysar Khalid - Baamboozle | 3.5 | 0 | 1 | nusdev login/URL bug (skjamie25), fixed same day by carrick. |
| James Diamond - Portfolio | 37.5 | 0 | 2 | Forms-visibility bug (Admin-created forms hidden) fixed by nusvinn; Live Host field on Visitor Check-In still open. |
| Bailey Joey - Speedventory | 55.92 | 9 | 0 | 9 internal QA bugs found during staging2/rails6 upgrade (Console+Grazing). No client-reported external bugs this week. |
| Marcel Fuessinger - Tokenlite | 0 | 0 | 1 | BCA-flagged records (Reference-ID tagged Test / UEN mismatch) — same root cause, merged as 1 bug. No dev hours logged this week. |
| Neural Contract - Test Job | 0 | 0 | 0 | No activity this week. |
| Raymond Huang - LegalAtoms | 0 | 0 | 0 | GitHub issues routed within Raymond's own team, not a direct ask to NUS this week. |
| Andrew Taraba - Portfolio | 0 | 0 | 0 | No Discord activity this week. |

---

## Data Sources

Same data used as the immediately-preceding TEST run (see `reports/2026-09-07/0829-monday-report.md`), re-confirmed with user before LIVE submission — no changes.

- **Dev hours:** Sheets `Summary!A6:D60` for all 8 projects showed stale `0.00` for the week → cross-checked via Workstream `/review/week` per project. Maddy filtered to LongVV only (per known project convention). Bailey = sum of all WS members' `weekTotal`. Marcel/Neural/LegalAtoms/Taraba had empty WS member lists → genuinely 0h.
- **Internal bugs:** Redmine `issues.json` (tracker_id=1, created_on this week) per project: maddy-extreme-soft-solutions (0), james-bonsey-jaden (0), bailey-paturevision (9, all staging2/rails6-upgrade QA finds).
- **External bugs:** Slack search.messages per workspace (Xtreme Soft Solutions, Baamboozle, LegalAtoms, Equanimity) + Discord (AirAgri via nusvinn, Bizurk DM via nuscarrick for Taraba). User confirmed judgment calls for ambiguous cases (Maddy, James Diamond, Marcel, Baamboozle, LegalAtoms) via AskUserQuestion.

## Caveats

- All 8 project Sheets showed `0.00` for the week — confirmed stale via WS cross-check per memory (not a real 0h week except Marcel/Neural/LegalAtoms/Taraba, which WS also showed empty).
- LegalAtoms: 3 GitHub issues (21527, 21507, 21495) were seen assigned to our dev (Alirio) this week but excluded per user decision — treated as Raymond's team's own tracking, not a direct external-bug report to us.
- Marcel: 2 related Equanimity Slack issues (Reference-ID/Test tag flagging, UEN validation) merged into 1 external bug per user's same-root-cause call.
- Andrew Taraba: no Workstream project entry exists for this client at all (not in `workstream-fetch-project-week.js` project list) — relies solely on Sheet (0.00) with no independent cross-check available.
- Trello checklist items were all `incomplete` pre-run (fresh recurring card cycle) and all confirmed `complete` after re-fetching live post-write.

## Unresolved Questions

- None.
