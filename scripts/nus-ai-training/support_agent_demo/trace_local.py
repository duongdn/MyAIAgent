"""
Trace của OpenAI Agents SDK, ghi RA MÁY MÌNH thay vì gửi về dashboard OpenAI.
SDK tự sinh span cho mọi bước (agent, model call, tool call, guardrail, lỗi); processor này chỉ in + ghi file.

    .traces/<trace_id>.jsonl   1 dòng / span — mở ra xem lại sau khi chạy
    run_demo.py --trace        in cây span ra màn hình

Trace = quan sát KỸ THUẬT (bước nào chạy, bao lâu, lỗi gì). Nó không trả lời "user task có xong đúng không"
— việc đó thuộc eval (run_eval.py) và task state (task_state.py).
"""
import json
from datetime import datetime
from pathlib import Path

from agents.tracing import TracingProcessor

TRACE_DIR = Path(__file__).parent / ".traces"
ICON = {"agent": "🧭", "generation": "🧠", "response": "🧠", "function": "🔧", "guardrail": "🛡", "custom": "•"}


def _secs(span):
    try:
        return (datetime.fromisoformat(span.ended_at) - datetime.fromisoformat(span.started_at)).total_seconds()
    except (TypeError, ValueError):
        return 0.0


def _describe(d):
    t = d.type
    if t == "agent":
        return f"agent {d.name}"
    if t in ("generation", "response"):
        usage = getattr(d, "usage", None) or {}
        return f"model call {getattr(d, 'model', '') or ''} tokens={usage.get('input_tokens', '?')}+{usage.get('output_tokens', '?')}"
    if t == "function":
        return f"tool {d.name}({(d.input or '')[:60]}) → {(str(d.output or ''))[:50]!r}"
    if t == "guardrail":
        return f"guardrail {d.name} triggered={d.triggered}"
    return t


class LocalTraceProcessor(TracingProcessor):
    def __init__(self, verbose=False):
        self.verbose = verbose
        TRACE_DIR.mkdir(exist_ok=True)

    def on_trace_start(self, trace):
        if self.verbose:
            print(f"   🔎 trace {trace.trace_id}")

    def on_span_end(self, span):
        d = span.span_data
        line = {"trace_id": span.trace_id, "span": d.type, "secs": round(_secs(span), 2),
                "what": _describe(d), "error": span.error}
        with (TRACE_DIR / f"{span.trace_id}.jsonl").open("a") as f:
            f.write(json.dumps(line, ensure_ascii=False) + "\n")
        if self.verbose and d.type != "custom":
            err = f"  ❌ {span.error.get('message')}" if span.error else ""
            print(f"   🔎 {ICON.get(d.type, '•')} {line['secs']:>5.1f}s  {line['what']}{err}")

    def on_trace_end(self, trace):
        pass

    def on_span_start(self, span):
        pass

    def shutdown(self):
        pass

    def force_flush(self):
        pass
