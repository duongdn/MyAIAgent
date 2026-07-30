#!/usr/bin/env node
/**
 * Build "<TICKER>" tab in shared spreadsheet: fetches BCTC from cafef.vn
 * (annual CDKT+KQKD+LCTT + quarterly KQKD for TTM EPS) + live price/market-cap
 * from vietstock.vn, then writes raw rows + formula-driven ratio block with
 * row-group collapsing matching the FPT/VEA reference format.
 *
 * Usage: node scripts/finance-quantification-build.js <TICKER>
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

const REQUIRED_CODES = {
  totalAssets: { section: "TN", code: "270" }, currentAssets: { section: "TN", code: "100" },
  longTermAssets: { section: "TN", code: "200" }, liabilities: { section: "NV", code: "300" },
  currentLiab: { section: "NV", code: "310" }, equity: { section: "NV", code: "400" },
  paidInCapital: { section: "NV", code: "411" }, totalCapital: { section: "NV", code: "440" },
  revenue: { section: "KQKD", code: "10" }, grossProfit: { section: "KQKD", code: "20" },
  npatTotal: { section: "KQKD", code: "60" }, npatParent: { section: "KQKD", code: "61" },
  eps: { section: "KQKD", code: "70" },
};

// KQKD sub-detail codes to group+hide (intermediate calculation lines)
const KQKD_DETAIL_CODES = new Set(["1", "2", "21", "24", "27", "31", "32", "40", "51", "52", "62", "71"]);

// ── HTTP ─────────────────────────────────────────────────────────────────────
function httpGet(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
      let body = "";
      res.on("data", (c) => (body += c));
      res.on("end", () => {
        if (res.statusCode >= 400) return reject(new Error(`HTTP ${res.statusCode}`));
        try { resolve(JSON.parse(body)); } catch (e) { reject(new Error("Parse fail")); }
      });
    }).on("error", reject);
  });
}

function httpPostForm(url, bodyStr) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded", "User-Agent": "Mozilla/5.0", "Content-Length": Buffer.byteLength(bodyStr) } }, (res) => {
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => { try { resolve(JSON.parse(data)); } catch (e) { reject(new Error("Parse fail")); } });
    });
    req.on("error", reject); req.write(bodyStr); req.end();
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
  if (!cdkt.isSuccess || !kqkd.isSuccess || !lctt.isSuccess) throw new Error(`API_FAILURE: cafef for ${ticker}`);
  const tn = cdkt.value.templace.find((t) => t.code === "TN").data;
  const nv = cdkt.value.templace.find((t) => t.code === "NV").data;
  return {
    tnTemplate: tn, nvTemplate: nv,
    tnYears: keepAudited(cdkt.value.data.find((d) => d.code === "TN").data),
    nvYears: keepAudited(cdkt.value.data.find((d) => d.code === "NV").data),
    kqkdTemplate: kqkd.value.templace, kqkdYears: keepAudited(kqkd.value.data),
    lcttGroups: lctt.value.data.map((g) => ({ code: g.code, name: g.name, template: lctt.value.templace.find((t) => t.code === g.code).data, years: keepAudited(g.data) })),
  };
}

async function fetchVietstock(ticker) {
  const qs = ["Code", ticker, "OrderBy", "", "OrderDirection", "desc", "PageIndex", "1", "PageSize", "1", "FromDate", "", "ToDate", "", "ExportType", "default", "Cols", "TKLGD,TGTGD,VHTT", "ExchangeID", "1"]
    .reduce((a, v, i, arr) => (i % 2 === 0 ? a.push(encodeURIComponent(arr[i]) + "=" + encodeURIComponent(arr[i + 1])) : null, a), []).join("&");
  const rows = await httpPostForm("https://finance.vietstock.vn/data/getpricehistory", qs);
  if (!Array.isArray(rows) || rows.length === 0) throw new Error(`NO_DATA: vietstock no data for ${ticker}`);
  const r = rows[0];
  if (!r.ClosePrice || r.ClosePrice <= 0) throw new Error(`NO_DATA: ClosePrice zero for ${ticker}`);
  const dateMs = parseInt(r.TradingDate.match(/\d+/)[0], 10);
  return { price: r.ClosePrice, marketCap: r.MarketCapital, shares: Math.round(r.MarketCapital / r.ClosePrice), date: new Date(dateMs).toISOString().slice(0, 10), exchange: r.Exchange };
}

async function fetchQuarterlyKQKD(ticker) {
  const data = await httpGet(`${BASE}/v1/BCTC/GetReportDetail?symbol=${ticker}&pageIndex=1&pageSize=8&reportType=KQKD&TypeTime=QUY`);
  if (!data.isSuccess) throw new Error(`API_FAILURE: quarterly KQKD for ${ticker}`);
  return data.value.data;
}

// ── Row builders ─────────────────────────────────────────────────────────────
function fmtVnd(raw) { const v = raw / 1e9; if (v === 0) return " - "; const abs = Math.abs(v).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); return v < 0 ? `(${abs})` : abs; }

function fmtSectionRows(template, yearsData, years, codeToRow) {
  return template.map((row, ti) => {
    const line = [row.name];
    for (const y of years) {
      const ye = yearsData.find((d) => d.year === y);
      const cell = ye ? ye.data.find((d) => d.code === row.code) : null;
      line.push(cell ? fmtVnd(cell.value) : " - ");
    }
    if (row.code) codeToRow[row.code] = ti; // 0-based within section, will be resolved later
    return line;
  });
}

function buildAllRows(data, years) {
  const rows = [], codeToRow = {};
  const sectionStarts = {}; // sectionName → 0‑based row index
  const emptyIndices = []; // rows where ALL data columns are " - "

  function pushSection(label, template, yrsData, sectionKey) {
    sectionStarts[sectionKey] = rows.length;
    rows.push([label, ...years.map(String)]);
    const secRows = fmtSectionRows(template, yrsData, years, codeToRow);
    for (const r of secRows) {
      const dataCells = r.slice(1);
      if (dataCells.every((c) => c === " - " || c === "" || c == null)) emptyIndices.push(rows.length);
      rows.push(r);
    }
  }

  pushSection("Tài sản", data.tnTemplate, data.tnYears, "TN");
  pushSection("Nguồn vốn", data.nvTemplate, data.nvYears, "NV");
  pushSection("Kết quả kinh doanh", data.kqkdTemplate, data.kqkdYears, "KQKD");
  for (const g of data.lcttGroups) pushSection(g.name, g.template, g.years, "LCTT_" + g.code);

  return { rows, codeToRow, sectionStarts, emptyIndices };
}

// ── Row-map resolution (1-based for formulas) ────────────────────────────────
function resolveFormulaMap(allRows, caData) {
  const map = {};
  // Use codeToRow built during section processing, resolved to absolute row indices
  // We need absolute 1-based row for formulas. Simplest: scan column A of built rows.
  // But we already have codeToRow with 0-based within-section indices.
  // Instead, re-scan: iterate over tnTemplate, nvTemplate, kqkdTemplate in order.
  let rowIdx = 2; // row 1 = "Tài sản" header
  for (const r of caData.tnTemplate) { if (r.code) map[r.code] = rowIdx; rowIdx++; }
  rowIdx++; // "Nguồn vốn" header
  for (const r of caData.nvTemplate) { if (r.code) map[r.code] = rowIdx; rowIdx++; }
  rowIdx++; // "Kết quả kinh doanh" header
  for (const r of caData.kqkdTemplate) { if (r.code) map[r.code] = rowIdx; rowIdx++; }
  return map;
}

function checkRequiredCodes(map, ticker) {
  for (const [key, { section, code }] of Object.entries(REQUIRED_CODES)) {
    if (!(code in map)) return `UNSUPPORTED_CHART_OF_ACCOUNTS: ${ticker} thiếu code ${code} (${section}) — cần mapping riêng`;
  }
  return null;
}

function checkBalance(tnYears, nvYears, idx270, idx440) {
  for (const y of tnYears) {
    const nvY = nvYears.find((n) => n.year === y.year);
    if (!nvY) continue;
    const v270 = y.data[idx270]?.value ?? y.data[idx270];
    const v440 = nvY.data[idx440]?.value ?? nvY.data[idx440];
    if (v270 == null || v440 == null) continue;
    if (Math.abs(v270 - v440) >= 1000) return `BALANCE_MISMATCH: ${y.year} chênh lệch = ${Math.abs(v270 - v440).toLocaleString("vi-VN")} đồng`;
  }
  return null;
}

// ── Ratio block ──────────────────────────────────────────────────────────────
function buildRatioBlock(map, years, market) {
  const cols = years.map((_, i) => String.fromCharCode(66 + i));
  const blank = () => Array(cols.length).fill("");
  const fR = (fn) => cols.map((c) => fn(c));
  const r = (code) => map[code];

  const b = [];
  b.push(["PHẦN ĐỊNH LƯỢNG BỔ SUNG — TỶ SỐ TÀI CHÍNH"]);
  b.push(["Nguồn: số liệu BCTC hợp nhất kiểm toán từ cafef.vn API; công thức tham chiếu trực tiếp dữ liệu phía trên."]);
  b.push([]); b.push(["Chỉ tiêu", ...years.map(String)]);
  b.push(["I. QUY MÔ"]);
  b.push(["Tổng tài sản (tỷ đồng)", ...fR((c) => `=${c}${r("270")}`)]);
  b.push(["Vốn chủ sở hữu (tỷ đồng)", ...fR((c) => `=${c}${r("400")}`)]);
  b.push(["Doanh thu thuần (tỷ đồng)", ...fR((c) => `=${c}${r("10")}`)]);
  b.push(["LNST của cổ đông Cty mẹ (tỷ đồng)", ...fR((c) => `=${c}${r("61")}`)]);
  b.push([]); b.push(["II. SINH LỢI"]);
  b.push(["ROE (%)", ...fR((c) => `=IFERROR(ROUND(${c}${r("61")}/${c}${r("400")}*100,2),"")`)]);
  b.push(["ROA (%)", ...fR((c) => `=IFERROR(ROUND(${c}${r("61")}/${c}${r("270")}*100,2),"")`)]);
  b.push(["Biên LN gộp (%)", ...fR((c) => `=IFERROR(ROUND(${c}${r("20")}/${c}${r("10")}*100,2),"")`)]);
  b.push(["Biên LNST (%)", ...fR((c) => `=IFERROR(ROUND(${c}${r("61")}/${c}${r("10")}*100,2),"")`)]);
  b.push([]); b.push(["III. TĂNG TRƯỞNG (YoY %)"]);
  b.push(["Tăng trưởng DTT", "", ...cols.slice(1).map((c, i) => `=IFERROR(ROUND((${c}${r("10")}-${cols[i]}${r("10")})/${cols[i]}${r("10")}*100,2),"")`)]);
  b.push(["Tăng trưởng LNST CĐ mẹ", "", ...cols.slice(1).map((c, i) => `=IFERROR(ROUND((${c}${r("61")}-${cols[i]}${r("61")})/${cols[i]}${r("61")}*100,2),"")`)]);
  b.push(["Tăng trưởng Tổng TS", "", ...cols.slice(1).map((c, i) => `=IFERROR(ROUND((${c}${r("270")}-${cols[i]}${r("270")})/${cols[i]}${r("270")}*100,2),"")`)]);
  b.push([]); b.push(["IV. ĐÒN BẨY"]);
  b.push(["Nợ/TS (%)", ...fR((c) => `=IFERROR(ROUND(${c}${r("300")}/${c}${r("270")}*100,2),"")`)]);
  b.push(["D/E (lần)", ...fR((c) => `=IFERROR(ROUND(${c}${r("300")}/${c}${r("400")},2),"")`)]);
  b.push([]); b.push(["V. THANH KHOẢN & CƠ CẤU"]);
  b.push(["TSNH/TS (%)", ...fR((c) => `=IFERROR(ROUND(${c}${r("100")}/${c}${r("270")}*100,2),"")`)]);
  b.push(["TSDH/TS (%)", ...fR((c) => `=IFERROR(ROUND(${c}${r("200")}/${c}${r("270")}*100,2),"")`)]);
  b.push(["TT hiện hành (lần)", ...fR((c) => `=IFERROR(ROUND(${c}${r("100")}/${c}${r("310")},2),"")`)]);
  b.push([]); b.push([`VI. ĐỊNH GIÁ (giá ${market.price.toLocaleString("vi-VN")}đ ngày ${market.date})`]);
  b.push(["EPS (đồng/CP)", ...fR((c) => `=${c}${r("70")}`)]);
  b.push([`BVPS (VCSH/${(market.shares / 1e6).toFixed(2)}tr CP)`, ...fR((c) => `=IFERROR(ROUND(${c}${r("400")}*1000000000/${market.shares},0),"")`)]);
  b.push(["P/E (annual, lần)", ...cols.map((c) => `=IFERROR(ROUND(${market.price}/${c}${r("70")},2),"")`)]);
  b.push(["P/B (lần)", ...cols.map((c) => `=IFERROR(ROUND(${market.price}/(${c}${r("400")}*1000000000/${market.shares}),2),"")`)]);
  b.push(["Giá CP hiện tại (đồng)", ...blank().slice(0, -1), market.price]);
  b.push([`Số CP lưu hành (${market.date}) = ${(market.shares / 1e6).toFixed(2)}tr CP (nguồn: MarketCap/Price từ vietstock.vn, sàn ${market.exchange})`]);
  return b;
}

// ── Row grouping (matching FPT/VEA reference format) ─────────────────────────
function isGroupHeaderCode(code) {
  // Only level-2 codes (like 110, 120, 130, 210, 220, 310, 330, 410, 430)
  // NOT top-level (100, 200, 300, 400) and NOT totals (270, 440)
  if (!code || code === "100" || code === "200" || code === "270" || code === "300" || code === "400" || code === "440") return false;
  return code.length === 3 && code.endsWith("0");
}

function buildRowGroups(allRows, caData) {
  const requests = [];
  const collapseQueue = [];

  function addGroup(startIdx, endIdx, collapsed) {
    if (endIdx > startIdx + 2) {
      requests.push({
        addDimensionGroup: {
          range: { sheetId: 0, dimension: "ROWS", startIndex: startIdx, endIndex: endIdx },
        },
      });
      if (collapsed) collapseQueue.push({ startIndex: startIdx, endIndex: endIdx });
    }
  }

  // For TN and NV: group children under each level-2 header (codes ending in 0, excluding totals)
  function groupTemplateSection(sectionStart, template) {
    // Find groups: each code ending in 0 is a header
    // Its children are subsequent codes until the next code ending in 0
    let currentParent = null;
    let currentStart = null;
    let childCount = 0;
    let emptyCount = 0;

    for (let ti = 0; ti < template.length; ti++) {
      const row = template[ti];
      const code = row.code;
      const absRow = sectionStart + 1 + ti; // +1 for the section header row

      if (!code) continue;

      if (isGroupHeaderCode(code) && code !== "270" && code !== "440") {
        // Close previous group
        if (currentParent && childCount > 0) {
          const collapsed = emptyCount === childCount;
          addGroup(currentStart, absRow, collapsed);
        }
        currentParent = code;
        currentStart = absRow;
        childCount = 0;
        emptyCount = 0;
      } else if (currentParent) {
        childCount++;
        // Check if this row is empty across all data
        // We check this at write time — for now just track position
      }
    }
    // Close last group
    if (currentParent && childCount > 0) {
      const secEnd = sectionStart + 1 + template.length;
      addGroup(currentStart, secEnd, false);
    }
  }

  // Find section positions from the already-built rows
  // Section headers have null/undefined code

  // Re-derive section boundaries from raw rows
  // Simpler: rebuild knowing the order
  // Row 0: "Tài sản" header, rows 1..79: TN template
  // Row 80: "Nguồn vốn" header, rows 81..134: NV template
  // Row 135: "KQKD" header, rows 136..: KQKD template

  // Actually let me compute from the data
  const tnStart = 0;
  const nvStart = caData.tnTemplate.length + 1;
  const kqkdStart = nvStart + caData.nvTemplate.length + 1;
  let lcttStart = kqkdStart + caData.kqkdTemplate.length + 1;

  groupTemplateSection(tnStart, caData.tnTemplate);
  groupTemplateSection(nvStart, caData.nvTemplate);

  // KQKD: group+hide sub-detail codes
  let kqkdGroupStart = null;
  let kqkdGroupEmpty = true;
  for (let ti = 0; ti < caData.kqkdTemplate.length; ti++) {
    const code = caData.kqkdTemplate[ti].code;
    const absRow = kqkdStart + 1 + ti;
    if (KQKD_DETAIL_CODES.has(code)) {
      if (kqkdGroupStart === null) kqkdGroupStart = absRow;
      kqkdGroupEmpty = false; // we collapse these always regardless of content
    } else {
      if (kqkdGroupStart !== null && absRow > kqkdGroupStart + 1) {
        addGroup(kqkdGroupStart, absRow, true);
      }
      kqkdGroupStart = null;
      kqkdGroupEmpty = true;
    }
  }
  if (kqkdGroupStart !== null) {
    const end = kqkdStart + 1 + caData.kqkdTemplate.length;
    if (end > kqkdGroupStart + 1) addGroup(kqkdGroupStart, end, true);
  }

  // LCTT: collapse entire detail sections under each group
  for (const g of caData.lcttGroups) {
    const gStart = lcttStart + 1; // first data row after group header
    const gEnd = lcttStart + 1 + g.template.length;
    if (gEnd > gStart + 1) addGroup(gStart, gEnd, true);
    lcttStart = gEnd;
  }

  return { requests, collapseQueue };
}

// ── Sheet write + format ────────────────────────────────────────────────────
async function writeAndFormat(sheets, tabName, allRows, ratioBlock, caData, market, years) {
  const meta = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID });
  let existing = meta.data.sheets.find((s) => s.properties.title === tabName);
  if (!existing) {
    const addRes = await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SPREADSHEET_ID,
      requestBody: { requests: [{ addSheet: { properties: { title: tabName } } }] },
    });
    existing = addRes.data.replies[0].addSheet;
  }
  const sheetId = existing.properties.sheetId;

  // Clear all existing groups + values
  const existingRowGroups = existing.rowGroups || [];
  const deleteGroupReqs = existingRowGroups.map((rg) => ({
    deleteDimensionGroup: { range: { sheetId, dimension: "ROWS", startIndex: rg.range.startIndex, endIndex: rg.range.endIndex } },
  }));
  if (deleteGroupReqs.length > 0) {
    await sheets.spreadsheets.batchUpdate({ spreadsheetId: SPREADSHEET_ID, requestBody: { requests: deleteGroupReqs } });
  }
  await sheets.spreadsheets.values.clear({ spreadsheetId: SPREADSHEET_ID, range: `'${tabName}'!A1:Z800` });
  await sheets.spreadsheets.values.update({
    spreadsheetId: SPREADSHEET_ID, range: `'${tabName}'!A1`, valueInputOption: "USER_ENTERED", requestBody: { values: allRows },
  });

  const ratioStart = allRows.length + 3;
  await sheets.spreadsheets.values.update({
    spreadsheetId: SPREADSHEET_ID, range: `'${tabName}'!A${ratioStart}`, valueInputOption: "USER_ENTERED", requestBody: { values: ratioBlock },
  });

  // ── Format: find actually-empty rows from the written data ──────────────────
  // Read back to determine which rows are empty
  const emptyRows = [];
  for (let i = 0; i < allRows.length; i++) {
    const dataCells = allRows[i].slice(1);
    if (dataCells.every((c) => c === " - " || c === "" || c == null)) emptyRows.push(i);
  }

  // Build formatting requests
  const reqs = [];

  // Freeze row 1
  reqs.push({ updateSheetProperties: { properties: { sheetId, gridProperties: { frozenRowCount: 1 } }, fields: "gridProperties.frozenRowCount" } });

  // Column widths: A wide, B..end auto
  reqs.push({ updateDimensionProperties: { range: { sheetId, dimension: "COLUMNS", startIndex: 0, endIndex: 1 }, properties: { pixelSize: 420 }, fields: "pixelSize" } });
  const nCols = 1 + years.length;
  reqs.push({ updateDimensionProperties: { range: { sheetId, dimension: "COLUMNS", startIndex: 1, endIndex: nCols }, properties: { pixelSize: 100 }, fields: "pixelSize" } });

  // Bold section header rows
  const sectionHeaderRows = [];
  for (let i = 0; i < allRows.length; i++) {
    const label = allRows[i][0] || "";
    if (["Tài sản", "Nguồn vốn", "Kết quả kinh doanh"].includes(label) || label.includes("LƯU CHUYỂN TIỀN TỆ") || label.includes("Lưu chuyển tiền")) {
      sectionHeaderRows.push(i);
    }
  }
  for (const r of sectionHeaderRows) {
    reqs.push({ repeatCell: { range: { sheetId, startRowIndex: r, endRowIndex: r + 1, startColumnIndex: 0, endColumnIndex: nCols }, cell: { userEnteredFormat: { textFormat: { bold: true }, backgroundColorStyle: { rgbColor: { red: 0.95, green: 0.95, blue: 0.95 } } } }, fields: "userEnteredFormat(textFormat,backgroundColorStyle)" } });
  }

  // Bold section headers in ratio block too
  const ratioHeaderRows = [ratioStart + 3, ratioStart + 9, ratioStart + 14, ratioStart + 19, ratioStart + 22, ratioStart + 27]; // Approximate positions
  for (const rh of ratioHeaderRows) {
    reqs.push({ repeatCell: { range: { sheetId, startRowIndex: rh - 1, endRowIndex: rh, startColumnIndex: 0, endColumnIndex: nCols }, cell: { userEnteredFormat: { textFormat: { bold: true } } }, fields: "userEnteredFormat(textFormat)" } });
  }

  // Build row groups
  const { requests: groupReqs, collapseQueue } = buildRowGroups(allRows, caData);
  // Fix sheetId in group requests
  for (const gr of groupReqs) {
    if (gr.addDimensionGroup) gr.addDimensionGroup.range.sheetId = sheetId;
  }

  // Apply all formatting + groups (first pass: add groups)
  await sheets.spreadsheets.batchUpdate({
    spreadsheetId: SPREADSHEET_ID,
    requestBody: { requests: [...reqs, ...groupReqs] },
  });

  // Second pass: collapse groups flagged as empty (updateDimensionGroup)
  if (collapseQueue.length > 0) {
    // Find depth-0 groups that cover our ranges
    const updatedMeta = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID, ranges: [tabName] });
    const tab = updatedMeta.data.sheets[0];
    const rowGroups = tab.rowGroups || [];

    const collapseReqs = [];
    for (const cq of collapseQueue) {
      for (const rg of rowGroups) {
        if (rg.range.startIndex === cq.startIndex && rg.range.endIndex === cq.endIndex) {
          collapseReqs.push({
            updateDimensionGroup: {
              dimensionGroup: {
                range: { sheetId, dimension: "ROWS", startIndex: cq.startIndex, endIndex: cq.endIndex },
                depth: rg.depth || 0,
                collapsed: true,
              },
              fields: "collapsed",
            },
          });
          break;
        }
      }
    }
    if (collapseReqs.length > 0) {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: SPREADSHEET_ID,
        requestBody: { requests: collapseReqs },
      });
    }
  }

  return `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/edit#gid=${sheetId}`;
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  const ticker = process.argv[2];
  if (!ticker || !/^[A-Z0-9]{3,10}$/.test(ticker)) { console.error("ERROR: INVALID_TICKER — mã phải 3-10 ký tự A-Z/0-9"); process.exit(1); }

  const tabName = ticker;
  const yrs = config.max_years || 15;

  process.stdout.write("PROGRESS: 1/6 Đang tải BCTC từ cafef.vn...\n");
  const cafef = await fetchCafef(ticker, yrs);
  const years = cafef.tnYears.map((y) => y.year);
  if (years.length < 3) throw new Error(`NO_DATA: ${ticker} chỉ có ${years.length} năm`);

  process.stdout.write("PROGRESS: 2/6 Đang phân tích template BCTC...\n");
  const formulaMap = resolveFormulaMap([], cafef);
  const err = checkRequiredCodes(formulaMap, ticker);
  if (err) { console.error(`ERROR: ${err}`); process.exit(2); }

  const tn0Idx = cafef.tnTemplate.findIndex((r) => r.code === "270");
  const nv0Idx = cafef.nvTemplate.findIndex((r) => r.code === "440");
  const balErr = checkBalance(cafef.tnYears, cafef.nvYears, tn0Idx, nv0Idx);
  if (balErr) { console.error(`ERROR: ${balErr}`); process.exit(2); }

  process.stdout.write("PROGRESS: 3/6 Đang tải giá thị trường từ vietstock.vn...\n");
  const market = await fetchVietstock(ticker);

  process.stdout.write("PROGRESS: 4/6 Đang tải EPS theo quý...\n");
  let ttmEps = null;
  try {
    const quarters = await fetchQuarterlyKQKD(ticker);
    const qEps = quarters.map((p) => ({ year: p.year, quater: p.quater, eps: (p.data.find((d) => d.code === "70") || {}).value })).filter((q) => q.eps != null);
    if (qEps.length >= 4) {
      const last4 = qEps.slice(0, 4).reverse();
      let consecutive = true;
      for (let i = 1; i < 4; i++) {
        const p = last4[i - 1], c = last4[i];
        const eq = p.quater === 4 ? 1 : p.quater + 1;
        const ey = p.quater === 4 ? p.year + 1 : p.year;
        if (c.quater !== eq || c.year !== ey) { consecutive = false; break; }
      }
      if (consecutive) ttmEps = last4.reduce((s, q) => s + q.eps, 0);
      else process.stdout.write("WARN: TTM EPS — thiếu dữ liệu quý liên tiếp, bỏ qua P/E TTM\n");
    } else { process.stdout.write("WARN: TTM EPS — không đủ 4 quý, bỏ qua P/E TTM\n"); }
  } catch (e) { process.stdout.write(`WARN: TTM EPS — không tải được (${e.message}), bỏ qua P/E TTM\n`); }

  const paidInIdx = cafef.nvTemplate.findIndex((r) => r.code === "411");
  const paidInLatest = cafef.nvYears[cafef.nvYears.length - 1];
  if (paidInLatest && paidInIdx >= 0) {
    const pv = paidInLatest.data[paidInIdx]?.value ?? paidInLatest.data[paidInIdx];
    if (pv != null) {
      const bookShares = Math.round(pv / 10000);
      if (Math.abs(market.shares - bookShares) > 100) process.stdout.write(`WARN: Shares — MarketCap/Price=${market.shares.toLocaleString("vi-VN")} CP ≠ Vốn góp/10,000=${bookShares.toLocaleString("vi-VN")} CP\n`);
    }
  }

  process.stdout.write("PROGRESS: 5/6 Đang ghi dữ liệu vào Google Sheets...\n");
  const { rows: allRows } = buildAllRows(cafef, years);

  process.stdout.write("PROGRESS: 6/6 Đang ghi công thức + format...\n");
  const ratioBlock = buildRatioBlock(formulaMap, years, market);
  if (ttmEps != null) {
    ratioBlock.push([]);
    ratioBlock.push([`P/E TTM (EPS 4 quý gần nhất = ${ttmEps.toLocaleString("vi-VN")}đ)`, ...Array(years.length - 1).fill(""), market.price / ttmEps]);
  }

  const auth = new google.auth.GoogleAuth({ keyFile: KEY_PATH, scopes: ["https://www.googleapis.com/auth/spreadsheets"] });
  const sheets = google.sheets({ version: "v4", auth });
  const url = await writeAndFormat(sheets, tabName, allRows, ratioBlock, cafef, market, years);

  process.stdout.write(`DONE: ${url}\n`);
}

main().catch((e) => {
  const msg = e.message || String(e);
  if (!msg.startsWith("ERROR:")) process.stderr.write(`ERROR: ${msg}\n`);
  else process.stderr.write(`${msg}\n`);
  process.exit(1);
});
