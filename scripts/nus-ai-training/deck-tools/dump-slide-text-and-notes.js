// In text + speaker notes của từng slide (đối chiếu notes ↔ slide): node dump-slide-text-and-notes.js [presentationId]
const path = require('path');
const { google } = require('googleapis');
const auth = new google.auth.GoogleAuth({ keyFile: path.join(__dirname, '../../../config/daily-agent-490610-7eb7985b33e3.json'), scopes: ['https://www.googleapis.com/auth/presentations'] });
const txt = els => (els || []).map(e => (e.shape?.text?.textElements || []).map(t => t.textRun?.content || '').join('')).join(' | ').replace(/\s+/g, ' ');
(async () => {
  const { data } = await google.slides({ version: 'v1', auth }).presentations.get({ presentationId: process.argv[2] || '10ZYIXeEzlElYai6ws9xd77ZN8QbNfAAdPMJekhkHMWI' });
  data.slides.forEach((s, i) => console.log(`=== ${i + 1}\nSLIDE: ${txt(s.pageElements)}\nNOTES: ${txt(s.slideProperties.notesPage.pageElements)}`));
})().catch(e => { console.error(e.message); process.exit(1); });
