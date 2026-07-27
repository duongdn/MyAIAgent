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
- **Collapsible row groups** (`sheet.rowGroups`, all depth 1): 29 ranges grouping each header's detail sub-items so they can be collapsed — copied verbatim from VEA in `scripts/finance-report-detail-apply-row-groups.js` (`ROW_GROUPS` constant).
- **Collapsible column group:** 1 range, columns B-D (the 3 earliest years) — matches VEA's pattern of hiding older years behind a collapse toggle so the sheet opens showing recent years first.
- 🔴 **Groups must open COLLAPSED by default (user explicitly confirmed this, 2026-07-27)** — but a group's own `collapsed` field on `sheet.rowGroups`/`columnGroups` is NOT what drives that: on VEA only 1 of 29 groups even has `collapsed:true` set. The actual visual "closed" state comes from `hiddenByUser: true` set directly on every row/column dimension that falls inside a group (verified via `spreadsheets.get` → `data[].rowMetadata[].hiddenByUser` / `columnMetadata[].hiddenByUser`). `finance-report-detail-apply-row-groups.js` sets this via `updateDimensionProperties` after creating the groups — don't skip that step or the groups will exist but render expanded.
- 🔴 **`addDimensionGroup` is not idempotent — running the script twice on the same sheet duplicates every group** (29→58 happened on SAB the first time this was re-run to add the hide step). If you need to re-run after a fix, first delete existing groups (`deleteDimensionGroup` for every range in `sheet.rowGroups`/`columnGroups`) and reset `hiddenByUser: false` across the full row/column range, then reapply once.

## Reusable scripts (apply in this order after the raw sheet + Định lượng values are written)

```bash
node scripts/finance-report-detail-apply-vea-style.js <SPREADSHEET_ID> <TICKER>
node scripts/finance-report-detail-apply-vea-style.js <SPREADSHEET_ID> "Định lượng - <TICKER>" --ratio-block-start=204
node scripts/finance-report-detail-apply-row-groups.js <SPREADSHEET_ID> <TICKER>
node scripts/finance-report-detail-apply-row-groups.js <SPREADSHEET_ID> "Định lượng - <TICKER>"
```

**Precondition:** only valid when the target ticker's raw sheet was built with `finance-report-detail-build-raw-sheet.js` (same row-builder), which guarantees the row-index-to-line-item mapping matches VEA's (verified true for SAB — every checked line item landed on the identical row number as VEA, since VAS balance-sheet/income-statement/cash-flow templates are standardized across all Vietnamese listed companies). If a future ticker's raw sheet ever has a different row count (e.g. missing a line item cafef doesn't report for that company), the row-index lists above will misalign — spot-check a few bold/header rows after running before trusting it.

**Not yet replicated from FPT/VEA** (lower priority, ask user before investing time): clickable hyperlinks via `textFormatRuns`, the dynamic row-height formula from [[project_finance_report_detail_skill]]'s Bước 5 (only matters for the narrative sheets — Định tính/Báo cáo 2 — which use long wrapped text, not the numeric raw sheet).

## Important correction (2026-07-27, later same day): the true reference is FPT, not VEA

User pointed out VEA's own sheets are ALSO under-formatted in places, and gave the real gold-standard reference explicitly: **FPT spreadsheet `1E47mfclzKFvpX1JZeiwu4zQFlhq8-CoLBr-bZuibqMw`**, e.g. `Định giá - FPT` (gid `862074532`). When the two disagree, match FPT, not VEA — VEA itself needs backfilling to match FPT in places (already done for `Định giá - VEA`, see below).

### Định giá sheet spec (from `Định giá - FPT`, applied via `scripts/finance-report-detail-apply-dinh-gia-style.js` to both `Định giá - VEA` and `Định giá - SAB`)
- Section-header rows (sheet title row 1, "Chỉ tiêu"+years row 3, and every `"0."/"I."/"II."...` category row) — background `rgb(0.847, 0.898, 0.976)` (light blue-gray), bold, spans all columns. Row 2 (unit/source note) — font size 9, no background.
- `frozenRowCount: 3, frozenColumnCount: 1`.
- Column widths: A ≈ 420-460px, rest ≈ 90-100px.
- Number formats are explicit per row, NOT left on "Automatic": `#,##0` for tỷ-đồng/đồng absolute figures, `#,##0.00` for ratios (P/E, P/B, P/S, EV/EBIT, EV/EBITDA, D/E...), `0.0%` for percentage rows (dividend yield). No borders anywhere on this sheet type.
- FPT's `Định giá` also includes more valuation metrics than the VEA/SAB builds had: **P/S, EV (Enterprise Value), EV/EBIT, EV/EBITDA** — not yet added to VEA/SAB's Định giá sheets, only the formatting was backfilled. Consider adding these metrics too if the user asks for full parity.

