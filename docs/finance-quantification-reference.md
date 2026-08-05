# Finance Quantification — Reference

> Built 2026-07-30, updated 2026-08-04 (quarterly columns added). Raw BCTC dump for any ticker.

## Quick access

| What | Where |
|------|-------|
| **Web UI** | https://quantification.youragentstore.net |
| **Login** | `quant` / `R2KL3YbsQkCvpL4` |
| **Spreadsheet** | https://docs.google.com/spreadsheets/d/1uiahfXv8pIjgXYtddgNXcwHQF8BHmLQfcj3knXwIQZo/edit |
| **CLI** | `node scripts/finance-quantification-build.js <TICKER>` (DuongDN only) |

## How it works

```
TICKER ──► cafef.vn API (CDKT+KQKD+LCTT, TypeTime=NAM annual + TypeTime=QUY quarterly)
        ──► FireAnt fallback (api.fireant.vn) when cafef data is absent/<3 audited years
        ──► Google Sheets: 1 tab "<TICKER>" with raw rows only (no ratios/formulas)
```

- Tab name = ticker only (e.g., "SAB", "FPT", "FOX")
- Columns: all audited annual years + last `max_quarters` quarters, left→right
- Section order: Tài sản → Nguồn vốn → Kết quả kinh doanh → Lưu chuyển tiền tệ
- Row groups (collapsed by default) under each Roman-numeral sub-header; KQKD/LCTT sections get one group for their whole body
- EPS rows ("Đồng/1 cổ phiếu") are NOT divided by 1e9 — kept as raw đồng, unlike all other rows which are tỷ đồng
- Balance check (270 vs 440) runs on annual data only, tolerance 10M VND (cafef only; FireAnt checks TotalAsset==TotalCapital)
- No restriction on ticker type — banks/securities dumped as-is, whatever the source returns
- No Claude agent in web path — script runs directly (seconds)
- **View-only Google Sheets access cannot expand/collapse row groups** — documented in the "Info" tab; users must File → Make a copy for that.

### FireAnt fallback (`scripts/finance-fireant.js`)

Used when cafef returns <3 audited years or errors. Auth = the public anonymous JWT embedded in fireant.vn's web bundle, auto-extracted on demand and cached in `config/.fireant-token.json` (gitignored). Endpoint: `GET https://api.fireant.vn/symbols/{T}/financial-data?type=balanceSheet&count=60` → per-period `financialValues` (419 fields, superset incl. insurance/securities-specific). FireAnt rows are mapped to VAS Vietnamese labels in the module. Force with CLI arg `--fireant`.

⚠️ **FireAnt LCTT is aggregate-only** — only 5 rows (operating/investing/financing totals + beginning/end cash). FireAnt's API does not expose the ~37 granular LCTT items that cafef provides. So: **always prefer cafef** — only use FireAnt when cafef genuinely has no data. Note: BVH (long suspected of being incomplete on cafef) is actually COMPLETE on cafef (68-row insurance CDKT + 54-row insurance KQKD + 37-row LCTT) — verify per-ticker instead of assuming.

## Config

`config/finance-quantification.json`:
```json
{
  "shared_spreadsheet_id": "...",
  "tab_prefix": "",
  "max_years": 15,
  "max_quarters": 8
}
```

## Server (mpfc)

| Detail | Value |
|--------|-------|
| Port | 3335 |
| systemd | `quantification-web` |
| htpasswd | `/etc/apache2/.htpasswd-quantification` |
| SSL | Let's Encrypt, auto-renew |

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
| `web-quantification/server.js` | Express SSE server |
| `web-quantification/public/index.html` | Frontend |
| `config/finance-quantification.json` | Shared spreadsheet ID + fetch limits |

## Ticker examples

| Ticker | Status |
|--------|--------|
| FPT, VEA, SAB, FOX | ✓ working |
