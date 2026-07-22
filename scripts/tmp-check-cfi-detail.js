const { google } = require('googleapis');
const path = require('path');

async function main() {
  const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, '..', 'config', 'daily-agent-490610-7eb7985b33e3.json'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = '1E47mfclzKFvpX1JZeiwu4zQFlhq8-CoLBr-bZuibqMw';

  const res = await sheets.spreadsheets.values.get({ spreadsheetId, range: "'FPT'!A2:K2", valueRenderOption: 'FORMATTED_VALUE' });
  console.log('Year cols check (should be 2016-2025):', res.data.values);

  const res2 = await sheets.spreadsheets.values.get({ spreadsheetId, range: "'FPT'!A210:K225", valueRenderOption: 'FORMATTED_VALUE' });
  (res2.data.values||[]).forEach((row,i)=>{
    if (row.some(c=>c&&c.trim())) console.log(`Row ${i+210}:`, row.join(' | ').slice(0,220));
  });
}
main().catch(e => { console.error(e); process.exit(1); });
