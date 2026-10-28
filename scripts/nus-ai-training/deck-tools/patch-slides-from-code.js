// Cập nhật ĐÚNG các slide chỉ định từ code (không xoá/dựng lại cả deck → giữ phần user sửa tay ở slide khác).
// Run: node scripts/nus-ai-training/deck-tools/patch-slides-from-code.js <session> [--delete 5,7] <slide numbers…|3-9>
//   --delete: số slide trên deck HIỆN TẠI cần xoá (chạy trước)
//   slide numbers: số slide theo CODE; slide live ở vị trí đó bị thay bằng bản dựng từ code (kể cả notes)
const path = require('path');
const { google } = require('googleapis');
const kit = require('../phase3-deck/slide-kit');

const SESSIONS = {
  5: ['../phase3-deck/session-05-agent-vs-workflow', '10ZYIXeEzlElYai6ws9xd77ZN8QbNfAAdPMJekhkHMWI'],
  6: ['../phase3-deck/session-06-agent-loop-tool-contracts', '1pIVAHFwBg3Bgb28oBeJVJ19rEOyx8KFDlFn0PlcHPyQ'],
};

const nums = (list) => list.flatMap((x) => {
  const [a, b] = x.split('-').map(Number);
  return b ? Array.from({ length: b - a + 1 }, (_, i) => a + i) : [a];
});

// Gom request theo slide: request nào tạo phần tử trên slide sid, hoặc đụng tới phần tử đó
function requestsForSlide(sid) {
  const owned = new Set([sid]);
  return kit.reqs.filter((r) => {
    const body = Object.values(r)[0];
    const page = body.elementProperties && body.elementProperties.pageObjectId;
    if (page === sid || (r.createSlide && body.objectId === sid)) { owned.add(body.objectId); return true; }
    return owned.has(body.objectId);
  });
}

(async () => {
  const args = process.argv.slice(2);
  const [mod, pid] = SESSIONS[args.shift()] || [];
  if (!pid) throw new Error('session phải là 5 hoặc 6');
  const di = args.indexOf('--delete');
  const del = di >= 0 ? nums(args.splice(di, 2)[1].split(',')) : [];
  const targets = nums(args);

  kit.reset(); require(mod)(); kit.closing();
  const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, '../../../config/daily-agent-490610-7eb7985b33e3.json'),
    scopes: ['https://www.googleapis.com/auth/presentations'],
  });
  const api = google.slides({ version: 'v1', auth: await auth.getClient() });
  const live = async () => (await api.presentations.get({ presentationId: pid })).data.slides;
  const batch = (requests) => requests.length && api.presentations.batchUpdate({ presentationId: pid, requestBody: { requests } });

  let slides = await live();
  await batch(del.map((n) => ({ deleteObject: { objectId: slides[n - 1].objectId } })));

  for (const n of targets) {
    slides = await live();
    const { sid, notes } = kit.slides[n - 1];
    const reqs = requestsForSlide(sid).map((r) => (r.createSlide ? { createSlide: { ...r.createSlide, insertionIndex: n - 1 } } : r));
    const old = slides[n - 1];
    await batch([...(old ? [{ deleteObject: { objectId: old.objectId } }] : []), ...reqs]);
    const fresh = (await live())[n - 1];
    await batch([{ insertText: { objectId: fresh.slideProperties.notesPage.notesProperties.speakerNotesObjectId, text: notes || ' ' } }]);
  }
  console.log(`deleted ${del.join(',') || '-'} · patched ${targets.length} · deck ${(await live()).length}/${kit.slides.length} slides (code)`);
})().catch((e) => { console.error(e.message); process.exit(1); });
