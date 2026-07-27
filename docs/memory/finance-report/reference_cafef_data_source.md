---
name: reference_cafef_data_source
description: cafef.vn is the primary data source for /me:finance-report-detail — exact URL pattern, year-navigation, and Excel-export workflow
metadata:
  type: reference
---

User's real workflow for sourcing multi-year BCTC data for a ticker, used by [[project_finance_report_detail_skill]]:

1. Financial data page: `https://cafef.vn/du-lieu/{exchange}/{ticker-lowercase}-tai-chinh.chn` — `{exchange}` = `hose`/`hnx`/`upcom` per listing. Example SAB (HOSE): `https://cafef.vn/du-lieu/hose/sab-tai-chinh.chn`.
2. Three sections on the same page via `#` anchor: `#can-doi-ke-toan` (balance sheet), `#ket-qua-kinh-doanh` (income statement), `#luu-chuyen-tien-te` (cash flow).
3. Each section has arrow buttons to page through years — **must click arrows to align the exact year range per section**; sections do not auto-sync years with each other. Some sections split into sub-tables (e.g. assets vs. liabilities) that each need independent year-alignment too.
4. Each section has an "Xuất Excel" button that downloads a `.xlsx` file with the currently-selected year range.
5. Page is JS-rendered/interactive (search combobox, year arrows, export button) — plain `WebFetch` won't see rendered content or trigger the export. Must use the `chrome-devtools` skill (Puppeteer) to navigate and click.
6. Parse the downloaded Excel with Python (`pandas`/`openpyxl` via `.claude/skills/.venv/bin/python3`) instead of hand-transcribing — avoids transcription error.

**Why:** User demonstrated this exact click-path (2026-07-27) as their standard method for building the FPT/VEA-style 6-sheet reports, superseding the earlier ad-hoc "search for annual report PDF" approach as the primary path. PDF+`pdftoppm`+vision transcription (see [[project_finance_report_detail_skill]]) remains the fallback only when cafef is missing older years or shows anomalous figures.

**How to apply:** Use this as Step 2 of `/me:finance-report-detail <TICKER>` — try cafef.vn first via chrome-devtools, fall back to PDF annual report only if data is missing/contradictory.
