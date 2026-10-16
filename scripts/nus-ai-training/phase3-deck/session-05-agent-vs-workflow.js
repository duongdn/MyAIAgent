// Mở đầu Giai đoạn 3 + Session 5: Agent khác workflow ở đâu và OpenAI Agents SDK hỗ trợ gì (45 phút)
const { C, box, label, code, arrow, twoWay, table, newSlide, question, sessionHeader, recap, agenda, takeaways, challenge, blank, mono, footer } = require('./slide-kit');
const extra = require('./session-05-extra-slides');

module.exports = function session05() {
  let s = blank(`Mở đầu Giai đoạn 3 (Session 5–9). Một support agent duy nhất, mỗi buổi thêm một lớp.
SDK dùng xuyên suốt: OpenAI Agents SDK (openai-agents 0.23.1). Code: scripts/nus-ai-training/support_agent_demo/.
Model chạy qua LLM gateway công ty (llm.nustechnology.com, mặc định deepseek-v4.1-flash) — mọi log/số liệu trên slide là kết quả chạy thật.
Thông điệp xuyên suốt: SDK giúp chạy loop và tích hợp tool; application giữ quyền với dữ liệu, permission, approval, state lưu bền và business rule.`, C.INK);
  mono(s, 40, 40, 300, 16, 'NUS TECHNOLOGY', { color: C.ORANGE, size: 10 });
  label(s, 40, 90, 640, 110, 'Giai đoạn 3 —\nBuild AI Agent', { size: 46, color: C.WHITE, align: 'START', valign: 'TOP', lineSpacing: 100 });
  label(s, 40, 232, 600, 30, 'Session 5–9 · một support agent mở rộng dần · OpenAI Agents SDK', { size: 15, bold: false, color: C.DIM, align: 'START' });
  label(s, 40, 320, 250, 20, 'Dương Nguyễn', { size: 12, color: C.WHITE, align: 'START' });
  ['search_kb', '→', 'create_ticket', '→', 'T-1001'].forEach((t, i) => box(s, 400 + [0, 70, 88, 182, 200][i], 318, t === '→' ? 18 : [68, 0, 92, 0, 60][i], 24, t,
    { fill: t === '→' ? C.INK : i === 4 ? C.ORANGE : C.GHOST, font: 'IBM Plex Mono', size: 9, color: i === 4 ? C.INK : C.DIM, noLine: true }));
  footer(s, true);

  s = newSlide('Lộ trình', 'Một agent, 5 buổi — mỗi buổi thêm một lớp', `Đi qua lộ trình 1 phút. Mỗi cột: câu hỏi của buổi và phần agent có thêm sau buổi đó.
Case study: support agent đọc knowledge base, trả lời có nguồn, tạo ticket sau khi được phép.
Cuối giai đoạn, người học có bản thiết kế agent đủ rõ để thảo luận với đội triển khai.`);
  [['S5', 'Có cần agent không?', 'Agent tối thiểu:\nmodel + 1 tool + Runner'],
   ['S6', 'Agent gọi tool thế nào?', 'Tool contract\nsearch_kb · create_ticket'],
   ['S7', 'Chặn gì quanh tool call?', 'Quyền · retry ·\nidempotency · approval'],
   ['S8', 'Giữ gì, khi nào dừng?', 'Task state lưu bền ·\n5 điều kiện dừng'],
   ['S9', 'Đủ để review chưa?', 'Harness · trace ·\nkiến trúc 1 trang']].forEach(([k, q, add], i) => {
    const x = 25 + i * 136;
    box(s, x, 90, 126, 44, k, { fill: C.NAVY, size: 18 });
    box(s, x, 140, 126, 70, q, { fill: C.LIGHT, size: 12 });
    box(s, x, 216, 126, 80, add, { fill: C.GREEN, size: 11, bold: false });
    if (i) arrow(s, x - 10, 112, x, 112);
  });
  label(s, 25, 305, 680, 22, 'câu hỏi của buổi  ↑            phần agent có thêm sau buổi  ↑', { size: 10, bold: false, color: C.GREY });

  sessionHeader(5, 'Agent khác workflow ở đâu', 'Khi nào nên để model chọn bước tiếp theo thay vì viết sẵn toàn bộ flow?',
    `Session 5 — 45 phút: mở đầu 5' · nội dung 25-30' · Q&A 10-15'.
Mục tiêu: người học chọn đúng mức điều phối và đọc được sơ đồ agent tối thiểu.
Warm-up: "Ai đã dùng ChatGPT bật web search? Ai quyết định lúc nào search — bạn hay ChatGPT?" → đó là agent.`);
  recap('Giai đoạn 2: model trả lời từ dữ liệu riêng của công ty', [
    'Embedding + vector search tìm tài liệu theo nghĩa, không chỉ theo từ khoá',
    'RAG: lấy tài liệu liên quan rồi đưa vào prompt — câu trả lời có nguồn',
    'RAG trả lời được câu hỏi — nhưng không hành động được (không tạo ticket)',
  ], `2-3 phút nhắc Giai đoạn 2 (Session 3-4). Nối sang hôm nay: RAG trả lời được câu hỏi, nhưng không TẠO ticket được. Khi cần hành động và nhiều bước → agent.`);
  agenda([['3 mức điều phối', 'model call · workflow · agent'], ['Khi nào cần agent', 'ví dụ support + 3 câu hỏi quyết định'],
    ['OpenAI Agents SDK', 'agent tối thiểu · ranh giới SDK / application']], `45 phút: 3 phần ~9 phút + Q&A 10-15 phút.`);

  s = newSlide('Nhắc lại Session 1', 'LLM chỉ đọc và viết text — agent là phần code bao quanh nó', `Nối với Session 1 (AI, LLM Fundamentals): "Text in → text out. Agent = LLM + Tools + Context + Your code".
Model không tự gọi API. Nó viết ra một đoạn text có cấu trúc kiểu "tôi cần gọi search_kb với query=...". Code của application đọc đoạn đó, chạy hàm thật, đưa kết quả lại cho model.
Toàn bộ Giai đoạn 3 là học cách viết phần code bao quanh đó cho đúng.
Câu hỏi hay gặp: "Vậy prompt injection làm sao gây hại nếu model chỉ viết text?" → vì application THỰC THI text đó. Session 7 sẽ trả lời kỹ.`);
  box(s, 40, 92, 420, 228, '', { fill: C.CARD, valign: 'TOP' });
  label(s, 50, 100, 300, 20, 'AGENT (application của mình)', { size: 10, align: 'START', color: C.ORANGE });
  box(s, 60, 130, 380, 50, 'LLM\nđọc text → viết text (kể cả "tôi cần gọi tool X")', { fill: C.NAVY, size: 15, sub: 11 });
  ['search_kb', 'create_ticket', 'DB / API'].forEach((t, i) => box(s, 60 + i * 130, 200, 120, 36, t, { fill: C.LIGHT, size: 12 }));
  box(s, 60, 246, 380, 62, 'Code của mình\nchạy tool thật · kiểm quyền · lưu state · quyết định dừng', { fill: C.GREEN, size: 13, sub: 11 });
  [['1', 'Model viết: "gọi search_kb(query=…)"'], ['2', 'Code chạy hàm thật'], ['3', 'Kết quả quay lại model dưới dạng text'], ['4', 'Lặp tới khi model trả lời']]
    .forEach(([k, t], i) => {
      box(s, 480, 110 + i * 60, 30, 30, k, { fill: C.ORANGE, shape: 'ELLIPSE', size: 12, noLine: true });
      label(s, 518, 105 + i * 60, 190, 40, t, { size: 12, bold: false, align: 'START' });
    });

  // nối với slide kết luận Session 1 (ChienTX): Agent = LLM + Tools + Context + Your code
  [['Agent', C.BLUE, 52], ['=', null, 14], ['LLM', C.ORANGE, 40], ['+', null, 14], ['Tools', C.LIGHT, 48], ['+', null, 14], ['Context', C.LIGHT, 74], ['+', null, 14], ['Code của mình', C.LIGHT, 100]]
    .reduce((x, [t, f, w]) => { (f ? box : label)(s, x, 334, w, 26, t, f ? { fill: f, size: 12, noLine: true } : { size: 14 }); return x + w + 6; }, 40);

  extra.threeFlows();

  s = newSlide('So sánh', 'Cùng yêu cầu "E205 + tạo ticket" ở 3 mức', `Cùng một yêu cầu: "Khách X báo lỗi E205, xử lý sao? Tạo ticket cho billing team giúp tôi."
- Model call: trả lời được nửa đầu (E205 = ngân hàng từ chối) nhưng không làm được nửa sau.
- Workflow: làm đủ — nhưng ticket luôn tạo theo tham số code viết sẵn (P3, billing-team-a). Yêu cầu khác dạng (ví dụ "không cần ticket") phải sửa code.
- Agent: làm đủ và linh hoạt (tự quyết có tạo ticket không, tạo với tham số gì) — đổi lại khó test hơn và cần kiểm soát (Session 7).
Hỏi lớp: "Rủi ro của agent ở dòng cuối — ai chặn?" → application, Session 7.`);
  table(s, 30, 88, [140, 175, 175, 170], [
    ['', 'Model call', 'Workflow', 'Agent'],
    ['Làm được gì', 'Chỉ trả lời', 'Trả lời + tạo ticket', 'Trả lời + tạo ticket'],
    ['Ai chọn bước', 'Không có bước', 'Code — viết sẵn', 'Model — lúc chạy'],
    ['Tham số ticket', '—', 'Code cố định P3', 'Model đề xuất'],
    ['Đổi yêu cầu', 'Sửa prompt', 'Sửa code', 'Không cần sửa'],
    ['Test & audit', 'Dễ nhất', 'Dễ — flow cố định', 'Khó — nhiều đường đi'],
    ['Rủi ro chính', 'Trả lời sai', 'Không xử lý ca lạ', 'Gọi sai tool, tham số sai'],
  ], { rowH: 36 });

  extra.measuredCost();
  extra.tokenGrowth();
  extra.conditionalCase();

  question('Yêu cầu support nào cần agent?', 'Chỉ trả lời câu hỏi · nhiều bước · tạo ticket… — chọn mức thấp nhất đủ dùng.',
    `Hỏi lớp 2-3 phút trước khi lật đáp án. Cho từng người chọn mức cho 4 yêu cầu ở slide sau (đọc to trước).`);

  s = newSlide('Đáp án', 'Chọn mức thấp nhất làm được việc', `Giải thích từng dòng:
1. Tra cứu 1 lần là đủ → RAG, không cần agent.
2. Các bước luôn giống nhau → workflow; agent chỉ thêm chi phí và rủi ro.
3. "CẦN THÌ tạo": có tạo ticket hay không, tra mấy lần, phụ thuộc kết quả tra → agent có giá trị. Nếu user nói "LUÔN tạo ticket" thì bước biết trước → workflow (đúng như slide đo: workflow làm đủ với ~1.480 token).
4. Hoàn tiền là hành động tiền bạc, không đảo ngược được → workflow cố định + người duyệt, KHÔNG để model tự quyết.
Rule: khi không chắc → chọn mức thấp hơn; nâng mức sau khi đã có test case.`);
  table(s, 25, 85, [250, 120, 300], [
    ['Yêu cầu', 'Mức', 'Vì sao'],
    ['"Mã lỗi E205 nghĩa là gì?"', 'Model call + RAG', 'Một lần tra cứu là đủ'],
    ['"Phân loại email khách rồi điền form ticket"', 'Workflow', 'Bước luôn giống nhau, biết trước'],
    ['"Khách báo lỗi E205, xử lý giúp, CẦN THÌ tạo ticket"', 'Agent', 'Có tạo ticket không tuỳ kết quả tra (nếu LUÔN tạo → workflow, xem slide đo)'],
    ['"Hoàn 2.000 USD cho khách"', 'Workflow + người duyệt', 'Tiền bạc, không đảo ngược — model không tự quyết'],
  ], { rowH: 46, fills: [C.WHITE, C.WHITE, C.GREEN, C.YELLOW] });

  s = newSlide('Quyết định', 'Ba câu hỏi trước khi chọn agent', `Đi theo cây từ trên xuống.
1. Có cần hành động / gọi tool không? Không → model call (+ RAG nếu cần dữ liệu riêng).
2. Các bước có biết trước không? Biết → workflow (như slide đo: luôn tạo ticket P3 cho billing).
3. Nếu agent làm sai, có sửa lại được không? Không (gửi tiền, xoá dữ liệu) → phải có người duyệt hoặc quay về workflow.
Chỉ khi đi hết tới cuối mới chọn agent. Đây cũng là cách trả lời khách hàng khi họ nói "làm cho tôi một AI agent".`);
  [['Cần hành động / gọi tool?', 'Không → Model call (+ RAG)'], ['Các bước biết trước?', 'Có → Workflow'], ['Làm sai có sửa lại được?', 'Không → thêm người duyệt']]
    .forEach(([q, a], i) => {
      box(s, 60, 90 + i * 85, 260, 60, q, { fill: C.LIGHT, size: 15 });
      box(s, 400, 90 + i * 85, 240, 60, a, { fill: C.YELLOW, size: 14 });
      arrow(s, 320, 120 + i * 85, 400, 120 + i * 85);
      if (i < 2) arrow(s, 190, 150 + i * 85, 190, 175 + i * 85);
    });
  box(s, 60, 335, 580, 36, 'Cần tool · bước không biết trước → Agent (kèm kiểm soát ở S7–S9)', { fill: C.NAVY, size: 14 });
  arrow(s, 190, 320, 190, 335);

  s = newSlide('OpenAI Agents SDK', 'Agent tối thiểu chỉ cần 4 khái niệm của SDK', `Định vị, không học thuộc API.
- Agent: định nghĩa (instructions = system prompt, model, tools).
- function_tool: biến hàm Python thành tool; SDK tự sinh JSON schema từ type hint + docstring.
- Runner.run: chạy agent loop — gọi model, chạy tool, đưa kết quả lại, lặp tới khi có câu trả lời cuối hoặc chạm max_turns.
- Trace: SDK tự ghi lại từng bước (model call, tool call, guardrail). Demo ghi ra file local .traces/ thay vì gửi về OpenAI.
Lưu ý: dùng gateway công ty qua OpenAIChatCompletionsModel (chuẩn Chat Completions, provider nào tương thích OpenAI cũng chạy).`);
  [['Agent', 'instructions · model · tools'], ['function_tool', 'hàm Python → tool có schema'], ['Runner.run', 'chạy loop tới khi xong'], ['Trace', 'ghi lại từng bước']]
    .forEach(([t, d], i) => {
      box(s, 30 + i * 172, 95, 160, 70, `${t}\n${d}`, { fill: i === 2 ? C.NAVY : C.LIGHT, size: 15, sub: 11 });
      if (i) arrow(s, 30 + i * 172 - 12, 130, 30 + i * 172, 130);
    });
  code(s, 30, 185, 660, 180, `@function_tool
def search_kb(ctx: RunContextWrapper[Session], query: str) -> str:
    return checkpoints.search_kb(ctx.context, query)  # Session: model không thấy

agent = Agent(name="Support agent", instructions=SYSTEM_PROMPT,
              model=model, tools=[search_kb, create_ticket])

result = await Runner.run(agent, "Khách báo lỗi E205...", context=session, max_turns=8)
print(result.final_output)      # rút gọn từ agent_openai_sdk.py`, 11);

  extra.traceLocate();

  question('Có SDK rồi — còn phải tự viết gì?', 'SDK lo agent loop, tool schema, trace, cả cơ chế dừng chờ duyệt…',
    `Hỏi lớp 1 phút. Nhiều người nghĩ SDK lo luôn phân quyền. Slide sau: SDK cung cấp cơ chế, application ra quyết định.`);

  s = newSlide('Ranh giới', 'SDK chạy loop — application giữ quyền quyết định', `Câu quan trọng nhất của Session 5 (nguyên văn trong đề cương).
Đọc từng cặp: SDK có cơ chế, nhưng QUYẾT ĐỊNH là của application.
Ví dụ: SDK có needs_approval để dừng chờ duyệt, nhưng hành động nào cần duyệt, ai được duyệt — application quyết.
SDK có guardrail, nhưng guardrail lọc nội dung, KHÔNG phải phân quyền (Session 7).
Câu hỏi kiểm tra: "Kiểm tra user thuộc tenant nào — SDK hay application?" → application, lấy từ session đăng nhập.`);
  table(s, 25, 85, [170, 250, 250], [
    ['', 'SDK cung cấp', 'Application tự quyết'],
    ['Loop', 'Runner.run, max_turns', 'Khi nào là "xong thật"'],
    ['Tools', 'Schema, gọi hàm, trả kết quả', 'Tool nào được mở cho agent'],
    ['Dữ liệu & quyền', 'Truyền context vào tool', 'User/tenant được thấy gì, làm gì'],
    ['Approval', 'needs_approval, dừng run', 'Hành động nào cần duyệt, ai duyệt'],
    ['State', 'RunState lưu / tiếp tục run', 'Lưu ở đâu, bao lâu, trạng thái nào'],
    ['Business rule', '—', 'Priority, assignee, hạn mức…'],
  ], { rowH: 36 });

  takeaways([
    ['Agent là gì', 'Model chọn bước tiếp theo; code chạy tool và giữ quyền kiểm soát'],
    ['Chọn mức', 'Mức thấp nhất làm được việc — agent khi số bước phụ thuộc kết quả'],
    ['Chi phí', 'Bước biết trước: workflow rẻ ~2,6× · Bước phụ thuộc kết quả: agent rẻ ~2,8×'],
    ['SDK', 'Agent · function_tool · Runner.run · trace — không cần học thuộc API'],
    ['Ranh giới', 'SDK chạy loop; dữ liệu, quyền, approval, state, business rule là của application'],
  ], `Tóm tắt 2 phút trước Q&A, đọc từng thẻ:
- Agent: model chọn bước tiếp; code chạy tool và giữ kiểm soát.
- Chọn mức: thấp nhất làm được việc; agent khi số bước phụ thuộc kết quả.
- Chi phí: 2 số đo thật hôm nay — bước biết trước: agent tốn ~2,6× token so với workflow; bước phụ thuộc kết quả tra: workflow tốn ~2,8× so với agent (5.246 vs 1.893). Không mức nào luôn rẻ hơn.
- SDK: 4 khái niệm, biết chỗ trong code là đủ.
- Ranh giới: SDK cung cấp cơ chế, application ra quyết định (Session 7 đi sâu).`);

  challenge('Chọn một use case trong dự án của bạn. Giải thích vì sao dùng model call, workflow hay agent — và đánh dấu phần nào SDK lo, phần nào application phải tự làm.', [
    'Agent tốn hơn workflow ở chỗ nào?',
    'Workflow có gọi LLM thì có phải agent?',
    'Kiểm tra user thuộc tenant nào — SDK hay application?',
    'Model call + RAG muốn tạo ticket thì phải thêm gì?',
  ], `Bài tự thực hành theo đề cương. Người học làm sau buổi, mang tới đầu Session 6 để thảo luận 3-5 phút.
Câu hỏi thử thách trả lời nhanh trong Q&A:
1. Agent tốn hơn workflow ở đâu? → số lượt gọi không biết trước + mỗi lượt gửi lại cả hội thoại (đo thật: ~3.840 vs ~1.480 token). Nhưng nếu bước phụ thuộc kết quả tra thì ngược lại: workflow 5.246 vs agent 1.893 (slide 13).
2. "Workflow có LLM" vẫn là workflow? → đúng, nếu code quyết định thứ tự bước.
3. Ai kiểm tra tenant? → application, lấy từ session đăng nhập (Session 7).
4. Model call + RAG muốn tạo ticket? → thêm bước code gọi API ticket (thành workflow), hoặc đưa create_ticket thành tool cho model chọn (thành agent).`);
};
