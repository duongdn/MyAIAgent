"""
Session 5: chạy lặp cùng một yêu cầu "cần thì tạo ticket" — agent có quyết định đúng và ổn định không?
So với workflow "tra trước, quyết sau" (thứ tự bước do code giữ, model chỉ trả need_ticket).
    E205 = ngân hàng từ chối → ĐÚNG là KHÔNG tạo ticket
    E999 = lỗi phía cổng thanh toán → ĐÚNG là TẠO ticket

Chạy: python3 compare_decision_consistency.py [--runs 10]   # ghi decision_consistency.json
"""
import argparse
import asyncio
import json
import time

import checkpoints as cp
import compare_orchestration_levels as lv
import ticket_system as ts

CASES = {"E205": False, "E999": True}  # mã lỗi → có nên tạo ticket không (theo kb-a-002)
TEMPLATE = ("Khách X báo lỗi thanh toán mã {code}. Nếu là lỗi phía hệ thống mình (cổng thanh toán) thì tạo ticket "
            "cho billing team; nếu là do ngân hàng hoặc thẻ của khách thì chỉ hướng dẫn khách, không tạo ticket.")


async def workflow_lookup_first(client, model, usage):
    docs = lv.kb_text()  # bước 1 cố định: code tra KB
    out = await lv.chat(client, model, f'Tài liệu:\n{docs}\n\nYêu cầu: {lv.QUESTION}\nChỉ trả JSON {{"need_ticket": true|false}}.',
                        usage, "quyết định")
    if "true" in out.lower():  # bước 2 cố định: code tạo ticket theo tham số viết sẵn
        ts.create({"title": "Lỗi thanh toán", "priority": "P3", "assignee": "billing-team-a"}, None)


async def main():
    p = argparse.ArgumentParser()
    p.add_argument("--runs", type=int, default=10)
    a = p.parse_args()
    client, model = lv.client_and_model()
    rows = []
    for code, want in CASES.items():
        lv.QUESTION = TEMPLATE.format(code=code)
        for name, fn in [("Workflow tra trước", workflow_lookup_first), ("Agent", lv.agent)]:
            runs = []
            for _ in range(a.runs):
                ts.reset()
                cp.PROPOSALS.clear()
                usage = {"calls": 0, "tokens": 0}
                t0 = time.time()
                try:
                    await fn(client, model, usage)
                    err = None
                except Exception as e:  # lỗi gateway / max_turns cũng là một kết quả cần đếm
                    err = type(e).__name__
                runs.append({"ticket": bool(ts.TICKETS), "calls": usage["calls"], "tokens": usage["tokens"],
                             "secs": round(time.time() - t0, 1), "error": err})
            tok = [r["tokens"] for r in runs]
            row = {"code": code, "level": name, "runs": a.runs,
                   "correct": sum(r["ticket"] == want and not r["error"] for r in runs),
                   "calls": sorted({r["calls"] for r in runs}), "tokens_min": min(tok), "tokens_max": max(tok),
                   "errors": [r["error"] for r in runs if r["error"]], "detail": runs}
            rows.append(row)
            print(f"  {code} {name:<18} đúng {row['correct']}/{a.runs} · lượt gọi {row['calls']}"
                  f" · token {row['tokens_min']}–{row['tokens_max']} · lỗi {row['errors']}", flush=True)
    json.dump({"model": model, "template": TEMPLATE, "rows": rows}, open("decision_consistency.json", "w"),
              ensure_ascii=False, indent=1)


if __name__ == "__main__":
    asyncio.run(main())
