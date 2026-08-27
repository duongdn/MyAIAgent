#!/usr/bin/env node
const { google } = require('googleapis');
const ssid = '1UtAH3Bq5LYzJmqMQiFxOtODrMLjswiayc80-slGhvRg';
const target = 'Định giá - MBB';
const KEY_PATH = '/home/nus/projects/My-AI-Agent/config/daily-agent-490610-7eb7985b33e3.json';

const rows = [];
rows.push(['ĐỊNH GIÁ - MBB (Ngân hàng TMCP Quân đội)']);
rows.push([]);
rows.push(['I. Định giá theo bội số thị trường (tại 25/08/2026)']);
rows.push(['Chỉ tiêu', 'Giá trị', 'Nguồn/Ghi chú']);
rows.push(['Thị giá (VND)', 20750, 'simplize.vn/co-phieu/MBB, truy cập 25/08/2026']);
rows.push(['EPS (đồng/CP, 4 quý gần nhất)', 2987, 'simplize.vn']);
rows.push(['BVPS — Giá trị sổ sách/CP (đồng)', 14831, 'simplize.vn']);
rows.push(['Vốn hóa (tỷ VND)', 208926, 'simplize.vn (giá trị trực tiếp trang, tỷ VND)']);
rows.push(['P/E', '=B5/B6', 'thị giá/EPS']);
rows.push(['P/B', '=B5/B7', 'thị giá/BVPS — chỉ số ĐỊNH GIÁ CHỦ ĐẠO cho cổ phiếu ngân hàng']);
rows.push([]);
rows.push(['II. So sánh ngành (P/E, P/B nhóm Big4 + tư nhân lớn, nguồn simplize.vn, truy cập 25/08/2026)']);
rows.push(['Mã', 'Ngân hàng', 'P/E', 'P/B']);
rows.push(['MBB', 'MB Bank', '=B9', '=B10']);
rows.push(['VCB', 'Vietcombank', 11.88, 1.99]);
rows.push(['BID', 'BIDV', 8.9, 1.49]);
rows.push(['CTG', 'VietinBank', 6.15, 1.24]);
rows.push(['ACB', 'Á Châu', 8.33, 1.32]);
rows.push(['Trung bình 4 peer (VCB/BID/CTG/ACB)', '', '=AVERAGE(C13:C16)', '=AVERAGE(D13:D16)']);
rows.push(['Nhận định', 'MBB (P/E ~6,95x, P/B ~1,40x) định giá THẤP HƠN trung bình 4 peer lớn (P/E trung bình ~8,8x, P/B trung bình ~1,51x) — đặc biệt P/E thấp gần nhất nhóm sau CTG. ROE cao (xem sheet Định lượng) đi kèm P/B ở mức trung bình ngành — tương quan lợi nhuận/định giá tương đối hấp dẫn so peer.']);
rows.push([]);
rows.push(['III. DCF']);
rows.push(['Không thực hiện DCF cho cổ phiếu ngân hàng — dòng tiền tự do (FCFF/FCFE) không có ý nghĩa chuẩn với mô hình kinh doanh nhận tiền gửi/cho vay (khác cấu trúc vốn lưu động doanh nghiệp phi tài chính). Thực hành chuẩn ngành dùng P/B, P/E, Dividend Discount Model hoặc Residual Income thay DCF — không đưa số DCF giả định để tránh bịa số liệu không có cơ sở phương pháp luận.']);
rows.push([]);
rows.push(['IV. THANH KHOẢN (nguồn vietstock.vn getpricehistory, truy cập 25/08/2026, dữ liệu tính đến 24/08/2026)']);
rows.push(['', '1 ngày', '7 ngày (~5 phiên)', '1 tháng (~21 phiên)', '6 tháng (~126 phiên)']);
rows.push(['KLGD bình quân (cổ phiếu)', 9393300, 10422440, 12795700, 15731032]);
rows.push(['GTGD bình quân (VND)', 195450070000, 213958417000, 282943855952, 396260104563]);
rows.push(['Ghi chú', 'Cả 4 mốc đều cho số liệu thực tế hợp lý (không có mốc nào = 0 bất thường như một số mã đã build trước) — MBB là cổ phiếu vốn hóa lớn (~209 nghìn tỷ), thanh khoản CAO và ổn định qua các mốc thời gian, GTGD bình quân 1 tháng ~283 tỷ đồng/phiên, 6 tháng ~396 tỷ đồng/phiên. Không có rủi ro execution risk đáng kể do free-float thấp/cổ đông chi phối như một số mã Nhà nước sở hữu chi phối khác (VD VEA).']);

async function main() {
  const auth = new google.auth.GoogleAuth({ keyFile: KEY_PATH, scopes: ['https://www.googleapis.com/auth/spreadsheets'] });
  const sheets = google.sheets({ version: 'v4', auth });
  const meta = await sheets.spreadsheets.get({ spreadsheetId: ssid });
  let s = meta.data.sheets.find(x => x.properties.title === target);
  if (!s) {
    await sheets.spreadsheets.batchUpdate({ spreadsheetId: ssid, requestBody: { requests: [{ addSheet: { properties: { title: target, index: 3 } } }] } });
    const meta2 = await sheets.spreadsheets.get({ spreadsheetId: ssid });
    s = meta2.data.sheets.find(x => x.properties.title === target);
  }
  const sheetId = s.properties.sheetId;
  await sheets.spreadsheets.values.clear({ spreadsheetId: ssid, range: `'${target}'!A1:Z100` });
  await sheets.spreadsheets.values.update({ spreadsheetId: ssid, range: `'${target}'!A1`, valueInputOption: 'USER_ENTERED', requestBody: { values: rows } });
  await sheets.spreadsheets.batchUpdate({ spreadsheetId: ssid, requestBody: { requests: [
    { updateDimensionProperties: { range: { sheetId, dimension: 'COLUMNS', startIndex: 0, endIndex: 1 }, properties: { pixelSize: 320 }, fields: 'pixelSize' } },
    { updateDimensionProperties: { range: { sheetId, dimension: 'COLUMNS', startIndex: 1, endIndex: 5 }, properties: { pixelSize: 220 }, fields: 'pixelSize' } },
    { repeatCell: { range: { sheetId }, cell: { userEnteredFormat: { wrapStrategy: 'WRAP', verticalAlignment: 'TOP' } }, fields: 'userEnteredFormat.wrapStrategy,userEnteredFormat.verticalAlignment' } },
    { repeatCell: { range: { sheetId, startRowIndex: 0, endRowIndex: 1 }, cell: { userEnteredFormat: { textFormat: { bold: true, fontSize: 12 } } }, fields: 'userEnteredFormat.textFormat' } },
    { repeatCell: { range: { sheetId, startRowIndex: 7, endRowIndex: 9, startColumnIndex: 1, endColumnIndex: 2 }, cell: { userEnteredFormat: { numberFormat: { type: 'NUMBER', pattern: '0.00' } } }, fields: 'userEnteredFormat.numberFormat' } },
    { repeatCell: { range: { sheetId, startRowIndex: 11, endRowIndex: 17, startColumnIndex: 2, endColumnIndex: 4 }, cell: { userEnteredFormat: { numberFormat: { type: 'NUMBER', pattern: '0.00' } } }, fields: 'userEnteredFormat.numberFormat' } },
  ] } });
  console.log(JSON.stringify({ success: true, target, sheetId }));
}
main().catch(e => { console.error(e.message || e); process.exit(1); });
