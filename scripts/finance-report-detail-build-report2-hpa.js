const { google } = require('googleapis');
const path = require('path');

const spreadsheetId = '1E8goOhD5WvReVK2WyWRRYM-6tKbzifxstcVuUjiEaYE';
const targetSheet = 'Báo cáo 2 - HPA';
const KEY_PATH = path.join(__dirname, '..', 'config', 'daily-agent-490610-7eb7985b33e3.json');

const rows = [];
rows.push(['BÁO CÁO PHÂN TÍCH CỔ PHIẾU CTCP PHÁT TRIỂN NÔNG NGHIỆP HÒA PHÁT (HOSE: HPA)']);
rows.push(['Học viện AYP — The Intelligent Investor | Tổng hợp Định tính, Định lượng, Định giá, Bộ tiêu chí Benjamin Graham | Cập nhật 06/08/2026, dữ liệu BCTC hợp nhất 2025 kiểm toán + Q4/2025-Q2/2026 (sheet \'HPA\', nguồn cafef.vn API, đã verify Tổng tài sản≈Tổng nguồn vốn — lệch 30 triệu đồng/4.7 nghìn tỷ = 0.0000064%, sai số nhỏ gốc từ báo cáo kiểm toán cafef công bố, không phải lỗi thu thập)']);
rows.push([]);
rows.push(['I. TỔNG QUAN DOANH NGHIỆP']);
rows.push(['Ngành', 'Chăn nuôi (heo/bò/gia cầm) + sản xuất thức ăn chăn nuôi (TACN) — mô hình khép kín "Feed-Farm". Thuộc hệ sinh thái Tập đoàn Hòa Phát (HPG), mảng nông nghiệp từ 2015.']);
rows.push(['Niêm yết', 'Niêm yết HOSE 06/02/2026. IPO thành công 30 triệu CP mới (1/2026, giá 41,900đ/CP, thu về 1,257 tỷ đồng), nâng vốn điều lệ từ 2,550 tỷ lên 2,850 tỷ đồng (255tr → 285tr CP lưu hành).']);
rows.push(['Mô hình kinh doanh', '4 mảng: Chăn nuôi heo (~44% DT 2025, 380,000 heo thương phẩm/năm), TACN (~27% DT 2025, 357,000 tấn, top 13 nhà sản xuất VN), Bò Úc nhập khẩu (dẫn đầu thị trường), Trứng sạch (dẫn đầu miền Bắc).']);
rows.push(['Lợi thế cạnh tranh', 'Mô hình tích hợp khép kín Feed-Farm (tự chủ nguyên liệu TACN cho chăn nuôi) tạo lợi thế chi phí; quy mô công nghiệp lớn (7 trại heo, 3 trại bò, 2 trại gia cầm, 2 nhà máy TACN 600,000 tấn/năm) so với chăn nuôi hộ nhỏ lẻ; hậu thuẫn thương hiệu/nguồn lực từ Tập đoàn Hòa Phát.']);
rows.push(['Rủi ro chính', '(1) Tính chu kỳ giá heo cao — LNST 2025 +55% chủ yếu nhờ giá heo tại đỉnh chu kỳ (nguồn cung hạn chế do dịch bệnh + hộ nhỏ giảm), Q1/2026 đã đảo chiều giảm (DTT -11%, LNST -17% YoY); (2) Track record cực ngắn — chỉ 1 năm BCTC kiểm toán (2025), niêm yết mới 6/2/2026; (3) Thanh khoản cổ phiếu rất thấp — free-float ước tính ~10-15% do Tập đoàn Hòa Phát sở hữu chi phối (~85-95%); (4) Nguyên liệu TACN nhập khẩu, nhạy cảm tỷ giá/giá hàng hóa toàn cầu; (5) Rủi ro dịch bệnh (ASF, dịch gia súc/gia cầm); (6) Chủ tịch HĐQT kiêm CEO Tập đoàn Hòa Phát — mức độ độc lập quản trị cần theo dõi.']);
rows.push(['Sự kiện đặc biệt cần lưu ý', 'IPO 30 triệu CP (1/2026, 41,900đ/CP) → niêm yết HOSE 6/2/2026. Đã trả cổ tức tiền mặt lần đầu 2,100đ/CP (18/5/2026, cho FY2025). Q1/2026 (quý đầu sau IPO) cho thấy dấu hiệu hạ nhiệt chu kỳ: DTT -11% YoY, LNST -17% YoY, biên LN gộp co 27%→26%.']);
rows.push([]);
rows.push(['II. KẾT QUẢ TÀI CHÍNH — CHỈ 1 NĂM KIỂM TOÁN (2025) + 3 QUÝ GẦN NHẤT (KHÔNG CÓ CAGR ĐA NĂM như FPT/VEA/SAB/FOX)']);
rows.push(['Chỉ tiêu', 'FY2025 (kiểm toán)', 'Q4/2025', 'Q1/2026', 'Q2/2026', 'Ghi chú']);
rows.push(['Tổng tài sản (tỷ đồng, cuối kỳ)', '4,700.35', '4,700.32', '5,472.47', '5,239.31', 'Tăng mạnh Q1/2026 nhờ 1,257 tỷ tiền IPO']);
rows.push(['Vốn chủ sở hữu (tỷ đồng, cuối kỳ)', '3,180.07', '3,180.07', '4,737.00', '4,438.42', 'Giảm nhẹ Q2/2026 do chi trả cổ tức 18/5/2026']);
rows.push(['Doanh thu thuần (tỷ đồng, trong kỳ — quý KHÔNG cộng dồn)', '8,116.01', '1,856.87', '1,763.76', '1,522.89', 'Giảm liên tục 2 quý gần nhất — xem bảng QoQ bên dưới']);
rows.push(['LNST của cổ đông Công ty mẹ (tỷ đồng, trong kỳ)', '1,596.84', '301.89', '337.07', '304.28', 'Đỉnh ở Q1/2026 rồi giảm lại Q2/2026']);
rows.push(['ROE annualized (%, quý đã năm hóa ×4)', '50.21', '37.97', '28.46', '27.42', 'XU HƯỚNG GIẢM DẦN qua 3 quý — nhất quán với luận điểm hạ nhiệt chu kỳ giá heo']);
rows.push(['ROA annualized (%, quý đã năm hóa ×4)', '33.97', '25.69', '24.64', '23.23', 'Cùng xu hướng giảm']);
rows.push(['D/E (lần)', '0.48', '0.48', '0.16', '0.18', 'Giảm mạnh sau IPO — đòn bẩy rất thấp, bảng cân đối lành mạnh']);
rows.push(['Tỷ lệ thanh toán hiện hành (lần)', '1.78', '1.78', '4.68', '4.05', 'FY2025 audited DƯỚI ngưỡng Graham 2.0x; vượt xa sau IPO nhờ tiền mặt']);
rows.push(['(Nguồn: sheet \'HPA\' + \'Định lượng - HPA\' — BCTC hợp nhất cafef.vn, đã verify cân đối kế toán khớp gần tuyệt đối cả 4 kỳ)']);
rows.push([]);
rows.push(['Diễn biến theo quý (Tỷ đồng, số chính xác, thứ tự thời gian)', 'Q4/2025', 'Q1/2026', 'Q2/2026', 'QoQ gần nhất']);
rows.push(['Doanh thu thuần', '1,856.87', '1,763.76', '1,522.89', 'Q1→Q2: -13.66%']);
rows.push(['LNST của cổ đông Công ty mẹ', '301.89', '337.07', '304.28', 'Q1→Q2: -9.73%']);
rows.push(['(Nguồn: sheet \'HPA\' cột Q4/2025-Q2/2026, cafef.vn API TypeTime=QUY. Xu hướng giảm 2 quý liên tiếp — chưa đủ để khẳng định xu hướng dài hạn nhưng đáng theo dõi sát.)']);
rows.push([]);
rows.push(['III. ĐỊNH GIÁ HIỆN TẠI (06/08/2026)']);
rows.push(['Chỉ tiêu', 'Giá trị', 'Đánh giá']);
rows.push(['Giá cổ phiếu (đ/CP)', '31,950']);
rows.push(['EPS FY2025 audited (đ/CP)', '5,848', 'Cơ sở tính P/E chính (chỉ có 1 năm, chưa có EPS TTM chính thức từ công ty)']);
rows.push(['BVPS Q2/2026 gần nhất (đ/CP, 285tr CP hậu IPO)', '15,573']);
rows.push(['P/E theo EPS FY2025 audited (lần)', '5.46', 'RẤT THẤP — nhưng dựa trên EPS của năm ĐỈNH CHU KỲ giá heo, cần thận trọng khi ngoại suy']);
rows.push(['P/B theo BVPS Q2/2026 (lần)', '2.05', 'VƯỢT ngưỡng phòng thủ Graham 1.5x']);
rows.push(['P/E TTM & P/B — cross-check Simplize (06/08/2026)', 'P/E 6.21, P/B 1.83', 'Cùng kết luận: P/E thấp, P/B vượt ngưỡng — khác cơ sở tính (TTM 4 quý vs FY2025 audited) nhưng không mâu thuẫn kết luận']);
rows.push(['Graham Number (P/E × P/B)', '11.19 (tự tính) / 11.36 (Simplize)', 'ĐẠT xa ngưỡng 22.5 — cả 2 cách tính']);
rows.push(['Tỉ suất cổ tức gần nhất (%)', '6.57', 'Đã trả 2,100đ/CP 18/5/2026 — mức cao nếu duy trì được, nhưng chỉ có 1 lần chi trả, chưa rõ tính liên tục']);
rows.push(['Vốn hóa thị trường (tỷ đồng)', '9,105.75', 'Giá 31,950đ x 285,000,000 CP']);
rows.push(['(Nguồn: finance.vietstock.vn/HPA + simplize.vn/co-phieu/HPA, truy cập 06/08/2026. Chi tiết đối chiếu xem sheet \'Định giá - HPA\' và \'Benjamin Graham - HPA\'.)']);
rows.push([]);
rows.push(['IV. PHÂN TÍCH TỪNG MẢNG KINH DOANH']);
rows.push(['1. Chăn nuôi heo (~44% doanh thu 2025)']);
rows.push(['    ◦ Cơ hội: 380,000 heo thương phẩm + 280,000 heo giống/năm; nguồn cung thị trường hạn chế (dịch bệnh + hộ nhỏ lẻ giảm) hỗ trợ giá bán 2025.\nNguồn: Simplize HPA Profile, 24hmoney phân tích IPO, truy cập 06/08/2026.']);
rows.push(['    ◦ Rủi ro: Q1/2026 DT mảng này giảm -24% YoY, LN -31% YoY do sản lượng+giá heo cùng giảm — tính chu kỳ cao nhất trong 4 mảng; rủi ro dịch bệnh (ASF).\nNguồn: Vietstock Q1/2026 results, truy cập 06/08/2026.']);
rows.push(['2. Thức ăn chăn nuôi — TACN (~27% doanh thu 2025)']);
rows.push(['    ◦ Cơ hội: Top 13 nhà sản xuất TACN VN, 357,000 tấn 2025, công suất 2 nhà máy 600,000 tấn/năm — dư địa tăng sản lượng nếu nhu cầu phục hồi.\nNguồn: Simplize HPA Profile.']);
rows.push(['    ◦ Rủi ro: Q1/2026 DT -4% YoY, LN -18% YoY; nguyên liệu ngô/đậu tương nhập khẩu nhạy cảm tỷ giá + giá hàng hóa toàn cầu.\nNguồn: Vietstock Q1/2026 results.']);
rows.push(['3. Bò Úc nhập khẩu']);
rows.push(['    ◦ Cơ hội: Vị thế dẫn đầu nhập khẩu thịt bò Úc tại Việt Nam.\nNguồn: Vietstock HPA Profile, truy cập 06/08/2026.']);
rows.push(['    ◦ Rủi ro: KHÔNG tìm được tỷ trọng doanh thu/lợi nhuận riêng biệt mảng này — gộp chung nhóm "Chăn nuôi" trong báo cáo Q1/2026 tham khảo được, cần verify thêm khi có BCTN chi tiết.']);
rows.push(['4. Trứng sạch']);
rows.push(['    ◦ Cơ hội: Vị thế dẫn đầu thị trường trứng sạch khu vực miền Bắc.\nNguồn: Vietstock HPA Profile.']);
rows.push(['    ◦ Rủi ro: Tương tự mảng Bò Úc, KHÔNG tách bạch số liệu tài chính riêng công khai — cần verify thêm.']);
rows.push([]);
rows.push(['V. BENJAMIN GRAHAM — TÓM TẮT (chi tiết xem sheet \'Benjamin Graham - HPA\')']);
rows.push(['Kết quả tổng thể', '3/10 tiêu chí ĐẠT rõ ràng (D/E, P/E≤25x, Graham Number), 2/10 KHÔNG ĐẠT (P/B>1.5x, current ratio FY2025<2.0x), 5/10 KHÔNG ĐỦ DỮ LIỆU (đòi hỏi lịch sử 10 năm mà HPA chưa có — có lời/EPS tăng trưởng/cổ tức liên tục/quy mô Top 100).']);
rows.push(['Diễn giải', 'KHÔNG nên kết luận HPA "đạt tiêu chí phòng thủ Graham" — quá nhiều tiêu chí thiếu dữ liệu để đánh giá đầy đủ. Định giá hiện tại (P/E thấp, Graham Number thấp) trông hấp dẫn nhưng dựa trên EPS của năm được giới phân tích gọi là "đỉnh chu kỳ giá heo" — rủi ro định giá rẻ giả tạo (value trap) nếu lợi nhuận co lại về mức bình thường khi chu kỳ đảo chiều (đã có tín hiệu ở Q1-Q2/2026).']);
rows.push([]);
rows.push(['VI. THANH KHOẢN (chi tiết đầy đủ xem sheet \'Định giá - HPA\', mục VI)']);
rows.push(['Chỉ tiêu', '1 ngày', '7 ngày', '1 tháng', '6 tháng']);
rows.push(['KLGD trung bình (CP/phiên)', '5,700', '19,260', '35,957', '106,213']);
rows.push(['GTGD trung bình (đồng/phiên)', '179,735,000', '613,413,000', '1,142,279,524', '4,166,331,025']);
rows.push(['(Nguồn: finance.vietstock.vn/data/getpricehistory, 06/08/2026, dữ liệu phiên 05/08/2026. Chỉ 122 phiên lịch sử — do niêm yết mới 6/2/2026.)']);
rows.push([]);
rows.push(['VII. KẾT LUẬN ĐẦU TƯ']);
rows.push([
  'HPA có định giá hiện tại HẤP DẪN trên giấy (P/E 5.46-6.21x, Graham Number 11.19-11.36, đòn bẩy tài chính thấp và lành mạnh sau IPO) nhưng đi kèm HAI RỦI RO THỰC THI QUAN TRỌNG cần cân nhắc trước khi ra quyết định:\n\n' +
  '(1) RỦI RO TRACK RECORD NGẮN: chỉ có 1 năm BCTC kiểm toán (2025) và 3 quý gần nhất — KHÔNG đạt tối thiểu 5 năm theo chuẩn quy trình phân tích (so với FPT/VEA/SAB/FOX có 5-11 năm dữ liệu). LNST 2025 tăng +55% được giới phân tích (24hmoney) đánh giá là do giá heo ở ĐỈNH CHU KỲ (nguồn cung hạn chế), KHÔNG PHẢI tăng trưởng cơ cấu bền vững — Q1-Q2/2026 đã cho thấy tín hiệu đảo chiều rõ (DTT/LNST giảm QoQ liên tiếp, ROE/ROA annualized giảm dần từng quý: 50%→38%→28%→27%). Định giá rẻ hiện tại có thể là "value trap" nếu lợi nhuận tiếp tục co lại về mức chu kỳ bình thường — CẦN chờ thêm 2-3 năm dữ liệu kiểm toán để đánh giá đầy đủ tính bền vững trước khi coi đây là khoản đầu tư "phòng thủ" kiểu Graham.\n\n' +
  '(2) RỦI RO THANH KHOẢN THẤP: GTGD trung bình 6 tháng chỉ ~4.17 tỷ đồng/phiên, turnover ~0.05%/phiên trên vốn hóa ~9.1 nghìn tỷ — do Tập đoàn Hòa Phát sở hữu chi phối (free-float ước tính chỉ ~10-15%). Đây là RỦI RO THỰC THI (execution risk) cần cân nhắc nghiêm túc khi định cỡ vị thế: vị thế lớn có thể mất nhiều phiên để vào/thoát mà không ảnh hưởng đáng kể đến giá, và biên độ dao động giá có thể lớn hơn bình thường do thanh khoản mỏng.\n\n' +
  'KHUYẾN NGHỊ: nếu quan tâm, chỉ nên xem xét vị thế NHỎ, theo dõi sát KQKD các quý tiếp theo (đặc biệt xu hướng ROE/ROA annualized và biên lợi nhuận có tiếp tục giảm hay ổn định trở lại) trước khi tăng tỷ trọng — KHÔNG phù hợp với chiến lược "mua và giữ dài hạn kiểu phòng thủ Graham" ở giai đoạn dữ liệu hiện tại do thiếu track record đủ dài để xác nhận chất lượng tăng trưởng và do hạn chế thanh khoản khi cần thoát vị thế.',
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
