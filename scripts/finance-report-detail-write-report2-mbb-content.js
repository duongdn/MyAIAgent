#!/usr/bin/env node
const { google } = require('googleapis');
const KEY_PATH = '/home/nus/projects/My-AI-Agent/config/daily-agent-490610-7eb7985b33e3.json';
const ssid = '1UtAH3Bq5LYzJmqMQiFxOtODrMLjswiayc80-slGhvRg';
const target = 'Báo cáo 2 - MBB';

const rows = [];
rows.push(['BÁO CÁO 2 — PHÂN TÍCH MBB (NGÂN HÀNG TMCP QUÂN ĐỘI, HOSE: MBB) THEO PHƯƠNG PHÁP GOOD COMPANY / CHEAP PRICE']);
rows.push(["Phân tích MBB theo phương pháp Good Company / Cheap Price (Học viện AYP, THE INTELLIGENT INVESTOR). Số liệu lấy từ sheet 'MBB', 'Định giá - MBB', 'Định tính - MBB', 'Định lượng - MBB', 'Benjamin Graham - MBB' trong file này. Ghi ngày truy cập số liệu live: 25/08/2026."]);
rows.push([]);
rows.push(['BƯỚC 1 — ĐỊNH TÍNH: HIỂU DOANH NGHIỆP TRƯỚC KHI NHÌN SỐ']);
rows.push(['Tóm tắt (chi tiết đầy đủ xem sheet \'Định tính - MBB\'):']);
rows.push(['MBB là ngân hàng TMCP gốc quân đội (thành lập 1994), niêm yết HOSE từ 2011, vốn hóa ~208.926 tỷ đồng (25/08/2026), thuộc VN30. ROE 2025 = 21,57% — thuộc nhóm cao nhất ngành ngân hàng niêm yết. Mô hình: huy động tiền gửi + cho vay (NII), hệ sinh thái công ty con đa dạng (MCredit, MBS, MB Ageas Life, MIC, MBCapital, MBAMC, và mới nhất MBV — nguyên OceanBank nhận chuyển giao bắt buộc 2025). Cổ đông lớn có gốc quân đội/nhà nước (Viettel, Tổng Công ty Trực thăng VN, Tổng Công ty Tân Cảng Sài Gòn...), không có cổ đông chi phối tuyệt đối. Rủi ro chính: NIM thu hẹp theo xu hướng ngành (3,87% năm 2025), rủi ro tích hợp MBV mới nhận chuyển giao.']);
rows.push([]);
rows.push(['BƯỚC 2.1 — ĐỌC BÁO CÁO TÀI CHÍNH (sheet \'MBB\', đơn vị tỷ đồng)']);
rows.push(['A. Bảng cân đối kế toán (bank structure)']);
rows.push(['Năm', 'Tổng tài sản', 'Vốn chủ sở hữu', 'Tổng nợ phải trả', 'VCSH/Tổng TS']);
const years = ['2012','2014','2016','2017','2018','2019','2020','2021','2022','2023','2024','2025'];
const cols = ['B','C','D','E','F','G','H','I','J','K','L','M'];
years.forEach((y, i) => {
  const c = cols[i];
  rows.push([y, `='MBB'!${c}48`, `='MBB'!${c}66`, `=IFERROR('MBB'!${c}48-'MBB'!${c}66,"n/a")`, `=IFERROR('MBB'!${c}66/'MBB'!${c}48,"n/a")`]);
});
rows.push(['Đánh giá 1: Tổng tài sản tăng liên tục 2012-2025 (175.612 → 1.615.764 tỷ đồng, CAGR ~19,4%/năm tính trên 12 mốc năm có dữ liệu, thiếu 2013/2015 do cafef chỉ giữ năm kiểm toán liên tục), VCSH tăng cùng nhịp (12.865 → 142.023 tỷ đồng). Tỷ lệ VCSH/Tổng TS dao động quanh 7,3%-9,7% qua các năm, đạt 8,79% năm 2025 — mức đòn bẩy thông thường của NHTM lớn, tương đương VCB (~9,2%).']);
rows.push([]);
rows.push(['B. Kết quả kinh doanh']);
rows.push(['Năm', 'Thu nhập lãi thuần (NII)', 'LNST', 'Tăng trưởng LNST YoY', 'EPS (đồng/CP)']);
years.forEach((y, i) => {
  const c = cols[i];
  const prevIdx = i - 1;
  const growthFormula = prevIdx >= 0 ? `=IFERROR('MBB'!${c}116/'MBB'!${cols[prevIdx]}116-1,"n/a")` : 'n/a (năm đầu)';
  rows.push([y, `='MBB'!${c}96`, `='MBB'!${c}116`, growthFormula, `='MBB'!${c}119`]);
});
rows.push(['Đánh giá 2: LNST dương liên tục toàn bộ 12 năm dữ liệu, tăng từ 2.325 tỷ đồng (2012) lên 27.383 tỷ đồng (2025) — CAGR LNST ~22,3%/năm (tính trên khoảng cách 12 mốc năm dữ liệu) — tăng trưởng nhanh, không có năm lỗ. EPS 2025 (3.325đ) THẤP HƠN đỉnh gần đây 2023 (3.966đ) dù LNST tuyệt đối vẫn tăng — do số CP lưu hành tăng qua các đợt phát hành/cổ tức cổ phiếu. Lưu ý: dòng EPS 2018 trong nguồn cafef có giá trị bất thường ("3" — nghi ngờ lỗi dữ liệu nguồn cafef, không dùng làm mốc so sánh, xem \'Benjamin Graham - MBB\' tiêu chí 5).']);
rows.push([]);
rows.push(['C. Lưu chuyển tiền tệ']);
rows.push(['Ghi chú: MBB (bank) không có cấu trúc "CFO/CFI/CFF" điển hình như doanh nghiệp phi tài chính do bản chất tiền gửi/cho vay chiếm phần lớn dòng tiền hoạt động cốt lõi — số liệu chi tiết đầy đủ tại sheet \'MBB\' phần Lưu chuyển tiền tệ, không tổng hợp lại ở đây để tránh diễn giải sai bản chất ngân hàng.']);
rows.push([]);
rows.push(['BƯỚC 2.2 — XÁC TÍN BẰNG CHỈ SỐ TÀI CHÍNH (bank ratios, xem \'Định lượng - MBB\')']);
rows.push(['Nhóm chỉ số', '2025', 'Nhận xét']);
rows.push(['CAGR Tổng tài sản (2012-2025, 12 mốc năm)', '=(B21/B10)^(1/11)-1', '~19,4%/năm — B10=Tổng TS 2012, B21=Tổng TS 2025 (bảng cân đối trên, 11 khoảng cách giữa 12 mốc năm)']);
rows.push(['CAGR VCSH (2012-2025)', '=(C21/C10)^(1/11)-1', '~21,7%/năm']);
rows.push(['CAGR LNST (2012-2025)', '=(C36/C25)^(1/11)-1', '~22,3%/năm — VCSH và LNST tăng nhanh gần tương đương Tổng tài sản → hiệu quả sinh lời/CP vốn duy trì ổn định ở mức cao']);
rows.push(["ROE (LNST/VCSH cuối năm 2025)", "='Định lượng - MBB'!M172", 'xem sheet Định lượng - MBB; tham chiếu ngoài đạt 21,57% theo simplize.vn 25/08/2026']);
rows.push(["ROA (LNST/Tổng TS cuối năm 2025)", "='Định lượng - MBB'!M173", '']);
rows.push(['CIR (Chi phí HĐ/Tổng thu nhập HĐ, 2025)', "='Định lượng - MBB'!M174", '']);
rows.push(['NIM proxy (NII/Tổng TS, 2025)', "='Định lượng - MBB'!M175", 'PROXY — NIM chính thức theo simplize.vn = 3,87% (2025, giảm 0,21 điểm % YoY)']);
rows.push(['NPL (Tỷ lệ nợ xấu, 2025)', "='Định lượng - MBB'!M176", 'nguồn workbook so sánh ngành, xem Định lượng - MBB']);
rows.push(['CAR (Hệ số an toàn vốn, 2025)', "='Định lượng - MBB'!M177", 'nguồn workbook so sánh ngành, xem Định lượng - MBB']);
rows.push(['Đánh giá 3: MBB tăng trưởng quy mô ~20%/năm liên tục 12 năm, ROE thuộc nhóm dẫn đầu ngành ngân hàng niêm yết VN (21,57%, số liệu chính xác xem sheet Định lượng). NPL 2025 = 1,3% (Q2/2026 tăng nhẹ lên 1,4%) và CAR 2025 = 11,8% — trong ngưỡng an toàn theo quy định NHNN. Chất lượng tài sản và hiệu quả sinh lời đều ở mức tốt so peer.']);
rows.push([]);
rows.push(['GIÁ CẢ — ĐỊNH GIÁ HIỆN TẠI (25/08/2026, xem \'Định giá - MBB\')']);
rows.push(['Chỉ tiêu', 'Giá trị (live)']);
rows.push(['Thị giá (đồng/CP)', "='Định giá - MBB'!B5"]);
rows.push(['EPS (đồng/CP)', "='Định giá - MBB'!B6"]);
rows.push(['BVPS (đồng/CP)', "='Định giá - MBB'!B7"]);
rows.push(['Vốn hóa (tỷ đồng)', "='Định giá - MBB'!B8"]);
rows.push(['P/E (lần)', "='Định giá - MBB'!B9"]);
rows.push(['P/B (lần)', "='Định giá - MBB'!B10"]);
rows.push(['So sánh ngành', 'P/E MBB (~6,95x) và P/B (~1,40x) THẤP HƠN trung bình 4 peer lớn (VCB/BID/CTG/ACB, P/E trung bình ~8,8x, P/B trung bình ~1,51x, nguồn simplize.vn 25/08/2026) — định giá tương đối rẻ so peer trong khi ROE ở nhóm cao nhất ngành, xem chi tiết \'Định giá - MBB\'.']);
rows.push([]);
rows.push(['BƯỚC 2.3 — BENJAMIN GRAHAM 10 TIÊU CHÍ (xem chi tiết \'Benjamin Graham - MBB\')']);
rows.push(['Kết quả: ĐẠT 6/10 (quy mô lớn, lợi nhuận ổn định 12 năm liên tục, tăng trưởng EPS ~95% giai đoạn 2016-2025, P/E ≤9x lý tưởng, P/E×P/B ≤22,5, không có năm lỗ/biến động cực đoan) | ĐẠT sát cận 1/10 (P/B nằm trong ngưỡng 1,2-1,5x nhưng sát cận trên) | N/A NGÀNH 2/10 (current ratio, nợ dài hạn/vốn lưu động ròng — không áp dụng bản chất ngân hàng) | CẦN VERIFY 1/10 (lịch sử cổ tức chi tiết). Kết quả tốt hơn đáng kể so VCB (build trước, ĐẠT 4/10).']);
rows.push([]);
rows.push(['KẾT LUẬN CHUNG — ĐẦU TƯ']);
rows.push(['GOOD COMPANY: ĐẠT — MBB là ngân hàng có ROE thuộc nhóm cao nhất ngành (21,57%), tăng trưởng quy mô ~20%/năm liên tục 12 năm, hệ sinh thái tài chính đa dạng (MCredit/MBS/MB Ageas Life/MIC), chất lượng tài sản tốt (NPL 1,3-1,4%, CAR 11,8%). Rủi ro cần theo dõi: NIM thu hẹp theo xu hướng ngành, tích hợp MBV (nguyên OceanBank) mới nhận chuyển giao 2025.']);
rows.push(['CHEAP PRICE: ĐẠT theo tiêu chí Graham — P/E ~6,95x và P/B ~1,40x đều nằm trong/dưới ngưỡng lý tưởng Graham (P/E≤9x, P/B≤1,5x), và thấp hơn trung bình 4 peer lớn ngành ngân hàng (P/E~8,8x, P/B~1,51x). Kết hợp ROE cao + định giá thấp hơn peer là điểm hấp dẫn nổi bật so với VCB (P/E~11,9x, P/B~2,0x, cao hơn ngưỡng Graham).']);
rows.push(['Khuyến nghị: MBB đáp ứng cả hai tiêu chí Good Company và Cheap Price theo khung phân tích Graham — hồ sơ đầu tư hấp dẫn hơn VCB trong nhóm ngân hàng đã phân tích. Rủi ro cần theo dõi thêm: (1) tác động tích hợp MBV lên chất lượng tài sản/lợi nhuận hợp nhất các kỳ tới, (2) xu hướng NIM tiếp tục thu hẹp, (3) chưa verify % sở hữu cổ đông lớn và lịch sử cổ tức chi tiết. Đây là quan điểm phân tích dựa trên số liệu thu thập, KHÔNG phải khuyến nghị mua/bán chính thức.']);
rows.push([]);
rows.push(['Câu hỏi mở / hạn chế dữ liệu:']);
rows.push(['- Chưa verify được % sở hữu chính xác hiện tại của nhóm cổ đông lớn gốc quân đội/nhà nước (Viettel, Tổng Công ty Trực thăng VN, Tổng Công ty Tân Cảng Sài Gòn...) — cần Báo cáo quản trị công ty mới nhất.']);
rows.push(['- Chưa verify được lịch sử chi trả cổ tức chi tiết từng năm (không có trong template cafef).']);
rows.push(['- Dòng EPS 2018 trong nguồn cafef.vn có giá trị bất thường ("3" đồng/CP) — nghi ngờ lỗi dữ liệu nguồn, không dùng làm mốc so sánh, không tự sửa/suy đoán số đúng.']);
rows.push(['- CAR quý mới nhất không có trong workbook so sánh ngành sử dụng (chỉ có theo năm đến 2025) — cần Báo cáo thường niên/Basel disclosure riêng nếu cần số liệu quý.']);
rows.push(['- Tác động tài chính cụ thể của việc nhận chuyển giao bắt buộc MBV (nguyên OceanBank) lên BCTC hợp nhất MB chưa được verify chi tiết trong phạm vi nghiên cứu này — cần BCTC hợp nhất kỳ gần nhất.']);

async function main() {
  const auth = new google.auth.GoogleAuth({ keyFile: KEY_PATH, scopes: ['https://www.googleapis.com/auth/spreadsheets'] });
  const sheets = google.sheets({ version: 'v4', auth });
  const meta = await sheets.spreadsheets.get({ spreadsheetId: ssid });
  const s = meta.data.sheets.find(x => x.properties.title === target);
  const sheetId = s.properties.sheetId;

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
