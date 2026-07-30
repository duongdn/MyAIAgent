#!/usr/bin/env node
/**
 * Build "Định lượng - <TICKER>" tab in shared spreadsheet: fetches BCTC from
 * cafef.vn (annual CDKT+KQKD+LCTT + quarterly KQKD for TTM EPS) + live
 * price/market-cap from vietstock.vn, then writes raw rows + formula-driven
 * ratio block. Row references resolved by cafef `code`, not hardcoded numbers.
 *
 * Usage: node scripts/finance-quantification-build.js <TICKER>
 *
 * Stdout contract (line-buffered, parsed by web app + human readers):
 *   PROGRESS: n/6 <description>
 *   WARN: <message>
 *   DONE: <sheet-url>
 *   ERROR: <CODE> <message>
 * Exit code: 0 on DONE, non-zero on ERROR.
 */
const https = require("https");
const { google } = require("googleapis");
const path = require("path");
const fs = require("fs");

// ── Config ──────────────────────────────────────────────────────────────────
const CONFIG_PATH = path.join(__dirname, "..", "config", "finance-quantification.json");
const KEY_PATH = path.join(__dirname, "..", "config", "daily-agent-490610-7eb7985b33e3.json");
const config = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf8"));
const SPREADSHEET_ID = config.shared_spreadsheet_id;
const TAB_PREFIX = config.tab_prefix;

// Cafef `code` → output key (must all resolve or we abort)
const REQUIRED_CODES = {
  totalAssets:    { section: "TN",   code: "270" },
  currentAssets:  { section: "TN",   code: "100" },
  longTermAssets: { section: "TN",   code: "200" },
  liabilities:    { section: "NV",   code: "300" },
  currentLiab:    { section: "NV",   code: "310" },
  equity:         { section: "NV",   code: "400" },
  paidInCapital:  { section: "NV",   code: "411" },
  totalCapital:   { section: "NV",   code: "440" },
  revenue:        { section: "KQKD", code: "10" },
  grossProfit:    { section: "KQKD", code: "20" },
  npatTotal:      { section: "KQKD", code: "60" },
  npatParent:     { section: "KQKD", code: "61" },
  eps:            { section: "KQKD", code: "70" },
};

// ── HTTP helpers ─────────────────────────────────────────────────────────────
function httpGet(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
      let body = "";
      res.on("data", (c) => (body += c));
      res.on("end", () => {
        if (res.statusCode >= 400) return reject(new Error(`HTTP ${res.statusCode} ${url.slice(0, 80)}`));
        try { resolve(JSON.parse(body)); } catch (e) { reject(new Error(`Parse: ${url.slice(0, 80)}`)); }
      });
    }).on("error", reject);
  });
}

function httpPostForm(url, bodyStr) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded", "User-Agent": "Mozilla/5.0", "Content-Length": Buffer.byteLength(bodyStr) },
    }, (res) => {
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => {
        try { resolve(JSON.parse(data)); } catch (e) { reject(new Error(`Parse: ${data.slice(0, 200)}`)); }
      });
    });
    req.on("error", reject);
    req.write(bodyStr);
    req.end();
  });
}

// ── Data fetching ────────────────────────────────────────────────────────────
const BASE = "https://apiweb.cafef.vn/api";

function keepAudited(arr) { return arr.filter((y) => y.type === "HK").sort((a, b) => a.year - b.year); }

async function fetchCafef(ticker, pageSize) {
  const [cdkt, kqkd, lctt] = await Promise.all([
    httpGet(`${BASE}/v2/BCTC/GetReportCDKT?symbol=${ticker}&pageIndex=1&pageSize=${pageSize}&reportType=ALL&TypeTime=NAM`),
    httpGet(`${BASE}/v1/BCTC/GetReportDetail?symbol=${ticker}&pageIndex=1&pageSize=${pageSize}&reportType=KQKD&TypeTime=NAM`),
    httpGet(`${BASE}/v2/BCTC/GetReportLCTT?symbol=${ticker}&pageIndex=1&pageSize=${pageSize}&reportType=ALL&TypeTime=NAM`),
  ]);
  if (!cdkt.isSuccess || !kqkd.isSuccess || !lctt.isSuccess) throw new Error(`API_FAILURE: cafef returned error for ${ticker}`);
  const tnTemplate = cdkt.value.templace.find((t) => t.code === "TN").data;
  const nvTemplate = cdkt.value.templace.find((t) => t.code === "NV").data;
  const tnYears = keepAudited(cdkt.value.data.find((d) => d.code === "TN").data);
  const nvYears = keepAudited(cdkt.value.data.find((d) => d.code === "NV").data);
  const kqkdYears = keepAudited(kqkd.value.data);
  const lcttGroups = lctt.value.data.map((g) => ({ code: g.code, name: g.name, template: lctt.value.templace.find((t) => t.code === g.code).data, years: keepAudited(g.data) }));
  return { tnTemplate, nvTemplate, tnYears, nvYears, kqkdTemplate: kqkd.value.templace, kqkdYears, lcttGroups };
}

