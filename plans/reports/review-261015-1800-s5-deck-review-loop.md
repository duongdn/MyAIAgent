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
