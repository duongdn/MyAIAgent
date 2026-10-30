# Support agent demo — Giai đoạn 3 (S5–S9) + Giai đoạn 5

Một support agent dùng chung cho cả giai đoạn: đọc knowledge base, trả lời có nguồn, tạo ticket sau khi được duyệt.
Viết bằng **OpenAI Agents SDK**, chạy **model thật** qua LLM gateway công ty (mặc định `deepseek-v4.1-flash`). Không mock.

Thông điệp xuyên suốt (đề cương Giai đoạn 3, trang 4): *SDK giúp chạy loop và tích hợp tools; application giữ quyền với dữ liệu, permission, approval, state lưu bền và business rule.* → trong code: SDK nằm ở `agent_openai_sdk.py`, mọi quyết định của application nằm ở `checkpoints.py`.

## Chạy nhanh

```bash
cd docs/nus-ai-training/phase3/session-05/demo
python3 -m venv ~/ai-training-venv && source ~/ai-training-venv/bin/activate
pip install -r requirements.txt

python3 demo_ui.py                                         # trang web: http://localhost:8000
python3 run_demo.py --scenario 1 --approve yes --trace-only  # bản dòng lệnh
```

- Key gateway: `config/.nus-llm-gateway-config.json` (gitignored, code tự đọc) hoặc biến môi trường `NUS_LLM_API_KEY`. **Không hardcode key, không chiếu file này lên màn hình.**
- Đổi model / provider: `DEMO_MODEL=qwen-... ` · `DEMO_PROVIDER=openai|deepseek|nus`.
- Cache của gateway bị tắt mặc định để mỗi lần chạy là model thật (`DEMO_CACHE=1` để bật).

## Cấu trúc — 4 tầng

| Tầng | File | Vai trò |
|---|---|---|
| **1. Cách chạy** | `demo_ui.py` + `demo_ui.html` | Trang web: hỏi agent, cột trace hiện từng bước (cam = LLM quyết, tối = app chạy, xanh = người duyệt), nút Duyệt/Từ chối |
| | `run_demo.py` | Dòng lệnh, 9 kịch bản dựng sẵn (bảng dưới) |
| | `run_eval.py`, `compare_*.py` | Chạy lặp để đo (số liệu GĐ5, slide cũ) |
| **2. Agent (SDK)** | `agent_openai_sdk.py` | Model + tool + agent + `Runner.run`. Chỉ "nối dây" với SDK, không chứa rule |
| **3. Application quyết** | `checkpoints.py` | 5 điểm kiểm tra quyền + budget + system prompt. Giữ nguyên khi đổi SDK/model |
| **4. Hệ thống xung quanh** | `sample_data.py` | User, quyền theo role, tài liệu KB, 2 tài liệu bị đầu độc |
| | `ticket_system.py` | Hệ thống ticket giả: tạo T-1001…, giả lập timeout/503, idempotency |
| | `task_state.py` | Trạng thái task lưu ra `.state/`: PROCESSING → AWAITING_APPROVAL → COMPLETED / ESCALATED |
| | `trace_local.py` | Ghi trace ra `.traces/` (không gửi về OpenAI), in theo vòng lặp ①–④ |
| | `agent_claude_sdk.py` | Cùng agent bằng Claude Agent SDK — chứng minh `checkpoints.py` không đổi khi đổi SDK |

## Tầng 2 — agent tối thiểu (walkthrough Session 5)

`agent_openai_sdk.py`, chỉ cần 4 chỗ:

| Concept SDK | Dòng | Ý nghĩa |
|---|---|---|
| Model | `make_model` (52) | Kết nối gateway theo chuẩn Chat Completions; gắn trace processor ghi file local |
| `function_tool` | 79–92 | Hàm Python → tool. SDK lấy tên + mô tả + kiểu tham số gửi cho LLM. `search_kb` (đọc), `create_ticket` (ghi, có `needs_approval`) |
| `Agent` | `build_agent` (105) | instructions + model + 2 tool + guardrail `no_card_number` |
| `Runner.run` | `run_limited` (145) | Chạy cả vòng lặp agent, giới hạn `max_turns` và thời gian |

`run_agent` / `approve_and_continue` (111–162): SDK dừng ở tool cần duyệt → application hỏi người → duyệt thì chạy tiếp; chọn "duyệt sau" thì lưu `RunState` vào task state để `--resume`.

## Tầng 3 — application tự quyết (`checkpoints.py`)

| # | Kiểm tra | Hàm | Session |
|---|---|---|---|
| ① | Danh tính lấy từ session phía server, không tin chữ user gõ hay tham số model điền (vd `tenant`) | `new_session` | S7 |
| ② | Lọc tài liệu theo tenant + role ngay khi tìm | `search_kb` | S7 |
| ③ | Kết quả tool đánh dấu "dữ liệu không đáng tin" + log khi thấy dấu hiệu prompt injection (lớp yếu) | `search_kb` | S7, GĐ5 |
| ④ | Kiểm tra quyền + tham số ticket bằng code: priority chỉ P3/P4, assignee trong team hợp lệ, role được tạo ticket | `validate_ticket`, `check_ticket` | S6, S7 |
| ⑤ | Người duyệt hành động có side effect | `ask_human` | S7 |

