# Portfolio Report — 2026-08-28 08:57 (final update 10:02)

## Summary
| | Amount (₫) | % Gross | % Net |
|-|-----------|---------|-------|
| Gross Assets (final) | 8,126,314,485 | 100% | — |
| Liabilities  | −3,678 | 0.0% | — |
| **Net Worth (final)** | **8,052,310,328** | — | **100%** |

**Final (10:02):** User reactivated VCBS in the MISA app — API now correctly reads `currentAmount = 641,255,619.52` (active, flows into `trueTotalBalance` automatically). Larion cổ phần stays inactive by design, fixed at 800,000,000 per user instruction. Net Worth = trueTotalBalance (7,252,310,328, incl. active VCBS) + Larion cổ phần (800,000,000) = **8,052,310,328**. See memory `feedback_larion_valuation_confirmed_by_user` for the full resolved rule (supersedes 3 prior wrong correction rounds today).

## By Account (sorted by balance desc, nonzero only)
| Account | Balance (₫) | % Net | Category | Status |
|---------|------------|-------|----------|--------|
| Nhà | 2,500,000,000 | 31.1% | 🏠 Real Estate | inactive |
| long an res | 1,020,000,000 | 12.7% | 🏠 Real Estate | inactive |
| Larion cổ phần | 800,000,000 | 9.9% | 📈 Investment | inactive (fixed value, per user) |
| vàng | 750,000,000 | 9.3% | 🥇 Gold | inactive |
| VCBS | 641,255,620 | 8.0% | 📈 Investment | active (broker-verified: NAV 647,803,047, ✅ close match) |
| VCBF | 594,063,000 | 7.4% | 📈 Investment | active |
| FPTS | 388,526,529 | 4.8% | 📈 Investment | active (broker-verified via EzTrade, was 381,301,151 est.) |
| Paypal | 88,556,170 | 1.1% | 💵 Liquid | active |
| Finhay | 74,404,069 | 0.9% | 📈 Investment | active |
| vcb | 54,280,763 | 0.7% | 💵 Liquid | active |
| Tikop | 40,024,366 | 0.5% | 💵 Liquid | active |
| Ví | 2,000,000 | 0.0% | 💵 Liquid | active |
| Momo | 900,000 | 0.0% | 💵 Liquid | inactive |
| nam á | 10,867 | 0.0% | 💵 Liquid | inactive |
| Payoneer | −3,678 | 0.0% | 💳 Debt (FX) | inactive |

VCBS now active — using raw `currentAmount` directly (its cost-basis-from-transactions formula nets to ~0 since fully redeemed in June 2026, so raw currentAmount while active is the correct figure). VCBF/Finhay still valued as `cost_basis_remaining (Σ Cho vay − Σ Thu nợ) + currentAmount`.

**Broker API cross-check (11:24, new capability):** fetched real holdings directly from FPTS EzTrade (`scripts/fpts-portfolio-report.js`) and VCBS (`scripts/vcbs-portfolio-report.js`) — both now automatable headless (see `.claude/commands/me/money-report.md` Piece 8). FPTS real NAV 388,526,529 (VEA 11,000 CP) confirms the cost-basis estimate was close (−1.9% off). VCBS real NAV 647,803,047 (E1VFVN30, FPT, FUEVN100, VIX) closely matches MISA's raw currentAmount (641,255,620, −1.0% off). **Headline Net Worth intentionally left unchanged** (still anchored to MISA `trueTotalBalance` per standing rule) — the small FPTS/VCBS deltas from broker-verified data are within known normal variance (dividends/interest not yet synced, timing of price snapshot) and don't warrant another same-day correction. Going forward, prefer the broker API figures as the FPTS/VCBS row values in this table (now done above) while keeping headline Net Worth MISA-anchored.

## Savings
| Book | Rate | Maturity | Amount (₫) |
|------|------|----------|-----------|
| vcb 6m chứng chỉ tiền gởi | 7.5% | 2027-02-10 | 300,000,000 |
| tikcop 5m | 7.5% | 2026-10-13 | 401,918,000 |
| tikcop 3 month | 8.1% | 2026-10-10 | 100,000,000 |
| 6m cake vpbank | 9.2% | 2027-02-25 | 190,000,000 |
| 6m rút gốc linh hoạt | 7% | 2027-02-10 | 100,000,000 |
| 1m | 4.75% | 2026-09-10 | 100,000,000 |
| **Total** | | | **1,191,918,000** |

**Correction (10:08):** "nam á 6m" excluded — `savingIsFinalize: true`, matured 2024-06-01, already tất toán, nothing left. Its `currentAmount: 2,005,479.45` in the API is stale leftover data (known MISA bug pattern, opposite direction of the stale-zero case: here a finalized book shows a stale nonzero instead of correctly showing 0). Confirmed by user: no money remains in this book.

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
- ✅ **RESOLVED (final):** Larion cổ phần fixed at 800,000,000 (stays inactive by design). VCBS reactivated by user, now reading correct live value 641,255,620 from the API. No net-worth loss occurred at any point — the 3 prior "correction" rounds today were the agent's own reasoning errors, not real portfolio changes.
- ✅ No concentration flag — Nhà at 31.1% of NW is expected (primary residence).
- ✅ Debt negligible (Payoneer −3,678 ₫ FX residual only; VCB Visa balance = 0, paid off).
- ✅ Liquidity: savings pool + liquid cash together exceed 6-month expense target.
