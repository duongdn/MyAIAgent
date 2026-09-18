const { google } = require('googleapis');
const path = require('path');

const BLUE = { red: 0.84705883, green: 0.8980392, blue: 0.9764706 };

const HPG = {
  spreadsheetId: '1tlZRDWspk3I9TlrJAnPCev5RrLGNmy0JBJMkbvHl97k',
  sheetTitle: 'Định giá - HPG',
  startRowIndex: 42,
  mcap: 181101.59, // tỷ đồng, vietstock MarketCapital 17/9/2026
  data: { '1d': [2747400, 58756905000], '7d': [13716440, 289805185000], '1m': [18239167, 394974265714], '6m': [24568952, 606446429960] },
};

function buildRows(ticker, cfg) {
  const fmtInt = (n) => n.toLocaleString('en-US');
  const fmtTy = (n) => (n / 1e9).toLocaleString('en-US', { maximumFractionDigits: 2 });
  const turnover = (n) => ((n / 1e9 / cfg.mcap) * 100).toFixed(4) + '%';
  const rows = [];
  const fmt = [];
  rows.push(['', '', '', '', '', '']); fmt.push('blank');
  rows.push(['VI. THANH KHOẢN (LIQUIDITY) — thêm 18/9/2026', '', '', '', '', '']); fmt.push('section');
  rows.push(['Chỉ tiêu', '1 ngày', '7 ngày', '1 tháng', '6 tháng', 'Ghi chú']); fmt.push('header');
  rows.push([
    'KLGD trung bình (cổ phiếu/phiên)',
    fmtInt(cfg.data['1d'][0]), fmtInt(cfg.data['7d'][0]), fmtInt(cfg.data['1m'][0]), fmtInt(cfg.data['6m'][0]),
    '7 ngày≈5 phiên, 1 tháng≈21 phiên, 6 tháng≈126 phiên giao dịch (quy đổi từ ngày lịch)',
  ]); fmt.push('data');
  rows.push([
    'GTGD trung bình (tỷ đồng/phiên)',
    fmtTy(cfg.data['1d'][1]), fmtTy(cfg.data['7d'][1]), fmtTy(cfg.data['1m'][1]), fmtTy(cfg.data['6m'][1]),
    '',
  ]); fmt.push('data');
  rows.push([
    'Vòng quay/vốn hóa (GTGD ÷ vốn hóa live, %/phiên)',
    turnover(cfg.data['1d'][1]), turnover(cfg.data['7d'][1]), turnover(cfg.data['1m'][1]), turnover(cfg.data['6m'][1]),
    `Vốn hóa live dùng làm mẫu số: ~${cfg.mcap.toLocaleString('en-US')} tỷ (xem mục I ở trên)`,
  ]); fmt.push('data');
  rows.push(['Nguồn: finance.vietstock.vn/data/getpricehistory (200 phiên gần nhất, JSON), truy cập 18/9/2026 qua script scripts/finance-report-detail-fetch-liquidity.js. Phiên gần nhất trong dữ liệu: 17/9/2026.', '', '', '', '', '']); fmt.push('note');
  return { rows, fmt };
}

async function writeSheet(auth, cfg, ticker) {
  const sheets = google.sheets({ version: 'v4', auth });
  const meta = await sheets.spreadsheets.get({ spreadsheetId: cfg.spreadsheetId });
  const sheetProps = meta.data.sheets.find((s) => s.properties.title === cfg.sheetTitle).properties;
  const sheetId = sheetProps.sheetId;

  const { rows, fmt } = buildRows(ticker, cfg);
  const startRow1Based = cfg.startRowIndex + 1;
  await sheets.spreadsheets.values.update({
    spreadsheetId: cfg.spreadsheetId,
    range: `'${cfg.sheetTitle}'!A${startRow1Based}`,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: rows },
  });

  const formatRequests = [];
  fmt.forEach((type, i) => {
    const rowIndex = cfg.startRowIndex + i;
    let format;
    if (type === 'section') {
      format = { backgroundColor: BLUE, verticalAlignment: 'TOP', wrapStrategy: 'WRAP', textFormat: { bold: true } };
    } else if (type === 'header') {
      format = { verticalAlignment: 'TOP', wrapStrategy: 'WRAP', textFormat: { bold: true } };
    } else {
      format = { verticalAlignment: 'TOP', wrapStrategy: 'WRAP' };
    }
    formatRequests.push({
      repeatCell: {
        range: { sheetId, startRowIndex: rowIndex, endRowIndex: rowIndex + 1, startColumnIndex: 0, endColumnIndex: 6 },
        cell: { userEnteredFormat: format },
        fields: 'userEnteredFormat(backgroundColor,verticalAlignment,wrapStrategy,textFormat)',
      },
    });
  });
  await sheets.spreadsheets.batchUpdate({ spreadsheetId: cfg.spreadsheetId, requestBody: { requests: formatRequests } });
  console.log(`${ticker}: wrote ${rows.length} rows starting at row ${startRow1Based}, ${formatRequests.length} format ops`);
}

async function main() {
  const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, '../config/daily-agent-490610-7eb7985b33e3.json'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  await writeSheet(auth, HPG, 'HPG');
}

main().catch((e) => { console.error(e); process.exit(1); });
