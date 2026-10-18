# Session 9 — Kịch bản trình bày (60 phút)

Deck (15 slide): https://docs.google.com/presentation/d/1ziJEouNTRQJRRYWODN9ZAjywMgNVRHshCOFNje45BM4
Code demo: `scripts/nus-ai-training/support_agent_demo/`
Người trình bày: DuongDN · VinhNT. Buổi cuối Giai đoạn 3 — bên dưới có **gợi ý** chia phần, hai người
tự chốt lại.

## Chuẩn bị trước buổi (10 phút)

- [ ] `cd scripts/nus-ai-training/support_agent_demo` và kích hoạt venv
- [ ] Có key gateway trong `config/.nus-llm-gateway-config.json`
- [ ] Chạy thử: `python3 run_demo.py --scenario 1 --approve yes --trace` (trace đầy đủ 1 yêu cầu)
- [ ] Chạy thử: `python3 run_eval.py --runs 1 --models deepseek-v4.1-flash` (mất ~35-40s cho 5 case)
- [ ] Mở sẵn 1 tab terminal, font to; slide 5 và 11 có chạy live
- [ ] Viết sẵn lên bảng/giấy: "3 câu bạn sẽ hỏi khi review PR agent của đồng nghiệp" (warm-up slide 1)
- [ ] Nếu gateway lỗi: dùng output in sẵn trên slide, không cần chạy lại

## Dòng thời gian

| Phút | Slide | Phần | Gợi ý người nói |
|---|---|---|---|
| 0–5 | 1–2 | Mở đầu | DuongDN |
| 5–20 | 3–4 | 01 · Harness | DuongDN |
| 20–38 | 5–6 | 02 · Trace + giới hạn | VinhNT |
| 38–53 | 7–10 | 03 · Agent hoàn chỉnh | VinhNT |
| 53–57 | 11–12 | Tổng kết GĐ3 + Ghi nhớ | DuongDN |
| 57–60 | 13–15 | Thử thách + Q&A | cả hai |

---

## Mở đầu (0–5')

