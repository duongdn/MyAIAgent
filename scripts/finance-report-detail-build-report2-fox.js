const { google } = require('googleapis');
const path = require('path');

const spreadsheetId = '1VGjJoRwXaWVR1V0nGDlY_40GsijtJ4ohVnaHXjf3KeU';
const targetSheet = 'Báo cáo 2 - FOX';
const KEY_PATH = path.join(__dirname, '..', 'config', 'daily-agent-490610-7eb7985b33e3.json');

const rows = [];
rows.push(['BÁO CÁO PHÂN TÍCH CỔ PHIẾU CTCP VIỄN THÔNG FPT (UPCOM: FOX)']);
rows.push(['Học viện AYP — The Intelligent Investor | Tổng hợp Định tính, Định lượng, Định giá, Bộ tiêu chí Benjamin Graham | Học viên: DuongDN | Cập nhật 29/7/2026, dữ liệu BCTC hợp nhất kiểm toán 2016-2025 (sheet \'FOX\', nguồn cafef.vn API, đã verify Tổng tài sản=Tổng nguồn vốn khớp tuyệt đối 10 năm)']);
rows.push([]);
rows.push(['I. TỔNG QUAN DOANH NGHIỆP']);
rows.push(['Ngành', 'Dịch vụ Viễn thông — Internet băng rộng (ISP), Truyền hình trả tiền (PayTV/FPT Play), Trung tâm dữ liệu & Điện toán đám mây (Data Center & Cloud). Công ty VẬN HÀNH trực tiếp (khác VEA — holding thu cổ tức JV).']);
rows.push(['Mô hình kinh doanh', '3 mảng doanh thu: ISP (~3.75tr thuê bao, 15% thị phần toàn quốc, đứng thứ 2 sau Viettel 44%), PayTV/OTT (đứng thứ 3 thị trường internet TV, bản quyền EPL 2026-2031 ~26tr USD/năm), Data Center/Cloud (tăng trưởng >20%/năm, vừa khánh thành Fornix HCM02 8/2025). KHÔNG có tỷ trọng lợi nhuận chi tiết theo mảng công khai.']);
rows.push(['Lợi thế cạnh tranh', 'Vị thế top 2-3 mỗi mảng (ISP, PayTV) tại thị trường nội địa; hạ tầng Data Center chuẩn Tier III + LEED đón đầu xu hướng AI/chuyển đổi số; thương hiệu FPT.']);
rows.push(['Rủi ro chính', '(1) Thay đổi cơ cấu sở hữu lớn 11/2025-3/2026 (SCIC→Bộ Công an, FPT Corp ngừng hợp nhất BCTC) — tác động chiến lược/quản trị dài hạn CHƯA rõ; (2) chi phí điện Data Center dự kiến tăng 50% (2026) ảnh hưởng biên LN mảng tăng trưởng nhanh nhất; (3) pha loãng cổ phiếu liên tục qua thưởng/chia tách khiến EPS KHÔNG tăng trưởng dù LNST tổng tăng mạnh (EPS 2025 thấp hơn 2016 -30.5%); (4) cạnh tranh giá từ Viettel/VNPT + OTT toàn cầu; (5) thanh khoản cổ phiếu thấp (xem mục Thanh khoản).']);
rows.push(['Sự kiện đặc biệt cần lưu ý', 'SCIC chuyển giao đại diện vốn Nhà nước tại FOX cho Bộ Công an (11/2025); FPT Corp ngừng hợp nhất BCTC FOX từ 2026, chuyển phương pháp vốn chủ sở hữu — FOX "tách" khỏi tập đoàn FPT về kế toán (3/2026). FOX chưa đáp ứng điều kiện công ty đại chúng chuẩn (10% CP do ≥100 NĐT nắm giữ, tính đến 5/2026). Kế hoạch 2026: DTT 22.0 nghìn tỷ (+12.8%), LNTT 5.1 nghìn tỷ (+17%), cổ tức tiền mặt 2,000đ/CP + thưởng CP 15%.']);
rows.push([]);
rows.push(['II. KẾT QUẢ TÀI CHÍNH 10 NĂM (2016-2025, đơn vị: tỷ đồng trừ khi ghi chú khác)']);
rows.push(['Chỉ tiêu', 'Năm 2016', 'Năm 2020', 'Năm 2025', 'CAGR 2016-2025', 'Ghi chú']);
rows.push(['Tổng tài sản', '8,528.16', '16,080.97', '26,104.77', '13.24%/năm', 'Tăng liên tục, không năm nào giảm']);
rows.push(['Vốn chủ sở hữu', '3,201.78', '5,078.26', '11,230.78', '14.96%/năm', 'Tăng liên tục cả 10 năm']);
rows.push(['Doanh thu thuần', '6,666.47', '11,466.15', '19,506.72', '12.67%/năm', 'TĂNG LIÊN TỤC 10/10 năm, YoY luôn dương 7.3-17.9%']);
rows.push(['LNST của cổ đông Công ty mẹ', '918.09', '1,575.02', '3,418.00', '15.73%/năm', 'Tăng 9/10 năm (chỉ giảm nhẹ -4.98% năm 2017)']);
rows.push(['ROE (LNST CĐ mẹ/VCSH cuối kỳ)', '28.67%', '31.01%', '30.43%', '(không tính CAGR cho tỷ số)', 'Ổn định 25.5-31.0% toàn giai đoạn 2016-2025']);
rows.push(['ROA (LNST CĐ mẹ/Tổng tài sản cuối kỳ)', '10.77%', '9.79%', '13.09%', '(không tính CAGR cho tỷ số)', 'Dao động 8.7-13.1% toàn giai đoạn']);
rows.push(['Nợ phải trả/Vốn chủ sở hữu (D/E, lần)', '1.66', '2.17', '1.32', '(không tính CAGR cho tỷ số)', 'Vượt 2.0 hai năm 2020-2021 (2.17, 2.35), còn lại ≤2.0']);
rows.push(['Tỷ lệ thanh toán hiện hành (lần)', '0.94', '0.87', '1.15', '(không tính CAGR cho tỷ số)', 'DƯỚI 2.0 toàn bộ 10 năm — dưới cả 1.0 hầu hết 2016-2022']);
rows.push(['(Nguồn: sheet \'FOX\' — BCTC hợp nhất kiểm toán 2016-2025 từ cafef.vn API, đã verify Tổng tài sản=Tổng nguồn vốn khớp tuyệt đối cả 10 năm. Đối chiếu \'Định lượng - FOX\'.)']);
rows.push([]);
rows.push(['Kết quả kinh doanh hợp nhất 2 năm gần nhất (Tỷ đồng, số chính xác)', 'Năm 2024', 'Năm 2025', 'Thay đổi YoY', 'Ghi chú']);
rows.push(['Doanh thu thuần', '17,610.40', '19,506.72', '+10.77%']);
rows.push(['Lợi nhuận gộp', '8,315.78', '9,709.82', '+16.76%']);
rows.push(['Chi phí bán hàng', '2,856.88', '3,501.07', '+22.55%', 'Tăng nhanh hơn doanh thu']);
rows.push(['Chi phí quản lý doanh nghiệp', '2,150.59', '2,291.16', '+6.54%']);
rows.push(['Lợi nhuận thuần từ HĐKD', '3,633.30', '4,348.77', '+19.69%']);
rows.push(['Lợi nhuận sau thuế của cổ đông Công ty mẹ', '2,803.32', '3,418.00', '+21.93%', 'Năm lợi nhuận cao nhất lịch sử']);
rows.push(['EPS chính thức (đồng/CP, FOX tự công bố)', '5,119', '4,150', '-18.93%', 'GIẢM dù LNST tăng +21.93% — pha loãng cổ phiếu (thưởng/chia tách)']);
rows.push(['(Nguồn: sheet \'FOX\'; kế hoạch 2026 theo TinnhanhChungkhoan https://www.tinnhanhchungkhoan.vn/fpt-telecom-fox-dat-muc-tieu-loi-nhuan-2026-tang-gan-17-muon-chia-co-tuc-va-co-phieu-thuong-tong-ty-le-35-post387606.html, truy cập 29/7/2026)']);
rows.push([]);
rows.push(['III. ĐỊNH GIÁ HIỆN TẠI (29/7/2026)']);
rows.push(['Chỉ tiêu', 'Giá trị', 'Đánh giá']);
rows.push(['Giá cổ phiếu (đ/CP)', '61,500']);
rows.push(['EPS chính thức 2025 (đ/CP, FOX công bố)', '4,150', 'Giảm -18.93% so với 2024 (5,119đ) do pha loãng cổ phiếu']);
rows.push(['BVPS 2025 (đ/CP, = VCSH/738.76 triệu CP)', '15,202']);
rows.push(['P/E (lần)', '12.36', 'Hợp lý, thấp hơn ngưỡng Graham (25x) và ngưỡng khuyến nghị (15x)']);
rows.push(['P/B (lần)', '3.53', 'CAO — vượt xa ngưỡng khuyến nghị Graham (1.5x), phản ánh định giá kiểu growth stock']);
rows.push(['Tỉ suất cổ tức ước tính (%)', `=ROUND(2000/61500*100,2)`, 'Kế hoạch 2026: 2,000đ/CP tiền mặt + thưởng CP 15%']);
rows.push(['Graham Number (P/E × P/B)', '43.63', 'VƯỢT GẦN GẤP ĐÔI ngưỡng 22.5 — KHÔNG ĐẠT']);
rows.push(['Vốn hóa thị trường (tỷ đồng)', '45,434', 'Giá 61,500đ x 738,763,456 CP']);
rows.push(['(Nguồn: finance.vietstock.vn/FOX/tai-chinh.htm + simplize.vn/co-phieu/FOX, truy cập 29/7/2026. Chi tiết đối chiếu xem sheet \'Định giá - FOX\' và \'Benjamin Graham - FOX\'.)']);
rows.push([]);
rows.push(['IV. PHÂN TÍCH TỪNG MẢNG KINH DOANH']);
rows.push(['1. Internet băng rộng (ISP)']);
rows.push(['    ◦ Cơ hội: ~3.75 triệu thuê bao, 15% thị phần (thứ 2 sau Viettel 44%); xu hướng nâng cấp gói Gigabit. Doanh thu telecom services 2024 ~664tr USD (+11.3%), LNTT ~134tr USD (+18.1%).\nNguồn: TelecomLead, Vietstock FOX Profile, truy cập 29/7/2026.']);
rows.push(['    ◦ Rủi ro: Cạnh tranh giá gay gắt từ Viettel (dẫn đầu) và VNPT; thị trường băng rộng tăng trưởng chậm dần (~3.8%/năm, đã có 25tr thuê bao toàn quốc).']);
rows.push(['2. Truyền hình trả tiền (PayTV/FPT Play)']);
rows.push(['    ◦ Cơ hội: bản quyền độc quyền Ngoại Hạng Anh 2026-2031 (~26tr USD/năm) nhằm giành vị trí dẫn đầu; doanh thu OTT FY2025 1,688 tỷ đồng (+8.3%); thị trường IPTV VN dự báo CAGR 18.2% đến 2033.\nNguồn: FPT Play EPL Rights, IMARC IPTV Vietnam, truy cập 29/7/2026.']);
rows.push(['    ◦ Rủi ro: cạnh tranh OTT toàn cầu (Netflix, YouTube); hiện đứng thứ 3 thị trường, cần đầu tư nội dung liên tục để giữ/tăng thị phần.']);
rows.push(['3. Trung tâm dữ liệu & Điện toán đám mây (Data Center & Cloud)']);
rows.push(['    ◦ Cơ hội: mảng tăng trưởng nhanh nhất (>20%/năm), vừa khánh thành Fornix HCM02 (8/2025, Tier III + LEED, Carrier Neutral), đón đầu nhu cầu AI/chuyển đổi số doanh nghiệp.\nNguồn: FPT News Fornix HCM02, truy cập 29/7/2026.']);
rows.push(['    ◦ Rủi ro: capex lớn (ước ~1.5 nghìn tỷ đồng/năm theo MASVN); giá điện DC dự kiến tăng ~50% (2026) do quy định mới xếp DC vào "dịch vụ thương mại" — ảnh hưởng trực tiếp biên lợi nhuận mảng đang mở rộng.\nNguồn: MASVN Stock Recommendation, CafeF điện DC, truy cập 29/7/2026.']);
rows.push([]);
rows.push(['V. QUẢN TRỊ — Hội đồng quản trị & Ban lãnh đạo']);
rows.push(['Chủ tịch HĐQT: Hoàng Việt Anh (từ 4/2023, từng Chủ tịch FPT Digital). Tổng Giám đốc: Nguyễn Hoàng Linh. KHÔNG tìm thấy thông tin thay đổi nhân sự lãnh đạo sau sự kiện chuyển giao vốn Nhà nước (11/2025) — cần verify khi có BCTN 2025 chính thức. Toàn bộ 10 năm BCTC đánh dấu "Đã kiểm toán" theo cafef.vn, chưa xác định chi tiết loại ý kiến kiểm toán.\n(Nguồn: Vietnam.vn Leadership, truy cập 29/7/2026)']);
rows.push([]);
rows.push(['VI. CỔ ĐÔNG']);
rows.push(['THAY ĐỔI LỚN VỀ CƠ CẤU SỞ HỮU (11/2025-3/2026): Trước 11/2025 — SCIC 50.17%, FPT Corp 45.66%. Sau 11/2025 — Bộ Công an tiếp nhận chức năng đại diện vốn Nhà nước tại FOX thay SCIC. Từ 2026 — FPT Corp ngừng hợp nhất BCTC FOX, chuyển phương pháp vốn chủ sở hữu. KHÔNG tìm thấy % sở hữu cụ thể của Bộ Công an sau chuyển giao — cần verify khi có BCTN 2025 chính thức.\n(Nguồn: TheInvestor Strategic Split, TheInvestor SCIC Transfer, truy cập 29/7/2026)']);
rows.push([]);
rows.push(['VII. NHẬN ĐỊNH TỔNG QUAN — GOOD COMPANY / CHEAP PRICE?']);
rows.push(['GOOD COMPANY: PHẦN LỚN ĐẠT. Doanh thu tăng liên tục 10/10 năm, LNST tăng 9/10 năm, ROE ổn định 25-31%, biên lợi nhuận cải thiện đều (13.77%→17.52%) — chất lượng tăng trưởng kinh doanh CỐT LÕI tốt, là doanh nghiệp vận hành thực sự (khác VEA — holding). Điểm trừ: current ratio dưới 2.0 toàn bộ 10 năm (đặc thù ngành hạ tầng vốn lớn) và EPS/CP KHÔNG tăng trưởng do pha loãng cổ phiếu liên tục (EPS 2025 thấp hơn 2016 -30.5%) — nhà đầu tư hiện hữu không hưởng trọn vẹn tăng trưởng lợi nhuận tổng.\n\nCHEAP PRICE: KHÔNG ĐẠT. P/E 12.36x hợp lý nhưng P/B 3.53x cao, Graham Number 43.63 vượt gần gấp đôi ngưỡng 22.5x — thị trường định giá FOX theo kiểu growth stock, không rẻ theo tiêu chí phòng thủ Graham. Chỉ 3/10 tiêu chí Benjamin Graham đạt (xem \'Benjamin Graham - FOX\'), thấp hơn nhiều VEA (7/10) và FPT (5/10).\n\nKẾT LUẬN: FOX là doanh nghiệp viễn thông vận hành tốt, tăng trưởng đều đặn, nhưng KHÔNG rẻ và đang trải qua thay đổi cơ cấu sở hữu lớn (SCIC→Bộ Công an, tách khỏi FPT Corp) chưa rõ tác động dài hạn. Phù hợp nhà đầu tư tìm tăng trưởng ổn định chấp nhận trả giá hợp lý-cao hơn là nhà đầu tư phòng thủ/giá trị thuần túy kiểu Graham. Cần theo dõi: (1) tác động thay đổi cổ đông Nhà nước, (2) chi phí điện DC tăng 2026, (3) xu hướng pha loãng cổ phiếu tiếp diễn, (4) thanh khoản giao dịch thấp khi định cỡ vị thế.']);
rows.push([]);
rows.push(['Nguồn tổng hợp: xem chi tiết từng dòng ở trên. Các sheet backing: \'FOX\' (BCTC hợp nhất kiểm toán 2016-2025), \'Định tính - FOX\', \'Định lượng - FOX\', \'Định giá - FOX\', \'Benjamin Graham - FOX\'. Nguồn chính: Vietstock, Simplize, TheInvestor, TinnhanhChungkhoan, FPT News, CafeF, MASVN — truy cập 29/7/2026.']);

