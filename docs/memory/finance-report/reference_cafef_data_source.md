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
- Cash flow: same as above with `reportType=LCTT`.
- Also available (not yet used): `https://apiweb.cafef.vn/api/v2/BCTC/FinancialIndicators?symbol={T}&pageIndex=1&pageSize=N` for pre-computed ratios.

**Data quality note:** each year entry has `type: "HK"` (đã kiểm toán, continuous annual) or `type: "H"` (older, `content` empty, gaps in the sequence — e.g. SAB jumps 2016→2013→2012→2008). **Only keep `type==="HK"` entries** — the fetch script does this automatically. For SAB this yielded a clean, gap-free 2016-2025 (10yr) series; verified balance sheet reconciles exactly (Σassets == Σliabilities+equity) for all 10 years before use.

**Superseded approach (keep only as last-resort fallback):** clicking through the rendered page (`https://cafef.vn/du-lieu/{exchange}/{ticker}-tai-chinh.chn#can-doi-ke-toan` etc., year-arrows, "Xuất Excel" button) via the `chrome-devtools` skill, or PDF annual-report + `pdftoppm` + vision transcription. Only needed if the API above is ever missing a ticker or a field the page shows.

**How to apply:** Step 2 of `/me:finance-report-detail <TICKER>` — run `node scripts/finance-report-detail-fetch-cafef.js <TICKER>` first. Only fall back to browser/PDF methods if the API returns no data for that symbol.
