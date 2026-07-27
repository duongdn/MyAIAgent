#!/usr/bin/env node
/**
 * Apply basic readability formatting (freeze header, wrap text, column widths,
 * bold section headers) to the qualitative/narrative sheets. Not a pixel-exact
 * replication of FPT's visual style (merges/colors/hyperlinks) — that remains a
 * follow-up pass if requested.
 */
const { google } = require("googleapis");
const path = require("path");

const spreadsheetId = process.argv[2];
const ticker = process.argv[3];
const KEY_PATH = path.join(__dirname, "..", "config", "daily-agent-490610-7eb7985b33e3.json");

const sheetNames = [`Định tính - ${ticker}`, `Định giá - ${ticker}`, `Benjamin Graham - ${ticker}`, `Báo cáo 2 - ${ticker}`];

async function main() {
  const auth = new google.auth.GoogleAuth({ keyFile: KEY_PATH, scopes: ["https://www.googleapis.com/auth/spreadsheets"] });
  const sheets = google.sheets({ version: "v4", auth });
  const meta = await sheets.spreadsheets.get({ spreadsheetId });

  const requests = [];
  for (const name of sheetNames) {
    const s = meta.data.sheets.find((x) => x.properties.title === name);
    if (!s) continue;
    const sheetId = s.properties.sheetId;
    requests.push({
      updateDimensionProperties: { range: { sheetId, dimension: "COLUMNS", startIndex: 0, endIndex: 1 }, properties: { pixelSize: 220 }, fields: "pixelSize" },
    });
    if (name.includes("Định tính") || name.includes("Báo cáo 2")) {
      requests.push({
        updateDimensionProperties: { range: { sheetId, dimension: "COLUMNS", startIndex: 1, endIndex: 3 }, properties: { pixelSize: 700 }, fields: "pixelSize" },
      });
    }
    requests.push({
      repeatCell: {
        range: { sheetId },
        cell: { userEnteredFormat: { wrapStrategy: "WRAP", verticalAlignment: "TOP" } },
        fields: "userEnteredFormat.wrapStrategy,userEnteredFormat.verticalAlignment",
      },
    });
    requests.push({
      repeatCell: {
        range: { sheetId, startRowIndex: 0, endRowIndex: 1 },
        cell: { userEnteredFormat: { textFormat: { bold: true, fontSize: 13 } } },
        fields: "userEnteredFormat.textFormat",
      },
    });
  }

  if (requests.length) {
    await sheets.spreadsheets.batchUpdate({ spreadsheetId, requestBody: { requests } });
  }
  console.log(JSON.stringify({ success: true, formatted: sheetNames.filter((n) => meta.data.sheets.some((x) => x.properties.title === n)) }, null, 2));
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
