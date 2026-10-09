# Portfolio Report — 2026-08-10 11:21

## Summary
| | Amount (₫) | % Gross | % Net |
|-|-----------|---------|-------|
| Gross Assets (reconstructed) | 7,734,843,974 | 100% | — |
| Liabilities | 0 | 0% | — |
| **Net Worth (authoritative, totaldashboard)** | **7,661,943,974** | — | **100%** |

Reconstructed net (7,734,843,974) is 72,900,000 above the authoritative totaldashboard figure — **the identical gap to the đồng as every prior snapshot since 07-24**, i.e. the standing cost-basis-vs-market-value difference on VCBF/FPTS/Finhay. Not a data bug.

**Net Worth vs last report (2026-07-29):** 7,594,705,196 → 7,661,943,974 → **+67,238,778 (+0.89%)**. Reconciles exactly:

| Category | Δ (₫) | Cause |
|----------|-------|-------|
| 🥇 Gold | +12,500,000 | Price up, same 50 units (14,150,000 → 14,400,000/unit, +1.77%) |
| 📈 Investment | +26,000,000 | FPTS: 6× `Cho vay` VEA (20,630,000) + lãi cp 1,900,000 + currentAmount +5,370,000 |
| 🏦 Savings | −5,944,635 | `vcb 1 month` (505,944,635) matured 09/08, redeployed 500M into 3 new books (300M+100M+100M) |
| 💵 Liquid | −64,816,588 | `vcb` −74,110,564 (Lương +66.9M / expenses −22M / visa payoff + new-savings transfers); Paypal +9,293,960 (USD 3,006→3,371, FX 26,525→26,410) |
| 💳 Debt | +99,500,000 | **VCB Visa fully paid off** (99,500,000 → 0) |
| **Total** | **+67,238,777** | **≈ exact NW delta ✅** (1₫ rounding) |

**Key structural change:** `vcb 1 month` (505,944,635 @ 4.75%) matured 09/08. On 10/08 the capital was redeployed into three new savings books — see Upcoming Maturities. The 5,944,635 difference (matured principal vs 500M reinvested) plus interest flowed into `vcb` liquid.

## By Account (sorted by balance desc)
| Account | Balance (₫) | % Gross | % Net | Category |
|---------|------------|---------|-------|----------|
| Nhà | 2,500,000,000 | 32.32% | 32.63% | 🏠 Real Estate |
| long an res | 1,020,000,000 | 13.19% | 13.31% | 🏠 Real Estate |
| vàng (50 units @ 14.4M) | 720,000,000 | 9.31% | 9.40% | 🥇 Gold |
| VCBS | 612,855,620 | 7.92% | 8.00% | 📈 Investment (ETF) |
| Larion cổ phần | 600,000,000 | 7.76% | 7.83% | 📈 Investment |
| VCBF | 594,063,000 | 7.68% | 7.75% | 📈 Investment (Fund) |
| tikcop 5m | 401,918,000 | 5.20% | 5.25% | 🏦 Savings |
| FPTS | 381,301,151 | 4.93% | 4.98% | 📈 Investment (Cổ tức) |
| vcb 6m CCTG | 300,000,000 | 3.88% | 3.92% | 🏦 Savings |
| Tikop | 100,024,366 | 1.29% | 1.31% | 💵 Liquid |
| tikcop 3 month | 100,000,000 | 1.29% | 1.31% | 🏦 Savings |
| 6m rút gốc | 100,000,000 | 1.29% | 1.31% | 🏦 Savings |
| 1m | 100,000,000 | 1.29% | 1.31% | 🏦 Savings |
| Paypal (USD 3,371 @ 26,410) | 89,028,110 | 1.15% | 1.16% | 💵 Liquid |
| Finhay | 74,404,069 | 0.96% | 0.97% | 📈 Investment (Fund) |
| vcb | 39,042,488 | 0.50% | 0.51% | 💵 Liquid |
| Ví (cash) | 1,300,000 | 0.02% | 0.02% | 💵 Liquid |
| Momo | 900,000 | 0.01% | 0.01% | 💵 Liquid |
| nam á | 10,867 | ~0% | ~0% | 💵 Liquid |
| Payoneer (USD −0.14) | −3,697 | ~0% | ~0% | 💵 Liquid |

Investment wallets valued as cost-basis-remaining (Σ Cho vay − Σ Thu nợ) + `currentAmount`, per verified formula:

