# Asset Allocation — 2026-09-07 14:16

## Tỉ lệ tài sản (full view, incl. nhà ở)
| Loại | Tổng (₫) | % Total | Ghi chú |
|------|---------|---------|---------|
| 🏠 Bất động sản | 3,520,000,000 | 43.2% | Nhà (2.5B) + long an res (1.02B), non-tradeable |
| 📈 Cổ phiếu/ETF/Fund | 2,545,448,206 | 31.2% | VCBS/VCBF/FPTS/Finhay/Tikop + Larion carry-fwd |
| 🏦 Tiết kiệm | 1,201,918,000 | 14.7% | 7 sổ tiết kiệm đang hoạt động |
| 🥇 Vàng | 735,000,000 | 9.0% | 50 units, giá vàng giảm nhẹ vs 09-04 (742M) |
| 💵 Tiền mặt | 155,670,492 | 1.9% | vcb + paypal + ví + residuals |

## Chi tiết ETF + Fund
- ETF (VCBS) — VN30/VN100/VN1000: 655,655,620 ₫ (costbasis 0.4M gần như tất toán + cur 655.26M)
- Fund (VCBF) — managed fund: 594,063,000 ₫ (cost-basis, currentAmount vẫn stuck 0 trên MISA)
- Cổ tức (FPTS) — VEA/ADP/ETF: 381,301,151 ₫
- Fund (Finhay): 74,404,069 ₫
- Tikop: 40,024,366 ₫
- Larion cổ phần (carry-forward, manual, unconfirmed since 2026-08-26): 800,000,000 ₫

## ASCII bar chart (excl. nhà ở)
```
BĐS (long an res)  1.02B ██████████
Đầu tư             2.55B █████████████████████████
Tiết kiệm          1.20B ████████████
Vàng               0.74B ███████
Tiền mặt           0.16B █
```

## Nhận xét
- Liquidity ratio (liquid+savings vs 6mo expense 420M): 3.2x — healthy.
- Không có đáo hạn gấp cần quyết định lớn: tikcop 1w (10M, 08/09) và 1m (100M, 10/09) đến hạn trong tuần tới, xoay vòng bình thường.
- Cổ phiếu/ETF/Fund 31.2% — trong benchmark 30-50% (nhưng thấp hơn, xem base đầu tư riêng bên dưới).
- BĐS 43.2% tổng — cao hơn benchmark thông thường do gồm nhà ở chính (không giao dịch).

## Full View (with home, same as table above)

---

## Finance Review

### 0. Đối chiếu report gần nhất (2026-09-04)
- **Kế hoạch tăng tỉ trọng cổ phiếu (09-04, đợt 1: chuyển 110M từ Tiết kiệm → Cổ phiếu)**: CHƯA THỰC HIỆN. Sổ "1m" vẫn còn nguyên 100,000,000 ₫ (đáo hạn 10/09/2026), "tikcop 1w" vẫn 10,000,000 ₫ (đáo hạn 08/09/2026) — cả hai chưa bị rút/chuyển. Đề xuất còn hiệu lực, đáo hạn sắp tới (trong tuần) là thời điểm tự nhiên để thực hiện nếu vẫn muốn.
- **VCBF/Larion xác minh lại (khuyến nghị ngắn hạn 09-04)**: chưa thực hiện — VCBF vẫn currentAmount=0 (dựa cost-basis 594.06M), Larion vẫn inactive/carry-forward 800M không đổi.
- Net Worth: 8,087,736,698 vs 09-04 8,090,880,406 → gần như đi ngang (−3.1M, <0.04%), không có bất thường (không nghi ngờ stale-savings bug — trueTotalBalance sát với 09-04/09-03).
- Vàng giảm nhẹ: 735M (từ 742M ngày 09-04) — biến động giá thị trường bình thường, không phải lỗi dữ liệu.
- Tiền mặt giảm: 155.7M (từ 165.8M) — chi tiêu Sept MTD 10.6M + không có thu nhập mới ngoài lương đầu tháng.

### 1. Điểm mạnh
- Nợ = 0 (Payoneer residual −3,675₫ không đáng kể), không đòn bẩy.
- Thu nhập ổn định: lương 66.9M (01/09) + Freelancer 3.99M ghi nhận đầu tháng.
- Danh mục đầu tư đa dạng qua 5 kênh (VCBS/VCBF/FPTS/Finhay/Tikop).
- Thanh khoản đủ 3.2x chi tiêu 6 tháng.

### 2. Rủi ro
- 🟢 **BĐS đầu tư (long an res)**: trong benchmark, không đáng lo.
- 🟡 **Data quality VCBF/Larion**: 1.39B (17% gross) vẫn dựa cost-basis/carry-forward, chưa xác minh lại kể từ 08-26 — kéo dài 12+ ngày, cần theo dõi.
- 🟢 **Currency risk**: Paypal (USD) ~92.5M, ~1.1% tổng — không đáng ngại.
- 🟢 Không phát hiện lỗi stale-savings-bug lần này.

### 3. Benchmark comparison
Base đầu tư (loại Nhà 2.5B): 8,087,736,698 − 2,500,000,000 = 5,587,736,698 ₫ (dùng net worth headline trừ Nhà).

| Nhóm | Actual | Benchmark | Status |
|------|--------|-----------|--------|
| Bất động sản (long an res) | 18.3% | 20–30% | ✅ (hơi thấp, ok) |
| Cổ phiếu/ETF/Fund | 45.6% | 30–50% | ✅ |
| Trái phiếu/Tiết kiệm | 21.5% | 10–20% | ⚠️ hơi cao |
| Vàng | 13.2% | 5–15% | ✅ |
| Tiền mặt | 2.8% | 5–10% | ⚠️ hơi thấp |

### 4. Upcoming decisions
- tikcop 1w (10M) đáo hạn 08/09, sổ "1m" (100M) đáo hạn 10/09 — cả hai nằm trong kế hoạch chuyển sang cổ phiếu từ 09-04, chưa thực hiện.

### 5. Khuyến nghị
- **Ngắn hạn (30 ngày)**: Khi 2 sổ trên đáo hạn (08-10/09), thực hiện kế hoạch đợt 1 đã đề xuất (chuyển 110M sang cổ phiếu) nếu vẫn phù hợp; đồng thời xác minh lại VCBF/Larion (đã treo >12 ngày).
- **Trung hạn (6-12 tháng)**: Tăng tiền mặt sẵn sàng (hiện 2.8%) lên gần benchmark 5%.
- **Dài hạn (>1 năm)**: Giảm dần tỉ trọng tiết kiệm (21.5%) khi đáo hạn, chuyển bớt sang cổ phiếu/ETF.

### 6. Kế hoạch tăng tỉ trọng cổ phiếu — carry forward từ 09-04 (chưa thực hiện)
Xem chi tiết đầy đủ trong `reports/2026-09-04/0920-money-allocation.md` mục 6. Trạng thái: **vẫn đề xuất, chưa thực hiện**, đáo hạn 2 sổ nguồn tiền (1w, 1m) rơi vào tuần này (08-10/09) — thời điểm hành động tự nhiên.