async function main() {
  const auth = new google.auth.GoogleAuth({ keyFile: KEY_PATH, scopes: ['https://www.googleapis.com/auth/spreadsheets'] });
  const sheets = google.sheets({ version: 'v4', auth });

  const meta = await sheets.spreadsheets.get({ spreadsheetId });
  const fptMeta = await sheets.spreadsheets.get({ spreadsheetId: '1E47mfclzKFvpX1JZeiwu4zQFlhq8-CoLBr-bZuibqMw' });
  const fptSheet = fptMeta.data.sheets.find(s => s.properties.title === 'Báo cáo 2');

  let sheetObj = meta.data.sheets.find((s) => s.properties.title === targetSheet);
  if (!sheetObj) {
    // copyTo from FPT's Báo cáo 2 to inherit visual style, then rename
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

  // Unmerge everything on the sheet before overwriting (avoids merge-cell data-eating bug seen on VEA)
  const meta2 = await sheets.spreadsheets.get({ spreadsheetId, ranges: [`'${targetSheet}'`], includeGridData: false });
  const s2 = meta2.data.sheets.find(s => s.properties.sheetId === sheetId);
  const rowCount = s2.properties.gridProperties.rowCount;
  const colCount = s2.properties.gridProperties.columnCount;

  await sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    requestBody: { requests: [
      { unmergeCells: { range: { sheetId, startRowIndex: 0, endRowIndex: rowCount, startColumnIndex: 0, endColumnIndex: colCount } } },
      { updateCells: { range: { sheetId, startRowIndex: 0, endRowIndex: rowCount, startColumnIndex: 0, endColumnIndex: colCount }, fields: '*' } },
    ]},
  });

  await sheets.spreadsheets.values.update({
    spreadsheetId, range: `'${targetSheet}'!A1`, valueInputOption: 'USER_ENTERED', requestBody: { values: rows },
  });

  console.log(JSON.stringify({ success: true, targetSheet, rows: rows.length, sheetId }));
}
main().catch(e => { console.error(e); process.exit(1); });
