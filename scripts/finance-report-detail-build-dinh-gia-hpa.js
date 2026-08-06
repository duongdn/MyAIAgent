#!/usr/bin/env node
/**
 * Build "Định giá - HPA": valuation summary (0/I-V groups, VEA-style) +
 * mandatory VI. THANH KHOẢN (4 windows) + data-limitation caveat. Written
 * fresh for HPA rather than reusing the generic build-dinh-gia.js, because
 * that script is actually FOX-specific content under a generic name (10-year
 * FOX text hardcoded) — HPA has a fundamentally different data shape (1
 * audited year + 3 quarters, pre/post-IPO share count split) that the FOX
 * version's formulas/text cannot represent correctly.
 */
const { google } = require('googleapis');
const path = require('path');

const spreadsheetId = '1E8goOhD5WvReVK2WyWRRYM-6tKbzifxstcVuUjiEaYE';
const ticker = 'HPA';
const rawSheet = ticker;
const targetSheet = `Định giá - ${ticker}`;
const KEY_PATH = path.join(__dirname, '..', 'config', 'daily-agent-490610-7eb7985b33e3.json');

const COLS = ['B', 'C', 'D', 'E'];
const LABELS = ['2025 (năm, kiểm toán)', 'Q4/2025 (quý)', 'Q1/2026 (quý)', 'Q2/2026 (quý)'];
const SHARES = [255000000, 255000000, 285000000, 285000000]; // pre-IPO / post-IPO (30tr CP mới, 1/2026)
const MARKET = {
  price: 31950,
  priceDate: '06/08/2026 14:03',
  priceSource: 'Vietstock (finance.vietstock.vn/HPA-ctcp-phat-trien-nong-nghiep-hoa-phat.htm)',
  epsTTMSimplize: 4567,
  peTTMSimplize: 6.21,
  pbSimplize: 1.83,
  simplizeDate: '06/08/2026, simplize.vn/co-phieu/HPA',
  sharesCurrent: 285000000,
  mcap: 9105.75, // tỷ đồng, giá × 285tr CP
};
const LIQ = {
  fetchedDate: '06/08/2026 (dữ liệu phiên gần nhất 05/08/2026)',
  '1_ngay': { vol: 5700, val: 179735000 },
  '7_ngay': { vol: 19260, val: 613413000 },
  '1_thang': { vol: 35957, val: 1142279524 },
  '6_thang': { vol: 106213, val: 4166331025 },
};

