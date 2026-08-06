#!/usr/bin/env node
const { google } = require('googleapis');
const path = require('path');

const spreadsheetId = '1g5O1eZzN1nV896WZARFf-vS8YF9xF6IbcvCXdgC5NcM';
const targetSheet = 'Benjamin Graham - ADP';
const KEY_PATH = path.join(__dirname, '..', 'config', 'daily-agent-490610-7eb7985b33e3.json');

const rows = [];
rows.push(['CTCP Sơn Á Đông (ADP) — Đánh giá theo Bộ tiêu chí Benjamin Graham (NĐT phòng thủ)']);
rows.push([
  `Nguồn: 10 tiêu chí NĐT phòng thủ (khung chuẩn dùng cho FPT/VEA/SAB/FOX/HPA). Số liệu tài chính ADP lấy trực tiếp/công thức tham chiếu sheet 'ADP' (BCTC kiểm toán 2017-2025, 9 năm liên tục, cafef.vn API, đã verify tổng tài sản=tổng nguồn vốn khớp) và 'Định lượng - ADP'/'Định giá - ADP'. Giá/P/E/P/B: Vietstock/Simplize 06/08/2026. Cổ tức: cotuc.vn (lịch sử xác nhận 2022-2026). Cập nhật 06/08/2026.`,
]);
rows.push([]);
rows.push(['I. 10 TIÊU CHÍ NHÀ ĐẦU TƯ PHÒNG THỦ (BENJAMIN GRAHAM)']);
rows.push(['STT', 'Tiêu chí', 'Ngưỡng yêu cầu', 'Số liệu ADP', 'Kết quả']);
rows.push(['1', 'Quy mô — Hạng nhất, top 100 hoặc top ngành', 'Top ngành hoặc trong Top 100 vốn hóa',
  `Vốn hóa hiện tại ~531 tỷ đồng (giá 23.050đ × 23.039.850 CP, 06/08/2026), doanh thu FY2025 = 651,76 tỷ đồng — VỐN HÓA NHỎ (small cap), thấp hơn nhiều so với chuẩn quy mô gốc của Graham. KHÔNG truy cập được file "Top 100" snapshot dùng cho FPT/VEA/FOX để đối chiếu trực tiếp trong lần build này.`, 'KHÔNG ĐẠT (vốn hóa/doanh thu nhỏ, dưới chuẩn quy mô)']);
rows.push(['2', 'Vốn — TS ngắn hạn/Nợ ngắn hạn (Current ratio)', '≥ 2.0 lần',
  `ĐẠT Ở CẢ 9/9 NĂM (2017-2025): 2,14 / 2,75 / 3,26 / 4,14 / 5,12 / 3,66 / 3,60 / 3,83 / 3,83 lần — chưa năm nào dưới ngưỡng 2.0, xu hướng ổn định ở mức 3,6-5,1 lần trong 5 năm gần nhất.`, 'ĐẠT (9/9 năm)']);
rows.push(['3', 'Nợ phải trả/Vốn chủ sở hữu (D/E)', '≤ 2.0 lần',
  `ĐẠT Ở CẢ 9/9 NĂM: dao động hẹp 0,19-0,43 lần (2017-2025) — thấp hơn ngưỡng rất nhiều, không năm nào vượt 0,5 lần. Đòn bẩy tài chính thấp và ổn định nhất quán.`, 'ĐẠT (9/9 năm)']);
rows.push(['4', 'Có lời 10 năm gần nhất', 'LNST dương cả 10 năm',
  `LNST CĐ mẹ DƯƠNG CẢ 9/9 NĂM có dữ liệu kiểm toán (2017-2025): 47,34 / 30,86 / 41,46 / 78,40 / 49,58 / 40,05 / 58,93 / 85,31 / 76,46 tỷ đồng — chưa năm nào lỗ, dù biến động mạnh về độ lớn. Thiếu 1 năm so chuẩn gốc 10 năm (chỉ có dữ liệu từ 2017) nhưng liên tục dương suốt giai đoạn có dữ liệu.`, 'ĐẠT (9/9 năm có dữ liệu, thiếu 1 năm so chuẩn 10 năm)']);
