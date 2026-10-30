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

## 2. Luồng chạy: từ lúc gõ câu hỏi đến lúc có câu trả lời

Ví dụ: bấm nút ① "Mã lỗi thanh toán E205 nghĩa là gì?". Có **3 bên** chạy song song:
**Trình duyệt** (JS trong `demo_ui.html`) · **Web server** (`demo_ui.py`) · **Thread chạy agent** (`demo_ui.py` → `agent_openai_sdk.py` → SDK → `checkpoints.py`).

```
TRÌNH DUYỆT                 WEB SERVER (demo_ui.py)          THREAD AGENT                                    LLM (gateway)
───────────                 ───────────────────────          ────────────                                    ─────────────
① ask(question)
   POST /run {question} ──► do_POST: tạo run_id + 2 hàng đợi
                             (events, approval), mở thread ──► run_in_thread(run, question)
   ◄── {"run": "a1b2c3d4"}                                     make_model("nus") → model
② new EventSource(                                             run_agent(model,"alice",question,…)
   /events?run=a1b2c3d4) ──► do_GET /events: đứng chờ           ├ new_session("alice") → me
                             hàng đợi events, có gì đẩy nấy     ├ build_agent(model)   → agent
                                                               └ run_limited → Runner.run(agent, question, context=me)
                                                                  ├ guardrail no_card_number: qua
                                                                  ├ LƯỢT 1: gửi system + câu hỏi + schema 2 tool ──► 
                                                                  │         ◄── tool_calls: search_kb {"query":"mã lỗi…E205"}
                                                                  ├ SDK gọi search_kb(ctx, query, tenant)
                                                                  │   └ cp.search_kb(me, …) → "<untrusted_search_results>…"
                                                                  ├ LƯỢT 2: gửi 4 message (thêm tool call + kết quả) ──►
                                                                  │         ◄── "E205 = ngân hàng từ chối (nguồn: kb-a-002)…"
                                                                  └ không còn tool call → dừng → RunResult
                                                               result.final_output → task.finish → answer
③ es.onmessage:            ◄── data: {"type":"step",…}  ◄──── mỗi bước xong, SDK báo trace → UITraceProcessor
   step(ev) vẽ ô trace                                         .on_span_end → emit(event) → hàng đợi events
④                          ◄── data: {"type":"done", answer} ◄ emit done (câu trả lời, token, ticket)
   hiện câu trả lời
   ◄── data: {"type":"end"}  → es.close()                      emit end, thread kết thúc
```

### Từng bước, có dòng code

| # | Ở đâu | Chuyện gì xảy ra | Dữ liệu |
|---|---|---|---|
| 1 | `demo_ui.html` hàm `ask()` | User bấm nút / gõ câu hỏi → JS gửi `POST /run` | `{"question": "Mã lỗi thanh toán E205 nghĩa là gì?"}` |
| 2 | `demo_ui.py:150` `do_POST` | Tạo `run_id`, 2 hàng đợi (`events` để gửi bước lên web, `approval` để nhận nút Duyệt), mở **thread mới** chạy agent, trả ngay `run_id` (không chờ agent xong) | trả `{"run": "a1b2c3d4"}` |
| 3 | `demo_ui.html` `new EventSource(...)` → `demo_ui.py:133` `do_GET /events` | Trình duyệt mở kết nối **Server-Sent Events**; server giữ kết nối, lấy event từ hàng đợi nào thì đẩy lên ngay | mỗi event 1 dòng `data: {...}` |
| 4 | `demo_ui.py:99` `run_in_thread` | Tạo model, gắn `UITraceProcessor` (để nhận từng bước), gọi `run_agent` | `make_model("nus")` → `OpenAIChatCompletionsModel` |
| 5 | `agent_openai_sdk.py:186` `run_agent` | Dựng Session của user đăng nhập (`:201`), dựng Agent (`:202`), gọi `run_limited` (`:210`) | `me = Session("alice", "tenant-A", "support")` |
| 6 | `agent_openai_sdk.py:246` `Runner.run(...)` | **Từ đây SDK lo.** Chạy guardrail, rồi bắt đầu vòng lặp | input: agent, câu hỏi, `context=me`, `max_turns=8` |
| 7 | trong SDK — lượt 1 | SDK gửi cho LLM: system prompt + câu hỏi + schema `search_kb`, `create_ticket` | 2 message, 557 token vào |
| 8 | LLM trả về | Không trả lời, chỉ trả JSON "muốn gọi tool" | `search_kb {"query": "mã lỗi thanh toán E205", "tenant": null}` |
| 9 | SDK → `agent_openai_sdk.py:114` `search_kb` → `checkpoints.py:113` | SDK parse JSON, gọi hàm Python thật. Hàm lọc quyền, tra tài liệu (**R** của RAG, `checkpoints.py:146`), gói kết quả (`:164`) | trả `"<untrusted_search_results><document id='kb-a-002'>…E205 = ngân hàng từ chối…"` |
| 10 | trong SDK — lượt 2 | SDK gắn tool call + kết quả vào hội thoại (**A**), gửi lại LLM | 4 message, 794 token vào |
| 11 | LLM trả về | Lần này trả **text** (**G**), không có tool call → SDK dừng vòng lặp | `"E205 = ngân hàng từ chối (nguồn: kb-a-002)…"` |
| 12 | `agent_openai_sdk.py:224–227` | Lấy `result.final_output`, ghi token, đánh dấu task xong, trả câu trả lời | `answer` (str) |
| 13 | `demo_ui.py:107` | `emit({"type": "done", answer, usage, tickets})`, rồi `emit({"type": "end"})` | |
| 14 | `demo_ui.html` `es.onmessage` | `done` → hiện câu trả lời + "2 lượt gọi LLM · ticket: không có"; `end` → đóng kết nối | |

