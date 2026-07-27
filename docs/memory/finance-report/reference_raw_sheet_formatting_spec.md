---
name: reference_raw_sheet_formatting_spec
description: Exact cell-formatting spec for the raw <TICKER> sheet (and the copied rows inside Định lượng), reverse-engineered from VEA — apply this immediately when building a new ticker, don't leave it as a follow-up
metadata:
  type: reference
---

**Mistake made building SAB (2026-07-27):** wrote the raw sheet's values only, applied basic wrap/bold/column-width, and called it done. User caught it — "Format định lượng ko ok, check VEA, sheet đầu nữa" — the raw sheet and the copied rows inside Định lượng need VEA's actual cell formatting (blue header bands, accounting number format, bold hierarchy, collapsible row groups), not just readable-enough. **Apply this spec as part of Step 3/4 of [[project_finance_report_detail_skill]] the first time, not as a fix-up after the user complains.**

## How to get the ground truth for a new template company

Don't hardcode assumptions — pull the actual formatting from the reference sheet (VEA, or whichever spreadsheet you're modeling) via `spreadsheets.get` with `includeGridData: true` and inspect `userEnteredFormat` per cell, plus `sheet.rowGroups`/`sheet.columnGroups` for outlines. This is how the spec below was derived.

## The spec (raw ticker sheet, rows 1-202, cols A-K for a 10-year sheet)

- **Font:** Arial, size 10, everywhere.
- **Row 1 header** ("Tài sản" + year labels) and the two other section-title rows that repeat the year header — **"Kết quả kinh doanh" and the first LCTT group name** (e.g. "Lưu chuyển tiền từ ĐH kinh doanh") — get: background `rgb(0.0039, 0.3412, 0.6078)` (dark blue), white bold text, center-aligned. The year cells in these rows use plain integer number format (`"0"`), NOT the accounting format below — this was the exact bug caught on SAB (years rendered as "2,016.00").
- **Every other row, column A:** white background, no wrap unless needed (`OVERFLOW_CELL`), vertical-align bottom.
- **Every other row, numeric columns (B onward):** white background, right-aligned, accounting number format `_(* #,##0.00_);_(* (#,##0.00);_(* "-"??_);_(@_)`, thin borders on all 4 sides (dashed top/bottom, solid left/right, color `rgb(0, 0.4, 0.8)`).
- **Bold rows** (text bold, but NOT the blue background — that's only for the 3 header rows above): top-level asset/liability category letters (`A.`, `B.`, `C.`... but curiously NOT `D.`/equity), both `TỔNG CỘNG` grand-total rows, the "Nguồn vốn"/"NGUỒN VỐN" label pair, and on the income-statement/cash-flow side a specific hand-picked set of "headline" lines: Doanh thu thuần, Giá vốn hàng bán, Lợi nhuận gộp, Doanh thu HĐTC, Chi phí tài chính, Phần lãi/lỗ liên doanh liên kết, LN thuần HĐKD, Tổng LNTT, LNST TNDN, LNST CĐ mẹ, EPS row, plus the first item + one subtotal line inside the LCTT-HDKD group. **The exact row-index list (works verbatim for any ticker whose raw sheet was built with the same row-builder script, since VAS chart-of-accounts row order is identical company-to-company):** `[1,2,34,80,81,82,135,136,139,140,141,143,144,146,149,153,156,157,159,161,162,163,170,181,190]`.
- **Collapsible row groups** (`sheet.rowGroups`, all depth 1): 29 ranges grouping each header's detail sub-items so they can be collapsed — copied verbatim from VEA in `scripts/finance-report-detail-apply-row-groups.js` (`ROW_GROUPS` constant). One group (rows 150-152, "12/13/14." under LN thuần HĐKD) is collapsed by default in VEA — replicate that too for fidelity, though it's cosmetic.
- **Collapsible column group:** 1 range, columns B-D (the 3 earliest years) — matches VEA's pattern of hiding older years behind a collapse toggle so the sheet opens showing recent years first.

## Reusable scripts (apply in this order after the raw sheet + Định lượng values are written)

```bash
node scripts/finance-report-detail-apply-vea-style.js <SPREADSHEET_ID> <TICKER>
node scripts/finance-report-detail-apply-vea-style.js <SPREADSHEET_ID> "Định lượng - <TICKER>" --ratio-block-start=204
node scripts/finance-report-detail-apply-row-groups.js <SPREADSHEET_ID> <TICKER>
node scripts/finance-report-detail-apply-row-groups.js <SPREADSHEET_ID> "Định lượng - <TICKER>"
```

**Precondition:** only valid when the target ticker's raw sheet was built with `finance-report-detail-build-raw-sheet.js` (same row-builder), which guarantees the row-index-to-line-item mapping matches VEA's (verified true for SAB — every checked line item landed on the identical row number as VEA, since VAS balance-sheet/income-statement/cash-flow templates are standardized across all Vietnamese listed companies). If a future ticker's raw sheet ever has a different row count (e.g. missing a line item cafef doesn't report for that company), the row-index lists above will misalign — spot-check a few bold/header rows after running before trusting it.

**Not yet replicated from FPT/VEA** (lower priority, ask user before investing time): clickable hyperlinks via `textFormatRuns`, the dynamic row-height formula from [[project_finance_report_detail_skill]]'s Bước 5 (only matters for the narrative sheets — Định tính/Báo cáo 2 — which use long wrapped text, not the numeric raw sheet).
