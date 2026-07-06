# Asset Allocation — 2026-07-06 14:39

## Tỉ lệ tài sản (excl. Nhà 2.5B — non-tradeable primary residence)

Total investable assets: 5,372,791,270 ₫ (excludes confirmed ghost balance, see note below)

| Loại | Tổng (₫) | % Total | Ghi chú |
|------|---------:|--------:|---------|
| 📈 Investment (ETF/Fund/Cổ phần) | 2,170,758,840 | 40.40% | VCBS+VCBF+FPTS+Finhay+Larion |
| 🏦 Savings (Tiết kiệm) | 1,038,686,927 | 19.33% | 4 active books |
| 🏠 Real Estate (long an res) | 1,020,000,000 | 18.98% | Land, not primary residence |
| 🥇 Gold (Vàng) | 757,000,000 | 14.09% | 50 units VGO |
| 💵 Liquid (Tiền mặt) | 386,341,799 | 7.19% | Bank + e-wallet + Paypal + Tikop |

**Reclassified 2026-07-06 (user correction)**: `Tikop` (195,024,366 ₫) moved from 📈 Investment → 💵 Liquid — it's a robo-savings/cash-parking product, not a growth investment like VCBS/VCBF/FPTS/Finhay.

**Data bug confirmed 2026-07-06**: excluded a stale 2,005,479 ₫ ghost balance on a closed "nam á 6m" savings book (finalized 2024-06-01) — user confirmed it was fully withdrawn and no longer exists in the app. MISA's `/wallets/savings` API still returns it as nonzero while every other closed duplicate of the same name correctly shows 0.

## Chi tiết ETF + Fund
ETF (VCBS) — VN30/VN100/VN1000: 553,155,620 ₫
Fund (VCBF) — managed fund: 594,063,000 ₫
Cổ tức (FPTS) — VEA/ADP/ETF: 349,136,151 ₫
Fund (Finhay): 74,404,069 ₫
Cổ phần tư nhân (Larion): 600,000,000 ₫
Robo-advisor (Tikop, nay tính vào Liquid): 195,024,366 ₫

## Visual ASCII bar chart (excl. home)
```
Investment  ████████████████████████████████████████       40.4%
Savings     ███████████████████                             19.3%
Real Estate ███████████████████                             19.0%
Gold        ██████████████                                   14.1%
Liquid      ███████                                            7.2%
```

## Nhận xét
- Liquidity ratio: Liquid+Savings = 1,425,028,726 ₫ ≈ 26.5% of gross (excl home), covers ~20.4× monthly expense (70M/month).
- Upcoming maturities: 534M rolling off 2026-07-09 (2 books), 102.6M on 2026-08-02, 401.9M on 2026-10-13 — reinvestment decision needed for the first two soon.
- Investment book shows active DCA pattern (frequent small "Cho vay" entries Dec 2025–Jun 2026) plus a large VCBS partial redemption (~750M) in June 2026 — recent rebalancing event, residual cash (553M) still shown as VCBS "true value" until redeployed or withdrawn.
- Gold at 14.1% (excl home) is a meaningful inflation hedge, above typical 5-15% benchmark upper band.
- With Tikop reclassified as Liquid, Investment (40.4%) is now below the 30-50% benchmark band's midpoint but still within range excl-home; in the incl-home view it drops below the 30% floor (see Benchmark comparison).

---

## Full View (incl. Nhà 2.5B)

Total gross assets: 7,872,791,270 ₫

| Loại | Tổng (₫) | % Total |
|------|---------:|--------:|
| 🏠 Real Estate | 3,520,000,000 | 44.71% |
| 📈 Investment | 2,170,758,840 | 27.57% |
| 🏦 Savings | 1,038,686,927 | 13.19% |
| 🥇 Gold | 757,000,000 | 9.62% |
| 💵 Liquid | 386,341,799 | 4.91% |

Note: `trueTotalBalance` (dashboard, authoritative) = 7,738,887,566 ₫ — likely still includes the ~2M ghost balance above since `/wallets/totaldashboard` aggregates the same savings data (true figure probably ~7,736,882,087 ₫). The cost-basis reconstruction above (7,872,791,270 ₫) differs by ~0.94%, expected market-value-vs-cost-basis variance, unrelated to the ghost-balance bug.

## Finance Review

