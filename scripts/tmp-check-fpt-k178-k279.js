const { google } = require('googleapis');
const path = require('path');

async function main() {
  const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, '..', 'config', 'daily-agent-490610-7eb7985b33e3.json'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = '1E47mfclzKFvpX1JZeiwu4zQFlhq8-CoLBr-bZuibqMw';

  // Check row 178 context (label in col A, value in K)
  const r178 = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "'FPT'!A175:K180",
    valueRenderOption: 'FORMATTED_VALUE',
  });
  (r178.data.values||[]).forEach((row,i)=>console.log(`Row ${i+175}:`, row.join(' | ').slice(0,150)));

  console.log('---');
  // Check row 279 context
  const r279 = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "'FPT'!A275:K282",
    valueRenderOption: 'FORMATTED_VALUE',
  });
  (r279.data.values||[]).forEach((row,i)=>console.log(`Row ${i+275}:`, row.join(' | ').slice(0,150)));

  // Check formula at K279
  const f279 = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "'FPT'!K279",
    valueRenderOption: 'FORMULA',
  });
  console.log('K279 formula:', JSON.stringify(f279.data.values));
}
main().catch(e => { console.error(e); process.exit(1); });