**Slide 1 · Session 9 (3')**
- Buổi cuối Giai đoạn 3. Warm-up: "Bạn review PR của đồng nghiệp làm agent. Bạn sẽ hỏi 3 câu gì?" —
  ghi lên bảng, cuối buổi so lại với "Kiến trúc" + "Failure case".

**Slide 2 · Agenda (1')**
- 3 phần ~13 phút: Harness · Trace · Agent hoàn chỉnh. Phần 3 kết thúc Giai đoạn 3.

## Phần 01 · Harness (5–20')

**Slide 3 · Harness 6 lớp (4')**
- Bảng: Phạm vi tools · Permission · Approval · Budget · State · Chuyển người — mỗi lớp trả lời 1 câu
  hỏi, cột cuối chỉ chỗ trong demo để tự mở code.
- "Agent loop của SDK nằm giữa; harness quyết định agent được làm gì, tốn bao nhiêu, dừng khi nào, đi
  đâu khi không xử lý được."

**Slide 4 · Câu hỏi: bỏ 1 lớp harness thì sao? (2')**
- Chia lớp thành nhóm nhỏ, mỗi nhóm đoán hậu quả khi bỏ 1 lớp (demo cho tắt từng lớp bằng `--disable`).

**Slide 5 · Đáp án — DEMO LIVE tuỳ chọn (6')**
- Bảng 5 dòng: Permission ④ (`--scenario 5 --disable 4 --approve yes` → ticket P1 gán CEO được tạo) ·
  Permission ①② (`--scenario 4 --disable 1 --disable 2` → rò dữ liệu tenant) · Idempotency (`--disable
  idem` → ticket trùng) · Budget · Chuyển người.
- Nếu còn thời gian, chạy live 1 dòng (khuyến nghị Permission ④ — kịch bản dễ hiểu nhất).
- "Eval thật: qwen-3.7-flash bị lừa 2/2 lần, deepseek ít bị hơn. Không đoán trước được model nào bị
  lừa → không dựa vào model, dựa vào checkpoint."

## Phần 02 · Trace + giới hạn (20–38')

**Slide 6 · Trace — DEMO LIVE (5')**
- Chạy: `python3 run_demo.py --scenario 1 --approve yes --trace`
- 4 loại span: 🛡 guardrail · 🧠 model call (model, token, giây) · 🔧 tool call · ❌ lỗi.
- Nhắc: ghi ra `.traces/<trace_id>.jsonl` local, KHÔNG gửi dashboard OpenAI — không lộ dữ liệu khách.

**Slide 7 · Giới hạn của trace (4')**
- Trace kịch bản 5 (model bị lừa): mọi span xanh, không lỗi — nhưng model đề xuất ticket P1 gán CEO.
- "Câu để nhớ: trace xanh không có nghĩa là agent đúng. Đánh giá đúng/sai cần test case (run_eval.py)
  + task state (có ticket ID không), không phải trace."

## Phần 03 · Agent hoàn chỉnh (38–53')

**Slide 8 · Theo một yêu cầu (3')**
- 9 bước từ câu hỏi → ticket có ID, mỗi bước gắn nhãn user/model/harness.
- "Ý chính: model chỉ xuất hiện ở bước 3, 5, 9 — mọi bước còn lại là application."

**Slide 9 · Kiến trúc 1 trang (3')**
- Ghép goal, model, RAG, tools, state, harness. Navy = application chịu trách nhiệm, xanh nhạt =
  SDK/model, xanh lá = hệ thống ngoài.
- "Đây cũng là khung cho bài tự thực hành: vẽ lại cho use case của mình, tô màu phần SDK/application."

**Slide 10 · Failure case + Prototype nhỏ nhất — DEMO LIVE tuỳ chọn (5')**
- 4 failure case: sai tool, thiếu quyền, lặp bước, không có nguồn — mỗi cái có cách phát hiện + test
  tương ứng (`run_eval.py`).
- Nếu còn thời gian: chạy `python3 run_eval.py --runs 1 --models deepseek-v4.1-flash` (35-40s), đọc
  bảng kết quả (model_ok/system_ok/latency/token).
- "Đừng mở rộng (thêm tool, thêm tenant) khi chưa có test case. system_ok luôn phải đạt."

## Kết (53–57')

**Slide 11 · Tổng kết Giai đoạn 3 (2')**
- Bảng: mỗi buổi S5-S9 thêm gì vào agent + nằm ở file nào. "Mở từng file đọc lại khi cần."

**Slide 12 · Ghi nhớ (2')**
- 4 thẻ: Harness · Trace · Kiến trúc · Mở rộng. Quay lại 3 câu hỏi warm-up đầu buổi — đã trả lời được
  chưa?

## Q&A (57–60')

**Slide 13–15 · Thử thách + Q&A**
- Giao bài cuối Giai đoạn 3: vẽ architecture agent của học viên trên 1 trang, tô màu SDK/application,
  liệt kê 3 trường hợp cần kiểm thử trước khi mở rộng.
- Câu hay gặp:
  - "Lớp harness nào nguy hiểm nhất khi thiếu?" → lớp đứng trước side effect lớn nhất (permission,
    approval).
  - "Trace có thay được bộ test case không?" → không.
- Giới thiệu nhanh Giai đoạn 4 (Session 10-11): đưa search_kb/create_ticket thành MCP server — tool
  dùng chung cho nhiều agent, kiểm tra quyền vẫn ở phía server.

## Nếu bị thiếu thời gian
- Bỏ chạy live slide 5 và 10 (dùng output in sẵn) — tiết kiệm 5-8'.
- Slide 8 (Theo một yêu cầu) có thể gộp nhanh với slide 9 (Kiến trúc) nếu cần thêm thời gian Q&A.

## Câu hỏi chưa giải quyết
- Chia phần giữa DuongDN và VinhNT ở trên chỉ là gợi ý, hai người cần chốt.
- `run_eval.py --runs 1` mất ~35-40s — nếu đầu giờ gateway chậm, cân nhắc bỏ hẳn demo này, chỉ đọc
  bảng kết quả in sẵn trên slide 10.
