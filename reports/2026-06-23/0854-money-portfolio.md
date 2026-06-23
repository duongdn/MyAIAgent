# Portfolio Report — 2026-06-23 08:54

> **CORRECTED 09:40** — Investment wallets (VCBS/VCBF/FPTS/Finhay) use MISA's "cho vay/thu nợ" (loan) tracking mechanism; the `currentAmount` field does NOT auto-update for them (shows stale/near-zero). Fixed by computing net position = Σcho_vay − Σthu_nợ per wallet from full transaction history. Verified this method exactly reproduces the 26/05 report's numbers.

## Summary
| | Amount (₫) | % Gross | % Net |
|-|-----------|---------|-------|
| Gross Assets | 7,181,989,071 | 100% | — |
| Liabilities | −39,828,702 | −0.6% | — |
| **Net Worth** | **7,142,160,369** | — | **100%** |
| USD/VND rate (Paypal) | ~26,441 | — | — |

## By Account (sorted by balance desc)

| Account | Balance (₫) | % Gross | % Net | Category |
|---------|------------|---------|-------|----------|
| Nhà | 2,500,000,000 | 34.8% | 35.0% | 🏠 Real Estate |
| long an res | 1,020,000,000 | 14.2% | 14.3% | 🏠 Real Estate |
| VCBF (Fund, cost basis) | 594,063,000 | 8.3% | 8.3% | 📈 Investment |
| Larion cổ phần | 600,000,000 | 8.4% | 8.4% | 📈 Investment |
| vàng (50 VGO) | 743,000,000 | 10.3% | 10.4% | 🥇 Gold |
| vcb 1 month (savings) | 503,977,053 | 7.0% | 7.1% | 🏦 Savings |
| VCBS (ETF, cost basis) | 474,298,575 | 6.6% | 6.6% | 📈 Investment |
| FPTS (cổ tức, cost basis) | 347,901,000 | 4.8% | 4.9% | 📈 Investment |
| Paypal (6,599 USD) | 174,490,758 | 2.4% | 2.4% | 💵 Liquid |
| Finhay (Fund, cost basis) | 74,404,069 | 1.0% | 1.0% | 📈 Investment |
| tikcop 1m (savings) | 102,087,367 | 1.4% | 1.4% | 🏦 Savings |
| tịkcop 1 week (savings) | 30,105,411 | 0.4% | 0.4% | 🏦 Savings |
| vcb | 15,141,024 | 0.2% | 0.2% | 💵 Liquid |
| nam á 6m (savings) | 2,005,479 | 0.0% | 0.0% | 🏦 Savings |
| Ví (cash) | 400,000 | 0.0% | 0.0% | 💵 Liquid |
| Momo | 104,468 | 0.0% | 0.0% | 💵 Liquid |
| nam á | 10,867 | 0.0% | 0.0% | 💵 Liquid |
| Tikop | 2,055 | 0.0% | 0.0% | 📈 Investment |
| VCB visa | −39,825,000 | — | — | 💳 Debt |
| Payoneer | −3,702 | — | — | 💳 Debt |

> Investment wallets at **cost basis** (tiền đã bỏ vào, chưa rút), không phải giá trị thị trường — MISA không track NAV tự động cho các quỹ này.

## By Category

| Category | Total (₫) | % Gross | % Net |
|----------|----------|---------|-------|
| 🏠 Real Estate | 3,520,000,000 | 49.0% | 49.3% |
| 📈 Investment (cost basis) | 2,090,666,644 | 29.1% | 29.3% |
| 🥇 Gold | 743,000,000 | 10.3% | 10.4% |
| 🏦 Savings | 638,175,310 | 8.9% | 8.9% |
| 💵 Liquid | 190,147,117 | 2.6% | 2.7% |
| 💳 Debt | −39,828,702 | −0.6% | −0.6% |

### Investment Detail (cost basis, từ loan-tracking)

| Wallet | Cho vay (₫) | Thu nợ (₫) | Net hiện tại (₫) |
|--------|------------|-----------|------------------|
| VCBF | 594,063,000 | 0 | 594,063,000 |
| FPTS | 620,336,000 | 272,435,000 | 347,901,000 |
| VCBS | 930,448,575 | 456,150,000 | 474,298,575 |
| Finhay | 74,404,069 | 0 | 74,404,069 |
| Larion (account balance, không loan-track) | — | — | 600,000,000 |
| **Tổng** | | | **2,090,666,644** |

## Liquidity

| | Amount (₫) |
|-|-----------|
| Instantly liquid (cash + bank + e-wallet) | 190,147,117 |
| Semi-liquid within 7 days (tịkcop 1w) | 30,105,411 |
| Semi-liquid within 30 days (savings) | 638,175,310 |
| Total accessible within 30 days | 828,322,427 |

Monthly expense target: ~70M. 3× target = 210M.

## Biến động vs 26/05/2026 (cùng phương pháp)

| Hạng mục | 26/05 (₫) | 23/06 (₫) | Δ | Lý do |
|----------|-----------|-----------|---|-------|
| VCBS | 750,448,575 | 474,298,575 | **−276,150,000** | Thu nợ (redemption) thật, ngày 22/06 |
| Tiết kiệm (tịkcop 1 week) | 401,917,738 | 30,105,411 | **−371,812,327** | Rút tiết kiệm |
| Vàng | 807,500,000 | 743,000,000 | −64,500,000 | Giá/số lượng giảm |
| Liquid | 173,971,731 | 190,147,117 | +16,175,386 | — |
| VCBF, FPTS, Finhay, Larion | không đổi | không đổi | 0 | — |
| **Net Worth** | **7,951,868,091** | **7,142,160,369** | **−809,707,722** | Chủ yếu rút ETF + tiết kiệm |

→ Khoản giảm ~810M **không phải mất tiền** — là tiền được rút ra từ ETF/tiết kiệm và dùng cho chi tiêu/trả nợ tháng 6 (Trả nợ 100M ngày 02/06, học phí, sinh hoạt...). Tiền chuyển trạng thái từ "đầu tư/tiết kiệm" sang "đã chi tiêu", không biến mất.

## Alerts
- ⚠️ **Real Estate**: 49.3% net worth (Nhà + Long An) — vẫn trong vùng cần theo dõi nhưng không tới mức báo động (giảm từ 56% nhờ net worth investment tăng đúng)
- ⚠️ **Liquid hơi thấp**: 190M < 210M target (3× tháng), nhưng savings 638M bù đắp tốt
- ✅ Debt ratio thấp: 39.8M = 0.6% gross assets
- ✅ Savings + Liquid = 828M > quỹ khẩn cấp 6 tháng (420M)
- ℹ️ **Investment cost-basis, không phải market value** — chưa phản ánh lãi/lỗ thực tế của ETF/Fund
