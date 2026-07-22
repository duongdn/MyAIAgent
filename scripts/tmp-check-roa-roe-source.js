const { google } = require('googleapis');
const path = require('path');

async function main() {
  const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, '..', 'config', 'daily-agent-490610-7eb7985b33e3.json'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = '1E47mfclzKFvpX1JZeiwu4zQFlhq8-CoLBr-bZuibqMw';

  // Check formulas behind row99-102 in Báo cáo 2 (ROA/ROE/margins)
  const formulaCheck = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "'Báo cáo 2'!B99:B102",
    valueRenderOption: 'FORMULA',
  });
  console.log('Báo cáo 2 formulas B99:B102:', JSON.stringify(formulaCheck.data.values));

  // Search Định giá - FPT for ROA/ROE definitions
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "'Định giá - FPT'!A1:P60",
    valueRenderOption: 'FORMATTED_VALUE',
  });
  (res.data.values||[]).forEach((row,i)=>{
    const text = row.join(' | ');
    if (/ROA|ROE|biên lợi nhuận gộp|gross margin/i.test(text)) {
      console.log(`[Định giá - FPT] Row ${i+1}: ${text.slice(0,150)}`);
    }
  });
}
main().catch(e => { console.error(e); process.exit(1); });
