# Session 5 — Kịch bản trình bày (45 phút)

Deck (26 slide): https://docs.google.com/presentation/d/10ZYIXeEzlElYai6ws9xd77ZN8QbNfAAdPMJekhkHMWI
Người trình bày: DuongDN (S5 + S6). S7–S9 do VinhNT phụ trách.
Đề cương: `02_Noi_dung_chi_tiet_chuong_trinh_dao_tao_AI.pdf`, trang 4, mục Session 5. Đối chiếu từng dòng: `syllabus-to-slides-mapping.md`.
Speaker notes của từng slide có đủ nguồn trích dẫn; file này là bản đọc nhanh.
Giải thích code demo: `demo/README.md`.

## Chuẩn bị (làm trước buổi, ~10')
```bash
cd docs/nus-ai-training/phase3/session-05/demo
python3 -m venv ~/ai-training-venv && source ~/ai-training-venv/bin/activate
pip install -r requirements.txt                       # openai-agents 0.23.1
python3 demo_ui.py                                    # mở http://localhost:8000, bấm thử câu ① 1 lần cho gateway "ấm"
```
- [ ] Key gateway nằm ở `config/.nus-llm-gateway-config.json` (code tự đọc) — **không mở file này trên màn hình**.
- [ ] Mở sẵn trong editor: `agent_openai_sdk.py` (dùng cho bước walkthrough), cỡ chữ to.
- [ ] Trình duyệt mở sẵn `http://localhost:8000`, zoom ~125% cho dễ nhìn; terminal dự phòng đã `cd` sẵn vào thư mục demo.
- [ ] Gateway lỗi → không chạy được live: kể lại theo số liệu ở mục Demo (chạy thật 29/10).

## Dòng thời gian
| Phút | Slide | Phần |
|---|---|---|
| 0–3 | 1–4 | Mở đầu |
| 3–11 | 5–7 | 01 · 3 mức điều phối |
| 11–25 | 8–17 | 02 · Agent hay workflow (8–12 ~8', 5 mẫu workflow 13–17 ~1'/slide) |
| 25–33 | 18–22 | 03 · OpenAI Agents SDK |
| 33–40 | 23 | Demo live |
| 40–45 | 24–26 | Ghi nhớ + câu hỏi ôn tập + bài tập về nhà, hỏi đáp nếu còn giờ |

Thiếu giờ: slide 13–17 chỉ đọc tiêu đề; demo chỉ chạy lệnh 2.

## Từng slide

### Mở đầu (0–3')
- **1 · Giai đoạn 3 — Build AI Agent** (DuongDN · VinhNT). 1 câu: S5–S9 xây dần một support agent bằng OpenAI Agents SDK.
- **2 · Lộ trình**: mỗi hàng là agent sau buổi đó, ô cam là phần buổi đó thêm.
- **3 · Session 5**: đọc câu hỏi trọng tâm. Warm-up nối S2: "Email đã extract thành JSON. Muốn hệ thống tự xử lý tiếp — viết thêm bước bằng code hay để model tự quyết bước tiếp?" Ghi lựa chọn của lớp.
- **4 · Agenda**: 3 phần, đúng chữ đề cương.

