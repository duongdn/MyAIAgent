#!/usr/bin/env node
/**
 * Build "Định lượng - <TICKER>" sheet: copy raw BCTC rows + append a formula-driven
 * ratio-analysis block below, matching the VEA reference structure exactly
 * (row numbers for TỔNG CỘNG TÀI SẢN=80, D VỐN CHỦ SỞ HỮU=115, etc. are identical
 * between SAB and VEA since both use the same VAS chart-of-accounts row order).
 */
const { google } = require("googleapis");
const path = require("path");

const spreadsheetId = process.argv[2];
const ticker = process.argv[3];
if (!spreadsheetId || !ticker) {
  console.error("Usage: node finance-report-detail-build-dinh-luong.js <SPREADSHEET_ID> <TICKER>");
  process.exit(1);
}
const rawSheet = ticker;
const targetSheet = `Định lượng - ${ticker}`;
const KEY_PATH = path.join(__dirname, "..", "config", "daily-agent-490610-7eb7985b33e3.json");

// current market data (fetched live 29/7/2026 via Vietstock/Simplize cross-check)
const MARKET = {
  price: 61500,
  priceDate: "29/7/2026",
  peTTM: 12.36,
  pb: 3.53,
  sharesNow: 738763456, // matches "Vốn góp của chủ sở hữu" FY2025 (7,387.63 tỷ / mệnh giá 10,000đ) — no split/adjustment pending
  sharesFY2025: 738763456,
};

