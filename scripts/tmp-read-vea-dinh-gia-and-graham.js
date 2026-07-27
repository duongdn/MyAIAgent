const { google } = require('googleapis');
const path = require('path');

async function main() {
  const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, '../config/daily-agent-490610-7eb7985b33e3.json'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });
  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = '17vER_Nljh9ZkoHTX5xqLs1rJZYYCZDgpP3Xs0NmQ1Bw';

  console.log('=== Định giá - VEA (values) ===');
  let res = await sheets.spreadsheets.values.get({
    spreadsheetId, range: `'Định giá - VEA'!A1:M60`, valueRenderOption: 'FORMATTED_VALUE',
  });
  (res.data.values || []).forEach((row, i) => { if (row.some(c => c && c.toString().trim() !== '')) console.log(`Row ${i + 1}:`, JSON.stringify(row)); });

  console.log('\n=== Định giá - VEA (formulas, to trace source rows) ===');
  res = await sheets.spreadsheets.values.get({
    spreadsheetId, range: `'Định giá - VEA'!A1:M25`, valueRenderOption: 'FORMULA',
  });
  (res.data.values || []).forEach((row, i) => { if (row.some(c => c && c.toString().trim() !== '')) console.log(`Row ${i + 1}:`, JSON.stringify(row)); });

  console.log('\n=== Benjamin Graham - VEA (full) ===');
  res = await sheets.spreadsheets.values.get({
    spreadsheetId, range: `'Benjamin Graham - VEA'!A1:F60`, valueRenderOption: 'FORMATTED_VALUE',
  });
  (res.data.values || []).forEach((row, i) => { if (row.some(c => c && c.toString().trim() !== '')) console.log(`Row ${i + 1}:`, JSON.stringify(row)); });
}

main().catch(e => console.error(e));
