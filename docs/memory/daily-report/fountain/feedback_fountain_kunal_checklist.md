---
name: fountain-kunal-daily-report-mandatory-3-part-checklist
description: "Fountain section MUST have all 5 parts: Matrix plan, task log actuals (via Workstream), plan vs actual table, Capacity & Runway, Over-estimate tracking. NEVER skip any. The 2026-07-13 claim that Parts 4/5 were 'dropped' was WRONG — the 'Est vs Charged' Google Sheet tab is still live and readable every week (confirmed again 2026-08-22, 3rd correction in a row)."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 754a9366-d1fc-446c-b7d4-a6661c260ab2
---

Fountain/Kunal report is **FIVE parts**, ALL required. Missing any = report is WRONG.

🔴 **CORRECTED 2026-08-22 (3rd time flagging this) — Parts 4/5 are NOT dropped, never were.** The 2026-07-13 claim below (kept for history) that the "Est vs Charged" Google Sheet tab (sheetId 920993260, Col I=Est Raw/J=CR/K=Actual, range A13:L118) was "no longer used, moved to Workstream" was factually wrong — every weekly report since (08-01, 08-07, 08-15, 08-22) has successfully read this tab live via the Sheets API and gotten real, current data (e.g. 08-22: Narrow 229.00h/28 tasks, Broad 328.50h/63 tasks, 37 over-estimate items — frozen 7 consecutive weeks but genuinely live/readable, not stale/gone). Do NOT skip Parts 4/5 based on this memory's original text below — that text is preserved only as a record of the error, not as current guidance.

**Original (WRONG) 2026-07-13 claim, kept for history only:** "Capacity & Runway and Over-estimate tracking (previously Parts 4/5) are DROPPED, not migrated." User had said the sheet was no longer used — but subsequent weeks disproved this every time the tab was actually checked. Do NOT reference `feedback_fountain_cr_column`, `feedback_fountain_capacity_script_regex_bug`, `feedback_fountain_est_vs_charged_status_column_bug`, or `feedback_over_estimate_tracking` — all four deleted, they described earlier sheet-mechanics bugs unrelated to this dropped/not-dropped question.

## 1. Matrix weekly plan
Fetch latest message from Fountain room (`!EWnVDAxbTGsBxPkaaI:nustechnology.com`) matching "Em update plan tuần này" format. Extract per-dev planned hours (ViTHT, ThinhT, VuTQ, HaVS) and QC total. Cite source (@sender + timestamp).

## 2. Task log weekly actuals
**Workstream is the primary/authoritative source** (project `fountain` / "Fountain Greetings", id `cmpqcjojh00q2tk1v2qi7gs0j` — see [[reference_workstream]]). Query `/review/week?projectId=cmpqcjojh00q2tk1v2qi7gs0j&date=...` for per-developer weekly totals: VuTQ, ThinhT, ViTHT (dev); PhatDLT, HungPN (QC); HaVS. Fall back to the Fountain spreadsheet (`1iIKfjAh857qzrR2xkUWPcN_9bFAwB1pL8aJWTRk4f4o`) Summary tab only if Workstream data for this project looks empty/suspicious — see [[feedback_check_workstream_before_flagging_shortfall]] for the retry/cross-check discipline.

## 3. Plan vs Actual table
Compare each developer's plan vs actual. Flag mismatch.

## 4. Capacity & Runway
Source: "Est vs Charged" tab (sheetId 920993260, spreadsheet `1iIKfjAh857qzrR2xkUWPcN_9bFAwB1pL8aJWTRk4f4o`), range A13:L118. Status col G, Est = col I (Raw) + col J (CR), Actual = col K. Narrow bucket = Not Started + In-progress (>50%) + In-progress (<50%); remaining = max(0, Est+CR-Actual) summed. Broad bucket = all rows excl. Deployed on Live/Cancelled/blank-status. Compare bucket totals vs previous week's report.

## 5. Over-estimate tracking
Same sheet/columns as Part 4. Flag rows where Actual > (Est+CR) × 1.2. Sort by over% descending, list top offenders, compare vs previous week (unchanged/new/resolved).

---

**Why (original 5-part rule, history):** User found report was fabricated — claiming "Hours match Kunal plan" without fetching Matrix, no capacity data, no over-estimate tracking. This is what originally made all 5 parts MANDATORY. A 2026-07-13 claim that Parts 4/5 had been dropped turned out to be wrong (see correction above, confirmed 3× since) — all 5 parts remain mandatory, full stop.

**How to apply:**
- Daily/weekly report Fountain section: all 5 sub-sections, every time
- Critical Alerts: only mark Fountain OK if ALL 5 parts checked and clean
- Never claim "matches plan" without showing actual numbers from Matrix
- If Matrix token expired, flag as blocker for Part 1 — Parts 2/3 still proceed via Workstream/Sheets independently; Parts 4/5 are Sheets-only and independent of both Matrix and Workstream availability
