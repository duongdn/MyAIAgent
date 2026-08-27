#!/usr/bin/env node
const { google } = require('googleapis');
const KEY_PATH = '/home/nus/projects/My-AI-Agent/config/daily-agent-490610-7eb7985b33e3.json';
const ssid = '1oDM7Fixh2bHKBcqnHhWzLPO1OukR9FSl3u4tW6WaI5Y';
const target = 'Báo cáo 2 - VCB';

const rows = [];
rows.push(['BÁO CÁO 2 — PHÂN TÍCH VCB (VIETCOMBANK, HOSE: VCB) THEO PHƯƠNG PHÁP GOOD COMPANY / CHEAP PRICE']);
rows.push(["Phân tích VCB theo phương pháp Good Company / Cheap Price (Học viện AYP, THE INTELLIGENT INVESTOR). Số liệu lấy từ sheet 'VCB', 'Định giá - VCB', 'Định tính - VCB', 'Định lượng - VCB', 'Benjamin Graham - VCB' trong file này. Ghi ngày truy cập số liệu live: 25/08/2026."]);
rows.push([]);
rows.push(['BƯỚC 1 — ĐỊNH TÍNH: HIỂU DOANH NGHIỆP TRƯỚC KHI NHÌN SỐ']);
rows.push(['Tóm tắt (chi tiết đầy đủ xem sheet \'Định tính - VCB\'):']);
rows.push(['VCB là NHTM lớn nhất VN theo vốn hóa (~494,655 tỷ đồng, 25/08/2026), thuộc nhóm "Big 4" gốc quốc doanh (VCB/BID/CTG/Agribank). Mô hình: huy động tiền gửi + cho vay (NII), thu phí dịch vụ (thanh toán quốc tế — thế mạnh lịch sử, thẻ, bancassurance), kinh doanh ngoại hối/chứng khoán đầu tư. Cổ đông chi phối là Ngân hàng Nhà nước (SBV); cổ đông chiến lược nước ngoài Mizuho Bank. Rủi ro chính: chu kỳ tín dụng/lãi suất, pha loãng cổ phần do các đợt tăng vốn liên tục (kế hoạch phát hành >543 triệu CP giữa 2026 huy động ~36,3 nghìn tỷ), quy định NHNN (room tín dụng, CAR).']);
rows.push([]);
rows.push(['BƯỚC 2.1 — ĐỌC BÁO CÁO TÀI CHÍNH (sheet \'VCB\', đơn vị tỷ đồng)']);
rows.push(['A. Bảng cân đối kế toán (bank structure)']);
rows.push(['Năm', 'Tổng tài sản', 'Vốn chủ sở hữu', 'Tổng nợ phải trả', 'VCSH/Tổng TS']);
const years = ['2014','2015','2016','2018','2019','2020','2021','2022','2023','2024','2025'];
const cols = ['B','C','D','E','F','G','H','I','J','K','L'];
years.forEach((y, i) => {
  const c = cols[i];
  rows.push([y, `='VCB'!${c}48`, `='VCB'!${c}66`, `=IFERROR('VCB'!${c}48-'VCB'!${c}66,"n/a")`, `=IFERROR('VCB'!${c}66/'VCB'!${c}48,"n/a")`]);
});
rows.push(['Đánh giá 1: Tổng tài sản tăng liên tục 2014-2025 (576,989 → 2,442,279 tỷ đồng, CAGR ~14.0%/năm), VCSH tăng nhanh hơn (CAGR ~16.1%/năm) — tỷ lệ VCSH/Tổng TS cải thiện dần từ ~7.5% (2014) lên ~9.2% (2025), phản ánh tăng vốn tự có nhanh hơn tốc độ mở rộng bảng cân đối — hợp lý với yêu cầu tăng vốn CAR của NHNN.']);
rows.push([]);
rows.push(['B. Kết quả kinh doanh']);
rows.push(['Năm', 'Thu nhập lãi thuần (NII)', 'LNST', 'Tăng trưởng LNST YoY', 'EPS (đồng/CP)']);
years.forEach((y, i) => {
  const c = cols[i];
  const prevIdx = i - 1;
  const growthFormula = prevIdx >= 0 ? `=IFERROR('VCB'!${c}116/'VCB'!${cols[prevIdx]}116-1,"n/a")` : 'n/a (năm đầu)';
  rows.push([y, `='VCB'!${c}96`, `='VCB'!${c}116`, growthFormula, `='VCB'!${c}119`]);
});
rows.push(['Đánh giá 2: LNST dương liên tục toàn bộ 11 năm dữ liệu, CAGR LNST 2014-2025 ~20.3%/năm — tăng trưởng nhanh và ổn định hơn hẳn nhóm ngân hàng tư nhân biến động mạnh theo chu kỳ tín dụng. EPS 2025 (3,854đ) THẤP HƠN 2024 (5,571đ) dù LNST tuyệt đối vẫn tăng — do số CP lưu hành tăng qua các đợt phát hành/cổ tức cổ phiếu (xem \'Định tính - VCB\' mục II.2) — cần phân biệt rõ tăng trưởng LNST tuyệt đối (tốt) và tăng trưởng EPS/CP (bị pha loãng gần đây, cần theo dõi các đợt phát hành 2026).']);
rows.push([]);
rows.push(['C. Lưu chuyển tiền tệ']);
rows.push(['Ghi chú: VCB (bank) không có cấu trúc "CFO/CFI/CFF" điển hình như doanh nghiệp phi tài chính do bản chất tiền gửi/cho vay chiếm phần lớn dòng tiền hoạt động cốt lõi — số liệu chi tiết đầy đủ tại sheet \'VCB\' phần Lưu chuyển tiền tệ, không tổng hợp lại ở đây để tránh diễn giải sai bản chất ngân hàng.']);
rows.push([]);
rows.push(['BƯỚC 2.2 — XÁC TÍN BẰNG CHỈ SỐ TÀI CHÍNH (bank ratios, xem \'Định lượng - VCB\')']);
rows.push(['Nhóm chỉ số', '2025', 'Nhận xét']);
rows.push(['CAGR Tổng tài sản (2014-2025)', '=(B21/B11)^(1/11)-1', '~14.0%/năm — B11=Tổng TS 2014, B21=Tổng TS 2025 (bảng cân đối trên)']);
rows.push(['CAGR VCSH (2014-2025)', '=(C21/C11)^(1/11)-1', '~16.1%/năm']);
rows.push(['CAGR LNST (2014-2025)', '=(C36/C26)^(1/11)-1', '~20.3%/năm — VCSH và LNST tăng nhanh hơn Tổng tài sản → hiệu quả sinh lời/CP vốn cải thiện dần']);
rows.push(["ROE (LNST/VCSH cuối năm 2025)", "='Định lượng - VCB'!L123", 'xem sheet Định lượng - VCB']);
rows.push(["ROA (LNST/Tổng TS cuối năm 2025)", "='Định lượng - VCB'!L124", '']);
rows.push(['CIR (Chi phí HĐ/Tổng thu nhập HĐ, 2025)', "='Định lượng - VCB'!L125", 'chỉ có dữ liệu 2024-2025']);
rows.push(['NPL / CAR', 'N/A trong BCTC cơ bản', 'không công bố trong dữ liệu cafef — cần Báo cáo thường niên/Basel disclosure riêng, KHÔNG bịa số']);
rows.push(['Đánh giá 3: VCB tăng trưởng quy mô hai chữ số ổn định nhiều năm, hiệu quả sinh lời (ROE/ROA) thuộc nhóm dẫn đầu ngành ngân hàng niêm yết VN (số liệu chính xác xem sheet Định lượng). Thiếu dữ liệu NPL/CAR trong phạm vi BCTC cơ bản là hạn chế của nguồn cafef, không phải dấu hiệu rủi ro — cần bổ sung nếu phân tích sâu hơn.']);
rows.push([]);
rows.push(['GIÁ CẢ — ĐỊNH GIÁ HIỆN TẠI (25/08/2026, xem \'Định giá - VCB\')']);
rows.push(['Chỉ tiêu', 'Giá trị (live)']);
rows.push(['Thị giá (đồng/CP)', "='Định giá - VCB'!B5"]);
rows.push(['Vốn hóa (tỷ đồng)', "='Định giá - VCB'!B7"]);
rows.push(['EPS (đồng/CP)', "='Định giá - VCB'!B8"]);
rows.push(['BVPS (đồng/CP)', "='Định giá - VCB'!B9"]);
rows.push(['P/E (lần)', "='Định giá - VCB'!B10"]);
rows.push(['P/B (lần)', "='Định giá - VCB'!B11"]);
rows.push(['So sánh ngành', 'P/E VCB (~11.9x) và P/B (~2.0x) CAO HƠN trung bình ngành ngân hàng niêm yết (P/E ~8.5x, P/B ~1.4x, nguồn TCBS 07/08/2026) — premium hợp lý cho chất lượng tài sản dẫn đầu nhưng biên an toàn định giá thấp hơn peer (BID/CTG/ACB), xem chi tiết \'Định giá - VCB\'.']);
rows.push([]);
rows.push(['BƯỚC 2.3 — BENJAMIN GRAHAM 10 TIÊU CHÍ (xem chi tiết \'Benjamin Graham - VCB\')']);
rows.push(['Kết quả: ĐẠT 4/10 (quy mô lớn, lợi nhuận ổn định 11 năm liên tục, tăng trưởng EPS dài hạn >33%/10 năm, không có năm lỗ/biến động cực đoan) | N/A NGÀNH 2/10 (current ratio, nợ dài hạn/vốn lưu động ròng — không áp dụng bản chất ngân hàng) | CẦN VERIFY 1/10 (lịch sử cổ tức chi tiết) | KHÔNG ĐẠT 3/10 (P/E lý tưởng ≤9x, P/B ≤1.5x, P/E×P/B ≤22.5 — định giá hiện tại cao hơn ngưỡng bảo thủ Graham).']);
rows.push([]);
rows.push(['KẾT LUẬN CHUNG — ĐẦU TƯ']);
rows.push(['GOOD COMPANY: ĐẠT — VCB là ngân hàng dẫn đầu ngành về quy mô, thương hiệu, lịch sử lợi nhuận ổn định 11 năm liên tục tăng trưởng CAGR ~20%/năm, ROE/ROA thuộc nhóm cao ngành, mô hình kinh doanh dễ hiểu, rủi ro quản trị/mô hình thấp so nhóm ngân hàng tư nhân.']);
rows.push(['CHEAP PRICE: KHÔNG ĐẠT theo tiêu chí Graham bảo thủ — P/E ~11.9x và P/B ~2.0x đều cao hơn ngưỡng lý tưởng Graham (P/E≤9x, P/B≤1.5x) và cao hơn trung bình ngành ngân hàng hiện tại (P/E~8.5x, P/B~1.4x). Tuy vậy P/B hiện tại thấp hơn nhiều đỉnh lịch sử ~4.1x (đầu 2022) — không phải mức đắt cực đoan trong lịch sử chính cổ phiếu.']);
rows.push(['Khuyến nghị: VCB phù hợp nhà đầu tư ưu tiên CHẤT LƯỢNG DOANH NGHIỆP (good company) hơn là săn giá rẻ tuyệt đối (deep value) — nên theo dõi thêm diễn biến pha loãng cổ phần (đợt phát hành 2026) và biến động P/B về vùng thấp hơn (ví dụ <1.5x lịch sử từng chạm) trước khi giải ngân lớn theo triết lý margin of safety cổ điển Graham. Đây là quan điểm phân tích dựa trên số liệu thu thập, KHÔNG phải khuyến nghị mua/bán chính thức.']);
rows.push([]);
rows.push(['Câu hỏi mở / hạn chế dữ liệu:']);
rows.push(['- Chưa verify được % sở hữu chính xác hiện tại của SBV và Mizuho Bank (cần Báo cáo quản trị công ty mới nhất).']);
rows.push(['- Chưa verify được lịch sử chi trả cổ tức chi tiết từng năm (không có trong template cafef).']);
rows.push(['- NPL và CAR không có trong BCTC cơ bản cafef — cần Báo cáo thường niên/Thuyết minh BCTC kiểm toán để đánh giá đầy đủ tiêu chí Graham #2 và #8.']);
rows.push(['- Liquidity 1-ngày (24/08/2026) trả về 0 từ nguồn vietstock — nghi ngờ độ trễ dữ liệu nguồn, đã dùng số 7 ngày/1 tháng/6 tháng thay thế, xem \'Định giá - VCB\'.']);

