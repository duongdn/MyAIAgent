---
name: Bailey invoice uses WBS estimates with buffer, not actuals
description: Fixed-cost Bailey tasks billed at WBS estimated hours (with buffer), not actual hours from task log
type: feedback
---

Bailey fixed-cost invoices use **WBS estimated hours with buffer** from the billing spreadsheet (`1rp0URMjhaOnEe3T_M0o6JbC2av1hno_rdkLIEdWeP4U`), NOT actual hours from "Est vs Charged" task log (`1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg`).

**Why:** Invoice verification initially compared against task log actuals (72.9h) instead of WBS estimates (95.7h), producing a false mismatch. The billing model for fixed-cost tasks is: Raw estimate + 10% buffer = billable hours.

**How to apply:**
- When verifying Bailey invoices, fetch from `Main Tasks - Payment` / `Miscellaneous Tasks - Payment` sheets in the billing spreadsheet
- For Photo Capture-type tasks, also check the individual WBS sheet (e.g., `WBS - Mandatory Photo Capture`) for Console/Mobile/Prestashop breakdown with buffer
- Task log "Charged" column = actual hours worked, NOT what gets invoiced
- Rate: $30/h
