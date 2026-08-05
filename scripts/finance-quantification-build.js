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
const fireant = require("./finance-fireant");

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
// Audited annual reports: cafef marks them "HK" (consolidated+audited) or "K" (audited standalone) — accept both, prefer HK.
const keepAudited = (arr) => {
  const byYear = new Map();
  for (const y of arr) {
    if (y.type !== "HK" && y.type !== "K") continue;
    const ex = byYear.get(y.year);
    if (!ex || (ex.type === "K" && y.type === "HK")) byYear.set(y.year, y);
  }
  return [...byYear.values()].sort((a, b) => a.year - b.year);
};
// Quarterly reports: cafef marks them "H" (consolidated) or "N" — key off quater>0, not the type letter.
const keepQuarters = (arr, n) => arr.filter((y) => y.quater > 0).sort((a, b) => a.year - b.year || a.quater - b.quater).slice(-n);
const periodLabel = (y) => (y.quater ? `Q${y.quater}/${y.year}` : String(y.year));

async function fetchCafef(ticker, maxYears, maxQuarters) {
  const [cdktN, kqkdN, lcttN, cdktQ, kqkdQ, lcttQ] = await Promise.all([
    httpGet(`${BASE}/v2/BCTC/GetReportCDKT?symbol=${ticker}&pageIndex=1&pageSize=${maxYears}&reportType=ALL&TypeTime=NAM`),
    httpGet(`${BASE}/v1/BCTC/GetReportDetail?symbol=${ticker}&pageIndex=1&pageSize=${maxYears}&reportType=KQKD&TypeTime=NAM`),
    httpGet(`${BASE}/v2/BCTC/GetReportLCTT?symbol=${ticker}&pageIndex=1&pageSize=${maxYears}&reportType=ALL&TypeTime=NAM`),
    httpGet(`${BASE}/v2/BCTC/GetReportCDKT?symbol=${ticker}&pageIndex=1&pageSize=${maxQuarters}&reportType=ALL&TypeTime=QUY`),
    httpGet(`${BASE}/v1/BCTC/GetReportDetail?symbol=${ticker}&pageIndex=1&pageSize=${maxQuarters}&reportType=KQKD&TypeTime=QUY`),
    httpGet(`${BASE}/v2/BCTC/GetReportLCTT?symbol=${ticker}&pageIndex=1&pageSize=${maxQuarters}&reportType=ALL&TypeTime=QUY`),
  ]);
  if (!cdktN.isSuccess || !kqkdN.isSuccess || !lcttN.isSuccess) throw new Error(`API_FAILURE: cafef ${ticker}`);
  const qOk = cdktQ.isSuccess && kqkdQ.isSuccess && lcttQ.isSuccess;

  const tnYAnnual = keepAudited(cdktN.value.data.find((d) => d.code === "TN").data);
  const nvYAnnual = keepAudited(cdktN.value.data.find((d) => d.code === "NV").data);
  const kqkdYAnnual = keepAudited(kqkdN.value.data);
  const tnYQuarter = qOk ? keepQuarters(cdktQ.value.data.find((d) => d.code === "TN").data, maxQuarters) : [];
  const nvYQuarter = qOk ? keepQuarters(cdktQ.value.data.find((d) => d.code === "NV").data, maxQuarters) : [];
  const kqkdYQuarter = qOk ? keepQuarters(kqkdQ.value.data, maxQuarters) : [];

  const lcttGQuarter = qOk ? lcttQ.value.data.map((g) => ({ code: g.code, years: keepQuarters(g.data, maxQuarters) })) : [];
  const lcttG = lcttN.value.data.map((g) => {
    const q = lcttGQuarter.find((x) => x.code === g.code);
    return {
      code: g.code, name: g.name,
      template: lcttN.value.templace.find((t) => t.code === g.code).data,
      years: [...keepAudited(g.data), ...(q ? q.years : [])],
    };
  });

  return {
    tnT: cdktN.value.templace.find((t) => t.code === "TN").data,
    nvT: cdktN.value.templace.find((t) => t.code === "NV").data,
    tnYAnnual, nvYAnnual,
    tnY: [...tnYAnnual, ...tnYQuarter],
    nvY: [...nvYAnnual, ...nvYQuarter],
    kqkdT: kqkdN.value.templace,
    kqkdY: [...kqkdYAnnual, ...kqkdYQuarter],
    lcttG,
  };
}

