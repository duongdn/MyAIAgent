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
    125: 'D. VỐN CHỦ SỞ HỮU (tổng)',
    126: '  I. Vốn chủ sở hữu (của cổ đông công ty mẹ + liên quan)',
    143: '  13. Lợi ích cổ đông không kiểm soát (NCI)',
    77: 'Đầu tư vào công ty liên doanh, liên kết',
    92: 'NỢ PHẢI TRẢ',
    90: 'TỔNG CỘNG TÀI SẢN',
  };
  console.log('Row | Chỉ tiêu | Q4/2025(T) | Q1/2026(U) | Chênh');
  const vals = {};
  for (const [r, name] of Object.entries(rowsToCheck)) {
    const res = await sheets.spreadsheets.values.get({ spreadsheetId, range: `'FPT'!T${r}:U${r}`, valueRenderOption: 'UNFORMATTED_VALUE' });
    const v = res.data.values ? res.data.values[0] : [];
    const t = v[0] || 0, u = v[1] || 0;
    vals[r] = { t, u };
    console.log(r, '|', name, '|', t, '|', u, '|', (u-t).toFixed(0));
  }

  console.log('\n--- Reconciliation ---');
  const nciDrop = vals[143].t - vals[143].u;
  console.log('NCI giảm:', nciDrop.toFixed(0), 'tỷ');
  console.log('Nếu NCI này = 54.34% VCSH của FPT Telecom, suy ra VCSH FPT Telecom ~=', (nciDrop/0.5434).toFixed(0), 'tỷ');
  console.log('=> 45.66% của số đó =', (nciDrop/0.5434*0.4566).toFixed(0), 'tỷ (so với Đầu tư liên doanh tăng thực tế:', (vals[77].u-vals[77].t).toFixed(0), 'tỷ)');
}
main().catch(console.error);
