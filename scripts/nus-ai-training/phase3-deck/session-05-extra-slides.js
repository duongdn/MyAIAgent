// Session 5 — các slide "hàm lượng thông tin cao": sơ đồ 3 mức, số đo thật, token tăng theo lượt, trace định vị.
// Số liệu từ support_agent_demo/compare_orchestration_levels.py (orchestration_levels.json) + trace kịch bản 1.
const { C, box, label, mono, code, arrow, twoWay, newSlide, question } = require('./slide-kit');
const data = require('../support_agent_demo/orchestration_levels.json');
const cond = require('../support_agent_demo/orchestration_levels_conditional.json');

// 3 mức vẽ thành 3 luồng: ai giữ thứ tự bước
function threeFlows() {
  const s = newSlide('3 mức điều phối', 'Khác nhau ở một điểm: ai chọn bước tiếp theo', `Session 2 đã có 4 pattern; RAG để Session 3–4. Ở đây chỉ so 3 mức trên CÙNG một yêu cầu, nhìn đúng một trục: ai chọn bước tiếp theo.
- Model call: code chuẩn bị prompt (kèm tài liệu RAG), gọi model ĐÚNG 1 lần. Không có "bước tiếp theo".
- Workflow: CODE giữ thứ tự: phân loại → tra KB → trả lời → tạo ticket. Model chỉ làm từng ô được giao. Đổi thứ tự = sửa code.
- Agent: model nhận MỤC TIÊU (không phải danh sách bước) + danh sách tool, TỰ chọn gọi tool nào, mấy lần. Điều kiện dừng: model trả lời cuối, hoặc chạm max_turns do application đặt (Session 8 đi sâu 5 lý do dừng).
Ô màu cam = chỗ model ra quyết định. Ô tối = code ra quyết định.`);
  const row = (y, name, sub, steps) => {
    mono(s, 40, y, 140, 14, name.toUpperCase(), { size: 9 });
    label(s, 40, y + 14, 130, 30, sub, { size: 10, bold: false, align: 'START', valign: 'TOP', color: C.GREY });
    steps.forEach(([t, who], i) => {
      const x = 180 + i * 120;
      box(s, x, y, 96, 40, t, { fill: who === 'model' ? C.ORANGE : who === 'code' ? C.INK : C.CARD, size: 10.5 });
      if (i) arrow(s, x - 24, y + 20, x - 2, y + 20);
    });
  };
  row(92, 'Model call', '1 lượt gọi', [['Code: tra KB', 'code'], ['Model trả lời', 'model']]);
  row(160, 'Workflow', 'code giữ thứ tự', [['Model: phân loại', 'model'], ['Code: tra KB', 'code'], ['Model trả lời', 'model'], ['Code: tạo ticket', 'code']]);
  // Agent: vòng lặp thật — model ⇄ code chạy tool; khi đủ thông tin mới thoát sang trả lời
  const y = 236;
  mono(s, 40, y, 140, 14, 'AGENT', { size: 9 });
  label(s, 40, y + 14, 130, 30, 'nhận mục tiêu, tự chọn bước', { size: 10, bold: false, align: 'START', valign: 'TOP', color: C.GREY });
  box(s, 180, y, 110, 44, 'Model: chọn tool tiếp theo', { fill: C.ORANGE, size: 10.5 });
  box(s, 380, y, 140, 44, 'Code chạy tool\nsearch_kb · create_ticket', { fill: C.INK, size: 10.5, sub: 9 });
  twoWay(s, 292, 378, y + 22);
  label(s, 292, y + 2, 86, 14, 'gọi tool', { size: 8.5, bold: false, color: C.INK });
  label(s, 292, y + 30, 86, 14, 'kết quả', { size: 8.5, bold: false, color: C.ORANGE });
  box(s, 580, y, 96, 44, 'Model: trả lời', { fill: C.ORANGE, size: 10.5 });
  arrow(s, 235, y, 235, y - 14, C.INK, false); arrow(s, 235, y - 14, 628, y - 14, C.INK, false); arrow(s, 628, y - 14, 628, y - 2, C.INK);
  label(s, 400, y - 30, 200, 14, 'đủ thông tin → dừng', { size: 9, bold: false, color: C.INK });
  label(s, 180, y + 48, 500, 16, '↻ số lượt do model quyết · dừng: trả lời cuối hoặc max_turns', { size: 9, bold: false, color: C.ORANGE, align: 'START' });
  box(s, 40, 330, 14, 14, ' ', { fill: C.ORANGE, noLine: true }); label(s, 58, 326, 200, 22, 'model quyết định', { size: 10, bold: false, align: 'START' });
  box(s, 190, 330, 14, 14, ' ', { fill: C.INK }); label(s, 208, 326, 200, 22, 'code quyết định', { size: 10, bold: false, align: 'START' });
}

