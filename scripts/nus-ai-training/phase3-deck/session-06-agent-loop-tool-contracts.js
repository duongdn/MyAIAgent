// Session 6: Agent loop và thiết kế tool contracts (60 phút)
const { C, box, label, code, arrow, twoWay, table, newSlide, question, sessionHeader, recap, agenda, takeaways, challenge, blank, mono, footer } = require('./slide-kit');

module.exports = function session06() {
  sessionHeader(6, 'Agent loop và tool contracts', 'Agent quyết định, gọi tool, nhận kết quả và tiếp tục như thế nào?',
    `Session 6 — 60 phút: mở đầu 5' · nội dung 40-45' · Q&A 10-15'.
Mở đầu: 2-3 người chia sẻ bài tự thực hành Session 5 (chọn mức điều phối cho use case của họ).
Mục tiêu: người học giải thích được agent loop và thiết kế được tool contract tối thiểu.`);
  agenda([['Agent loop', 'model đề xuất · app thực thi · đọc trace thật'], ['Tool contract', '6 phần · description · read vs write'],
    ['Xong thật chưa?', 'run kết thúc ≠ task hoàn thành']], `Ba phần ~13 phút + Q&A.`);

  let s = newSlide('Agent loop', 'Model đề xuất — application thực thi — lặp lại', `Sơ đồ độc lập SDK — đúng cho mọi framework.
1. Goal: câu hỏi/yêu cầu của user.
2. Model chọn hành động: trả lời luôn, hoặc viết một tool call.
3. Application thực thi tool call (đây là chỗ kiểm quyền, Session 7).
4. Tool result quay lại model dưới dạng text.
5. Model tiếp tục (gọi tool khác) hoặc dừng (trả lời cuối).
Mũi tên navy = yêu cầu đi; mũi tên cam = kết quả quay về. Vòng lặp chạy tới khi model trả lời cuối hoặc chạm giới hạn (Session 8).`);
  const steps = [['Goal', 'yêu cầu user', C.LIGHT], ['Model', 'chọn hành động', C.LIGHT], ['Application', 'thực thi tool', C.NAVY], ['Tool', 'search_kb · create_ticket', C.GREEN]];
  steps.forEach(([t, d, f], i) => {
    box(s, 30 + i * 172, 110, 140, 70, `${t}\n${d}`, { fill: f, size: 16, sub: 11 });
    if (i) twoWay(s, 30 + i * 172 - 32, 30 + i * 172, 145);
  });
  label(s, 30, 190, 660, 24, 'navy → yêu cầu / tool call      cam ← kết quả quay về', { size: 10, bold: false, color: C.GREY });
  box(s, 30, 230, 320, 110, 'Tiếp tục\nmodel đọc kết quả, gọi tool tiếp', { fill: C.YELLOW, size: 16, sub: 12 });
  box(s, 370, 230, 320, 110, 'Dừng\nmodel viết câu trả lời cuối — hoặc chạm giới hạn', { fill: C.GREEN, size: 16, sub: 12 });

  question('Model chỉ viết text. Vậy ai thật sự gọi tool?', 'Nhớ lại Session 1: text vào → text ra.',
    `Để lớp đoán 1 phút. Đáp án slide sau: tool call là một đoạn JSON model viết ra; SDK đọc nó và gọi hàm Python.
Đây là câu hỏi giúp người học hiểu vì sao prompt injection gây hại được (Session 7).`);

  s = newSlide('Đáp án', 'Tool call là JSON do model viết — SDK gọi hàm thật', `Bên trái là thứ model thật sự trả về (rút gọn từ response của deepseek-v4.1-flash qua gateway). Không có "hành động" nào — chỉ là text có cấu trúc.
Bên phải: SDK parse JSON, tìm hàm cùng tên, gọi với tham số đó. Kết quả hàm trả về (string) được gửi lại cho model ở lượt sau.
Hệ quả: ai điều khiển được text model viết ra (ví dụ tài liệu bị cài lệnh) thì điều khiển được tool call → phải kiểm tra ở application.`);
  label(s, 30, 85, 320, 20, 'MODEL TRẢ VỀ (text)', { size: 10, color: C.ORANGE, align: 'START' });
  code(s, 30, 108, 320, 150, `{"tool_calls": [{
  "function": {
    "name": "search_kb",
    "arguments": "{\\"query\\":
       \\"lỗi thanh toán E205\\"}"
  }
}]}`, 11);
  arrow(s, 355, 180, 385, 180);
  label(s, 390, 85, 300, 20, 'SDK GỌI HÀM THẬT', { size: 10, color: C.ORANGE, align: 'START' });
  code(s, 390, 108, 300, 150, `search_kb(ctx, query="lỗi thanh toán mã E205")

→ trả về string:
<untrusted_search_results>
<document id='kb-a-001'>…</document>
<document id='kb-a-002'>…</document>
</untrusted_search_results>`, 10);
  box(s, 30, 280, 660, 60, 'Model không chạm vào hệ thống nào. Mọi tác động thật đi qua code của application — nên kiểm soát đặt ở đó.', { fill: C.YELLOW, size: 13 });

  s = newSlide('Trong SDK', 'Runner.run chính là agent loop — chạy tới khi có final_output', `Đối chiếu sơ đồ độc lập SDK với OpenAI Agents SDK:
- Goal = input của Runner.run.
- "Model chọn hành động" = một lượt gọi model (1 turn).
- "Application thực thi" = SDK gọi hàm @function_tool; trước đó gọi needs_approval nếu có (Session 7).
- Tool result → SDK tự thêm vào hội thoại rồi gọi model lượt tiếp.
- Dừng khi model trả lời không kèm tool call → result.final_output. Hoặc ném MaxTurnsExceeded khi vượt max_turns.
Không cần nhớ API; cần biết mỗi khái niệm của sơ đồ nằm ở đâu trong code.`);
  table(s, 30, 90, [230, 430], [
    ['Sơ đồ agent loop', 'OpenAI Agents SDK'],
    ['Goal', 'Runner.run(agent, input, context=session)'],
    ['Model chọn hành động', '1 turn = 1 lượt gọi model'],
    ['Application thực thi', 'SDK gọi hàm @function_tool (sau needs_approval)'],
    ['Kết quả quay lại', 'SDK thêm tool output vào hội thoại, gọi model tiếp'],
    ['Dừng', 'result.final_output — hoặc MaxTurnsExceeded khi vượt max_turns'],
  ], { rowH: 40 });

  s = newSlide('Trace thật · kịch bản 1', 'Đọc trace: tìm tài liệu rồi đề xuất tạo ticket — 2 bước', `Đây là trace thật (run_demo.py --scenario 1 --trace, model deepseek-v4.1-flash). Đọc từng dòng với lớp:
- 🛡 guardrail chạy trước, bằng code, 0.0s.
- 🧠 lượt 1: model đọc câu hỏi, quyết định gọi search_kb (574 token vào, 81 ra).
- 🔧 search_kb chạy — ② lọc quyền: 1 tài liệu bị ẩn.
- 🧠 lượt 2: model đọc kết quả, đề xuất create_ticket P3/billing-team-a.
- ④ code kiểm tra tham số hợp lệ → SDK DỪNG chờ người duyệt (Session 7).
- Sau khi duyệt: ticket T-1001, lượt 3 model viết câu trả lời có nguồn.
Tổng: 3 lượt gọi model, ~3.000 token. Số bước do model quyết định — đó là "agent".`);
  code(s, 30, 85, 660, 250, `🛡  0.0s  guardrail no_card_number triggered=False
🧠  1.6s  model call deepseek-v4.1-flash tokens=574+81
🤖        model gọi search_kb(query='lỗi thanh toán mã E205')
②        được phép đọc ['kb-a-001','kb-a-002'], ẩn 1 tài liệu không có quyền
🔧  0.0s  tool search_kb → "<untrusted_search_results>…"
🧠  2.1s  model call tokens=828+252
🤖        model muốn gọi create_ticket(priority='P3', assignee='billing-team-a')
④        hợp lệ  →  📌 AWAITING_APPROVAL  →  ⑤ ĐỒNG Ý
🔧  0.0s  tool create_ticket → '{"ticket_id": "T-1001", "status": "created"}'
🧠  1.9s  model call tokens=1109+156  → câu trả lời có nguồn kb-a-001, kb-a-002
💰 3 lượt gọi model, 2511 input + 489 output tokens`, 11);
  label(s, 30, 340, 660, 30, 'Bước 1: tìm tài liệu · Bước 2: đề xuất ticket · Application dừng để người duyệt trước khi tạo', { size: 12, bold: false, color: C.GREY, align: 'START' });

  s = newSlide('Tool contract', 'Tool contract có 6 phần — model chỉ nhìn thấy 3', `Contract = thoả thuận giữa model, application và hệ thống đích.
Model thấy: name, description, input schema — đây là thứ quyết định model CHỌN tool nào và ĐIỀN gì.
Application phải định nghĩa thêm: output (format để model đọc được), error (trả gì khi lỗi), side effect (ghi gì, có đảo ngược được không).
Hay quên nhất: error và side effect. Thiếu side effect → không biết tool nào cần duyệt, tool nào retry an toàn.`);
  [['name', 'search_kb'], ['description', 'khi nào dùng tool'], ['input schema', 'tham số · kiểu · bắt buộc']].forEach(([t, d], i) =>
    box(s, 30 + i * 225, 110, 210, 80, `${t}\n${d}`, { fill: C.LIGHT, size: 16, sub: 11 }));
  [['output', 'format model đọc được'], ['error', 'lỗi gì, trả về gì'], ['side effect', 'ghi gì · đảo ngược được?']].forEach(([t, d], i) =>
    box(s, 30 + i * 225, 235, 210, 80, `${t}\n${d}`, { fill: i === 2 ? C.ORANGE : C.YELLOW, size: 16, sub: 11 }));
  label(s, 30, 88, 400, 20, 'MODEL THẤY — quyết định chọn tool và điền tham số', { size: 10, color: C.ORANGE, align: 'START' });
  label(s, 30, 213, 400, 20, 'APPLICATION PHẢI ĐỊNH NGHĨA — model không thấy', { size: 10, color: C.ORANGE, align: 'START' });

  s = newSlide('Description', 'Model chọn tool dựa vào description', `Description là prompt nhỏ cho từng tool. Model đọc nó để quyết định khi nào gọi tool.
Description ngắn kiểu "Tạo ticket" → model không biết P1-P4 nghĩa là gì, assignee điền gì → tự bịa (eval thật: qwen-3.7-flash tự bịa "P2"/"billing team").
Description tốt nói: khi nào dùng, KHI NÀO KHÔNG dùng, ý nghĩa từng tham số, giá trị hợp lệ.
Nhưng nhớ: description chỉ là hướng dẫn. Rule thật (chỉ P3/P4, assignee whitelist) vẫn phải nằm trong code — Session 7.`);
  label(s, 30, 88, 320, 20, 'CHƯA ĐỦ', { size: 10, color: C.ORANGE, align: 'START' });
  code(s, 30, 110, 320, 120, `create_ticket:
"Tạo ticket hỗ trợ."`, 12);
  label(s, 370, 88, 320, 20, 'ĐỦ ĐỂ MODEL CHỌN ĐÚNG', { size: 10, color: C.ORANGE, align: 'START' });
  code(s, 370, 110, 320, 120, `create_ticket:
"Tạo ticket hỗ trợ. Chỉ dùng khi user
 yêu cầu. priority: P1 (khẩn cấp) đến
 P4 (thấp). assignee: team nhận ticket."`, 11);
  box(s, 30, 250, 660, 50, 'Description = hướng dẫn cho model. Rule bắt buộc (P3/P4, team hợp lệ) vẫn kiểm tra bằng code.', { fill: C.YELLOW, size: 13 });
  label(s, 30, 310, 660, 40, 'Eval thật: model yếu tự điền "P2" / "billing team" khi description mơ hồ → bị checkpoint ④ chặn', { size: 12, bold: false, color: C.GREY, align: 'START' });

  s = newSlide('Read vs write', 'Tách read tool khỏi write tool — vì rủi ro khác hẳn nhau', `Read tool (search_kb) đọc dữ liệu: gọi nhiều lần không sao, retry thoải mái, không cần duyệt — nhưng vẫn phải lọc quyền.
Write tool (create_ticket) có side effect: gọi 2 lần = 2 ticket; cần kiểm tra tham số, có thể cần người duyệt, retry phải có idempotency (Session 7).
Đừng gộp kiểu "manage_ticket(action=read|create|delete)": không áp được rule riêng cho từng loại.`);
  table(s, 30, 90, [200, 230, 230], [
    ['', 'search_kb (read)', 'create_ticket (write)'],
    ['Side effect', 'Không', 'Tạo ticket thật trong Helpdesk'],
    ['Gọi 2 lần', 'Vô hại', '2 ticket — trùng'],
    ['Retry khi lỗi', 'Thoải mái', 'Chỉ khi có idempotency key'],
    ['Người duyệt', 'Không cần', 'Cần (needs_approval)'],
    ['Kiểm quyền', 'Lọc tài liệu theo tenant/role', 'Role được tạo? priority? assignee?'],
  ], { rowH: 40 });

  s = newSlide('Contract thật', 'Contract của 2 tool trong demo — đủ 6 phần', `Đây là contract thật trong checkpoints.py + ticket_system.py.
Chú ý tham số tenant trong search_kb: cố tình để lộ để dạy một lỗi thiết kế hay gặp — model có thể điền tenant theo lời user ("tôi thuộc tenant-B"). Application BỎ QUA tham số này, dùng tenant từ session (Session 7).
Output của create_ticket là JSON có ticket_id do hệ thống đích trả — đây là bằng chứng "đã tạo" (Session 8).`);
  table(s, 30, 85, [130, 265, 265], [
    ['', 'search_kb', 'create_ticket'],
    ['description', 'Tìm tài liệu trong KB công ty', 'Tạo ticket. P1 (khẩn) → P4 (thấp)'],
    ['input', 'query: str · tenant: str|None (bị bỏ qua)', 'title · priority · assignee'],
    ['output', '<untrusted_search_results> + id tài liệu', '{"ticket_id": "T-1001", "status": "created"}'],
    ['error', '"Không tìm thấy tài liệu."', '{"error": "…"} — thiếu quyền, timeout, 503'],
    ['side effect', 'Không', 'Ghi ticket — idempotency key, cần duyệt'],
  ], { rowH: 42, size: 10 });

  question('Model nói "Đã tạo ticket". Task đã xong chưa?', 'Run kết thúc có nghĩa là user task hoàn thành?',
    `Hỏi lớp. Nhiều người sẽ nói "xong". Slide sau: chưa chắc — phải kiểm tra tác động thật.`);

  s = newSlide('Đáp án', 'Run kết thúc ≠ task hoàn thành', `Model có thể nói "đã tạo" khi: tool bị chặn, tool timeout, hay đơn giản là bịa. Câu trả lời của model không phải bằng chứng.
Bằng chứng = ticket_id do hệ thống đích trả về. Demo: task_state.finish() chỉ đánh dấu COMPLETED khi có ticket_id; nếu model nói "đã tạo" mà không có ID → ESCALATED (claimed_without_confirmation).
Session 8 sẽ đi tiếp: state machine và điều kiện dừng.`);
  [['Model nói', '"Đã tạo ticket cho bạn"', C.YELLOW], ['Application kiểm tra', 'có ticket_id từ hệ thống đích?', C.NAVY]].forEach(([t, d, f], i) =>
    box(s, 30 + i * 340, 100, 320, 70, `${t}\n${d}`, { fill: f, size: 16, sub: 12 }));
  arrow(s, 350, 135, 370, 135);
  box(s, 30, 200, 320, 70, 'Có ID (T-1001)\n→ COMPLETED', { fill: C.GREEN, size: 16, sub: 12 });
  box(s, 370, 200, 320, 70, 'Không có ID\n→ không báo hoàn thành, chuyển người', { fill: C.ORANGE, size: 16, sub: 12 });
  code(s, 30, 290, 660, 60, `if "đã tạo" in answer and not self.ticket_id:
    print("⚠ model nói đã tạo ticket nhưng hệ thống đích KHÔNG trả ID")   # task_state.py`, 11);

  takeaways([
    ['Agent loop', 'Model viết tool call (JSON), application chạy hàm thật, kết quả quay lại model'],
    ['Contract', '6 phần — model chỉ thấy name, description, input; app định nghĩa output, error, side effect'],
    ['Read / write', 'Tách riêng: write tool có side effect, cần kiểm tra, duyệt, idempotency'],
    ['Hoàn thành', 'Run kết thúc ≠ task xong — kiểm tra tác động thật (ticket ID)'],
  ], `Tóm tắt 2 phút trước Q&A.`);

  challenge('Định nghĩa đủ 6 phần contract cho hai tool search_kb và create_ticket, rồi vẽ sequence diagram của một lần agent gọi tool (user → app → model → tool → model).', [
    'Phần nào của contract model không thấy nhưng quyết định an toàn?',
    'Vì sao không gộp read và write vào một tool?',
    'Một lượt model có gọi được 2 tool cùng lúc không?',
    'Description tốt khác description chưa đủ ở điểm nào?',
  ], `Bài tự thực hành theo đề cương. Câu hỏi nhanh cho Q&A:
1. Trường nào model không thấy nhưng quan trọng nhất cho an toàn? → side effect.
2. Vì sao không gộp read/write vào một tool? → không áp được rule riêng.
3. Model gọi 2 tool trong cùng 1 lượt có được không? → được (trace kịch bản 7: 2 search_kb trong 1 lượt) — Session 8 sẽ dùng chi tiết này.`);
};
