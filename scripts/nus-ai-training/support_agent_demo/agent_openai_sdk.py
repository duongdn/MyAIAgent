"""
Support agent bằng OpenAI Agents SDK — cùng SDK với Session 5–9 của chương trình.
Chạy được với OpenAI hoặc bất kỳ provider tương thích OpenAI (DeepSeek...) — xem make_model().

Logic kiểm tra quyền nằm ở checkpoints.py (dùng chung). File này chỉ "nối dây" vào SDK:
    ① Session đi qua RunContextWrapper — model không thấy, không sửa được
    ④ needs_approval=<hàm>: SDK gọi TRƯỚC khi chạy tool → code kiểm tra trước
    ⑤ Lệnh hợp lệ → SDK dừng run, trả result.interruptions → hỏi người → state.approve/reject → chạy tiếp
"""
import json
import os
from pathlib import Path

from agents import (Agent, ModelSettings, OpenAIChatCompletionsModel, RunContextWrapper, Runner, function_tool,
                    set_tracing_disabled)
from openai import AsyncOpenAI

import checkpoints as cp


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
    path = Path(__file__).resolve().parents[3] / "config" / config_file
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
    if provider != "openai":
        # Tracing của SDK mặc định gửi về dashboard OpenAI → không có OpenAI key thì tắt
        set_tracing_disabled(True)
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


# ── Chạy agent ─────────────────────────────────────────────────────────────
async def run_agent(model, session_user, question, kb, disabled, approve_mode):
    me = cp.new_session(session_user, kb, disabled)
    agent = Agent(name="Support agent", instructions=cp.SYSTEM_PROMPT, model=model,
                  tools=[search_kb, create_ticket], model_settings=MODEL_SETTINGS)
    result = await Runner.run(agent, question, context=me, max_turns=cp.MAX_TURNS)

    # ⑤ Lệnh cần duyệt → SDK trả interruptions thay vì tự chạy
    while result.interruptions:
        state = result.to_state()
        for item in result.interruptions:
            args = json.loads(item.arguments or "{}")
            if cp.ask_human(me, args, approve_mode):
                state.approve(item)
            else:
                state.reject(item, rejection_message="Người duyệt đã từ chối.")
        result = await Runner.run(agent, state, context=me, max_turns=cp.MAX_TURNS)

    usage = result.context_wrapper.usage
    print(f"   💰 {usage.requests} lượt gọi model, {usage.input_tokens} input + {usage.output_tokens} output tokens")
    cp.LAST_USAGE.update(requests=usage.requests, input_tokens=usage.input_tokens, output_tokens=usage.output_tokens)
    return result.final_output