// Code của 3 mức (rút gọn từ compare_orchestration_levels.py) + output chạy thật với --show
function threeFlowsCode() {
  const s = newSlide('3 mức · code chạy thật', 'Cùng một yêu cầu, 3 cách viết code', `Đây là code thật của slide trước, rút gọn từ support_agent_demo/compare_orchestration_levels.py (llm() = 1 lần gọi chat completions qua gateway công ty).
Chạy live: python3 compare_orchestration_levels.py --runs 1 --show  (~25 giây, model thật, không ghi đè số đo trên slide).
Đọc cột trái theo từng mức:
- Model call: code tra KB rồi gọi model đúng 1 lần. Muốn tạo ticket → không có chỗ nào để làm.
- Workflow: thứ tự 4 bước nằm trong code. Model chỉ điền vào ô "phân loại" và ô "trả lời". Tham số ticket (P3, billing-team-a) code viết sẵn.
- Agent: code chỉ khai báo mục tiêu + danh sách tool + max_turns. Gọi tool nào, mấy lần là model quyết định lúc chạy; SDK chạy vòng lặp.
Cột phải là output thật: [CODE]/[MODEL] khớp màu ô tối/cam ở slide trước. Ở mức Agent, các dòng 🧠/🔧 là trace của SDK: model call → search_kb → model call → create_ticket → model call trả lời.
Chú ý khi chạy live: ở mức Agent sẽ có thêm dòng kiểm quyền + chờ duyệt create_ticket — đó là phần application kiểm soát, Session 7 sẽ giải thích; hôm nay chỉ cần nhìn số lượt và thứ tự bước.`);
  code(s, 40, 86, 352, 262, `# 1 · Model call — gọi model đúng 1 lần
docs = search_kb("lỗi E205")           # code
answer = await llm(docs + question)    # model

# 2 · Workflow — code giữ thứ tự
intent = await llm("need_ticket? " + q) # model
docs = search_kb("lỗi E205")           # code
answer = await llm(docs + q)           # model
if "true" in intent:                   # code
    create_ticket("P3", "billing-team-a")

# 3 · Agent — model chọn tool, SDK lặp
agent = Agent(instructions=SYSTEM_PROMPT,
              tools=[search_kb, create_ticket])
await Runner.run(agent, q, max_turns=8)`, 8.5);
  code(s, 404, 86, 276, 262, `== Model call + RAG ==
[CODE ] tra KB: search_kb(...)
[MODEL] trả lời → E205 = ngân hàng
        từ chối [kb-a-002]...

== Workflow ==
[MODEL] phân loại → {"need_ticket": true}
[CODE ] tra KB: search_kb(...)
[MODEL] trả lời → E205 = ngân hàng...
[CODE ] tạo ticket: P3, billing-team-a

== Agent ==
🧠 model call   574+70 tok
🔧 search_kb("lỗi thanh toán E205")
🧠 model call   817+348 tok
🔧 create_ticket(P3, billing-team-a)
   → T-1001
🧠 model call   1194+171 tok · trả lời`, 8.5);
}

