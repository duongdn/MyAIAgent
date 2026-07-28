# Portfolio Report — 2026-07-28 11:47

## Summary
| | Amount (₫) | % Gross | % Net |
|-|-----------|---------|-------|
| Gross Assets (reconstructed) | 7,776,898,167 | 100% | — |
| Liabilities (VCB Visa) | −89,000,000 | −1.14% | — |
| **Net Worth (authoritative, totaldashboard)** | **7,614,998,167** | — | **100%** |

Reconstructed net (7,687,898,167) is 72,900,000 above the authoritative totaldashboard figure — **the identical gap to the đồng as yesterday**, i.e. the standing cost-basis-vs-market-value difference on VCBF/FPTS/Finhay. Not a data bug.

**Net Worth vs last report (2026-07-27):** 7,614,998,167 vs 7,607,468,108 → **+7,530,059 (+0.099%)** in 1 day. Reconciles exactly:

| Category | Δ (₫) | Cause |
|----------|-------|-------|
| 🥇 Gold | +7,500,000 | Price up, same 50 units (14,150,000 → 14,300,000/unit, +1.06%) |
| 🏦 Savings | −30,281,919 | `tịkcop 1 week` closed out (balance → 0, `savingIsFinalize: true`) |
| 💵 Liquid | +30,311,978 | `vcb` +30,281,919 (the savings sweep), Paypal +30,060 (FX 26,510 → 26,520), Payoneer −2 |
| 📈 Investment | 0 | No buys/sells; all four fund wallets unchanged |
| 🏠 Real Estate | 0 | — |
| 💳 Debt | 0 | VCB Visa flat at −89,000,000 (17 days, no new charge) |
| **Total** | **+7,530,059** | **= exact NW delta ✅** |

**On the `tịkcop 1 week` closure:** this is a real withdrawal, not the MISA stale-balance bug — `vcb` rose by exactly 30,281,919, matching to the đồng. It was closed **2 days early** (endDate 2026-07-30), so the current 5-day partial week earns no interest; ~35,400 ₫ forgone. Immaterial, but the 30.3M is now sitting in `vcb` earning ~0 rather than 6.1% — see Alerts.

## By Account (sorted by balance desc)
| Account | Balance (₫) | % Gross | % Net | Category |
|---------|------------|---------|-------|----------|
| Nhà | 2,500,000,000 | 32.15% | 32.83% | 🏠 Real Estate |
| long an res | 1,020,000,000 | 13.12% | 13.39% | 🏠 Real Estate |
| vàng (50 units @ 14.3M) | 715,000,000 | 9.19% | 9.39% | 🥇 Gold |
| VCBS | 600,455,620 | 7.72% | 7.89% | 📈 Investment (ETF) |
| Larion cổ phần | 600,000,000 | 7.72% | 7.88% | 📈 Investment |
| VCBF | 594,063,000 | 7.64% | 7.80% | 📈 Investment (Fund) |
| vcb 1 month | 505,944,635 | 6.51% | 6.64% | 🏦 Savings |
| tikcop 5m | 401,918,000 | 5.17% | 5.28% | 🏦 Savings |
| FPTS | 351,801,151 | 4.52% | 4.62% | 📈 Investment (Cổ tức) |
| vcb | 129,681,052 | 1.67% | 1.70% | 💵 Liquid |
| Tikop | 100,024,366 | 1.29% | 1.31% | 💵 Liquid |
| tikcop 3 month | 100,000,000 | 1.29% | 1.31% | 🏦 Savings |
| Paypal (USD 3,006 @ 26,520) | 79,719,120 | 1.03% | 1.05% | 💵 Liquid |
| Finhay | 74,404,069 | 0.96% | 0.98% | 📈 Investment (Fund) |
| Ví (cash) | 2,980,000 | 0.04% | 0.04% | 💵 Liquid |
| Momo | 900,000 | 0.01% | 0.01% | 💵 Liquid |
| nam á | 10,867 | ~0% | ~0% | 💵 Liquid |
| Payoneer (USD −0.14) | −3,713 | ~0% | ~0% | 💵 Liquid |
| VCB visa | −89,000,000 | −1.14% | −1.17% | 💳 Debt |

