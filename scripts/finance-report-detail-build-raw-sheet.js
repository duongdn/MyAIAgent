#!/usr/bin/env node
/**
 * Build the raw BCTC sheet (<TICKER>) from cafef data, matching the exact
 * row layout established for FPT/VEA: Tài sản -> Nguồn vốn -> Kết quả kinh
 * doanh -> Lưu chuyển tiền tệ (3 groups), each section prefixed by a header
 * row repeating the year labels.
 *
 * Usage: node finance-report-detail-build-raw-sheet.js <TICKER> <SPREADSHEET_ID> [<SHEET_NAME>]
 */
const { google } = require("googleapis");
const path = require("path");
const { execSync } = require("child_process");

const ticker = process.argv[2];
const spreadsheetId = process.argv[3];
const sheetName = process.argv[4] && !process.argv[4].startsWith("--") ? process.argv[4] : ticker;
if (!ticker || !spreadsheetId) {
  console.error("Usage: node finance-report-detail-build-raw-sheet.js <TICKER> <SPREADSHEET_ID> [<SHEET_NAME>]");
  process.exit(1);
}

const KEY_PATH = path.join(__dirname, "..", "config", "daily-agent-490610-7eb7985b33e3.json");

function fmt(rawVnd) {
  const v = rawVnd / 1e9; // tỷ đồng
  if (v === 0) return " - ";
  const abs = Math.abs(v).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return v < 0 ? `(${abs})` : abs;
}

// EPS rows ("Lãi cơ bản/suy giảm trên cổ phiếu") are already đồng/CP — must NOT
// go through the /1e9 tỷ-đồng conversion used for balance-sheet-scale rows.
function fmtPerShare(rawVnd) {
  if (rawVnd === 0) return " - ";
  const abs = Math.abs(rawVnd).toLocaleString("en-US", { maximumFractionDigits: 0 });
  return rawVnd < 0 ? `(${abs})` : abs;
}
// Only EPS lines (lãi cơ bản / suy giảm / pha loãng) — NOT "THU NHẬP THUẦN TRÊN CỔ PHIẾU PHỔ THÔNG" (CTCK code 500, a VND total)
const PER_SHARE_NAME_RE = /(lãi cơ bản|suy giảm|pha loãng).*trên cổ phiếu/i;

// periods: [{ year, quater }] — quater 0 = annual column, 1-4 = quarterly column
function buildSectionRows(template, yearsData, periods) {
  return template.map((row) => {
    const line = [row.name];
    const isPerShare = PER_SHARE_NAME_RE.test(row.name);
    for (const p of periods) {
      const yearEntry = yearsData.find((d) => d.year === p.year && (d.quater || 0) === p.quater);
      const cell = yearEntry ? yearEntry.data.find((d) => d.code === row.code) : null;
      if (!cell) {
        line.push(" - ");
      } else {
        line.push(isPerShare ? fmtPerShare(cell.value) : fmt(cell.value));
      }
    }
    return line;
  });
}

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    require("https")
      .get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
        let body = "";
        res.on("data", (c) => (body += c));
        res.on("end", () => {
          try {
            resolve(JSON.parse(body));
          } catch (e) {
            reject(new Error(`Parse fail for ${url}: ${e.message}`));
          }
        });
      })
      .on("error", reject);
  });
}

// Latest n quarters from cafef, oldest first. Same endpoints as fetch-cafef.js, TypeTime=QUY.
async function fetchQuarters(tk, n) {
  const base = "https://apiweb.cafef.vn/api";
  const [cdkt, kqkd, lctt] = await Promise.all([
    fetchJson(`${base}/v2/BCTC/GetReportCDKT?symbol=${tk}&pageIndex=1&pageSize=${n}&reportType=ALL&TypeTime=QUY`),
    fetchJson(`${base}/v1/BCTC/GetReportDetail?symbol=${tk}&pageIndex=1&pageSize=${n}&reportType=KQKD&TypeTime=QUY`),
    fetchJson(`${base}/v2/BCTC/GetReportLCTT?symbol=${tk}&pageIndex=1&pageSize=${n}&reportType=ALL&TypeTime=QUY`),
  ]);
  const order = (arr) => [...arr].sort((a, b) => a.year - b.year || a.quater - b.quater);
  return {
    tn: order(cdkt.value.data.find((d) => d.code === "TN").data),
    nv: order(cdkt.value.data.find((d) => d.code === "NV").data),
    kqkd: order(kqkd.value.data),
    lctt: lctt.value.data.map((g) => ({ code: g.code, data: order(g.data) })),
  };
}

