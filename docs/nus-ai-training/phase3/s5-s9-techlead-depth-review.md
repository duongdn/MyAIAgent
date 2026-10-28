# S5–S9 — Techlead depth review

Vai: techlead dự training, đánh giá nội dung có đủ sâu cho SSE/techlead không. Không sửa slide.

## Kết luận chung

KHÔNG quá cơ bản cho mục tiêu curriculum nêu rõ ("ranh giới SDK/application", "chọn đúng mức điều phối",
"bản thiết kế agent đủ rõ để **thảo luận**" — không phải "đủ để **ship** production"). Nội dung chắc: tool
contract 6 phần, idempotency key sinh từ nghiệp vụ, state machine 4 trạng thái, phân biệt budget
per-turn vs per-tool-call, harness 6 lớp. Hơn hẳn phần lớn blog "intro to agents".

Nhưng nếu là techlead sắp thiết kế agent thật cho sản phẩm, đây là các câu hỏi 5 session không trả lời —
và quan trọng hơn: **không nói rõ là cố tình không trả lời**, dễ gây hiểu lầm pattern đã sẵn sàng production.

## Gaps thật — câu hỏi techlead sẽ hỏi ngay tại chỗ

1. **Concurrency — gap lớn nhất.** Toàn bộ demo chạy 1 task/1 session tuần tự. Không có dòng nào về nhiều
   user gọi đồng thời, `TaskState`/`Session` có thread-safe không khi SDK thực thi "2 search_kb trong 1
   lượt" (S8) — song song hay tuần tự trong asyncio? Đây là câu đầu tiên SSE sẽ hỏi khi thấy "2 tool
   call/1 lượt" ở S8 — training không trả lời. (Chưa verify được — xem "Câu hỏi còn treo".)

2. **Streaming / UX latency.** `RUN_TIMEOUT_S=120` (S8) = user có thể chờ 2 phút không phản hồi vì
   `Runner.run()` blocking. Không nhắc `Runner.run_streamed()` hay chiến lược stream-token nào. Với sản
   phẩm thật 120s im lặng không chấp nhận được.

3. **Multi-agent / handoffs vắng mặt.** OpenAI Agents SDK có `handoffs` (agent-to-agent) là first-class
   feature — 5 session dùng đúng 1 agent, 2 tool, không 1 lần nhắc multi-agent dù chỉ để nói "ngoài
   phạm vi".

4. **Schema/contract versioning.** S6 dạy kỹ 6 phần tool contract nhưng không bàn: khi `search_kb` đổi
   input schema, agent cũ đang chạy có vỡ không? Không có khái niệm backward-compat/deprecation cho
   tool contract.

5. **Test suite chỉ 5 case, không bàn scale/statistical confidence.** `run_eval.py` tốt về nguyên tắc
   (chấm side-effect thật, không AI chấm AI) nhưng model non-deterministic mà chỉ chạy 1-2 lần/case
   không đủ nói "5/5 = ổn định". Không CI integration, không variance.

6. **Observability dừng ở file local.** `trace_local.py` ghi `.traces/*.jsonl` trên máy — rõ chỉ cho
   demo, nhưng S9 không bắc cầu sang production (log tập trung, alert tỉ lệ escalate bất thường, cost
   theo tenant). Không cả 1 câu "xem Session 13".

7. **Context/history compaction chỉ 1 dòng.** S8: "lịch sử hội thoại tăng dần → phải cắt bớt/tóm tắt"
   nhưng không nói làm sao (sliding window? summarize-khi-N-turn? drop tool result cũ trước?).

## Gaps chấp nhận được (có lý do defer rõ trong PDF curriculum)

- Security sâu (sandbox code-exec tool, SSRF, secrets rotation) — hợp lý dành Giai đoạn 5; 2 tool demo
  (DB read, ticket API) an toàn by construction.
- Cost governance tổng hệ thống — S5 đo token/request tốt; tổng hợp theo tenant/dashboard hợp lý ở S13.
- Production deploy/canary cho agent — ngoài phạm vi theo đúng PDF 01 ("không phải khóa SRE").

## Khuyến nghị

Thiếu sót lớn nhất không phải "chưa dạy đủ sâu" mà là **không có slide nào nói rõ ranh giới phạm vi**.
S9 "Kiến trúc" tổng kết kiểu khép kín (trông như đã đủ). Nên có 1 slide "Giới hạn demo này" liệt kê rõ:
không xử lý concurrency, streaming, multi-agent, schema versioning — để SSE/techlead không lầm tưởng
pattern sẵn sàng production.

## Câu hỏi còn treo

- Nhiều tool call trong 1 lượt (S8 kịch bản 7): SDK `openai-agents` chạy tuần tự hay `asyncio.gather`
  song song? Không verify được nếu không đọc source package hoặc debug trace trực tiếp — ảnh hưởng
  trực tiếp câu trả lời đúng cho gap #1 (concurrency).
