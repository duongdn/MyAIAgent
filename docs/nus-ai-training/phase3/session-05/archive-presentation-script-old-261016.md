# Session 5 — Kịch bản trình bày (45 phút)

Deck (23 slide): https://docs.google.com/presentation/d/10ZYIXeEzlElYai6ws9xd77ZN8QbNfAAdPMJekhkHMWI
Code demo: `scripts/nus-ai-training/support_agent_demo/`
Người trình bày: DuongDN (S5 + S6). S7–S9 do VinhNT phụ trách.

## Chuẩn bị trước buổi (10 phút)

- [ ] `cd scripts/nus-ai-training/support_agent_demo` và kích hoạt venv đã cài `requirements.txt` (openai-agents)
- [ ] Có key gateway trong `config/.nus-llm-gateway-config.json` (gitignored, không chiếu lên màn hình)
- [ ] Chạy thử 1 lần cho "ấm" gateway: `python3 compare_orchestration_levels.py --runs 1 --show` (khoảng 25 giây)
- [ ] Mở sẵn 2 tab terminal, font to; slide 7 và 18 có chạy live
- [ ] Nếu gateway lỗi: dùng output đã in sẵn trên slide 7 và 18 (đều là output thật), không cần chạy lại

## Dòng thời gian

| Phút | Slide | Phần | Gợi ý người nói |
|---|---|---|---|
| 0–5 | 1–5 | Mở đầu | DuongDN |
| 5–15 | 6–11 | 01 · 3 mức điều phối + chi phí | DuongDN |
| 15–24 | 12–16 | 02 · Khi nào cần agent | DuongDN |
| 24–32 | 17–20 | 03 · OpenAI Agents SDK + ranh giới | DuongDN |
| 32–35 | 21–22 | Ghi nhớ + bài tự thực hành | DuongDN |
| 35–45 | 23 | Q&A | cả hai |

---

## Mở đầu (0–5')

