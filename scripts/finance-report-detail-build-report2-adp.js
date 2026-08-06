#!/usr/bin/env node
const { google } = require('googleapis');
const path = require('path');

const spreadsheetId = '1g5O1eZzN1nV896WZARFf-vS8YF9xF6IbcvCXdgC5NcM';
const targetSheet = 'Báo cáo 2 - ADP';
const KEY_PATH = path.join(__dirname, '..', 'config', 'daily-agent-490610-7eb7985b33e3.json');

const rows = [];
rows.push(['BÁO CÁO PHÂN TÍCH CỔ PHIẾU CTCP SƠN Á ĐÔNG (HOSE: ADP)']);
rows.push(["Học viện AYP — The Intelligent Investor | Tổng hợp Định tính, Định lượng, Định giá, Bộ tiêu chí Benjamin Graham | Cập nhật 06/08/2026, dữ liệu BCTC kiểm toán 2017-2025 (sheet 'ADP', nguồn cafef.vn API, đã verify Tổng tài sản=Tổng nguồn vốn khớp tuyệt đối cả 9 năm)"]);
rows.push([]);
rows.push(['I. TỔNG QUAN DOANH NGHIỆP']);
rows.push(['Ngành', 'Sản xuất sơn công nghiệp: sơn phủ kim loại tấm (PCM), sơn tàu biển/công nghiệp độ bền cao, sơn trang trí/xây dựng gốc dầu. Tiền thân từ 1970 (một trong 2 nhà sản xuất sơn lớn nhất miền Nam trước 1975), chuyển CTCP 2000, niêm yết HOSE 27/7/2023 (trước đó UPCOM hơn 10 năm).']);
rows.push(['Mô hình kinh doanh', '3 dòng sản phẩm: PCM — SẢN PHẨM CHỦ LỰC, ~22% thị phần toàn quốc, vị thế dẫn đầu/tiên phong tại VN, gắn với ngành tôn thép mạ màu xuất khẩu; sơn tàu biển/công nghiệp ~8% thị phần; sơn trang trí/xây dựng ~6% thị phần. Nguyên liệu (nhựa gốc dầu, bột màu, dung môi) phần lớn nhập khẩu.']);
rows.push(['Lợi thế cạnh tranh', 'Vị thế NGÁCH dẫn đầu mảng PCM (22% thị phần) — rào cản kỹ thuật + quan hệ khách hàng tôn thép lâu năm; lịch sử hoạt động 55 năm (từ 1970); bảng cân đối tài chính lành mạnh, đòn bẩy thấp và ổn định suốt 9 năm (D/E luôn dưới 0,5 lần).']);
rows.push(['Rủi ro chính', '(1) Rủi ro chu kỳ/biến động lợi nhuận cao — DTT & LNST dao động mạnh qua các năm (LNST YoY từ -36,76% đến +89,10%), 2025 đang giảm (-10,37% LNST YoY); (2) Nguyên liệu nhập khẩu — nhạy cảm giá dầu/hoá chất toàn cầu + tỷ giá; (3) Cạnh tranh cao ở các mảng ngoài PCM (Jotun, Nippon Paint, KOVA, 4 Oranges...); (4) Thanh khoản cổ phiếu rất thấp (xem mục VII); (5) Chủ tịch HĐQT cao tuổi theo dữ liệu hiện có — rủi ro kế nhiệm; (6) Sở hữu phân tán giữa nhóm cổ đông cá nhân sáng lập/quản lý, thiếu giám sát tổ chức độc lập.']);
rows.push(['Sự kiện đặc biệt cần lưu ý', 'Chuyển niêm yết từ UPCOM sang HOSE 27/7/2023 (giá tham chiếu chào sàn 18.700đ/CP). Doanh thu/LNST đạt đỉnh 2024 (817,85 tỷ / 85,31 tỷ) rồi giảm năm 2025 (651,76 tỷ / 76,46 tỷ, -20,31%/-10,37% YoY). Chi phí quản lý doanh nghiệp giảm mạnh -43,31% năm 2025 (39,02→22,12 tỷ) — phần nào bù đắp đà giảm doanh thu.']);
rows.push([]);
rows.push(['II. KẾT QUẢ TÀI CHÍNH 9 NĂM (2017-2025, đơn vị: tỷ đồng trừ khi ghi chú khác)']);
rows.push(['Chỉ tiêu', 'Năm 2017', 'Năm 2021', 'Năm 2025', 'CAGR 2017-2025', 'Ghi chú']);
rows.push(['Tổng tài sản', '310.88', '330.93', '347.64', '1.41%/năm', 'Tăng chậm và không đều — đỉnh 2023 (381,33 tỷ) rồi giảm dần']);
rows.push(['Doanh thu thuần', '521.61', '414.64', '651.76', '2.82%/năm', 'Biến động mạnh giữa các năm (414,64-817,85 tỷ), đỉnh 2024 rồi giảm 2025']);
rows.push(['LNST của cổ đông Công ty mẹ', '47.34', '49.58', '76.46', '6.18%/năm', 'DƯƠNG LIÊN TỤC cả 9 năm 2017-2025 — không có năm lỗ, nhưng biến động rất mạnh (YoY -36,76% đến +89,10%)']);
rows.push(['ROE (LNST CĐ mẹ/VCSH cuối kỳ)', '21.76%', '17.83%', '28.86%', '(không tính CAGR cho tỷ số)', 'Dao động rộng 14,08%-31,32% toàn giai đoạn']);
rows.push(['ROA (LNST CĐ mẹ/Tổng tài sản cuối kỳ)', '15.23%', '14.98%', '21.99%', '(không tính CAGR cho tỷ số)', 'Dao động 10,77%-24,00% toàn giai đoạn']);
rows.push(['Nợ phải trả/Vốn chủ sở hữu (D/E, lần)', '0.43', '0.19', '0.31', '(không tính CAGR cho tỷ số)', 'Luôn dưới 0,5 lần toàn bộ 9 năm — cơ cấu vốn an toàn, ổn định']);
rows.push(['Tỷ lệ thanh toán hiện hành (lần)', '2.14', '5.12', '3.83', '(không tính CAGR cho tỷ số)', 'Luôn trên 2x cả 9 năm — đạt tiêu chí Graham (≥2,0x) mọi năm']);
rows.push(["(Nguồn: sheet 'ADP' — BCTC kiểm toán 2017-2025 (loại \"K\", báo cáo riêng do ADP không có công ty con để hợp nhất), cafef.vn API, đã verify Tổng tài sản=Tổng nguồn vốn khớp tuyệt đối cả 9 năm. Chi tiết đầy đủ từng năm xem sheet 'Định lượng - ADP' và 'Định giá - ADP'.)"]);
rows.push([]);
rows.push(['Kết quả kinh doanh 2 năm gần nhất (Tỷ đồng, số chính xác)', 'Năm 2024', 'Năm 2025', 'Thay đổi YoY', 'Ghi chú']);
rows.push(['Doanh thu thuần', '817.85', '651.76', '-20.31%', 'Giảm sau đỉnh 2024']);
rows.push(['Lợi nhuận gộp', '159.52', '128.72', '-19.31%']);
rows.push(['Chi phí quản lý doanh nghiệp', '39.02', '22.12', '-43.31%', 'Giảm mạnh — bù đắp phần nào đà giảm doanh thu/LN gộp']);
rows.push(['Lợi nhuận thuần từ HĐKD', '106.90', '96.58', '-9.65%']);
rows.push(['Lợi nhuận sau thuế của cổ đông Công ty mẹ', '85.31', '76.46', '-10.37%']);
rows.push(['EPS chính thức (đồng/CP, ADP tự công bố)', '3,703', '3,319', '-10.37%']);
rows.push(["(Nguồn: sheet 'ADP' hàng 139-159, BCTC kiểm toán cafef.vn, truy cập 06/08/2026)"]);
rows.push([]);
rows.push(['III. ĐỊNH GIÁ HIỆN TẠI (06/08/2026)']);
rows.push(['Chỉ tiêu', 'Giá trị', 'Đánh giá']);
rows.push(['Giá cổ phiếu (đ/CP)', '23,050']);
rows.push(['EPS chính thức FY2025 (đ/CP, ADP công bố)', '3,319', 'Giảm -10.37% so 2024 (3,703đ)']);
rows.push(['BVPS FY2025 (đ/CP, = VCSH/23,04 triệu CP)', '11,497']);
rows.push(['P/E theo EPS FY2025 (lần)', '6.95', 'RẤT THẤP — đạt xa ngưỡng Graham (25x) và ngưỡng khuyến nghị (15x)']);
rows.push(['P/E TTM & P/B — nguồn Vietstock/Simplize (06/08/2026)', 'P/E 7.33, P/B 1.97', 'Cùng kết luận: P/E rất thấp; P/B hơi vượt ngưỡng khuyến nghị Graham 1.5x']);
rows.push(['Graham Number (P/E TTM × P/B)', '14.44', 'ĐẠT xa ngưỡng 22.5']);
rows.push(['Tỉ suất cổ tức — cổ tức tiền mặt đợt 1/2026 (7% = 700đ/CP)', '3.04%', 'Đã xác nhận trả cổ tức tiền mặt liên tục ≥5 năm gần nhất (2022-2026, cotuc.vn)']);
rows.push(['Vốn hóa thị trường (tỷ đồng)', '531', 'Giá 23.050đ × 23.039.850 CP — vốn hóa NHỎ']);
rows.push(["(Nguồn: finance.vietstock.vn/ADP + simplize.vn/co-phieu/ADP, truy cập 06/08/2026. Chi tiết đối chiếu xem sheet 'Định giá - ADP' và 'Benjamin Graham - ADP'.)"]);
rows.push([]);
rows.push(['IV. PHÂN TÍCH TỪNG MẢNG KINH DOANH']);
rows.push(['1. Sơn phủ kim loại tấm — PCM (mảng chủ lực, ~22% thị phần toàn quốc)']);
rows.push(['    ◦ Cơ hội: Vị thế dẫn đầu/tiên phong tại VN, gắn trực tiếp với ngành tôn thép mạ màu xuất khẩu (Hoa Sen, NKG, Tôn Đông Á...) — hưởng lợi khi xuất khẩu tôn mạ màu VN tăng trưởng.\nNguồn: WebSearch tổng hợp DNSE/Vietstock, truy cập 06/08/2026.']);
rows.push(['    ◦ Rủi ro: Phụ thuộc chu kỳ xuất khẩu tôn thép mạ màu; rủi ro gián tiếp từ chính sách phòng vệ thương mại (chống bán phá giá) mà các thị trường nhập khẩu tôn thép VN áp dụng.\nNguồn: suy luận từ đặc thù ngành, truy cập 06/08/2026.']);
rows.push(['2. Sơn tàu biển & sơn công nghiệp độ bền cao (~8% thị phần)']);
rows.push(['    ◦ Cơ hội: Gắn với ngành đóng tàu và công nghiệp nặng trong nước.\nNguồn: WebSearch tổng hợp, truy cập 06/08/2026.']);
rows.push(['    ◦ Rủi ro: Cạnh tranh trực tiếp với các hãng sơn ngoại vốn lớn hơn nhiều (Jotun, Nippon Paint, PPG...).\nNguồn: WebSearch tổng hợp, truy cập 06/08/2026.']);
rows.push(['3. Sơn trang trí/xây dựng gốc dầu (~6% thị phần — mảng nhỏ nhất)']);
rows.push(['    ◦ Cơ hội: Nhu cầu xây dựng dân dụng trong nước.\nNguồn: WebSearch tổng hợp, truy cập 06/08/2026.']);
rows.push(['    ◦ Rủi ro: Thị phần nhỏ nhất trong 3 mảng, cạnh tranh khốc liệt nhất từ cả DN nội (KOVA, 4 Oranges) và ngoại.\nNguồn: WebSearch tổng hợp, truy cập 06/08/2026.']);
rows.push([]);
rows.push(['V. QUẢN TRỊ — Hội đồng quản trị & Ban lãnh đạo']);
rows.push(['Chủ tịch HĐQT: bà Nguyễn Thị Nhung (85 tuổi tại thời điểm dữ liệu — CAO TUỔI, cần lưu ý rủi ro kế nhiệm). Phó Chủ tịch HĐQT: ông Trần Bửu Trí (49 tuổi). Thành viên HĐQT: Võ Thị Bích Ngọc, Tống Trường Thịnh, Nguyễn Thị Minh Sáu. Phó Tổng giám đốc: Lê Đình Quang, Võ Hồng Hà. Kế toán trưởng: Huỳnh Thanh Tâm.\nĐIỂM ĐÁNG CHÚ Ý: hầu hết lãnh đạo chủ chốt ĐỒNG THỜI là cổ đông lớn cá nhân (xem mục VI) — mô hình quản trị gia đình/sáng lập viên tập trung, không tách bạch rõ sở hữu và điều hành. Track record công bố thông tin chuẩn HOSE còn tương đối ngắn (từ 7/2023, hơn 3 năm) sau >10 năm ở UPCOM.\nNguồn: Vietstock hồ sơ doanh nghiệp https://finance.vietstock.vn/ADP/ho-so-doanh-nghiep.htm, truy cập 06/08/2026 (dữ liệu tuổi/chức danh có thể chưa cập nhật thời điểm mới nhất).']);
rows.push([]);
rows.push(['VI. CỔ ĐÔNG']);
rows.push(['SỞ HỮU PHÂN TÁN GIỮA NHÓM CỔ ĐÔNG CÁ NHÂN SÁNG LẬP/QUẢN LÝ — khác biệt rõ so với các mã đã phân tích trước (VEA/FOX/HPA đều có 1 tổ chức mẹ chi phối ~85-95%). Theo dữ liệu Vietstock (thời điểm không xác định chính xác gần nhất, CẦN VERIFY LẠI), 5 cổ đông cá nhân lớn nhất nắm tổng cộng ước ~45,7% trên nền 23,04 triệu CP: Trần Bửu Trí ~11,36% (2.616.568 CP), Nguyễn Thị Nhung ~10,06% (2.318.269 CP), Lê Đình Quang ~9,22% (2.124.000 CP), Võ Hồng Hà ~7,91% (1.821.200 CP), Đỗ Thụy Thúy Vy ~7,13% (1.642.924 CP). KHÔNG có cổ đông tổ chức/Nhà nước chi phối. Tổng CP lưu hành hiện tại: 23.039.850 CP (Vietstock "Khối lượng niêm yết", 06/08/2026) — khớp Vốn góp chủ sở hữu FY2025 (230,40 tỷ/mệnh giá 10.000đ).\nNguồn: Vietstock hồ sơ doanh nghiệp, đã dẫn — truy cập 06/08/2026.']);
rows.push([]);
rows.push(['VII. THANH KHOẢN (chi tiết đầy đủ xem sheet \'Định giá - ADP\', mục VI)']);
rows.push(['Chỉ tiêu', '1 ngày', '7 ngày', '1 tháng', '6 tháng']);
rows.push(['KLGD trung bình (CP/phiên)', '1,800', '2,320', '4,333', '5,014']);
rows.push(['GTGD trung bình (đồng/phiên)', '41,050,000', '53,210,000', '97,942,619', '115,013,929']);
rows.push(["(Nguồn: finance.vietstock.vn/data/getpricehistory, truy cập 06/08/2026, dữ liệu phiên gần nhất 05/08/2026. ⚠️ THANH KHOẢN RẤT THẤP — vòng quay/vốn hóa chỉ 0,0077%-0,0217%/phiên, khó vào/ra vị thế lớn mà không ảnh hưởng giá.)"]);
rows.push([]);
rows.push(['VIII. KẾT LUẬN ĐẦU TƯ']);
rows.push([
  'CHEAP PRICE: RÕ RÀNG ĐẠT. P/E 6,95-7,33x rất thấp (đạt xa ngưỡng Graham 15x/25x), Graham Number 14,44 (đạt xa ngưỡng 22,5), tỉ suất cổ tức 3,04% (đã xác nhận trả liên tục ≥5 năm gần nhất). P/B 1,97-2,01x hơi vượt ngưỡng khuyến nghị Graham 1,5x nhưng không đắt so với ROE bình quân ~21,8%.\n\n' +
  'GOOD COMPANY: HỖN HỢP.\n' +
  '(a) Chất lượng lợi nhuận cơ bản: TỐT — LNST của cổ đông công ty mẹ DƯƠNG LIÊN TỤC cả 9 năm 2017-2025 (đạt tiêu chí Graham "lời liên tục", dù thiếu 1 năm so chuẩn 10 năm gốc), cổ tức tiền mặt chi trả đều đặn xác nhận được ≥5 năm gần nhất (2022-2026). Current ratio và D/E ĐẠT chuẩn Graham ở CẢ 9/9 năm — an toàn tài chính nhất quán, hiếm gặp.\n' +
  '(b) Chất lượng tăng trưởng: TRUNG BÌNH-YẾU — CAGR LNST 9 năm chỉ 6,18%/năm, TB EPS 3 năm gần nhất chỉ cao hơn TB 3 năm xa nhất 22,98% (dưới ngưỡng Graham 33%). Doanh thu/LNST biến động rất mạnh giữa các năm (LNST YoY dao động -36,76% đến +89,10%) — phản ánh đúng tính chu kỳ ngành sơn công nghiệp gắn nguyên liệu nhập khẩu + chu kỳ xây dựng-xuất khẩu tôn thép. 2025 đang trong xu hướng giảm so đỉnh 2024.\n' +
  '(c) Chất lượng quản trị: CẦN THEO DÕI — sở hữu phân tán giữa nhóm cổ đông cá nhân gia đình/sáng lập kiêm nhiệm điều hành, thiếu cổ đông tổ chức lớn giám sát độc lập; Chủ tịch HĐQT cao tuổi (85 theo dữ liệu hiện có, cần verify lại) — rủi ro kế nhiệm lãnh đạo cần theo dõi.\n' +
  '(d) An toàn tài chính: RẤT TỐT và NHẤT QUÁN — D/E luôn dưới 0,5 lần và current ratio luôn trên 2,0 lần ở MỌI năm 2017-2025, điểm mạnh nhất quán nhất của ADP.\n\n' +
  'RỦI RO CẦN THEO DÕI SÁT NHẤT: (1) xu hướng giảm doanh thu/LNST 2025 có tiếp diễn 2026 hay chỉ là điều chỉnh ngắn hạn sau đỉnh 2024; (2) biến động nguyên liệu nhập khẩu (giá dầu/hoá chất + tỷ giá); (3) thanh khoản cổ phiếu rất thấp (GTGD 6 tháng chỉ ~115 triệu đồng/phiên) — hạn chế nghiêm trọng quy mô vị thế có thể vào/ra; (4) rủi ro kế nhiệm lãnh đạo (Chủ tịch cao tuổi) và quản trị gia đình trị.\n\n' +
  'KẾT LUẬN: ADP phù hợp NHÀ ĐẦU TƯ TÌM CỔ PHIẾU ĐỊNH GIÁ RẺ + AN TOÀN TÀI CHÍNH CAO ở NGÁCH sản phẩm có vị thế dẫn đầu bền vững (PCM, 22% thị phần) — tương tự tinh thần "cheap + safe" của VEA nhưng ở quy mô nhỏ hơn nhiều và KHÔNG có cổ đông Nhà nước/tổ chức bảo trợ. KHÔNG phù hợp nhà đầu tư tìm tăng trưởng vốn dài hạn đều đặn (CAGR LNST khiêm tốn, biến động chu kỳ mạnh). Do THANH KHOẢN RẤT THẤP, chỉ nên xem xét VỊ THẾ NHỎ và theo dõi sát diễn biến KQKD 2026 trước khi tăng tỷ trọng.',
]);
rows.push([]);
rows.push(["Nguồn tổng hợp: xem chi tiết từng dòng ở trên. Các sheet backing: 'ADP' (BCTC kiểm toán 2017-2025, cafef.vn API), 'Định tính - ADP', 'Định lượng - ADP', 'Định giá - ADP', 'Benjamin Graham - ADP'. Ngày truy cập dữ liệu: 06/08/2026."]);

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
