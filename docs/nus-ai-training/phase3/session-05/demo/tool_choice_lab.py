"""
Thí nghiệm Session 5: model "biết" gọi tool nhờ đâu?
Gọi thẳng Chat Completions API (KHÔNG qua Agents SDK) — 1 request, 1 response, không chạy tool nào.
Đổi tên / mô tả / tham số tool, system prompt, câu hỏi → chạy lại → xem model chọn gì.

    python3 tool_choice_lab.py                 # chạy cả 7 thí nghiệm có sẵn, mỗi cái 3 lần
    trang web: python3 demo_ui.py → http://localhost:8000/lab  (sửa tool trực tiếp)
"""
import asyncio
import json
import os

from openai import AsyncOpenAI

import agent_openai_sdk as sdk

QUESTION = "Mã lỗi thanh toán E205 nghĩa là gì?"
# System prompt KHÔNG nhắc tên tool nào → model chỉ dựa vào danh sách tool để chọn
SYSTEM = "Bạn là trợ lý cho nhân viên support. Trả lời bằng tiếng Việt, ngắn gọn."


def tool(name, description, params):
    """Định nghĩa 1 tool đúng định dạng API (giống JSON SDK sinh từ @function_tool).
    Input:  name="search_kb", description="Tìm tài liệu…", params={"query": "string"}
    Output: {"type": "function", "function": {"name", "description", "parameters": {JSON schema}}}
    """
    return {"type": "function", "function": {
        "name": name, "description": description,
        "parameters": {"type": "object", "properties": {k: {"type": t} for k, t in params.items()},
                       "required": list(params)}}}


KB = "Tìm tài liệu trong knowledge base của team support."
PIZZA = tool("dat_pizza", "Đặt pizza giao tận nơi.", {"so_luong": "integer", "dia_chi": "string"})
PRESETS = {  # tên thí nghiệm → danh sách tool gửi kèm request
    "1. Không có tool nào": [],
    "2. search_kb(query) + mô tả đúng": [tool("search_kb", KB, {"query": "string"})],
    "3. Đổi tên thành xyz, giữ mô tả": [tool("xyz", KB, {"query": "string"})],
    "4. Tên search_kb nhưng mô tả 'Đặt pizza'": [tool("search_kb", "Đặt pizza giao tận nơi.", {"query": "string"})],
    "5. xyz(query), không mô tả": [tool("xyz", "", {"query": "string"})],
    "6. Chỉ có dat_pizza(so_luong, dia_chi)": [PIZZA],
    "7. dat_pizza + search_kb": [PIZZA, tool("search_kb", KB, {"query": "string"})],
}


def build_request(question, system, tools):
    """Đúng body JSON app gửi lên API — model chỉ thấy đúng chừng này.
    Input:  question, system (str), tools (list như PRESETS)
    Output: {"model": "deepseek-v4.1-flash", "messages": [system, user], "tools": [...]}
    """
    body = {"model": sdk.DEFAULT_MODEL,
            "messages": [{"role": "system", "content": system}, {"role": "user", "content": question}]}
    if tools:
        body["tools"] = tools
    return body


async def run(question=QUESTION, system=SYSTEM, tools=(), runs=3):
    """Gửi cùng 1 request `runs` lần (song song), trả request + từng response.
    Output: {"request": {...}, "results": [{"choice": "gọi search_kb" | "trả lời luôn",
             "tool_calls": [{"name", "arguments"}], "content": str|None, "reasoning_content": str|None}, …]}
    """
    # Client openai riêng (như Session 2), trỏ gateway công ty; key từ biến môi trường / config/ — không hardcode.
    # Không dùng make_model() vì hàm đó đổi trace processor của SDK (ảnh hưởng trang agent đang chạy song song).
    api_key = os.environ.get("NUS_LLM_API_KEY") or json.loads(sdk.CONFIG_FILE.read_text())["api_key"]
    client = AsyncOpenAI(api_key=api_key, base_url=sdk.GATEWAY_URL, timeout=60, max_retries=2)
    body = build_request(question, system, list(tools))

    async def once():
        r = await client.chat.completions.create(**body, extra_body={"cache": {"no-cache": True}})
        msg = r.choices[0].message
        calls = [{"name": t.function.name, "arguments": t.function.arguments} for t in (msg.tool_calls or [])]
        return {"choice": ("gọi " + ", ".join(c["name"] for c in calls)) if calls else "trả lời luôn",
                "tool_calls": calls, "content": msg.content,
                "reasoning_content": (msg.model_extra or {}).get("reasoning_content")}

    return {"request": body, "results": await asyncio.gather(*[once() for _ in range(runs)])}


async def main():
    print(f"Câu hỏi: {QUESTION}\nSystem prompt (không nhắc tool nào): {SYSTEM}\n")
    for name, tools in PRESETS.items():
        out = await run(tools=tools)
        print(f"{name:<45} → {[r['choice'] for r in out['results']]}")
    print("\nXem nguyên request/response: trang /lab của demo_ui.py")


if __name__ == "__main__":
    asyncio.run(main())
