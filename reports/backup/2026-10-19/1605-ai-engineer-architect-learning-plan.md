# Lộ trình AI Engineer / Architect — 6 tháng (11/2026 → 04/2027)

**Ngày lập:** 2026-10-19
**Hướng đã chọn:** kỹ thuật — AI Engineer → AI Architect
**Dựa trên:** [review self-improvement](1540-ai-era-self-improvement.md) + quét Slack/Element 90 ngày.
**Giả định:** khoảng **6–8 giờ/tuần** (1 giờ/ngày làm việc + 2–3 giờ cuối tuần). Học **trên chính hệ thống `My-AI-Agent`** thay vì làm bài tập rời rạc.

---

## 1. AI Engineer/Architect cần gì — và bạn đang ở đâu

| Năng lực | Mô tả | Hiện tại | Mục tiêu 6 tháng |
|---|---|---|---|
| **LLM API & prompting** | Messages API, tool use, structured output, caching, streaming | 🟢 Dùng qua Claude Code hằng ngày | Viết agent trực tiếp bằng SDK, không phụ thuộc CLI |
| **Agent design** | Tool design, orchestration, subagent, MCP | 🟢 21 lệnh, 15+ tích hợp | Biết khi nào *không* cần agent; thiết kế tool tốt |
| **Context & memory engineering** | Chọn đúng context, nén, memory dài hạn | 🟡 Memory tay, 150+ file, MEMORY.md vượt giới hạn | Memory có cấu trúc, tự retrieve, dưới giới hạn |
| **Evals (đánh giá đầu ra)** | Test set, LLM-as-judge, regression, metric | 🔴 Chưa có — đang làm bằng feedback tay | **Kỹ năng cốt lõi số 1**; mỗi lệnh chính có eval |
| **RAG & retrieval** | Embedding, vector DB, hybrid search, chunking | 🔴 Chưa dùng | Tìm kiếm ngữ nghĩa trên Slack/Matrix/docs dự án |
| **Production / LLMOps** | Logging, tracing, chi phí, retry, rate limit, fallback | 🟡 Cron + script, ít observability | Trace từng run, đo chi phí/độ chính xác |
| **Security cho AI** | Prompt injection, quản lý secret, quyền tool | 🟡 Có rule secret, pre-commit | Hiểu và chặn prompt injection từ Slack/email |
| **Kiến trúc & trade-off** | Chọn model, chi phí vs chất lượng, build vs buy | 🟡 Theo kinh nghiệm | Viết được design doc/ADR, trình bày cho khách |
| **Ngôn ngữ** | Python (hệ sinh thái AI), TypeScript | 🟡 PHP mạnh, JS khá | Python đủ dùng cho eval/RAG |

**Kết luận gap:** bạn mạnh phần *xây*, yếu phần *đo lường và vận hành bền vững*. Đó cũng là khác biệt giữa người dùng AI giỏi và AI Engineer.

---

## 2. Lộ trình theo giai đoạn

### Giai đoạn 1 — Nền tảng & Evals (Tháng 1–2: 11–12/2026)

**Học:**
- Python cơ bản cho AI: venv, `pydantic`, `httpx`, `pytest`, pandas cơ bản.
- **DeepSeek API** (user chọn 2026-10-19, tương thích OpenAI SDK): chat, tool/function calling, JSON output, context caching. ⚠️ Không gửi dữ liệu khách hàng (Slack/Matrix/email) lên DeepSeek — chỉ dùng data đã ẩn danh hoặc tự tạo. Claude Code headless (`claude -p`) vẫn dùng cho dữ liệu thật.
- Evals: test set, golden answers, LLM-as-judge, đo precision/recall cho alert.

