#!/usr/bin/env node
const { google } = require('googleapis');
const ssid = '1UtAH3Bq5LYzJmqMQiFxOtODrMLjswiayc80-slGhvRg';
const target = 'Benjamin Graham - MBB';
const KEY_PATH = '/home/nus/projects/My-AI-Agent/config/daily-agent-490610-7eb7985b33e3.json';

const rows = [];
rows.push(['BENJAMIN GRAHAM 10 TIÊU CHÍ CHỌN CỔ PHIẾU — MBB (Ngân hàng TMCP Quân đội)']);
rows.push(['Lưu ý: nhiều tiêu chí gốc Graham (current ratio, debt/equity) thiết kế cho doanh nghiệp phi tài chính — KHÔNG áp dụng trực tiếp cho ngân hàng (bản chất đòn bẩy cao, nhận tiền gửi là "nợ" theo cấu trúc bình thường). Các tiêu chí này được đánh dấu N/A NGÀNH và giải thích thay vì ép số liệu sai bản chất.']);
rows.push([]);
rows.push(['#', 'Tiêu chí', 'Ngưỡng Graham', 'Số liệu MBB', 'Kết quả', 'Ghi chú']);
rows.push(['1', 'Quy mô đủ lớn (Doanh thu/Tổng tài sản đủ lớn, tránh cty nhỏ rủi ro cao)', 'Doanh nghiệp lớn, ổn định', 'Tổng tài sản 2025 = 1.615.764 tỷ đồng, VN30, vốn hóa ~208.926 tỷ đồng — nằm trong nhóm NHTM lớn niêm yết HOSE', 'ĐẠT', "='MBB'!M48"]);
rows.push(['2', 'Tình hình tài chính đủ mạnh (Current ratio ≥ 2)', 'Current ratio ≥ 2', 'N/A NGÀNH — ngân hàng không có "current assets/liabilities" theo cấu trúc BCTC doanh nghiệp thường; tài sản có tính thanh khoản (tiền, tiền gửi NHNN/TCTD) thể hiện khác', 'N/A NGÀNH', 'Xem thay thế: CAR (hệ số an toàn vốn) 2025 = 11,8% (nguồn workbook so sánh ngành, xem sheet Định lượng)']);
rows.push(['3', 'Lợi nhuận ổn định (LNST dương liên tục ≥10 năm)', 'LNST > 0 mọi năm', 'LNST dương toàn bộ 12 năm dữ liệu (2012-2025, thiếu 2013/2015 do cafef chỉ giữ năm kiểm toán liên tục): 2.325 → 27.383 tỷ đồng, không có năm lỗ', 'ĐẠT', "='MBB' hàng 116, cột B-M"]);
rows.push(['4', 'Lịch sử cổ tức liên tục (≥20 năm với cty lớn/≥10 năm)', 'Trả cổ tức đều đặn', 'Tỷ suất cổ tức hiện tại ~4,81% (simplize.vn 25/08/2026) — MBB có lịch sử chia cổ tức tiền mặt+cổ phiếu đều đặn nhưng KHÔNG verify được chuỗi số liệu cổ tức chi tiết từng năm trong phạm vi BCTC cafef (không có mục cổ tức trong template) — CẦN VERIFY thêm qua lịch sử chi trả cổ tức Vietstock/công bố thông tin', 'CẦN VERIFY', 'không bịa số liệu cổ tức chi tiết từng năm']);
rows.push(['5', 'Tăng trưởng EPS ≥ 33% trong khoảng 10 năm', 'EPS(năm nay) ≥ 1.33 x EPS(~10 năm trước)', 'EPS 2025 = 3.325đ vs EPS 2016 = 1.706đ (năm sớm nhất có dữ liệu gần mốc 10 năm do cafef thiếu 2013/2015) → tăng ~95%, vượt xa ngưỡng 33%. Lưu ý: dòng EPS 2018 trong nguồn cafef có giá trị bất thường ("3" — nghi ngờ lỗi dữ liệu nguồn, không dùng làm mốc so sánh)', 'ĐẠT', "='MBB'!M119 vs D119"]);
rows.push(['6', 'P/E vừa phải (≤ 15, lý tưởng ≤ 9x)', 'P/E ≤ 15 (lý tưởng ≤9x)', 'P/E hiện tại = 6,95x (25/08/2026, simplize.vn) — ĐẠT CẢ ngưỡng lý tưởng ≤9x, thấp hơn hẳn trung bình 4 peer VCB/BID/CTG/ACB (~8,8x)', 'ĐẠT (kể cả ngưỡng lý tưởng)', "='Định giá - MBB'!B9"]);
rows.push(['7', 'P/B vừa phải (P/E x P/B ≤ 22.5, hoặc P/B ≤ 1.5 độc lập)', 'P/B ≤ 1.5 (hoặc P/E×P/B ≤22.5)', 'P/B hiện tại = 1,40x. P/E×P/B = 6,95 × 1,40 ≈ 9,73 — thấp hơn nhiều ngưỡng 22,5', 'ĐẠT', "='Định giá - MBB'!B10"]);
rows.push(['8', 'Nợ dài hạn thấp hơn vốn lưu động ròng / Đòn bẩy hợp lý', 'N/A NGÀNH', 'Ngân hàng có đòn bẩy tài chính cấu trúc cao theo bản chất kinh doanh nhận tiền gửi-cho vay — không so sánh trực tiếp với doanh nghiệp phi tài chính. VCSH/Tổng tài sản 2025 = 142.023/1.615.764 ≈ 8,79% — mức đòn bẩy thông thường của NHTM lớn, tương đương VCB (~9,2%)', 'N/A NGÀNH', "='MBB'!M66/'MBB'!M48"]);
rows.push(['9', 'Tăng trưởng ổn định, không lỗ bất thường/biến động cực đoan', 'Không có năm lỗ hoặc sụt giảm >50%', 'Không có năm lỗ trong 12 năm dữ liệu; tăng trưởng LNST hai chữ số hầu hết các năm, không có năm sụt giảm lớn — ổn định hơn nhóm ngân hàng tư nhân biến động mạnh theo chu kỳ tín dụng', 'ĐẠT', 'quan sát chuỗi 2012-2025']);
rows.push(['10', 'Định giá hợp lý so tài sản ròng (Giá ≤ 1.2x-1.5x giá trị sổ sách hữu hình)', 'P/B ≤ 1.2-1.5x', 'P/B = 1,40x — nằm TRONG ngưỡng bảo thủ Graham (1,2x-1,5x), sát cận trên', 'ĐẠT (sát cận trên)', "='Định giá - MBB'!B10"]);
rows.push([]);
rows.push(['Tổng kết', '', '', '', '', 'ĐẠT: 6/10 (tiêu chí 1,3,5,6,7,9) | ĐẠT sát cận: 1/10 (tiêu chí 10) | N/A NGÀNH: 2/10 (tiêu chí 2,8 — không áp dụng bản chất ngân hàng) | CẦN VERIFY: 1/10 (tiêu chí 4 — lịch sử cổ tức chi tiết). Kết quả tốt hơn đáng kể so với VCB (đã build trước, ĐẠT 4/10, định giá cao hơn ngưỡng Graham) — MBB vừa có tăng trưởng/ROE cao vừa định giá hiện tại nằm trong ngưỡng bảo thủ Graham.']);

