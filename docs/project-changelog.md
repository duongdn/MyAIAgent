# Project Changelog

## 2026-07-30 — Finance quantification skill + web app

**Added:**
- `/me:finance-quantification <TICKER>` — standalone định lượng (ratio analysis) skill, writes to shared spreadsheet
- `scripts/finance-quantification-build.js` — automated BCTC fetch (cafef.vn API) + live price (vietstock.vn) + Google Sheets builder
- `web-quantification/` — dedicated Express+SSE web app at `quantification.youragentstore.net` (port 3335, Basic Auth)
- `config/finance-quantification.json` — shared spreadsheet config (non-secret, tracked in git)

**Design decisions:**
- Code-resolved row indices (cafef `code` field) instead of hardcoded row numbers — handles any VAS non-financial ticker
- Banks/securities explicitly unsupported (different chart of accounts — abort with error)
- No Claude agent in the web path — spawns script directly (seconds, zero LLM cost)
- One shared spreadsheet for all tickers (tab per ticker)

**Deployment:** mpfc server — systemd `quantification-web.service`, Apache vhost with Let's Encrypt SSL, separate `.htpasswd-quantification`

## Previous (pre-changelog)

- 2026-07-27: `/me:finance-report-detail` 6-sheet equity report skill (per-ticker spreadsheets)
- 2026-07-13: mpfc server investigation, dated-script cleanup, 3-memory-store discovery
- Various: daily-report monitoring system, multi-source integration