async function fetchVietstock(ticker) {
  const qs = ["Code", ticker, "OrderBy", "", "OrderDirection", "desc", "PageIndex", "1", "PageSize", "1", "FromDate", "", "ToDate", "", "ExportType", "default", "Cols", "TKLGD,TGTGD,VHTT", "ExchangeID", "1"]
    .reduce((a, v, i, arr) => (i % 2 === 0 ? a.push(encodeURIComponent(arr[i]) + "=" + encodeURIComponent(arr[i + 1])) : null, a), []).join("&");
  const rows = await httpPostForm("https://finance.vietstock.vn/data/getpricehistory", qs);
  if (!Array.isArray(rows) || rows.length === 0) throw new Error(`NO_DATA: vietstock returned no data for ${ticker}`);
  const r = rows[0];
  if (!r.ClosePrice || r.ClosePrice <= 0) throw new Error(`NO_DATA: vietstock ClosePrice missing/zero for ${ticker}`);
  return { price: r.ClosePrice, marketCap: r.MarketCapital, shares: Math.round(r.MarketCapital / r.ClosePrice), date: new Date(parseInt(r.TradingDate.match(/\d+/)[0], 10)).toISOString().slice(0, 10), exchange: r.Exchange };
}

async function fetchQuarterlyKQKD(ticker) {
  const data = await httpGet(`${BASE}/v1/BCTC/GetReportDetail?symbol=${ticker}&pageIndex=1&pageSize=8&reportType=KQKD&TypeTime=QUY`);
  if (!data.isSuccess) throw new Error(`API_FAILURE: quarterly KQKD for ${ticker}`);
  return data.value.data; // [{year, quater, type, data:[{code,value}]}, ...]
}

// ── Row-map resolution ───────────────────────────────────────────────────────
function resolveRowMap(tnTemplate, nvTemplate, kqkdTemplate) {
  // Build unified 1-based row-index map from how we'll write them:
  // Section: 1 header + TN rows + 1 header + NV rows + 1 header + KQKD rows
  // LCTT groups come after (not in REQUIRED_CODES but still need indices)
  const map = {}; // code → 1-based row number
  // Skip first row (it's the section header "Tài sản" + years)
  // Wait — we need to know the exact row layout to compute indices.
  // The buildRawRows() function will emit the same order, so we can just
  // iterate the templates in the same order and track rowIndex.
  let rowIdx = 2; // row 1 = header, data starts at row 2
  // TN section header row
  for (const r of tnTemplate) { map[r.code] = rowIdx; rowIdx++; }
  // NV section header row
  rowIdx++; // skip the "Nguồn vốn" section label row
  for (const r of nvTemplate) { map[r.code] = rowIdx; rowIdx++; }
  // KQKD section header row
  rowIdx++; // skip the "Kết quả kinh doanh" section label row
  for (const r of kqkdTemplate) { map[r.code] = rowIdx; rowIdx++; }
  // LCTT groups come after (not needed for REQUIRED_CODES)
  return { map, rawEndRow: rowIdx - 1 };
}

function checkRequiredCodes(map, ticker) {
  for (const [key, { section, code }] of Object.entries(REQUIRED_CODES)) {
    if (!(code in map)) return `UNSUPPORTED_CHART_OF_ACCOUNTS: ${ticker} thiếu code ${code} (${section}) — cần mapping riêng`;
  }
  return null;
}

function checkBalance(tnYears, nvYears, idx270, idx440) {
  // idx270/idx440 are 0-based within their templates
  for (const y of tnYears) {
    const nvY = nvYears.find((n) => n.year === y.year);
    if (!nvY) continue;
    const v270 = y.data[idx270]?.value ?? y.data[idx270];
    const v440 = nvY.data[idx440]?.value ?? nvY.data[idx440];
    if (v270 == null || v440 == null) continue;
    if (Math.abs(v270 - v440) >= 1000) return `BALANCE_MISMATCH: ${y.year} chênh lệch Tổng TS/Tổng NV = ${Math.abs(v270 - v440).toLocaleString("vi-VN")} đồng`;
  }
  return null;
}

