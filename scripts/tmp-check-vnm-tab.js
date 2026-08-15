#!/usr/bin/env node
const { google } = require("googleapis");
const path = require("path");
const KEY_PATH = path.join(__dirname, "..", "config", "daily-agent-490610-7eb7985b33e3.json");
const config = require("../config/finance-quantification.json");
const SPREADSHEET_ID = config.shared_spreadsheet_id;

async function main() {
  const auth = new google.auth.GoogleAuth({ keyFile: KEY_PATH, scopes: ["https://www.googleapis.com/auth/spreadsheets"] });
  const sheets = google.sheets({ version: "v4", auth });
  const meta = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID });
  console.log(meta.data.sheets.map(s => `${s.properties.title} gid=${s.properties.sheetId}`).join("\n"));
}
main().catch(e => console.error(e.message));
