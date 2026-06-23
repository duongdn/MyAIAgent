---
name: Fountain Est vs Charged — CR column adds to estimate
description: Fountain "Est vs Charged" tab has Col J = "CR" (Change Request hours). Total estimate = Col I (Estimated Dev Raw) + Col J (CR). Capacity AND over-estimate calculations MUST include CR.
type: feedback
---

The Fountain "Est vs Charged" tab columns:
- Col I (idx 8) = `Estimated Dev Raw`
- **Col J (idx 9) = `CR`** (Change Request — additional approved estimate)
- Col K (idx 10) = `Actual`
- Col L (idx 11) = `Charged`

**Total estimate per task = Col I + Col J.** Always include CR when computing capacity remaining or over-estimate ratios.

**Why:** User corrected on 2026-05-07 — Kunal added CR to formally extend a task's estimate after scope changes. The Fountain agent reported #2735 as "still growing" using only Col I, but with CR 30h added the task is +6% (within margin), not +42%. Multiple tasks were misreported as over-estimate when CR brought them in-line.

**As of 2026-05-07, tasks with CR > 0:**
- #2735: est 90h + CR 30h = 120h total
- #2815: est 6h + CR 3h = 9h total
- #2837: est 16h + CR 10.5h = 26.5h total
- (Total CR across all tasks: 43.5h)

**How to apply:**
1. **Capacity calculation (Part 4):** Per task, `total_est = Col I + Col J`. `remaining = total_est - actual` (signed sum). NS+IP only excludes statuses: Deployed on Live, Cancelled, Has Bug on Live, Tested on Live. NS+IP variants include "Not Started", "In-progress (>50%)", "In-progress (<50%)", and any "In-progress" suffix. Broader bucket adds: Pending, On Hold, Dev Done, Deployed on Staging, empty, N/A.
2. **Over-estimate (Part 5):** Flag tasks where `actual > (Col I + Col J) * 1.2`. Don't flag a task as over-estimate just because Actual > Col I.
3. **Trend tracking:** When a task previously flagged as "still growing" gets a CR added, note the CR addition explicitly — it's a legitimate scope expansion, not just hours bleeding.
4. **Status values present (2026-05-07):** Deployed on Live (20), Deployed on Staging (17), Not Started (13), Dev Done (10), empty (9), In-progress (>50%) (7), In-progress (<50%) (6), On Hold (2), Pending (1), Tested on Live (1), Has Bug on Live (1), N/A (1).
5. **Runway:** Use 48h/wk (current dev capacity per Matrix plan); show separately for NS+IP and Broader.
