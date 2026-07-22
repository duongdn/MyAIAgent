const { google } = require('googleapis');
const path = require('path');

async function main() {
  const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, '..', 'config', 'daily-agent-490610-7eb7985b33e3.json'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = '1E47mfclzKFvpX1JZeiwu4zQFlhq8-CoLBr-bZuibqMw';

  const res = await sheets.spreadsheets.values.get({ spreadsheetId, range: "'FPT'!A1:K150", valueRenderOption: 'FORMATTED_VALUE' });
  (res.data.values||[]).forEach((row,i)=>{
    const label = (row[0]||'').trim();
    if (/^TỔNG CỘNG TÀI SẢN|^A\. TÀI SẢN NGẮN HẠN|^B\. TÀI SẢN DÀI HẠN|^TỔNG CỘNG NGUỒN VỐN|VỐN CHỦ SỞ HỮU$|^C\. NỢ PHẢI TRẢ|^Nợ phải trả/i.test(label) || /tổng cộng tài sản|tổng nguồn vốn/i.test(label)) {
      console.log(`Row ${i+1}: ${row.join(' | ').slice(0,180)}`);
    }
  });
}
main().catch(e => { console.error(e); process.exit(1); });