// ── Row builders ─────────────────────────────────────────────────────────────
function fmtVnd(raw) {
  const v = raw / 1e9;
  if (v === 0) return " - ";
  const abs = Math.abs(v).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return v < 0 ? `(${abs})` : abs;
}

function buildSectionRows(template, yearsData, years) {
  return template.map((row) => {
    const line = [row.name];
    for (const y of years) {
      const ye = yearsData.find((d) => d.year === y);
      const cell = ye ? ye.data.find((d) => d.code === row.code) : null;
      line.push(cell ? fmtVnd(cell.value) : " - ");
    }
    return line;
  });
}

function buildRawRows(data, years) {
  const rows = [];
  rows.push(["Tài sản", ...years.map(String)]);
  rows.push(...buildSectionRows(data.tnTemplate, data.tnYears, years));
  rows.push(["Nguồn vốn", ...years.map(String)]);
  rows.push(...buildSectionRows(data.nvTemplate, data.nvYears, years));
  rows.push(["Kết quả kinh doanh", ...years.map(String)]);
  rows.push(...buildSectionRows(data.kqkdTemplate, data.kqkdYears, years));
  for (const group of data.lcttGroups) {
    rows.push([group.name, ...years.map(String)]);
    rows.push(...buildSectionRows(group.template, group.years, years));
  }
  return rows;
}

function buildRatioBlock(map, years, market) {
  const cols = years.map((_, i) => String.fromCharCode(66 + i)); // B..K..
  const blank = () => Array(cols.length).fill("");
  const formulaRow = (fn) => cols.map((c) => fn(c));
  const r = (code) => map[code]; // 1-based row

  const block = [];
  block.push(["PHẦN ĐỊNH LƯỢNG BỔ SUNG — TỶ SỐ TÀI CHÍNH"]);
  block.push(["Nguồn: số liệu BCTC hợp nhất kiểm toán từ cafef.vn API; công thức tham chiếu trực tiếp dữ liệu phía trên."]);
  block.push([]);
  block.push(["Chỉ tiêu", ...years.map(String)]);
  block.push(["I. QUY MÔ"]);
  block.push(["Tổng tài sản (tỷ đồng)", ...formulaRow((c) => `=${c}${r("270")}`)]);
  block.push(["Vốn chủ sở hữu (tỷ đồng)", ...formulaRow((c) => `=${c}${r("400")}`)]);
  block.push(["Doanh thu thuần (tỷ đồng)", ...formulaRow((c) => `=${c}${r("10")}`)]);
  block.push(["LNST của cổ đông Cty mẹ (tỷ đồng)", ...formulaRow((c) => `=${c}${r("61")}`)]);
  block.push([]);
  block.push(["II. SINH LỢI"]);
  block.push(["ROE (%)", ...formulaRow((c) => `=IFERROR(ROUND(${c}${r("61")}/${c}${r("400")}*100,2),"")`)]);
  block.push(["ROA (%)", ...formulaRow((c) => `=IFERROR(ROUND(${c}${r("61")}/${c}${r("270")}*100,2),"")`)]);
  block.push(["Biên LN gộp (%)", ...formulaRow((c) => `=IFERROR(ROUND(${c}${r("20")}/${c}${r("10")}*100,2),"")`)]);
  block.push(["Biên LNST (%)", ...formulaRow((c) => `=IFERROR(ROUND(${c}${r("61")}/${c}${r("10")}*100,2),"")`)]);
  block.push([]);
  block.push(["III. TĂNG TRƯỞNG (YoY %)"]);
  block.push(["Tăng trưởng DTT", "", ...cols.slice(1).map((c, i) => `=IFERROR(ROUND((${c}${r("10")}-${cols[i]}${r("10")})/${cols[i]}${r("10")}*100,2),"")`)]);
  block.push(["Tăng trưởng LNST CĐ mẹ", "", ...cols.slice(1).map((c, i) => `=IFERROR(ROUND((${c}${r("61")}-${cols[i]}${r("61")})/${cols[i]}${r("61")}*100,2),"")`)]);
  block.push(["Tăng trưởng Tổng TS", "", ...cols.slice(1).map((c, i) => `=IFERROR(ROUND((${c}${r("270")}-${cols[i]}${r("270")})/${cols[i]}${r("270")}*100,2),"")`)]);
  block.push([]);
  block.push(["IV. ĐÒN BẨY"]);
  block.push(["Nợ/TS (%)", ...formulaRow((c) => `=IFERROR(ROUND(${c}${r("300")}/${c}${r("270")}*100,2),"")`)]);
  block.push(["D/E (lần)", ...formulaRow((c) => `=IFERROR(ROUND(${c}${r("300")}/${c}${r("400")},2),"")`)]);
  block.push([]);
  block.push(["V. THANH KHOẢN & CƠ CẤU"]);
  block.push(["TSNH/TS (%)", ...formulaRow((c) => `=IFERROR(ROUND(${c}${r("100")}/${c}${r("270")}*100,2),"")`)]);
  block.push(["TSDH/TS (%)", ...formulaRow((c) => `=IFERROR(ROUND(${c}${r("200")}/${c}${r("270")}*100,2),"")`)]);
  block.push(["TT hiện hành (lần)", ...formulaRow((c) => `=IFERROR(ROUND(${c}${r("100")}/${c}${r("310")},2),"")`)]);
  block.push([]);
  block.push([`VI. ĐỊNH GIÁ (giá ${market.price.toLocaleString("vi-VN")}đ ngày ${market.date})`]);
  block.push(["EPS (đồng/CP)", ...formulaRow((c) => `=${c}${r("70")}`)]);
  block.push([`BVPS (VCSH/${(market.shares / 1e6).toFixed(2)}tr CP)`, ...formulaRow((c) => `=IFERROR(ROUND(${c}${r("400")}*1000000000/${market.shares},0),"")`)]);
  block.push(["P/E (annual, lần)", ...cols.map((c) => `=IFERROR(ROUND(${market.price}/${c}${r("70")},2),"")`)]);
  block.push(["P/B (lần)", ...cols.map((c) => `=IFERROR(ROUND(${market.price}/(${c}${r("400")}*1000000000/${market.shares}),2),"")`)]);
  block.push(["Giá CP hiện tại (đồng)", ...blank().slice(0, -1), market.price]);
  block.push([`Số CP lưu hành (${market.date}) = ${(market.shares / 1e6).toFixed(2)}tr CP (nguồn: MarketCap/Price từ vietstock.vn, sàn ${market.exchange})`]);

  return block;
}

