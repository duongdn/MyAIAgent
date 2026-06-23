# Portfolio Report — 2026-06-23 08:54

> **CORRECTED 09:50 — Net Worth is now VERIFIED, not reconstructed.** Two earlier fixes (account-balance, then loan-tracking cost-basis) both undercounted because investment wallets (VCBS/VCBF/FPTS/Finhay) accrue "Tiền lãi" (interest/dividend) entries my formula missed. Final fix: read MISA's own "Tổng số dư" widget directly from the dashboard (click the hide-balance icon to unmask) — this is the app's authoritative total, not a manual sum.
>
> **Verified Net Worth: 7,345,661,716 ₫** (not 5.93B from the first report, not 7.14B from the second). The category breakdown below is still a best-effort manual reconstruction and may not sum exactly to the verified total — trust the headline number, not the per-category math.

## Summary
| | Amount (₫) |
|-|-----------|
| **Net Worth (verified, từ app)** | **7,345,661,716** |
| Liabilities | −39,828,702 |
| USD/VND rate (Paypal) | ~26,441 |

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

> ⚠️ Bảng dưới dùng số % tính theo tổng tái tạo (7,181,989,071), KHÔNG phải tổng verified (7,345,661,716) — sai lệch ~164M chưa quy được vào category nào cụ thể (nhiều khả năng là lãi/cổ tức tích lũy trong VCBS/VCBF/FPTS/Finhay). Coi % này là gần đúng.

| Category | Total (₫) | % Gross | % Net |
|----------|----------|---------|-------|
| 🏠 Real Estate | 3,520,000,000 | 49.0% | 47.9% |
| 📈 Investment (cost basis, thiếu lãi) | 2,090,666,644 | 29.1% | 28.5% |
| 🥇 Gold | 743,000,000 | 10.3% | 10.1% |
| 🏦 Savings | 638,175,310 | 8.9% | 8.7% |
| 💵 Liquid | 190,147,117 | 2.6% | 2.6% |
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

## ✅ ĐÃ GIẢI: VCBS "Thu nợ" 276.15M không hề mất

Kiểm tra lại field đầy đủ + click vào giao dịch trong app: "Thu nợ" không tạo giao dịch chuyển tiền đi đâu cả — nó chỉ đổi trạng thái tiền TRONG CHÍNH wallet VCBS, từ "đang đầu tư ETF" sang "tiền mặt nằm trong tài khoản chứng khoán" (chưa rút ra ngân hàng).

Bằng chứng: `currentAmount` của VCBS hôm nay = 277,169,620 ₫ — đúng bằng khoản "Thu nợ" 276.15M (+ chút lãi). Công thức đúng cho mỗi wallet loan-tracked:

**Giá trị thật = cost_basis_còn_đầu_tư (Σcho_vay − Σthu_nợ) + currentAmount (tiền mặt đang nằm trong wallet)**

| Wallet | Cost basis | + Cash sitting | = Tổng | So với 26/05 |
|--------|-----------|----------------|--------|--------------|
| VCBS | 474,298,575 | 277,169,620 | **751,468,195** | 750,448,575 → gần như y nguyên (chênh 1M do chuyển 1tr ra vcb hôm nay) |
| VCBF | 594,063,000 | 0 | 594,063,000 | Không đổi |
| FPTS | 347,901,000 | 1,235,151 | 349,136,151 | Không đổi |
| Finhay | 74,404,069 | 0 | 74,404,069 | Không đổi |
| Larion | — | — | 600,000,000 | Không đổi |
| **Tổng Đầu tư** | | | **2,369,071,415** | ≈ 26/05 (2,366,816,644) |

→ **Tiền 276.15M không hề chi tiêu — vẫn còn 100% trong VCBS**, chỉ đổi từ "ETF" sang "cash chờ".

## ⚠️ Còn 1 điểm chưa rõ: tịkcop 1 week (giảm 371.8M)

Khác với VCBS, không tìm thấy cơ chế tương tự cho tịkcop 1 week — không có giao dịch nào ghi nhận khoản 371.8M chuyển đi đâu, và không có wallet khác nào tăng tương ứng. Có thể đây là một sổ tiết kiệm đã đáo hạn/đóng thật (kiểm tra lịch sử lãi suất thấy có một sổ tên "tikcop 5 week" ngừng phát sinh lãi từ 07/05 — có thể liên quan). Cần bạn tự kiểm tra app/sao kê để xác nhận khoản này.

**Quan trọng**: Net Worth verified (7,345,661,716 ₫) đã tự động đúng — không bị ảnh hưởng bởi việc tôi giải thích được hay chưa từng khoản. Dùng số đó làm chuẩn.

## Alerts
- ✅ **VCBS 276.15M đã xác nhận còn nguyên** — không phải mất tiền, chỉ đổi trạng thái trong cùng wallet
- ⚠️ **tịkcop 1 week 371.8M chưa rõ đích đến** — tự kiểm tra app/sao kê để xác nhận
- ✅ **Net Worth verified**: 7,345,661,716 ₫ — đọc trực tiếp từ API `/wallets/totaldashboard`, đáng tin tuyệt đối
- ℹ️ Script `misa-money-report.js` đã được sửa để tự lấy số này mỗi lần chạy — không cần tái tạo qua công thức nữa
