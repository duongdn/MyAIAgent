#!/usr/bin/env node
/**
 * Apply VEA's exact collapsible row-group / column-group outline structure to a
 * target sheet with the same 202-row raw-BCTC layout. Ranges copied verbatim from
 * VEA (0-indexed, endIndex exclusive) since SAB's row positions are identical.
 *
 * Usage: node finance-report-detail-apply-row-groups.js <SPREADSHEET_ID> <SHEET_NAME>
 */
const { google } = require("googleapis");
const path = require("path");

const spreadsheetId = process.argv[2];
const sheetName = process.argv[3];
if (!spreadsheetId || !sheetName) {
  console.error("Usage: node finance-report-detail-apply-row-groups.js <SPREADSHEET_ID> <SHEET_NAME>");
  process.exit(1);
}
const KEY_PATH = path.join(__dirname, "..", "config", "daily-agent-490610-7eb7985b33e3.json");

// Copied verbatim from VEA raw sheet's rowGroups/columnGroups (spreadsheets.get includeGridData)
const ROW_GROUPS = [
  [3, 5], [6, 12], [13, 20], [21, 23], [24, 27], [28, 33], [35, 41], [42, 51], [52, 60],
  [61, 63], [64, 66], [67, 73], [74, 79], [84, 99], [100, 114], [116, 131], [132, 134],
  [136, 138], [141, 142], [144, 145], [146, 148], [149, 152], [153, 155], [157, 158],
  [159, 160], [163, 169], [170, 179], [181, 188], [190, 197],
];
const COLLAPSED_ROW_GROUP = [149, 152];
const COLUMN_GROUPS = [[1, 4]];

async function main() {
  const auth = new google.auth.GoogleAuth({ keyFile: KEY_PATH, scopes: ["https://www.googleapis.com/auth/spreadsheets"] });
  const sheets = google.sheets({ version: "v4", auth });
  const meta = await sheets.spreadsheets.get({ spreadsheetId });
  const sheetObj = meta.data.sheets.find((s) => s.properties.title === sheetName);
  if (!sheetObj) throw new Error(`Sheet not found: ${sheetName}`);
  const sheetId = sheetObj.properties.sheetId;

  const requests = [];
  for (const [startIndex, endIndex] of ROW_GROUPS) {
    requests.push({ addDimensionGroup: { range: { sheetId, dimension: "ROWS", startIndex, endIndex } } });
  }
  for (const [startIndex, endIndex] of COLUMN_GROUPS) {
    requests.push({ addDimensionGroup: { range: { sheetId, dimension: "COLUMNS", startIndex, endIndex } } });
  }

  await sheets.spreadsheets.batchUpdate({ spreadsheetId, requestBody: { requests } });

  // VEA's "collapsed" look actually comes from hiddenByUser on every row/column inside
  // each group (the group's own `collapsed` flag is set on only one group and isn't
  // what drives the visual state) — replicate that here so groups open collapsed.
  const hideRequests = [];
  for (const [startIndex, endIndex] of ROW_GROUPS) {
    hideRequests.push({
      updateDimensionProperties: { range: { sheetId, dimension: "ROWS", startIndex, endIndex }, properties: { hiddenByUser: true }, fields: "hiddenByUser" },
    });
  }
  for (const [startIndex, endIndex] of COLUMN_GROUPS) {
    hideRequests.push({
      updateDimensionProperties: { range: { sheetId, dimension: "COLUMNS", startIndex, endIndex }, properties: { hiddenByUser: true }, fields: "hiddenByUser" },
    });
  }
  const [cs, ce] = COLLAPSED_ROW_GROUP;
  hideRequests.push({
    updateDimensionGroup: {
      dimensionGroup: { range: { sheetId, dimension: "ROWS", startIndex: cs, endIndex: ce }, depth: 1, collapsed: true },
      fields: "collapsed",
    },
  });
  await sheets.spreadsheets.batchUpdate({ spreadsheetId, requestBody: { requests: hideRequests } });

  console.log(JSON.stringify({ success: true, sheetName, rowGroups: ROW_GROUPS.length, columnGroups: COLUMN_GROUPS.length, collapsedByDefault: true }, null, 2));
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
