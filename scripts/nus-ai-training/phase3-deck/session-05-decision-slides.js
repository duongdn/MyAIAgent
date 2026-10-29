// Session 5 · phần 02 "Agent hay workflow": chọn theo đặc điểm bài toán (Anthropic + OpenAI), không theo số đo
const { C, box, mono, arrow, newSlide, question } = require('./slide-kit');

const SRC_ANTHROPIC = 'Anthropic, "Building effective agents" (anthropic.com/engineering/building-effective-agents)';
const SRC_OPENAI = 'OpenAI, "A practical guide to building agents", mục "When should you build an agent?"';

function askWorkflowOrAgent() {
  question('Use case của bạn: workflow hay agent?', 'Trả lời trước khi viết dòng code nào.',
    `Hỏi lớp 1–2 phút: mỗi người nghĩ 1 use case trong dự án của mình, giơ tay chọn workflow hay agent. Ghi lại vài use case lên bảng, các slide sau dùng chúng làm ví dụ.`);
}

function whenWorkflow() {
  const s = newSlide('Khi nào workflow', 'Viết trước được các bước → workflow', `Câu hỏi đầu tiên: viết ra giấy được hết các bước và các nhánh không? Được → workflow.
Workflow là "đường đi do code viết sẵn" — LLM vẫn có thể làm từng bước (phân loại, trích thông tin, viết câu trả lời), nhưng thứ tự do code giữ.
Anthropic: "workflows offer predictability and consistency for well-defined tasks". Nhiều bài toán chỉ cần 1 lần gọi model kèm dữ liệu là đủ.
4 lợi ích — đọc từng thẻ, hỏi lớp use case nào trên bảng thuộc loại này.
Nguồn từng ý:
- Câu hỏi "viết ra giấy được hết các bước và nhánh?": diễn đạt lại ý Anthropic "well-defined tasks" / "predefined code paths"; bài KodeKloud hỏi tương tự: "Can I define all possible paths in advance?".
- Ổn định: Anthropic "workflows offer predictability and consistency for well-defined tasks".
- Rẻ, nhanh: suy ra từ Anthropic — agent "trade latency and cost for better task performance".
- An toàn hơn: workflow chỉ làm được những gì code đã viết — không có hành động ngoài kịch bản. Ngược lại, Anthropic cảnh báo agent: "potential for compounding errors. We recommend extensive testing in sandboxed environments, along with the appropriate guardrails."
- Dễ debug: bài thứ cấp (Beyond the Demo): "When a workflow breaks, you can pinpoint the step".
- 3 ví dụ dưới: ví dụ minh hoạ do trainer chọn, không lấy từ nguồn.
Link: anthropic.com/engineering/building-effective-agents · notes.kodekloud.com (Workflows vs Agents: When to Use Each) · beyondthedemoai.substack.com/p/agentic-vs-deterministic`);
  box(s, 40, 92, 640, 46, 'Viết ra giấy được hết các bước và các nhánh?', { fill: C.INK, size: 16 });
  [['Ổn định', 'cùng input → cùng các bước'], ['Rẻ, nhanh', 'số lần gọi model cố định'], ['Dễ debug', 'lỗi nằm ở một bước cụ thể'], ['An toàn hơn', 'chỉ chạy các bước đã viết sẵn']]
    .forEach(([t, d], i) => box(s, 40 + i * 162, 156, 152, 78, `${t}\n${d}`, { fill: C.GREEN, size: 15, sub: 10.5 }));
  mono(s, 40, 256, 640, 14, 'VÍ DỤ', { size: 9, color: C.GREY });
  ['Phân loại email → điền form', 'Trích thông tin hoá đơn → lưu DB', 'Hỏi đáp tài liệu nội bộ']
    .forEach((t, i) => box(s, 40 + i * 216, 274, 206, 40, t, { fill: C.CARD, size: 12, bold: false }));
}

function whenAgent() {
  const s = newSlide('Khi nào agent tạo giá trị', 'Agent đáng dùng khi rule viết sẵn không theo kịp', `OpenAI đưa 3 dấu hiệu — chỗ mà cách làm bằng rule cố định không xử lý nổi:
1. Quyết định phức tạp: cần phán đoán theo ngữ cảnh, nhiều ngoại lệ. Ví dụ của OpenAI: duyệt hoàn tiền trong customer service.
2. Rule quá nhiều, khó bảo trì: mỗi lần đổi là sửa cả đống if/else, dễ sai. Ví dụ: review bảo mật nhà cung cấp.
3. Dựa nhiều vào dữ liệu phi cấu trúc: đọc hiểu văn bản, hội thoại. Ví dụ: xử lý hồ sơ bồi thường bảo hiểm.
OpenAI chốt: không đạt rõ các tiêu chí này thì "a deterministic solution may suffice" — workflow là đủ.
Ví dụ dễ hình dung: rule engine chống gian lận = checklist; agent = điều tra viên, nhìn ngữ cảnh khi rule không bắt được.
Nguồn từng ý:
- 3 dấu hiệu + 3 ví dụ: nguyên văn OpenAI — "Complex decision-making" (refund approval), "Difficult-to-maintain rules" (vendor security reviews), "Heavy reliance on unstructured data" (processing a home insurance claim).
- Ô dưới: OpenAI "Otherwise, a deterministic solution may suffice" — deterministic = code thường hoặc workflow, không nhất thiết có LLM.
Link: cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf`);
  [['Quyết định phức tạp', 'phán đoán theo ngữ cảnh, nhiều ngoại lệ', 'duyệt hoàn tiền'],
   ['Rule khó bảo trì', 'quá nhiều if/else, sửa là dễ sai', 'review bảo mật nhà cung cấp'],
   ['Dữ liệu phi cấu trúc', 'văn bản, hội thoại, tài liệu', 'xử lý hồ sơ bồi thường']].forEach(([t, d, ex], i) => {
    const x = 40 + i * 216;
    box(s, x, 92, 206, 120, `${t}\n${d}`, { fill: C.ORANGE, size: 15, sub: 11 });
    box(s, x, 220, 206, 40, `vd: ${ex}`, { fill: C.CARD, size: 11.5, bold: false });
  });
  box(s, 40, 284, 640, 46, 'Không có dấu hiệu nào ở trên → dùng workflow', { fill: C.INK, size: 15 });
}

