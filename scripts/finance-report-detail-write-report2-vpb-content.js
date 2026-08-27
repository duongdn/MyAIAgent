#!/usr/bin/env node
const { google } = require('googleapis');
const KEY_PATH = '/home/nus/projects/My-AI-Agent/config/daily-agent-490610-7eb7985b33e3.json';
const ssid = '1Yg_fgDeseqP8diMNvRIlmfzdPykd6qnDMlxMt_nysH8';
const target = 'Báo cáo 2 - VPB';

const rows = [];
rows.push(['BÁO CÁO 2 — PHÂN TÍCH VPB (NGÂN HÀNG TMCP VIỆT NAM THỊNH VƯỢNG, HOSE: VPB) THEO PHƯƠNG PHÁP GOOD COMPANY / CHEAP PRICE']);
rows.push(["Phân tích VPB theo phương pháp Good Company / Cheap Price (Học viện AYP, THE INTELLIGENT INVESTOR). Số liệu lấy từ sheet 'VPB', 'Định giá - VPB', 'Định tính - VPB', 'Định lượng - VPB', 'Benjamin Graham - VPB' trong file này. Ghi ngày truy cập số liệu live: 25/08/2026."]);
rows.push([]);
rows.push(['BƯỚC 1 — ĐỊNH TÍNH: HIỂU DOANH NGHIỆP TRƯỚC KHI NHÌN SỐ']);
rows.push(["Tóm tắt (chi tiết đầy đủ xem sheet 'Định tính - VPB'):"]);
rows.push(['VPB là NHTM tư nhân lớn (niêm yết HOSE từ 2017, thành lập 1993), vốn hóa ~209.058 tỷ đồng (25/08/2026), thuộc VN30. ĐIỂM ĐẶC THÙ: sở hữu FE Credit — công ty tài chính tiêu dùng tín chấp dẫn đầu thị trường, mảng kinh doanh rủi ro tín dụng cao hơn ngân hàng thương mại truyền thống. VPB dẫn đầu nhóm 5 peer so sánh (VCB/BID/CTG/MBB/ACB) về tỷ suất cổ tức tiền mặt công bố (10,55%), nhưng NPL hợp nhất (~3,3-3,5% năm 2025) cũng CAO HƠN ĐÁNG KỂ so peer (0,4%-1,9%) — sự kết hợp cổ tức cao/NPL cao là căng thẳng cốt lõi cần cân nhắc khi đầu tư. CAR 15,5% khá an toàn (đệm vốn dày hơn peer nhờ đợt tăng vốn SMBC 2023), nhưng LLC (bao phủ nợ xấu) ~55-56% ở mức trung bình-thấp.']);
rows.push([]);
rows.push(["BƯỚC 2.1 — ĐỌC BÁO CÁO TÀI CHÍNH (sheet 'VPB', đơn vị tỷ đồng)"]);
rows.push(['A. Bảng cân đối kế toán (bank structure)']);
rows.push(['Năm', 'Tổng tài sản', 'Vốn chủ sở hữu', 'Tổng nợ phải trả', 'VCSH/Tổng TS']);
const years = ['2011','2012','2013','2014','2015','2016','2017','2018','2019','2020','2021','2022','2023','2024','2025'];
const cols = ['B','C','D','E','F','G','H','I','J','K','L','M','N','O','P'];
years.forEach((y, i) => {
  const c = cols[i];
  rows.push([y, `='VPB'!${c}48`, `='VPB'!${c}66`, `=IFERROR('VPB'!${c}48-'VPB'!${c}66,"n/a")`, `=IFERROR('VPB'!${c}66/'VPB'!${c}48,"n/a")`]);
});
const balRowStart = 11; // row index (1-based) where year 2011 row lands, computed below precisely in main()
rows.push(['Đánh giá 1: Tổng tài sản tăng liên tục 2011-2025 (82.818 → 1.260.150 tỷ đồng, CAGR ~21,2%/năm trên 14 khoảng cách năm), VCSH tăng nhanh hơn (5.996 → 180.276 tỷ đồng, CAGR ~26,7%/năm) — tỷ lệ VCSH/Tổng TS tăng từ ~7,2% (2011) lên 14,3% (2025), CAO HƠN mức thông thường của NHTM lớn (VCB/MBB ~9%), phản ánh các đợt tăng vốn mạnh gần đây (gồm thương vụ bán vốn cho SMBC năm 2023) — điểm tích cực về đệm vốn/an toàn tài chính.']);
rows.push([]);
rows.push(['B. Kết quả kinh doanh']);
rows.push(['Năm', 'Thu nhập lãi thuần (NII)', 'LNST', 'Tăng trưởng LNST YoY', 'EPS (đồng/CP)']);
years.forEach((y, i) => {
  const c = cols[i];
  const prevIdx = i - 1;
  const growthFormula = prevIdx >= 0 ? `=IFERROR('VPB'!${c}116/'VPB'!${cols[prevIdx]}116-1,"n/a")` : 'n/a (năm đầu)';
  rows.push([y, `='VPB'!${c}96`, `='VPB'!${c}116`, growthFormula, `='VPB'!${c}119`]);
});
rows.push(['Đánh giá 2: LNST dương liên tục toàn bộ 15 năm dữ liệu (800 → 24.355 tỷ đồng), NHƯNG biến động NĂM QUA NĂM lớn hơn hẳn peer thuần ngân hàng thương mại — VD LNST giảm ~50% từ 2022 (16.909 tỷ) xuống 2023 (8.494 tỷ), trùng giai đoạn NPL tăng vọt 4,5%→5,7%→5,1% (2021-2023, xem sheet Định lượng). EPS 2025 (3.024đ) THẤP HƠN đỉnh 2016-2017 (4.485-4.564đ) — tăng trưởng EPS 10 năm ÂM ~32,6% (2016→2025), KHÔNG ĐẠT tiêu chí Graham (xem Benjamin Graham - VPB tiêu chí 5). Đây là khác biệt tiêu cực rõ rệt so với VCB/MBB/CTG (đã build trước, đều ĐẠT tiêu chí tăng trưởng EPS).']);
rows.push([]);
rows.push(['C. Lưu chuyển tiền tệ']);
rows.push(["Ghi chú: VPB (bank) không có cấu trúc \"CFO/CFI/CFF\" điển hình như doanh nghiệp phi tài chính do bản chất tiền gửi/cho vay chiếm phần lớn dòng tiền hoạt động cốt lõi — số liệu chi tiết đầy đủ tại sheet 'VPB' phần Lưu chuyển tiền tệ, không tổng hợp lại ở đây để tránh diễn giải sai bản chất ngân hàng."]);
rows.push([]);
rows.push(["BƯỚC 2.2 — XÁC TÍN BẰNG CHỈ SỐ TÀI CHÍNH (bank ratios, xem 'Định lượng - VPB')"]);
rows.push(['Nhóm chỉ số', '2025', 'Nhận xét']);
// balance table starts at row 11 (1-indexed) header row 'Năm...' is row 11, first data row (2011) is row 12
// Tổng tài sản col B is row 12+0=12 (2011) ... row 26 (2025, index14)
const bsFirstDataRow = 12; // will verify after write
const bsLastDataRow = bsFirstDataRow + years.length - 1; // 26
// KQKD table: header 'Năm...' after 'Đánh giá 1' + blank + 'B. Kết quả...' + header row
// compute exact rows precisely: rows array index (0-based) -> sheet row = index+1
const bsHeaderIdx = rows.findIndex(r => r[0] === 'Năm' && r[1] === 'Tổng tài sản');
const bsFirstRow = bsHeaderIdx + 2; // 1-indexed first data row
const bsLastRow = bsFirstRow + years.length - 1;
const kqkdHeaderIdx = rows.findIndex(r => r[0] === 'Năm' && r[1] === 'Thu nhập lãi thuần (NII)');
const kqkdFirstRow = kqkdHeaderIdx + 2;
const kqkdLastRow = kqkdFirstRow + years.length - 1;
rows.push([`CAGR Tổng tài sản (2011-2025, 15 mốc năm)`, `=(B${bsLastRow}/B${bsFirstRow})^(1/14)-1`, `~21,2%/năm`]);
rows.push([`CAGR VCSH (2011-2025)`, `=(C${bsLastRow}/C${bsFirstRow})^(1/14)-1`, `~26,7%/năm — VCSH tăng nhanh hơn Tổng tài sản, tỷ lệ đòn bẩy giảm dần (an toàn hơn theo thời gian)`]);
rows.push([`CAGR LNST (2011-2025)`, `=(C${kqkdLastRow}/C${kqkdFirstRow})^(1/14)-1`, `~26,1%/năm — CAGR bình quân cao nhưng ẩn sau biến động mạnh giữa các năm (không tăng trưởng đều như VCB/MBB/CTG), xem sheet Định lượng để thấy dao động thực tế theo từng năm`]);
rows.push(["ROE (LNST của CĐ ngân hàng mẹ/VCSH cuối năm 2025)", "='Định lượng - VPB'!P172", 'xem sheet Định lượng - VPB']);
rows.push(["ROA (LNST tổng/Tổng TS cuối năm 2025)", "='Định lượng - VPB'!P173", '']);
rows.push(['CIR (Chi phí HĐ/Tổng thu nhập HĐ, 2025)', "='Định lượng - VPB'!P174", '']);
rows.push(['NIM proxy (NII/Tổng TS, 2025)', "='Định lượng - VPB'!P175", 'PROXY, không phải NIM chính thức — cần tài sản sinh lời bình quân']);
rows.push(['NPL (Tỷ lệ nợ xấu, 2025)', "='Định lượng - VPB'!P176", 'nguồn workbook so sánh ngành, xem Định lượng - VPB — CAO HƠN peer 0,4%-1,9%']);
rows.push(['CAR (Hệ số an toàn vốn, 2025)', "='Định lượng - VPB'!P177", 'nguồn workbook so sánh ngành — 15,5%, trên ngưỡng an toàn Basel II']);
rows.push(['Đánh giá 3: VPB tăng trưởng quy mô nhanh (~21%/năm) nhưng chất lượng lợi nhuận KÉM ỔN ĐỊNH hơn peer thuần ngân hàng thương mại — NPL 2025 (~3,3-3,5%) cao hơn rõ rệt nhóm so sánh (VCB ~0,58%, BID/CTG/MBB/ACB 0,4%-1,9%), phản ánh rủi ro tập trung từ mảng tài chính tiêu dùng FE Credit. Điểm tích cực: CAR 15,5% và tỷ lệ VCSH/Tổng TS 14,3% đều CAO hơn peer, cho đệm vốn dày hơn để hấp thụ cú sốc tín dụng. LLC (bao phủ nợ xấu) ~55-56% ở mức trung bình-thấp — dư địa hấp thụ thêm cú sốc không lớn nếu NPL tiếp tục xấu đi.']);
rows.push([]);
rows.push(["GIÁ CẢ — ĐỊNH GIÁ HIỆN TẠI (25/08/2026, xem 'Định giá - VPB')"]);
rows.push(['Chỉ tiêu', 'Giá trị (live)']);
rows.push(['Thị giá (đồng/CP)', "='Định giá - VPB'!B5"]);
rows.push(['EPS (đồng/CP)', "='Định giá - VPB'!B6"]);
rows.push(['BVPS (đồng/CP)', "='Định giá - VPB'!B7"]);
rows.push(['Vốn hóa (tỷ đồng)', "='Định giá - VPB'!B8"]);
rows.push(['P/E (lần)', "='Định giá - VPB'!B9"]);
rows.push(['P/B (lần)', "='Định giá - VPB'!B10"]);
rows.push(['Tỷ suất cổ tức (tiền mặt/mệnh giá, workbook so sánh ngành)', '10.55%', 'CAO NHẤT trong nhóm 5 peer so sánh — điểm hấp dẫn cho NĐT thu nhập, cần cân nhắc cùng rủi ro NPL']);
rows.push(['So sánh ngành', 'P/E VPB (~7,01x) và P/B (~1,17x) THẤP HƠN trung bình 5 peer lớn (VCB/BID/CTG/MBB/ACB, P/E TB ~8,4x, P/B TB ~1,49x, nguồn simplize.vn 25/08/2026) — RẺ NHẤT nhóm trên cả 2 chỉ số. Đây KHÔNG phải "rẻ miễn phí" — thị trường đang chiết khấu đúng mức rủi ro tín dụng cao hơn (NPL), xem chi tiết \'Định giá - VPB\'.']);
rows.push([]);
rows.push(["BƯỚC 2.3 — BENJAMIN GRAHAM 10 TIÊU CHÍ (xem chi tiết 'Benjamin Graham - VPB')"]);
rows.push(['Kết quả: ĐẠT 5/10 (quy mô lớn, lợi nhuận dương liên tục 15 năm, P/E ≤9x lý tưởng, P/E×P/B ≤22,5, P/B dưới cận dưới khung bảo thủ) | KHÔNG ĐẠT 2/10 (tăng trưởng EPS 10 năm ÂM ~32,6%; biến động LNST vượt ngưỡng ổn định — cả hai phản ánh trực tiếp rủi ro NPL/chu kỳ tín dụng cao hơn peer) | N/A NGÀNH 2/10 (current ratio, nợ dài hạn/vốn lưu động ròng — đệm vốn CAR/VCSH thực tế khá tốt) | CẦN VERIFY 1/10 (lịch sử cổ tức chi tiết). VPB là mã DUY NHẤT trong nhóm đã build (VCB/MBB/CTG) KHÔNG ĐẠT tiêu chí tăng trưởng & ổn định lợi nhuận.']);
rows.push([]);
rows.push(['KẾT LUẬN CHUNG — ĐẦU TƯ']);
rows.push(['GOOD COMPANY: MỘT PHẦN ĐẠT — VPB có quy mô lớn, tăng trưởng tài sản nhanh (~21%/năm), đệm vốn dày (CAR 15,5%, VCSH/TTS 14,3%) và tỷ suất cổ tức cao nhất nhóm peer (10,55%). NHƯNG chất lượng tài sản/lợi nhuận YẾU HƠN peer thuần ngân hàng thương mại — NPL cao (~3,3-3,5%), LLC trung bình-thấp (~55-56%), EPS 10 năm suy giảm, LNST biến động mạnh theo chu kỳ tín dụng (gắn liền rủi ro mảng FE Credit). Đây KHÔNG phải "good company" theo nghĩa ổn định tuyệt đối như VCB/MBB/CTG.']);
rows.push(['CHEAP PRICE: ĐẠT theo tiêu chí Graham thuần định giá — P/E ~7,01x và P/B ~1,17x đều dưới ngưỡng lý tưởng Graham, và THẤP NHẤT trong nhóm 5 peer ngành ngân hàng. Tuy nhiên định giá thấp này PHẢN ÁNH ĐÚNG rủi ro tín dụng cao hơn — không phải cơ hội "miễn phí bỏ qua rủi ro".']);
rows.push(['Khuyến nghị: VPB phù hợp NĐT SẴN SÀNG chấp nhận rủi ro tín dụng/biến động lợi nhuận cao hơn để đổi lấy (1) cổ tức tiền mặt hấp dẫn nhất nhóm peer (10,55%) và (2) định giá rẻ hơn peer trên cả P/E và P/B. KHÔNG phù hợp NĐT ưu tiên tuyệt đối sự ổn định/an toàn tài sản như nhóm NHTM quốc doanh (VCB/BID/CTG). Cần theo dõi sát: (1) diễn biến NPL các quý tới — liệu có tiếp tục xu hướng tăng như 2021-2023 hay ổn định quanh 3,3-3,5%, (2) khả năng duy trì mức cổ tức tiền mặt cao nếu chi phí dự phòng tín dụng tăng, (3) đóng góp lợi nhuận/rủi ro cụ thể của FE Credit trong cơ cấu hợp nhất. Đây là quan điểm phân tích dựa trên số liệu thu thập, KHÔNG phải khuyến nghị mua/bán chính thức.']);
rows.push([]);
rows.push(['Câu hỏi mở / hạn chế dữ liệu:']);
rows.push(['- Dữ liệu quý BCTC (sheet VPB) chỉ đến Q4/2025 — cafef API không trả đủ Q1/2026, Q2/2026 dù xác nhận có tồn tại qua API riêng (đã thử lại 3 lần, vẫn thiếu 2 quý gần nhất). Số liệu năm (2011-2025, 15 năm) đầy đủ và đã verify cân đối kế toán (Tổng TS = Tổng NV mọi năm).']);
rows.push(['- Chưa verify được % sở hữu chính xác hiện tại của nhóm cổ đông lớn (Chủ tịch HĐQT + gia đình sáng lập, SMBC) — cần Báo cáo quản trị công ty mới nhất.']);
rows.push(['- Chưa verify được lịch sử chi trả cổ tức chi tiết từng năm (không có trong template cafef); tỷ suất cổ tức 10,55% và 1,88% đến từ 2 nguồn khác cơ sở tính (mệnh giá vs thị giá) — chưa reconcile đầy đủ.']);
rows.push(['- Đóng góp cụ thể (tỷ trọng tài sản/lợi nhuận/NPL) của FE Credit trong số liệu hợp nhất VPB chưa tách bạch được trong phạm vi nguồn cafef sử dụng — cần thuyết minh BCTC hợp nhất chi tiết hoặc báo cáo thường niên.']);
rows.push(['- ROE hai nguồn khác nhau trong workbook so sánh ngành (9,22% vs 15,6%) chưa reconcile được phương pháp tính — sheet Định lượng - VPB dùng công thức tính trực tiếp từ BCTC cafef (LNST của CĐ NH mẹ/VCSH cuối kỳ) làm số liệu chính thức của báo cáo này.']);

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
    { updateSheetProperties: { properties: { sheetId, gridProperties: { rowCount: rows.length + 5, columnCount: 8 } }, fields: 'gridProperties(rowCount,columnCount)' } },
    { updateDimensionProperties: { range: { sheetId, dimension: 'COLUMNS', startIndex: 0, endIndex: 1 }, properties: { pixelSize: 320 }, fields: 'pixelSize' } },
    { updateDimensionProperties: { range: { sheetId, dimension: 'COLUMNS', startIndex: 1, endIndex: 6 }, properties: { pixelSize: 200 }, fields: 'pixelSize' } },
    { repeatCell: { range: { sheetId }, cell: { userEnteredFormat: { wrapStrategy: 'WRAP', verticalAlignment: 'TOP' } }, fields: 'userEnteredFormat.wrapStrategy,userEnteredFormat.verticalAlignment' } },
    { repeatCell: { range: { sheetId, startRowIndex: 0, endRowIndex: 1 }, cell: { userEnteredFormat: { textFormat: { bold: true, fontSize: 13 } } }, fields: 'userEnteredFormat.textFormat' } },
  ] } });

  console.log(JSON.stringify({ success: true, target, sheetId, totalRows: rows.length, bsFirstRow, bsLastRow, kqkdFirstRow, kqkdLastRow }));
}
main().catch(e => { console.error(e.message || e); process.exit(1); });
