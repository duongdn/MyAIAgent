#!/usr/bin/env node
/**
 * Build "Định giá - <TICKER>": clean valuation summary table, formulas referencing
 * the raw '<TICKER>' sheet directly, matching VEA's category structure (0/I-V).
 */
const { google } = require("googleapis");
const path = require("path");

const spreadsheetId = process.argv[2];
const ticker = process.argv[3];
if (!spreadsheetId || !ticker) {
  console.error("Usage: node finance-report-detail-build-dinh-gia.js <SPREADSHEET_ID> <TICKER>");
  process.exit(1);
}
const rawSheet = ticker;
const targetSheet = `Định giá - ${ticker}`;
const KEY_PATH = path.join(__dirname, "..", "config", "daily-agent-490610-7eb7985b33e3.json");

const MARKET = { price: 46600, priceDate: "27/7/2026", peTTM: 12.49, pb: 3.05, sharesNow: 1282562372 };

async function main() {
  const auth = new google.auth.GoogleAuth({ keyFile: KEY_PATH, scopes: ["https://www.googleapis.com/auth/spreadsheets"] });
  const sheets = google.sheets({ version: "v4", auth });

  const rawRes = await sheets.spreadsheets.values.get({ spreadsheetId, range: `'${rawSheet}'!A1:K1` });
  const years = rawRes.data.values[0].slice(1);
  const cols = years.map((_, i) => String.fromCharCode(66 + i));
  const ref = (row) => cols.map((c) => `='${rawSheet}'!${c}${row}`);
  const pct = (num, den) => cols.map((c) => `=IFERROR(ROUND('${rawSheet}'!${c}${num}/'${rawSheet}'!${c}${den}*100,2),"")`);
  const ratio = (num, den) => cols.map((c) => `=IFERROR(ROUND('${rawSheet}'!${c}${num}/'${rawSheet}'!${c}${den},2),"")`);
  const growth = (row) => ["", ...cols.slice(1).map((c, i) => `=IFERROR(ROUND(('${rawSheet}'!${c}${row}-'${rawSheet}'!${cols[i]}${row})/'${rawSheet}'!${cols[i]}${row}*100,2),"")`)];
  const blankLast = () => Array(cols.length - 1).fill("");

  const rows = [];
  rows.push([`${ticker} - Bảng chỉ tiêu tài chính`]);
  rows.push([
    `Đơn vị: Tỷ đồng, trừ Giá CP/EPS/BVPS (đồng/CP); tỷ lệ % hoặc lần. Nguồn: BCTC hợp nhất kiểm toán ${ticker} 2016-2025 (dữ liệu gốc tại sheet '${rawSheet}', từ cafef.vn API, verified — 2 lỗi dữ liệu nguồn đã phát hiện+sửa: LCTT 2019/2020 dư 60,000 tỷ, xem ghi chú sheet '${rawSheet}'). Toàn bộ số liệu dưới đây là CÔNG THỨC tham chiếu trực tiếp sheet '${rawSheet}', không phải số nhập tay.`,
  ]);
  rows.push(["Chỉ tiêu", ...years]);
  rows.push([]);
  rows.push(["0. QUY MÔ DOANH NGHIỆP (SIZE)"]);
  rows.push(["Tổng tài sản (tỷ đồng)", ...ref(80)]);
  rows.push(["Nợ phải trả (tỷ đồng)", ...ref(83)]);
  rows.push(["Vốn chủ sở hữu (tỷ đồng)", ...ref(115)]);
  rows.push(["Doanh thu thuần (tỷ đồng, hợp nhất)", ...ref(139)]);
  rows.push(["LNST của cổ đông Công ty mẹ (tỷ đồng)", ...ref(157)]);
  rows.push([]);
  rows.push(["I. NHÓM CHỈ SỐ ĐỊNH GIÁ (VALUATION)"]);
  rows.push([`EPS chính thức (đồng/CP, ${ticker} công bố, dòng 159)`, ...ref(159)]);
  rows.push([
    "BVPS - Giá trị sổ sách/CP (đồng, 641.28tr CP 2016-2022 trước chia thưởng / 1,282.56tr CP 2023-2025 sau chia thưởng 1:1 năm 2023)",
    ...cols.map((c, i) => `=IFERROR(ROUND('${rawSheet}'!${c}115*1000000000/${i < 7 ? 641281186 : 1282562372},0),"")`),
  ]);
  rows.push([`P/E TTM (lần, nguồn Vietstock/Simplize ${MARKET.priceDate})`, ...blankLast(), MARKET.peTTM]);
  rows.push([`P/B (lần, nguồn Vietstock/Simplize ${MARKET.priceDate})`, ...blankLast(), MARKET.pb]);
  rows.push([`Giá cổ phiếu hiện tại (đồng/CP, ${MARKET.priceDate})`, ...blankLast(), MARKET.price]);
  rows.push([`Số CP lưu hành hiện tại (triệu CP, ${MARKET.priceDate})`, ...blankLast(), (MARKET.sharesNow / 1e6).toFixed(2)]);
  rows.push([`Vốn hóa thị trường hiện tại (tỷ đồng, ${MARKET.priceDate})`, ...blankLast(), Math.round((MARKET.price * MARKET.sharesNow) / 1e9).toLocaleString("en-US")]);
  rows.push(["Tỉ suất cổ tức ước tính hiện tại (%, cổ tức tiền mặt 2025 tạm ứng 2,000đ/CP tỷ lệ 20% — CHƯA phải tổng cả năm, xem Báo cáo 2)", ...blankLast(), `=ROUND(2000/${MARKET.price}*100,2)`]);
  rows.push([]);
  rows.push(["II. NHÓM CHỈ SỐ SINH LỢI (PROFITABILITY)"]);
  rows.push(["ROE — LNST CĐ mẹ/VCSH cuối kỳ (%)", ...pct(157, 115)]);
  rows.push(["ROA — LNST CĐ mẹ/Tổng tài sản cuối kỳ (%)", ...pct(157, 80)]);
  rows.push(["Biên lợi nhuận gộp (%)", ...pct(141, 139)]);
  rows.push(["Biên LNST (%)", ...pct(157, 139)]);
  rows.push([]);
  rows.push(["III. NHÓM CHỈ SỐ TĂNG TRƯỞNG (YoY, %)"]);
  rows.push(["Tăng trưởng Doanh thu thuần", ...growth(139)]);
  rows.push(["Tăng trưởng LNST của CĐ công ty mẹ", ...growth(157)]);
  rows.push(["Tăng trưởng Tổng tài sản", ...growth(80)]);
  rows.push([]);
  rows.push(["IV. NHÓM CHỈ SỐ ĐÒN BẨY TÀI CHÍNH (LEVERAGE)"]);
  rows.push(["Nợ phải trả/Tổng tài sản (%)", ...pct(83, 80)]);
  rows.push(["Nợ phải trả/Vốn chủ sở hữu - D/E (lần)", ...ratio(83, 115)]);
  rows.push([]);
  rows.push(["V. NHÓM CHỈ SỐ CƠ CẤU TÀI SẢN VÀ THANH KHOẢN (ASSET STRUCTURE)"]);
  rows.push(["Tài sản ngắn hạn/Tổng tài sản (%)", ...pct(2, 80)]);
  rows.push(["Tài sản dài hạn/Tổng tài sản (%)", ...pct(34, 80)]);
  rows.push(["Tỷ lệ thanh toán hiện hành - TSNH/Nợ ngắn hạn (lần)", ...ratio(2, 84)]);
  rows.push([]);
  rows.push([
    `Ghi chú chung: TẤT CẢ chỉ số mục 0/II/III/IV/V là CÔNG THỨC tham chiếu trực tiếp sheet '${rawSheet}' (10 năm 2016-2025, BCTC hợp nhất kiểm toán từ cafef.vn API, đã verify tổng tài sản=tổng nguồn vốn khớp tuyệt đối, đã sửa 1 lỗi dữ liệu nguồn) — chính xác, không ước lượng. EPS dòng 159 là số ${ticker} CHÍNH THỨC công bố (không tính tay). P/E, P/B, giá, vốn hóa lấy từ Vietstock/Simplize ${MARKET.priceDate} (nguồn khác, đối chiếu, không có chuỗi lịch sử P/E/P/B). BVPS dùng đúng số CP theo từng giai đoạn (trước/sau chia thưởng 1:1 năm 2023) — xem chi tiết 'Định lượng - ${ticker}' dòng ghi chú.`,
  ]);

  const auth2 = auth;
  const meta = await sheets.spreadsheets.get({ spreadsheetId });
  let sheetObj = meta.data.sheets.find((s) => s.properties.title === targetSheet);
  if (!sheetObj) {
    const addRes = await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: { requests: [{ addSheet: { properties: { title: targetSheet } } }] },
    });
    sheetObj = addRes.data.replies[0].addSheet;
  }
  await sheets.spreadsheets.values.clear({ spreadsheetId, range: `'${targetSheet}'!A1:L45` });
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `'${targetSheet}'!A1`,
    valueInputOption: "USER_ENTERED",
    requestBody: { values: rows },
  });

  console.log(JSON.stringify({ success: true, targetSheet, rows: rows.length }, null, 2));
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
