const { google } = require('googleapis');
const path = require('path');
async function main() {
  const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, '../config/daily-agent-490610-7eb7985b33e3.json'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = '1E47mfclzKFvpX1JZeiwu4zQFlhq8-CoLBr-bZuibqMw';

  const header = await sheets.spreadsheets.values.get({ spreadsheetId, range: `'FPT'!L1:U1`, valueRenderOption: 'FORMATTED_VALUE' });
  console.log('Quarters:', JSON.stringify(header.data.values[0]));

  const rowsToCheck = {
    90: 'TỔNG CỘNG TÀI SẢN',
    125: 'D. VỐN CHỦ SỞ HỮU',
    92: 'C. NỢ PHẢI TRẢ',
    12: 'II. Đầu tư tài chính ngắn hạn',
    75: 'VI. Đầu tư tài chính dài hạn',
    104: '11. Vay và nợ thuê tài chính ngắn hạn',
    9: 'I. Tiền và tương đương tiền',
  };
  for (const [r, label] of Object.entries(rowsToCheck)) {
    const res = await sheets.spreadsheets.values.get({ spreadsheetId, range: `'FPT'!L${r}:U${r}`, valueRenderOption: 'FORMATTED_VALUE' });
    console.log(r, label, ':', JSON.stringify(res.data.values[0]));
  }
}
main().catch(console.error);
