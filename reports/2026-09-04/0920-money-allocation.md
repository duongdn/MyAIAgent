# Asset Allocation — 2026-09-04 09:20

## Tỉ lệ tài sản (full view, incl. nhà ở)
| Loại | Tổng (₫) | % Total | Ghi chú |
|------|---------|---------|---------|
| 🏠 Bất động sản | 3,520,000,000 | 43.1% | Nhà (2.5B) + long an res (1.02B), non-tradeable |
| 📈 Cổ phiếu/ETF/Fund | 2,531,448,206 | 31.0% | VCBS/VCBF/FPTS/Finhay/Tikop + Larion carry-fwd |
| 🏦 Tiết kiệm | 1,203,923,479 | 14.7% | 8 sổ tiết kiệm đang hoạt động |
| 🥇 Vàng | 742,000,000 | 9.1% | inactive-flag wallet, real value |
| 💵 Tiền mặt | 165,814,201 | 2.0% | vcb + paypal + ví + residuals |

## Chi tiết ETF + Fund
- ETF (VCBS) — VN30/VN100/VN1000: 641,655,620 ₫
- Fund (VCBF) — managed fund: 594,063,000 ₫ (cost-basis, currentAmount stuck at 0 on MISA)
- Cổ tức (FPTS) — VEA/ADP/ETF: 381,301,151 ₫
- Fund (Finhay): 74,404,069 ₫
- Tikop: 40,024,366 ₫
- Larion cổ phần (carry-forward, manual, unconfirmed since 2026-08-26): 800,000,000 ₫

## ASCII bar chart (excl. nhà ở)
```
BĐS (long an res)  1.02B ██████████
Đầu tư             2.53B ████████████████████████
Tiết kiệm          1.20B ████████████
Vàng               0.74B ███████
Tiền mặt           0.17B █
```

## Nhận xét
- Liquidity ratio (liquid+savings vs 6mo expense 420M): healthy, ~3.3x.
- Không có khoản đáo hạn nào trong 90 ngày tới cần quyết định gấp (sổ tiết kiệm phần lớn kỳ hạn ngắn 1-6 tháng, xoay vòng đều).
- Cổ phiếu/ETF/Fund chiếm 31% — trong khoảng benchmark 30-50%.
- BĐS chiếm 43.1% tổng — cao hơn benchmark thông thường 20-30%, nhưng phần lớn là nhà ở chính, không giao dịch.

## Full View (with home, same as table above — home is already included by default here since no separate active/tradeable-only accounts exist outside real estate)

---

## Finance Review

### 1. Điểm mạnh
- Nợ = 0, không có đòn bẩy tài chính.
- Dòng thu nhập ổn định (lương hàng tháng ~66.9M, ghi nhận đầu tháng 9).
- Danh mục đầu tư đa dạng qua 5 kênh (VCBS, VCBF, FPTS, Finhay, Tikop) — không tập trung vào 1 tài sản duy nhất trong nhóm đầu tư.
- Thanh khoản (tiền mặt + tiết kiệm) đủ ~3.3x chi tiêu 6 tháng.

### 2. Rủi ro
- 🟡 **Tập trung BĐS**: 43.1% tổng tài sản là BĐS (chủ yếu nhà ở), cao hơn benchmark 20-30%. Rủi ro thấp vì là tài sản ở thực, không phải đầu cơ.
- 🟡 **Data quality VCBF/Larion**: 2 khoản trị giá ~1.39B (17% tổng) đang dựa vào cost-basis/carry-forward do MISA hiển thị currentAmount=0 (bug đã biết). Cần xác nhận định kỳ qua broker thực hoặc kích hoạt lại ví trên app.
- 🟢 **Currency risk**: Paypal (USD) chỉ ~88.5M, <2% tổng — không đáng ngại.

### 3. Benchmark comparison
| Nhóm | Actual | Benchmark | Status |
|------|--------|-----------|--------|
| Bất động sản | 43.1% | 20–30% | ⚠️ cao hơn (nhà ở chính) |
| Cổ phiếu/ETF/Fund | 31.0% | 30–50% | ✅ |
| Trái phiếu/Tiết kiệm | 14.7% | 10–20% | ✅ |
| Vàng | 9.1% | 5–15% | ✅ |
| Tiền mặt | 2.0% | 5–10% | ⚠️ hơi thấp, bù bằng tiết kiệm sẵn có |

### 4. Upcoming decisions
- Không có đáo hạn gấp trong 90 ngày; các sổ tiết kiệm ngắn hạn xoay vòng bình thường.

### 5. Khuyến nghị
- **Ngắn hạn (30 ngày)**: Xác minh lại VCBF (594M) và Larion (800M) bằng cách kích hoạt lại ví trên app MISA hoặc đối chiếu broker thực, để giảm phụ thuộc vào carry-forward.
- **Trung hạn (6-12 tháng)**: Cân nhắc tăng tỉ trọng tiền mặt sẵn sàng (hiện 2%) lên gần benchmark 5% để linh hoạt hơn, có thể rút một phần từ tiết kiệm kỳ hạn ngắn khi đáo hạn.
- **Dài hạn (>1 năm)**: Theo dõi tỉ trọng BĐS nếu có kế hoạch mua thêm — hiện đã vượt benchmark, nên ưu tiên các kênh đầu tư khác (ETF/Fund) cho phần tích lũy mới.
