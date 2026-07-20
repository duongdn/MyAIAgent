# Portfolio Report — 2026-07-20 08:56

## Summary
| | Amount (₫) | % Gross | % Net |
|-|-----------|---------|-------|
| Gross Assets (reconstructed) | 7,808,137,607 | 100% | — |
| Liabilities (VCB Visa) | −89,000,000 | −1.1% | — |
| **Net Worth (authoritative, totaldashboard)** | **7,646,237,607** | — | **100%** |

Reconstructed net (7,719,137,607) is ~0.95% above the authoritative totaldashboard figure — consistent with the known unrealized-P&L gap on VCBS/VCBF/FPTS/Finhay (cost-basis vs current market value), same ~1% gap seen in every prior report, not a data bug.

**Net Worth vs last report (2026-07-14):** 7,646,237,607 vs 7,660,677,088 → down 14,439,481 (−0.19%). Investment wallets (VCBS/VCBF/FPTS/Finhay) unchanged — no new Cho vay/Thu nợ activity this period. Gold down 4.5M (price fluctuation). Liquid category net down ~10.0M (routine spend: Đi lại, Xăng xe, Du lịch, Vui chơi giải trí ~4.3M). Savings up ~35K (interest accrual only, no book matured/opened). Debt unchanged at 89M (no new VCB Visa charges since 07-11).

⚠️ **Unresolved anomaly**: within Liquid, Paypal dropped 105,749,820 ₫ (185.4M → 79.6M) while vcb rose 92,704,999 ₫ (26.3M → 119.0M) — same order of magnitude but no matching transaction found in `apiData.transactions` for either wallet in this period. Net Liquid category total is still correct (both balances read live from the API), but the "why" is unverified — flagging rather than guessing a cause.

## By Account (sorted by balance desc)
| Account | Balance (₫) | % Gross | % Net | Category |
|---------|------------|---------|-------|----------|
| Nhà | 2,500,000,000 | 32.0% | 32.7% | 🏠 Real Estate |
| long an res | 1,020,000,000 | 13.1% | 13.3% | 🏠 Real Estate |
| vàng | 737,500,000 | 9.4% | 9.6% | 🥇 Gold |
| Larion cổ phần | 600,000,000 | 7.7% | 7.8% | 📈 Investment |
| VCBS | 594,155,620 | 7.6% | 7.8% | 📈 Investment (ETF) |
| VCBF | 594,063,000 | 7.6% | 7.8% | 📈 Investment (Fund) |
| vcb 1 month | 505,944,635 | 6.5% | 6.6% | 🏦 Savings |
| tikcop 5m | 401,918,000 | 5.1% | 5.3% | 🏦 Savings |
| FPTS | 346,301,151 | 4.4% | 4.5% | 📈 Investment (Cổ tức) |
| vcb | 119,044,133 | 1.5% | 1.6% | 💵 Liquid |
| Tikop | 100,024,366 | 1.3% | 1.3% | 💵 Liquid |
| tikcop 3 month | 100,000,000 | 1.3% | 1.3% | 🏦 Savings |
| Paypal (USD) | 79,628,940 | 1.0% | 1.0% | 💵 Liquid |
| Finhay | 74,404,069 | 1.0% | 1.0% | 📈 Investment (Fund) |
| tịkcop 1 week | 30,246,535 | 0.4% | 0.4% | 🏦 Savings |
| Ví (cash) | 4,000,000 | 0.05% | 0.05% | 💵 Liquid |
| Momo | 900,000 | 0.01% | 0.01% | 💵 Liquid |
| nam á | 10,867 | ~0% | ~0% | 💵 Liquid |
| Payoneer (USD) | −3,709 | ~0% | ~0% | 💵 Liquid |
| VCB visa | −89,000,000 | −1.1% | −1.2% | 💳 Debt |

Investment wallets (VCBS/VCBF/FPTS/Finhay) valued as cost-basis-remaining (Σ Cho vay − Σ Thu nợ) + currentAmount, per verified formula. "long an res" and "Larion cổ phần" grouped consistent with historical tracking despite MISA internally tagging them as walletType=Investment/inactive. All 4 fund wallets unchanged vs 07-14 (no new invest/redeem transactions this period).

## By Category
| Category | Total (₫) | % Gross | % Net |
|----------|----------|---------|-------|
| 🏠 Real Estate | 3,520,000,000 | 45.1% | 46.0% |
| 📈 Investment | 2,208,923,840 | 28.3% | 28.9% |
| 🏦 Savings | 1,038,109,170 | 13.3% | 13.6% |
| 🥇 Gold | 737,500,000 | 9.4% | 9.6% |
| 💵 Liquid | 303,604,597 | 3.9% | 4.0% |
| 💳 Debt | −89,000,000 | −1.1% | −1.2% |

Ghost balance on closed savings book "nam á 6m" (2,005,479, endDate 2024-06-01) excluded — still present in the website's `/wallets/savings` response, unresolved by MISA. Duplicate zero-balance "tikcop 5 week" entry (same maturity 2026-10-13 as "tikcop 5m") is the known stale-currentAmount MISA bug — not a separate asset, no double count.

## Upcoming Maturities
| Deposit | Amount (₫) | Maturity |
|---------|-----------|----------|
| tịkcop 1 week | 30,246,535 | 2026-07-23 (3 days) |
| vcb 1 month | 505,944,635 | 2026-08-09 (20 days) |
| tikcop 3 month | 100,000,000 | 2026-10-10 (82 days) |
| tikcop 5m | 401,918,000 | 2026-10-13 (85 days) |

## Liquidity Check
Instantly accessible (Liquid): 303,604,597 ₫
Due within 30 days (tịkcop 1 week + vcb 1 month): +536,191,170 ₫
→ Total accessible within 30 days: 839,795,767 ₫

## Alerts
- 🔴 **Concentration**: Real Estate category (Nhà + long an res) is 46.0% of net worth — above the 30% concentration threshold. Nhà alone (32.7%) is structural (primary residence); long an res (13.3%) is the actionable illiquid piece.
- ✅ **Concentration**: Investment category (ETF/Fund/Larion) is 28.9% of net worth, diversified across 5 positions.
- ✅ **Liquidity**: Liquid (303.6M) is below the 3× monthly-expense bar (~210M for 70M/mo) but well covered once Savings (1.04B, semi-liquid) is included.
- ✅ **Leverage**: Debt is 1.2% of gross assets — negligible.
- ✅ **VCB Visa**: No new charges since 07-11; balance unchanged at 89M — settle before statement due date.
