"""
Demo UI (Session 5): chat với support agent thật + cột trace hiện từng bước của vòng lặp agent ngay khi chạy.
Không cài thêm gì — chỉ thư viện chuẩn + agent có sẵn (agent_openai_sdk.py). Model thật qua LLM gateway công ty.

Chạy:  python3 demo_ui.py            → mở http://localhost:8000
       DEMO_UI_PORT=8080 python3 demo_ui.py

Luồng: trang web POST /run → agent chạy trong thread riêng → mỗi span của SDK được đẩy về trình duyệt qua
Server-Sent Events (/events). Khi agent muốn tạo ticket, SDK dừng chờ duyệt → nút Duyệt/Từ chối trên trang.
"""
import asyncio
import json
import os
import queue
import threading
import uuid
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

from agents import add_trace_processor
from agents.tracing import TracingProcessor

import agent_openai_sdk as sdk

PAGE = Path(__file__).with_name("demo_ui.html")
SAMPLES = {  # 2 yêu cầu của "Ví dụ trong buổi" (đề cương Session 5)
    "rag": "Mã lỗi thanh toán E205 nghĩa là gì?",
    "ticket": "Khách X báo lỗi thanh toán mã E205, xử lý sao? Tạo ticket cho billing team giúp tôi.",
}
RUNS = {}  # run_id → {"events": Queue, "approval": Queue}
CURRENT = threading.local()  # run đang chạy trong thread này (trace processor + ask_human đọc ra)


def short(s, n=160):
    """Rút gọn chuỗi để hiện trên ô trace. Input: s="<chuỗi dài>", n=160. Output: ≤160 ký tự + "…"."""
    s = " ".join(s.split())
    return s if len(s) <= n else s[:n] + "…"


def emit(event):
    """Bỏ 1 event vào hàng đợi của run đang chạy → do_GET /events đẩy lên trình duyệt.
    Input:
        event — dict, vd {"type": "step", "who": "llm", "title": "LLM chọn tool: search_kb", …}
                type: "step" (1 ô trace) | "approval" (hiện nút duyệt) | "done" (câu trả lời) | "error" | "end"
    Output: None
    """
    run = getattr(CURRENT, "run", None)
    if run:
        run["events"].put(event)


class UITraceProcessor(TracingProcessor):
    """Đổi span của SDK thành bước dễ đọc cho UI: ai làm (llm/app), làm gì, JSON gốc khi cần.
    SDK gọi on_span_end(span) mỗi khi 1 bước xong; chỉ xử lý 2 loại span:
        generation → ô "LLM chọn tool: …" (có tool_calls) hoặc "LLM trả lời cuối" (text)
        function   → ô "App chạy <tool>" (có output) hoặc "App CHƯA chạy: chờ người duyệt" (output rỗng)
    Output: không trả gì; emit(event) bỏ vào hàng đợi → /events đẩy lên trình duyệt."""

    def on_span_end(self, span):
        d = span.span_data
        if d.type in ("generation", "response"):
            out = (getattr(d, "output", None) or [{}])[0]
            usage = getattr(d, "usage", None) or {}
            why = " ".join((out.get("reasoning_content") or "").split())
            why = why if len(why) <= 180 else why[:180] + "…"
            base = {"type": "step", "who": "llm", "why": why,
                    "tokens": f"{usage.get('input_tokens', '?')} vào + {usage.get('output_tokens', '?')} ra",
                    "sent": len(getattr(d, "input", None) or [])}
            calls = out.get("tool_calls") or []
            if calls:  # 1 lượt LLM có thể chọn nhiều tool cùng lúc → gộp 1 bước
                names = ", ".join(tc["function"]["name"] for tc in calls)
                emit({**base, "title": f"LLM chọn tool: {names}",
                      "raw": [{"name": tc["function"]["name"], "arguments": tc["function"]["arguments"]} for tc in calls]})
            else:
                emit({**base, "title": "LLM trả lời cuối", "raw": {"content": out.get("content")}})
        elif d.type == "function":
            if not d.output:
                emit({"type": "step", "who": "app", "title": f"App CHƯA chạy {d.name}: chờ người duyệt"})
            else:
                emit({"type": "step", "who": "app", "title": f"App chạy {d.name}", "detail": short(str(d.output))})

    # 5 hàm còn lại SDK cũng gọi (bắt đầu/kết thúc trace, bắt đầu span, tắt) — demo không cần, để trống
    def on_trace_start(self, trace): pass
    def on_trace_end(self, trace): pass
    def on_span_start(self, span): pass
    def shutdown(self): pass
    def force_flush(self): pass


