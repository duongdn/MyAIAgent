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
    """APPLICATION sinh key chống tạo trùng khi retry; model không biết và không điền được.
    Key = task + nội dung nghiệp vụ (priority, assignee). Bỏ title: model có thể diễn đạt lại title khi gọi lại.
    Input:
        task_id — vd "3f9a1c2b"
        args    — vd {"title": "…", "priority": "P3", "assignee": "billing-team-a"}
    Output: str 12 ký tự hex, vd "a1b2c3d4e5f6" (cùng task + cùng priority/assignee → cùng key)
    """
    raw = json.dumps({"task": task_id, "priority": args.get("priority"), "assignee": args.get("assignee")},
                     sort_keys=True)
    return hashlib.sha256(raw.encode()).hexdigest()[:12]


def create(ticket: dict, key: str | None) -> tuple[str, bool]:
    """Hệ thống ticket đích (giả lập) nhận yêu cầu tạo ticket.
    Input:
        ticket — vd {"title": "…", "priority": "P3", "assignee": "billing-team-a", "tenant": "tenant-A",
                     "created_by": "alice", "task": "3f9a1c2b"}
        key    — idempotency key, hoặc None (tắt idempotency)
    Output: (ticket_id, is_replay), vd ("T-1001", False); key đã thấy → ("T-1001", True), không tạo mới
    Lỗi: TicketTimeout (đã tạo nhưng mất response), TicketUnavailable (503)
    """
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
    """Xoá mọi ticket, key, lỗi giả lập — trước mỗi lần chạy.
    Input: không
    Output: None
    """
    TICKETS.clear()
    _BY_KEY.clear()
    FAULTS.clear()
