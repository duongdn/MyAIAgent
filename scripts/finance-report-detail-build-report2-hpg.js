const { google } = require('googleapis');
const path = require('path');

const spreadsheetId = '1tlZRDWspk3I9TlrJAnPCev5RrLGNmy0JBJMkbvHl97k';
const targetSheet = 'Báo cáo 2 - HPG';
const KEY_PATH = path.join(__dirname, '..', 'config', 'daily-agent-490610-7eb7985b33e3.json');

const rows = [];
rows.push(['BÁO CÁO PHÂN TÍCH CỔ PHIẾU CTCP TẬP ĐOÀN HÒA PHÁT (HOSE: HPG)']);
rows.push(['Học viện AYP — The Intelligent Investor | Tổng hợp Định tính, Định lượng, Định giá, Bộ tiêu chí Benjamin Graham | Cập nhật 18/09/2026, dữ liệu BCTC hợp nhất kiểm toán 2016-2025 (sheet \'HPG\', nguồn cafef.vn API, đã verify Tổng tài sản=Tổng nguồn vốn khớp tuyệt đối cả 10 năm)']);
rows.push([]);
rows.push(['I. TỔNG QUAN DOANH NGHIỆP']);
rows.push(['Ngành', 'Thép (thép xây dựng, HRC, ống thép, tôn mạ) — mảng cốt lõi; ngoài ra có Nông nghiệp (qua công ty con HPA, niêm yết riêng 2026) và Bất động sản khu công nghiệp/dân dụng.']);
rows.push(['Niêm yết', 'Niêm yết HOSE lâu năm, thành viên rổ VN30. Vốn hóa ~181,102 tỷ đồng (17/9/2026), thuộc nhóm vốn hóa lớn nhất sàn HOSE.']);
rows.push(['Mô hình kinh doanh', 'Sản xuất thép khép kín từ quặng sắt/nguyên liệu thô đến thành phẩm (kiểm soát chi phí tốt nhất ngành trong nước). Dẫn đầu thị phần thép xây dựng VN ~36%. Khu liên hợp Dung Quất 2 mới vận hành bổ sung 3-4 triệu tấn HRC/năm; mục tiêu ~15 triệu tấn thép tiêu thụ 2026 (+~40% YoY, cao nhất lịch sử), công suất hướng tới 18 triệu tấn/năm vào 2027.']);
rows.push(['Lợi thế cạnh tranh', 'Quy mô lớn nhất ngành thép VN/ĐNA, mô hình tích hợp khép kín giảm chi phí, tỷ trọng thép chất lượng cao (>60% sản lượng) phục vụ cơ khí/ô tô/đóng tàu/năng lượng, thương hiệu "vua thép" gắn với Chủ tịch sáng lập Trần Đình Long qua nhiều chu kỳ ngành, 10 năm dữ liệu tài chính kiểm toán minh bạch.']);
rows.push(['Rủi ro chính', '(1) Chu kỳ giá thép toàn cầu — biên lợi nhuận biến động mạnh (LNST CĐ mẹ dao động 6,835-34,478 tỷ đồng qua 2016-2025); (2) CAPEX/nợ vay lớn cho Dung Quất 2, áp lực khấu hao/lãi vay giai đoạn đầu; (3) Rủi ro phòng vệ thương mại (chống bán phá giá) với HRC/tôn mạ xuất khẩu; (4) Dư cung thép Trung Quốc; (5) Rủi ro môi trường/phát thải cao; (6) Quản trị phụ thuộc lớn vào cá nhân Chủ tịch sáng lập (rủi ro kế nhiệm dài hạn).']);
rows.push(['Sự kiện đặc biệt cần lưu ý', 'Dung Quất 2 vận hành ổn định 2026, động lực tăng sản lượng kỷ lục. Q1/2026 LNST hợp nhất >9,000 tỷ đồng, triển vọng thép "rất khả quan". Ông Trần Đình Long tái cử Chủ tịch HĐQT nhiệm kỳ 2026-2031. Công ty con Nông nghiệp Hòa Phát (HPA) đã niêm yết riêng trên HOSE từ 06/02/2026.']);
rows.push([]);
rows.push(['II. KẾT QUẢ TÀI CHÍNH 10 NĂM (2016-2025) VÀ CAGR']);
rows.push(['Chỉ tiêu (tỷ đồng)', '2016', '2025', 'CAGR 9 năm (%/năm)', 'Ghi chú']);
rows.push(['Tổng tài sản', '33,226.55', '257,899.20', '25.57', 'Tăng gấp 7.8 lần trong 9 năm, chủ yếu nhờ đầu tư Dung Quất 1 (2017-2019) và Dung Quất 2 (2022-2026)']);
rows.push(['Vốn chủ sở hữu', '19,850.26', '131,220.01', '23.35', 'Tích lũy lợi nhuận giữ lại + phát hành cổ phiếu thưởng/cổ tức cổ phiếu liên tục']);
rows.push(['Doanh thu thuần', '33,283.21', '156,116.09', '18.74', 'Tăng trưởng không đều, có năm sụt giảm rõ theo chu kỳ giá thép (2022: -5.53%, 2023: -15.88%)']);
rows.push(['LNST của cổ đông Công ty mẹ', '6,602.10', '15,453.17', '9.91', 'Biến động mạnh nhất trong nhóm chỉ tiêu — đỉnh 34,478.14 tỷ (2021), đáy chu kỳ gần đây 6,835.06 tỷ (2023)']);
rows.push(['(Nguồn: sheet \'HPG\' + \'Định lượng - HPG\' dòng 209-212, BCTC hợp nhất kiểm toán cafef.vn 2016-2025, đã verify Tổng tài sản=Tổng nguồn vốn khớp tuyệt đối cả 10 năm — không phát hiện lỗi dữ liệu)']);
rows.push([]);
rows.push(['Chỉ số sinh lời/đòn bẩy theo năm', '2016', '2019', '2021 (đỉnh chu kỳ)', '2023 (đáy chu kỳ)', '2025']);
rows.push(['ROE (%)', '33.26', '15.75', '37.98', '6.65', '11.78']);
rows.push(['ROA (%)', '19.87', '7.40', '19.34', '3.64', '5.99']);
rows.push(['Biên LNST (%)', '19.84', '11.82', '23.03', '5.75', '9.90']);
rows.push(['D/E (lần)', '0.67', '1.13', '0.96', '0.83', '0.97']);
rows.push(['(Nguồn: sheet \'Định lượng - HPG\' dòng 215-227. Biên độ dao động ROE 6.65%-37.98% qua 10 năm minh chứng rõ tính chu kỳ cao của ngành thép, D/E ổn định dưới 1.25x cả giai đoạn — đòn bẩy tài chính được quản trị thận trọng qua chu kỳ.)']);
rows.push([]);
rows.push(['III. ĐỊNH GIÁ HIỆN TẠI (17/09/2026)']);
rows.push(['Chỉ tiêu', 'Giá trị', 'Đánh giá']);
rows.push(['Giá cổ phiếu (đ/CP)', '21,450', 'Đóng cửa phiên 17/9/2026, nguồn finance.vietstock.vn']);
rows.push(['EPS 2025 chính thức (đ/CP)', '1,973', 'Dòng 159 sheet \'HPG\'']);
rows.push(['BVPS 2025 (đ/CP)', '15,542', 'VCSH 2025 / 8,442.96 triệu CP lưu hành']);
rows.push(['P/E TTM (lần)', '7.80', 'Nguồn Vietstock 17/9/2026 — thấp trong lịch sử ngành thép, phù hợp giai đoạn đầu chu kỳ phục hồi']);
rows.push(['P/B (lần)', '1.29', 'Dưới ngưỡng phòng thủ Graham 1.5x']);
rows.push(['Graham Number (P/E × P/B)', '10.06', 'ĐẠT xa ngưỡng 22.5 — định giá hấp dẫn theo khung Graham']);
rows.push(['Vốn hóa thị trường (tỷ đồng)', '181,101.59', 'Giá 21,450đ × 8,442,964,480 CP, nguồn Vietstock MarketCapital 17/9/2026']);
rows.push(['(Nguồn: finance.vietstock.vn/HPG + simplize.vn/co-phieu/HPG, truy cập 17-18/09/2026. Chi tiết đối chiếu xem sheet \'Định giá - HPG\' và \'Benjamin Graham - HPG\'.)']);
rows.push([]);
rows.push(['IV. PHÂN TÍCH TỪNG MẢNG KINH DOANH']);
rows.push(['1. Thép (mảng cốt lõi)']);
rows.push(['    ◦ Cơ hội: dẫn đầu thị phần thép xây dựng VN ~36%; Dung Quất 2 bổ sung 3-4 triệu tấn HRC/năm; mục tiêu 15 triệu tấn tiêu thụ 2026 (+40% YoY); tỷ trọng thép chất lượng cao >60% sản lượng.\nNguồn: Vietstock, BSC Research, truy cập 18/09/2026.']);
rows.push(['    ◦ Rủi ro: chu kỳ giá thép toàn cầu, dư cung Trung Quốc, rủi ro phòng vệ thương mại tại thị trường xuất khẩu, áp lực CAPEX/khấu hao Dung Quất 2.\nNguồn: DSC "Có nên mua cổ phiếu HPG" T6/2026, truy cập 18/09/2026.']);
rows.push(['2. Nông nghiệp (qua công ty con HPA)']);
rows.push(['    ◦ Cơ hội: đa dạng hóa nguồn thu ngoài chu kỳ thép; HPA đã niêm yết riêng 2026, minh bạch hóa định giá mảng này.\nNguồn: xem báo cáo riêng HPA (sheet Báo cáo 2 - HPA, spreadsheet riêng).']);
rows.push(['    ◦ Rủi ro: mang tính chu kỳ giá heo riêng biệt, không tương quan hoàn toàn với chu kỳ thép — cần đánh giá tách biệt.']);
rows.push(['3. Bất động sản (khu công nghiệp/dân dụng)']);
rows.push(['    ◦ Cơ hội: quỹ đất khu công nghiệp lớn, hưởng lợi xu hướng dịch chuyển sản xuất vào Việt Nam.\nNguồn: BSC Research, truy cập 18/09/2026.']);
rows.push(['    ◦ Rủi ro: KHÔNG tách bạch được tỷ trọng doanh thu/lợi nhuận riêng mảng này trong phạm vi nguồn dữ liệu cafef.vn (chỉ có BCTC hợp nhất) — cần verify thêm qua BCTN chi tiết nếu cần phân tích sâu hơn.']);
rows.push([]);
rows.push(['V. BENJAMIN GRAHAM — TÓM TẮT (chi tiết xem sheet \'Benjamin Graham - HPG\')']);
rows.push(['Kết quả tổng thể', '7/10 tiêu chí ĐẠT (quy mô, D/E, lợi nhuận dương 10 năm, cổ tức, P/E≤25x, P/E&P/B khuyến nghị, Graham Number), 3/10 KHÔNG ĐẠT (current ratio <2.0x, EPS 3 năm gần nhất/xa nhất, EPS 2025 vs 2016 — cả 2 tiêu chí EPS không đạt do pha loãng cổ phiếu, không phải suy giảm LNST tuyệt đối).']);
rows.push(['Diễn giải', 'HPG đáp ứng phần lớn tiêu chí "nhà đầu tư phòng thủ" của Graham về quy mô, tài chính lành mạnh và định giá hấp dẫn hiện tại (P/E 7.80x, P/B 1.29x, Graham Number 10.06 — đều đạt xa ngưỡng). Điểm không đạt về EPS là do đặc thù thưởng cổ phiếu/cổ tức cổ phiếu liên tục của HPG qua các năm, làm pha loãng EPS dù LNST tuyệt đối tăng trưởng (gấp 2.34 lần 2016). Current ratio dưới ngưỡng phản ánh đặc thù ngành công nghiệp nặng vốn lưu động lớn, không phải rủi ro thanh khoản cấp bách khi D/E vẫn an toàn (0.97x).']);
rows.push([]);
rows.push(['VI. THANH KHOẢN (chi tiết đầy đủ xem sheet \'Định giá - HPG\', mục VI)']);
rows.push(['Chỉ tiêu', '1 ngày', '7 ngày', '1 tháng', '6 tháng']);
rows.push(['KLGD trung bình (CP/phiên)', '2,747,400', '13,716,440', '18,239,167', '24,568,952']);
rows.push(['GTGD trung bình (tỷ đồng/phiên)', '58.76', '289.81', '394.97', '606.45']);
rows.push(['(Nguồn: finance.vietstock.vn/data/getpricehistory, truy cập 18/09/2026, phiên gần nhất trong dữ liệu 17/9/2026 (200 phiên gần nhất). Thanh khoản CAO, phù hợp cả nhà đầu tư tổ chức lẫn cá nhân, không có rủi ro thực thi đáng kể khi vào/thoát vị thế.)']);
rows.push([]);
rows.push(['VII. KẾT LUẬN ĐẦU TƯ']);
rows.push([
  'HPG là doanh nghiệp thép đầu ngành Việt Nam với NỀN TẢNG TÀI CHÍNH VỮNG CHẮC (10 năm lợi nhuận dương liên tục, đòn bẩy an toàn D/E<1.25x suốt giai đoạn, thanh khoản cổ phiếu cao) và ĐỊNH GIÁ HIỆN TẠI HẤP DẪN (P/E 7.80x, P/B 1.29x, Graham Number 10.06 — đều đạt xa ngưỡng phòng thủ Graham). Đạt 7/10 tiêu chí Benjamin Graham, cao hơn đáng kể so với các công ty mới niêm yết cùng hệ sinh thái (HPA chỉ đạt 3/10 rõ ràng do thiếu track record).\n\n' +
  'RỦI RO CẦN CÂN NHẮC: (1) TÍNH CHU KỲ CAO của ngành thép — dữ liệu 10 năm cho thấy biên lợi nhuận và ROE có thể dao động rất mạnh (ROE 6.65%-37.98%), giá cổ phiếu hấp dẫn hiện tại một phần phản ánh kỳ vọng phục hồi từ Dung Quất 2, nhưng nếu chu kỳ giá thép đảo chiều bất lợi (dư cung Trung Quốc, rào cản thương mại), lợi nhuận có thể co lại nhanh; (2) ÁP LỰC CAPEX/KHẤU HAO Dung Quất 2 trong giai đoạn đầu vận hành trước khi đạt hiệu suất tối ưu; (3) RỦI RO QUẢN TRỊ KẾ NHIỆM dài hạn do phụ thuộc lớn vào cá nhân Chủ tịch sáng lập Trần Đình Long.\n\n' +
  'KHUYẾN NGHỊ: HPG phù hợp với nhà đầu tư chấp nhận được biến động theo chu kỳ ngành thép, tìm kiếm vị thế đầu ngành với định giá hợp lý ở giai đoạn đầu chu kỳ phục hồi (Dung Quất 2 mới vận hành). Nên theo dõi sát: (a) tiến độ vận hành/hiệu suất Dung Quất 2 và tác động lên biên lợi nhuận các quý tới; (b) diễn biến giá thép thế giới và các rào cản thương mại tại thị trường xuất khẩu; (c) kết quả KQKD Q3-Q4/2026 để xác nhận xu hướng phục hồi có tiếp diễn hay không trước khi tăng tỷ trọng đáng kể.',
]);

