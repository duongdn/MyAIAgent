#!/usr/bin/env node
const { google } = require('googleapis');
const ssid = '1Yg_fgDeseqP8diMNvRIlmfzdPykd6qnDMlxMt_nysH8';
const target = 'Định tính - VPB';
const KEY_PATH = '/home/nus/projects/My-AI-Agent/config/daily-agent-490610-7eb7985b33e3.json';

const rows = [];
rows.push(['', 'THE INTELLIGENT INVESTOR - HỌC VIỆN AYP']);
rows.push(['', 'Follow up 2 - Company Research - Nghiên cứu doanh nghiệp']);
rows.push([]);
rows.push(['', 'Good Company - Định tính', 'Ngân hàng TMCP Việt Nam Thịnh Vượng (VPB - VPBank)']);
rows.push(['I', 'Ngành']);
rows.push(['1', 'Đặc thù ngành\n(yếu tố quan trọng)',
`VPB hoạt động ngành NGÂN HÀNG THƯƠNG MẠI — kinh doanh chênh lệch lãi suất huy động/cho vay (NIM), thu phí dịch vụ, kinh doanh chứng khoán đầu tư. Chịu quản lý chặt bởi NHNN (room tín dụng, CAR, dự trữ bắt buộc). ĐIỂM KHÁC BIỆT LỚN NHẤT của VPB so các NHTM cùng nhóm: sở hữu FE CREDIT (Công ty Tài chính TNHH MTV Ngân hàng Việt Nam Thịnh Vượng) — công ty tài chính tiêu dùng tín chấp, một trong những đơn vị dẫn đầu thị trường tài chính tiêu dùng VN. Mảng cho vay tiêu dùng tín chấp có rủi ro tín dụng cao hơn hẳn cho vay ngân hàng thương mại truyền thống (không tài sản đảm bảo, khách hàng thu nhập thấp/trung bình) — đây là yếu tố cấu trúc chính lý giải NPL hợp nhất của VPB cao hơn rõ rệt so các NHTM quốc doanh/tư nhân không có mảng tài chính tiêu dùng lớn tương tự.
(Nguồn: BCTC hợp nhất VPB (cấu trúc công ty con thể hiện qua thuyết minh hợp nhất), Vietstock https://finance.vietstock.vn/VPB-ngan-hang-tmcp-viet-nam-thinh-vuong.htm, Simplize https://simplize.vn/co-phieu/VPB — truy cập 25/08/2026)`]);
rows.push(['2', 'Triển vọng ngành',
`VPB là 1 trong nhóm NHTM tư nhân lớn nhất VN theo vốn hóa (~209.058 tỷ đồng tại 25/08/2026), nằm trong VN30. Tổng tài sản 2025 (hợp nhất, sheet VPB) = 1.260.150 tỷ đồng, tăng mạnh so 2024 (923.848 tỷ, +36%). VPB dẫn đầu nhóm ngân hàng so sánh (VCB/BID/CTG/MBB/ACB) về tỷ suất cổ tức tiền mặt/mệnh giá công bố — 10,55% (nguồn workbook so sánh ngành, truy cập 25/08/2026) — chính sách cổ tức tiền mặt cao là điểm hấp dẫn với NĐT thu nhập. Tuy nhiên ROE các nguồn khác nhau cho kết quả khác biệt (9,22% theo 1 khối dữ liệu, 15,6% theo khối khác trong cùng workbook so sánh ngành — CẦN VERIFY nguồn/kỳ tính chính xác trước khi dùng số tuyệt đối, xem thêm sheet Định lượng cho ROE tính trực tiếp từ BCTC cafef).
(Nguồn: Simplize/Vietstock/workbook so sánh ngành — truy cập 25/08/2026)`]);
rows.push(['3', 'Rủi ro ngành',
`• Rủi ro tín dụng — ĐIỂM YẾU RÕ RỆT NHẤT của VPB so peer: NPL hợp nhất 2025 ~3,3-3,5% (2 nguồn: Summary workbook so sánh ngành = 3,3%; tab VPB riêng theo năm = 3,5%) — cao hơn ĐÁNG KỂ so VCB (~0,58%), và cao hơn rõ rệt nhóm BID/CTG/MBB/ACB (0,4%-1,9% theo ghi chú task). NPL từng lên đến 5,1-5,7% giai đoạn 2022-2023 (hậu Covid, khủng hoảng thị trường BĐS/trái phiếu DN ảnh hưởng khách hàng tài chính tiêu dùng FE Credit) trước khi cải thiện về 1,9% (2024) rồi lại tăng lên 3,5% (2025) — biến động NPL LỚN qua các năm phản ánh rủi ro chu kỳ cao hơn peer thuần ngân hàng thương mại, đặc thù mảng tài chính tiêu dùng FE Credit nhạy cảm hơn với chu kỳ kinh tế.
• Tỷ lệ bao phủ nợ xấu (LLC) 2025 ~55-56% (nguồn workbook so sánh ngành) — mức trung bình-thấp so chuẩn "an toàn" thường được xem là >100% ở một số NHTM quốc doanh, nghĩa là bộ đệm dự phòng cho nợ xấu hiện tại mỏng hơn, tăng rủi ro nếu NPL tiếp tục xấu đi.
• Rủi ro thu hẹp NIM chung toàn ngành do cạnh tranh lãi suất huy động + áp lực NHNN hỗ trợ lãi suất cho vay.
• CAR 2025 ~15,5% (nguồn workbook so sánh ngành) — mức khá an toàn, TRÊN ngưỡng tối thiểu Basel II, là điểm tích cực bù lại phần nào rủi ro NPL.
• Rủi ro quy định: room tín dụng NHNN cấp hạn chế tốc độ tăng trưởng cho vay; thay đổi chính sách CAR/Basel III/quy định cho vay tiêu dùng tín chấp (ảnh hưởng trực tiếp FE Credit).
(Nguồn: tổng hợp WebSearch/Simplize/Vietstock — truy cập 25/08/2026; số liệu tài chính từ cafef.vn qua sheet 'VPB', NPL/CAR/LLC từ workbook so sánh ngành 1bAJaaP1nvv06xTNIEWJEidZljhNVJGEaIxHLKjEIvyY tab VPB + Summary)`]);
rows.push([]);
rows.push(['II', 'Mô hình kinh doanh']);
rows.push(['3', 'Các mảng kinh doanh',
`Ngân hàng bán lẻ + bán buôn truyền thống (huy động vốn, cho vay khách hàng cá nhân/doanh nghiệp, kinh doanh chứng khoán đầu tư) CỘNG mảng tài chính tiêu dùng qua công ty con FE CREDIT (cho vay tín chấp không tài sản đảm bảo, khách hàng thu nhập thấp/trung bình, kênh phân phối qua điểm bán lẻ/xe máy/hàng điện tử). Cấu trúc hợp nhất "ngân hàng mẹ + FE Credit" là mô hình kinh doanh khác biệt rõ rệt so các peer thuần ngân hàng thương mại (VCB/BID/CTG) — vừa là động lực tăng trưởng lợi nhuận (NIM tài chính tiêu dùng thường cao hơn ngân hàng truyền thống) vừa là nguồn rủi ro tín dụng tập trung cao hơn.
(Nguồn: cấu trúc hợp nhất VPB theo thuyết minh BCTC + kiến thức phổ biến hệ sinh thái VPBank — CẦN VERIFY chi tiết tỷ lệ sở hữu/đóng góp lợi nhuận FE Credit qua BCTC hợp nhất/Báo cáo thường niên VPB mới nhất)`]);
rows.push(['4', 'Đầu vào — Nguồn vốn huy động',
`Nguồn vốn chính: tiền gửi khách hàng (mã III BCTC), tiền gửi/vay TCTD khác, phát hành giấy tờ có giá, vốn chủ sở hữu. VPBank thành lập 1993, cổ phần hóa/niêm yết HOSE mã VPB từ 2017. Đợt tăng vốn lớn gần đây gắn với thương vụ bán vốn cho SMBC (Sumitomo Mitsui Banking Corporation, Nhật Bản) năm 2023 — đối tác chiến lược nước ngoài sở hữu ~15% vốn điều lệ (CẦN VERIFY tỷ lệ % chính xác qua Báo cáo quản trị mới nhất).
(Nguồn: WebSearch/kiến thức phổ biến thương vụ SMBC-VPBank 2023 — truy cập 25/08/2026, CẦN VERIFY chi tiết)`]);
rows.push(['5', 'Đầu ra — Sản phẩm/Dịch vụ',
`Cho vay khách hàng ngân hàng mẹ (mã VI BCTC — hạng mục tài sản lớn nhất), dịch vụ thanh toán, thẻ tín dụng/ghi nợ, ngân hàng số; qua FE Credit: cho vay tiêu dùng tín chấp (mua trả góp xe máy/điện máy, vay tiền mặt tín chấp), thẻ tín dụng tiêu dùng.
(Nguồn: suy luận từ cơ cấu BCTC + WebSearch — truy cập 25/08/2026)`]);
rows.push(['6', 'Đầu ra — Thị trường',
`Mạng lưới chi nhánh/PGD ngân hàng mẹ phủ rộng toàn quốc; FE Credit có mạng lưới điểm giới thiệu dịch vụ (POS) rất rộng qua đối tác bán lẻ (cửa hàng điện máy, đại lý xe máy...) tiếp cận phân khúc khách hàng đại chúng chưa/khó tiếp cận tín dụng ngân hàng truyền thống.
(Nguồn: WebSearch/kiến thức phổ biến — truy cập 25/08/2026)`]);
rows.push([]);
rows.push(['III', 'Ban lãnh đạo & Cổ đông']);
rows.push(['7', 'Cổ đông lớn',
`Nhóm cổ đông lớn gồm gia đình/nhóm sáng lập-Chủ tịch HĐQT (Ngô Chí Dũng) và đối tác chiến lược nước ngoài SMBC (Nhật Bản, ~15% theo thương vụ 2023). KHÔNG có số liệu % sở hữu cập nhật chính xác từng cổ đông trong phạm vi truy cập nghiên cứu này — CẦN VERIFY qua Báo cáo quản trị công ty/Nghị quyết ĐHCĐ mới nhất.
(Nguồn: kiến thức phổ biến về cơ cấu sở hữu VPBank — CẦN VERIFY số liệu % chính xác)`]);
rows.push(['8', 'Rủi ro quản trị',
`Là NHTM tư nhân với chiến lược tăng trưởng qua M&A/mở rộng mảng tài chính tiêu dùng rủi ro cao hơn (FE Credit) — mô hình này có thể mang lại ROE/NIM tốt hơn trong chu kỳ thuận lợi nhưng khuếch đại biến động lợi nhuận và NPL trong chu kỳ xấu (đã thể hiện rõ qua biến động NPL 1,9%-5,7% giai đoạn 2022-2025). Cần theo dõi sát diễn biến NPL/chi phí dự phòng các quý tới.
(Nguồn: nhận định chung dựa trên số liệu Định lượng - VPB — truy cập 25/08/2026)`]);
rows.push([]);
rows.push(['IV', 'Kết luận định tính',
`VPB là NHTM tư nhân lớn với đặc thù riêng biệt trong nhóm so sánh: sở hữu FE Credit (tài chính tiêu dùng) tạo ra CĂNG THẲNG rõ rệt giữa (1) cổ tức tiền mặt CAO NHẤT nhóm so sánh (10,55%) — điểm hấp dẫn cho NĐT thu nhập, và (2) chất lượng tài sản (NPL ~3,3-3,5%) YẾU HƠN peer thuần ngân hàng thương mại (VCB/BID/CTG/MBB/ACB: 0,4%-1,9%) — rủi ro tín dụng thực sự cần cân nhắc, không chỉ là con số bề mặt. CAR 15,5% là điểm tích cực bù đắp phần nào (đủ đệm vốn theo quy định), nhưng LLC ~55-56% (bộ đệm dự phòng) ở mức trung bình-thấp nghĩa là dư địa hấp thụ thêm cú sốc tín dụng không lớn. Định giá P/E ~7,0x/P/B ~1,17x THẤP hơn trung bình 5 peer (xem sheet Định giá) — thị trường dường như đã một phần phản ánh (chiết khấu) rủi ro NPL cao hơn vào giá, không phải "miễn phí bỏ qua rủi ro". Phù hợp nhà đầu tư CHẤP NHẬN rủi ro tín dụng cao hơn để đổi lấy cổ tức tiền mặt hấp dẫn và định giá tương đối rẻ hơn peer — KHÔNG phù hợp nhà đầu tư ưu tiên tuyệt đối an toàn tài sản như nhóm NHTM quốc doanh.`]);

