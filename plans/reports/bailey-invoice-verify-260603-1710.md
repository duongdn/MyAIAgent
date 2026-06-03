# Bailey Invoice Verification

**Date:** 2026-06-03  
**Invoice total:** $727.50  
**Rate:** $30/h  
**Status in WBS billing sheets:** None of the 4 items found — new tasks, not yet entered in payment sheets

---

## Line Item Comparison

| # | Task | Invoice Hrs | Invoice $ | Est vs Charged: Actual | Est vs Charged: Charged | Match? |
|---|------|-------------|-----------|------------------------|------------------------|--------|
| 1 | [Prestashop] [Maintenance] Products carousel & slider causing conflict | 9.5h | $285.00 | 9.50h | 9.50h | ✅ MATCH |
| 2 | [Prestashop] [Maintenance] Product 102947 issue | 1.5h | $45.00 | 1.50h | 1.50h | ✅ MATCH |
| 3 | [Console] Automatic daily special barcode regeneration | 6.5h | $195.00 | 4.50h | 4.50h | ⚠️ DISCREPANCY |
| 4 | [Console] [Maintenance] Transport failed to update on Customer Order Dashboard | 6.75h | $202.50 | 6.75h | 6.75h | ✅ MATCH |

---

## Detail per Item

### 1. Products carousel & slider causing conflict
- **Est vs Charged row 122** | Dev: VietPH | Status: Tested on Live
- Billing type: **Hourly** (maintenance task)
- Actual 9.50h → 9.50h charged → $285 ✅

### 2. Product 102947 issue
- **Est vs Charged row 123** | Dev: VietPH | Status: Tested on Live
- Billing type: **Hourly** (maintenance task)
- Actual 1.50h → 1.50h charged → $45 ✅

### 3. Automatic daily special barcode regeneration ⚠️
- **Est vs Charged row 128** | Dev: VietPH | Status: Tested on Live
- Billing type: **Fixed-cost** (has raw estimate, not marked Hourly)
- Est Raw: 4.00h | Est w/Buffer: 4.96h | Actual: 4.50h | **Charged in sheet: 4.50h**
- **Invoice claims: 6.5h → $195**
- **Gap: +2.0h ($60) over what Est vs Charged sheet records as "Charged"**
- Note: Est w/Buffer (4.96h × $30 = $148.80) also does not match invoice

### 4. Transport failed to update on Customer Order Dashboard
- **Est vs Charged row 135** | Dev: VietPH | Status: Tested on Live
- Billing type: **Hourly** (maintenance task)
- Actual 6.75h → 6.75h charged → $202.50 ✅

---

## Summary

| | Amount |
|--|--------|
| Invoice total | $727.50 |
| Verified (items 1, 2, 4) | $532.50 |
| Discrepancy item (item 3) | $195.00 invoiced vs $135.00 in sheet (Charged 4.50h) |
| If item 3 corrected to Charged hrs | **$667.50** |

- **Items 1, 2, 4:** ✅ Hours match Est vs Charged data exactly
- **Item 3:** ⚠️ Invoice shows 6.5h but Est vs Charged records 4.50h actual / 4.50h charged — **difference of 2 hours ($60)**
- None of the 4 items appear in WBS billing sheets yet (Maintenance Tasks / Miscellaneous Tasks / Main Tasks) — all are new, pending entry

---

## Action Required

**Before approving payment, clarify item 3:**

> [Console] Automatic daily special barcode regeneration — invoiced at 6.5h ($195) but Est vs Charged sheet (row 128) shows 4.50h actual and 4.50h charged.
>
> - Was the estimate revised upward? If so, Est vs Charged sheet should be updated.
> - Or is the invoice hour count incorrect?
