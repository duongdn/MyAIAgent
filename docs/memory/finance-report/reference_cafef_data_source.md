---
name: reference_cafef_data_source
description: cafef.vn is the primary data source for /me:finance-report-detail — direct public JSON API (no browser needed), discovered 2026-07-27 while building SAB
metadata:
  type: reference
---

**Best method (discovered 2026-07-27, use this first):** cafef.vn's financial-data page is backed by a public, unauthenticated JSON API — call it directly with `curl`/`fetch`, no Puppeteer/browser needed at all. Reusable script: `scripts/finance-report-detail-fetch-cafef.js <TICKER>`.

Endpoints (all take `symbol=<TICKER>`, `TypeTime=NAM` for annual or `QUY` for quarterly, `pageSize=N` for how many periods back):
- Balance sheet: `https://apiweb.cafef.vn/api/v2/BCTC/GetReportCDKT?symbol={T}&pageIndex=1&pageSize=15&reportType=ALL&TypeTime=NAM` → `value.data` = 2 sections (`TN`=Tài sản, `NV`=Nguồn vốn), each with `.data[]` = one entry per year, each year's `.data[]` = `{code, value}` rows keyed by `value.templace[section].data[].code`/`.name`.
- Income statement: `https://apiweb.cafef.vn/api/v1/BCTC/GetReportDetail?symbol={T}&pageIndex=1&pageSize=15&reportType=KQKD&TypeTime=NAM` → flat `value.data[]` per year, `value.templace[]` for row labels.
- Cash flow: **`https://apiweb.cafef.vn/api/v2/BCTC/GetReportLCTT?symbol={T}&pageIndex=1&pageSize=15&reportType=ALL&TypeTime=NAM`** (v2, nested like CDKT: `value.data[]` = 3 groups `HDKD`/`HDDT`/`HDTC`, each with its own `.data[]` per year). 🔴 **BUG (confirmed on SAB, 2026-07-27): `GetReportDetail?reportType=LCTT` (the v1 pattern used for KQKD) silently returns KQKD data instead of cash flow — do NOT use that endpoint for LCTT, always use `GetReportLCTT` v2.** `scripts/finance-report-detail-fetch-cafef.js` already does this correctly.
- Also available (not yet used): `https://apiweb.cafef.vn/api/v2/BCTC/FinancialIndicators?symbol={T}&pageIndex=1&pageSize=N` for pre-computed ratios — **treat with suspicion**: spot-checked on SAB and values looked scaled/garbled (e.g. current-year row full of 0/-1.42 noise). Prefer computing ratios yourself from the raw statements.

**Data quality note:** each year entry has `type: "HK"` (đã kiểm toán, continuous annual) or `type: "H"` (older, `content` empty, gaps in the sequence — e.g. SAB jumps 2016→2013→2012→2008). **Only keep `type==="HK"` entries** — the fetch script does this automatically. For SAB this yielded a clean, gap-free 2016-2025 (10yr) series; verified balance sheet reconciles exactly (Σassets == Σliabilities+equity) for all 10 years before use.

🔴 **Known cell-level data errors (verify, don't just trust the API blindly):** SAB's `GetReportLCTT` had the "Tiền và tương đương tiền cuối kỳ" (ending cash) value for 2019 AND 2020 each inflated by exactly +60,000,000,000,000 VND (looks like a stray leading digit typo repeated across 2 years) — caught by reconciling `đầu kỳ + trong kỳ + tỷ giá == cuối kỳ` AND cross-checking against the balance sheet's own cash line (code `110`); both checks agreed on the correct value, both disagreed with the raw API value by the same +60,000 tỷ. **Always run this reconciliation check for every new ticker** before trusting the LCTT ending-cash figures.

🔴 **EPS/per-share rows are NOT in the same unit as everything else:** balance-sheet/income-statement rows are absolute VND (divide by 1e9 for tỷ đồng), but "Lãi cơ bản/suy giảm trên cổ phiếu" (EPS, codes vary per company — found as `70`/`71` on SAB) are already đồng/CP — dividing by 1e9 silently zeroes them out. `finance-report-detail-build-raw-sheet.js` now special-cases any template row whose name matches `/trên cổ phiếu/i`.

🔴 **Share count is not static across the 10-year window — check for splits/stock dividends before computing BVPS:** SAB did a 1:1 (100%) stock dividend in 2023, doubling shares outstanding (641.28M → 1,282.56M) with par value unchanged — visible as "Vốn góp của chủ sở hữu" (row `117`) suddenly doubling at the 2023 column. Confirmed via web search (news of the 2023 bonus issue) — do NOT assume a single constant share count for BVPS across all years like the VEA build did; check the raw sheet's "Vốn góp của chủ sở hữu" row for a jump first.

**Superseded approach (keep only as last-resort fallback):** clicking through the rendered page (`https://cafef.vn/du-lieu/{exchange}/{ticker}-tai-chinh.chn#can-doi-ke-toan` etc., year-arrows, "Xuất Excel" button) via the `chrome-devtools` skill, or PDF annual-report + `pdftoppm` + vision transcription. Only needed if the API above is ever missing a ticker or a field the page shows.

**How to apply:** Step 2 of `/me:finance-report-detail <TICKER>` — run `node scripts/finance-report-detail-fetch-cafef.js <TICKER>` first. Only fall back to browser/PDF methods if the API returns no data for that symbol.