**Slide 1–2 · Giai đoạn 3, lộ trình (1')**
- Nói: "5 buổi tới chỉ xây MỘT support agent: đọc knowledge base, trả lời có nguồn, tạo ticket khi được phép. Mỗi buổi thêm một lớp."
- Chỉ nhanh 5 cột S5–S9, không giải thích chi tiết.

**Slide 3 · Session 5 (1')**
- Đọc câu hỏi trọng tâm trên slide.
- Warm-up, hỏi tay: "Ai đã dùng ChatGPT có bật web search? Ai quyết định lúc nào nó search — bạn hay ChatGPT?" → "Chính là agent: model tự chọn bước tiếp theo."

**Slide 4 · Agenda (30")**
- 3 phần, mỗi phần khoảng 9 phút, Q&A cuối buổi.

**Slide 5 · Agent là gì (2')**
- Ý chính: model chỉ viết ra text kiểu "tôi cần gọi search_kb(...)". Code của mình mới là bên chạy hàm thật, rồi đưa kết quả lại cho model.
- Đi qua 4 bước bên phải (1 → 4).
- Chốt bằng chuỗi chip: Agent = LLM + Tools + Context + Code của mình.
- Nếu có người hỏi "model chỉ viết text thì sao bị prompt injection?" → "Vì application THỰC THI text đó. Session 7 nói kỹ."

## Phần 01 · 3 mức điều phối (5–15')

**Slide 6 · Sơ đồ 3 mức (2')**
- Đi từng hàng: Model call → Workflow → Agent.
- Ô cam = model quyết định, ô tối = code quyết định.
- Hàng Agent: model nhận *mục tiêu*, gọi tool qua lại với code (mũi tên đi = gọi tool, mũi tên về = kết quả), lặp tới khi đủ thông tin hoặc chạm `max_turns`.
- Hỏi lớp: "Workflow có dùng LLM không?" → Có, nhưng LLM không quyết định thứ tự bước.

**Slide 7 · Code chạy thật — DEMO LIVE (3')**
- Nói: "Sơ đồ vừa rồi là code thật." Chỉ cột trái: model call 2 dòng; workflow có `if` do code quyết định; agent chỉ khai báo tool + `max_turns`.
- Chạy: `python3 compare_orchestration_levels.py --runs 1 --show`
- Trong lúc chờ khoảng 25 giây, chỉ cột phải trên slide.
- Khi có output, chỉ ra:
  - `[CODE]` và `[MODEL]` khớp màu ô ở slide 6.
  - Mức Agent: chuỗi 🧠 → 🔧 search_kb → 🧠 → 🔧 create_ticket → 🧠. Không ai viết sẵn thứ tự này.
- Ở mức Agent sẽ hiện thêm dòng kiểm quyền / chờ duyệt. Nói: "Đó là application kiểm soát, Session 7." Đừng sa đà vào phần này.
- Lệnh không ghi đè số đo trên slide sau, chạy bao nhiêu lần cũng được.

**Slide 8 · Bảng so sánh (1')**
- Cùng yêu cầu "E205 + tạo ticket". Đọc dòng "Làm được gì" và "Ai chọn bước".
- Dòng cuối là rủi ro của agent: gọi sai tool, sai tham số. "Ai chặn? → application, Session 7."

**Slide 9 · Câu hỏi: agent tốn hơn bao nhiêu? (1')**
- Cho lớp đoán: gấp mấy lần workflow? Chậm hơn bao nhiêu? Ghi 2–3 con số lên bảng.

**Slide 10 · Đáp án đo thật (1'30")**
- Workflow 1.482 token, agent 3.841 token → agent tốn khoảng 2,6×.
- Thời gian gần như nhau (khoảng 7 giây): chi phí của agent nằm ở token, không nằm ở độ trễ.
- Chốt: yêu cầu này có bước biết trước, nên workflow thắng.

**Slide 11 · Vì sao tốn hơn (1'30")**
- Model không nhớ gì giữa các lượt gọi → mỗi lượt gửi lại toàn bộ hội thoại: 574 → 828 → 1.109 token vào.
- "Agent càng nhiều bước, chi phí tăng nhanh hơn tuyến tính. Vì vậy Session 8 đặt giới hạn số bước."

## Phần 02 · Khi nào cần agent (15–24')

**Slide 12 · Câu hỏi: có khi nào agent rẻ hơn? (1'30")**
- Đọc to yêu cầu có điều kiện ("nếu lỗi phía hệ thống thì tạo ticket…").
- Hỏi: "Workflow cố định 'phân loại → tra KB → …' xử lý câu này thế nào? Bước phân loại có đủ thông tin để quyết định không?"

**Slide 13 · Đáp án đo thật (2')**
- Workflow tốn 5.246 token, mất 25,6 giây; agent 1.893 token, 8,1 giây. Cả 3 mức đều đúng là không tạo ticket.
- Lý do: bước phân loại phải quyết định trước khi có dữ liệu → model mất 2.759–9.900 token suy luận ẩn chỉ để trả về 1 dòng JSON.
- Nói cho công bằng: workflow sửa được bằng cách đổi thứ tự bước, nhưng người viết code phải lường trước điều đó.

**Slide 14 · Câu hỏi: yêu cầu nào cần agent? (1'30")**
- Cho từng người chọn mức cho 4 yêu cầu ở slide sau. Đọc to 4 yêu cầu trước khi lật đáp án.

**Slide 15 · Đáp án (2')**
- Đi qua từng dòng. Dòng 3 ("CẦN THÌ tạo ticket") chính là yêu cầu vừa đo ở slide 13. Nếu đổi thành "LUÔN tạo" thì dùng workflow (slide 10).
- Dòng 4 (hoàn tiền): không đảo ngược được → workflow + người duyệt.
- Quy tắc: không chắc thì chọn mức thấp hơn.

**Slide 16 · Ba câu hỏi quyết định (2')**
- Đi cây từ trên xuống. "Đây cũng là cách trả lời khách hàng khi họ nói 'làm cho tôi một AI agent'."

## Phần 03 · OpenAI Agents SDK (24–32')

**Slide 17 · 4 khái niệm (2'30")**
- Agent / function_tool / Runner.run / Trace. Chỉ vào từng chỗ trong code.
- "Định vị, không cần học thuộc API."
- Code chạy qua gateway công ty bằng chuẩn Chat Completions → provider nào tương thích OpenAI cũng chạy được.

**Slide 18 · Trace — DEMO LIVE tuỳ chọn (2')**
- Chạy: `python3 run_demo.py --scenario 1 --approve yes --trace`
- Trace in theo vòng lặp ①–④ (giống sơ đồ slide 5): ① app gửi cho LLM (số message, token) · ② LLM quyết định (JSON tool call hoặc trả lời cuối, kèm lý do) · ③ app chạy hàm thật / chờ duyệt · ④ kết quả gửi lại.
- Có 2 dòng `create_ticket`: dòng đầu là lúc dừng chờ người duyệt (kết quả rỗng), dòng sau mới chạy thật và ra T-1001. Chỉ cần nói "dừng chờ duyệt — Session 7".
- Chạy mất khoảng 7–8 giây.
- Nếu thiếu thời gian: không chạy, đọc trace in sẵn trên slide.

**Slide 19 · Câu hỏi: có SDK rồi còn phải viết gì? (1')**
- Để lớp trả lời. Nhiều người nghĩ SDK lo luôn cả phân quyền.

**Slide 20 · Ranh giới SDK / application (2'30")**
- Đọc từng cặp: SDK có *cơ chế*, application ra *quyết định*.
- Câu kiểm tra: "Kiểm tra user thuộc tenant nào — SDK hay application?" → application, lấy từ session đăng nhập.

## Kết (32–35')

**Slide 21 · Ghi nhớ (1'30")**
- Đọc 5 thẻ. Thẻ chi phí: "Không mức nào luôn rẻ hơn — tuỳ bước có biết trước hay không."

**Slide 22 · Thử thách + bài tự thực hành (1'30")**
- Giao bài: chọn một use case trong dự án của mình, giải thích vì sao chọn mức đó và đánh dấu phần SDK lo / phần application tự làm. Mang tới đầu Session 6.
- 4 câu thử thách để trả lời trong Q&A (đáp án có trong speaker notes slide 22).

## Q&A (35–45')

**Slide 23**
- Q&A 10 phút. Nhắc lịch buổi sau: 11h thứ 4 tuần sau.
- Câu hay gặp, chuẩn bị trước:
  - "Dùng LangChain / Claude Agent SDK được không?" → được. Ranh giới SDK / application vẫn y hệt. Repo có `agent_claude_sdk.py` để so sánh.
  - "Agent có làm sai không?" → có. Session 7–8 học cách chặn và dừng.

## Nếu bị thiếu thời gian
- Bỏ chạy live slide 18 (tiết kiệm 2').
- Slide 14–15 gộp: lật đáp án luôn, không chờ lớp chọn (tiết kiệm 1'30").

## Câu hỏi chưa giải quyết
