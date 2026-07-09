# Bailey Invoice Verification

**Invoice total:** $9,864.90 | **Rate:** $30/h (verified consistent across all lines)
**Sources:** WBS Billing (dedicated Picking & Stock sheet, gid=1508556933) + GGS Slack (#barcode-stock-and-picking-location, #change-requests) + Est vs Charged

## Line Item Verification

| # | Task | Billing | Inv Hrs | WBS/Sheet Hrs | Slack Quote | Hrs OK? | Inv $ | Match? |
|---|------|---------|---------|---------------|-------------|---------|-------|--------|
| 1 | [Console][Mobile] Picking & Stock Location Enhancements | Fixed | 223.03h | Global (hours) total = 223.03h (Console 121.28 + Mobile 101.75, dedicated WBS sheet row 6) | Amy 2025 (ts 1755511018): "total estimated time for both Console and Mobile implementation is 223.03 hours" | ✅ | $6,690.90 | ✅ |
| 2 | [Console] [CR-01] Picking & Stock Location Enhancements | Fixed | 27.8h | Est vs Charged row 98, Trello `XAFD4VpY` (Est raw 18.00/buffer 22.32 — internal only, not billing basis) | Amy (ts 1758685852, same Trello `XAFD4VpY`): "development team has estimated a total effort of 27.8 hours"; Joey approved (ts 1759393707) | ✅ | $834.00 | ✅ |
| 3 | [Console] [CR-02] Picking & Stock Location Enhancements | Fixed | 9.5h | Est vs Charged row 130 "[CR2]", Trello `ybEfUskb` (Est raw 6.00/buffer 7.44 — internal only) | Amy (ts 1778043337, same Trello `ybEfUskb`): "total estimated effort of 9.5 hours" | ✅ | $285.00 | ✅ |
| 4 | [Console][Mobile] Location Management for Products | Fixed | 56h | Est vs Charged rows 132/145, Trello `IZi0gLVR` (Est raw 27.00+9.00=36.00 — internal only) | Amy #change-requests (ts 1780376067): "total effort to update this on both Console and Mobile is 56 hours" | ✅ | $1,680.00 | ✅ |
| 5 | [Console] [CR-03] Picking & Stock Location Enhancements | Fixed | 4h | Est vs Charged row 139 "[CR3]" (Est raw 3.00/buffer 4.00) | Amy #barcode-stock-and-picking-location (ts 1781677391, same thread linked in sheet): "around 4 hours to implement a bulk download feature" | ✅ | $120.00 | ✅ |
| 6 | [Mobile] [CR-01] Picking & Stock Location Enhancements | Fixed | 8.5h | Est vs Charged row 143 "[CR1]", Trello `ygnhpkm1` (Est raw 5.50/buffer 6.82 — internal only) | Amy (ts 1777952910): "update will now take 8.5 hours since the photo capture isn't needed" | ✅ | $255.00 | ✅ |

**Total hours:** 328.83h → **Total $:** $9,864.90 — arithmetic checks out exactly against invoice total.

## Summary
- **Invoice valid: YES.** All 6 line items verified against client-approved Slack quotes (Amy→Joey, all Trello links cross-match the corresponding Est vs Charged rows). Item 1 additionally cross-checked against the dedicated WBS breakdown sheet (Global hours = 223.03, exact match; sheet's own cost cell shows $6,690.75 vs invoice $6,690.90 — $0.15 rounding noise, immaterial, not a real discrepancy).
- Per known billing rule: fixed-cost hours = Slack-quoted/client-approved hours, not the internal "Est vs Charged" Est-w/-buffer formula. Items 2, 3, 5, 6 invoice hours differ from the internal buffer-formula hours (e.g. CR-01 buffer=22.32 vs billed/quoted 27.8) — this is expected and correct, not a discrepancy.
- Rate: all 6 lines compute to exactly $30.00/h.
- Payment status: none of the 6 Trello links (`2kzCh5pb`, `HJEJYiBT`, `XAFD4VpY`, `ybEfUskb`, `IZi0gLVR`, `ygnhpkm1`) appear anywhere in Main/Miscellaneous/Maintenance Tasks - Payment sheets — confirms these are new, unpaid items, no double-billing risk.
- Discrepancies: none.

## Internal Cross-Reference (not blocking)

| Task | WBS/Quoted (billed) | Est w/Buffer (internal) | Actual (internal) |
|------|---------------------|--------------------------|--------------------|
| Console main | 121.28h (WBS sheet) | 97.36h | 108.25h |
| Mobile main | 101.75h (WBS sheet) | 81.68h | 130.35h |
| Console CR-01 | 27.8h (quoted) | 22.32h | 23.75h |
| Console CR-02 | 9.5h (quoted) | 7.44h | 6.50h |
| Location Mgmt Console | (part of 56h combined) | 33.49h | 36.00h |
| Location Mgmt Mobile | (part of 56h combined) | 11.16h | 27.75h |
| Console CR-03 | 4h (quoted) | 4.00h | 9.00h |
| Mobile CR-01 | 8.5h (quoted) | 6.82h | 9.00h |

Actual hours worked exceed both quoted and buffer estimates on several sub-items (notably Mobile main 130.35h actual vs 101.75h billed, and Location Mgmt Mobile 27.75h actual vs its share of the 56h combined quote) — margin is being absorbed by the dev team per the fixed-cost/client-quote billing model, not a billing concern.

## Unresolved Questions
- None — all 6 items independently verified via matching Trello links between Est vs Charged and Slack quotes.
