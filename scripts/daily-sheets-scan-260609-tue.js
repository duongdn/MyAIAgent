#!/usr/bin/env node
/**
 * Daily sheets scan for 2026-06-09 (Tuesday) — W30 (June 8-14, 2026).
 * Fix: KhanhHH weeklyTotal is now owner-specific (Generator + Aysar), not full project sum.
 * Fix: Aysar daily hours included in KhanhHH today total.
 * LongVV: part-time 16h/wk.
 */

const { google } = require("googleapis");
const path = require("path");

const SVC = path.join(__dirname, "..", "config", "daily-agent-490610-7eb7985b33e3.json");

const SHEETS = {
  Maddy:        "1PHW76CuJ7nEJ3bU150iIVFsVXrQOmP5lVKgfI4ESR7I",
  JohnYi:       "1xwimT6AFGfAGpVHlDA2PYxKX405Nu77dNExWBmbnytQ",
  Rebecca:      "1wrsg-lAWDnCEFUNk4YUTcqThMN6hy7GnXWOEW_e8NJ4",
  TuanNT_Neural:"1drk_TN7-B2xD43jgErH5aWGaeCsIMtNbiIUTNbFYheg",
  JamesDiamond: "1XUJ7Ww8dyxv6L42wtQ_7jz4GCGvBzDUXEc7YTHrKgeI",
  Rory:         "1jKz9td9NgC_Iebmr3juD5Usi_7iBTu6psXI7eEuZCm8",
  Franc:        "1RqY8DUQg0OD8wlufOO77Lg7cQ44DyonoArNHSyZztaQ",
  Aysar:        "1DCsXm5SJdIep4qjr_J_tUJPasHxPEc-tzN2q2SGsOq8",
  Generator:    "1LVj66VKCe8ShqR9YNAet-d3EgEBIUWaY0ooYSdHkeEM",
  Paturevision: "1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg",
  Elena:        "1dH14D_XShHiVPReInjZ33YDP27cIBuV0q5BS9Nx-DRQ",
};

const FALLBACK_TABS = {
  Maddy: "W9", JohnYi: "W30", Rebecca: "W30", JamesDiamond: "W28",
  Rory: "W14", Franc: "W27", Aysar: "W28", Generator: "W44",
  Paturevision: "W30", Elena: null, TuanNT_Neural: "W24",
};

const MON_TOKENS = ["Mon, 08/06/26", "08/06/26", "Mon, 8/06/26"]; // Jun 8 (yesterday)
const TUE_TOKENS = ["Tue, 09/06/26", "09/06/26", "Tue, 9/06/26"]; // Jun 9 (today)
const TARGET_DATE = new Date(2026, 5, 9);  // June 9, 2026 — today (for leave notes, Jun 9 hours)
const PREV_DATE   = new Date(2026, 5, 8);  // June 8, 2026 — yesterday (for daily hours report)

function parseHours(val) {
  if (!val || ["", "-", "—", "#DIV/0!", "N/A"].includes(String(val).trim())) return 0;
  const n = parseFloat(String(val).trim().replace(",", "."));
  return isNaN(n) ? 0 : n;
}

const MONTH_NAMES = { January:0,February:1,March:2,April:3,May:4,June:5,July:6,August:7,September:8,October:9,November:10,December:11 };
function parseDateCell(val) {
  const s = String(val).trim().replace(/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s*/, "");
  // Format: DD/MM/YY
  const m1 = s.match(/^(\d{1,2})\/(\d{2})\/(\d{2})/);
  if (m1) return new Date(2000 + parseInt(m1[3]), parseInt(m1[2]) - 1, parseInt(m1[1]));
  // Format: Month D, YYYY (e.g. "June 8, 2026")
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
      const owner = (row[6] ? String(row[6]).trim() : "") || "ALL";
      leaveNotes[owner] = rowA;
      if (owner === "ALL") globalLeave = rowA;
      continue;
    }
    const rowAL = rowA.toLowerCase();
    if (!rowAL.includes("task dự án") && !rowAL.includes("task du an")) continue;
    const owner = row[6] ? String(row[6]).trim() : "";
    if (!owner) continue;
    ownerHours[owner] = (ownerHours[owner] || 0) + parseHours(row[hoursCol] || "");
  }
  if (globalLeave && !Object.keys(leaveNotes).length) leaveNotes["ALL"] = globalLeave;
  return { ownerHours, leaveNotes, err: null };
}

