#!/usr/bin/env node
/**
 * Fetch per-employee Actual hours from a Summary tab for a target Monday.
 * Summary tab layout: row 5 = employee names repeating every 4 cols from col I (actual, self-rated, charged, rate%).
 * Row 6+ = week rows: A=W{n}, B=start date, D=total actual.
 *
 * Usage:
 *   node scripts/sheets-summary-employee-fetch.js <sheetId> <YYYY-MM-DD-monday>
 */
const { google } = require("googleapis");
const path = require("path");

const SVC = path.join(__dirname, "..", "config", "daily-agent-490610-7eb7985b33e3.json");
const sheetId = process.argv[2];
const targetMonday = process.argv[3];

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
function parseDateCell(val) {
  if (!val) return null;
  const m = String(val).trim().match(/^(\w+)\s+(\d{1,2}),\s*(\d{4})$/);
  if (!m) return null;
  const monthIdx = MONTHS.indexOf(m[1]);
  if (monthIdx === -1) return null;
  return `${m[3]}-${String(monthIdx + 1).padStart(2, "0")}-${String(m[2]).padStart(2, "0")}`;
}

async function main() {
  const auth = new google.auth.GoogleAuth({ keyFile: SVC, scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"] });
  const client = await auth.getClient();
  const api = google.sheets({ version: "v4", auth: client });

  const headerRes = await api.spreadsheets.values.get({ spreadsheetId: sheetId, range: "Summary!I5:BZ5" });
  const header = headerRes.data.values?.[0] || [];

  const rowsRes = await api.spreadsheets.values.get({ spreadsheetId: sheetId, range: "Summary!A6:BZ60" });
  const rows = rowsRes.data.values || [];
  let targetRow = null;
  for (const row of rows) {
    if (parseDateCell(row[1]) === targetMonday) { targetRow = row; break; }
  }
  if (!targetRow) { console.log(JSON.stringify({ error: "no matching week row" })); return; }

  const result = { total: targetRow[3] };
  const seen = new Set();
  for (let i = 0; i < header.length; i++) {
    const name = header[i];
    if (!name || name === "#REF!" || seen.has(name)) continue;
    seen.add(name);
    const colIdx = 8 + i; // col I = index 8 in full row (A=0)
    result[name] = targetRow[colIdx] ?? "0.00";
  }
  console.log(JSON.stringify(result, null, 2));
}
main().catch(e => console.log(JSON.stringify({ error: e.message })));
