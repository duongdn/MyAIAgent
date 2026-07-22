const { google } = require('googleapis');
const path = require('path');

async function main() {
  const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, '..', 'config', 'daily-agent-490610-7eb7985b33e3.json'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = '1E47mfclzKFvpX1JZeiwu4zQFlhq8-CoLBr-bZuibqMw';

  // Verify rows before overwrite
  const check = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "'Báo cáo 2'!A164;'Báo cáo 2'!A166;'Báo cáo 2'!A172",
    valueRenderOption: 'FORMATTED_VALUE',
  }).catch(()=>null);

  const r164 = await sheets.spreadsheets.values.get({ spreadsheetId, range: "'Báo cáo 2'!A164", valueRenderOption: 'FORMATTED_VALUE' });
  console.log('Row164 current:', r164.data.values[0][0].slice(0,50));
  const r166 = await sheets.spreadsheets.values.get({ spreadsheetId, range: "'Báo cáo 2'!A166", valueRenderOption: 'FORMATTED_VALUE' });
  console.log('Row166 current:', r166.data.values[0][0].slice(0,50));
  const r172 = await sheets.spreadsheets.values.get({ spreadsheetId, range: "'Báo cáo 2'!A172", valueRenderOption: 'FORMATTED_VALUE' });
  console.log('Row172 current:', r172.data.values[0][0].slice(0,50));
  const r77 = await sheets.spreadsheets.values.get({ spreadsheetId, range: "'Báo cáo 2'!D77", valueRenderOption: 'FORMATTED_VALUE' });
  console.log('Row77 D current:', r77.data.values ? r77.data.values[0] : 'empty');
}
main().catch(e => { console.error(e); process.exit(1); });
