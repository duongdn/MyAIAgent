---
name: Upwork tracker can be shared — sum ALL Owners on contract Task ID
description: A single Upwork tracker (e.g. Aysar 35642393) is often used by multiple developers. When comparing tracker hours vs task log, sum hours across ALL Owners (col G) where Task ID matches the contract — not just one nominal developer.
type: feedback
---

A single Upwork workroom/tracker can be used by multiple developers. When comparing Upwork tracker hours vs task log:
1. Filter task-log rows by **Task ID (col E)** matching the contract.
2. Sum hours across **ALL Owners (col G)**, not just the one nominal Upwork-billed developer.
3. Match should be near-exact (within 1h tolerance).

**Why:** User corrected on 2026-05-11 after the daily report flagged Rory tracker -15h gap and Bailey-VietPH -18.5h gap. After re-running with proper filter:
- **Rory tracker (41069448)** Upwork 16.67h vs task log: LeNH-only on Rory = 16.67h → **exact match**. The previous "-15h gap" came from also summing KhoaTD's 15h on a different contract (KhoaTD is not on the Rory Upwork tracker).
- **Aysar tracker (35642393)** Upwork 23.83h vs task log: KhanhHH 20h + LeNH 3.83h on Aysar = **23.83h exact match**. Both share the tracker (KhanhHH does the work as sub-contract under LeNH per `feedback_khanhhh_aysar_second_project`).
- **Bailey-VietPH** Upwork 21.5h vs task log filtered by `[Maintenance] Update PHP version on Prestashop`: VietPH 21.25h → **near-exact** (-0.25h within tolerance).

**How to apply:**
1. **Aysar tracker (35642393):** sum Aysar sheet rows where Owner ∈ {LeNH, KhanhHH} (and any future shared user) on the Aysar contract.
2. **Rory tracker (41069448):** sum Rory sheet rows where Owner = LeNH only currently. KhoaTD's hours on the Rory sheet are on a separate contract (no Upwork tracker monitored for KhoaTD).
3. **Bailey-VietPH (DEV1):** sum Paturevision rows where Owner = VietPH AND Task ID col E = `[Maintenance] Update PHP version on Prestashop`.
4. **Bailey-DuongDN (DEV3, INACTIVE):** same Task ID filter, Owner = DuongDN. 0h Upwork expected.
5. Pair with `feedback_upwork_tasklog_by_taskid` (the principle) and `feedback_upwork_filter_by_task_id_strict` (Paturevision col E specifics).
6. Generic formula: `tracker_hours ≈ sum(sheet rows WHERE task_id ∈ contract_task_ids AND owner ∈ all_assigned_users AND col_a ∈ {'Task dự án','Part-time'})` — within 1h tolerance OK.

**Anti-patterns to avoid:**
- Summing all rows for one developer regardless of Task ID (Bailey false alarm).
- Comparing tracker only to one nominal developer when others share it (Aysar would have looked -20h if only LeNH counted).
- Treating any non-zero KhoaTD/other-contractor row in the same sheet as "untracked tracker time" — different contract entirely.
