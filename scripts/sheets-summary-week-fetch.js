#!/usr/bin/env node
/**
 * Fetch Summary!A6:D60 from one or more sheets, matching col B date to a target Monday.
 * Used by Monday report to pull "Total Dev Hours" (col D, Actual) per project.
 *
 * Usage:
 *   node scripts/sheets-summary-week-fetch.js <YYYY-MM-DD> '{"Name":"sheetId",...}'
 */
const { google } = require("googleapis");
const path = require("path");

const SVC = path.join(__dirname, "..", "config", "daily-agent-490610-7eb7985b33e3.json");
const targetMonday = process.argv[2];
const sheets = JSON.parse(process.argv[3]);

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
function parseDateCell(val) {
  if (!val) return null;
  const m = String(val).trim().match(/^(\w+)\s+(\d{1,2}),\s*(\d{4})$/);
  if (!m) return null;
  const monthIdx = MONTHS.indexOf(m[1]);
  if (monthIdx === -1) return null;
  const day = String(m[2]).padStart(2, "0");
  const month = String(monthIdx + 1).padStart(2, "0");
  return `${m[3]}-${month}-${day}`;
}

async function main() {
  const auth = new google.auth.GoogleAuth({
    keyFile: SVC,
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });
  const client = await auth.getClient();
  const api = google.sheets({ version: "v4", auth: client });

  const results = {};
  for (const [name, sheetId] of Object.entries(sheets)) {
    try {
      const res = await api.spreadsheets.values.get({
        spreadsheetId: sheetId,
        range: "Summary!A6:D60",
      });
      const rows = res.data.values || [];
      let match = null;
      for (const row of rows) {
        const [week, startDate, endDate, actual] = row;
        if (parseDateCell(startDate) === targetMonday) {
          match = { actual, startDate, endDate };
          break;
        }
      }
      results[name] = match || { error: "no matching week row found" };
    } catch (e) {
      results[name] = { error: e.message };
    }
  }
  console.log(JSON.stringify(results, null, 2));
}
main();
