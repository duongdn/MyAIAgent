const { google } = require('googleapis');
const path = require('path');

async function main() {
  const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, '..', 'config', 'daily-agent-490610-7eb7985b33e3.json'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = '1E47mfclzKFvpX1JZeiwu4zQFlhq8-CoLBr-bZuibqMw';

  // Check the label and formula for K32 in Định giá - FPT
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "'Định giá - FPT'!A25:K35",
    valueRenderOption: 'FORMATTED_VALUE',
  });
  (res.data.values||[]).forEach((row,i)=>console.log(`Row ${i+25}:`, row.join(' | ').slice(0,150)));

  const formula = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "'Định giá - FPT'!K32",
    valueRenderOption: 'FORMULA',
  });
  console.log('K32 formula:', JSON.stringify(formula.data.values));

  // Also check row76 in Báo cáo 2 formula for LNST cổ đông mẹ
  const bc2 = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "'Báo cáo 2'!D76:D77",
    valueRenderOption: 'FORMULA',
  });
  console.log('Báo cáo 2 D76:D77 formulas:', JSON.stringify(bc2.data.values));
}
main().catch(e => { console.error(e); process.exit(1); });
