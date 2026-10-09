# Portfolio Report — 2026-08-25 08:40

## Summary
| | Amount (₫) | % Gross | % Net |
|-|-----------|---------|-------|
| Gross Assets (reconstructed) | 7,925,413,692 | 100% | — |
| Liabilities | 0 | 0% | — |
| **Net Worth (authoritative, totaldashboard)** | **7,853,113,692** | — | **100%** |

Reconstructed gross exceeds authoritative NW by 72,300,000₫ — standing cost-basis-vs-market-value gap on fund wallets (VCBS/FPTS use cost-basis carry, not live NAV), unchanged from every snapshot since 07-24. Not a data error.

## By Account (sorted by balance desc, active accounts only)
| Account | Balance (₫) | % Net | Category |
|---------|------------|-------|----------|
| Nhà | 2,500,000,000 | 31.83% | 🏠 Real Estate |
| vàng (50 units) | 750,000,000 | 9.55% | 🥇 Gold |
| VCBS | 612,455,620 (mkt: 612,855,620) | 7.81% | 📈 Investment |
| VCBF | 594,063,000 | 7.56% | 📈 Investment |
| Larion cổ phần | 600,000,000 | 7.64% | 📈 Investment |
| long an res | 1,020,000,000 | 12.99% | 🏠 Real Estate |
| tikcop 5m | 401,918,000 | 5.12% | 🏦 Savings |
| FPTS | 185,151 (mkt: 381,301,151) | 4.86% | 📈 Investment |
| vcb 6m chứng chỉ tiền gởi | 300,000,000 | 3.82% | 🏦 Savings |
| 6m cake vpbank (9.4%, up from 7.0%) | 190,000,000 | 2.42% | 🏦 Savings |
| 1m savings | 100,000,000 | 1.27% | 🏦 Savings |
| 6m rút gốc linh hoạt | 100,000,000 | 1.27% | 🏦 Savings |
| tikcop 3m | 100,000,000 | 1.27% | 🏦 Savings |
| Tikop (robo-fund) | 100,024,366 | 1.27% | 💵 Liquid |
| Paypal (USD, convert) | 88,859,560 | 1.13% | 💵 Liquid |
| Finhay | 0 (mkt: 74,404,069) | 0.95% | 📈 Investment |
| vcb | 10,580,749 | 0.13% | 💵 Liquid |
| Momo | 900,000 | 0.01% | 💵 Liquid |
| Ví | 500,000 | 0.01% | 💵 Liquid |
| nam á | 10,867 | 0.00% | 💵 Liquid |
| VCB visa | 0 | 0% | 💳 Debt |
| Payoneer | −3,690 (USD, convert) | 0.00% | 💵 Liquid |

Investment wallets use market-value formula (cost_basis_remaining + currentAmount) — see below, not raw currentAmount.

## By Category
| Category | Total (₫) | % Net |
|----------|----------|-------|
| 🏠 Real Estate | 3,520,000,000 | 44.82% |
| 📈 Investment | 2,262,623,840 | 28.81% |
| 🥇 Gold | 750,000,000 | 9.55% |
| 🏦 Savings | 1,191,918,000 | 15.18% |
| 💵 Liquid | 200,871,852 | 2.56% |
| 💳 Debt | 0 | 0% |

Ghost balance "nam á 6m" (2,005,479₫) excluded — closed book, stuck in `/wallets/savings`, unresolved MISA bug (long-standing).

## Upcoming Maturities (next 90 days)
| Deposit | Amount (₫) | Maturity |
|---------|-----------|----------|
| 1m savings | 100,000,000 | 2026-09-10 |
| tikcop 3m | 100,000,000 | 2026-10-10 |
| tikcop 5m | 401,918,000 | 2026-10-13 |

## Liquidity Check
Instantly accessible (Liquid): 200,871,852 ₫
Due within 30 days (1m savings 09-10): +100,000,000 ₫
Savings pool total (semi-liquid, all maturities): 1,191,918,000 ₫

## Alerts
- ⚠️ Real estate 44.82% of net worth — above 20-30% benchmark, structural (Nhà + long an res), unchanged.
- ⚠️ Liquid cash 2.56% of net worth — below informal comfort floor, but backed by 1.19B savings pool maturing within 12 months.
- ✅ No debt outstanding — VCB Visa balance 0.
- ✅ No single liquid account concentration risk.
- ✅ "6m cake vpbank" (190M) rate upgraded 7.0% → 9.4% on rollover — +2.4pp, adds ~4.56M/year, no principal change.
