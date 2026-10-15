// Build deck NUS AI Training Giai đoạn 3 "Build AI Agent" (Session 5–9).
// Nội dung: phase3-deck/session-0X-*.js · helpers: phase3-deck/slide-kit.js · số liệu/log lấy từ support_agent_demo chạy thật.
// XOÁ toàn bộ slide của deck đích rồi dựng lại — chỉ chạy được khi deck trống hoặc slide đầu là "Giai đoạn 3".
// Run: node scripts/nus-ai-training/build-phase3-agent-deck.js   (PHASE3_ONLY=5 → chỉ dựng session 5 để xem nhanh)
const path = require('path');
const { google } = require('googleapis');
const kit = require('./phase3-deck/slide-kit');

const PID = process.env.PHASE3_PID || '10ZYIXeEzlElYai6ws9xd77ZN8QbNfAAdPMJekhkHMWI';
const SESSIONS = {
  5: './phase3-deck/session-05-agent-vs-workflow',
  6: './phase3-deck/session-06-agent-loop-tool-contracts',
  7: './phase3-deck/session-07-safe-tool-execution',
  8: './phase3-deck/session-08-state-memory-stop-conditions',
  9: './phase3-deck/session-09-harness-tracing-full-agent',
};
const auth = new google.auth.GoogleAuth({
  keyFile: path.join(__dirname, '../../config/daily-agent-490610-7eb7985b33e3.json'),
  scopes: ['https://www.googleapis.com/auth/presentations'],
});

if (require.main === module) (async () => {
  const only = process.env.PHASE3_ONLY;
  for (const [num, mod] of Object.entries(SESSIONS)) if (!only || only === num) require(mod)();
  const api = google.slides({ version: 'v1', auth: await auth.getClient() });
  const pres = (await api.presentations.get({ presentationId: PID })).data;
  // Chống ghi đè nhầm deck khác (đã từng xoá mất deck Giai đoạn 5)
  if (pres.slides.length > 1 && !JSON.stringify(pres.slides[0].pageElements || []).includes('Giai đoạn 3')) {
    throw new Error(`Deck ${PID} ("${pres.title}") không phải deck Giai đoạn 3 — dừng, không xoá.`);
  }
  const old = pres.slides.map((x) => ({ deleteObject: { objectId: x.objectId } }));
  const all = [...kit.reqs, ...old];
  for (let i = 0; i < all.length; i += 400) { // batch lớn: tạo mới trước, xoá cũ sau cùng
    await api.presentations.batchUpdate({ presentationId: PID, requestBody: { requests: all.slice(i, i + 400) } });
  }
  const p2 = (await api.presentations.get({ presentationId: PID })).data;
  const notes = p2.slides.map((sl, i) => ({ insertText: {
    objectId: sl.slideProperties.notesPage.notesProperties.speakerNotesObjectId, text: kit.slides[i].notes || ' ' } }));
  await api.presentations.batchUpdate({ presentationId: PID, requestBody: { requests: notes } });
  console.log(`done: ${p2.slides.length} slides → https://docs.google.com/presentation/d/${PID}`);
})().catch((e) => { console.error(e.message); process.exit(1); });
