"""
Support agent bằng OpenAI Agents SDK — cùng SDK với Session 5–9 của chương trình.
Chạy được với OpenAI hoặc bất kỳ provider tương thích OpenAI (DeepSeek...) — xem make_model().

TỪ SESSION 2 ĐẾN SESSION 5 (đọc theo thứ tự trong file):
    Session 2 dùng thư viện `openai`: 1 lần gọi model = client.responses.parse(instructions, input, schema).
    Agents SDK (`pip install openai-agents`, import `agents`) xây TRÊN thư viện đó, thêm vòng lặp agent:
      1. Model   make_model()    — vẫn là client `openai` như S2 (key, base_url, timeout, retry), bọc thành Model
      2. Tool    @function_tool  — hàm Python → SDK tự sinh JSON schema (S2 tự viết schema bằng zod)
      3. Agent   build_agent()   — gom instructions + model + tools. Chỉ là khai báo, chưa gọi model
      4. Run     Runner.run()    — SDK gọi model, chạy tool, gửi kết quả lại… lặp tới câu trả lời cuối
      5. Trace   trace_local.py  — SDK ghi lại từng lượt gọi model / tool
    Phần ①–⑤ dưới đây là kiểm tra của application — học ở Session 6–8, Session 5 chỉ cần biết nó ở đâu.

Logic kiểm tra quyền nằm ở checkpoints.py (dùng chung). File này chỉ "nối dây" vào SDK:
    ① Session đi qua RunContextWrapper — model không thấy, không sửa được
    ④ needs_approval=<hàm>: SDK gọi TRƯỚC khi chạy tool → code kiểm tra trước
    ⑤ Lệnh hợp lệ → SDK dừng run, trả result.interruptions → hỏi người → state.approve/reject → chạy tiếp
       Chờ duyệt lâu: RunState.to_json() lưu vào task state (application) → --resume chạy tiếp sau
    Budget: max_turns (SDK) + MAX_TOOL_CALLS (checkpoints.py) + RUN_TIMEOUT_S (asyncio)
    Guardrail SDK: lọc nội dung đầu vào — KHÔNG phải authorization (quyền vẫn ở ①②④)
    Trace: trace_local.py ghi mọi span (model call, tool call, guardrail, lỗi) ra .traces/
"""
import asyncio
import json
import os
import re
from pathlib import Path

from agents import (Agent, GuardrailFunctionOutput, InputGuardrailTripwireTriggered, MaxTurnsExceeded,
                    ModelSettings, OpenAIChatCompletionsModel, RunContextWrapper, Runner, RunState, function_tool,
                    input_guardrail, set_trace_processors)
from openai import AsyncOpenAI

import checkpoints as cp
from task_state import RUN_TIMEOUT_S, TaskState
from trace_local import LocalTraceProcessor


# ── 1. Model: OpenAI hoặc provider tương thích OpenAI ──────────────────────
# Giống S2: tạo client `openai` (key + base_url + timeout + retry). Khác S2: không tự gọi client,
# mà đưa cho SDK — SDK sẽ gọi model mỗi lượt của vòng lặp.
PROVIDERS = {
    # name: (base_url mặc định, model mặc định, file config, biến môi trường chứa key)
    # nus = LLM gateway của công ty (tương thích OpenAI, có DeepSeek/Qwen/GLM/MiMo)
    "nus": ("https://llm.nustechnology.com/v1", "deepseek-v4.1-flash", ".nus-llm-gateway-config.json", "NUS_LLM_API_KEY"),
    "deepseek": ("https://api.deepseek.com", "deepseek-chat", ".deepseek-config.json", "DEEPSEEK_API_KEY"),
    "openai": (None, "gpt-4.1-mini", ".openai-config.json", "OPENAI_API_KEY"),
}


def load_config(config_file, env_var):
    """Đọc API key. Key lấy từ biến môi trường, hoặc config/<file>.json (gitignored) — không bao giờ hardcode.
    Input:
        config_file — tên file trong config/, vd ".nus-llm-gateway-config.json"
        env_var     — tên biến môi trường ưu tiên hơn file, vd "NUS_LLM_API_KEY"
    Output: dict, vd {"api_key": "sk-…", "base_url": "https://llm.nustechnology.com/v1"}
            (thiếu key → dừng chương trình, báo cần đặt key)
    """
    path = Path(__file__).resolve().parents[5] / "config" / config_file
    cfg = json.loads(path.read_text()) if path.exists() else {}
    if os.environ.get(env_var):
        cfg["api_key"] = os.environ[env_var]
    if not cfg.get("api_key"):
        raise SystemExit(f"Thiếu API key: đặt {env_var} hoặc tạo config/{config_file} với {{\"api_key\": \"...\"}}")
    return cfg


