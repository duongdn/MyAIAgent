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
    9: '  Tiền',
    12: '  Đầu tư TC ngắn hạn',
    19: '  Phải thu ngắn hạn',
    28: '  Hàng tồn kho',
    50: '  Tài sản cố định',
    75: '  Đầu tư TC dài hạn',
    77: '    - Đầu tư liên doanh, liên kết',
    90: 'TỔNG CỘNG TÀI SẢN',
    92: 'NỢ PHẢI TRẢ',
    104: '  Vay ngắn hạn',
    125: 'VỐN CHỦ SỞ HỮU',
    196: 'Cổ tức, lợi nhuận đã trả cho chủ sở hữu (LCTT)',
  };
  console.log('Row | Chỉ tiêu | Q4/2024(P) | Q1/2025(Q) | Chênh (P->Q)');
  for (const [r, name] of Object.entries(rowsToCheck)) {
    const res = await sheets.spreadsheets.values.get({ spreadsheetId, range: `'FPT'!P${r}:Q${r}`, valueRenderOption: 'UNFORMATTED_VALUE' });
    const vals = res.data.values ? res.data.values[0] : [];
    const p = vals[0] || 0, q = vals[1] || 0;
    const diff = (typeof q === 'number' && typeof p === 'number') ? q - p : null;
    console.log(r, '|', name, '|', p, '|', q, '|', diff !== null ? diff.toFixed(0) : 'n/a');
  }
}
main().catch(console.error);
