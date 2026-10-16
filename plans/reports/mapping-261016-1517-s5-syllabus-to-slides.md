# Session 5: dòng nào trong PDF ứng với slide nào

Nguồn: `02_Noi_dung_chi_tiet_chuong_trinh_dao_tao_AI.pdf` (mục Session 5) + `01_De_cuong...pdf` (bảng Giai đoạn 3, dòng 5).
Deck S5 hiện tại có 22 slide: https://docs.google.com/presentation/d/10ZYIXeEzlElYai6ws9xd77ZN8QbNfAAdPMJekhkHMWI

| # | Dòng trong PDF | Slide | Ghi chú |
|---|---|---|---|
| 1 | Tên buổi: "Agent khác workflow ở đâu và OpenAI Agents SDK hỗ trợ gì" | 3 | Tiêu đề slide chỉ ghi vế đầu; vế SDK nằm ở thẻ 03 của slide 4 |
| 2 | Thời lượng 45 phút | 3 (notes) | Notes chia 5' mở đầu · 25–30' nội dung · 10–15' Q&A |
| 3 | Câu hỏi trọng tâm: "Khi nào nên để model chọn bước tiếp theo thay vì viết sẵn toàn bộ flow?" | 3 | Ghi nguyên văn trên slide |
| 4 | So sánh single model call, workflow do code điều phối, agent… | 6, 7 | 6 = sơ đồ 3 luồng; 7 = bảng so sánh cùng một yêu cầu |
| 4a | …agent có **mục tiêu, tools, loop, điều kiện dừng** | 5, 6 | Tools + loop: slide 5 và 6. Điều kiện dừng: chỉ có nhánh "đủ thông tin → dừng" ở slide 6. **Mục tiêu: chưa thể hiện rõ** (xem cuối file) |
| 5 | Quyết định khi nào agent tạo giá trị, khi nào workflow đơn giản an toàn hơn | 8–12, 15 | 8–10 = số đo: bước biết trước thì workflow rẻ hơn; 11–12 = bước phụ thuộc kết quả tra thì agent rẻ hơn; 15 = ba câu hỏi quyết định |
| 6 | Walkthrough support agent tối thiểu trong OpenAI Agents SDK: agent definition, run/runner, tools… | 16 | 4 khái niệm (Agent · function_tool · Runner.run · Trace) + code rút gọn từ `agent_openai_sdk.py` |
| 6a | …và trace ở mức định vị | 17 | Trace thật của kịch bản 1 |
| 6b | …không học thuộc API | 16 (notes), 20 | Notes slide 16: "Định vị, không học thuộc API"; thẻ SDK ở slide 20 |
| 7 | Chỉ rõ phần SDK cung cấp và phần product vẫn phải tự quyết định | 18, 19 | 18 = câu hỏi "Có SDK rồi còn phải tự viết gì?"; 19 = bảng ranh giới SDK / application |
| 8 | Ví dụ trong buổi: yêu cầu support nào chỉ cần RAG, yêu cầu nào cần nhiều bước và tạo ticket? | 13, 14 | 13 = câu hỏi; 14 = bảng 4 yêu cầu → mức phù hợp |
| 9 | Bài tự thực hành: chọn use case, giải thích model call / workflow / agent, đánh dấu ranh giới SDK và application | 21 | Khung "Tự thực hành sau buổi" (gần nguyên văn) + 4 câu thử thách |
| 10 | Kết quả cần đạt: chọn đúng mức điều phối | 14, 15 | |
| 10a | …và đọc được sơ đồ agent tối thiểu | 5, 6, 16 | |
| 11 | (Đề cương 01) "Session 5–9 theo dõi một support agent được mở rộng dần bằng OpenAI Agents SDK" | 1, 2 | 1 = slide tiêu đề Giai đoạn 3; 2 = lộ trình S5–S9 |
| 12 | (Đề cương 01) "Trainer giải thích nguyên lý và ranh giới trách nhiệm trước khi xem code" | thứ tự 5→15 rồi mới tới 16 | Slide code đầu tiên là slide 16 |

## Slide không ứng với dòng nào trong PDF

| Slide | Nội dung | Vì sao vẫn giữ |
|---|---|---|
| 4 | Agenda | Khung buổi học |
| 9–12 | Số đo token / thời gian thật | Bằng chứng cho dòng 5, theo yêu cầu "lý thuyết phải đi kèm kết quả" |
| 20 | Ghi nhớ | Tóm tắt trước Q&A |
| 22 | Q&A | — |

## Chỗ còn hở so với PDF

1. **"Mục tiêu"** (dòng 4a): chưa slide nào nói rõ agent nhận *mục tiêu* thay vì nhận danh sách bước. Hướng sửa: ghi "nhận mục tiêu" ở nhãn hàng Agent của slide 6 (hiện là "model chọn bước").
2. **"Điều kiện dừng"** (dòng 4a): chỉ được nhắc ngầm bằng nhánh "đủ thông tin → dừng". Slide 16 có `max_turns` trong code nhưng không nói đó là điều kiện dừng. Hướng sửa: thêm 1 dòng chú thích "dừng khi: model trả lời cuối · chạm max_turns" ở slide 6 hoặc 16. Chi tiết 5 điều kiện dừng để Session 8.
3. Tiêu đề slide 3 chỉ có vế "Agent khác workflow ở đâu", thiếu vế "…và OpenAI Agents SDK hỗ trợ gì" so với tên buổi trong PDF.

## Câu hỏi chưa giải quyết
- Có sửa 3 chỗ hở trên không? Nếu sửa: chỗ 1–2 thêm chữ vào slide 6 (không thêm slide); chỗ 3 đổi tiêu đề slide 3 thành tên đầy đủ của buổi.
