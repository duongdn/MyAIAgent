# Plan cải thiện bản thân: AI Engineer, kế hoạch hành động theo tuần

**Ngày lập:** 2026-10-20
**Mục tiêu 6 tháng (04/2027):** chuyển từ người *dùng* AI giỏi sang **AI Engineer** đo lường được chất lượng, vận hành hệ thống bền vững, và thiết kế được quy trình AI cho team.
**Tài liệu gốc:** [review bản thân](../2026-10-19/1540-ai-era-self-improvement.md) · [lộ trình 6 tháng](../2026-10-19/1605-ai-engineer-architect-learning-plan.md) · [eval daily-report](../2026-10-19/1700-daily-report-eval-setup.md)

**Ràng buộc đã chốt:**
- **Thời gian:** 6–8 giờ/tuần (45 phút lúc 08:00 trước khi mở Slack, cộng 2–3 giờ thứ 7).
- **Model:** dữ liệu thật chạy qua gói Claude Code (`claude -p`); học API bằng **DeepSeek**. Không mua Claude API.
- **Bot nhắc log và draft report cho khách:** *tạm hoãn*.
- **Nguyên tắc:** học trên chính hệ thống `My-AI-Agent`. Mỗi tuần **xóa hoặc gộp ≥1 thứ**.

---

## Tuần 0 (19–20/10): ✅ ĐÃ XONG

- [x] Review bản thân + quét Slack/Element 90 ngày (6.060 tin)
- [x] Chọn hướng AI Engineer/Architect
- [x] **Eval đầu tiên:** structure eval (16 check, 60 report) + judgment eval (15 case, 100%)
- [x] Eval phát hiện mâu thuẫn memory (holding reply) → đã gộp rule 24h
- [x] Gắn eval vào daily-report

> Bạn đã hoàn thành sớm một phần của Tháng 1. Phần còn lại tập trung vào **hiểu sâu** những gì vừa làm.

---

## THÁNG 1 (21/10 → 16/11): Python + Eval

| Tuần | Học (sáng, 45 phút × 5) | Làm (thứ 7, 2–3 giờ) | Xóa/gộp | Đầu ra |
|---|---|---|---|---|
| **1** (21–27/10) | Python cơ bản: venv, list/dict, function, `json`, `pathlib` | Viết lại `run-structure-eval.js` bằng Python (`evals/daily-report/structure_eval.py`) để luyện tay | Gộp 3 file memory Maddy trùng ý | Script Python chạy ra cùng kết quả bản JS |
| **2** (28/10–3/11) | `pytest` + `pydantic` (validate JSON output) | Chuyển judgment cases thành `pytest` test; thêm **10 case** từ memory feedback cũ | Xóa lệnh/script không dùng trong `scripts/` (tìm bằng `git log`) | 25 case, `pytest` xanh |
| **3** (4–10/11) | **DeepSeek API**: tạo key, chat completion, `response_format: json_object`, đọc tài liệu pricing | Chạy judgment eval với `--provider deepseek`, so sánh với Claude Haiku (độ đúng, tốc độ, chi phí) | Gộp memory LongVV/TuanNT/LeNH | Bảng so sánh 2 model |
| **4** (11–16/11) | Đọc: Hamel Husain *"Your AI product needs evals"*; Chip Huyen *AI Engineering*, chương Evaluation | Viết eval thứ 2 cho **`news-digest`** (link thật? bài ≤7 ngày? không trùng?) | Đưa MEMORY.md về **dưới 24KB** | Eval news-digest + review tháng 1 |

**Checkpoint tháng 1:** ✔ đọc/viết Python cơ bản · ✔ 2 lệnh có eval · ✔ biết so sánh model bằng số.

---

## THÁNG 2 (17/11 → 14/12): Eval nâng cao + làm gọn memory

