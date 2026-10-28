"""
Session 5 · slide 5: "LLM chọn tool" nghĩa là gì — in NGUYÊN VĂN thứ LLM trả về, không qua SDK.
Code tự viết vòng lặp ①–④ bằng chat completions thuần (đúng sơ đồ slide 5):
    ① code gửi câu hỏi + danh sách tool → ② LLM trả về tool_calls (chỉ là JSON) → ③ code chạy hàm thật
    → ④ code gửi kết quả lại → LLM trả tool_calls tiếp hoặc câu trả lời cuối.

Chạy: python3 show_raw_tool_call.py ["câu hỏi"]
"""
import asyncio
import json
import sys

import agent_openai_sdk as sdk
from sample_data import KB_DOCS

TOOLS = [{"type": "function", "function": {
    "name": "search_kb", "description": "Tìm tài liệu hướng dẫn nội bộ về lỗi, quy trình hỗ trợ.",
    "parameters": {"type": "object", "properties": {"query": {"type": "string"}}, "required": ["query"]}}}]


def search_kb(query):
    """Hàm thật do CODE chạy — LLM không bao giờ tự chạy được hàm này."""
    words = [w for w in query.lower().split() if len(w) > 2]
    hits = [d for d in KB_DOCS if d["tenant"] == "tenant-A" and any(w in (d["title"] + d["content"]).lower() for w in words)]
    return "\n".join(f"[{d['id']}] {d['content']}" for d in hits) or "Không tìm thấy."


async def main():
    question = sys.argv[1] if len(sys.argv) > 1 else "Khách báo lỗi thanh toán mã E205, xử lý sao?"
    model = sdk.make_model("nus", None)
    client, extra = model._client, sdk.MODEL_SETTINGS.extra_body or {}
    messages = [{"role": "user", "content": question}]
    for turn in range(1, 6):  # giới hạn số lượt — điều kiện dừng do CODE đặt
        print(f"\n① [CODE → LLM] lượt {turn}: gửi {len(messages)} message + mô tả tool search_kb")
        r = await client.chat.completions.create(model=model.model, messages=messages, tools=TOOLS, extra_body=extra)
        msg = r.choices[0].message
        if not msg.tool_calls:
            print("② [LLM → CODE] không gọi tool nữa, trả lời cuối:\n   " + (msg.content or "").strip()[:400])
            return
        for tc in msg.tool_calls:
            print(f"② [LLM → CODE] LLM chỉ VIẾT ra JSON: {json.dumps({'name': tc.function.name, 'arguments': tc.function.arguments}, ensure_ascii=False)}")
        messages.append(msg.model_dump(exclude_none=True))
        for tc in msg.tool_calls:
            result = search_kb(**json.loads(tc.function.arguments))
            print(f"③ [CODE] chạy hàm thật search_kb(...) → {result[:120]}")
            print("④ [CODE → LLM] gửi kết quả lại ở lượt sau")
            messages.append({"role": "tool", "tool_call_id": tc.id, "content": result})
    print("Dừng: chạm giới hạn 5 lượt (code quyết định).")


if __name__ == "__main__":
    asyncio.run(main())
