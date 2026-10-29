// Session 5 — sơ đồ 3 mức, code 3 mức chạy thật (demo cuối buổi), trace định vị.
const { C, box, label, mono, code, arrow, twoWay, newSlide, question, blank, footer } = require('./slide-kit');

// 3 mức vẽ thành 3 luồng: ai giữ thứ tự bước
function threeFlows() {
  const s = newSlide('3 mức điều phối', 'Khác nhau ở một điểm: ai chọn bước tiếp theo', `[Đề cương: 02_Noi_dung_chi_tiet_chuong_trinh_dao_tao_AI.pdf, trang 4, mục Session 5 — Nội dung giảng giải, gạch đầu dòng 1: "So sánh single model call, workflow do code điều phối và agent có mục tiêu, tools, loop, điều kiện dừng."]\nSession 2 đã có 4 pattern; RAG để Session 3–4. Ở đây chỉ so 3 mức trên CÙNG một yêu cầu, nhìn đúng một trục: ai chọn bước tiếp theo.
- Model call: code chuẩn bị prompt (kèm tài liệu RAG), gọi model ĐÚNG 1 lần. Không có "bước tiếp theo".
- Slide dùng từ chung (lấy dữ liệu, thực hiện, tool), ví dụ cụ thể để demo cuối buổi. Nếu cần ví dụ miệng: lấy dữ liệu = tra tài liệu nội bộ, thực hiện = tạo ticket.
- Workflow: CODE giữ thứ tự: phân loại → lấy dữ liệu → trả lời → thực hiện. Model chỉ làm từng ô được giao. Đổi thứ tự = sửa code.
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
  row(92, 'Model call', '1 lượt gọi', [['Code: lấy dữ liệu', 'code'], ['Model trả lời', 'model']]);
  row(160, 'Workflow', 'code giữ thứ tự', [['Model: phân loại', 'model'], ['Code: lấy dữ liệu', 'code'], ['Model trả lời', 'model'], ['Code: thực hiện', 'code']]);
  // Agent: vòng lặp thật — model ⇄ code chạy tool; khi đủ thông tin mới thoát sang trả lời
  const y = 236;
  mono(s, 40, y, 140, 14, 'AGENT', { size: 9 });
  label(s, 40, y + 14, 130, 30, 'nhận mục tiêu, tự chọn bước', { size: 10, bold: false, align: 'START', valign: 'TOP', color: C.GREY });
  box(s, 180, y, 110, 44, 'Model: chọn tool tiếp theo', { fill: C.ORANGE, size: 10.5 });
  box(s, 380, y, 140, 44, 'Code chạy tool\nmodel vừa chọn', { fill: C.INK, size: 10.5, sub: 9 });
  twoWay(s, 292, 378, y + 22);
  label(s, 292, y + 2, 86, 14, 'gọi tool', { size: 8.5, bold: false, color: C.INK });
  label(s, 292, y + 30, 86, 14, 'kết quả', { size: 8.5, bold: false, color: C.ORANGE });
  box(s, 580, y, 96, 44, 'Model: trả lời', { fill: C.ORANGE, size: 10.5 });
  arrow(s, 235, y, 235, y - 14, C.INK, false); arrow(s, 235, y - 14, 628, y - 14, C.INK, false); arrow(s, 628, y - 14, 628, y - 2, C.INK);
  label(s, 400, y - 30, 200, 14, 'đủ thông tin → dừng', { size: 9, bold: false, color: C.INK });
  label(s, 180, y + 48, 500, 16, '↻ số lượt do model quyết · dừng: trả lời cuối hoặc chạm giới hạn số lượt', { size: 9, bold: false, color: C.ORANGE, align: 'START' });
  box(s, 40, 330, 14, 14, ' ', { fill: C.ORANGE, noLine: true }); label(s, 58, 326, 200, 22, 'model quyết định', { size: 10, bold: false, align: 'START' });
  box(s, 190, 330, 14, 14, ' ', { fill: C.INK }); label(s, 208, 326, 200, 22, 'code quyết định', { size: 10, bold: false, align: 'START' });
}

// Code của 3 mức (rút gọn từ compare_orchestration_levels.py) + output chạy thật với --show
function demoSupportRequests() {
  // Slide mở phần demo: chỉ có chữ "Demo", nội dung chạy live trên terminal (xem notes)
  const s = blank(`[Đề cương: 02_Noi_dung_chi_tiet_chuong_trinh_dao_tao_AI.pdf, trang 4, mục Session 5 — dòng "Ví dụ trong buổi": "Yêu cầu support nào chỉ cần RAG, yêu cầu nào cần nhiều bước và tạo ticket?" + gạch đầu dòng 3 (walkthrough agent tối thiểu).]
Slide chỉ để mở phần demo — mọi nội dung nằm ở màn hình terminal. Demo live, model thật qua gateway công ty (support_agent_demo/, mỗi lệnh ~5–10 giây). Use case xuyên suốt Giai đoạn 3: support agent đọc knowledge base, trả lời có nguồn, tạo ticket khi cần.
1) python3 run_demo.py --scenario 9 --trace   → "Mã lỗi thanh toán E205 nghĩa là gì?"
   Chạy 29/10: 2 lượt gọi LLM (LLM gọi search_kb rồi trả lời), 1.442 token vào, không tạo ticket. → Chỉ cần tra tài liệu rồi trả lời: model call + RAG là đủ, dùng agent là thừa.
2) python3 run_demo.py --scenario 1 --approve yes --trace   → "Khách X báo lỗi thanh toán mã E205, xử lý sao? Tạo ticket cho billing team giúp tôi."
   Chạy 29/10: 3 lượt (search_kb → create_ticket, dừng chờ duyệt → T-1001 → trả lời), 2.600 token vào. → Cần nhiều bước + hành động. Nếu lúc nào cũng tạo ticket → workflow (slide 9); nếu tạo hay không tuỳ kết quả tra → agent.
