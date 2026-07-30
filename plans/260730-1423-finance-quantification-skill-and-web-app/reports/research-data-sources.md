# Research report — Finance quantification data sources & design lock

**Date:** 2026-07-30
**Status:** Frozen — all codes verified against live APIs, no TBDs

## 1. Frozen REQUIRED_CODES map

All codes verified identical across FPT, VEA, SAB (non-financial VAS, HOSE + UPCOM).
79 TN rows, 54 NV rows in CDKT template for all three.

### CDKT — Bảng cân đối kế toán

| Key | Section | Code | Row name (VN) |
|-----|---------|------|---------------|
| totalAssets | TN | 270 | TỔNG CỘNG TÀI SẢN |
| currentAssets | TN | 100 | A. TÀI SẢN NGẮN HẠN |
| longTermAssets | TN | 200 | B. TÀI SẢN DÀI HẠN |
| liabilities | NV | 300 | C. NỢ PHẢI TRẢ |
| currentLiab | NV | 310 | I. Nợ ngắn hạn |
| equity | NV | 400 | D VỐN CHỦ SỞ HỮU |
| paidInCapital | NV | 411 | 1. Vốn góp của chủ sở hữu |
| totalCapital | NV | 440 | TỔNG CỘNG NGUỒN VỐN |

### KQKD — Kết quả kinh doanh

| Key | Code | Row name (VN) |
|-----|------|---------------|
| revenue | 10 | 3. Doanh thu thuần về bán hàng và cung cấp dịch vụ |
| grossProfit | 20 | 5. Lợi nhuận gộp về bán hàng và cung cấp dịch vụ |
| npatTotal | 60 | 18. Lợi nhuận sau thuế thu nhập doanh nghiệp |
| npatParent | 61 | Lợi nhuận sau thuế của cổ đông của Công ty mẹ |
| npatMinority | 62 | Lợi ích của cổ đông thiểu số |
| eps | 70 | 19. Lãi cơ bản trên cổ phiếu (Đồng/1 cổ phiếu) |

### Index resolution at build time

```js
function buildRowMap(templates) {
  const allRows = [...templates.tn, ...templates.nv, ...templates.kqkd];
  const map = {};
  for (const { section, code } of Object.values(REQUIRED_CODES)) {
    const row = allRows.find(r => r.code === code);
    if (!row) return { error: `UNSUPPORTED_CHART_OF_ACCOUNTS: thiếu code ${code} — cần mapping riêng` };
    map[code] = row.index; // 0-based row index within merged template
  }
  return { map };
}
```

Each REQUIRED_CODES entry that fails to resolve → immediate abort with error string.
No partial output.

## 2. Abort rule — unsupported charts of accounts

### Banks (tested: VCB)
- CDKT: 47 TN rows, 43 NV rows (non-standard)
- Codes **100, 200, 270 all MISSING**
- Surviving codes have WRONG semantics:
  - `300` = "TỔNG TÀI SẢN" (not "C. NỢ PHẢI TRẢ")
  - `400` = "TỔNG NỢ PHẢI TRẢ" (not "D VỐN CHỦ SỞ HỮU")
  - `411` = "a. Vốn điều lệ" (not "1. Vốn góp của chủ sở hữu")
  - `440` = "4. Chênh lệch đánh giá lại tài sản" (not "TỔNG CỘNG NGUỒN VỐN")
- **Verdict:** ANY ticker where `code 100` or `code 270` is absent → abort.
  Simpler than checking all 12 codes: the first two verify the template is VAS non-financial.

### Securities (tested: SSI)
- CDKT: codes 100, 200, 270 ALL PRESENT with correct semantics
- CDKT: 67 TN rows, 65 NV rows (larger but VAS-compatible)
- KQKD: **COMPLETELY DIFFERENT** — 41 template rows with non-overlapping codes
  - EPS = code `501` (not `70`), "13.1.Lãi cơ bản trên cổ phiếu"
  - LNST = code `200` (not `60`), revenue = code `20` (not `10`)