function checkBalance(tnY, nvY, i270, i440) {
  for (const y of tnY) {
    const n = nvY.find((n) => n.year === y.year);
    if (!n) continue;
    const v270 = y.data[i270]?.value ?? y.data[i270];
    const v440 = n.data[i440]?.value ?? n.data[i440];
    if (v270 == null || v440 == null) continue;
    if (Math.abs(v270 - v440) >= 10_000_000) return `BALANCE_MISMATCH: ${y.year} chênh=${Math.abs(v270 - v440).toLocaleString("vi-VN")}đ`;
  }
  return null;
}

// ── Row builders ─────────────────────────────────────────────────────────────
const fmtVnd = (raw) => { const v = raw / 1e9; if (v === 0) return " - "; const a = Math.abs(v).toLocaleString("en-US", { maximumFractionDigits: 0 }); return v < 0 ? `(${a})` : a; };
// EPS-type rows ("Đồng/1 cổ phiếu") are already in đồng, not tỷ đồng — do not divide by 1e9
const isPerShare = (name) => /Đồng\/1 cổ phiếu/i.test(name || "");
const fmtPerShare = (raw) => { if (raw === 0) return " - "; const a = Math.abs(raw).toLocaleString("en-US", { maximumFractionDigits: 0 }); return raw < 0 ? `(${a})` : a; };

function dataLine(yrsData, row) {
  const line = [row.name];
  const perShare = isPerShare(row.name);
  for (const y of yrsData) {
    const cell = y.data.find((d) => d.code === row.code);
    line.push(cell ? (perShare ? fmtPerShare(cell.value) : fmtVnd(cell.value)) : " - ");
  }
  return line;
}

const ROMAN_RE = /^[IVX]+\.\s/;
const LEVEL = new Set(["100", "200", "270", "300", "400", "440"]);
// Section-level boundary rows (cafef marks them via LEVEL codes; FireAnt via name prefixes)
const SECTION_BOUNDARY = /^(TỔNG CỘNG|Tổng cộng|[A-D]\.? )/;

// Group header = row whose name starts with Roman numeral (I., II., ..., VII.)
function isGroupHeader(row) {
  const c = (row.code || "").trim();
  if (!c || LEVEL.has(c)) return false;
  return ROMAN_RE.test(row.name);
}