// Đo thật: cùng 1 yêu cầu, 3 mức
function measuredCost() {
  question('Cùng một yêu cầu — agent tốn hơn bao nhiêu?', '"Khách báo lỗi E205, xử lý sao? Tạo ticket cho billing team giúp tôi."',
    `Cho lớp đoán: agent tốn gấp mấy lần workflow? chậm hơn bao nhiêu? Ghi lên bảng rồi lật đáp án.`);
  const s = newSlide('Đáp án · đo thật', 'Agent tốn ~2,6× token so với workflow cho cùng việc', `Số đo thật: compare_orchestration_levels.py, model ${data.model}, ${data.runs} lần mỗi mức, lấy trung bình, đã tắt cache gateway.
Đọc bảng:
- Model call rẻ nhất nhưng KHÔNG làm được nửa sau yêu cầu (tạo ticket) — nó chỉ trả lời.
- Workflow làm đủ việc với 2 lượt gọi: vì yêu cầu này có bước biết trước, workflow là lựa chọn tốt hơn agent.
- Agent làm đủ việc nhưng tốn ~2,6× token so với workflow (~2,7× so với model call): mỗi lượt gọi gửi lại toàn bộ hội thoại (slide sau).
- Thời gian gần như nhau (~7 giây) — chi phí agent nằm ở token, không phải độ trễ, với yêu cầu ngắn thế này.
Kết luận: agent đáng tiền khi số bước KHÔNG biết trước. Ở đây biết trước → workflow thắng.
Chạy lại trong buổi: python3 compare_orchestration_levels.py --runs 1 (~25 giây).`);
  const max = Math.max(...data.rows.map((r) => r.tokens));
  data.rows.forEach((r, i) => {
    const y = 100 + i * 62;
    label(s, 40, y, 150, 40, `${r.level}\n${String(r.calls).replace(".", ",")} lượt gọi · ${String(r.secs).replace(".", ",")}s`, { size: 13, sub: 10, align: 'START' });
    box(s, 200, y + 8, Math.max(8, (r.tokens / max) * 280), 26, ' ', { fill: i === 2 ? C.ORANGE : C.BLUE, shape: 'RECTANGLE', noLine: true });
    mono(s, 210 + (r.tokens / max) * 280, y + 10, 90, 22, `${Math.round(r.tokens).toLocaleString("de-DE")} token`, { color: C.INK, size: 11 });
    box(s, 610, y + 6, 70, 30, r.tickets ? 'tạo ticket ✓' : 'không tạo', { fill: r.tickets ? C.GREEN : C.MUTED, size: 9.5 });
  });
  box(s, 40, 300, 640, 50, 'Bước biết trước → workflow đủ việc, ít token hơn', { fill: C.INK, size: 12.5, align: 'START' });
}

// Vì sao agent tốn token: mỗi lượt gửi lại toàn bộ hội thoại
function tokenGrowth() {
  const s = newSlide('Vì sao tốn hơn', 'Mỗi lượt, agent gửi lại toàn bộ hội thoại cho model', `Session 1: model không giữ state giữa các lần gọi. Đây là hệ quả về tiền: mỗi lượt agent phải gửi lại câu hỏi + mọi tool call + kết quả trước đó.
Số thật từ trace kịch bản 1: input token lượt 1 = 574, lượt 2 = 828 (thêm kết quả search_kb), lượt 3 = 1.109 (thêm kết quả create_ticket). Tổng input 2.511 dù câu hỏi chỉ ~60 token.
Hệ quả: agent càng nhiều bước, chi phí tăng nhanh hơn tuyến tính. Đây là lý do Session 8 đặt giới hạn số bước.`);
  [[574, 81, 'Lượt 1', 'câu hỏi + mô tả tool'], [828, 252, 'Lượt 2', '+ kết quả search_kb'], [1109, 156, 'Lượt 3', '+ kết quả create_ticket']].forEach(([inp, out, t, d], i) => {
    const y = 96 + i * 66;
    label(s, 40, y, 150, 40, `${t}\n${d}`, { size: 13, sub: 10, align: 'START' });
    box(s, 200, y + 8, (inp / 1109) * 380, 26, ' ', { fill: C.BLUE, shape: 'RECTANGLE', noLine: true });
    box(s, 200 + (inp / 1109) * 380, y + 8, (out / 1109) * 380, 26, ' ', { fill: C.ORANGE, shape: 'RECTANGLE', noLine: true });
    mono(s, 205, y + 12, 200, 18, `${inp.toLocaleString("de-DE")} vào + ${out} ra`, { color: C.WHITE, size: 10 });
  });
  box(s, 200, 300, 14, 14, ' ', { fill: C.BLUE, noLine: true }); label(s, 218, 296, 160, 22, 'token gửi vào', { size: 10, bold: false, align: 'START' });
  box(s, 330, 300, 14, 14, ' ', { fill: C.ORANGE, noLine: true }); label(s, 348, 296, 160, 22, 'token model viết ra', { size: 10, bold: false, align: 'START' });
  label(s, 40, 325, 640, 40, 'Tổng 2.511 vào + 489 ra · input cộng dồn theo số lượt', { size: 12, align: 'START' });
}

