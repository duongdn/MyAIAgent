# Demo Session 5 — support agent tối thiểu với OpenAI Agents SDK

Demo phục vụ 2 dòng trong đề cương Session 5 (`02_Noi_dung_chi_tiet_chuong_trinh_dao_tao_AI.pdf`, trang 4):
- "**Walkthrough** support agent tối thiểu trong OpenAI Agents SDK: agent definition, run/runner, tools và trace ở mức định vị; không học thuộc API."
- "Ví dụ trong buổi: Yêu cầu support nào chỉ cần RAG, yêu cầu nào cần nhiều bước và tạo ticket?"

Agent chạy **model thật** qua LLM gateway công ty (`deepseek-v4.1-flash`), không mock.
Cách trình bày trên lớp: mục "Demo" trong `../presentation-script.md`. File này giải thích **code**.

## 1. Chạy

```bash
cd docs/nus-ai-training/phase3/session-05/demo
python3 -m venv ~/ai-training-venv && source ~/ai-training-venv/bin/activate
pip install -r requirements.txt          # openai-agents (kéo theo openai)

python3 demo_ui.py                       # mở http://localhost:8000
```
- Key gateway: `config/.nus-llm-gateway-config.json` (gitignored, code tự đọc). **Không hardcode key, không mở file này trên màn hình.**
- Dự phòng khi trang web lỗi:
  - `python3 run_demo.py rag` (yêu cầu ① chỉ hỏi)
  - `python3 run_demo.py ticket --approve yes` (yêu cầu ② tạo ticket; `--approve no` để từ chối)

| File | Vai trò |
|---|---|
| `agent_openai_sdk.py` | **Agent** — file walkthrough: model, 2 tool, agent, run (166 dòng) |
| `sample_data.py` | Knowledge base: 3 tài liệu |
| `trace_local.py` | Trace processor: ghi `.traces/`, in từng bước ra terminal |
| `demo_ui.py` + `demo_ui.html` | Trang demo: ô hỏi, cột trace, nút Duyệt/Từ chối |
| `run_demo.py` | Bản dòng lệnh |
| `compare_orchestration_levels.py` | Tuỳ chọn: cùng 1 yêu cầu chạy ở 3 mức model call / workflow / agent (slide 6) |

## 2. Luồng chạy: từ lúc gõ câu hỏi đến lúc có câu trả lời

Ví dụ bấm nút ① "Mã lỗi thanh toán E205 nghĩa là gì?". Có 3 bên: **Trình duyệt** (JS trong `demo_ui.html`) · **Web server** (`demo_ui.py`) · **Thread chạy agent** (`demo_ui.py` → `agent_openai_sdk.py` → SDK).

```
TRÌNH DUYỆT                 WEB SERVER (demo_ui.py)          THREAD AGENT                                   LLM (gateway)
① ask(question)
   POST /run {question} ──► do_POST: tạo run_id + 2 hàng đợi
                             (events, approval), mở thread ──► run_in_thread(run, question)
   ◄── {"run": "a1b2c3d4"}                                     make_model() → model
② EventSource(/events) ───► do_GET /events: đứng chờ           run_agent(model, question, ask_human_ui)
                             hàng đợi, có event là đẩy lên       ├ build_agent(model) → agent
                                                                └ Runner.run(agent, question, max_turns=8)   ← SDK
                                                                   ├ guardrail no_card_number: qua
                                                                   ├ LƯỢT 1: system + câu hỏi + schema 2 tool ──►
                                                                   │         ◄── tool call: search_kb {"query": "mã lỗi thanh toán E205"}
                                                                   ├ SDK chạy search_kb("mã lỗi thanh toán E205") → "[kb-001]…[kb-002]…"
                                                                   ├ LƯỢT 2: 4 message (thêm tool call + kết quả) ──►
                                                                   │         ◄── "E205 = ngân hàng từ chối (nguồn: kb-002)…"
                                                                   └ không còn tool call → dừng → RunResult
③ es.onmessage: vẽ ô  ◄──── data: {"type": "step"} ◄──────────── mỗi bước xong: SDK gọi UITraceProcessor.on_span_end → emit()
④ hiện câu trả lời   ◄──── data: {"type": "done"} ◄──────────── emit(done: answer, usage, tickets)
   es.close()        ◄──── data: {"type": "end"}
```

