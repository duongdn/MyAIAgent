# VN Bank Rates — Online Rate Investigation Progress

**Date:** 2026-05-20  
**Status:** In progress — stopped to continue from home

---

## What's Done ✅

### Skill created & working
- **Skill:** `~/.claude/skills/vn-bank-rates/`
- **Slash command:** `/vn-bank-rates` → `.claude/commands/vn-bank-rates.md`
- **Main script:** `~/.claude/skills/vn-bank-rates/scripts/fetch-vn-bank-rates.py`
- **Online scraper:** `~/.claude/skills/vn-bank-rates/scripts/scrape-online.js`
- **Tests:** 9 unit tests, all passing

### ACB online scraper FIXED (was returning wrong data)
- **Bug:** Old scraper read Table 2 (counter savings, "TK Phúc An Lộc" column) instead of Table 4 ("Tiền gửi Online")
- **Root cause:** ACB's Table 4 structure is transposed — rows = deposit tiers, cols = maturity terms. Old approach (rows=terms, cols=tiers) was wrong.
- **Fix:** Find table with "Tiền gửi Online" in its header cells → find term-header row → map col idx → field → read first data row

**Correct ACB online rates (< 200M VND tier):**
| 1 tháng | 3 tháng | 6 tháng | 12 tháng |
|---------|---------|---------|----------|
| 4.5% | 4.7% | 4.9% | 5.7% |

(Was incorrectly showing: 4.2%, 4.55%, 4.65%, 5.3% — those were counter rates)

### Sheet format
- Columns: A=bank name, B=1 tháng, C=3 tháng, D=6 tháng, E=1 năm, F=Loại (Online/Tại quầy)
- Appends a date-header row then bank rows each run

---

## Current Problem ❌

**User wants ONLY online rates** — but most banks don't expose online rates on their public websites.

### What was tried (all failed or returned counter/no data):
| Bank | URL tried | Result |
|------|-----------|--------|
| VCB | `vietcombank.com.vn/...Lai-suat` | Counter rates only (2.1% for 1M). App shows 4.75% but it's app-only. |
| TPBank | `tpbank.vn/...` | **Navigation timeout on ALL URLs** — site blocks headless Chrome |
| MB Bank | `mbbank.com.vn/ca-nhan/...` | JS SPA, no rate data in rendered HTML |
| Techcombank | `techcombank.com.vn/...` | JS SPA, 6 tables but no rates visible |
| VPBank | `vpbank.com.vn/...` | JS SPA, no tables, no rates |
| SHB | `shb.com.vn/ca-nhan/lai-suat` | Rates are PDFs, not HTML |
| HDBank | `hdbank.com.vn/...` | JS SPA, no data |
| Sacombank | `sacombank.com.vn/...` | JS SPA, no tables |
| MSB | `msb.com.vn/ca-nhan/lai-suat` | Shows loan rate averages, not deposit rates |
| cafef.vn | `/lai-suat.chn` | Page removed |
| vietstock.vn | `/lai-suat-ngan-hang` | Routes to stock ticker page, not bank rates |
| moneylover.vn | `/lai-suat` | 404 |
| tracuulaisuat.com.vn | — | DNS not found |

### Why most banks fail:
1. **React/Vue SPAs** that load rate data via JS after page render — `networkidle2` + 8-10s wait not enough
2. **PDF-based rate tables** (SHB, others) — can't parse
3. **App-only online rates** (VCB) — 4.75% for 1M is only in VCB Digibank app
4. **Cloudflare/bot protection** (TPBank) — blocks headless Chrome entirely

---

## Key Findings

### simplize.vn bank list (20 banks — all COUNTER rates):
Vietcombank, VietinBank, BIDV, Agribank, MBBank, VPBank, VIB, TPBank, OCB, MSB,  
Bắc Á Bank, PG Bank, Viet Capital Bank, Saigonbank, Bảo Việt Bank, GPBank, Ocean Bank, PVcomBank, SCB, SeABank  
**Note: ACB and Techcombank are NOT in simplize.vn's list**

### ACB table structure (critical for scraper):
```
Table 4 — "Tiền gửi Online"
Header row 1: [Mức gửi/ TK, Tiền gửi Online (triệu VND)]  ← merged cells
Header row 2: [triệu VND, 1-3 tuần, 1 tháng, 2 tháng, 3 tháng, 6 tháng, 9 tháng, 12 tháng]
Data row 1:   [< 200, 0.50, 4.50, 4.60, 4.70, 4.90, 5.10, 5.70]
Data row 2:   [200-<1000, (empty), 4.60, 4.70, 4.75, 5.00, 5.20, 5.80]
Data row 3:   [1000-<5000, (empty), 4.65, 4.75, 4.75, 5.05, 5.25, 5.85]
Data row 4:   [>=5000, (empty), 4.75, 4.75, 4.75, 5.10, 5.30, 5.90]
```

---

## What Needs To Be Done Next

### Option A (simplest): Only show confirmed online rates
- Remove simplize.vn counter-rate banks from output
- Sheet only shows ACB (and any future confirmed banks)
- Update `fetch_rates()` to filter `source == "online"` only

### Option B (better): Find more banks with scrapeable online rates
Candidates not yet tried properly:
- `laisuat.vn` or `bankseka.vn` — might aggregate online rates
- Individual bank "tiết kiệm online" product pages with different URLs
- Check if any VN banks have `__NEXT_DATA__` with online rates (like simplize.vn pattern)
- Try with stealth puppeteer / different user agent for TPBank

### Option C (manual): Let user configure per-bank rates
- Add a config file where user can manually set rates for banks without scrapeable pages
- Combine with scraped data

---

## Files to Be Aware Of

```
~/.claude/skills/vn-bank-rates/
├── SKILL.md                          ← skill reference
├── scripts/
│   ├── fetch-vn-bank-rates.py        ← main script (merge online + counter)
│   ├── scrape-online.js              ← Puppeteer online rate scraper (ACB only)
│   └── test_fetch_vn_bank_rates.py   ← 9 unit tests (all pass)
└── .env.example

~/projects/My-AI-Agent/scripts/
├── probe-bank-online-rates.js        ← temp probe script (can delete)
└── probe-bank-api-rates.js           ← temp probe script (can delete)
```

**Temp probe scripts to clean up:** `probe-bank-online-rates.js`, `probe-bank-api-rates.js`

---

## Run Command

```bash
python3 ~/.claude/skills/vn-bank-rates/scripts/fetch-vn-bank-rates.py
```

Target sheet: `1kc4ujAC77XYOHooJDiRCE8rIAkXRa7p8BWuAOFrikTk` → "Lãi suất ngân hàng"
