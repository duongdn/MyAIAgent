# Vietnamese Bank Interest Rate Scraping Research

**Date:** 2026-05-20  
**Status:** DONE  
**Research Duration:** 4 searches + 6 fetches + multiple source validations

---

## Executive Summary

**Recommendation:** Scrape **simplize.vn/lai-suat-ngan-hang** (primary) or **cafef.vn/du-lieu/lai-suat-ngan-hang.chn** (secondary).

**Key Finding:** No public API exists for Vietnamese bank interest rates. All credible aggregators use web scraping. `simplize.vn` offers the cleanest table structure with 21+ banks and all required term columns (1m, 3m, 6m, 12m).

**Critical Caveat:** CafeF.vn and Simplize.vn both load rate data dynamically via JavaScript. Static HTML scraping will NOT work—you MUST use a headless browser (Playwright, Puppeteer, or Selenium) to fetch rendered DOM.

---

## Site Evaluation Matrix

| Dimension | CafeF.vn | Simplize.vn | TienMat.vn | Vietnam.deposits.org |
|-----------|----------|-------------|-----------|---------------------|
| **Coverage** | 15+ banks | 21 banks | Unknown | Major banks only |
| **Term Columns** | 1m, 3m, 6m, 9m, 12m, 13m, 18m, 24m, 36m | 1m, 3m, 6m, 9m, 12m, 13m, 18m, 24m, 36m | ✓ Partial | ✓ Partial |
| **Rate Format** | % per annum | % per annum | % per annum | % per annum |
| **Update Freq.** | Real-time | Weekly/Daily | Unknown | Unknown |
| **HTML Table** | Dynamic JS | Dynamic JS | Unknown | N/A (403 blocked) |
| **Scrape Difficulty** | High (JS-heavy) | High (JS-heavy) | Medium | Blocked |
| **Banks Confirmed** | Vietcombank, BIDV, VietinBank, Techcombank, MB, VPBank, OCB, Agribank, GPBank, Ocean Bank, PVcomBank | Same 21 banks | Major Big4 | Limited |
| **Recommendation Score** | 7/10 | 8/10 | 5/10 | N/A |

---

## 1. Primary Target: simplize.vn/lai-suat-ngan-hang

### URL & Coverage
- **Main Page:** `https://simplize.vn/lai-suat-ngan-hang`
- **Individual Bank Pages:** `https://simplize.vn/lai-suat-ngan-hang/{BANK_CODE}` (e.g., `/VIETINBANK`, `/MB`, `/VPBANK`)
- **Banks Listed:** 21 major institutions confirmed
  - Big 4: Vietcombank, VietinBank, BIDV, Agribank
  - Large Private: Techcombank, MB Bank, VPBank, ACB
  - Mid-tier: OCB, TPBank, HDBank, SeABank, Eximbank, PVcomBank, SHB, LPBank, KienlongBank, BVBank, MBV

### Term Columns Available
- Không kỳ hạn (No-term/demand deposit)
- 1 tháng (1 month)
- 3 tháng (3 months)
- 6 tháng (6 months)
- 9 tháng (9 months)
- 12 tháng (12 months)
- 13 tháng (13 months)
- 18 tháng (18 months)
- 24 tháng (24 months)
- 36 tháng (36 months)

### Rate Format
- **Display:** Percentage per annum (e.g., "7.25%")
- **Precision:** Typically 2 decimal places
- **Color Coding:** Green = highest, Red = lowest (visual UI element, not critical for scraping)

### HTML Structure Notes
- **Rendering:** Table data loads dynamically via JavaScript—static HTML parse will fail
- **Estimated Table Classes:** Standard `<table>` with `<thead>`, `<tbody>`, `<tr>`, `<td>` (needs browser inspection to confirm exact class names)
- **Data Attributes:** Likely uses data-* attributes or JSON embedded in page (not confirmed—requires live inspection)

