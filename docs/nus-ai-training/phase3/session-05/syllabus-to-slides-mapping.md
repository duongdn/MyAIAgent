# Session 5: đối chiếu từng cụm chữ trong đề cương với slide

Nguồn:
- `02_Noi_dung_chi_tiet_chuong_trinh_dao_tao_AI.pdf` trang 4: đoạn mở đầu "Giai đoạn 3 Build AI Agent" và mục "Session 5".
- `01_De_cuong_chuong_trinh_dao_tao_AI.pdf` trang 2: bảng Giai đoạn 3, dòng 5; trang 1: "Danh sách session", "Kết quả năng lực đầu ra".

Deck 26 slide (29/10): https://docs.google.com/presentation/d/10ZYIXeEzlElYai6ws9xd77ZN8QbNfAAdPMJekhkHMWI

## Mục Session 5 (02, trang 4)

| Cụm chữ trong đề cương | Slide | |
|---|---|---|
| "Agent khác workflow ở đâu" | 6 (khác nhau ở một điểm: ai chọn bước tiếp), 7 (so sánh) | ✅ |
| "và OpenAI Agents SDK hỗ trợ gì" | 19 (SDK viết sẵn phần code app, 5 concept), 22 (SDK cung cấp / application quyết) | ✅ |
| "45 phút" | notes slide 4 (phân bổ thời gian) | ✅ |
| Câu hỏi trọng tâm "Khi nào nên để model chọn bước tiếp theo thay vì viết sẵn toàn bộ flow?" | 3 (đặt câu hỏi) → trả lời ở 9 (viết trước được → workflow), 11 (3 dấu hiệu → agent), 12 (bắt đầu đơn giản) | ✅ |
| "So sánh" | 7 | ✅ |
| "single model call" | 6, 7, 12 bậc 1 | ✅ |
| "workflow do code điều phối" | 6 ("code giữ thứ tự"), 7, 13–17 (5 mẫu workflow) | ✅ |
| "agent có mục tiêu" | 6 ("nhận mục tiêu, tự chọn bước"), 7 hàng "Đầu vào: mục tiêu" | ✅ |
| "tools" | 5 (tools), 7 hàng "Dùng tool" | ✅ |
| "loop" | 5 (vòng lặp ①–④), 6, 7 hàng "Vòng lặp" | ✅ |
| "điều kiện dừng" | 6 (chú thích dừng), 7 hàng "Ai quyết khi dừng", notes 22 (max_turns) | ✅ |
| "Quyết định" | 8 (use case của lớp), 9 + 11 (2 câu hỏi để quyết), 12 (nguyên tắc) | ✅ |
| "khi nào agent tạo giá trị" | 11 | ✅ |
| "khi nào workflow đơn giản" | 9 | ✅ |
| "an toàn hơn" | 10 | ✅ |
| "Walkthrough support agent tối thiểu trong OpenAI Agents SDK" | 19 (concept) + demo 23 (chạy agent thật) | ⚠️ Chưa có bước **đi qua code** của agent tối thiểu: slide không có code (đúng nguyên tắc), nhưng demo chỉ chạy lệnh, chưa mở code |
| "agent definition, run/runner, tools" | 19 hàng Agent · Runner.run · function_tool | ✅ (khái niệm) / ⚠️ (chưa thấy code, như trên) |
| "và trace ở mức định vị" | 20, demo 23 (`--trace`) | ✅ |
| "không học thuộc API" | notes 19 | ✅ |
| "Chỉ rõ phần SDK cung cấp và phần product vẫn phải tự quyết định" | 21, 22 | ✅ |
| Ví dụ: "Yêu cầu support nào chỉ cần RAG, yêu cầu nào cần nhiều bước và tạo ticket?" | demo 23: trang demo có 2 nút "① Chỉ cần RAG" / "② Nhiều bước + tạo ticket" và ghi nguyên câu ví dụ; dự phòng kịch bản 9 / 1 của run_demo.py | ✅ |
| Bài tự thực hành: "Chọn một use case và giải thích vì sao dùng model call, workflow hoặc agent; đánh dấu ranh giới SDK và application." | 26 (bài tập về nhà); 25 (câu hỏi ôn tập) | ✅ |
| Kết quả: "chọn đúng mức điều phối" | 8–12 | ✅ |
| Kết quả: "đọc được sơ đồ agent tối thiểu" | 5 (sơ đồ agent loop), 19, 20 | ✅ |

## Đoạn mở đầu Giai đoạn 3 (02, trang 4) và đề cương 01

| Cụm chữ | Slide | |
|---|---|---|
| "Năm session dùng cùng support agent" / "support agent đọc knowledge base, trả lời có nguồn và có thể tạo ticket sau khi được phép" (01 trang 1) | 1, 2 (lộ trình), demo 23 | ✅ |
| "đi từ quyết định có cần agent hay không" | phần 02 (8–17) | ✅ |
| "OpenAI Agents SDK là ví dụ triển khai xuyên suốt" | 18–22, demo | ✅ |
| "mỗi buổi vẫn giải thích nguyên lý trước khi xem code" | code chỉ xuất hiện ở demo (slide 23) | ✅ |
| "SDK giúp chạy loop và tích hợp tools, trong khi application giữ quyền đối với dữ liệu, permission, approval, state lưu bền và business rule" | 22 (đủ các hàng: Loop · Tools · Dữ liệu & quyền · Approval · State · Business rule) | ✅ |
| Kết quả năng lực (01 trang 1): "Chọn model call, RAG, workflow hoặc agent theo user task, dữ liệu, rủi ro và cách kiểm tra kết quả" | 9–12 (user task), 11 (dữ liệu phi cấu trúc), 10 (rủi ro), 7 hàng Debug (kiểm tra); RAG ở demo | ✅ |

## Câu hỏi chưa giải quyết
- Walkthrough code: đề xuất thêm vào demo bước 0 "mở agent_openai_sdk.py, chỉ 3 chỗ: Agent(...), @function_tool, Runner.run" (chỉ thêm vào notes slide 23 + kịch bản, không thêm code lên slide).
