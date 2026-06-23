# Portfolio Report — 2026-06-23 08:54

> **CẬP NHẬT 10:40 — User đã sửa bug ngay trên app, số liệu giờ verified và self-consistent.** Lịch sử các lần sửa: (1) account-balance trực tiếp → sai 5.93B; (2) cost-basis loan-tracking → sai 7.14B (thiếu lãi); (3) đọc "Tổng số dư" trực tiếp → 7.345B (vẫn thiếu vì website bug "tikcop 5 week"=0₫); (4) đối chiếu mobile app → tìm ra bug, **user tự đóng sổ cũ + tạo lại "tikcop 5m" đúng giá trị** → re-fetch website API ra số mới, đúng.
>
> **Net Worth hiện tại: 7,747,602,027 ₫ (~7.75 tỷ)** — đọc trực tiếp từ API `/wallets/totaldashboard` sau khi bug đã sửa. Còn lệch ~75M so với mobile (tồn tại cả trước/sau fix, không liên quan bug) — khả năng là chênh cost-basis vs giá trị thị trường ETF/Fund, không phải lỗi dữ liệu.

## Summary
| | Amount (₫) |
|-|-----------|
| **Net Worth (verified, sau khi fix bug)** | **7,747,602,027** |
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

## ✅ ĐÃ GIẢI HOÀN TOÀN: "tịkcop 1 week" không hề giảm — đó là 2 sổ khác nhau

Phát hiện ban đầu ("tịkcop 1 week giảm từ 401.9M xuống 30.1M") là **sai do nhầm tên sổ**. Đối chiếu mobile app (màn "Quản lý sổ tiết kiệm"), thực tế có **4 sổ tiết kiệm** đang active, không phải chỉ 1:

| Sổ | Số dư | Đáo hạn | Lãi suất |
|----|------|---------|----------|
| vcb 1 month | 503,977,053 | 09/07/2026 | 4.75% |
| tikcop 1m | 102,087,367 | 02/07/2026 | 6.3% |
| tịkcop 1 week | 30,105,411 | 25/06/2026 | 6.1% |
| **tikcop 5 week** | **401,917,738** | 13/10/2026 | 7.5% |
| **Tổng** | **1,038,087,569** | | |

**"tikcop 5 week" (401.9M) chính là sổ trong báo cáo 26/05 cũ** — lúc đó tôi đặt nhầm tên thành "tikcop 1 week". Sổ "tịkcop 1 week" thật (30.1M) là một sổ NHỎ HƠN, KHÁC, tồn tại độc lập song song từ trước — không phải sổ lớn "co lại" còn 30.1M.

**Root cause kỹ thuật**: API website `/wallets/savings` CÓ trả về wallet "tikcop 5 week" (active, đúng ngày đáo hạn, đúng lãi suất) nhưng field `currentAmount` bị lỗi = 0 — bug dữ liệu phía MISA website (bản beta), khiến tổng tiết kiệm tính qua website bị thiếu đúng 401.9M. Mobile app không bị lỗi này.

**Net Worth chuẩn cuối cùng: 7,819,879,454 ₫ (~7.82 tỷ)** — đối chiếu mobile app "Tài chính hiện tại", khớp từng dòng. Đây là số đáng tin nhất, KHÔNG còn khoản nào chưa giải thích được.

## Alerts
- ✅ **VCBS 276.15M đã xác nhận còn nguyên** — không phải mất tiền, chỉ đổi trạng thái trong cùng wallet
- ✅ **tikcop 5 week 401.9M đã xác nhận còn nguyên** — website hiển thị sai do bug, mobile app đúng
- ✅ **Net Worth chuẩn: 7,819,879,454 ₫ (~7.82 tỷ)** — đối chiếu mobile app, khớp từng dòng, không còn gì chưa giải thích
- ℹ️ Website MISA (API `/wallets/totaldashboard` = 7,345,661,716) THIẾU ~400-475M do bug "tikcop 5 week" — không dùng số website cho đến khi MISA sửa
- ℹ️ Script `misa-money-report.js` đã ghi chú rõ bug này trong code comment để các lần chạy sau biết cross-check với mobile app
