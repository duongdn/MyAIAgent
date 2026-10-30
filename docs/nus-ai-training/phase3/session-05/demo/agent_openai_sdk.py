"""
Support agent bằng OpenAI Agents SDK — cùng SDK với Session 5–9 của chương trình.
Chạy được với OpenAI hoặc bất kỳ provider tương thích OpenAI (DeepSeek...) — xem make_model().

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


# ── Model: OpenAI hoặc provider tương thích OpenAI ─────────────────────────
PROVIDERS = {
    # name: (base_url mặc định, model mặc định, file config, biến môi trường chứa key)
    # nus = LLM gateway của công ty (tương thích OpenAI, có DeepSeek/Qwen/GLM/MiMo)
    "nus": ("https://llm.nustechnology.com/v1", "deepseek-v4.1-flash", ".nus-llm-gateway-config.json", "NUS_LLM_API_KEY"),
    "deepseek": ("https://api.deepseek.com", "deepseek-chat", ".deepseek-config.json", "DEEPSEEK_API_KEY"),
    "openai": (None, "gpt-4.1-mini", ".openai-config.json", "OPENAI_API_KEY"),
}


def load_config(config_file, env_var):
    """Key lấy từ biến môi trường, hoặc config/<file>.json (gitignored) — không bao giờ hardcode trong code.
    File config có thể ghi đè base_url: {"api_key": "...", "base_url": "..."}"""
    path = Path(__file__).resolve().parents[5] / "config" / config_file
    cfg = json.loads(path.read_text()) if path.exists() else {}
    if os.environ.get(env_var):
        cfg["api_key"] = os.environ[env_var]
    if not cfg.get("api_key"):
        raise SystemExit(f"Thiếu API key: đặt {env_var} hoặc tạo config/{config_file} với {{\"api_key\": \"...\"}}")
    return cfg


def make_model(provider, model_name=None):
    base_url, default_model, config_file, env_var = PROVIDERS[provider]
    cfg = load_config(config_file, env_var)
    client = AsyncOpenAI(api_key=cfg["api_key"], base_url=cfg.get("base_url", base_url))
    # Trace mặc định gửi về dashboard OpenAI → thay bằng processor ghi file local (không lộ dữ liệu ra ngoài)
    set_trace_processors([LocalTraceProcessor(verbose=os.environ.get("DEMO_TRACE") == "1")])
    # Chat Completions API: chuẩn chung mọi provider tương thích OpenAI hỗ trợ
    # (Responses API — mặc định của SDK — chỉ OpenAI có)
    return OpenAIChatCompletionsModel(model=model_name or default_model, openai_client=client)


def list_models(provider):
    """Danh sách model provider cung cấp (endpoint /models chuẩn OpenAI). Bỏ alias gom nhóm của gateway."""
    from openai import OpenAI
    base_url, _, config_file, env_var = PROVIDERS[provider]
    cfg = load_config(config_file, env_var)
    client = OpenAI(api_key=cfg["api_key"], base_url=cfg.get("base_url", base_url))
    return sorted(m.id for m in client.models.list().data if m.id != "all-proxy-models")


# Gateway công ty (LiteLLM) CACHE câu trả lời: request giống hệt → trả kết quả cũ trong ~0.15s thay vì ~8s.
# Demo/eval tắt cache để mỗi lần chạy là model thật (DEMO_CACHE=1 để bật lại).
# Bài học vận hành: cache rất lợi về latency/cost, nhưng cache key phải gồm tenant/quyền (OWASP LLM08).
MODEL_SETTINGS = ModelSettings(extra_body=None if os.environ.get("DEMO_CACHE") == "1" else {"cache": {"no-cache": True}})


# ── Tools: chỉ gọi sang checkpoints.py ─────────────────────────────────────
@function_tool(description_override=cp.SEARCH_KB_DESC)
def search_kb(ctx: RunContextWrapper[cp.Session], query: str, tenant: str | None = None) -> str:
    return cp.search_kb(ctx.context, query, tenant)  # ctx.context = Session (①), model không thấy


async def ticket_needs_approval(ctx: RunContextWrapper[cp.Session], args: dict, _call_id: str) -> bool:
    """SDK gọi TRƯỚC khi chạy create_ticket. True = dừng để người duyệt (⑤).
    Lệnh sai rule (④) → False: không làm phiền người, tool tự trả lỗi bị chặn."""
    return not cp.check_ticket(ctx.context, args)


@function_tool(description_override=cp.CREATE_TICKET_DESC, needs_approval=ticket_needs_approval)
def create_ticket(ctx: RunContextWrapper[cp.Session], title: str, priority: str, assignee: str) -> str:
    return cp.create_ticket(ctx.context, {"title": title, "priority": priority, "assignee": assignee})


# ── Guardrail SDK: lọc nội dung, không phân quyền ───────────────────────────
CARD_NUMBER = re.compile(r"\b(?:\d[ -]?){13,16}\b")


@input_guardrail(name="no_card_number")
async def no_card_number(_ctx, _agent, user_input) -> GuardrailFunctionOutput:
    """Chặn câu hỏi chứa số thẻ (PII) TRƯỚC khi gửi cho model. Chạy bằng code, không tốn model call."""
    return GuardrailFunctionOutput(output_info=None, tripwire_triggered=bool(CARD_NUMBER.search(str(user_input))))


def build_agent(model):
    return Agent(name="Support agent", instructions=cp.SYSTEM_PROMPT, model=model, tools=[search_kb, create_ticket],
                 model_settings=MODEL_SETTINGS, input_guardrails=[no_card_number])


# ── Chạy agent ─────────────────────────────────────────────────────────────
async def run_agent(model, session_user, question, kb, disabled, approve_mode, scenario=None, resume=None):
    """resume = TaskState đang AWAITING_APPROVAL (đọc từ .state/) → tiếp tục run đã lưu thay vì chạy lại từ đầu."""
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
    """Mọi lần chạy đều có giới hạn bước (max_turns) và thời gian (RUN_TIMEOUT_S)."""
    return await asyncio.wait_for(Runner.run(agent, run_input, context=me, max_turns=cp.MAX_TURNS), RUN_TIMEOUT_S)


async def approve_and_continue(agent, me, state, approve_mode):
    """⑤ SDK dừng ở interruption → application lưu state, hỏi người, rồi chạy tiếp từ đúng chỗ dừng."""
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
