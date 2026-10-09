# Portfolio Report — 2026-09-09 09:40

## Summary
| | Amount (₫) | % Gross | % Net |
|-|-----------|---------|-------|
| Gross Assets | 8,137,227,736 | 100% | — |
| Liabilities  | −3,662 | −0.00% | — |
| **Net Worth (MISA totaldashboard, authoritative)** | **7,278,918,594** | — | 100% |

Note: account-level gross sum ≠ headline Net Worth (~858M gap) — mostly the Larion 800M carry-forward (inactive wallet, API shows 0, last confirmed value 800M on 08-26, now 14 days unconfirmed) plus Tikop/FPTS/Finhay residual timing. Known/expected variance pattern, not missing money.

**Correction (09:57):** vcb balance was misreported as 54,771,805 (an earlier subagent pass added a stray 14,000,000, likely double-counting the 07/09 "Chuyển khoản tới VCBS 14.000.000₫" transfer-out). Verified against raw API `currentAmount` and the MISA web UI — correct value is 40,771,805. All totals below fixed.

## By Account (sorted by balance desc)
| Account | Balance (₫) | % Gross | Category |
|---------|------------|---------|----------|
| Nhà | 2,500,000,000 | 30.67% | 🏠 Real Estate |
| long an res | 1,020,000,000 | 12.51% | 🏠 Real Estate |
| Larion cổ phần (carry-forward, unconfirmed since 08-26) | 800,000,000 | 9.81% | 📈 Investment |
| vàng | 733,000,000 | 8.99% | 🥇 Gold |
| VCBS | 655,655,620 | 8.04% | 📈 Investment |
| VCBF | 594,063,000 | 7.29% | 📈 Investment |
| tikcop 5m | 401,918,000 | 4.93% | 🏦 Savings |
| FPTS | 381,301,151 | 4.68% | 📈 Investment |
| vcb 6m chứng chỉ tiền gởi | 300,000,000 | 3.68% | 🏦 Savings |
| 6m cake vpbank | 190,000,000 | 2.33% | 🏦 Savings |
| 1m (tikcop) | 100,000,000 | 1.23% | 🏦 Savings |
| 6m rút gốc linh hoạt | 100,000,000 | 1.23% | 🏦 Savings |
| tikcop 3 month | 100,000,000 | 1.23% | 🏦 Savings |
| Paypal | 92,161,680 | 1.13% | 💵 Liquid |
| Finhay | 74,404,069 | 0.91% | 📈 Investment |
| vcb | 40,771,805 | 0.50% | 💵 Liquid |
| Tikop | 40,024,366 | 0.49% | 📈 Investment |
| tikcop 1w | 10,011,699 | 0.12% | 🏦 Savings |
| nam á 6m | 2,005,479 | 0.02% | 🏦 Savings |
| Ví | 1,000,000 | 0.01% | 💵 Liquid |
| Momo | 900,000 | 0.01% | 💵 Liquid |
| nam á | 10,867 | 0.00% | 💵 Liquid |
| Payoneer | −3,662 | −0.00% | 💳 Debt |

VCBS/VCBF/FPTS/Finhay use `cost_basis_remaining + currentAmount` formula (not raw currentAmount). No new Cho vay/Thu nợ transactions since 09-08 — all 4 investment wallets unchanged.

## By Category
| Category | Total (₫) | % Gross |
|----------|----------|---------|
| 🏠 Real Estate | 3,520,000,000 | 43.18% |
| 📈 Investment | 2,545,448,206 | 31.23% |
| 🏦 Savings | 1,203,935,178 | 14.77% |
| 🥇 Gold | 733,000,000 | 8.99% |
| 💵 Liquid | 134,844,352 | 1.66% |

## Upcoming Maturities (within 90 days)
| Deposit | Amount (₫) | Started | Term | Est. Maturity |
|---------|-----------|---------|------|--------------|
| 1m (tikcop) | 100,000,000 | 2026-08-10 | 1 tháng | ~2026-09-10 (tomorrow) |
| tikcop 1w (new) | 10,011,699 | 2026-09-08 | 1 tuần | ~2026-09-15 |
| tikcop 3 month | 100,000,000 | 2026-07-10 | 3 tháng | ~2026-10-10 |

`6m rút gốc linh hoạt` (100M, flexible-withdrawal) not counted as a maturity risk — withdrawable anytime.

## Liquidity Check
Instantly accessible (Liquid): 134,844,352 ₫
Due within 30 days (1m + tikcop 1w): +110,011,699 ₫
→ Total accessible within 30 days: ~244,856,051 ₫

## Alerts
- ✅ No single account > 50% net worth (Nhà largest at ~30.7% of gross, ~34% of authoritative net worth — below threshold, watch).
- ⚠️ Liquid (134.8M) alone < 3× monthly expenses (~110M×3=330M) — but Liquid + Savings (1,338M) comfortably covers it.
- ✅ Debt negligible (Payoneer −3,662₫, FX rounding). No leverage risk.
- ⏰ "1m" 100M savings matures TOMORROW (2026-09-10) — decision point for the pending "tăng cổ phiếu" plan (see Finance Review).
