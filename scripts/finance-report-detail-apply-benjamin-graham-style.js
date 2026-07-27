#!/usr/bin/env node
/**
 * Apply FPT's Benjamin Graham sheet formatting (frozen rows, uneven column
 * widths, WRAP/TOP alignment, blue section headers, gray column-header row).
 *
 * Usage: node finance-report-detail-apply-benjamin-graham-style.js <SPREADSHEET_ID> <SHEET_NAME>
 */
const { google } = require("googleapis");
const path = require("path");

const spreadsheetId = process.argv[2];
const sheetName = process.argv[3];
if (!spreadsheetId || !sheetName) {
  console.error("Usage: node finance-report-detail-apply-benjamin-graham-style.js <SPREADSHEET_ID> <SHEET_NAME>");
  process.exit(1);
}
const KEY_PATH = path.join(__dirname, "..", "config", "daily-agent-490610-7eb7985b33e3.json");

const SECTION_BLUE = { red: 0.8, green: 0.8784314, blue: 0.96862745 };
const COLHEADER_GRAY = { red: 0.92941177, green: 0.92941177, blue: 0.92941177 };

async function main() {
  const auth = new google.auth.GoogleAuth({ keyFile: KEY_PATH, scopes: ["https://www.googleapis.com/auth/spreadsheets"] });
  const sheets = google.sheets({ version: "v4", auth });
  const meta = await sheets.spreadsheets.get({ spreadsheetId });
  const sheetObj = meta.data.sheets.find((s) => s.properties.title === sheetName);
  if (!sheetObj) throw new Error(`Sheet not found: ${sheetName}`);
  const sheetId = sheetObj.properties.sheetId;

  const valRes = await sheets.spreadsheets.values.get({ spreadsheetId, range: `'${sheetName}'!A1:E30` });
  const rows = valRes.data.values || [];

  const requests = [];
  requests.push({ updateSheetProperties: { properties: { sheetId, gridProperties: { frozenRowCount: 5 } }, fields: "gridProperties.frozenRowCount" } });
  const widths = [491, 260, 200, 300, 110];
  widths.forEach((w, i) => {
    requests.push({ updateDimensionProperties: { range: { sheetId, dimension: "COLUMNS", startIndex: i, endIndex: i + 1 }, properties: { pixelSize: w }, fields: "pixelSize" } });
  });
  // base pass: WRAP + TOP everywhere
  requests.push({
    repeatCell: {
      range: { sheetId, startRowIndex: 0, endRowIndex: rows.length, startColumnIndex: 0, endColumnIndex: 5 },
      cell: { userEnteredFormat: { wrapStrategy: "WRAP", verticalAlignment: "TOP" } },
      fields: "userEnteredFormat(wrapStrategy,verticalAlignment)",
    },
  });

  rows.forEach((row, i) => {
    const label = (row[0] || "").trim();
    const rowNum = i + 1;
    if (rowNum === 1) {
      requests.push({ repeatCell: { range: { sheetId, startRowIndex: i, endRowIndex: i + 1, startColumnIndex: 0, endColumnIndex: 5 }, cell: { userEnteredFormat: { textFormat: { bold: true } } }, fields: "userEnteredFormat.textFormat.bold" } });
      return;
    }
    if (/^[IVX]+\.\s/.test(label)) {
      requests.push({ repeatCell: { range: { sheetId, startRowIndex: i, endRowIndex: i + 1, startColumnIndex: 0, endColumnIndex: 5 }, cell: { userEnteredFormat: { backgroundColor: SECTION_BLUE, textFormat: { bold: true } } }, fields: "userEnteredFormat(backgroundColor,textFormat.bold)" } });
      return;
    }
    if (label === "STT" || label === "Chỉ tiêu") {
      requests.push({ repeatCell: { range: { sheetId, startRowIndex: i, endRowIndex: i + 1, startColumnIndex: 0, endColumnIndex: 5 }, cell: { userEnteredFormat: { backgroundColor: COLHEADER_GRAY, textFormat: { bold: true } } }, fields: "userEnteredFormat(backgroundColor,textFormat.bold)" } });
      return;
    }
    if (/^KẾT LUẬN/.test(label)) {
      requests.push({ repeatCell: { range: { sheetId, startRowIndex: i, endRowIndex: i + 1, startColumnIndex: 0, endColumnIndex: 5 }, cell: { userEnteredFormat: { textFormat: { bold: true } } }, fields: "userEnteredFormat.textFormat.bold" } });
    }
  });

  await sheets.spreadsheets.batchUpdate({ spreadsheetId, requestBody: { requests } });
  console.log(JSON.stringify({ success: true, sheetName, requests: requests.length }, null, 2));
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
