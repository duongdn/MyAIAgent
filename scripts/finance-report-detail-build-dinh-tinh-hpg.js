const { google } = require('googleapis');

const spreadsheetId = '1tlZRDWspk3I9TlrJAnPCev5RrLGNmy0JBJMkbvHl97k';
const targetSheet = 'Định tính - HPG';
const KEY_PATH = '/home/nus/projects/My-AI-Agent/config/daily-agent-490610-7eb7985b33e3.json';

const rows = [];
rows.push(['', 'THE INTELLIGENT INVESTOR - HỌC VIỆN AYP']);
rows.push(['', 'Follow up 2 - Company Research - Nghiên cứu doanh nghiệp']);
rows.push([]);
rows.push(['', 'Good Company - Định tính', 'CTCP Tập đoàn Hòa Phát (HPG)']);
rows.push(['I', 'Ngành']);
rows.push(['1', 'Đặc thù ngành\n(yếu tố quan trọng)',
`HPG hoạt động chính trong ngành thép (thép xây dựng, thép cuộn cán nóng HRC, ống thép, tôn mạ) — ngành CÔNG NGHIỆP NẶNG, VỐN ĐẦU TƯ LỚN, TÍNH CHU KỲ CAO theo giá thép thế giới (phụ thuộc giá quặng sắt/than cốc đầu vào, cung-cầu thép Trung Quốc, chu kỳ xây dựng-bất động sản). Ngoài thép, HPG còn có mảng Nông nghiệp (thức ăn chăn nuôi, chăn nuôi heo/bò/gia cầm, trứng gà — qua công ty con CTCP Phát triển Nông nghiệp Hòa Phát/HPA đã niêm yết riêng 2026) và Bất động sản (khu công nghiệp, bất động sản dân dụng). Mô hình sản xuất thép KHÉP KÍN từ quặng sắt/nguyên liệu thô đến thép thành phẩm giúp kiểm soát chi phí tốt nhất ngành tại Việt Nam.
(Nguồn: BSC Research HPG report https://www.bsc.com.vn/Report/ReportFile/13148/, uptrend.vn phân tích HPG — truy cập 18/09/2026)`]);
rows.push(['2', 'Triển vọng ngành',
`HPG dẫn đầu thị phần thép xây dựng Việt Nam ~36% (Q1-Q2/2026). Khu liên hợp gang thép Dung Quất 2 đã vận hành, bổ sung 3-4 triệu tấn HRC/năm — HPG đặt mục tiêu tiêu thụ gần 15 triệu tấn thép năm 2026 (+~40% YoY, cao nhất lịch sử). Đến 2027, công suất thép thô dự kiến đạt 18 triệu tấn (9 triệu tấn HRC + 9 triệu tấn thép dài). Tỷ trọng thép chất lượng cao (phục vụ cơ khí chế tạo, ô tô, đóng tàu, dầu khí, kết cấu thép, năng lượng) đã vượt 60% sản lượng — xu hướng dịch chuyển giá trị gia tăng cao hơn thép xây dựng thông thường. Thị trường xuất khẩu (HRC, tôn mạ) đối mặt rủi ro phòng vệ thương mại (thuế chống bán phá giá) từ các nước nhập khẩu.
(Nguồn: Vietstock "Hòa Phát đặt mục tiêu gần 15 triệu tấn thép 2026" https://vietstock.vn/2026/06/hoa-phat-dat-muc-tieu-gan-15-trieu-tan-thep-trong-nam-2026-737-1454212.htm; vneconomy Q1/2026 KQKD — truy cập 18/09/2026)`]);
rows.push(['3', 'Rủi ro ngành',
`• Chu kỳ giá thép toàn cầu: biên lợi nhuận thép nhạy cảm cao với giá quặng sắt/than cốc đầu vào và giá bán thép đầu ra — chu kỳ lên xuống mạnh, khó dự báo dài hạn.
• Dư cung thép Trung Quốc — rủi ro thép giá rẻ Trung Quốc tràn vào thị trường nội địa và cạnh tranh tại các thị trường xuất khẩu của HPG.
• Rủi ro phòng vệ thương mại: HRC/tôn mạ Việt Nam (bao gồm của HPG) từng bị/đang bị điều tra chống bán phá giá tại một số thị trường xuất khẩu — ảnh hưởng trực tiếp doanh thu xuất khẩu.
• Rủi ro tài chính từ đầu tư CAPEX lớn cho Dung Quất 2 (tổng vốn đầu tư nhiều tỷ USD) — áp lực nợ vay và khấu hao trong giai đoạn đầu vận hành trước khi đạt hiệu suất tối ưu.
• Rủi ro môi trường: ngành luyện thép/gang thép có mức phát thải và tiêu thụ năng lượng cao, chịu áp lực quy định môi trường/carbon ngày càng chặt.
• Mảng nông nghiệp (qua HPA) mang tính chu kỳ giá heo riêng biệt, không tương quan hoàn toàn với chu kỳ thép — vừa là đa dạng hóa vừa là rủi ro ngành khác biệt cần theo dõi riêng.
(Nguồn: BSC Research, DSC "Có nên mua cổ phiếu HPG hay không? T6/2026" https://www.dsc.com.vn/kien-thuc/co-nen-mua-co-phieu-hpg-hay-khong — truy cập 18/09/2026)`]);
rows.push(['→', 'Định hướng\nHPG đang theo đuổi',
`Đẩy mạnh vận hành ổn định Dung Quất 2 để đạt sản lượng kỷ lục ~15 triệu tấn thép 2026, tiếp tục dịch chuyển cơ cấu sản phẩm sang thép chất lượng cao (đã >60% sản lượng) phục vụ công nghiệp chế tạo/ô tô/đóng tàu/năng lượng — biên lợi nhuận cao hơn thép xây dựng thông thường. Mở rộng công suất tới 18 triệu tấn/năm vào 2027. Duy trì đa dạng hóa qua mảng Nông nghiệp (HPA, đã niêm yết riêng 2026) và Bất động sản khu công nghiệp/dân dụng để giảm phụ thuộc thuần vào chu kỳ thép.
(Nguồn: KIS Vietnam "KQKD HPG Q2/2026: Dung Quất 2 tạo động lực?" https://kisvn.vn/hoc-dau-tu/ket-qua-kinh-doanh-hpg-quy-2-2026 — truy cập 18/09/2026)`]);
rows.push([]);
rows.push(['II', 'Mô hình kinh doanh']);
rows.push(['3', 'Các mảng kinh doanh',
`3 mảng chính: (1) Thép (Gang thép) — mảng cốt lõi, chiếm phần lớn doanh thu và lợi nhuận, gồm thép xây dựng, HRC, ống thép, tôn mạ; (2) Nông nghiệp — thức ăn chăn nuôi, chăn nuôi heo/bò/gia cầm, trứng sạch (qua công ty con HPA đã IPO/niêm yết riêng đầu 2026); (3) Bất động sản — khu công nghiệp (Hòa Phát là chủ đầu tư nhiều KCN lớn) và bất động sản dân dụng. Q1/2026 LNST hợp nhất đạt hơn 9,000 tỷ đồng, mảng thép được dự báo "rất khả quan" nhờ Dung Quất 2.
(Nguồn: vneconomy "Quý 1/2026, HPG lãi hơn 9.000 tỷ đồng" https://vneconomy.vn/quy-12026-hpg-lai-hon-9000-ty-dong-va-du-bao-mang-thep-rat-kha-quan.htm — truy cập 18/09/2026)`]);
rows.push(['4', 'Đầu vào — Nguyên liệu/Hạ tầng',
`Nguyên liệu chính: quặng sắt, than cốc, thép phế — phần lớn nhập khẩu (rủi ro tỷ giá + giá hàng hóa toàn cầu). Hạ tầng: các khu liên hợp gang thép lớn tại Hải Dương, Dung Quất (Quảng Ngãi, gồm Dung Quất 1 và Dung Quất 2 mới vận hành), tổng công suất thép thô hướng tới 18 triệu tấn/năm vào 2027. Mô hình khép kín từ luyện gang, luyện thép, cán thép giúp kiểm soát giá thành tốt hơn phần lớn đối thủ trong nước.
(Nguồn: BSC Research, uptrend.vn — truy cập 18/09/2026)`]);
rows.push(['5', 'Đầu ra — Sản phẩm/Dịch vụ',
`Thép xây dựng, thép cuộn cán nóng (HRC), ống thép, tôn mạ — bán cho thị trường xây dựng dân dụng/hạ tầng, cơ khí chế tạo, sản xuất ô tô, đóng tàu, dầu khí, kết cấu thép, năng lượng (thép chất lượng cao >60% sản lượng). Sản phẩm mang tính hàng hóa công nghiệp (giá theo thị trường thép thế giới/trong nước), khác biệt hóa chủ yếu qua chất lượng/tiêu chuẩn kỹ thuật hơn là thương hiệu tiêu dùng.
(Nguồn: BSC Research, vietstock — truy cập 18/09/2026)`]);
rows.push(['6', 'Đầu ra — Thị trường',
`Chủ yếu thị trường nội địa Việt Nam (dẫn đầu thị phần thép xây dựng ~36%), có xuất khẩu HRC/tôn mạ ra một số thị trường quốc tế (chịu rủi ro phòng vệ thương mại nêu ở mục I.3). Vị thế: nhà sản xuất thép lớn nhất Việt Nam và Đông Nam Á theo công suất.
(Nguồn: BSC Research, DSC — truy cập 18/09/2026)`]);
rows.push(['7', 'Đánh giá mô hình kinh doanh\n+ Chất lượng tăng trưởng',
`Dữ liệu BCTC hợp nhất 2016-2025 (10 năm kiểm toán liên tục, xem sheet 'HPG'/'Định lượng - HPG') cho thấy tăng trưởng quy mô rất mạnh: Tổng tài sản tăng từ 33,227 tỷ (2016) lên 257,899 tỷ đồng (2025) — CAGR ~22.9%/năm trong 9 năm. Doanh thu thuần và LNST biến động theo chu kỳ giá thép rõ rệt (đặc biệt giai đoạn 2022 lợi nhuận sụt giảm mạnh do giá thép thế giới lao dốc và tồn kho giá cao) — xác nhận đúng đặc thù chu kỳ ngành đã nêu ở mục I. Q1/2026 LNST hợp nhất >9,000 tỷ đồng và triển vọng "rất khả quan" cho thấy chu kỳ hiện tại đang ở pha phục hồi, được hỗ trợ bởi Dung Quất 2 đi vào vận hành ổn định — đây là ĐỘNG LỰC TĂNG TRƯỞNG CẤU TRÚC (tăng công suất) hơn là thuần túy giá bán, khác với trường hợp HPA (công ty con nông nghiệp) nơi tăng trưởng 2025 chủ yếu do giá.
→ KẾT LUẬN: mô hình có lợi thế quy mô/chi phí thấp nhất ngành trong nước, đang bước vào giai đoạn tăng công suất cấu trúc (Dung Quất 2) — chất lượng tăng trưởng tốt hơn một công ty thuần chu kỳ nhờ yếu tố mở rộng công suất, nhưng NHÀ ĐẦU TƯ CẦN LƯU Ý biên lợi nhuận vẫn sẽ biến động mạnh theo chu kỳ giá thép toàn cầu trong ngắn-trung hạn.
(Nguồn: sheet 'HPG' + 'Định lượng - HPG', BCTC hợp nhất cafef.vn 2016-2025, đã verify Tổng tài sản=Tổng nguồn vốn khớp tuyệt đối cả 10 năm)`]);
rows.push([]);
rows.push(['III', 'Quản trị']);
rows.push(['8', 'Cơ cấu cổ đông',
`Chủ tịch Trần Đình Long là cổ đông sáng lập lớn nhất, sở hữu ~25.80% vốn điều lệ (~1.98 tỷ cổ phiếu, tính đến 18/03/2026). Gia đình ông Long (vợ Vũ Thị Hiền 6.88%, em Trần Tuấn Dương 2.31%, con trai Trần Vũ Minh 2.3% + qua Đại Phong Trading 0.047%) nắm tổng cộng ~35.45% vốn điều lệ — mức sở hữu chi phối gia đình cao nhưng KHÔNG áp đảo tuyệt đối (dưới 51%), khác biệt rõ so với HPA (công ty con, HPG sở hữu ~85-95%). Cơ cấu nhà đầu tư: trong nước ~78%, nước ngoài ~22%. Free-float tương đối cao so nhóm công ty gia đình chi phối khác — nhất quán với thanh khoản HPG cao (GTGD bình quân hàng trăm tỷ đồng/phiên, xem 'Định giá - HPG').
(Nguồn: EBC Financial Group, cafef "Con trai Chủ tịch Trần Đình Long gom thêm cổ phiếu HPG" https://cafef.vn/con-trai-chu-tich-tran-dinh-long-gom-them-hang-chuc-trieu-co-phieu-hpg-188260414085639774.chn — truy cập 18/09/2026)`]);
rows.push(['9', 'Ban lãnh đạo',
`Ông Trần Đình Long tiếp tục giữ chức Chủ tịch HĐQT nhiệm kỳ 2026-2031 (vừa được bầu lại tại ĐHCĐ 2026) — người sáng lập và lãnh đạo xuyên suốt HPG từ khi thành lập, được xem là "vua thép" Việt Nam, có uy tín/kinh nghiệm điều hành dài hạn qua nhiều chu kỳ ngành thép. Gia đình tiếp tục gia tăng sở hữu (con trai Trần Vũ Minh đăng ký mua thêm cổ phiếu 2026) — thể hiện cam kết dài hạn với công ty, dù có sự kiện con trai Chủ tịch không mua đủ số lượng cổ phiếu đã đăng ký (2026) — cần lưu ý nhưng không phải dấu hiệu quản trị nghiêm trọng.
(Nguồn: vneconomy "Ông Trần Đình Long giữ chức Chủ tịch HĐQT Hòa Phát nhiệm kỳ 2026-2031" https://vneconomy.vn/ong-tran-dinh-long-giu-chuc-chu-tich-hdqt-hoa-phat-nhiem-ky-2026-2031.htm; tuoitre.vn — truy cập 18/09/2026)`]);
rows.push(['10', 'Rủi ro quản trị & minh bạch',
`Công ty niêm yết HOSE lâu năm, hồ sơ công bố thông tin/BCTC kiểm toán đầy đủ liên tục từ 2016 (10 năm dữ liệu trong sheet raw) — mức độ minh bạch tốt so với các công ty mới niêm yết như HPA. Rủi ro quản trị chính: mức độ tập trung quyền lực cao vào cá nhân Chủ tịch sáng lập (phong cách lãnh đạo tập trung, quyết định chiến lược lớn như Dung Quất 2 phụ thuộc nhiều vào tầm nhìn cá nhân) — rủi ro kế nhiệm dài hạn cần theo dõi dù chưa có dấu hiệu cấp bách trong ngắn hạn.`]);
rows.push([]);
rows.push(['IV', 'Tổng hợp rủi ro chính (để đối chiếu Báo cáo 2)']);
rows.push(['11', 'Rủi ro tổng hợp',
`(1) RỦI RO CHU KỲ GIÁ THÉP — cao nhất, ảnh hưởng trực tiếp biên lợi nhuận, minh chứng rõ qua biến động LNST 2016-2025 trong sheet raw; (2) RỦI RO CAPEX/NỢ VAY DUNG QUẤT 2 — dự án vốn đầu tư lớn, áp lực khấu hao/lãi vay giai đoạn đầu vận hành; (3) RỦI RO THƯƠNG MẠI QUỐC TẾ — điều tra chống bán phá giá với HRC/tôn mạ xuất khẩu; (4) RỦI RO DƯ CUNG THÉP TRUNG QUỐC — cạnh tranh giá tại thị trường nội địa và xuất khẩu; (5) RỦI RO MÔI TRƯỜNG — ngành phát thải cao, áp lực quy định carbon; (6) RỦI RO QUẢN TRỊ KẾ NHIỆM — phụ thuộc lớn vào cá nhân Chủ tịch sáng lập.
Điểm TÍCH CỰC: vị thế dẫn đầu tuyệt đối ngành thép VN (~36% thị phần thép xây dựng), mô hình khép kín chi phí thấp nhất ngành, Dung Quất 2 tạo động lực tăng trưởng công suất cấu trúc (không chỉ phụ thuộc giá), 10 năm dữ liệu tài chính kiểm toán minh bạch, thanh khoản cổ phiếu cao, đa dạng hóa qua Nông nghiệp/Bất động sản.`]);

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
