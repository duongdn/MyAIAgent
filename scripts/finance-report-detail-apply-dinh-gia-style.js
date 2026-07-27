#!/usr/bin/env node
/**
 * Apply FPT's "Định giá" sheet formatting style (the actual good template,
 * gid=862074532) to a target Định giá sheet: light blue-gray section headers,
 * frozen header rows/first column, explicit number formats per row type, wider
 * columns. No borders (FPT's Định giá has none).
 *
 * Usage: node finance-report-detail-apply-dinh-gia-style.js <SPREADSHEET_ID> <SHEET_NAME>
 */
const { google } = require("googleapis");
const path = require("path");

const spreadsheetId = process.argv[2];
const sheetName = process.argv[3];
if (!spreadsheetId || !sheetName) {
  console.error("Usage: node finance-report-detail-apply-dinh-gia-style.js <SPREADSHEET_ID> <SHEET_NAME>");
  process.exit(1);
}
const KEY_PATH = path.join(__dirname, "..", "config", "daily-agent-490610-7eb7985b33e3.json");

const LIGHT_BLUE = { red: 0.84705883, green: 0.8980392, blue: 0.9764706 };

async function main() {
  const auth = new google.auth.GoogleAuth({ keyFile: KEY_PATH, scopes: ["https://www.googleapis.com/auth/spreadsheets"] });
  const sheets = google.sheets({ version: "v4", auth });
  const meta = await sheets.spreadsheets.get({ spreadsheetId });
  const sheetObj = meta.data.sheets.find((s) => s.properties.title === sheetName);
  if (!sheetObj) throw new Error(`Sheet not found: ${sheetName}`);
  const sheetId = sheetObj.properties.sheetId;

  // Read values to find section-header rows (label rows with no numeric data in col B,
  // i.e. blank row below them, or matching the roman-numeral/"N. " pattern) and to
  // classify each data row as percent/ratio/absolute for number-format purposes.
  const valRes = await sheets.spreadsheets.values.get({ spreadsheetId, range: `'${sheetName}'!A1:P50` });
  const rows = valRes.data.values || [];
  const lastCol = Math.max(...rows.map((r) => r.length), 11);

  const requests = [];

  requests.push({
    updateSheetProperties: {
      properties: { sheetId, gridProperties: { frozenRowCount: 3, frozenColumnCount: 1 } },
      fields: "gridProperties.frozenRowCount,gridProperties.frozenColumnCount",
    },
  });
  requests.push({
    updateDimensionProperties: { range: { sheetId, dimension: "COLUMNS", startIndex: 0, endIndex: 1 }, properties: { pixelSize: 460 }, fields: "pixelSize" },
  });
  requests.push({
    updateDimensionProperties: { range: { sheetId, dimension: "COLUMNS", startIndex: 1, endIndex: lastCol }, properties: { pixelSize: 95 }, fields: "pixelSize" },
  });

  const HEADER_ROW_RE = /^([IVX]+\.|0\.|\d+\.)\s/; // "I. NHÓM...", "0. QUY MÔ...", section titles
  rows.forEach((row, i) => {
    const label = (row[0] || "").trim();
    const rowNum1based = i + 1;
    const isTitleRow = rowNum1based === 1 || rowNum1based === 3 || HEADER_ROW_RE.test(label);
    if (!label && rowNum1based !== 1) return; // blank row, skip

    if (isTitleRow) {
      requests.push({
        repeatCell: {
          range: { sheetId, startRowIndex: i, endRowIndex: i + 1, startColumnIndex: 0, endColumnIndex: lastCol },
          cell: { userEnteredFormat: { backgroundColor: LIGHT_BLUE, textFormat: { bold: true } } },
          fields: "userEnteredFormat(backgroundColor,textFormat.bold)",
        },
      });
      return;
    }
    if (rowNum1based === 2) {
      requests.push({
        repeatCell: {
          range: { sheetId, startRowIndex: i, endRowIndex: i + 1, startColumnIndex: 0, endColumnIndex: lastCol },
          cell: { userEnteredFormat: { textFormat: { fontSize: 9 } } },
          fields: "userEnteredFormat.textFormat.fontSize",
        },
      });
      return;
    }

    // Data row: classify number format from the label text or sampled values
    const sample = row.slice(1).find((v) => v !== undefined && v !== "");
    let pattern = "#,##0";
    if (/%/.test(label) || (typeof sample === "string" && /%$/.test(sample.trim()))) pattern = "0.0%";
    else if (/lần\)|P\/E|P\/B|P\/S|EV\/EBIT|EV\/EBITDA|D\/E/.test(label)) pattern = "#,##0.00";
    else if (typeof sample === "string" && /\.\d\d$/.test(sample.replace(/[,()]/g, "").trim())) pattern = "#,##0.00";

    requests.push({
      repeatCell: {
        range: { sheetId, startRowIndex: i, endRowIndex: i + 1, startColumnIndex: 1, endColumnIndex: lastCol },
        cell: { userEnteredFormat: { numberFormat: { type: "NUMBER", pattern } } },
        fields: "userEnteredFormat.numberFormat",
      },
    });
  });

  await sheets.spreadsheets.batchUpdate({ spreadsheetId, requestBody: { requests } });
  console.log(JSON.stringify({ success: true, sheetName, requests: requests.length }, null, 2));
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
