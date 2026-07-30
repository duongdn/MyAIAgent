#!/usr/bin/env node
/**
 * Build raw BCTC sheet for a ticker — matching VEA/FOX reference format exactly:
 * dark-blue section headers, bold level-1 headers, row groups under each level-2
 * header. Fetches CDKT+KQKD+LCTT from cafef.vn API.
 *
 * Usage: node scripts/finance-quantification-build.js <TICKER>
 */
const https = require("https");
const { google } = require("googleapis");
const path = require("path");
const fs = require("fs");

const CONFIG_PATH = path.join(__dirname, "..", "config", "finance-quantification.json");
const KEY_PATH = path.join(__dirname, "..", "config", "daily-agent-490610-7eb7985b33e3.json");
const config = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf8"));
const SPREADSHEET_ID = config.shared_spreadsheet_id;

// ── HTTP ─────────────────────────────────────────────────────────────────────
function httpGet(url) {
  return new Promise((r, x) => {
    https.get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
      let b = ""; res.on("data", (c) => (b += c));
      res.on("end", () => { try { r(JSON.parse(b)); } catch (e) { x(new Error("Parse")); } });
    }).on("error", x);
  });
}

const BASE = "https://apiweb.cafef.vn/api";
const keepAudited = (arr) => arr.filter((y) => y.type === "HK").sort((a, b) => a.year - b.year);

async function fetchCafef(ticker, pageSize) {
  const [cdkt, kqkd, lctt] = await Promise.all([
    httpGet(`${BASE}/v2/BCTC/GetReportCDKT?symbol=${ticker}&pageIndex=1&pageSize=${pageSize}&reportType=ALL&TypeTime=NAM`),
    httpGet(`${BASE}/v1/BCTC/GetReportDetail?symbol=${ticker}&pageIndex=1&pageSize=${pageSize}&reportType=KQKD&TypeTime=NAM`),
    httpGet(`${BASE}/v2/BCTC/GetReportLCTT?symbol=${ticker}&pageIndex=1&pageSize=${pageSize}&reportType=ALL&TypeTime=NAM`),
  ]);
  if (!cdkt.isSuccess || !kqkd.isSuccess || !lctt.isSuccess) throw new Error(`API_FAILURE: cafef ${ticker}`);
  return {
    tnT: cdkt.value.templace.find((t) => t.code === "TN").data,
    nvT: cdkt.value.templace.find((t) => t.code === "NV").data,
    tnY: keepAudited(cdkt.value.data.find((d) => d.code === "TN").data),
    nvY: keepAudited(cdkt.value.data.find((d) => d.code === "NV").data),
    kqkdT: kqkd.value.templace, kqkdY: keepAudited(kqkd.value.data),
    lcttG: lctt.value.data.map((g) => ({ code: g.code, name: g.name, template: lctt.value.templace.find((t) => t.code === g.code).data, years: keepAudited(g.data) })),
  };
}

function checkBalance(tnY, nvY, i270, i440) {
  for (const y of tnY) {
    const n = nvY.find((n) => n.year === y.year);
    if (!n) continue;
    const v270 = y.data[i270]?.value ?? y.data[i270];
    const v440 = n.data[i440]?.value ?? n.data[i440];
    if (v270 == null || v440 == null) continue;
    if (Math.abs(v270 - v440) >= 1000) return `BALANCE_MISMATCH: ${y.year} chênh=${Math.abs(v270 - v440).toLocaleString("vi-VN")}đ`;
  }
  return null;
}

// ── Row builders ─────────────────────────────────────────────────────────────
const fmtVnd = (raw) => { const v = raw / 1e9; if (v === 0) return " - "; const a = Math.abs(v).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); return v < 0 ? `(${a})` : a; };

function dataLine(template, yrsData, years, row) {
  const line = [row.name];
  for (const y of years) {
    const ye = yrsData.find((d) => d.year === y);
    const cell = ye ? ye.data.find((d) => d.code === row.code) : null;
    line.push(cell ? fmtVnd(cell.value) : " - ");
  }
  return line;
}

const ROMAN_RE = /^[IVX]+\.\s/;
const LEVEL = new Set(["100", "200", "270", "300", "400", "440"]);

// Group header = row whose name starts with Roman numeral (I., II., ..., VII.)
function isGroupHeader(row) {
  const c = (row.code || "").trim();
  if (!c || LEVEL.has(c)) return false;
  return ROMAN_RE.test(row.name);
}