| # | Ở đâu | Chuyện gì xảy ra | Dữ liệu |
|---|---|---|---|
| 1 | `demo_ui.html` hàm `ask()` | User bấm nút / gõ → JS gửi `POST /run` | `{"question": "Mã lỗi thanh toán E205 nghĩa là gì?"}` |
| 2 | `demo_ui.py:177` `do_POST` | Tạo `run_id`, hàng đợi `events` (gửi bước lên web) + `approval` (nhận nút Duyệt), mở **thread mới** chạy agent, trả ngay `run_id` | trả `{"run": "a1b2c3d4"}` |
| 3 | JS `new EventSource(...)` → `demo_ui.py:160` | Trình duyệt mở kết nối Server-Sent Events; server có event nào đẩy lên ngay | mỗi event 1 dòng `data: {...}` |
| 4 | `demo_ui.py:112` `run_in_thread` | Tạo model, **thêm** `UITraceProcessor` (`:125`), gọi `run_agent` (`:126`) | |
| 5 | `agent_openai_sdk.py:135` `run_agent` | Dựng agent, gọi `Runner.run` (`:150`). **Từ đây SDK lo** | input: agent, câu hỏi, `max_turns=8` |
| 6 | trong SDK — guardrail | `no_card_number` kiểm tra câu hỏi có số thẻ không | qua |
| 7 | trong SDK — lượt 1 | Gửi LLM: system prompt + câu hỏi + schema `search_kb`, `create_ticket` | 2 message, 542 token vào |
| 8 | LLM trả về | Không trả lời — chỉ JSON "muốn gọi tool" | `search_kb {"query": "mã lỗi thanh toán E205"}` |
| 9 | SDK → `agent_openai_sdk.py:80` `search_kb` | SDK parse JSON, gọi hàm Python thật → `find_docs` (`:68`) tra tài liệu | trả `"[kb-001] Xử lý lỗi thanh toán thẻ: …\n[kb-002] Danh sách mã lỗi…: … E205 = ngân hàng từ chối…"` |
| 10 | trong SDK — lượt 2 | Gắn tool call + kết quả vào hội thoại, gửi lại LLM | 4 message, 731 token vào |
| 11 | LLM trả về | Trả **text**, không tool call → SDK dừng vòng lặp | `"**E205 = ngân hàng từ chối giao dịch** (nguồn: kb-002)…"` |
| 12 | `agent_openai_sdk.py:166` | Trả câu trả lời + token | `("…", {"requests": 2, "input_tokens": 1273, …})` |
| 13 | `demo_ui.py:128` | `emit` done, rồi end | |
| 14 | JS `es.onmessage` | `done` → hiện câu trả lời + "2 lượt gọi LLM · ticket: không có"; `end` → đóng kết nối | |

**Cột trace bên phải**: song song với bước 6–11, mỗi khi SDK xong 1 việc, SDK gọi `UITraceProcessor.on_span_end` (`demo_ui.py:60`) → đổi thành event dễ đọc → `emit()` → bước 3 đẩy lên → JS vẽ 1 ô. Vì vậy ô hiện **ngay khi** từng bước xong. Cơ chế: mục 3.

