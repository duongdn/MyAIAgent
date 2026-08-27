#!/usr/bin/env node
const { google } = require('googleapis');
const ssid = '1Yg_fgDeseqP8diMNvRIlmfzdPykd6qnDMlxMt_nysH8';
const target = 'Định giá - VPB';
const KEY_PATH = '/home/nus/projects/My-AI-Agent/config/daily-agent-490610-7eb7985b33e3.json';

const rows = [];
rows.push(['ĐỊNH GIÁ - VPB (Ngân hàng TMCP Việt Nam Thịnh Vượng)']);
rows.push([]);
rows.push(['I. Định giá theo bội số thị trường (tại 25/08/2026)']);
rows.push(['Chỉ tiêu', 'Giá trị', 'Nguồn/Ghi chú']);
rows.push(['Thị giá (VND)', 26400, 'simplize.vn/co-phieu/VPB, truy cập 25/08/2026']);
rows.push(['EPS (đồng/CP, 4 quý gần nhất)', 3758, 'simplize.vn']);
rows.push(['BVPS — Giá trị sổ sách/CP (đồng)', 22475, 'simplize.vn']);
rows.push(['Vốn hóa (tỷ VND)', 209058, 'simplize.vn (giá trị trực tiếp trang, tỷ VND — trang ghi nhầm đơn vị "Trillion", thực tế ~209 nghìn tỷ = 209,058 tỷ VND)']);
rows.push(['P/E', '=B5/B6', 'thị giá/EPS']);
rows.push(['P/B', '=B5/B7', 'thị giá/BVPS — chỉ số ĐỊNH GIÁ CHỦ ĐẠO cho cổ phiếu ngân hàng']);
rows.push(['Tỷ suất cổ tức (dividend yield)', '1.88%', 'simplize.vn (giá thị trường) — LƯU Ý: khác với tỷ suất cổ tức tiền mặt/mệnh giá 10.55% dẫn từ workbook so sánh ngành (xem mục Nhận định bên dưới), hai cách tính khác cơ sở (yield/thị giá vs yield/mệnh giá)']);
rows.push([]);
rows.push(['II. So sánh ngành (P/E, P/B nhóm Big4 + tư nhân lớn, nguồn simplize.vn, truy cập 25/08/2026)']);
rows.push(['Mã', 'Ngân hàng', 'P/E', 'P/B', 'Dividend Yield (thị giá)']);
rows.push(['VPB', 'VPBank', '=B9', '=B10', '=B11']);
rows.push(['VCB', 'Vietcombank', 11.88, 1.99, '1.51%']);
rows.push(['BID', 'BIDV', 8.9, 1.49, '2.43%']);
rows.push(['CTG', 'VietinBank', 6.15, 1.24, '2.83%']);
rows.push(['MBB', 'MB Bank', 6.95, 1.4, '4.81%']);
rows.push(['ACB', 'Á Châu', 8.33, 1.32, '3.11%']);
rows.push(['Trung bình 5 peer (VCB/BID/CTG/MBB/ACB)', '', '=AVERAGE(C13:C17)', '=AVERAGE(D13:D17)', '=AVERAGE(E13:E17)']);
rows.push(['Nhận định', 'VPB (P/E ~7,01x, P/B ~1,17x) định giá THẤP HƠN trung bình 5 peer lớn (P/E TB ~8,4x, P/B TB ~1,49x) — rẻ hơn cả VCB/BID/CTG/MBB/ACB trên P/B, chỉ đắt hơn CTG/MBB trên P/E. Đây là mức chiết khấu định giá hợp lý phản ánh chất lượng tài sản kém hơn nhóm quốc doanh: NPL 2025 ~3.3-3.5% (nguồn workbook so sánh ngành + Định lượng - VPB) so với VCB ~0.58%, và cao hơn rõ rệt các peer khác trong nhóm này — thị trường đang định giá đúng rủi ro tín dụng cao hơn bằng bội số thấp hơn, KHÔNG hẳn là "rẻ miễn phí". Đồng thời VPB dẫn đầu nhóm về cổ tức tiền mặt/mệnh giá công bố (10.55%, nguồn workbook so sánh ngành) — sự kết hợp NPL cao + cổ tức cao là điểm cần cân nhắc kỹ: cổ tức hấp dẫn có thể một phần bù đắp rủi ro tín dụng cho nhà đầu tư dài hạn, nhưng NPL cao cũng có thể tạo áp lực trích lập dự phòng ăn mòn lợi nhuận tương lai, ảnh hưởng khả năng duy trì cổ tức ở mức này. Cấu trúc hợp nhất của VPB còn bao gồm FE Credit (công ty tài chính tiêu dùng con) — mảng cho vay tiêu dùng tín chấp rủi ro cao hơn ngân hàng mẹ, một phần lý giải NPL hợp nhất cao hơn peer thuần ngân hàng thương mại.']);
rows.push([]);
rows.push(['III. DCF']);
rows.push(['Không thực hiện DCF cho cổ phiếu ngân hàng — dòng tiền tự do (FCFF/FCFE) không có ý nghĩa chuẩn với mô hình kinh doanh nhận tiền gửi/cho vay (khác cấu trúc vốn lưu động doanh nghiệp phi tài chính). Thực hành chuẩn ngành dùng P/B, P/E, Dividend Discount Model hoặc Residual Income thay DCF — không đưa số DCF giả định để tránh bịa số liệu không có cơ sở phương pháp luận.']);
rows.push([]);
rows.push(['IV. THANH KHOẢN (nguồn vietstock.vn getpricehistory, truy cập 25/08/2026, dữ liệu tính đến 24/08/2026)']);
rows.push(['', '1 ngày', '7 ngày (~5 phiên)', '1 tháng (~21 phiên)', '6 tháng (~126 phiên)']);
rows.push(['KLGD bình quân (cổ phiếu)', 16309200, 13890680, 13718043, 14993289]);
rows.push(['GTGD bình quân (VND)', 430669635000, 357016512000, 346579610714, 396647688135]);
rows.push(['Ghi chú', 'Cả 4 mốc đều cho số liệu thực tế hợp lý (không có mốc nào = 0 bất thường). VPB là cổ phiếu vốn hóa lớn (~209 nghìn tỷ), thanh khoản RẤT CAO và ổn định qua các mốc thời gian — GTGD bình quân 1 ngày ~431 tỷ đồng, 6 tháng ~397 tỷ đồng/phiên, cao nhất trong nhóm 6 ngân hàng đã build (FPT/VEA/SAB/FOX/HPA/ADP/VCB/MBB/CTG). Không có rủi ro execution risk đáng kể do free-float thấp/cổ đông chi phối.']);

