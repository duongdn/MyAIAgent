---
name: feedback_upwork_task_id_filter_consolidated
description: "Upwork tracker hours must be compared to task-log rows filtered by Task ID (not by developer name alone), summed across ALL owners sharing that tracker, including BOTH 'Task dự án' + 'Part-time' rows. Merged from 4 near-duplicate files 2026-07-13. ⚠️ Contains VietPH-specific tracker assignment (Bailey DEV1) — VietPH resigned 2026-06-30, unclear if this workroom is still active/reassigned, needs user confirmation before treating as current."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 754a9366-d1fc-446c-b7d4-a6661c260ab2
---

**The mechanism (durable, applies to any dev/workroom):**
1. Filter task-log rows by **Task ID (usually col E)** matching the Upwork contract — never sum a developer's whole sheet total against a single workroom.
2. Sum hours across **ALL Owners** who share that tracker, not just the one nominal Upwork-billed developer — a single Upwork workroom can be used by multiple people (sub-contract billing pattern).
3. Include **BOTH "Task dự án" (official) and "Part-time" rows** in col A when summing — Upwork tracks total actual time, not just official hours.
4. Match should be near-exact (within ~1h tolerance).

**Formula:** `tracker_hours ≈ sum(sheet rows WHERE task_id ∈ contract_task_ids AND owner ∈ all_assigned_users AND col_a ∈ {'Task dự án','Part-time'})`

**Confirmed examples (2026-05-11):**
- **Rory tracker (41069448):** Upwork 16.67h vs task log LeNH-only on Rory = 16.67h → exact match. A previous "-15h gap" came from wrongly also summing KhoaTD's 15h on a DIFFERENT contract (not on this tracker).
- **Aysar tracker (35642393):** Upwork 23.83h vs KhanhHH 20h + LeNH 3.83h = 23.83h exact match — both share the tracker (KhanhHH does the work as sub-contract under LeNH, see [[feedback_khanhhh_aysar_consolidated]]).
- **Bailey-VietPH (workroom 35642393 / DEV1, Paturevision sheet):** Task ID `[Maintenance] Update PHP version on Prestashop`, col E filter. VietPH 21.25h vs Upwork 21.5h → near-exact. A previous "-18.5h gap" was from summing unrelated Console/Prestashop tasks not on this contract.

**Anti-patterns to avoid:**
- Summing all rows for one developer regardless of Task ID (caused the Bailey false alarm above).
- Comparing tracker only to one nominal developer when others share it (Aysar would look -20h short if only LeNH counted).
- Treating a different contractor's row in the same sheet as "untracked tracker time" — could be an entirely different contract.

**Paturevision sheet column layout (as of 2026-05-11, W26 tab):** A=Item/Type, C=Description, D=Reference(Ticket URL), **E=Task ID** (critical filter col), F=Status, G=Owner, H=Actual hours, I=Self-rated, J=Charged, K=Notes.

---

## ⚠️ Needs user confirmation — VietPH-specific assignment now stale?

The examples above name **VietPH** as the active dev on Bailey Upwork workroom DEV1 (contract `[Maintenance] Update PHP version on Prestashop`, sheet `1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg`). VietPH resigned 2026-06-30 (see [[project_php_team]]) — per [[project_php_team]], TuanNT now covers Bailey work generally, but it's not confirmed whether this SPECIFIC Upwork workroom/contract is: (a) still active and reassigned to someone else, (b) closed/inactive since VietPH left, or (c) still literally billing under VietPH's name for some transitional reason. Don't assume either way — ask before writing a report line that names VietPH as currently active on this workroom.

Bailey-DuongDN (DEV3, same Task ID filter) was separately noted as INACTIVE/0h-expected — that part is unrelated to VietPH and still likely current.