async function main() {
  const auth = new google.auth.GoogleAuth({ keyFile: KEY_PATH, scopes: ['https://www.googleapis.com/auth/spreadsheets'] });
  const sheets = google.sheets({ version: 'v4', auth });

  const meta = await sheets.spreadsheets.get({ spreadsheetId });
  const fptMeta = await sheets.spreadsheets.get({ spreadsheetId: '1E47mfclzKFvpX1JZeiwu4zQFlhq8-CoLBr-bZuibqMw' });
  const fptSheet = fptMeta.data.sheets.find((s) => s.properties.title === 'Báo cáo 2');

  let sheetObj = meta.data.sheets.find((s) => s.properties.title === targetSheet);
  if (!sheetObj) {
    const copyRes = await sheets.spreadsheets.sheets.copyTo({
      spreadsheetId: '1E47mfclzKFvpX1JZeiwu4zQFlhq8-CoLBr-bZuibqMw',
      sheetId: fptSheet.properties.sheetId,
      requestBody: { destinationSpreadsheetId: spreadsheetId },
    });
    const newSheetId = copyRes.data.sheetId;
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: { requests: [{ updateSheetProperties: { properties: { sheetId: newSheetId, title: targetSheet, index: 5 }, fields: 'title,index' } }] },
    });
    sheetObj = { properties: { sheetId: newSheetId, title: targetSheet } };
  }
  const sheetId = sheetObj.properties.sheetId;

  const meta2 = await sheets.spreadsheets.get({ spreadsheetId, ranges: [`'${targetSheet}'`], includeGridData: false });
  const s2 = meta2.data.sheets.find((s) => s.properties.sheetId === sheetId);
  const rowCount = s2.properties.gridProperties.rowCount;
  const colCount = s2.properties.gridProperties.columnCount;

  await sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    requestBody: {
      requests: [
        { unmergeCells: { range: { sheetId, startRowIndex: 0, endRowIndex: rowCount, startColumnIndex: 0, endColumnIndex: colCount } } },
        { updateCells: { range: { sheetId, startRowIndex: 0, endRowIndex: rowCount, startColumnIndex: 0, endColumnIndex: colCount }, fields: '*' } },
      ],
    },
  });

  await sheets.spreadsheets.values.update({ spreadsheetId, range: `'${targetSheet}'!A1`, valueInputOption: 'USER_ENTERED', requestBody: { values: rows } });

  console.log(JSON.stringify({ success: true, targetSheet, rows: rows.length, sheetId }));
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
