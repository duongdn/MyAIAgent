# Portfolio Report — 2026-09-14 09:38

## Summary
| | Amount (₫) | % Gross | % Net |
|-|-----------|---------|-------|
| Gross Assets (reconstructed) | 8,138,625,876 | 100% | — |
| Liabilities (VCB visa + Payoneer FX) | ~0 | ~0% | — |
| **Net Worth (MISA totaldashboard + Larion 800M)** | **8,068,325,876** | — | **100%** |

Gap gross-recon vs headline: 70,299,999.76 ₫ (~0.87%) — consistent with the known stable reconciliation gap pattern (see memory), not an anomaly this run.

## By Account (sorted by balance desc)
| Account | Balance (₫) | % Gross | % Net | Category |
|---------|------------|---------|-------|----------|
| Nhà | 2,500,000,000 | 30.72% | 30.99% | 🏠 Real Estate |
| Sổ tiết kiệm (91 sổ, active) | 1,202,333,123 | 14.77% | 14.90% | 🏦 Savings |
| long an res | 1,020,000,000 | 12.53% | 12.64% | 🏠 Real Estate |
| VCBS | 669,655,620 | 8.23% | 8.30% | 📈 Investment |
| VCBF | 594,063,000 | 7.30% | 7.36% | 📈 Investment |
| vàng | 730,000,000 | 8.97% | 9.05% | 🥇 Gold |
| Larion cổ phần | 800,000,000 | 9.83% | 9.92% | 📈 Investment |
| FPTS | 381,301,151 | 4.69% | 4.73% | 📈 Investment |
| Paypal | 91,985,530 | 1.13% | 1.14% | 💵 Liquid |
| Finhay | 74,404,069 | 0.91% | 0.92% | 📈 Investment |
| Tikop | 40,624,366 | 0.50% | 0.50% | 💵 Liquid |
| vcb | 33,251,805 | 0.41% | 0.41% | 💵 Liquid |
| Momo | 900,000 | 0.01% | 0.01% | 💵 Liquid |
| Ví | 100,000 | 0.00% | 0.00% | 💵 Liquid |
| nam á | 10,867 | 0.00% | 0.00% | 💵 Liquid |
| Payoneer | -3,655 | 0.00% | 0.00% | 💵 Liquid |
| VCB visa | 0 | 0% | 0% | 💳 Debt |

## By Category
| Category | Total (₫) | % Gross | % Net |
|----------|----------|---------|-------|
| 📈 Investment | 2,519,423,840 | 30.96% | 31.23% |
| 🏠 Real Estate | 3,520,000,000 | 43.26% | 43.63% |
| 🏦 Savings | 1,202,333,123 | 14.77% | 14.90% |
| 🥇 Gold | 730,000,000 | 8.97% | 9.05% |
| 💵 Liquid | 166,868,913 | 2.05% | 2.07% |
| 💳 Debt | 0 | 0% | 0% |

## Upcoming Maturities (savings, next 8)
| Deposit | Amount (₫) | Maturity |
|---------|-----------|----------|
| tikcop 1w | 10,011,699 | 2026-09-15 |
| 1m (rollover) | 100,403,425 | 2026-10-10 |
| tikcop 3 month | 100,000,000 | 2026-10-10 |
| tikcop 5m | 401,918,000 | 2026-10-13 |
| (sổ) | 300,000,000 | 2027-02-10 |
| (sổ) | 100,000,000 | 2027-02-10 |
| (sổ) | 190,000,000 | 2027-02-25 |

## Liquidity Check
Instantly accessible (Liquid): 166,868,913 ₫
Liquid + Savings (semi-liquid): 1,369,202,036 ₫ — vs 6-month expense target 420M → 3.26× coverage.

## Data Quality
🐛 Confirmed data bug (recurring, see memory): savings book "nam á 6m" (endDate 2024-06-01) still shows ghost `currentAmount` 2,005,479 ₫ — excluded from all totals above. MISA's official `totaldashboard` likely still includes it internally.

## Alerts
- ✅ No single account exceeds 50% net worth (Nhà largest at 30.99%).
- ✅ Liquid+Savings comfortably above 3× monthly-expense target.
- ✅ No leverage — VCB visa balance is 0, no active debt.
