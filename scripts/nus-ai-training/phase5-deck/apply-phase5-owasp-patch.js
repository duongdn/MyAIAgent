// Live patch (no rebuild): insert OWASP LLM Top 10 slide after "Prompt injection & approval"
// and append OWASP references to existing slides' speaker notes. Idempotent: skips if already applied.
// Run from repo root: node scripts/nus-ai-training/phase5-deck/apply-phase5-owasp-patch.js
const builder = require('./build-phase5-session-deck');
const { OWASP_SLIDE_TITLE, NOTES_ADDITIONS } = require('./phase5-owasp-llm-top10-content');

const slideText = (sl) => sl.pageElements.flatMap((e) => e.shape?.text?.textElements || [])
  .map((x) => x.textRun?.content || '').join('');
const notesShape = (sl) => {
  const nid = sl.slideProperties.notesPage.notesProperties.speakerNotesObjectId;
  return sl.slideProperties.notesPage.pageElements.find((e) => e.objectId === nid);
};

(async () => {
  const { google, auth, PID, reqs, owaspSlide } = builder;
  const api = google.slides({ version: 'v1', auth: await auth.getClient() });
  const pres = (await api.presentations.get({ presentationId: PID })).data;
  if (pres.slides.some((sl) => slideText(sl).includes(OWASP_SLIDE_TITLE))) return console.log('already applied');

  // 1. notes additions (append at end of existing notes text)
  const noteReqs = [];
  for (const sl of pres.slides) {
    const title = Object.keys(NOTES_ADDITIONS).find((t) => slideText(sl).startsWith(t));
    if (!title) continue;
    const shape = notesShape(sl);
    const els = shape.shape.text?.textElements || [];
    const end = els.length ? els[els.length - 1].endIndex - 1 : 0; // before trailing newline
    noteReqs.push({ insertText: { objectId: shape.objectId, insertionIndex: end, text: NOTES_ADDITIONS[title] } });
  }

  // 2. OWASP slide, inserted right after the prompt-injection slide
  const pi = pres.slides.findIndex((sl) => slideText(sl).startsWith('Prompt injection & approval'));
  if (pi < 0) throw new Error('prompt injection slide not found');
  const start = reqs.length;
  owaspSlide();
  const slideReqs = reqs.slice(start);
  slideReqs[0].createSlide.insertionIndex = pi + 1;
  const notes = builder.slides[builder.slides.length - 1].notes;

  await api.presentations.batchUpdate({ presentationId: PID, requestBody: { requests: [...noteReqs, ...slideReqs] } });
  const p2 = (await api.presentations.get({ presentationId: PID })).data;
  const ns = p2.slides[pi + 1].slideProperties.notesPage.notesProperties.speakerNotesObjectId;
  await api.presentations.batchUpdate({ presentationId: PID, requestBody: { requests: [{ insertText: { objectId: ns, text: notes } }] } });
  console.log(`notes patched: ${noteReqs.length}, OWASP slide at index ${pi + 1}, total slides: ${p2.slides.length}`);
})().catch((e) => { console.error(e.message); process.exit(1); });
