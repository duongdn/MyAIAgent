# Bailey Invoice Verification — 2026-06-10

**Invoice total:** $1,950.00 | **Rate:** $30/h | **Date verified:** 2026-06-10  
**Sources checked:** WBS Billing sheet + GGS Slack (#change-requests, #maintenance)

---

## Line Item Verification

> **Hourly** → verified against actual hours (Est vs Charged).  
> **Fixed** → verified against client-quoted hours from Slack + WBS.

| # | Task | Billing | Inv Hrs | WBS Hrs | Slack Quote | Actual | Hrs OK? | Inv $ | Match? |
|---|------|---------|---------|---------|------------|--------|---------|-------|--------|
| 1 | Weekly Monitor May 2026 | Hourly | 5.0h | 5h | _(hourly, no quote)_ | 5.00h | ✅ | $150 | ✅ |
| 2 | [Prestashop] Mobile Menu Modal | Fixed | 13.5h | 13.5h | Amy: "total effort would be **13.5 hours**" | 14.90h | ✅ | $405 | ✅ |
| 3 | [Maintenance] Update GLS on Console | Hourly | 10.0h | 10h | _(hourly, no quote)_ | 10.00h | ✅ | $300 | ✅ |
| 4 | [Prestashop] [GS] Herd Custom Date Selection | Fixed | 5.0h | 5h | Amy: "Herd Custom Date Selection — **5 hours**" | 2.50h | ✅ | $150 | ✅ |
| 5 | [Prestashop] [GS] Setup Map: Unassigned Paddock Deletion Modal | Fixed | 8.0h | 8h | Amy: "Unassigned Paddock Deletion Modal — **8 hours**" | 4.00h | ✅ | $240 | ✅ |
| 6 | [Console][Mobile] Update on Transport Scanning | Fixed | 23.5h | 23.5h | Amy: "total effort is estimated at **23.5 hours** for both Console and Mobile" | 20.50h | ✅ | $705 | ✅ |
| | **TOTAL** | | **65.0h** | **65.0h** | | | **✅** | **$1,950** | **✅** |

**All 6 items confirmed. Invoice hours match both WBS billing and original Slack quotes to client.**

---

## Internal Cross-Reference (Est vs Charged)

For fixed-cost tasks, WBS/Slack-quoted hours differ from internal Est w/Buffer — this is normal because quoted hours are agreed upfront with client independently of the buffer formula.

| Task | Slack-quoted / Billed | Est w/Buffer (internal) | Actual Worked | Note |
|------|----------------------|------------------------|---------------|------|
| Mobile Menu Modal | 13.5h | 11.08h | 14.90h | Actual > billed; client still pays quoted rate |
| Herd Custom Date Selection | 5.0h | 3.72h | 2.50h | Actual < quoted; fixed-cost, client pays 5h |
| Setup Map: Unassigned Paddock | 8.0h | 6.20h | 4.00h | Actual < quoted; fixed-cost, client pays 8h |
| Transport Scanning | 23.5h | 18.60h | 20.50h | Actual < quoted; fixed-cost, client pays 23.5h |

---

## Summary

- **Invoice is correct** — all 6 items verified against WBS + Slack quotes ✅
- **Hourly tasks (2):** billed = actual ✅
- **Fixed tasks (4):** billed = client-approved Slack quote = WBS entry ✅
- **Payment status:** all items unpaid in WBS — invoice is legitimate and actionable

---

## Unresolved Questions

1. **Transport Scanning Task 70 (23.5h):** A separate `[Console][Maintenance] Transport fail to update on Customer Order Dashboard` entry exists in Est vs Charged (6.75h, "Requesting payment"). Unclear if included in Task 70 or will be a future invoice line.
2. **Task 66 absent:** `[Console] Automatic daily special barcode regeneration` (6.5h, $195) unpaid in WBS but absent from this invoice — presumably deferred to next cycle.
