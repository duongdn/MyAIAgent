#!/usr/bin/env node
const { google } = require('googleapis');
const ssid = '1UtAH3Bq5LYzJmqMQiFxOtODrMLjswiayc80-slGhvRg';
const target = 'Định tính - MBB';
const KEY_PATH = '/home/nus/projects/My-AI-Agent/config/daily-agent-490610-7eb7985b33e3.json';

const rows = [];
rows.push(['', 'THE INTELLIGENT INVESTOR - HỌC VIỆN AYP']);
rows.push(['', 'Follow up 2 - Company Research - Nghiên cứu doanh nghiệp']);
rows.push([]);
rows.push(['', 'Good Company - Định tính', 'Ngân hàng TMCP Quân đội (MBB - MB Bank)']);
rows.push(['I', 'Ngành']);
rows.push(['1', 'Đặc thù ngành\n(yếu tố quan trọng)',
`MBB hoạt động ngành NGÂN HÀNG THƯƠNG MẠI — kinh doanh chênh lệch lãi suất huy động/cho vay (NIM), thu phí dịch vụ (thanh toán, bảo hiểm, chứng khoán qua công ty con), kinh doanh ngoại hối/chứng khoán đầu tư. Đặc thù: chịu quản lý chặt bởi NHNN (room tín dụng, CAR, dự trữ bắt buộc); lợi nhuận nhạy với chu kỳ lãi suất, chất lượng tín dụng. MB là ngân hàng có GỐC QUÂN ĐỘI (thành lập 04/11/1994, ban đầu phục vụ doanh nghiệp quân đội), cổ đông lớn gồm các tổ chức thuộc khối quân đội/nhà nước (Viettel, Tổng Công ty Trực thăng Việt Nam, Tổng Công ty Tân Cảng Sài Gòn, Tổng cục Công nghiệp Quốc phòng — tỷ lệ sở hữu chính xác CẦN VERIFY qua Báo cáo quản trị mới nhất, không có số liệu % chi tiết trong phạm vi truy cập nghiên cứu này).
(Nguồn: Vietstock https://finance.vietstock.vn/MBB-ngan-hang-tmcp-quan-doi.htm, Simplize https://simplize.vn/co-phieu/MBB — truy cập 25/08/2026)`]);
rows.push(['2', 'Triển vọng ngành',
`MBB là 1 trong nhóm ngân hàng TMCP tư nhân/bán nhà nước lớn nhất VN theo vốn hóa (~208.926 tỷ đồng tại 25/08/2026), nằm trong VN30. ROE 2025 = 21,57% (giảm nhẹ 0,52 điểm % so 2024) thuộc nhóm cao nhất ngành ngân hàng niêm yết. NIM 2025 = 3,87% (giảm 0,21 điểm %, theo simplize.vn) — xu hướng thu hẹp biên lãi chung toàn ngành do cạnh tranh lãi suất huy động + áp lực NHNN hỗ trợ lãi suất cho vay. Sự kiện đáng chú ý: MB nhận chuyển giao bắt buộc Ngân hàng Đại Dương (OceanBank, sau đổi tên MBV) theo chủ trương NHNN năm 2025 — mở rộng quy mô nhưng cũng là rủi ro tích hợp/xử lý nợ xấu ngân hàng yếu kém tiếp nhận.
(Nguồn: Simplize/Vietstock tổng hợp — truy cập 25/08/2026; sự kiện MBV — kiến thức phổ biến được đưa tin rộng rãi 2025, CẦN VERIFY chi tiết tài chính hợp nhất MBV qua BCTC hợp nhất MB đầy đủ)`]);
rows.push(['3', 'Rủi ro ngành',
`• Rủi ro tín dụng: chất lượng tài sản có thể xấu đi trong chu kỳ kinh tế suy giảm — tỷ lệ nợ xấu (NPL) MBB dao động 0,9%-1,7% giai đoạn 2020-2026 LTM (xem sheet Định lượng), tăng nhẹ các quý gần đây (Q2/2026 NPL=1,4%).
• Rủi ro thu hẹp NIM: NIM giảm từ các năm trước xuống 3,87% (2025) do cạnh tranh lãi suất.
• Rủi ro tích hợp MBV (nguyên OceanBank): ngân hàng 0 đồng chuyển giao bắt buộc — chi phí xử lý nợ xấu/tái cấu trúc có thể ảnh hưởng lợi nhuận hợp nhất ngắn-trung hạn, cần theo dõi thêm qua BCTC hợp nhất các kỳ tới.
• Rủi ro quy định: room tín dụng NHNN cấp hạn chế tốc độ tăng trưởng cho vay; thay đổi chính sách CAR/Basel III.
• Số liệu CAR chi tiết theo quý không có trong nguồn workbook so sánh ngành sử dụng (chỉ có theo năm đến 2025=11,8%) — cần Báo cáo thường niên/Basel disclosure riêng nếu cần số liệu quý mới nhất.
(Nguồn: tổng hợp WebSearch/Simplize/Vietstock — truy cập 25/08/2026; số liệu tài chính từ cafef.vn qua sheet 'MBB', NPL/CAR từ workbook so sánh ngành 1bAJaaP1nvv06xTNIEWJEidZljhNVJGEaIxHLKjEIvyY tab MBB)`]);
rows.push([]);
rows.push(['II', 'Mô hình kinh doanh']);
rows.push(['3', 'Các mảng kinh doanh',
`Ngân hàng bán lẻ + bán buôn (corporate/military-linked banking): huy động vốn, cho vay khách hàng cá nhân/doanh nghiệp, kinh doanh ngoại hối, chứng khoán đầu tư. Có hệ sinh thái công ty con đa dạng theo mô hình "one MB" bao gồm: MCredit (tài chính tiêu dùng, liên doanh với Shinsei Bank Nhật), MBS (MB Securities — chứng khoán), MB Ageas Life (bảo hiểm nhân thọ, liên doanh Ageas/Bỉ), MIC (bảo hiểm phi nhân thọ), MBCapital (quản lý quỹ), MBAMC (quản lý tài sản/xử lý nợ), và mới nhất MBV (nguyên OceanBank, nhận chuyển giao bắt buộc 2025).
(Nguồn: kiến thức phổ biến hệ sinh thái MB Group — CẦN VERIFY chi tiết tỷ lệ sở hữu từng công ty con qua BCTC hợp nhất/Báo cáo thường niên MB mới nhất)`]);
rows.push(['4', 'Đầu vào — Nguồn vốn huy động',
`Nguồn vốn chính: tiền gửi khách hàng (mã 330 BCTC — mục lớn nhất Nguồn vốn), tiền gửi/vay TCTD khác, phát hành giấy tờ có giá, vốn chủ sở hữu. Thành lập 1994 bởi một nhóm sĩ quan quân đội và cựu chiến binh, ban đầu phục vụ nhu cầu tài chính doanh nghiệp quân đội, cổ phần hóa/niêm yết HOSE mã MBB từ 2011.
(Nguồn: WebSearch/Vietstock tổng hợp lịch sử MB — truy cập 25/08/2026)`]);
rows.push(['5', 'Đầu ra — Sản phẩm/Dịch vụ',
`Cho vay khách hàng (mã 160/161 BCTC — hạng mục tài sản lớn nhất), dịch vụ thanh toán, thẻ tín dụng/ghi nợ, bancassurance qua MB Ageas Life, dịch vụ ngân hàng số (App MBBank được đánh giá cao về trải nghiệm số), tài chính tiêu dùng qua MCredit.
(Nguồn: suy luận từ cơ cấu BCTC + WebSearch — truy cập 25/08/2026)`]);
rows.push(['6', 'Đầu ra — Thị trường',
`Mạng lưới 327 chi nhánh/PGD trong nước phủ 33/34 tỉnh thành, 1 chi nhánh tại Lào, 1 công ty tại Campuchia (theo Vietstock). Khách hàng đa dạng từ doanh nghiệp quân đội/nhà nước (gốc lịch sử) mở rộng sang doanh nghiệp tư nhân và khách hàng cá nhân bán lẻ, đẩy mạnh chuyển đổi số.
(Nguồn: Vietstock https://finance.vietstock.vn/MBB-ngan-hang-tmcp-quan-doi.htm — truy cập 25/08/2026)`]);
rows.push([]);
rows.push(['III', 'Ban lãnh đạo & Cổ đông']);
rows.push(['7', 'Cổ đông lớn / Sở hữu quân đội-nhà nước',
`Nhóm cổ đông lớn có gốc quân đội/nhà nước bao gồm Viettel, Tổng Công ty Trực thăng Việt Nam, Tổng Công ty Tân Cảng Sài Gòn, Tổng cục Công nghiệp Quốc phòng — không có cổ đông đơn lẻ chi phối tuyệt đối (khác VCB có SBV sở hữu >70%), nhưng khối quân đội/nhà nước có ảnh hưởng đáng kể qua nhóm cổ đông liên kết. KHÔNG có số liệu % sở hữu chính xác cập nhật trong phạm vi truy cập nghiên cứu này — CẦN VERIFY qua Báo cáo quản trị công ty/Nghị quyết ĐHCĐ mới nhất.
(Nguồn: kiến thức phổ biến về cơ cấu sở hữu MB — CẦN VERIFY số liệu % chính xác)`]);
rows.push(['8', 'Rủi ro quản trị',
`Là NHTM gắn với khối quân đội/nhà nước — có thể có ưu tiên chiến lược khác với tối đa hóa lợi ích cổ đông thiểu số thuần túy trong một số quyết định (ví dụ nhận chuyển giao bắt buộc MBV theo chủ trương NHNN 2025 — quyết định mang tính nghĩa vụ/chính sách hơn thuần túy thương mại). Rủi ro tích hợp/vận hành ngân hàng nhận chuyển giao cần theo dõi các kỳ báo cáo tới.
(Nguồn: nhận định chung — truy cập 25/08/2026)`]);
rows.push([]);
rows.push(['IV', 'Kết luận định tính',
`MBB là ngân hàng TMCP tư nhân/bán quân đội có ROE thuộc nhóm cao nhất ngành (21,57% năm 2025), hệ sinh thái tài chính đa dạng (MCredit/MBS/MB Ageas Life/MIC), business model dễ hiểu (huy động-cho vay + phí dịch vụ đa dạng qua công ty con). Rủi ro chính là NIM thu hẹp theo xu hướng ngành và rủi ro tích hợp MBV (nguyên OceanBank) mới nhận chuyển giao 2025 — cần theo dõi thêm các kỳ báo cáo tới để đánh giá tác động. Phù hợp nhóm "good company" theo tiêu chí ROE cao/tăng trưởng ổn định nhưng ĐỊNH GIÁ cần đối chiếu kỹ ở sheet Định giá trước khi kết luận đầu tư.`]);

