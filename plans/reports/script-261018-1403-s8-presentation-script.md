# Session 8 — Kịch bản trình bày (60 phút)

Deck (16 slide): https://docs.google.com/presentation/d/1LeHoPz4orAL7Bb656Z85xjyPV9iTloznTE5kqayNYhs
Code demo: `scripts/nus-ai-training/support_agent_demo/`
Người trình bày: DuongDN · VinhNT. Bên dưới có **gợi ý** chia phần, hai người tự chốt lại.

## Chuẩn bị trước buổi (10 phút)

- [ ] `cd scripts/nus-ai-training/support_agent_demo` và kích hoạt venv
- [ ] Có key gateway trong `config/.nus-llm-gateway-config.json`
- [ ] Chạy thử: `python3 run_demo.py --scenario 1 --approve later` → lấy `task_id` in ra, rồi
      `python3 run_demo.py --resume <task_id> --approve yes` (xác nhận resume hoạt động)
- [ ] Chạy thử: `DEMO_MAX_TOOL_CALLS=1 python3 run_demo.py --scenario 7` (xác nhận ESCALATED budget)
- [ ] Mở sẵn 1 tab terminal, font to; slide 4 và 10 có chạy live
- [ ] Nếu gateway lỗi: dùng output in sẵn trên slide, không cần chạy lại

## Dòng thời gian

| Phút | Slide | Phần | Gợi ý người nói |
|---|---|---|---|
| 0–5 | 1–2 | Mở đầu | DuongDN |
| 5–25 | 3–6 | 01 · 4 loại thông tin + task state | DuongDN |
| 25–38 | 7–9 | 02 · Điều kiện dừng | VinhNT |
| 38–53 | 10–12 | 03 · Giới hạn + memory | VinhNT |
| 53–57 | 13–14 | Ghi nhớ + thử thách | DuongDN |
| 57–60 | 15–16 | Q&A | cả hai |

---

## Mở đầu (0–5')

