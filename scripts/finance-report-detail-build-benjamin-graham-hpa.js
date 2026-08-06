const { google } = require('googleapis');
const path = require('path');

const spreadsheetId = '1E8goOhD5WvReVK2WyWRRYM-6tKbzifxstcVuUjiEaYE';
const targetSheet = 'Benjamin Graham - HPA';
const KEY_PATH = path.join(__dirname, '..', 'config', 'daily-agent-490610-7eb7985b33e3.json');

const rows = [];
rows.push(['CTCP Phát triển Nông nghiệp Hòa Phát (HPA) — Đánh giá theo Bộ tiêu chí Benjamin Graham (NĐT phòng thủ)']);
rows.push([
  `Nguồn: 10 tiêu chí NĐT phòng thủ (khung chuẩn dùng cho FPT/VEA/SAB/FOX). Số liệu tài chính HPA lấy trực tiếp/công thức tham chiếu sheet 'HPA' (BCTC hợp nhất 2025 kiểm toán + Q4/2025-Q2/2026, cafef.vn API) và 'Định lượng - HPA'/'Định giá - HPA'. Giá/P/E/P/B: Vietstock/Simplize 06/08/2026. CẢNH BÁO: HPA chỉ niêm yết từ 06/02/2026, có 1 năm kiểm toán — nhiều tiêu chí đòi hỏi lịch sử 10 năm KHÔNG THỂ đánh giá đầy đủ, ghi rõ "KHÔNG ĐỦ DỮ LIỆU" thay vì suy đoán. Cập nhật 06/08/2026.`,
]);
rows.push([]);
rows.push(['I. 10 TIÊU CHÍ NHÀ ĐẦU TƯ PHÒNG THỦ (BENJAMIN GRAHAM)']);
rows.push(['STT', 'Tiêu chí', 'Ngưỡng yêu cầu', 'Số liệu HPA', 'Kết quả']);
rows.push(['1', 'Quy mô — Hạng nhất, top 100 hoặc top ngành', 'Top ngành hoặc trong Top 100 vốn hóa',
  `Vốn hóa hiện tại ~9,105.75 tỷ đồng (giá 31,950đ × 285tr CP, 06/08/2026) — thuộc nhóm vốn hóa vừa/nhỏ trên HOSE. KHÔNG truy cập được file "Top 100" snapshot dùng cho FPT/VEA/FOX để đối chiếu trực tiếp cho lần build này — không suy đoán có/không lọt Top 100.`, 'KHÔNG XÁC ĐỊNH (thiếu dữ liệu đối chiếu Top 100)']);
rows.push(['2', 'Vốn — TS ngắn hạn/Nợ ngắn hạn (Current ratio)', '≥ 2.0 lần',
  `FY2025 audited (kỳ báo cáo kiểm toán duy nhất) = 1.78 lần — DƯỚI ngưỡng. Đã cải thiện mạnh sau IPO: Q1/2026 = 4.68 lần, Q2/2026 = 4.05 lần (nhờ 1,257 tỷ tiền IPO 1/2026) — NHƯNG đây là số liệu quý chưa kiểm toán, chưa đủ 1 năm để xác nhận xu hướng bền vững.`, 'KHÔNG ĐẠT (theo FY2025 audited; đã vượt ngưỡng ở 2 quý gần nhất chưa kiểm toán)']);
rows.push(['3', 'Nợ phải trả/Vốn chủ sở hữu (D/E)', '≤ 2.0 lần',
  `FY2025 = 0.48 lần; Q4/2025 = 0.48; Q1/2026 = 0.16; Q2/2026 = 0.18 — ĐẠT thoải mái ở TẤT CẢ các kỳ có dữ liệu, đòn bẩy giảm thêm sau IPO do trả bớt nợ vay.`, 'ĐẠT']);
rows.push(['4', 'Có lời 10 năm gần nhất', 'LNST dương cả 10 năm',
  `CHỈ CÓ 1 NĂM DỮ LIỆU KIỂM TOÁN (2025): LNST CĐ mẹ dương, 1,596.84 tỷ đồng. KHÔNG THỂ xác nhận 10 năm liên tục do công ty mới niêm yết 06/02/2026 — không có BCTC kiểm toán các năm trước 2025 công khai qua cafef.`, 'KHÔNG ĐỦ DỮ LIỆU (chỉ xác nhận được 1/10 năm)']);
rows.push(['5', 'EPS TB 3 năm gần nhất > 33% so TB 3 năm xa nhất', '> 33%',
  `Cần tối thiểu 6 năm dữ liệu liên tục để tính; HPA chỉ có 1 năm EPS chính thức công bố (2025: 5,848đ/CP).`, 'KHÔNG ĐỦ DỮ LIỆU']);
rows.push(['6', 'Cổ tức > 0 trong 10 năm gần nhất', 'Trả cổ tức tiền mặt cả 10 năm',
  `Đã trả cổ tức tiền mặt NĂM ĐẦU TIÊN sau niêm yết: 2,100đ/CP, chi trả 18/5/2026 cho FY2025 (nguồn Simplize). CHỈ có 1 năm dữ liệu — không đủ lịch sử 10 năm để đánh giá tính liên tục.`, 'KHÔNG ĐỦ DỮ LIỆU (1/10 năm có cổ tức, xu hướng tích cực)']);
