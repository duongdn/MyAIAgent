#!/usr/bin/env node
/**
 * Build "Định lượng - HPA": copy raw BCTC rows (1-204, incl. data-limitation
 * caveat banner) + append a formula-driven ratio block tailored to HPA's
 * actual data shape (1 audited annual year 2025 + 3 recent quarters
 * Q4/2025-Q1/2026-Q2/2026) — NOT a blind reuse of the VEA/FOX 10-year-annual
 * generic script, because:
 *  - quarterly flow figures (DTT/LNST) are per-quarter, not cumulative — YoY
 *    growth across annual vs quarterly columns would be meaningless
 *  - share count changed mid-period: 255,000,000 (FY2025 audited, pre-IPO)
 *    vs 285,000,000 (from Q1/2026 onward, post-IPO 30tr CP mới 1/2026) — BVPS
 *    must use the correct share count per column, not one blanket constant
 */
const { google } = require('googleapis');
const path = require('path');

const spreadsheetId = process.argv[2] || '1E8goOhD5WvReVK2WyWRRYM-6tKbzifxstcVuUjiEaYE';
const ticker = 'HPA';
const rawSheet = ticker;
const targetSheet = `Định lượng - ${ticker}`;
const KEY_PATH = path.join(__dirname, '..', 'config', 'daily-agent-490610-7eb7985b33e3.json');

// Columns as laid out in the HPA raw sheet: B=2025(annual, audited), C=Q4/2025, D=Q1/2026, E=Q2/2026
const COLS = ['B', 'C', 'D', 'E'];
const LABELS = ['2025 (cả năm, kiểm toán)', 'Q4/2025 (quý)', 'Q1/2026 (quý)', 'Q2/2026 (quý)'];
// Shares outstanding per column: FY2025 audited + Q4/2025 = pre-IPO 255,000,000; Q1/2026 & Q2/2026 = post-IPO 285,000,000
const SHARES = [255000000, 255000000, 285000000, 285000000];
const MARKET = {
  price: 31950,
  priceDate: '06/08/2026 14:03',
  priceSource: 'Vietstock https://finance.vietstock.vn/HPA-ctcp-phat-trien-nong-nghiep-hoa-phat.htm',
  epsTTMSimplize: 4567,
  peTTMSimplize: 6.21,
  pbSimplize: 1.83,
  simplizeDate: '06/08/2026, https://simplize.vn/co-phieu/HPA',
  sharesCurrent: 285000000,
};

