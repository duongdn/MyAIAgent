// Session 5 · 5 mẫu workflow của Anthropic ("Building effective agents"), mỗi mẫu 1 slide: sơ đồ + dùng khi + ví dụ
// Màu: cam = LLM làm, tối = code làm (giống sơ đồ 3 mức ở slide 6)
const { C, box, label, mono, arrow, newSlide } = require('./slide-kit');

const SYL = '[Đề cương: 02_Noi_dung_chi_tiet_chuong_trinh_dao_tao_AI.pdf, trang 4, mục Session 5 — Nội dung giảng giải, gạch đầu dòng 1: "So sánh single model call, workflow do code điều phối và agent…"]';
const SRC = 'Nguồn: Anthropic, "Building effective agents", phần Workflow (anthropic.com/engineering/building-effective-agents). Anthropic gọi đây là "common patterns that developers can shape and combine", không phải danh sách cố định.';

const llm = (s, x, y, w, t) => box(s, x, y, w, 40, t, { fill: C.ORANGE, size: 11.5 });
const codeBox = (s, x, y, w, t) => box(s, x, y, w, 40, t, { fill: C.INK, size: 11.5 });
const io = (s, x, y, t) => box(s, x, y, 56, 40, t, { fill: C.CARD, size: 11 });

// Hai ô dưới cùng: khi nào dùng · ví dụ (theo Anthropic)
function useAndExample(s, use, example) {
  box(s, 40, 262, 310, 84, `Dùng khi\n${use}`, { fill: C.LIGHT, size: 12, sub: 11, align: 'START' });
  box(s, 370, 262, 310, 84, `Ví dụ\n${example}`, { fill: C.CARD, size: 12, sub: 11, align: 'START' });
}

function chaining() {
  const s = newSlide('Mẫu workflow 1/5 · Prompt chaining', 'Chia task thành các bước nối tiếp, mỗi bước 1 lần gọi LLM', `${SYL}
Anthropic: "Prompt chaining decomposes a task into a sequence of steps, where each LLM call processes the output of the previous one."
Ô "kiểm tra" là gate: "You can add programmatic checks… to ensure that the process is still on track" — code kiểm tra giữa các bước, không đạt thì dừng.
Dùng khi: "the task can be easily and cleanly decomposed into fixed subtasks"; mục tiêu "trade off latency for higher accuracy, by making each LLM call an easier task".
Ví dụ của Anthropic: viết nội dung marketing rồi dịch sang ngôn ngữ khác; viết dàn ý tài liệu, kiểm tra dàn ý đạt tiêu chí, rồi viết tài liệu theo dàn ý.
${SRC}`);
  io(s, 40, 120, 'Input');
  llm(s, 116, 120, 110, 'LLM bước 1');
  codeBox(s, 246, 120, 110, 'Code kiểm tra');
  llm(s, 376, 120, 110, 'LLM bước 2');
  llm(s, 506, 120, 90, 'LLM bước 3');
  io(s, 616, 120, 'Output');
  [[96, 116], [226, 246], [356, 376], [486, 506], [596, 616]].forEach(([a, b]) => arrow(s, a, 140, b, 140));
  label(s, 246, 166, 110, 30, 'không đạt → dừng', { size: 9.5, bold: false, color: C.GREY });
  useAndExample(s, 'task tách sạch thành các bước cố định; chậm hơn nhưng mỗi bước dễ hơn nên chính xác hơn',
    'viết nội dung quảng cáo → dịch sang ngôn ngữ khác');
}

function routing() {
  const s = newSlide('Mẫu workflow 2/5 · Routing', 'Phân loại input rồi chuyển sang nhánh xử lý riêng', `${SYL}
Anthropic: "Routing classifies an input and directs it to a specialized followup task."
Dùng khi: "complex tasks where there are distinct categories that are better handled separately, and where classification can be handled accurately, either by an LLM or a more traditional classification model/algorithm."
Ví dụ của Anthropic: chuyển các loại câu hỏi khách hàng (câu hỏi chung, yêu cầu hoàn tiền, hỗ trợ kỹ thuật) sang các luồng xử lý khác nhau; câu dễ/phổ biến → model nhỏ rẻ, câu khó/lạ → model mạnh.
Lưu ý: LLM chỉ chọn nhánh 1 lần; các nhánh vẫn do code viết sẵn → vẫn là workflow.
${SRC}`);
  io(s, 40, 140, 'Input');
  llm(s, 120, 140, 120, 'LLM phân loại');
  arrow(s, 96, 160, 120, 160);
  ['Nhánh A', 'Nhánh B', 'Nhánh C'].forEach((t, i) => {
    const y = 88 + i * 52;
    codeBox(s, 330, y, 150, t);
    arrow(s, 240, 160, 330, y + 20);
    arrow(s, 480, y + 20, 600, 160);
  });
  io(s, 604, 140, 'Output');
  useAndExample(s, 'input chia được thành các nhóm khác hẳn nhau, và phân loại được chính xác',
    'câu hỏi chung · hoàn tiền · hỗ trợ kỹ thuật → 3 luồng riêng; câu dễ → model nhỏ, câu khó → model mạnh');
}

