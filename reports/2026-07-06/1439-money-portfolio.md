# Portfolio Report — 2026-07-06 14:39

## Summary
| | Amount (₫) | % Gross | % Net |
|-|-----------|---------|-------|
| Gross Assets | 7,872,791,270 | 100% | — |
| Liabilities  | −61,003,705 | −0.77% | — |
| **Net Worth (self-calc)** | **7,811,787,566** | — | **100%** |
| **Net Worth (dashboard, authoritative)** | **7,738,887,566** | — | — |

`nam á 6m` (walletId `9f37c5f5...`, 2023-12-01 to 2024-06-01, 8%) excluded — user confirmed 2026-07-06 it was fully withdrawn long ago and no longer exists in the app. Its `currentAmount` (2,005,479.45) is stale ghost data on MISA's side (all other closed/duplicate "nam á 6m" books correctly show 0). See Alerts.

## By Account (grouped by category, sorted by balance desc within)

**Nhà (2,500,000,000 ₫) excluded from this table** — primary residence, currently lived in, not tradeable/sellable, so it distorts % if included. Percentages below are of investable assets ex-Nhà (5,372,791,270 ₫). Nhà is still counted in Summary/By Category above and in Net Worth.

| Account | Balance (₫) | % of investable (excl. Nhà) | Category |
|---------|------------:|------:|----------|
| long an res (inactive) | 1,020,000,000 | 18.98% | 🏠 Real Estate |
| Larion cổ phần (inactive) | 600,000,000 | 11.17% | 📈 Investment |
| VCBF | 594,063,000 | 11.06% | 📈 Investment |
| VCBS | 553,155,620 | 10.30% | 📈 Investment |
| FPTS | 349,136,151 | 6.50% | 📈 Investment |
| Tikop | 195,024,366 | 3.63% | 📈 Investment |
| Finhay | 74,404,069 | 1.38% | 📈 Investment |
| vcb 1 month (savings) | 503,977,053 | 9.38% | 🏦 Savings |
| tikcop 5m (savings) | 401,918,000 | 7.48% | 🏦 Savings |
| tikcop 1m (savings) | 102,615,984 | 1.91% | 🏦 Savings |
| tịkcop 1 week (savings) | 30,175,891 | 0.56% | 🏦 Savings |
| ~~nam á 6m (savings) — 2,005,479~~ | — | — | 🐛 EXCLUDED (ghost, see Alerts) |
| vàng (inactive) | 757,000,000 | 14.09% | 🥇 Gold |
| Paypal | 185,399,778 | 3.45% | 💵 Liquid |
| vcb | 5,256,024 | 0.10% | 💵 Liquid |
| Ví | 550,000 | 0.01% | 💵 Liquid |
| Momo (inactive) | 104,468 | 0.00% | 💵 Liquid |
| nam á (inactive) | 10,867 | 0.00% | 💵 Liquid |
| Payoneer (inactive) | −3,705 | −0.00% | 💵 Liquid |
| VCB visa | −61,000,000 | −1.14% | 💳 Debt |

VCBS/VCBF/FPTS/Finhay valued via cost-basis-remaining + currentAmount formula (see skill notes), not raw currentAmount.

## By Category
| Category | Total (₫) | % Gross | % Net |
|----------|----------:|--------:|------:|
| 🏠 Real Estate | 3,520,000,000 | 44.71% | 45.06% |
| 📈 Investment | 2,365,783,206 | 30.05% | 30.28% |
| 🏦 Savings | 1,038,686,927 | 13.19% | 13.30% |
| 🥇 Gold | 757,000,000 | 9.62% | 9.69% |
| 💵 Liquid | 191,317,433 | 2.43% | 2.45% |
| 💳 Debt | −61,000,000 | −0.77% | −0.78% |

## Upcoming Maturities
| Deposit | Amount (₫) | Rate | Maturity |
|---------|-----------:|-----:|----------|
| tịkcop 1 week | 30,175,891 | 6.1% | 2026-07-09 |
| vcb 1 month | 503,977,053 | 4.75% | 2026-07-09 |
| tikcop 1m | 102,615,984 | 6.3% | 2026-08-02 |
| tikcop 5m | 401,918,000 | 7.5% | 2026-10-13 |

No already-matured-but-idle books remain once the ghost `nam á 6m` is excluded.

## Liquidity Check
Instantly accessible (Liquid): 191,317,433 ₫
Due within 30 days (2 maturities on 2026-07-09): +534,152,944 ₫

## Alerts
- 🔴 Real Estate concentration: 44.71% of gross (Nhà 32.00% net alone) — above healthy single-category threshold
- 🟡 "Nhà" single account is 32.00% of net worth (>25% single-asset threshold) — but it's the primary residence (non-tradeable), not a rebalance-able risk in the usual sense
- 🐛 **Data bug confirmed**: `/wallets/savings` returns a stale nonzero `currentAmount` (2,005,479.45 ₫) for a closed "nam á 6m" book (finalized 2024-06-01) that user confirmed is fully withdrawn and no longer in the app — all its sibling closed "nam á 6m" duplicates correctly show 0. Excluded from every total above. The official dashboard Net Worth (7,738,887,566) likely still includes this ~2M ghost balance since `/wallets/totaldashboard` aggregates the same savings data — treat true Net Worth as ~7,736,882,087 (−2,005,479) until MISA fixes it or the book is manually closed on their side.
- ✅ Liquidity: Liquid (191M) alone covers ~2.7× monthly expense (70M); Liquid+Savings (1,230M) covers ~17.6× — well above 3× target
- ✅ Leverage: Debt is 0.77% of gross — negligible
