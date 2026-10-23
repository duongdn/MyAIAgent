// Temporary: read MPFC "Stuck events cron" report emails from freelancer@ mailbox
const { google } = require('googleapis');
const key = require('../config/.gmail-service-account.json');
(async () => {
  const auth = new google.auth.JWT({ email: key.client_email, key: key.private_key, scopes: ['https://www.googleapis.com/auth/gmail.readonly'], subject: 'freelancer@mypersonalfootballcoach.com' });
  const g = google.gmail({ version: 'v1', auth });
  const r = await g.users.messages.list({ userId: 'me', q: process.argv[2], maxResults: 500 });
  const ms = r.data.messages || [];
  console.log('count', ms.length);
  const n = parseInt(process.argv[3] || '3', 10);
  for (const m of [...ms.slice(0, n), ...ms.slice(-n)]) {
    const d = await g.users.messages.get({ userId: 'me', id: m.id, format: 'full' });
    const h = d.data.payload.headers; const get = k => (h.find(x => x.name === k) || {}).value;
    let body = ''; const walk = p => { if (p.body && p.body.data) body += Buffer.from(p.body.data, 'base64').toString(); (p.parts || []).forEach(walk); }; walk(d.data.payload);
    console.log('---', get('Date'), '|', get('Subject'));
    console.log(body.replace(/<[^>]+>/g, '').replace(/\n\s*\n/g, '\n').slice(0, 1000));
  }
})().catch(e => console.error(e.message));
