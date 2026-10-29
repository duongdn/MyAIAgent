// Mở đầu Giai đoạn 3 + Session 5: Agent khác workflow ở đâu và OpenAI Agents SDK hỗ trợ gì (45 phút)
const { C, box, label, code, arrow, twoWay, table, newSlide, question, sessionHeader, recap, agenda, takeaways, challenge, blank, mono, footer } = require('./slide-kit');
const decide = require('./session-05-decision-slides');
const extra = require('./session-05-extra-slides');

module.exports = function session05() {
  let s = blank(`Mở đầu Giai đoạn 3 (Session 5–9). Một support agent duy nhất, mỗi buổi thêm một lớp.
SDK dùng xuyên suốt: OpenAI Agents SDK (openai-agents 0.23.1). Code: scripts/nus-ai-training/support_agent_demo/.
Model chạy qua LLM gateway công ty (llm.nustechnology.com, mặc định deepseek-v4.1-flash) — mọi log/số liệu trên slide là kết quả chạy thật.
Thông điệp xuyên suốt: SDK giúp chạy loop và tích hợp tool; application giữ quyền với dữ liệu, permission, approval, state lưu bền và business rule.`, C.INK);
  mono(s, 40, 40, 300, 16, 'NUS TECHNOLOGY', { color: C.ORANGE, size: 10 });
  label(s, 40, 90, 640, 110, 'Giai đoạn 3 —\nBuild AI Agent', { size: 46, color: C.WHITE, align: 'START', valign: 'TOP', lineSpacing: 100 });
  label(s, 40, 320, 250, 20, 'DuongDN · VinhNT', { size: 12, color: C.WHITE, align: 'START' }); // Giai đoạn 3 = 2 người; S5–S6 DuongDN, S7–S9 VinhNT
  footer(s, true);

  s = newSlide('Lộ trình', 'Một agent, 5 buổi — mỗi buổi thêm một lớp', `Đi qua lộ trình 1 phút. Mỗi hàng = agent sau buổi đó: ô cam là lớp buổi đó thêm vào, ô nhạt là lớp đã có từ trước. Hàng cuối = agent đầy đủ sau S9.
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
    `Session 5 — 45 phút: mở đầu 5' · nội dung 25-30' · Q&A 10-15'.
Người học đã qua Session 1 (LLM: token, context, không ổn định) và Session 2 (4 pattern, structured output, validate output). Không giảng lại "agent là gì".
Mục tiêu: chọn đúng mức điều phối bằng số đo, và định vị được agent tối thiểu trong OpenAI Agents SDK.
Warm-up (nối Session 2): "Session 2 các bạn đã extract email support thành JSON và validate. Giờ khách muốn hệ thống tự xử lý luôn: tra tài liệu, cần thì tạo ticket. Viết thêm bước bằng code, hay để model tự quyết bước tiếp theo?" → câu hỏi của cả buổi. Ghi lại lựa chọn của lớp, phần 02 đối chiếu bằng các tiêu chí chọn.`);
  agenda([['3 mức điều phối', 'model call · workflow do code điều phối · agent'], ['Agent hay workflow', 'khi nào agent tạo giá trị, khi nào workflow đơn giản an toàn hơn'],
    ['OpenAI Agents SDK', 'agent tối thiểu · phần SDK cung cấp, phần product tự quyết']], `45 phút: 3 phần ~9 phút + Q&A 10-15 phút.`);

  s = newSlide('Nhắc lại · Session 1–2', 'Agent: LLM chọn tool, code app chạy — lặp tới khi xong', `Nhắc lại, KHÔNG giảng lại (tối đa 2 phút). Cùng ý slide "LLM vs Agent" của Session 1 (ChienTX).
Đi theo mũi tên:
- User hỏi → code app nhận.
- ① Code app gửi cho LLM: câu hỏi + context (lịch sử, mô tả các tool có thể dùng).
- ② LLM chỉ viết text. Khi thiếu thông tin, nó viết "tôi cần tool X với tham số Y" — nó KHÔNG tự gọi được gì.
- ③ Code app đọc đoạn text đó và chạy tool thật (web search, query DB, gọi API…).
- ④ Kết quả tool quay lại code app, code app gửi tiếp cho LLM (lại là ①). Lặp tới khi LLM viết câu trả lời cuối → code app trả cho user.
Vì sao sơ đồ này là AGENT: ở bước ②, chính LLM quyết định gọi tool nào, mấy lần, khi nào dừng. Ở workflow, LLM không bao giờ nói "cần tool X" — code tự gọi tool theo các bước viết sẵn (slide sau so sánh trực tiếp). Định nghĩa theo Anthropic "Building effective agents" / OpenAI "A practical guide to building agents".
Minh hoạ live (30 giây, LLM thật): python3 run_demo.py --scenario 1 --approve yes --trace → in từng bước ①–④. Chỉ vào dòng "② LLM QUYẾT ĐỊNH gọi tool — chỉ là JSON: search_kb {...}" và dòng "lý do LLM tự viết": đó là LLM chọn bước. Dòng "③ APP chạy hàm thật" là code chạy. Có lần LLM đề xuất P2 → APP chặn → LLM tự sửa sang P3: thấy rõ LLM đề xuất, app quyết.
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

  s = newSlide('So sánh', '', `Tiêu chí lấy theo nguồn, chia 2 nhóm: CẤU TRÚC (khác nhau ở đâu) và HỆ QUẢ (vì cấu trúc khác nên được/mất gì).
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

  extra.threeFlowsCode(); // demo code đặt cuối: slide nói nguyên lý trước, code xem lúc demo

  takeaways([
    ['Workflow', 'Viết trước được các bước → ổn định, rẻ, dễ debug, an toàn hơn'],
    ['Agent', 'Quyết định phức tạp · rule khó bảo trì · dữ liệu phi cấu trúc'],
    ['Bắt đầu đơn giản', 'Model call → workflow → routing → agent: chỉ lên bậc khi bậc dưới không đủ'],
    ['SDK', 'Agent · function_tool · Runner.run · trace — không cần học thuộc API'],
    ['Ranh giới', 'SDK chạy loop; dữ liệu, quyền, approval, state, business rule là của application'],
  ], `Tóm tắt 2 phút trước Q&A, đọc từng thẻ:
- Workflow: viết ra giấy được hết các bước và nhánh → workflow (Anthropic: predictability, consistency).
- Agent: 3 dấu hiệu của OpenAI — quyết định phức tạp, rule khó bảo trì, dữ liệu phi cấu trúc. Không đạt rõ → workflow là đủ.
- Bắt đầu đơn giản: model call → workflow → workflow có routing → agent; chỉ lên bậc khi bậc dưới không đủ.
- SDK: 4 khái niệm, biết chỗ trong code là đủ.
- Ranh giới: SDK cung cấp cơ chế, application ra quyết định (Session 7 đi sâu).
Đối chiếu lại các use case lớp chọn lúc đầu phần 02.`);

  challenge('Chọn một use case trong dự án của bạn. Giải thích vì sao dùng model call, workflow hay agent — và đánh dấu phần nào SDK lo, phần nào application phải tự làm.', [
    'Agent tốn hơn workflow ở chỗ nào?',
    'Use case nào trong dự án của bạn đáng làm agent? Vì sao?',
    'Kiểm tra user thuộc tenant nào — SDK hay application?',
    'Agent làm sai mà không báo lỗi — phát hiện bằng cách nào?',
  ], `Bài tự thực hành theo đề cương. Người học làm sau buổi, mang tới đầu Session 6 để thảo luận 3-5 phút.
Câu hỏi thử thách trả lời nhanh trong Q&A:
1. Agent tốn hơn workflow ở đâu? → số lượt gọi model không biết trước, mỗi lượt gửi lại cả hội thoại; chi phí và độ trễ dao động (bảng So sánh, slide 7).
2. Use case đáng làm agent → phải chỉ ra được ít nhất 1 trong 3 dấu hiệu (quyết định phức tạp, rule khó bảo trì, dữ liệu phi cấu trúc) VÀ không viết trước được các nhánh. Nếu chỉ "cho xịn" → workflow.
3. Ai kiểm tra tenant? → application, lấy từ session đăng nhập (Session 7).
4. Agent sai thường không ném lỗi (vd quên làm 1 bước, trả lời nghe hợp lý) → không có alert. Phát hiện bằng: application kiểm tra kết quả thật trong hệ thống đích (Session 6: run kết thúc ≠ task xong) và eval chạy lặp trước khi release (Session 9).`);
};
