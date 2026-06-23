---
description: MISA MoneyKeeper — fetch and analyze personal finance data (portfolio, allocation, debt, transactions, finance review)
---

# Money Report

## Utils

| Util | When | Params |
|------|------|--------|
| `/util:report` | Every piece output | `reports/{YYYY-MM-DD}/{HHMM}-money-{type}.md` |


Fetches and analyzes personal finance data from MISA MoneyKeeper.

**URL:** https://moneykeeperapp.misa.vn/management/dashboard  
**Auth:** Google OAuth — persistent Chrome profile in `tmp/misa-chrome-profile/` (gitignored, per-machine)  
**Script:** `node scripts/misa-money-report.js`  
**Output dir:** `reports/{YYYY-MM-DD}/`

---

## Quick Reference

| Command | What it does | Output file |
|---------|-------------|-------------|
| `/money-report` | Full run — all 5 reports | portfolio + allocation + debt + transactions + review |
| `/money-report login` | Force re-login (clear Chrome profile) | — |
| `/money-report summary` | Quick balance + net worth only | `{HHMM}-money-summary.md` |
| `/money-report portfolio` | All accounts + category breakdown + concentration alerts | `{HHMM}-money-portfolio.md` |
| `/money-report allocation` | Investable asset allocation (excl. nhà ở 2.5B) | `{HHMM}-money-allocation.md` |
| `/money-report allocation --with-home` | Full allocation incl. nhà ở (non-tradeable) | same file, full-view section |
| `/money-report debt` | Credit card balance + 12-month usage history + alerts | `{HHMM}-money-debt.md` |
| `/money-report transactions` | Recent transactions + monthly income/expense summary | `{HHMM}-money-transactions.md` |
| `/money-report review` | Finance review — strengths, risks, benchmark comparison, recommendations | appended to allocation report |

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
- `apiData.accountSummary` — raw account total (NOT authoritative, see below)
- `apiData.savings` — all savings books (POST `/wallets/savings`)
- `apiData.savingsSummary` — raw savings total (NOT authoritative, see below)
- `apiData.monthlySummary` — current month income/expense
- `apiData.transactions` — FULL transaction history from 2024-01-01 (paginated, ~2000+ entries)
- `trueTotalBalance` — **{amount, text}** read directly from `GET /wallets/totaldashboard`. **THIS is the authoritative Net Worth.** Never reconstruct Net Worth by summing accounts+savings — see "Net Worth — authoritative source" below.

**On auth failure:** Check `tmp/misa_err.txt` + `tmp/misa-dashboard.png`. If redirected to login, run with `--login`.

**On a new PC:** First run opens headed Chrome → complete Google OAuth → profile saved to `tmp/misa-chrome-profile/`.

---

## ⚠️ Net Worth — authoritative source (read this before computing anything)

**Always use `trueTotalBalance.amount` (from `GET /wallets/totaldashboard`) as Net Worth.** Do not manually sum accounts + savings — three separate manual-reconstruction attempts on 2026-06-23 each undercounted by a different amount (missing accrued interest, missing residual cash in a loan-tracked wallet, missing a savings book with a stale `currentAmount`). `/wallets/totaldashboard` already accounts for all of this correctly.

**Known MISA website bug:** a savings book's `currentAmount` field in `/wallets/savings` can be stuck at 0 even while the book is active (confirmed case: "tikcop 5 week", 7.5%, matured 2026-10-13, returned `currentAmount: 0` on web for weeks while mobile app showed the correct ~402M). This silently undercounts `/wallets/saving/summary` and therefore `/wallets/totaldashboard` by the missing book's full value. **If a Net Worth figure looks suspiciously lower than the previous report (drop of several hundred M with no matching withdrawal transaction), cross-check against the mobile app's "Tài chính hiện tại" screen (Tổng có − Tổng nợ) and "Quản lý sổ tiết kiệm" screen before reporting a loss to the user.** There is no client-side fix for this — it's server-side stale data; the user has to close/reopen the affected savings book in the app to force it to resync.

**Investment wallet valuation (VCBS, VCBF, FPTS, Finhay) — verified formula:**
```
true_value(wallet) = cost_basis_remaining(wallet) + currentAmount(wallet)
  where cost_basis_remaining = Σ(Cho vay amounts) − Σ(Thu nợ amounts), from full transaction history
```
Both halves matter:
- `currentAmount` alone is WRONG — these wallets only update this field when cash is sitting uninvested in them after a partial redemption (e.g., right after a "Thu nợ"/ETF-sale event); most of the time it's stale/near-zero even while fully invested.
- Cost-basis alone is WRONG — it misses any cash sitting in the wallet after a redemption that hasn't been transferred out yet, AND misses accrued "Tiền lãi" (interest/dividend) entries.
- A "Thu nợ" (debt-collection/redemption) transaction does NOT create a matching transfer-in transaction anywhere else — the redeemed amount just becomes that same wallet's `currentAmount` (cash sitting, not yet swept to a bank account). Don't go looking for where the money "went"; it's still in the same wallet.

