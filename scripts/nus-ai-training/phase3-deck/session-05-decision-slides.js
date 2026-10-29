// Session 5 · phần 02 "Agent hay workflow": chọn theo đặc điểm bài toán (Anthropic + OpenAI), không theo số đo
const { C, box, mono, arrow, table, newSlide, question } = require('./slide-kit');

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
3 lợi ích — đọc từng thẻ. Vế "an toàn hơn" của đề cương nói riêng ở slide sau, hỏi lớp use case nào trên bảng thuộc loại này.
Nguồn từng ý:
- Câu hỏi "viết ra giấy được hết các bước và nhánh?": diễn đạt lại ý Anthropic "well-defined tasks" / "predefined code paths"; bài KodeKloud hỏi tương tự: "Can I define all possible paths in advance?".
- Ổn định: Anthropic "workflows offer predictability and consistency for well-defined tasks".
- Rẻ, nhanh: suy ra từ Anthropic — agent "trade latency and cost for better task performance".
- Dễ debug: bài thứ cấp (Beyond the Demo): "When a workflow breaks, you can pinpoint the step".
Link: anthropic.com/engineering/building-effective-agents · notes.kodekloud.com (Workflows vs Agents: When to Use Each) · beyondthedemoai.substack.com/p/agentic-vs-deterministic`);
  box(s, 40, 92, 640, 46, 'Viết ra giấy được hết các bước và các nhánh?', { fill: C.INK, size: 16 });
  [['Ổn định', 'cùng input → cùng các bước'], ['Rẻ, nhanh', 'số lần gọi model cố định'], ['Dễ debug', 'lỗi nằm ở một bước cụ thể']]
    .forEach(([t, d], i) => box(s, 40 + i * 216, 156, 206, 78, `${t}\n${d}`, { fill: C.GREEN, size: 15, sub: 10.5 }));
}

function whySafer() {
  const s = newSlide('An toàn', 'Workflow an toàn hơn vì model không tự chọn hành động', `Vế "an toàn hơn" của đề cương. Ý chính: rủi ro của agent đến từ việc model được tự chọn hành động — workflow không cho model quyền đó.
Đọc theo hàng:
- Hành động ngoài dự kiến: workflow chỉ chạy các bước đã viết, đã review; agent tự chọn tool, tham số, thứ tự → có thể làm việc không ai viết sẵn. OWASP gọi đây là "Excessive Agency" (LLM06:2025) — "the vulnerability that enables damaging actions to be performed", gốc ở "excessive functionality / excessive permissions / excessive autonomy".
- Nội dung đọc vào điều khiển (prompt injection — S2 đã nói): ở workflow chỉ làm sai nội dung 1 bước; ở agent có thể đổi cả chuỗi hành động vì model quyết bước tiếp. OWASP LLM06: agency quá mức gây hại bất kể nguyên nhân là hallucination hay prompt injection trực tiếp/gián tiếp.
- Lỗi lan: Anthropic — agent có "the potential for compounding errors".
- Kiểm tra trước: workflow test được từng đường đi; agent không test hết → Anthropic: "extensive testing in sandboxed environments, along with the appropriate guardrails".
Nếu vẫn chọn agent: OWASP khuyên giới hạn tool ở mức tối thiểu, kiểm quyền ở hệ thống đích chứ không để LLM quyết, người duyệt hành động tác động lớn — Session 7 làm chi tiết.
Link: genai.owasp.org/llmrisk/llm062025-excessive-agency · anthropic.com/engineering/building-effective-agents`);
  table(s, 30, 88, [190, 220, 250], [
    ['Rủi ro', 'Workflow', 'Agent'],
    ['Hành động ngoài dự kiến', 'không — chỉ chạy bước đã viết', 'có thể — model tự chọn tool, tham số'],
    ['Nội dung đọc vào điều khiển', 'sai nội dung một bước', 'có thể đổi cả chuỗi hành động'],
    ['Lỗi lan', 'dừng ở bước lỗi', 'dồn qua các lượt'],
    ['Kiểm tra trước khi chạy thật', 'test được mọi đường đi', 'không test hết → sandbox, guardrail'],
  ], { rowH: 48, size: 12.5 });
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

function decisionSlides() {
  askWorkflowOrAgent();
  whenWorkflow();
  whySafer();
  whenAgent();
  startSimple();
}

module.exports = { decisionSlides };
