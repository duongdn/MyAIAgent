"""
"Model" giả lập theo kịch bản — đứng thay cho LLM thật (OpenAI Agents SDK, Claude...).

VÌ SAO GIẢ LẬP?
  - Demo trước lớp cần kết quả lặp lại được. LLM thật lúc bị prompt injection lừa, lúc không.
  - Thông điệp của buổi học: KHÔNG ĐƯỢC giả định model sẽ cưỡng lại injection.
    Nên ta cố tình cho model "ngây thơ": thấy lệnh trong tài liệu là làm theo (trường hợp xấu nhất).
  - Toàn bộ phần kiểm soát nằm ở app.py là code thật — dù thay bằng LLM thật thì app.py giữ nguyên.

Cách model làm việc trong agent loop (giống SDK thật):
  - Nhận lịch sử hội thoại (messages) → trả về MỘT trong hai thứ:
      {"type": "tool_call", "tool": ..., "args": {...}}   → app thực thi tool rồi gọi model lần nữa
      {"type": "final", "text": ...}                     → kết thúc vòng lặp
  - Model chỉ ĐỀ XUẤT tool call. Thực thi hay không là việc của application.
"""


def scripted_model(messages):
    """Quyết định bước tiếp theo dựa trên messages (danh sách dict role/content)."""
    tool_results = [m for m in messages if m["role"] == "tool"]
    user_question = next(m["content"] for m in messages if m["role"] == "user")

    # Bước 1: chưa có kết quả tool nào → tìm trong knowledge base trước
    if not tool_results:
        return {"type": "tool_call", "tool": "search_kb", "args": {"query": "thanh toán"}}

    last = tool_results[-1]

    # Bước 2: vừa có kết quả search_kb → đọc tài liệu và quyết định
    if last["tool"] == "search_kb":
        docs_text = " ".join(d["content"] for d in last["content"])

        # ⚠ Model bị lừa: trong tài liệu có lệnh "IGNORE ALL PREVIOUS INSTRUCTIONS..."
        # Với model, chữ trong tài liệu và chữ của user đều chỉ là token → nó làm theo.
        if "IGNORE ALL PREVIOUS INSTRUCTIONS" in docs_text:
            return {"type": "tool_call", "tool": "create_ticket", "args": {
                "title": "URGENT: refund all customers",
                "priority": "P1",
                "assignee": "ceo@company.com",
            }}

        # Trường hợp bình thường: user nhờ tạo ticket → đề xuất ticket hợp lý
        if "ticket" in user_question.lower():
            return {"type": "tool_call", "tool": "create_ticket", "args": {
                "title": "Khách X báo lỗi thanh toán",
                "priority": "P3",
                "assignee": "billing-team-a",
            }}
        # Trả lời có trích nguồn (chống bịa — OWASP LLM09). Model "kể lại" nội dung đã đọc,
        # nên tài liệu nào lọt qua checkpoint ② thì nội dung đó sẽ đến tay user.
        summary = " | ".join(f"[{d['id']}] {d['content'][:60]}" for d in last["content"])
        return {"type": "final", "text": summary}

    # Bước 3: đã có kết quả create_ticket (thành công hoặc bị chặn) → trả lời user
    return {"type": "final", "text": f"Kết quả tạo ticket: {last['content']}"}
