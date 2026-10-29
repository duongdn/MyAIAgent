# Session 5 — Kịch bản trình bày (45 phút)

Deck (25 slide): https://docs.google.com/presentation/d/10ZYIXeEzlElYai6ws9xd77ZN8QbNfAAdPMJekhkHMWI
Người trình bày: DuongDN (S5 + S6). S7–S9 do VinhNT phụ trách.
Đề cương: `02_Noi_dung_chi_tiet_chuong_trinh_dao_tao_AI.pdf`, trang 4, mục Session 5. Đối chiếu từng dòng: `syllabus-to-slides-mapping.md`.
Speaker notes của từng slide có đủ nguồn trích dẫn; file này là bản đọc nhanh.

## Chuẩn bị
- [ ] `cd scripts/nus-ai-training/support_agent_demo`, venv đã cài `requirements.txt`; key gateway trong `config/.nus-llm-gateway-config.json` (không chiếu file này)
- [ ] Chạy thử 2 lệnh demo (mục Demo) 1 lần trước buổi để gateway "ấm"
- [ ] Gateway lỗi → kể lại theo số liệu trong notes slide 23 (đã chạy thật 29/10)

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

### Demo (33–40')
- **23 · Demo** — chạy trên terminal:
  1. `python3 run_demo.py --scenario 9 --trace` — "Mã lỗi thanh toán E205 nghĩa là gì?" → tra tài liệu rồi trả lời, 2 lượt LLM, không ticket → **chỉ cần RAG**.
  2. `python3 run_demo.py --scenario 1 --approve yes --trace` — "Khách báo lỗi E205… tạo ticket" → tra tài liệu → đề xuất ticket → chờ duyệt → T-1001 → trả lời, 3 lượt → **nhiều bước + hành động**.
  - Chỉ vào trace: dòng ② = LLM quyết định (JSON + lý do LLM tự viết), dòng ③ = code app chạy. Có lần model đề xuất P2 → bị chặn → tự sửa P3: nói "LLM đề xuất, app quyết".
  - Tuỳ chọn: `python3 compare_orchestration_levels.py --runs 1 --show` (~25s) — cùng yêu cầu chạy ở 3 mức.

### Kết (40–45')
- **24 · Ý chính của buổi**: 5 thẻ ứng với 5 phần. Đối chiếu lại use case của lớp.
- **25 · Thử thách + bài tự thực hành**: giao bài (chọn use case, giải thích model call / workflow / agent, đánh dấu ranh giới SDK / application), mang tới đầu S6. Đáp án 4 câu trong notes.

## Câu hỏi chưa giải quyết
- (không còn)
