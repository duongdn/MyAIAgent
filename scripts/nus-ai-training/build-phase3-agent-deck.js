// Build deck NUS AI Training Giai đoạn 3 "Build AI Agent" (Session 5–9).
// Nội dung: phase3-deck/session-0X-*.js · helpers: phase3-deck/slide-kit.js · số liệu/log lấy từ support_agent_demo chạy thật.
// XOÁ toàn bộ slide của deck đích rồi dựng lại — chỉ chạy được khi deck trống hoặc slide đầu là "Giai đoạn 3".
// Run: node scripts/nus-ai-training/build-phase3-agent-deck.js   (PHASE3_ONLY=5 → chỉ session 5)
const path = require('path');
const { google } = require('googleapis');
const kit = require('./phase3-deck/slide-kit');

// Mỗi session = 1 ngày training = 1 deck riêng
const SESSIONS = {
  5: ['./phase3-deck/session-05-agent-vs-workflow', '10ZYIXeEzlElYai6ws9xd77ZN8QbNfAAdPMJekhkHMWI'],
  6: ['./phase3-deck/session-06-agent-loop-tool-contracts', '1pIVAHFwBg3Bgb28oBeJVJ19rEOyx8KFDlFn0PlcHPyQ'],
  7: ['./phase3-deck/session-07-safe-tool-execution', '1x5lvgyO4nNgGYq_hton3_5OPBRNFQD2Tk1Om9bzPpS0'],
  8: ['./phase3-deck/session-08-state-memory-stop-conditions', '1LeHoPz4orAL7Bb656Z85xjyPV9iTloznTE5kqayNYhs'],
  9: ['./phase3-deck/session-09-harness-tracing-full-agent', '1ziJEouNTRQJRRYWODN9ZAjywMgNVRHshCOFNje45BM4'],
};
const auth = new google.auth.GoogleAuth({
  keyFile: path.join(__dirname, '../../config/daily-agent-490610-7eb7985b33e3.json'),
  scopes: ['https://www.googleapis.com/auth/presentations'],
});

async function push(api, PID) {
  const pres = (await api.presentations.get({ presentationId: PID })).data;
  // Chống ghi đè nhầm deck khác (đã từng xoá mất deck Giai đoạn 5): chỉ deck trống hoặc deck Giai đoạn 3
  if (pres.slides.length > 1 && !JSON.stringify(pres.slides[0].pageElements || []).toLowerCase().includes('giai đoạn 3')) {
    throw new Error(`Deck ${PID} ("${pres.title}") không phải deck Giai đoạn 3 — dừng, không xoá.`);
  }
  const all = [...kit.reqs, ...pres.slides.map((x) => ({ deleteObject: { objectId: x.objectId } }))];
  for (let i = 0; i < all.length; i += 400) {
    await api.presentations.batchUpdate({ presentationId: PID, requestBody: { requests: all.slice(i, i + 400) } });
  }
  const p2 = (await api.presentations.get({ presentationId: PID })).data;
  const notes = p2.slides.map((sl, i) => ({ insertText: {
    objectId: sl.slideProperties.notesPage.notesProperties.speakerNotesObjectId, text: kit.slides[i].notes || ' ' } }));
  await api.presentations.batchUpdate({ presentationId: PID, requestBody: { requests: notes } });
  return p2.slides.length;
}

// PHASE3_ONLY=5 → chỉ dựng session 5
if (require.main === module) (async () => {
  const api = google.slides({ version: 'v1', auth: await auth.getClient() });
  for (const [num, [mod, pid]] of Object.entries(SESSIONS)) {
    if (process.env.PHASE3_ONLY && process.env.PHASE3_ONLY !== num) continue;
    kit.reset();
    require(mod)(); kit.closing(); // mỗi ngày kết bằng Q&A
    console.log(`S${num}: ${await push(api, pid)} slides → https://docs.google.com/presentation/d/${pid}`);
  }
})().catch((e) => { console.error(e.message); process.exit(1); });
