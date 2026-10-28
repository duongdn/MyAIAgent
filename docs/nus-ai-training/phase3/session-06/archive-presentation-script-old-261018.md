# Session 6 — Kịch bản trình bày (60 phút)

Deck (16 slide): https://docs.google.com/presentation/d/1pIVAHFwBg3Bgb28oBeJVJ19rEOyx8KFDlFn0PlcHPyQ
Code demo: `scripts/nus-ai-training/support_agent_demo/`
Người trình bày: DuongDN (S5 + S6). S7–S9 do VinhNT phụ trách.

## Chuẩn bị trước buổi (10 phút)

- [ ] `cd scripts/nus-ai-training/support_agent_demo` và kích hoạt venv đã cài `requirements.txt`
- [ ] Có key gateway trong `config/.nus-llm-gateway-config.json` (gitignored, không chiếu lên màn hình)
- [ ] Chạy thử 1 lần cho "ấm" gateway: `python3 run_demo.py --scenario 1 --approve yes --trace`
- [ ] Mở sẵn 1 tab terminal, font to; slide 6 có chạy live (trace kịch bản 1)
- [ ] Nếu gateway lỗi: dùng trace in sẵn trên slide 6 (output thật), không cần chạy lại
- [ ] 2-3 người tình nguyện chia sẻ bài tự thực hành Session 5 (chọn mức điều phối cho use case của họ)

## Dòng thời gian

| Phút | Slide | Phần | Gợi ý người nói |
|---|---|---|---|
| 0–5 | 1 | Mở đầu + chia sẻ bài S5 | DuongDN |
| 5–18 | 2–4 | 01 · Agent loop | DuongDN |
| 18–28 | 5–6 | Trong SDK + trace live | DuongDN |
| 28–45 | 7–10 | 02 · Tool contract | DuongDN |
| 45–53 | 11–12 | 03 · Xong thật chưa? | DuongDN |
| 53–57 | 13–14 | Ghi nhớ + thử thách | DuongDN |
| 57–60 | — | Q&A | cả hai |

---

## Mở đầu (0–5')

