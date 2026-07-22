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
    range: "'Định tính'!A1:F40",
    valueRenderOption: 'FORMATTED_VALUE',
  });
  (res.data.values||[]).forEach((row,i)=>{
    const text = row.join(' | ');
    if (/tài sản|tiền gửi|đầu tư TC|goodwill|thương hiệu|nợ xấu|phải thu/i.test(text)) {
      console.log(`Row ${i+1}: ${text.slice(0,400)}`);
    }
  });
}
main().catch(e => { console.error(e); process.exit(1); });