function buildAll(cf, years) {
  const all = [];
  const groups = [];

  function addSec(label, template, yrsData) {
    all.push([label, ...years.map(String)]);

    let i = 0;
    while (i < template.length) {
      const row = template[i];
      const code = (row.code || "").trim();
      const r0 = all.length;
      all.push(dataLine(template, yrsData, years, row));

      if (isGroupHeader(row)) {
        let j = i + 1;
        while (j < template.length) {
          const next = template[j];
          const sc = (next.code || "").trim();
          if (isGroupHeader(next) || LEVEL.has(sc)) break;
          all.push(dataLine(template, yrsData, years, next));
          j++;
        }
        const subStart = r0 + 1, subEnd = all.length;
        if (subEnd > subStart) {
          groups.push({ start: subStart, end: subEnd, collapsed: true });
        }
        i = j;
      } else {
        i++;
      }
    }
  }

  addSec("Tài sản", cf.tnT, cf.tnY);
  addSec("Nguồn vốn", cf.nvT, cf.nvY);
  addSec("Kết quả kinh doanh", cf.kqkdT, cf.kqkdY);
  for (const g of cf.lcttG) addSec(g.name, g.template, g.years);

  return { all, groups };
}

function buildFooter() {
  return [
    [],
    ["── Thông tin thêm ──"],
    ["Dữ liệu BCTC từ cafef.vn API (đã kiểm toán, type=HK)."],
    ["Web UI thêm mã mới:"],
    ['=HYPERLINK("https://quantification.youragentstore.net", "quantification.youragentstore.net")'],
    ["Xem hướng dẫn tại tab 'Info'."],
    [`Cập nhật: ${new Date().toISOString().slice(0, 16).replace("T", " ")}`],
  ];
}

