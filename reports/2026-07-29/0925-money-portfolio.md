# Portfolio Report — 2026-07-29 09:25

## Summary
| | Amount (₫) | % Gross | % Net |
|-|-----------|---------|-------|
| Gross Assets (reconstructed) | 7,767,105,197 | 100% | — |
| Liabilities (VCB Visa) | −99,500,000 | −1.28% | — |
| **Net Worth (authoritative, totaldashboard)** | **7,594,705,196** | — | **100%** |

Reconstructed net (7,667,605,197) is 72,900,001 above the authoritative totaldashboard figure — **the identical gap to the đồng as the last several days**, i.e. the standing cost-basis-vs-market-value difference on VCBF/FPTS/Finhay. Not a data bug.

**Net Worth vs last report (2026-07-28):** 7,594,705,196 vs 7,614,998,167 → **−20,292,971 (−0.27%)**. Reconciles exactly:

| Category | Δ (₫) | Cause |
|----------|-------|-------|
| 🥇 Gold | −7,500,000 | Price down, same 50 units (14,300,000 → 14,150,000/unit, −1.05%) |
| 📈 Investment | +12,400,000 (VCBS) + 3,500,000 (FPTS) = +15,900,000 | VCBS: uncategorized transfers-in from vcb; FPTS: `Cho vay` 3,400,000 (07-28) + small interest |
| 🏦 Savings | 0 | 3 books unchanged (ghost `nam á 6m` still excluded) |
| 💵 Liquid | −18,192,970 | `vcb` −16,528,000 (Sữa −628,000 + net transfer-out to VCBS/FPTS −15,900,000); `Ví` −1,680,000 (Linh tinh); Paypal +15,030 (FX 26,520→26,525) |
| 💳 Debt | −10,500,000 | New VCB Visa charge "Linh tinh" 10,500,000 (09:23 today) |
| **Total** | **−20,292,970** | **≈ exact NW delta ✅** (1₫ rounding) |

**On the VCBS/FPTS moves:** MISA books wallet transfers without a `categoryName`, so they don't appear in the transaction feed (confirmed pattern, same as prior days). The +12.4M into VCBS and part of the +3.5M FPTS move are transfers from `vcb`, not new external capital.

## By Account (sorted by balance desc)
| Account | Balance (₫) | % Gross | % Net | Category |
|---------|------------|---------|-------|----------|
| Nhà | 2,500,000,000 | 32.19% | 32.92% | 🏠 Real Estate |
| long an res | 1,020,000,000 | 13.13% | 13.43% | 🏠 Real Estate |
| vàng (50 units @ 14.15M) | 707,500,000 | 9.11% | 9.31% | 🥇 Gold |
| VCBS | 612,855,620 | 7.89% | 8.07% | 📈 Investment (ETF) |
| Larion cổ phần | 600,000,000 | 7.72% | 7.90% | 📈 Investment |
| VCBF | 594,063,000 | 7.65% | 7.82% | 📈 Investment (Fund) |
| vcb 1 month | 505,944,635 | 6.51% | 6.66% | 🏦 Savings |
| tikcop 5m | 401,918,000 | 5.17% | 5.29% | 🏦 Savings |
| FPTS | 355,301,151 | 4.57% | 4.68% | 📈 Investment (Cổ tức) |
| vcb | 113,153,052 | 1.46% | 1.49% | 💵 Liquid |
| Tikop | 100,024,366 | 1.29% | 1.32% | 💵 Liquid |
| tikcop 3 month | 100,000,000 | 1.29% | 1.32% | 🏦 Savings |
| Paypal (USD 3,006 @ 26,525) | 79,734,150 | 1.03% | 1.05% | 💵 Liquid |
| Finhay | 74,404,069 | 0.96% | 0.98% | 📈 Investment (Fund) |
| Ví (cash) | 1,300,000 | 0.02% | 0.02% | 💵 Liquid |
| Momo | 900,000 | 0.01% | 0.01% | 💵 Liquid |
| nam á | 10,867 | ~0% | ~0% | 💵 Liquid |
| Payoneer (USD −0.14) | −3,713 | ~0% | ~0% | 💵 Liquid |
| VCB visa | −99,500,000 | −1.28% | −1.31% | 💳 Debt |