async function main() {
  const auth = new google.auth.GoogleAuth({ keyFile: KEY_PATH, scopes: ['https://www.googleapis.com/auth/spreadsheets'] });
  const sheets = google.sheets({ version: 'v4', auth });
  const meta = await sheets.spreadsheets.get({ spreadsheetId: ssid });
  const s = meta.data.sheets.find(x => x.properties.title === target);
  const sheetId = s.properties.sheetId;

  // reset format across the range first (fields:'*') then write values
  const rowCount = Math.max(rows.length + 5, 100);
  await sheets.spreadsheets.batchUpdate({ spreadsheetId: ssid, requestBody: { requests: [
    { updateCells: { range: { sheetId, startRowIndex: 0, endRowIndex: rowCount, startColumnIndex: 0, endColumnIndex: 8 }, fields: '*' } },
  ] } });

  await sheets.spreadsheets.values.update({ spreadsheetId: ssid, range: `'${target}'!A1`, valueInputOption: 'USER_ENTERED', requestBody: { values: rows } });

  await sheets.spreadsheets.batchUpdate({ spreadsheetId: ssid, requestBody: { requests: [
    { updateDimensionProperties: { range: { sheetId, dimension: 'COLUMNS', startIndex: 0, endIndex: 1 }, properties: { pixelSize: 320 }, fields: 'pixelSize' } },
    { updateDimensionProperties: { range: { sheetId, dimension: 'COLUMNS', startIndex: 1, endIndex: 6 }, properties: { pixelSize: 200 }, fields: 'pixelSize' } },
    { repeatCell: { range: { sheetId }, cell: { userEnteredFormat: { wrapStrategy: 'WRAP', verticalAlignment: 'TOP' } }, fields: 'userEnteredFormat.wrapStrategy,userEnteredFormat.verticalAlignment' } },
    { repeatCell: { range: { sheetId, startRowIndex: 0, endRowIndex: 1 }, cell: { userEnteredFormat: { textFormat: { bold: true, fontSize: 13 } } }, fields: 'userEnteredFormat.textFormat' } },
  ] } });

  console.log(JSON.stringify({ success: true, target, sheetId, totalRows: rows.length }));
}
main().catch(e => { console.error(e.message || e); process.exit(1); });