def make_model(provider, model_name=None):
    """Tạo Model cho SDK (client openai + tên model). CHƯA gọi model lần nào.
    Input:
        provider   — khoá trong PROVIDERS: "nus" (gateway công ty) | "deepseek" | "openai"
        model_name — tên model; None → model mặc định của provider, vd "deepseek-v4.1-flash"
    Output: OpenAIChatCompletionsModel(model="deepseek-v4.1-flash", client timeout=60s, retry 2)
            → đưa vào Agent(model=...); SDK dùng nó gọi model mỗi lượt của vòng lặp.
    """
    base_url, default_model, config_file, env_var = PROVIDERS[provider]
    cfg = load_config(config_file, env_var)
    # = `new OpenAI({ timeout: 20_000, maxRetries: 2 })` ở S2 slide 12. Async vì SDK chạy bất đồng bộ.
    # timeout/retry ở đây là cho TỪNG lượt gọi model; giới hạn cả lần chạy agent nằm ở run_limited().
    client = AsyncOpenAI(api_key=cfg["api_key"], base_url=cfg.get("base_url", base_url), timeout=60, max_retries=2)
    # TRACE: SDK tự tạo span cho mỗi bước (gọi LLM, chạy tool, guardrail) và gọi on_span_end() của MỌI
    # processor trong danh sách. Mặc định danh sách = processor gửi về dashboard OpenAI.
    # set_trace_processors THAY cả danh sách → chỉ còn LocalTraceProcessor ghi .traces/ (không lộ dữ liệu).
    # (demo_ui.py thêm UITraceProcessor bằng add_trace_processor SAU dòng này.)
    set_trace_processors([LocalTraceProcessor(verbose=os.environ.get("DEMO_TRACE") == "1")])
    # Chat Completions API: chuẩn chung mọi provider tương thích OpenAI hỗ trợ
    # (Responses API — mặc định của SDK — chỉ OpenAI có)
    return OpenAIChatCompletionsModel(model=model_name or default_model, openai_client=client)


def list_models(provider):
    """Hỏi provider có những model nào (dùng cho run_demo.py --compare).
    Input:
        provider — "nus" | "deepseek" | "openai"
    Output: list tên model, vd ["deepseek-v4.1-flash", "glm-5.3-flash", "qwen-3.7-flash", …]
    """
    from openai import OpenAI
    base_url, _, config_file, env_var = PROVIDERS[provider]
    cfg = load_config(config_file, env_var)
    client = OpenAI(api_key=cfg["api_key"], base_url=cfg.get("base_url", base_url))
    return sorted(m.id for m in client.models.list().data if m.id != "all-proxy-models")


# Gateway công ty (LiteLLM) CACHE câu trả lời: request giống hệt → trả kết quả cũ trong ~0.15s thay vì ~8s.
# Demo/eval tắt cache để mỗi lần chạy là model thật (DEMO_CACHE=1 để bật lại).
# Bài học vận hành: cache rất lợi về latency/cost, nhưng cache key phải gồm tenant/quyền — nếu không,
# công ty B có thể nhận câu trả lời đã cache của công ty A (OWASP LLM08).
MODEL_SETTINGS = ModelSettings(extra_body=None if os.environ.get("DEMO_CACHE") == "1" else {"cache": {"no-cache": True}})


# ── 2. Tools: chỉ gọi sang checkpoints.py ──────────────────────────────────
# @function_tool đọc tên hàm + kiểu tham số (query: str, tenant: str | None) → JSON schema gửi cho model.
# S2 viết schema cho OUTPUT (zod); ở đây schema cho THAM SỐ TOOL — model điền, app chạy.
# description_override = mô tả tool model đọc để quyết định có gọi hay không.
# RAG: tool này là bước Retrieval của RAG — model gọi, kết quả quay lại model để trả lời (xem checkpoints.py "RAG nằm ở đây")
@function_tool(description_override=cp.SEARCH_KB_DESC)
def search_kb(ctx: RunContextWrapper[cp.Session], query: str, tenant: str | None = None) -> str:
    """TOOL tra tài liệu. Model quyết định gọi; SDK parse JSON tool call rồi gọi hàm này.
    Input:
        ctx    — SDK tự truyền; ctx.context = Session của user (context=... lúc Runner.run). KHÔNG có trong schema gửi model
        query  — model điền, vd "mã lỗi thanh toán E205"
        tenant — model điền, thường None (cố ý để lộ — app bỏ qua, dùng tenant trong Session)
    Output: str, SDK gửi lại model làm message role "tool", vd
            "<untrusted_search_results>\n<document id='kb-a-002'>Danh sách mã lỗi…E205 = ngân hàng từ chối…</document>…"
    Sau @function_tool, tên search_kb là object FunctionTool (name, description, params_json_schema), không còn là hàm.
    """
    return cp.search_kb(ctx.context, query, tenant)  # ctx.context = Session (①), model không thấy


