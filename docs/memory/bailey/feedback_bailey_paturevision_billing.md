---
name: feedback-bailey-paturevision-billing
description: "Bailey DEV1(VietPH)+DEV3(DuongDN) hours live in Paturevision spreadsheet (not Marcel); fixed-cost invoices bill WBS estimate+buffer, not task-log actuals"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 9ba04ead-670b-45ea-b6a0-575e6d6d55b2
---

**Sheet mapping:** Bailey DEV1 (VietPH) and Bailey DEV3 (DuongDN) Upwork hours are logged in the **Paturevision** spreadsheet (`1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg`), NOT the Marcel spreadsheet. Marcel sheet is only for Marcel/Equanimity adhoc work — DuongDN has both, don't cross-compare.

**Invoice billing:** Bailey fixed-cost invoices bill **WBS estimated hours + 10% buffer** from the billing spreadsheet (`1rp0URMjhaOnEe3T_M0o6JbC2av1hno_rdkLIEdWeP4U`), NOT actual hours from the "Est vs Charged" task log. Comparing invoice against task-log actuals produces a false mismatch (e.g. 72.9h actual vs 95.7h billed is correct, not a discrepancy).

**How to apply:**
- Bailey DEV1/DEV3 Upwork hours → Paturevision spreadsheet, never Marcel
- Invoice verification → fetch `Main Tasks - Payment` / `Miscellaneous Tasks - Payment` sheets; for Photo Capture tasks also check individual WBS sheet (Console/Mobile/Prestashop breakdown)
- Task log "Charged" column = actual hours worked, NOT what gets invoiced. Rate: $30/h.
