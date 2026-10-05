## Bailey Invoice Verification — 2026-10-05

**Invoice total:** $8,070.00 (269h) | **Rate:** $30/h (all lines ✓)
**Sources:** WBS Billing + GGS Slack + Est vs Charged + Workstream (as of 2026-10-05)

### Line Item Verification

| # | Task | Billing | Inv Hrs | WBS Hrs | Slack Quote | Actual (WS) | Hrs OK? | Inv $ | Match? |
|---|------|---------|---------|---------|-------------|-------------|---------|-------|--------|
| 1 | [Maintenance] Console Resources Maintenance – Feb 2026 | Hourly | 2.5 | ❌ no WBS row | n/a (Joey OK'd work 2026-02-27, [thread](https://globalgrazingservices.slack.com/archives/C0338NXK3SB/p1772158029641329)) | 2.5 | ✅ | $75 | ⚠️ not in WBS |
| 2 | [PrestaShop][CR1] Grazing Software Desktop View | Fixed | 14.5 | 14.5 ($435) | 14.5 — Joey approved 09-08 ("please move forward with cr") [quote](https://globalgrazingservices.slack.com/archives/C06NAP7067P/p1788839311049309?thread_ts=1788170052.082369) | 27.25 | ✅ | $435 | ✅ |
| 3 | [PrestaShop] Grazing Software Desktop | Fixed | 233.5 | 233.5 ($7,005) | 233.5 — Joey approved 06-04 ("let's go it, new top priority") [quote](https://globalgrazingservices.slack.com/archives/C06NAP7067P/p1780369690670719) | 275.62 | ✅ | $7,005 | ✅ |
| 4 | [PrestaShop] Grazing Software Filters | Fixed | 18.5 | ❌ no WBS row | 18.5 — Joey: "yes please also add this 18.5 hours" 06-04 [quote](https://globalgrazingservices.slack.com/archives/C06NAP7067P/p1780568157721909) | 27.0 | ✅ | $555 | ⚠️ not in WBS |

### Summary
- Invoice valid: **YES on hours/amounts** — all 4 lines match Slack-approved quote (fixed) or WS actual (hourly); math $30/h correct; total $8,070.
- Discrepancies (bookkeeping, not amount):
  1. Feb 2026 maintenance (2.5h/$75) missing from WBS Maintenance Tasks - Payment → add row. Also Est vs Charged row 111 col K shows 0.00 (stale; WS has 2.5h). WS tag name typo "Consle".
  2. Grazing Software Filters (18.5h/$555) missing from WBS Main Tasks - Payment → add under "WBS - Grazing Software Desktop" group (group subtotal $7,440 = Desktop+CR1 only; would become $7,995).
  3. Est vs Charged status for Desktop + Filters still "Testing"; Slack 09-30 confirms both live → update to Done on Live. CR1 row (133) has no status/dev/link.
  4. Live note: Amy 09-30 says small Filter bug still being checked by Nick ("Confirm button stays disabled when filtering by Herd Type") — client may raise it before paying.
- Payment status: all items unpaid ✅ (WBS Desktop/CR1 rows blank; Feb item never invoiced — first Feb monitor batch paid Mar 14, 2026 excluded it, consistent with user's note).

### Internal Cross-Reference (not blocking)
| Task | Billed | Est raw | Est w/Buffer | WS Actual | Over |
|------|--------|---------|--------------|-----------|------|
| Desktop | 233.5 | 150.5 | 186.66 | 275.62 | +42.1h vs billed |
| CR1 | 14.5 | 9 | 11 | 27.25 | +12.75h |
| Filters | 18.5 | 12 | 14.88 | 27.0 | +8.5h |
| Feb maint | 2.5 | – | – | 2.5 | 0 |
Fixed-cost overrun ≈63h absorbed internally (~$1,900).

### Unresolved
- Who adds missing WBS rows (Filters, Feb maint)?
- Est vs Charged Filters col J shows 14.88 as "charged" vs approved 18.5 — sheet should be corrected to 18.5.
