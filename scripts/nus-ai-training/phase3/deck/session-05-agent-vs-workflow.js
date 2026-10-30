// Mở đầu Giai đoạn 3 + Session 5: Agent khác workflow ở đâu và OpenAI Agents SDK hỗ trợ gì (45 phút)
const { C, box, label, code, arrow, twoWay, table, newSlide, question, sessionHeader, recap, agenda, takeaways, challenge, homework, reviewQuestions, blank, mono, footer } = require('./slide-kit');
const decide = require('./session-05-decision-slides');
const patterns = require('./session-05-workflow-patterns-slides');
const extra = require('./session-05-extra-slides');

module.exports = function session05() {
  let s = blank(`[Đề cương: 02_Noi_dung_chi_tiet_chuong_trinh_dao_tao_AI.pdf, trang 4, đoạn mở đầu "Giai đoạn 3 Build AI Agent": "Năm session dùng cùng support agent để đi từ quyết định có cần agent hay không đến một bản thiết kế có thể review. OpenAI Agents SDK là ví dụ triển khai xuyên suốt; mỗi buổi vẫn giải thích nguyên lý trước khi xem code. SDK giúp chạy loop và tích hợp tools, trong khi application giữ quyền đối với dữ liệu, permission, approval, state lưu bền và business rule."]\nMở đầu Giai đoạn 3 (Session 5–9). Một support agent duy nhất, mỗi buổi thêm một lớp.
SDK dùng xuyên suốt: OpenAI Agents SDK (openai-agents 0.23.1). Code: docs/nus-ai-training/phase3/session-05/demo/.
Model chạy qua LLM gateway công ty (llm.nustechnology.com, mặc định deepseek-v4.1-flash); số liệu trong notes và demo đều chạy thật.
Thông điệp xuyên suốt: SDK giúp chạy loop và tích hợp tool; application giữ quyền với dữ liệu, permission, approval, state lưu bền và business rule.`, C.INK);
  mono(s, 40, 40, 300, 16, 'NUS TECHNOLOGY', { color: C.ORANGE, size: 10 });
  label(s, 40, 90, 640, 110, 'Giai đoạn 3 —\nBuild AI Agent', { size: 46, color: C.WHITE, align: 'START', valign: 'TOP', lineSpacing: 100 });
  label(s, 40, 320, 250, 20, 'DuongDN · VinhNT', { size: 12, color: C.WHITE, align: 'START' }); // Giai đoạn 3 = 2 người; S5–S6 DuongDN, S7–S9 VinhNT
  footer(s, true);

  s = newSlide('Lộ trình · một support agent · OpenAI Agents SDK', '', `[Đề cương: 02_Noi_dung_chi_tiet_chuong_trinh_dao_tao_AI.pdf, trang 4, đoạn mở đầu "Giai đoạn 3 Build AI Agent": "Năm session dùng cùng support agent để đi từ quyết định có cần agent hay không đến một bản thiết kế có thể review. OpenAI Agents SDK là ví dụ triển khai xuyên suốt; mỗi buổi vẫn giải thích nguyên lý trước khi xem code. SDK giúp chạy loop và tích hợp tools, trong khi application giữ quyền đối với dữ liệu, permission, approval, state lưu bền và business rule."]\nHàng S5 = điểm đầu (có cần agent không), hàng S9 = điểm cuối (bản thiết kế có thể review). Đi qua lộ trình 1 phút. Mỗi hàng = agent sau buổi đó: ô cam là lớp buổi đó thêm vào, ô nhạt là lớp đã có từ trước. Hàng cuối = agent đầy đủ sau S9.
S8: lưu trạng thái task (đang xử lý / chờ duyệt / xong) để chạy tiếp sau khi dừng giữa chừng + các điều kiện dừng. S9: harness = bộ test chạy lặp (eval) + trace để kiểm tra agent trước khi đưa cho đội review.
Case study: support agent đọc knowledge base, trả lời có nguồn, tạo ticket sau khi được phép.
Cuối giai đoạn, người học có bản thiết kế agent đủ rõ để thảo luận với đội triển khai.`);
  // Bậc thang: mỗi hàng là agent sau buổi đó — ô cam = lớp mới thêm, ô nhạt = lớp đã có
  const layers = ['Agent tối thiểu', 'Tool contract', 'Kiểm quyền,\nphê duyệt', 'Task state,\nđiều kiện dừng', 'Eval, tracing'];
  [['S5', 'Agent khác workflow ở đâu'], ['S6', 'Agent loop và tool contracts'], ['S7', 'Tool execution an toàn'],
   ['S8', 'Context, state và điều kiện dừng'], ['S9', 'Harness, tracing và agent hoàn chỉnh']].forEach(([k, q], i) => {
    const y = 86 + i * 56;
    box(s, 40, y, 44, 46, k, { fill: C.NAVY, size: 14 });
    label(s, 92, y, 130, 46, q, { size: 11.5, align: 'START' });
    for (let j = 0; j <= i; j++)
      box(s, 228 + j * 92, y, 86, 46, layers[j], { fill: j === i ? C.ORANGE : C.LIGHT, size: 9.5, bold: j === i });
  });

  sessionHeader(5, 'Agent khác workflow ở đâu', 'Khi nào nên để model chọn bước tiếp theo thay vì viết sẵn toàn bộ flow?',
    `[Đề cương: 02_Noi_dung_chi_tiet_chuong_trinh_dao_tao_AI.pdf, trang 4, mục Session 5 — phần đầu mục (tên buổi · 45 phút · câu hỏi trọng tâm)]\nSession 5 — 45 phút, phân bổ chi tiết ở notes slide 4.
Người học đã qua Session 1 (LLM: token, context, không ổn định) và Session 2 (4 pattern, structured output, validate output). Không giảng lại "agent là gì".
Mục tiêu (đề cương, Kết quả cần đạt): chọn đúng mức điều phối, và đọc được sơ đồ agent tối thiểu.
Warm-up (nối Session 2): "Session 2 các bạn đã extract email support thành JSON và validate. Giờ khách muốn hệ thống tự xử lý luôn: tra tài liệu, cần thì tạo ticket. Viết thêm bước bằng code, hay để model tự quyết bước tiếp theo?" → câu hỏi của cả buổi. Ghi lại lựa chọn của lớp, phần 02 đối chiếu bằng các tiêu chí chọn.`);
  agenda([['3 mức điều phối', 'model call · workflow do code điều phối · agent'], ['Agent hay workflow', 'khi nào agent tạo giá trị, khi nào workflow đơn giản an toàn hơn'],
    ['OpenAI Agents SDK', 'agent tối thiểu · phần SDK cung cấp, phần product tự quyết']], `Phân bổ 45 phút (25 slide + demo):
- Mở đầu 3' — slide 1–4 (giai đoạn 3, lộ trình, câu hỏi trọng tâm, agenda).
- 01 · 3 mức điều phối 8' — slide 5–7 (nhắc lại agent loop, sơ đồ 3 mức, bảng so sánh).
- 02 · Agent hay workflow 14' — slide 8–12 (~8') + 5 mẫu workflow slide 13–17 (~1' mỗi mẫu, lướt nhanh).
- 03 · OpenAI Agents SDK 8' — slide 18–22.
- Demo 7' — slide 23 (2 lệnh chạy live, xem notes slide 23).
- Ghi nhớ + thử thách 5' — slide 24–25; còn thời gian thì hỏi đáp.
Thiếu giờ: lướt slide 13–17 (chỉ đọc tiêu đề), demo chỉ chạy kịch bản 1.`);

  s = newSlide('Nhắc lại · Session 1–2', 'Agent: LLM chọn tool, code app chạy — lặp tới khi xong', `[Đề cương: 02_Noi_dung_chi_tiet_chuong_trinh_dao_tao_AI.pdf, trang 4, mục Session 5 — Nội dung giảng giải, gạch đầu dòng 1: "So sánh single model call, workflow do code điều phối và agent có mục tiêu, tools, loop, điều kiện dừng."]\nNhắc lại, KHÔNG giảng lại (tối đa 2 phút). Cùng ý slide "LLM vs Agent" của Session 1 (ChienTX).
Đi theo mũi tên:
- User hỏi → code app nhận.
- ① Code app gửi cho LLM: câu hỏi + context (lịch sử, mô tả các tool có thể dùng).
- ② LLM chỉ viết text. Khi thiếu thông tin, nó viết "tôi cần tool X với tham số Y" — nó KHÔNG tự gọi được gì.
- ③ Code app đọc đoạn text đó và chạy tool thật (web search, query DB, gọi API…).
- ④ Kết quả tool quay lại code app, code app gửi tiếp cho LLM (lại là ①). Lặp tới khi LLM viết câu trả lời cuối → code app trả cho user.
Vì sao sơ đồ này là AGENT: ở bước ②, chính LLM quyết định gọi tool nào, mấy lần, khi nào dừng. Ở workflow, LLM không bao giờ nói "cần tool X" — code tự gọi tool theo các bước viết sẵn (slide sau so sánh trực tiếp). Định nghĩa theo Anthropic "Building effective agents" / OpenAI "A practical guide to building agents".
Minh hoạ live (30 giây, LLM thật): python3 run_demo.py ticket --approve yes → in từng bước ①–④. Chỉ vào dòng "② LLM QUYẾT ĐỊNH gọi tool — chỉ là JSON: search_kb {...}" và dòng "lý do LLM tự viết": đó là LLM chọn bước. Dòng "③ APP chạy hàm thật" là code chạy. Trước khi tạo ticket, app dừng chờ người duyệt: LLM đề xuất, app/người quyết.
Không dùng công thức "Agent = LLM + Tools + Context + Code" của S1 ở đây: workflow cũng có đủ 4 thứ đó nên dễ gây cấn. Nếu lớp nhắc tới công thức, nói: "đủ thành phần thôi chưa đủ, còn phải để LLM chọn bước".
App ChatGPT/Claude khi bật web search, chạy code… là agent; chat thường không gọi tool chỉ là 1 lần gọi model.
- ChatGPT, Claude: OpenAI / Anthropic viết phần code app → user chỉ dùng.
- Agent của mình (từ Session 5): mình viết phần code app. OpenAI Agents SDK KHÔNG phải agent — nó là thư viện viết sẵn phần vòng lặp ①–④, phần còn lại (tool nào, quyền, khi nào dừng) mình tự viết.
Nối: "hôm nay: khi nào nên để LLM chọn bước như vòng lặp này, khi nào code tự viết sẵn các bước".`);
  box(s, 40, 178, 80, 70, 'User', { fill: C.CARD, size: 14 });
  twoWay(s, 120, 178, 213);
  label(s, 120, 190, 58, 14, 'hỏi', { size: 9, bold: false, color: C.INK });
  label(s, 120, 222, 58, 14, 'trả lời', { size: 9, bold: false, color: C.ORANGE });
  box(s, 180, 88, 180, 40, 'LLM\nchỉ đọc & viết text', { fill: C.ORANGE, size: 14, sub: 10 });
  box(s, 180, 178, 180, 70, 'Code app\nchạy vòng lặp · gọi tool · kiểm quyền · quyết định dừng', { fill: C.INK, size: 14, sub: 10 });
  arrow(s, 255, 178, 255, 128, C.INK);
  arrow(s, 285, 128, 285, 178, C.ORANGE);
  label(s, 130, 138, 120, 30, '① câu hỏi\n+ context', { size: 9, bold: false, color: C.INK, align: 'END' });
  label(s, 290, 138, 140, 30, '② "cần tool X"', { size: 9, bold: false, color: C.ORANGE, align: 'START' });
  box(s, 430, 160, 250, 106, '', { fill: C.CARD, valign: 'TOP' });
  label(s, 440, 164, 100, 16, 'TOOLS', { size: 9, align: 'START', color: C.GREY });
  ['Web search', 'Chạy code', 'Database', 'API', 'File', 'Memory'].forEach((x, i) => box(s, 440 + (i % 2) * 118, 184 + Math.floor(i / 2) * 26, 112, 22, x, { fill: C.LIGHT, size: 10.5 }));
  twoWay(s, 360, 430, 213);
  label(s, 360, 190, 70, 14, '③ chạy tool', { size: 9, bold: false, color: C.INK });
  label(s, 360, 222, 70, 14, '④ kết quả', { size: 9, bold: false, color: C.ORANGE });
  label(s, 180, 252, 250, 14, '↻ lặp ①–④ tới khi LLM trả lời được', { size: 9.5, bold: false, color: C.ORANGE, align: 'START' });

  box(s, 40, 300, 315, 40, 'ChatGPT, Claude → OpenAI / Anthropic viết code app', { fill: C.CARD, size: 11, bold: false });
  box(s, 365, 300, 315, 40, 'Agent của mình → mình viết, SDK lo vòng lặp + gọi tool', { fill: C.CARD, size: 11, bold: false });

  extra.threeFlows();

  s = newSlide('So sánh', '', `[Đề cương: 02_Noi_dung_chi_tiet_chuong_trinh_dao_tao_AI.pdf, trang 4, mục Session 5 — Nội dung giảng giải, gạch đầu dòng 1: "So sánh single model call, workflow do code điều phối và agent có mục tiêu, tools, loop, điều kiện dừng."]\nTiêu chí lấy theo nguồn, chia 2 nhóm: CẤU TRÚC (khác nhau ở đâu) và HỆ QUẢ (vì cấu trúc khác nên được/mất gì).
Cấu trúc:
- Đầu vào: agent nhận MỤC TIÊU, không nhận danh sách bước (Anthropic: agent bắt đầu từ "a command from, or interactive discussion with, the human user"; OpenAI: agent "independently accomplish tasks on your behalf").
- Ai chọn bước tiếp + vòng lặp: LangChain, "What is an agent?" — agent = LLM "decide the control flow of an application"; các mức tự chủ phân biệt bằng ai quyết bước nào chạy tiếp, có vòng lặp hay không.
- Ai quyết khi nào dừng: OpenAI guide — agent chạy vòng lặp tới khi gặp exit condition (trả lời cuối, gọi tool kết thúc, lỗi, hoặc giới hạn số lượt do code đặt).
- Context qua các bước: agent mang theo toàn bộ hội thoại + kết quả tool qua mỗi lượt; workflow do code chọn truyền gì sang bước sau.
- Dùng tool: Prompting Guide — workflow "orchestrated by code", agent "self-selected".
Hệ quả (Anthropic + Prompting Guide): workflow "predictability and consistency"; agent "trade latency and cost for better task performance", "compounding errors"; debug agent phải đọc trace nhiều lượt.
Lưu ý: cả 3 mức LLM đều viết nội dung → dùng LLM không làm nên agent; agent cũng chỉ chọn trong danh sách tool code đưa.`);
  table(s, 30, 50, [150, 160, 170, 180], [
    ['', 'Model call', 'Workflow', 'Agent'],
    ['CẤU TRÚC', '', '', ''],
    ['Đầu vào', 'prompt + dữ liệu', 'dữ liệu cho từng bước', 'mục tiêu'],
    ['Ai chọn bước tiếp', 'không có bước tiếp', 'code — viết sẵn', 'LLM — lúc chạy'],
    ['Vòng lặp', 'không', 'không — chạy hết các bước', 'có — tới khi xong'],
    ['Ai quyết khi dừng', '—', 'code: hết bước', 'LLM, trong giới hạn code đặt'],
    ['Context qua các bước', 'một lần', 'code chọn truyền gì', 'tích luỹ hội thoại + kết quả tool'],
    ['Dùng tool', 'không', 'code gọi theo thứ tự', 'LLM chọn, code chạy'],
    ['HỆ QUẢ', '', '', ''],
    ['Dự đoán được', 'cao', 'cao — cùng đường đi', 'thấp — đường đi đổi'],
    ['Chi phí, độ trễ', 'thấp nhất', 'cố định', 'dao động, cao hơn'],
    ['Debug', 'dễ', 'từng bước', 'đọc trace nhiều lượt'],
  ], { rowH: 24, size: 10.5, fills: [C.LIGHT, C.WHITE, C.WHITE, C.WHITE, C.WHITE, C.WHITE, C.WHITE, C.LIGHT, C.WHITE, C.WHITE, C.WHITE] });

  decide.decisionSlides(); // phần 02: chọn theo đặc điểm bài toán (Anthropic + OpenAI)
  patterns.workflowPatternSlides(); // 5 mẫu workflow của Anthropic, mỗi mẫu 1 slide

  question('Agent nào cũng phải tự viết vòng lặp này?', 'Gọi LLM → chạy tool → gửi kết quả lại → lặp tới khi xong…',
    `[Đề cương: 02_Noi_dung_chi_tiet_chuong_trinh_dao_tao_AI.pdf, trang 4, mục Session 5 — tên buổi "…và OpenAI Agents SDK hỗ trợ gì".]
Mở phần 03. Chỉ lại sơ đồ slide 5: phần "Code app" (vòng lặp ①–④) là thứ ai làm agent cũng phải viết, và viết giống nhau. Hỏi lớp 30 giây: có cần mỗi dự án tự viết lại không? → slide sau: đã có thư viện viết sẵn.`);

  s = newSlide('03 · OpenAI Agents SDK', 'OpenAI Agents SDK: thư viện viết sẵn phần code app của agent', `[Đề cương: 02_Noi_dung_chi_tiet_chuong_trinh_dao_tao_AI.pdf, trang 4, mục Session 5 — tên buổi "…và OpenAI Agents SDK hỗ trợ gì" + Nội dung giảng giải, gạch đầu dòng 3 (walkthrough agent tối thiểu trong OpenAI Agents SDK).]
Nối từ slide 5: agent = LLM + phần "code app" bao quanh (gọi LLM, chạy tool, lặp tới khi xong). Phần code app đó ai cũng phải viết lại giống nhau → OpenAI đóng gói thành thư viện.
- Cột trái: những việc phần code app phải làm nếu tự viết (vòng lặp ①–④ ở slide 5 + ghi log + kiểm tra input). Cột giữa: concept SDK lo việc đó. Cột phải: dùng thế nào.
- (Gộp từ 2 slide cũ "thư viện viết sẵn phần code app" + "Các thành phần chính".) SDK không quyết thay mình — tool nào được mở, quyền, dữ liệu, duyệt vẫn là việc của application → hỏi ở slide sau (21–22).
Nguyên văn docs: "The OpenAI Agents SDK enables you to build agentic AI apps in a lightweight, easy-to-use package with very few abstractions"; có "a built-in loop that continues until the task is complete"; là "a production-ready upgrade of our previous experimentation for agents, Swarm"; dùng được cả "non-OpenAI providers" (demo của mình chạy model qua gateway công ty).
Nếu lớp hỏi: SDK mã nguồn mở, có bản Python (demo dùng) và TypeScript; không bắt buộc dùng model của OpenAI — demo chạy model qua LLM gateway công ty.
Cùng loại (chỉ để định vị, không đi sâu): LangGraph, Google ADK, Claude Agent SDK — đều đóng gói phần vòng lặp agent.
Link: openai.github.io/openai-agents-python

--- Chi tiết từng concept (từ slide cũ "Các thành phần chính") ---
Chuyển sang phần 03. Không học API mới: mỗi khái niệm SDK là một phần của sơ đồ agent loop đã thấy ở slide 5. Đọc theo hàng, chỉ lại vào sơ đồ slide 5 nếu cần.
- Agent: khai báo instructions (system prompt), model, danh sách tool — "LLM + hướng dẫn + tool nó được dùng".
- function_tool: biến một hàm Python thành tool; SDK tự sinh mô tả (tên, mô tả, JSON schema tham số) từ type hint + docstring để gửi cho LLM.
- Runner.run: chính là vòng lặp ①–④ — gọi model, chạy tool model chọn, đưa kết quả lại, lặp tới khi có câu trả lời cuối hoặc chạm giới hạn số lượt (max_turns).
- Trace: SDK tự ghi lại từng bước (model call, tool call, guardrail) — slide sau.
Code thật (rút gọn từ demo/agent_openai_sdk.py) xem ở phần demo cuối buổi:
  agent = Agent(name="Support agent", instructions=SYSTEM_PROMPT, model=model, tools=[search_kb, create_ticket])
  result = await Runner.run(agent, "<câu hỏi>", context=session, max_turns=8)
Lưu ý kỹ thuật: demo dùng gateway công ty qua OpenAIChatCompletionsModel (chuẩn Chat Completions — provider nào tương thích OpenAI cũng chạy).
Nguồn từng ý:
- 4 tên Agent · function_tool · Runner.run · Trace: khái niệm chính thức của SDK (docs: mục Agents, Tools, Running agents, Tracing). Docs mô tả agent là "LLMs equipped with instructions and tools".
- Runner.run = vòng lặp: docs mục "The agent loop" — "We call the LLM for the current agent, with the current input"; nếu là câu trả lời cuối thì "the loop ends"; nếu LLM trả tool call thì "we run those tool calls, append the results, and re-run the loop"; quá max_turns thì báo lỗi MaxTurnsExceeded.
- function_tool: docs mục Tools — "You can use any Python function as a tool"; tên tool lấy từ tên hàm, mô tả lấy từ docstring, "The schema for the function inputs is automatically created from the function's arguments".
- Cột trái (nối với sơ đồ slide 5) là cách trainer đối chiếu; khớp với mô tả "The agent loop" ở trên.
Link: openai.github.io/openai-agents-python/running_agents · /tools · /tracing
- Guardrail: concept thứ 5 trong SDK — kiểm tra input/output của agent (docs: "Guardrails, which enable validation of agent inputs and outputs"); demo có guardrail no_card_number chặn số thẻ trong câu hỏi.`);
  table(s, 30, 86, [270, 140, 250], [
    ['Code app phải làm (nếu tự viết)', 'Concept SDK', 'Dùng thế nào'],
    ['Khai báo LLM + hướng dẫn + danh sách tool', 'Agent', 'khai báo instructions, model, tools'],
    ['Biến hàm thành tool, mô tả cho LLM', 'function_tool', 'gắn vào hàm, SDK tự sinh mô tả'],
    ['Gọi LLM → chạy tool → gửi kết quả → lặp, quyết khi dừng', 'Runner.run', 'gọi 1 lần, SDK chạy cả vòng lặp'],
    ['Ghi log từng bước', 'Trace', 'SDK tự ghi'],
    ['Kiểm tra input / output', 'Guardrail', 'khai báo hàm kiểm tra'],
  ], { rowH: 44, size: 12 });

  extra.traceLocate();

  question('Có SDK rồi — còn phải tự viết gì?', '',
    `[Đề cương: 02_Noi_dung_chi_tiet_chuong_trinh_dao_tao_AI.pdf, trang 4, mục Session 5 — Nội dung giảng giải, gạch đầu dòng 4: "Chỉ rõ phần SDK cung cấp và phần product vẫn phải tự quyết định."]\nHỏi lớp 1 phút (gợi ý nếu lớp im: SDK lo agent loop, tool schema, trace, cả cơ chế dừng chờ duyệt… vậy còn gì?). Nhiều người nghĩ SDK lo luôn phân quyền. Slide sau: SDK cung cấp cơ chế, application ra quyết định.`);

  s = newSlide('Ranh giới', 'SDK chạy loop — application giữ quyền quyết định', `[Đề cương: 02_Noi_dung_chi_tiet_chuong_trinh_dao_tao_AI.pdf, trang 4, mục Session 5 — Nội dung giảng giải, gạch đầu dòng 4: "Chỉ rõ phần SDK cung cấp và phần product vẫn phải tự quyết định."]\nCâu quan trọng nhất của Session 5 (nguyên văn trong đề cương).
Đọc từng cặp: SDK có cơ chế, nhưng QUYẾT ĐỊNH là của application.
Ví dụ: SDK có needs_approval để dừng chờ duyệt, nhưng hành động nào cần duyệt, ai được duyệt — application quyết.
SDK có guardrail, nhưng guardrail lọc nội dung, KHÔNG phải phân quyền (Session 7).
Câu hỏi kiểm tra: "Kiểm tra user thuộc tenant nào — SDK hay application?" → application, lấy từ session đăng nhập.
Tên SDK trong cột giữa chưa giới thiệu ở slide 19 — giải thích 1 câu khi đọc tới:
- max_turns: tham số của Runner.run, giới hạn số lượt gọi LLM; quá giới hạn thì SDK dừng và báo lỗi (MaxTurnsExceeded) — đây là "điều kiện dừng" do code đặt.
- needs_approval: đánh dấu một tool cần người duyệt; khi LLM gọi tool này, SDK dừng run và trả lại cho app hỏi người duyệt.
- RunState: trạng thái của một run đang dừng (vd chờ duyệt); app lưu lại, khi có kết quả duyệt thì tiếp tục run từ đúng chỗ đó.
- context (dòng Dữ liệu & quyền): object app truyền vào Runner.run, tool đọc được nhưng LLM không thấy — dùng để mang user/tenant.
Chi tiết làm ở Session 7 (duyệt, quyền) và Session 8 (state, điều kiện dừng).`);
  table(s, 25, 85, [170, 250, 250], [
    ['', 'SDK cung cấp', 'Application tự quyết'],
    ['Loop', 'Runner.run, max_turns', 'Khi nào là "xong thật"'],
    ['Tools', 'Schema, gọi hàm, trả kết quả', 'Tool nào được mở cho agent'],
    ['Dữ liệu & quyền', 'Truyền context vào tool', 'User/tenant được thấy gì, làm gì'],
    ['Approval', 'needs_approval, dừng run', 'Hành động nào cần duyệt, ai duyệt'],
    ['State', 'RunState lưu / tiếp tục run', 'Lưu ở đâu, bao lâu, trạng thái nào'],
    ['Business rule', '—', 'Priority, assignee, hạn mức…'],
  ], { rowH: 36 });

  extra.demoSupportRequests(); // demo cuối buổi: 2 yêu cầu support chạy thật (ví dụ trong đề cương)

  takeaways([
    ['Khác nhau ở đâu', 'Ai chọn bước tiếp theo: code viết sẵn (workflow) hay LLM tự chọn (agent)'],
    ['Khi nào dùng workflow', 'Viết trước được các bước → ổn định, rẻ, dễ debug, an toàn hơn'],
    ['Khi nào dùng agent', 'Quyết định phức tạp, rule khó bảo trì, dữ liệu phi cấu trúc'],
    ['Nguyên tắc', 'Bắt đầu đơn giản: model call → workflow → agent, chỉ lên khi cần'],
    ['OpenAI Agents SDK', 'SDK lo vòng lặp và tool; dữ liệu, quyền, duyệt, state, business rule do app giữ'],
  ], `[Đề cương: 02_Noi_dung_chi_tiet_chuong_trinh_dao_tao_AI.pdf, trang 4, mục Session 5 — dòng "Kết quả cần đạt": "Người học chọn đúng mức điều phối và đọc được sơ đồ agent tối thiểu."]
Tóm tắt 2 phút, mỗi thẻ ứng với một phần của buổi:
- Khác nhau ở đâu → phần 01 (slide 6–7): câu hỏi phân biệt duy nhất là "ai chọn bước tiếp theo". Dùng LLM hay có tool không làm nên agent.
- Khi nào dùng workflow → slide 9–10: viết ra giấy được hết các bước và nhánh (Anthropic: "predictability and consistency for well-defined tasks"); an toàn hơn vì model không tự chọn hành động (OWASP LLM06 Excessive Agency).
- Khi nào dùng agent → slide 11: 3 dấu hiệu của OpenAI. Không có dấu hiệu nào → workflow.
- Nguyên tắc → slide 12: Anthropic "finding the simplest solution possible, and only increasing complexity when needed"; workflow có nhiều mẫu (slide 13–17).
- OpenAI Agents SDK → slide 19–22: SDK viết sẵn phần code app (Agent · function_tool · Runner.run · Trace · Guardrail); tool nào được mở, quyền, dữ liệu, duyệt, state, business rule vẫn do application quyết (Session 7 đi sâu).
Đối chiếu lại các use case lớp nêu ở slide 8.`, 'Ý chính của buổi');

  reviewQuestions([
    'Agent tốn hơn workflow ở chỗ nào?',
    'Use case nào trong dự án của bạn đáng làm agent? Vì sao?',
    'SDK có cơ chế dừng chờ duyệt — vậy ai quyết hành động nào cần duyệt?',
    'Agent làm sai mà không báo lỗi — phát hiện bằng cách nào?',
  ], `[Đề cương: 02_Noi_dung_chi_tiet_chuong_trinh_dao_tao_AI.pdf, trang 4, mục Session 5 — dòng "Kết quả cần đạt".]
Câu hỏi ôn tập, hỏi nhanh cả lớp (che đáp án). Đáp án:
1. Agent tốn hơn workflow ở đâu? → số lượt gọi model không biết trước, mỗi lượt gửi lại cả hội thoại; chi phí và độ trễ dao động (bảng So sánh, slide 7).
2. Use case đáng làm agent → phải chỉ ra được ít nhất 1 trong 3 dấu hiệu (quyết định phức tạp, rule khó bảo trì, dữ liệu phi cấu trúc) VÀ không viết trước được các nhánh. Nếu chỉ "cho xịn" → workflow.
3. Ai quyết hành động nào cần duyệt? → application (slide 22). SDK chỉ cung cấp cơ chế dừng chờ duyệt (needs_approval); tool nào phải duyệt, ai được duyệt là business rule của mình (Session 7).
4. Agent sai thường không ném lỗi (vd quên làm 1 bước, trả lời nghe hợp lý) → không có alert. Phát hiện bằng: application kiểm tra kết quả thật trong hệ thống đích (Session 6: run kết thúc ≠ task xong) và eval chạy lặp trước khi release (Session 9).`);

  homework('Bài tập về nhà', [
    'Chọn một use case trong dự án của bạn',
    'Giải thích vì sao dùng model call, workflow hay agent',
    'Đánh dấu phần nào SDK lo, phần nào application phải tự làm',
  ], `[Đề cương: 02_Noi_dung_chi_tiet_chuong_trinh_dao_tao_AI.pdf, trang 4, mục Session 5 — dòng "Bài tự thực hành sau buổi học": "Chọn một use case và giải thích vì sao dùng model call, workflow hoặc agent; đánh dấu ranh giới SDK và application."]\nBài tự thực hành theo đề cương. Người học làm sau buổi, mang tới đầu Session 6 để thảo luận 3-5 phút.
Gợi ý chấm: lý do chọn mức phải dựa vào tiêu chí trong buổi (viết trước được các bước? có dấu hiệu cần agent?), không phải "cho xịn"; ranh giới SDK/application dùng bảng slide 22.`);

  return { noClosing: true }; // S5 không có slide Q&A riêng (user 29/10)
};
