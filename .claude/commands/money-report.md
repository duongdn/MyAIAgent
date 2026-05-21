---
description: MISA MoneyKeeper — fetch and analyze personal finance data (portfolio, allocation, debt, transactions)
---

# Money Report

Fetches and analyzes personal finance data from MISA MoneyKeeper.

**URL:** https://moneykeeperapp.misa.vn/management/dashboard  
**Auth:** Google OAuth — persistent Chrome profile in `tmp/misa-chrome-profile/` (gitignored, per-machine)  
**Script:** `node scripts/misa-money-report.js`  
**Output dir:** `reports/{YYYY-MM-DD}/`

---

## Quick Reference

| Command | What it does | Output file |
|---------|-------------|-------------|
| `/money-report` | Full run — all 4 reports | portfolio + allocation + debt + transactions |
| `/money-report login` | Force re-login (clear Chrome profile) | — |
| `/money-report summary` | Quick balance + net worth only | `{HHMM}-money-summary.md` |
| `/money-report portfolio` | All accounts + category breakdown + concentration alerts | `{HHMM}-money-portfolio.md` |
| `/money-report allocation` | Asset allocation % by type (BĐS/Tiết kiệm/ETF/Fund/Vàng/Cổ phiếu/Tiền mặt) | `{HHMM}-money-allocation.md` |
| `/money-report debt` | Credit card balance + 12-month usage history + alerts | `{HHMM}-money-debt.md` |
| `/money-report transactions` | Recent transactions + monthly income/expense summary | `{HHMM}-money-transactions.md` |

---

## Step 0 — Fetch Data (always first)

```bash
# Normal run — reuses Chrome profile if valid, opens browser for Google OAuth if not
node scripts/misa-money-report.js 2>tmp/misa_err.txt

# Force fresh login (wipes Chrome profile, opens headed browser)
node scripts/misa-money-report.js --login 2>tmp/misa_err.txt
```

**What the script returns (stdout JSON):**
- `dashboard` — page snapshot (bodyText, moneyEls)
- `apiData.accounts` — all wallets/accounts (POST `/wallets/accounts` with `take:200, inActive:null`)
- `apiData.accountSummary` — account summary with `totaldashboard`
- `apiData.savings` — all savings books (POST `/wallets/savings`)
- `apiData.savingsSummary` — savings summary
- `apiData.monthlySummary` — current month income/expense

**On auth failure:** Check `tmp/misa_err.txt` + `tmp/misa-dashboard.png`. If redirected to login, run with `--login`.

**On a new PC:** First run opens headed Chrome → complete Google OAuth → profile saved to `tmp/misa-chrome-profile/`.

---

## Piece 1 — Summary (`/money-report summary`)

Quick overview — no deep analysis. Fast.

**Compute from `apiData`:**
1. Sum all account `convertCurrentAmount` (positive only) = gross assets
2. Sum all savings `currentAmount` = savings total
3. `totaldashboard` from `accountSummary` = full net worth including ETF/Fund loans
4. Liabilities = sum of negative account balances

**Output:** `reports/{YYYY-MM-DD}/{HHMM}-money-summary.md`

```markdown
# Money Summary — {YYYY-MM-DD} {HH:MM}

| | Amount (₫) |
|-|-----------|
| Net Worth (totaldashboard) | X,XXX,XXX |
| Accounts + Savings | X,XXX,XXX |
| ETF/Fund/Investments (est.) | X,XXX,XXX |
| Liquid (tiền mặt ngay) | X,XXX,XXX |
| Liabilities | −X,XXX,XXX |
```

---

## Piece 2 — Portfolio (`/money-report portfolio`)

Full account-by-account breakdown with category grouping and concentration alerts.

**Compute from `apiData.accounts` + `apiData.savings`:**
1. All accounts: use `convertCurrentAmount` for foreign currency (Paypal USD), `currentAmount` for VND
2. All savings: use `currentAmount`
3. Gross = sum all positive; Net = gross − |liabilities|
4. USD FX rate: derive from Paypal entry (`convertCurrentAmount / fcAmount`)

**Category mapping:**
| Wallet type | Category |
|------------|----------|
| 0 = cash, 7 = e-wallet | 💵 Liquid |
| 1 = bank (vcb, nam á) | 💵 Liquid |
| 2 = credit card (VCB Visa) | 💳 Debt |
| 3 = investment (VCBS, FPTS, Larion) | 📈 Investment |
| 4 = real estate (Nhà, long an res) | 🏠 Real Estate |
| 5 = savings book | 🏦 Savings |
| walletName = vàng | 🥇 Gold |

**Output:** `reports/{YYYY-MM-DD}/{HHMM}-money-portfolio.md`

```markdown
# Portfolio Report — {YYYY-MM-DD} {HH:MM}

## Summary
| | Amount (₫) | % Gross | % Net |
|-|-----------|---------|-------|
| Gross Assets | ... | 100% | — |
| Liabilities  | −... | −X% | — |
| **Net Worth**| **...** | — | **100%** |

## By Account (sorted by balance desc)
| Account | Balance (₫) | % Gross | % Net | Category |
|---------|------------|---------|-------|----------|
...

## By Category
| Category | Total (₫) | % Gross | % Net |
|----------|----------|---------|-------|
...

## Upcoming Maturities
| Deposit | Amount (₫) | Maturity |
...

## Liquidity Check
Instantly accessible: X ₫
Due within 30 days: +X ₫

## Alerts
- ⚠️/✅ concentration, liquidity, leverage
```