rows.push(['5', 'EPS TB 3 năm gần nhất > 33% so TB 3 năm xa nhất', '> 33%',
  `TB 3 năm xa nhất (2017-2019, EPS đồng/CP): (3.082+2.009+2.699)/3 = 2.596,7. TB 3 năm gần nhất (2023-2025): (2.558+3.703+3.319)/3 = 3.193,3. Tăng trưởng = (3.193,3-2.596,7)/2.596,7 = +22,98% — DƯỚI ngưỡng 33%, dù vẫn là mức tăng dương.`, 'KHÔNG ĐẠT (+22,98% < 33%)']);
rows.push(['6', 'Cổ tức > 0 trong 10 năm gần nhất', 'Trả cổ tức tiền mặt cả 10 năm',
  `XÁC NHẬN trả cổ tức tiền mặt LIÊN TỤC ít nhất 2022-2026 (nguồn cotuc.vn, nhiều đợt/năm, 6-8% mệnh giá mỗi đợt): 2022 (6%+8%), 2023 (6%), 2024 (8%+7%+7%+7%), 2025 (7%+8%), 2026 đợt 1 (7%). KHÔNG tìm được dữ liệu đầy đủ 2017-2021 (giai đoạn UPCOM) trong phạm vi tìm kiếm — không có dấu hiệu gián đoạn nhưng chưa xác nhận được đủ 10 năm.`, 'ĐẠT (≥5 năm gần nhất xác nhận, 2017-2021 chưa verify đủ)']);
rows.push(['7', 'EPS tăng trưởng trong 10 năm', 'EPS năm gần nhất > EPS năm xa nhất',
  `EPS 2025 (3.319đ/CP) > EPS 2017 (3.082đ/CP) — tăng nhẹ +7,7% qua 9 năm, VỀ KỸ THUẬT ĐẠT nhưng KHÔNG PHẢI tăng trưởng đều đặn: đỉnh 5.104đ (2020), đáy 1.738đ (2022) — biến động rất mạnh giữa 2 mốc đầu-cuối.`, 'ĐẠT về kỹ thuật (nhưng biến động mạnh giữa kỳ, không phải xu hướng tăng đều)']);
rows.push(['8', 'Trần định giá: P/E ≤ 25 lần', '≤ 25 lần',
  `P/E TTM (Vietstock/Simplize) = 7,33 lần. Cross-check theo EPS FY2025 audited: 23.050/3.319 = 6,95 lần — cùng kết luận, cả 2 cơ sở đều ĐẠT xa ngưỡng.`, 'ĐẠT']);
rows.push(['9', 'Khuyến nghị: P/E ≤ 15x và P/B ≤ 1.5x', 'PE≤15x và PB≤1.5x',
  `P/E 7,33x (đạt xa). P/B (Vietstock/Simplize) = 1,97x — VƯỢT ngưỡng 1,5x. Cross-check theo BVPS FY2025 (11.497đ): 23.050/11.497 = 2,01x — cùng xác nhận vượt ngưỡng.`, 'KHÔNG ĐẠT (do P/B, dù P/E rất tốt)']);
rows.push(['10', 'Graham Number: P/E × P/B ≤ 22.5', '≤ 22.5',
  `7,33 × 1,97 = 14,44 — ĐẠT thoải mái, dưới 2/3 ngưỡng.`, 'ĐẠT']);
