---
description: MISA MoneyKeeper report — login with Google, fetch dashboard data, analyze finances
---

# Money Report

Fetches and analyzes personal finance data from MISA MoneyKeeper.

**URL:** https://moneykeeperapp.misa.vn/management/dashboard
**Auth:** Google OAuth — session cached in `config/.misa-session.json` (gitignored, per-machine)
**Output:** `reports/{YYYY-MM-DD}/{HHMM}-money-report.md`

---

## Commands

| Command | What it does |
|---------|-------------|
| `/money-report` | Full fetch + analysis |
| `/money-report login` | Force re-login (clear cached session) |
| `/money-report summary` | Quick balance + net worth only |
| `/money-report transactions` | Recent transactions focus |
| `/money-report budget` | Budget vs actual spend |
| `/money-report portfolio` | Total assets + % ratio breakdown by account & category |

---

## Step 1 — Fetch Data

Run the puppeteer script to fetch dashboard data:

```bash
# Normal run (reuses session if valid, opens browser for login if not)
node scripts/misa-money-report.js

# Force fresh login (clears cached session first)
node scripts/misa-money-report.js --login
```

**What the script does:**
1. Loads saved session from `config/.misa-session.json`
2. If missing/expired → opens **headed** Chrome for Google OAuth
3. You complete the Google login in the browser window
4. Script detects redirect back to `/management/dashboard`
5. Saves new session cookies (valid ~12h)
6. Scrapes dashboard: balances, amounts, tables, cards
7. Saves screenshot to `tmp/misa-dashboard.png`
8. Outputs raw JSON to stdout

**On a new PC:** First run will always open a browser for login. After that, sessions are cached locally.

---

## Step 2 — Analyze Data

After getting the JSON output, analyze it and produce a structured report:

### Parse the raw data

The JSON contains:
- `url` — page URL (confirms which page was scraped)
- `bodyText` — full visible text (8000 chars) — primary source for parsing
- `allNumbers` — elements with amount/balance/total CSS classes
- `tableData` — table rows
- `cards` — card/widget text blocks
- `screenshotPath` — path to screenshot for visual reference

### Extract and organize

From `bodyText` and `cards`, extract:

1. **Balance / Net Worth**
   - Total balance across all accounts
   - Per-account balances (wallet, bank, etc.)

2. **This Month**
   - Total income
   - Total expenses
   - Net (income − expenses)

3. **Budget Status**
   - Categories with budgets set
   - Spent vs budget per category
   - Over-budget items (flag as ⚠️)

4. **Recent Transactions** (last 5–10)
   - Date, category, amount, note

5. **Trends** (if visible)
   - Month-over-month change
   - Top spending categories

---

## Step 3 — Write Report

Save to `reports/{YYYY-MM-DD}/{HHMM}-money-report.md`:

```markdown
# Money Report — {YYYY-MM-DD} {HH:MM}

## Net Worth / Balance
| Account | Balance |
|---------|---------|
| ...     | ...     |
**Total: X,XXX,XXX ₫**

## This Month (MM/YYYY)
| | Amount |
|-|--------|
| Income     | +X,XXX,XXX ₫ |
| Expenses   | −X,XXX,XXX ₫ |
| **Net**    | **±X,XXX,XXX ₫** |

## Budget Status
| Category | Budget | Spent | % | Status |
|----------|--------|-------|---|--------|
| ...      | ...    | ...   |...|  ✅/⚠️  |

## Recent Transactions
| Date | Category | Amount | Note |
|------|----------|--------|------|
| ...  | ...      | ...    | ...  |

## Alerts
- ⚠️ [Any over-budget categories]
- ℹ️ [Notable patterns]
```

---

## `/money-report portfolio` — Asset Ratio Report

Fetch data (same script), then produce a portfolio breakdown.

### Compute

From `bodyText` account list, extract every account and its balance. Then:

1. **Gross assets** = sum of all positive balances (VND equivalent)
2. **Total liabilities** = sum of all negative balances (absolute value)
3. **Net worth** = gross assets − liabilities
4. **% of gross** = account balance / gross assets × 100
5. **% of net** = account balance / net worth × 100
6. **USD → VND**: use exchange rate shown in Paypal entry (e.g. `6,049 $ ≈ 159,639,159 ₫` → rate = 159,639,159 / 6,049)

Group accounts by category:
- **Liquid** (Ví, vcb, Paypal — accessible immediately)
- **Savings** (Tikop, Finhay — fixed/term deposits)
- **Investment** (VCBS, FPTS, VCBF — securities/funds)
- **Debt** (VCB Visa, any negative — money owed)

### Output format

Save to `reports/{YYYY-MM-DD}/{HHMM}-money-portfolio.md`:

```markdown
# Portfolio Report — {YYYY-MM-DD} {HH:MM}

## Summary
| | Amount | % of Gross | % of Net |
|-|--------|-----------|---------|
| Gross Assets | X,XXX,XXX ₫ | 100% | — |
| Liabilities  | −X,XXX,XXX ₫ | X% | — |
| **Net Worth**| **X,XXX,XXX ₫** | — | **100%** |

## By Account
| Account | Balance (₫) | % of Gross | % of Net | Category |
|---------|------------|-----------|---------|----------|
| Paypal  | X,XXX,XXX  | XX.X%     | XX.X%   | Liquid   |
| Tikop   | X,XXX,XXX  | XX.X%     | XX.X%   | Savings  |
| ...     | ...        | ...       | ...     | ...      |
| VCB Visa| −X,XXX,XXX | XX.X%     | −XX.X%  | Debt     |

## By Category
| Category | Total (₫) | % of Gross | % of Net |
|----------|----------|-----------|---------|
| Liquid | X,XXX,XXX | XX.X% | XX.X% |
| Savings | X,XXX,XXX | XX.X% | XX.X% |
| Investment | X,XXX,XXX | XX.X% | XX.X% |
| Debt | −X,XXX,XXX | −XX.X% | −XX.X% |

## Notes
- FX rate used: X,XXX ₫/USD
- ⚠️ [Any concentration risk — e.g. >50% in one account/currency]
- ℹ️ [Liquidity note — % instantly accessible]
```

### Alerts to flag
- Single account > 50% of net worth → concentration risk
- Debt > 20% of gross assets → leverage warning
- Liquid assets < 3× monthly expenses → liquidity warning

---

## Key Rules

- If script exits with error, check `tmp/misa-dashboard.png` for what the browser saw
- Session is **per-machine** (gitignored) — each PC needs its own first-time login
- Reports are committed to git so analysis history syncs across PCs
- If page structure changed (empty data), re-check `bodyText` raw and adapt selectors
- Currency is VND (₫) — format large numbers with commas for readability
- Never commit `config/.misa-session.json` — it contains Google session cookies