async function main() {
  const auth = new google.auth.GoogleAuth({ keyFile: KEY_PATH, scopes: ['https://www.googleapis.com/auth/spreadsheets'] });
  const sheets = google.sheets({ version: 'v4', auth });
  const meta = await sheets.spreadsheets.get({ spreadsheetId: ssid });
  let s = meta.data.sheets.find(x => x.properties.title === target);
  if (s) {
    await sheets.spreadsheets.batchUpdate({ spreadsheetId: ssid, requestBody: { requests: [{ deleteSheet: { sheetId: s.properties.sheetId } }] } });
  }
  await sheets.spreadsheets.batchUpdate({ spreadsheetId: ssid, requestBody: { requests: [{ addSheet: { properties: { title: target, index: 2 } } }] } });
  const meta2 = await sheets.spreadsheets.get({ spreadsheetId: ssid });
  s = meta2.data.sheets.find(x => x.properties.title === target);
  const sheetId = s.properties.sheetId;
  await sheets.spreadsheets.values.update({ spreadsheetId: ssid, range: `'${target}'!A1`, valueInputOption: 'USER_ENTERED', requestBody: { values: rows } });
  await sheets.spreadsheets.batchUpdate({ spreadsheetId: ssid, requestBody: { requests: [
    { updateSheetProperties: { properties: { sheetId, gridProperties: { rowCount: rows.length + 10, columnCount: 6 } }, fields: 'gridProperties(rowCount,columnCount)' } },
    { updateDimensionProperties: { range: { sheetId, dimension: 'COLUMNS', startIndex: 0, endIndex: 1 }, properties: { pixelSize: 40 }, fields: 'pixelSize' } },
    { updateDimensionProperties: { range: { sheetId, dimension: 'COLUMNS', startIndex: 1, endIndex: 2 }, properties: { pixelSize: 260 }, fields: 'pixelSize' } },
    { updateDimensionProperties: { range: { sheetId, dimension: 'COLUMNS', startIndex: 2, endIndex: 3 }, properties: { pixelSize: 700 }, fields: 'pixelSize' } },
    { repeatCell: { range: { sheetId }, cell: { userEnteredFormat: { wrapStrategy: 'WRAP', verticalAlignment: 'TOP' } }, fields: 'userEnteredFormat.wrapStrategy,userEnteredFormat.verticalAlignment' } },
  ] } });
  console.log(JSON.stringify({ success: true, target, sheetId, rows: rows.length }));
}
main().catch(e => { console.error(e.message || e); process.exit(1); });
