// Render thumbnail PNG của Google Slides để kiểm tra bố cục: node render-slide-thumbnails.js <outdir> [from] [to] [presentationId]
const path = require('path'), fs = require('fs'), https = require('https');
const { google } = require('googleapis');
const [out, from = 1, to = 99, pid = '10ZYIXeEzlElYai6ws9xd77ZN8QbNfAAdPMJekhkHMWI'] = process.argv.slice(2);
const auth = new google.auth.GoogleAuth({ keyFile: path.join(__dirname, '../../../config/daily-agent-490610-7eb7985b33e3.json'), scopes: ['https://www.googleapis.com/auth/presentations'] });
const get = (u, f) => new Promise((ok, no) => https.get(u, r => { const w = fs.createWriteStream(f); r.pipe(w); w.on('finish', ok); }).on('error', no));
(async () => {
  const s = google.slides({ version: 'v1', auth });
  fs.mkdirSync(out, { recursive: true });
  const { data } = await s.presentations.get({ presentationId: pid });
  for (let i = +from; i <= Math.min(+to, data.slides.length); i++) {
    const t = await s.presentations.pages.getThumbnail({ presentationId: pid, pageObjectId: data.slides[i - 1].objectId, 'thumbnailProperties.thumbnailSize': 'LARGE' });
    await get(t.data.contentUrl, path.join(out, `${String(i).padStart(2, '0')}.png`));
  }
  console.log('slides', data.slides.length);
})().catch(e => { console.error(e.message); process.exit(1); });