### 01 · 3 mức điều phối (3–11')
- **5 · Nhắc lại S1–2** (≤2'): đi theo mũi tên ①–④. LLM chỉ viết "cần tool X", code app mới chạy tool. ChatGPT/Claude: OpenAI/Anthropic viết code app; agent của mình: mình viết, SDK lo vòng lặp.
- **6 · Khác nhau ở một điểm: ai chọn bước tiếp theo**: model call 1 lần · workflow code giữ thứ tự · agent LLM chọn tool trong vòng lặp. Cam = model quyết, tối = code quyết.
- **7 · So sánh**: nhóm Cấu trúc (đầu vào là mục tiêu, ai chọn bước, vòng lặp, ai quyết dừng, context, dùng tool) → nhóm Hệ quả (dự đoán được, chi phí, debug). Chốt: dùng LLM hay có tool không làm nên agent.

### 02 · Agent hay workflow (11–25')
- **8 · Câu hỏi**: "Use case của bạn: workflow hay agent?" — ghi vài use case lên bảng.
- **9 · Viết trước được các bước → workflow**: ổn định · rẻ, nhanh · dễ debug.
- **10 · An toàn**: workflow an toàn hơn vì model không tự chọn hành động — 4 rủi ro (hành động ngoài dự kiến, nội dung đọc vào điều khiển, lỗi lan, kiểm tra trước). Nguồn OWASP LLM06 Excessive Agency.
- **11 · Khi nào agent tạo giá trị**: 3 dấu hiệu của OpenAI + ví dụ. Không có dấu hiệu nào → workflow.
- **12 · Bắt đầu đơn giản**: model call → workflow → agent, chỉ lên bậc khi bậc dưới không đủ. Quay lại use case trên bảng.
- **13–17 · 5 mẫu workflow** (Anthropic): chaining · routing · parallelization · orchestrator-workers · evaluator-optimizer. Mỗi slide: sơ đồ, dùng khi, ví dụ. Slide 16–17: giải thích vì sao vẫn là workflow (notes) — workflow → agent là một dải.

### 03 · OpenAI Agents SDK (25–33')
- **18 · Câu hỏi**: "Agent nào cũng phải tự viết vòng lặp này?" → không, đã có thư viện.
- **19 · SDK là thư viện viết sẵn phần code app**: bảng việc phải làm → concept (Agent · function_tool · Runner.run · Trace · Guardrail).
- **20 · Trace**: nhật ký từng bước; đọc để biết các bước, LLM chọn tool gì, sai ở đâu. Trace thật xem lúc demo.
- **21 · Câu hỏi**: "Có SDK rồi — còn phải tự viết gì?"
- **22 · Ranh giới**: SDK cung cấp cơ chế, application quyết. Giải thích 1 câu cho max_turns, needs_approval, RunState, context (notes).

### Demo (33–40') — slide 23 chỉ có chữ "Demo", demo trên editor + trang web demo

Đáp ứng 2 dòng đề cương (trang 4, mục Session 5): gạch 3 "**Walkthrough** support agent tối thiểu trong OpenAI Agents SDK: agent definition, run/runner, tools và trace ở mức định vị; không học thuộc API" và "Ví dụ trong buổi: yêu cầu support nào chỉ cần RAG, yêu cầu nào cần nhiều bước và tạo ticket?".

**Bước 0 — Walkthrough code (~3', editor)**: mở `docs/nus-ai-training/phase3/session-05/demo/agent_openai_sdk.py`. Code chia 4 khối đánh số trong comment (`# ── 1. Model`, `2. Tools`, `3. Agent definition`, `4. Chạy agent`), đi đúng thứ tự, nối với Session 2 và bảng slide 19:

| Khối | Dòng | Nói gì |
|---|---|---|
| 1. Model | 66 `make_model` | "Session 2 các bạn đã `new OpenAI({ timeout, maxRetries })` rồi tự gọi `responses.parse` 1 lần. Ở đây vẫn client `openai` đó, trỏ sang gateway công ty, nhưng **không tự gọi** — đưa cho SDK gọi." |
| 2. Tools (`function_tool`) | 101–108 `search_kb`, 117–123 `create_ticket` | "Một hàm Python bình thường, gắn `@function_tool` là thành tool. Session 2 tự viết schema bằng zod cho output; ở đây SDK tự sinh schema tham số tool từ kiểu Python." |
| 3. Agent definition | 138–143 `build_agent` | "Agent = instructions (như `INSTRUCTIONS` ở Session 2) + model + danh sách tool. Chỉ khai báo, chưa gọi model." |
| 4. Run (`Runner.run`) | 195 `run_limited` | "Session 2: `responses.parse` = 1 lượt. Dòng này chạy **nhiều lượt** — vòng lặp ①–④ ở slide 5 — tới khi LLM trả lời cuối hoặc chạm `max_turns=8`." |
| 5. Trace | 76 `set_trace_processors` | "SDK tự ghi trace; demo cho ghi ra máy và hiện ở cột phải trang web." |

Câu chốt: *"Session 2 tự gọi model 1 lần rồi tự kiểm tra. Session 5 giữ client đó, giao vòng lặp gọi – chạy tool – gọi lại cho SDK."* Chi tiết (load / run thế nào, bảng so sánh S2 ↔ S5): `demo/README.md` mục 2.

- Các phần khác trong file (`needs_approval`, guardrail, checkpoint ①–⑤, task state) → nói "đây là phần application tự quyết, học ở Session 6–9", **không giải thích**. Không học thuộc API.
- Nếu số dòng lệch do code đổi: tìm `@function_tool`, `def build_agent`, `Runner.run`.

**Trang demo** (`python3 demo_ui.py` → http://localhost:8000):
- Trái: ô hỏi + 2 nút câu mẫu (① Chỉ cần RAG: hỏi mã lỗi · ② Nhiều bước + tạo ticket) — đúng 2 vế của "Ví dụ trong buổi" trong đề cương, ghi ngay trên trang + câu trả lời + hộp **Duyệt / Từ chối** khi agent muốn tạo ticket.
- Phải: **trace** hiện từng bước ngay khi agent chạy — ô **cam = LLM quyết định** (kèm "lý do LLM tự viết" + nút xem JSON gốc), ô **tối = app chạy**, ô xanh = người duyệt. Cùng màu với slide 6 và slide 20.

**Bước 1 — Yêu cầu chỉ cần tra tài liệu (~2')**: bấm **① Chỉ cần RAG** ("Mã lỗi thanh toán E205 nghĩa là gì?").
- Kết quả 29/10: LLM chọn `search_kb` → app chạy → LLM trả lời cuối; 2 lượt gọi LLM, **không tạo ticket**.
- Nói: "Agent làm được, nhưng việc này chỉ là tra 1 lần rồi trả lời — **model call + RAG là đủ**, rẻ và ổn định hơn (slide 9, 12)."

**Bước 2 — Yêu cầu nhiều bước + tạo ticket (~3')**: bấm **② Nhiều bước + tạo ticket** ("Khách X báo lỗi thanh toán mã E205, xử lý sao? Tạo ticket cho billing team giúp tôi.").
- Kết quả 29/10: LLM chọn `search_kb` → app chạy → LLM chọn `create_ticket` → "App CHƯA chạy: chờ người duyệt" → hộp duyệt hiện bên trái → bấm **Duyệt** → app tạo T-1001 → LLM trả lời cuối; 3 lượt gọi LLM.
- Chỉ vào cột trace (đây là "trace ở mức định vị", slide 20):
  - ô cam = LLM quyết định — mở "JSON gốc": LLM chỉ viết ra JSON, không tự chạy gì;
  - ô tối = app chạy hàm thật;
  - "gửi N message" tăng 2 → 4 → 6 = mỗi lượt gửi lại cả hội thoại.
- Nói: "**Nhiều bước + hành động**. Nếu lúc nào cũng tạo ticket thì workflow là đủ (slide 9); nếu tạo hay không tuỳ kết quả tra thì mới cần agent (slide 11)."
- Hay gặp: LLM đề xuất P2 hoặc assignee "billing team" → ô tối "BỊ CHẶN bởi application" → LLM tự sửa P3/billing-team-a. Tận dụng: "LLM đề xuất, app quyết" (slide 22). Có thể bấm **Từ chối** để cho thấy app không tạo ticket.

**Dự phòng** (trang web lỗi): chạy lệnh trên terminal — `python3 run_demo.py --scenario 9 --trace-only` và `python3 run_demo.py --scenario 1 --approve yes --trace-only` (cùng nội dung, in dạng chữ; `--trace-only` ẩn log kiểm quyền của Session 7).
Gateway lỗi hẳn: kể lại theo kết quả 29/10 ở trên.

**Tuỳ chọn (nếu dư giờ)**: `python3 compare_orchestration_levels.py --runs 1 --show` (~25s) — cùng một yêu cầu chạy ở 3 mức model call / workflow / agent; dòng `[CODE]`/`[MODEL]` khớp màu ô tối/cam slide 6.

### Kết (40–45')
- **24 · Ý chính của buổi**: 5 thẻ ứng với 5 phần. Đối chiếu lại use case của lớp.
- **25 · Câu hỏi ôn tập**: 4 câu, hỏi nhanh cả lớp. Đáp án: (1) agent tốn hơn vì số lượt không biết trước + mỗi lượt gửi lại cả hội thoại; (2) use case đáng làm agent phải có ít nhất 1 dấu hiệu slide 11 và không viết trước được các nhánh; (3) application quyết hành động nào cần duyệt, SDK chỉ có cơ chế dừng chờ duyệt; (4) agent sai thường không báo lỗi → app kiểm tra kết quả thật trong hệ thống đích + eval chạy lặp (S6, S9).
- **26 · Bài tập về nhà** (slide cuối): 3 bước — chọn use case · giải thích model call / workflow / agent · đánh dấu ranh giới SDK / application. Mang tới đầu S6.

## Câu hỏi chưa giải quyết
- (không còn)