async function main() {
  const auth = new google.auth.GoogleAuth({ keyFile: KEY_PATH, scopes: ['https://www.googleapis.com/auth/spreadsheets'] });
  const sheets = google.sheets({ version: 'v4', auth });

  const ref = (row) => COLS.map((c) => `='${rawSheet}'!${c}${row}`);
  const pct = (num, den) => COLS.map((c) => `=IFERROR(ROUND('${rawSheet}'!${c}${num}/'${rawSheet}'!${c}${den}*100,2),"")`);
  const ratio = (num, den) => COLS.map((c) => `=IFERROR(ROUND('${rawSheet}'!${c}${num}/'${rawSheet}'!${c}${den},2),"")`);
  const bvps = () => COLS.map((c, i) => `=IFERROR(ROUND('${rawSheet}'!${c}115*1000000000/${SHARES[i]},0),"")`);
  const fmtInt = (n) => n.toLocaleString('en-US');
  const fmtTy = (n) => (n / 1e9).toLocaleString('en-US', { maximumFractionDigits: 2 });
  const turnover = (n) => ((n / 1e9 / MARKET.mcap) * 100).toFixed(4) + '%';

  const rows = [];
  rows.push([`${ticker} - Bảng chỉ tiêu tài chính & Định giá`]);
  rows.push([
    `Đơn vị: Tỷ đồng, trừ Giá CP/EPS/BVPS (đồng/CP). Nguồn BCTC: sheet '${rawSheet}' (cafef.vn API — 1 năm kiểm toán 2025 + 3 quý gần nhất Q4/2025-Q2/2026, KHÔNG có chuỗi 5-10 năm do HPA mới niêm yết HOSE 06/02/2026 — xem LƯU Ý cuối sheet). Toàn bộ số 0/II-V là CÔNG THỨC tham chiếu trực tiếp sheet '${rawSheet}', không nhập tay.`,
  ]);
  rows.push(['Chỉ tiêu', ...LABELS]);
  rows.push([]);
  rows.push(['0. QUY MÔ DOANH NGHIỆP (SIZE)']);
  rows.push(['Tổng tài sản (tỷ đồng)', ...ref(80)]);
  rows.push(['Nợ phải trả (tỷ đồng)', ...ref(83)]);
  rows.push(['Vốn chủ sở hữu (tỷ đồng)', ...ref(115)]);
  rows.push(['Doanh thu thuần trong kỳ (tỷ đồng)', ...ref(139)]);
  rows.push(['LNST của cổ đông Công ty mẹ trong kỳ (tỷ đồng)', ...ref(157)]);
  rows.push([]);
  rows.push(['I. NHÓM CHỈ SỐ ĐỊNH GIÁ (VALUATION)']);
  rows.push([`EPS chính thức FY2025 audited (đồng/CP, dòng 159 — quý không có số EPS riêng lẻ trên cafef)`, `='${rawSheet}'!B159`, '', '', '']);
  const epsRow = rows.length; // 1-indexed row of the line just pushed
  rows.push([
    `Số CP lưu hành dùng để tính BVPS (255tr trước IPO 1/2026; 285tr từ Q1/2026 sau IPO 30tr CP mới, niêm yết HOSE 6/2/2026)`,
    ...SHARES.map(fmtInt),
  ]);
  rows.push([`BVPS - Giá trị sổ sách/CP (đồng/CP)`, ...bvps()]);
  const bvpsRow = rows.length; // 1-indexed row of the BVPS line just pushed
  rows.push([`P/E theo EPS FY2025 audited (lần) = ${MARKET.price}/EPS FY2025 (đây là số P/E chính, tự tính, có thể trace tới sheet gốc)`, `=IFERROR(ROUND(${MARKET.price}/B${epsRow},2),"")`, '', '', '']);
  rows.push([`P/B theo BVPS Q2/2026 (lần, gần nhất) = ${MARKET.price}/BVPS Q2-2026`, '', '', '', `=IFERROR(ROUND(${MARKET.price}/E${bvpsRow},2),"")`]);
  rows.push([`P/E TTM & P/B - cross-check Simplize (${MARKET.simplizeDate})`, `EPS TTM ~${MARKET.epsTTMSimplize}đ`, `P/E ${MARKET.peTTMSimplize}`, `P/B ${MARKET.pbSimplize}`, 'Khác cơ sở EPS/BVPS tự tính ở trên (TTM 4 quý gần nhất khác kỳ với FY2025 audited/BVPS Q2-2026) — không mâu thuẫn, chỉ khác kỳ tính']);
  rows.push([`Giá cổ phiếu hiện tại (đồng/CP, ${MARKET.priceDate}, nguồn ${MARKET.priceSource})`, '', '', '', MARKET.price]);
  rows.push([`Số CP lưu hành hiện tại (${MARKET.priceDate})`, '', '', '', fmtInt(MARKET.sharesCurrent)]);
  rows.push([`Vốn hóa thị trường hiện tại (tỷ đồng)`, '', '', '', fmtTy(MARKET.price * MARKET.sharesCurrent)]);
  rows.push([`Tỉ suất cổ tức gần nhất (%, đã trả 2,100đ/CP 18/5/2026 cho FY2025 — nguồn Simplize) = 2100/giá`, '', '', '', `=ROUND(2100/${MARKET.price}*100,2)`]);
  rows.push([]);
  rows.push(['II. NHÓM CHỈ SỐ SINH LỢI (PROFITABILITY)']);
  rows.push(['Biên lợi nhuận gộp (%)', ...pct(141, 139)]);
  rows.push(['Biên LNST (%)', ...pct(157, 139)]);
  rows.push([
    'ROE annualized (%) — quý đã nhân 4 để năm hóa, so sánh được với cột năm',
    `=IFERROR(ROUND('${rawSheet}'!B157/'${rawSheet}'!B115*100,2),"")`,
    `=IFERROR(ROUND('${rawSheet}'!C157*4/'${rawSheet}'!C115*100,2),"")`,
    `=IFERROR(ROUND('${rawSheet}'!D157*4/'${rawSheet}'!D115*100,2),"")`,
    `=IFERROR(ROUND('${rawSheet}'!E157*4/'${rawSheet}'!E115*100,2),"")`,
  ]);
  rows.push([
    'ROA annualized (%) — quý đã nhân 4 để năm hóa',
    `=IFERROR(ROUND('${rawSheet}'!B157/'${rawSheet}'!B80*100,2),"")`,
    `=IFERROR(ROUND('${rawSheet}'!C157*4/'${rawSheet}'!C80*100,2),"")`,
    `=IFERROR(ROUND('${rawSheet}'!D157*4/'${rawSheet}'!D80*100,2),"")`,
    `=IFERROR(ROUND('${rawSheet}'!E157*4/'${rawSheet}'!E80*100,2),"")`,
  ]);
  rows.push([]);
  rows.push(['III. NHÓM CHỈ SỐ TĂNG TRƯỞNG (chỉ QoQ giữa 3 quý — chưa đủ dữ liệu để tính YoY vì chỉ có 1 năm audited)']);
  rows.push(['Tăng trưởng DTT QoQ (%)', '', '', `=IFERROR(ROUND(('${rawSheet}'!D139-'${rawSheet}'!C139)/'${rawSheet}'!C139*100,2),"")`, `=IFERROR(ROUND(('${rawSheet}'!E139-'${rawSheet}'!D139)/'${rawSheet}'!D139*100,2),"")`]);
  rows.push(['Tăng trưởng LNST CĐ mẹ QoQ (%)', '', '', `=IFERROR(ROUND(('${rawSheet}'!D157-'${rawSheet}'!C157)/'${rawSheet}'!C157*100,2),"")`, `=IFERROR(ROUND(('${rawSheet}'!E157-'${rawSheet}'!D157)/'${rawSheet}'!D157*100,2),"")`]);
  rows.push([]);
  rows.push(['IV. NHÓM CHỈ SỐ ĐÒN BẨY TÀI CHÍNH (LEVERAGE)']);
  rows.push(['Nợ phải trả/Tổng tài sản (%)', ...pct(83, 80)]);
  rows.push(['Nợ phải trả/Vốn chủ sở hữu - D/E (lần)', ...ratio(83, 115)]);
  rows.push([]);
  rows.push(['V. NHÓM CHỈ SỐ CƠ CẤU TÀI SẢN VÀ THANH KHOẢN TÀI CHÍNH (ASSET STRUCTURE)']);
  rows.push(['Tài sản ngắn hạn/Tổng tài sản (%)', ...pct(2, 80)]);
  rows.push(['Tài sản dài hạn/Tổng tài sản (%)', ...pct(34, 80)]);
  rows.push(['Tỷ lệ thanh toán hiện hành - TSNH/Nợ ngắn hạn (lần)', ...ratio(2, 84)]);
  rows.push([]);
  rows.push(['VI. THANH KHOẢN (LIQUIDITY GIAO DỊCH CỔ PHIẾU) — mục bắt buộc']);
  rows.push([`Nguồn: finance.vietstock.vn/data/getpricehistory qua script finance-report-detail-fetch-liquidity.js, ${LIQ.fetchedDate}. Chỉ 122 phiên lịch sử (niêm yết 6/2/2026) — thấp hơn nhiều so với FPT/VEA (nhiều năm lịch sử).`]);
  rows.push(['Chỉ tiêu', '1 ngày', '7 ngày', '1 tháng', '6 tháng']);
  rows.push(['KLGD trung bình (CP/phiên)', fmtInt(LIQ['1_ngay'].vol), fmtInt(LIQ['7_ngay'].vol), fmtInt(LIQ['1_thang'].vol), fmtInt(LIQ['6_thang'].vol)]);
  rows.push(['GTGD trung bình (đồng/phiên)', fmtInt(LIQ['1_ngay'].val), fmtInt(LIQ['7_ngay'].val), fmtInt(LIQ['1_thang'].val), fmtInt(LIQ['6_thang'].val)]);
  rows.push(['GTGD/Vốn hóa (turnover, %/phiên trung bình)', turnover(LIQ['1_ngay'].val), turnover(LIQ['7_ngay'].val), turnover(LIQ['1_thang'].val), turnover(LIQ['6_thang'].val)]);
  rows.push([
    'ĐÁNH GIÁ RỦI RO THANH KHOẢN',
    'GTGD trung bình 6 tháng chỉ ~4.17 tỷ đồng/phiên, turnover ~0.046%/phiên trên vốn hóa ~9.1 nghìn tỷ — THANH KHOẢN THẤP. Vị thế lớn (VD >1 tỷ đồng) có thể mất nhiều phiên để vào/thoát mà không ảnh hưởng giá. Đây là rủi ro thực thi (execution risk) cần cân nhắc khi định cỡ vị thế — xem thêm Báo cáo 2, mục kết luận.',
  ]);
  rows.push([]);
  rows.push([
    `LƯU Ý GIỚI HẠN DỮ LIỆU: HPA niêm yết HOSE 06/02/2026, chỉ có 1 năm BCTC kiểm toán (2025) + 3 quý gần nhất trên cafef.vn — KHÔNG đạt tối thiểu 5 năm theo chuẩn quy trình (so với FPT/VEA/SAB/FOX 5-11 năm). Không dùng FireAnt bổ sung do FireAnt trộn dữ liệu công ty khác từng dùng mã HPA (quy mô tài sản chênh ~50 lần, 2009-2012) — xem docs/memory/finance-report/feedback_newly_listed_ticker_thin_cafef_data.md. Track-record ngắn là rủi ro định giá thực (cần thêm 2-3 năm dữ liệu để đánh giá tính bền vững của biên lợi nhuận/ROE hiện tại, đặc biệt trong ngành chăn nuôi vốn có tính chu kỳ giá heo/gia súc cao) — xem thêm Báo cáo 2.`,
  ]);

  const meta = await sheets.spreadsheets.get({ spreadsheetId });
  let sheetObj = meta.data.sheets.find((s) => s.properties.title === targetSheet);
  if (!sheetObj) {
    const addRes = await sheets.spreadsheets.batchUpdate({ spreadsheetId, requestBody: { requests: [{ addSheet: { properties: { title: targetSheet } } }] } });
    sheetObj = addRes.data.replies[0].addSheet;
  }
  await sheets.spreadsheets.values.clear({ spreadsheetId, range: `'${targetSheet}'!A1:L50` });
  await sheets.spreadsheets.values.update({ spreadsheetId, range: `'${targetSheet}'!A1`, valueInputOption: 'USER_ENTERED', requestBody: { values: rows } });

  console.log(JSON.stringify({ success: true, targetSheet, rows: rows.length }, null, 2));
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
