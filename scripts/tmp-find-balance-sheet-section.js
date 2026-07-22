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
    range: "'Báo cáo 2'!A59:F75",
    valueRenderOption: 'FORMATTED_VALUE',
  });
  (res.data.values||[]).forEach((row,i)=>console.log(`Row ${i+59}:`, row.join(' | ').slice(0,150)));
}
main().catch(e => { console.error(e); process.exit(1); });
