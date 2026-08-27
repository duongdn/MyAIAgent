#!/usr/bin/env node
const { google } = require('googleapis');
const ssid = '1oDM7Fixh2bHKBcqnHhWzLPO1OukR9FSl3u4tW6WaI5Y';
const target = 'Định giá - VCB';
const KEY_PATH = '/home/nus/projects/My-AI-Agent/config/daily-agent-490610-7eb7985b33e3.json';

const rows = [];
rows.push(['ĐỊNH GIÁ - VCB (Vietcombank)']);
rows.push([]);
rows.push(['I. Định giá theo bội số thị trường (tại 25/08/2026)']);
rows.push(['Chỉ tiêu', 'Giá trị', 'Nguồn/Ghi chú']);
rows.push(['Thị giá (VND)', 59200, 'simplize.vn/co-phieu/VCB, truy cập 25/08/2026']);
rows.push(['KLCP lưu hành', 8355675000, 'simplize.vn — số dùng vốn hóa/EPS']);
rows.push(['Vốn hóa (tỷ VND)', '=B5*B6/1000000000', 'tính từ thị giá x KLCP']);
rows.push(['EPS (đồng/CP, 4 quý gần nhất)', 4984, 'simplize.vn']);
rows.push(['BVPS — Giá trị sổ sách/CP (đồng)', 29728, 'simplize.vn']);
rows.push(['P/E', '=B5/B8', 'thị giá/EPS']);
rows.push(['P/B', '=B5/B9', 'thị giá/BVPS — chỉ số ĐỊNH GIÁ CHỦ ĐẠO cho cổ phiếu ngân hàng']);
rows.push([]);
rows.push(['II. So sánh ngành (P/E, P/B nhóm Big4 + tư nhân lớn, nguồn TCBS 07/08/2026 qua WebSearch)']);
rows.push(['Mã', 'Ngân hàng', 'P/E', 'P/B']);
rows.push(['VCB', 'Vietcombank', '=B10', '=B11']);
rows.push(['BID', 'BIDV', 8.8, 1.4]);
rows.push(['CTG', 'VietinBank', 6.3, 1.3]);
rows.push(['ACB', 'Á Châu', 8.3, 0.6]);
rows.push(['Trung bình ngành Ngân hàng (TCBS 07/08/2026)', '', 8.5, 1.4]);
rows.push(['Nhận định', 'VCB định giá CAO HƠN mặt bằng ngành (P/E ~11,9x, P/B ~2,0x so trung bình ngành P/E 8,5x/P/B 1,4x) — premium hợp lý do chất lượng tài sản/thương hiệu dẫn đầu nhóm big4, nhưng biên an toàn (margin of safety) so ngành thấp hơn BID/CTG/ACB.']);
rows.push([]);
rows.push(['III. DCF']);
rows.push(['Không thực hiện DCF cho cổ phiếu ngân hàng — dòng tiền tự do (FCFF/FCFE) không có ý nghĩa chuẩn với mô hình kinh doanh nhận tiền gửi/cho vay (khác cấu trúc vốn lưu động doanh nghiệp phi tài chính). Thực hành chuẩn ngành dùng P/B, P/E, Dividend Discount Model hoặc Residual Income thay DCF — không đưa số DCF giả định để tránh bịa số liệu không có cơ sở phương pháp luận.']);
rows.push([]);
rows.push(['IV. THANH KHOẢN (nguồn vietstock.vn getpricehistory, truy cập 25/08/2026, dữ liệu tính đến 24/08/2026)']);
rows.push(['', '1 ngày', '7 ngày (~5 phiên)', '1 tháng (~21 phiên)', '6 tháng (~126 phiên)']);
rows.push(['KLGD bình quân (cổ phiếu)', 0, 3249200, 4511152, 6467772]);
rows.push(['GTGD bình quân (VND)', 0, 190080034000, 265878304286, 391895585476]);
rows.push(['Ghi chú', 'Phiên 24/08/2026 (thứ Hai) trả về KLGD=0 từ nguồn vietstock — có thể do độ trễ cập nhật dữ liệu nguồn tại thời điểm truy cập, KHÔNG phản ánh đúng thực tế (VCB là cổ phiếu vốn hóa lớn nhất HOSE, thanh khoản cao). Dùng cột 7 ngày/1 tháng/6 tháng làm cơ sở đánh giá thanh khoản thực tế: GTGD bình quân 1 tháng ~266 tỷ đồng/phiên — thanh khoản CAO, phù hợp nhận định vốn hóa lớn.']);

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
  ] } });
  console.log(JSON.stringify({ success: true, target, sheetId }));
}
main().catch(e => { console.error(e.message || e); process.exit(1); });