async def ticket_needs_approval(ctx: RunContextWrapper[cp.Session], args: dict, _call_id: str) -> bool:
    """SDK gọi TRƯỚC khi chạy create_ticket để hỏi: có cần người duyệt không (⑤).
    Input:
        ctx      — SDK truyền; ctx.context = Session
        args     — tham số model muốn gọi, vd {"title": "…E205…", "priority": "P3", "assignee": "billing-team-a"}
        _call_id — id của tool call (không dùng)
    Output: True  = tham số hợp lệ → SDK dừng run, trả result.interruptions để người duyệt
            False = sai rule (④) → không làm phiền người; tool chạy và tự trả "BỊ CHẶN…" cho model
    """
    return not cp.check_ticket(ctx.context, args)


@function_tool(description_override=cp.CREATE_TICKET_DESC, needs_approval=ticket_needs_approval)
def create_ticket(ctx: RunContextWrapper[cp.Session], title: str, priority: str, assignee: str) -> str:
    """TOOL tạo ticket. Chạy SAU khi người duyệt (needs_approval).
    Input:
        ctx      — SDK truyền; ctx.context = Session
        title    — model điền, vd "Khách X lỗi thanh toán E205"
        priority — model điền, vd "P3" (app chỉ cho P3/P4)
        assignee — model điền, vd "billing-team-a"
    Output: str gửi lại model: '{"ticket_id": "T-1001", "status": "created"}'
            hoặc "BỊ CHẶN bởi application: priority P2 không được tự tạo…" → model đọc lỗi, tự sửa tham số.
    """
    return cp.create_ticket(ctx.context, {"title": title, "priority": priority, "assignee": assignee})


# ── Guardrail SDK: lọc nội dung, không phân quyền ───────────────────────────
CARD_NUMBER = re.compile(r"\b(?:\d[ -]?){13,16}\b")


@input_guardrail(name="no_card_number")
async def no_card_number(_ctx, _agent, user_input) -> GuardrailFunctionOutput:
    """GUARDRAIL: chặn câu hỏi chứa số thẻ (PII) TRƯỚC khi gửi cho model. Chạy bằng code, không tốn model call.
    Input:
        _ctx, _agent — SDK truyền (không dùng)
        user_input   — câu hỏi của user, vd "Khách có thẻ 4111 1111 1111 1111 bị lỗi E205…"
    Output: GuardrailFunctionOutput(tripwire_triggered=True nếu có số thẻ)
            → True: SDK dừng ngay, ném InputGuardrailTripwireTriggered (run_agent bắt).
    """
    return GuardrailFunctionOutput(output_info=None, tripwire_triggered=bool(CARD_NUMBER.search(str(user_input))))


# ── 3. Agent definition ────────────────────────────────────────────────────
# instructions = system prompt (S2: INSTRUCTIONS). Câu hỏi user KHÔNG nằm ở đây — truyền lúc Runner.run.
def build_agent(model):
    """Khai báo agent. Chỉ là cấu hình, CHƯA gọi model.
    Input:
        model — output của make_model()
    Output: Agent(name="Support agent", instructions=SYSTEM_PROMPT, model=model,
                  tools=[search_kb, create_ticket], input_guardrails=[no_card_number]) → truyền vào Runner.run
    """
    return Agent(name="Support agent", instructions=cp.SYSTEM_PROMPT, model=model, tools=[search_kb, create_ticket],
                 model_settings=MODEL_SETTINGS, input_guardrails=[no_card_number])


