// OWASP Top 10 for LLM Applications (2025) content for Phase 5 deck.
// Shared by build-phase5-session-deck.js (full rebuild) and apply-phase5-owasp-patch.js (live patch).

// covered: true = discussed in the session; false = mention only, self-study
const OWASP_ITEMS = [
  ['LLM01', 'Prompt injection', true],
  ['LLM02', 'Lộ dữ liệu nhạy cảm', true],
  ['LLM03', 'Supply chain', false],
  ['LLM04', 'Đầu độc dữ liệu', false],
  ['LLM05', 'Output chưa validate', true],
  ['LLM06', 'Agent thừa quyền', true],
  ['LLM07', 'Lộ system prompt', false],
  ['LLM08', 'RAG / vector lộ chéo', true],
  ['LLM09', 'Bịa thông tin', true],
  ['LLM10', 'Cost không giới hạn', true],
];

const OWASP_SLIDE_TITLE = 'OWASP Top 10 cho LLM — bản đồ';

const OWASP_SLIDE_NOTES = `OWASP (Open Worldwide Application Security Project) — tổ chức ra "OWASP Top 10" web mà dev nào cũng biết (SQL injection, XSS...). Từ 2023 có thêm Top 10 riêng cho ứng dụng LLM; bản hiện tại là 2025. Dùng nó làm từ vựng chung khi review security AI feature.
Ô xanh = đã nói trong buổi. Ô xám = chỉ nhắc 1 câu, tự đọc thêm (genai.owasp.org/llm-top-10):
- LLM01 Prompt injection: slide trước.
- LLM02 Lộ dữ liệu nhạy cảm: slide "Dữ liệu nhạy cảm nằm ở đâu".
- LLM03 Supply chain: model, thư viện, MCP server, plugin bên thứ ba có thể bị cài mã độc hoặc tool description độc. Chỉ dùng nguồn tin cậy, pin version, review MCP server trước khi nối vào agent.
- LLM04 Đầu độc dữ liệu: ai sửa được knowledge base thì cài được nội dung sai/độc vào câu trả lời. Kiểm soát quyền ghi vào KB, có review và nguồn gốc tài liệu.
- LLM05 Output chưa validate: output model là input không tin cậy — validate schema, escape trước khi render (markdown ảnh trỏ ra URL ngoài là kênh lấy trộm dữ liệu kinh điển).
- LLM06 Agent thừa quyền: least privilege + approval.
- LLM07 Lộ system prompt: coi như system prompt sẽ bị lộ. Không để secret, API key hay quy tắc phân quyền trong prompt.
- LLM08 RAG/vector lộ chéo: filter tenant ở câu query vector DB; cache key phải gồm tenant.
- LLM09 Bịa thông tin: bắt trả lời kèm nguồn, không có nguồn thì nói "không biết"; đo bằng test case.
- LLM10 Cost không giới hạn: max_turns cho agent loop, budget token mỗi request, rate limit theo user.`;

// Appended to existing slides' speaker notes, keyed by slide title (stable across insertions)
const NOTES_ADDITIONS = {
  'Model vs Application: ai chịu trách nhiệm?':
    '\nOWASP: LLM05 (Improper Output Handling) — validate output trước khi dùng; LLM06 (Excessive Agency) — quyền thuộc về application.',
  '2. Dữ liệu nhạy cảm nằm ở đâu?':
    '\nOWASP: LLM02 (Sensitive Information Disclosure). Thêm LLM08 (Vector & Embedding Weaknesses): với RAG multi-tenant, filter tenant/quyền phải nằm trong câu query vector DB (metadata filter bắt buộc ở data access layer) hoặc tách index/namespace theo tenant. Semantic cache cũng có thể trả câu trả lời của tenant khác → cache key phải gồm tenant + quyền.',
  'Prompt injection & approval':
    '\nOWASP: LLM01 (Prompt Injection), LLM06 (Excessive Agency). Tài liệu độc nằm sẵn trong KB cũng là LLM04 (Data Poisoning).',
  '3. Vận hành: đo cái gì?':
    '\nOWASP: LLM09 (Misinformation) — model bịa và tự tin. Biện pháp: bắt trả lời kèm nguồn, không tìm thấy nguồn thì nói "không biết"; bộ test case đo tỉ lệ trả lời đúng có nguồn. LLM10 (Unbounded Consumption) — xem slide sau.',
  'Khi AI feature lỗi hoặc kém đi':
    '\nOWASP: LLM10 (Unbounded Consumption). Ngoài timeout/retry: đặt max_turns cho agent loop (Agents SDK có tham số này), budget token mỗi request, rate limit theo user — tránh một vòng lặp hoặc một user làm cháy tiền.',
};

module.exports = { OWASP_ITEMS, OWASP_SLIDE_TITLE, OWASP_SLIDE_NOTES, NOTES_ADDITIONS };