Chỉ vào trace: dòng ② là LLM quyết định, dòng ③ là code app chạy (giống sơ đồ slide 5).

--- Giữ từ slide cũ "Cùng một yêu cầu, 3 cách viết code" (đã bỏ khỏi deck 29/10) ---
[Đề cương: 02_Noi_dung_chi_tiet_chuong_trinh_dao_tao_AI.pdf, trang 4, mục Session 5 — Nội dung giảng giải, gạch đầu dòng 3: "Walkthrough support agent tối thiểu trong OpenAI Agents SDK: agent definition, run/runner, tools và trace ở mức định vị; không học thuộc API."]\nĐây là code thật của sơ đồ 3 mức (slide 6) — xem lúc demo, cuối buổi, rút gọn từ support_agent_demo/compare_orchestration_levels.py (llm() = 1 lần gọi chat completions qua gateway công ty).
Chạy live: python3 compare_orchestration_levels.py --runs 1 --show  (~25 giây, model thật, không ghi đè số đo trên slide).
Đọc cột trái theo từng mức:
- Model call: code tra KB rồi gọi model đúng 1 lần. Muốn tạo ticket → không có chỗ nào để làm.
- Workflow: thứ tự 4 bước nằm trong code. Model chỉ điền vào ô "phân loại" và ô "trả lời". Tham số ticket (P3, billing-team-a) code viết sẵn.
- Agent: code chỉ khai báo mục tiêu + danh sách tool + max_turns. Gọi tool nào, mấy lần là model quyết định lúc chạy; SDK chạy vòng lặp.
Cột phải là output thật: [CODE]/[MODEL] khớp màu ô tối/cam ở slide 6 (3 mức). Ở mức Agent, các dòng ①–④ là trace của SDK (chạy lại 29/10, cùng kiểu slide trace): lượt 1 LLM gọi search_kb 2 lần → lượt 2 gọi create_ticket, dừng chờ duyệt → lượt 3 trả lời.
Chú ý khi chạy live: ở mức Agent sẽ có thêm dòng kiểm quyền + chờ duyệt create_ticket — đó là phần application kiểm soát, Session 7 sẽ giải thích; hôm nay chỉ cần nhìn số lượt và thứ tự bước.
Code rút gọn của 3 mức (compare_orchestration_levels.py):
# 1 · Model call — gọi model đúng 1 lần
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
await Runner.run(agent, q, max_turns=8)`, C.INK);
  label(s, 40, 150, 600, 80, 'Demo', { size: 54, color: C.WHITE, align: 'START' });
  footer(s, true);
}

// Trace ở mức định vị: biết dòng nào ứng với khái niệm nào của SDK
function traceLocate() {
  const s = newSlide('Trace', 'Trace: nhật ký từng bước của một lần agent chạy', `[Đề cương: 02_Noi_dung_chi_tiet_chuong_trinh_dao_tao_AI.pdf, trang 4, mục Session 5 — Nội dung giảng giải, gạch đầu dòng 3: "Walkthrough support agent tối thiểu trong OpenAI Agents SDK: agent definition, run/runner, tools và trace ở mức định vị; không học thuộc API."]\nSlide không có code/log: vẽ các bước của 1 lần agent chạy bằng từ chung (tool A, tool B). Trace thật xem lúc demo.
