const { google } = require('googleapis');
const path = require('path');

async function main() {
  const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, '../config/daily-agent-490610-7eb7985b33e3.json'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });
  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = '1E47mfclzKFvpX1JZeiwu4zQFlhq8-CoLBr-bZuibqMw';

  console.log('=== Định giá - FPT rows 40-70 ===');
  let res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `'Định giá - FPT'!A40:M70`,
    valueRenderOption: 'FORMATTED_VALUE',
  });
  (res.data.values || []).forEach((row, i) => {
    if (row.some(c => c && c.toString().trim() !== '')) console.log(`Row ${i + 40}:`, JSON.stringify(row));
  });

  console.log('\n=== Benjamin Graham - FPT (full, for format reference) ===');
  res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `'Benjamin Graham - FPT'!A1:N60`,
    valueRenderOption: 'FORMATTED_VALUE',
  });
  (res.data.values || []).forEach((row, i) => {
    if (row.some(c => c && c.toString().trim() !== '')) console.log(`Row ${i + 1}:`, JSON.stringify(row));
  });
}

main().catch(e => console.error(e));
