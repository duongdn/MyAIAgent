# Session 6 — Kịch bản trình bày (60 phút) + đối chiếu PDF

Deck (18 slide): https://docs.google.com/presentation/d/1pIVAHFwBg3Bgb28oBeJVJ19rEOyx8KFDlFn0PlcHPyQ
Code demo: `docs/nus-ai-training/phase3/session-05/demo/` — mọi số liệu trên slide đều chạy thật (deepseek-v4.1-flash qua gateway công ty).
Người trình bày: DuongDN (S5 + S6). S7–S9 do VinhNT phụ trách.

## A. Đối chiếu PDF (02_Noi_dung_chi_tiet, mục Session 6) → slide

| # | Dòng trong PDF | Slide | Ghi chú |
|---|---|---|---|
| 1 | Tên buổi, 60 phút, câu hỏi trọng tâm "Agent quyết định, gọi tool, nhận kết quả và tiếp tục như thế nào?" | 1 | Câu hỏi ghi nguyên văn |
| 2 | Luồng goal → model chọn hành động → application thực thi → tool result → model tiếp tục hoặc dừng | 3 | Sơ đồ độc lập SDK, mũi tên navy đi / cam về |
| 2a | Đối chiếu sơ đồ độc lập SDK với một run trong SDK | 6, 7 | 6 = bảng sơ đồ ↔ Runner.run; 7 = trace thật kịch bản 1 |
| 3 | Tool contract gồm tên, mô tả, input schema, output, lỗi, side effect | 8, 9, 13 | 8 = 6 phần (model thấy 3); 9 = JSON schema thật SDK gửi cho model; 13 = contract đủ 6 phần của 2 tool demo |
| 3a | Tách read tool khỏi write tool | 12 | |
| 4 | Minh hoạ hai tool search_knowledge_base và create_ticket | 5, 7, 9–13 | Trong code tên là `search_kb` (cùng tool, tên ngắn) |
| 5 | Kết quả của run chưa tự chứng minh user task đã hoàn thành; application phải kiểm tra tác động thực | 14, 15 | 15 có demo live `--fault down` (trong notes) |
| 6 | Ví dụ trong buổi: đọc trace hai bước — tìm tài liệu rồi đề xuất tạo ticket | 7 | |
| 7 | Bài tự thực hành: contract cho hai tool + sequence diagram một lần gọi tool | 17 | |
| 8 | Kết quả: giải thích được agent loop | 3–7 | |
| 8a | …và thiết kế được tool contract tối thiểu | 8–13 | |

Slide không ứng với dòng nào trong PDF: 2 (Agenda), 10–11 (đo description — bằng chứng cho dòng 3), 16 (Ghi nhớ), 18 (Q&A).
Không còn dòng nào của PDF thiếu slide.

## B. Chuẩn bị trước buổi

- [ ] `cd docs/nus-ai-training/phase3/session-05/demo`, kích hoạt venv đã cài `requirements.txt`
- [ ] Key gateway có trong `config/.nus-llm-gateway-config.json` (không chiếu file này lên màn hình)
- [ ] Chạy thử 1 lần cả 3 lệnh live ở dưới (gateway "ấm", khỏi chờ lâu)
- [ ] Nếu muốn đo lại description: `python3 demo/compare_tool_descriptions.py --runs 5` (khoảng 2 phút, chạy TRƯỚC buổi; ghi `tool_descriptions.json`)
- [ ] Gateway lỗi → dùng output in sẵn trên slide 7, 9, 11 (đều là output thật)

## C. Dòng thời gian

| Phút | Slide | Phần |
|---|---|---|
| 0–5 | 1–2 | Mở đầu + 2 người chia sẻ bài tự thực hành S5 |
| 5–20 | 3–7 | 01 · Agent loop |
| 20–38 | 8–13 | 02 · Tool contract |
| 38–44 | 14–15 | 03 · Xong thật chưa? |
| 44–48 | 16–17 | Ghi nhớ + bài tự thực hành |
| 48–60 | 18 | Q&A |

## D. Từng slide