async function main() {
  const auth = new google.auth.GoogleAuth({ keyFile: KEY_PATH, scopes: ['https://www.googleapis.com/auth/spreadsheets'] });
  const sheets = google.sheets({ version: 'v4', auth });

  const rawRes = await sheets.spreadsheets.values.get({ spreadsheetId, range: `'${rawSheet}'!A1:F204` });
  const rawRows = rawRes.data.values;

  const meta = await sheets.spreadsheets.get({ spreadsheetId });
  let sheetObj = meta.data.sheets.find((s) => s.properties.title === targetSheet);
  if (!sheetObj) {
    const addRes = await sheets.spreadsheets.batchUpdate({ spreadsheetId, requestBody: { requests: [{ addSheet: { properties: { title: targetSheet } } }] } });
    sheetObj = addRes.data.replies[0].addSheet;
  }

  await sheets.spreadsheets.values.clear({ spreadsheetId, range: `'${targetSheet}'!A1:Z280` });
  await sheets.spreadsheets.values.update({ spreadsheetId, range: `'${targetSheet}'!A1`, valueInputOption: 'USER_ENTERED', requestBody: { values: rawRows } });

  const ref = (row) => COLS.map((c) => `='${rawSheet}'!${c}${row}`);
  const pct = (num, den) => COLS.map((c) => `=IFERROR(ROUND('${rawSheet}'!${c}${num}/'${rawSheet}'!${c}${den}*100,2),"")`);
  const ratio = (num, den) => COLS.map((c) => `=IFERROR(ROUND('${rawSheet}'!${c}${num}/'${rawSheet}'!${c}${den},2),"")`);

  const block = [];
  block.push(['PHẦN ĐỊNH LƯỢNG BỔ SUNG — TỶ SỐ TÀI CHÍNH (HPA chỉ có 1 năm kiểm toán 2025 + 3 quý gần nhất — KHÔNG có chuỗi 5-10 năm như FPT/VEA/SAB/FOX)']);
  block.push([`Nguồn: công thức tham chiếu trực tiếp sheet '${rawSheet}' (dòng 1-202) phía trên, không nhập số mới. Giá/P-E/P-B thị trường: ${MARKET.priceSource}, ${MARKET.priceDate}.`]);
  block.push([]);
  block.push(['Chỉ tiêu', ...LABELS]);
  block.push(['I. QUY MÔ (2025=cả năm; 3 cột quý=số riêng từng quý, KHÔNG cộng dồn — xem sheet HPA gốc)']);
  block.push(['Tổng tài sản cuối kỳ (tỷ đồng)', ...ref(80)]);
  block.push(['Vốn chủ sở hữu cuối kỳ (tỷ đồng)', ...ref(115)]);
  block.push(['Doanh thu thuần trong kỳ (tỷ đồng)', ...ref(139)]);
  block.push(['LNST của cổ đông Công ty mẹ trong kỳ (tỷ đồng)', ...ref(157)]);
  block.push([]);
  block.push(['II. SINH LỢI (biên LN: an toàn so sánh quý-năm vì cùng dùng tử/mẫu cùng kỳ; ROE/ROA quý đã ANNUALIZED ×4 để so sánh được với ROE/ROA năm — ghi rõ)']);
  block.push(['Biên lợi nhuận gộp — LN gộp/DTT (%)', ...pct(141, 139)]);
  block.push(['Biên LNST — LNST CĐ mẹ/DTT (%)', ...pct(157, 139)]);
  block.push([
    'ROE annualized — (LNST kỳ × hệ số năm hóa)/VCSH cuối kỳ (%)',
    `=IFERROR(ROUND('${rawSheet}'!B157/'${rawSheet}'!B115*100,2),"")`,
    `=IFERROR(ROUND('${rawSheet}'!C157*4/'${rawSheet}'!C115*100,2),"")`,
    `=IFERROR(ROUND('${rawSheet}'!D157*4/'${rawSheet}'!D115*100,2),"")`,
    `=IFERROR(ROUND('${rawSheet}'!E157*4/'${rawSheet}'!E115*100,2),"")`,
  ]);
  block.push([
    'ROA annualized — (LNST kỳ × hệ số năm hóa)/Tổng TS cuối kỳ (%)',
    `=IFERROR(ROUND('${rawSheet}'!B157/'${rawSheet}'!B80*100,2),"")`,
    `=IFERROR(ROUND('${rawSheet}'!C157*4/'${rawSheet}'!C80*100,2),"")`,
    `=IFERROR(ROUND('${rawSheet}'!D157*4/'${rawSheet}'!D80*100,2),"")`,
    `=IFERROR(ROUND('${rawSheet}'!E157*4/'${rawSheet}'!E80*100,2),"")`,
  ]);
  block.push([]);
  block.push(['III. TĂNG TRƯỞNG QoQ (chỉ so sánh được giữa 3 cột quý — KHÔNG so annual vs quý; chưa đủ 2 năm để tính YoY)']);
  block.push(['Tăng trưởng DTT QoQ (%)', '', '', `=IFERROR(ROUND(('${rawSheet}'!D139-'${rawSheet}'!C139)/'${rawSheet}'!C139*100,2),"")`, `=IFERROR(ROUND(('${rawSheet}'!E139-'${rawSheet}'!D139)/'${rawSheet}'!D139*100,2),"")`]);
  block.push(['Tăng trưởng LNST CĐ mẹ QoQ (%)', '', '', `=IFERROR(ROUND(('${rawSheet}'!D157-'${rawSheet}'!C157)/'${rawSheet}'!C157*100,2),"")`, `=IFERROR(ROUND(('${rawSheet}'!E157-'${rawSheet}'!D157)/'${rawSheet}'!D157*100,2),"")`]);
  block.push([]);
  block.push(['IV. ĐÒN BẨY TÀI CHÍNH (LEVERAGE) — snapshot cuối kỳ, so sánh được cả 4 cột']);
  block.push(['Nợ phải trả/Tổng tài sản (%)', ...pct(83, 80)]);
  block.push(['Nợ phải trả/Vốn chủ sở hữu — D/E (lần)', ...ratio(83, 115)]);
  block.push([]);
  block.push(['V. THANH KHOẢN TÀI CHÍNH & CƠ CẤU TÀI SẢN (snapshot cuối kỳ)']);
  block.push(['Tài sản ngắn hạn/Tổng tài sản (%)', ...pct(2, 80)]);
  block.push(['Tài sản dài hạn/Tổng tài sản (%)', ...pct(34, 80)]);
  block.push(['Tỷ lệ thanh toán hiện hành — TSNH/Nợ ngắn hạn (lần)', ...ratio(2, 84)]);
  block.push([]);
  block.push([`VI. ĐỊNH GIÁ (giá ${MARKET.price.toLocaleString('vi-VN')}đ, ${MARKET.priceDate}, nguồn ${MARKET.priceSource})`]);
  block.push(['EPS chính thức FY2025 audited (đồng/CP, dòng 159, chỉ có ở cột năm)', `='${rawSheet}'!B159`, '', '', '']);
  block.push([
    'Số CP lưu hành dùng để tính BVPS (255tr FY2025/Q4-2025 tiền-IPO; 285tr từ Q1/2026 hậu IPO 1/2026)',
    SHARES[0].toLocaleString('en-US'), SHARES[1].toLocaleString('en-US'), SHARES[2].toLocaleString('en-US'), SHARES[3].toLocaleString('en-US'),
  ]);
  block.push([
    'BVPS — VCSH cuối kỳ/Số CP tương ứng (đồng/CP)',
    `=IFERROR(ROUND('${rawSheet}'!B115*1000000000/${SHARES[0]},0),"")`,
    `=IFERROR(ROUND('${rawSheet}'!C115*1000000000/${SHARES[1]},0),"")`,
    `=IFERROR(ROUND('${rawSheet}'!D115*1000000000/${SHARES[2]},0),"")`,
    `=IFERROR(ROUND('${rawSheet}'!E115*1000000000/${SHARES[3]},0),"")`,
  ]);
  block.push([`P/E theo EPS FY2025 audited (lần) = ${MARKET.price}/EPS FY2025`, `=IFERROR(ROUND(${MARKET.price}/'${rawSheet}'!B159,2),"")`, '', '', '']);
  const bvpsRow = 206 + block.length - 2; // row index of the BVPS line pushed 2 rows above (P/E row was pushed in between)
  block.push(['P/B theo BVPS Q2/2026 hiện tại nhất (lần)', '', '', '', `=IFERROR(ROUND(${MARKET.price}/E${bvpsRow},2),"")`]);
  block.push([`P/E TTM & P/B theo Simplize (cross-check, ${MARKET.simplizeDate})`, `EPS TTM ${MARKET.epsTTMSimplize}đ`, `P/E ${MARKET.peTTMSimplize}`, `P/B ${MARKET.pbSimplize}`, 'Khác EPS FY2025 audited do TTM lấy 4 quý gần nhất khác kỳ + Simplize có thể dùng snapshot giá khác thời điểm']);
  block.push(['Vốn hóa hiện tại (tỷ đồng) = giá × 285tr CP lưu hành', '', '', '', `=ROUND(${MARKET.price}*${MARKET.sharesCurrent}/1000000000,2)`]);
  block.push([`LƯU Ý: FY2025 audited (255tr CP, trước IPO 30tr CP mới 1/2026, niêm yết HOSE 6/2/2026) khác số CP hiện tại (285tr) — P/E/BVPS/P/B tính theo 2 cơ sở khác nhau đã ghi rõ cột tương ứng, không trộn lẫn.`]);

  await sheets.spreadsheets.values.update({ spreadsheetId, range: `'${targetSheet}'!A206`, valueInputOption: 'USER_ENTERED', requestBody: { values: block } });

  console.log(JSON.stringify({ success: true, targetSheet, rawRows: rawRows.length, blockRows: block.length, blockStart: 206 }, null, 2));
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
