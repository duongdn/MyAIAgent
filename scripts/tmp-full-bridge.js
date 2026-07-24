const { google } = require('googleapis');
const path = require('path');
async function main() {
  const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, '../config/daily-agent-490610-7eb7985b33e3.json'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = '1E47mfclzKFvpX1JZeiwu4zQFlhq8-CoLBr-bZuibqMw';

  const rowsToCheck = {
    8: 'A. TÀI SẢN NGẮN HẠN',
    9: '  I. Tiền và tương đương tiền',
    12: '  II. Đầu tư tài chính ngắn hạn',
    19: '  III. Phải thu ngắn hạn',
    28: '  IV. Hàng tồn kho',
    35: '  VI. Tài sản ngắn hạn khác',
    41: 'B. TÀI SẢN DÀI HẠN',
    42: '  I. Phải thu dài hạn',
    50: '  II. Tài sản cố định',
    72: '  V. Tài sản dở dang dài hạn',
    75: '  VI. Đầu tư tài chính dài hạn',
    77: '    - Đầu tư vào công ty liên doanh, liên kết',
    78: '    - Đầu tư góp vốn vào đơn vị khác',
    79: '    - Dự phòng tổn thất đầu tư dài hạn',
    83: '  VII. Tài sản dài hạn khác',
    88: '    - Lợi thế thương mại',
    90: 'TỔNG CỘNG TÀI SẢN',
  };
  const label = 'Row | Chỉ tiêu | Q4/2025(T) | Q1/2026(U) | Chênh';
  console.log(label);
  let sumDecrease = 0, sumIncrease = 0;
  for (const [r, name] of Object.entries(rowsToCheck)) {
    const res = await sheets.spreadsheets.values.get({ spreadsheetId, range: `'FPT'!T${r}:U${r}`, valueRenderOption: 'UNFORMATTED_VALUE' });
    const vals = res.data.values ? res.data.values[0] : [];
    const t = vals[0] || 0, u = vals[1] || 0;
    const diff = (typeof u === 'number' && typeof t === 'number') ? u - t : null;
    console.log(r, '|', name, '|', t, '|', u, '|', diff !== null ? diff.toFixed(0) : 'n/a');
  }
}
main().catch(console.error);
