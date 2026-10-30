"""
Support agent tối thiểu bằng OpenAI Agents SDK — demo Session 5.

TỪ SESSION 2 ĐẾN SESSION 5 (đọc theo thứ tự trong file):
    Session 2 dùng thư viện `openai`: 1 lần gọi model = client.responses.parse(instructions, input, schema).
    Agents SDK (`pip install openai-agents`, import `agents`) xây TRÊN thư viện đó, thêm vòng lặp agent:
      1. Model   make_model()    — vẫn là client `openai` như S2 (key, base_url, timeout, retry), bọc thành Model
      2. Tools   @function_tool  — hàm Python → SDK tự sinh JSON schema (S2 tự viết schema bằng zod)
      3. Agent   build_agent()   — gom instructions + model + tools. Chỉ là khai báo, chưa gọi model
      4. Run     run_agent()     — Runner.run: SDK gọi model, chạy tool, gửi kết quả lại… tới câu trả lời cuối
      5. Trace   trace_local.py  — SDK ghi lại từng lượt gọi model / tool
"""
import asyncio
import json
import os
import re
from pathlib import Path

from agents import (Agent, GuardrailFunctionOutput, InputGuardrailTripwireTriggered, MaxTurnsExceeded,
                    ModelSettings, OpenAIChatCompletionsModel, Runner, function_tool, input_guardrail,
                    set_trace_processors)
from openai import AsyncOpenAI

from sample_data import KB_DOCS
from trace_local import LocalTraceProcessor

GATEWAY_URL = "https://llm.nustechnology.com/v1"  # LLM gateway công ty, tương thích API OpenAI
DEFAULT_MODEL = "deepseek-v4.1-flash"
CONFIG_FILE = Path(__file__).resolve().parents[5] / "config" / ".nus-llm-gateway-config.json"  # gitignored
MAX_TURNS = 8        # tối đa 8 lượt gọi LLM / lần chạy → agent không lặp vô hạn
RUN_TIMEOUT_S = 120  # tối đa 120 giây / lần chạy
TICKETS = []         # "hệ thống ticket" của demo: ticket đã tạo nằm trong list này

SYSTEM_PROMPT = (
    "Bạn là trợ lý cho nhân viên support. Trả lời bằng tiếng Việt, ngắn gọn. "
    "Luôn dùng search_kb trước và trích id tài liệu làm nguồn. Chỉ tạo ticket khi user yêu cầu."
)


# ── 1. Model ───────────────────────────────────────────────────────────────
# Giống S2: tạo client `openai`. Khác S2: không tự gọi client, mà đưa cho SDK — SDK gọi model mỗi lượt.
def make_model(model_name=None):
    """Tạo Model cho SDK. CHƯA gọi model lần nào.
    Input:
        model_name — tên model trên gateway; None → "deepseek-v4.1-flash" (hoặc biến DEMO_MODEL)
    Output: OpenAIChatCompletionsModel(model="deepseek-v4.1-flash") → đưa vào Agent(model=...)
    """
    # Key lấy từ biến môi trường hoặc config/ (gitignored) — không bao giờ hardcode trong code
    api_key = os.environ.get("NUS_LLM_API_KEY") or json.loads(CONFIG_FILE.read_text())["api_key"]
    # = `new OpenAI({ timeout: 20_000, maxRetries: 2 })` ở S2 slide 12. Async vì SDK chạy bất đồng bộ.
    client = AsyncOpenAI(api_key=api_key, base_url=GATEWAY_URL, timeout=60, max_retries=2)
    # TRACE: SDK tự tạo span cho mỗi bước và gọi on_span_end() của MỌI processor trong danh sách.
    # Mặc định danh sách = processor gửi về dashboard OpenAI → set_trace_processors THAY cả danh sách,
    # chỉ còn LocalTraceProcessor ghi .traces/ trên máy. (demo_ui.py THÊM processor của trang web sau dòng này.)
    set_trace_processors([LocalTraceProcessor(verbose=os.environ.get("DEMO_TRACE") == "1")])
    # Gateway chỉ hỗ trợ Chat Completions API (Responses API — mặc định của SDK — chỉ OpenAI có)
    return OpenAIChatCompletionsModel(model=model_name or os.environ.get("DEMO_MODEL") or DEFAULT_MODEL,
                                      openai_client=client)


# Gateway CACHE câu trả lời giống hệt → tắt để mỗi lần chạy là model thật
MODEL_SETTINGS = ModelSettings(extra_body={"cache": {"no-cache": True}})


# ── 2. Tools ───────────────────────────────────────────────────────────────
# @function_tool đọc tên hàm + docstring + kiểu tham số → JSON schema gửi cho LLM.
# LLM chỉ thấy schema đó (tên, mô tả, tham số), không thấy code bên trong.
def find_docs(query):
    """RAG — bước R (Retrieval): tìm tài liệu chứa ≥2 từ (≥3 ký tự) của câu tra.
    Đơn giản hoá: so từ khoá. Hệ thống thật: embedding + vector search (Session 3–4).
    Input:
        query — vd "mã lỗi thanh toán E205"
    Output: list tài liệu, vd [{"id": "kb-001", …}, {"id": "kb-002", "title": "Danh sách mã lỗi…", …}]
    """
    words = {w for w in query.lower().replace(",", " ").split() if len(w) >= 3}
    return [d for d in KB_DOCS if sum(w in (d["title"] + " " + d["content"]).lower() for w in words) >= 2]