**Cột trace bên phải đến từ đâu?** Song song với bước 6–11: mỗi khi SDK xong 1 việc (guardrail, 1 lượt gọi LLM, 1 lần chạy tool), SDK gọi `UITraceProcessor.on_span_end` (`demo_ui.py:51`). Hàm đó đổi thành event dễ đọc (`"LLM chọn tool: search_kb"`, `"App chạy search_kb"`, `"LLM trả lời cuối"`) → `emit()` (`:42`) bỏ vào hàng đợi → bước 3 đẩy lên trình duyệt → JS `step(ev)` vẽ thêm 1 ô. Vì vậy ô trace hiện **ngay khi** từng bước xong, không đợi cả run.

### Nút ② (tạo ticket) khác ở đâu
Bước 1–10 giống hệt. Khác từ lượt 2:
- LLM trả tool call `create_ticket {"priority": "P3", "assignee": "billing-team-a", …}`.
- Trước khi chạy tool, SDK gọi `ticket_needs_approval` (`agent_openai_sdk.py:127`) → `True` → SDK **dừng run**, trả `RunResult` có `interruptions = [create_ticket…]`.
- `run_agent` thấy `result.interruptions` (`:211`) → `approve_and_continue` (`:249`) → `cp.ask_human` — trên web đã được thay bằng `ask_human_ui` (`demo_ui.py:84`): `emit({"type": "approval", args})` → trình duyệt hiện hộp **Duyệt / Từ chối** → **thread agent đứng chờ** hàng đợi `approval` (tối đa 5 phút).
- Bấm Duyệt → JS `POST /approve {"run", "ok": true}` → `do_POST` bỏ `True` vào hàng đợi `approval` → thread chạy tiếp: `state.approve(item)` (`:267`) → `run_limited(agent, state, me)` (`:271`) — SDK chạy tiếp **đúng chỗ dừng**: chạy `create_ticket` → `T-1001` → lượt 3 gọi LLM → trả lời cuối → bước 12–14.
- Bấm Từ chối → `state.reject(...)` → SDK báo LLM "người duyệt đã từ chối" → LLM trả lời không có ticket.

## 3. OpenAI Agents SDK — nối từ Session 2

### Session 2 đã có gì
Session 2 (`Session_02 – From use case to model API…pdf`, slide 11–14) dùng thư viện **`openai`** (TypeScript) gọi model **1 lần**:
```ts
const client = new OpenAI({ timeout: 20_000, maxRetries: 2 });
const resp = await client.responses.parse({ model, instructions: INSTRUCTIONS,
  input: `<email>\n${emailText}\n</email>`, text: { format: zodTextFormat(SupportRequest, "support_request") } });
// rồi decide(req) bằng code: route_to_queue / ask_customer / needs_review
```
1 request → 1 response → app kiểm tra. Bài tự học S2: "làm quen OpenAI SDK, từ basic call tới structured output".

