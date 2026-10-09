# Portfolio Report — 2026-07-09 19:09

## Summary
| | Amount (₫) | % Gross | % Net |
|-|-----------|---------|-------|
| Gross Assets (reconstructed) | 7,855,319,496 | 100% | — |
| Liabilities (VCB Visa) | −61,000,000 | −0.78% | — |
| **Net Worth (authoritative, totaldashboard)** | **7,721,419,496** | — | **100%** |

Reconstructed net (7,794,319,496) is ~0.94% above the authoritative totaldashboard figure — consistent with the known unrealized-P&L gap on VCBS/VCBF/FPTS/Finhay (cost-basis vs current market value), not a data bug.

## By Account (sorted by balance desc)
| Account | Balance (₫) | % Gross | % Net | Category |
|---------|------------|---------|-------|----------|
| Nhà | 2,500,000,000 | 31.8% | 32.4% | 🏠 Real Estate |
| long an res | 1,020,000,000 | 13.0% | 13.2% | 🏠 Real Estate |
| vàng | 745,000,000 | 9.5% | 9.7% | 🥇 Gold |
| Larion cổ phần | 600,000,000 | 7.6% | 7.8% | 📈 Investment |
| VCBF | 594,063,000 | 7.6% | 7.7% | 📈 Investment (Fund) |
| VCBS | 580,155,620 | 7.4% | 7.5% | 📈 Investment (ETF) |
| vcb 1 month | 505,944,635 | 6.4% | 6.6% | 🏦 Savings |
| tikcop 5m | 401,918,000 | 5.1% | 5.2% | 🏦 Savings |
| FPTS | 346,301,151 | 4.4% | 4.5% | 📈 Investment (Cổ tức) |
| Paypal (USD) | 185,455,826 | 2.4% | 2.4% | 💵 Liquid |
| Tikop | 150,024,366 | 1.9% | 1.9% | 💵 Liquid |
| tikcop 1m | 102,615,984 | 1.3% | 1.3% | 🏦 Savings |
| Finhay | 74,404,069 | 0.9% | 1.0% | 📈 Investment (Fund) |
| tịkcop 1 week | 30,211,192 | 0.4% | 0.4% | 🏦 Savings |
| vcb | 18,114,024 | 0.2% | 0.2% | 💵 Liquid |
| Ví (cash) | 1,000,000 | 0.01% | 0.01% | 💵 Liquid |
| Momo | 104,468 | ~0% | ~0% | 💵 Liquid |
| nam á | 10,867 | ~0% | ~0% | 💵 Liquid |
| Payoneer (USD) | −3,706 | ~0% | ~0% | 💵 Liquid |
| VCB visa | −61,000,000 | −0.78% | −0.79% | 💳 Debt |

Investment wallets (VCBS/VCBF/FPTS/Finhay) valued as cost-basis-remaining (Σ Cho vay − Σ Thu nợ) + currentAmount, per verified formula. "long an res" is grouped under Real Estate (consistent with historical tracking), despite the MISA app currently tagging it as walletType=Investment internally.

## By Category
| Category | Total (₫) | % Gross | % Net |
|----------|----------|---------|-------|
| 🏠 Real Estate | 3,520,000,000 | 44.8% | 45.6% |
| 📈 Investment | 2,194,923,840 | 27.9% | 28.4% |
| 🏦 Savings | 1,040,689,811 | 13.2% | 13.5% |
| 🥇 Gold | 745,000,000 | 9.5% | 9.7% |
| 💵 Liquid | 354,705,845 | 4.5% | 4.6% |
| 💳 Debt | −61,000,000 | −0.78% | −0.79% |

Ghost balance on closed savings book "nam á 6m" (2,005,479, endDate 2024-06-01) excluded from Savings total — still present in the website's `/wallets/savings` response, unresolved by MISA.

## Upcoming Maturities
| Deposit | Amount (₫) | Maturity |
|---------|-----------|----------|
| tịkcop 1 week | 30,211,192 | 2026-07-16 (7 days) |
| tikcop 1m | 102,615,984 | 2026-08-02 (24 days) |
| vcb 1 month | 505,944,635 | 2026-08-09 (31 days) |
| tikcop 5m | 401,918,000 | 2026-10-13 (96 days) |

## Liquidity Check
Instantly accessible (Liquid): 354,705,845 ₫
Due within 30 days (tịkcop 1 week + tikcop 1m): +132,827,176 ₫
→ Total accessible within 30 days: 487,533,021 ₫

## Alerts
- 🔴 **Concentration**: Real Estate category (Nhà + long an res) is 45.6% of net worth — well above the 30% concentration threshold. Nhà alone (32.4%) is expected/structural (primary residence); long an res (13.2%) is the actionable piece — an illiquid investment property adding to an already-concentrated asset class.
- ✅ **Concentration**: Investment category (ETF/Fund/Larion) is 28.4% of net worth, within a reasonable range and diversified across 5 positions.
- ✅ **Liquidity**: Liquid (354.7M) is below the 3× monthly-expense bar (~210M for 70M/mo) but comfortably covered once Savings (1.04B, semi-liquid) is included.
- ✅ **Leverage**: Debt is 0.78% of gross assets — negligible.
