#!/usr/bin/env node
const { google } = require('googleapis');
const path = require('path');

const spreadsheetId = '1g5O1eZzN1nV896WZARFf-vS8YF9xF6IbcvCXdgC5NcM';
const targetSheet = 'Định tính - ADP';
const KEY_PATH = path.join(__dirname, '..', 'config', 'daily-agent-490610-7eb7985b33e3.json');

const rows = [];
rows.push(['', 'THE INTELLIGENT INVESTOR - HỌC VIỆN AYP']);
rows.push(['', 'Follow up 2 - Company Research - Nghiên cứu doanh nghiệp']);
rows.push([]);
rows.push(['', 'Good Company - Định tính', 'CTCP Sơn Á Đông (ADP)']);
rows.push(['I', 'Ngành']);
rows.push(['1', 'Đặc thù ngành\n(yếu tố quan trọng)',
`ADP hoạt động ngành SƠN CÔNG NGHIỆP: sơn phủ kim loại tấm (PCM - Pre-painted/Coated Metal), sơn tàu biển & sơn công nghiệp độ bền cao, sơn trang trí/xây dựng gốc dầu. Đặc thù: nguyên liệu đầu vào (nhựa gốc dầu, bột màu, dung môi, phụ gia) PHẦN LỚN NHẬP KHẨU — nhạy cảm giá dầu/hoá chất toàn cầu + tỷ giá USD/VND. Nhu cầu gắn chặt với ngành tôn thép mạ màu (PCM) và xây dựng/đóng tàu — mang tính chu kỳ theo đầu tư xây dựng, BĐS, và đặc biệt xuất khẩu tôn thép mạ màu VN. Cạnh tranh CAO: nhiều đối thủ nội (KOVA, 4 Oranges/Sơn Đồng Tâm...) và ngoại vốn lớn (Jotun, Nippon Paint, PPG...) trong các phân khúc ngoài PCM.
(Nguồn: DNSE Senses https://www.dnse.com.vn/senses/co-phieu-ADP, Vietstock https://finance.vietstock.vn/ADP-ctcp-son-a-dong.htm — truy cập 06/08/2026)`]);
rows.push(['2', 'Triển vọng ngành',
`ADP là NHÀ SẢN XUẤT TIÊN PHONG sơn phủ kim loại tấm (PCM) tại Việt Nam, giữ THỊ PHẦN LỚN NHẤT TOÀN QUỐC ~22% mảng này — gắn trực tiếp với ngành tôn thép mạ màu xuất khẩu (nhóm Hoa Sen, NKG, Tôn Đông Á...), hưởng lợi khi xuất khẩu tôn mạ màu VN tăng trưởng. Ở 2 mảng còn lại quy mô nhỏ hơn: sơn tàu biển/công nghiệp độ bền cao ~8% thị phần, sơn trang trí/xây dựng gốc dầu ~6% thị phần — đây là các phân khúc cạnh tranh với DN ngoại lớn hơn nhiều về vốn/thương hiệu. Sản lượng tiêu thụ 2025 đạt 5.832 tấn, GIẢM -18,25% so 2024 — tín hiệu triển vọng ngắn hạn không thuận lợi, phù hợp xu hướng doanh thu/LNST 2025 đều giảm so 2024 (xem mục II.7).
(Nguồn: WebSearch tổng hợp DNSE/Vietstock/Cafef; Simplize báo cáo — truy cập 06/08/2026)`]);
rows.push(['3', 'Rủi ro ngành',
`• Nguyên liệu đầu vào (nhựa gốc dầu, bột màu, dung môi) phần lớn nhập khẩu — biến động theo giá dầu/hoá chất toàn cầu và tỷ giá USD/VND, ăn trực tiếp vào biên lợi nhuận gộp (đã dao động rộng 15,09%-24,91% qua 9 năm — xem 'Định lượng - ADP').
• Cạnh tranh khốc liệt ở các mảng ngoài PCM (sơn trang trí, sơn công nghiệp) từ đối thủ ngoại vốn lớn (Jotun, Nippon Paint...) và nội (KOVA, 4 Oranges).
• Nhu cầu PCM phụ thuộc chu kỳ xuất khẩu tôn thép mạ màu — rủi ro gián tiếp từ chính sách phòng vệ thương mại (chống bán phá giá) mà các thị trường nhập khẩu tôn thép VN áp dụng.
• Doanh thu/LNST biến động mạnh không theo xu hướng ổn định qua các năm (xem mục II.7) — bản chất commodity/cyclical của ngành sơn công nghiệp gắn với chu kỳ xây dựng-xuất khẩu, KHÔNG tìm được số liệu thị phần trực tiếp so sánh ADP với từng đối thủ cụ thể qua các năm — cần verify thêm nếu có báo cáo ngành chính thức.
(Nguồn: tổng hợp WebSearch — truy cập 06/08/2026; số liệu tài chính từ cafef.vn qua sheet 'ADP')`]);
rows.push([]);
rows.push(['II', 'Mô hình kinh doanh']);
rows.push(['3', 'Các mảng kinh doanh',
`3 dòng sản phẩm chính: (1) Sơn phủ kim loại tấm PCM — SẢN PHẨM CHỦ LỰC, ~22% thị phần toàn quốc, vị thế dẫn đầu/tiên phong tại VN; (2) Sơn tàu biển & sơn công nghiệp độ bền cao — ~8% thị phần; (3) Sơn trang trí/xây dựng gốc dầu — ~6% thị phần. Sản lượng sơn công nghiệp bình quân ~5.000 tấn/năm (theo mô tả công ty); tổng sản lượng tiêu thụ 2025 = 5.832 tấn (-18,25% YoY).
(Nguồn: DNSE/Vietstock tổng hợp, WebSearch — truy cập 06/08/2026)`]);
rows.push(['4', 'Đầu vào — Nguyên liệu/Hạ tầng',
`Nguyên liệu chính: nhựa gốc dầu (resin), bột màu (pigment), dung môi, phụ gia — phần lớn NHẬP KHẨU, nhạy cảm giá dầu/hoá chất toàn cầu + tỷ giá. Công ty tiền thân từ 1970, một trong 2 nhà sản xuất sơn lớn nhất miền Nam trước 1975, chuyển đổi CTCP năm 2000 — cơ sở sản xuất/kinh nghiệm kỹ thuật lâu đời trong ngành.
(Nguồn: WebSearch tổng hợp — truy cập 06/08/2026)`]);
rows.push(['5', 'Đầu ra — Sản phẩm/Dịch vụ',
`Sản phẩm mang tính CÔNG NGHIỆP/B2B (bán cho nhà máy tôn thép, đóng tàu, xây dựng) nhiều hơn tiêu dùng trực tiếp B2C — trừ mảng sơn trang trí có thể bán qua đại lý cho người tiêu dùng cuối. Không có thương hiệu tiêu dùng đại chúng mạnh như các hãng sơn trang trí lớn (Dulux, Jotun...).
(Nguồn: suy luận từ mô tả sản phẩm/mảng kinh doanh — truy cập 06/08/2026)`]);
rows.push(['6', 'Đầu ra — Thị trường',
`Phân phối qua hệ thống đại lý tại Hà Nội, Nha Trang, Phú Thọ, Nam Định, Đà Nẵng, Quảng Nam, Rạch Giá, Cần Thơ — phủ cả 3 miền nhưng TẬP TRUNG các tỉnh có công nghiệp tôn thép/đóng tàu/xây dựng. Niêm yết HOSE từ 27/07/2023 (chuyển từ UPCOM, giá tham chiếu chào sàn 18.700đ/CP) — trước đó gắn bó UPCOM hơn 10 năm.
(Nguồn: DNSE Senses; WebSearch stockbiz.vn — truy cập 06/08/2026)`]);
rows.push(['7', 'Đánh giá mô hình kinh doanh\n+ Chất lượng tăng trưởng',
`9 NĂM DỮ LIỆU KIỂM TOÁN LIÊN TỤC (2017-2025, loại "K" - báo cáo riêng do ADP không có công ty con để hợp nhất) — đủ để đánh giá qua nhiều chu kỳ, khác biệt tích cực so với các mã mới niêm yết (HPA chỉ 1 năm). Trong phạm vi dữ liệu:
• DOANH THU BIẾN ĐỘNG MẠNH, KHÔNG CÓ XU HƯỚNG TĂNG ĐỀU: dao động 414,64-817,85 tỷ đồng qua 9 năm, tăng trưởng YoY dao động từ -27,55% (2021) đến +58,43% (2024) — tính CHU KỲ/BIẾN ĐỘNG rất cao, khác hẳn tăng trưởng đều đặn kiểu FPT.
• LNST CĐ mẹ biến động còn mạnh hơn: từ 30,86 tỷ (2018) đến 85,31 tỷ (2024), tăng trưởng YoY dao động -36,76% đến +89,10% — biên LNST dao động rộng 5,89%-13,70%.
• ROE dao động RẤT RỘNG 14,08%-31,32% qua các năm (trung bình ~21,8%) — mức khá tốt về hiệu quả sử dụng vốn nhưng KHÔNG ỔN ĐỊNH qua chu kỳ, phản ánh đúng bản chất ngành sơn công nghiệp gắn chu kỳ xây dựng-xuất khẩu tôn thép.
• 2025 (năm gần nhất): DTT 651,76 tỷ (-20,31% YoY), LNST CĐ mẹ 76,46 tỷ (-10,37% YoY) — SUY GIẢM so đỉnh 2024, cần theo dõi liệu đây là điều chỉnh ngắn hạn hay bắt đầu chu kỳ đi xuống mới.
• Đòn bẩy tài chính THẤP VÀ ỔN ĐỊNH suốt 9 năm: D/E dao động hẹp 0,19-0,43 lần (không có năm nào vượt 0,5 lần) — bảng cân đối lành mạnh nhất quán, điểm cộng rõ rệt so với biến động lợi nhuận.
→ KẾT LUẬN: mô hình có vị thế ngách vững (dẫn đầu PCM 22% thị phần) và bảng cân đối tài chính lành mạnh ổn định qua 9 năm, NHƯNG chất lượng tăng trưởng THẤP do tính chu kỳ/biến động cao của ngành sơn công nghiệp gắn nguyên liệu nhập khẩu + chu kỳ xây dựng-xuất khẩu tôn thép — không phải doanh nghiệp tăng trưởng đều đặn bền vững.
(Nguồn: sheet 'ADP' + 'Định lượng - ADP', BCTC kiểm toán cafef.vn 2017-2025, đã verify Tổng tài sản=Tổng nguồn vốn khớp tuyệt đối cả 9 năm)`]);
rows.push([]);
rows.push(['III', 'Quản trị']);
rows.push(['8', 'Cơ cấu cổ đông',
`SỞ HỮU PHÂN TÁN GIỮA NHÓM CỔ ĐÔNG CÁ NHÂN SÁNG LẬP/QUẢN LÝ — KHÁC BIỆT rõ so với VEA/FOX/HPA (đều có 1 tổ chức mẹ chi phối ~85-95%). Theo dữ liệu Vietstock (thời điểm không xác định chính xác gần nhất, ước tính quanh 2021-2023, CẦN VERIFY LẠI khi có báo cáo cổ đông lớn cập nhật), 5 cổ đông cá nhân lớn nhất nắm tổng cộng ước ~45,7% trên nền 23,04 triệu CP: Trần Bửu Trí ~11,36% (2.616.568 CP), Nguyễn Thị Nhung ~10,06% (2.318.269 CP), Lê Đình Quang ~9,22% (2.124.000 CP), Võ Hồng Hà ~7,91% (1.821.200 CP), Đỗ Thụy Thúy Vy ~7,13% (1.642.924 CP). KHÔNG CÓ cổ đông tổ chức/Nhà nước chi phối — free-float thực tế (phần còn lại ~54%) có thể phân tán rộng nhưng CHƯA verify được cơ cấu chi tiết.
(Nguồn: Vietstock hồ sơ doanh nghiệp https://finance.vietstock.vn/ADP/ho-so-doanh-nghiep.htm — truy cập 06/08/2026, dữ liệu có thể không phải thời điểm mới nhất)`]);
rows.push(['9', 'Ban lãnh đạo',
`Chủ tịch HĐQT: bà Nguyễn Thị Nhung (85 tuổi tại thời điểm dữ liệu — CAO TUỔI, cần lưu ý rủi ro kế nhiệm). Phó Chủ tịch HĐQT: ông Trần Bửu Trí (49 tuổi). Thành viên HĐQT: Võ Thị Bích Ngọc, Tống Trường Thịnh, Nguyễn Thị Minh Sáu. Phó Tổng giám đốc: Lê Đình Quang, Võ Hồng Hà. Kế toán trưởng: Huỳnh Thanh Tâm. Điểm đáng chú ý: hầu hết lãnh đạo chủ chốt ĐỒNG THỜI là cổ đông lớn cá nhân (xem mục III.8) — mô hình quản trị gia đình/sáng lập viên tập trung, không tách bạch rõ sở hữu và điều hành.
(Nguồn: Vietstock hồ sơ doanh nghiệp, đã dẫn — truy cập 06/08/2026)`]);
rows.push(['10', 'Rủi ro quản trị & minh bạch',
`Chủ tịch HĐQT cao tuổi (85, theo dữ liệu có thể chưa cập nhật mới nhất) — RỦI RO KẾ NHIỆM LÃNH ĐẠO cần theo dõi. Cơ cấu sở hữu phân tán giữa nhiều cá nhân gia đình/sáng lập kiêm nhiệm vị trí điều hành — tiềm ẩn rủi ro quản trị gia đình trị (family governance), thiếu cổ đông tổ chức lớn độc lập giám sát như các DN có vốn Nhà nước/tập đoàn mẹ (VEA/FOX/HPA). Niêm yết HOSE từ 07/2023 (hơn 3 năm) sau >10 năm ở UPCOM — track record công bố thông tin chuẩn HOSE còn tương đối ngắn.`]);
rows.push([]);
rows.push(['IV', 'Tổng hợp rủi ro chính (để đối chiếu Báo cáo 2)']);
rows.push(['11', 'Rủi ro tổng hợp',
`(1) RỦI RO CHU KỲ/BIẾN ĐỘNG LỢI NHUẬN CAO — doanh thu & LNST dao động rất mạnh qua các năm (LNST YoY dao động -36,76% đến +89,10%), 2025 đang trong xu hướng giảm (-10,37% LNST YoY); (2) RỦI RO NGUYÊN LIỆU NHẬP KHẨU — nhạy cảm giá dầu/hoá chất toàn cầu + tỷ giá USD/VND, tác động trực tiếp biên LN gộp; (3) RỦI RO CẠNH TRANH — đối thủ nội + ngoại lớn hơn ở các mảng ngoài PCM; (4) RỦI RO THANH KHOẢN — vốn hoá nhỏ (~531 tỷ), cơ cấu cổ đông phân tán cá nhân, KLGD bình quân cần xem chi tiết tại 'Định giá - ADP'; (5) RỦI RO KẾ NHIỆM LÃNH ĐẠO — Chủ tịch HĐQT cao tuổi theo dữ liệu hiện có; (6) RỦI RO QUẢN TRỊ GIA ĐÌNH — lãnh đạo chủ chốt đồng thời là cổ đông lớn cá nhân, thiếu giám sát tổ chức độc lập.
Điểm TÍCH CỰC: vị thế DẪN ĐẦU thị phần PCM (~22%) — ngách sản phẩm có rào cản kỹ thuật/quan hệ khách hàng tôn thép lâu năm; ĐÒN BẨY TÀI CHÍNH THẤP VÀ ỔN ĐỊNH suốt 9 năm (D/E luôn dưới 0,5 lần); lịch sử hoạt động lâu đời (từ 1970) và đã có 9 năm dữ liệu kiểm toán liên tục để đánh giá qua chu kỳ — hiếm có ở các mã mới niêm yết.`]);

async function main() {
  const auth = new google.auth.GoogleAuth({ keyFile: KEY_PATH, scopes: ['https://www.googleapis.com/auth/spreadsheets'] });
  const sheets = google.sheets({ version: 'v4', auth });
  const meta = await sheets.spreadsheets.get({ spreadsheetId });
  let sheetObj = meta.data.sheets.find((s) => s.properties.title === targetSheet);
  if (!sheetObj) {
    const addRes = await sheets.spreadsheets.batchUpdate({ spreadsheetId, requestBody: { requests: [{ addSheet: { properties: { title: targetSheet } } }] } });
    sheetObj = addRes.data.replies[0].addSheet;
  }
  await sheets.spreadsheets.values.clear({ spreadsheetId, range: `'${targetSheet}'!A1:E60` });
  await sheets.spreadsheets.values.update({ spreadsheetId, range: `'${targetSheet}'!A1`, valueInputOption: 'USER_ENTERED', requestBody: { values: rows } });
  console.log(JSON.stringify({ success: true, targetSheet, rows: rows.length }, null, 2));
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