// ── Sheet write ──────────────────────────────────────────────────────────────
async function writeSheet(sheets, ticker, all, groups) {
  const meta = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID });
  const ex = meta.data.sheets.find((s) => s.properties.title === ticker);
  if (ex) {
    await sheets.spreadsheets.batchUpdate({ spreadsheetId: SPREADSHEET_ID, requestBody: { requests: [{ deleteSheet: { sheetId: ex.properties.sheetId } }] } });
  }
  const add = await sheets.spreadsheets.batchUpdate({ spreadsheetId: SPREADSHEET_ID, requestBody: { requests: [{ addSheet: { properties: { title: ticker } } }] } });
  const sid = add.data.replies[0].addSheet.properties.sheetId;

  const final = [...all, ...buildFooter()];
  console.error("Total rows:", final.length);

  await sheets.spreadsheets.values.update({ spreadsheetId: SPREADSHEET_ID, range: `'${ticker}'!A1`, valueInputOption: "USER_ENTERED", requestBody: { values: final } });

  const nCols = final[0].length;
  const reqs = [];

  // Column widths
  reqs.push({ updateDimensionProperties: { range: { sheetId: sid, dimension: "COLUMNS", startIndex: 0, endIndex: 1 }, properties: { pixelSize: 400 }, fields: "pixelSize" } });
  reqs.push({ updateDimensionProperties: { range: { sheetId: sid, dimension: "COLUMNS", startIndex: 1, endIndex: nCols }, properties: { pixelSize: 95 }, fields: "pixelSize" } });

  // Format: section headers = dark blue bg + bold + white text
  // Format: level-1 headers (100/200/300/400) = bold on white bg
  const DARK_BLUE = { rgbColor: { red: 0.0039, green: 0.3412, blue: 0.6078 } }; // #01579B
  const WHITE = { rgbColor: { red: 1, green: 1, blue: 1 } };

  for (let i = 0; i < all.length; i++) {
    const label = all[i][0] || "";
    const isSecHeader = ["Tài sản", "Nguồn vốn", "Kết quả kinh doanh"].includes(label) || label.toLowerCase().includes("lưu chuyển");
    // Find which codes are level-1 (100,200,300,400) or totals (270,440)
    // We detect from the template structure: codes 100/200/270/300/400/440 are section-level

    if (isSecHeader) {
      // Dark blue bg + bold white text
      reqs.push({
        repeatCell: {
          range: { sheetId: sid, startRowIndex: i, endRowIndex: i + 1, startColumnIndex: 0, endColumnIndex: nCols },
          cell: { userEnteredFormat: { textFormat: { bold: true, foregroundColorStyle: WHITE, fontSize: 11 }, backgroundColorStyle: DARK_BLUE } },
          fields: "userEnteredFormat(textFormat(bold,foregroundColorStyle,fontSize),backgroundColorStyle)",
        },
      });
    } else {
      // Check if this row has code 100/200/300/400/270/440
      // We need to check against the actual codes in the templates
      // Simplest: check if the label matches known level-1 patterns
      const lvl1Patterns = [
        "A. TÀI SẢN NGẮN HẠN", "B. TÀI SẢN DÀI HẠN", "TỔNG CỘNG TÀI SẢN",
        "C. NỢ PHẢI TRẢ", "D VỐN CHỦ SỞ HỮU", "TỔNG CỘNG NGUỒN VỐN",
      ];
      if (lvl1Patterns.some(p => label.includes(p))) {
        reqs.push({
          repeatCell: {
            range: { sheetId: sid, startRowIndex: i, endRowIndex: i + 1, startColumnIndex: 0, endColumnIndex: nCols },
            cell: { userEnteredFormat: { textFormat: { bold: true } } },
            fields: "userEnteredFormat(textFormat(bold))",
          },
        });
      }
    }
  }

  await sheets.spreadsheets.batchUpdate({ spreadsheetId: SPREADSHEET_ID, requestBody: { requests: reqs } });

  // Row groups
  if (groups.length > 0) {
    const greqs = groups.map((g) => ({
      addDimensionGroup: { range: { sheetId: sid, dimension: "ROWS", startIndex: g.start, endIndex: g.end } },
    }));
    await sheets.spreadsheets.batchUpdate({ spreadsheetId: SPREADSHEET_ID, requestBody: { requests: greqs } });

    const collapsed = groups.filter((g) => g.collapsed);
    if (collapsed.length > 0) {
      const m2 = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID, ranges: [ticker] });
      const rgs = m2.data.sheets[0].rowGroups || [];
      const creqs = [];
      for (const cg of collapsed) {
        for (const rg of rgs) {
          if (rg.range.startIndex === cg.start && rg.range.endIndex === cg.end) {
            creqs.push({ updateDimensionGroup: { dimensionGroup: { range: { sheetId: sid, dimension: "ROWS", startIndex: cg.start, endIndex: cg.end }, depth: rg.depth || 0, collapsed: true }, fields: "collapsed" } });
            break;
          }
        }
      }
      if (creqs.length > 0) await sheets.spreadsheets.batchUpdate({ spreadsheetId: SPREADSHEET_ID, requestBody: { requests: creqs } });
    }
  }

  return `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/edit#gid=${sid}`;
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  const ticker = process.argv[2];
  if (!ticker || !/^[A-Z0-9]{3,10}$/.test(ticker)) { console.error("ERROR: INVALID_TICKER"); process.exit(1); }

  const yrs = config.max_years || 15;
  process.stdout.write("PROGRESS: 1/3 Đang tải BCTC từ cafef.vn...\n");
  const cf = await fetchCafef(ticker, yrs);
  const years = cf.tnY.map((y) => y.year);
  if (years.length < 3) throw new Error(`NO_DATA: ${ticker} ${years.length} năm`);

  process.stdout.write("PROGRESS: 2/3 Đang ghi dữ liệu...\n");
  // Balance check — only if codes 270/440 exist
  const i270 = cf.tnT.findIndex((r) => (r.code || "").trim() === "270");
  const i440 = cf.nvT.findIndex((r) => (r.code || "").trim() === "440");
  if (i270 >= 0 && i440 >= 0) {
    const be = checkBalance(cf.tnY, cf.nvY, i270, i440);
    if (be) { console.error(`ERROR: ${be}`); process.exit(2); }
  }

  const { all, groups } = buildAll(cf, years);
  process.stdout.write("PROGRESS: 3/3 Đang format + collapse...\n");

  const auth = new google.auth.GoogleAuth({ keyFile: KEY_PATH, scopes: ["https://www.googleapis.com/auth/spreadsheets"] });
  const sheets = google.sheets({ version: "v4", auth });
  const url = await writeSheet(sheets, ticker, all, groups);
  process.stdout.write(`DONE: ${url}\n`);
}

main().catch((e) => { const m = e.message || String(e); process.stderr.write(`ERROR: ${m}\n`); process.exit(1); });
