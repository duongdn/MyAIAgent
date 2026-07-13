---
name: fountain-kunal-daily-report-mandatory-5-part-checklist
description: "Fountain section MUST have all 5 parts: Matrix plan, task log actuals, plan vs actual table, capacity/runway, over-estimate tracking. NEVER skip any."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 754a9366-d1fc-446c-b7d4-a6661c260ab2
---

Fountain/Kunal report is **FIVE parts**, ALL required. Missing any = report is WRONG.

## 1. Matrix weekly plan
Fetch latest message from Fountain room (`!EWnVDAxbTGsBxPkaaI:nustechnology.com`) matching "Em update plan tuần này" format. Extract per-dev planned hours (ViTHT, ThinhT, VuTQ, HaVS) and QC total. Cite source (@sender + timestamp).

## 2. Task log weekly actuals
**Workstream is now the primary/authoritative source** (project `fountain` / "Fountain Greetings", id `cmpqcjojh00q2tk1v2qi7gs0j` — see [[reference_workstream]]). User confirmed 2026-07-13: "Fountain chuyển qua Workstream rồi, ưu tiên Workstream" (Fountain moved to Workstream, prioritize it). Query `/review/week?projectId=cmpqcjojh00q2tk1v2qi7gs0j&date=...` for per-developer weekly totals: VuTQ, ThinhT, ViTHT (dev); PhatDLT, HungPN (QC); HaVS. Fall back to the Fountain spreadsheet (`1iIKfjAh857qzrR2xkUWPcN_9bFAwB1pL8aJWTRk4f4o`) Summary tab only if Workstream data for this project looks empty/suspicious — see [[feedback_check_workstream_before_flagging_shortfall]] for the retry/cross-check discipline (applies here too, this project has no known exemption).

## 3. Plan vs Actual table
Compare each developer's plan vs actual. Flag mismatch.

## 4. Capacity & Runway
From "Est vs Charged" tab (same spreadsheet):
- Col I (index 8) = Estimated Dev Raw
- Col K (index 10) = Actual hours
- Exclude "Deployed on Live" and "Cancelled" statuses
- Calculate: remaining est, runway at current dev capacity (h/wk from plan)
- Compare with previous report's numbers (remaining, runway) and show delta

## 5. Over-estimate tracking
From "Est vs Charged" tab, find tasks where actual > est by >20%. Show top offenders table with: task#, est, actual, over%, status. **Compare each task's actual with previous report** — flag if STILL GROWING vs stable.

Key tasks to always track: #2595 (GiftDrop, 120h est), #2615 (Gift of Choice, 12h est).

---

**Why:** User found report was fabricated — claiming "Hours match Kunal plan" without fetching Matrix, no capacity data, no over-estimate tracking. User said "What the fuck... still not enough... check all OLD reports." Previous report (Mar 20) had full capacity report with all 5 parts. This is MANDATORY, NON-NEGOTIABLE.

**How to apply:**
- Daily report Section 5: Friday hours + all 5 Fountain sub-sections
- Critical Alerts: only mark Fountain OK if ALL 5 parts checked and clean
- Never claim "matches plan" without showing actual numbers from Matrix
- Always compare with previous report's capacity/over-estimate numbers
- If Matrix token expired, flag as blocker — do NOT skip capacity/over-estimate (those come from Google Sheets, not Matrix)