### 🔴 Each sheet TYPE has its own distinct header color — do not reuse one color everywhere
Spot-checked across FPT's sheets, all different:
- `Định giá`: light blue-gray `rgb(0.847, 0.898, 0.976)` for section headers.
- `Benjamin Graham`: section headers `rgb(0.8, 0.878, 0.969)` (a slightly different, slightly more saturated blue) — but the column-header row right below it (`STT | Tiêu chí | ...`) is light **gray** `rgb(0.929, 0.929, 0.929)`, not blue. `frozenRowCount: 5`.
- `Định lượng`: **structurally different from the VEA-derived assumption used to build SAB's** — FPT's `Định lượng - FPT` is its own dark-blue-titled sheet (`rgb(0.0039, 0.3412, 0.6078)`, same dark blue as the raw sheet's header) with a light-cyan `rgb(0.8, 1, 1)` metadata sub-header block (Giai đoạn/Hợp nhất/Kiểm toán/Công ty kiểm toán/Ý kiến kiểm toán), NOT a plain copy-of-raw-sheet-plus-ratio-block like `Định lượng - VEA` (which is what `finance-report-detail-build-dinh-luong.js` was modeled on). This mismatch was not resolved as of 2026-07-27 — if the user asks to fix `Định lượng - SAB` further, model it on `Định lượng - FPT` instead, not `Định lượng - VEA`.
- Raw ticker sheet (`FPT`/`VEA`/`SAB`): dark blue `rgb(0.0039, 0.3412, 0.6078)` (see the main spec above in this file) — matches `Định lượng - FPT`'s title row exactly, but not `Định giá`'s or `Benjamin Graham`'s lighter blues.

**How to apply going forward:** before styling any sheet type for a new ticker, pull the ACTUAL FPT sheet of that same type via `spreadsheets.get({includeGridData:true})` first — don't assume VEA's version is correctly styled, and don't reuse another sheet-type's color.

### Benjamin Graham sheet spec (from `Benjamin Graham - FPT`)
- `frozenRowCount: 5`. Column widths: A=491 (criteria label), B=260, C=200, D=300 (data), E=110 (verdict) — deliberately UNEVEN, not uniform like the raw sheet.
- All cells: `wrapStrategy: WRAP`, `verticalAlignment: TOP` (not OVERFLOW_CELL/BOTTOM like the raw sheet).
- Row 1 (title): bold, no bg. Row 2 (source note): not bold, no bg.
- Section-header rows ("I. 10 TIÊU CHÍ...", "II. XẾP HẠNG..."): bg `rgb(0.8, 0.878, 0.969)`, bold, spans all columns — same blue as `Định giá`'s section headers (close enough to reuse).
- The column-header row right under a section header ("STT | Tiêu chí | Ngưỡng yêu cầu | Số liệu | Kết quả"): bg light gray `rgb(0.929, 0.929, 0.929)`, bold — **do not confuse with the section-header blue**, it's a second, distinct header row type.
- Data rows: no bg, not bold. "KẾT LUẬN I" row: bold, no bg (not blue — plain bold only).

### 🔴 `Báo cáo 2` and `Định tính` are NOT just differently-colored — FPT's versions use a fundamentally different CONTENT STRUCTURE than what was built for VEA/SAB, not merely different formatting. Rebuilding these to truly match FPT is a content-restructuring task, not a formatting pass. Flagged to user 2026-07-27, not yet done — check with user on priority before attempting.

**`Báo cáo 2 - FPT`** actual structure (very different from the `I. TỔNG QUAN / II. KẾT QUẢ TÀI CHÍNH / ...` plain-Roman-numeral layout used for VEA/SAB):
- `frozenRowCount: 2`. Only 5 columns, uneven widths: A=340, B=160, C=233, D=160, E=380.
- Row 1: bold, fontSize 13 (title). Row 2: fontSize 9 (subtitle).
- Section headers ("BƯỚC 1 — ĐỊNH TÍNH: HIỂU DOANH NGHIỆP...", presumably "BƯỚC 2 — ĐỊNH LƯỢNG...", etc. — a "BƯỚC N" step-based framing, not the "I./II./III." the VEA/SAB build uses): bg `rgb(0.8, 0.878, 0.976)`, bold, fontSize 11.
- Sub-headers ("1. Mô hình kinh doanh"): bold, fontSize default (10), no bg.
- **Body content uses a 3-level bullet hierarchy with font size shrinking per level**: `•` top bullet = fontSize 10, `wrapStrategy OVERFLOW_CELL`, `valign MIDDLE`; `    ◦` (4-space indent, hollow circle) = fontSize 10; `        ▪` (8-space indent, small square) = fontSize 9. This is a materially richer outline structure than the flat paragraph-per-cell approach used for VEA/SAB's Báo cáo 2.

**`Định tính - FPT`** actual structure (very different from VEA/SAB's plain-white Định tính):
- `frozenRowCount: 4, frozenColumnCount: 2`. 5 columns, widths A=27 (narrow, just holds the roman-numeral/number), B=195, C=729 (wide — main content), D=335, E=335.
- Rows 1-3: bright green banner `rgb(0.573, 0.816, 0.314)` (likely a title/branding block, not re-derived in detail here).
- The roman-numeral section column (col A, values "I"/"II"/etc.): dark green `rgb(0.29, 0.486, 0.349)` background, bold, fontSize 10, `wrap WRAP`, `valign MIDDLE`.
- Data rows: **alternating row-stripe** between white `rgb(1,1,1)` and light gray `rgb(0.949,0.949,0.949)` — a zebra-stripe pattern, not the plain-white VEA/SAB used. Numbering column (col B, "1"/"2"/"3"/"→") also bold, fontSize 10.
- Not yet fully mapped: content of columns C/D/E for the data rows (only column A/B inspected so far).

**Định lượng structural mismatch** (already noted above in this file): FPT's `Định lượng - FPT` is a dark-blue-titled sheet with a light-cyan metadata sub-header block, structurally different from the "copy raw + append ratio block" approach used for `Định lượng - VEA`/`Định lượng - SAB`.

**Bottom line for future builds:** the VEA spreadsheet itself was apparently never fully brought in line with FPT's template for `Định tính`, `Định lượng`, and `Báo cáo 2` — treat VEA as unreliable for those 3 sheet types specifically (raw sheet and `Định giá` ARE reliable references, confirmed matching FPT). Always diff against FPT directly for those 3.
