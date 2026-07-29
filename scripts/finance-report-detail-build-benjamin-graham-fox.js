const { google } = require('googleapis');
const path = require('path');

const spreadsheetId = '1VGjJoRwXaWVR1V0nGDlY_40GsijtJ4ohVnaHXjf3KeU';
const targetSheet = 'Benjamin Graham - FOX';
const KEY_PATH = path.join(__dirname, '..', 'config', 'daily-agent-490610-7eb7985b33e3.json');

const rows = [];
rows.push(['CTCP Viễn thông FPT (FOX) — Đánh giá theo Bộ tiêu chí Benjamin Graham (NĐT phòng thủ) & Xếp hạng Greenblatt']);
rows.push([`Nguồn: 10 tiêu chí NĐT phòng thủ + mô hình xếp hạng lấy từ file "v6 - II GCCP material" (sheet 'Bộ tiêu chí' & 'Top 100'). Số liệu tài chính FOX lấy trực tiếp/công thức tham chiếu sheet 'FOX' (BCTC hợp nhất kiểm toán 2016-2025) và 'Định lượng - FOX'/'Định giá - FOX'. Giá/P/E/P/B nguồn Vietstock/Simplize 29/7/2026. Cập nhật 29/7/2026.`]);
rows.push([]);
rows.push(['I. 10 TIÊU CHÍ NHÀ ĐẦU TƯ PHÒNG THỦ (BENJAMIN GRAHAM)']);
rows.push(['STT', 'Tiêu chí', 'Ngưỡng yêu cầu', 'Số liệu FOX', 'Kết quả']);
rows.push(['1', 'Quy mô — Hạng nhất, top 100 hoặc top ngành', 'Top ngành hoặc trong Top 100 vốn hóa',
  `Có trong danh sách Top 100 vốn hóa lớn theo dõi ('Top 100' sheet, ngành "Dịch vụ Viễn thông"), vốn hóa hiện tại ~45,434 tỷ đồng (61,500đ x 738.76tr CP, 29/7/2026)`, 'ĐẠT']);
rows.push(['2', 'Vốn — TS ngắn hạn/Nợ ngắn hạn (Current ratio)', '≥ 2.0 lần',
  `Dao động CHỈ 0.87-1.17 lần suốt 10 năm 2016-2025 (thấp nhất 0.87 các năm 2019-2020, cao nhất 1.17 năm 2024) — KHÔNG năm nào đạt 2.0 lần, dù có xu hướng cải thiện dần từ 2023`, 'KHÔNG ĐẠT']);
rows.push(['3', 'Nợ phải trả/Vốn chủ sở hữu (D/E)', '≤ 2.0 lần',
  `Dao động 1.22-2.35 lần 2016-2025; VƯỢT ngưỡng 2 năm 2020 (2.17) và 2021 (2.35), các năm còn lại đều ≤2.0 (hiện tại 2025: 1.32 lần)`, 'KHÔNG ĐẠT (vi phạm 2/10 năm)']);
rows.push(['4', 'Có lời 10 năm gần nhất', 'LNST dương cả 10 năm',
  `LNST của cổ đông Công ty mẹ DƯƠNG LIÊN TỤC cả 10 năm 2016-2025: từ 918.09 tỷ (2016, thấp nhất) đến 3,418.00 tỷ (2025, cao nhất) — KHÔNG có năm nào âm`, 'ĐẠT']);
rows.push(['5', 'EPS TB 3 năm gần nhất > 33% so TB 3 năm xa nhất', '> 33%',
  `TB EPS 2023-2025: 4,537.67đ/CP; TB EPS 2016-2018 (3 năm xa nhất có dữ liệu): 5,102.67đ/CP → GIẢM -11.1% (không tăng) — dù LNST tổng tăng gần 4 lần, EPS/CP lại giảm do pha loãng cổ phiếu (vốn góp CSH tăng từ 1,370.79 tỷ lên 7,387.63 tỷ, chủ yếu qua cổ phiếu thưởng/chia tách, không phải tăng vốn tiền mặt — dòng "Tiền thu từ phát hành CP" LCTT chỉ 30.28 tỷ toàn giai đoạn)`, 'KHÔNG ĐẠT']);
rows.push(['6', 'Cổ tức > 0 trong 10 năm gần nhất', 'Trả cổ tức tiền mặt cả 10 năm',
  `Dòng "Cổ tức, lợi nhuận đã trả cho chủ sở hữu" (LCTT, sheet 'FOX') ÂM (có chi trả) 9/10 năm 2017-2025, từ -373.52 tỷ (2019) đến -2,541.69 tỷ (2025, cao nhất) — RIÊNG 2016 (năm đầu dữ liệu/IPO UPCOM) KHÔNG có chi trả`, 'KHÔNG ĐẠT (9/10 năm)']);