async function fetchRange(api, id, range) {
  try { return (await api.spreadsheets.values.get({ spreadsheetId: id, range })).data.values || []; }
  catch (e) { return [["ERROR: " + e.message]]; }
}

async function discoverWeekTab(api, id, targetDate, fallback) {
  try {
    const rows = await fetchRange(api, id, "Summary!A:E");
    for (const row of rows) {
      if (!row?.[0]) continue;
      const tab = String(row[0]).trim();
      if (!/^W\d+/.test(tab)) continue;
      const s = parseDateCell(String(row[1] || "")), e = parseDateCell(String(row[2] || ""));
      if (s && e && s <= targetDate && targetDate <= e) {
        process.stderr.write(`  ${tab} (${s.toISOString().slice(0,10)}→${e.toISOString().slice(0,10)}) ✓\n`);
        return tab;
      }
    }
  } catch (e) { process.stderr.write(`  discovery err: ${e.message}\n`); }
  if (fallback) {
    try {
      const t = await fetchRange(api, id, `${fallback}!A1:A3`);
      if (t.length && !String(t[0]).includes("ERROR")) {
        process.stderr.write(`  fallback: ${fallback}\n`);
        return fallback;
      }
    } catch (e) {}
  }
  return null;
}

/** Owner-specific weekly total: scans all rows in the tab, filters by ownerSubstr. */
async function getOwnerWeeklyTotal(api, id, tab, ownerSubstr) {
  if (!tab) return null;
  try {
    const rows = await fetchRange(api, id, `${tab}!A:I`);
    if (!rows.length || String(rows[0]).includes("ERROR")) return null;
    let total = 0;
    for (const row of rows) {
      if (!row) continue;
      const rowAL = String(row[0] || "").trim().toLowerCase();
      if (!rowAL.includes("task dự án") && !rowAL.includes("task du an")) continue;
      const owner = row[6] ? String(row[6]).trim() : "";
      if (!owner.includes(ownerSubstr)) continue;
      total += parseHours(row[7] || "");
    }
    return total;
  } catch (e) { process.stderr.write(`  ownerWeekly err (${ownerSubstr}): ${e.message}\n`); }
  return null;
}

async function checkRebeccaLeNH(api, id, tab, tokens) {
  const rows = await fetchRange(api, id, `${tab}!A:T`);
  if (!rows.length || String(rows[0]).includes("ERROR"))
    return { leNHHours: 0, ownerHours: {}, leaveNotes: {}, err: String(rows[0] || "empty") };
  const startIdx = findDayBlock(rows, tokens);
  if (startIdx === -1) return { leNHHours: 0, ownerHours: {}, leaveNotes: {}, err: "DATE_NOT_FOUND" };
  let leNHHours = 0; const ownerHours = {}, leaveNotes = {};
  for (let i = startIdx + 1; i < rows.length; i++) {
    const row = rows[i]; if (!row) continue;
    const rowA = row[0] ? String(row[0]).trim() : "";
    if (DAY_PATTERN.test(rowA)) break;
    if (DATE_ONLY_PATTERN.test(rowA) && !tokens.some(t => rowA.includes(t))) break;
    if (rowA.includes("Nghỉ cả ngày") || rowA.includes("Nghỉ nửa ngày")) {
      const o = row[6] ? String(row[6]).trim() : ""; if (o) leaveNotes[o] = rowA; continue;
    }
    const rowAL = rowA.toLowerCase();
    if (!rowAL.includes("task dự án") && !rowAL.includes("task du an")) continue;
    const owner = row[6] ? String(row[6]).trim() : "";
    const h = parseHours(row[7] || "");
    if (owner && h > 0) ownerHours[owner] = (ownerHours[owner] || 0) + h;
    for (let ci = 16; ci <= 19; ci++) leNHHours += parseHours(row[ci] || "");
  }
  return { leNHHours, ownerHours, leaveNotes, err: null };
}

const sum = obj => Object.values(obj).reduce((a, b) => a + b, 0);

