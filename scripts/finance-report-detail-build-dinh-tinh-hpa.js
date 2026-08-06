const { google } = require('googleapis');
const path = require('path');

const spreadsheetId = '1E8goOhD5WvReVK2WyWRRYM-6tKbzifxstcVuUjiEaYE';
const targetSheet = 'Định tính - HPA';
const KEY_PATH = '/home/nus/projects/My-AI-Agent/config/daily-agent-490610-7eb7985b33e3.json';

const rows = [];
rows.push(['', 'THE INTELLIGENT INVESTOR - HỌC VIỆN AYP']);
rows.push(['', 'Follow up 2 - Company Research - Nghiên cứu doanh nghiệp']);
rows.push([]);
rows.push(['', 'Good Company - Định tính', 'CTCP Phát triển Nông nghiệp Hòa Phát (HPA)']);
rows.push(['I', 'Ngành']);
rows.push(['1', 'Đặc thù ngành\n(yếu tố quan trọng)',
`HPA hoạt động trong ngành chăn nuôi (heo, bò, gia cầm) + sản xuất thức ăn chăn nuôi (TACN), theo mô hình khép kín "Feed-Farm" (tự sản xuất TACN → tự chăn nuôi). Đặc thù ngành: TÍNH CHU KỲ CAO theo giá heo hơi (phụ thuộc cung-cầu, dịch bệnh như dịch tả heo châu Phi ASF), biên lợi nhuận biến động mạnh theo chu kỳ giá, đầu vào TACN (ngô, đậu tương) phần lớn nhập khẩu nên nhạy cảm tỷ giá/giá hàng hóa toàn cầu. Khác về bản chất so với ngành viễn thông/hạ tầng (FOX) hay công nghiệp phụ trợ (VEA) — đây là ngành sản xuất hàng hóa cơ bản có tính chu kỳ hàng hóa (commodity cycle), không phải ngành tăng trưởng đều đặn.
(Nguồn: Simplize HPA Profile https://simplize.vn/co-phieu/HPA, truy cập 06/08/2026)`]);
rows.push(['2', 'Triển vọng ngành',
`Nguồn cung heo hơi trong nước hạn chế do dịch bệnh và số hộ chăn nuôi nhỏ lẻ giảm dần (xu hướng công nghiệp hóa ngành chăn nuôi VN) → hỗ trợ giá bán và biên lợi nhuận cho các doanh nghiệp chăn nuôi quy mô lớn như HPA trong ngắn-trung hạn. HPA thuộc top 13 nhà sản xuất TACN tại Việt Nam (357,000 tấn TACN sản xuất 2025, công suất 2 nhà máy 600,000 tấn/năm), top đầu nhập khẩu thịt bò Úc và trứng sạch khu vực miền Bắc. Tuy nhiên đây là lợi thế mang tính CHU KỲ (giá heo cao do thiếu cung) — bài phân tích 24hmoney đặt câu hỏi rõ liệu đây là "đỉnh chu kỳ giá heo" hay tăng trưởng bền vững.
(Nguồn: Simplize HPA Profile; 24hmoney phân tích IPO https://24hmoney.vn/news/hpa-chao-san-hose-mo-vang-nong-nghiep-cua-hoa-phat-hay-dinh-chu-ky-gia-heo-loi-nhuan-55-co-ben-vung-sau-ipo-c30a2737205.html — truy cập 06/08/2026)`]);
rows.push(['3', 'Rủi ro ngành',
`• Chu kỳ giá heo: LNST 2025 tăng +55% YoY chủ yếu nhờ GIÁ heo tăng (nguồn cung hạn chế do dịch bệnh + hộ nhỏ lẻ giảm), KHÔNG phải nhờ sản lượng (chỉ +5.9%) — nếu nguồn cung heo thị trường phục hồi mạnh, biên lợi nhuận có thể co lại về mức bình thường.
• Q1/2026 đã cho tín hiệu đảo chiều: DTT giảm -11% YoY, LNST giảm -17% YoY do sản lượng heo/bò bán ra giảm ĐỒNG THỜI với giá heo hơi giảm so cùng kỳ — biên LN gộp co từ 27% xuống 26%.
• Rủi ro dịch bệnh (ASF, dịch tả heo châu Phi và các dịch bệnh gia súc/gia cầm khác) có thể ảnh hưởng trực tiếp đàn nuôi.
• Biến động giá nguyên liệu TACN nhập khẩu (ngô, đậu tương) theo giá hàng hóa toàn cầu + tỷ giá USD/VND.
• Cạnh tranh từ các doanh nghiệp chăn nuôi/TACN lớn khác tại VN (C.P. Việt Nam, Dabaco, Masan MEATLife, BAF Việt Nam...) — KHÔNG tìm được số liệu thị phần trực tiếp so sánh HPA với các đối thủ này, cần verify thêm khi có báo cáo ngành chính thức.
(Nguồn: Vietstock Q1/2026 results https://vietstock.vn/2026/05/nong-nghiep-hoa-phat-kinh-doanh-ra-sao-hau-ipo-737-1438061.htm; 24hmoney phân tích IPO đã dẫn — truy cập 06/08/2026)`]);
rows.push(['→', 'Định hướng\nHPA đang theo đuổi',
`Mở rộng mô hình khép kín "Feed-Farm" (tự chủ TACN đầu vào cho chăn nuôi), củng cố vị thế dẫn đầu nhập khẩu thịt bò Úc và trứng sạch miền Bắc. Huy động 1,257 tỷ đồng từ IPO (30 triệu CP mới, giá 41,900đ/CP, 1/2026) để mở rộng quy mô — vốn điều lệ tăng từ 2,550 tỷ lên 2,850 tỷ đồng. Ban lãnh đạo định hướng mô hình công nghiệp hóa quy mô lớn nhằm tạo lợi thế chi phí bền vững hơn so với chăn nuôi hộ nhỏ lẻ, giảm phụ thuộc thuần vào chu kỳ giá.
(Nguồn: TinnhanhChungkhoan IPO result https://www.tinnhanhchungkhoan.vn/ipo-nong-nghiep-hoa-phat-hpa-phat-hanh-thanh-cong-30-trieu-co-phieu-gia-41900-dongco-phieu-post383425.html — truy cập 06/08/2026)`]);
rows.push([]);
rows.push(['II', 'Mô hình kinh doanh']);
rows.push(['3', 'Các mảng kinh doanh',
`4 mảng chính (theo cơ cấu doanh thu Q1/2026 & 2025): (1) Chăn nuôi heo — ~44% doanh thu 2025, 380,000 heo thương phẩm + 280,000 heo giống/năm; (2) Thức ăn chăn nuôi (TACN) — ~27% doanh thu 2025, 357,000 tấn sản xuất, top 13 nhà sản xuất TACN VN; (3) Bò Úc — dẫn đầu nhập khẩu thịt bò Úc tại VN; (4) Trứng sạch — dẫn đầu thị trường trứng sạch miền Bắc. Q1/2026: mảng Chăn nuôi 648 tỷ DT (-24% YoY, LN 214 tỷ -31%), TACN 508 tỷ DT (-4% YoY, LN 80 tỷ -18%) — cả 2 mảng lớn đều SUY GIẢM so cùng kỳ.
(Nguồn: Simplize HPA Profile; Vietstock Q1/2026 results, đã dẫn — truy cập 06/08/2026)`]);
rows.push(['4', 'Đầu vào — Nguyên liệu/Hạ tầng',
`Nguyên liệu TACN chủ yếu ngô, đậu tương — phần lớn NHẬP KHẨU (rủi ro tỷ giá + giá hàng hóa nông sản toàn cầu). Hạ tầng: 7 trại heo, 3 trại bò, 2 trại gia cầm, 2 nhà máy TACN công suất 600,000 tấn/năm. Con giống heo/bò tự chủ động qua hệ thống trại giống riêng (280,000 heo giống/năm).
(Nguồn: Simplize HPA Profile, đã dẫn — truy cập 06/08/2026)`]);
rows.push(['5', 'Đầu ra — Sản phẩm/Dịch vụ',
`Heo thương phẩm, thức ăn chăn nuôi (TACN) bán ra thị trường, thịt bò Úc nhập khẩu phân phối nội địa, trứng gà sạch. Sản phẩm mang tính hàng hóa (commodity) — giá bán theo thị trường, không có thương hiệu tiêu dùng riêng biệt mạnh như FMCG thuần túy (dù bài phân tích 24hmoney gợi ý mô hình tích hợp có thể được định giá gần FMCG hơn chăn nuôi truyền thống nếu chứng minh được tính ổn định qua chu kỳ).
(Nguồn: 24hmoney phân tích IPO, đã dẫn — truy cập 06/08/2026)`]);
rows.push(['6', 'Đầu ra — Thị trường',
`Thị trường nội địa Việt Nam. Trứng sạch: vị thế dẫn đầu khu vực miền Bắc. Bò Úc nhập khẩu: vị thế dẫn đầu toàn quốc. Heo/TACN: chưa tìm được số liệu thị phần cụ thể so với C.P. Việt Nam/Dabaco/Masan MEATLife/BAF — cần verify thêm.
(Nguồn: Vietstock HPA Profile https://finance.vietstock.vn/HPA-ctcp-phat-trien-nong-nghiep-hoa-phat.htm — truy cập 06/08/2026)`]);
rows.push(['7', 'Đánh giá mô hình kinh doanh\n+ Chất lượng tăng trưởng',
`CHỈ CÓ 1 NĂM DỮ LIỆU KIỂM TOÁN (2025) + 3 QUÝ (Q4/2025-Q2/2026) — KHÔNG đủ để đánh giá chất lượng tăng trưởng qua nhiều chu kỳ như đã làm với FPT/VEA/SAB/FOX (5-11 năm dữ liệu). Trong phạm vi dữ liệu có:
• LNST CĐ mẹ 2025 tăng mạnh (+55% theo báo chí, xem sheet 'Định lượng - HPA'/'Định giá - HPA' để đối chiếu số liệu BCTC), NHƯNG driver là GIÁ heo tăng do nguồn cung hạn chế — TĂNG TRƯỞNG MANG TÍNH CHU KỲ, chất lượng thấp hơn nhiều so với tăng trưởng dựa trên sản lượng/thị phần bền vững (như FOX/VEA).
• ROE annualized FY2025 = 50.21%, ROA annualized = 33.97% (rất cao — nhưng đây LÀ SỐ CỦA NĂM ĐỈNH CHU KỲ theo chính đánh giá của giới phân tích, KHÔNG NÊN ngoại suy là mức bền vững dài hạn).
• Q1/2026 (quý đầu sau IPO) đã cho thấy ĐẢO CHIỀU: DTT -11% YoY, LNST -17% YoY — biên LN gộp co lại 27%→26%. ROE annualized theo quý cũng giảm dần: 37.97% (Q4/2025) → 28.46% (Q1/2026) → 27.42% (Q2/2026) — xu hướng GIẢM DẦN qua 3 quý gần nhất, nhất quán với cảnh báo "đỉnh chu kỳ" của giới phân tích.
• Đòn bẩy tài chính THẤP và đang giảm thêm: D/E giảm từ 0.48 lần (2025) xuống 0.16-0.18 lần (Q1-Q2/2026) nhờ vốn IPO — bảng cân đối lành mạnh, ít rủi ro tài chính, nhưng đây là điểm mạnh về CƠ CẤU VỐN chứ không bù đắp được rủi ro CHU KỲ NGÀNH.
→ KẾT LUẬN: mô hình có nền tảng tích hợp khép kín (Feed-Farm) và bảng cân đối lành mạnh sau IPO, nhưng KHÔNG đủ dữ liệu lịch sử để khẳng định chất lượng tăng trưởng bền vững — số liệu 3 quý gần nhất cho thấy xu hướng SUY YẾU dần từ đỉnh 2025, phù hợp với rủi ro chu kỳ giá heo đã nêu ở mục I.3.
(Nguồn: sheet 'HPA' + 'Định lượng - HPA', BCTC hợp nhất cafef.vn (2025 kiểm toán + Q4/2025-Q2/2026), đã verify Tổng tài sản≈Tổng nguồn vốn khớp (lệch 30 triệu đồng/4.7 nghìn tỷ, 0.0000064%, sai số nhỏ nguồn gốc từ chính báo cáo kiểm toán cafef công bố — KHÔNG phải lỗi thu thập))`]);
rows.push([]);
rows.push(['III', 'Quản trị']);
rows.push(['8', 'Cơ cấu cổ đông',
`SỞ HỮU TẬP TRUNG RẤT CAO: Tập đoàn Hòa Phát (HPG) là cổ đông lớn nhất, nắm giữ 242.247.000 cổ phiếu HPA — tương đương ~95% trước/tại thời điểm IPO (trên nền 255 triệu CP cũ) và ước tính giảm còn ~85% trên tổng 285 triệu CP sau khi phát hành thêm 30 triệu CP IPO (số % CHÍNH XÁC hậu IPO CHƯA verify được qua báo cáo cổ đông lớn cập nhật — cần kiểm tra thêm). Free-float ước tính chỉ ~10-15% — giải thích trực tiếp cho THANH KHOẢN RẤT THẤP đã đo tại 'Định giá - HPA' (GTGD 6 tháng chỉ ~4.17 tỷ đồng/phiên, turnover ~0.05%/phiên). Cơ cấu này TƯƠNG TỰ VEA (cổ đông chi phối single, free-float nhỏ) nhưng khác về BẢN CHẤT: HPG là tập đoàn tư nhân, không phải vốn Nhà nước như SCIC/Bộ Công an ở VEA/FOX.
(Nguồn: tổng hợp tin tức lãnh đạo/cổ đông HPA — truy cập 06/08/2026, xem Nguồn dòng dưới)`]);
rows.push(['9', 'Ban lãnh đạo',
`Chủ tịch HĐQT: ông Nguyễn Việt Thắng — ĐỒNG THỜI là Tổng giám đốc Tập đoàn Hòa Phát (HPG), kiêm nhiệm 2 vị trí ở công ty mẹ và công ty con niêm yết — phổ biến trong mô hình các công ty con Hòa Phát (tương tự FOX từng thuộc hệ sinh thái FPT) nhưng là điểm cần lưu ý về mức độ độc lập quản trị. Tổng giám đốc kiêm người đại diện theo pháp luật: bà Phạm Thị Hồng Vân. Ông Thắng cá nhân nắm giữ 100,000 cổ phần HPA (tỷ lệ rất nhỏ, <0.05%) — không phải sở hữu lớn cá nhân, quyền kiểm soát chủ yếu qua vai trò tại HPG.
(Nguồn: 24h.com.vn https://www.24h.com.vn/kinh-doanh/chu-tich-nong-nghiep-hoa-phat-nguyen-viet-thang-giau-the-nao-c161a1718487.html — truy cập 06/08/2026)`]);
rows.push(['10', 'Rủi ro quản trị & minh bạch',
`Công ty mới niêm yết HOSE từ 06/02/2026 — lịch sử giao dịch/công bố thông tin công khai CHỈ ~6 tháng, chưa đủ để đánh giá độ tin cậy công bố thông tin qua nhiều chu kỳ như VEA/FPT/FOX (nhiều năm hồ sơ). Phụ thuộc nhiều vào thương hiệu/uy tín Tập đoàn Hòa Phát (HPG) — rủi ro liên đới nếu có sự kiện bất lợi ở công ty mẹ hoặc các công ty con khác trong hệ sinh thái HPG.`]);
rows.push([]);
rows.push(['IV', 'Tổng hợp rủi ro chính (để đối chiếu Báo cáo 2)']);
rows.push(['11', 'Rủi ro tổng hợp',
`(1) RỦI RO CHU KỲ NGÀNH — cao nhất: tăng trưởng LNST 2025 chủ yếu nhờ giá heo tại đỉnh chu kỳ, Q1/2026 đã đảo chiều giảm; (2) RỦI RO TRACK RECORD NGẮN — chỉ 1 năm kiểm toán, không đủ dữ liệu qua chu kỳ đầy đủ (thường 3-5 năm với ngành chăn nuôi); (3) RỦI RO THANH KHOẢN — free-float thấp (~10-15%) do HPG sở hữu chi phối, GTGD 6 tháng chỉ ~4.17 tỷ đồng/phiên; (4) RỦI RO NGUYÊN LIỆU ĐẦU VÀO — TACN nhập khẩu, nhạy cảm tỷ giá/giá hàng hóa toàn cầu; (5) RỦI RO DỊCH BỆNH — ASF và dịch bệnh gia súc/gia cầm khác; (6) RỦI RO QUẢN TRỊ — Chủ tịch kiêm nhiệm CEO công ty mẹ, mức độ độc lập cần theo dõi.
Điểm TÍCH CỰC: đòn bẩy tài chính thấp và giảm mạnh sau IPO (D/E 0.48→0.16-0.18 lần), bảng cân đối lành mạnh, mô hình tích hợp khép kín Feed-Farm tạo lợi thế chi phí dài hạn so với chăn nuôi nhỏ lẻ, thương hiệu/nguồn lực hậu thuẫn từ Tập đoàn Hòa Phát.`]);

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
