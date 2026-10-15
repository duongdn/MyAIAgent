"""
Session 5: cùng MỘT yêu cầu support, chạy ở 3 mức điều phối, đo thật số lượt gọi model / token / thời gian.
    1. Model call + RAG : code tra KB, gọi model 1 lần để trả lời. Không tạo ticket được.
    2. Workflow         : code viết sẵn các bước: phân loại (LLM) → tra KB → trả lời (LLM) → tạo ticket bằng code.
    3. Agent            : model tự chọn gọi search_kb / create_ticket (agent_openai_sdk.py, người duyệt = yes).

Chạy: python3 compare_orchestration_levels.py [--runs 3]
"""
import argparse
import asyncio
import json
import os
import time

import agent_openai_sdk as sdk
import checkpoints as cp
import ticket_system as ts
from sample_data import KB_DOCS

REQUESTS = {
    # bước biết trước: luôn tạo ticket
    "always": "Khách X báo lỗi thanh toán mã E205, xử lý sao? Tạo ticket cho billing team giúp tôi.",
    # bước phụ thuộc kết quả tra: E205 = ngân hàng từ chối (kb-a-002) → ĐÚNG là KHÔNG tạo ticket
    "conditional": ("Khách X báo lỗi thanh toán mã E205. Nếu là lỗi phía hệ thống mình thì tạo ticket cho billing team; "
                    "nếu là do ngân hàng thì chỉ hướng dẫn khách, không tạo ticket."),
}
QUESTION = REQUESTS["always"]
EXTRA = sdk.MODEL_SETTINGS.extra_body or {}


def client_and_model():
    m = sdk.make_model(os.environ.get("DEMO_PROVIDER", "nus"), os.environ.get("DEMO_MODEL"))
    return m._client, m.model


async def chat(client, model, prompt, usage):
    r = await client.chat.completions.create(model=model, messages=[{"role": "user", "content": prompt}], extra_body=EXTRA)
    usage["calls"] += 1
    usage["tokens"] += r.usage.prompt_tokens + r.usage.completion_tokens
    return r.choices[0].message.content


def kb_text():
    me = cp.new_session("alice", KB_DOCS)
    return cp.search_kb(me, "lỗi thanh toán mã E205")


async def model_call(client, model, usage):
    return await chat(client, model, f"Tài liệu:\n{kb_text()}\n\nTrả lời ngắn, có nguồn: {QUESTION}", usage)


async def workflow(client, model, usage):
    intent = await chat(client, model, 'Trả JSON {"need_ticket": true|false}. Yêu cầu: ' + QUESTION, usage)
    answer = await chat(client, model, f"Tài liệu:\n{kb_text()}\n\nTrả lời ngắn, có nguồn: {QUESTION}", usage)
    if "true" in intent.lower():  # bước cố định, tham số do CODE quyết định
        ts.create({"title": "Lỗi thanh toán E205", "priority": "P3", "assignee": "billing-team-a"}, None)
    return answer


async def agent(_client, _model, usage):
    ans = await sdk.run_agent(sdk.make_model(os.environ.get("DEMO_PROVIDER", "nus"), os.environ.get("DEMO_MODEL")),
                              "alice", QUESTION, KB_DOCS, (), "yes")
    usage["calls"] += cp.LAST_USAGE["requests"]
    usage["tokens"] += cp.LAST_USAGE["input_tokens"] + cp.LAST_USAGE["output_tokens"]
    return ans


async def main():
    p = argparse.ArgumentParser()
    p.add_argument("--runs", type=int, default=3)
    p.add_argument("--request", choices=REQUESTS, default="always")
    a = p.parse_args()
    global QUESTION
    QUESTION = REQUESTS[a.request]
    client, model = client_and_model()
    rows = []
    for name, fn in [("Model call + RAG", model_call), ("Workflow", workflow), ("Agent", agent)]:
        tot = {"calls": 0, "tokens": 0, "secs": 0.0, "tickets": 0}
        for _ in range(a.runs):
            ts.reset()
            usage = {"calls": 0, "tokens": 0}
            t0 = time.time()
            await fn(client, model, usage)
            tot["secs"] += time.time() - t0
            tot["calls"] += usage["calls"]; tot["tokens"] += usage["tokens"]; tot["tickets"] += len(ts.TICKETS)
        rows.append({"level": name, **{k: round(v / a.runs, 1) for k, v in tot.items()}})
    print(f"\nYêu cầu ({a.request}): {QUESTION}\nModel: {model} · {a.runs} lần/mức · trung bình")
    for r in rows:
        print(f"  {r['level']:<18} {r['calls']:>4} lượt gọi  {r['tokens']:>7} token  {r['secs']:>5}s  ticket={r['tickets']}")
    out = "orchestration_levels.json" if a.request == "always" else f"orchestration_levels_{a.request}.json"
    json.dump({"model": model, "runs": a.runs, "request": QUESTION, "rows": rows}, open(out, "w"), ensure_ascii=False, indent=1)


if __name__ == "__main__":
    asyncio.run(main())