**Alerts to flag:**
- Single account > 50% net worth → ⚠️ concentration
- Liquid < 3× monthly expenses (~110M) → ⚠️ liquidity
- Debt > 20% gross → ⚠️ leverage

---

## Piece 3 — Allocation (`/money-report allocation`)

Asset allocation % by type, with ETF vs Fund split (by "người cho vay").

**Data sources:**
- Accounts + savings from API → BĐS, Vàng, Cổ phiếu, Tiết kiệm, Tiền mặt, Nợ
- ETF/Fund/Cổ tức: fetch via `transactions/pagingdashboard` (POST, `reportType: -1, take: 9999, startDate: 2024-01-01`) → filter `category === "Cho vay"` and `category === "Thu nợ"` → sum by wallet

**Investment wallets and their types:**
| Wallet | Type | Holds |
|--------|------|-------|
| VCBS | 📈 ETF | VN30, VN100, VN1000 index ETFs |
| VCBF | 🏛️ Fund | VCBF managed fund |
| FPTS | 📊 Cổ tức stocks | VEA, ADP dividend stocks + small ETF |
| Finhay | 🏛️ Fund | Finhay platform fund |

**Net position per wallet** = `sum(|cho_vay.amount|) − sum(thu_no.amount)` where `wallet === walletName`

**Output:** `reports/{YYYY-MM-DD}/{HHMM}-money-allocation.md`

```markdown
# Asset Allocation — {YYYY-MM-DD} {HH:MM}

## Tỉ lệ tài sản
| Loại | Tổng (₫) | % Total | Ghi chú |
...

## Chi tiết ETF + Fund
ETF (VCBS) — VN30/VN100/VN1000: X ₫
Fund (VCBF) — managed fund: X ₫
Cổ tức (FPTS) — VEA/ADP/ETF: X ₫
Fund (Finhay): X ₫

## Visual ASCII bar chart
...

## Nhận xét
- Liquidity ratio
- Upcoming maturities
- Investment strategy notes
```

**Note on totals:** `totaldashboard` = market-value-based total from MISA. Cost-basis calc from transactions may differ ±5-10% due to market P&L. Use totaldashboard as authoritative total.

---

## Piece 4 — Debt (`/money-report debt`)

Credit card + outstanding liabilities analysis.

**Compute from `apiData.accounts`:** filter `currentAmount < 0`

**Monthly card history:** fetch via `transactions/pagingdashboard` (POST, filter by walletName containing "Visa" or "credit"), group by month, sum `totalSpend`.

**Output:** `reports/{YYYY-MM-DD}/{HHMM}-money-debt.md`

```markdown
# Debt Report — {YYYY-MM-DD} {HH:MM}

## Current Outstanding Debt
| Account | Balance | Type |
...

## VCB Visa — Monthly Usage (12 months)
| Month | Charged (₫) | Notes |
...

## Recent Transactions (VCB Visa)
...

## Debt vs Assets
| | Amount | % Net Worth |
...

## Alerts
- ⚠️/✅ spend spike, debt ratio
```

**Alerts to flag:**
- Month spend > 2× 6-month average → ⚠️ spike
- Balance still unpaid → ⚠️ payment due

---

## Piece 5 — Transactions (`/money-report transactions`)

Recent transaction history + monthly income/expense summary.

**Compute from:**
- `apiData.monthlySummary` → this month's income/expense totals
- `transactions/pagingdashboard` (POST, last 30 days, `take: 50`) → recent transactions list

**Output:** `reports/{YYYY-MM-DD}/{HHMM}-money-transactions.md`

```markdown
# Transactions — {YYYY-MM-DD} {HH:MM}

## This Month ({MM/YYYY})
| | Amount (₫) |
|-|-----------|
| Thu nhập | +X,XXX,XXX |
| Chi tiêu | −X,XXX,XXX |
| **Net** | **±X,XXX,XXX** |

## Recent Transactions (last 30 days)
| Date | Category | Wallet | Amount (₫) | Note |
...

## Top Categories (this month)
| Category | Spent (₫) | % of total |
...
```

---

## Full Run (`/money-report`)

Runs all 4 substantive pieces. Sequence:

1. Fetch data once (`node scripts/misa-money-report.js`)
2. Parallel: Portfolio + Allocation + Debt + Transactions
3. Write 4 separate report files to `reports/{YYYY-MM-DD}/`

---

## Key Rules

- **Per-machine auth:** Chrome profile in `tmp/misa-chrome-profile/` (gitignored). First run on new PC needs headed browser login.
- **Reports sync via git** — commit after each run so history is available on all PCs.
- **On script error:** Check `tmp/misa_err.txt` (stderr) + `tmp/misa-dashboard.png` (screenshot).
- **Savings `currentAmount`:** Use this field, NOT `convertCurrentAmount` (which is 0 for savings books).
- **Foreign currency wallets (Paypal):** Use `convertCurrentAmount` for VND-equivalent balance.
- **Investment totals:** MISA's `totaldashboard` is authoritative — includes loan-tracked ETF/Fund at current values.
- **NEVER commit Chrome profile** (`tmp/` is gitignored) — it contains Google session cookies.