async function main() {
  const auth = new google.auth.GoogleAuth({ keyFile: KEY_PATH, scopes: ['https://www.googleapis.com/auth/spreadsheets'] });
  const sheets = google.sheets({ version: 'v4', auth });
  const meta = await sheets.spreadsheets.get({ spreadsheetId: ssid });
  let s = meta.data.sheets.find(x => x.properties.title === target);
  if (!s) {
    await sheets.spreadsheets.batchUpdate({ spreadsheetId: ssid, requestBody: { requests: [{ addSheet: { properties: { title: target, index: 1 } } }] } });
    const meta2 = await sheets.spreadsheets.get({ spreadsheetId: ssid });
    s = meta2.data.sheets.find(x => x.properties.title === target);
  }
  const sheetId = s.properties.sheetId;
  await sheets.spreadsheets.values.clear({ spreadsheetId: ssid, range: `'${target}'!A1:Z200` });
  await sheets.spreadsheets.values.update({ spreadsheetId: ssid, range: `'${target}'!A1`, valueInputOption: 'USER_ENTERED', requestBody: { values: rows } });
  await sheets.spreadsheets.batchUpdate({ spreadsheetId: ssid, requestBody: { requests: [
    { updateDimensionProperties: { range: { sheetId, dimension: 'COLUMNS', startIndex: 0, endIndex: 1 }, properties: { pixelSize: 40 }, fields: 'pixelSize' } },
    { updateDimensionProperties: { range: { sheetId, dimension: 'COLUMNS', startIndex: 1, endIndex: 2 }, properties: { pixelSize: 260 }, fields: 'pixelSize' } },
    { updateDimensionProperties: { range: { sheetId, dimension: 'COLUMNS', startIndex: 2, endIndex: 3 }, properties: { pixelSize: 700 }, fields: 'pixelSize' } },
    { repeatCell: { range: { sheetId }, cell: { userEnteredFormat: { wrapStrategy: 'WRAP', verticalAlignment: 'TOP' } }, fields: 'userEnteredFormat.wrapStrategy,userEnteredFormat.verticalAlignment' } },
  ] } });
  console.log(JSON.stringify({ success: true, target, sheetId }));
}
main().catch(e => { console.error(e.message || e); process.exit(1); });
