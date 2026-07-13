---
name: feedback_monday_report_hours_and_scope
description: Monday report — use Workstream weekTotal not weekCharged when sheet Summary is stale; project inclusion criteria
metadata:
  type: feedback
---

**Sheet staleness check:** If a project's Summary sheet shows exactly `0.00` for the reporting week, it's likely not yet synced — cross-check Workstream (`node scripts/workstream-fetch-project-week.js {monday_date} {project_key}`) before reporting 0h. Confirmed stale for Baamboozle, James Diamond, Marcel in 2026-06-29 week (sheet 0.00, WS showed real hours 17/61/4.17).

**weekTotal vs weekCharged:** When summing Workstream hours across multiple members, use `weekTotal` not `weekCharged`. `weekCharged` can be a partial/capped value (e.g. LeNH weekTotal=12 but weekCharged=7) that undercounts real hours. James Diamond week 2026-06-29: PhucVT 28 + AnhNH2 19 + LongVV 2 + LeNH 12 (weekTotal) = 61h — confirmed correct by user (weekCharged sum would've given wrong 56h).

**Small sheet-vs-WS gaps (~2h) are normal, not staleness:** Maddy sheet showed 18.00 vs WS tracker 16h (LongVV, 2 tracked days). Sheet wasn't stuck at 0, so trust the sheet — small gap likely untracked work (PR review, meetings) manually added to sheet but not auto-captured by WS tracker.

**🔴 Staleness check must not be exact-0.00-only:** 2026-07-13 week, Maddy sheet showed 7.00 (nonzero, passed the "only flag exact 0.00" heuristic) but WS showed LongVV weekTotal=16 (7h Jul-6 + 9h Jul-9 — sheet only captured the first day). User caught this manually after I reported 7h. A partial-sync gap can be large (>50%) while still nonzero, so exact-0.00-only staleness checks miss it. **Always cross-check every project's sheet figure against WS weekTotal**, not just the ones showing 0.00 — a large gap (not just ~2h) is the real staleness signal, regardless of whether the sheet value is zero.

**Project inclusion criteria (user-confirmed 2026-07-06):** A project only gets added to Monday report if BOTH: (1) user is the manager, AND (2) it's already an option in the Google Form dropdown. If either is missing, do not push — even if the project is actively worked (per Trello "Check progress" checklist). User explicitly declined adding Rebecca/Franc despite them having active work, because they weren't yet in the Form dropdown.

**Why:** Google Form dropdown can't be edited via API/script — only manually by the user. Trello "Check progress" checklist tracks a broader project set than Monday report; don't assume all Trello-tracked projects belong in Monday report.

**How to apply:** Before Monday report, if checking for scope gaps, compare "Check progress" Trello checklist (card `6a4ac613a63260118b0ff9e4`) against the 8 current Monday report projects — but only escalate a gap if BOTH criteria could plausibly be met. Don't auto-add.

Related: [[project_monday_report_sheets]]
