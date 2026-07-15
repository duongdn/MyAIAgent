#!/usr/bin/env node
/**
 * Canonical task-log shortfall checker.
 *
 * Replaces the old pattern of copying scripts/daily-sheets-scan-YYMMDD-day.js fresh each day.
 * That pattern caused repeated false 0h/shortfall alerts (KhanhHH, LeNH) because each dated
 * copy hardcoded a per-dev subset of sheets/Workstream projects, and fixes applied to one
 * day's copy never propagated to the next day's. This script always scans the FULL sheet
 * list and the FULL live Workstream project list for whichever dev(s) you ask about, so
 * there is no per-dev subset to go stale.
 *
 * Usage:
 *   node scripts/sheets-tasklog-scan.js <YYYY-MM-DD> <devNameSubstr> [devNameSubstr2 ...]
 *
 * Example:
 *   node scripts/sheets-tasklog-scan.js 2026-06-23 KhanhHH LeNH
 */

const { google } = require("googleapis");
const path = require("path");
const fs = require("fs");

const SVC = path.join(__dirname, "..", "config", "daily-agent-490610-7eb7985b33e3.json");
const WS_CONFIG = path.join(__dirname, "..", "config", ".workstream-config.json");

// Full sheet list. Add new sheets here as they're discovered — do NOT create a new dated
// copy of this file; this is the single source of truth.
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

function parseHoursHM(s) {
  if (!s) return 0;
  const [h, m] = s.split(":").map(Number);
  return h + (m || 0) / 60;
}

const MONTH_NAMES = {
  January:0,February:1,March:2,April:3,May:4,June:5,
  July:6,August:7,September:8,October:9,November:10,December:11,
};
function parseDateCell(val) {
  const s = String(val).trim().replace(/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s*/, "");
  const m1 = s.match(/^(\d{1,2})\/(\d{2})\/(\d{2})/);
  if (m1) return new Date(2000 + parseInt(m1[3]), parseInt(m1[2]) - 1, parseInt(m1[1]));
  const m2 = s.match(/^([A-Za-z]+)\s+(\d{1,2}),?\s+(\d{4})/);
  if (m2) {
    const mo = MONTH_NAMES[m2[1]];
    if (mo !== undefined) return new Date(parseInt(m2[3]), mo, parseInt(m2[2]));
  }
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
  if (startIdx === -1) return { ownerHours: {}, leaveNotes: {}, err: "DATE_NOT_FOUND" };
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
    // Also include rows where col A is blank but col G has owner (per feedback_sheets_empty_col_a_bug)
    if (!isTaskRow && !(rowA === "" && owner)) continue;
    if (!owner) continue;
    ownerHours[owner] = (ownerHours[owner] || 0) + parseHours(row[hoursCol] || "");
  }
  if (globalLeave && !Object.keys(leaveNotes).length) leaveNotes["ALL"] = globalLeave;
  return { ownerHours, leaveNotes, err: null };
}

async function fetchRange(api, id, range) {
  try {
    return (await api.spreadsheets.values.get({ spreadsheetId: id, range })).data.values || [];
  } catch (e) {
    return [["ERROR: " + e.message]];
  }
}

// Sheets/Workstream reads have a long-documented history of intermittently
// returning empty/short results on an otherwise-valid request (same ID, same
// token, same params) - confirmed 8+ times, see feedback_check_workstream_before_flagging_shortfall.
// Retry N times and keep the longest result instead of trusting a single pass.
async function fetchWithRetry(fn, attempts = 3, delayMs = 400) {
  let best = null;
  for (let i = 0; i < attempts; i++) {
    const result = await fn();
    const len = Array.isArray(result) ? result.length : (result?.rows?.length || 0);
    const bestLen = Array.isArray(best) ? best.length : (best?.rows?.length || 0);
    if (best === null || len > bestLen) best = result;
    if (len > 0) break; // got real data, no need to keep retrying
    if (i < attempts - 1) await new Promise(r => setTimeout(r, delayMs));
  }
  return best;
}

async function discoverWeekTab(api, id, targetDate) {
  try {
    const rows = await fetchRange(api, id, "Summary!A:E");
    for (const row of rows) {
      if (!row?.[0]) continue;
      const tab = String(row[0]).trim();
      if (!/^W\d+/.test(tab)) continue;
      const s = parseDateCell(String(row[1] || "")), e = parseDateCell(String(row[2] || ""));
      if (s && e && s <= targetDate && targetDate <= e) return tab;
    }
  } catch (e) { /* fall through */ }
  return null;
}

function dateTokens(d) {
  const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yy = String(d.getFullYear()).slice(2);
  return [`${days[d.getDay()]}, ${dd}/${mm}/${yy}`, `${dd}/${mm}/${yy}`];
}

// ---- Workstream ----

