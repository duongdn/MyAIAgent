const { google } = require('googleapis');
const path = require('path');

const spreadsheetId = '1VGjJoRwXaWVR1V0nGDlY_40GsijtJ4ohVnaHXjf3KeU';
const targetSheet = 'Định tính - FOX';
const KEY_PATH = '/home/nus/projects/My-AI-Agent/config/daily-agent-490610-7eb7985b33e3.json';

const rows = [];
rows.push(['', 'THE INTELLIGENT INVESTOR - HỌC VIỆN AYP']);
rows.push(['', 'Follow up 2 - Company Research - Nghiên cứu doanh nghiệp']);
rows.push([]);
rows.push(['', 'Good Company - Định tính', 'CTCP Viễn thông FPT (FPT Telecom)']);
rows.push(['I', 'Ngành']);
rows.push(['1', 'Đặc thù ngành\n(yếu tố quan trọng)',
`FOX hoạt động trong ngành viễn thông/hạ tầng số Việt Nam, gồm 3 mảng: Internet băng rộng (ISP — FTTH/ADSL/VDSL), Truyền hình trả tiền (PayTV/OTT qua FPT Play), và Trung tâm dữ liệu/điện toán đám mây (Data Center & Cloud). Đặc thù ngành: đầu tư hạ tầng vốn lớn (cáp quang, DC), doanh thu định kỳ (subscription) tương đối ổn định, nhưng cạnh tranh giá gay gắt với 2 đối thủ quốc doanh lớn (Viettel, VNPT) chiếm phần lớn thị phần.
(Nguồn: Vietstock FOX Profile https://finance.vietstock.vn/FOX-ctcp-vien-thong-fpt.htm?languageid=2, truy cập 29/7/2026)`]);
rows.push(['2', 'Triển vọng ngành',
`Thị trường băng rộng VN: ~25 triệu thuê bao, tăng trưởng ~3.8%/năm, xu hướng chuyển từ gói cơ bản sang Gigabit. Thị trường IPTV dự báo CAGR 18.2% (2025-2033, đạt 1.69 tỷ USD vào 2033); OTT TV tăng +33% (5.6tr→7.4tr thuê bao). Data Center: FOX vừa khánh thành Fornix HCM02 (8/2025, chuẩn Tier III + LEED), doanh thu DC tăng >20%/năm — mảng tăng trưởng nhanh nhất, phù hợp xu hướng AI/chuyển đổi số.
(Nguồn: TelecomLead https://telecomlead.com/broadband/best-isp-in-vietnam-2026-viettel-leads-ftth-market-with-11-million-subscribers-and-1-gbps-rollout-126543; IMARC IPTV Vietnam https://www.imarcgroup.com/vietnam-iptv-market; VietnamPlus OTT https://en.vietnamplus.vn/on-demand-viewer-service-competition-heats-up-in-vietnam-post235645.vnp — tất cả truy cập 29/7/2026)`]);
rows.push(['3', 'Rủi ro ngành',
`• Cạnh tranh giá từ Viettel (44% thị phần băng rộng, dẫn đầu) và VNPT; PayTV cạnh tranh thêm từ OTT toàn cầu (Netflix, YouTube...).
• Chi phí điện cho Data Center: quy định mới xếp DC vào "dịch vụ thương mại" → giá điện tăng ~50% (2026) — ảnh hưởng trực tiếp biên lợi nhuận mảng DC đang mở rộng.
• Rủi ro công nghệ: chuyển đổi hạ tầng, cạnh tranh 5G/6G có thể thay đổi cấu trúc ngành viễn thông trung hạn.
• FOX chưa đáp ứng đủ điều kiện công ty đại chúng chuẩn (tối thiểu 10% cổ phần do ≥100 nhà đầu tư nắm giữ, tính tới 5/2026) — có thể ảnh hưởng kế hoạch niêm yết/thanh khoản.
(Nguồn: MASVN Stock Recommendation https://masvn.com/api/attachment/file/1746515572039-Stockrecommendation_MobileFPT.pdf; CafeF điện DC https://cafef.vn/fpt-va-fpt-telecom-dinh-nghia-lai-quyen-luc-quan-tri-188260319133353302.chn; NguoiQuanSat công ty đại chúng https://nguoiquansat.vn/ve-voi-bo-cong-an-fpt-telecom-fox-lan-dau-len-lo-trinh-dap-ung-dieu-kien-cong-ty-dai-chung-291202.html — truy cập 29/7/2026)`]);
rows.push(['→', 'Định hướng\nFOX đang theo đuổi',
`Mở rộng Data Center/Cloud (Fornix HCM02 vừa khánh thành 8/2025) để đón đầu nhu cầu AI/chuyển đổi số; củng cố vị thế PayTV qua bản quyền độc quyền Ngoại Hạng Anh 2026-2031 (~26 triệu USD/năm) nhằm cạnh tranh giành vị trí dẫn đầu thị trường internet TV. Kế hoạch 2026: doanh thu 22.0 nghìn tỷ (+12.8%), LNTT 5.1 nghìn tỷ (+17%).
(Nguồn: FPT Play EPL Rights https://fpt.com/en/news/fpt-news/fpt-play-so-huu-ban-quyen-giai-ngoai-hang-anh-tai-viet-nam; TinnhanhChungkhoan kế hoạch 2026 https://www.tinnhanhchungkhoan.vn/fpt-telecom-fox-dat-muc-tieu-loi-nhuan-2026-tang-gan-17-muon-chia-co-tuc-va-co-phieu-thuong-tong-ty-le-35-post387606.html — truy cập 29/7/2026)`]);
rows.push([]);
rows.push(['II', 'Mô hình kinh doanh']);
rows.push(['3', 'Các mảng kinh doanh',
`3 mảng doanh thu chính: (1) ISP băng rộng — ~3.75 triệu thuê bao, 15% thị phần toàn quốc, doanh thu telecom services 2024 ~664 triệu USD (+11.3%), LNTT ~134 triệu USD (+18.1%); (2) PayTV/OTT (FPT Play) — đứng thứ 3 thị trường internet TV, doanh thu OTT FY2025 1,688 tỷ đồng (+8.3%); (3) Data Center & Cloud — doanh thu 2023 ~20 triệu USD, tăng trưởng >20%/năm, mô hình Carrier Neutral. KHÔNG tìm được tỷ trọng đóng góp lợi nhuận chi tiết theo mảng cho FY2025 (báo cáo công khai chưa tách bạch) — điểm cần lưu ý khi đánh giá.
(Nguồn: Vietstock FOX Profile; TheInvestor Market Share https://theinvestor.vn/fpt-telecom-sets-sights-on-top-spot-in-vietnams-internet-tv-market-d17990.html; Investing.com FOX Financials https://www.investing.com/equities/fpt-telecom-jsc-financial-summary — truy cập 29/7/2026)`]);
rows.push(['4', 'Đầu vào — Hạ tầng/Chi phí vốn',
`Đầu vào chủ yếu là hạ tầng cáp quang, thiết bị mạng, và đầu tư xây dựng Data Center (capex lớn, VD Fornix HCM02). Không tìm thấy số liệu capex 2025-2026 công khai chi tiết theo dự án ngoài ước tính chung ~1.5 nghìn tỷ đồng/năm cho mở rộng DC (theo báo cáo phân tích MASVN) — cần verify thêm khi có BCTN chính thức.
(Nguồn: MASVN Stock Recommendation, đã dẫn ở trên)`]);
rows.push(['5', 'Đầu ra — Sản phẩm/Dịch vụ',
`Dịch vụ FTTH/ADSL/VDSL/TripplePlay (ISP), IPTV FPT Play ~200 kênh + bản quyền thể thao (PayTV), dịch vụ Data Center/Cloud Carrier Neutral phục vụ doanh nghiệp/AI. Doanh thu định kỳ dạng thuê bao (subscription-based) cho ISP/PayTV, doanh thu theo hợp đồng dài hạn cho DC.
(Nguồn: Vietstock FOX Profile; FPT Data Center https://fpt.vn/en/business/services/fpt-data-center.html — truy cập 29/7/2026)`]);
rows.push(['6', 'Đầu ra — Thị trường',
`Thị trường nội địa Việt Nam. Băng rộng: FOX 15% thị phần (thứ 2, sau Viettel 44%). PayTV: đứng thứ 3 thị trường internet TV. Không tìm thấy hoạt động kinh doanh quốc tế đáng kể — toàn bộ doanh thu tập trung thị trường trong nước.
(Nguồn: TelecomLead, đã dẫn ở trên)`]);
rows.push(['7', 'Đánh giá mô hình kinh doanh\n+ Chất lượng tăng trưởng',
`ĐIỂM MẠNH (theo BCTC 10 năm 2016-2025, sheet 'FOX'/'Định lượng - FOX'):
• Doanh thu thuần TĂNG LIÊN TỤC cả 10 năm, không năm nào giảm: 6,666 tỷ (2016) → 19,507 tỷ (2025), tăng trưởng YoY dao động 7.3-17.9%/năm — đều đặn, không có năm âm.
• LNST của cổ đông Công ty mẹ TĂNG 9/10 năm (chỉ giảm nhẹ -4.98% năm 2017), từ 918 tỷ (2016) lên 3,418 tỷ (2025) — biên LNST cải thiện đều từ 13.77% lên 17.52%.
• ROE cao và ổn định: 25.5-31.0% suốt 10 năm; ROA 8.7-13.1%. Biên lợi nhuận gộp ổn định quanh 46-50%.
ĐIỂM CẦN LƯU Ý:
• Đòn bẩy tài chính khá cao: Nợ/Tổng tài sản 55-70%, D/E 1.2-2.4 lần — cao hơn đáng kể so với VEA (D/E 0.05-0.26 lần) do đặc thù ngành hạ tầng vốn lớn.
• Tỷ lệ thanh toán hiện hành (current ratio) DƯỚI 1.0 hầu hết các năm 2016-2022 (0.87-0.98 lần), chỉ vượt 1.0 từ 2023 (1.04-1.17 lần) — tài sản ngắn hạn từng thấp hơn nợ ngắn hạn nhiều năm, rủi ro thanh khoản ngắn hạn cần theo dõi dù đã cải thiện gần đây.
→ KẾT LUẬN: mô hình tăng trưởng doanh thu/lợi nhuận đều đặn, chất lượng tốt hơn nhiều so với công ty "thu cổ tức thụ động" — đây là doanh nghiệp VẬN HÀNH thực sự tạo giá trị qua hoạt động kinh doanh cốt lõi, không phải holding.
(Nguồn: sheet 'FOX' + 'Định lượng - FOX', BCTC hợp nhất kiểm toán cafef.vn, đã verify Tổng tài sản=Tổng nguồn vốn khớp tuyệt đối 10 năm)`]);
rows.push([]);
rows.push(['III', 'Quản trị']);
rows.push(['8', 'Cơ cấu cổ đông',
`THAY ĐỔI LỚN VỀ CƠ CẤU SỞ HỮU (11/2025 - 3/2026):
• Trước 11/2025: SCIC (đại diện vốn Nhà nước) 50.17%, FPT Corp 45.66%.
• Sau 11/2025: Bộ Công an tiếp nhận chức năng đại diện vốn Nhà nước tại FOX thay SCIC.
• Từ 2026: FPT Corp NGỪNG hợp nhất báo cáo tài chính FOX, chuyển sang phương pháp vốn chủ sở hữu — FOX chính thức "tách" khỏi tập đoàn FPT về mặt kế toán (3/2026), dù vẫn là cổ đông lớn.
Ý nghĩa: cơ cấu sở hữu FOX nay có yếu tố Nhà nước (qua Bộ Công an) tương tự VEA, khác biệt so với các công ty tư nhân thuần túy — cần theo dõi tác động đến chiến lược/quản trị dài hạn. KHÔNG tìm thấy % sở hữu cụ thể của Bộ Công an sau chuyển giao (chỉ biết kế thừa tỷ lệ SCIC cũ) — cần verify khi có BCTN 2025 chính thức.
(Nguồn: TheInvestor Strategic Split https://theinvestor.vn/fpt-corporation-and-fpt-telecom-a-strategic-split-to-unlock-higher-valuation-d18674.html; TheInvestor SCIC Transfer https://theinvestor.vn/fpt-telecom-sustains-growth-momentum-after-state-capital-oversight-transfer-to-public-security-ministry-d18219.html — truy cập 29/7/2026)`]);
rows.push(['9', 'Ban điều hành',
`• Chủ tịch HĐQT: Hoàng Việt Anh — từ 4/2023, từng Chủ tịch FPT Digital.
• Tổng Giám đốc: Nguyễn Hoàng Linh.
KHÔNG tìm thấy thông tin thay đổi nhân sự lãnh đạo sau sự kiện chuyển giao vốn Nhà nước (11/2025) — cần verify xem Bộ Công an có cử người vào HĐQT/ban điều hành hay giữ nguyên ban lãnh đạo hiện tại.
(Nguồn: Vietnam.vn Leadership https://www.vietnam.vn/en/fpt-telecom-co-chu-tich-hdqt-va-tong-giam-doc-moi/ — truy cập 29/7/2026)`]);
rows.push(['10', 'Lưu ý khác',
`Toàn bộ 10 năm BCTC 2016-2025 đều đánh dấu "Đã kiểm toán" theo cafef.vn API — không tìm thấy chi tiết loại ý kiến kiểm toán (chấp nhận toàn phần/có ngoại trừ) trong phạm vi nghiên cứu này, cần đối chiếu BCTN gốc nếu cần độ chi tiết cao hơn.
FOX hiện GIAO DỊCH TRÊN UPCOM (từ 13/1/2017), CHƯA tìm thấy công bố lộ trình/kế hoạch chuyển sàn HOSE chính thức. FOX cũng CHƯA đáp ứng điều kiện công ty đại chúng chuẩn (10% CP do ≥100 NĐT nắm giữ, tính đến 5/2026) — có thể liên quan đến thanh khoản thấp quan sát được (xem 'Định giá - FOX' mục VI).
(Nguồn: Simplize FOX https://simplize.vn/co-phieu/FOX; NguoiQuanSat, đã dẫn ở trên — truy cập 29/7/2026)`]);
rows.push([]);
rows.push(['IV', 'Nhận định']);
rows.push(['', '',
`KẾT LUẬN: FOX LÀ DOANH NGHIỆP VIỄN THÔNG VẬN HÀNH THỰC SỰ, TĂNG TRƯỞNG ĐỀU ĐẶN, ĐANG TRẢI QUA THAY ĐỔI CƠ CẤU SỞ HỮU LỚN.

Khác với VEA (holding thu cổ tức JV), FOX là công ty vận hành trực tiếp 3 mảng kinh doanh (ISP/PayTV/Data Center) với doanh thu và lợi nhuận TĂNG TRƯỞNG LIÊN TỤC 10/10 năm về doanh thu và 9/10 năm về LNST (2016-2025) — chất lượng tăng trưởng tốt, ROE ổn định 25-31%, biên lợi nhuận cải thiện đều.

Rủi ro/điểm cần theo dõi chính: (1) thay đổi cơ cấu sở hữu lớn 11/2025-3/2026 (SCIC→Bộ Công an, FPT Corp ngừng hợp nhất) — tác động chiến lược/quản trị dài hạn chưa rõ ràng; (2) đòn bẩy tài chính khá cao (D/E 1.2-2.4 lần) và current ratio từng dưới 1.0 nhiều năm (dù đã cải thiện từ 2023); (3) chi phí điện Data Center dự kiến tăng 50% (2026) ảnh hưởng biên lợi nhuận mảng tăng trưởng nhanh nhất; (4) thanh khoản cổ phiếu THẤP (KLGD 1 tháng chỉ ~92 nghìn CP/phiên, xem 'Định giá - FOX' mục VI) — rủi ro thực thi khi định cỡ vị thế lớn; (5) chưa đáp ứng điều kiện công ty đại chúng chuẩn, chưa rõ lộ trình HOSE.

Với định giá P/E 12.36x, P/B 3.53x (29/7/2026) — không rẻ như VEA nhưng phản ánh chất lượng tăng trưởng cao hơn và vị thế ngành hạ tầng số đang mở rộng (Data Center/AI).

(Tổng hợp từ các mục trên — nguồn chi tiết xem từng dòng, đặc biệt sheet 'FOX', 'Định lượng - FOX', 'Định giá - FOX')`]);

async function main() {
  const auth = new google.auth.GoogleAuth({ keyFile: KEY_PATH, scopes: ['https://www.googleapis.com/auth/spreadsheets'] });
  const sheets = google.sheets({ version: 'v4', auth });
  const meta = await sheets.spreadsheets.get({ spreadsheetId });
  let sheetObj = meta.data.sheets.find((s) => s.properties.title === targetSheet);
  if (!sheetObj) {
    const addRes = await sheets.spreadsheets.batchUpdate({ spreadsheetId, requestBody: { requests: [{ addSheet: { properties: { title: targetSheet } } }] } });
    sheetObj = addRes.data.replies[0].addSheet;
  }
  await sheets.spreadsheets.values.clear({ spreadsheetId, range: `'${targetSheet}'!A1:D30` });
  await sheets.spreadsheets.values.update({
    spreadsheetId, range: `'${targetSheet}'!A1`, valueInputOption: 'USER_ENTERED', requestBody: { values: rows },
  });
  console.log(JSON.stringify({ success: true, targetSheet, rows: rows.length }));
}
main().catch(e => { console.error(e); process.exit(1); });