| Wallet | Cost basis remaining | + currentAmount | = Value | Lifetime Tiền lãi |
|--------|---------------------|-----------------|---------|-------------------|
| VCBS | 400,000 | 612,455,620 | 612,855,620 | 21,600,000 |
| VCBF | 594,063,000 | 0 | 594,063,000 | 34,063,000 |
| FPTS | 374,116,000 | 7,185,151 | 381,301,151 | 31,000,000 |
| Finhay | 74,404,069 | 0 | 74,404,069 | 4,404,000 |

**Note on VCBS:** cost basis reads only 400K because the Cho vay/Thu nợ ledger was settled in the June redemption cycle; position carried directly as `currentAmount` (market value). Fully invested, not idle cash.
**Note on FPTS:** +26.0M vs 07-29 — six VEA `Cho vay` purchases (07-29→08-06, 20,630,000 total) + `Tiền lãi` lãi cp 1,900,000 (08-06) + currentAmount +5,370,000 (residual cash). Cost-basis accumulation on track.

`long an res` and `Larion cổ phần` grouped consistent with historical tracking. `Tikop` classified 💵 Liquid (robo-savings cash-parking product), not Investment, despite walletType=3.

## By Category
| Category | Total (₫) | % Gross | % Net |
|----------|----------|---------|-------|
| 🏠 Real Estate | 3,520,000,000 | 45.51% | 45.94% |
| 📈 Investment | 2,262,623,840 | 29.25% | 29.53% |
| 🏦 Savings | 1,001,918,000 | 12.95% | 13.08% |
| 🥇 Gold | 720,000,000 | 9.31% | 9.40% |
| 💵 Liquid | 230,302,134 | 2.98% | 3.01% |
| 💳 Debt | 0 | 0% | 0% |

🐛 Ghost balance on closed savings book "nam á 6m" (2,005,479 ₫, endDate 2024-06-01) excluded from all totals — confirmed MISA data bug, still present in `/wallets/savings`, unresolved.

## Upcoming Maturities
| Deposit | Amount (₫) | Rate | Maturity |
|---------|-----------|------|----------|
| 1m | 100,000,000 | 4.75% | 2026-09-10 (31 days) |
| tikcop 3 month | 100,000,000 | 8.1% | 2026-10-10 (61 days) |
| tikcop 5m | 401,918,000 | 7.5% | 2026-10-13 (64 days) |
| vcb 6m CCTG | 300,000,000 | 7.5% | 2027-02-10 (184 days) |
| 6m rút gốc | 100,000,000 | 7.0% | 2027-02-10 (184 days) |

**Δ vs 07-29:** `vcb 1 month` (505,944,635 @ 4.75%) removed — matured & redeployed. Three new books opened 10/08 (all created today 10:36–10:43): vcb 6m CCTG 300M @ 7.5%, 6m rút gốc 100M @ 7.0%, 1m 100M @ 4.75%.

## Liquidity Check
- Instantly accessible (Liquid): **230,302,134 ₫** — 3.3 months of the 70M/month assumption
- Due within 30 days: none (next maturity 1m on 09-10, 31 days)
- Liquid + Savings = **1,232,220,134 ₫** = 17.6 months of basic expenses
- Listed equity (VCBS 612.9M + FPTS 381.3M) sellable T+2 if genuinely needed, but at market risk — counted as investment, not liquidity.

## Alerts
- 🔴 **Concentration**: Real Estate is 45.94% of net worth, above the 30% threshold. Nhà (32.63%) is structural/primary residence; long an res (13.31%) is the actionable illiquid piece. Unchanged, tracked since prior reports.
- ✅ **Debt eliminated**: VCB Visa fully paid off — Liabilities now 0. The 99.5M that had sat unpaid 18 days is gone.
- ✅ **Savings restructured**: 505.9M @ 4.75% → 500M across 7.0–7.5% (300M @ 7.5%, 100M @ 7.0%) with only 100M kept at 4.75% (1-month, likely for near-term liquidity). Matches the 07-29 recommendation.
- ✅ **Capital deployment**: all four fund wallets fully invested — no idle capital in brokerage accounts.
- ✅ **Leverage**: Debt 0% of gross assets.
- 🟡 **Liquid thinned**: 230.3M is the lowest liquid reading since 07-14 (302.7M). Still 3.3 months coverage + 1.23B with savings, but the 99.5M visa payoff + savings redeployment drew it down. Watch if large charges return.
