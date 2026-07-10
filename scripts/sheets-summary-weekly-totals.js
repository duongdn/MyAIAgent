#!/usr/bin/env node
/**
 * Read per-employee weekly totals straight from a sheet's Summary tab.
 * Usage: node scripts/sheets-summary-weekly-totals.js <SheetKey> <YYYY-MM-DD Monday>
 */
const { google } = require("googleapis");
const path = require("path");

const SVC = path.join(__dirname, "..", "config", "daily-agent-490610-7eb7985b33e3.json");

const SHEETS = {
  Maddy:        "1PHW76CuJ7nEJ3bU150iIVFsVXrQOmP5lVKgfI4ESR7I",
  JohnYi:       "1xwimT6AFGfAGpVHlDA2PYxKX405Nu77dNExWBmbnytQ",
  Rebecca:      "1wrsg-lAWDnCEFUNk4YUTcqThMN6hy7GnXWOEW_e8NJ4",
  TuanNT_Neural:"1drk_TN7-B2xD43jgErH5aWGaeCsIMtNbiIUTNbFYheg",
  CharlesChang: "19gsF1hFLeuTUZMj2JIrFsRMBvs5pLE7a7j3Q4NalITc",
  JamesDiamond: "1XUJ7Ww8dyxv6L42wtQ_7jz4GCGvBzDUXEc7YTHrKgeI",
  Rory:         "1jKz9td9NgC_Iebmr3juD5Usi_7iBTu6psXI7eEuZCm8",
  Franc:        "1RqY8DUQg0OD8wlufOO77Lg7cQ44DyonoArNHSyZztaQ",
  Aysar:        "1DCsXm5SJdIep4qjr_J_tUJPasHxPEc-tzN2q2SGsOq8",
  Generator:    "1LVj66VKCe8ShqR9YNAet-d3EgEBIUWaY0ooYSdHkeEM",
  Paturevision: "1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg",
  Fountain:     "1iIKfjAh857qzrR2xkUWPcN_9bFAwB1pL8aJWTRk4f4o",
  Elena:        "1dH14D_XShHiVPReInjZ33YDP27cIBuV0q5BS9Nx-DRQ",
};

const MONTH_NAMES = {
  January:0,February:1,March:2,April:3,May:4,June:5,
  July:6,August:7,September:8,October:9,November:10,December:11,
};
function parseDateCell(val) {
  const s = String(val).trim();
  const m2 = s.match(/^([A-Za-z]+)\s+(\d{1,2}),?\s+(\d{4})/);
  if (m2) {
    const mo = MONTH_NAMES[m2[1]];
    if (mo !== undefined) return new Date(parseInt(m2[3]), mo, parseInt(m2[2]));
  }
  const m1 = s.match(/^(\d{1,2})\/(\d{2})\/(\d{2,4})/);
  if (m1) {
    let yr = parseInt(m1[3]); if (yr < 100) yr += 2000;
    return new Date(yr, parseInt(m1[1]) - 1, parseInt(m1[2]));
  }
  return null;
}

async function main() {
  const sheetName = process.argv[2];
  const targetDateStr = process.argv[3];
  const [y, m, d] = targetDateStr.split("-").map(Number);
  const targetDate = new Date(y, m - 1, d);

  const sid = SHEETS[sheetName];
  if (!sid) { console.error("Unknown sheet: " + sheetName + ". Options: " + Object.keys(SHEETS).join(", ")); process.exit(1); }

  const auth = new google.auth.GoogleAuth({ keyFile: SVC, scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"] });
  const api = google.sheets({ version: "v4", auth: await auth.getClient() });

  const rows = (await api.spreadsheets.values.get({ spreadsheetId: sid, range: "Summary!A:AZ" })).data.values || [];

  const headerRow = rows[4] || [];
  const employeeCols = [];
  const seen = new Set();
  for (let c = 8; c < headerRow.length; c++) {
    const name = headerRow[c] ? String(headerRow[c]).trim() : "";
    if (name && !seen.has(name)) { seen.add(name); employeeCols.push({ name, col: c }); }
  }

  let weekRow = null, weekLabel = null;
  for (let i = 5; i < rows.length; i++) {
    const row = rows[i]; if (!row || !row[0]) continue;
    const tab = String(row[0]).trim();
    if (!/^W\d+/.test(tab)) continue;
    const s = parseDateCell(row[1] || ""), e = parseDateCell(row[2] || "");
    if (s && e && s <= targetDate && targetDate <= e) { weekRow = row; weekLabel = tab; break; }
  }

  if (!weekRow) { console.log(JSON.stringify({ sheet: sheetName, error: "week not found", targetDateStr })); return; }

  const result = { sheet: sheetName, week: weekLabel, totalCol_D: weekRow[3] || null, employees: {} };
  for (const { name, col } of employeeCols) {
    result.employees[name] = weekRow[col] || null;
  }
  console.log(JSON.stringify(result, null, 2));
}
main().catch(e => { console.error(e.message); process.exit(1); });
