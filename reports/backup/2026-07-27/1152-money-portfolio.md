# Portfolio Report — 2026-07-27 11:52

## Summary
| | Amount (₫) | % Gross | % Net |
|-|-----------|---------|-------|
| Gross Assets (reconstructed) | 7,769,368,108 | 100% | — |
| Liabilities (VCB Visa) | −89,000,000 | −1.15% | — |
| **Net Worth (authoritative, totaldashboard)** | **7,607,468,108** | — | **100%** |

Reconstructed net (7,680,368,108) is ~0.96% above the authoritative totaldashboard figure — same known unrealized-P&L gap on VCBS/VCBF/FPTS/Finhay (cost-basis vs market value) seen in every prior report, not a data bug.

**Net Worth vs last report (2026-07-24):** 7,607,468,108 vs 7,607,853,050 → down 384,942 (−0.005%) over 3 days. Deltas reconcile to the exact rupiah:

| Category | Δ (₫) | Cause |
|----------|-------|-------|
| 🥇 Gold | +7,500,000 | Price up (same 50-unit holding, 14.0M → 14.15M/unit) |
| 📈 Investment | +11,800,000 | New capital deployed from `vcb` → VCBS +6.3M, FPTS +5.5M |
| 💵 Liquid | −19,684,942 | `vcb` −19,645,000 (7,845,000 spend + 11,800,000 swept to investment), Ví −70,000, Paypal FX +30,060 |
| 🏦 Savings | 0 | No interest posting since 07-23 |
| 🏠 Real Estate | 0 | — |
| 💳 Debt | 0 | VCB Visa flat at −89,000,000 (16 days no new charge) |
| **Total** | **−384,942** | **= exact NW delta ✅** |

The 11.8M investment increase is not new wealth — it is capital moved out of `vcb` into the brokerage accounts. MISA records wallet transfers without a `categoryName`, so they never appear in the transaction feed; the amount is derived from the residual: `vcb` fell 19,645,000, of which only 7,845,000 is categorized spend, leaving exactly 11,800,000 — matching the aggregate investment rise to the đồng.

Caveat on the split: FPTS's +5.5M is firm (cost basis +6,810,000 from two VEA buys, wallet cash −1,310,000, so 5.5M had to come in). VCBS's +6.3M is carried mark-to-market, so it blends any transfer-in with price movement — the two cannot be separated from this data. The category total is right either way.

## By Account (sorted by balance desc)
| Account | Balance (₫) | % Gross | % Net | Category |
|---------|------------|---------|-------|----------|
| Nhà | 2,500,000,000 | 32.18% | 32.86% | 🏠 Real Estate |
| long an res | 1,020,000,000 | 13.13% | 13.41% | 🏠 Real Estate |
| vàng (50 units) | 707,500,000 | 9.11% | 9.30% | 🥇 Gold |
| VCBS | 600,455,620 | 7.73% | 7.89% | 📈 Investment (ETF) |
| Larion cổ phần | 600,000,000 | 7.72% | 7.89% | 📈 Investment |
| VCBF | 594,063,000 | 7.65% | 7.81% | 📈 Investment (Fund) |
| vcb 1 month | 505,944,635 | 6.51% | 6.65% | 🏦 Savings |
| tikcop 5m | 401,918,000 | 5.17% | 5.28% | 🏦 Savings |
| FPTS | 351,801,151 | 4.53% | 4.62% | 📈 Investment (Cổ tức) |
| Tikop | 100,024,366 | 1.29% | 1.31% | 💵 Liquid |
| tikcop 3 month | 100,000,000 | 1.29% | 1.31% | 🏦 Savings |
| vcb | 99,399,133 | 1.28% | 1.31% | 💵 Liquid |
| Paypal (USD 3,006 @ 26,510) | 79,689,060 | 1.03% | 1.05% | 💵 Liquid |
| Finhay | 74,404,069 | 0.96% | 0.98% | 📈 Investment (Fund) |
| tịkcop 1 week | 30,281,919 | 0.39% | 0.40% | 🏦 Savings |
| Ví (cash) | 2,980,000 | 0.04% | 0.04% | 💵 Liquid |
| Momo | 900,000 | 0.01% | 0.01% | 💵 Liquid |
| nam á | 10,867 | ~0% | ~0% | 💵 Liquid |
| Payoneer (USD) | −3,711 | ~0% | ~0% | 💵 Liquid |
| VCB visa | −89,000,000 | −1.15% | −1.17% | 💳 Debt |

