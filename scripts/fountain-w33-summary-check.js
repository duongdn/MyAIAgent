const { google } = require('googleapis');
const SVC = require('path').join(__dirname, '..', 'config', 'daily-agent-490610-7eb7985b33e3.json');
const FOUNTAIN_ID = '1iIKfjAh857qzrR2xkUWPcN_9bFAwB1pL8aJWTRk4f4o';

(async () => {
  const auth = new google.auth.GoogleAuth({ keyFile: SVC, scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'] });
  const sheets = google.sheets({ version: 'v4', auth });
  const res = await sheets.spreadsheets.values.get({ spreadsheetId: FOUNTAIN_ID, range: 'Summary!A:D' });
  const rows = res.data.values || [];
  rows.forEach((r, i) => {
    if (r[0] && /^W\d+/.test(String(r[0]).trim())) console.log(i, JSON.stringify(r.slice(0, 4)));
  });
})().catch(e => { console.error(e); process.exit(1); });