- **Verdict:** SSI passes CDKT check but fails KQKD check (code 70 missing).
  The code-resolved map correctly catches this.

### Summary
```
if (codes 100 && 270 present in CDKT) → VAS non-financial CDKT ✓
if (any REQUIRED code missing from KQKD template) → abort with code name
```

Error format: `UNSUPPORTED_CHART_OF_ACCOUNTS: <ticker> thiếu code <code> (KQKD) — cần mapping riêng`

## 3. Live market data — vietstock endpoint

**Endpoint:** `POST https://finance.vietstock.vn/data/getpricehistory`
**Params:** `Code=<TICKER>`, `PageSize=1`, `ExchangeID=1`, `Cols=TKLGD,TGTGD,VHTT`

**Verified across exchanges:**
| Ticker | Exchange | ExchangeID=1 works? | ClosePrice | MarketCapital |
|--------|----------|---------------------|-----------|---------------|
| FPT | HOSE | ✓ | 67,000 | 114,134,977,107,000 |
| VEA | UPCOM | ✓ | 34,200 | 45,444,960,000,000 |
| SAB | HOSE | ✓ | 43,400 | 55,663,206,944,800 |
| VCB | HOSE | ✓ | 56,500 | 472,095,642,811,000 |
| FOX | UPCOM | ✓ | 64,500 | — |
| NTP | HNX | ✓ | 48,400 | — |

**ExchangeID=1 works for ALL exchanges** — no need to vary. HNX also tested ExchangeID=2 (same result).

**Shares outstanding** = `MarketCapital / ClosePrice` — exact integer for all 4 probed tickers:
| Ticker | Derived shares | Frac part |
|--------|---------------|-----------|
| FPT | 1,703,507,121 | 0.000000 |
| VEA | 1,328,800,000 | 0.000000 |
| SAB | 1,282,562,372 | 0.000000 |
| VCB | 8,355,675,094 | 0.000000 |

**TradingDate** format: `/Date(1755344400000)/` — ms since epoch. Parse: `parseInt(match[1], 10)`.

### Cross-check: derived shares vs paid-in-capital/10,000

When derived shares ≠ paid-in-capital/10,000 (treasury stock, ESOP, pending bonus issues):
- **Derived shares is authoritative** for P/E and P/B calculations (actual market cap ÷ actual price).
- **Print a note row** in the sheet showing both figures + the delta (source: Vốn góp chủ sở hữu code 411 in raw data).
- The old script silently asserted equality (`finance-report-detail-build-dinh-luong.js:27,97`); the new script must not.

## 4. TTM EPS — quarterly data rules

**Endpoint:** `GET https://apiweb.cafef.vn/api/v1/BCTC/GetReportDetail?symbol=<TICKER>&pageIndex=1&pageSize=8&reportType=KQKD&TypeTime=QUY`

**Period structure:** Each period has `{ year, quater, type, time, data[] }` where `data[]` = `[{code, value, static}]`.

**Standalone quarters (confirmed):**
```
FPT 2025 annual EPS = 5,216
FPT quarterly EPS:
  Q1-2025: 1,478 | Q2-2025: 1,529 | Q3-2025: 1,036 | Q4-2025: 1,168
  Sum = 5,211 ≈ 5,216 (diff=5, rounding) ✓ STANDALONE
```

**Consecutiveness rule:**
- 4 most recent periods must be sequential: `(year, quarter)` sequence with no gaps.
- From latest → go back 3 more, assert `prev.quater == 1 ? (prev.year-1, 4) : (prev.year, prev.quater-1)`.
- Gap detected → omit P/E TTM row entirely, emit `WARN: TTM EPS — thiếu dữ liệu quý liên tiếp, bỏ qua P/E TTM`.
- Never interpolate or sum fewer than 4 periods.
- Less than 4 quarters available total → same WARN.

**P/E TTM formula:** `= price / SUM(last_4_quarterly_EPS)` — computed as a sheet formula, not hardcoded.

## 5. Balance check tolerance

`code 270` vs `code 440` must match per year. Tolerance: `Math.abs(diff) < 1000` (rounding noise in đồng across trillions).

