# Portfolio Report — 2026-07-24 09:38

## Summary
| | Amount (₫) | % Gross | % Net |
|-|-----------|---------|-------|
| Gross Assets (reconstructed) | 7,769,753,050 | 100% | — |
| Liabilities (VCB Visa) | −89,000,000 | −1.1% | — |
| **Net Worth (authoritative, totaldashboard)** | **7,607,853,050** | — | **100%** |

Reconstructed net (7,680,753,050) is ~0.95% above the authoritative totaldashboard figure — same known unrealized-P&L gap on VCBS/VCBF/FPTS/Finhay (cost-basis vs current market value) seen in every prior report, not a data bug.

**Net Worth vs last report (2026-07-20):** 7,607,853,050 vs 7,646,237,607 → down 38,384,557 (−0.50%) over 4 days. Breakdown accounts for the full drop:
- Gold −37,500,000 (price fluctuation, same 50-unit holding)
- Liquid −919,941 (Ví cash spend −950,000, offset by small Paypal/nam á drift)
- Savings +35,384 (interest accrual only, tịkcop 1 week)
- Investment wallets unchanged (no new Cho vay/Thu nợ this period — VCBS/VCBF/FPTS/Finhay flat)
- Real Estate unchanged
- Debt (VCB Visa) unchanged at −89,000,000 in this snapshot, though a fresh Học phí (61M) + Biếu tặng (43M) + Thể thao (5M) round of charges posted 07/01–07/11 (109M total) and the balance is due for payment — see Debt report alerts.

No unresolved anomalies this period — every category delta reconciles.

## By Account (sorted by balance desc)
| Account | Balance (₫) | % Gross | % Net | Category |
|---------|------------|---------|-------|----------|
| Nhà | 2,500,000,000 | 32.2% | 32.9% | 🏠 Real Estate |
| long an res | 1,020,000,000 | 13.1% | 13.4% | 🏠 Real Estate |
| Larion cổ phần | 600,000,000 | 7.7% | 7.9% | 📈 Investment |
| VCBS | 594,155,620 | 7.6% | 7.8% | 📈 Investment (ETF) |
| VCBF | 594,063,000 | 7.6% | 7.8% | 📈 Investment (Fund) |
| vcb 1 month | 505,944,635 | 6.5% | 6.6% | 🏦 Savings |
| tikcop 5m | 401,918,000 | 5.2% | 5.3% | 🏦 Savings |
| FPTS | 346,301,151 | 4.5% | 4.6% | 📈 Investment (Cổ tức) |
| vàng | 700,000,000 | 9.0% | 9.2% | 🥇 Gold |
| vcb | 119,044,133 | 1.5% | 1.6% | 💵 Liquid |
| Tikop | 100,024,366 | 1.3% | 1.3% | 💵 Liquid |
| tikcop 3 month | 100,000,000 | 1.3% | 1.3% | 🏦 Savings |
| Paypal (USD) | 79,659,000 | 1.0% | 1.0% | 💵 Liquid |
| Finhay | 74,404,069 | 1.0% | 1.0% | 📈 Investment (Fund) |
| tịkcop 1 week | 30,281,919 | 0.4% | 0.4% | 🏦 Savings |
| Ví (cash) | 3,050,000 | 0.04% | 0.04% | 💵 Liquid |
| Momo | 900,000 | 0.01% | 0.01% | 💵 Liquid |
| nam á | 10,867 | ~0% | ~0% | 💵 Liquid |
| Payoneer (USD) | −3,710 | ~0% | ~0% | 💵 Liquid |
| VCB visa | −89,000,000 | −1.1% | −1.2% | 💳 Debt |

Investment wallets (VCBS/VCBF/FPTS/Finhay) valued as cost-basis-remaining (Σ Cho vay − Σ Thu nợ) + currentAmount, per verified formula. "long an res" and "Larion cổ phần" grouped consistent with historical tracking despite MISA internally tagging them as walletType=Investment/inactive. All 4 fund wallets unchanged vs 07-20 (no new invest/redeem transactions this period).

## By Category
| Category | Total (₫) | % Gross | % Net |
|----------|----------|---------|-------|
| 🏠 Real Estate | 3,520,000,000 | 45.3% | 46.3% |
| 📈 Investment | 2,208,923,840 | 28.4% | 29.0% |
| 🏦 Savings | 1,038,144,554 | 13.4% | 13.6% |
| 🥇 Gold | 700,000,000 | 9.0% | 9.2% |
| 💵 Liquid | 302,684,656 | 3.9% | 4.0% |
| 💳 Debt | −89,000,000 | −1.1% | −1.2% |

Ghost balance on closed savings book "nam á 6m" (2,005,479, endDate 2024-06-01) excluded — still present in the website's `/wallets/savings` response, unresolved by MISA.

## Upcoming Maturities
| Deposit | Amount (₫) | Maturity |
|---------|-----------|----------|
| tịkcop 1 week | 30,281,919 | 2026-07-30 (6 days) |
| vcb 1 month | 505,944,635 | 2026-08-09 (16 days) |
| tikcop 3 month | 100,000,000 | 2026-10-10 (78 days) |
| tikcop 5m | 401,918,000 | 2026-10-13 (81 days) |

## Liquidity Check
Instantly accessible (Liquid): 302,684,656 ₫
Due within 30 days (tịkcop 1 week + vcb 1 month): +536,226,554 ₫
→ Total accessible within 30 days: 838,911,210 ₫

## Alerts
- 🔴 **Concentration**: Real Estate category (Nhà + long an res) is 46.3% of net worth — above the 30% concentration threshold. Nhà alone (32.9%) is structural (primary residence); long an res (13.4%) is the actionable illiquid piece.
- ✅ **Concentration**: Investment category (ETF/Fund/Larion) is 29.0% of net worth, diversified across 5 positions.
- ✅ **Liquidity**: Liquid (302.7M) is below the 3× monthly-expense bar (~210M for 70M/mo) but well covered once Savings (1.04B, semi-liquid) is included.
- ✅ **Leverage**: Debt is 1.2% of gross assets — negligible.
- 🟡 **VCB Visa**: 109M in new charges posted this period (Học phí 61M, Biếu tặng 43M, Thể thao 5M) — 2.5x the 6-month average monthly spend. Balance currently shows 89M owed (statement timing) — settle before due date. See Debt report for full spike detail.