### Agents SDK thêm gì
**OpenAI Agents SDK** (`pip install openai-agents`, import tên `agents`) là thư viện của OpenAI xây **trên** thư viện `openai`: vẫn dùng client đó để gọi model, nhưng tự lo phần **lặp nhiều lượt + chạy tool** mà S2 không có. Docs: https://openai.github.io/openai-agents-python/ (Python; có bản JS `@openai/agents`). Demo dùng Python bản `openai-agents==0.23.1`.

| Ý ở Session 2 | Ở demo Session 5 | Trong code |
|---|---|---|
| `new OpenAI({ timeout, maxRetries })` | Vẫn client `openai` — `AsyncOpenAI(api_key, base_url, timeout=60, max_retries=2)`, rồi bọc thành Model đưa cho SDK | `make_model()` |
| `instructions: INSTRUCTIONS` | `Agent(instructions=SYSTEM_PROMPT)` | `build_agent()` |
| `input: <email>…</email>` (đánh dấu là data) | Câu hỏi truyền vào `Runner.run(agent, question)`; kết quả tool gói trong `<untrusted_search_results>` | `run_limited()`, `checkpoints.search_kb` |
| Schema zod cho **output** | Schema cho **tham số tool** — SDK tự sinh từ kiểu Python (`query: str`) | `@function_tool` |
| `client.responses.parse(...)` — **1 lượt** | `Runner.run(...)` — **nhiều lượt**, SDK tự gọi model, chạy tool, gửi lại | `run_limited()` |
| `decide()`: rule nghiệp vụ trong code | Vẫn trong code: `checkpoints.py` kiểm tra trước khi tool chạy (Session 6–7) | `checkpoints.py` |
| Timeout, retry có giới hạn | Thêm giới hạn **cả vòng lặp**: `max_turns=8`, 120 giây | `run_limited()` |
| TypeScript | Python — chọn chung cho Session 5–9; SDK cũng có bản JS `@openai/agents` | — |

Câu nói khi dạy: *"Session 2: mình tự gọi model 1 lần rồi tự kiểm tra. Session 5: vẫn client đó, nhưng giao vòng lặp gọi–chạy tool–gọi lại cho SDK."*

### Load lên thế nào (theo thứ tự trong `agent_openai_sdk.py`)
1. **Cài**: `pip install -r requirements.txt` → `openai-agents` (kéo theo `openai`).
2. **Import**: `from agents import Agent, Runner, function_tool, …` và `from openai import AsyncOpenAI`.
3. **Key**: `load_config()` đọc `config/.nus-llm-gateway-config.json` (hoặc biến `NUS_LLM_API_KEY`). Không hardcode.
4. **Model** — `make_model("nus")`:
   - `AsyncOpenAI(base_url="https://llm.nustechnology.com/v1", …)`: gateway công ty tương thích API OpenAI, nên chỉ đổi `base_url`.
   - `OpenAIChatCompletionsModel(model="deepseek-v4.1-flash", openai_client=client)`: mặc định SDK dùng Responses API (chỉ OpenAI có); gateway chỉ hỗ trợ Chat Completions nên chọn class này. Với OpenAI thật chỉ cần `Agent(model="gpt-…")`.
   - `set_trace_processors([LocalTraceProcessor()])`: mặc định SDK gửi trace về dashboard OpenAI; demo ghi ra máy.
   - `MODEL_SETTINGS`: tắt cache của gateway để mỗi lần là model thật.
5. **Tools**: Python chạy tới `@function_tool` → SDK tạo object tool có tên, mô tả, schema.
6. **Agent**: `build_agent(model)` → object `Agent`. Đến đây **chưa gọi model lần nào**.

### Run thế nào
```python
result = await Runner.run(agent, "Mã lỗi thanh toán E205 nghĩa là gì?", context=me, max_turns=8)
print(result.final_output)
```
- `Runner.run` là hàm async (`await`); bản đồng bộ là `Runner.run_sync(...)`, bản stream là `Runner.run_streamed(...)`.
- Bên trong, mỗi lượt: SDK gửi instructions + hội thoại + schema tool cho model → model trả tool call thì SDK chạy hàm và lặp; trả text thì dừng (chi tiết dữ liệu thật ở mục 5, bước D).
- `result.final_output`: câu trả lời cuối · `result.context_wrapper.usage`: số lượt gọi + token · `result.interruptions`: tool đang chờ người duyệt (`needs_approval`).
- Lỗi SDK báo: `MaxTurnsExceeded` (quá 8 lượt), `InputGuardrailTripwireTriggered` (guardrail chặn) → `run_agent()` bắt và trả thông báo.
- Ai gọi: `demo_ui.py` (trang web) và `run_demo.py` (terminal) đều gọi `run_agent()` → `run_limited()` → `Runner.run`.

