"""
Hệ thống ticket ĐÍCH (giả lập Jira/Helpdesk) — phần duy nhất không phải hệ thống thật, vì cần tái hiện lỗi mạng.
Model vẫn là model thật; chỉ "phía bên kia API" là giả lập.

FAULTS (bật bằng run_demo.py --fault ...):
    timeout_once  lần gọi đầu: ticket ĐƯỢC TẠO nhưng response bị mất → client không biết đã tạo hay chưa.
                  Đây là tình huống kinh điển gây ticket TRÙNG khi retry nếu không có idempotency.
    down          helpdesk trả 503 mọi lần → lỗi không phục hồi được → phải dừng + chuyển người.
"""
import hashlib
import json

TICKETS = []      # ticket đã tạo thật trong hệ thống đích
_BY_KEY = {}      # idempotency_key → ticket id (hệ thống đích nhớ key đã thấy)
FAULTS = set()


class TicketTimeout(Exception):
    """Không nhận được response — KHÔNG có nghĩa là ticket chưa được tạo."""


class TicketUnavailable(Exception):
    """Hệ thống đích lỗi, retry cũng không giúp."""


def idempotency_key(task_id: str, args: dict) -> str:
    """APPLICATION sinh key, model không biết và không điền được.
    Key = task + nội dung nghiệp vụ (priority, assignee). Bỏ title: model có thể diễn đạt lại title khi gọi lại."""
    raw = json.dumps({"task": task_id, "priority": args.get("priority"), "assignee": args.get("assignee")},
                     sort_keys=True)
    return hashlib.sha256(raw.encode()).hexdigest()[:12]


def create(ticket: dict, key: str | None) -> tuple[str, bool]:
    """Trả (ticket_id, is_replay). is_replay=True: key đã thấy → trả lại ticket cũ, không tạo mới."""
    if "down" in FAULTS:
        raise TicketUnavailable("helpdesk trả 503 Service Unavailable")
    if key and key in _BY_KEY:
        return _BY_KEY[key], True
    ticket_id = f"T-{1001 + len(TICKETS)}"
    TICKETS.append({**ticket, "id": ticket_id})
    if key:
        _BY_KEY[key] = ticket_id
    if "timeout_once" in FAULTS:
        FAULTS.discard("timeout_once")
        raise TicketTimeout("không nhận được response sau 5s")  # ticket ĐÃ nằm trong TICKETS
    return ticket_id, False


def reset():
    TICKETS.clear()
    _BY_KEY.clear()
    FAULTS.clear()