Investment wallets valued as cost-basis-remaining (Σ Cho vay − Σ Thu nợ) + `currentAmount`, per verified formula:

| Wallet | Cost basis remaining | + currentAmount | = Value | Lifetime Tiền lãi |
|--------|---------------------|-----------------|---------|-------------------|
| VCBS | 400,000 | 600,055,620 | 600,455,620 | 21,600,000 |
| VCBF | 594,063,000 | 0 | 594,063,000 | 34,063,000 |
| FPTS | 350,086,000 | 1,715,151 | 351,801,151 | 29,100,000 |
| Finhay | 74,404,069 | 0 | 74,404,069 | 4,404,000 |

**Note on VCBS:** cost basis reads only 400K because the Cho vay/Thu nợ ledger for that wallet was fully closed out in the June redemption cycle; the position is now carried directly as the wallet's `currentAmount` (600,055,620). That figure is **invested ETF market value, not idle cash** — VCBS is fully deployed. This also makes VCBS the most accurately-valued of the four fund wallets (mark-to-market rather than cost basis).

`long an res` and `Larion cổ phần` grouped consistent with historical tracking despite MISA tagging them walletType=Investment/inactive.

## By Category
| Category | Total (₫) | % Gross | % Net |
|----------|----------|---------|-------|
| 🏠 Real Estate | 3,520,000,000 | 45.31% | 46.27% |
| 📈 Investment | 2,220,723,840 | 28.58% | 29.19% |
| 🏦 Savings | 1,038,144,554 | 13.36% | 13.65% |
| 🥇 Gold | 707,500,000 | 9.11% | 9.30% |
| 💵 Liquid | 282,999,714 | 3.64% | 3.72% |
| 💳 Debt | −89,000,000 | −1.15% | −1.17% |

Ghost balance on closed savings book "nam á 6m" (2,005,479, endDate 2024-06-01) excluded — still present in the website's `/wallets/savings` response, unresolved by MISA.

## Upcoming Maturities
| Deposit | Amount (₫) | Rate | Maturity |
|---------|-----------|------|----------|
| tịkcop 1 week | 30,281,919 | 6.1% | 2026-07-30 (3 days) |
| vcb 1 month | 505,944,635 | 4.75% | 2026-08-09 (13 days) |
| tikcop 3 month | 100,000,000 | 8.1% | 2026-10-10 (75 days) |
| tikcop 5m | 401,918,000 | 7.5% | 2026-10-13 (78 days) |

## Liquidity Check
- Instantly accessible (Liquid): **282,999,714 ₫**
- Due within 30 days (tịkcop 1 week + vcb 1 month): **+536,226,554 ₫**
- → Total accessible within 30 days: **819,226,268 ₫**
- Listed equity (VCBS 600.5M + FPTS 351.8M) is sellable in T+2 if genuinely needed, but at market risk — counted as investment, not liquidity.

## Alerts
- 🔴 **Concentration**: Real Estate is 46.27% of net worth, above the 30% threshold. Nhà (32.86%) is structural/primary residence; long an res (13.41%) is the actionable illiquid piece.
- ✅ **Capital deployment**: all four fund wallets fully invested — no idle capital.
- ✅ **Concentration**: Investment category 29.19% of net worth, spread over 5 positions.
- ✅ **Liquidity**: Liquid (283.0M) alone is below 3× monthly expense (~210M bar is met, but thin); with Savings (1.04B semi-liquid) coverage is 18.9 months.
- ✅ **Leverage**: Debt 1.15% of gross assets — negligible.
- 🟡 **VCB Visa**: 109M July charges (Học phí 61M, Biếu tặng 43M, Thể thao 5M) = 2.5× the prior 6-month average, still unpaid, 16 days flat since last charge. See Debt report.