### Nút ② (tạo ticket) khác ở đâu
Bước 1–10 giống. Từ lượt 2:
- LLM trả tool call `create_ticket {"title": "…E205…", "priority": "P3", "assignee": "billing-team"}`.
- `create_ticket` khai báo `@function_tool(needs_approval=True)` (`agent_openai_sdk.py:94`) → SDK **dừng run trước khi chạy tool**, trả `RunResult` có `interruptions = [create_ticket…]`. Ô trace: "App CHƯA chạy create_ticket: chờ người duyệt".
- `run_agent` thấy `result.interruptions` (`:151`) → gọi `ask_human_ui` (`demo_ui.py:94`) → `emit` approval → trang hiện **Duyệt / Từ chối** → thread agent **đứng chờ** hàng đợi `approval` (`:105`, tối đa 5 phút).
- Bấm Duyệt → JS `POST /approve {"ok": true}` → `do_POST` bỏ `True` vào hàng đợi → thread chạy tiếp: `state.approve(item)` (`:155`) → `Runner.run(agent, state)` (`:159`) — SDK chạy tiếp **đúng chỗ dừng**: chạy `create_ticket` → `T-1001` → lượt 3 gọi LLM → trả lời → bước 12–14.
- Bấm Từ chối → `state.reject(...)` → SDK báo LLM "Người duyệt đã từ chối" → LLM trả lời, không có ticket.

## 3. Trace chạy thế nào (cơ chế trong OpenAI Agents SDK)

Mình **không gọi** hàm "ghi trace" nào. Mình **đăng ký object lắng nghe** (`TracingProcessor`); SDK gọi object đó mỗi khi 1 bước bắt đầu/kết thúc — giống gắn event listener trên web.

| Khái niệm | Là gì | Trong demo |
|---|---|---|
| **Trace** | 1 lần `Runner.run` từ đầu đến cuối | "Agent workflow" |
| **Span** | 1 bước trong trace, có giờ bắt đầu/kết thúc + dữ liệu `span.span_data` | `guardrail`, `generation` (1 lượt gọi LLM), `function` (1 lần chạy tool), `turn` (1 vòng), `agent` |
| **TracingProcessor** | Object mình viết, 6 hàm: `on_trace_start/end`, `on_span_start/end`, `shutdown`, `force_flush` | `LocalTraceProcessor` (`trace_local.py`), `UITraceProcessor` (`demo_ui.py`) |

**Ai tạo span?** Code bên trong SDK (`agents` 0.23.1): gọi LLM được bọc trong `with generation_span(...)` (`models/openai_chatcompletions.py`), chạy tool trong `with function_span(tool_name)` (`run_internal/tool_execution.py`). Hết khối `with` → span kết thúc → SDK gọi `on_span_end(span)` của **mọi processor trong danh sách** (`tracing/provider.py`).

**Đăng ký — 2 hàm:**
| Hàm | Làm gì | Dùng ở |
|---|---|---|
| `set_trace_processors([p])` | **Thay** cả danh sách. Mặc định danh sách có processor gửi trace về dashboard OpenAI → thay để dữ liệu không ra ngoài | `make_model()` — `agent_openai_sdk.py:55` |
| `add_trace_processor(p)` | **Thêm** vào danh sách (cái cũ vẫn chạy) | `run_in_thread()` — `demo_ui.py:125`. Phải gọi **sau** `make_model`, vì `set_…` xoá hết |

→ Mỗi span kết thúc, SDK gọi **cả 2**: `LocalTraceProcessor` ghi `.traces/<trace_id>.jsonl` (+ in terminal), `UITraceProcessor` → `emit()` → trình duyệt.

**Thứ tự SDK gọi — chạy thật câu E205** (in bằng 1 processor chỉ `print`):
```
on_trace_start   trace Agent workflow
  on_span_start  agent Support agent
  on_span_start  turn                       ← vòng 1
  on_span_end    guardrail no_card_number   → ô "Kiểm tra input"
  on_span_end    generation (tool_calls)    → ô "LLM chọn tool: search_kb"
  on_span_end    function search_kb         → ô "App chạy search_kb"
  on_span_end    turn
  on_span_start  turn                       ← vòng 2
  on_span_end    generation (text)          → ô "LLM trả lời cuối"
  on_span_end    turn
  on_span_end    agent Support agent
on_trace_end     trace Agent workflow
```
(lược bớt các dòng `on_span_start` của guardrail/generation/function)

**Span có dữ liệu gì:**
- `generation`: `.input` (message đã gửi — "gửi 2/4 message"), `.output` (tool_calls hoặc text, kèm `reasoning_content` = "lý do LLM tự viết"), `.usage` (token).
- `function`: `.name`, `.input` (JSON tham số LLM điền), `.output` (kết quả). `output` rỗng = chưa chạy vì chờ duyệt.
- `guardrail`: `.name`, `.triggered`.

