const { google } = require('googleapis');
const path = require('path');

async function main() {
  const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, '..', 'config', 'daily-agent-490610-7eb7985b33e3.json'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = '1E47mfclzKFvpX1JZeiwu4zQFlhq8-CoLBr-bZuibqMw';

  for (const tab of ['Định tính', 'FPT', 'Báo cáo 2']) {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `'${tab}'!A1:F300`,
      valueRenderOption: 'FORMATTED_VALUE',
    });
    (res.data.values||[]).forEach((row,i)=>{
      const text = row.join(' | ');
      if (/PWC|PwC|Deloitte|kiểm toán/i.test(text)) {
        console.log(`[${tab}] Row ${i+1}: ${text.slice(0,200)}`);
      }
    });
  }
}
main().catch(e => { console.error(e); process.exit(1); });