Investment wallets valued as cost-basis-remaining (Σ Cho vay − Σ Thu nợ) + `currentAmount`, per verified formula:

| Wallet | Cost basis remaining | + currentAmount | = Value | Lifetime Tiền lãi |
|--------|---------------------|-----------------|---------|-------------------|
| VCBS | 400,000 | 612,455,620 | 612,855,620 | 21,600,000 |
| VCBF | 594,063,000 | 0 | 594,063,000 | 34,063,000 |
| FPTS | 353,486,000 | 1,815,151 | 355,301,151 | 29,100,000 |
| Finhay | 74,404,069 | 0 | 74,404,069 | 4,404,000 |

**Note on VCBS:** cost basis reads only 400K because the Cho vay/Thu nợ ledger was settled in the June redemption cycle; position carried directly as `currentAmount` (market value). Fully invested, not idle cash.

`long an res` and `Larion cổ phần` grouped consistent with historical tracking despite MISA tagging them walletType=Investment/inactive. `Tikop` classified 💵 Liquid (robo-savings cash-parking product), not Investment, despite walletType=3.

## By Category
| Category | Total (₫) | % Gross | % Net |
|----------|----------|---------|-------|
| 🏠 Real Estate | 3,520,000,000 | 45.32% | 46.35% |
| 📈 Investment | 2,236,623,840 | 28.80% | 29.45% |
| 🏦 Savings | 1,007,862,635 | 12.98% | 13.27% |
| 🥇 Gold | 707,500,000 | 9.11% | 9.31% |
| 💵 Liquid | 295,118,722 | 3.80% | 3.89% |
| 💳 Debt | −99,500,000 | −1.28% | −1.31% |

🐛 Ghost balance on closed savings book "nam á 6m" (2,005,479 ₫, endDate 2024-06-01) excluded from all totals — confirmed MISA data bug, still present in `/wallets/savings`, unresolved.

## Upcoming Maturities
| Deposit | Amount (₫) | Rate | Maturity |
|---------|-----------|------|----------|
| vcb 1 month | 505,944,635 | 4.75% | 2026-08-09 (11 days) |
| tikcop 3 month | 100,000,000 | 8.1% | 2026-10-10 (73 days) |
| tikcop 5m | 401,918,000 | 7.5% | 2026-10-13 (76 days) |

## Liquidity Check
- Instantly accessible (Liquid): **295,118,722 ₫** — 4.2 months of the 70M/month assumption
- Due within 30 days (vcb 1 month, 11 days): **+505,944,635 ₫**
- → Total accessible within 30 days: **801,063,357 ₫**
- Liquid + Savings = **1,302,981,357 ₫** = 18.6 months of basic expenses
- Listed equity (VCBS 612.9M + FPTS 355.3M) sellable T+2 if genuinely needed, but at market risk — counted as investment, not liquidity.

## Alerts
- 🔴 **Concentration**: Real Estate is 46.35% of net worth, above the 30% threshold. Nhà (32.92%) is structural/primary residence; long an res (13.43%) is the actionable illiquid piece. Unchanged issue, tracked since prior reports.
- 🟡 **VCB Visa escalating**: 119.5M July charges (new 10.5M "Linh tinh" charge today, plus Học phí 61M + Biếu tặng 43M + Thể thao 5M) = **2.73× the prior 6-month average (43.8M)**, up from 2.49x yesterday. Balance now 99.5M, still unpaid since 07-11. See Debt report.
- 🟡 **30.3M still idle in `vcb` from 07-28 `tịkcop 1 week` closure** — not yet redeployed (see prior alert), plus today's transfers into VCBS/FPTS partially absorbed it.
- ✅ **Capital deployment**: all four fund wallets fully invested — no idle capital in the brokerage accounts.
- ✅ **Liquidity**: 18.6 months coverage including savings — far above the 6-month bar.
- ✅ **Leverage**: Debt 1.28% of gross assets — negligible.