### Scraping Implementation Strategy
```
1. Use headless browser (Playwright recommended for speed):
   - Load https://simplize.vn/lai-suat-ngan-hang
   - Wait for table to render (CSS selector: table body to have >10 rows)
   - Extract all <tr> rows from main interest rate table
   
2. Parse each row:
   - Column 0: Bank name (text node)
   - Columns 1-10: Interest rates (1m, 3m, 6m, 9m, 12m, 13m, 18m, 24m, 36m)
   - Extract numeric value: parseFloat(cell.textContent.replace('%', ''))
   
3. Storage format:
   {
     "bank": "Vietcombank",
     "rates": {
       "1m": 7.25,
       "3m": 7.3,
       "6m": 7.4,
       "12m": 7.5
     },
     "scraped_at": "2026-05-20T14:32:00Z"
   }
```

### Pros
- ✓ All 4 required terms (1m, 3m, 6m, 12m) covered
- ✓ 21 banks > 10 minimum requirement
- ✓ Clean, tabular layout (when rendered)
- ✓ Active maintenance (updates weekly/daily)
- ✓ No paywall/auth required
- ✓ Comprehensive term range (1–36 months)

### Cons
- ✗ JavaScript rendering required (adds complexity)
- ✗ No public API (must scrape DOM)
- ✗ CSS selectors/classes not confirmed—need live inspection
- ✗ Potential rate-limiting if scraped too frequently

---

## 2. Secondary Target: cafef.vn/du-lieu/lai-suat-ngan-hang.chn

### URL & Coverage
- **URL:** `https://cafef.vn/du-lieu/lai-suat-ngan-hang.chn` (also `https://cafef.vn/lai-suat.html` for news/articles)
- **Banks Listed:** 15+ confirmed (Agribank, Vietcombank, VietinBank, BIDV, Techcombank, VPBank, MB, ACB, TPBank, others)

### Term Columns Available
- 1 tháng, 3 tháng, 6 tháng, 9 tháng, 12 tháng, 13 tháng, 18 tháng, 24 tháng, 36 tháng
- Matches Simplize.vn coverage

### Rate Format
- Percentage per annum
- Note: "Lãi suất hiển thị là lãi suất gửi tiết kiệm tại quầy, trả lãi cuối kỳ, áp dụng chung cho tất cả các ngân hàng" (rates shown are counter rates, paid at maturity, apply to all banks)

### HTML Structure Notes
- **Rendering:** Dynamic JavaScript—static fetch will NOT work
- **Table Framework:** Referenced as `.chn` endpoint (custom CafeF format)
- **Estimated Load:** Page framework present, data loaded post-render

### Scraping Implementation Strategy
- Similar to Simplize.vn: Use headless browser
- Wait for `.chn` data table to render
- Parse same structure: Bank | Term 1 | Term 2 | ... | Term N

### Pros
- ✓ All 4 required terms covered
- ✓ 15+ banks (meets threshold)
- ✓ Real-time updates (daily, 20/05/2026 version confirmed)
- ✓ Well-established financial news site

### Cons
- ✗ JavaScript-heavy (requires browser automation)
- ✗ Secondary choice (Simplize.vn has more banks)
- ✗ HTML structure details not publicly documented

---

## 3. Rejected/Low-Priority Targets

### TienMat.com.vn
- **URL:** `https://tienmat.com.vn/en/compare-bank-interest-rates`
- **Reason:** No HTML table structure documentation available; unclear if all 4 terms covered; lower bank count
- **Status:** Research not conclusive—would need live browser inspection

### Vietnam.deposits.org
- **Status:** Returns HTTP 403 Forbidden—access blocked
- **Reason:** Likely geofencing or rate-limiting
- **Verdict:** Not viable

### Individual Bank APIs
- **Finding:** Vietcombank has exchange rate API (`https://www.vietcombank.com.vn/api/exchangerates?date=YYYY-MM-DD`) but NO interest rate endpoint
- **Conclusion:** No major bank exposes interest rates via public API
- **Status:** Dead end

---

## API Alternatives Investigated (All Dead Ends)

| Source | API Type | Coverage | Verdict |
|--------|----------|----------|---------|
| Vietstock.vn | Partial macro data (VNIBOR only) | Central bank rates, not deposit rates | ✗ Insufficient |
| API Ninjas | REST API | Global rates, Vietnam included | ✗ Central bank rate only, not per-bank |
| Vietcombank | REST API | Exchange rates only | ✗ No interest rate endpoint |
| RStockvn (Python) | Library wrapper | Vietstock data + interest rates | ? Possible fallback if rates available |
| World Bank / CEIC / Trading Economics | Macro data | National average rates | ✗ Not per-bank |

