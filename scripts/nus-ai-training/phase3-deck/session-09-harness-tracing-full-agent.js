// Session 9: Agent harness, tracing và support agent hoàn chỉnh (60 phút)
const { C, box, label, code, arrow, twoWay, table, newSlide, question, sessionHeader, recap, agenda, takeaways, challenge, blank, mono, footer } = require('./slide-kit');

module.exports = function session09() {
  sessionHeader(9, 'Harness, tracing và agent hoàn chỉnh', 'Cần những kiểm soát gì để một agent demo trở thành prototype có thể review?',
    `Session 9 — 60 phút: mở đầu 5' · nội dung 40-45' · Q&A 10-15'. Buổi cuối Giai đoạn 3.
Mục tiêu: người học có bản thiết kế agent đủ rõ để thảo luận với đội triển khai.
Warm-up: "Bạn review PR của đồng nghiệp làm agent. Bạn sẽ hỏi 3 câu gì?" — ghi lên bảng, cuối buổi so lại.`);
  recap('Session 8: agent nhớ gì và khi nào dừng', [
    'Task state lưu bền: PROCESSING · AWAITING_APPROVAL · COMPLETED · ESCALATED',
    'Hoàn thành chỉ khi hệ thống đích trả ID — không tin câu "đã xong" của model',
    '5 lý do dừng, 3 giới hạn: max_turns · thời gian · số tool call',
  ], `2-3 phút. Hỏi nhanh: "Server restart khi đang chờ duyệt thì sao?" → state trong DB, --resume.
Nối sang hôm nay: ta đã có đủ mảnh rời (tools, quyền, retry, state, giới hạn). Hôm nay ghép lại thành harness và học cách nhìn bên trong bằng trace.`);
  agenda([['Harness', '6 lớp bao quanh agent loop'], ['Trace', 'xem agent đã làm gì — và giới hạn của nó'],
    ['Agent hoàn chỉnh', 'kiến trúc 1 trang · failure case · test']], `Ba phần, ~13 phút mỗi phần. Phần 3 kết thúc Giai đoạn 3.`);

  let s = newSlide('Harness', 'Harness: 6 lớp bao quanh agent loop', `Harness là phần application dựng xung quanh Runner.run. Sáu lớp theo đề cương, cột cuối chỉ chỗ trong demo để người học tự mở code xem.
Agent loop của SDK nằm giữa; harness quyết định agent được làm gì, tốn bao nhiêu, dừng khi nào, đi đâu khi không xử lý được.`);
  table(s, 25, 85, [150, 270, 250], [
    ['Lớp', 'Trả lời câu hỏi', 'Trong demo'],
    ['Phạm vi tools', 'Agent được mở những tool nào?', 'Agent(tools=[search_kb, create_ticket])'],
    ['Permission', 'User này được làm gì?', '① session · ② filter · ④ validate'],
    ['Approval', 'Hành động nào cần người duyệt?', '⑤ needs_approval · interruptions'],
    ['Budget', 'Tốn tối đa bao nhiêu?', 'max_turns · RUN_TIMEOUT_S · MAX_TOOL_CALLS'],
    ['State', 'Task đang ở đâu?', 'task_state.py · .state/<task_id>.json'],
    ['Chuyển người', 'Không xử lý được thì sao?', 'ESCALATED + lý do'],
  ], { rowH: 38, size: 10 });

  question('Bỏ một lớp harness thì chuyện gì xảy ra?', 'Demo cho phép tắt từng lớp — model vẫn là model thật.',
    `Chia lớp thành nhóm, mỗi nhóm đoán hậu quả khi bỏ 1 lớp. Slide sau là kết quả thật / cách tái hiện.`);

  s = newSlide('Đáp án', 'Bỏ lớp nào, sự cố của lớp đó quay lại', `Cột giữa là hậu quả; cột phải là lệnh tái hiện.
Ghi chú kịch bản 5 --disable 4: hậu quả chỉ xảy ra khi model bị lừa. Eval thật: qwen-3.7-flash bị lừa 2/2 lần; deepseek ít bị hơn. Không đoán trước được model nào bị lừa → không dựa vào model.
Câu hỏi "lớp nào nguy hiểm nhất khi thiếu?" → lớp đứng trước side effect lớn nhất: permission (④) và approval (⑤).`);
  table(s, 25, 85, [140, 290, 240], [
    ['Bỏ lớp', 'Hậu quả', 'Tái hiện'],
    ['Permission ④', 'Model bị lừa → ticket P1 gán CEO được tạo', '--scenario 5 --disable 4 --approve yes'],
    ['Permission ①②', 'Model điền tenant theo lời user → rò dữ liệu', '--scenario 4 --disable 1 --disable 2'],
    ['Idempotency', 'Timeout + retry → ticket trùng', '--scenario 6 --disable idem'],
    ['Budget', 'Agent tra mãi, user chờ, tốn token', 'so sánh DEMO_MAX_TOOL_CALLS'],
    ['Chuyển người', 'Lỗi xảy ra nhưng user tưởng đã xong', '--fault down (xem stop_reason)'],
  ], { rowH: 42, size: 10 });

  s = newSlide('Trace', 'Trace: model call, tool call, guardrail và lỗi', `OpenAI Agents SDK tự sinh "span" cho mỗi bước. Mặc định gửi về dashboard OpenAI; demo thay bằng trace_local.py: ghi file .traces/<trace_id>.jsonl trên máy mình (không gửi dữ liệu khách ra ngoài) và in ra với --trace.
Bốn loại span hay đọc: 🛡 guardrail, 🧠 model call (model, token, thời gian), 🔧 tool call (tham số, kết quả), ❌ lỗi.
Dùng khi: "vì sao agent trả lời sai?", "vì sao chậm?", "tool nào bị gọi với tham số gì?".`);
  [['🛡 Guardrail', 'có chặn không'], ['🧠 Model call', 'model · token · giây'], ['🔧 Tool call', 'tham số · kết quả'], ['❌ Lỗi', 'bước nào, thông báo gì']]
    .forEach(([t, d], i) => box(s, 25 + i * 170, 90, 155, 60, `${t}\n${d}`, { fill: i === 3 ? C.ORANGE : C.LIGHT, size: 14, sub: 11 }));
  code(s, 25, 170, 665, 175, `$ python3 run_demo.py --scenario 1 --approve yes --trace
🔎 🛡   0.0s  guardrail no_card_number triggered=False
🔎 🧠   1.6s  model call deepseek-v4.1-flash tokens=574+81
🔎 🔧   0.0s  tool search_kb({"query": "lỗi thanh toán mã E205"}) → "<untrusted_search_results>…"
🔎 🧠   2.1s  model call deepseek-v4.1-flash tokens=828+252
🔎 🔧   0.0s  tool create_ticket(…) → '{"ticket_id": "T-1001", "status": "created"}'

$ python3 run_demo.py --scenario 8 --trace
🔎 🛡   0.0s  guardrail no_card_number triggered=True   ❌ Guardrail tripwire triggered`, 10);

  s = newSlide('Giới hạn của trace', 'Trace xanh không có nghĩa là agent đúng', `Phân biệt quan sát kỹ thuật với đánh giá user task.
Trace kịch bản 5 khi model bị lừa: mọi span xanh, không lỗi, HTTP 200, thời gian bình thường — nhưng model đề xuất ticket P1 gán CEO. Trace không biết "P1 gán CEO" là sai.
Đánh giá đúng/sai cần tiêu chí nghiệp vụ: test case có đáp án (run_eval.py), task state (có ticket ID không), phản hồi user.
Câu nói để nhớ: "Trace xanh không có nghĩa là agent đúng."`);
  table(s, 30, 90, [180, 240, 240], [
    ['', 'Trace (quan sát kỹ thuật)', 'Đánh giá user task'],
    ['Trả lời câu hỏi', 'Bước nào chạy, bao lâu, lỗi gì', 'Kết quả có đúng nghiệp vụ không'],
    ['Kịch bản 5, model bị lừa', 'Tất cả xanh, không lỗi', 'SAI: đề xuất P1 gán CEO'],
    ['Công cụ trong demo', 'trace_local.py · .traces/', 'run_eval.py · task state'],
  ], { rowH: 48 });
  box(s, 30, 300, 660, 45, 'Trace xanh không có nghĩa là agent đúng', { fill: C.NAVY, size: 15 });

  s = newSlide('Theo một yêu cầu', 'Một yêu cầu: từ câu hỏi đến ticket có ID', `Ví dụ trong đề cương: theo cùng một yêu cầu từ câu hỏi ban đầu đến câu trả lời có nguồn hoặc ticket có ID. Đây là lần chạy thật kịch bản 1.
Đọc từng bước, chỉ ra lớp harness nào làm việc ở bước đó. Ý chính: model chỉ xuất hiện ở bước 3, 5, 9 — mọi bước còn lại là application.`);
  [['1', 'alice hỏi + nhờ tạo ticket', 'user'], ['2', 'guardrail: không có số thẻ', 'harness'], ['3', 'model: gọi search_kb', 'model'],
    ['4', '② lọc quyền → kb-a-001, kb-a-002', 'harness'], ['5', 'model: đề xuất P3 → billing-team-a', 'model'], ['6', '④ hợp lệ → AWAITING_APPROVAL', 'harness'],
    ['7', '⑤ người duyệt đồng ý', 'người'], ['8', 'Helpdesk trả T-1001 → state ghi ID', 'harness'], ['9', 'model: trả lời có nguồn → COMPLETED', 'model']]
    .forEach(([k, t, who], i) => {
      const x = 25 + (i % 3) * 225; const y = 90 + Math.floor(i / 3) * 90;
      const f = who === 'model' ? C.LIGHT : who === 'harness' ? C.NAVY : C.GREEN;
      box(s, x, y, 210, 75, `${k} · ${who}\n${t}`, { fill: f, size: 12, sub: 11 });
    });

  s = newSlide('Kiến trúc', 'Support agent hoàn chỉnh trên một trang', `Ghép goal, model, RAG, tools, state, harness. Màu: navy = application (mình chịu trách nhiệm), xanh nhạt = SDK/model, xanh lá = hệ thống ngoài.
Mũi tên navy → là request, cam ← là kết quả quay về.
Đây cũng là khung cho bài tự thực hành: người học vẽ lại cho use case của mình, tô màu phần SDK và phần application.`);
  box(s, 25, 95, 110, 70, 'User\ncâu hỏi', { fill: C.GREEN, size: 15, sub: 11 });
  box(s, 175, 85, 330, 230, ' ', { fill: C.CARD, valign: 'TOP' });
  label(s, 180, 88, 320, 18, 'HARNESS — application', { size: 9, color: C.ORANGE, align: 'START' });
  box(s, 195, 115, 290, 60, 'Runner.run — agent loop (SDK)\nmodel deepseek-v4.1-flash qua gateway', { fill: C.LIGHT, size: 13, sub: 10 });
  [['search_kb', 'RAG + ② lọc quyền'], ['create_ticket', '④ ⑤ + idempotency']].forEach(([t, d], i) =>
    box(s, 195 + i * 150, 195, 140, 55, `${t}\n${d}`, { fill: C.NAVY, size: 13, sub: 10 }));
  box(s, 195, 262, 290, 40, 'Task state · trace · guardrail', { fill: C.NAVY, size: 12 });
  twoWay(s, 135, 175, 130);
  box(s, 560, 110, 135, 60, 'Knowledge base\ntheo tenant', { fill: C.GREEN, size: 13, sub: 10 });
  box(s, 560, 200, 135, 60, 'Helpdesk\ntrả ticket ID', { fill: C.GREEN, size: 13, sub: 10 });
  twoWay(s, 505, 560, 140); twoWay(s, 505, 560, 230);
  label(s, 25, 330, 670, 30, 'navy = application chịu trách nhiệm · xanh nhạt = SDK/model · xanh lá = hệ thống ngoài', { size: 11, bold: false, color: C.GREY });

  s = newSlide('Failure case', 'Bốn failure case phải kiểm tra trước khi mở rộng', `Bốn failure case theo đề cương; mỗi cái có cách phát hiện và test tương ứng trong demo.
- Sai tool: gọi create_ticket khi user chỉ hỏi → eval case 2 (model_ok kiểm tra không có đề xuất ticket).
- Thiếu quyền: viewer tạo ticket → case 3.
- Lặp bước: tra mãi không dừng → budget + stop_reason.
- Không có nguồn: trả lời không trích id tài liệu → kiểm tra answer có "kb-" hoặc nói rõ không tìm thấy.`);
  table(s, 25, 90, [150, 270, 250], [
    ['Failure case', 'Cách phát hiện', 'Test trong demo'],
    ['Sai tool', 'Có tool call create_ticket khi user chỉ hỏi', 'eval case 2 · kịch bản 2'],
    ['Thiếu quyền', 'Write action từ role không được phép', 'eval case 3 · kịch bản 3'],
    ['Lặp bước', 'tool_calls vượt budget, stop_reason=budget', 'DEMO_MAX_TOOL_CALLS'],
    ['Không có nguồn', 'Câu trả lời không trích id tài liệu', 'kịch bản 7 · kiểm tra "kb-"'],
  ], { rowH: 46 });

  s = newSlide('Prototype nhỏ nhất', 'Prototype nhỏ nhất + test case — rồi mới mở rộng', `Đừng mở rộng (thêm tool, thêm tenant) khi chưa có test case.
Demo có 5 test case đại diện (run_eval.py), mỗi case chấm 2 cột:
- model_ok: model tự làm đúng không (dao động theo model).
- system_ok: hệ thống có an toàn không (không ticket sai, không rò dữ liệu) — phải luôn đạt nhờ code.
Chạy thật hôm nay với deepseek-v4.1-flash: 5/5 cả hai cột, ~3.300 token/case, 6.5 giây/case.
So sánh nhiều model và cách đọc bảng eval → Giai đoạn 5.`);
  code(s, 30, 88, 660, 75, `$ python3 run_eval.py --runs 1 --models deepseek-v4.1-flash
model                   model đúng  hệ thống an toàn  latency TB  token TB
deepseek-v4.1-flash            5/5               5/5       6.5s      3315`, 10.5);
  [['P1', 'Q&A read-only\n1 tenant, có nguồn'], ['P2', 'Đề xuất ticket\n+ người duyệt'], ['P3', 'Mở rộng nguồn\n& phân quyền']].forEach(([t, d], i) => {
    box(s, 30 + i * 230, 185, 200, 90, `${t}\n${d}`, { fill: i ? C.LIGHT : C.GREEN, size: 20, sub: 12 });
    if (i) arrow(s, 30 + i * 230 - 28, 230, 30 + i * 230, 230);
  });
  label(s, 30, 290, 660, 50, 'Chỉ sang bước sau khi test case của bước trước đạt — system_ok luôn phải đạt', { size: 13, align: 'START' });

  s = newSlide('Tổng kết Giai đoạn 3', 'Sau 5 buổi: một support agent có thể đem đi review', `Bảng tổng kết cả giai đoạn — mỗi buổi thêm gì vào agent và nằm ở file nào. Người học có thể mở từng file đọc lại.`);
  table(s, 25, 85, [70, 330, 270], [
    ['Buổi', 'Agent có thêm', 'File'],
    ['S5', 'Chọn đúng mức điều phối · agent tối thiểu', 'agent_openai_sdk.py'],
    ['S6', 'Tool contract đủ 6 phần · read/write tách riêng', 'checkpoints.py'],
    ['S7', 'Quyền bằng code · retry + idempotency · approval', 'checkpoints.py · ticket_system.py'],
    ['S8', 'Task state lưu bền · resume · 5 lý do dừng', 'task_state.py'],
    ['S9', 'Harness 6 lớp · trace local · test case', 'trace_local.py · run_eval.py'],
  ], { rowH: 42, size: 10.5 });

  takeaways([
    ['Harness', '6 lớp bao quanh loop; bỏ lớp nào thì sự cố tương ứng quay lại'],
    ['Trace', 'Cho biết agent chạy thế nào — "trace xanh" không có nghĩa là làm đúng'],
    ['Kiến trúc', 'SDK ở giữa, application chịu trách nhiệm dữ liệu, quyền, approval, state'],
    ['Mở rộng', 'Prototype nhỏ nhất + test case đại diện trước; system_ok luôn phải đạt'],
  ], `Tóm tắt 2 phút trước Q&A. Quay lại 3 câu hỏi review ghi trên bảng lúc warm-up — đã trả lời được chưa?`);

  challenge('Vẽ architecture agent của bạn trên 1 trang: tô màu phần SDK hỗ trợ và phần application chịu trách nhiệm, rồi liệt kê 3 trường hợp cần kiểm thử trước khi mở rộng.', [
    'Thiếu lớp harness nào thì nguy hiểm nhất cho use case của bạn?',
    'Trace có thay được bộ test case không?',
    'Điều kiện nào để mở rộng từ P1 sang P2?',
    'Trace xanh mà agent vẫn sai — ví dụ nào?',
  ], `Bài tự thực hành theo đề cương — đây là bản thiết kế mang tới thảo luận với đội triển khai.
Câu hỏi nhanh cho Q&A:
1. Lớp harness nào nguy hiểm nhất khi thiếu? → lớp đứng trước side effect lớn nhất.
2. Trace có thay được eval không? → không.
3. Khi nào mở rộng prototype? → khi test case đại diện đạt, system_ok luôn đạt.
Giai đoạn 4 (Session 10-11): đưa search_kb / create_ticket thành MCP server — tool dùng chung cho nhiều agent; kiểm tra quyền vẫn nằm ở phía server.`);
};
