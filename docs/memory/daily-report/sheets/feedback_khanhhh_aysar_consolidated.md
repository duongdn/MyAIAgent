---
name: feedback_khanhhh_aysar_consolidated
description: "Aysar/Baamboozle task log + Upwork hours belong to KhanhHH, NOT LeNH (LeNH is sub-contract billing only); KhanhHH's task-log sources keep expanding — scan ALL sheets+Workstream before flagging shortfall"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 754a9366-d1fc-446c-b7d4-a6661c260ab2
---

## Sheet owner = KhanhHH, NOT LeNH

The Baamboozle/Aysar task log sheet (`1DCsXm5SJdIep4qjr_J_tUJPasHxPEc-tzN2q2SGsOq8`) has KhanhHH as owner (col G) for all task rows. LeNH does NOT log hours in this sheet. Never attribute Aysar sheet weekly totals to LeNH.

**Why:** LeNH is the billing contractor for Aysar (sub-contract billing), but KhanhHH is the actual developer doing the work and logging hours. The sheet total is KhanhHH's time, not LeNH's. Same pattern in Upwork: KhanhHH's Aysar/Baamboozle hours appear under LeNH's Upwork tracker (sub-contract billing) — never interpret "LeNH on Aysar Xh in Upwork" as LeNH logging hours.

**How to apply:**
- When reading the Aysar sheet (part of scanning ALL 11 sheets), filter `owner == "KhanhHH"` to count toward KhanhHH's total
- Never use the Aysar sheet Summary tab total as "LeNH hours"
- LeNH's Upwork = Rory/Franc/Rebecca only; Aysar Upwork hours = KhanhHH's work, billed through LeNH
- Verify in Google Sheets / Workstream: col G rows for KhanhHH confirm actual work

**Incident 2026-06-08:** report showed `LeNH (Aysar) W27 15.67h`, `LeNH COMBINED: 89.17h`. Correct: `KhanhHH COMBINED: 80h (Generator) + 15.67h (Aysar) = 95.67h`, `LeNH COMBINED: 73.5h (Rory+Franc)`. User: "LeNH ko có làm aysar, kiểm tra kỹ lại".

## 🔴 KhanhHH's source list keeps expanding

A new task-log source has surfaced every 1-2 months, each time causing a false "0h"/shortfall alert:
- 2026-05-06: Baamboozle Workstream discovered (was only checking Generator sheet)
- 2026-06-19: Colin/ETZ Workstream discovered (3rd source)
- 2026-06-22: Elena Google Sheet discovered (4th source)

**Why:** User each time: "He working on [project], why I keep asking you check all task log!!!"

**Rule:** NEVER assume KhanhHH's source list is complete. Scan ALL 11 Google Sheets + ALL Workstream projects (see [[reference_workstream]]) before reporting any shortfall for this dev. If a shortfall still appears after scanning everything, only then flag it — and note it may be a new unknown source.

Related: [[feedback_dev_project_mapping_flexible]], [[feedback_lenh_consolidated]]

