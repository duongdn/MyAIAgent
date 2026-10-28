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
  label(s, 40, 320, 250, 20, 'DuongDN · VinhNT', { size: 12, color: C.WHITE, align: 'START' });
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
Warm-up (nối Session 2): "Session 2 các bạn đã extract email support thành JSON và validate. Giờ khách muốn hệ thống tự xử lý luôn: tra tài liệu, cần thì tạo ticket. Viết thêm bước bằng code, hay để model tự quyết bước tiếp theo?" → câu hỏi của cả buổi. Ghi lại lựa chọn của lớp, cuối buổi đối chiếu với số đo.`);
  agenda([['3 mức điều phối', 'model call · workflow do code điều phối · agent'], ['Agent hay workflow', 'khi nào agent tạo giá trị, khi nào workflow đơn giản an toàn hơn'],
    ['OpenAI Agents SDK', 'agent tối thiểu · phần SDK cung cấp, phần product tự quyết']], `45 phút: 3 phần ~9 phút + Q&A 10-15 phút.`);

  s = newSlide('Nhắc lại · Session 1–2', 'ChatGPT, Claude là agent: LLM + code app bao quanh', `Nhắc lại, KHÔNG giảng lại (tối đa 2 phút). Cùng ý slide "LLM vs Agent" của Session 1 (ChienTX).
Đi theo mũi tên:
- User hỏi → code app nhận.
- ① Code app gửi cho LLM: câu hỏi + context (lịch sử, mô tả các tool có thể dùng).
- ② LLM chỉ viết text. Khi thiếu thông tin, nó viết "tôi cần tool X với tham số Y" — nó KHÔNG tự gọi được gì.
- ③ Code app đọc đoạn text đó và chạy tool thật (web search, query DB, gọi API…).
- ④ Kết quả tool quay lại code app, code app gửi tiếp cho LLM (lại là ①). Lặp tới khi LLM viết câu trả lời cuối → code app trả cho user.
Công thức: Agent = LLM + Tools + Context + Code app. "Code app" là phần code bao quanh LLM, ai làm agent thì người đó viết:
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

  [['Agent', C.BLUE, 52], ['=', null, 14], ['LLM', C.ORANGE, 40], ['+', null, 14], ['Tools', C.LIGHT, 48], ['+', null, 14], ['Context', C.LIGHT, 74], ['+', null, 14], ['Code app', C.INK, 80]]
    .reduce((x, [t, f, w]) => { (f ? box : label)(s, x, 286, w, 26, t, f ? { fill: f, size: 12, noLine: true } : { size: 14 }); return x + w + 6; }, 40);
  box(s, 40, 326, 315, 34, 'ChatGPT, Claude → code app do OpenAI / Anthropic viết', { fill: C.CARD, size: 11, bold: false });
  box(s, 365, 326, 315, 34, 'Agent của mình → mình viết, Agents SDK lo vòng lặp', { fill: C.CARD, size: 11, bold: false });

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

  decide.consistency();
  decide.decision();

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
    ['Đo trước khi chọn', 'Chạy lặp cùng yêu cầu: đúng mấy lần, token dao động bao nhiêu'],
    ['Chọn mức', 'Liệt kê được nhánh → workflow · không liệt kê được → agent'],
    ['Chi phí', 'Agent tốn 2,6–13× token, dao động giữa các lần chạy'],
    ['SDK', 'Agent · function_tool · Runner.run · trace — không cần học thuộc API'],
    ['Ranh giới', 'SDK chạy loop; dữ liệu, quyền, approval, state, business rule là của application'],
  ], `Tóm tắt 2 phút trước Q&A, đọc từng thẻ:
- Đo trước khi chọn: 1 lần chạy không nói lên gì — chạy lặp (10 lần ở slide 14), đếm đúng/sai và khoảng token. Đối chiếu với lựa chọn của lớp lúc warm-up.
- Chọn mức: liệt kê được nhánh → workflow; không liệt kê được → agent.
- Chi phí: 2 số đo thật hôm nay — bước biết trước: agent tốn ~2,6× token so với workflow; bước phụ thuộc kết quả tra: workflow tốn ~2,8× so với agent (5.246 vs 1.893). Không mức nào luôn rẻ hơn. Workflow viết đúng thứ tự (tra trước, quyết sau) thì đúng 20/20 và rẻ 6–13× so với agent (slide 14).
- SDK: 4 khái niệm, biết chỗ trong code là đủ.
- Ranh giới: SDK cung cấp cơ chế, application ra quyết định (Session 7 đi sâu).`);

  challenge('Chọn một use case trong dự án của bạn. Giải thích vì sao dùng model call, workflow hay agent — và đánh dấu phần nào SDK lo, phần nào application phải tự làm.', [
    'Agent tốn hơn workflow ở chỗ nào?',
    'Khi nào workflow "tra trước" thua agent?',
    'Kiểm tra user thuộc tenant nào — SDK hay application?',
    'Agent đúng 19/20 — production phát hiện lần sai bằng cách nào?',
  ], `Bài tự thực hành theo đề cương. Người học làm sau buổi, mang tới đầu Session 6 để thảo luận 3-5 phút.
Câu hỏi thử thách trả lời nhanh trong Q&A:
1. Agent tốn hơn workflow ở đâu? → số lượt gọi không biết trước + mỗi lượt gửi lại cả hội thoại (đo thật: ~3.840 vs ~1.480 token). Nhưng nếu bước phụ thuộc kết quả tra thì ngược lại: workflow 5.246 vs agent 1.893 (slide 12).
2. Workflow "tra trước" thua khi nhánh không liệt kê được: số lần tra không biết trước (tra lần 1 chưa đủ, phải tra tiếp theo kết quả), hoặc nhiều tool kết hợp tuỳ dữ liệu. Lúc đó code phải viết mọi tổ hợp → agent rẻ hơn về công viết code.
3. Ai kiểm tra tenant? → application, lấy từ session đăng nhập (Session 7).
4. Lần sai (không tạo ticket dù phải tạo) không ném lỗi → không có alert. Phát hiện bằng: eval chạy lặp trước khi release (Session 9), và application kiểm tra kết quả thật — có ticket_id hay không, so với nhánh mong đợi (Session 6: run kết thúc ≠ task xong).`);
};