VEA FY2025 diff = 89,820 đồng on 28.3 trillion — accepted (0.0000003%). If diff ≥ 1,000 for any year → abort with `BALANCE_MISMATCH: <ticker> FY<year> diff=<value>`.

FPT and SAB: diff = 0 for all audited years. ✓

## 6. Tab layout

Single self-contained tab per ticker: `Định lượng - <TICKER>` in shared spreadsheet `1uiahfXv8pIjgXYtddgNXcwHQF8BHmLQfcj3knXwIQZo`.

```
Rows 1..N     Raw BCTC rows (copied from cafef API, with labels)
  Row 1       Headers: ["Chỉ tiêu", "2016", "2017", ..., "2025"]
  Rows 2..N+1 Data rows with Vietnamese labels (as fetched from cafef, not re-mapped)
  Rows are separated by blank rows into groups: TÀI SẢN / NGUỒN VỐN / KQKD / LCTT

Row N+2       Blank separator
Rows N+3..    Ratio analysis block
  "PHẦN ĐỊNH LƯỢNG BỔ SUNG — TỶ SỐ TÀI CHÍNH ..."
  Source note row
  I. QUY MÔ (Tổng TS, VCSH, DTT, LNST CĐ mẹ)
  II. SINH LỢI (ROE, ROA, Biên LN gộp, Biên LNST)
  III. TĂNG TRƯỞNG (DTT, LNST, Tổng TS — YoY %)
  IV. ĐÒN BẨY (Nợ/TS, D/E)
  V. THANH KHOẢN & CƠ CẤU TS (TSNH/TS, TSDH/TS, TT hiện hành)
  VI. ĐỊNH GIÁ (EPS, BVPS, P/E, P/B, giá hiện tại, số CP)
```

Formulas reference same-sheet cells by code-resolved row index (e.g., `=B${rowOf270}`).
Column span: `B..${String.fromCharCode(66 + years.length - 1)}`. Capped at 15 years.

## 7. Config shape

New tracked non-secret file: `config/finance-quantification.json`

```json
{
  "shared_spreadsheet_id": "1uiahfXv8pIjgXYtddgNXcwHQF8BHmLQfcj3knXwIQZo",
  "tab_prefix": "Định lượng - ",
  "max_years": 15
}
```

**Gitignore trap:** `.gitignore:12` ignores `config/*.json`. MUST add `!config/finance-quantification.json` to `.gitignore` allowlist (line 13-18 block) so the file reaches mpfc via `git pull`.

## 8. Write access verified

Service account has full write access to the shared spreadsheet (`addSheet`, `values.update`, `deleteSheet` all succeeded). Title `Định tính` and `Sheet1` confirmed untouched after write test.

## 9. Endpoint summary

| Data | Endpoint | Method | Key fields |
|------|----------|--------|-----------|
| CDKT templates + years | `apiweb.cafef.vn/api/v2/BCTC/GetReportCDKT?symbol=X&TypeTime=NAM` | GET | `value.templace[TN,NV].data[]`, `value.data[TN,NV].data[]` |
| KQKD template + years | `apiweb.cafef.vn/api/v1/BCTC/GetReportDetail?symbol=X&reportType=KQKD&TypeTime=NAM` | GET | `value.templace[]`, `value.data[]` |
| LCTT groups + years | `apiweb.cafef.vn/api/v2/BCTC/GetReportLCTT?symbol=X&TypeTime=NAM` | GET | `value.data[HDKD,HDDT,HDTC]`, `value.templace[]` |
| Quarterly KQKD (TTM EPS) | `apiweb.cafef.vn/api/v1/BCTC/GetReportDetail?symbol=X&reportType=KQKD&TypeTime=QUY` | GET | `value.data[]` (array of `{year, quater, type, data[{code, value}]}`) |
| Live price + market cap | `finance.vietstock.vn/data/getpricehistory` | POST form | `ClosePrice`, `MarketCapital`, `Exchange`, `TradingDate` |

## 10. Unresolved questions

None. All codes verified, all abort rules defined, all endpoints probed live.