// Trace ở mức định vị: biết dòng nào ứng với khái niệm nào của SDK
function traceLocate() {
  const s = newSlide('Trace', 'Trace cho thấy agent đã đi những bước nào', `Đề cương: trace "ở mức định vị" — chỉ cần biết đọc trace để thấy agent làm gì, chi tiết ở Session 9.
SDK tự sinh trace cho mỗi Runner.run; demo ghi ra file .traces/ trên máy (không gửi về OpenAI) và in ra với --trace.
Chỉ từng dòng: 🛡 guardrail, 🧠 mỗi lượt gọi model (thời gian, token), 🔧 mỗi tool call (tham số, kết quả).
Lệnh: python3 run_demo.py --scenario 1 --approve yes --trace`);
  code(s, 40, 88, 430, 200, `🛡 0.0s guardrail no_card_number
🧠 1.6s model call  tokens=574+81
🔧 0.0s search_kb("lỗi thanh toán mã E205")
🧠 2.1s model call  tokens=828+252
🔧 0.0s create_ticket(P3, billing-team-a)
         → {"ticket_id": "T-1001"}
🧠 1.9s model call  tokens=1109+156
🧭 agent Support agent · 3 lượt model · 2 tool`, 10.5);
  [['Agent', 'cả khối · 🧭'], ['Runner.run', 'chuỗi lượt gọi · 🧠'], ['function_tool', 'mỗi dòng 🔧'], ['Guardrail', 'kiểm tra đầu vào · 🛡']].forEach(([t, d], i) =>
    box(s, 490, 88 + i * 50, 190, 42, `${t}\n${d}`, { size: 12.5, sub: 10, align: 'START' }));
  label(s, 40, 300, 640, 40, 'Trace = tool nào · tham số gì · bao lâu · bao nhiêu token', { size: 12, align: 'START' });
}

// Khi bước tiếp theo phụ thuộc kết quả tra: workflow phải đoán trước khi có dữ liệu → tốn hơn agent
function conditionalCase() {
  question('Có khi nào agent lại rẻ hơn workflow?', '"…Nếu lỗi phía hệ thống mình thì tạo ticket; nếu do ngân hàng thì chỉ hướng dẫn khách."',
    `Đọc to yêu cầu. Hỏi lớp: workflow cố định "phân loại → tra KB → trả lời → tạo ticket" sẽ xử lý câu này thế nào? Bước phân loại có đủ thông tin để quyết định không?`);
  const s = newSlide('Đáp án · đo thật', 'Workflow quyết trước khi tra: tốn ~2,8× agent', `Số đo thật: compare_orchestration_levels.py --request conditional, ${cond.model}, ${cond.runs} lần mỗi mức. Cả 3 mức đều ĐÚNG là không tạo ticket (E205 = ngân hàng từ chối, kb-a-002).
Vì sao workflow tốn nhất (~${Math.round(cond.rows[1].tokens).toLocaleString('de-DE')} token, ${String(cond.rows[1].secs).replace('.', ',')}s): thứ tự bước cố định bắt bước "phân loại" quyết định có cần ticket TRƯỚC khi tra KB. Model không có dữ liệu nên suy luận rất lâu — đo riêng bước này: 2.759 và 9.900 token suy luận ẩn chỉ để trả về 1 dòng {"need_ticket": false}.
Agent tra KB trước, thấy E205 do ngân hàng, rồi trả lời luôn: 2 lượt gọi.
Công bằng mà nói: workflow sửa được bằng cách đổi thứ tự (tra trước, phân loại sau) — nhưng người viết code phải lường trước. Agent tự chọn thứ tự theo dữ liệu. Đây đúng là "bước tiếp theo phụ thuộc kết quả bước trước".`);
  const max = Math.max(...cond.rows.map((r) => r.tokens));
  cond.rows.forEach((r, i) => {
    const y = 96 + i * 58;
    label(s, 40, y, 150, 40, `${r.level}\n${String(r.calls).replace(".", ",")} lượt gọi · ${String(r.secs).replace(".", ",")}s`, { size: 13, sub: 10, align: 'START' });
    box(s, 200, y + 8, Math.max(8, (r.tokens / max) * 360), 24, ' ', { fill: i === 1 ? C.ORANGE : C.BLUE, shape: 'RECTANGLE', noLine: true });
    mono(s, 210 + (r.tokens / max) * 360, y + 9, 90, 22, `${Math.round(r.tokens).toLocaleString("de-DE")} token`, { color: C.INK, size: 11 });
  });
  code(s, 40, 272, 330, 74, `Bước "phân loại" của workflow (chưa tra KB):
→ {"need_ticket": false}
  2.759 – 9.900 token suy luận ẩn`, 10);
  box(s, 385, 272, 295, 74, 'Workflow phải quyết định trước khi có dữ liệu. Agent tra trước rồi mới quyết định.', { fill: C.INK, size: 12, align: 'START' });
}

module.exports = { threeFlows, threeFlowsCode, measuredCost, tokenGrowth, conditionalCase, traceLocate };
