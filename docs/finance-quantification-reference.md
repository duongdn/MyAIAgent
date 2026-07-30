# Finance Quantification — Reference

> Built 2026-07-30. Standalone ratio analysis for any VAS non-financial ticker.

## Quick access

| What | Where |
|------|-------|
| **Web UI** | https://quantification.youragentstore.net |
| **Login** | `quant` / `R2KL3YbsQkCvpL4` |
| **Spreadsheet** | https://docs.google.com/spreadsheets/d/1uiahfXv8pIjgXYtddgNXcwHQF8BHmLQfcj3knXwIQZo/edit |
| **CLI** | `node scripts/finance-quantification-build.js <TICKER>` |
| **Claude skill** | `/me:finance-quantification <TICKER>` |

## How it works

```
TICKER ──► cafef.vn API (CDKT+KQKD+LCTT, annual+quarterly)
        ──► vietstock.vn (live price, market cap → derived shares)
        ──► Google Sheets: 1 tab "<TICKER>" with raw rows + ratio formulas
```

- Tab name = ticker only (e.g., "SAB", "FPT", "FOX")
- Row groups with collapse for empty/inactive detail rows
- Section headers bold + gray background, frozen row 1
- All formulas = sheet references (not hardcoded numbers)
- Row indices resolved by cafef `code` (270=total assets, 400=equity, etc.)
- Banks/securities → abort with UNSUPPORTED_CHART_OF_ACCOUNTS
- No Claude agent in web path — script runs directly (seconds)

## Server (mpfc)

| Detail | Value |
|--------|-------|
| Port | 3335 |
| systemd | `quantification-web` |
| htpasswd | `/etc/apache2/.htpasswd-quantification` |
| SSL | Let's Encrypt, auto-renew |
| Config | `config/finance-quantification.json` (tracked in git) |
| Auth creds | `config/.quantification-auth.json` (encrypted, NOT in git) |

### Management

```bash
ssh mpfc.mpfc.live
sudo systemctl status quantification-web
sudo systemctl restart quantification-web
sudo journalctl -u quantification-web -f
```

## Code locations

| File | Purpose |
|------|---------|
| `scripts/finance-quantification-build.js` | Core builder (fetch → resolve → write) |
| `.claude/commands/me/finance-quantification.md` | Skill command definition |
| `web-quantification/server.js` | Express SSE server |
| `web-quantification/public/index.html` | Frontend |
| `config/finance-quantification.json` | Shared spreadsheet ID |

## Ticker examples

| Ticker | Status | Notes |
|--------|--------|-------|
| FPT | ✓ working | HOSE, VAS-standard |
| VEA | ✓ working | UPCOM, VAS-standard |
| SAB | ✓ working | HOSE, VAS-standard |
| FOX | ✓ working | UPCOM, VAS-standard |
| VCB | ✗ unsupported | Bank — different chart of accounts |
| SSI | ✗ unsupported | Securities — different KQKD template |
