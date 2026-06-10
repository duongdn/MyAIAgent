# Bailey Invoice Verification — 2026-06-10

**Invoice total:** $1,950.00 | **Rate:** $30/h | **Date verified:** 2026-06-10

---

## Line Item Comparison

| # | Task | WBS Source | WBS Task | Billing | Est Raw | Actual | Inv Hrs | Inv $ | WBS $ | WBS Status | Match? |
|---|------|-----------|---------|---------|---------|--------|---------|-------|-------|-----------|--------|
| 1 | Weekly Monitor May 2026 | Maintenance Tasks | Task 160 | Hourly | — | 5.00h | 5.0h | $150 | $150 | Unpaid | ✅ |
| 2 | [Prestashop] Mobile Menu Modal | Misc Tasks | Task 67 | Fixed | 7.00h | 14.90h | 13.5h | $405 | $405 | Unpaid | ✅ |
| 3 | [Maintenance] Update GLS on Console | Maintenance Tasks | Task 173 | Hourly | — | 10.00h | 10.0h | $300 | $300 | Unpaid | ✅ |
| 4 | [Prestashop] [GS] Herd Custom Date Selection | Misc Tasks | Task 68 | Fixed | 3.00h | 2.50h | 5.0h | $150 | $150 | Unpaid | ✅ |
| 5 | [Prestashop] [GS] Setup Map: Unassigned Paddock Deletion Modal | Misc Tasks | Task 69 | Fixed | 5.00h | 4.00h | 8.0h | $240 | $240 | Unpaid | ✅ |
| 6 | [Console][Mobile] Update on Transport Scanning | Misc Tasks | Task 70 | Fixed | 15.00h | 20.50h | 23.5h | $705 | $705 | Unpaid | ✅ |
| | **TOTAL** | | | | | | **65.0h** | **$1,950** | **$1,950** | | **✅** |

> Task 6 Est Raw = Console 4h + Mobile 11h. Actual = Console 4.00h + Mobile 16.50h.

**Verdict: Invoice matches WBS billing entries. All 6 items are unpaid — correct for a pending invoice.**

---

## Cross-Reference: WBS Billing vs Internal Est vs Charged

| # | Task | Billing Type | WBS Hrs (billed) | Est Raw | Est w/Buffer | Actual Worked | Charged (internal) | Delta (WBS vs internal) |
|---|------|-------------|-----------------|---------|-------------|--------------|-------------------|------------------------|
| 1 | Weekly Monitor May 2026 | Hourly | 5.0h | — | — | 5.00h | 5.00h | 0h ✅ |
| 2 | [Prestashop] Mobile Menu Modal | Fixed | 13.5h | 7.00h | 11.08h | 14.90h | 11.08h | +2.42h ⚠️ |
| 3 | [Maintenance] Update GLS on Console | Hourly | 10.0h | — | — | 10.00h | 10.00h | 0h ✅ |
| 4 | [Prestashop] [GS] Herd Custom Date Selection | Fixed | 5.0h | 3.00h | 3.72h | 2.50h | 2.50h | +2.50h ⚠️ |
| 5 | [Prestashop] [GS] Setup Map: Unassigned Paddock Deletion | Fixed | 8.0h | 5.00h | 6.20h | 4.00h | 4.00h | +4.00h ⚠️ |
| 6 | [Console][Mobile] Update on Transport Scanning | Fixed | 23.5h | 15.00h | 18.60h | 20.50h | 17.64h | +5.86h ⚠️ |

> Task 6 breakdown: Console (Actual=4.00h, Charged=4.00h) + Mobile (Actual=16.50h, Charged=13.64h) = 20.50h actual / 17.64h internal charged

---

## Summary

- **Invoice ↔ WBS:** All 6 items match. Total $1,950 is correct per WBS billing sheet.
- **Rate:** $30/h applied consistently across all line items.
- **Payment status:** All items marked unpaid in WBS — invoice is legitimate and actionable.

### Internal Awareness (not blocking invoice)

Fixed-cost tasks billed at WBS estimates, which can exceed Est w/Buffer or actual hours:

| Task | WBS Billed | Internal Charged | Overbill vs internal |
|------|-----------|-----------------|---------------------|
| Mobile Menu Modal | $405 (13.5h) | $332.40 (11.08h) | +$72.60 |
| Herd Custom Date Selection | $150 (5.0h) | $75.00 (2.50h) | +$75.00 |
| Setup Map: Unassigned Paddock | $240 (8.0h) | $120.00 (4.00h) | +$120.00 |
| Transport Scanning | $705 (23.5h) | $529.20 (17.64h) | +$175.80 |

These variances are expected for fixed-cost tasks where WBS estimates were agreed upfront with the client. The WBS values are the contractual amounts, not the actuals.

---

## Unresolved Questions

1. **Task 70 Transport Scanning 23.5h:** Est vs Charged shows Console=4h + Mobile=13.64h = 17.64h internally billed, but WBS has 23.5h. There is also a separate [Console] [Maintenance] Transport fail entry (6.75h, "Requesting payment") — unclear if this is already included in Task 70 or will be a separate invoice line.
2. **Task 66 missing from invoice:** Misc Tasks Task 66 `[Console] Automatic daily special barcode regeneration` (6.5h, $195) appears unpaid in WBS but is absent from this invoice — presumably deferred to next billing cycle.