### Input / output từng hàm (giá trị in ra từ lần chạy thật 30/10)

Thứ tự gọi khi bấm nút ① trên trang demo:
```
demo_ui.py ──► run_agent(model, "alice", "Mã lỗi…E205…", KB_DOCS, (), "ui")
                 ├─ new_session("alice")                 → me (Session)
                 ├─ build_agent(model)                   → agent
                 └─ run_limited(agent, question, me)
                      └─ Runner.run(agent, question, context=me, max_turns=8)    ← SDK
                           ├─ gọi model (lượt 1)        → tool call search_kb
                           ├─ search_kb(ctx, query, tenant) → cp.search_kb(me, …) → chuỗi <untrusted_search_results>
                           └─ gọi model (lượt 2)        → câu trả lời cuối
                      → RunResult
                 → result.final_output (str) → hiện lên trang
```

| Hàm | Input (param truyền vào) | Output (trả ra) |
|---|---|---|
| `load_config(config_file, env_var)` | `".nus-llm-gateway-config.json"`, `"NUS_LLM_API_KEY"` | `dict` `{"api_key": "sk-…", "base_url": "https://llm.nustechnology.com/v1"}` |
| `make_model(provider, model_name=None)` | `"nus"` (khoá trong `PROVIDERS`); `model_name` bỏ trống → model mặc định | Object `OpenAIChatCompletionsModel`, `model="deepseek-v4.1-flash"`, client `timeout=60`. **Chưa gọi model.** |
| `@function_tool` trên `search_kb` | Hàm Python `search_kb(ctx, query: str, tenant: str \| None)` | Object `FunctionTool`: `name="search_kb"`, `description=SEARCH_KB_DESC`, `params_json_schema={"properties": {"query": {"type": "string"}, "tenant": {"anyOf": [{"type": "string"}, {"type": "null"}]}}, "required": ["query","tenant"], "additionalProperties": false}` — `ctx` không có trong schema |
| `build_agent(model)` | Output của `make_model` | Object `Agent`: `name="Support agent"`, `tools=["search_kb","create_ticket"]`, `instructions="Bạn là trợ lý cho nhân viên support…"`. **Chưa gọi model.** |
| `cp.new_session(session_user)` | `"alice"` (từ đăng nhập; danh sách ở `sample_data.USERS`) | `Session(name="alice", tenant="tenant-A", role="support", kb=<3 tài liệu>, disabled=set(), task=None)` |
| `Runner.run(agent, input, context, max_turns)` | `agent`; `input` = câu hỏi `"Mã lỗi thanh toán E205 nghĩa là gì?"`; `context=me` (Session); `max_turns=8` | `RunResult` (xem bảng dưới) |
| `search_kb(ctx, query, tenant)` — **model điền, SDK gọi** | `query="mã lỗi thanh toán E205"`, `tenant=None` (parse từ JSON tool call); `ctx.context` = `me` do SDK truyền | `str`: `<untrusted_search_results>\n<document id='kb-a-001'>Xử lý lỗi thanh toán thẻ: …</document>\n<document id='kb-a-002'>Danh sách mã lỗi…E205 = ngân hàng từ chối…</document>\n</untrusted_search_results>` → SDK gửi lại model |
| `create_ticket(ctx, title, priority, assignee)` — **model điền, SDK gọi sau khi duyệt** | `title="…E205…"`, `priority="P3"`, `assignee="billing-team-a"` | `'{"ticket_id": "T-1001", "status": "created"}'`. Điền sai (`"P2"`, `"billing team"`) → `"BỊ CHẶN bởi application: priority P2 không được tự tạo (chỉ ['P3', 'P4']); assignee 'billing team' không thuộc team hợp lệ […]"` → model đọc, tự sửa |
| `run_agent(model, session_user, question, kb, disabled, approve_mode)` | `model`, `"alice"`, câu hỏi, `KB_DOCS`, `()` (không tắt checkpoint), `"ui"` (hỏi duyệt trên web) | `str` câu trả lời cuối: `"**E205 = ngân hàng từ chối giao dịch** (nguồn: kb-a-002). Quy trình xử lý theo kb-a-001: …"` |

