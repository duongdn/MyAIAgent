---
name: feedback_aysar_sheet_owner_is_khanhhh
description: Aysar/Baamboozle task log hours belong to KhanhHH (owner col G), NOT LeNH — never attribute Aysar sheet totals to LeNH
metadata:
  node_type: memory
  type: feedback
  originSessionId: current
---

# Aysar Sheet Owner = KhanhHH, NOT LeNH

## Rule

**The Baamboozle/Aysar task log sheet (1DCsXm5SJdIep4qjr_J_tUJPasHxPEc-tzN2q2SGsOq8) has KhanhHH as owner (col G) for all task rows.** LeNH does NOT log hours in this sheet. Never attribute Aysar sheet weekly totals to LeNH.

**Why:** LeNH is the billing contractor for Aysar (sub-contract billing), but KhanhHH is the actual developer doing the work and logging hours. The sheet total is KhanhHH's time, not LeNH's.

**How to apply:**
- When reading the Aysar sheet (as part of scanning ALL 11 sheets), filter `owner == "KhanhHH"` to count it toward KhanhHH's total
- Never use the Aysar sheet Summary tab total as "LeNH hours"
- LeNH's Upwork shows Aysar billing — this is sub-contract billing, not LeNH task hours

## Incident 2026-06-08

Daily report generated at 05:00 showed:
```
LeNH (Aysar) | Aysar | W27 | 15.67h
LeNH COMBINED: 89.17h
```
Correct values verified at 08:44:
```
KhanhHH | Aysar | W27 | 15.67h  (owner=KhanhHH confirmed)
KhanhHH COMBINED: 80h (Generator) + 15.67h (Aysar) = 95.67h
LeNH COMBINED: 72.34h (Rory) + 1.16h (Franc) = 73.5h
```
User correction: "LeNH ko có làm aysar, kiểm tra kỹ lại"

Related: [[feedback_khanhhh_aysar_second_project]], [[feedback_lenh_rebecca_sheet]], [[feedback_dev_project_mapping_flexible]]