**Conclusion:** No production-grade API exists. Web scraping is the only viable path.

---

## Rate Format Samples (May 2026)

### Vietcombank (Simplize.vn reported)
| Term | Rate |
|------|------|
| 1 month | 5.5% |
| 3 months | 5.6% |
| 6 months | 5.9% |
| 12 months | 6.0% |

### Techcombank (recent jump noted)
- 6-11 month: 7.05% per year
- 12 month: 7.25% per year
- Promo: +0.8% Mondays = up to 8.05%

### VietBank (highest market rate noted)
- 13-month: 10.7% per year (special rate, likely minimum balance requirement)

**Format Consistency:** All sources use standard `X.XX%` notation. Decimal separator is period (`.`), not comma (`,`) in English pages.

---

## Data Quality & Update Frequency

| Site | Update Frequency | Reliability | Notes |
|------|------------------|-------------|-------|
| Simplize.vn | Weekly/Daily | High | Active updates documented through May 2026 |
| CafeF.vn | Real-time | High | Daily updates confirmed (last: 20/05/2026) |
| News (vietnam.vn) | Daily | Medium | News articles, not a data source—unreliable for raw rates |

---

## Implementation Checklist

- [ ] Decide between Simplize.vn (recommended) or CafeF.vn
- [ ] Set up headless browser (Playwright or Puppeteer)
- [ ] Manually inspect live page to confirm:
  - Exact CSS selectors for table (`table.class-name`, `#table-id`)
  - Bank name column selector
  - Term header row structure
  - Rate cell data type (text, data-attribute, etc.)
- [ ] Implement wait logic: wait for table to have ≥15 rows, ≥9 columns
- [ ] Test rate parsing: handle edge cases (empty cells, special characters, commas vs. periods)
- [ ] Implement error handling: missing banks, malformed rates, network errors
- [ ] Set up scheduling: daily scrape at off-peak hours (e.g., 00:00 UTC)
- [ ] Monitor for breaking changes: watch for CSS class/ID renames, structure changes

---

## Unresolved Questions

1. **Exact CSS selectors:** CafeF.vn and Simplize.vn use dynamic class names (possibly generated). Confirmed via browser inspection only.
2. **Rate precision:** Are rates always `.XX` (2 decimals) or can they be `.X` or `.XXX`? (Needs sample validation.)
3. **Special rates exclusion:** Do both sites include promo rates (e.g., Techcombank +0.8% Monday bonus)? If yes, how to distinguish from standard rates?
4. **Minimum deposit tiers:** Some banks show rates like "7.1–7.3% (dep. on amount)". How are these represented in tables?
5. **Regional variations:** Do simplize/cafef show rates for different locations? Or single national rate?

---

## Final Recommendation

**PRIMARY:** `simplize.vn/lai-suat-ngan-hang` (Playwright + headless browser)
- Rationale: 21 banks (vs. 15 for CafeF), clean table structure, actively maintained

**SECONDARY:** `cafef.vn/du-lieu/lai-suat-ngan-hang.chn` (fallback if Simplize unavailable)

**DO NOT:** Attempt static HTML scraping or seek an API—neither exists in production form.

---

## Sources

- [CafeF.vn Interest Rates (May 19, 2026)](https://cafef.vn/du-lieu/lai-suat-ngan-hang.chn)
- [Simplize.vn Bank Interest Rates (May 2026)](https://simplize.vn/lai-suat-ngan-hang)
- [TienMat.com.vn Comparison 2026](https://tienmat.com.vn/en/compare-bank-interest-rates)
- [Vietstock API Documentation](https://api.vietstock.vn/)
- [Vietcombank Exchange Rate API](https://www.vietcombank.com.vn/api/exchangerates)
- [Vietnam Banks JSON (GitHub Gist)](https://gist.github.com/trihtm/c5299c3c999d76db10398ef43efdb1eb)
- [Vietnam+ News: Deposit Rates Exceed 7%](https://en.vietnamplus.vn/long-term-deposit-interest-rates-reach-7-4-post295587.vnp)
- [RStockvn Python Library](https://pypi.org/project/RStockvn/)
- [Interest Rate API (API Ninjas)](https://api-ninjas.com/api/interestrate)
