# AI Training GĐ3 — cập nhật S5 + S6 (2026-10-28)

## 15:45 — S5: review dưới góc người xem, gỡ chữ dành cho trainer

| Slide | Trước | Sau |
|---|---|---|
| 1 | "Session 5–9 · một support agent mở rộng dần · OpenAI Agents SDK" + chip search_kb → create_ticket → T-1001 | "Session 5–9 · OpenAI Agents SDK", bỏ chip |
| 2 | Chú thích "câu hỏi của buổi ↑ · phần agent có thêm sau buổi ↑" | Bỏ (đã có trong notes) |
| 4 | Mục 02 "ví dụ support + 3 câu hỏi quyết định" (lỗi thời) | "đo token · khi nào workflow thắng" |
| 6 | Caption dài về điều kiện dừng | "↻ số lượt do model quyết · dừng: trả lời cuối hoặc max_turns" |
| 7 | Dòng "rút gọn từ compare_orchestration_levels.py · output thật…" | Bỏ (đã có trong notes) |
| 10 | Khung 2 câu văn xuôi, "agent đáng tiền khi số bước không biết trước" mâu thuẫn slide 15 | "Bước biết trước → workflow đủ việc, ít token hơn" |
| 11 | Câu dài ở cuối slide | "Tổng 2.511 vào + 489 ra · model không nhớ → mỗi lượt gửi lại từ đầu" |
| 13 | Tiêu đề "agent rẻ hơn, nhanh hơn" (slide 15 lại nói ngược) | "Workflow quyết trước khi tra: tốn ~2,8× agent" |
| 15 | Header "Mã lỗi · đúng là" | "Mã lỗi → đúng là" |
| 16 | Dòng cam lặp lại tiêu đề | Bỏ |
| 18 | Câu dài ở cuối slide | "Trace = tool nào · tham số gì · bao lâu · bao nhiêu token" |
| 21 | Thẻ "Chọn mức"/"Chi phí" lỗi thời, trùng nhau | Chọn mức: liệt kê được nhánh → workflow · Chi phí: agent tốn 2,6–13×, dao động |

Đã render lại cả 23 slide và kiểm tra. Deck vẫn 23 slide.

## 16:05 — S5 slide 2 (lộ trình) vẽ lại

**Vấn đề:** 2 hàng ô (câu hỏi / phần thêm) + chú thích "↑" → người xem không hiểu slide muốn nói gì.
**Sau:** dạng bậc thang. Mỗi hàng = agent sau buổi đó; ô cam = lớp mới thêm, ô nhạt = lớp đã có. Hàng S9 = agent đầy đủ. Đã render, ok.

## 15:45 — S5 slide 2: S8, S9 viết lại bằng lời thường

| Hàng | Trước | Sau |
|---|---|---|
| S8 | "Giữ gì, khi nào dừng?" · "State, khi dừng" | "Làm dở thì sao?" · "Nhớ việc dở, biết lúc dừng" |
| S9 | "Đủ để review chưa?" · "Harness, trace" | "Sao biết agent chạy đúng?" · "Bộ test, trace" |

Giải thích state/harness chuyển vào notes.

## 15:55 — S5 slide 2: dùng tên session chính thức

**Vấn đề:** câu hỏi tự đặt ("Làm dở thì sao?"…) nghe lạ, không khái quát nội dung buổi.
**Sau:** cột trái = tên session đúng đề cương (giống trang tiêu đề mỗi deck). Ô = phần agent có thêm, thuật ngữ chuẩn: Agent tối thiểu · Tool contract · Kiểm quyền, phê duyệt · Task state, điều kiện dừng · Eval, tracing.

## 16:00 — S5 slide 1: bỏ subtitle (user đã xoá tay, bị rebuild dựng lại)

- Xoá đúng element "Session 5–9 · OpenAI Agents SDK" trên deck (deleteObject), không rebuild.
- Code builder bỏ dòng này luôn.
- ⚠ Các lần rebuild S5 hôm nay (khoảng 15:40–15:55) đã ghi đè mọi chỗ user sửa tay trên deck S5. Nếu còn chỗ khác bị mất: Google Slides → File → Version history.
- Từ giờ chỉ patch từng slide, không rebuild cả deck.
