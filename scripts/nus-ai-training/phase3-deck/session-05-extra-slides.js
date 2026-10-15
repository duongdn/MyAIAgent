// Session 5 — các slide "hàm lượng thông tin cao": sơ đồ 3 mức, số đo thật, token tăng theo lượt, trace định vị.
// Số liệu từ support_agent_demo/compare_orchestration_levels.py (orchestration_levels.json) + trace kịch bản 1.
const { C, box, label, mono, code, arrow, newSlide, question } = require('./slide-kit');
const data = require('../support_agent_demo/orchestration_levels.json');

// 3 mức vẽ thành 3 luồng: ai giữ thứ tự bước
function threeFlows() {
  const s = newSlide('3 mức điều phối', 'Khác nhau ở một điểm: ai chọn bước tiếp theo', `Vẽ từng hàng lên bảng nếu có thể.
- Model call: code chuẩn bị prompt (kèm tài liệu RAG), gọi model ĐÚNG 1 lần. Không có "bước tiếp theo".
- Workflow: CODE giữ thứ tự: phân loại → tra KB → trả lời → tạo ticket. Model chỉ làm từng ô được giao. Đổi thứ tự = sửa code.
- Agent: model nhận mục tiêu + danh sách tool, TỰ chọn gọi tool nào, mấy lần, khi nào dừng. Vòng lặp chạy tới khi model trả lời cuối.
Ô màu cam = chỗ model ra quyết định. Ô tối = code ra quyết định.
Hỏi lớp: "Workflow có dùng LLM không?" → có (ô phân loại, ô trả lời), nhưng LLM không quyết định thứ tự.`);
  const row = (y, name, sub, steps) => {
    mono(s, 40, y, 140, 14, name.toUpperCase(), { size: 9 });
    label(s, 40, y + 14, 130, 30, sub, { size: 10, bold: false, align: 'START', valign: 'TOP', color: C.GREY });
    steps.forEach(([t, who], i) => {
      const x = 180 + i * 104;
      box(s, x, y, 92, 40, t, { fill: who === 'model' ? C.ORANGE : who === 'code' ? C.INK : C.CARD, size: 10.5 });
      if (i) arrow(s, x - 12, y + 20, x, y + 20);
    });
  };
  row(92, 'Model call', '1 lượt gọi', [['Code: tra KB', 'code'], ['Model trả lời', 'model']]);
  row(160, 'Workflow', 'code giữ thứ tự', [['Model: phân loại', 'model'], ['Code: tra KB', 'code'], ['Model trả lời', 'model'], ['Code: tạo ticket', 'code']]);
  row(228, 'Agent', 'model chọn bước', [['Model: chọn tool', 'model'], ['search_kb', ''], ['Model: chọn tiếp', 'model'], ['create_ticket', ''], ['Model: trả lời', 'model']]);
  arrow(s, 600, 268, 600, 280, C.ORANGE); arrow(s, 600, 280, 236, 280, C.ORANGE); arrow(s, 236, 280, 236, 268, C.ORANGE);
  label(s, 300, 282, 240, 16, 'lặp tới khi model tự dừng', { size: 9, bold: false, color: C.ORANGE });
  box(s, 40, 320, 14, 14, ' ', { fill: C.ORANGE, noLine: true }); label(s, 58, 316, 200, 22, 'model quyết định', { size: 10, bold: false, align: 'START' });
  box(s, 190, 320, 14, 14, ' ', { fill: C.INK }); label(s, 208, 316, 200, 22, 'code quyết định', { size: 10, bold: false, align: 'START' });
}

