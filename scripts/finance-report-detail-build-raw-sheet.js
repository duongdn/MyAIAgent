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
const sheetName = process.argv[4] || ticker;
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
const PER_SHARE_NAME_RE = /trên cổ phiếu/i;

function buildSectionRows(template, yearsData, years) {
  return template.map((row) => {
    const line = [row.name];
    const isPerShare = PER_SHARE_NAME_RE.test(row.name);
    for (const y of years) {
      const yearEntry = yearsData.find((d) => d.year === y);
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

async function main() {
  const cafefJson = JSON.parse(execSync(`node "${path.join(__dirname, "finance-report-detail-fetch-cafef.js")}" ${ticker}`, { maxBuffer: 20 * 1024 * 1024 }).toString());

  const years = cafefJson.balanceSheet.assetsYears.map((y) => y.year);
  const yearHeader = years.map(String);

  const rows = [];
  rows.push(["Tài sản", ...yearHeader]);
  rows.push(...buildSectionRows(cafefJson.balanceSheet.assetsTemplate, cafefJson.balanceSheet.assetsYears, years));
  rows.push(["Nguồn vốn", ...yearHeader]);
  rows.push(...buildSectionRows(cafefJson.balanceSheet.liabilitiesTemplate, cafefJson.balanceSheet.liabilitiesYears, years));
  rows.push(["Kết quả kinh doanh", ...yearHeader]);
  rows.push(...buildSectionRows(cafefJson.incomeStatement.template, cafefJson.incomeStatement.years, years));
  for (const group of cafefJson.cashFlow.groups) {
    rows.push([group.name, ...yearHeader]);
    rows.push(...buildSectionRows(group.template, group.years, years));
  }

  console.error(`Total rows: ${rows.length}, years: ${years.join(",")}`);

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