| Tuần | Học | Làm | Đầu ra |
|---|---|---|---|
| **5** | LLM-as-judge: rubric, thang điểm, bias của judge | Judge chấm chất lượng **câu trả lời gửi khách** (lịch sự, đúng trọng tâm, không hứa sai) trên 20 tin mẫu | Rubric + điểm baseline |
| **6** | Đo độ ổn định: chạy N lần, variance, temperature | `--runs 5` cho mọi case; đánh dấu case "không ổn định" | Báo cáo độ ổn định |
| **7** | Phân loại memory: rule cốt lõi / rule theo dự án / lịch sử | **Gộp 150+ feedback → ~40 file**. Mỗi lần gộp, chạy eval để chắc không mất rule | Memory gọn, eval vẫn 100% |
| **8** | Ôn tập + viết | **Bài chia sẻ nội bộ #1:** *"Từ sửa tay đến eval tự động"* (dùng số liệu thật: 81% → ?, mâu thuẫn memory) | Bài viết / slide NUS |

**Checkpoint tháng 2:** ✔ 3 lệnh có eval · ✔ memory ≤ 40 file · ✔ 1 bài chia sẻ.

---

## THÁNG 3–4 (15/12 → 08/02): RAG & Context

| Tuần | Trọng tâm | Đầu ra |
|---|---|---|
| 9–10 | Embedding, vector search; cài **pgvector** (Postgres: gần với nền PHP) | Index 90 ngày Slack/Matrix (đã có script quét từ phiên này) |
| 11–12 | Chunking, hybrid search (BM25 + vector), trích nguồn | CLI *"hỏi dự án"*: "Bailey chốt gì về purchase price?" → trả lời kèm link |
| 13–14 | Eval cho RAG: hit-rate@5, độ đúng trích dẫn; context engineering | Bộ 30 câu hỏi có đáp án + điểm |
| 15–16 | Ôn + Tết | Bài chia sẻ #2 (tùy) |

⚠️ RAG trên dữ liệu khách: embedding và trả lời chạy **local hoặc qua Claude Code**, không gửi lên DeepSeek.

## THÁNG 5 (03/2027): Agent production

- Viết **MCP server cho Workstream** (đọc giờ log, review status), thay script rời rạc.
- Tracing (Langfuse self-host hoặc log JSON) cho 3 lệnh chính: thời gian, token, lỗi.
- Test prompt injection: chèn "ignore previous instructions…" vào dữ liệu test của daily-report.

## THÁNG 6 (04/2027): Kiến trúc & ảnh hưởng

- **Design doc** *"AI-assisted delivery cho team PHP NUS"*: trả lời câu hỏi của chính bạn *"bỏ AI vào vẫn không nhanh hơn nhiều"*.
- **Pilot 4 tuần** trên 1 dự án, đo lead time và bug rate trước/sau.
- Trình bày nội bộ = portfolio AI Architect.

---

## Theo dõi tiến độ

| Chỉ số | 20/10 | T1 (16/11) | T2 (14/12) | T6 (04/2027) |
|---|---|---|---|---|
| Lệnh có eval | **1** | 2 | 3 | ≥ 5 |
| Test case judgment | **15** | 25 | 40 | 80+ |
| Structure eval (60 ngày) | **81%** | 90% | 95% | 98% |
| File memory feedback | 150+ | 130 | ≤ 40 | ≤ 40 |
| MEMORY.md | 27KB ❌ | < 24KB | < 15KB | < 15KB |
| Bài chia sẻ | 0 | 0 | 1 | ≥ 2 |
| Python tự tin (1–5) | 1–2 | 3 | 3 | 4 |

**Nghi thức:**
- **Chủ nhật tối, 15 phút:** ghi 5 dòng vào `reports/learning-log.md`: học gì, làm gì, xóa gì, số liệu, khó gì.
- **Cuối tháng:** đối chiếu bảng trên. Trễ > 2 tuần thì cắt bớt phạm vi, **không** cắt nhịp học.

## Nếu chỉ có 3 giờ/tuần (tuần bận)

1. 1 giờ: thêm 2–3 test case từ lỗi trong tuần.
2. 1 giờ: xóa/gộp 1 thứ.
3. 1 giờ: đọc 1 bài.

→ **Không bỏ tuần nào hoàn toàn.** Đều đặn quan trọng hơn cường độ.

---

## Câu hỏi còn mở

- Bắt đầu Tuần 1 ngay từ 21/10 hay đợi đầu tháng 11?
- Có muốn mình tạo sẵn `reports/learning-log.md` + đặt lịch nhắc Chủ nhật tối (cron gửi Matrix cho chính bạn) không?
- Bài chia sẻ tháng 2: cho team PHP hay toàn công ty (tiếp nối AI training NUS)?