rows.push(['7', 'EPS tăng trưởng trong 10 năm', 'EPS năm gần nhất > EPS năm xa nhất',
  `Chỉ có 1 năm EPS (2025: 5,848đ/CP) — không có điểm so sánh 10 năm trước.`, 'KHÔNG ĐỦ DỮ LIỆU']);
rows.push(['8', 'Trần định giá: P/E ≤ 25 lần', '≤ 25 lần',
  `P/E theo EPS FY2025 audited = 31,950/5,848 = 5.46 lần (rất thấp). Cross-check Simplize (P/E TTM) = 6.21 lần — cùng kết luận, cả 2 cơ sở đều ĐẠT rõ ràng.`, 'ĐẠT']);
rows.push(['9', 'Khuyến nghị: P/E ≤ 15x và P/B ≤ 1.5x', 'PE≤15x và PB≤1.5x',
  `P/E 5.46x (đạt xa). P/B theo BVPS Q2/2026 (gần nhất) = 31,950/15,573 = 2.05x — VƯỢT ngưỡng 1.5x. Cross-check Simplize P/B = 1.83x — cũng vượt ngưỡng dù thấp hơn số tự tính (khác kỳ tính BVPS). Cả 2 nguồn đều xác nhận P/B > 1.5x.`, 'KHÔNG ĐẠT (do P/B, dù P/E rất tốt)']);
rows.push(['10', 'Graham Number: P/E × P/B ≤ 22.5', '≤ 22.5',
  `5.46 × 2.05 = 11.19 (theo số tự tính từ sheet). Cross-check Simplize: 6.21 × 1.83 = 11.36 — cả 2 cách tính đều ĐẠT thoải mái, dưới một nửa ngưỡng.`, 'ĐẠT']);
rows.push([]);
rows.push(['KẾT LUẬN I', '3/10 tiêu chí đạt rõ ràng, 2/10 không đạt, 5/10 không đủ dữ liệu để đánh giá',
  `HPA khác biệt căn bản so với FPT/VEA/SAB/FOX ở chỗ 5/10 tiêu chí Graham (vốn dựa vào lịch sử 10 năm) KHÔNG THỂ đánh giá được do công ty chỉ mới niêm yết 06/02/2026 — đây là hạn chế dữ liệu THỰC, không phải điểm yếu doanh nghiệp. Trong 5 tiêu chí đánh giá được: định giá HIỆN TẠI khá hấp dẫn theo P/E (5.46-6.21x, ĐẠT xa ngưỡng) và Graham Number (11.19-11.36, ĐẠT xa ngưỡng), đòn bẩy tài chính thấp và lành mạnh (ĐẠT). Điểm KHÔNG ĐẠT: P/B (2.05x/1.83x, vượt ngưỡng phòng thủ 1.5x — thị trường định giá cao hơn giá trị sổ sách do kỳ vọng tăng trưởng/ROE cao) và current ratio FY2025 audited (1.78x, dưới 2.0x — dù đã cải thiện vượt ngưỡng ở 2 quý gần nhất nhờ tiền IPO, chưa được kiểm toán xác nhận). QUAN TRỌNG: KHÔNG nên coi HPA "đạt" tiêu chí phòng thủ Graham một cách tổng thể — số tiêu chí "KHÔNG ĐỦ DỮ LIỆU" quá nhiều (5/10) để kết luận chắc chắn, cần chờ thêm 2-3 năm BCTC kiểm toán mới đánh giá đầy đủ được theo đúng tinh thần "nhà đầu tư phòng thủ" của Graham (ưu tiên track record dài, ổn định).`]);
rows.push([]);
rows.push(['II. XẾP HẠNG THEO MÔ HÌNH GREENBLATT (KẾT HỢP ROE/ROA + P/E)']);
rows.push([`KHÔNG THỰC HIỆN ĐƯỢC cho HPA: mô hình này (dùng cho FPT/VEA/FOX) dựa trên snapshot sheet "Top 100" trong file ngoài "v6 - II GCCP material" — không có quyền truy cập file đó trong phạm vi công việc build HPA này. KHÔNG suy đoán/tự chế số liệu xếp hạng. Nếu cần, yêu cầu user cung cấp file/snapshot Top 100 cập nhật có HPA để bổ sung mục này.`]);
rows.push(['Tham chiếu nhanh (tự tính từ sheet HPA, KHÔNG phải xếp hạng chính thức)', 'Giá trị']);
rows.push(['ROE annualized FY2025/Q2-2026 (%)', '50.21 (FY2025) → 27.42 (Q2/2026, annualized) — xu hướng giảm dần qua 3 quý']);
rows.push(['ROA annualized FY2025/Q2-2026 (%)', '33.97 (FY2025) → 23.23 (Q2/2026, annualized) — cùng xu hướng giảm']);
rows.push(['P/E hiện tại (FY2025 audited basis, lần)', '5.46']);
rows.push(['So sánh', 'ROE/ROA rất cao so với VEA/FPT/FOX nhưng ĐANG GIẢM DẦN qua các quý — nhất quán với luận điểm "đỉnh chu kỳ giá heo" ở Định tính. KHÔNG có xếp hạng chính thức trong vũ trụ Top 100 do thiếu dữ liệu nguồn.']);

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
