---
name: upwork-comparison-must-filter-by-task-id-column-e-never-sum-all-owner-rows
description: "When comparing Upwork hours vs Paturevision (Bailey) task log, MUST filter rows by Task ID column E matching the Upwork contract. Summing all VietPH/DuongDN rows without Task ID filter produces false discrepancies."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 754a9366-d1fc-446c-b7d4-a6661c260ab2
---

When comparing Bailey Upwork workrooms (DEV1 VietPH, DEV3 DuongDN) against the Paturevision task log (sheet `1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg`), you MUST filter rows by Task ID column E matching the Upwork contract task.

**Paturevision sheet column layout (as of 2026-05-11, W26 tab):**
- A = Item / Type ("Task dự án" / "Part-time" / day-marker)
- C = Description
- D = Reference (Ticket URL)
- **E = Task ID** ← critical filter column
- F = Status
- G = Owner
- H = Actual hours
- I = Self-rated
- J = Charged
- K = Notes

**Bailey contract Task ID = `[Maintenance] Update PHP version on Prestashop`** (applies to both DEV1 and DEV3).

**Why:** User corrected on 2026-05-11. The 2026-05-11 daily report flagged Bailey-VietPH "Upwork 21.5h vs task log 40h = -18.5h gap" and skipped the Trello item. After re-aggregating with Task ID filter: VietPH on `[Maintenance] Update PHP version on Prestashop` = **21.25h** vs Upwork 21.50h = **-0.25h** (within 1h tolerance, OK). The 18.5h "gap" was 4 unrelated tasks (`[Console] Update on transport scanning` 4h, `[Console] Automatic daily special barcode regeneration` 4h, `[Console] [CR2] Picking & Stock Location Enhancements` 4h, `[Console] [Maintenance] Transport fail to update on customer order dasboard` 3.75h, `[Prestashop] Add Q&A` 1.5h, `[Prestashop] Mobile Menu Modal` 1.5h) — those are NOT on the Bailey Upwork contract.

**How to apply:**
1. **Bailey-VietPH (workroom 35642393 / DEV1):** sum ONLY rows where col E = `[Maintenance] Update PHP version on Prestashop` AND col G = `VietPH`. Compare to VietPH Upwork weekly hours.
2. **Bailey-DuongDN (workroom for DEV3, INACTIVE):** same Task ID filter, owner DuongDN. Memory says inactive → 0h expected.
3. Pair with `feedback_upwork_tasklog_by_taskid` (which already documents the rule but was not applied).
4. Pair with `feedback_upwork_vs_tasklog_all_hours` — that rule says sum BOTH "Task dự án" + "Part-time" rows; combined with Task ID filter the formula is: `sum hours WHERE owner=X AND task_id=Y AND (col_a='Task dự án' OR col_a='Part-time')`. Both rules apply together.
5. **Same logic for any future Upwork workroom**: each workroom maps to ONE specific Task ID; never compare against the developer's full sheet total.
6. The non-Bailey VietPH hours (Console / Prestashop modules above) are billed differently (likely fixed-cost WBS — see `feedback_bailey_paturevision_billing` — or other contracts), not via Upwork tracker.
