# S5 deck review loop (Giai đoạn 3 · Session 5)
Deck: https://docs.google.com/presentation/d/10ZYIXeEzlElYai6ws9xd77ZN8QbNfAAdPMJekhkHMWI · chuẩn so sánh: Session_01_AI-LLM-Fundamentals.pdf (ChienTX)

## Vòng 1
- 3 mức điều phối chỉ là bảng chữ → vẽ 3 luồng (cam = model quyết định, tối = code)
- Không có số thật → compare_orchestration_levels.py: model call 1 lượt/1.397 tok, workflow 2/1.482, agent 3,3/3.841 (deepseek-v4.1-flash, 3 lần)
- Thêm slide token tăng theo lượt (574→828→1109), trace định vị, 2 cặp CÂU HỎI→ĐÁP ÁN
## Vòng 2
- Bảng so sánh đổi sang cùng 1 yêu cầu; Ghi nhớ thêm dòng chi phí
## Vòng 3
- Mâu thuẫn "Đáp án" (agent) vs slide đo (workflow thắng) → phân biệt CẦN THÌ tạo / LUÔN tạo
- Cây quyết định sai thứ tự → tool? → bước biết trước? → sửa lại được?
- Trace "5.6s" cộng 2 run → bỏ; recap GĐ2 ý 3 không kiểm chứng → câu nối
## Vòng 4
- Notes: số cũ ~3.000 token, thiếu đáp án Q4, notes slide 13/19 không khớp → sửa
- Thêm chip "Agent = LLM + Tools + Context + Code của mình" nối deck Session 1
## Vòng 5
- Code slide SDK ghi như nguyên văn → "rút gọn từ agent_openai_sdk.py"
- Tiêu đề "~2,7×" mơ hồ → "~2,6× so với workflow"
## Vòng 6
- Thiếu bằng chứng "agent đáng tiền khi bước không biết trước" → đo yêu cầu có điều kiện (--request conditional)
- Kết quả thật: model call 1.313 tok · workflow 5.246 tok/25,6s · agent 1.893 tok/8,1s; cả 3 đúng không tạo ticket
- Nguyên nhân đo riêng: bước "phân loại" của workflow quyết định trước khi tra KB → 2.759–9.900 token suy luận ẩn cho 1 dòng JSON
- Thêm cặp CÂU HỎI→ĐÁP ÁN "Có khi nào agent rẻ hơn workflow?"; Ghi nhớ cập nhật cả 2 trường hợp. S5 = 23 slide

## Vòng 7 — 2026-10-16 · mạch trình bày + đồng nhất
Render lại toàn bộ 23 slide (scratchpad bị xoá → viết lại thumbs.js).
- Mạch: title → lộ trình → nhắc GĐ2/S1 → 3 mức → đo (Q/A ×2) → chọn mức (Q/A + cây) → SDK → trace → ranh giới → ghi nhớ → thử thách. Không có slide trùng ý cần gộp; slide 15 (ví dụ) + 16 (quy tắc) bổ trợ nhau.
- Timing: 6 slide tối (title/header/4 câu hỏi/closing) ~10s–1' mỗi cái → ~15 slide nội dung cho 25–30' ≈ 2'/slide, ngang deck ChienTX (21 slide/45'). Giữ 23.
- Fix: thẻ "Chi phí" ở Ghi nhớ tràn 2 dòng → rút gọn 1 dòng ("workflow rẻ ~2,6× · agent rẻ ~2,8×"), đồng nhất với 4 thẻ còn lại.
- Fix: định dạng số không thống nhất trên slide 10/13 ("1313 tok", "6.1s" vs "2.759", "2,6×") → "1.313 token", "6,1s".
- Fix: sau đổi nhãn, "3.841 token" đè chip "tạo ticket" → thu thang thanh 330→280. Render kiểm tra OK.

## Vòng 8 — 2026-10-16 · số trong slide 11 + notes
- Slide 11: "1109 vào", "Tổng: 2511" → "1.109", "2.511" (cùng chuẩn vòng 7). Notes slide 11/13 cũng đổi theo.
- Giữ nguyên "0.0s/1.6s" trong khối trace: đó là log thật in ra từ code, không định dạng lại.
- Render slide 11 OK.

## Vòng 9 — 2026-10-16 · notes ↔ slide
Dump notes từ deck live (scratchpad/notes.js), đối chiếu 23 slide.
- Notes slide 9 hỏi "tốn gấp mấy lần model call" nhưng đáp án slide 10 so với workflow → đổi thành "workflow".
- Notes slide 21 (Ghi nhớ) chỉ nêu 2,6× trong khi thẻ có cả 2 trường hợp → bổ sung trường hợp ~2,8× (5.246 vs 1.893), "không mức nào luôn rẻ hơn".
- Notes slide 22, đáp án câu 01 chỉ có trường hợp agent tốn hơn → thêm trường hợp ngược lại, trỏ slide 13.
- Các notes còn lại khớp số trên slide (1.397/1.482/3.841, 574/828/1.109, 2.759–9.900, ~7s).

## Vòng 10 — 2026-10-16 · nối slide 15 với số đo
- Notes slide 15 dòng "CẦN THÌ tạo ticket" trỏ về số đo slide 13 (1.893 vs 5.246); dòng "LUÔN tạo" trỏ slide 10. Deck live đã có.