function startSimple() {
  const s = newSlide('Nguyên tắc', 'Bắt đầu đơn giản — chỉ lên bậc khi bậc dưới không đủ', `Anthropic: "finding the simplest solution possible, and only increasing complexity when needed"; "add multi-step agentic systems only when simpler solutions fall short".
4 bậc từ trái sang phải. Bậc 3 là lựa chọn ở giữa hay bị bỏ qua: workflow giữ thứ tự, chỉ một bước cho model chọn giữa vài tool có sẵn.
Quay lại các use case trên bảng lúc đầu: mỗi cái đang ở bậc mấy, có cần lên bậc không?
Nguồn từng ý:
- Bắt đầu đơn giản: Anthropic "finding the simplest solution possible, and only increasing complexity when needed"; "add multi-step agentic systems only when simpler solutions fall short".
- Bậc 1: Anthropic "augmented LLM" (LLM + retrieval, tools, memory); "optimizing single LLM calls with retrieval and in-context examples is usually enough".
- Bậc 3 = mẫu "Routing" của Anthropic: LLM phân loại input rồi chuyển sang nhánh xử lý phù hợp ("distinct categories that are better handled separately").
Link: anthropic.com/engineering/building-effective-agents`);
  [['1', 'Model call', '1 lần gọi + dữ liệu'], ['2', 'Workflow', 'code giữ thứ tự'], ['3', 'Workflow có routing', 'model chọn nhánh'], ['4', 'Agent', 'model chọn mọi bước']]
    .forEach(([n, t, d], i) => {
      const x = 40 + i * 162; const y = 196 - i * 32;
      box(s, x, y, 140, 76, `${t}\n${d}`, { fill: i === 3 ? C.ORANGE : i === 0 ? C.CARD : C.LIGHT, size: 14, sub: 10.5 });
      mono(s, x, y - 18, 140, 14, `BẬC ${n}`, { size: 9, color: C.GREY });
      if (i) arrow(s, x - 22, y + 50, x - 2, y + 30);
    });
}

function applyDecision() {
  const s = newSlide('Áp dụng', 'Hai câu hỏi để chọn workflow hay agent', `Gom slide 9–11 thành một quy trình để người học tự áp dụng — đi từ trên xuống, dừng ở ô đầu tiên trả lời được.
1. Viết trước được hết các bước và nhánh? Có → workflow (slide 9).
2. Có ít nhất 1 dấu hiệu của slide 10 (quyết định phức tạp, rule khó bảo trì, dữ liệu phi cấu trúc)? Không → workflow (OpenAI: "a deterministic solution may suffice").
3. Có → thử bậc thấp nhất đủ dùng trước (workflow có routing), chỉ lên agent khi vẫn không đủ (slide 11, Anthropic "only increasing complexity when needed").
2 ví dụ dưới để làm mẫu: trích thông tin hoá đơn → câu 1 "có" → workflow. Xử lý hồ sơ bồi thường bảo hiểm (ví dụ của OpenAI) → câu 1 "không", câu 2 "có" (dữ liệu phi cấu trúc, nhiều ngoại lệ) → agent.
Sau đó áp vào các use case lớp nêu ở slide 8.`);
  [['1', 'Viết trước được hết các bước và nhánh?', 'Có → Workflow'],
   ['2', 'Có dấu hiệu cần agent?\nquyết định phức tạp · rule khó bảo trì · dữ liệu phi cấu trúc', 'Không → Workflow']].forEach(([n, q, a], i) => {
    const y = 90 + i * 84;
    box(s, 40, y, 36, 36, n, { fill: C.INK, shape: 'ELLIPSE', size: 14, noLine: true });
    box(s, 88, y - 8, 360, 56, q, { fill: C.LIGHT, size: 13.5, sub: 10, align: 'START' });
    arrow(s, 448, y + 20, 488, y + 20);
    box(s, 490, y, 190, 40, a, { fill: C.GREEN, size: 13 });
    arrow(s, 268, y + 48, 268, y + 70);
  });
  box(s, 88, 258, 360, 44, 'Có → thử routing trước, chưa đủ mới lên agent', { fill: C.ORANGE, size: 13.5 });
  mono(s, 40, 318, 640, 14, 'VÍ DỤ', { size: 9, color: C.GREY });
  box(s, 40, 336, 315, 34, 'Trích thông tin hoá đơn → câu 1 có → workflow', { fill: C.CARD, size: 11, bold: false });
  box(s, 365, 336, 315, 34, 'Xử lý hồ sơ bồi thường → câu 2 có → agent', { fill: C.CARD, size: 11, bold: false });
}

function decisionSlides() {
  askWorkflowOrAgent();
  whenWorkflow();
  whenAgent();
  startSimple();
  applyDecision();
}

module.exports = { decisionSlides };
