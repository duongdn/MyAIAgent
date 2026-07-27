#!/usr/bin/env node
/**
 * Replicate VEA raw-sheet's exact cell formatting onto a target sheet that has
 * the same 202-row layout (raw ticker sheet, or the copied rows 1-202 inside
 * "Định lượng - <TICKER>"): blue header bands, accounting number format,
 * borders, right-aligned numbers, and the specific bold-row set VEA uses.
 *
 * Usage: node finance-report-detail-apply-vea-style.js <SPREADSHEET_ID> <SHEET_NAME> [--ratio-block-start=204]
 */
const { google } = require("googleapis");
const path = require("path");

const spreadsheetId = process.argv[2];
const sheetName = process.argv[3];
const ratioBlockArg = process.argv.find((a) => a.startsWith("--ratio-block-start="));
const ratioBlockStart = ratioBlockArg ? parseInt(ratioBlockArg.split("=")[1], 10) : null;
if (!spreadsheetId || !sheetName) {
  console.error("Usage: node finance-report-detail-apply-vea-style.js <SPREADSHEET_ID> <SHEET_NAME> [--ratio-block-start=N]");
  process.exit(1);
}
const KEY_PATH = path.join(__dirname, "..", "config", "daily-agent-490610-7eb7985b33e3.json");

const BLUE = { red: 0.003921569, green: 0.34117648, blue: 0.60784316 };
const WHITE = { red: 1, green: 1, blue: 1 };
const BORDER_COLOR = { green: 0.4, blue: 0.8 };
const ACCT_FMT = '_(* #,##0.00_);_(* (#,##0.00);_(* "-"??_);_(@_)';

const BLUE_HEADER_ROWS = new Set([1, 136, 161]);
const BOLD_ROWS = new Set([1, 2, 34, 80, 81, 82, 135, 136, 139, 140, 141, 143, 144, 146, 149, 153, 156, 157, 159, 161, 162, 163, 170, 181, 190]);
const LAST_DATA_ROW = 202;
const NUM_COLS = 11; // B..L covers up to 10 year columns safely

async function main() {
  const auth = new google.auth.GoogleAuth({ keyFile: KEY_PATH, scopes: ["https://www.googleapis.com/auth/spreadsheets"] });
  const sheets = google.sheets({ version: "v4", auth });
  const meta = await sheets.spreadsheets.get({ spreadsheetId });
  const sheetObj = meta.data.sheets.find((s) => s.properties.title === sheetName);
  if (!sheetObj) throw new Error(`Sheet not found: ${sheetName}`);
  const sheetId = sheetObj.properties.sheetId;

  const requests = [];

  // Base pass over the whole 202-row x 11-col block: white bg, Arial 10, borders+right-align+acct format for numeric cols, wrap for col A
  requests.push({
    repeatCell: {
      range: { sheetId, startRowIndex: 0, endRowIndex: LAST_DATA_ROW, startColumnIndex: 0, endColumnIndex: 1 },
      cell: {
        userEnteredFormat: {
          backgroundColor: WHITE,
          verticalAlignment: "BOTTOM",
          wrapStrategy: "OVERFLOW_CELL",
          textFormat: { fontFamily: "Arial", fontSize: 10, bold: false },
        },
      },
      fields: "userEnteredFormat(backgroundColor,verticalAlignment,wrapStrategy,textFormat)",
    },
  });
  requests.push({
    repeatCell: {
      range: { sheetId, startRowIndex: 0, endRowIndex: LAST_DATA_ROW, startColumnIndex: 1, endColumnIndex: NUM_COLS },
      cell: {
        userEnteredFormat: {
          backgroundColor: WHITE,
          numberFormat: { type: "NUMBER", pattern: ACCT_FMT },
          horizontalAlignment: "RIGHT",
          verticalAlignment: "BOTTOM",
          wrapStrategy: "OVERFLOW_CELL",
          textFormat: { fontFamily: "Arial", fontSize: 10, bold: false },
          borders: {
            top: { style: "DASHED", width: 1, color: BORDER_COLOR },
            bottom: { style: "DASHED", width: 1, color: BORDER_COLOR },
            left: { style: "SOLID", width: 1, color: BORDER_COLOR },
            right: { style: "SOLID", width: 1, color: BORDER_COLOR },
          },
        },
      },
      fields: "userEnteredFormat(backgroundColor,numberFormat,horizontalAlignment,verticalAlignment,wrapStrategy,textFormat,borders)",
    },
  });

  // Blue header rows (1, 136, 161) across all columns
  for (const r of BLUE_HEADER_ROWS) {
    requests.push({
      repeatCell: {
        range: { sheetId, startRowIndex: r - 1, endRowIndex: r, startColumnIndex: 0, endColumnIndex: NUM_COLS },
        cell: {
          userEnteredFormat: {
            backgroundColor: BLUE,
            horizontalAlignment: "CENTER",
            textFormat: { foregroundColor: WHITE, fontFamily: "Arial", fontSize: 10, bold: true },
          },
        },
        fields: "userEnteredFormat(backgroundColor,horizontalAlignment,textFormat)",
      },
    });
    // Header rows show plain year labels ("2016"), not accounting-formatted numbers
    requests.push({
      repeatCell: {
        range: { sheetId, startRowIndex: r - 1, endRowIndex: r, startColumnIndex: 1, endColumnIndex: NUM_COLS },
        cell: { userEnteredFormat: { numberFormat: { type: "NUMBER", pattern: "0" } } },
        fields: "userEnteredFormat.numberFormat",
      },
    });
  }

  // Bold rows (text bold, keep existing bg/border/number-format from base pass)
  for (const r of BOLD_ROWS) {
    if (BLUE_HEADER_ROWS.has(r)) continue; // already bold+white text from header pass
    requests.push({
      repeatCell: {
        range: { sheetId, startRowIndex: r - 1, endRowIndex: r, startColumnIndex: 0, endColumnIndex: NUM_COLS },
        cell: { userEnteredFormat: { textFormat: { fontFamily: "Arial", fontSize: 10, bold: true } } },
        fields: "userEnteredFormat.textFormat",
      },
    });
  }

  // Optional: apply accounting number format to an appended ratio block (Định lượng sheets)
  if (ratioBlockStart) {
    requests.push({
      repeatCell: {
        range: { sheetId, startRowIndex: ratioBlockStart - 1, startColumnIndex: 1, endColumnIndex: NUM_COLS },
        cell: {
          userEnteredFormat: {
            numberFormat: { type: "NUMBER", pattern: ACCT_FMT },
            horizontalAlignment: "RIGHT",
            textFormat: { fontFamily: "Arial", fontSize: 10 },
          },
        },
        fields: "userEnteredFormat(numberFormat,horizontalAlignment,textFormat)",
      },
    });
  }

  await sheets.spreadsheets.batchUpdate({ spreadsheetId, requestBody: { requests } });
  console.log(JSON.stringify({ success: true, sheetName, requests: requests.length }, null, 2));
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
