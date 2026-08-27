#!/usr/bin/env node
const { google } = require('googleapis');
const ssid = '1oDM7Fixh2bHKBcqnHhWzLPO1OukR9FSl3u4tW6WaI5Y';
const target = 'Benjamin Graham - VCB';
const KEY_PATH = '/home/nus/projects/My-AI-Agent/config/daily-agent-490610-7eb7985b33e3.json';

const rows = [];
rows.push(['BENJAMIN GRAHAM 10 TIÊU CHÍ CHỌN CỔ PHIẾU — VCB (Vietcombank)']);
rows.push(['Lưu ý: nhiều tiêu chí gốc Graham (current ratio, debt/equity) thiết kế cho doanh nghiệp phi tài chính — KHÔNG áp dụng trực tiếp cho ngân hàng (bản chất đòn bẩy cao, nhận tiền gửi là "nợ" theo cấu trúc bình thường). Các tiêu chí này được đánh dấu N/A NGÀNH và giải thích thay vì ép số liệu sai bản chất.']);
rows.push([]);
rows.push(['#', 'Tiêu chí', 'Ngưỡng Graham', 'Số liệu VCB', 'Kết quả', 'Ghi chú']);
rows.push(['1', 'Quy mô đủ lớn (Doanh thu/Tổng tài sản đủ lớn, tránh cty nhỏ rủi ro cao)', 'Doanh nghiệp lớn, ổn định', 'Tổng tài sản 2025 = 2.442.279 tỷ đồng — lớn nhất hệ thống NHTM CP niêm yết', 'ĐẠT', "='VCB'!L48"]);
rows.push(['2', 'Tình hình tài chính đủ mạnh (Current ratio ≥ 2)', 'Current ratio ≥ 2', 'N/A NGÀNH — ngân hàng không có "current assets/liabilities" theo cấu trúc BCTC doanh nghiệp thường; tài sản có tính thanh khoản (tiền, tiền gửi NHNN/TCTD) thể hiện khác', 'N/A NGÀNH', 'Xem thay thế: CAR (hệ số an toàn vốn) — không có trong BCTC cơ bản, cần Báo cáo thường niên']);
rows.push(['3', 'Lợi nhuận ổn định (LNST dương liên tục ≥10 năm)', 'LNST > 0 mọi năm', 'LNST dương toàn bộ 11 năm dữ liệu 2014-2025 (4.610 → 35.198 tỷ đồng), tăng trưởng liên tục trừ 2020 giảm nhẹ (18.473 vs 18.526 năm 2019, ~-0,3%, ảnh hưởng Covid)', 'ĐẠT', "='VCB' rows 2014-2025 cột LNST"]);
rows.push(['4', 'Lịch sử cổ tức liên tục (≥20 năm với cty lớn/≥10 năm)', 'Trả cổ tức đều đặn', 'VCB có lịch sử chia cổ tức tiền mặt + cổ phiếu đều đặn từ niêm yết 2009 — KHÔNG verify được chuỗi số liệu cổ tức chi tiết từng năm trong phạm vi BCTC cafef (không có mục cổ tức trong template) — CẦN VERIFY thêm qua lịch sử chi trả cổ tức Vietstock/công bố thông tin', 'CẦN VERIFY', 'không bịa số liệu cổ tức']);
rows.push(['5', 'Tăng trưởng LNST ≥ 33% trong 10 năm (EPS 10y growth)', 'EPS(năm nay) ≥ 1.33 x EPS(10 năm trước)', 'EPS 2025 = 3.854đ vs EPS 2015 = 1.626đ → tăng ~137%, vượt xa ngưỡng 33%. Tuy nhiên EPS 2025 GIẢM so 2024 (5.571đ) do pha loãng cổ phần — xu hướng dài hạn vẫn tăng mạnh', 'ĐẠT (dài hạn), lưu ý pha loãng gần đây', "='VCB'!L119 vs C119"]);
rows.push(['6', 'P/E vừa phải (≤ 15, lý tưởng ≤ 9x LNST bình quân 3 năm)', 'P/E ≤ 15', 'P/E hiện tại = 11,88x (25/08/2026)', 'ĐẠT (≤15) nhưng KHÔNG ĐẠT ngưỡng lý tưởng ≤9x — vượt trung bình ngành ngân hàng (8,5x)', "='Định giá - VCB'!B10"]);
rows.push(['7', 'P/B vừa phải (P/E x P/B ≤ 22.5, hoặc P/B ≤ 1.5 độc lập)', 'P/B ≤ 1.5 (hoặc P/E×P/B ≤22.5)', 'P/B hiện tại = 1,99x. P/E×P/B = 11,88 × 1,99 ≈ 23,6', 'KHÔNG ĐẠT — P/B > 1,5 và tích P/E×P/B > 22,5', "='Định giá - VCB'!B11"]);
rows.push(['8', 'Nợ dài hạn thấp hơn vốn lưu động ròng / Đòn bẩy hợp lý', 'N/A NGÀNH', 'Ngân hàng có đòn bẩy tài chính cấu trúc cao theo bản chất kinh doanh nhận tiền gửi-cho vay — không so sánh trực tiếp với doanh nghiệp phi tài chính. VCSH/Tổng tài sản 2025 = 224.559/2.442.279 ≈ 9,2% — mức đòn bẩy thông thường của NHTM lớn', 'N/A NGÀNH', "='VCB'!L66/'VCB'!L48"]);
rows.push(['9', 'Tăng trưởng ổn định, không lỗ bất thường/biến động cực đoan', 'Không có năm lỗ hoặc sụt giảm >50%', 'Không có năm lỗ trong 11 năm dữ liệu; mức giảm lớn nhất là LNST 2020 (~-0,3% do Covid) — biến động thấp, ổn định hơn hẳn nhóm phi tài chính chu kỳ (vd ADP/VEA)', 'ĐẠT', 'quan sát chuỗi 2014-2025']);
rows.push(['10', 'Định giá hợp lý so tài sản ròng (Giá ≤ 1.2x-1.5x giá trị sổ sách hữu hình)', 'P/B ≤ 1.2-1.5x', 'P/B = 1,99x — vượt ngưỡng bảo thủ Graham cho tài sản ròng, dù vẫn thấp hơn đỉnh lịch sử ~4,1x (đầu 2022)', 'KHÔNG ĐẠT', "='Định giá - VCB'!B11"]);
rows.push([]);
rows.push(['Tổng kết', '', '', '', '', 'ĐẠT: 4/10 (tiêu chí 1,3,5,9) | N/A NGÀNH: 2/10 (tiêu chí 2,8 — không áp dụng bản chất ngân hàng) | CẦN VERIFY: 1/10 (tiêu chí 4 — lịch sử cổ tức) | KHÔNG ĐẠT: 3/10 (tiêu chí 6-lý tưởng,7,10 — định giá P/E/P/B cao hơn ngưỡng bảo thủ Graham dù vẫn thấp hơn đỉnh lịch sử và tương đối hợp lý so peer)']);

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
  // set text format for cells with leading formula-looking non-formula strings to avoid parse issues
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