// Đo thật: cùng 1 yêu cầu, 3 mức
function measuredCost() {
  question('Cùng một yêu cầu — agent tốn hơn bao nhiêu?', '"Khách báo lỗi E205, xử lý sao? Tạo ticket cho billing team giúp tôi."',
    `Cho lớp đoán: agent tốn gấp mấy lần model call? chậm hơn bao nhiêu? Ghi lên bảng rồi lật đáp án.`);
  const s = newSlide('Đáp án · đo thật', 'Agent tốn ~2,7× token — nhưng chỉ nó và workflow tạo được ticket', `Số đo thật: compare_orchestration_levels.py, model ${data.model}, ${data.runs} lần mỗi mức, lấy trung bình, đã tắt cache gateway.
Đọc bảng:
- Model call rẻ nhất nhưng KHÔNG làm được nửa sau yêu cầu (tạo ticket) — nó chỉ trả lời.
- Workflow làm đủ việc với 2 lượt gọi: vì yêu cầu này có bước biết trước, workflow là lựa chọn tốt hơn agent.
- Agent làm đủ việc nhưng tốn ~2,7× token: mỗi lượt gọi gửi lại toàn bộ hội thoại (slide sau).
- Thời gian gần như nhau (~7 giây) — chi phí agent nằm ở token, không phải độ trễ, với yêu cầu ngắn thế này.
Kết luận: agent đáng tiền khi số bước KHÔNG biết trước. Ở đây biết trước → workflow thắng.
Chạy lại trong buổi: python3 compare_orchestration_levels.py --runs 1 (~25 giây).`);
  const max = Math.max(...data.rows.map((r) => r.tokens));
  data.rows.forEach((r, i) => {
    const y = 100 + i * 62;
    label(s, 40, y, 150, 40, `${r.level}\n${r.calls} lượt gọi · ${r.secs}s`, { size: 13, sub: 10, align: 'START' });
    box(s, 200, y + 8, Math.max(8, (r.tokens / max) * 330), 26, ' ', { fill: i === 2 ? C.ORANGE : C.BLUE, shape: 'RECTANGLE', noLine: true });
    mono(s, 210 + (r.tokens / max) * 330, y + 10, 90, 22, `${Math.round(r.tokens)} tok`, { color: C.INK, size: 11 });
    box(s, 610, y + 6, 70, 30, r.tickets ? 'tạo ticket ✓' : 'không tạo', { fill: r.tickets ? C.GREEN : C.MUTED, size: 9.5 });
  });
  box(s, 40, 300, 640, 50, 'Yêu cầu này có các bước biết trước → workflow đủ việc với ít token hơn. Agent đáng tiền khi số bước không biết trước.', { fill: C.INK, size: 12.5, align: 'START' });
}

// Vì sao agent tốn token: mỗi lượt gửi lại toàn bộ hội thoại
function tokenGrowth() {
  const s = newSlide('Vì sao tốn hơn', 'Mỗi lượt, agent gửi lại toàn bộ hội thoại cho model', `Nhắc Session 1: model không nhớ gì giữa các lần gọi. Muốn model "biết" kết quả search_kb, application phải gửi lại câu hỏi + tool call + kết quả ở lượt sau.
Số thật từ trace kịch bản 1: input token lượt 1 = 574, lượt 2 = 828 (thêm kết quả search_kb), lượt 3 = 1109 (thêm kết quả create_ticket). Tổng input 2511 dù câu hỏi chỉ ~60 token.
Hệ quả: agent càng nhiều bước, chi phí tăng nhanh hơn tuyến tính. Đây là lý do Session 8 đặt giới hạn số bước.`);
  [[574, 81, 'Lượt 1', 'câu hỏi + mô tả tool'], [828, 252, 'Lượt 2', '+ kết quả search_kb'], [1109, 156, 'Lượt 3', '+ kết quả create_ticket']].forEach(([inp, out, t, d], i) => {
    const y = 96 + i * 66;
    label(s, 40, y, 150, 40, `${t}\n${d}`, { size: 13, sub: 10, align: 'START' });
    box(s, 200, y + 8, (inp / 1109) * 380, 26, ' ', { fill: C.BLUE, shape: 'RECTANGLE', noLine: true });
    box(s, 200 + (inp / 1109) * 380, y + 8, (out / 1109) * 380, 26, ' ', { fill: C.ORANGE, shape: 'RECTANGLE', noLine: true });
    mono(s, 205, y + 12, 200, 18, `${inp} vào + ${out} ra`, { color: C.WHITE, size: 10 });
  });
  box(s, 200, 300, 14, 14, ' ', { fill: C.BLUE, noLine: true }); label(s, 218, 296, 160, 22, 'token gửi vào', { size: 10, bold: false, align: 'START' });
  box(s, 330, 300, 14, 14, ' ', { fill: C.ORANGE, noLine: true }); label(s, 348, 296, 160, 22, 'token model viết ra', { size: 10, bold: false, align: 'START' });
  label(s, 40, 325, 640, 40, 'Tổng: 2511 token vào + 489 ra cho một câu hỏi ~60 token — model không nhớ, nên mỗi lượt phải gửi lại từ đầu', { size: 12, align: 'START' });
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
  label(s, 40, 300, 640, 40, 'Đọc trace trả lời được: agent gọi tool nào, với tham số gì, mất bao lâu, tốn bao nhiêu token', { size: 12, align: 'START' });
}

module.exports = { threeFlows, measuredCost, tokenGrowth, traceLocate };
