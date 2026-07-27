#!/usr/bin/env node
const { google } = require("googleapis");
const path = require("path");

const KEY_PATH = path.join(__dirname, "..", "config", "daily-agent-490610-7eb7985b33e3.json");
const TITLE = process.argv[2];
if (!TITLE) {
  console.error("Usage: node finance-report-detail-create-spreadsheet.js '<title>'");
  process.exit(1);
}

async function main() {
  const auth = new google.auth.GoogleAuth({
    keyFile: KEY_PATH,
    scopes: ["https://www.googleapis.com/auth/drive"],
  });
  const sheets = google.sheets({ version: "v4", auth });

  const res = await sheets.spreadsheets.create({
    requestBody: {
      properties: { title: TITLE },
      sheets: [{ properties: { title: "SAB" } }],
    },
  });

  console.log(JSON.stringify({ spreadsheetId: res.data.spreadsheetId, url: res.data.spreadsheetUrl }, null, 2));
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