**Slide 1 · Session 6 (2')**
- Đọc câu hỏi trọng tâm: "Agent quyết định, gọi tool, nhận kết quả và tiếp tục như thế nào?"
- Gọi 2-3 người chia sẻ nhanh bài tự thực hành S5 (use case nào chọn mức gì, vì sao) — 30"/người.

**Slide 2 · Agenda (1')**
- 3 phần ~13 phút + Q&A: Agent loop · Tool contract · Xong thật chưa?

## Phần 01 · Agent loop (5–18')

**Slide 3 · Sơ đồ Agent loop (3')**
- 4 box: Goal → Model → Application → Tool, mũi tên navy đi / cam về.
- Đọc 5 bước trong notes: Goal → model chọn hành động → application thực thi (chỗ kiểm quyền, S7) →
  tool result quay lại → model tiếp tục hoặc dừng.
- **Chỉ rõ 1 điểm hay bị hiểu lầm:** sơ đồ vẽ 1 tool call/lượt cho dễ nhìn, nhưng thực tế model có thể
  viết NHIỀU tool call trong CÙNG 1 lượt (vd 2 lần search_kb với 2 query khác nhau) — chi tiết + trace
  thật ở Session 8. Nói thẳng câu này tránh để lớp đóng khung sai mental model.

**Slide 4 · Câu hỏi: ai thật sự gọi tool? (1')**
- Để lớp đoán 1 phút. Nhắc lại Session 1: model chỉ "text vào → text ra".

**Slide 5 · Đáp án: tool call là JSON (2')**
- Bên trái: response thật của model (JSON có `tool_calls`). Bên phải: SDK parse, gọi hàm Python thật.
- Chốt: "Model không chạm hệ thống nào. Mọi tác động thật đi qua code application — vì sao prompt
  injection gây hại được, Session 7 trả lời kỹ."

**Slide 6 · Trong SDK + trace — DEMO LIVE (5')**
- Bảng đối chiếu sơ đồ ↔ OpenAI Agents SDK: `Runner.run`, `1 turn`, `@function_tool` (qua
  `needs_approval` TRƯỚC — chỉ tool có khai báo, vd `create_ticket`; `search_kb` thì không).
- Chạy: `python3 run_demo.py --scenario 1 --approve yes --trace`
- Đọc trace cùng lớp: 🛡 guardrail 0.0s → 🧠 lượt 1 gọi search_kb → ② lọc quyền → 🧠 lượt 2 đề xuất
  create_ticket → ④ hợp lệ → AWAITING_APPROVAL → đồng ý → T-1001 → 🧠 lượt 3 trả lời có nguồn.
- Chốt: "3 lượt gọi model, ~3.000 token. Số bước do model quyết định — đó là agent."

## Phần 02 · Tool contract (28–45')

**Slide 7 · Tool contract 6 phần (3')**
- Model chỉ thấy 3 (name, description, input schema) — quyết định CHỌN tool và ĐIỀN tham số.
- Application phải tự định nghĩa thêm 3 (output, error, side effect) — model không thấy.
- "Hay quên nhất: error và side effect. Thiếu side effect → không biết tool nào cần duyệt, tool nào
  retry an toàn."

**Slide 8 · Description tốt vs chưa đủ (3')**
- So 2 bản mô tả `create_ticket`. Bản mơ hồ → eval thật cho thấy model yếu (qwen-3.7-flash) tự bịa
  "P2"/"billing team".
- Chốt quan trọng: "Description chỉ là hướng dẫn. Rule bắt buộc (chỉ P3/P4, assignee whitelist) vẫn
  phải nằm trong code — Session 7."

**Slide 9 · Read vs write (3')**
- Bảng 5 dòng: side effect, gọi 2 lần, retry, người duyệt, kiểm quyền — search_kb vs create_ticket.
- "Đừng gộp kiểu `manage_ticket(action=read|create|delete)` — không áp được rule riêng cho từng loại."

**Slide 10 · Contract thật trong demo (3')**
- Contract thật của 2 tool (checkpoints.py + ticket_system.py).
- Chỉ rõ chi tiết hay: tham số `tenant` trong `search_kb` cố tình để lộ — model có thể điền theo lời
  user, application BỎ QUA, dùng tenant từ session. "Lỗi thiết kế hay gặp, Session 7 giải quyết."

## Phần 03 · Xong thật chưa? (45–53')

**Slide 11 · Câu hỏi: model nói "đã tạo ticket" — xong chưa? (1')**
- Để lớp trả lời. Đa số sẽ nói "xong".

**Slide 12 · Đáp án: run kết thúc ≠ task hoàn thành (3')**
- Model có thể nói "đã tạo" dù tool bị chặn/timeout/bịa — câu trả lời của model KHÔNG phải bằng chứng.
- Bằng chứng = `ticket_id` từ hệ thống đích. Demo: `task_state.py` chỉ đánh dấu COMPLETED khi có ID.
- "Session 8 đi tiếp: state machine và điều kiện dừng."

## Kết (53–57')

**Slide 13 · Ghi nhớ (2')**
- 4 thẻ: Agent loop · Contract · Read/write · Hoàn thành. Đọc nhanh từng thẻ.

**Slide 14 · Thử thách + bài tự thực hành (2')**
- Giao bài: định nghĩa đủ 6 phần contract cho `search_kb` + `create_ticket`, vẽ sequence diagram 1 lần
  agent gọi tool. Mang tới đầu Session 7.
- 4 câu thử thách, đáp án có trong speaker notes slide 14.

## Q&A (57–60')

**Slide 15–16**
- Câu hay gặp, chuẩn bị trước:
  - "Model gọi 2 tool trong cùng 1 lượt có được không?" → được (trace kịch bản 7, Session 8 sẽ dùng
    chi tiết này).
  - "Trường nào model không thấy nhưng quan trọng nhất cho an toàn?" → side effect.
- Nhắc lịch buổi sau.

## Nếu bị thiếu thời gian
- Bỏ chạy live slide 6, dùng trace in sẵn (tiết kiệm 2').
- Slide 8 (Description) có thể rút gọn, chỉ đọc kết luận không đi chi tiết 2 bản mô tả (tiết kiệm 1').

## Câu hỏi chưa giải quyết
