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
Mũi tên navy = yêu cầu đi; mũi tên cam = kết quả quay về. Vòng lặp chạy tới khi model trả lời cuối hoặc chạm giới hạn (Session 8).
Đơn giản hoá: sơ đồ vẽ 1 tool call mỗi lượt cho dễ nhìn. Thực tế model có thể viết NHIỀU tool call trong CÙNG một lượt (ví dụ 2 lần search_kb với 2 câu query khác nhau) — ứng dụng chạy lần lượt, không phải 1-đổi-1 với số lượt. Chi tiết + trace thật ở Session 8.`);
  const steps = [['Goal', 'yêu cầu user', C.LIGHT], ['Model', 'chọn hành động', C.LIGHT], ['Application', 'thực thi tool', C.NAVY], ['Tool', 'search_kb · create_ticket', C.GREEN]];
  steps.forEach(([t, d, f], i) => {
    box(s, 30 + i * 172, 110, 140, 70, `${t}\n${d}`, { fill: f, size: 16, sub: 11 });
    if (i) twoWay(s, 30 + i * 172 - 32, 30 + i * 172, 145);
  });
  label(s, 30, 190, 660, 24, 'navy → yêu cầu / tool call      cam ← kết quả quay về', { size: 10, bold: false, color: C.GREY });
  box(s, 30, 230, 320, 110, 'Tiếp tục\nmodel đọc kết quả, gọi tool tiếp (có thể gọi NHIỀU tool/lượt)', { fill: C.YELLOW, size: 15, sub: 11 });
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
    ['Application thực thi', 'SDK gọi hàm @function_tool (qua needs_approval trước — CHỈ tool có khai báo, vd create_ticket)'],
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
Tổng: 3 lượt gọi model, 2.511 token vào + 489 ra. Số bước do model quyết định — đó là "agent".`);
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
💰 3 lượt gọi model, 2.511 input + 489 output tokens`, 11);
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

  // Bằng chứng: đúng phần contract SDK gửi cho model (compare_tool_descriptions.py --schema)
  s = newSlide('Contract · model thấy gì', 'SDK gửi cho model đúng 3 thứ: name, description, schema', `Đây là output thật của: python3 compare_tool_descriptions.py --schema (không gọi model, chạy tức thì — nên chạy live).
SDK tự sinh JSON schema từ type hint của hàm Python (title: str, priority: str, assignee: str). Description lấy từ description_override (hoặc docstring).
Chỉ vào chỗ KHÔNG có: không có output, không có lỗi, không có side effect. Model không biết create_ticket ghi vào hệ thống thật, không biết gọi 2 lần là 2 ticket.
Cũng thấy luôn điểm yếu: priority chỉ là "string" — schema không nói P3/P4. Model chỉ còn description để đoán → slide sau đo xem đoán sai bao nhiêu.`);
  code(s, 30, 86, 400, 262, `{
 "name": "create_ticket",
 "description": "Tạo ticket hỗ trợ. priority:
    P1 (khẩn cấp) đến P4 (thấp). assignee:
    team nhận ticket.",
 "parameters": {
  "properties": {
   "title":    {"type": "string"},
   "priority": {"type": "string"},
   "assignee": {"type": "string"}
  },
  "required": ["title", "priority", "assignee"]
 }
}`, 9.5);
  box(s, 445, 86, 245, 120, 'Không có trong thứ model nhận\noutput · error · side effect', { fill: C.ORANGE, size: 15, sub: 12 });
  box(s, 445, 218, 245, 130, 'priority chỉ là "string"\nschema không nói P3/P4 — model chỉ còn description để đoán', { fill: C.INK, size: 14, sub: 11 });

  question('Chỉ đổi description — model điền sai tham số bao nhiêu lần?', 'Cùng yêu cầu "tạo ticket cho billing team", cùng model, 5 lần mỗi bản.',
    `Cho lớp đoán trước: bản mơ hồ sai mấy lần trên 5? Bản tốt nhất có về 0 không?`);

  s = newSlide('Đáp án · đo thật', 'Description càng rõ giá trị hợp lệ, model càng ít điền sai', `Số đo thật: compare_tool_descriptions.py --runs 5, deepseek-v4.1-flash. Chỉ đổi description của create_ticket, mọi thứ khác giữ nguyên. Đếm đề xuất create_ticket ĐẦU TIÊN bị checkpoint ④ chặn (sai luật P3/P4 hoặc assignee không hợp lệ).
- Mơ hồ ("Tạo ticket hỗ trợ."): 5/5 sai — model tự đặt "high", "medium", "billing team".
- Có ý nghĩa tham số (bản đang dùng trong demo): 2/5 sai — model chọn P2 vì lỗi thanh toán "có vẻ" quan trọng.
- Có liệt kê giá trị hợp lệ: 0/5.
Điểm quan trọng: cả 15 lần đều tạo được ticket — khi bị chặn, lỗi trả về cho model (dữ liệu, không phải exception) và model tự sửa ở lượt sau. Description kém = tốn thêm lượt gọi, không phải hỏng hẳn.
Và: description chỉ là hướng dẫn. Đổi description không thay được kiểm tra bằng code — model vẫn có thể bỏ qua (Session 7).
Chạy lại: python3 compare_tool_descriptions.py --runs 5 (~2 phút) — chạy trước buổi, trong buổi chỉ cần --schema.`);
  const rows = [['"Tạo ticket hỗ trợ."', 'mơ hồ', 5, 'high · medium · "billing team"'],
    ['+ ý nghĩa P1–P4, assignee', 'đang dùng', 2, 'P2'],
    ['+ "chỉ P3 hoặc P4", danh sách team', 'giá trị hợp lệ', 0, '—']];
  rows.forEach(([d, tag, n, ex], i) => {
    const y = 92 + i * 66;
    label(s, 30, y, 230, 44, `${d}\n${tag}`, { size: 12, sub: 10, align: 'START' });
    box(s, 270, y + 8, Math.max(n, 0.15) * 44, 28, ' ', { fill: n ? C.ORANGE : C.BLUE, shape: 'RECTANGLE', noLine: true });
    mono(s, 280 + Math.max(n, 0.15) * 44, y + 12, 60, 20, `${n}/5`, { color: C.INK, size: 13 });
    label(s, 575, y + 8, 115, 28, ex, { size: 10, bold: false, color: C.GREY, align: 'START' });
  });
  box(s, 30, 296, 660, 52, 'Cả 15 lần đều tạo được ticket: bị ④ chặn → lỗi quay về model → model tự sửa. Description kém = thêm lượt gọi; rule vẫn phải chặn bằng code.', { fill: C.INK, size: 12, align: 'START' });

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
Demo live (~10 giây): python3 run_demo.py --scenario 1 --approve yes --fault down → helpdesk trả 503, application retry rồi ghi 📌 ESCALATED (ticket_system_unavailable), dòng cuối "Ticket trong hệ thống đích: không có". Trạng thái do application quyết theo kết quả thật, không theo câu trả lời của model.
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
3. Model gọi 2 tool trong cùng 1 lượt có được không? → được (trace kịch bản 7: 2 search_kb trong 1 lượt) — Session 8 sẽ dùng chi tiết này.
4. Description tốt khác chưa đủ ở đâu? → nói ý nghĩa và GIÁ TRỊ HỢP LỆ của tham số (đo thật: điền sai 5/5 → 2/5 → 0/5). Nhưng rule vẫn kiểm tra bằng code.`);
};
