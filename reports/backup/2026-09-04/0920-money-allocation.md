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
- 🟢 **BĐS đầu tư (long an res)**: 18.0% base đầu tư — trong benchmark 20-30%, không đáng lo. Nhà ở chính (2.5B, loại khỏi benchmark) không tính là rủi ro tập trung đầu tư.
- 🟡 **Data quality VCBF/Larion**: 2 khoản trị giá ~1.39B (17% tổng) đang dựa vào cost-basis/carry-forward do MISA hiển thị currentAmount=0 (bug đã biết). Cần xác nhận định kỳ qua broker thực hoặc kích hoạt lại ví trên app.
- 🟢 **Currency risk**: Paypal (USD) chỉ ~88.5M, <2% tổng — không đáng ngại.

### 3. Benchmark comparison
Loại "Nhà" (2.5B, ở thực, không phải tài sản đầu tư) ra khỏi base tính % — chỉ tính trên tổng tài sản đầu tư được (5,663,185,886 ₫). "long an res" (BĐS thứ 2) vẫn tính vì có thể coi là đầu tư.

| Nhóm | Actual | Benchmark | Status |
|------|--------|-----------|--------|
| Bất động sản (long an res) | 18.0% | 20–30% | ✅ (hơi thấp nhưng ok) |
| Cổ phiếu/ETF/Fund | 44.7% | 30–50% | ✅ |
| Trái phiếu/Tiết kiệm | 21.3% | 10–20% | ⚠️ hơi cao |
| Vàng | 13.1% | 5–15% | ✅ |
| Tiền mặt | 2.9% | 5–10% | ⚠️ hơi thấp, bù bằng tiết kiệm sẵn có |

### 4. Upcoming decisions
- Không có đáo hạn gấp trong 90 ngày; các sổ tiết kiệm ngắn hạn xoay vòng bình thường.

### 5. Khuyến nghị
- **Ngắn hạn (30 ngày)**: Xác minh lại VCBF (594M) và Larion (800M) bằng cách kích hoạt lại ví trên app MISA hoặc đối chiếu broker thực, để giảm phụ thuộc vào carry-forward.
- **Trung hạn (6-12 tháng)**: Cân nhắc tăng tỉ trọng tiền mặt sẵn sàng (hiện 2%) lên gần benchmark 5% để linh hoạt hơn, có thể rút một phần từ tiết kiệm kỳ hạn ngắn khi đáo hạn.
- **Dài hạn (>1 năm)**: Tiết kiệm hiện hơi cao (21.3% vs benchmark 10-20%) — phần đáo hạn mới có thể chuyển bớt sang cổ phiếu/ETF thay vì tái tục toàn bộ.

### 6. Kế hoạch tăng tỉ trọng cổ phiếu — 2026-09-04 (để so sánh lần chạy sau)
**Bối cảnh**: Cổ phiếu/ETF/Fund 44.7% (gần trần benchmark 50%), Tiết kiệm 21.3% (vượt trần benchmark 20%), Tiền mặt 2.9% (dưới sàn benchmark 5%).

**Room tính toán**: Chuyển tối đa ~300,000,000 ₫ từ Tiết kiệm → Cổ phiếu thì Cổ phiếu chạm trần 50%, Tiết kiệm về ~17.6% (vẫn trong 10-20%).

**Nguồn tiền đề xuất (ưu tiên theo lãi suất thấp nhất trước)**:
| Nguồn | Số tiền (₫) | Lãi suất | Đáo hạn |
|-------|------------|----------|---------|
| Sổ "1m" | 100,000,000 | 4.75% | 10/09/2026 |
| tikcop 1w | 10,000,000 | 6.1% | 08/09/2026 |
| **Tổng đợt 1** | **110,000,000** | | |

**Kết quả dự kiến sau đợt 1**: Cổ phiếu ~46.7%, Tiết kiệm ~19.4% — cả hai về gần benchmark hơn, còn dư ~190M room nếu muốn giải ngân thêm.

**Không đụng vào**: Tiền mặt (đã dưới benchmark, đừng rút thêm) — bù bằng thu nhập/lương tháng sau thay vì rút từ tiết kiệm/cổ phiếu.

**Trạng thái**: Đề xuất, chưa thực hiện. Đối chiếu số dư thực tế các sổ trên vào lần chạy tiếp theo để xem đã chuyển chưa.
