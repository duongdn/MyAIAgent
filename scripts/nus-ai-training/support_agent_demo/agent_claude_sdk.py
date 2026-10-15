"""
Support agent bằng Claude Agent SDK — model Claude thật, chạy bằng tài khoản Claude Code đã đăng nhập
(không cần API key riêng).

Logic kiểm tra quyền nằm ở checkpoints.py (dùng chung với bản OpenAI SDK). File này chỉ "nối dây":
    ① Session giữ ở phía server (biến SESSION) — model không thấy, không sửa được
    ④ + ⑤ can_use_tool: SDK gọi TRƯỚC mỗi tool call không nằm trong allowed_tools (ở đây: create_ticket)
Tool được đăng ký như một MCP server chạy trong process (create_sdk_mcp_server).
"""
import warnings

from claude_agent_sdk import (AssistantMessage, ClaudeAgentOptions, ClaudeSDKClient, PermissionResultAllow,
                              PermissionResultDeny, ResultMessage, TextBlock, create_sdk_mcp_server, tool)

import checkpoints as cp
from task_state import TaskState

# search_kb cố ý được tự cho phép (read-only) nên không đi qua can_use_tool — SDK cảnh báo, ở đây là chủ ý.
warnings.filterwarnings("ignore", message="can_use_tool will not be invoked")

SESSION: cp.Session | None = None  # session của request hiện tại (web app thật: gắn theo request)


def text(s):
    return {"content": [{"type": "text", "text": s}]}


@tool("search_kb", cp.SEARCH_KB_DESC,
      {"type": "object", "properties": {"query": {"type": "string"}, "tenant": {"type": "string"}},
       "required": ["query"]})
async def search_kb(args):
    return text(cp.search_kb(SESSION, args["query"], args.get("tenant")))


@tool("create_ticket", cp.CREATE_TICKET_DESC, {"title": str, "priority": str, "assignee": str})
async def create_ticket(args):
    return text(cp.create_ticket(SESSION, args))


def make_permission_gate(approve_mode):
    async def can_use_tool(_tool_name, args, _context):
        errors = cp.check_ticket(SESSION, args)  # ④
        if errors:
            # Trả lý do cho model → model tự giải thích với user, không retry vô ích
            return PermissionResultDeny(message="BỊ CHẶN bởi application: " + "; ".join(errors))
        if cp.ask_human(SESSION, args, approve_mode):  # ⑤
            return PermissionResultAllow()
        return PermissionResultDeny(message="Người duyệt đã từ chối.")
    return can_use_tool


async def run_agent(model, session_user, question, kb, disabled, approve_mode, scenario=None, resume=None):
    global SESSION
    if resume or approve_mode == "later":
        raise SystemExit("--resume / --approve later chỉ có ở bản OpenAI Agents SDK (RunState)")
    SESSION = cp.new_session(session_user, kb, disabled, TaskState(session_user, question, scenario))
    options = ClaudeAgentOptions(
        model=model,
        system_prompt=cp.SYSTEM_PROMPT,
        tools=[],                       # tắt mọi tool có sẵn của Claude Code (Bash, Read, Edit...)
        mcp_servers={"support": create_sdk_mcp_server("support", tools=[search_kb, create_ticket])},
        allowed_tools=["mcp__support__search_kb"],  # đọc: tự cho phép. create_ticket: phải qua can_use_tool
        can_use_tool=make_permission_gate(approve_mode),
        setting_sources=[],             # không nạp CLAUDE.md / settings / hooks của máy → demo độc lập
        max_turns=cp.MAX_TURNS,
    )
    answer = ""
    async with ClaudeSDKClient(options=options) as client:
        await client.query(question)
        async for msg in client.receive_response():
            if isinstance(msg, AssistantMessage):
                answer += "".join(b.text for b in msg.content if isinstance(b, TextBlock))
            elif isinstance(msg, ResultMessage) and msg.total_cost_usd:
                print(f"   💰 {msg.num_turns} turns, ~${msg.total_cost_usd:.4f}")
    SESSION.task.finish(answer)
    return answer.strip()
