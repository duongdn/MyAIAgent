# Portfolio Report — 2026-07-14 11:38

## Summary
| | Amount (₫) | % Gross | % Net |
|-|-----------|---------|-------|
| Gross Assets (reconstructed) | 7,822,580,792 | 100% | — |
| Liabilities (VCB Visa) | −89,000,000 | −1.1% | — |
| **Net Worth (authoritative, totaldashboard)** | **7,660,677,088** | — | **100%** |

Reconstructed net (7,733,577,088) is ~0.95% above the authoritative totaldashboard figure — consistent with the known unrealized-P&L gap on VCBS/VCBF/FPTS/Finhay (cost-basis vs current market value), same ~1% gap seen in the 2026-07-09 report, not a data bug.

**Net Worth vs last report (2026-07-09):** 7,660,677,088 vs 7,721,419,496 → down 60,742,408 (−0.8%). Cross-checked against this month's transactions (Piece 5 below): July net cash flow so far is −59,766,895 (expense 140.0M vs income 80.2M, driven by a 61M Học phí card charge + 43M Biếu tặng + 5M Thể thao on VCB Visa). The drop matches actual spending, not a stale-savings-book data bug.

## By Account (sorted by balance desc)
| Account | Balance (₫) | % Gross | % Net | Category |
|---------|------------|---------|-------|----------|
| Nhà | 2,500,000,000 | 32.0% | 32.6% | 🏠 Real Estate |
| long an res | 1,020,000,000 | 13.0% | 13.3% | 🏠 Real Estate |
| vàng | 742,000,000 | 9.5% | 9.7% | 🥇 Gold |
| Larion cổ phần | 600,000,000 | 7.7% | 7.8% | 📈 Investment |
| VCBS | 594,155,620 | 7.6% | 7.8% | 📈 Investment (ETF) |
| VCBF | 594,063,000 | 7.6% | 7.8% | 📈 Investment (Fund) |
| vcb 1 month | 505,944,635 | 6.5% | 6.6% | 🏦 Savings |
| tikcop 5m | 401,918,000 | 5.1% | 5.2% | 🏦 Savings |
| FPTS | 346,301,151 | 4.4% | 4.5% | 📈 Investment (Cổ tức) |
| Paypal (USD) | 185,378,760 | 2.4% | 2.4% | 💵 Liquid |
| Tikop | 100,024,366 | 1.3% | 1.3% | 💵 Liquid |
| tikcop 3 month | 100,000,000 | 1.3% | 1.3% | 🏦 Savings |
| Finhay | 74,404,069 | 1.0% | 1.0% | 📈 Investment (Fund) |
| tịkcop 1 week | 30,211,192 | 0.4% | 0.4% | 🏦 Savings |
| vcb | 26,339,133 | 0.3% | 0.3% | 💵 Liquid |
| Ví (cash) | 930,000 | 0.01% | 0.01% | 💵 Liquid |
| Momo | 900,000 | 0.01% | 0.01% | 💵 Liquid |
| nam á | 10,867 | ~0% | ~0% | 💵 Liquid |
| Payoneer (USD) | −3,704 | ~0% | ~0% | 💵 Liquid |
| VCB visa | −89,000,000 | −1.1% | −1.2% | 💳 Debt |

Investment wallets (VCBS/VCBF/FPTS/Finhay) valued as cost-basis-remaining (Σ Cho vay − Σ Thu nợ) + currentAmount, per verified formula. "long an res" and "Larion cổ phần" grouped consistent with historical tracking despite MISA internally tagging some as walletType=Investment/inactive. "tikcop 3 month" (100M, maturity 2026-10-10) is a new savings book this period — replaces the previously-tracked "tikcop 1m" (now closed/rolled over).

## By Category
| Category | Total (₫) | % Gross | % Net |
|----------|----------|---------|-------|
| 🏠 Real Estate | 3,520,000,000 | 45.0% | 45.9% |
| 📈 Investment | 2,208,923,840 | 28.2% | 28.8% |
| 🏦 Savings | 1,038,073,827 | 13.3% | 13.6% |
| 🥇 Gold | 742,000,000 | 9.5% | 9.7% |
| 💵 Liquid | 313,579,421 | 4.0% | 4.1% |
| 💳 Debt | −89,000,000 | −1.1% | −1.2% |

Ghost balance on closed savings book "nam á 6m" (2,005,479, endDate 2024-06-01) excluded — still present in the website's `/wallets/savings` response, unresolved by MISA. Duplicate zero-balance "tikcop 5 week" entry (same maturity 2026-10-13 as "tikcop 5m") is the known stale-currentAmount MISA bug — not a separate asset, no double count.

## Upcoming Maturities
| Deposit | Amount (₫) | Maturity |
|---------|-----------|----------|
| tịkcop 1 week | 30,211,192 | 2026-07-16 (2 days) |
| vcb 1 month | 505,944,635 | 2026-08-09 (26 days) |
| tikcop 3 month | 100,000,000 | 2026-10-10 (88 days) |
| tikcop 5m | 401,918,000 | 2026-10-13 (91 days) |

## Liquidity Check
Instantly accessible (Liquid): 313,579,421 ₫
Due within 30 days (tịkcop 1 week + vcb 1 month): +536,155,827 ₫
→ Total accessible within 30 days: 849,735,248 ₫

## Alerts
- 🔴 **Concentration**: Real Estate category (Nhà + long an res) is 45.9% of net worth — above the 30% concentration threshold. Nhà alone (32.6%) is structural (primary residence); long an res (13.3%) is the actionable illiquid piece.
- ✅ **Concentration**: Investment category (ETF/Fund/Larion) is 28.8% of net worth, diversified across 5 positions.
- ✅ **Liquidity**: Liquid (313.6M) is below the 3× monthly-expense bar (~210M for 70M/mo) but well covered once Savings (1.04B, semi-liquid) is included.
- ✅ **Leverage**: Debt is 1.1% of gross assets — negligible.
- ⚠️ **VCB Visa spend**: July charges so far (11 days) already at 109M, driven by one-off Học phí (61M) + Biếu tặng (43M) — see Debt report for monthly trend.
