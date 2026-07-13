---
name: fountain-kunal-daily-report-mandatory-3-part-checklist
description: "Fountain section MUST have all 3 parts: Matrix plan, task log actuals (via Workstream), plan vs actual table. NEVER skip any. Capacity/Runway + Over-estimate tracking (old Parts 4/5) DROPPED 2026-07-13 — the 'Est vs Charged' Google Sheet tab is no longer used, moved to Workstream, and Workstream has no equivalent task-level est/actual+CR feature, so these parts are gone entirely, not migrated."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 754a9366-d1fc-446c-b7d4-a6661c260ab2
---

Fountain/Kunal report is **THREE parts**, ALL required. Missing any = report is WRONG.

🔴 **2026-07-13: Capacity & Runway and Over-estimate tracking (previously Parts 4/5) are DROPPED, not migrated.** User confirmed the "Est vs Charged" Google Sheet tab (Col I/J/K, CR column, task-level est-vs-actual) is no longer used — hours moved to Workstream, but Workstream has no equivalent task-level capacity/over-estimate feature, so this whole category of tracking is gone. Do NOT look for a Workstream equivalent — there isn't one. Do NOT reference `feedback_fountain_cr_column`, `feedback_fountain_capacity_script_regex_bug`, `feedback_fountain_est_vs_charged_status_column_bug`, or `feedback_over_estimate_tracking` — all four deleted, they described the now-defunct sheet mechanics.

## 1. Matrix weekly plan
Fetch latest message from Fountain room (`!EWnVDAxbTGsBxPkaaI:nustechnology.com`) matching "Em update plan tuần này" format. Extract per-dev planned hours (ViTHT, ThinhT, VuTQ, HaVS) and QC total. Cite source (@sender + timestamp).

## 2. Task log weekly actuals
**Workstream is the primary/authoritative source** (project `fountain` / "Fountain Greetings", id `cmpqcjojh00q2tk1v2qi7gs0j` — see [[reference_workstream]]). Query `/review/week?projectId=cmpqcjojh00q2tk1v2qi7gs0j&date=...` for per-developer weekly totals: VuTQ, ThinhT, ViTHT (dev); PhatDLT, HungPN (QC); HaVS. Fall back to the Fountain spreadsheet (`1iIKfjAh857qzrR2xkUWPcN_9bFAwB1pL8aJWTRk4f4o`) Summary tab only if Workstream data for this project looks empty/suspicious — see [[feedback_check_workstream_before_flagging_shortfall]] for the retry/cross-check discipline.

## 3. Plan vs Actual table
Compare each developer's plan vs actual. Flag mismatch.

---

**Why (original 5-part rule, history):** User found report was fabricated — claiming "Hours match Kunal plan" without fetching Matrix, no capacity data, no over-estimate tracking. This is what originally made all 5 parts MANDATORY. Parts 4/5 (capacity/over-estimate) stayed mandatory until 2026-07-13, when the underlying Google Sheet source was confirmed gone with no replacement — dropping those parts is a data-availability fact, not a relaxation of rigor on the parts that remain.

**How to apply:**
- Daily report Section 5: Friday hours + all 3 Fountain sub-sections
- Critical Alerts: only mark Fountain OK if ALL 3 parts checked and clean
- Never claim "matches plan" without showing actual numbers from Matrix
- If Matrix token expired, flag as blocker for Part 1 — Parts 2/3 still proceed via Workstream/Sheets independently
