# Bailey Invoice Verification — May 7, 2026

**Invoice received:** 2026-05-07 17:15
**Invoice total:** $1,687.50 | **Rate:** $30/h
**All items billed as HOURLY tasks**

## Invoice Line Items

| # | Task | Hours | Amount |
|---|------|-------|--------|
| 1 | [Prestashop] Add Q&A Feature to Product | 40.75 | $1,222.50 |
| 2 | [Console] [Maintenance] Duplicate product records on Console | 7.00 | $210.00 |
| 3 | [Maintenance] [Console] Duplicate products on customer orders — April 2026 | 4.50 | $135.00 |
| 4 | Weekly Monitor — April 2026 | 4.00 | $120.00 |
| | **Total** | **56.25** | **$1,687.50** |

Math check: 1222.50 + 210 + 135 + 120 = $1,687.50 ✓
Rate check: all line items = $30/h ✓

## Line Item Comparison

| # | Task | Inv Hrs | Inv $ | WBS Billing | Task Log Actual | Task Log Charged | Status | Match? |
|---|------|---------|-------|-------------|-----------------|------------------|--------|--------|
| 1 | [Prestashop] Add Q&A Feature to Product | 40.75 | $1,222.50 | 20.5h / $615 (stale) | 40.75 | 40.75 | Deployed on Live | ⚠️ WBS outdated; invoice OK |
| 2 | [Console] [Maintenance] Duplicate product records on Console | 7.00 | $210.00 | NOT IN WBS | 7.00 | 7.00 | Deployed on Live | ⚠️ Not in WBS; invoice OK |
| 3 | [Maintenance] [Console] Duplicate products on customer orders — April 2026 | 4.50 | $135.00 | NOT IN WBS | 4.50 | **2.75** | Deployed on Live | ❌ Charged log = 2.75h, NOT 4.50h |
| 4 | Weekly Monitor — April 2026 | 4.00 | $120.00 | NOT IN WBS (hourly) | 4.00 | 4.00 | (active month) | ✅ Match |

## Detailed Findings

### 1. [Prestashop] Add Q&A Feature to Product — 40.75h — $1,222.50
- **Task log (Est vs Charged row 81):** Actual=40.75, Charged=40.75, Status="Deployed on Live", Type="Hourly", Dev=LeNH, Payment=blank
- **WBS Miscellaneous Tasks - Payment row 63:** Task 60, hours=20.5, cost=$615.00, no Payment Status, no Paid Date
- **Discrepancy:** WBS Miscellaneous Tasks - Payment row 63 shows the OLD estimate (20.5h / $615) — never updated to reflect final hourly charged amount of 40.75h
- **Verdict:** Invoice amount is **CORRECT** for an hourly task at 40.75h × $30 = $1,222.50. WBS spreadsheet needs updating to 40.75h / $1,222.50

### 2. [Console] [Maintenance] Duplicate product records on Console — 7h — $210
- **Task log (Est vs Charged row 117):** Actual=7.00, Charged=7.00, Status="Deployed on Live", Type="Hourly", Dev=HaVS, Payment=blank
- **WBS Miscellaneous Tasks - Payment:** **NO ENTRY** for this task
- **Verdict:** Invoice amount is **CORRECT** at 7h × $30 = $210. WBS Miscellaneous Tasks needs a new row for this task.

### 3. [Maintenance] [Console] Duplicate products on customer orders — April 2026 — 4.5h — $135
- **Task log (Est vs Charged row 118):** Actual=4.50, **Charged=2.75**, Status="Deployed on Live", Type="Hourly", Dev=HaVS, Payment=blank
- **WBS Miscellaneous Tasks - Payment:** **NO ENTRY** for this task
- **⚠️ POTENTIAL OVERCHARGE:** Invoice bills 4.5h but task log "Charged" column shows only **2.75h**
  - If Charged column is correct: invoice should be 2.75h × $30 = **$82.50** (overbilled by $52.50)
  - If invoice is correct: Charged column needs to be updated from 2.75h → 4.5h (matching Actual)
- **Action required:** Verify with HaVS / dev lead which is the correct billable amount

### 4. Weekly Monitor — April 2026 — 4h — $120
- **Task log (Est vs Charged row 44):** "Weekly Monitor Apr 2026", Actual=4.00, Charged=4.00, Type="Hourly", Payment=blank
- **WBS Miscellaneous Tasks - Payment:** Not in payment sheet (Weekly Monitor entries are not tracked there historically)
- **Verdict:** Invoice amount is **CORRECT** at 4h × $30 = $120

## Summary

- **Total math:** $1,687.50 invoice = sum of line items ✓
- **Rate consistency:** $30/h across all items ✓
- **Items 1, 2, 4:** Hours and amounts MATCH task log Actual/Charged columns
- **Item 3:** ❌ **Discrepancy** — invoice bills 4.50h, task log Charged column shows 2.75h. **Potential overcharge of $52.50** (1.75h difference) — needs reconciliation before approving payment

## Recommended Actions

1. **Block payment of Item #3** until "Charged" column on Est vs Charged row 118 is reconciled with invoiced 4.5h. Either:
   - Update Charged column from 2.75 → 4.5 (if dev confirms 4.5h is billable), OR
   - Reduce invoice amount from $135 → $82.50 (if 2.75h is correct billable amount)
2. **Update WBS Miscellaneous Tasks - Payment row 63** (Q&A Feature): change 20.5h / $615 → 40.75h / $1,222.50
3. **Add new rows to WBS Miscellaneous Tasks - Payment** for:
   - [Console] [Maintenance] Duplicate product records on Console — 7h / $210
   - [Maintenance] [Console] Duplicate products on customer orders - April 2026 — (pending Item #3 reconciliation)
4. **Approval recommendation if Item #3 verified at 4.5h:** APPROVE full $1,687.50
5. **Approval recommendation if Item #3 should be 2.75h:** APPROVE adjusted total of $1,635.00

## Cross-Reference Data (for internal awareness)

| Task | WBS Estimate | Actual | Charged | Invoiced |
|------|--------------|--------|---------|----------|
| Q&A Feature | 20.5h (stale) | 40.75 | 40.75 | 40.75 |
| Duplicate product records | — | 7.00 | 7.00 | 7.00 |
| Duplicate products on orders | — | 4.50 | 2.75 | 4.50 |
| Weekly Monitor Apr 2026 | — | 4.00 | 4.00 | 4.00 |

## Unresolved Questions

1. Is the "Charged" value of 2.75h on row 118 correct, or should it be 4.5h matching Actual? Who decides what's billable when Actual ≠ Charged?
2. Should hourly tasks (Q&A, Duplicate records, Duplicate orders) be added to WBS Miscellaneous Tasks - Payment retroactively, or is the WBS billing sheet only for fixed-cost tasks?
