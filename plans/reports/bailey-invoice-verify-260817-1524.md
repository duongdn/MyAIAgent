## Bailey Invoice Verification

**Invoice total:** $412.50 | **Rate:** $30/h (confirmed all 3 lines)
**Sources:** WBS Billing (Main/Misc/Maintenance Tasks - Payment) + GGS Slack + Est vs Charged

### Line Item Verification

| # | Task | Billing | Inv Hrs | WBS Hrs | Slack Quote | Actual (task log) | Hrs OK? | Inv $ | Match? |
|---|------|---------|---------|---------|------------|--------|---------|-------|--------|
| 1 | [PrestaShop] [Maintenance] Quote Overwritten Issue | Hourly | 1.5h | not found (new, unrecorded) | n/a (hourly) | 1.50h | YES | $45.00 | YES |
| 2 | [Console] [Maintenance] Validation Failed on PO | Hourly | 5.75h | not found (new, unrecorded) | n/a (hourly) | 5.75h | YES | $172.50 | YES |
| 3 | [PrestaShop] Frozen Cart on Order with Invoice | Fixed-cost | 6.5h | not found (new, unrecorded) | **6.5h** (Amy quoted, Joey approved) | 2.00h (bundled scope) | YES (Slack governs) | $195.00 | YES |

### Summary
- Invoice valid: **YES**
- Rate check: $45/1.5=$30, $172.50/5.75=$30, $195/6.5=$30 — all correct
- Sum check: 45+172.50+195=412.50 — matches invoice total
- Discrepancies:
  - None of the 3 tasks yet appear in WBS Billing payment sheets — expected, this is a brand-new pending invoice not yet processed there.
  - Item 3 ("Frozen Cart on Order with Invoice"): fixed-cost billed at the Slack-quoted 6.5h (Amy: "total effort for this update is 6.5 hours", Joey: "Yes please" — GGS #change-requests thread). That 6.5h Slack quote bundles TWO deliverables (frozen-cart-on-invoiced-order fix + restricting the "Add Reduction" feature), discussed together in the same thread. Internal task log ("Est vs Charged") only logged 2.00h Actual against the line named "Frozen Cart on Order with Invoice" specifically — no separate line exists for the reduction-restriction part. Per billing model, Slack-approved quote governs fixed-cost hours (not internal Actual/buffer), so 6.5h is correctly billable — flagging only because the line name doesn't disclose the bundled scope.
- Payment status: unpaid — confirmed via Est vs Charged sheet (payment marker column blank for all 3 rows, no "PAID" tag), consistent with a new pending invoice.

### Internal Cross-Reference (not blocking)

| Task | WBS Billed | Est w/Buffer | Actual | Charged | Dev | Status |
|------|-----------|--------------|--------|---------|-----|--------|
| Quote Overwritten Issue | n/a | n/a (Hourly) | 1.50 | 1.50 | VietPH | Tested on Live |
| Validation Failed on PO | n/a | n/a (Hourly) | 5.75 | 5.75 | TuanNT | Tested on Live |
| Frozen Cart on Order with Invoice | n/a | 4.96 | 2.00 | 2.00 | VietPH | Tested on Live |

### Slack Sources
- Quote Overwritten Issue: `#maintenance` https://globalgrazingservices.slack.com/archives/C0338NXK3SB/p1781710191622049 (bug report + fix, no separate hour quote needed — hourly task)
- Validation Failed on PO: `#maintenance` https://globalgrazingservices.slack.com/archives/C0338NXK3SB/p1783523351072239 (bug report + fix, hourly task)
- Frozen Cart on Order with Invoice: `#change-requests` https://globalgrazingservices.slack.com/archives/C07EX4GA3C4/p1781791587789179?thread_ts=1781791587.789179 — Amy quote "total effort ... 6.5 hours", Joey approval "Yes please" (msgs 1782114450 / 1782115133)

## Unresolved questions
- Item 3's 6.5h Slack quote bundles the "Add Reduction" restriction work with the frozen-cart fix, but only one WBS/task-log line exists — confirm with requester whether this is intentional bundling (no separate line-item risk) or if the reduction-restriction scope should be split out going forward.
- None of the 3 items are yet in WBS Billing payment sheets — recommend adding them there once payment is processed, per normal workflow.
