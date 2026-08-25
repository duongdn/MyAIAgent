# Portfolio Report — 2026-08-25 08:53

## Summary
| | Amount (₫) | % Gross | % Net |
|-|-----------|---------|-------|
| Gross Assets (reconstructed) | 8,125,413,692 | 100% | — |
| Liabilities | 0 | 0% | — |
| **Net Worth (authoritative, totaldashboard)** | **8,053,113,692** | — | **100%** |

Reconstructed gross exceeds authoritative NW by 72,300,000₫ — same standing cost-basis-vs-market gap on fund wallets seen every snapshot since 07-24. Not a data error.

## By Account (sorted by balance desc, active accounts only)
| Account | Balance (₫) | % Net | Category |
|---------|------------|-------|----------|
| Nhà | 2,500,000,000 | 31.04% | 🏠 Real Estate |
| Larion cổ phần | 800,000,000 (was 600,000,000) | 9.93% | 📈 Investment |
| vàng (50 units) | 750,000,000 | 9.31% | 🥇 Gold |
| VCBS | 612,455,620 (mkt: 612,855,620) | 7.61% | 📈 Investment |
| VCBF | 594,063,000 | 7.38% | 📈 Investment |
| long an res | 1,020,000,000 | 12.67% | 🏠 Real Estate |
| tikcop 5m | 401,918,000 | 4.99% | 🏦 Savings |
| FPTS | 185,151 (mkt: 381,301,151) | 4.73% | 📈 Investment |
| vcb 6m chứng chỉ tiền gởi | 300,000,000 | 3.73% | 🏦 Savings |
| 6m cake vpbank (9.4%) | 190,000,000 | 2.36% | 🏦 Savings |
| 1m savings | 100,000,000 | 1.24% | 🏦 Savings |
| 6m rút gốc linh hoạt | 100,000,000 | 1.24% | 🏦 Savings |
| tikcop 3m | 100,000,000 | 1.24% | 🏦 Savings |
| Tikop (robo-fund) | 100,024,366 | 1.24% | 💵 Liquid |
| Paypal (USD, convert) | 88,859,560 | 1.10% | 💵 Liquid |
| Finhay | 0 (mkt: 74,404,069) | 0.92% | 📈 Investment |
| vcb | 10,580,749 | 0.13% | 💵 Liquid |
| Momo | 900,000 | 0.01% | 💵 Liquid |
| Ví | 500,000 | 0.01% | 💵 Liquid |
| nam á | 10,867 | 0.00% | 💵 Liquid |
| VCB visa | 0 | 0% | 💳 Debt |
| Payoneer | −3,690 (USD, convert) | 0.00% | 💵 Liquid |

## By Category
| Category | Total (₫) | % Net |
|----------|----------|-------|
| 🏠 Real Estate | 3,520,000,000 | 43.71% |
| 📈 Investment | 2,462,623,840 | 30.58% |
| 🏦 Savings | 1,191,918,000 | 14.80% |
| 🥇 Gold | 750,000,000 | 9.31% |
| 💵 Liquid | 200,871,852 | 2.49% |
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
- ⚠️ Real estate 43.71% of net worth — above 20-30% benchmark, structural, unchanged.
- ⚠️ Liquid cash 2.49% of net worth — below informal comfort floor, backed by 1.19B savings pool.
- ✅ No debt outstanding — VCB Visa balance 0.
- ℹ️ Larion cổ phần revalued 600,000,000 → 800,000,000 (+200,000,000, +33%) — private equity holding, illiquid, manual mark-to-market update by user (not from a transaction). Also flipped `inActive: false` (previously true) — now shown as an active holding. No underlying transaction/cash movement.
- ✅ "6m cake vpbank" (190M) rate upgraded 7.0% → 9.4% on rollover, unchanged from prior snapshot.