Investment wallets valued as cost-basis-remaining (Σ Cho vay − Σ Thu nợ) + `currentAmount`, per verified formula:

| Wallet | Cost basis remaining | + currentAmount | = Value | Lifetime Tiền lãi |
|--------|---------------------|-----------------|---------|-------------------|
| VCBS | 400,000 | 600,055,620 | 600,455,620 | 21,600,000 |
| VCBF | 594,063,000 | 0 | 594,063,000 | 34,063,000 |
| FPTS | 350,086,000 | 1,715,151 | 351,801,151 | 29,100,000 |
| Finhay | 74,404,069 | 0 | 74,404,069 | 4,404,000 |

**Note on VCBS:** cost basis reads only 400K because the Cho vay/Thu nợ ledger for that wallet was fully settled in the June redemption cycle; the position is now carried directly as `currentAmount` (600,055,620). That is **invested ETF market value, not idle cash** — VCBS is fully deployed, and is the most accurately-valued of the four fund wallets (mark-to-market rather than cost basis).

`long an res` and `Larion cổ phần` grouped consistent with historical tracking despite MISA tagging them walletType=Investment/inactive. `Tikop` classified 💵 Liquid (robo-savings cash-parking product), not Investment, despite walletType=3.

## By Category
| Category | Total (₫) | % Gross | % Net |
|----------|----------|---------|-------|
| 🏠 Real Estate | 3,520,000,000 | 45.26% | 46.22% |
| 📈 Investment | 2,220,723,840 | 28.56% | 29.16% |
| 🏦 Savings | 1,007,862,635 | 12.96% | 13.23% |
| 🥇 Gold | 715,000,000 | 9.19% | 9.39% |
| 💵 Liquid | 313,311,692 | 4.03% | 4.11% |
| 💳 Debt | −89,000,000 | −1.14% | −1.17% |

🐛 Ghost balance on closed savings book "nam á 6m" (2,005,479 ₫, endDate 2024-06-01) excluded from all totals — confirmed MISA data bug, still present in `/wallets/savings`, unresolved. The authoritative `totaldashboard` figure likely still includes it.

## Upcoming Maturities
| Deposit | Amount (₫) | Rate | Maturity |
|---------|-----------|------|----------|
| vcb 1 month | 505,944,635 | 4.75% | 2026-08-09 (12 days) |
| tikcop 3 month | 100,000,000 | 8.1% | 2026-10-10 (74 days) |
| tikcop 5m | 401,918,000 | 7.5% | 2026-10-13 (77 days) |

Down from 4 books yesterday — `tịkcop 1 week` (6.1%) was closed out today.

## Liquidity Check
- Instantly accessible (Liquid): **313,311,692 ₫** — 4.5 months of the 70M/month assumption
- Due within 30 days (vcb 1 month, 12 days): **+505,944,635 ₫**
- → Total accessible within 30 days: **819,256,327 ₫**
- Liquid + Savings = **1,321,174,327 ₫** = 18.9 months of basic expenses
- Listed equity (VCBS 600.5M + FPTS 351.8M) sellable T+2 if genuinely needed, but at market risk — counted as investment, not liquidity.

## Alerts
- 🔴 **Concentration**: Real Estate is 46.22% of net worth, above the 30% threshold. Nhà (32.83%) is structural/primary residence; long an res (13.39%) is the actionable illiquid piece.
- 🟡 **New — 30.3M idle in `vcb`**: the `tịkcop 1 week` proceeds landed in the current account, which pays ~0%. `vcb` is now 129.7M vs a typical working balance of ~99M. Redeploy or roll into a term deposit; at 8.1% that 30.3M is worth ~2.45M/year.
- 🟡 **VCB Visa**: 109M July charges (Học phí 61M, Biếu tặng 43M, Thể thao 5M) = 2.49× the prior 6-month average, still unpaid, 17 days flat since last charge. See Debt report.
- ✅ **Capital deployment**: all four fund wallets fully invested — no idle capital in the brokerage accounts.
- ✅ **Concentration**: Investment category 29.16% of net worth, spread over 5 positions.
- ✅ **Liquidity**: 18.9 months coverage including savings — far above the 6-month bar.
- ✅ **Leverage**: Debt 1.14% of gross assets — negligible.