async function main() {
  const auth = new google.auth.GoogleAuth({ keyFile: KEY_PATH, scopes: ['https://www.googleapis.com/auth/spreadsheets'] });
  const sheets = google.sheets({ version: 'v4', auth });
  const meta = await sheets.spreadsheets.get({ spreadsheetId: ssid });
  let s = meta.data.sheets.find(x => x.properties.title === target);
  if (s) {
    await sheets.spreadsheets.batchUpdate({ spreadsheetId: ssid, requestBody: { requests: [{ deleteSheet: { sheetId: s.properties.sheetId } }] } });
  }
  await sheets.spreadsheets.batchUpdate({ spreadsheetId: ssid, requestBody: { requests: [{ addSheet: { properties: { title: target, index: 3 } } }] } });
  const meta2 = await sheets.spreadsheets.get({ spreadsheetId: ssid });
  s = meta2.data.sheets.find(x => x.properties.title === target);
  const sheetId = s.properties.sheetId;
  await sheets.spreadsheets.values.update({ spreadsheetId: ssid, range: `'${target}'!A1`, valueInputOption: 'USER_ENTERED', requestBody: { values: rows } });
  await sheets.spreadsheets.batchUpdate({ spreadsheetId: ssid, requestBody: { requests: [
    { updateSheetProperties: { properties: { sheetId, gridProperties: { rowCount: rows.length + 10, columnCount: 8 } }, fields: 'gridProperties(rowCount,columnCount)' } },
    { updateDimensionProperties: { range: { sheetId, dimension: 'COLUMNS', startIndex: 0, endIndex: 1 }, properties: { pixelSize: 340 }, fields: 'pixelSize' } },
    { updateDimensionProperties: { range: { sheetId, dimension: 'COLUMNS', startIndex: 1, endIndex: 5 }, properties: { pixelSize: 220 }, fields: 'pixelSize' } },
    { repeatCell: { range: { sheetId }, cell: { userEnteredFormat: { wrapStrategy: 'WRAP', verticalAlignment: 'TOP' } }, fields: 'userEnteredFormat.wrapStrategy,userEnteredFormat.verticalAlignment' } },
    { repeatCell: { range: { sheetId, startRowIndex: 0, endRowIndex: 1 }, cell: { userEnteredFormat: { textFormat: { bold: true, fontSize: 12 } } }, fields: 'userEnteredFormat.textFormat' } },
    { repeatCell: { range: { sheetId, startRowIndex: 7, endRowIndex: 9, startColumnIndex: 1, endColumnIndex: 2 }, cell: { userEnteredFormat: { numberFormat: { type: 'NUMBER', pattern: '0.00' } } }, fields: 'userEnteredFormat.numberFormat' } },
    { repeatCell: { range: { sheetId, startRowIndex: 11, endRowIndex: 18, startColumnIndex: 2, endColumnIndex: 4 }, cell: { userEnteredFormat: { numberFormat: { type: 'NUMBER', pattern: '0.00' } } }, fields: 'userEnteredFormat.numberFormat' } },
  ] } });
  console.log(JSON.stringify({ success: true, target, sheetId, rows: rows.length }));
}
main().catch(e => { console.error(e.message || e); process.exit(1); });
