# Demo Session 5 — support agent tối thiểu với OpenAI Agents SDK

Demo phục vụ 2 dòng trong đề cương Session 5 (`02_Noi_dung_chi_tiet_chuong_trinh_dao_tao_AI.pdf`, trang 4):
- "**Walkthrough** support agent tối thiểu trong OpenAI Agents SDK: agent definition, run/runner, tools và trace ở mức định vị; không học thuộc API."
- "Ví dụ trong buổi: Yêu cầu support nào chỉ cần RAG, yêu cầu nào cần nhiều bước và tạo ticket?"

Agent chạy **model thật** qua LLM gateway công ty (mặc định `deepseek-v4.1-flash`), không mock.
Cách trình bày trên lớp: xem mục "Demo" trong `../presentation-script.md`.

## Chạy

```bash
cd docs/nus-ai-training/phase3/session-05/demo
python3 -m venv ~/ai-training-venv && source ~/ai-training-venv/bin/activate
pip install -r requirements.txt

python3 demo_ui.py          # mở http://localhost:8000
```

- Key gateway: `config/.nus-llm-gateway-config.json` (gitignored, code tự đọc). **Không hardcode key, không mở file này trên màn hình.**
- Dự phòng khi trang web lỗi — chạy trên terminal:
  - `python3 run_demo.py --scenario 9 --trace-only` (yêu cầu ①)
  - `python3 run_demo.py --scenario 1 --approve yes --trace-only` (yêu cầu ②)

## Walkthrough code — `agent_openai_sdk.py`

Chỉ cần đọc 4 chỗ. Mỗi chỗ ứng với một concept SDK đã giới thiệu ở slide 19:

| Concept | Dòng | Ý nghĩa |
|---|---|---|
| Model | `make_model` (52) | Kết nối LLM gateway công ty theo chuẩn Chat Completions |
| Tools — `function_tool` | 79–92 | Hàm Python bình thường, gắn `@function_tool` là thành tool. SDK lấy tên hàm, mô tả, kiểu tham số gửi cho LLM. 2 tool: `search_kb` (tra tài liệu), `create_ticket` (tạo ticket) |
| Agent definition — `Agent` | `build_agent` (105) | Agent = instructions (system prompt) + model + danh sách tool. Chỉ khai báo, chưa chạy gì |
| Run/runner — `Runner.run` | `run_limited` (145) | Một dòng chạy cả vòng lặp agent: gọi LLM → chạy tool LLM chọn → gửi kết quả lại → lặp tới khi LLM trả lời cuối hoặc chạm `max_turns` |

Không học thuộc API: chỉ cần biết 4 chỗ trên nằm ở đâu. Các phần khác trong file (duyệt trước khi tạo ticket, guardrail, kiểm tra quyền) là phần application tự quyết — học ở các buổi sau.

## Trang demo

```
┌─ Hỏi agent ────────────────────────┐ ┌─ Agent đang làm gì (trace) ─────────┐
│ ô nhập câu hỏi            [Gửi]    │ │ 1 Kiểm tra input            app     │
│ ① Chỉ cần RAG  ② Nhiều bước+ticket │ │ 2 LLM chọn tool: search_kb  LLM     │
│ câu trả lời                        │ │ 3 App chạy search_kb        app     │
│ hộp Duyệt / Từ chối (khi tạo ticket)│ │ …                                   │
└────────────────────────────────────┘ └─────────────────────────────────────┘
```

- Cột trace = "trace ở mức định vị": ô **cam** = LLM quyết định (kèm "lý do LLM tự viết", nút xem JSON gốc LLM trả về), ô **tối** = app chạy hàm thật, ô **xanh** = người duyệt. Cùng màu với slide 6 và slide 20.
- "gửi N message" ở mỗi ô LLM tăng dần qua từng lượt: mỗi lượt app gửi lại cả hội thoại cho LLM.

## 2 yêu cầu mẫu (ví dụ trong buổi)

| Nút | Câu hỏi | Agent làm gì (chạy thật 29/10) | Kết luận |
|---|---|---|---|
| ① Chỉ cần RAG | "Mã lỗi thanh toán E205 nghĩa là gì?" | LLM chọn `search_kb` → app chạy → LLM trả lời. 2 lượt gọi LLM, không tạo ticket | Tra 1 lần rồi trả lời — model call + RAG là đủ |
| ② Nhiều bước + tạo ticket | "Khách X báo lỗi thanh toán mã E205, xử lý sao? Tạo ticket cho billing team giúp tôi." | `search_kb` → LLM chọn `create_ticket` → app dừng chờ duyệt → bấm Duyệt → T-1001 → LLM trả lời. 3 lượt gọi LLM | Nhiều bước + hành động — chỗ agent có giá trị (nếu tạo hay không tuỳ kết quả tra) |

Có lần LLM đề xuất priority P2 rồi bị app chặn, LLM tự sửa sang P3 — dùng để minh hoạ "LLM đề xuất, app quyết" (slide 22).

## File nào dùng cho Session 5

| File | Vai trò |
|---|---|
| `agent_openai_sdk.py` | Agent tối thiểu — file dùng cho walkthrough |
| `demo_ui.py` + `demo_ui.html` | Trang demo |
| `run_demo.py` | Bản dòng lệnh (dự phòng) |
| `trace_local.py` | Ghi trace ra `.traces/` trên máy (không gửi về OpenAI) và in các bước |
| `sample_data.py`, `ticket_system.py` | Dữ liệu mẫu (user, tài liệu KB) và hệ thống ticket giả lập |

Các file và kịch bản còn lại trong thư mục dùng cho các buổi sau — không cần đọc ở Session 5.