function parallelization() {
  const s = newSlide('Mẫu workflow 3/5 · Parallelization', 'Nhiều lần gọi LLM chạy song song, code gộp kết quả', `${SYL}
Anthropic: "LLMs can sometimes work simultaneously on a task and have their outputs aggregated programmatically."
2 biến thể:
- Sectioning (chia phần): chia task thành các phần độc lập chạy song song.
- Voting (bỏ phiếu): chạy cùng một task nhiều lần để có nhiều kết quả, rồi gộp.
Dùng khi: "the divided subtasks can be parallelized for speed, or when multiple perspectives or attempts are needed for higher confidence results".
Ví dụ của Anthropic: guardrail — 1 LLM trả lời user, 1 LLM khác song song kiểm tra nội dung không phù hợp ("tends to perform better than having the same LLM call handle both"); nhiều prompt cùng review lỗ hổng của một đoạn code (voting).
${SRC}`);
  io(s, 40, 140, 'Input');
  ['LLM 1', 'LLM 2', 'LLM 3'].forEach((t, i) => {
    const y = 88 + i * 52;
    llm(s, 170, y, 130, t);
    arrow(s, 96, 160, 170, y + 20);
    arrow(s, 300, y + 20, 380, 160);
  });
  codeBox(s, 380, 140, 130, 'Code gộp kết quả');
  arrow(s, 510, 160, 560, 160);
  io(s, 564, 140, 'Output');
  label(s, 520, 92, 160, 40, 'chia phần: mỗi LLM 1 phần\nbỏ phiếu: cùng 1 việc, nhiều lần', { size: 9.5, bold: false, color: C.GREY, align: 'START' });
  useAndExample(s, 'các phần chạy song song được để nhanh hơn, hoặc cần nhiều lần thử / nhiều góc nhìn để tin kết quả hơn',
    '1 LLM trả lời, 1 LLM khác kiểm tra nội dung (chia phần) · nhiều prompt cùng review lỗ hổng code (bỏ phiếu)');
}

function orchestratorWorkers() {
  const s = newSlide('Mẫu workflow 4/5 · Orchestrator-workers', 'Một LLM tự chia việc cho các LLM khác rồi tổng hợp', `${SYL}
Anthropic: "a central LLM dynamically breaks down tasks, delegates them to worker LLMs, and synthesizes their results."
Khác parallelization: "the key difference from parallelization is its flexibility—subtasks aren't pre-defined, but determined by the orchestrator based on the specific input." → Ở mẫu này LLM đã bắt đầu quyết định việc gì cần làm: gần agent hơn các mẫu trước.
Dùng khi: "complex tasks where you can't predict the subtasks needed (in coding, for example, the number of files that need to be changed and the nature of the change in each file likely depend on the task)".
Ví dụ của Anthropic: sản phẩm coding sửa nhiều file mỗi lần; tìm kiếm cần thu thập và phân tích thông tin từ nhiều nguồn.
${SRC}`);
  io(s, 40, 140, 'Input');
  llm(s, 116, 140, 120, 'LLM điều phối');
  arrow(s, 96, 160, 116, 160);
  ['LLM worker', 'LLM worker', '… số lượng tuỳ input'].forEach((t, i) => {
    const y = 88 + i * 52;
    box(s, 300, y, 150, 40, t, { fill: i === 2 ? C.CARD : C.ORANGE, size: 11 });
    arrow(s, 236, 160, 300, y + 20);
    arrow(s, 450, y + 20, 500, 160);
  });
  llm(s, 500, 140, 110, 'LLM tổng hợp');
  arrow(s, 610, 160, 624, 160);
  io(s, 626, 140, 'Out');
  useAndExample(s, 'không đoán trước được cần những phần việc nào — LLM điều phối tự quyết theo từng input',
    'sửa code nhiều file mỗi lần · tìm kiếm, tổng hợp thông tin từ nhiều nguồn');
}

function evaluatorOptimizer() {
  const s = newSlide('Mẫu workflow 5/5 · Evaluator-optimizer', 'Một LLM viết, một LLM chấm và góp ý — lặp tới khi đạt', `${SYL}
Anthropic: "one LLM call generates a response while another provides evaluation and feedback in a loop."
Dùng khi: "we have clear evaluation criteria, and when iterative refinement provides measurable value". 2 dấu hiệu phù hợp: câu trả lời tốt lên rõ khi có người góp ý, và LLM tự đưa ra được góp ý kiểu đó.
Ví dụ của Anthropic: dịch văn học có nhiều sắc thái mà lần dịch đầu chưa bắt được; tìm kiếm phức tạp cần nhiều vòng tìm và phân tích, LLM chấm quyết định có cần tìm tiếp không.
Có vòng lặp như agent, nhưng vòng lặp chỉ là viết ⇄ chấm, không chọn tool/hành động.
${SRC}`);
  io(s, 40, 140, 'Input');
  llm(s, 130, 140, 150, 'LLM viết');
  arrow(s, 96, 160, 130, 160);
  llm(s, 400, 140, 150, 'LLM chấm, góp ý');
  arrow(s, 280, 152, 400, 152, C.INK);
  arrow(s, 400, 170, 280, 170, C.ORANGE);
  label(s, 280, 118, 120, 14, 'bản nháp', { size: 9.5, bold: false, color: C.INK });
  label(s, 280, 176, 120, 14, 'chưa đạt → góp ý', { size: 9.5, bold: false, color: C.ORANGE });
  arrow(s, 550, 160, 604, 160);
  label(s, 548, 136, 60, 14, 'đạt', { size: 9.5, bold: false, color: C.GREY });
  io(s, 610, 140, 'Output');
  useAndExample(s, 'có tiêu chí đánh giá rõ, và sửa nhiều vòng thì kết quả tốt lên thấy được',
    'dịch văn học nhiều sắc thái · tìm kiếm phức tạp cần nhiều vòng');
}

function workflowPatternSlides() {
  chaining();
  routing();
  parallelization();
  orchestratorWorkers();
  evaluatorOptimizer();
}

module.exports = { workflowPatternSlides };
