const { google } = require('googleapis');
const path = require('path');

const FPT_BLUE = { red: 0.8, green: 0.8784314, blue: 0.9764706 };
const VEA_DARK_BLUE = { red: 0.003921569, green: 0.34117648, blue: 0.60784316 };
const WHITE = { red: 1, green: 1, blue: 1 };

async function appendFPT(auth) {
  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = '1E47mfclzKFvpX1JZeiwu4zQFlhq8-CoLBr-bZuibqMw';
  const sheetId = 886541258;
  const startRowIndex = 220; // 0-based, i.e. row 221 (after last content row 220)

  const rows = [
    ['', '', '', '', '', ''],
    ['Thanh khoản (thêm 27/7/2026)', '', '', '', '', ''],
    ["GTGD trung bình FPT: ~280 tỷ/phiên (1 ngày), ~500 tỷ (7 ngày), ~596 tỷ (1 tháng), ~953 tỷ (6 tháng) — rất thanh khoản, dễ vào/ra vị thế lớn ở mọi khung thời gian. Vòng quay/vốn hóa 0.26-0.88%/phiên tùy giai đoạn. So với VEA (~11 tỷ/phiên, xem 'Báo cáo 2 - VEA'), FPT thanh khoản cao hơn ~25-63 lần tùy khung thời gian — không phải rào cản khi định cỡ vị thế. Chi tiết đầy đủ xem 'Định giá - FPT' mục VI. Nguồn: finance.vietstock.vn/data/getpricehistory, truy cập 27/7/2026.", '', '', '', '', ''],
  ];
  await sheets.spreadsheets.values.update({
    spreadsheetId, range: `'Báo cáo 2'!A${startRowIndex + 1}`, valueInputOption: 'USER_ENTERED', requestBody: { values: rows },
  });

  const formatRequests = [
    { repeatCell: { range: { sheetId, startRowIndex, endRowIndex: startRowIndex + 1, startColumnIndex: 0, endColumnIndex: 6 }, cell: { userEnteredFormat: { verticalAlignment: 'TOP', wrapStrategy: 'WRAP' } }, fields: 'userEnteredFormat(verticalAlignment,wrapStrategy)' } },
    { repeatCell: { range: { sheetId, startRowIndex: startRowIndex + 1, endRowIndex: startRowIndex + 2, startColumnIndex: 0, endColumnIndex: 6 }, cell: { userEnteredFormat: { backgroundColor: FPT_BLUE, verticalAlignment: 'TOP', wrapStrategy: 'WRAP', textFormat: { bold: true } } }, fields: 'userEnteredFormat(backgroundColor,verticalAlignment,wrapStrategy,textFormat)' } },
    { mergeCells: { range: { sheetId, startRowIndex: startRowIndex + 1, endRowIndex: startRowIndex + 2, startColumnIndex: 0, endColumnIndex: 6 }, mergeType: 'MERGE_ALL' } },
    { repeatCell: { range: { sheetId, startRowIndex: startRowIndex + 2, endRowIndex: startRowIndex + 3, startColumnIndex: 0, endColumnIndex: 6 }, cell: { userEnteredFormat: { verticalAlignment: 'TOP', wrapStrategy: 'WRAP' } }, fields: 'userEnteredFormat(verticalAlignment,wrapStrategy)' } },
    { mergeCells: { range: { sheetId, startRowIndex: startRowIndex + 2, endRowIndex: startRowIndex + 3, startColumnIndex: 0, endColumnIndex: 6 }, mergeType: 'MERGE_ALL' } },
  ];
  await sheets.spreadsheets.batchUpdate({ spreadsheetId, requestBody: { requests: formatRequests } });
  console.log('FPT report: appended liquidity note at row', startRowIndex + 1);
}

