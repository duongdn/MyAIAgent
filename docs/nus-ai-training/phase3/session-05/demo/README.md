# Demo Session 5 — support agent tối thiểu với OpenAI Agents SDK

Demo phục vụ 2 dòng trong đề cương Session 5 (`02_Noi_dung_chi_tiet_chuong_trinh_dao_tao_AI.pdf`, trang 4):
- "**Walkthrough** support agent tối thiểu trong OpenAI Agents SDK: agent definition, run/runner, tools và trace ở mức định vị; không học thuộc API."
- "Ví dụ trong buổi: Yêu cầu support nào chỉ cần RAG, yêu cầu nào cần nhiều bước và tạo ticket?"

Agent chạy **model thật** qua LLM gateway công ty (mặc định `deepseek-v4.1-flash`), không mock.
Cách trình bày trên lớp (thời gian, câu nói): mục "Demo" trong `../presentation-script.md`. File này giải thích **code** để trainer hiểu và trả lời được câu hỏi.

## 1. Chạy

```bash
cd docs/nus-ai-training/phase3/session-05/demo
python3 -m venv ~/ai-training-venv && source ~/ai-training-venv/bin/activate
pip install -r requirements.txt

python3 demo_ui.py          # mở http://localhost:8000
```

- Key gateway: `config/.nus-llm-gateway-config.json` (gitignored, code tự đọc). **Không hardcode key, không mở file này trên màn hình.**
- Dự phòng khi trang web lỗi — chạy trên terminal:
  - `python3 run_demo.py --scenario 9 --trace-only` (yêu cầu ① chỉ hỏi)
  - `python3 run_demo.py --scenario 1 --approve yes --trace-only` (yêu cầu ② tạo ticket)

## 2. Bức tranh: sơ đồ slide 5 nằm ở đâu trong code

Slide 5 vẽ agent = **LLM** + **code app** chạy vòng lặp ①–④ với **tools**. Trong demo:

| Trên sơ đồ slide 5 | Trong code | Ai viết |
|---|---|---|
| LLM | Model `deepseek-v4.1-flash` qua gateway — `make_model()` (`agent_openai_sdk.py:52`) | Có sẵn |
| Tools | `search_kb`, `create_ticket` — hàm Python gắn `@function_tool` (`agent_openai_sdk.py:79–92`) | Mình viết |
| Code app — khai báo agent | `build_agent()` (`agent_openai_sdk.py:105`) | Mình viết (vài dòng) |
| Code app — **vòng lặp ①–④** | `Runner.run(...)` (`agent_openai_sdk.py:145`) | **SDK viết sẵn** |
| Code app — quyết định của application (quyền, duyệt…) | `checkpoints.py` | Mình viết — học ở các buổi sau |
| Ghi lại từng bước | Trace (`trace_local.py`, cột phải trang demo) | SDK sinh, mình chọn nơi ghi |

Ý chính khi giảng: **phần vòng lặp là SDK lo** (slide 19); mình chỉ khai báo tool + agent rồi gọi `Runner.run`.

## 3. Walkthrough từng bước

### Bước A — Tool: hàm Python bình thường + `@function_tool`

```python
@function_tool(description_override=cp.SEARCH_KB_DESC)
def search_kb(ctx: RunContextWrapper[cp.Session], query: str, tenant: str | None = None) -> str:
    return cp.search_kb(ctx.context, query, tenant)
```
(`agent_openai_sdk.py:79–81`; `create_ticket` ở dòng 90–92 viết y hệt.)

SDK tự đọc tên hàm, mô tả, kiểu tham số và biến thành **mô tả tool gửi cho LLM**. Đây là đúng thứ LLM nhìn thấy (in bằng `python3 ../../session-06/demo/compare_tool_descriptions.py --schema` — script của Session 6, chạy tức thì, không gọi model):

```json
{
 "name": "search_kb",
 "description": "Tìm tài liệu trong knowledge base của công ty. Có thể truyền tenant (mã công ty).",
 "parameters": {
  "properties": { "query": {"type": "string"}, "tenant": {"anyOf": [{"type": "string"}, {"type": "null"}]} },
  "required": ["query", "tenant"]
 }
}
```

Điểm cần nói:
- LLM chỉ thấy **tên + mô tả + tham số**. Nó không thấy code bên trong hàm.
- Tham số `ctx` (thông tin user đăng nhập) **không** xuất hiện trong mô tả: app truyền vào, LLM không thấy, không sửa được.
- Bên trong `search_kb` gọi sang `checkpoints.py`: lọc tài liệu theo quyền, gói kết quả trong thẻ `<untrusted_search_results>`. Đây là phần application tự quyết — chỉ cần nói "có kiểm tra ở đây, học ở Session 7".

### Bước B — Agent definition: khai báo, chưa chạy gì

