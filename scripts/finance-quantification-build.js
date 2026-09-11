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

// cafef systemic bug (recurring pattern, found 3x as of 2026-09: KQKD 21-27,
// CDKT "Phải thu dài hạn" 215-216, likely more): around Q1/2026 cafef inserted new
// line items into several report sections without re-keying older periods' data to
// match. Pre-2026 periods keep reporting under the OLD code layout — shifted N
// slots lower than the CURRENT template — until the last code in the chain (the
// newly-added line) is populated. Confirmed via magnitude continuity across the
// Q4/2025→Q1/2026 boundary for every case found. `applyChainShift` undoes this
// per-period, gated on: (a) the ticker's data populates the chain's last code in
// SOME period (guards tickers with a different/no such template shape), and (b)
// the period itself is pre-cutover (last code === 0 that period) — so post-2026
// periods, and unaffected tickers, are untouched.
// `isPreCutoverFn(cells)`: given the chain's cells for one period, decide whether that
// period is still on the OLD (needs-fixing) layout. KQKD: the new line starts at
// exactly 0 and fills in after cutover, so `last === 0` means pre-cutover. CDKT
// receivables: the old code holds the displaced (mislabeled) value — always POSITIVE,
// since it's really "Phải thu dài hạn khác" — until cutover, after which that slot is
// either 0 or a genuine (possibly negative) "Dự phòng"; `last > 0` is pre-cutover.
// `direction`: which way values need to move to land on their correct code. "up" —
// each code's true value is currently one slot LOWER (KQKD: raw21 holds true code22's
// value, ..., so higher-index cells pull from the previous lower-index cell). "down" —
// each code's true value is currently one slot HIGHER (CDKT receivables: raw216 holds
// true code215's value, so lower-index cells pull from the next higher-index cell).
function applyChainShift(periods, chain, isPreCutoverFn, direction = "up") {
  const cellsOf = (period) => chain.map((c) => period.data.find((d) => d.code === c));
  const isPreCutover = (cells) => isPreCutoverFn(cells[cells.length - 1].value);
  const seenBothStates =
    periods.some((p) => { const c = cellsOf(p); return c.every(Boolean) && isPreCutover(c); }) &&
    periods.some((p) => { const c = cellsOf(p); return c.every(Boolean) && !isPreCutover(c); });
  if (!seenBothStates) return;
  for (const period of periods) {
    const cells = cellsOf(period);
    if (cells.some((c) => !c) || !isPreCutover(cells)) continue;
    const original = cells.map((c) => c.value);
    if (direction === "up") {
      for (let i = cells.length - 1; i > 0; i--) cells[i].value = original[i - 1];
      cells[0].value = 0;
    } else {
      for (let i = 0; i < cells.length - 1; i++) cells[i].value = original[i + 1];
      cells[cells.length - 1].value = 0;
    }
  }
}
// KQKD: "- Phần lãi/lỗ trong công ty liên doanh, liên kết" (code27) inserted; pre-2026
// data lands one slot low (21→22→23→24→27), code27 stays 0 until cutover.
// ~20/55 tickers affected incl. VEA, MWG.
const KQKD_CHAIN = ["21", "22", "23", "24", "27"];
// CDKT "Các khoản phải thu dài hạn": pre-2026 periods put "Phải thu dài hạn khác"'s
// value at code216 ("Dự phòng phải thu dài hạn khó đòi") instead of code215, leaving
// 215 at 0; cutover drops code216 back to 0 once the value moves to 215. Confirmed
// universal (VNM, FPT, MWG, VEA, HAG, REE all affected).
const CDKT_TN_RECEIVABLE_LT_CHAIN = ["215", "216"];

