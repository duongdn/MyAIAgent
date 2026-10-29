# Session 5 — Kịch bản trình bày (45 phút)

Deck (25 slide): https://docs.google.com/presentation/d/10ZYIXeEzlElYai6ws9xd77ZN8QbNfAAdPMJekhkHMWI
Người trình bày: DuongDN (S5 + S6). S7–S9 do VinhNT phụ trách.
Đề cương: `02_Noi_dung_chi_tiet_chuong_trinh_dao_tao_AI.pdf`, trang 4, mục Session 5. Đối chiếu từng dòng: `syllabus-to-slides-mapping.md`.
Speaker notes của từng slide có đủ nguồn trích dẫn; file này là bản đọc nhanh.

## Chuẩn bị (làm trước buổi, ~10')
```bash
cd scripts/nus-ai-training/support_agent_demo
python3 -m venv ~/ai-training-venv && source ~/ai-training-venv/bin/activate
pip install -r requirements.txt                       # openai-agents 0.23.1
python3 run_demo.py --scenario 9 --trace-only         # chạy thử 1 lần cho gateway "ấm"
```
- [ ] Key gateway nằm ở `config/.nus-llm-gateway-config.json` (code tự đọc) — **không mở file này trên màn hình**.
- [ ] Mở sẵn trong editor: `agent_openai_sdk.py` (dùng cho bước walkthrough), cỡ chữ to.
- [ ] Terminal cỡ chữ to, đã `cd` sẵn vào thư mục demo.
- [ ] Gateway lỗi → không chạy được live: kể lại theo số liệu ở mục Demo (chạy thật 29/10).

## Dòng thời gian
| Phút | Slide | Phần |
|---|---|---|
| 0–3 | 1–4 | Mở đầu |
| 3–11 | 5–7 | 01 · 3 mức điều phối |
| 11–25 | 8–17 | 02 · Agent hay workflow (8–12 ~8', 5 mẫu workflow 13–17 ~1'/slide) |
| 25–33 | 18–22 | 03 · OpenAI Agents SDK |
| 33–40 | 23 | Demo live |
| 40–45 | 24–25 | Ghi nhớ + thử thách, hỏi đáp nếu còn giờ |

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

### Demo (33–40') — slide 23 chỉ có chữ "Demo", mọi thứ làm trên editor + terminal

Đáp ứng 2 dòng đề cương (trang 4, mục Session 5): gạch 3 "**Walkthrough** support agent tối thiểu trong OpenAI Agents SDK: agent definition, run/runner, tools và trace ở mức định vị; không học thuộc API" và "Ví dụ trong buổi: yêu cầu support nào chỉ cần RAG, yêu cầu nào cần nhiều bước và tạo ticket?".

**Bước 0 — Walkthrough code (~2')**: mở `support_agent_demo/agent_openai_sdk.py`, chỉ đúng 3 chỗ, nối với bảng slide 19:

| Concept (slide 19) | Dòng | Nói gì |
|---|---|---|
| `function_tool` (tools) | 79–81 `search_kb`, 90–92 `create_ticket` | "Một hàm Python bình thường, gắn `@function_tool` là thành tool. SDK lấy tên hàm + mô tả + tham số để gửi cho LLM." |
| `Agent` (agent definition) | 105–107 `build_agent` | "Agent = instructions (system prompt) + model + danh sách tool. Chỉ khai báo, chưa chạy gì." |
| `Runner.run` (run/runner) | 145 `run_limited` | "Một dòng này chạy cả vòng lặp ①–④ ở slide 5, tới khi LLM trả lời cuối hoặc chạm `max_turns`." |

- Các phần khác trong file (`needs_approval`, guardrail, checkpoint ①–⑤, task state) → nói "đây là phần application tự quyết, học ở Session 6–9", **không giải thích**. Không học thuộc API.
- Nếu số dòng lệch do code đổi: tìm `@function_tool`, `def build_agent`, `Runner.run`.

**Bước 1 — Yêu cầu chỉ cần tra tài liệu (~2')**
```bash
python3 run_demo.py --scenario 9 --trace-only
```
- Câu hỏi: "Mã lỗi thanh toán E205 nghĩa là gì?"
- Kết quả 29/10: 2 lượt gọi LLM — ② LLM chọn `search_kb` (thường gọi 2 lần với 2 cách hỏi) → ③ app chạy → ② LLM trả lời cuối, **không tạo ticket**.
- Nói: "Agent làm được, nhưng việc này chỉ là tra 1 lần rồi trả lời — **model call + RAG là đủ**, rẻ và ổn định hơn (slide 9, 12)."

**Bước 2 — Yêu cầu nhiều bước + tạo ticket (~3')**
```bash
python3 run_demo.py --scenario 1 --approve yes --trace-only
```
- Câu hỏi: "Khách X báo lỗi thanh toán mã E205, xử lý sao? Tạo ticket cho billing team giúp tôi."
- Kết quả 29/10: 3 lượt — tra tài liệu → ② LLM đề xuất `create_ticket` → ③ "CHƯA chạy: dừng chờ người duyệt" → duyệt → T-1001 → ② LLM trả lời cuối.
- Chỉ vào trace (đây là "trace ở mức định vị", slide 20):
  - dòng **②** = LLM quyết định, chỉ là JSON + "lý do LLM tự viết";
  - dòng **③** = code app chạy hàm thật;
  - số message tăng 2 → 5 → 7 = mỗi lượt gửi lại cả hội thoại.
- Nói: "**Nhiều bước + hành động**. Nếu lúc nào cũng tạo ticket thì workflow là đủ (slide 9); nếu tạo hay không tuỳ kết quả tra thì mới cần agent (slide 11)."
- Nếu model đề xuất P2 rồi bị chặn → tự sửa P3: tận dụng — "LLM đề xuất, app quyết" (slide 22).

**Tuỳ chọn (nếu dư giờ)**: `python3 compare_orchestration_levels.py --runs 1 --show` (~25s) — cùng một yêu cầu chạy ở 3 mức model call / workflow / agent; dòng `[CODE]`/`[MODEL]` khớp màu ô tối/cam slide 6.

`--trace-only` ẩn log kiểm quyền của Session 7 (① session, ② quyền…) vì trùng ký hiệu với ①–④ của vòng lặp. Muốn xem đủ log: dùng `--trace`.

### Kết (40–45')
- **24 · Ý chính của buổi**: 5 thẻ ứng với 5 phần. Đối chiếu lại use case của lớp.
- **25 · Thử thách + bài tự thực hành**: giao bài (chọn use case, giải thích model call / workflow / agent, đánh dấu ranh giới SDK / application), mang tới đầu S6.
  - Đáp án nhanh: (1) agent tốn hơn vì số lượt không biết trước + mỗi lượt gửi lại cả hội thoại; (2) use case đáng làm agent phải có ít nhất 1 dấu hiệu slide 11 và không viết trước được các nhánh; (3) application quyết hành động nào cần duyệt, SDK chỉ có cơ chế dừng chờ duyệt; (4) agent sai thường không báo lỗi → app kiểm tra kết quả thật trong hệ thống đích + eval chạy lặp (S6, S9).

## Câu hỏi chưa giải quyết
- (không còn)