Gửi trace đi nơi khác (Langfuse, Logfire…): chỉ `add_trace_processor` processor của bên đó — không sửa agent.

## 4. OpenAI Agents SDK — nối từ Session 2

Session 2 (`Session_02 – From use case to model API…pdf`, slide 11–14) dùng thư viện **`openai`** gọi model **1 lần**:
```ts
const client = new OpenAI({ timeout: 20_000, maxRetries: 2 });
const resp = await client.responses.parse({ model, instructions: INSTRUCTIONS,
  input: `<email>\n${emailText}\n</email>`, text: { format: zodTextFormat(SupportRequest, "support_request") } });
```

**OpenAI Agents SDK** (`pip install openai-agents`, import `agents`; docs https://openai.github.io/openai-agents-python/) xây **trên** thư viện `openai`: vẫn client đó để gọi model, nhưng tự lo **lặp nhiều lượt + chạy tool**.

| Ý ở Session 2 | Ở demo Session 5 | Trong code |
|---|---|---|
| `new OpenAI({ timeout, maxRetries })` | Vẫn client `openai`: `AsyncOpenAI(api_key, base_url, timeout=60, max_retries=2)`, bọc thành Model đưa cho SDK | `make_model()` |
| `instructions: INSTRUCTIONS` | `Agent(instructions=SYSTEM_PROMPT)` | `build_agent()` |
| `input: <email>…` | Câu hỏi truyền vào `Runner.run(agent, question)` | `run_agent()` |
| Schema zod cho **output** | Schema cho **tham số tool**, SDK tự sinh từ kiểu Python + docstring | `@function_tool` |
| `responses.parse(...)` — **1 lượt** | `Runner.run(...)` — **nhiều lượt** | `run_agent()` |
| Timeout, retry | + giới hạn cả vòng lặp: `max_turns=8`, 120 giây | `run_agent()` |
| TypeScript | Python (SDK có cả bản JS `@openai/agents`) | |

Câu nói khi dạy: *"Session 2: tự gọi model 1 lần rồi tự kiểm tra. Session 5: vẫn client đó, nhưng giao vòng lặp gọi – chạy tool – gọi lại cho SDK."*

**Load lên** (thứ tự trong `agent_openai_sdk.py`): import `agents` + `openai` → `make_model()` (`:42`) đọc key, tạo `AsyncOpenAI` trỏ gateway, đặt trace processor, trả `OpenAIChatCompletionsModel` (gateway chỉ hỗ trợ Chat Completions; với OpenAI thật chỉ cần `Agent(model="gpt-…")`) → Python chạy tới `@function_tool` tạo 2 object tool → `build_agent()` tạo `Agent`. Đến đây **chưa gọi model lần nào**.

**Run**: `await Runner.run(agent, question, max_turns=8)` → `RunResult`. Bản đồng bộ `Runner.run_sync`, bản stream `Runner.run_streamed`.

## 5. Code từng phần: input / output

### A. Tool = hàm Python + `@function_tool`
```python
@function_tool
def search_kb(query: str) -> str:
    """Tìm tài liệu trong knowledge base của team support.

    Args:
        query: nội dung cần tra, vd "mã lỗi E205".
    """
```
(`agent_openai_sdk.py:79–91`; `create_ticket` ở `:94–106`.) SDK đọc **tên hàm + docstring + kiểu tham số** → mô tả tool gửi LLM. Đây đúng là thứ LLM nhận:
```json
{"name": "search_kb",
 "description": "Tìm tài liệu trong knowledge base của team support.",
 "parameters": {"type": "object", "additionalProperties": false, "required": ["query"],
   "properties": {"query": {"type": "string", "description": "nội dung cần tra, vd \"mã lỗi E205\"."}}}}
```
LLM chỉ thấy tên, mô tả, tham số — **không thấy code** bên trong. Sau `@function_tool`, `search_kb` là object `FunctionTool`, không còn là hàm thường.

### B. Agent definition
```python
Agent(name="Support agent", instructions=SYSTEM_PROMPT, model=model, tools=[search_kb, create_ticket],
      model_settings=MODEL_SETTINGS, input_guardrails=[no_card_number])
```
(`agent_openai_sdk.py:127`) `instructions` = system prompt: *"Bạn là trợ lý cho nhân viên support… Luôn dùng search_kb trước và trích id tài liệu làm nguồn. Chỉ tạo ticket khi user yêu cầu."* · `input_guardrails` = code kiểm tra câu hỏi trước khi gửi LLM (concept Guardrail, slide 19).

### C. Run
```python
result = await asyncio.wait_for(Runner.run(agent, question, max_turns=MAX_TURNS), RUN_TIMEOUT_S)
```
(`agent_openai_sdk.py:150`) `max_turns=8` = tối đa 8 lượt gọi LLM (điều kiện dừng do code đặt) · `wait_for(…, 120)` = giới hạn thời gian.

### D. Bảng input / output

| Hàm | Input | Output |
|---|---|---|
| `make_model(model_name=None)` | tên model; bỏ trống → `deepseek-v4.1-flash` | `OpenAIChatCompletionsModel` — **chưa gọi model** |
| `find_docs(query)` | `"mã lỗi thanh toán E205"` | list tài liệu `[kb-001, kb-002]` |
| `search_kb(query)` — **LLM điền, SDK gọi** | `query="mã lỗi thanh toán E205"` | `"[kb-001] Xử lý lỗi thanh toán thẻ: …\n[kb-002] Danh sách mã lỗi…"` → gửi lại LLM |
| `create_ticket(title, priority, assignee)` — **LLM điền, SDK gọi sau khi duyệt** | `"…E205…"`, `"P3"`, `"billing-team"` | `'{"ticket_id": "T-1001", "status": "created"}'` |
| `no_card_number(…, user_input)` | câu hỏi | `tripwire_triggered=True` nếu có số thẻ → SDK dừng |
| `build_agent(model)` | output `make_model` | object `Agent` — **chưa gọi model** |
| `run_agent(model, question, ask_human)` | model, câu hỏi, hàm hỏi duyệt `ask_human(tool_name, args) → True/False` | `(answer, usage)`: `("**E205 = ngân hàng từ chối giao dịch** (nguồn: kb-002)…", {"requests": 2, "input_tokens": 1273, "output_tokens": 150})` |
| `Runner.run(agent, input, max_turns)` | agent; câu hỏi (str) hoặc `RunState` khi chạy tiếp sau duyệt | `RunResult` (bảng dưới) |

**`RunResult`:**
| Thuộc tính | Câu ① | Ý nghĩa |
|---|---|---|
| `final_output` | `"**E205 = ngân hàng từ chối giao dịch**…"` | Câu trả lời cuối |
| `new_items` | `ToolCallItem, ToolCallOutputItem, MessageOutputItem…` | Từng bước của run |
| `raw_responses` | 2 phần tử | 1 phần tử = 1 lượt gọi LLM |
| `context_wrapper.usage` | `requests=2, input_tokens=1273, output_tokens=150` | Lượt gọi + token |
| `interruptions` | `[]` (câu ②: `[create_ticket]`) | Tool đang chờ duyệt |

Token, số lần gọi tool thay đổi giữa các lần chạy — model không ổn định (Session 1–2).

### E. Từng lượt gọi LLM (dữ liệu thật câu ①)
**Lượt 1** — app gửi 2 message + mô tả 2 tool:
```
system : Bạn là trợ lý cho nhân viên support… Luôn dùng search_kb trước…
user   : Mã lỗi thanh toán E205 nghĩa là gì?
```
LLM trả về — chỉ JSON "muốn gọi tool":
```json
[{"type": "function", "function": {"name": "search_kb", "arguments": "{\"query\": \"mã lỗi thanh toán E205\"}"}}]
```
SDK chạy `search_kb("mã lỗi thanh toán E205")` → `"[kb-001] …\n[kb-002] … E205 = ngân hàng từ chối…"`

**Lượt 2** — app gửi 4 message:
```
system    : (như trên)
user      : Mã lỗi thanh toán E205 nghĩa là gì?
assistant : [tool call search_kb]
tool      : [kb-001] … [kb-002] …
```
LLM trả lời cuối (không tool call → dừng): `"**E205 = ngân hàng từ chối giao dịch** (nguồn: kb-002)…"`. Token: lượt 1 = 542 vào + 48 ra, lượt 2 = 731 vào + 102 ra.

Ý cần nói: LLM **chỉ viết JSON**, SDK/app mới chạy hàm · LLM **không nhớ**: lượt sau app gửi lại cả hội thoại (2 → 4 message) · LLM quyết dừng, trong giới hạn `max_turns` của code.

## 6. RAG nằm ở đâu

| Chữ | Ở đâu | Câu E205 |
|---|---|---|
| **R – Retrieval** (tra tài liệu) | `find_docs()` (`agent_openai_sdk.py:68`), dữ liệu `sample_data.KB_DOCS` | Giữ tài liệu chứa ≥2 từ của câu tra → `kb-001`, `kb-002` |
| **A – Augmented** (đưa vào ngữ cảnh) | Output của tool `search_kb` → SDK gắn vào hội thoại (message `tool`) | Lượt 2 gửi 4 message, có tài liệu |
| **G – Generation** | Lượt gọi LLM cuối | "E205 = ngân hàng từ chối (nguồn: kb-002)" |

- **Đơn giản hoá**: tra bằng từ khoá. RAG thật dùng embedding + vector search (Session 3–4).
- **Hai kiểu**: trong agent, tra tài liệu là *tool* — LLM tự quyết gọi. RAG cổ điển = code tự tra, nhét vào prompt, gọi LLM 1 lần: `compare_orchestration_levels.py` → `model_call()`. Câu E205 chỉ cần kiểu cổ điển → đúng ý "yêu cầu nào chỉ cần RAG".

## 7. Hai yêu cầu mẫu

| Nút | Câu hỏi | Agent làm gì (chạy thật) | Kết luận |
|---|---|---|---|
| ① Chỉ cần RAG | "Mã lỗi thanh toán E205 nghĩa là gì?" | `search_kb` → trả lời. 2 lượt gọi LLM, không ticket | Tra 1 lần rồi trả lời — **model call + RAG là đủ** |
| ② Nhiều bước + tạo ticket | "Khách X báo lỗi thanh toán mã E205, xử lý sao? Tạo ticket cho billing team giúp tôi." | `search_kb` → `create_ticket` → **dừng chờ duyệt** → Duyệt → T-1001 → trả lời. 3 lượt gọi LLM | **Nhiều bước + hành động**. Luôn tạo ticket → workflow là đủ (slide 9); tạo hay không tuỳ kết quả tra → agent (slide 11) |

## 8. Câu hỏi hay gặp

| Câu hỏi | Trả lời ngắn |
|---|---|
| LLM có tự gọi API / chạy code không? | Không. LLM chỉ trả JSON "muốn gọi tool X với tham số Y". SDK/app chạy hàm. |
| LLM biết có tool nào bằng cách nào? | SDK gửi kèm mô tả tool (tên, docstring, tham số) trong mỗi lượt gọi. |
| Vì sao lượt sau tốn token hơn? | LLM không nhớ; app gửi lại toàn bộ hội thoại + kết quả tool (2 → 4 message). |
| Ai quyết khi nào dừng? | LLM (trả lời không kèm tool call), trong giới hạn code đặt: `max_turns=8`, 120 giây. |
| Không dùng SDK có được không? | Được — tự viết vòng lặp gọi LLM / đọc tool call / chạy hàm / gửi lại (slide 19). SDK viết sẵn phần đó. |
| Trace có gửi dữ liệu ra ngoài không? | Mặc định SDK gửi về OpenAI; demo thay bằng processor ghi trên máy (`set_trace_processors`). |
