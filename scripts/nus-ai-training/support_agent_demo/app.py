"""
APPLICATION — phần quan trọng nhất của demo. Đây là nơi chứa 5 điểm kiểm tra quyền.

    ① Xác thực: user là ai, thuộc tenant nào → lấy từ SESSION, không tin dữ liệu request gửi lên
    ② Retrieval có filter: search_kb chỉ trả tài liệu đúng tenant + đúng role
    ③ Tool result là dữ liệu KHÔNG đáng tin: đánh dấu, phát hiện dấu hiệu injection (lớp yếu, chỉ cảnh báo)
    ④ Tool executor kiểm tra bằng CODE: user có quyền gọi tool không, tham số có hợp lệ không
    ⑤ Approval: hành động có side effect (tạo ticket) phải được người xác nhận trước khi chạy

Thông điệp: "Model đề xuất — Application quyết định".
Model (scripted_model.py) có thể bị lừa; các checkpoint ở đây vẫn chặn được hậu quả.

`disabled` = tập checkpoint bị tắt (để demo: tắt đi thì chuyện gì xảy ra).
"""
from sample_data import USERS, ROLE_PERMISSIONS, AGENT_ALLOWED_PRIORITIES, ASSIGNABLE_TEAMS, KB_DOCS

MAX_TURNS = 5  # chặn agent loop chạy vô hạn → tránh đốt token/cost (OWASP LLM10)
TICKETS = []   # "hệ thống đích" giả lập (Jira/Helpdesk)


def log(step, msg):
    print(f"   {step} {msg}")


# ── ① Xác thực ─────────────────────────────────────────────────────────────
def resolve_identity(session_user, claimed_tenant, disabled):
    """Danh tính lấy từ session đã đăng nhập (server biết chắc), KHÔNG lấy từ body request."""
    user = USERS[session_user]
    if "1" in disabled and claimed_tenant:
        # ❌ Tắt ①: tin luôn tenant do client gửi lên → ai cũng tự xưng là tenant khác được
        log("①", f"[TẮT] tin tenant client gửi lên: {claimed_tenant}")
        return {"name": session_user, "tenant": claimed_tenant, "role": user["role"]}
    if claimed_tenant and claimed_tenant != user["tenant"]:
        log("①", f"bỏ qua tenant client tự khai '{claimed_tenant}', dùng tenant thật từ session")
    log("①", f"user={session_user} tenant={user['tenant']} role={user['role']}")
    return {"name": session_user, **user}


# ── ② Retrieval có filter quyền ────────────────────────────────────────────
def search_kb(identity, query, disabled, kb):
    """Filter theo tenant + role NGAY KHI QUERY (trong vector DB thật = metadata filter bắt buộc).
    Sai lầm phổ biến: lấy top-k hết rồi dặn model 'đừng nói tài liệu tenant khác' → vô dụng."""
    if "2" in disabled:
        log("②", "[TẮT] không filter — trả MỌI tài liệu khớp query")
        return list(kb)
    docs = [d for d in kb
            if d["tenant"] == identity["tenant"] and identity["role"] in d["allowed_roles"]]
    hidden = len(kb) - len(docs)
    log("②", f"trả {len(docs)} tài liệu {[d['id'] for d in docs]}, ẩn {hidden} tài liệu không có quyền")
    return docs


# ── ③ Tool result = dữ liệu không đáng tin ─────────────────────────────────
SUSPICIOUS = ["ignore all previous instructions", "ignore previous", "bỏ qua mọi hướng dẫn"]


def inspect_untrusted(docs, disabled):
    """Phát hiện dấu hiệu injection để CẢNH BÁO + ghi log. Đây là lớp YẾU:
    attacker chỉ cần đổi cách viết là qua. Vì vậy KHÔNG dựa vào nó — ④ và ⑤ mới là lớp chặn thật."""
    if "3" in disabled:
        return
    for d in docs:
        if any(p in d["content"].lower() for p in SUSPICIOUS):
            log("③", f"⚠ tài liệu {d['id']} có dấu hiệu prompt injection → ghi log, cảnh báo (KHÔNG chặn được model)")