// ── Google Sheets ────────────────────────────────────────────────────────────
async function writeSheet(sheets, tabName, rawRows, ratioBlock, rawEndRow) {
  // Create or clear tab
  const meta = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID });
  const existing = meta.data.sheets.find((s) => s.properties.title === tabName);
  if (!existing) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SPREADSHEET_ID,
      requestBody: { requests: [{ addSheet: { properties: { title: tabName } } }] },
    });
  }
  await sheets.spreadsheets.values.clear({ spreadsheetId: SPREADSHEET_ID, range: `'${tabName}'!A1:Z600` });

  // Write raw block
  await sheets.spreadsheets.values.update({
    spreadsheetId: SPREADSHEET_ID, range: `'${tabName}'!A1`, valueInputOption: "USER_ENTERED", requestBody: { values: rawRows },
  });

  // Write ratio block
  const ratioStart = rawEndRow + 3; // blank row at rawEndRow+1, separator at +2
  await sheets.spreadsheets.values.update({
    spreadsheetId: SPREADSHEET_ID, range: `'${tabName}'!A${ratioStart}`, valueInputOption: "USER_ENTERED", requestBody: { values: ratioBlock },
  });

  return `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/edit#gid=${existing ? existing.properties.sheetId : 0}`;
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  const ticker = process.argv[2];
  if (!ticker || !/^[A-Z0-9]{3,10}$/.test(ticker)) {
    console.error("ERROR: INVALID_TICKER — mã phải 3-10 ký tự A-Z/0-9"); process.exit(1);
  }

  const tabName = TAB_PREFIX + ticker;
  const yrs = config.max_years || 15;

  // 1. Fetch BCTC
  process.stdout.write("PROGRESS: 1/6 Đang tải BCTC từ cafef.vn...\n");
  const cafef = await fetchCafef(ticker, yrs);
  const years = cafef.tnYears.map((y) => y.year);
  if (years.length < 3) throw new Error(`NO_DATA: ${ticker} chỉ có ${years.length} năm — cần ≥3 năm kiểm toán`);

  // 2. Resolve row map
  process.stdout.write("PROGRESS: 2/6 Đang phân tích template BCTC...\n");
  const { map, rawEndRow } = resolveRowMap(cafef.tnTemplate, cafef.nvTemplate, cafef.kqkdTemplate);
  const err = checkRequiredCodes(map, ticker);
  if (err) { console.error(`ERROR: ${err}`); process.exit(2); }

  // Verify balance
  const tn0Idx = cafef.tnTemplate.findIndex((r) => r.code === "270");
  const nv0Idx = cafef.nvTemplate.findIndex((r) => r.code === "440");
  const balErr = checkBalance(cafef.tnYears, cafef.nvYears, tn0Idx, nv0Idx);
  if (balErr) { console.error(`ERROR: ${balErr}`); process.exit(2); }

  // 3. Fetch live market data
  process.stdout.write("PROGRESS: 3/6 Đang tải giá thị trường từ vietstock.vn...\n");
  const market = await fetchVietstock(ticker);

  // 4. Fetch quarterly EPS for TTM
  process.stdout.write("PROGRESS: 4/6 Đang tải EPS theo quý...\n");
  let ttmEps = null;
  try {
    const quarters = await fetchQuarterlyKQKD(ticker);
    const qEps = quarters.map((p) => ({ year: p.year, quater: p.quater, eps: (p.data.find((d) => d.code === "70") || {}).value })).filter((q) => q.eps != null);
    // Check 4 most recent are consecutive
    if (qEps.length >= 4) {
      const last4 = qEps.slice(0, 4).reverse(); // oldest first
      let consecutive = true;
      for (let i = 1; i < 4; i++) {
        const prev = last4[i - 1], cur = last4[i];
        const expectedQ = prev.quater === 4 ? 1 : prev.quater + 1;
        const expectedY = prev.quater === 4 ? prev.year + 1 : prev.year;
        if (cur.quater !== expectedQ || cur.year !== expectedY) { consecutive = false; break; }
      }
      if (consecutive) ttmEps = last4.reduce((s, q) => s + q.eps, 0);
      else process.stdout.write("WARN: TTM EPS — thiếu dữ liệu quý liên tiếp, bỏ qua P/E TTM\n");
    } else {
      process.stdout.write("WARN: TTM EPS — không đủ 4 quý, bỏ qua P/E TTM\n");
    }
  } catch (e) {
    process.stdout.write(`WARN: TTM EPS — không tải được dữ liệu quý (${e.message}), bỏ qua P/E TTM\n`);
  }

  // Compare derived shares vs paid-in-capital
  const paidInIdx = cafef.nvTemplate.findIndex((r) => r.code === "411");
  const paidInLatest = cafef.nvYears[cafef.nvYears.length - 1];
  if (paidInLatest && paidInIdx >= 0) {
    const paidInVal = paidInLatest.data[paidInIdx]?.value ?? paidInLatest.data[paidInIdx];
    if (paidInVal != null) {
      const bookShares = Math.round(paidInVal / 10000);
      if (Math.abs(market.shares - bookShares) > 100) {
        process.stdout.write(`WARN: Shares — MarketCap/Price=${market.shares.toLocaleString("vi-VN")} CP ≠ Vốn góp/10,000=${bookShares.toLocaleString("vi-VN")} CP\n`);
      }
    }
  }

  // 5. Write to sheets
  process.stdout.write("PROGRESS: 5/6 Đang ghi dữ liệu thô vào Google Sheets...\n");
  const rawRows = buildRawRows(cafef, years);

  process.stdout.write("PROGRESS: 6/6 Đang ghi công thức tỷ số...\n");
  const ratioBlock = buildRatioBlock(map, years, market);
  // Append TTM P/E if available
  if (ttmEps != null) {
    ratioBlock.push([]);
    ratioBlock.push([`P/E TTM (EPS 4 quý gần nhất = ${ttmEps.toLocaleString("vi-VN")}đ)`, ...Array(years.length - 1).fill(""), market.price / ttmEps]);
  }

  const auth = new google.auth.GoogleAuth({ keyFile: KEY_PATH, scopes: ["https://www.googleapis.com/auth/spreadsheets"] });
  const sheets = google.sheets({ version: "v4", auth });
  const url = await writeSheet(sheets, tabName, rawRows, ratioBlock, rawRows.length);

  process.stdout.write(`DONE: ${url}\n`);
}

main().catch((e) => {
  const msg = e.message || String(e);
  if (!msg.startsWith("ERROR:")) process.stderr.write(`ERROR: ${msg}\n`);
  else process.stderr.write(`${msg}\n`);
  process.exit(1);
});