**`RunResult` — output của `Runner.run`** (lần chạy thật câu ①):

| Thuộc tính | Giá trị | Ý nghĩa |
|---|---|---|
| `final_output` | `"**E205 = ngân hàng từ chối giao dịch** (nguồn: kb-a-002)…"` | Câu trả lời cuối của model |
| `new_items` | `MessageOutputItem, ToolCallItem ×2, ToolCallOutputItem ×2, ReasoningItem, MessageOutputItem` | Từng bước của run: model gọi tool (lần này gọi `search_kb` 2 lần trong 1 lượt), kết quả tool, câu trả lời |
| `raw_responses` | 2 phần tử | 1 phần tử = 1 lượt gọi model |
| `context_wrapper.usage` | `requests=2, input_tokens=1442, output_tokens=246` | Số lượt gọi model + token (cộng mọi lượt) |
| `interruptions` | `[]` | Tool đang chờ người duyệt; câu ② sẽ có 1 phần tử `create_ticket` |
| `last_agent` | `Support agent` | Agent trả lời cuối |

Số token, số lần gọi tool thay đổi giữa các lần chạy — model không ổn định (Session 1–2).
Muốn tự xem lại: thêm `print(result.new_items)` ngay sau `Runner.run` trong `run_limited()`.

## 4. Bức tranh: sơ đồ slide 5 nằm ở đâu trong code

Slide 5 vẽ agent = **LLM** + **code app** chạy vòng lặp ①–④ với **tools**. Trong demo:

| Trên sơ đồ slide 5 | Trong code | Ai viết |
|---|---|---|
| LLM | Model `deepseek-v4.1-flash` qua gateway — `make_model()` (`agent_openai_sdk.py:66`) | Có sẵn |
| Tools | `search_kb`, `create_ticket` — hàm Python gắn `@function_tool` (`agent_openai_sdk.py:101–123`) | Mình viết |
| Code app — khai báo agent | `build_agent()` (`agent_openai_sdk.py:138`) | Mình viết (vài dòng) |
| Code app — **vòng lặp ①–④** | `Runner.run(...)` (`agent_openai_sdk.py:195`) | **SDK viết sẵn** |
| Code app — quyết định của application (quyền, duyệt…) | `checkpoints.py` | Mình viết — học ở các buổi sau |
| Ghi lại từng bước | Trace (`trace_local.py`, cột phải trang demo) | SDK sinh, mình chọn nơi ghi |

Ý chính khi giảng: **phần vòng lặp là SDK lo** (slide 19); mình chỉ khai báo tool + agent rồi gọi `Runner.run`.

### RAG nằm ở đâu
Không có file/hàm tên "rag" — RAG chia ra 3 chỗ:

| Chữ | Ở đâu | Câu E205 |
|---|---|---|
| **R – Retrieval** (tra tài liệu) | `checkpoints.search_kb()` + `relevant()`, dữ liệu `sample_data.KB_DOCS` (comment "RAG nằm ở đây" trong `checkpoints.py`) | Lọc theo quyền, giữ tài liệu chứa ≥2 từ của câu hỏi → `kb-a-001`, `kb-a-002` |
| **A – Augmented** (đưa vào ngữ cảnh) | Output của tool `search_kb` → SDK gắn vào hội thoại thành message `tool` | Lượt 2 gửi 4 message (có tài liệu) thay vì 2 |
| **G – Generation** (sinh câu trả lời) | Lượt gọi model cuối trong `Runner.run` | "E205 = ngân hàng từ chối (nguồn: kb-a-002)" |

- **Đơn giản hoá**: tra bằng từ khoá, không embedding/vector DB (Session 3–4 mới học).
- **Hai kiểu**: trong agent, tra tài liệu là *tool* — model tự quyết gọi. RAG cổ điển = code tự tra rồi nhét vào prompt, gọi model 1 lần: `compare_orchestration_levels.py` → `model_call()`. Câu E205 chỉ cần kiểu cổ điển là đủ → đúng ý "yêu cầu nào chỉ cần RAG" của đề cương.