Đề cương: trace "ở mức định vị" — chỉ cần biết đọc trace để thấy agent làm gì, chi tiết ở Session 9.
SDK tự sinh trace cho mỗi Runner.run; demo ghi ra file .traces/ trên máy (không gửi về OpenAI) và in ra với --trace.
Trace in theo đúng vòng lặp ①–④ của slide 5 (chạy thật 28/10, deepseek-v4.1-flash):
- ① mỗi lượt APP gửi cho LLM: số message tăng dần 2 → 5 → 7 (gửi lại cả kết quả tool), token vào tăng 574 → 932 → 1.201.
- ② LLM quyết định: lượt 1 gọi search_kb 2 lần (2 cách hỏi), lượt 2 gọi create_ticket, lượt 3 dừng và trả lời.
- ③ APP chạy hàm thật; create_ticket dừng chờ người duyệt trước khi chạy.
Tổng: 3 lượt gọi model, 2.707 token vào + 621 ra.
Đọc trace theo concept của slide trước: cả khối = 1 lần Agent chạy; các lượt ① ② = Runner.run lặp; mỗi dòng ③ = một function_tool chạy; dòng 🛡 = Guardrail kiểm tra input.
Lệnh: python3 run_demo.py --scenario 1 --approve yes --trace
Trace thật dùng để vẽ slide (kịch bản 1, tool A = search_kb, tool B = create_ticket):
🛡 guardrail no_card_number: qua
① APP → LLM  2 message · 574+154 token
② LLM: gọi search_kb ×2 {"query": "lỗi … E205"}
③ APP chạy search_kb → ④ kết quả gửi lại
① APP → LLM  5 message · 932+240 token
② LLM: gọi create_ticket {"priority": "P3", …}
③ APP chưa chạy: chờ duyệt → ĐỒNG Ý → T-1001
① APP → LLM  7 message · 1.201+227 token
② LLM: dừng, trả lời cuối "Xử lý lỗi E205…"`);
  // Dòng thời gian các bước (từ chung) — cam = LLM, tối = app
  [['Kiểm tra input', 'app'], ['LLM chọn tool A', 'llm'], ['App chạy tool A', 'app'], ['LLM chọn tool B', 'llm'], ['App chạy tool B', 'app'], ['LLM trả lời cuối', 'llm']]
    .forEach(([t, who], i) => {
      const y = 86 + i * 46;
      mono(s, 40, y + 7, 30, 14, String(i + 1), { size: 10, color: C.GREY });
      box(s, 70, y, 260, 28, t, { fill: who === 'llm' ? C.ORANGE : C.INK, size: 12 });
      if (i) arrow(s, 200, y - 17, 200, y - 1);
    });
  mono(s, 380, 86, 300, 14, 'ĐỌC TRACE ĐỂ BIẾT', { size: 9, color: C.GREY });
  ['Agent đã đi những bước nào, theo thứ tự nào', 'LLM chọn tool gì, với tham số gì', 'Sai hoặc dừng ở bước nào']
    .forEach((q, i) => box(s, 380, 106 + i * 72, 300, 60, q, { fill: C.CARD, size: 13, bold: false, align: 'START' }));
}

module.exports = { threeFlows, demoSupportRequests, traceLocate };