Thêm: budget số tool call / task (`MAX_TOOL_CALLS`), `MAX_TURNS = 8`, retry có giới hạn + idempotency khi gọi hệ thống ticket. `SYSTEM_PROMPT` chỉ là hướng dẫn cho model — **không** phải cơ chế bảo mật.

## Một yêu cầu đi qua code thế nào

Câu "Khách X báo lỗi thanh toán mã E205, xử lý sao? Tạo ticket cho billing team giúp tôi.":

```
demo_ui / run_demo
 └─ run_agent()                              agent_openai_sdk.py
     ├─ new_session("alice")                 ① danh tính từ server
     ├─ guardrail no_card_number             chặn số thẻ trước khi gửi LLM
     └─ Runner.run() ── vòng lặp SDK ─────────────────────────────────────┐
         LLM: "gọi search_kb"         → search_kb()     ② lọc quyền ③ đánh dấu dữ liệu
         LLM: "create_ticket P2"      → check_ticket()  ④ CHẶN → lỗi gửi lại LLM
         LLM: "create_ticket P3"      → ④ hợp lệ → SDK dừng (needs_approval)
         approve_and_continue → ask_human()             ⑤ người duyệt → chạy tiếp
         create_ticket() → ticket_system.create()       T-1001 (idempotency key)
         LLM: trả lời cuối ───────────────────────────────────────────────┘
     └─ task_state: COMPLETED chỉ khi hệ thống ticket xác nhận T-1001
```

Trace (trang web hoặc `--trace-only`) in đúng vòng lặp này: **①** app gửi cho LLM · **②** LLM quyết định (JSON + lý do LLM tự viết) · **③** app chạy hàm thật · **④** kết quả gửi lại.

## Kịch bản (`run_demo.py --scenario N`)

| # | Kịch bản | Dùng ở | Ý cần thấy |
|---|---|---|---|
| 1 | alice hỏi + nhờ tạo ticket | S5, S6 | Vòng lặp nhiều bước, chờ duyệt, T-1001 |
| 2 | KB có tài liệu chứa lệnh độc (prompt injection gián tiếp) | S7, GĐ5 | Model có thể bị lừa đề xuất P1 → ④ chặn |
| 3 | bob (viewer) nhờ tạo ticket | S7 | Thiếu quyền → chặn bằng code |
| 4 | alice tự nhận thuộc tenant-B | S7 | ① + ② không cho xem dữ liệu công ty khác |
| 5 | KB có "quy định" giả trông hợp lệ | S7, GĐ5 | Model không phân biệt được → chỉ ④ chặn được |
| 6 | Timeout khi tạo ticket | S7 | Retry + idempotency, không tạo trùng |
| 7 | KB không có tài liệu liên quan | S6, S8 | Trả lời "chưa đủ dữ liệu" |
| 8 | Câu hỏi chứa số thẻ | S5, GĐ5 | Guardrail chặn trước khi gửi LLM |
| 9 | Chỉ hỏi "Mã lỗi E205 nghĩa là gì?" | S5 | Chỉ cần tra tài liệu — model call + RAG là đủ |

Tuỳ chọn hay dùng:

| Tuỳ chọn | Tác dụng |
|---|---|
| `--trace-only` | Chỉ in vòng lặp ①–④ (ẩn log kiểm quyền S7) — dùng cho S5 |
| `--trace` | In trace + toàn bộ log checkpoint |
| `--approve ask\|yes\|no\|later` | Cách trả lời người duyệt; `later` = lưu state, dừng chờ |
| `--resume <task_id>` | Chạy tiếp task đang chờ duyệt (S8) |
| `--disable 1..5\|idem` | Tắt checkpoint để xem hậu quả (S7, GĐ5) |
| `--fault timeout_once\|down` | Giả lập lỗi hệ thống ticket (S6, S7) |
| `--compare` | Chạy 1 kịch bản trên mọi model của gateway, in bảng so sánh (GĐ5) |
| `--sdk claude` | Chạy bằng Claude Agent SDK |

## Đổi / mở rộng

- **Thêm kịch bản**: thêm vào `SCENARIOS` trong `run_demo.py`; câu mẫu trang web ở `SAMPLES` trong `demo_ui.py`.
- **Thêm tool**: viết hàm trong `checkpoints.py` (rule) → bọc `@function_tool` trong `agent_openai_sdk.py` → thêm vào `build_agent`.
- **Đổi rule** (priority, team, quyền): `sample_data.py` + `checkpoints.py` — không sửa prompt để "dạy" model rule.
- Sửa demo → chạy lại kịch bản 1, 2, 5, 9 và `demo_ui.py`, vì S5–S9 và GĐ5 dùng chung.
