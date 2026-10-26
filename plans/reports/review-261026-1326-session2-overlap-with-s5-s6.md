# Session 2 (ChienTX, Trello 21/10) trùng với S5/S6 ở đâu

Nguồn: `Session_02 – From use case to model API, prompts and structured output.pdf` (16 slide) trên card rCundWKl.
Đã đối chiếu với S5 (23 slide) và S6 (18 slide).

## Trùng

| # | Session 2 | S5/S6 | Mức trùng | Đề xuất |
|---|---|---|---|---|
| 1 | Slide 5: 4 mức: model call · RAG · workflow · agent ("pick the simplest pattern") | S5 slide 6 (3 mức), 14–16 ("chọn mức thấp nhất đủ dùng", 3 câu hỏi quyết định) | **Cao**: S2 đã chốt nguyên tắc chọn mức thấp nhất | S5 giữ phần mới: code thật (7), số đo token (9–13). Gộp 14–16 thành 1 slide, mở đầu bằng "S2 đã chọn pattern, hôm nay đo xem agent tốn hơn bao nhiêu" |
| 2 | Slide 10: "Model output là data để kiểm tra, không phải lệnh" + email injection | S6 slide 5 (tool call là JSON → kiểm soát ở application), 11 ("description là hướng dẫn, rule chặn bằng code"), S5 slide 20 | **Cao** về thông điệp | S6 không giảng lại nguyên lý; nói: "S2 áp cho output, hôm nay áp cho tool call". Rút câu chốt ở slide 5 |
| 3 | Slide 11: schema với `z.enum`, `nullable` | S6 slide 9 ("priority chỉ là string"), Q&A "dùng enum" | **Trung bình** | Đổi hướng slide 9–11 thành: S2 dùng enum cho output; tool của mình chưa có, đo sai 5/5 → 0/5. Nên thêm biến thể thứ 4 dùng `Literal["P3","P4"]` (enum) và đo thật, để nối với S2 |
| 4 | Slide 13: "Business rules live in code, not in the model" (`decide()`) | S6 slide 11 + checkpoint ④ `validate_ticket` | **Trung bình** | Gọi ④ là "decide() của S2, nhưng chạy trước khi tool chạy" |
| 5 | Slide 8: timeout, retry có giới hạn, token cost | S6 slide 15 (`--fault down`: 503 → retry → ESCALATED); S5 slide 10–11 token | **Thấp** | Giữ phần riêng (ESCALATED, đo token). Bỏ phần giải thích retry/token là gì |
| 6 | Slide 3: recap S1 (model có thể sai) | S6 slide 4 "Nhớ lại Session 1: text vào → text ra" | Thấp | Giữ nguyên |

## Không trùng (S5/S6 vẫn riêng)
- Agent loop, Runner.run, trace thật (S5 17–18, S6 3, 6–7)
- Tool contract 6 phần, read vs write tool (S6 8, 12–13)
- Run kết thúc ≠ task xong (S6 14–15)
- Số đo token / thời gian (S5 9–13)

## Cũng nên thống nhất
- Thuật ngữ: S2 viết bằng tiếng Anh ("pattern", "Model call / Retrieval / Workflow / Agent"). S5 nên dùng đúng các tên này để học viên nhận ra.
- S2 dùng TypeScript (openai + zod); demo của mình dùng Python (Agents SDK). Cần 1 dòng trong notes giải thích lý do.
- Ví dụ: S2 = email support → JSON. Ví dụ của mình = E205 + ticket, cùng domain support nên nối được: "email S2 đã thành yêu cầu có cấu trúc → giờ agent xử lý tiếp".

## Câu hỏi chưa giải quyết
- Xử lý mục 1 theo cách nào: gộp slide 14–16 của S5 hay bỏ hẳn?
- Mục 3: có đo thêm biến thể enum không? (khoảng 2 phút gọi model thật)
- Có cần kiểm tra trùng với S3–S4 không? Hiện trên card chưa có PDF S3–S4.