# ── 4. Chạy agent ──────────────────────────────────────────────────────────
# S2: `await client.responses.parse(...)` = 1 lượt.  S5: `await Runner.run(agent, question)` = nhiều lượt:
#   gọi model → model trả tool call (JSON) → SDK chạy hàm tool → gắn kết quả vào hội thoại → gọi model lại
#   → … → model trả lời không kèm tool call → result.final_output.
async def run_agent(model, session_user, question, kb, disabled, approve_mode, scenario=None, resume=None):
    """Hàm demo_ui.py / run_demo.py gọi: dựng Session + Agent, chạy, xử lý duyệt và lỗi.
    Input:
        model        — output của make_model()
        session_user — user đăng nhập, vd "alice" (danh sách ở sample_data.USERS)
        question     — câu hỏi, vd "Mã lỗi thanh toán E205 nghĩa là gì?"
        kb           — danh sách tài liệu, thường sample_data.KB_DOCS
        disabled     — checkpoint bị tắt để demo hậu quả, vd () = không tắt gì (Session 7)
        approve_mode — cách hỏi người duyệt: "ui" (nút trên web) | "ask" (gõ y/n) | "yes" | "no" | "later" (lưu, dừng)
        scenario     — số kịch bản của run_demo.py, chỉ để ghi log; None nếu từ web
        resume       — TaskState đang AWAITING_APPROVAL (đọc từ .state/) → chạy tiếp thay vì chạy từ đầu
    Output: str — câu trả lời cuối, vd "**E205 = ngân hàng từ chối giao dịch** (nguồn: kb-a-002)…"
            hoặc thông báo: guardrail chặn / vượt giới hạn bước-thời gian / đang chờ duyệt.
    """
    task = resume or TaskState(user=session_user, question=question, scenario=scenario)
    me = cp.new_session(session_user, kb, disabled, task)
    agent = build_agent(model)
    print(f"   📌 task {task.task_id}: {task.status}")
    task.save()
    try:
        if resume:
            run_input = await RunState.from_json(agent, task.sdk_run_state, context_override=me)
            result = await approve_and_continue(agent, me, run_input, approve_mode)
        else:
            result = await run_limited(agent, question, me)
        while result and result.interruptions:
            result = await approve_and_continue(agent, me, result.to_state(), approve_mode)
    except InputGuardrailTripwireTriggered:
        task.set("ESCALATED", "guardrail_blocked")
        return "Câu hỏi chứa số thẻ — không gửi cho AI. Vui lòng xoá số thẻ và hỏi lại."
    except (MaxTurnsExceeded, asyncio.TimeoutError) as e:
        task.set("ESCALATED", f"budget: {type(e).__name__}")
        return "Agent vượt giới hạn bước/thời gian — đã chuyển người xử lý."
    if result is None:  # đang chờ duyệt, đã lưu state
        return f"Đang chờ người duyệt. Tiếp tục: python3 run_demo.py --resume {task.task_id} --approve yes"

    usage = result.context_wrapper.usage
    print(f"   💰 {usage.requests} lượt gọi model, {usage.input_tokens} input + {usage.output_tokens} output tokens")
    cp.LAST_USAGE.update(requests=usage.requests, input_tokens=usage.input_tokens, output_tokens=usage.output_tokens)
    answer = str(result.final_output or "")
    task.finish(answer)
    return answer


async def run_limited(agent, run_input, me):
    """Gọi Runner.run — CHẠY VÒNG LẶP AGENT — kèm giới hạn bước (max_turns=8) và thời gian (120s).
    Input:
        agent     — output của build_agent()
        run_input — câu hỏi (str), vd "Mã lỗi thanh toán E205 nghĩa là gì?"
                    hoặc RunState (khi chạy tiếp sau khi người duyệt)
        me        — Session của user (vd Session(name="alice", tenant="tenant-A", role="support")).
                    Truyền vào context=me: tool đọc qua ctx.context, model KHÔNG thấy
    Output: RunResult, vd với câu E205:
        .final_output          "**E205 = ngân hàng từ chối giao dịch** (nguồn: kb-a-002)…"
        .new_items             [ToolCallItem, ToolCallOutputItem, MessageOutputItem…] — từng bước của run
        .raw_responses         2 phần tử — 1 phần tử / lượt gọi model
        .context_wrapper.usage requests=2, input_tokens≈1400, output_tokens≈250
        .interruptions         [] — có phần tử khi create_ticket đang chờ duyệt
    Lỗi: MaxTurnsExceeded (quá 8 lượt), asyncio.TimeoutError (quá 120s) → run_agent bắt.
    """
    return await asyncio.wait_for(Runner.run(agent, run_input, context=me, max_turns=cp.MAX_TURNS), RUN_TIMEOUT_S)


async def approve_and_continue(agent, me, state, approve_mode):
    """⑤ SDK dừng ở interruption → lưu state, hỏi người, rồi chạy tiếp từ đúng chỗ dừng.
    Input:
        agent        — output của build_agent()
        me           — Session của user
        state        — RunState: result.to_state() của lần chạy vừa dừng (có tool chờ duyệt)
        approve_mode — "ui" | "ask" | "yes" | "no" | "later" (như run_agent)
    Output: RunResult của phần chạy tiếp (như run_limited)
            hoặc None nếu approve_mode="later" (đã lưu .state/, chờ --resume)
    """
    task = me.task
    for item in state.get_interruptions():
        args = json.loads(item.arguments or "{}")
        task.set("AWAITING_APPROVAL", "chờ người duyệt", pending_approval=args, sdk_run_state=state.to_json(context_serializer=lambda me: {"user": me.name}))
        # Session KHÔNG lưu trong state: khi resume, application dựng lại Session từ đăng nhập (①)
        if approve_mode == "later":
            return None  # dừng hẳn; task nằm trong .state/, server restart vẫn tiếp tục được
        if cp.ask_human(me, args, approve_mode):
            state.approve(item)
        else:
            state.reject(item, rejection_message="Người duyệt đã từ chối.")
    task.set("PROCESSING", None, pending_approval=None, sdk_run_state=None)
    return await run_limited(agent, state, me)
