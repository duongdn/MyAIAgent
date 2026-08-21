---
name: feedback_khanhhh_aysar_consolidated
description: "Aysar/Baamboozle hours (and Upwork hours) belong to KhanhHH, NOT LeNH (LeNH is sub-contract billing only); KhanhHH's Workstream project list keeps expanding — scan ALL live projects before flagging shortfall"
metadata:
  node_type: memory
  type: feedback
  originSessionId: 754a9366-d1fc-446c-b7d4-a6661c260ab2
---

## Project owner = KhanhHH, NOT LeNH

The Baamboozle/Aysar work is KhanhHH's — LeNH does NOT log hours there. Never attribute Aysar/Baamboozle totals to LeNH.

**Why:** LeNH is the billing contractor for Aysar (sub-contract billing), but KhanhHH is the actual developer doing the work and logging hours. Same pattern in Upwork: KhanhHH's Aysar/Baamboozle hours appear under LeNH's Upwork tracker (sub-contract billing) — never interpret "LeNH on Aysar Xh in Upwork" as LeNH logging hours.

**How to apply:**
- LeNH's Upwork = Rory/Franc/Rebecca only; Aysar Upwork hours = KhanhHH's work, billed through LeNH.

**Incident 2026-06-08:** report showed `LeNH (Aysar) W27 15.67h`, `LeNH COMBINED: 89.17h`. Correct: `KhanhHH COMBINED: 80h (Generator) + 15.67h (Aysar) = 95.67h`, `LeNH COMBINED: 73.5h (Rory+Franc)`. User: "LeNH ko có làm aysar, kiểm tra kỹ lại".

## 🔴 KhanhHH's Workstream project list keeps expanding

A new project has surfaced every 1-2 months, each time causing a false "0h"/shortfall alert:
- 2026-05-06: Baamboozle discovered (was only checking Generator)
- 2026-06-19: Colin/ETZ discovered (3rd source)
- 2026-06-22: Elena project discovered (4th source)

**Why:** User each time: "He working on [project], why I keep asking you check all task log!!!"

**Rule:** NEVER assume KhanhHH's project list is complete. Scan ALL live Workstream projects (see [[reference_workstream]]) before reporting any shortfall for this dev. If a shortfall still appears after scanning everything, only then flag it — and note it may be a new unknown source.

Related: [[feedback_lenh_consolidated]]