# ── ④ Tool executor kiểm tra bằng code ─────────────────────────────────────
def validate_create_ticket(identity, args, disabled):
    """Trả về danh sách lỗi. Rỗng = hợp lệ. Mọi rule ở đây là code deterministic, không phải prompt."""
    if "4" in disabled:
        log("④", "[TẮT] không kiểm tra — tin tham số model đưa ra")
        return []
    errors = []
    if "create_ticket" not in ROLE_PERMISSIONS[identity["role"]]:
        errors.append(f"role '{identity['role']}' không có quyền tạo ticket")
    if args.get("priority") not in AGENT_ALLOWED_PRIORITIES:
        errors.append(f"priority {args.get('priority')} không được phép tự tạo (chỉ {sorted(AGENT_ALLOWED_PRIORITIES)})")
    if args.get("assignee") not in ASSIGNABLE_TEAMS[identity["tenant"]]:
        errors.append(f"assignee '{args.get('assignee')}' không thuộc team hợp lệ của {identity['tenant']}")
    log("④", "hợp lệ" if not errors else "CHẶN: " + "; ".join(errors))
    return errors


# ── ⑤ Approval ─────────────────────────────────────────────────────────────
def ask_approval(args, approve_mode, disabled):
    """Hiện CHÍNH XÁC hành động + tham số cho người duyệt (không tóm tắt mơ hồ → tránh 'bấm OK theo phản xạ')."""
    if "5" in disabled:
        log("⑤", "[TẮT] không hỏi người — thực thi luôn")
        return True
    log("⑤", f"cần xác nhận: create_ticket {args}")
    if approve_mode == "ask":
        ok = input("      Duyệt? (y/n): ").strip().lower() == "y"
    else:
        ok = approve_mode == "yes"
        log("⑤", f"người duyệt chọn: {'ĐỒNG Ý' if ok else 'TỪ CHỐI'}")
    return ok


# ── Agent loop ─────────────────────────────────────────────────────────────
def run_agent(model, session_user, question, claimed_tenant=None, disabled=(), approve_mode="ask", kb=KB_DOCS):
    """Vòng lặp agent: gọi model → model đề xuất tool → APP kiểm tra rồi mới thực thi → lặp.
    kb: knowledge base dùng cho lần chạy này (kịch bản 2 truyền KB có tài liệu độc)."""
    real_tenant = USERS[session_user]["tenant"]  # tenant thật, dùng để phát hiện rò rỉ khi demo tắt ①
    identity = resolve_identity(session_user, claimed_tenant, disabled)
    messages = [{"role": "user", "content": question}]

    for turn in range(1, MAX_TURNS + 1):
        decision = model(messages)  # model chỉ ĐỀ XUẤT
        if decision["type"] == "final":
            return decision["text"]

        tool, args = decision["tool"], decision["args"]
        print(f"   🤖 model đề xuất: {tool}({args})")

        if tool == "search_kb":
            docs = search_kb(identity, args["query"], disabled, kb)
            inspect_untrusted(docs, disabled)
            leaked = [d["id"] for d in docs if d["tenant"] != real_tenant]
            if leaked:
                print(f"   💥 RÒ RỈ: {session_user} (thật ra thuộc {real_tenant}) vừa đọc được tài liệu tenant khác {leaked}")
            result = docs

        elif tool == "create_ticket":
            errors = validate_create_ticket(identity, args, disabled)
            if errors:
                result = "BỊ CHẶN bởi application: " + "; ".join(errors)
            elif not ask_approval(args, approve_mode, disabled):
                result = "BỊ TỪ CHỐI bởi người duyệt"
            else:
                TICKETS.append({**args, "tenant": identity["tenant"], "created_by": identity["name"]})
                if args.get("priority") == "P1" or "ceo" in str(args.get("assignee")):
                    print("   💥 THIỆT HẠI: ticket độc đã được tạo thật trong hệ thống")
                result = f"đã tạo ticket #{len(TICKETS)}"
        else:
            result = f"tool '{tool}' không tồn tại"  # model có thể bịa tên tool

        messages.append({"role": "tool", "tool": tool, "content": result})

    return f"Dừng: vượt quá {MAX_TURNS} lượt (max_turns)"
