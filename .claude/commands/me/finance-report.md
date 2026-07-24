---
description: Focus watchlist valuation check (FPT, VEA) + P/B < 1 screening across Top 100 tracked stocks
---

# Finance Report

## Utils

| Util | When | Params |
|------|------|--------|
| `/util:report` | Every piece output | `reports/{YYYY-MM-DD}/{HHMM}-finance-{type}.md` |

## Config

`config/finance-watchlist.json` — tracked tickers + their Google Sheet IDs/report-tab names + `top100_spreadsheet_id`/`top100_sheet`. **Add new tickers here, not in this file.** Not a secret (sheet IDs only, no credentials) — tracked in git (see `.gitignore` exception).

**Google Sheets auth:** service account `config/daily-agent-490610-7eb7985b33e3.json`, scope `https://www.googleapis.com/auth/spreadsheets`. Same account used to build the FPT/VEA analysis sheets — read-only access is enough for this skill.

---

## Quick Reference

| Command | What it does | Output file |
|---------|--------------|-------------|
| `/finance-report` | Full run — Focus + PB Low | both pieces, one combined report |
| `/finance-report focus` | Live valuation check on watchlist tickers | `{HHMM}-finance-focus.md` |
| `/finance-report pb-low` | Scan Top 100 sheet for P/B < 1 | `{HHMM}-finance-pblow.md` |

---

## Piece 1 — Focus (`/finance-report focus`)

For each ticker in `config/finance-watchlist.json` → `watchlist`:

1. **Live quote**: fetch current price/valuation from vietstock.vn's public chart API — **no login required, do not use the paid `KQKD_GetListReportData` endpoint** (returns `RequestUpgradeAccount_Permission`, confirmed during the VEA report build):
   ```
   POST https://finance.vietstock.vn/FinanceChartPage/GetListChart_Page_Mapping_ByStockCode_Full
   Body: stockCode={TICKER}&chartPageId=0&isCatch=true&languageId=1
   (+ __RequestVerificationToken from the page's cookies — load {vietstock_url} first via Puppeteer to get a session, see scripts pattern used for VEA)
   ```
   Response `data.InfoChartDetail` is a flat array of `{ReportNormName, NormTerm, Value, Unit}`. Pull `NormTerm` starting with `N/` (annual) for the latest year, or the site's own quote header for live price/P-E/P-B if simpler. Relevant `ReportNormName` values: `Chỉ số giá thị trường trên thu nhập (P/E)`, `Chỉ số giá thị trường trên giá trị sổ sách (P/B)`.
   - If the live fetch fails (site structure change, rate limit), fall back to reading the last-known valuation straight from the ticker's `report_sheet` (section "III. ĐỊNH GIÁ HIỆN TẠI") and flag it as stale in the output — do not fabricate a live number.

2. **Stored baseline**: read the "III. ĐỊNH GIÁ HIỆN TẠI" table from `{spreadsheet_id}` → `{report_sheet}` (both FPT's and VEA's `Báo cáo 2` sheets use this exact section heading) for the P/E, P/B, giá CP recorded when the report was last built.

3. **Compare & flag**:
   - P/E or P/B moved **>10%** since baseline → note direction
   - Current P/E ≤ 15 and P/B ≤ 1.5 → "rẻ theo ngưỡng Graham"; else note which threshold is breached
   - Pull the "Rủi ro chính" bullet from the report's "I. TỔNG QUAN DOANH NGHIỆP" section as a one-line reminder — do not re-research it, just quote what's already there

4. **Output** (`{HHMM}-finance-focus.md`):
   ```markdown
   # Finance Focus — {YYYY-MM-DD} {HH:MM}

   ## {TICKER} — {name}
   | | Lúc phân tích (sheet) | Hiện tại (live) | Chênh lệch |
   |-|------------------------|------------------|------------|
   | Giá CP | ... | ... | ... |
   | P/E | ... | ... | ... |
   | P/B | ... | ... | ... |

   Đánh giá: {rẻ/đắt theo Graham, ĐẠT/KHÔNG ĐẠT}
   Rủi ro chính (từ báo cáo): {quoted bullet}
   ...
   ```
   Repeat per ticker. If a ticker's live fetch failed, say so explicitly instead of reusing old numbers silently.

---

## Piece 2 — PB Low (`/finance-report pb-low`)

1. Read `top100_spreadsheet_id` / `top100_sheet` from config (currently `'Top 100'` tab, columns: Mã | Ngành | Vốn hóa | ROE | ROA | P/E | P/B | ...).
2. Filter rows where P/B (column G) < 1. Sort ascending by P/B.
3. Cross-reference against `watchlist` tickers — flag if any watched ticker also appears in this list.
4. **Output** (`{HHMM}-finance-pblow.md`):
   ```markdown
   # P/B < 1 Screen — {YYYY-MM-DD} {HH:MM}
   Nguồn: sheet 'Top 100', {top100_spreadsheet_id}

   | Mã | Ngành | Vốn hóa | ROE | ROA | P/E | P/B |
   |----|-------|---------|-----|-----|-----|-----|
   ...

   {N} mã trong danh sách theo dõi (Top 100) có P/B < 1.
   Trong watchlist: {liệt kê nếu có, hoặc "không có"}
   ```
5. **Do not fabricate** a P/B figure for a ticker not present in the Top 100 sheet — that ticker simply isn't screened by this piece.

---

## Full Run (`/finance-report`)

1. Run Piece 1 (Focus) for all watchlist tickers.
2. Run Piece 2 (PB Low).
3. Combine into one `reports/{YYYY-MM-DD}/{HHMM}-finance-report.md` (or keep as two files — either is fine, just don't skip one silently).

---

## Key Rules

- **Never fabricate live numbers.** If the vietstock live fetch fails, explicitly say the quote is stale (dated to when the analysis sheet was last built) rather than presenting a guessed number as current.
- **P/B < 1 screen is only as complete as the `Top 100` sheet** — it is a tracked-list of ~101 large-cap stocks, not the whole market. Say so if asked "is this all VN stocks with P/B<1" — it isn't.
- **Adding a new ticker**: append to `config/finance-watchlist.json` → `watchlist`. Requires the ticker to already have its own analysis spreadsheet (`Báo cáo 2`-style sheet with a "III. ĐỊNH GIÁ HIỆN TẠI" section) built via the same process used for FPT/VEA — this skill reads existing reports, it does not build new ones from scratch. Use `/ck:plan` + the FPT/VEA build process (research agents + Google Sheets API) to onboard a new ticker first.
- **Google Sheets write access is not needed for this skill** — read-only. Do not modify the analysis sheets from here.
