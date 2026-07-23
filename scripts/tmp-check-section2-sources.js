const { google } = require('googleapis');
const path = require('path');

async function main() {
  const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, '..', 'config', 'daily-agent-490610-7eb7985b33e3.json'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = '1E47mfclzKFvpX1JZeiwu4zQFlhq8-CoLBr-bZuibqMw';

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `'Báo cáo 2'!A24:F34`,
    valueRenderOption: 'FORMATTED_VALUE',
  });
  const rows = res.data.values || [];
  rows.forEach((row, i) => {
    const text = (row[0] || '').toString();
    const hasSource = /nguồn:/i.test(text);
    console.log(`Row ${24+i}: hasSource=${hasSource} | "${text.slice(0,90).replace(/\n/g,' ')}"`);
  });
}
main().catch(e => { console.error(e); process.exit(1); });