async function appendVEA(auth) {
  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = '17vER_Nljh9ZkoHTX5xqLs1rJZYYCZDgpP3Xs0NmQ1Bw';
  const sheetId = 1776785131;
  const startRowIndex = 74; // 0-based, i.e. row 75 (after last content row 74)

  const rows = [
    ['', '', '', '', '', ''],
    ['IX. THANH KHOẢN (LIQUIDITY) — thêm 27/7/2026', '', '', '', '', ''],
    ["GTGD trung bình VEA: ~11.4 tỷ/phiên (1 ngày), ~9.3 tỷ (7 ngày), ~6.5 tỷ (1 tháng), ~15.2 tỷ (6 tháng) — THẤP HƠN FPT ~25-63 lần tùy khung thời gian (FPT ~280-953 tỷ/phiên, xem 'Báo cáo 2'). Vòng quay/vốn hóa chỉ 0.01-0.03%/phiên. Phù hợp với cơ cấu cổ đông Nhà nước sở hữu 88.47% (free-float thực tế giao dịch chỉ ~11.5%). ⚠️ Rủi ro thực thi (execution risk): khó vào/ra vị thế LỚN mà không ảnh hưởng giá — cần cân nhắc khi định cỡ vị thế, dù định giá/an toàn tài chính hấp dẫn theo các mục trước. Chi tiết đầy đủ xem 'Định giá - VEA' mục VI. Nguồn: finance.vietstock.vn/data/getpricehistory, truy cập 27/7/2026.", '', '', '', '', ''],
  ];
  await sheets.spreadsheets.values.update({
    spreadsheetId, range: `'Báo cáo 2 - VEA'!A${startRowIndex + 1}`, valueInputOption: 'USER_ENTERED', requestBody: { values: rows },
  });

  const formatRequests = [
    { repeatCell: { range: { sheetId, startRowIndex, endRowIndex: startRowIndex + 1, startColumnIndex: 0, endColumnIndex: 6 }, cell: { userEnteredFormat: { numberFormat: { type: 'TEXT' }, backgroundColor: WHITE, verticalAlignment: 'TOP', wrapStrategy: 'WRAP' } }, fields: 'userEnteredFormat(numberFormat,backgroundColor,verticalAlignment,wrapStrategy)' } },
    { repeatCell: { range: { sheetId, startRowIndex: startRowIndex + 1, endRowIndex: startRowIndex + 2, startColumnIndex: 0, endColumnIndex: 6 }, cell: { userEnteredFormat: { numberFormat: { type: 'TEXT' }, backgroundColor: VEA_DARK_BLUE, verticalAlignment: 'TOP', wrapStrategy: 'WRAP', textFormat: { foregroundColor: WHITE, fontFamily: 'Arial', fontSize: 11, bold: true } } }, fields: 'userEnteredFormat(numberFormat,backgroundColor,verticalAlignment,wrapStrategy,textFormat)' } },
    { mergeCells: { range: { sheetId, startRowIndex: startRowIndex + 1, endRowIndex: startRowIndex + 2, startColumnIndex: 0, endColumnIndex: 6 }, mergeType: 'MERGE_ALL' } },
    { repeatCell: { range: { sheetId, startRowIndex: startRowIndex + 2, endRowIndex: startRowIndex + 3, startColumnIndex: 0, endColumnIndex: 6 }, cell: { userEnteredFormat: { numberFormat: { type: 'TEXT' }, backgroundColor: WHITE, verticalAlignment: 'TOP', wrapStrategy: 'WRAP', textFormat: { fontFamily: 'Arial', fontSize: 10, bold: false } } }, fields: 'userEnteredFormat(numberFormat,backgroundColor,verticalAlignment,wrapStrategy,textFormat)' } },
    { mergeCells: { range: { sheetId, startRowIndex: startRowIndex + 2, endRowIndex: startRowIndex + 3, startColumnIndex: 0, endColumnIndex: 6 }, mergeType: 'MERGE_ALL' } },
  ];
  await sheets.spreadsheets.batchUpdate({ spreadsheetId, requestBody: { requests: formatRequests } });
  console.log('VEA report: appended liquidity note at row', startRowIndex + 1);
}

async function main() {
  const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, '../config/daily-agent-490610-7eb7985b33e3.json'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  await appendFPT(auth);
  await appendVEA(auth);
}

main().catch((e) => { console.error(e); process.exit(1); });
