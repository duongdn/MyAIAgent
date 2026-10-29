# Session 5: dòng nào trong PDF ứng với slide nào

Nguồn: `02_Noi_dung_chi_tiet_chuong_trinh_dao_tao_AI.pdf`, mục Session 5. Deck 26 slide (cập nhật 2026-10-29 15:40): https://docs.google.com/presentation/d/10ZYIXeEzlElYai6ws9xd77ZN8QbNfAAdPMJekhkHMWI

| # | Dòng trong PDF | Slide | Trạng thái |
|---|---|---|---|
| 1 | Tên buổi "Agent khác workflow ở đâu và OpenAI Agents SDK hỗ trợ gì" · 45 phút · câu hỏi trọng tâm | 3 | ✅ (tiêu đề slide chỉ ghi vế đầu, user đã đồng ý) |
| 2 | So sánh single model call, workflow do code điều phối và agent có **mục tiêu, tools, loop, điều kiện dừng** | 5 (nhắc lại agent loop), 6 (sơ đồ 3 mức), 7 (bảng: đầu vào = mục tiêu · dùng tool · vòng lặp · ai quyết khi dừng), 13–17 ("workflow do code điều phối": 5 mẫu workflow của Anthropic, mỗi mẫu 1 slide) | ✅ |
| 3 | Quyết định khi nào agent tạo giá trị và khi nào workflow đơn giản an toàn hơn | Tách từng chữ: **quyết định** → 8 (câu hỏi use case của lớp) + 12 (4 bậc, chỉ lên bậc khi cần) · **agent tạo giá trị** → 11 (3 dấu hiệu, OpenAI) · **workflow đơn giản** → 9 (viết trước được các bước: ổn định · rẻ · dễ debug) · **an toàn hơn** → 10 (4 rủi ro: hành động ngoài dự kiến · nội dung đọc vào điều khiển · lỗi lan · kiểm tra trước; OWASP LLM06 Excessive Agency + Anthropic) | ✅ |
| 4 | Walkthrough support agent tối thiểu trong OpenAI Agents SDK: agent definition, run/runner, tools, trace ở mức định vị; không học thuộc API | 18 (SDK là gì: thư viện viết sẵn phần code app), 19 (khái niệm SDK ↔ agent loop), 20 (trace ①–④), 23 (code 3 mức, demo) | ✅ |
| 5 | Chỉ rõ phần SDK cung cấp và phần product vẫn phải tự quyết định | 21 (câu hỏi), 22 (bảng SDK / application) | ✅ |
| 6 | Ví dụ trong buổi: "Yêu cầu support nào chỉ cần RAG, yêu cầu nào cần nhiều bước và tạo ticket?" | — | ❌ **Thiếu** — slide cũ (bảng 4 yêu cầu support) đã bỏ khi chuyển sang từ chung |
| 7 | Bài tự thực hành: chọn use case, giải thích model call / workflow / agent; đánh dấu ranh giới SDK và application | 25 | ✅ |
| 8 | Kết quả: chọn đúng mức điều phối · đọc được sơ đồ agent tối thiểu | 8–12 · 5, 19 | ✅ |

Slide không ứng với dòng nào: 1 (tiêu đề Giai đoạn 3), 2 (lộ trình), 4 (agenda), 24 (ghi nhớ), 26 (Q&A).

## Câu hỏi chưa giải quyết
- Dòng 6: làm ví dụ support ở đâu? Đề xuất: trong phần demo cuối buổi (sau slide 20), chạy live 2 yêu cầu — "Mã lỗi E205 là gì?" (chỉ cần tra tài liệu → model call) và "Khách báo lỗi E205, tạo ticket giúp" (nhiều bước + tạo ticket → agent). Đúng ý PDF, không đưa ví dụ cụ thể lên các slide lý thuyết.
