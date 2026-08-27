#!/usr/bin/env node
const { google } = require('googleapis');
const ssid = '1Yg_fgDeseqP8diMNvRIlmfzdPykd6qnDMlxMt_nysH8';
const target = 'Benjamin Graham - VPB';
const KEY_PATH = '/home/nus/projects/My-AI-Agent/config/daily-agent-490610-7eb7985b33e3.json';

const rows = [];
rows.push(['BENJAMIN GRAHAM 10 TIÊU CHÍ CHỌN CỔ PHIẾU — VPB (Ngân hàng TMCP Việt Nam Thịnh Vượng)']);
rows.push(['Lưu ý: nhiều tiêu chí gốc Graham (current ratio, debt/equity) thiết kế cho doanh nghiệp phi tài chính — KHÔNG áp dụng trực tiếp cho ngân hàng (bản chất đòn bẩy cao, nhận tiền gửi là "nợ" theo cấu trúc bình thường). Các tiêu chí này được đánh dấu N/A NGÀNH và giải thích thay vì ép số liệu sai bản chất.']);
rows.push([]);
rows.push(['#', 'Tiêu chí', 'Ngưỡng Graham', 'Số liệu VPB', 'Kết quả', 'Ghi chú']);
rows.push(['1', 'Quy mô đủ lớn (Doanh thu/Tổng tài sản đủ lớn, tránh cty nhỏ rủi ro cao)', 'Doanh nghiệp lớn, ổn định', 'Tổng tài sản 2025 = 1.260.150 tỷ đồng, VN30, vốn hóa ~209.058 tỷ đồng — nằm trong nhóm NHTM tư nhân lớn niêm yết HOSE', 'ĐẠT', "='VPB'!P48"]);
rows.push(['2', 'Tình hình tài chính đủ mạnh (Current ratio ≥ 2)', 'Current ratio ≥ 2', 'N/A NGÀNH — ngân hàng không có "current assets/liabilities" theo cấu trúc BCTC doanh nghiệp thường', 'N/A NGÀNH', 'Xem thay thế: CAR (hệ số an toàn vốn) 2025 = 15,5% (nguồn workbook so sánh ngành, xem sheet Định lượng) — trên ngưỡng an toàn Basel II']);
rows.push(['3', 'Lợi nhuận ổn định (LNST dương liên tục ≥10 năm)', 'LNST > 0 mọi năm', 'LNST dương toàn bộ 15 năm dữ liệu (2011-2025): 800 → 24.355 tỷ đồng, không có năm lỗ, NHƯNG biến động khá lớn qua các năm (VD 2022 LNST=16.909 tỷ giảm còn 8.494 tỷ năm 2023, -50%) — kém ổn định hơn peer thuần ngân hàng thương mại, phản ánh rủi ro chu kỳ tín dụng của mảng FE Credit', 'ĐẠT (có lưu ý biến động)', "='VPB' hàng 116, cột B-P"]);
rows.push(['4', 'Lịch sử cổ tức liên tục (≥20 năm với cty lớn/≥10 năm)', 'Trả cổ tức đều đặn', 'Tỷ suất cổ tức tiền mặt/mệnh giá công bố hiện tại ~10,55% (nguồn workbook so sánh ngành, truy cập 25/08/2026) — CAO NHẤT nhóm 5 peer so sánh. KHÔNG verify được chuỗi số liệu cổ tức chi tiết TỪNG NĂM trong phạm vi BCTC cafef (không có mục cổ tức trong template gốc) — CẦN VERIFY thêm qua lịch sử chi trả cổ tức Vietstock/công bố thông tin', 'CẦN VERIFY (yield hiện tại cao nhưng lịch sử chi tiết chưa xác minh)', 'không bịa số liệu cổ tức chi tiết từng năm']);
rows.push(['5', 'Tăng trưởng EPS ≥ 33% trong khoảng 10 năm', 'EPS(năm nay) ≥ 1.33 x EPS(~10 năm trước)', 'EPS 2025 = 3.024đ vs EPS 2016 = 4.485đ (mốc gần 10 năm sớm nhất có dữ liệu) → GIẢM ~32,6%, KHÔNG đạt ngưỡng tăng trưởng — thực tế là suy giảm, không phải tăng trưởng. Đây là điểm khác biệt tiêu cực rõ rệt so với VCB/MBB/CTG (đã build trước, đều ĐẠT tiêu chí này)', 'KHÔNG ĐẠT', "='VPB'!P119 vs G119"]);
rows.push(['6', 'P/E vừa phải (≤ 15, lý tưởng ≤ 9x)', 'P/E ≤ 15 (lý tưởng ≤9x)', 'P/E hiện tại = 7,01x (25/08/2026, simplize.vn) — ĐẠT CẢ ngưỡng lý tưởng ≤9x, thấp hơn trung bình 5 peer VCB/BID/CTG/MBB/ACB (~8,4x)', 'ĐẠT (kể cả ngưỡng lý tưởng)', "='Định giá - VPB'!B9"]);
rows.push(['7', 'P/B vừa phải (P/E x P/B ≤ 22.5, hoặc P/B ≤ 1.5 độc lập)', 'P/B ≤ 1.5 (hoặc P/E×P/B ≤22.5)', 'P/B hiện tại = 1,17x. P/E×P/B = 7,01 × 1,17 ≈ 8,20 — thấp hơn nhiều ngưỡng 22,5, THẤP NHẤT trong nhóm 5 peer trên cả 2 chỉ số', 'ĐẠT', "='Định giá - VPB'!B10"]);
rows.push(['8', 'Nợ dài hạn thấp hơn vốn lưu động ròng / Đòn bẩy hợp lý', 'N/A NGÀNH', 'Ngân hàng có đòn bẩy tài chính cấu trúc cao theo bản chất kinh doanh nhận tiền gửi-cho vay. VCSH/Tổng tài sản 2025 = 180.276/1.260.150 ≈ 14,31% — CAO HƠN mức thông thường của NHTM lớn (VCB/MBB ~9%), phản ánh đợt tăng vốn mạnh gần đây (gồm thương vụ SMBC 2023) — điểm tích cực về đệm vốn', 'N/A NGÀNH (đệm vốn tương đối dày)', "='VPB'!P66/'VPB'!P48"]);
rows.push(['9', 'Tăng trưởng ổn định, không lỗ bất thường/biến động cực đoan', 'Không có năm lỗ hoặc sụt giảm >50%', 'Không có năm lỗ trong 15 năm dữ liệu, NHƯNG có giai đoạn LNST giảm mạnh (2022→2023 giảm ~50%, từ 16.909 xuống 8.494 tỷ) trùng giai đoạn NPL tăng vọt 4,5%→5,7%→5,1% (2021-2023) — biến động LỚN HƠN peer thuần ngân hàng thương mại, không đạt tiêu chuẩn "ổn định" theo tinh thần Graham dù kỹ thuật không lỗ', 'KHÔNG ĐẠT (biến động vượt ngưỡng ổn định)', 'quan sát chuỗi 2011-2025, đối chiếu NPL sheet Định lượng']);
rows.push(['10', 'Định giá hợp lý so tài sản ròng (Giá ≤ 1.2x-1.5x giá trị sổ sách hữu hình)', 'P/B ≤ 1.2-1.5x', 'P/B = 1,17x — THẤP HƠN cận dưới khung bảo thủ Graham (1,2x-1,5x), ĐẠT với biên an toàn', 'ĐẠT (dưới cả cận dưới, biên an toàn tốt)', "='Định giá - VPB'!B10"]);
rows.push([]);
rows.push(['Tổng kết', '', '', '', '', 'ĐẠT: 5/10 (tiêu chí 1,3,6,7,10) | KHÔNG ĐẠT: 2/10 (tiêu chí 5,9 — tăng trưởng EPS âm & biến động lợi nhuận lớn, phản ánh trực tiếp rủi ro tín dụng/NPL cao hơn peer) | N/A NGÀNH: 2/10 (tiêu chí 2,8 — không áp dụng bản chất ngân hàng, đệm vốn CAR/VCSH thực tế khá tốt) | CẦN VERIFY: 1/10 (tiêu chí 4). So với VCB/MBB/CTG (đã build trước): VPB là mã DUY NHẤT trong nhóm KHÔNG ĐẠT tiêu chí tăng trưởng & ổn định lợi nhuận — kết quả Graham phản ánh đúng thực tế: VPB rẻ hơn peer (P/E, P/B thấp nhất nhóm) NHƯNG đi kèm chất lượng lợi nhuận/tài sản kém ổn định hơn, không phải "rẻ miễn phí không rủi ro".']);

