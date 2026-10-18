// Session 8: Context, state, memory và điều kiện dừng (60 phút)
const { C, box, label, code, arrow, table, newSlide, question, sessionHeader, recap, agenda, takeaways, challenge, blank, mono, footer } = require('./slide-kit');

module.exports = function session08() {
  sessionHeader(8, 'Context, state và điều kiện dừng', 'Agent giữ gì qua các bước và biết khi nào phải dừng?',
    `Session 8 — 60 phút: mở đầu 5' · nội dung 40-45' · Q&A 10-15'.
Mục tiêu: người học phác thảo được state và tiêu chí dừng của một agent.
Warm-up: "Bạn duyệt một yêu cầu trên Jira sau 2 tiếng — hệ thống có quên yêu cầu đó không? Vì sao không?" → vì nó lưu trạng thái trong DB, không phải trong RAM.`);
  agenda([['4 loại thông tin', 'context · lịch sử · task state · memory'], ['Task state', 'lưu bền, chờ duyệt, tiếp tục sau restart'],
    ['Điều kiện dừng', '5 trường hợp + 3 giới hạn']], `Ba phần, ~13 phút mỗi phần. Demo chạy thật ở phần 2 (--approve later → --resume) và phần 3 (kịch bản 7, budget).`);

  let s = newSlide('4 loại thông tin', '4 loại thông tin — sống bao lâu và lưu ở đâu khác hẳn nhau', `Phân biệt rõ vì nhầm lẫn là nguồn bug phổ biến.
- Context của lần gọi model: mọi thứ gửi trong 1 request (system prompt, câu hỏi, tool result). Mất khi request xong. Giới hạn bởi context window.
- Lịch sử hội thoại: các lượt trước của cuộc chat. Tăng dần → phải cắt bớt/tóm tắt.
- Task state: tiến độ của MỘT việc (đang chờ duyệt, ticket nào đã tạo). Phải lưu bền trong DB — đây là trọng tâm buổi.
- Memory: thông tin dùng lại giữa các task (user thích trả lời ngắn). Chỉ lưu khi có lý do, có thời hạn, theo user_id.
Model KHÔNG nhớ gì giữa các request (Session 1, câu hỏi thử thách 06).
Lưu ý dòng Memory: demo KHÔNG triển khai memory dài hạn (xem slide Memory cuối buổi) — cột ví dụ là minh hoạ GIẢ ĐỊNH, không có trong code, để khỏi hiểu nhầm khi đọc task_state.py.`);
  table(s, 25, 85, [140, 165, 165, 200], [
    ['', 'Sống bao lâu', 'Lưu ở đâu', 'Ví dụ support agent'],
    ['Context lần gọi', '1 request', 'Trong request gửi model', 'Câu hỏi + 2 tài liệu KB'],
    ['Lịch sử hội thoại', '1 cuộc chat', 'App / DB, cắt bớt khi dài', '"Ý tôi là khách X hôm qua"'],
    ['Task state', 'Tới khi task xong', 'DB — lưu bền', 'Đang chờ duyệt ticket P3'],
    ['Memory', 'Nhiều task, có hạn', 'DB theo user_id + TTL', '(giả định) alice thích trả lời ngắn'],
  ], { rowH: 46, fills: [C.WHITE, C.WHITE, C.YELLOW, C.WHITE] });

  question('Server restart khi đang chờ người duyệt. Agent có quên không?', 'Người duyệt bấm OK sau 2 tiếng — lúc đó process cũ đã chết.',
    `Để lớp trả lời. Phần lớn sẽ nói "quên, vì state nằm trong RAM". Đúng — nếu không lưu. Slide sau: SDK có cơ chế lưu, nhưng lưu ở đâu là việc của application.`);

  s = newSlide('Đáp án · chạy thật', 'SDK đóng gói run — application quyết định lưu', `Demo thật, 2 lệnh, 2 process khác nhau:
1. --approve later: SDK dừng ở interruption; application gọi RunState.to_json() và ghi vào .state/<task_id>.json rồi thoát. Process chết.
2. --resume <task_id>: process MỚI đọc file, RunState.from_json(), dựng lại Session từ đăng nhập (①, không lưu session trong state), hỏi duyệt, chạy tiếp đúng chỗ dừng.
SDK cung cấp to_json/from_json. Application quyết định: lưu DB nào, giữ bao lâu, ai được resume.`);
  code(s, 30, 88, 660, 120, `$ python3 run_demo.py --scenario 1 --approve later
📌 task 844e2973: AWAITING_APPROVAL (chờ người duyệt)
💬 Đang chờ người duyệt. Tiếp tục: python3 run_demo.py --resume 844e2973 --approve yes

$ python3 run_demo.py --resume 844e2973 --approve yes        ← process mới
⑤ ĐỒNG Ý  →  📌 PROCESSING  →  📌 COMPLETED (ticket T-1001 confirmed)`, 10.5);
  [['SDK', 'RunState.to_json() / from_json()\nđóng gói hội thoại + tool call đang chờ', C.LIGHT], ['Application', 'lưu vào DB · dựng lại Session từ đăng nhập\nai được resume · giữ bao lâu', C.NAVY]]
    .forEach(([t, d, f], i) => box(s, 30 + i * 340, 225, 320, 110, `${t}\n${d}`, { fill: f, size: 18, sub: 11 }));

  s = newSlide('Task state', 'Task state: tiến độ, kết quả thật, việc chờ duyệt', `File state thật của task 844e2973 khi đang chờ duyệt (rút gọn phần RunState ~27KB).
Mỗi trường có lý do để lưu:
- status / stop_reason: task đang ở đâu, vì sao dừng.
- ticket_id: CHỈ ghi khi hệ thống đích trả về — là bằng chứng hoàn thành.
- pending_approval: chính xác tham số đang chờ duyệt — người duyệt xem cái này.
- tool_calls / searches: đếm để áp budget và phát hiện "thiếu dữ liệu".
KHÔNG lưu: nội dung tài liệu KB (lấy lại khi cần, quyền có thể đã đổi), session đăng nhập.`);
  code(s, 30, 88, 380, 270, `{
 "user": "alice",
 "task_id": "844e2973",
 "status": "AWAITING_APPROVAL",
 "stop_reason": "chờ người duyệt",
 "ticket_id": null,
 "pending_approval": {
   "assignee": "billing-team-a",
   "priority": "P3",
   "title": "Khách X lỗi thanh toán E205"
 },
 "tool_calls": 2,
 "searches": 2,
 "sdk_run_state": "{…27 KB…}"
}`, 10);
  [['status · stop_reason', 'task đang ở đâu, vì sao dừng'], ['ticket_id', 'chỉ ghi khi hệ thống đích trả về'], ['pending_approval', 'đúng tham số người cần duyệt'], ['Không lưu', 'nội dung KB · session đăng nhập']]
    .forEach(([t, d], i) => box(s, 430, 88 + i * 68, 260, 58, `${t}\n${d}`, { fill: i === 3 ? C.YELLOW : C.LIGHT, size: 13, sub: 11 }));

  s = newSlide('State machine', 'Bốn trạng thái — mỗi mũi tên là một điều kiện kiểm tra được', `State machine trong task_state.py.
PROCESSING ⇄ AWAITING_APPROVAL: khi có write action hợp lệ cần duyệt; quay lại PROCESSING sau khi duyệt hoặc từ chối.
PROCESSING → COMPLETED: chỉ khi trả lời có nguồn, hoặc ticket có ID xác nhận.
PROCESSING → ESCALATED (chuyển người): thiếu dữ liệu, lỗi không phục hồi, vượt budget, guardrail chặn, hoặc model nói "đã tạo" mà không có ID.
Bài tự thực hành chính là vẽ sơ đồ này cho use case của họ.`);
  box(s, 40, 160, 160, 70, 'PROCESSING\nđang xử lý', { fill: C.LIGHT, size: 15, sub: 11 });
  box(s, 280, 80, 170, 70, 'AWAITING_APPROVAL\nchờ người duyệt', { fill: C.YELLOW, size: 13, sub: 11 });
  box(s, 520, 120, 170, 70, 'COMPLETED\ncó nguồn / có ticket ID', { fill: C.GREEN, size: 15, sub: 11 });
  box(s, 520, 230, 170, 70, 'ESCALATED\nchuyển người', { fill: C.ORANGE, size: 15, sub: 11 });
  arrow(s, 200, 175, 280, 125); arrow(s, 280, 140, 200, 190, C.ORANGE);
  arrow(s, 200, 190, 520, 155); arrow(s, 200, 215, 520, 265);
  label(s, 190, 125, 70, 20, 'cần duyệt', { size: 9, bold: false });
  label(s, 120, 120, 100, 20, 'duyệt / từ chối', { size: 9, bold: false, color: C.ORANGE });
  label(s, 300, 170, 200, 20, 'xong thật', { size: 10, bold: false });
  label(s, 250, 255, 220, 20, 'thiếu dữ liệu · lỗi · budget', { size: 10, bold: false });
  box(s, 40, 320, 650, 40, 'Mỗi trạng thái lưu vào DB → server restart vẫn biết task đang ở đâu', { fill: C.NAVY, size: 13 });

  s = newSlide('Hoàn thành thật', 'Chỉ báo hoàn thành khi hệ thống đích trả ID xác nhận', `Ví dụ trong đề cương: agent đã gọi create_ticket nhưng chưa có ID xác nhận → chưa được báo hoàn thành.
Ba trường hợp thật trong demo:
- Bình thường: hệ thống trả T-1001 → COMPLETED.
- Timeout rồi retry với idempotency: vẫn có ID T-1001 (trả lại ticket cũ) → COMPLETED.
- Helpdesk 503: không có ID → ESCALATED, dù model có muốn nói "đã xong".`);
  table(s, 30, 90, [200, 230, 230], [
    ['Tình huống', 'Hệ thống đích trả', 'Trạng thái task'],
    ['Bình thường', '{"ticket_id": "T-1001"}', 'COMPLETED'],
    ['Timeout → retry (idempotency)', 'T-1001 (ticket cũ)', 'COMPLETED'],
    ['Helpdesk 503', 'lỗi — không có ID', 'ESCALATED'],
    ['Model nói "đã tạo", không gọi tool', 'không có gì', 'ESCALATED'],
  ], { rowH: 44, fills: [C.GREEN, C.GREEN, C.YELLOW, C.YELLOW] });

  s = newSlide('Điều kiện dừng', 'Năm lý do dừng — mỗi lý do ứng với một trạng thái', `Năm điều kiện dừng theo đề cương; cột cuối là cách tái hiện trong demo (đều đã chạy thật).
Điểm hay bị quên: "thiếu dữ liệu" là điều kiện dừng hợp lệ. Agent nên nói "không có tài liệu" và chuyển người, thay vì tra thêm vô hạn hoặc bịa.
Kịch bản 7 (hoá đơn VAT, KB không có): model tra 3 lần, cả 3 rỗng → ESCALATED (missing_data), câu trả lời nói rõ không tìm thấy.`);
  table(s, 25, 85, [150, 190, 330], [
    ['Lý do dừng', 'Trạng thái', 'Tái hiện trong demo'],
    ['Hoàn thành thật', 'COMPLETED', '--scenario 1 → ticket T-1001'],
    ['Thiếu dữ liệu', 'ESCALATED (missing_data)', '--scenario 7 → 3 lần tra đều rỗng'],
    ['Chờ người duyệt', 'AWAITING_APPROVAL', '--approve later → lưu .state/'],
    ['Lỗi không phục hồi', 'ESCALATED', '--fault down → helpdesk 503'],
    ['Vượt budget', 'ESCALATED (budget)', 'DEMO_MAX_TOOL_CALLS=1 --scenario 7'],
  ], { rowH: 42, size: 10.5 });

  s = newSlide('Giới hạn', 'Ba giới hạn: số bước, thời gian và số tool call', `Mỗi giới hạn chặn một kiểu chạy mãi khác nhau:
- max_turns=8 (SDK): số lượt gọi model. Vượt → MaxTurnsExceeded.
- RUN_TIMEOUT_S=120 (asyncio.wait_for): model/gateway chậm. Eval thật: có lượt mất 124 giây.
- MAX_TOOL_CALLS=6 (application): số tool call của task.
Cả ba khi vượt đều → ESCALATED, user được báo đã chuyển người, không treo.`);
  [['max_turns = 8', 'số lượt gọi model', 'SDK · Runner.run'], ['RUN_TIMEOUT_S = 120', 'thời gian một lần chạy', 'application · asyncio'], ['MAX_TOOL_CALLS = 6', 'số tool call của task', 'application · checkpoints']]
    .forEach(([t, d, w], i) => box(s, 30 + i * 225, 100, 210, 110, `${t}\n${d}\n${w}`, { fill: i ? C.NAVY : C.LIGHT, size: 15, sub: 11 }));
  code(s, 30, 230, 660, 110, `$ DEMO_MAX_TOOL_CALLS=1 python3 run_demo.py --scenario 7
📌 task 7b5c27d5: ESCALATED (tool_call_budget)
💬 "Mình chưa tra được tài liệu hướng dẫn xuất hoá đơn VAT điện tử trong knowledge base
    (lần tìm đầu không có kết quả, các lần tra tiếp đã vượt giới hạn công cụ của phiên này)."`, 10);

  question('Đã có max_turns = 8. Cần thêm MAX_TOOL_CALLS làm gì?', 'Gợi ý: một lượt gọi model có thể sinh ra mấy tool call?',
    `Để lớp nghĩ. Đáp án: 1 turn có thể chứa nhiều tool call song song → giới hạn turn không giới hạn được số tool call.`);

  s = newSlide('Đáp án · trace thật', 'Một lượt model có thể gọi nhiều tool — giới hạn lượt không đủ', `Trace thật kịch bản 7: ở lượt 2, model gọi search_kb HAI lần cùng lúc (2 query khác nhau).
8 lượt × nhiều tool call/lượt → số tool call có thể vượt xa 8. Với write tool (gửi email, tạo ticket) đó là rủi ro thật.
Vì vậy demo đếm tool call ở application (MAX_TOOL_CALLS), độc lập với max_turns của SDK.`);
  code(s, 30, 88, 660, 160, `🧠  1.5s  model call  tokens=565+77                       ← lượt 1
🤖        search_kb(query='cách xuất hoá đơn VAT điện tử hướng dẫn')
🧠  1.8s  model call  tokens=815+142                      ← lượt 2
🤖        search_kb(query='hoá đơn VAT điện tử')            ┐ 2 tool call
🤖        search_kb(query='invoice VAT electronic xuất hoá đơn') ┘ trong 1 lượt
🧠  2.4s  model call  tokens=1299+246                     ← lượt 3: trả lời`, 10.5);
  [['max_turns', 'giới hạn số lượt model'], ['MAX_TOOL_CALLS', 'giới hạn số hành động thật']].forEach(([t, d], i) =>
    box(s, 30 + i * 340, 270, 320, 70, `${t}\n${d}`, { fill: i ? C.NAVY : C.LIGHT, size: 16, sub: 12 }));

  s = newSlide('Memory', 'Memory: có lý do, có thời hạn, không lẫn tenant', `Demo cố ý KHÔNG có memory dài hạn — support agent chưa cần. Đây là quyết định thiết kế: YAGNI.
Khi cần (ví dụ nhớ khách hàng ưa trả lời tiếng Anh), 3 rule:
1. Có lý do: ghi rõ dùng để làm gì. Không "lưu hết cho chắc".
2. Có thời hạn: TTL (demo: STATE_TTL_DAYS = 30 cho task state).
3. Theo user_id, có tenant: memory của tenant A không bao giờ đọc được ở tenant B — đây là lỗi rò dữ liệu kinh điển (Giai đoạn 5).`);
  [['Có lý do', 'ghi rõ dùng để làm gì\nkhông "lưu hết cho chắc"'], ['Có thời hạn', 'TTL — task state demo: 30 ngày'], ['Không lẫn tenant', 'key = tenant + user_id\nlọc khi đọc']]
    .forEach(([t, d], i) => box(s, 30 + i * 225, 100, 210, 120, `${t}\n${d}`, { fill: C.LIGHT, size: 17, sub: 12 }));
  box(s, 30, 245, 660, 60, 'Support agent demo không có memory dài hạn — chưa có use case cần nó', { fill: C.YELLOW, size: 14 });

  takeaways([
    ['4 loại thông tin', 'Context mất sau 1 request; task state phải lưu bền; memory chỉ lưu khi có lý do'],
    ['Lưu bền', 'SDK đóng gói run (RunState); application chọn nơi lưu và dựng lại session khi resume'],
    ['Hoàn thành', 'Chỉ khi hệ thống đích trả ID — câu "đã xong" của model không phải bằng chứng'],
    ['Dừng', '5 lý do dừng, 3 giới hạn — vượt giới hạn thì chuyển người, không treo'],
  ], `Tóm tắt 2 phút trước Q&A.`);

  challenge('Vẽ state machine cho agent của bạn: đang xử lý · chờ phê duyệt · hoàn thành · chuyển người. Ghi dữ liệu lưu ở từng trạng thái và điều kiện chuyển trạng thái.', [
    'Vì sao không lưu nội dung tài liệu KB vào task state?',
    'Có max_turns rồi, vì sao vẫn cần đếm tool call?',
    'Khi nào "không tìm thấy tài liệu" là kết quả đúng?',
    'Server restart lúc chờ duyệt — cần lưu gì để chạy tiếp?',
  ], `Bài tự thực hành theo đề cương.
Câu hỏi nhanh cho Q&A:
1. Vì sao không lưu nội dung tài liệu KB vào task state? → quyền có thể đổi; lấy lại khi cần.
2. Vì sao max_turns không đủ? → 1 lượt nhiều tool call.
3. Khi nào "thiếu dữ liệu" là kết quả đúng? → khi KB không có; bịa mới là sai.`);
};