async function main() {
  const auth = new google.auth.GoogleAuth({ keyFile: KEY_PATH, scopes: ['https://www.googleapis.com/auth/spreadsheets'] });
  const sheets = google.sheets({ version: 'v4', auth });
  const meta = await sheets.spreadsheets.get({ spreadsheetId: ssid });
  let s = meta.data.sheets.find(x => x.properties.title === target);
  if (!s) {
    await sheets.spreadsheets.batchUpdate({ spreadsheetId: ssid, requestBody: { requests: [{ addSheet: { properties: { title: target, index: 4 } } }] } });
    const meta2 = await sheets.spreadsheets.get({ spreadsheetId: ssid });
    s = meta2.data.sheets.find(x => x.properties.title === target);
  }
  const sheetId = s.properties.sheetId;
  await sheets.spreadsheets.values.clear({ spreadsheetId: ssid, range: `'${target}'!A1:Z50` });
  await sheets.spreadsheets.values.update({ spreadsheetId: ssid, range: `'${target}'!A1`, valueInputOption: 'RAW', requestBody: { values: rows } });
  await sheets.spreadsheets.batchUpdate({ spreadsheetId: ssid, requestBody: { requests: [
    { updateDimensionProperties: { range: { sheetId, dimension: 'COLUMNS', startIndex: 0, endIndex: 1 }, properties: { pixelSize: 40 }, fields: 'pixelSize' } },
    { updateDimensionProperties: { range: { sheetId, dimension: 'COLUMNS', startIndex: 1, endIndex: 2 }, properties: { pixelSize: 260 }, fields: 'pixelSize' } },
    { updateDimensionProperties: { range: { sheetId, dimension: 'COLUMNS', startIndex: 3, endIndex: 4 }, properties: { pixelSize: 400 }, fields: 'pixelSize' } },
    { updateDimensionProperties: { range: { sheetId, dimension: 'COLUMNS', startIndex: 5, endIndex: 6 }, properties: { pixelSize: 300 }, fields: 'pixelSize' } },
    { repeatCell: { range: { sheetId }, cell: { userEnteredFormat: { wrapStrategy: 'WRAP', verticalAlignment: 'TOP' } }, fields: 'userEnteredFormat.wrapStrategy,userEnteredFormat.verticalAlignment' } },
    { repeatCell: { range: { sheetId, startRowIndex: 3, endRowIndex: 4 }, cell: { userEnteredFormat: { textFormat: { bold: true } } }, fields: 'userEnteredFormat.textFormat' } },
  ] } });
  console.log(JSON.stringify({ success: true, target, sheetId }));
}
main().catch(e => { console.error(e.message || e); process.exit(1); });