rows.push(['7', 'EPS tăng trưởng trong 10 năm', 'EPS năm gần nhất > EPS năm xa nhất',
  `EPS 2025 (4,150đ) THẤP HƠN EPS 2016 (5,972đ) → GIẢM -30.5% — nhất quán với tiêu chí #5, phản ánh pha loãng cổ phiếu qua nhiều đợt kể cả khi lợi nhuận tổng tăng trưởng tốt`, 'KHÔNG ĐẠT']);
rows.push(['8', 'Trần định giá: P/E ≤ 25 lần', '≤ 25 lần',
  `12.36 lần (29/7/2026, nguồn Vietstock/Simplize)`, 'ĐẠT']);
rows.push(['9', 'Khuyến nghị: P/E ≤ 15x và P/B ≤ 1.5x', 'PE≤15x và PB≤1.5x',
  `P/E 12.36x (đạt), P/B 3.53x (KHÔNG đạt, vượt xa ngưỡng 1.5x — gấp 2.35 lần)`, 'KHÔNG ĐẠT']);
rows.push(['10', 'Graham Number: P/E × P/B ≤ 22.5', '≤ 22.5',
  `12.36 × 3.53 = 43.63 — vượt gần gấp đôi ngưỡng`, 'KHÔNG ĐẠT']);
rows.push([]);
rows.push(['KẾT LUẬN I', '3/10 tiêu chí đạt, 7/10 không đạt',
  `FOX đạt ÍT tiêu chí Graham hơn nhiều so với VEA (7/10) và FPT (5/10) — mặc dù tăng trưởng doanh thu/lợi nhuận TỔNG rất tốt và đều đặn (xem 'Định tính - FOX'), FOX THẤT BẠI ở hầu hết tiêu chí "phòng thủ" cổ điển của Graham vì: (a) current ratio luôn dưới 2.0 (đặc thù ngành hạ tầng vốn lớn, không phải dấu hiệu mất khả năng thanh toán — current ratio đã cải thiện và vượt 1.0 từ 2023); (b) EPS/CP KHÔNG tăng trưởng do pha loãng cổ phiếu liên tục qua thưởng/chia tách dù lợi nhuận tổng tăng mạnh — nhà đầu tư hiện hữu không hưởng trọn vẹn tăng trưởng lợi nhuận; (c) định giá theo P/B (3.53x) và Graham Number khá cao so với ngưỡng phòng thủ truyền thống, phản ánh thị trường định giá FOX như một cổ phiếu tăng trưởng (growth), không phải value/phòng thủ. Đây là điểm khác biệt cốt lõi so với VEA/FPT khi áp bộ tiêu chí Graham.`]);
rows.push([]);
rows.push(['II. XẾP HẠNG THEO MÔ HÌNH GREENBLATT (KẾT HỢP ROE/ROA + P/E)']);
rows.push([`Nguồn: sheet 'Top 100', file "v6 - II GCCP material" (1E47mfclzKFvpX1JZeiwu4zQFlhq8-CoLBr-bZuibqMw), snapshot "Jul-26" (có thể lệch nhẹ so với số liệu live 29/7/2026 dùng ở mục I do thời điểm chốt dữ liệu khác nhau). Vũ trụ xếp hạng: 101 cổ phiếu vốn hóa lớn được theo dõi (không phải toàn thị trường).`]);
rows.push(['Chỉ tiêu', 'Giá trị (Top 100 sheet)']);
rows.push(['Ngành', 'Dịch vụ Viễn thông']);
rows.push(['Vốn hóa (nghìn tỷ, snapshot Top 100)', '55']);
rows.push(['ROE (%, snapshot Top 100)', '32.4']);
rows.push(['ROA (%, snapshot Top 100)', '13.3']);
rows.push(['P/E (lần, snapshot Top 100)', '15.2']);
rows.push(['P/B (lần, snapshot Top 100)', '4.6']);
rows.push(['Xếp hạng ROE (trong 101 CP)', '8']);
rows.push(['Xếp hạng P/E (trong 101 CP)', '59']);
rows.push(['Điểm tổng hợp (H+K, thang 100)', '70']);
rows.push(['So sánh', 'Điểm 70/100 — THẤP HƠN NHIỀU so với VEA (99/100) và thường thấp hơn FPT, phản ánh: ROE rất tốt (hạng 8/101) nhưng P/E và đặc biệt P/B kéo điểm định giá tổng hợp xuống đáng kể (hạng P/E chỉ 59/101, giữa bảng xếp hạng)']);

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
  await sheets.spreadsheets.values.update({
    spreadsheetId, range: `'${targetSheet}'!A1`, valueInputOption: 'USER_ENTERED', requestBody: { values: rows },
  });
  console.log(JSON.stringify({ success: true, targetSheet, rows: rows.length }));
}
main().catch(e => { console.error(e); process.exit(1); });
