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
  label(s, 40, 232, 600, 30, 'Session 5–9 · OpenAI Agents SDK', { size: 15, bold: false, color: C.DIM, align: 'START' });
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
Mục tiêu: người học chọn đúng mức điều phối và đọc được sơ đồ agent tối thiểu.
Warm-up: "Ai đã dùng ChatGPT bật web search? Ai quyết định lúc nào search — bạn hay ChatGPT?" → đó là agent.`);
  agenda([['3 mức điều phối', 'model call · workflow · agent'], ['Khi nào cần agent', 'đo token · khi nào workflow thắng'],
    ['OpenAI Agents SDK', 'agent tối thiểu · ranh giới SDK / application']], `45 phút: 3 phần ~9 phút + Q&A 10-15 phút.`);

  s = newSlide('Agent là gì', 'LLM chỉ đọc và viết text — agent là phần code bao quanh nó', `Agent = LLM + Tools + Context + Code của mình.
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

  [['Agent', C.BLUE, 52], ['=', null, 14], ['LLM', C.ORANGE, 40], ['+', null, 14], ['Tools', C.LIGHT, 48], ['+', null, 14], ['Context', C.LIGHT, 74], ['+', null, 14], ['Code của mình', C.LIGHT, 100]]
    .reduce((x, [t, f, w]) => { (f ? box : label)(s, x, 334, w, 26, t, f ? { fill: f, size: 12, noLine: true } : { size: 14 }); return x + w + 6; }, 40);

  extra.threeFlows();
  extra.threeFlowsCode();

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

  takeaways([
    ['Agent là gì', 'Model chọn bước tiếp theo; code chạy tool và giữ quyền kiểm soát'],
    ['Chọn mức', 'Liệt kê được nhánh → workflow · không liệt kê được → agent'],
    ['Chi phí', 'Agent tốn 2,6–13× token, dao động giữa các lần chạy'],
    ['SDK', 'Agent · function_tool · Runner.run · trace — không cần học thuộc API'],
    ['Ranh giới', 'SDK chạy loop; dữ liệu, quyền, approval, state, business rule là của application'],
  ], `Tóm tắt 2 phút trước Q&A, đọc từng thẻ:
- Agent: model chọn bước tiếp; code chạy tool và giữ kiểm soát.
- Chọn mức: thấp nhất làm được việc; agent khi số bước phụ thuộc kết quả.
- Chi phí: 2 số đo thật hôm nay — bước biết trước: agent tốn ~2,6× token so với workflow; bước phụ thuộc kết quả tra: workflow tốn ~2,8× so với agent (5.246 vs 1.893). Không mức nào luôn rẻ hơn. Workflow viết đúng thứ tự (tra trước, quyết sau) thì đúng 20/20 và rẻ 6–13× so với agent (slide 15).
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
