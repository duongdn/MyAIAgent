// Live patch (no rebuild): replace every existing "Vận hành" slide (old or previous version) with the
// current set from phase5-operations-slides.js. Safe to re-run after editing that module. Run from repo root after run_eval.py has produced eval_results.json:
//   node scripts/nus-ai-training/apply-phase5-operations-patch.js
const builder = require('./build-phase5-session-deck');
const { operationsSlides, OPS_TITLES } = require('./phase5-operations-slides');

const slideText = (sl) => sl.pageElements.flatMap((e) => e.shape?.text?.textElements || [])
  .map((x) => x.textRun?.content || '').join('');

(async () => {
  const { google, auth, PID, reqs, slides } = builder;
  const api = google.slides({ version: 'v1', auth: await auth.getClient() });
  const pres = (await api.presentations.get({ presentationId: PID })).data;
  const old = pres.slides.map((sl, i) => ({ sl, i })).filter(({ sl }) => OPS_TITLES.some((t) => slideText(sl).startsWith(t)));
  if (!old.length) throw new Error('no ops slides found');
  const at = old[0].i;

  const start = reqs.length, firstNew = slides.length;
  operationsSlides(builder);
  const newReqs = reqs.slice(start);
  let k = 0;
  newReqs.forEach((r) => { if (r.createSlide) r.createSlide.insertionIndex = at + (k++); });
  const created = slides.slice(firstNew);

  await api.presentations.batchUpdate({ presentationId: PID, requestBody: { requests: [
    ...newReqs, ...old.map(({ sl }) => ({ deleteObject: { objectId: sl.objectId } }))] } });

  const p2 = (await api.presentations.get({ presentationId: PID })).data;
  const noteReqs = created.map((c) => {
    const sl = p2.slides.find((x) => x.objectId === c.sid);
    return { insertText: { objectId: sl.slideProperties.notesPage.notesProperties.speakerNotesObjectId, text: c.notes } };
  });
  await api.presentations.batchUpdate({ presentationId: PID, requestBody: { requests: noteReqs } });
  console.log(`replaced ${old.length} ops slides with ${created.length} at index ${at}; total slides: ${p2.slides.length}`);
})().catch((e) => { console.error(e.message); process.exit(1); });