async function main() {
  const auth = new google.auth.GoogleAuth({ keyFile: KEY_PATH, scopes: ["https://www.googleapis.com/auth/spreadsheets"] });
  const sheets = google.sheets({ version: "v4", auth });

  const rawRes = await sheets.spreadsheets.values.get({ spreadsheetId, range: `'${rawSheet}'!A1:K202` });
  const rawRows = rawRes.data.values;
  const years = rawRows[0].slice(1); // ["2016",...,"2025"]
  const cols = years.map((_, i) => String.fromCharCode(66 + i)); // B..K

  const meta = await sheets.spreadsheets.get({ spreadsheetId });
  let sheetObj = meta.data.sheets.find((s) => s.properties.title === targetSheet);
  if (!sheetObj) {
    const addRes = await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: { requests: [{ addSheet: { properties: { title: targetSheet } } }] },
    });
    sheetObj = addRes.data.replies[0].addSheet;
  }

  await sheets.spreadsheets.values.clear({ spreadsheetId, range: `'${targetSheet}'!A1:Z260` });
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `'${targetSheet}'!A1`,
    valueInputOption: "USER_ENTERED",
    requestBody: { values: rawRows },
  });

  const yearHeader = years.map((y) => y.toString());
  const blank = () => Array(cols.length).fill("");
  const formulaRow = (fn) => cols.map((c) => fn(c));

  const block = [];
  block.push(["PHẦN ĐỊNH LƯỢNG BỔ SUNG — TỶ SỐ TÀI CHÍNH TÍNH TỪ BCTC 10 NĂM (công thức tham chiếu trực tiếp dữ liệu ở trên, cùng sheet)"]);
  block.push([`Nguồn: toàn bộ công thức dưới đây tham chiếu trực tiếp các dòng BCTC hợp nhất kiểm toán 2016-2025 đã copy từ sheet '${rawSheet}' phía trên (dòng 1-202) — không nhập số liệu mới, chỉ tính toán. Đơn vị: % hoặc lần trừ khi ghi chú khác.`]);
  block.push([]);
  block.push(["Chỉ tiêu", ...yearHeader]);
  block.push(["I. QUY MÔ"]);
  block.push(["Tổng tài sản (tỷ đồng)", ...formulaRow((c) => `=${c}80`)]);
  block.push(["Vốn chủ sở hữu (tỷ đồng)", ...formulaRow((c) => `=${c}115`)]);
  block.push(["Doanh thu thuần (tỷ đồng)", ...formulaRow((c) => `=${c}139`)]);
  block.push(["LNST của cổ đông Công ty mẹ (tỷ đồng)", ...formulaRow((c) => `=${c}157`)]);
  block.push([]);
  block.push(["II. SINH LỢI (PROFITABILITY)"]);
  block.push(["ROE — LNST CĐ mẹ/VCSH cuối kỳ (%)", ...formulaRow((c) => `=IFERROR(ROUND(${c}157/${c}115*100,2),"")`)]);
  block.push(["ROA — LNST CĐ mẹ/Tổng tài sản cuối kỳ (%)", ...formulaRow((c) => `=IFERROR(ROUND(${c}157/${c}80*100,2),"")`)]);
  block.push(["Biên lợi nhuận gộp — LN gộp/DTT (%)", ...formulaRow((c) => `=IFERROR(ROUND(${c}141/${c}139*100,2),"")`)]);
  block.push(["Biên LNST — LNST CĐ mẹ/DTT (%)", ...formulaRow((c) => `=IFERROR(ROUND(${c}157/${c}139*100,2),"")`)]);
  block.push([]);
  block.push(["III. TĂNG TRƯỞNG (YoY, %)"]);
  block.push(["Tăng trưởng Doanh thu thuần", "", ...cols.slice(1).map((c, i) => `=IFERROR(ROUND((${c}139-${cols[i]}139)/${cols[i]}139*100,2),"")`)]);
  block.push(["Tăng trưởng LNST của CĐ công ty mẹ", "", ...cols.slice(1).map((c, i) => `=IFERROR(ROUND((${c}157-${cols[i]}157)/${cols[i]}157*100,2),"")`)]);
  block.push(["Tăng trưởng Tổng tài sản", "", ...cols.slice(1).map((c, i) => `=IFERROR(ROUND((${c}80-${cols[i]}80)/${cols[i]}80*100,2),"")`)]);
  block.push([]);
  block.push(["IV. ĐÒN BẨY TÀI CHÍNH (LEVERAGE)"]);
  block.push(["Nợ phải trả/Tổng tài sản (%)", ...formulaRow((c) => `=IFERROR(ROUND(${c}83/${c}80*100,2),"")`)]);
  block.push(["Nợ phải trả/Vốn chủ sở hữu — D/E (lần)", ...formulaRow((c) => `=IFERROR(ROUND(${c}83/${c}115,2),"")`)]);
  block.push([]);
  block.push(["V. THANH KHOẢN & CƠ CẤU TÀI SẢN"]);
  block.push(["Tài sản ngắn hạn/Tổng tài sản (%)", ...formulaRow((c) => `=IFERROR(ROUND(${c}2/${c}80*100,2),"")`)]);
  block.push(["Tài sản dài hạn/Tổng tài sản (%)", ...formulaRow((c) => `=IFERROR(ROUND(${c}34/${c}80*100,2),"")`)]);
  block.push(["Tỷ lệ thanh toán hiện hành — TSNH/Nợ ngắn hạn (lần)", ...formulaRow((c) => `=IFERROR(ROUND(${c}2/${c}84,2),"")`)]);
  block.push([]);
  const epsRowIdx = block.length + 1; // 1-indexed after push
  block.push([`VI. ĐỊNH GIÁ (EPS chính thức dòng 159 của sheet '${rawSheet}'; giá CP hiện tại ${MARKET.priceDate})`]);
  block.push(["EPS chính thức (đồng/CP, từ dòng 159)", ...formulaRow((c) => `=${c}159`)]);
  block.push([
    `BVPS — VCSH/${(MARKET.sharesFY2025 / 1e6).toFixed(2)} triệu CP (đồng/CP, số CP theo Vốn góp chủ sở hữu dòng 117 các năm BCTC 2016-2025, khớp đúng số CP lưu hành hiện tại — không có chia tách trong giai đoạn audited)`,
    ...formulaRow((c) => `=IFERROR(ROUND(${c}115*1000000000/${MARKET.sharesFY2025},0),"")`),
  ]);
  block.push([
    `P/E TTM (lần) — nguồn Vietstock/Simplize, giá ${MARKET.price.toLocaleString("vi-VN")}đ ngày ${MARKET.priceDate}`,
    ...blank().slice(0, -1),
    MARKET.peTTM,
  ]);
  block.push([`P/B (lần) — nguồn Vietstock/Simplize, cùng ngày`, ...blank().slice(0, -1), MARKET.pb]);
  block.push([`Giá cổ phiếu hiện tại (đ/CP, ${MARKET.priceDate}, không có chuỗi lịch sử)`, ...blank().slice(0, -1), MARKET.price]);
  block.push([
    `Số CP lưu hành hiện tại (${MARKET.priceDate}) = ${(MARKET.sharesNow / 1e6).toFixed(2)} triệu CP — khớp đúng Vốn góp chủ sở hữu trong BCTC FY2025 audited (row 117), không có chia tách/tăng vốn chưa phản ánh. Lưu ý: kế hoạch thưởng CP 15% cho năm 2026 (nguồn TinnhanhChungkhoan) CHƯA áp dụng, sẽ làm tăng số CP lưu hành khi thực hiện.`,
  ]);

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `'${targetSheet}'!A204`,
    valueInputOption: "USER_ENTERED",
    requestBody: { values: block },
  });

  console.log(JSON.stringify({ success: true, targetSheet, rawRows: rawRows.length, blockRows: block.length }, null, 2));
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