function buildAll(cf) {
  const all = [];
  const groups = [];
  const headers = []; // { row, annualCount } — for header cell coloring (year vs quarter columns)

  function addSec(label, template, yrsData) {
    const annualCount = yrsData.filter((y) => !y.quater).length;
    headers.push({ row: all.length, annualCount });
    all.push([label, ...yrsData.map(periodLabel)]);

    let i = 0;
    while (i < template.length) {
      const row = template[i];
      const code = (row.code || "").trim();
      const r0 = all.length;
      all.push(dataLine(yrsData, row));

      if (isGroupHeader(row)) {
        let j = i + 1;
        while (j < template.length) {
          const next = template[j];
          const sc = (next.code || "").trim();
          if (isGroupHeader(next) || LEVEL.has(sc) || SECTION_BOUNDARY.test(next.name)) break;
          all.push(dataLine(yrsData, next));
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

  // Sections that get full-content collapse (no Roman numeral sub-headers)
  function addGroupedSec(label, template, yrsData) {
    const start = all.length;
    addSec(label, template, yrsData);
    const end = all.length;
    if (end > start + 1) groups.push({ start: start + 1, end, collapsed: true });
  }

  addSec("Tài sản", cf.tnT, cf.tnY);
  addSec("Nguồn vốn", cf.nvT, cf.nvY);
  addGroupedSec("Kết quả kinh doanh", cf.kqkdT, cf.kqkdY);
  for (const g of cf.lcttG) addGroupedSec(g.name, g.template, g.years);

  return { all, groups, headers };
}

// Column groups: collapse everything except the last 5 years and the current
// year's quarters (+1 prior-year quarter for continuity).
function computeColumnGroups(annualCount, quarterPeriods) {
  const cgroups = [];
  if (annualCount > 5) {
    cgroups.push({ start: 1, end: 1 + (annualCount - 5), collapsed: true });
  }
  if (quarterPeriods.length > 0) {
    const currentYear = new Date().getFullYear();
    let visibleStart = quarterPeriods.findIndex((p) => p.year === currentYear);
    visibleStart = visibleStart === -1 ? Math.max(0, quarterPeriods.length - 1) : Math.max(0, visibleStart - 1);
    if (visibleStart > 0) {
      const qColStart = 1 + annualCount;
      cgroups.push({ start: qColStart, end: qColStart + visibleStart, collapsed: true });
    }
  }
  return cgroups;
}

function buildFooter() { return []; }

// ── Sheet write ──────────────────────────────────────────────────────────────
async function writeSheet(sheets, ticker, all, groups, headers, columnGroups) {
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

  // Format: section headers = dark blue bg (year cols) + red bg (quarter cols), bold white text
  // Format: level-1 headers (100/200/300/400) = bold on white bg
  const DARK_BLUE = { rgbColor: { red: 0.0039, green: 0.3412, blue: 0.6078 } }; // #01579B
  const RED = { rgbColor: { red: 1, green: 0, blue: 0 } };
  const WHITE = { rgbColor: { red: 1, green: 1, blue: 1 } };

  const headerRows = new Map(headers.map((h) => [h.row, h.annualCount]));

  for (let i = 0; i < all.length; i++) {
    const label = all[i][0] || "";

    if (headerRows.has(i)) {
      const annualCount = headerRows.get(i);
      const yearEnd = Math.min(1 + annualCount, nCols);
      reqs.push({
        repeatCell: {
          range: { sheetId: sid, startRowIndex: i, endRowIndex: i + 1, startColumnIndex: 0, endColumnIndex: yearEnd },
          cell: { userEnteredFormat: { textFormat: { bold: true, foregroundColorStyle: WHITE, fontSize: 11 }, backgroundColorStyle: DARK_BLUE } },
          fields: "userEnteredFormat(textFormat(bold,foregroundColorStyle,fontSize),backgroundColorStyle)",
        },
      });
      if (yearEnd < nCols) {
        reqs.push({
          repeatCell: {
            range: { sheetId: sid, startRowIndex: i, endRowIndex: i + 1, startColumnIndex: yearEnd, endColumnIndex: nCols },
            cell: { userEnteredFormat: { textFormat: { bold: true, foregroundColorStyle: WHITE, fontSize: 11 }, backgroundColorStyle: RED } },
            fields: "userEnteredFormat(textFormat(bold,foregroundColorStyle,fontSize),backgroundColorStyle)",
          },
        });
      }
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

  // Row groups — add groups then collapse them
  if (groups.length > 0) {
    // Step 1: add dimension groups
    const greqs = groups.map((g) => ({
      addDimensionGroup: { range: { sheetId: sid, dimension: "ROWS", startIndex: g.start, endIndex: g.end } },
    }));
    await sheets.spreadsheets.batchUpdate({ spreadsheetId: SPREADSHEET_ID, requestBody: { requests: greqs } });

    // Step 2: read back groups and collapse
    const m2 = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID, ranges: [ticker] });
    const rgs = m2.data.sheets[0].rowGroups || [];
    const creqs = [];
    for (const cg of groups) {
      for (const rg of rgs) {
        if (rg.range.startIndex === cg.start && rg.range.endIndex === cg.end) {
          creqs.push({
            updateDimensionGroup: {
              dimensionGroup: { range: { sheetId: sid, dimension: "ROWS", startIndex: cg.start, endIndex: cg.end }, depth: rg.depth || 0, collapsed: true },
              fields: "collapsed",
            },
          });
          break;
        }
      }
    }
    if (creqs.length > 0) {
      await sheets.spreadsheets.batchUpdate({ spreadsheetId: SPREADSHEET_ID, requestBody: { requests: creqs } });
    }
  }

  // Column groups — collapse older years / older quarters, same two-phase process
  if (columnGroups.length > 0) {
    const cgreqs = columnGroups.map((g) => ({
      addDimensionGroup: { range: { sheetId: sid, dimension: "COLUMNS", startIndex: g.start, endIndex: g.end } },
    }));
    await sheets.spreadsheets.batchUpdate({ spreadsheetId: SPREADSHEET_ID, requestBody: { requests: cgreqs } });

    const m3 = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID, ranges: [ticker] });
    const cgs = m3.data.sheets[0].columnGroups || [];
    const ccreqs = [];
    for (const cg of columnGroups) {
      for (const g of cgs) {
        if (g.range.startIndex === cg.start && g.range.endIndex === cg.end) {
          ccreqs.push({
            updateDimensionGroup: {
              dimensionGroup: { range: { sheetId: sid, dimension: "COLUMNS", startIndex: cg.start, endIndex: cg.end }, depth: g.depth || 0, collapsed: true },
              fields: "collapsed",
            },
          });
          break;
        }
      }
    }
    if (ccreqs.length > 0) {
      await sheets.spreadsheets.batchUpdate({ spreadsheetId: SPREADSHEET_ID, requestBody: { requests: ccreqs } });
    }
  }

  return `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/edit#gid=${sid}`;
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  const args = process.argv.slice(2);
  const ticker = (args.find((a) => /^[A-Z0-9]{3,10}$/.test(a)) || "").toUpperCase();
  const forceFireant = args.includes("--fireant");
  if (!ticker) { process.stderr.write("ERROR: INVALID_TICKER\n", () => process.exit(1)); return; }

  const yrs = config.max_years || 15;
  const qtrs = config.max_quarters || 8;
  let cf, src;
  if (forceFireant) {
    process.stdout.write("PROGRESS: 1/3 Đang tải BCTC từ FireAnt...\n");
    cf = await fireant.fetchFireAntBCTC(ticker, yrs, qtrs);
    src = "fireant";
  } else {
    try {
      process.stdout.write("PROGRESS: 1/3 Đang tải BCTC từ cafef.vn...\n");
      cf = await fetchCafef(ticker, yrs, qtrs);
      src = "cafef";
    } catch (e) {
      process.stdout.write(`WARN: cafef lỗi (${e.message}), thử FireAnt...\n`);
      cf = await fireant.fetchFireAntBCTC(ticker, yrs, qtrs);
      src = "fireant";
    }
    if (src === "cafef" && cf.tnYAnnual.length < 3) {
      // cafef insufficient → fall back to FireAnt
      process.stdout.write("WARN: cafef thiếu dữ liệu, thử FireAnt...\n");
      cf = await fireant.fetchFireAntBCTC(ticker, yrs, qtrs);
      src = "fireant";
    }
  }
  if (cf.tnYAnnual.length < 3) throw new Error(`NO_DATA: ${ticker} ${cf.tnYAnnual.length} năm`);

  process.stdout.write("PROGRESS: 2/3 Đang ghi dữ liệu...\n");
  // Balance check — annual only (audited), skip quarterly
  const i270 = cf.tnT.findIndex((r) => (r.code || "").trim() === "270");
  const i440 = cf.nvT.findIndex((r) => (r.code || "").trim() === "440");
  if (i270 >= 0 && i440 >= 0) {
    const be = checkBalance(cf.tnYAnnual, cf.nvYAnnual, i270, i440);
    if (be) { process.stderr.write(`ERROR: ${be}\n`, () => process.exit(2)); return; }
  }

  const { all, groups, headers } = buildAll(cf);
  const quarterPeriods = cf.tnY.slice(cf.tnYAnnual.length);
  const columnGroups = computeColumnGroups(cf.tnYAnnual.length, quarterPeriods);
  process.stdout.write("PROGRESS: 3/3 Đang format + collapse...\n");

  const auth = new google.auth.GoogleAuth({ keyFile: KEY_PATH, scopes: ["https://www.googleapis.com/auth/spreadsheets"] });
  const sheets = google.sheets({ version: "v4", auth });
  const url = await writeSheet(sheets, ticker, all, groups, headers, columnGroups);
  process.stdout.write(`DONE: ${url}\n`);
}

main().catch((e) => {
  const m = e.message || String(e);
  const msg = m.startsWith("ERROR:") ? m + "\n" : `ERROR: ${m}\n`;
  process.stderr.write(msg, () => process.exit(1));
});
