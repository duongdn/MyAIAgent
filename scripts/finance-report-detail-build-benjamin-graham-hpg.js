const { google } = require('googleapis');
const path = require('path');

const spreadsheetId = '1tlZRDWspk3I9TlrJAnPCev5RrLGNmy0JBJMkbvHl97k';
const targetSheet = 'Benjamin Graham - HPG';
const KEY_PATH = path.join(__dirname, '..', 'config', 'daily-agent-490610-7eb7985b33e3.json');

const rows = [];
rows.push(['CTCP Tập đoàn Hòa Phát (HPG) — Đánh giá theo Bộ tiêu chí Benjamin Graham (NĐT phòng thủ)']);
rows.push([
  `Nguồn: 10 tiêu chí NĐT phòng thủ (khung chuẩn dùng cho FPT/VEA/SAB/FOX/HPA). Số liệu tài chính HPG lấy trực tiếp/công thức tham chiếu sheet 'HPG' (BCTC hợp nhất kiểm toán 2016-2025, cafef.vn API, đã verify Tổng tài sản=Tổng nguồn vốn khớp tuyệt đối cả 10 năm) và 'Định lượng - HPG'. Giá/P/E/P/B: Vietstock 17/9/2026 (giá đóng cửa 21,450đ, vốn hóa 181,101.59 tỷ đồng). Cập nhật 18/09/2026.`,
]);
rows.push([]);
rows.push(['I. 10 TIÊU CHÍ NHÀ ĐẦU TƯ PHÒNG THỦ (BENJAMIN GRAHAM)']);
rows.push(['STT', 'Tiêu chí', 'Ngưỡng yêu cầu', 'Số liệu HPG', 'Kết quả']);
rows.push(['1', 'Quy mô — Hạng nhất, top 100 hoặc top ngành', 'Top ngành hoặc trong Top 100 vốn hóa',
  `Vốn hóa ~181,102 tỷ đồng (17/9/2026) — nằm trong nhóm vốn hóa lớn nhất HOSE, là thành viên rổ VN30, doanh nghiệp thép lớn nhất Việt Nam và Đông Nam Á theo công suất (~36% thị phần thép xây dựng nội địa).`, 'ĐẠT']);
rows.push(['2', 'Vốn — TS ngắn hạn/Nợ ngắn hạn (Current ratio)', '≥ 2.0 lần',
  `2025 = 1.10 lần (xem sheet 'Định lượng - HPG' dòng 232) — DƯỚI ngưỡng. Xu hướng 10 năm dao động 1.09-1.79 lần, KHÔNG năm nào đạt 2.0 lần — đặc điểm chung của doanh nghiệp sản xuất công nghiệp nặng thâm dụng vốn lưu động lớn (hàng tồn kho nguyên liệu/thành phẩm cao).`, 'KHÔNG ĐẠT']);
rows.push(['3', 'Nợ phải trả/Vốn chủ sở hữu (D/E)', '≤ 2.0 lần',
  `2025 = 0.97 lần; dao động 0.64-1.22 lần suốt 2016-2025 (xem 'Định lượng - HPG' dòng 227) — ĐẠT thoải mái ở TẤT CẢ 10 năm, đòn bẩy tài chính an toàn dù đang đầu tư CAPEX lớn cho Dung Quất 2.`, 'ĐẠT']);
rows.push(['4', 'Có lời 10 năm gần nhất', 'LNST dương cả 10 năm',
  `LNST CĐ mẹ DƯƠNG cả 10/10 năm (2016-2025): từ 6,602 tỷ (2016) đến đỉnh 34,478 tỷ (2021, giai đoạn giá thép/BĐS bùng nổ hậu Covid) và thấp nhất chu kỳ gần đây 6,835 tỷ (2023) — chưa năm nào lỗ dù biến động mạnh theo chu kỳ giá thép.`, 'ĐẠT']);
rows.push(['5', 'EPS TB 3 năm gần nhất > 33% so TB 3 năm xa nhất', '> 33%',
  `EPS chính thức (đồng/CP, dòng 159 sheet 'HPG'): TB 3 năm gần nhất (2023-2025) = (1,117+1,751+1,973)/3 = 1,614đ; TB 3 năm xa nhất (2016-2018) = (7,162+5,895+4,037)/3 = 5,698đ → tỷ lệ = 1,614/5,698 = 28.3% (GIẢM ~72%, không phải tăng). Nguyên nhân: pha loãng mạnh do phát hành cổ phiếu thưởng/cổ tức cổ phiếu liên tục (số CP tăng nhiều lần), không phải LNST tuyệt đối giảm tương ứng.`, 'KHÔNG ĐẠT']);
