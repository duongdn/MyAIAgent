// Session 5 · slide 14–16: Session 2 đã có nguyên tắc "chọn pattern đơn giản nhất" — ở đây đo xem agent đáng tiền khi nào
const { C, box, label, mono, table, newSlide, question } = require('./slide-kit');
const dc = require('../support_agent_demo/decision_consistency.json');

const n = (v) => Math.round(v).toLocaleString('de-DE');
const row = (code, level) => dc.rows.find((r) => r.code === code && r.level === level);

function consistency() {
  question('Viết workflow đúng thứ tự — agent còn thắng không?', 'Tra KB trước, quyết định sau. Chạy 10 lần mỗi mã lỗi.',
    `Nối từ slide 13: workflow thua vì phân loại TRƯỚC khi tra KB. Giờ sửa workflow: code tra KB trước, model chỉ trả {"need_ticket": true|false}, code tạo ticket.
Hai mã lỗi: E205 (ngân hàng từ chối → không tạo ticket), E999 (lỗi cổng thanh toán → phải tạo ticket).
Hỏi lớp: agent hay workflow đúng nhiều hơn? Tốn bao nhiêu?`);

  const s = newSlide('Đáp án · đo thật · 10 lần mỗi ô', 'Bước liệt kê được: workflow đúng hơn, rẻ hơn 6–13×', `Số đo thật: compare_decision_consistency.py --runs 10, ${dc.model}. Mỗi ô là 10 lần chạy cùng yêu cầu.
- Workflow "tra trước": 1 lượt gọi model, đúng 20/20, token gần như cố định.
- Agent: đúng 19/20. Lần sai: E999 — model trả lời hướng dẫn rồi dừng, KHÔNG tạo ticket (2 lượt gọi thay vì 4). Không có lỗi nào, chỉ là model chọn khác.
- Token agent dao động ${n(row('E999', 'Agent').tokens_min)}–${n(row('E999', 'Agent').tokens_max)} cho cùng một câu: mỗi lượt gửi lại cả hội thoại (slide 11), số lượt do model chọn.
Bài học sâu hơn Session 2: "agent khi bước không biết trước" — nhưng ở đây các nhánh LIỆT KÊ ĐƯỢC (có/không tạo ticket). Liệt kê được thì code giữ thứ tự, model chỉ quyết 1 giá trị → đúng hơn, rẻ hơn, dễ test.
Slide 13 agent thắng vì workflow viết sai thứ tự — không phải vì agent giỏi hơn.`);
  const rows = [['Mã lỗi · đúng là', 'Mức', 'Đúng', 'Lượt gọi', 'Token / lần']];
  [['E205', 'không tạo'], ['E999', 'tạo ticket']].forEach(([code, want]) =>
    ['Workflow tra trước', 'Agent'].forEach((level) => {
      const r = row(code, level);
      rows.push([`${code} · ${want}`, level, `${r.correct}/${r.runs}`, r.calls.join(' hoặc '), `${n(r.tokens_min)} – ${n(r.tokens_max)}`]);
    }));
  table(s, 30, 88, [150, 150, 70, 100, 170], rows, { rowH: 34, size: 12,
    fills: [C.WHITE, C.WHITE, C.WHITE, C.YELLOW] });
  box(s, 30, 280, 310, 66, 'Agent sai 1/20: E999 trả lời hướng dẫn rồi dừng, không tạo ticket', { fill: C.ORANGE, size: 12, align: 'START' });
  box(s, 355, 280, 325, 66, 'Nhánh liệt kê được → code giữ thứ tự, model chỉ quyết 1 giá trị', { fill: C.INK, size: 12, align: 'START' });
}

function decision() {
  const s = newSlide('Quyết định', 'Agent chỉ đáng tiền khi code không liệt kê được nhánh', `Session 2 đã có "chọn pattern đơn giản nhất". Ở đây là thước đo cụ thể, mỗi hàng có số đo hôm nay.
1. Bước biết trước (luôn tạo ticket) → workflow; agent tốn ~2,6× token (slide 10).
2. Bước phụ thuộc dữ liệu NHƯNG nhánh liệt kê được → workflow "tra trước, quyết sau": 20/20 đúng, rẻ 6–13× (slide 15). Sai thứ tự thì tốn ~2,8× (slide 13) — lỗi người viết, không phải lỗi workflow.
3. Không liệt kê được: số lần tra không biết trước, nhiều tool kết hợp tuỳ kết quả → agent. Trả giá: token dao động, kết quả không ổn định → phải có eval chạy lặp (Session 9).
4. Hành động không đảo ngược (tiền, xoá dữ liệu) → dù mức nào cũng có người duyệt (Session 7).
Câu trả lời khách hàng khi họ đòi "làm AI agent": liệt kê thử các nhánh trước — liệt kê được thì làm workflow.`);
  table(s, 30, 85, [190, 170, 290], [
    ['Tình huống', 'Chọn', 'Số đo hôm nay'],
    ['Bước biết trước', 'Workflow', 'Agent tốn ~2,6× token'],
    ['Phụ thuộc dữ liệu, nhánh liệt kê được', 'Workflow tra trước', '20/20 đúng, rẻ 6–13× · sai thứ tự thì tốn ~2,8×'],
    ['Nhánh không liệt kê được', 'Agent', 'Token dao động ~2,5× · phải có eval lặp (S9)'],
    ['Không đảo ngược được', '+ người duyệt', 'Mọi mức — S7'],
  ], { rowH: 46, size: 11.5, fills: [C.WHITE, C.WHITE, C.GREEN, C.YELLOW] });
  mono(s, 30, 330, 650, 16, 'Thử liệt kê nhánh trước · liệt kê được → workflow', { color: C.ORANGE, size: 11 });
}

module.exports = { consistency, decision };