**Slide 1 · Session 6 (3')**
- Đọc câu hỏi trọng tâm.
- Mời 2 người chia sẻ nhanh bài S5 (chọn mức điều phối cho use case của họ), mỗi người tối đa 1 phút. Không nhắc lại nội dung S5.

**Slide 2 · Agenda (30")**

### 01 · Agent loop (5–20')

**Slide 3 · Sơ đồ agent loop (3')**
- Đi theo mũi tên: Goal → Model chọn hành động → Application thực thi → Tool → kết quả quay về.
- Nhấn mạnh ô "Application thực thi": đây là chỗ kiểm quyền (Session 7).
- Hai lối ra: Tiếp tục (gọi tool nữa) hoặc Dừng (trả lời cuối / chạm giới hạn).

**Slide 4 · Câu hỏi: ai thật sự gọi tool? (1')** — để lớp đoán.

**Slide 5 · Đáp án: tool call là JSON (3')**
- Trái: thứ model trả về, chỉ là text. Phải: SDK gọi hàm thật.
- Chốt: "Ai điều khiển được text model viết ra thì điều khiển được tool call → kiểm soát phải ở application."

**Slide 6 · Runner.run = agent loop (3')**
- Đọc bảng theo hàng: mỗi khái niệm của sơ đồ nằm ở đâu trong SDK. Không cần nhớ API.

**Slide 7 · Trace thật — DEMO LIVE (5')**
- Chạy: `python3 run_demo.py --scenario 1 --approve yes --trace` (khoảng 7–8 giây).
- Đọc theo vòng lặp ①–④: 🛡 guardrail → ① app gửi 2 message → ② LLM quyết định gọi search_kb (JSON + lý do LLM tự viết) → ③ app chạy → ① 5 message → ② LLM đề xuất create_ticket → ③ chưa chạy, chờ duyệt → T-1001 → ② LLM quyết định dừng, trả lời.
- Live sẽ thấy create_ticket 2 dòng ③: "CHƯA chạy create_ticket: dừng chờ người duyệt" rồi "chạy hàm thật create_ticket" sau khi duyệt.
- Số liệu live sẽ lệch chút so với slide (model thật). Thỉnh thoảng model đề xuất P2 rồi bị ④ chặn → đúng dịp nối sang slide 10–11.
- Kết: 3 lượt gọi model, 2.707 token vào + 621 ra (số trên slide). Số bước do model quyết định.

### 02 · Tool contract (20–38')

**Slide 8 · 6 phần, model chỉ thấy 3 (3')**
- Hàng trên: name, description, input schema = model thấy.
- Hàng dưới: output, error, side effect = application định nghĩa. Side effect tô cam: hay quên nhất.

**Slide 9 · Model thật sự thấy gì — DEMO LIVE (3')**
- Chạy: `python3 demo/compare_tool_descriptions.py --schema` (tức thì, không gọi model).
- Chỉ vào output: không có output/error/side effect. `priority` chỉ là `"string"` → model chỉ còn description để đoán.

**Slide 10 · Câu hỏi: đổi description, sai bao nhiêu? (1'30")** — cho lớp đoán bản mơ hồ sai mấy/5.

**Slide 11 · Đáp án đo thật (3')**
- 5/5 → 2/5 → 0/5. Bản mơ hồ: model tự đặt "high", "medium", "billing team".
- Cả 15 lần vẫn tạo được ticket: lỗi quay về model, model tự sửa → description kém = tốn thêm lượt gọi.
- Chốt: description là hướng dẫn, rule vẫn chặn bằng code (Session 7).

**Slide 12 · Read vs write (3')**
- Đọc theo hàng: gọi 2 lần, retry, người duyệt, kiểm quyền.
- "Đừng gộp kiểu manage_ticket(action=…)".

**Slide 13 · Contract thật của 2 tool (3')**
- Chỉ tham số `tenant` của search_kb: cố ý để lộ, application bỏ qua và lấy tenant từ session (Session 7 làm demo).
- Output create_ticket có `ticket_id` = bằng chứng → nối sang phần 03.

### 03 · Xong thật chưa? (38–44')

**Slide 14 · Câu hỏi (1')** — đa số sẽ nói "xong".

**Slide 15 · Run kết thúc ≠ task hoàn thành — DEMO LIVE (5')**
- Bằng chứng = `ticket_id` do hệ thống đích trả, không phải câu "đã tạo" của model.
- Chạy: `python3 run_demo.py --scenario 1 --approve yes --fault down` (khoảng 10 giây).
- Chỉ ra: helpdesk trả 503 → application retry → `📌 ESCALATED (ticket_system_unavailable)` → "Ticket trong hệ thống đích: không có".
- Trạng thái do application quyết theo kết quả thật. Session 8 đi tiếp state machine.

### Kết (44–48')

**Slide 16 · Ghi nhớ (2')** — đọc 4 thẻ.

**Slide 17 · Thử thách + bài tự thực hành (2')**
- Giao bài: contract 6 phần cho 2 tool + sequence diagram (user → app → model → tool → model). Mang tới đầu Session 7.
- Đáp án 4 câu có trong speaker notes slide 17.

### Q&A (48–60')

**Slide 18**
- Câu hay gặp:
  - "Viết description dài có tốn token không?" → có, mỗi lượt gửi lại. Nhưng rẻ hơn một lượt gọi bị chặn rồi sửa (slide 11).
  - "Schema có ép được P3/P4 không?" → có thể dùng enum (Literal["P3","P4"]) để model khó điền sai hơn. Nhưng vẫn phải kiểm tra bằng code, vì schema chỉ là gợi ý cho model.
- Nhắc lịch buổi sau: 11h thứ 4 tuần sau.

## E. Nếu thiếu thời gian
- Bỏ live slide 9 (output đã có trên slide).
- Slide 10–11: lật đáp án luôn.

## Câu hỏi chưa giải quyết
- (không còn)