rows.push([]);
rows.push(['KẾT LUẬN I', '6/10 tiêu chí đạt, 3/10 không đạt, 1/10 đạt một phần (thiếu năm xác nhận đầy đủ)',
  `ADP đạt số tiêu chí Graham cao hơn hẳn HPA (mã mới niêm yết, 5/10 thiếu dữ liệu) nhờ có 9 năm BCTC kiểm toán liên tục để đánh giá qua chu kỳ. ĐIỂM MẠNH rõ rệt: current ratio và D/E đạt ổn định CẢ 9/9 năm (không năm nào lệch chuẩn), lợi nhuận dương liên tục 9/9 năm, định giá P/E rất thấp (7,33x, ĐẠT xa ngưỡng 15x/25x), Graham Number 14,44 (đạt xa ngưỡng 22,5), cổ tức tiền mặt đều đặn ≥5 năm gần nhất. ĐIỂM YẾU: (1) quy mô vốn hóa nhỏ (~531 tỷ) không đạt chuẩn "quy mô lớn" gốc của Graham; (2) tăng trưởng EPS 3 năm gần/xa chỉ +22,98%, dưới ngưỡng 33%; (3) P/B 1,97-2,01x vượt ngưỡng phòng thủ 1,5x dù không quá cao. → Về TỔNG THỂ, ADP có hồ sơ tài chính LÀNH MẠNH và ỔN ĐỊNH hơn phần lớn tiêu chí an toàn vốn (current ratio, D/E, lợi nhuận liên tục), định giá hiện tại KHÔNG ĐẮT (P/E thấp, Graham Number đạt), nhưng KHÔNG PHẢI cổ phiếu tăng trưởng đều đặn theo đúng tinh thần Graham do quy mô nhỏ và biến động lợi nhuận theo chu kỳ ngành sơn công nghiệp (xem 'Định tính - ADP').`]);
rows.push([]);
rows.push(['II. XẾP HẠNG THEO MÔ HÌNH GREENBLATT (KẾT HỢP ROE/ROA + P/E)']);
rows.push([`KHÔNG THỰC HIỆN ĐƯỢC cho ADP: mô hình này (dùng cho FPT/VEA/FOX) dựa trên snapshot sheet "Top 100" trong file ngoài phạm vi truy cập của lần build này. KHÔNG suy đoán/tự chế số liệu xếp hạng. Nếu cần, yêu cầu user cung cấp file/snapshot Top 100 cập nhật có ADP để bổ sung mục này.`]);
rows.push(['Tham chiếu nhanh (tự tính từ sheet ADP, KHÔNG phải xếp hạng chính thức)', 'Giá trị']);
rows.push(['ROE bình quân 9 năm (2017-2025, %)', '≈21,8 (dao động 14,08-31,32 tùy năm)']);
rows.push(['ROA bình quân 9 năm (2017-2025, %)', '≈16,8 (dao động 10,77-24,00 tùy năm)']);
rows.push(['P/E hiện tại (TTM, lần)', '7,33']);
rows.push(['So sánh', 'ROE/ROA ở mức khá tốt và tương đối ổn định qua 9 năm so với ngưỡng thị trường chung, kết hợp P/E thấp — phù hợp hồ sơ "giá rẻ + hiệu quả vốn khá" kiểu Greenblatt, nhưng KHÔNG có xếp hạng chính thức trong vũ trụ Top 100 do thiếu dữ liệu nguồn.']);

async function main() {
  const auth = new google.auth.GoogleAuth({ keyFile: KEY_PATH, scopes: ['https://www.googleapis.com/auth/spreadsheets'] });
  const sheets = google.sheets({ version: 'v4', auth });
  const meta = await sheets.spreadsheets.get({ spreadsheetId });
  let sheetObj = meta.data.sheets.find((s) => s.properties.title === targetSheet);
  if (!sheetObj) {
    const addRes = await sheets.spreadsheets.batchUpdate({ spreadsheetId, requestBody: { requests: [{ addSheet: { properties: { title: targetSheet } } }] } });
    sheetObj = addRes.data.replies[0].addSheet;
  }
  await sheets.spreadsheets.values.clear({ spreadsheetId, range: `'${targetSheet}'!A1:E30` });
  await sheets.spreadsheets.values.update({ spreadsheetId, range: `'${targetSheet}'!A1`, valueInputOption: 'USER_ENTERED', requestBody: { values: rows } });
  console.log(JSON.stringify({ success: true, targetSheet, rows: rows.length }, null, 2));
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