// cafef CDKT template bug: for the standard non-financial template, the static
// `templace` for the "III. Các khoản phải thu ngắn hạn" section is missing the
// "5. Phải thu về cho vay ngắn hạn" row entirely (numbering jumps 4→6), so codes
// 135/136/137 all carry the wrong (one-item-early) label. Per-code VALUES are
// correct as-is (row131+...+137 sums to the code130 total exactly, for every
// period) — verified against cafef's own rendered CDKT page for HAG (code135 =
// 2,820,821,916 = "Phải thu về cho vay ngắn hạn" cuối năm 2025). Pure label fix, no
// value changes needed. Numbering must match the STATIC Circular-200 item order
// (5./6./7.) — NOT the dynamic on-screen numbering cafef's own UI shows (which
// skips zero-valued items and renumbers, e.g. "4." when items 3-4 are blank for
// that ticker); using the dynamic number here would collide with code134's "4.".
// NOT universal by code number — banks/securities firms/insurers use a totally
// different CDKT template where codes 135-137 mean something else entirely (verified
// case: VND/SSI code137 = "7. Tài sản ngắn hạn khác", not a receivables line at all).
// Match by the EXACT broken source text, never blindly by code, or this clobbers a
// correct label on a differently-shaped template.
const CDKT_TN_LABEL_FIX = {
  "135": { from: "6. Phải thu ngắn hạn khác", to: "5. Phải thu về cho vay ngắn hạn" },
  "136": { from: "7. Dự phòng phải thu ngắn hạn khó đòi (*)", to: "6. Phải thu ngắn hạn khác" },
  "137": { from: "8. Tài sản thiếu chờ xử lý", to: "7. Dự phòng phải thu ngắn hạn khó đòi (*)" },
};
function fixCdktTnTemplateGap(tnT) {
  for (const row of tnT) {
    const fix = CDKT_TN_LABEL_FIX[(row.code || "").trim()];
    if (fix && row.name === fix.from) row.name = fix.to;
  }
  return tnT;
}

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
    tnT: fixCdktTnTemplateGap(cdktN.value.templace.find((t) => t.code === "TN").data),
    nvT: cdktN.value.templace.find((t) => t.code === "NV").data,
    tnYAnnual, nvYAnnual,
    tnY: [...tnYAnnual, ...tnYQuarter],
    nvY: [...nvYAnnual, ...nvYQuarter],
    kqkdT: kqkdN.value.templace,
    kqkdY: [...kqkdYAnnual, ...kqkdYQuarter],
    lcttG,
  };
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

// ── Template self-checks (systemic, run on every build) ───────────────────────
// Two cafef bugs found in production (2026-08/09) both had a cheap structural
// signature that would have surfaced BEFORE a user spotted the visible symptom:
//   1. CDKT "Phải thu về cho vay ngắn hạn" gap: item numbering jumped 4→6,
//      skipping "5." — a numbering-gap scan catches this class instantly.
//   2. KQKD code21→27 chain shift: a contra/negative-only line (dự phòng) held
//      a large POSITIVE value for many periods — a sign-sanity scan on known
//      contra-account name patterns catches this class instantly.
// Neither check needs a reference source; both run on every build, cost ~0,
// and print WARN (non-blocking) so the anomaly shows up in build output the
// moment cafef's data changes shape again, instead of waiting for a screenshot.
// Top-level item only: "5. Foo" — NOT a decimal sub-item like "7.1 Foo" or "2.1. Foo"
// (banks/securities/insurance templates use these for sub-breakdowns; they don't
// participate in the top-level 1,2,3... sequence and must not be compared against it).
const ITEM_NUM_RE = /^(\d+)\.\s+(?!\d)/;
function auditTemplateNumbering(template, label) {
  let expected = null;
  for (const row of template) {
    const c = (row.code || "").trim();
    if (!c || LEVEL.has(c) || ROMAN_RE.test(row.name) || SECTION_BOUNDARY.test(row.name)) {
      expected = null; // reset at each group boundary
      continue;
    }
    const m = ITEM_NUM_RE.exec(row.name);
    if (!m) continue;
    const n = parseInt(m[1], 10);
    if (expected !== null && n !== expected) {
      process.stdout.write(`WARN: [audit] ${label} template numbering gap near code ${c} — expected item ${expected}, got "${row.name}" (cafef may have inserted/removed a line; verify code mapping)\n`);
    }
    expected = n + 1;
  }
}