**Tài liệu:**
- Anthropic docs: *Build with Claude*, *Tool use*, *Define success criteria & develop tests*.
- Chip Huyen — *AI Engineering* (O'Reilly, 2025): chương Evaluation.
- Blog Hamel Husain về evals (hamel.dev).

**Dự án thực hành:**
1. **Eval cho `daily-report`:** biến 30 feedback "báo nhầm" trong memory thành test case (input → expected alert/no-alert). Chạy mỗi lần sửa prompt/script.
2. Metric: false-positive rate của alert. Ghi baseline, mục tiêu giảm 50%.

**Đầu ra:** thư mục `evals/` + script `run-evals`; một bài viết nội bộ "Từ feedback tay sang eval tự động".

### Giai đoạn 2 — Context, Memory & RAG (Tháng 3–4: 01–02/2027)

**Học:**
- Embedding, vector DB (pgvector — gần với nền PHP/Postgres; hoặc SQLite-vec), hybrid search (BM25 + vector), chunking, reranking.
- Context engineering: nén, tóm tắt, chọn context theo tác vụ.
- Memory architecture: episodic vs semantic, hết hạn/hợp nhất memory.

**Tài liệu:**
- Anthropic: *Contextual Retrieval*, *Effective context engineering for AI agents*.
- DeepLearning.AI short courses: RAG, embeddings (miễn phí, ngắn).

**Dự án thực hành:**
1. **Gộp memory:** 150+ feedback → khoảng 20–30 rule cốt lõi + retrieval theo lệnh. MEMORY.md về dưới giới hạn.
2. **"Ask my projects":** index Slack/Matrix/Trello 90 ngày vào pgvector; hỏi kiểu "Bailey đã chốt gì về purchase price?" kèm link nguồn. Có eval độ chính xác trích dẫn.

**Đầu ra:** RAG service nhỏ + eval retrieval (hit-rate@5).

### Giai đoạn 3 — Agent production & LLMOps (Tháng 5: 03/2027)

**Học:**
- Claude Agent SDK; MCP server (viết, không chỉ dùng).
- Observability: tracing (Langfuse hoặc OpenTelemetry), log token/chi phí, retry/fallback, idempotency.
- Security: prompt injection từ dữ liệu ngoài (Slack/email là input không tin cậy), least-privilege cho tool, human-in-the-loop cho hành động gửi ra ngoài.

**Dự án thực hành:**
1. Viết **1 MCP server** cho Workstream (đọc giờ log, review status), thay script rời.
2. Thêm tracing + dashboard chi phí/độ chính xác cho 3 lệnh chính.
3. Thử nghiệm prompt injection: chèn tin "ignore instructions…" vào dữ liệu test, kiểm tra agent có bị lừa không.

**Đầu ra:** MCP server có test; dashboard; checklist security cho agent.

### Giai đoạn 4 — Kiến trúc & tạo ảnh hưởng (Tháng 6: 04/2027)

**Học:**
- Design doc/ADR cho hệ AI: chọn model (Opus/Sonnet/Haiku theo tác vụ), chi phí vs chất lượng, build vs buy.
- AI-assisted SDLC cho team: spec-driven (OpenSpec), AI code review, test do AI sinh.

**Dự án thực hành:**
1. **Design doc** "AI-assisted delivery cho team PHP NUS": quy trình, công cụ, metric (lead time, bug rate trước/sau). Trả lời câu hỏi của chính bạn: *"vì sao bỏ AI vào vẫn không nhanh hơn nhiều?"*
2. Pilot trên 1 dự án (gợi ý Bailey hoặc Baamboozle), đo 4 tuần.
3. Trình bày nội bộ (tiếp nối loạt AI training NUS).

**Đầu ra:** design doc + kết quả pilot có số liệu = portfolio thể hiện năng lực AI Architect.

---

## 3. Nhịp học hằng tuần

| Khi | Việc | Thời lượng |
|---|---|---|
| Thứ 2–6, 08:00–08:45 | Đọc/học lý thuyết (trước khi mở Slack) | 45 phút × 5 |
| Thứ 7 | Code dự án thực hành | 2–3 giờ |
| Chủ nhật tối | Viết 5–10 dòng nhật ký: học gì, đo được gì | 15 phút |
| Cuối tháng | Tự review: đạt đầu ra giai đoạn chưa; điều chỉnh | 30 phút |

**Quy tắc:** mỗi tuần **xóa hoặc gộp** ít nhất 1 thứ trong hệ thống, không chỉ thêm mới.

## 4. Đo lường tiến bộ

| Chỉ số | Hiện tại | Tháng 6 |
|---|---|---|
| Lệnh có eval tự động | 0 | ≥ 5 |
| False-positive alert daily-report | baseline (đo T1) | −50% |
| File feedback memory | 150+ | ≤ 40 |
| MCP server tự viết | 0 | ≥ 1 |
| Design doc / bài chia sẻ công khai | 0 | ≥ 2 |
| Pilot AI-SDLC có số liệu | 0 | 1 |

## 5. Rủi ro & cách giảm

| Rủi ro | Giảm thiểu |
|---|---|
| Không có thời gian vì ~95 tin/ngày | Học lúc 08:00 trước khi mở chat; sau này làm đề xuất D.1/D.2 (bot nhắc, draft report) để lấy lại thời gian |
| Học lan man, chạy theo tool mới | Chỉ học thứ phục vụ dự án của giai đoạn hiện tại |
| Hệ thống càng phình | Quy tắc xóa/gộp hằng tuần |
| Python chậm vào | Chỉ cần Python cho eval/RAG; agent chính vẫn có thể dùng TS/Node |

---

## Câu hỏi còn mở

- 6–8 giờ/tuần có thực tế không, hay cần chỉnh nhịp?
- Công ty có hỗ trợ (thời gian học, ngân sách khóa học/API) và có vai trò AI Engineer/Architect nội bộ để hướng tới không?
- Pilot giai đoạn 4 chọn dự án nào (Bailey / Baamboozle / khác)?
- Có muốn chứng chỉ (AWS/GCP AI, Anthropic…) hay ưu tiên portfolio thực tế?