**Fetching full transaction history (for the cost-basis formula above):**
- Endpoint: `POST /transactions/day` with `startDate`, `endDate`, `skip`, `take`, `calculateLoans: true`.
- **`startDate` before 2024-01-01 returns a 500 error** (date range too wide) — the script's pagination loop treats a failed/null response the same as an empty page and silently stops, returning zero transactions with no error surfaced. Keep `startDate >= '2024-01-01'`.
- **Paginate as separate `page.evaluate()` calls per page from Node, never as a loop inside one `page.evaluate()`.** ~2000 transactions = 11 pages; looping all 11 inside a single evaluate() call exceeds Puppeteer's CDP `protocolTimeout` and throws `Runtime.callFunctionOn timed out`, silently killing the whole fetch. `misa-money-report.js` already does this correctly (`postOnPage` helper) — don't regress it.
- Categories to know: `Cho vay` (invest/lend out, negative amount) / `Thu nợ` (redeem/collect, positive amount) / `Đi vay` (personal borrow, positive, NOT income) / `Trả nợ` (personal repay, negative, NOT expense) / `Tiền lãi` (interest/dividend earned inside an investment wallet — counts toward that wallet's value) / `Lãi tiết kiệm` (savings interest).

---

## Piece 1 — Summary (`/money-report summary`)

Quick overview — no deep analysis. Fast.

**Compute from `apiData`:**
1. Net Worth = `trueTotalBalance.amount` (authoritative — see warning section above, do NOT sum accounts+savings manually)
2. Sum all account `convertCurrentAmount` (positive only) = gross assets, for informational breakdown only
3. Sum all savings `currentAmount` = savings total, for informational breakdown only (if this + investment cost-basis sums to noticeably less than `trueTotalBalance.amount`, suspect the stale-savings-book bug above)
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
3. VCBS/VCBF/FPTS/Finhay: use the cost-basis + currentAmount formula from the warning section above, NOT raw `currentAmount` alone
4. Net Worth headline = `trueTotalBalance.amount`; Gross/Net computed from the account-level sum below is a secondary breakdown and may not add up exactly to the headline (that's expected, see warning section)
5. USD FX rate: derive from Paypal entry (`convertCurrentAmount / fcAmount`)

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
- ETF/Fund/Cổ tức: use `apiData.transactions` (already fetched with full history, no need for a separate call) → filter `categoryName === "Cho vay"` and `categoryName === "Thu nợ"` → sum by wallet

**Investment wallets and their types:**
| Wallet | Type | Holds |
|--------|------|-------|
| VCBS | 📈 ETF | VN30, VN100, VN1000 index ETFs |
| VCBF | 🏛️ Fund | VCBF managed fund |
| FPTS | 📊 Cổ tức stocks | VEA, ADP dividend stocks + small ETF |
| Finhay | 🏛️ Fund | Finhay platform fund |

**Net position per wallet** = `cost_basis_remaining + currentAmount` — see the verified formula in the warning section above. Do NOT use cost-basis alone (misses residual cash + accrued interest); do NOT use `currentAmount` alone (stale/near-zero most of the time).

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

**`--with-home` flag:** Default excludes `walletName = "Nhà"` (2.5B, primary residence, non-tradeable). Pass `--with-home` to include it in the allocation table and percentages. Always show a separate "Full View" section at the bottom with home included regardless of flag.

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

**⚠️ Do NOT use `apiData.monthlySummary` or the dashboard's "Tổng quan"/"Lịch chi tiêu tháng" widgets for income/expense — all three give DIFFERENT, each-wrong numbers** (confirmed 2026-06-23, same month, same data):
- Dashboard "Lịch chi tiêu tháng" widget: counts `Thu nợ`/`Đi vay` as income → inflates Thu.
- Dashboard "Tổng quan" widget: counts `Cho vay` as an expense → inflates Chi, makes Net falsely negative.
- Neither is "real" income/expense.

**Correct method — compute directly from `apiData.transactions`:**
1. Filter to the target month.
2. Exclude these 4 categories entirely from both income and expense: `Cho vay`, `Thu nợ`, `Đi vay`, `Trả nợ` (all four are money moving between your own investment/loan wallets, not real income or spending).
3. **For each remaining transaction, use `convertCurrentAmount` if `currencyCode !== 'VND'` and `convertCurrentAmount` is nonzero; otherwise use `currentAmount`.** Forgetting this for Paypal/USD transactions (e.g. Freelancer income) undercounts income by the full USD-to-VND gap — confirmed bug: summed raw `currentAmount` of "207" and "343" (USD face value) instead of their `convertCurrentAmount` ~5.47M/9.07M, undercounting Freelancer income by ~14.5M in one run.
4. Sum positive amounts = real income, sum negative amounts (abs) = real expense.
5. **Validate against the app's own "Báo cáo" screen** (bottom nav → Báo cáo → pick month → "Chi tiền"/"Thu tiền" tabs) — its category breakdown already does this filtering correctly and is the ground truth to cross-check against. A correct calculation should match within rounding (<0.1%).

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

## Piece 6 — Finance Review (`/money-report review`)

Analyzes the allocation report through a financial lens. **No new data fetch needed** — runs on top of the latest allocation report. If no allocation report exists for today, run `/money-report allocation` first.

**Input:** Latest `reports/{YYYY-MM-DD}/{HHMM}-money-allocation.md`

**Analysis framework:**

### 1. Điểm mạnh (Strengths)
List concrete positives: low debt ratio, DCA discipline, diversified income sources, inflation hedge assets.

### 2. Rủi ro (Risks) — with severity
For each risk, assign severity: 🔴 Cao / 🟡 Trung bình / 🟢 Thấp

Key checks:
- **Concentration**: Any asset class > 30% net worth → 🔴 if > 40%
- **Liquidity**: Cash (immediate) + Tiết kiệm (semi-liquid) vs 6-month target (70M × 6 = 420M). Tiết kiệm counts as emergency fund. Flag 🔴 only if cash+savings < 420M.
- **Market correlation**: Are all equity positions in same market/sector?
- **Currency risk**: USD/foreign exposure < 5% → 🟡
- **Single asset risk**: Any single account > 25% net worth
- **Credit card**: Spike > 2× 6-month average → 🟡

### 3. Benchmark comparison
Compare actual allocation vs global personal finance benchmarks:

| Nhóm | Actual | Benchmark | Status |
|------|--------|-----------|--------|
| Bất động sản | X% | 20–30% | ⚠️/✅ |
| Cổ phiếu/ETF/Fund | X% | 30–50% | ⚠️/✅ |
| Trái phiếu/Tiết kiệm | X% | 10–20% | ⚠️/✅ |
| Vàng/Commodity | X% | 5–15% | ⚠️/✅ |
| Tiền mặt | X% | 5–10% | ⚠️/✅ |

### 4. Upcoming decisions
Flag any time-sensitive decisions (maturities, rebalancing opportunities) within 90 days.

### 5. Khuyến nghị
Prioritized, actionable recommendations:
- Short-term (30 days): what to do now
- Medium-term (6–12 months): structural improvements
- Long-term (>1 year): strategic rebalancing

**Output:** Appended as `## Finance Review` section to the existing allocation report (same file).

**Note:** Benchmarks are general guidelines for Vietnamese context — RE benchmark slightly higher than Western (20-30% vs 15-25%) given VN property market dynamics. Monthly expense assumption: **70M ₫/month** → 6-month emergency fund target = 420M. Tiết kiệm accounts count as emergency fund pool (semi-liquid), not just cash.

---

## Full Run (`/money-report`)

Runs all 5 pieces. Sequence:

1. Fetch data once (`node scripts/misa-money-report.js`)
2. Parallel: Portfolio + Allocation + Debt + Transactions
3. Run Review (reads from Allocation output)
4. Write reports to `reports/{YYYY-MM-DD}/`

---

## Key Rules

- **Per-machine auth:** Chrome profile in `tmp/misa-chrome-profile/` (gitignored). First run on new PC needs headed browser login.
- **Reports sync via git** — commit after each run so history is available on all PCs.
- **On script error:** Check `tmp/misa_err.txt` (stderr) + `tmp/misa-dashboard.png` (screenshot).
- **Savings `currentAmount`:** Use this field, NOT `convertCurrentAmount` (which is 0 for savings books). But be aware it can be stuck at 0 for an active book due to a MISA website bug — see Net Worth section above.
- **Foreign currency wallets/transactions (Paypal):** Use `convertCurrentAmount` for VND-equivalent value, both for account balances AND for individual transactions (income/expense calc) — using raw `currentAmount` (USD face value) for a transaction silently undercounts it ~26,000x.
- **Net Worth:** `trueTotalBalance.amount` is authoritative. Never reconstruct by summing accounts+savings+cost-basis — confirmed unreliable 3 separate times on 2026-06-23. If it looks too low, cross-check the mobile app before telling the user money is "missing."
- **Investment wallets (VCBS/VCBF/FPTS/Finhay) valuation:** `cost_basis_remaining (Σcho_vay − Σthu_nợ) + currentAmount`. Neither alone is correct.
- **Income/Expense:** Compute from raw transactions, excluding `Cho vay/Thu nợ/Đi vay/Trả nợ`, using the FX-aware amount. Never use the dashboard's pre-aggregated Thu/Chi widgets. Validate against app's "Báo cáo" screen.
- **A "Thu nợ" transaction never has a matching transfer-in elsewhere** — the money stays in the same wallet as cash. Don't search for where it "went."
- **NEVER commit Chrome profile** (`tmp/` is gitignored) — it contains Google session cookies.
