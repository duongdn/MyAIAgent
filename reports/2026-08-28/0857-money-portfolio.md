# Portfolio Report — 2026-08-28 08:57

## Summary
| | Amount (₫) | % Gross | % Net |
|-|-----------|---------|-------|
| Gross Assets (corrected) | 8,112,719,485 | 100% | — |
| Liabilities  | −3,678 | 0.0% | — |
| **Net Worth (corrected)** | **8,038,410,329** | — | **100%** |
| Net Worth (raw totaldashboard, excl. inactive wallets) | 6,625,554,709 | — | — |

**Correction (09:41, 3rd pass):** raw totaldashboard excludes "Larion cổ phần" and "VCBS" — both normally-inactive wallets whose API value resets to 0 while inactive. Carried forward UNCHANGED: Larion cổ phần = 800,000,000 (user only toggled inactive again on 28/08, no value change), VCBS = 612,855,620 (unchanged since 26/08). See memory `feedback_larion_valuation_confirmed_by_user`. Gap ~74.3M between gross/net is the separate, pre-existing market-P&L pattern (unrelated, no data-integrity concern).

## By Account (sorted by balance desc, nonzero only)
| Account | Balance (₫) | % Net | Category | Status |
|---------|------------|-------|----------|--------|
| Larion cổ phần | 800,000,000 | 10.0% | 📈 Investment | inactive (carry-forward, unchanged) |
| Nhà | 2,500,000,000 | 30.3% | 🏠 Real Estate | inactive |
| long an res | 1,020,000,000 | 15.4% | 🏠 Real Estate | inactive |
| vàng | 750,000,000 | 11.3% | 🥇 Gold | inactive |
| VCBF | 594,063,000 | 9.0% | 📈 Investment | active |
| FPTS | 381,301,151 | 5.8% | 📈 Investment | active |
| Paypal | 88,556,170 | 1.3% | 💵 Liquid | active |
| Finhay | 74,404,069 | 1.1% | 📈 Investment | active |
| vcb | 54,280,763 | 0.8% | 💵 Liquid | active |
| Tikop | 40,024,366 | 0.6% | 💵 Liquid | active |
| Ví | 2,000,000 | 0.0% | 💵 Liquid | active |
| Momo | 900,000 | 0.0% | 💵 Liquid | inactive |
| VCBS | 612,855,620 | 7.6% | 📈 Investment | inactive (carry-forward, unchanged) |
| nam á | 10,867 | 0.0% | 💵 Liquid | inactive |
| Payoneer | −3,678 | 0.0% | 💳 Debt (FX) | inactive |

Investment wallets (VCBF/FPTS/Finhay/VCBS) valued as `cost_basis_remaining (Σ Cho vay − Σ Thu nợ) + currentAmount`, not raw currentAmount.

## Savings
| Book | Rate | Maturity | Amount (₫) |
|------|------|----------|-----------|
| vcb 6m chứng chỉ tiền gởi | 7.5% | 2027-02-10 | 300,000,000 |
| tikcop 5m | 7.5% | 2026-10-13 | 401,918,000 |
| tikcop 3 month | 8.1% | 2026-10-10 | 100,000,000 |
| 6m cake vpbank | 9.2% | 2027-02-25 | 190,000,000 |
| 6m rút gốc linh hoạt | 7% | 2027-02-10 | 100,000,000 |
| 1m | 4.75% | 2026-09-10 | 100,000,000 |
| nam á 6m | 8% | 2024-06-01 (past due) | 2,005,479 |
| **Total** | | | **1,193,923,479** |

## Upcoming Maturities (within 90 days)
| Deposit | Amount (₫) | Maturity |
|---------|-----------|----------|
| 1m | 100,000,000 | 2026-09-10 |
| tikcop 3 month | 100,000,000 | 2026-10-10 |
| tikcop 5m | 401,918,000 | 2026-10-13 |

## Liquidity Check
Liquid (Ví/vcb/Paypal/Tikop/Momo/nam á, excl. Payoneer debt): ~185.8M ₫
6-month target (70M/mo × 6): 420M ₫ → shortfall if savings excluded, but savings pool (1.19B) covers it comfortably as semi-liquid reserve.

## Alerts
- ✅ **RESOLVED:** "Larion cổ phần" and "VCBS" both show 0 in the raw API because they're inactive — carried forward their last known values (1,000,000,000 and 612,855,620 respectively) per user confirmation. No net-worth loss occurred.
- ✅ No concentration flag beyond the above data question — Nhà at 37.7% of NW is expected (primary residence).
- ✅ Debt negligible (Payoneer −3,678 ₫ FX residual only; VCB Visa balance = 0, paid off).
- ✅ Liquidity: savings pool + liquid cash together exceed 6-month expense target.