### 1. Điểm mạnh (Strengths)
- Leverage is negligible: liabilities are 0.77% of gross assets.
- Diversified income: salary (Lương, vcb) + freelance USD income (Paypal, Freelancer category, ~10.8M₫ so far in July) + investment interest/dividends (Tiền lãi, Lãi tiết kiệm).
- Systematic DCA discipline into VCBS/VCBF/FPTS/Finhay — dozens of small, regular "Cho vay" contributions Dec 2025 through Jun 2026, not lump-sum timing bets.
- Active capital management: laddered savings across 1-week/1-month/5-month terms plus a large VCBS redemption in June 2026 suggests ongoing rebalancing rather than passive drift.
- Emergency reserve (Liquid + Savings, 1,425.0M₫, incl. Tikop) is ~20.4× monthly expense (70M₫) / ~3.4× the 6-month target (420M₫) — very strong liquidity buffer, no forced-sale risk.
- Gold allocation (9.6% gross / 14.1% ex-home) is a sensible inflation hedge and is itself liquid-ish (tradeable).

### 2. Rủi ro (Risks)
| Risk | Severity | Detail |
|------|----------|--------|
| Real estate concentration | 🔴 Cao | 44.71% of gross assets (>40% threshold); "Nhà" alone is 32.00% of net worth, over the 25% single-asset flag. Mitigated by: it's the primary residence, illiquid by nature and not typically "rebalanced" — but it does mean over 40% of net worth carries zero market liquidity. |
| Investment below benchmark floor | 🟢 Thấp | 27.57% of gross (incl-home view), just under the 30% benchmark floor after reclassifying Tikop as Liquid — not urgent given the very strong liquidity buffer, but a signal that new surplus cash could lean toward ETF/Fund DCA rather than more cash-parking. |
| FX/currency diversification | 🟡 Trung bình | Foreign-currency exposure (Paypal + Payoneer) is only 2.35% of gross — under the 5% benchmark floor, meaning very limited USD hedge against VND depreciation. |
| VCB visa outstanding balance | 🟢 Thấp | −61M₫ current balance (mostly a single 61M Học phí/tuition charge on 2026-07-01), 0.77% of gross — pay off on schedule, not a spike (1.39× the 6-month avg charge of ~43.8M₫, below the 2× spike threshold). |
| Single-market equity concentration | 🟢 Thấp | All ETF/fund exposure (VCBS/VCBF/FPTS/Finhay) is VN-market only — no international equity diversification, but position sizes are modest relative to net worth. |

### 3. Benchmark comparison
| Nhóm | Actual (incl. home) | Benchmark | Status |
|------|---------------------:|-----------|:------:|
| Bất động sản | 44.71% | 20–30% | ⚠️ Over |
| Cổ phiếu/ETF/Fund | 27.57% | 30–50% | ⚠️ Slightly under (was 30.05% before Tikop reclass) |
| Trái phiếu/Tiết kiệm | 13.19% | 10–20% | ✅ |
| Vàng/Commodity | 9.62% | 5–15% | ✅ |
| Tiền mặt | 4.91% | 5–10% | ⚠️ Slightly under (was 2.43% before Tikop reclass — much closer now) |

### 4. Upcoming decisions (within 90 days)
- **2026-07-09**: tịkcop 1 week (30.2M₫) + vcb 1 month (504.0M₫) mature — 534M₫ needs a reinvestment/rollover decision within days.
- **2026-08-02**: tikcop 1m (102.6M₫) matures.
- **2026-10-13**: tikcop 5m (401.9M₫) matures — just outside the 90-day window but worth planning for now given the size.
- VCB visa 61M₫ balance — confirm payoff before next statement due date.
- No action needed on "nam á 6m" — its apparent 2.0M₫ balance is a confirmed API ghost bug (already fully withdrawn in reality), not a real pending decision.

### 5. Khuyến nghị
**Short-term (30 days):**
- Pay off the 61M₫ VCB visa balance on schedule to avoid interest.
- Decide reinvestment for the 534M₫ maturing 2026-07-09 — options: continue VCBS/FPTS DCA cadence, or a fresh term deposit if a market entry point isn't attractive.

**Medium-term (6–12 months):**
- Track "investable" allocation (ex-home) as the primary rebalancing lens — the home skews headline % without being actionable; the ex-home view (Investment 40%, Savings 19%, Real Estate-land 19%, Gold 14%, Liquid 7%) is closer to a workable target mix already.
- With Investment now slightly under its benchmark floor, consider directing some new surplus toward VCBS/FPTS DCA rather than accumulating more in Tikop/cash.
- Build modest USD-denominated exposure (even a small offshore ETF or higher Paypal/Payoneer float) to lift FX diversification above the 5% floor.

**Long-term (>1 year):**
- Set an explicit target-allocation policy with rebalance bands for the ex-home portfolio (e.g., Investment 40-45% / Savings 20% / Gold 10-15% / Liquid 10% / Land 15-20%) and review quarterly.
- Continue the proven DCA + periodic-redemption cadence into VCBS/FPTS rather than shifting to lump-sum timing.
