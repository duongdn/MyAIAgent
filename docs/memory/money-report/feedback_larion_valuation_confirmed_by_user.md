---
name: feedback_larion_valuation_confirmed_by_user
description: Larion cổ phần wallet is normally inactive; user briefly toggles it active to bump the manual value then deactivates again — swings to 0/inactive are NOT a real net-worth loss
metadata: 
  node_type: memory
  type: feedback
  originSessionId: fca793ff-4b7e-4e36-928e-4de9e68dd255
  modified: 2026-08-28T02:05:43.055Z
---

The Larion cổ phần wallet is inactive by default/design. On 2026-08-25 user briefly reactivated it, bumped the manual value 600M → 800M (confirmed 2026-08-26 as the real sale price at that moment), then deactivated it again. On 2026-08-28 user reopened it again, bumped it to ~1,000,000,000 (800M + 200M), then re-deactivated — causing the wallet to show 0/inactive in the API and making Net Worth appear to drop ~1.43B (−17.8%) when it's not a real loss.

**Why:** First read of this pattern (2026-08-28) wrongly reported a critical anomaly / net-worth-loss alert. User corrected: "sai nha, nó inactive trước giờ mà, tôi chỉ mở lại để tăng lên 200 tr rồi inactive lại" — the wallet toggling inactive after a manual bump is the user's normal workflow, not data loss.

**How to apply:** In `/money-report`, when Larion cổ phần wallet shows `currentAmount: 0` and `inActive: true`, do NOT treat it as a net-worth drop or flag a critical anomaly — this is expected. Instead: (1) check the wallet's last known active value from the previous snapshot/report, (2) still count that last known value in Net Worth/portfolio breakdown reasoning if reporting on real economic position, but do NOT alarm the user about a "missing" 800M-1B — note only that the wallet is in its normal-inactive state and its last recorded value was X. Only escalate if the user explicitly says money went missing.