def ask_human_ui(tool_name, args):
    """Hỏi người duyệt trên trang web: hiện nút Duyệt/Từ chối, chờ người bấm (tối đa 5 phút).
    run_agent gọi hàm này khi SDK dừng trước create_ticket (needs_approval=True).
    Input:
        tool_name — "create_ticket"
        args      — tham số LLM điền, vd {"title": "Khách X lỗi E205", "priority": "P3", "assignee": "billing-team"}
    Output: True = Duyệt, False = Từ chối / hết 5 phút
    """
    run = CURRENT.run
    emit({"type": "approval", "args": args})
    try:
        ok = run["approval"].get(timeout=300)  # thread agent ĐỨNG CHỜ ở đây tới khi POST /approve bỏ kết quả vào
    except queue.Empty:
        ok = False
    emit({"type": "step", "who": "human", "title": "Người duyệt: " + ("ĐỒNG Ý" if ok else "TỪ CHỐI")})
    return ok


def run_in_thread(run, question):
    """Chạy agent cho 1 câu hỏi, trong thread riêng (web server không bị chặn).
    Input:
        run      — {"events": Queue, "approval": Queue} của run này (tạo ở do_POST /run)
        question — câu hỏi user gõ, vd "Mã lỗi thanh toán E205 nghĩa là gì?"
    Output: None; kết quả gửi qua emit(): các "step", rồi "done" (câu trả lời) và "end"
    """
    CURRENT.run = run
    try:
        sdk.TICKETS.clear()
        model = sdk.make_model()
        # add_trace_processor = THÊM vào danh sách (LocalTraceProcessor vẫn chạy). Phải gọi SAU make_model(),
        # vì make_model() dùng set_trace_processors (thay cả danh sách) sẽ xoá processor đã thêm trước đó.
        add_trace_processor(UITraceProcessor())
        answer, usage = asyncio.run(sdk.run_agent(model, question, ask_human_ui))
        tickets = [f"{t['id']} ({t['priority']}, {t['assignee']})" for t in sdk.TICKETS]
        emit({"type": "done", "answer": answer, "usage": usage, "tickets": tickets})
    except Exception as e:  # lỗi gateway/model → hiện trên trang thay vì treo
        emit({"type": "error", "message": f"{type(e).__name__}: {e}"[:400]})
    finally:
        emit({"type": "end"})


class Handler(BaseHTTPRequestHandler):
    """Web server: GET / (trang), GET /events (đẩy event), POST /run (bắt đầu), POST /approve (nút duyệt)."""

    def log_message(self, *_):
        pass

    def _json(self, code, obj):
        """Trả JSON. Input: code=200, obj={"run": "a1b2c3d4"}. Output: HTTP response."""
        body = json.dumps(obj, ensure_ascii=False).encode()
        self.send_response(code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        """GET /           → trả trang demo_ui.html
        GET /events?run= → giữ kết nối (Server-Sent Events), lấy event trong hàng đợi nào gửi nấy tới khi "end"
        Output mỗi event: dòng `data: {"type": "step", …}`"""
        if self.path == "/":
            body = PAGE.read_text().replace("__SAMPLES__", json.dumps(SAMPLES, ensure_ascii=False)).encode()
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.end_headers()
            self.wfile.write(body)
        elif self.path.startswith("/events?run="):
            run = RUNS.get(self.path.split("=", 1)[1])
            if not run:
                return self._json(404, {"error": "run không tồn tại"})
            self.send_response(200)
            self.send_header("Content-Type", "text/event-stream")
            self.send_header("Cache-Control", "no-cache")
            self.end_headers()
            while True:
                ev = run["events"].get()
                self.wfile.write(f"data: {json.dumps(ev, ensure_ascii=False)}\n\n".encode())
                self.wfile.flush()
                if ev["type"] == "end":
                    break
        else:
            self._json(404, {"error": "not found"})

    def do_POST(self):
        """POST /run     body {"question": "…"}       → mở thread run_in_thread, trả ngay {"run": "a1b2c3d4"}
        POST /approve body {"run": "…", "ok": true} → bỏ True/False vào hàng đợi approval (ask_human_ui đang chờ)"""
        data = json.loads(self.rfile.read(int(self.headers.get("Content-Length", 0))) or "{}")
        if self.path == "/run":
            question = (data.get("question") or "").strip()
            if not question:
                return self._json(400, {"error": "câu hỏi trống"})
            run_id = uuid.uuid4().hex[:8]
            RUNS[run_id] = {"events": queue.Queue(), "approval": queue.Queue()}
            threading.Thread(target=run_in_thread, args=(RUNS[run_id], question), daemon=True).start()
            self._json(200, {"run": run_id})
        elif self.path == "/approve":
            run = RUNS.get(data.get("run"))
            if not run:
                return self._json(404, {"error": "run không tồn tại"})
            run["approval"].put(bool(data.get("ok")))
            self._json(200, {"ok": True})
        else:
            self._json(404, {"error": "not found"})


if __name__ == "__main__":
    port = int(os.environ.get("DEMO_UI_PORT", "8000"))
    print(f"Demo UI: http://localhost:{port}  (Ctrl+C để dừng)")
    ThreadingHTTPServer(("127.0.0.1", port), Handler).serve_forever()