async function main() {
  // --data-file=<path>: use a pre-merged JSON (same shape as fetch-cafef output), e.g. cafef + PDF-transcribed years
  const dataFileArg = process.argv.find((a) => a.startsWith("--data-file="));
  const cafefJson = dataFileArg
    ? JSON.parse(require("fs").readFileSync(dataFileArg.slice("--data-file=".length), "utf8"))
    : JSON.parse(execSync(`node "${path.join(__dirname, "finance-report-detail-fetch-cafef.js")}" ${ticker}`, { maxBuffer: 20 * 1024 * 1024 }).toString());

  const years = cafefJson.balanceSheet.assetsYears.map((y) => y.year);
  const periods = years.map((year) => ({ year, quater: 0 }));

  // --quarters=N: append the latest N quarterly columns from cafef (TypeTime=QUY), e.g. "Q2/2026"
  const qArg = process.argv.find((a) => a.startsWith("--quarters="));
  if (qArg) {
    const q = await fetchQuarters(ticker, parseInt(qArg.slice("--quarters=".length), 10));
    const bs = cafefJson.balanceSheet;
    bs.assetsYears = [...bs.assetsYears, ...q.tn];
    bs.liabilitiesYears = [...bs.liabilitiesYears, ...q.nv];
    cafefJson.incomeStatement.years = [...cafefJson.incomeStatement.years, ...q.kqkd];
    for (const g of cafefJson.cashFlow.groups) g.years = [...g.years, ...((q.lctt.find((x) => x.code === g.code) || {}).data || [])];
    periods.push(...q.tn.map((e) => ({ year: e.year, quater: e.quater })));
  }
  const yearHeader = periods.map((p) => (p.quater ? `Q${p.quater}/${p.year}` : String(p.year)));

  const rows = [];
  rows.push(["Tài sản", ...yearHeader]);
  rows.push(...buildSectionRows(cafefJson.balanceSheet.assetsTemplate, cafefJson.balanceSheet.assetsYears, periods));
  rows.push(["Nguồn vốn", ...yearHeader]);
  rows.push(...buildSectionRows(cafefJson.balanceSheet.liabilitiesTemplate, cafefJson.balanceSheet.liabilitiesYears, periods));
  rows.push(["Kết quả kinh doanh", ...yearHeader]);
  rows.push(...buildSectionRows(cafefJson.incomeStatement.template, cafefJson.incomeStatement.years, periods));
  for (const group of cafefJson.cashFlow.groups) {
    rows.push([group.name, ...yearHeader]);
    rows.push(...buildSectionRows(group.template, group.years, periods));
  }

  console.error(`Total rows: ${rows.length}, periods: ${yearHeader.join(",")}`);

  const auth = new google.auth.GoogleAuth({
    keyFile: KEY_PATH,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const sheets = google.sheets({ version: "v4", auth });

  // Ensure target sheet exists with the right name (rename default "Sheet1"/first sheet if needed)
  const meta = await sheets.spreadsheets.get({ spreadsheetId });
  let targetSheet = meta.data.sheets.find((s) => s.properties.title === sheetName);
  if (!targetSheet) {
    const first = meta.data.sheets[0];
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: { requests: [{ updateSheetProperties: { properties: { sheetId: first.properties.sheetId, title: sheetName }, fields: "title" } }] },
    });
  }

  await sheets.spreadsheets.values.clear({ spreadsheetId, range: `'${sheetName}'!A1:Z500` });
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `'${sheetName}'!A1`,
    valueInputOption: "USER_ENTERED",
    requestBody: { values: rows },
  });

  console.log(JSON.stringify({ success: true, sheetName, totalRows: rows.length, years }, null, 2));
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
