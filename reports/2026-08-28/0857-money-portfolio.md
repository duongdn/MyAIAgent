# Portfolio Report — 2026-08-28 08:57

## Summary
| | Amount (₫) | % Gross | % Net |
|-|-----------|---------|-------|
| Gross Assets | 6,699,863,865 | 100% | — |
| Liabilities  | −3,678 | 0.0% | — |
| **Net Worth (authoritative)** | **6,625,554,709** | — | **100%** |

Note: gross reconstructed total (6,699,863,865) vs authoritative totaldashboard (6,625,554,709) — gap ~74.3M, consistent with the historical ~70–75M pattern (market P&L not captured in cost-basis calc). No data-integrity concern.

## By Account (sorted by balance desc, nonzero only)
| Account | Balance (₫) | % Net | Category | Status |
|---------|------------|-------|----------|--------|
| Nhà | 2,500,000,000 | 37.7% | 🏠 Real Estate | inactive |
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
| VCBS | 400,000 | 0.0% | 📈 Investment | inactive |
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
- ⚠️ **MAJOR CHANGE:** "Larion cổ phần" wallet dropped from 800,000,000 (confirmed valid sale-price valuation, memory `feedback_larion_valuation_confirmed_by_user`) to **0** and is now marked inactive — no transaction record explains this (balance was a manual entry, not transaction-derived). This drives essentially the entire ~1.43B net-worth drop vs the 2026-08-26 snapshot. **Needs user confirmation**: was this proceeds already moved/withdrawn elsewhere, or an accidental wallet reset/deactivation?
- ✅ No concentration flag beyond the above data question — Nhà at 37.7% of NW is expected (primary residence).
- ✅ Debt negligible (Payoneer −3,678 ₫ FX residual only; VCB Visa balance = 0, paid off).
- ✅ Liquidity: savings pool + liquid cash together exceed 6-month expense target.
