"""
Session 6: tool contract — model chỉ thấy name + description + input schema. Description ảnh hưởng thế nào?
Cùng yêu cầu kịch bản 1, đổi DUY NHẤT description của create_ticket, đếm số đề xuất sai rule bị checkpoint ④ chặn.

Chạy:
    python3 compare_tool_descriptions.py --schema        # in đúng phần contract model nhìn thấy (không gọi model)
    python3 compare_tool_descriptions.py --runs 5        # đo thật 3 mức description, ghi tool_descriptions.json
"""
import argparse
import asyncio
import contextlib
import io
import json
import os

import sys
from pathlib import Path

# Dùng lại agent của demo Session 5 (docs/nus-ai-training/phase3/session-05/demo)
HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE.parents[2] / "phase3" / "session-05" / "demo"))

import agent_openai_sdk as sdk
import checkpoints as cp
import ticket_system as ts
from sample_data import AGENT_ALLOWED_PRIORITIES, ASSIGNABLE_TEAMS, KB_DOCS

QUESTION = "Khách X báo lỗi thanh toán mã E205, xử lý sao? Tạo ticket cho billing team giúp tôi."
DESCRIPTIONS = {
    "mơ hồ": "Tạo ticket hỗ trợ.",
    "có ý nghĩa tham số": cp.CREATE_TICKET_DESC,
    "có giá trị hợp lệ": (cp.CREATE_TICKET_DESC + f" Agent chỉ được tạo priority {' hoặc '.join(sorted(AGENT_ALLOWED_PRIORITIES))}."
                          f" assignee phải là một trong: {', '.join(sorted(ASSIGNABLE_TEAMS['tenant-A']))}."),
}


def show_schema():
    """Đúng thứ SDK gửi cho model: name, description, JSON schema tham số. Output/error/side effect không có ở đây."""
    for tool in (sdk.search_kb, sdk.create_ticket):
        print(json.dumps({"name": tool.name, "description": tool.description, "parameters": tool.params_json_schema},
                         ensure_ascii=False, indent=1))


async def one_run(model):
    cp.PROPOSALS.clear()
    ts.reset()
    with contextlib.redirect_stdout(io.StringIO()):  # chỉ cần kết quả, không cần log từng checkpoint
        await sdk.run_agent(model, "alice", QUESTION, KB_DOCS, (), "yes")
    first = cp.PROPOSALS[0] if cp.PROPOSALS else None
    return {"first_blocked": bool(first and first["blocked"]), "first": first,
            "blocked": sum(p["blocked"] for p in cp.PROPOSALS), "created": len(ts.TICKETS)}


async def main():
    p = argparse.ArgumentParser()
    p.add_argument("--runs", type=int, default=5)
    p.add_argument("--schema", action="store_true")
    a = p.parse_args()
    if a.schema:
        return show_schema()
    model = sdk.make_model(os.environ.get("DEMO_PROVIDER", "nus"), os.environ.get("DEMO_MODEL"))
    rows = []
    for name, desc in DESCRIPTIONS.items():
        sdk.create_ticket.description = desc  # chỉ đổi description, mọi thứ khác giữ nguyên
        runs = [await one_run(model) for _ in range(a.runs)]
        row = {"description": name, "text": desc, "runs": a.runs,
               "first_proposal_wrong": sum(r["first_blocked"] for r in runs),
               "blocked_total": sum(r["blocked"] for r in runs),
               "tickets_created": sum(r["created"] for r in runs),
               "wrong_examples": sorted({f"{r['first']['priority']}/{r['first']['assignee']}" for r in runs if r["first_blocked"]})}
        rows.append(row)
        print(f"  {name:<20} đề xuất đầu sai {row['first_proposal_wrong']}/{a.runs} · bị ④ chặn tổng {row['blocked_total']}"
              f" · ticket tạo được {row['tickets_created']}/{a.runs} · {row['wrong_examples']}")
    json.dump({"model": model.model, "question": QUESTION, "rows": rows}, open(HERE / "tool_descriptions.json", "w"),
              ensure_ascii=False, indent=1)


if __name__ == "__main__":
    asyncio.run(main())