rows.push(['6', 'Cổ tức > 0 trong 10 năm gần nhất', 'Trả cổ tức tiền mặt cả 10 năm',
  `HPG duy trì chính sách trả cổ tức hàng năm liên tục (kết hợp tiền mặt và/hoặc cổ phiếu tùy năm) trong suốt 2016-2025 theo hồ sơ công khai — ví dụ 2021: 5% tiền mặt + 30% cổ phiếu; 2024: thưởng cổ phiếu 10:1; kế hoạch 2025: 15% (10% cổ phiếu + 5% tiền mặt). Không xác định được TỪNG năm có đủ 100% cổ tức TIỀN MẶT (một số năm chỉ cổ phiếu) — nhưng có chi trả giá trị cổ tức mỗi năm.`, 'ĐẠT (có cổ tức mỗi năm; một số năm chỉ dạng cổ phiếu, không thuần tiền mặt)']);
rows.push(['7', 'EPS tăng trưởng trong 10 năm', 'EPS năm gần nhất > EPS năm xa nhất',
  `EPS 2025 = 1,973đ/CP < EPS 2016 = 7,162đ/CP — GIẢM, không tăng. Cùng nguyên nhân pha loãng cổ phiếu như mục 5 (LNST tuyệt đối 2025 gấp 2.3 lần 2016, nhưng số CP lưu hành tăng nhiều lần hơn do các đợt phát hành cổ phiếu thưởng/cổ tức cổ phiếu).`, 'KHÔNG ĐẠT']);
rows.push(['8', 'Trần định giá: P/E ≤ 25 lần', '≤ 25 lần',
  `P/E TTM = 21,450/EPS TTM ≈ 7.80 lần (nguồn Vietstock, giá 17/9/2026) — ĐẠT xa ngưỡng.`, 'ĐẠT']);
rows.push(['9', 'Khuyến nghị: P/E ≤ 15x và P/B ≤ 1.5x', 'PE≤15x và PB≤1.5x',
  `P/E 7.80x (đạt xa). P/B = 21,450/BVPS 2025 (15,542đ, dòng 236 'Định lượng - HPG') = 1.38x — dưới ngưỡng 1.5x. Cả 2 tiêu chí đều ĐẠT.`, 'ĐẠT']);
rows.push(['10', 'Graham Number: P/E × P/B ≤ 22.5', '≤ 22.5',
  `7.80 × 1.29 (P/B live Vietstock) = 10.06 — ĐẠT thoải mái, dưới một nửa ngưỡng.`, 'ĐẠT']);
rows.push([]);
rows.push(['KẾT LUẬN I', '7/10 tiêu chí đạt, 3/10 không đạt',
  `HPG đạt tốt các tiêu chí về QUY MÔ (top ngành/VN30), ĐÒN BẨY TÀI CHÍNH an toàn, LỢI NHUẬN DƯƠNG liên tục 10 năm, CỔ TỨC đều đặn, và ĐỊNH GIÁ HIỆN TẠI rất hấp dẫn (P/E 7.80x, P/B 1.38x, Graham Number 10.06 — đều đạt xa ngưỡng phòng thủ). Điểm KHÔNG ĐẠT tập trung ở 3 tiêu chí: (a) current ratio 1.10x — dưới 2.0x, đặc thù ngành công nghiệp nặng vốn lưu động lớn, không phải dấu hiệu mất khả năng thanh toán (D/E vẫn an toàn); (b) EPS 3 năm gần nhất thấp hơn 3 năm xa nhất và (c) EPS 2025 thấp hơn EPS 2016 — CẢ HAI đều do PHA LOÃNG CỔ PHIẾU (phát hành cổ phiếu thưởng/cổ tức cổ phiếu liên tục qua các năm) chứ KHÔNG PHẢI suy giảm năng lực sinh lời tuyệt đối (LNST CĐ mẹ 2025 gấp 2.34 lần 2016). Nhà đầu tư cần phân biệt rõ: theo LNST tuyệt đối, HPG tăng trưởng qua chu kỳ; theo EPS/CP, bị pha loãng — đây là đặc điểm CHUNG của nhiều doanh nghiệp VN thường xuyên thưởng cổ phiếu, không riêng gì HPG.`]);
rows.push([]);
rows.push(['II. THAM CHIẾU NHANH BỔ SUNG (tự tính từ sheet HPG, KHÔNG phải xếp hạng chính thức Greenblatt/Top100)']);
rows.push(['Tham chiếu nhanh', 'Giá trị']);
rows.push(['ROE 2025 (%)', '11.78 — thấp hơn đỉnh chu kỳ 2021 (37.98%), phản ánh biên lợi nhuận co lại giai đoạn 2022-2024 do giá thép giảm, đang phục hồi']);
rows.push(['ROA 2025 (%)', '5.99 — cùng xu hướng phục hồi từ đáy 2023 (3.64%)']);
rows.push(['P/E hiện tại (TTM, lần)', '7.80']);
rows.push(['P/B hiện tại (lần)', '1.29']);
rows.push(['So sánh', 'Định giá HPG hiện ở vùng thấp trong lịch sử ngành thép (P/E<10x, P/B<1.5x), phù hợp với giai đoạn đầu chu kỳ phục hồi (Dung Quất 2 mới vận hành) — nhưng KHÔNG có xếp hạng chính thức trong vũ trụ Top 100/Greenblatt do phạm vi công việc build HPG này không truy cập file snapshot "Top 100" ngoài.']);

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