async function ensureWorkstreamToken() {
  const config = JSON.parse(fs.readFileSync(WS_CONFIG, "utf8"));
  const res = await fetch(config.api_base + "/me", { headers: { Authorization: "Bearer " + config.access_token } });
  if (res.status === 200) return config;
  process.stderr.write("  [workstream] token expired, refreshing via SSO...\n");
  const { execSync } = require("child_process");
  execSync(`DISPLAY=:1 node ${path.join(__dirname, "workstream-login.js")}`, { stdio: "inherit" });
  return JSON.parse(fs.readFileSync(WS_CONFIG, "utf8"));
}

async function listWorkstreamProjects(config, date) {
  const res = await fetch(`${config.api_base}/time/projects?date=${date}`, {
    headers: { Authorization: "Bearer " + config.access_token },
  });
  if (res.status !== 200) return [];
  const data = await res.json();
  return (data.projects || []).map(p => ({ id: p.projectId, name: p.projectName }));
}

async function fetchWorkstreamWeek(config, projectId, date) {
  const res = await fetch(`${config.api_base}/review/week?projectId=${projectId}&date=${date}`, {
    headers: { Authorization: "Bearer " + config.access_token },
  });
  if (res.status !== 200) return { rows: [], err: "HTTP " + res.status };
  const data = await res.json();
  return { rows: data.rows || [], err: null };
}

const sum = obj => Object.values(obj).reduce((a, b) => a + b, 0);

async function main() {
  const dateStr = process.argv[2];
  const devs = process.argv.slice(3);
  if (!dateStr || devs.length === 0) {
    console.error("Usage: node scripts/sheets-tasklog-scan.js <YYYY-MM-DD> <devNameSubstr> [devNameSubstr2 ...]");
    process.exit(1);
  }
  const [y, m, d] = dateStr.split("-").map(Number);
  const targetDate = new Date(y, m - 1, d);
  const tokens = dateTokens(targetDate);

  const auth = new google.auth.GoogleAuth({
    keyFile: SVC,
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });
  const api = google.sheets({ version: "v4", auth: await auth.getClient() });

  const result = {};
  for (const dev of devs) result[dev] = { sheets: {}, workstream: {}, leave: {}, sheetsTotal: 0, workstreamTotal: 0 };

  process.stderr.write(`Scanning ALL ${Object.keys(SHEETS).length} sheets for ${dateStr}...\n`);
  for (const [sname, sid] of Object.entries(SHEETS)) {
    const tab = await discoverWeekTab(api, sid, targetDate);
    if (!tab) { process.stderr.write(`  ${sname}: no week tab found for date\n`); continue; }
    const rows = await fetchWithRetry(() => fetchRange(api, sid, `${tab}!A:I`));
    const { ownerHours, leaveNotes } = extractDailyHoursByOwner(rows, tokens);
    for (const dev of devs) {
      const matchKeys = Object.keys(ownerHours).filter(k => k.toLowerCase() === dev.toLowerCase());
      const hours = matchKeys.reduce((acc, k) => acc + ownerHours[k], 0);
      if (hours > 0) result[dev].sheets[sname] = hours;
      const leaveKeys = Object.keys(leaveNotes).filter(k => k.toLowerCase() === dev.toLowerCase() || k === "ALL");
      leaveKeys.forEach(k => { result[dev].leave[`${sname}:${k}`] = leaveNotes[k]; });
    }
  }

  process.stderr.write(`Live-querying Workstream project list for ${dateStr}...\n`);
  let wsProjects = [];
  try {
    const wsConfig = await ensureWorkstreamToken();
    wsProjects = await listWorkstreamProjects(wsConfig, dateStr);
    process.stderr.write(`  ${wsProjects.length} projects accessible: ${wsProjects.map(p => p.name).join(", ")}\n`);
    for (const proj of wsProjects) {
      const { rows, err } = await fetchWithRetry(() => fetchWorkstreamWeek(wsConfig, proj.id, dateStr));
      if (err && rows.length === 0) { process.stderr.write(`  ${proj.name}: ${err}\n`); continue; }
      for (const dev of devs) {
        const matched = rows.filter(r => r.date === dateStr && (r.employeeName || "").toLowerCase() === dev.toLowerCase());
        const hours = matched.reduce((acc, r) => acc + parseHoursHM(r.actual || "0:00"), 0);
        if (hours > 0) result[dev].workstream[proj.name] = hours;
      }
    }
  } catch (e) {
    process.stderr.write(`  [workstream] unavailable: ${e.message} — Sheets-only results follow\n`);
    for (const dev of devs) result[dev].workstreamUnavailable = true;
  }

  for (const dev of devs) {
    result[dev].sheetsTotal = sum(result[dev].sheets);
    result[dev].workstreamTotal = sum(result[dev].workstream);
    result[dev].grandTotal = result[dev].sheetsTotal + result[dev].workstreamTotal;
  }

  console.log(JSON.stringify(result, null, 2));
}

main().catch(e => { console.error(e); process.exit(1); });
