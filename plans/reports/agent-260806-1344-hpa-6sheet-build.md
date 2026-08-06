# HPA 6-sheet build — completion report

Spreadsheet: `1E8goOhD5WvReVK2WyWRRYM-6tKbzifxstcVuUjiEaYE`, tabs in order:
`HPA` | `Định tính - HPA` | `Định lượng - HPA` | `Định giá - HPA` | `Benjamin Graham - HPA` | `Báo cáo 2 - HPA`

## Built — 6/6 sheets

1. **`HPA`** (raw BCTC, 202 rows + caveat banner row 204) — BS+IS+CF, cols B=2025 (audited, cafef), C=Q4/2025, D=Q1/2026, E=Q2/2026 (quarterly, fetched separately via `GetReportCDKT/LCTT` `TypeTime=QUY` since the generic fetch script only pulls annual). Balance check: FY2025 TS 4,700,346,112,784đ vs NV 4,700,316,112,784đ, diff 30M/4.7 nghìn tỷ (0.0000064%, genuine cafef audited-report rounding, same pattern as SAB — not a script bug). Quarterly TS=NV exact match all 3 quarters. Formatted with `apply-vea-style.js` + `apply-row-groups.js` (row layout identical to VEA/FOX's 202-row template — verified row 80/115/117/139/141/157/159 match before reuse).
2. **`Định tính - HPA`** — real researched content: business model (chăn nuôi heo/bò/gia cầm + TACN, mô hình khép kín Feed-Farm, HPG sở hữu ~85-95%), industry cyclicality (LNST 2025 +55% do đỉnh chu kỳ giá heo, không phải sản lượng), governance (Chủ tịch Nguyễn Việt Thắng kiêm CEO HPG), IPO event (30tr CP mới 1/2026, niêm yết 6/2/2026). Sourced: Simplize, Vietstock, 24hmoney, TinnhanhChungkhoan, 24h.com.vn.
3. **`Định lượng - HPA`** — raw copy + custom ratio block (NOT the generic FOX-hardcoded script — written fresh for HPA's shape): margins safe across all 4 cols, ROE/ROA annualized ×4 for quarters (labeled), QoQ growth only between the 3 quarter cols (no misleading annual-vs-quarter deltas), BVPS split 255tr shares (pre-IPO, FY2025/Q4-2025) vs 285tr (post-IPO, Q1-Q2/2026).
4. **`Định giá - HPA`** — 0/I-V valuation groups + mandatory **VI. THANH KHOẢN** (4 windows, fresh-fetched today: 1d 5,700 CP/179.7tr đ, 7d 19,260/613.4tr, 1m 35,957/1,142.3tr, 6m 106,213/4,166.3tr, turnover ~0.05%/phiên on ~9,105.75 tỷ vốn hóa) + explicit data-limitation caveat row. Styled with `apply-dinh-gia-style.js`.
5. **`Benjamin Graham - HPA`** — 10-criteria checklist: 3 ĐẠT (D/E, P/E≤25x, Graham Number), 2 KHÔNG ĐẠT (P/B>1.5x, current ratio FY2025<2.0x), 5 KHÔNG ĐỦ DỮ LIỆU (require 10yr history HPA doesn't have) — no forced ĐẠT/KHÔNG ĐẠT where data is genuinely absent. Part II (Greenblatt ranking) explicitly marked unavailable — no access to the external "Top 100"/"v6 - II GCCP material" snapshot for HPA, not fabricated.
6. **`Báo cáo 2 - HPA`** — built via `copyTo` from FPT's `Báo cáo 2` (style inherited) + `unmergeCells` + `updateCells fields:'*'` reset before writing (per skill's VEA-merge-bug precaution). Conclusion (mục VII) explicitly flags BOTH mandatory risks: (1) thin track record — 1 audited year, LNST 2025 spike attributed by analysts to peak pig-price cycle, Q1-Q2/2026 already show QoQ revenue/profit decline and falling annualized ROE (50%→38%→28%→27%); (2) thin liquidity — ~4.17 tỷ đ/phiên avg 6m, ~0.05% turnover, HPG-controlled free-float ~10-15%.

## Data limitations disclosed (in raw sheet header note, Định giá caveat, and Báo cáo 2)

- Only 1 audited annual year (2025) + 3 quarters (Q4/2025-Q2/2026) on cafef — HPA listed HOSE 06/02/2026, genuinely can't meet the skill's 5-year minimum. FireAnt deliberately NOT used as fallback (per `docs/memory/finance-report/feedback_newly_listed_ticker_thin_cafef_data.md` — ticker-code reuse collision with an unrelated 2009-2012 company at ~50x different scale).
- Share count split discovered and handled correctly: 255,000,000 (FY2025 audited, pre-IPO) vs 285,000,000 (from Q1/2026, post-IPO — 30M new shares, 41,900đ, raised 1,257 tỷ, confirmed via VnEconomy/TinnhanhChungkhoan and cross-checked against the sheet's own Vốn góp CSH figures which jump 2,550→2,850 tỷ exactly at Q1/2026). BVPS/P-B formulas use the correct share count per column, not one blanket constant.
- P/E computed two ways and both shown: FY2025-audited-EPS basis (5.46x, our own traceable formula) vs Simplize's TTM basis (6.21x) — different EPS period, not a contradiction, both disclosed.
- Benjamin Graham Part I: 5/10 criteria marked "KHÔNG ĐỦ DỮ LIỆU" rather than forced pass/fail.

## QA (skill's Bước 6 checklist)

- Grepped all 6 sheets for `#REF!/#NAME?/#N/A/#DIV/0!/#VALUE!` — 0 errors found.
- Merge count: `HPA`=1 (intentional caveat banner), `Báo cáo 2 - HPA`=0 (correctly unmerged before write), others=0.
- Cross-check: Tổng tài sản FY2025 (4,700.35 tỷ) and LNST CĐ mẹ FY2025 (1,596.84 tỷ) match exactly between raw sheet `HPA` and `Báo cáo 2 - HPA`'s summary table.
- THANH KHOẢN section confirmed present in `Định giá - HPA` with all 4 windows (1 ngày/7 ngày/1 tháng/6 tháng).
- Tab order matches FPT/VEA/FOX convention (raw → Định tính → Định lượng → Định giá → Benjamin Graham → Báo cáo 2).
- `config/finance-watchlist.json` already had the HPA entry pre-populated (verified, no changes needed).

## Two bugs caught and fixed during build (self-QA, not user-facing issues left behind)

1. Used `toLocaleString('vi-VN')` for some text-formatted numeric cells (e.g. "5.700" for KLGD) — Sheets auto-parsed these as en-US decimals (5.7), silently corrupting the display. Fixed to `en-US` locale consistently, matching the rest of the report; re-ran and verified corrected values (5,700 etc.).
2. Off-by-N row-reference bugs in two formula cross-references (P/B formula pointing at the wrong BVPS row) in both `Định lượng - HPA` and `Định giá - HPA` custom scripts — caught by reading back FORMULA-rendered values, not just FORMATTED, and fixed via dynamic row tracking instead of hand-counted literals.

## Scripts added (per-ticker, following the FOX naming precedent — not generic, since the "generic" dinh-luong/dinh-gia scripts turned out to still have FOX-hardcoded MARKET constants/text under misleadingly generic names)

`scripts/finance-report-detail-append-hpa-quarters.js`, `-add-hpa-data-caveat.js`, `-autofit-rows-hpa.js`, `-build-dinh-luong-hpa.js`, `-build-dinh-gia-hpa.js`, `-build-dinh-tinh-hpa.js`, `-build-benjamin-graham-hpa.js`, `-build-report2-hpa.js`.

## Unresolved questions

- Tập đoàn Hòa Phát's exact % ownership of HPA post-IPO (285tr share base) chưa verify qua báo cáo cổ đông lớn cập nhật chính thức — chỉ ước tính ~85% từ số liệu 242.247tr CP pre-IPO (~95% trên nền 255tr) chia cho 285tr. Nêu rõ là ước tính trong Định tính, không phải số chính thức.
- Benjamin Graham Part II (Greenblatt ranking) không thực hiện được — cần user cung cấp snapshot "Top 100"/file "v6 - II GCCP material" cập nhật có HPA nếu muốn bổ sung.
- Doanh thu/lợi nhuận riêng của 2 mảng Bò Úc và Trứng sạch không tìm được tách bạch công khai (chỉ có tổng hợp trong nhóm "Chăn nuôi" ở báo cáo Q1/2026) — nêu rõ trong Báo cáo 2 mục IV.
- cafef quý không có dòng EPS riêng lẻ theo quý (chỉ EPS FY2025 annual có số) — không suy diễn/nội suy EPS quý.

**Status:** DONE