```python
def build_agent(model):
    return Agent(name="Support agent", instructions=cp.SYSTEM_PROMPT, model=model,
                 tools=[search_kb, create_ticket], model_settings=MODEL_SETTINGS,
                 input_guardrails=[no_card_number])
```
(`agent_openai_sdk.py:105–107`)

- `instructions` = system prompt (`checkpoints.py:31`): *"Bạn là trợ lý cho nhân viên support… Luôn dùng search_kb trước và trích id tài liệu làm nguồn. Chỉ tạo ticket khi user yêu cầu…"*
- `model` = LLM nào; `tools` = danh sách tool LLM được chọn.
- `input_guardrails` = kiểm tra câu hỏi trước khi gửi LLM (ở đây: chặn số thẻ). Chỉ cần nhắc tên — là concept Guardrail ở slide 19.

### Bước C — Run/runner: một dòng chạy cả vòng lặp

```python
await asyncio.wait_for(Runner.run(agent, run_input, context=me, max_turns=cp.MAX_TURNS), RUN_TIMEOUT_S)
```
(`agent_openai_sdk.py:145`)

- `agent` = khai báo ở bước B · `run_input` = câu hỏi của user · `context=me` = thông tin user đăng nhập (đi vào `ctx` của tool) · `max_turns=8` = tối đa 8 lượt gọi LLM (điều kiện dừng do code đặt) · `wait_for(..., 120s)` = giới hạn thời gian.
- Bên trong `Runner.run`, SDK lặp đúng sơ đồ slide 5 (docs SDK, mục "The agent loop"): gọi LLM → nếu LLM trả tool call thì chạy tool, gắn kết quả vào hội thoại, gọi LLM lại → nếu LLM trả câu trả lời cuối thì dừng.

### Bước D — Chuyện gì xảy ra bên trong, từng lượt (dữ liệu thật)

Ghi lại từ một lần chạy thật câu ① "Mã lỗi thanh toán E205 nghĩa là gì?" (30/10):

**Lượt 1 — ① app gửi cho LLM** (2 message + mô tả 2 tool):
```
system : Bạn là trợ lý cho nhân viên support… Luôn dùng search_kb trước…
user   : Mã lỗi thanh toán E205 nghĩa là gì?
```
**② LLM trả về** — không phải câu trả lời, chỉ là một đoạn JSON "muốn gọi tool":
```json
[{"id": "call_00_…", "type": "function",
  "function": {"name": "search_kb", "arguments": "{\"query\": \"mã lỗi thanh toán E205\", \"tenant\": null}"}}]
```
**③ App (SDK) chạy hàm thật** `search_kb(query="mã lỗi thanh toán E205")` → trả về:
```
<untrusted_search_results>
<document id='kb-a-001'>Xử lý lỗi thanh toán thẻ: … thử lại sau 15 phút, nếu vẫn lỗi thì tạo ticket cho billing-team-a.</document>
<document id='kb-a-002'>Danh sách mã lỗi cổng thanh toán (nội bộ): E101 = thẻ hết hạn, E205 = ngân hàng từ chối, …</document>
</untrusted_search_results>
```
**④ Kết quả gửi lại — lượt 2, app gửi 4 message**:
```
system    : (như trên)
user      : Mã lỗi thanh toán E205 nghĩa là gì?
assistant : [tool call search_kb ở lượt 1]
tool      : <untrusted_search_results>…kb-a-001, kb-a-002…</untrusted_search_results>
```
**② LLM trả lời cuối** (không gọi tool nữa → SDK dừng vòng lặp):
```
E205 = ngân hàng từ chối (nguồn: kb-a-002). Hướng xử lý (kb-a-001): đề nghị khách thử lại sau 15 phút; nếu vẫn lỗi thì tạo ticket cho billing-team-a.
```
Token: lượt 1 = 557 vào + 64 ra, lượt 2 = 794 vào + 116 ra.

Điểm cần nói:
- LLM **chỉ viết JSON**; người chạy hàm là SDK/app → mọi kiểm soát đặt ở app được.
- LLM **không nhớ**: lượt 2 app gửi lại cả câu hỏi + tool call + kết quả (2 → 4 message, token vào tăng).
- **Ai quyết dừng**: LLM (trả lời không kèm tool call), trong giới hạn `max_turns` của code.

### Bước E — Trace ở mức định vị

SDK tự sinh trace cho mỗi `Runner.run`: mỗi lượt gọi LLM, mỗi tool chạy, guardrail. Demo không gửi trace về OpenAI mà ghi ra `.traces/` trên máy (`trace_local.py`, gắn ở `make_model`) và hiện lên cột phải trang demo:

| Ô trong cột trace | Ứng với | Lấy từ |
|---|---|---|
| Kiểm tra input (no_card_number) | Guardrail | span guardrail |
| **LLM chọn tool: search_kb** (cam) + "lý do LLM tự viết" + JSON gốc | ② LLM quyết định | span generation (output của LLM) |
| **App chạy search_kb** (tối) | ③ app chạy hàm thật | span function |
| App CHƯA chạy create_ticket: chờ người duyệt | SDK dừng vì tool cần duyệt | span function chưa có output |
| **LLM trả lời cuối** (cam) | Dừng vòng lặp | span generation không có tool call |

"Ở mức định vị" = chỉ cần đọc trace để biết: agent đã đi bước nào, LLM chọn tool gì với tham số gì, sai/dừng ở đâu. Chi tiết trace/eval ở Session 9.

## 4. Hai yêu cầu mẫu — vì sao một cái chỉ cần RAG, một cái cần agent

| Nút | Câu hỏi | Agent làm gì (chạy thật) | Kết luận |
|---|---|---|---|
| ① Chỉ cần RAG | "Mã lỗi thanh toán E205 nghĩa là gì?" | `search_kb` → trả lời. 2 lượt gọi LLM, không tạo ticket | Tra 1 lần rồi trả lời — **model call + RAG là đủ**, agent làm được nhưng thừa |
| ② Nhiều bước + tạo ticket | "Khách X báo lỗi thanh toán mã E205, xử lý sao? Tạo ticket cho billing team giúp tôi." | `search_kb` → LLM chọn `create_ticket` → **app dừng chờ duyệt** (hộp Duyệt/Từ chối) → Duyệt → T-1001 → LLM trả lời. 3 lượt gọi LLM | **Nhiều bước + hành động**. Nếu lúc nào cũng tạo ticket → workflow là đủ (slide 9); tạo hay không tuỳ kết quả tra → agent (slide 11) |

Ở ②, hay gặp: LLM đề xuất priority `P2` hoặc assignee `"billing team"` → ô tối "BỊ CHẶN bởi application" → LLM đọc lỗi, tự sửa `P3` / `billing-team-a`. Dùng để minh hoạ "LLM đề xuất, app quyết" (slide 22). Bấm **Từ chối** → không có ticket nào được tạo.

## 5. Câu hỏi hay gặp

| Câu hỏi | Trả lời ngắn |
|---|---|
| LLM có tự gọi API / chạy code không? | Không. LLM chỉ trả JSON "muốn gọi tool X với tham số Y" (bước D, ②). SDK/app mới chạy hàm. |
| LLM biết có những tool nào bằng cách nào? | SDK gửi kèm mô tả tool (tên, mô tả, tham số — bước A) trong mỗi lượt gọi. |
| Vì sao lượt sau tốn token hơn? | LLM không nhớ; app gửi lại toàn bộ hội thoại + kết quả tool mỗi lượt (2 → 4 message). |
| Ai quyết khi nào dừng? | LLM (trả lời không kèm tool call), nhưng code đặt giới hạn: `max_turns=8`, 120 giây. |
| Không dùng SDK có được không? | Được — tự viết vòng lặp gọi LLM / đọc tool call / chạy hàm / gửi lại (slide 19 cột trái). SDK viết sẵn phần đó. |
| Sao `search_kb` có tham số `tenant`? | Cố ý để lộ — lỗi thiết kế hay gặp; app bỏ qua giá trị LLM điền và dùng thông tin đăng nhập. Học ở Session 7. |
| Ai chặn khi LLM điền sai priority? | Code trong `checkpoints.py` (rule nghiệp vụ), không phải prompt. Học ở Session 6–7. |

## 6. File nào dùng cho Session 5

| File | Vai trò |
|---|---|
| `agent_openai_sdk.py` | Agent tối thiểu — file dùng cho walkthrough (bước A–C) |
| `checkpoints.py` | System prompt, mô tả tool, và logic bên trong tool (chỉ nhắc, không đi sâu) |
| `demo_ui.py` + `demo_ui.html` | Trang demo: gửi câu hỏi, stream trace từng bước, nút Duyệt/Từ chối |
| `run_demo.py` | Bản dòng lệnh (dự phòng) |
| `trace_local.py` | Ghi trace ra `.traces/` trên máy và in các bước |
| `sample_data.py`, `ticket_system.py` | Dữ liệu mẫu (user, tài liệu KB) và hệ thống ticket giả lập |
| `compare_orchestration_levels.py --show` | Tuỳ chọn: cùng 1 yêu cầu chạy ở 3 mức model call / workflow / agent (slide 6) |
| `task_state.py` | Lưu trạng thái task (cần cho bản chạy, giải thích ở Session 8) |

Thư mục chỉ còn file Session 5 cần để chạy. Script đo của Session 6 nằm ở `../../session-06/demo/`, các file GĐ5 (eval, bản Claude SDK) ở `docs/nus-ai-training/phase5/demo/`.