async function main() {
  const auth = new google.auth.GoogleAuth({ keyFile: SVC, scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"] });
  const api = google.sheets({ version: "v4", auth: await auth.getClient() });
  const tokens = TUE_TOKENS;
  const results = {};

  process.stderr.write("Discovering week tabs...\n");
  const tabs = {};
  for (const [name, id] of Object.entries(SHEETS)) {
    process.stderr.write(`  ${name}...\n`);
    tabs[name] = await discoverWeekTab(api, id, TARGET_DATE, FALLBACK_TABS[name]);
    process.stderr.write(`  ${name} → ${tabs[name]}\n`);
  }

  // TuanNT — scans JohnYi + Rebecca + Paturevision + Neural for PREV_DATE (Jun 8 = yesterday).
  // Scrin tracks Nick (nick@nustechnology.com), NOT TuanNT.
  process.stderr.write("TuanNT...\n");
  let jyH = {}, jyL = {}, jyE = null;
  if (tabs.JohnYi) ({ ownerHours: jyH, leaveNotes: jyL, err: jyE } = extractDailyHoursByOwner(await fetchRange(api, SHEETS.JohnYi, `${tabs.JohnYi}!A:I`), MON_TOKENS));
  let rbH = {}, rbL = {}, rbE = null;
  if (tabs.Rebecca) ({ ownerHours: rbH, leaveNotes: rbL, err: rbE } = extractDailyHoursByOwner(await fetchRange(api, SHEETS.Rebecca, `${tabs.Rebecca}!A:I`), MON_TOKENS));
  let patAll = {}, patL = {}, patE = null;
  if (tabs.Paturevision) ({ ownerHours: patAll, leaveNotes: patL, err: patE } = extractDailyHoursByOwner(await fetchRange(api, SHEETS.Paturevision, `${tabs.Paturevision}!A:I`), MON_TOKENS));
  const patTuant = Object.fromEntries(Object.entries(patAll).filter(([k]) => k.includes("TuanNT")));
  let neuralH = {}, neuralE = null;
  if (tabs.TuanNT_Neural) ({ ownerHours: neuralH, err: neuralE } = extractDailyHoursByOwner(await fetchRange(api, SHEETS.TuanNT_Neural, `${tabs.TuanNT_Neural}!A:I`), MON_TOKENS));
  const neuralTuant = Object.fromEntries(Object.entries(neuralH).filter(([k]) => k.includes("TuanNT")));
  results.TuanNT = {
    johnyiHours: sum(jyH), rebeccaHours: sum(rbH), paturevisionHours: sum(patTuant), neuralHours: sum(neuralTuant),
    totalHours: sum(jyH) + sum(rbH) + sum(patTuant) + sum(neuralTuant),
    johnyiLeave: jyL, rebeccaLeave: rbL,
    johnyiOwners: jyH, rebeccaOwners: rbH, patOwners: patTuant, neuralOwners: neuralTuant,
    note: "Hours are for Jun 8 (PREV_DATE). Scrin tracks Nick (nick@), NOT TuanNT.",
  };

  // PhucVT
  let jdH = {}, jdL = {}, jdE = null;
  if (tabs.JamesDiamond) ({ ownerHours: jdH, leaveNotes: jdL, err: jdE } = extractDailyHoursByOwner(await fetchRange(api, SHEETS.JamesDiamond, `${tabs.JamesDiamond}!A:I`), tokens));
  results.PhucVT = { todayHours: sum(jdH), leave: jdL, err: jdE, owners: jdH };

  // VietPH (Paturevision, already fetched)
  const vietphH = Object.fromEntries(Object.entries(patAll).filter(([k]) => k.toLowerCase().includes("vietph")));
  const nonTuantHrs = sum(patAll) - sum(patTuant);
  results.VietPH = {
    todayHours: sum(vietphH) || (Object.keys(vietphH).length === 0 && nonTuantHrs > 0 ? nonTuantHrs : 0),
    leave: patL, err: patE, allOwners: patAll,
  };

  // KhanhHH — Generator (today) + Aysar (today); weekly = owner-specific scan of both sheets
  process.stderr.write("KhanhHH...\n");
  let genH = {}, genL = {}, genE = null;
  if (tabs.Generator) ({ ownerHours: genH, leaveNotes: genL, err: genE } = extractDailyHoursByOwner(await fetchRange(api, SHEETS.Generator, `${tabs.Generator}!A:I`), tokens));
  let aysarAllH = {}, aysarL = {}, aysarE = null;
  if (tabs.Aysar) ({ ownerHours: aysarAllH, leaveNotes: aysarL, err: aysarE } = extractDailyHoursByOwner(await fetchRange(api, SHEETS.Aysar, `${tabs.Aysar}!A:I`), tokens));
  let elenaAll = {}, elenaL = {}, elenaE = null;
  if (tabs.Elena) ({ ownerHours: elenaAll, leaveNotes: elenaL, err: elenaE } = extractDailyHoursByOwner(await fetchRange(api, SHEETS.Elena, `${tabs.Elena}!A:I`), tokens));
  const khGen = Object.fromEntries(Object.entries(genH).filter(([k]) => k.includes("KhanhHH")));
  const khAysar = Object.fromEntries(Object.entries(aysarAllH).filter(([k]) => k.includes("KhanhHH")));
  const khElena = Object.fromEntries(Object.entries(elenaAll).filter(([k]) => k.includes("KhanhHH")));
  // Weekly: sum KhanhHH-only rows across Generator + Aysar tabs (not project summary)
  const [khGenWeekly, khAysarWeekly] = await Promise.all([
    getOwnerWeeklyTotal(api, SHEETS.Generator, tabs.Generator, "KhanhHH"),
    getOwnerWeeklyTotal(api, SHEETS.Aysar, tabs.Aysar, "KhanhHH"),
  ]);
  const khWeeklyTotal = (khGenWeekly || 0) + (khAysarWeekly || 0);
  results.KhanhHH = {
    generatorHours: sum(khGen),
    aysarHours: sum(khAysar),
    elenaHours: sum(khElena),
    totalHours: sum(khGen) + sum(khAysar) + sum(khElena),
    weeklyTotal: khWeeklyTotal,
    weeklyBreakdown: { generator: khGenWeekly, aysar: khAysarWeekly },
    leave: { ...genL, ...aysarL },
    err: genE || aysarE || null,
    generatorOwners: genH, aysarOwners: aysarAllH, elenaOwners: elenaAll,
  };
  results.Elena = { tab: tabs.Elena, todayHours: sum(elenaAll), owners: elenaAll, leave: elenaL, err: elenaE };

  // LeNH — Rory, Franc, Rebecca only (Aysar owner = KhanhHH, not LeNH)
  process.stderr.write("LeNH...\n");
  let roryH = {}, roryL = {}, roryE = null;
  if (tabs.Rory) ({ ownerHours: roryH, leaveNotes: roryL, err: roryE } = extractDailyHoursByOwner(await fetchRange(api, SHEETS.Rory, `${tabs.Rory}!A:I`), tokens));
  let francH = {}, francL = {}, francE = null;
  if (tabs.Franc) ({ ownerHours: francH, leaveNotes: francL, err: francE } = extractDailyHoursByOwner(await fetchRange(api, SHEETS.Franc, `${tabs.Franc}!A:I`), tokens));
  let rbLeNH = 0, rbLeNHE = null;
  if (tabs.Rebecca) { const r = await checkRebeccaLeNH(api, SHEETS.Rebecca, tabs.Rebecca, tokens); rbLeNH = r.leNHHours; rbLeNHE = r.err; }
  const leNHFilter = obj => Object.fromEntries(Object.entries(obj).filter(([k]) => k.toLowerCase().includes("lenh")));
  const roryLeNH = leNHFilter(roryH);
  const francLeNH = leNHFilter(francH);
  const roryHrsLeNH = sum(roryLeNH);
  const francHrsLeNH = sum(francLeNH);
  results.LeNH = {
    roryHours: roryHrsLeNH, francHours: francHrsLeNH, rebeccaLeNHHours: rbLeNH,
    totalHours: roryHrsLeNH + francHrsLeNH + rbLeNH,
    leave: { ...roryL, ...francL },
    errors: { rory: roryE, franc: francE, rebecca: rbLeNHE },
    roryOwners: roryH, francOwners: francH,
    note: "Aysar sheet owner=KhanhHH — excluded from LeNH (see KhanhHH.aysarHours)",
  };

  // LongVV
  let longvvH = {}, maddyL = {}, maddyE = null;
  if (tabs.Maddy) ({ ownerHours: longvvH, leaveNotes: maddyL, err: maddyE } = extractDailyHoursByOwner(await fetchRange(api, SHEETS.Maddy, `${tabs.Maddy}!A:I`), tokens));
  const longvvWeekly = await getOwnerWeeklyTotal(api, SHEETS.Maddy, tabs.Maddy, "LongVV");
  results.LongVV = {
    todayHours: sum(longvvH),
    weeklyTotal: longvvWeekly,
    weeklyTarget: 16, leave: maddyL, err: maddyE, owners: longvvH,
  };

  results._tabs = tabs;
  console.log(JSON.stringify(results, null, 2));
}

main().catch(e => { console.error("FATAL:", e.message); process.exit(1); });
