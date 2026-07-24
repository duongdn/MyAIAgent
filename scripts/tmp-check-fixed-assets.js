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
    50: 'II. Tài sản cố định (tổng)',
    51: '1. Tài sản cố định hữu hình',
    52: '- Nguyên giá',
    53: '- Giá trị hao mòn lũy kế (*)',
    54: '2. Tài sản cố định thuê tài chính',
    57: '3. Tài sản cố định vô hình',
    58: '- Nguyên giá (vô hình)',
    59: '- Hao mòn lũy kế (vô hình)',
    41: 'B. TÀI SẢN DÀI HẠN (tổng)',
    72: 'V. Tài sản dở dang dài hạn',
    74: '2. Chi phí xây dựng cơ bản dở dang',
  };
  for (const [r, label] of Object.entries(rowsToCheck)) {
    const res = await sheets.spreadsheets.values.get({ spreadsheetId, range: `'FPT'!L${r}:U${r}`, valueRenderOption: 'FORMATTED_VALUE' });
    console.log(r, label, ':', JSON.stringify(res.data.values[0]));
  }
}
main().catch(console.error);
