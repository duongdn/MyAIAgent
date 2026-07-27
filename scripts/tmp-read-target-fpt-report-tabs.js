const { google } = require('googleapis');
const path = require('path');

async function main() {
  const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, '../config/daily-agent-490610-7eb7985b33e3.json'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });
  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = '1E47mfclzKFvpX1JZeiwu4zQFlhq8-CoLBr-bZuibqMw';

  const meta = await sheets.spreadsheets.get({ spreadsheetId });
  console.log('=== ALL TABS ===');
  meta.data.sheets.forEach(s => console.log(s.properties.sheetId, s.properties.title));

  // Định giá - FPT full
  console.log('\n=== Định giá - FPT ===');
  let res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `'Định giá - FPT'!A1:M40`,
    valueRenderOption: 'FORMATTED_VALUE',
  });
  (res.data.values || []).forEach((row, i) => {
    if (row.some(c => c && c.toString().trim() !== '')) console.log(`Row ${i + 1}:`, JSON.stringify(row));
  });

  console.log('\n=== Định giá - FPT (FORMULAS) ===');
  res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `'Định giá - FPT'!A1:M40`,
    valueRenderOption: 'FORMULA',
  });
  (res.data.values || []).forEach((row, i) => {
    if (row.some(c => c && c.toString().trim() !== '')) console.log(`Row ${i + 1}:`, JSON.stringify(row));
  });
}

main().catch(e => console.error(e));
