"""
Task state LƯU BỀN — application quyết định lưu gì, SDK chỉ hỗ trợ dừng/tiếp tục run.
Mỗi task là 1 file .state/<task_id>.json → server restart vẫn biết task đang ở đâu.

State machine (Session 8):
    PROCESSING ──cần duyệt──► AWAITING_APPROVAL ──duyệt/từ chối──► PROCESSING
        │                                                             │
        ├──► COMPLETED  chỉ khi: đã trả lời có nguồn, HOẶC ticket có ID do hệ thống đích xác nhận
        └──► ESCALATED  thiếu dữ liệu · lỗi không phục hồi · vượt budget · guardrail chặn → chuyển người

Chỉ lưu dữ liệu có lý do: tiến độ, ID đã xác nhận, hành động chờ duyệt. Không lưu nội dung tài liệu KB.
"""
import json
import time
import uuid
from dataclasses import asdict, dataclass, field
from pathlib import Path

STATE_DIR = Path(__file__).parent / ".state"
STATE_TTL_DAYS = 30        # có thời hạn: task cũ hơn bị xoá (cleanup job, không làm trong demo)
MAX_TOOL_CALLS = 6         # budget số tool call / task (ngoài MAX_TURNS của SDK)
RUN_TIMEOUT_S = 120        # budget thời gian / lần chạy


@dataclass
class TaskState:
    user: str
    question: str
    scenario: int | None = None
    task_id: str = field(default_factory=lambda: uuid.uuid4().hex[:8])
    status: str = "PROCESSING"
    stop_reason: str | None = None
    ticket_id: str | None = None          # CHỈ ghi khi hệ thống đích trả ID
    pending_approval: dict | None = None  # tham số create_ticket đang chờ người duyệt
    tool_calls: int = 0
    searches: int = 0
    empty_searches: int = 0
    sdk_run_state: dict | None = None     # RunState.to_json() của SDK khi phải dừng chờ duyệt
    created_at: float = field(default_factory=time.time)

    def set(self, status, reason=None, **fields):
        self.status, self.stop_reason = status, reason
        for k, v in fields.items():
            setattr(self, k, v)
        print(f"   📌 task {self.task_id}: {status}" + (f" ({reason})" if reason else ""))
        self.save()

    def use_tool(self) -> bool:
        """False = vượt budget tool call → application dừng, không để model gọi tiếp."""
        self.tool_calls += 1
        return self.tool_calls <= MAX_TOOL_CALLS

    def save(self):
        STATE_DIR.mkdir(exist_ok=True)
        (STATE_DIR / f"{self.task_id}.json").write_text(json.dumps(asdict(self), ensure_ascii=False, indent=1))

    @classmethod
    def load(cls, task_id):
        return cls(**json.loads((STATE_DIR / f"{task_id}.json").read_text()))

    def finish(self, answer: str):
        """Application tự quyết định task đã xong chưa — không tin câu "đã tạo ticket" của model."""
        if self.status in ("ESCALATED", "AWAITING_APPROVAL"):
            return
        if "đã tạo" in answer.lower() and "ticket" in answer.lower() and not self.ticket_id:
            print("   ⚠ model nói đã tạo ticket nhưng hệ thống đích KHÔNG trả ID → không tính là hoàn thành")
            return self.set("ESCALATED", "claimed_without_confirmation")
        if self.searches and self.empty_searches == self.searches and not self.ticket_id:
            return self.set("ESCALATED", "missing_data")
        self.set("COMPLETED", f"ticket {self.ticket_id} confirmed" if self.ticket_id else "answered")
