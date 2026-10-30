"""
Session 5: cùng MỘT yêu cầu support, chạy ở 3 mức điều phối, đo thật số lượt gọi model / token / thời gian.
    1. Model call + RAG : code tra KB, gọi model 1 lần để trả lời. Không tạo ticket được.
    2. Workflow         : code viết sẵn các bước: phân loại (LLM) → tra KB → trả lời (LLM) → tạo ticket bằng code.
    3. Agent            : model tự chọn gọi search_kb / create_ticket (agent_openai_sdk.py, người duyệt = đồng ý).

Chạy: python3 compare_orchestration_levels.py [--runs 3]
     python3 compare_orchestration_levels.py --runs 1 --show   # in từng bước: [CODE] = code quyết định, [MODEL] = model quyết định (slide 6)
"""
import argparse
import asyncio
import json
import os
import time

import agent_openai_sdk as sdk

REQUESTS = {
    # bước biết trước: luôn tạo ticket
    "always": "Khách X báo lỗi thanh toán mã E205, xử lý sao? Tạo ticket cho billing team giúp tôi.",
    # bước phụ thuộc kết quả tra: E205 = ngân hàng từ chối (kb-a-002) → ĐÚNG là KHÔNG tạo ticket
    "conditional": ("Khách X báo lỗi thanh toán mã E205. Nếu là lỗi phía hệ thống mình thì tạo ticket cho billing team; "
                    "nếu là do ngân hàng thì chỉ hướng dẫn khách, không tạo ticket."),
}
QUESTION = REQUESTS["always"]
EXTRA = sdk.MODEL_SETTINGS.extra_body or {}  # tắt cache gateway như agent
SHOW = False


def step(who, what):
    """In 1 bước khi --show. Input: who="CODE"|"MODEL", what="tra KB…". Output: None"""
    if SHOW:
        print(f"   [{who:<5}] {what}")


def client_and_model():
    """Input: không. Output: (AsyncOpenAI client của gateway, "deepseek-v4.1-flash")"""
    m = sdk.make_model()
    return m._client, m.model


async def chat(client, model, prompt, usage, label="trả lời"):
    """1 lần gọi LLM (như Session 2). Input: client, model, prompt (str), usage (dict đếm, được cộng dồn). Output: str câu LLM trả"""
    r = await client.chat.completions.create(model=model, messages=[{"role": "user", "content": prompt}], extra_body=EXTRA)
    usage["calls"] += 1
    usage["tokens"] += r.usage.prompt_tokens + r.usage.completion_tokens
    out = r.choices[0].message.content
    step("MODEL", f"{label} → {' '.join(out.split())[:70]}")
    return out


def kb_text():
    """Mức 1–2: CODE tự tra KB (không phải LLM chọn). Input: không. Output: str gồm các dòng "[kb-001] …", "[kb-002] …"."""
    step("CODE", "tra KB: find_docs('lỗi thanh toán mã E205')")
    return "\n".join(f"[{d['id']}] {d['title']}: {d['content']}" for d in sdk.find_docs("lỗi thanh toán mã E205"))


# RAG cổ điển: CODE tra KB (kb_text) → nhét tài liệu vào prompt → gọi model 1 lần. Không tool, không vòng lặp.
async def model_call(client, model, usage):
    """Mức 1: tra KB + gọi LLM 1 lần. Output: câu trả lời (str)"""
    return await chat(client, model, f"Tài liệu:\n{kb_text()}\n\nTrả lời ngắn, có nguồn: {QUESTION}", usage)


async def workflow(client, model, usage):
    """Mức 2: bước viết sẵn — LLM phân loại → tra KB → LLM trả lời → CODE tạo ticket. Output: câu trả lời (str)"""
    intent = await chat(client, model, 'Trả JSON {"need_ticket": true|false}. Yêu cầu: ' + QUESTION, usage, "phân loại")
    answer = await chat(client, model, f"Tài liệu:\n{kb_text()}\n\nTrả lời ngắn, có nguồn: {QUESTION}", usage)
    if "true" in intent.lower():  # bước cố định, tham số do CODE quyết định
        step("CODE", "tạo ticket theo tham số viết sẵn: P3, billing-team")
        sdk.TICKETS.append({"id": "T-1001", "title": "Lỗi thanh toán E205", "priority": "P3", "assignee": "billing-team"})
    return answer


async def agent(_client, _model, usage):
    """Mức 3: agent tự quyết (run_agent). Output: câu trả lời (str)"""
    ans, u = await sdk.run_agent(sdk.make_model(), QUESTION, lambda _tool, _args: True)  # người duyệt = đồng ý
    usage["calls"] += u.get("requests", 0)
    usage["tokens"] += u.get("input_tokens", 0) + u.get("output_tokens", 0)
    return ans


async def main():
    """Chạy 3 mức × --runs lần, in bảng trung bình (lượt gọi, token, giây, ticket) + ghi orchestration_levels.json"""
    p = argparse.ArgumentParser()
    p.add_argument("--runs", type=int, default=3)
    p.add_argument("--request", choices=REQUESTS, default="always")
    p.add_argument("--show", action="store_true", help="in từng bước của mỗi mức (agent: in trace SDK)")
    a = p.parse_args()
    global QUESTION, SHOW
    SHOW = a.show
    if SHOW:
        os.environ["DEMO_TRACE"] = "1"  # agent: LocalTraceProcessor in từng model call / tool call
    QUESTION = REQUESTS[a.request]
    client, model = client_and_model()
    rows = []
    for name, fn in [("Model call + RAG", model_call), ("Workflow", workflow), ("Agent", agent)]:
        tot = {"calls": 0, "tokens": 0, "secs": 0.0, "tickets": 0}
        for _ in range(a.runs):
            if SHOW:
                print(f"\n== {name} ==")
            sdk.TICKETS.clear()
            usage = {"calls": 0, "tokens": 0}
            t0 = time.time()
            await fn(client, model, usage)
            tot["secs"] += time.time() - t0
            tot["calls"] += usage["calls"]; tot["tokens"] += usage["tokens"]; tot["tickets"] += len(sdk.TICKETS)
        rows.append({"level": name, **{k: round(v / a.runs, 1) for k, v in tot.items()}})
    print(f"\nYêu cầu ({a.request}): {QUESTION}\nModel: {model} · {a.runs} lần/mức · trung bình")
    for r in rows:
        print(f"  {r['level']:<18} {r['calls']:>4} lượt gọi  {r['tokens']:>7} token  {r['secs']:>5}s  ticket={r['tickets']}")
    out = "orchestration_levels.json" if a.request == "always" else f"orchestration_levels_{a.request}.json"
    if SHOW:  # chạy minh hoạ, không ghi đè số đo trên slide
        return
    json.dump({"model": model, "runs": a.runs, "request": QUESTION, "rows": rows}, open(out, "w"), ensure_ascii=False, indent=1)


if __name__ == "__main__":
    asyncio.run(main())