// Only valid on the CDKT ASSET side (TN) — "Dự phòng ..." there is always a
// contra-asset (allowance/impairment, ≤0). On the liability side (NV), "Dự phòng
// phải trả" is a genuine liability/provision and IS supposed to be positive — never
// call this on nvT. Same reason it must never run on KQKD (income statement): "chi
// phí dự phòng" there is a genuine EXPENSE LINE (credit-risk provision for banks,
// technical provisions for insurers, impairment charges for securities firms) —
// reported positive like any other expense, not a balance-sheet deduction.
const CONTRA_NAME_RE = /Dự phòng|hao mòn lũy kế|khấu hao lũy kế/i;
function auditContraSign(template, yrsData, label) {
  for (const row of template) {
    if (!CONTRA_NAME_RE.test(row.name)) continue;
    let positiveCount = 0, total = 0, maxPositive = 0;
    for (const y of yrsData) {
      const cell = y.data.find((d) => d.code === row.code);
      if (!cell || cell.value === 0) continue;
      total++;
      if (cell.value > 0) { positiveCount++; maxPositive = Math.max(maxPositive, cell.value); }
    }
    // A few isolated positive periods can be legitimate (provision reversal); flag
    // only when it's the majority AND the magnitude is non-trivial (>1 tỷ).
    if (total >= 3 && positiveCount / total > 0.5 && maxPositive > 1e9) {
      process.stdout.write(`WARN: [audit] ${label} "${row.name}" (code ${row.code}) is positive in ${positiveCount}/${total} periods (contra-account expected ≤0) — likely mislabeled/shifted code, verify against cafef's live page\n`);
    }
  }
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
  const forceCafef = args.includes("--cafef");
  if (!ticker) { process.stderr.write("ERROR: INVALID_TICKER\n", () => process.exit(1)); return; }

  const yrs = config.max_years || 15;
  const qtrs = config.max_quarters || 8;
  let cf, src;
  if (forceFireant) {
    process.stdout.write("PROGRESS: 1/3 Đang tải BCTC từ FireAnt...\n");
    cf = await fireant.fetchFireAntBCTC(ticker, yrs, qtrs);
    src = "fireant";
  } else {
    process.stdout.write("PROGRESS: 1/3 Đang tải BCTC từ cafef.vn...\n");
    try {
      cf = await fetchCafef(ticker, yrs, qtrs);
      src = "cafef";
    } catch (e) {
      if (forceCafef) throw e;
      process.stdout.write(`WARN: cafef lỗi (${e.message}), thử FireAnt...\n`);
      cf = await fireant.fetchFireAntBCTC(ticker, yrs, qtrs);
      src = "fireant";
    }
    // Newly-listed tickers can genuinely have <3 audited years on cafef — don't
    // fall back to FireAnt in that case, since FireAnt may hold unrelated data
    // from a previous company that used the same ticker code (verified case: HPA).
    if (!forceCafef && src === "cafef" && cf.tnYAnnual.length < 3) {
      process.stdout.write("WARN: cafef thiếu dữ liệu, thử FireAnt...\n");
      cf = await fireant.fetchFireAntBCTC(ticker, yrs, qtrs);
      src = "fireant";
    }
  }
  const minYears = forceCafef ? 1 : 3;
  if (cf.tnYAnnual.length < minYears) throw new Error(`NO_DATA: ${ticker} ${cf.tnYAnnual.length} năm`);

  if (src === "cafef") {
    applyChainShift(cf.kqkdY, KQKD_CHAIN, (v) => v === 0, "up");
    applyChainShift(cf.tnY, CDKT_TN_RECEIVABLE_LT_CHAIN, (v) => v > 0, "down");

    auditTemplateNumbering(cf.tnT, "CDKT Tài sản");
    auditTemplateNumbering(cf.nvT, "CDKT Nguồn vốn");
    // KQKD numbering audit skipped: banks/insurers/securities firms use heavily
    // sub-numbered KQKD templates (decimal + custom section items) unrelated to the
    // 1,2,3... top-level sequence this check assumes; too noisy to be useful there.
    auditContraSign(cf.tnT, cf.tnY, "CDKT Tài sản"); // NV and KQKD skipped — see comment on auditContraSign
  }

  process.stdout.write("PROGRESS: 2/3 Đang ghi dữ liệu...\n");
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