**Slide 1 · Session 8 (3')**
- Warm-up: "Bạn duyệt 1 yêu cầu trên Jira sau 2 tiếng — hệ thống có quên yêu cầu đó không? Vì sao
  không?" → vì nó lưu trạng thái trong DB, không phải RAM.

**Slide 2 · Agenda (1')**
- 3 phần ~13 phút: 4 loại thông tin · Task state · Điều kiện dừng. Demo chạy thật ở phần 2
  (`--approve later` → `--resume`) và phần 3 (kịch bản 7, budget).

## Phần 01 · 4 loại thông tin + task state (5–25')

**Slide 3 · Bảng 4 loại thông tin (3')**
- Context lần gọi (1 request) · Lịch sử hội thoại (1 cuộc chat) · Task state (tới khi xong, DB lưu
  bền — trọng tâm buổi) · Memory (nhiều task, có hạn).
- Lưu ý dòng Memory: demo KHÔNG triển khai memory dài hạn — cột ví dụ là minh hoạ giả định, không có
  trong code (tránh hiểu lầm khi đọc `task_state.py`).
- "Model KHÔNG nhớ gì giữa các request" — callback Session 1 (ChienTX), câu hỏi thử thách 06.

**Slide 4 · Câu hỏi: restart lúc chờ duyệt — agent quên không? (1')**
- Để lớp trả lời. Đa số nói "quên, vì state nằm RAM" — đúng nếu không lưu.

**Slide 5 · Đáp án · chạy thật — DEMO LIVE (5')**
- Chạy: `python3 run_demo.py --scenario 1 --approve later` → đọc task_id in ra.
- Giải thích: SDK dừng ở interruption, application ghi `RunState.to_json()` vào `.state/<task_id>.json`
  rồi thoát — process chết thật.
- Chạy (process MỚI, terminal mới hoặc nói rõ "giả sử 2 tiếng sau"):
  `python3 run_demo.py --resume <task_id> --approve yes`
- Chốt: "SDK cung cấp to_json/from_json. Application quyết định: lưu DB nào, giữ bao lâu, ai được resume."

**Slide 6 · Task state (3')**
- Đọc file state thật (rút gọn): status, stop_reason, ticket_id (CHỈ ghi khi hệ thống đích trả về),
  pending_approval (tham số chính xác người duyệt xem), tool_calls/searches.
- "KHÔNG lưu: nội dung tài liệu KB (quyền có thể đã đổi), session đăng nhập."

## Phần 02 · Điều kiện dừng (25–38')

**Slide 7 · State machine (3')**
- 4 trạng thái: PROCESSING ⇄ AWAITING_APPROVAL · → COMPLETED (chỉ khi có nguồn/ticket ID) ·
  → ESCALATED (thiếu dữ liệu, lỗi, budget, guardrail, hoặc model nói "đã tạo" mà không có ID).
- "Bài tự thực hành chính là vẽ sơ đồ này cho use case của các bạn."

**Slide 8 · Hoàn thành thật (3')**
- Bảng 4 tình huống: bình thường → COMPLETED; timeout+idempotency vẫn COMPLETED (cùng ID cũ); 503 →
  ESCALATED; model nói "đã tạo" không gọi tool → ESCALATED.
- "Ví dụ đề cương: agent gọi create_ticket nhưng chưa có ID xác nhận → chưa báo hoàn thành."

**Slide 9 · Điều kiện dừng — 5 lý do (3')**
- Bảng 5 dòng, cột cuối là lệnh tái hiện (đều chạy thật): hoàn thành thật, thiếu dữ liệu, chờ duyệt,
  lỗi không phục hồi, vượt budget.
- "Điểm hay bị quên: thiếu dữ liệu LÀ điều kiện dừng hợp lệ — nói rõ 'không có tài liệu', không tra
  mãi hoặc bịa."

## Phần 03 · Giới hạn + memory (38–53')

**Slide 10 · Giới hạn — DEMO LIVE (4')**
- 3 giới hạn: `max_turns=8` (SDK) · `RUN_TIMEOUT_S=120` (asyncio) · `MAX_TOOL_CALLS=6` (application).
- Chạy: `DEMO_MAX_TOOL_CALLS=1 python3 run_demo.py --scenario 7`
- Đọc output: ESCALATED(tool_call_budget), model không tra được thêm, báo rõ đã chuyển giới hạn.

**Slide 11 · Câu hỏi: có max_turns rồi, cần MAX_TOOL_CALLS làm gì? (1')**
- Gợi ý: 1 lượt gọi model có thể sinh mấy tool call?

**Slide 12 · Đáp án · trace thật (3')**
- Trace kịch bản 7: lượt 2, model gọi search_kb HAI lần cùng lúc (2 query khác nhau). 8 lượt × nhiều
  tool/lượt → tổng tool call có thể vượt xa 8. "Vì vậy demo đếm tool call RIÊNG ở application, độc lập
  với max_turns của SDK."
- Đây chính là dữ liệu trả lời câu hỏi thử thách Session 6 ("model gọi 2 tool/1 lượt được không?") —
  nhắc lại kết nối này nếu có người nhớ.

## Kết (53–57')

**Slide 13 · Memory (2')**
- Demo KHÔNG có memory dài hạn — quyết định thiết kế YAGNI. 3 rule khi cần: có lý do, có thời hạn,
  không lẫn tenant.

**Slide 14 · Ghi nhớ + Thử thách (2')**
- Giao bài: vẽ state machine cho agent của họ (đang xử lý/chờ duyệt/hoàn thành/chuyển người), ghi dữ
  liệu lưu ở từng trạng thái. Mang tới đầu Session 9.

## Q&A (57–60')

**Slide 15–16**
- Câu hay gặp:
  - "Vì sao không lưu nội dung tài liệu KB vào task state?" → quyền có thể đổi; lấy lại khi cần.
  - "Server restart lúc chờ duyệt cần lưu gì để chạy tiếp?" → RunState.to_json() + task_id, DB.

## Nếu bị thiếu thời gian
- Bỏ chạy live slide 10 (budget), dùng output in sẵn — tiết kiệm 3'.
- Slide 13 (Memory) có thể rút gọn còn 1 câu "demo không có, 3 rule khi cần xem notes" — tiết kiệm 1'.

## Câu hỏi chưa giải quyết
- Chia phần giữa DuongDN và VinhNT ở trên chỉ là gợi ý, hai người cần chốt.
- Demo resume cần 2 lần chạy lệnh cách nhau — nếu terminal dùng chung 1 cửa sổ, nhớ nói rõ "đây là
  process MỚI" để lớp không hiểu lầm state giữ trong RAM.