async function main() {
  const auth = new google.auth.GoogleAuth({ keyFile: KEY_PATH, scopes: ['https://www.googleapis.com/auth/spreadsheets'] });
  const sheets = google.sheets({ version: 'v4', auth });
  const meta = await sheets.spreadsheets.get({ spreadsheetId: ssid });
  let s = meta.data.sheets.find(x => x.properties.title === target);
  if (s) {
    await sheets.spreadsheets.batchUpdate({ spreadsheetId: ssid, requestBody: { requests: [{ deleteSheet: { sheetId: s.properties.sheetId } }] } });
  }
  await sheets.spreadsheets.batchUpdate({ spreadsheetId: ssid, requestBody: { requests: [{ addSheet: { properties: { title: target, index: 4 } } }] } });
  const meta2 = await sheets.spreadsheets.get({ spreadsheetId: ssid });
  s = meta2.data.sheets.find(x => x.properties.title === target);
  const sheetId = s.properties.sheetId;
  await sheets.spreadsheets.values.update({ spreadsheetId: ssid, range: `'${target}'!A1`, valueInputOption: 'USER_ENTERED', requestBody: { values: rows } });
  await sheets.spreadsheets.batchUpdate({ spreadsheetId: ssid, requestBody: { requests: [
    { updateSheetProperties: { properties: { sheetId, gridProperties: { rowCount: rows.length + 10, columnCount: 8 } }, fields: 'gridProperties(rowCount,columnCount)' } },
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