## 5. Walkthrough từng bước

### Bước A — Tool: hàm Python bình thường + `@function_tool`

```python
@function_tool(description_override=cp.SEARCH_KB_DESC)
def search_kb(ctx: RunContextWrapper[cp.Session], query: str, tenant: str | None = None) -> str:
    return cp.search_kb(ctx.context, query, tenant)
```
(`agent_openai_sdk.py:101–108`; `create_ticket` ở dòng 117–123 viết y hệt.)

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
(`agent_openai_sdk.py:138–143`)

- `instructions` = system prompt (`checkpoints.py:31`): *"Bạn là trợ lý cho nhân viên support… Luôn dùng search_kb trước và trích id tài liệu làm nguồn. Chỉ tạo ticket khi user yêu cầu…"*
- `model` = LLM nào; `tools` = danh sách tool LLM được chọn.
- `input_guardrails` = kiểm tra câu hỏi trước khi gửi LLM (ở đây: chặn số thẻ). Chỉ cần nhắc tên — là concept Guardrail ở slide 19.

### Bước C — Run/runner: một dòng chạy cả vòng lặp

```python
await asyncio.wait_for(Runner.run(agent, run_input, context=me, max_turns=cp.MAX_TURNS), RUN_TIMEOUT_S)
```
(`agent_openai_sdk.py:195`)

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

## 6. Hai yêu cầu mẫu — vì sao một cái chỉ cần RAG, một cái cần agent

| Nút | Câu hỏi | Agent làm gì (chạy thật) | Kết luận |
|---|---|---|---|
| ① Chỉ cần RAG | "Mã lỗi thanh toán E205 nghĩa là gì?" | `search_kb` → trả lời. 2 lượt gọi LLM, không tạo ticket | Tra 1 lần rồi trả lời — **model call + RAG là đủ**, agent làm được nhưng thừa |
| ② Nhiều bước + tạo ticket | "Khách X báo lỗi thanh toán mã E205, xử lý sao? Tạo ticket cho billing team giúp tôi." | `search_kb` → LLM chọn `create_ticket` → **app dừng chờ duyệt** (hộp Duyệt/Từ chối) → Duyệt → T-1001 → LLM trả lời. 3 lượt gọi LLM | **Nhiều bước + hành động**. Nếu lúc nào cũng tạo ticket → workflow là đủ (slide 9); tạo hay không tuỳ kết quả tra → agent (slide 11) |

Ở ②, hay gặp: LLM đề xuất priority `P2` hoặc assignee `"billing team"` → ô tối "BỊ CHẶN bởi application" → LLM đọc lỗi, tự sửa `P3` / `billing-team-a`. Dùng để minh hoạ "LLM đề xuất, app quyết" (slide 22). Bấm **Từ chối** → không có ticket nào được tạo.

## 7. Câu hỏi hay gặp

| Câu hỏi | Trả lời ngắn |
|---|---|
| LLM có tự gọi API / chạy code không? | Không. LLM chỉ trả JSON "muốn gọi tool X với tham số Y" (bước D, ②). SDK/app mới chạy hàm. |
| LLM biết có những tool nào bằng cách nào? | SDK gửi kèm mô tả tool (tên, mô tả, tham số — bước A) trong mỗi lượt gọi. |
| Vì sao lượt sau tốn token hơn? | LLM không nhớ; app gửi lại toàn bộ hội thoại + kết quả tool mỗi lượt (2 → 4 message). |
| Ai quyết khi nào dừng? | LLM (trả lời không kèm tool call), nhưng code đặt giới hạn: `max_turns=8`, 120 giây. |
| Không dùng SDK có được không? | Được — tự viết vòng lặp gọi LLM / đọc tool call / chạy hàm / gửi lại (slide 19 cột trái). SDK viết sẵn phần đó. |
| Sao `search_kb` có tham số `tenant`? | Cố ý để lộ — lỗi thiết kế hay gặp; app bỏ qua giá trị LLM điền và dùng thông tin đăng nhập. Học ở Session 7. |
| Ai chặn khi LLM điền sai priority? | Code trong `checkpoints.py` (rule nghiệp vụ), không phải prompt. Học ở Session 6–7. |

## 8. File nào dùng cho Session 5

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