@function_tool
def search_kb(query: str) -> str:
    """Tìm tài liệu trong knowledge base của team support.

    Args:
        query: nội dung cần tra, vd "mã lỗi E205".
    """
    # ↑ docstring = mô tả tool LLM đọc. Phần dưới LLM không thấy.
    # Input : query do LLM điền, vd "mã lỗi thanh toán E205" (SDK parse từ JSON tool call)
    # Output: chuỗi tài liệu → SDK gửi lại LLM làm message "tool" = bước A (Augmented) của RAG
    docs = find_docs(query)
    print(f"   🔧 search_kb({query!r}) → {[d['id'] for d in docs] or 'không có tài liệu'}")
    return "\n".join(f"[{d['id']}] {d['title']}: {d['content']}" for d in docs) or "Không tìm thấy tài liệu."


@function_tool(needs_approval=True)  # needs_approval: SDK DỪNG trước khi chạy tool này, chờ người duyệt
def create_ticket(title: str, priority: str, assignee: str) -> str:
    """Tạo ticket hỗ trợ.

    Args:
        title: tiêu đề ngắn.
        priority: P1 (khẩn cấp) đến P4 (thấp).
        assignee: team nhận ticket, vd "billing-team".
    """
    # Input : LLM điền, vd title="Khách X lỗi E205", priority="P3", assignee="billing-team"
    # Output: '{"ticket_id": "T-1001", "status": "created"}' → SDK gửi lại LLM
    ticket_id = f"T-{1001 + len(TICKETS)}"
    TICKETS.append({"id": ticket_id, "title": title, "priority": priority, "assignee": assignee})
    return json.dumps({"ticket_id": ticket_id, "status": "created"})


# Guardrail: code kiểm tra câu hỏi TRƯỚC khi gửi LLM (concept Guardrail, slide 19)
CARD_NUMBER = re.compile(r"\b(?:\d[ -]?){13,16}\b")


@input_guardrail(name="no_card_number")
async def no_card_number(_ctx, _agent, user_input) -> GuardrailFunctionOutput:
    """Input : câu hỏi của user. Output: tripwire_triggered=True nếu có số thẻ → SDK dừng, không gửi LLM."""
    return GuardrailFunctionOutput(output_info=None, tripwire_triggered=bool(CARD_NUMBER.search(str(user_input))))


# ── 3. Agent definition ────────────────────────────────────────────────────
def build_agent(model):
    """Khai báo agent. Chỉ là cấu hình, CHƯA gọi model.
    Input:
        model — output của make_model()
    Output: Agent(name="Support agent", instructions=SYSTEM_PROMPT, tools=[search_kb, create_ticket], …)
    """
    return Agent(name="Support agent", instructions=SYSTEM_PROMPT, model=model, tools=[search_kb, create_ticket],
                 model_settings=MODEL_SETTINGS, input_guardrails=[no_card_number])


# ── 4. Run ─────────────────────────────────────────────────────────────────
# S2: `await client.responses.parse(...)` = 1 lượt.  S5: `await Runner.run(agent, question)` = nhiều lượt:
#   gọi LLM → LLM trả tool call (JSON) → SDK chạy hàm tool → gắn kết quả vào hội thoại → gọi LLM lại
#   → … → LLM trả lời không kèm tool call → result.final_output.
async def run_agent(model, question, ask_human):
    """Chạy agent cho 1 câu hỏi. demo_ui.py (trang web) và run_demo.py (terminal) đều gọi hàm này.
    Input:
        model     — output của make_model()
        question  — câu hỏi, vd "Mã lỗi thanh toán E205 nghĩa là gì?"
        ask_human — hàm hỏi người duyệt: ask_human(tool_name, args) → True/False
                    (web: hiện nút Duyệt/Từ chối; terminal: --approve yes|no)
    Output: (answer, usage)
        answer — str câu trả lời cuối, vd "**E205 = ngân hàng từ chối** (nguồn: kb-002)…"
        usage  — dict {"requests": 2, "input_tokens": 1351, "output_tokens": 180} (cộng mọi lượt gọi LLM)
    """
    agent = build_agent(model)
    try:
        # RunResult: .final_output (câu trả lời), .new_items (các bước), .raw_responses (1 phần tử / lượt LLM),
        #            .context_wrapper.usage (token), .interruptions (tool đang chờ duyệt)
        result = await asyncio.wait_for(Runner.run(agent, question, max_turns=MAX_TURNS), RUN_TIMEOUT_S)
        while result.interruptions:  # SDK dừng vì create_ticket cần duyệt (needs_approval=True)
            state = result.to_state()  # trạng thái run tại chỗ dừng
            for item in result.interruptions:
                if ask_human(item.name, json.loads(item.arguments or "{}")):
                    state.approve(item)
                else:
                    state.reject(item, rejection_message="Người duyệt đã từ chối.")
            # chạy TIẾP từ đúng chỗ dừng (không gọi lại từ đầu)
            result = await asyncio.wait_for(Runner.run(agent, state, max_turns=MAX_TURNS), RUN_TIMEOUT_S)
    except InputGuardrailTripwireTriggered:
        return "Câu hỏi chứa số thẻ — không gửi cho AI. Vui lòng xoá số thẻ và hỏi lại.", {}
    except (MaxTurnsExceeded, asyncio.TimeoutError):
        return "Agent vượt giới hạn bước/thời gian — dừng lại.", {}
    u = result.context_wrapper.usage
    usage = {"requests": u.requests, "input_tokens": u.input_tokens, "output_tokens": u.output_tokens}
    return str(result.final_output or ""), usage
