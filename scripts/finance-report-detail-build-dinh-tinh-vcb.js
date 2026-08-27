#!/usr/bin/env node
const { google } = require('googleapis');
const path = require('path');
const ssid = '1oDM7Fixh2bHKBcqnHhWzLPO1OukR9FSl3u4tW6WaI5Y';
const target = 'Định tính - VCB';
const KEY_PATH = '/home/nus/projects/My-AI-Agent/config/daily-agent-490610-7eb7985b33e3.json';

const rows = [];
rows.push(['', 'THE INTELLIGENT INVESTOR - HỌC VIỆN AYP']);
rows.push(['', 'Follow up 2 - Company Research - Nghiên cứu doanh nghiệp']);
rows.push([]);
rows.push(['', 'Good Company - Định tính', 'Ngân hàng TMCP Ngoại thương Việt Nam (VCB - Vietcombank)']);
rows.push(['I', 'Ngành']);
rows.push(['1', 'Đặc thù ngành\n(yếu tố quan trọng)',
`VCB hoạt động ngành NGÂN HÀNG THƯƠNG MẠI — kinh doanh chênh lệch lãi suất huy động/cho vay (NIM), thu phí dịch vụ (thanh toán, tài trợ thương mại, thẻ, bancassurance), kinh doanh ngoại hối/chứng khoán đầu tư. Đặc thù: chịu quản lý chặt bởi NHNN (room tín dụng, tỷ lệ an toàn vốn CAR, dự trữ bắt buộc, trần lãi suất huy động ngắn hạn); lợi nhuận nhạy với chu kỳ lãi suất, chất lượng tín dụng (nợ xấu) và tăng trưởng tín dụng nền kinh tế. Là ngân hàng TMCP nhà nước chi phối (SOE-controlled) — cổ đông lớn nhất là Ngân hàng Nhà nước Việt Nam (SBV) qua sở hữu trực tiếp, room ngoại giới hạn.
(Nguồn: Vietstock https://finance.vietstock.vn/VCB-ngan-hang-tmcp-ngoai-thuong-viet-nam.htm, Simplize https://simplize.vn/co-phieu/VCB — truy cập 25/08/2026)`]);
rows.push(['2', 'Triển vọng ngành',
`VCB là NGÂN HÀNG CÓ VỐN HÓA LỚN NHẤT sàn HOSE (vốn hóa ~494.655 tỷ đồng tại 25/08/2026), thuộc nhóm "Big 4" ngân hàng gốc quốc doanh (VCB, BID, CTG, Agribank) — dẫn đầu về chất lượng tài sản (tỷ lệ nợ xấu lịch sử thấp nhất nhóm big 4), biên lợi nhuận ổn định. Kế hoạch phát hành thêm >543 triệu cổ phiếu giữa 2026 huy động ~36,3 nghìn tỷ đồng để tăng vốn — hỗ trợ mở rộng tín dụng nhưng pha loãng EPS ngắn hạn (đã thấy tín hiệu: EPS 2025 = 3.854đ, giảm so 2024 = 5.571đ dù LNST tăng — do vốn điều lệ/CP lưu hành tăng qua các đợt phát hành/cổ tức cổ phiếu trước đó). NIM dự báo cải thiện lên ~2,77% năm 2026 theo báo cáo ngành VCBS.
(Nguồn: WebSearch tổng hợp Simplize/TCBS/VCBS báo cáo ngành ngân hàng 1H2026 — truy cập 25/08/2026)`]);
rows.push(['3', 'Rủi ro ngành',
`• Rủi ro tín dụng: chất lượng tài sản có thể xấu đi trong chu kỳ kinh tế suy giảm (BĐS, SME) — dù VCB lịch sử có NPL thấp nhất nhóm big4, không loại trừ rủi ro hệ thống.
• Rủi ro thu hẹp NIM: cạnh tranh lãi suất huy động giữa các NH + áp lực NHNN giữ lãi suất cho vay thấp hỗ trợ nền kinh tế.
• Rủi ro pha loãng: các đợt tăng vốn điều lệ liên tục (cổ phiếu thưởng, phát hành riêng lẻ) làm pha loãng EPS/ROE trên mỗi cổ phần dù quy mô lợi nhuận tuyệt đối tăng.
• Rủi ro quy định: room tín dụng do NHNN cấp hạn chế tốc độ tăng trưởng cho vay; thay đổi chính sách CAR/Basel III ảnh hưởng room tăng vốn.
• Số liệu NPL/CAR không có trong BCTC cơ bản (cafef) — cần verify thêm từ Báo cáo thường niên/BCTC hợp nhất kiểm toán đầy đủ nếu cần đánh giá sâu.
(Nguồn: tổng hợp WebSearch — truy cập 25/08/2026; số liệu tài chính từ cafef.vn qua sheet 'VCB')`]);
rows.push([]);
rows.push(['II', 'Mô hình kinh doanh']);
rows.push(['3', 'Các mảng kinh doanh',
`Ngân hàng bán lẻ + bán buôn (corporate banking): huy động vốn, cho vay khách hàng cá nhân/doanh nghiệp, tài trợ thương mại xuất nhập khẩu (mảng truyền thống mạnh nhất — tiền thân là ngân hàng chuyên doanh đối ngoại), thanh toán quốc tế, kinh doanh ngoại hối, thẻ, bancassurance (hợp tác bảo hiểm FWD từ 2019), chứng khoán đầu tư. Có công ty con/liên kết: VCBS (chứng khoán), VCB Leasing, VCB Fund Management...
(Nguồn: Vietstock/Simplize tổng hợp — truy cập 25/08/2026)`]);
rows.push(['4', 'Đầu vào — Nguồn vốn huy động',
`Nguồn vốn chính: tiền gửi khách hàng (mã 330 trong BCTC — chiếm tỷ trọng lớn nhất Nguồn vốn), tiền gửi/vay TCTD khác, phát hành giấy tờ có giá, vốn chủ sở hữu (224.559 tỷ đồng tại 2025). Thành lập 1963 tiền thân Cục Ngoại hối NHNN, cổ phần hóa 2007-2008 (IPO), niêm yết HOSE mã VCB từ 2009 — lịch sử hoạt động dài nhất nhóm NHTM cổ phần lớn.
(Nguồn: WebSearch tổng hợp lịch sử VCB — truy cập 25/08/2026)`]);
rows.push(['5', 'Đầu ra — Sản phẩm/Dịch vụ',
`Cho vay khách hàng (mã 160/161 BCTC — hạng mục tài sản lớn nhất), dịch vụ thanh toán quốc tế/tài trợ thương mại (thế mạnh lịch sử — thị phần thanh toán quốc tế top đầu VN), thẻ tín dụng/ghi nợ, bancassurance, dịch vụ ngân hàng số (VCB Digibank).
(Nguồn: suy luận từ cơ cấu BCTC + WebSearch — truy cập 25/08/2026)`]);
rows.push(['6', 'Đầu ra — Thị trường',
`Mạng lưới chi nhánh/PGD phủ toàn quốc + văn phòng đại diện nước ngoài (Singapore, Mỹ...) — một trong số ít NHTM VN có hiện diện quốc tế đáng kể nhờ gốc ngân hàng đối ngoại. Khách hàng doanh nghiệp lớn/FDI + khách hàng cá nhân bán lẻ.
(Nguồn: WebSearch tổng hợp — truy cập 25/08/2026)`]);
rows.push([]);
rows.push(['III', 'Ban lãnh đạo & Cổ đông']);
rows.push(['7', 'Cổ đông lớn / Sở hữu nhà nước',
`Ngân hàng Nhà nước Việt Nam (SBV) là cổ đông chi phối (sở hữu >74% trước các đợt phát hành pha loãng, tỷ lệ cụ thể cần verify BCTC quản trị mới nhất — KHÔNG có số liệu chính xác trong phạm vi nghiên cứu này, cần Báo cáo quản trị/Annual Report để verify % sở hữu SBV hiện tại). Mizuho Bank (Nhật) là cổ đông chiến lược nước ngoài lớn (~15% từ 2011, tỷ lệ hiện tại có pha loãng qua các đợt tăng vốn — cần verify thêm).
(Nguồn: kiến thức phổ biến về cơ cấu sở hữu VCB — CẦN VERIFY số liệu % chính xác qua Báo cáo quản trị công ty mới nhất, không có trong phạm vi truy cập nghiên cứu này)`]);
rows.push(['8', 'Rủi ro quản trị',
`Là NHTM nhà nước chi phối — quyết định chiến lược lớn (tăng vốn, cổ tức, bổ nhiệm lãnh đạo cấp cao) chịu ảnh hưởng định hướng chính sách nhà nước, không hoàn toàn theo tối đa hóa lợi ích cổ đông thiểu số thuần túy (rủi ro chung của nhóm NHTM gốc quốc doanh, không riêng VCB).
(Nguồn: nhận định chung ngành — truy cập 25/08/2026)`]);
rows.push([]);
rows.push(['IV', 'Kết luận định tính',
`VCB là ngân hàng đầu ngành về vốn hóa, chất lượng tài sản và thương hiệu tại VN, business model ổn định dễ hiểu (huy động-cho vay + phí dịch vụ), rủi ro chính là chu kỳ tín dụng/lãi suất và pha loãng cổ phần do tăng vốn liên tục — không phải rủi ro mô hình kinh doanh cốt lõi. Phù hợp nhóm "good company" theo tiêu chí định tính nhưng ĐỊNH GIÁ (P/B ~2x, P/E ~11,9x tại 25/08/2026) cần đối chiếu kỹ ở sheet Định giá trước khi kết luận đầu tư.`]);

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
