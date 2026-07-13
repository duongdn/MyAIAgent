#!/usr/bin/env node
// One-shot sheets-only scan for multiple devs (bypasses Workstream entirely).
// Reuses the exact SHEETS map + parsing logic from sheets-tasklog-scan.js.
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

function parseHours(val) {
  if (!val || ["", "-", "—", "#DIV/0!", "N/A"].includes(String(val).trim())) return 0;
  const n = parseFloat(String(val).trim().replace(",", "."));
  return isNaN(n) ? 0 : n;
}

const MONTH_NAMES = { January:0,February:1,March:2,April:3,May:4,June:5,July:6,August:7,September:8,October:9,November:10,December:11 };
function parseDateCell(val) {
  const s = String(val).trim().replace(/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s*/, "");
  const m1 = s.match(/^(\d{1,2})\/(\d{2})\/(\d{2})/);
  if (m1) return new Date(2000 + parseInt(m1[3]), parseInt(m1[2]) - 1, parseInt(m1[1]));
  const m2 = s.match(/^([A-Za-z]+)\s+(\d{1,2}),?\s+(\d{4})/);
  if (m2) { const mo = MONTH_NAMES[m2[1]]; if (mo !== undefined) return new Date(parseInt(m2[3]), mo, parseInt(m2[2])); }
  return null;
}

const DAY_PATTERN = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s*\d{1,2}\/\d{2}\/\d{2}/;
const DATE_ONLY_PATTERN = /^\d{1,2}\/\d{2}\/\d{2}/;

function findDayBlock(rows, tokens) {
  for (let i = 0; i < rows.length; i++) {
    const cell = rows[i]?.[0] ? String(rows[i][0]).trim() : "";
    if (tokens.some(t => cell.includes(t))) return i;
  }
  return -1;
}

function extractDailyHoursByOwner(rows, tokens, hoursCol = 7) {
  const startIdx = findDayBlock(rows, tokens);
  if (startIdx === -1) return { ownerHours: {}, leaveNotes: {} };
  const ownerHours = {}, leaveNotes = {};
  let globalLeave = null;
  const hdr = rows[startIdx]?.[0] ? String(rows[startIdx][0]).trim() : "";
  if (hdr.includes("Nghỉ cả ngày")) globalLeave = "Nghỉ cả ngày";
  else if (hdr.includes("Nghỉ nửa ngày")) globalLeave = "Nghỉ nửa ngày";
  for (let i = startIdx + 1; i < rows.length; i++) {
    const row = rows[i]; if (!row) continue;
    const rowA = row[0] ? String(row[0]).trim() : "";
    if (DAY_PATTERN.test(rowA)) break;
    if (DATE_ONLY_PATTERN.test(rowA) && !tokens.some(t => rowA.includes(t))) break;
    if (rowA.includes("Nghỉ cả ngày") || rowA.includes("Nghỉ nửa ngày")) {
      const o = row[6] ? String(row[6]).trim() : ""; if (o) leaveNotes[o] = rowA; continue;
    }
    const rowAL = rowA.toLowerCase();
    const isTaskRow = rowAL.includes("task dự án") || rowAL.includes("task du an");
    const owner = row[6] ? String(row[6]).trim() : "";
    if (!isTaskRow && !(rowA === "" && owner)) continue;
    if (!owner) continue;
    ownerHours[owner] = (ownerHours[owner] || 0) + parseHours(row[hoursCol] || "");
  }
  if (globalLeave && !Object.keys(leaveNotes).length) leaveNotes["ALL"] = globalLeave;
  return { ownerHours, leaveNotes };
}

async function fetchRange(api, id, range) {
  try { return (await api.spreadsheets.values.get({ spreadsheetId: id, range })).data.values || []; }
  catch (e) { return null; }
}

async function discoverWeekTab(api, id, targetDate) {
  const rows = await fetchRange(api, id, "Summary!A:E");
  if (!rows) return null;
  for (const row of rows) {
    if (!row?.[0]) continue;
    const tab = String(row[0]).trim();
    if (!/^W\d+/.test(tab)) continue;
    const s = parseDateCell(String(row[1] || "")), e = parseDateCell(String(row[2] || ""));
    if (s && e && s <= targetDate && targetDate <= e) return tab;
  }
  return null;
}

function dateTokens(d) {
  const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yy = String(d.getFullYear()).slice(2);
  return [`${days[d.getDay()]}, ${dd}/${mm}/${yy}`, `${dd}/${mm}/${yy}`];
}

async function main() {
  const dateStr = process.argv[2];
  const devs = process.argv.slice(3);
  const [y, m, d] = dateStr.split("-").map(Number);
  const targetDate = new Date(y, m - 1, d);
  const tokens = dateTokens(targetDate);

  const auth = new google.auth.GoogleAuth({ keyFile: SVC, scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"] });
  const api = google.sheets({ version: "v4", auth: await auth.getClient() });

  const result = {};
  for (const dev of devs) result[dev] = {};

  for (const [sname, sid] of Object.entries(SHEETS)) {
    const tab = await discoverWeekTab(api, sid, targetDate);
    if (!tab) { process.stderr.write(`  ${sname}: no week tab found\n`); continue; }
    const rows = await fetchRange(api, sid, `${tab}!A:I`);
    if (!rows) { process.stderr.write(`  ${sname}: fetch failed\n`); continue; }
    const { ownerHours, leaveNotes } = extractDailyHoursByOwner(rows, tokens);
    for (const dev of devs) {
      const matchKeys = Object.keys(ownerHours).filter(k => k.toLowerCase().includes(dev.toLowerCase()));
      const hours = matchKeys.reduce((acc, k) => acc + ownerHours[k], 0);
      if (hours > 0) result[dev][sname] = hours;
      if (leaveNotes[dev]) result[dev]._leave = leaveNotes[dev];
    }
    // small delay to avoid rate limits
    await new Promise(r => setTimeout(r, 150));
  }
  console.log(JSON.stringify(result, null, 2));
}

main();
