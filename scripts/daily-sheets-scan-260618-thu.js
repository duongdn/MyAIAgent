#!/usr/bin/env node
/**
 * Daily sheets scan for 2026-06-18 (Thursday) — checking June 17 (PREV_DATE, Wednesday) hours.
 * W28 (June 15-21, 2026).
 */

const { google } = require("googleapis");
const path = require("path");

const SVC = path.join(__dirname, "..", "config", "daily-agent-490610-7eb7985b33e3.json");

const SHEETS = {
  Maddy:        "1PHW76CuJ7nEJ3bU150iIVFsVXrQOmP5lVKgfI4ESR7I",
  JohnYi:       "1xwimT6AFGfAGpVHlDA2PYxKX405Nu77dNExWBmbnytQ",
  Rebecca:      "1wrsg-lAWDnCEFUNk4YUTcqThMN6hy7GnXWOEW_e8NJ4",
  TuanNT_Neural:"1drk_TN7-B2xD43jgErH5aWGaeCsIMtNbiIUTNbFYheg",
  CharlesChang: "19gsF1hFLeuTUZMj2JIrFsRMBvs5pLE7a7j3Q4NalITc", // TuanNT 5th sheet — Family App V2
  JamesDiamond: "1XUJ7Ww8dyxv6L42wtQ_7jz4GCGvBzDUXEc7YTHrKgeI",
  Rory:         "1jKz9td9NgC_Iebmr3juD5Usi_7iBTu6psXI7eEuZCm8",
  Franc:        "1RqY8DUQg0OD8wlufOO77Lg7cQ44DyonoArNHSyZztaQ",
  Aysar:        "1DCsXm5SJdIep4qjr_J_tUJPasHxPEc-tzN2q2SGsOq8",
  Generator:    "1LVj66VKCe8ShqR9YNAet-d3EgEBIUWaY0ooYSdHkeEM",
  Paturevision: "1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg",
  Elena:        "1dH14D_XShHiVPReInjZ33YDP27cIBuV0q5BS9Nx-DRQ",
};

const FALLBACK_TABS = {
  Maddy: "W9", JohnYi: "W28", Rebecca: "W28", JamesDiamond: "W28",
  Rory: "W15", Franc: "W27", Aysar: "W28", Generator: "W45",
  Paturevision: "W28", Elena: null, TuanNT_Neural: "W24",
  CharlesChang: "W48", // Jun 15-21, 2026 in this sheet's per-project W-numbering
};

// Jun 17 (PREV_DATE, Wednesday) — what we scan for hours
const PREV_TOKENS = ["Wed, 17/06/26", "17/06/26"];
const TARGET_DATE = new Date(2026, 5, 18); // June 18, 2026 — used for week tab discovery
const PREV_DATE   = new Date(2026, 5, 17); // June 17, 2026 — daily hours to report

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
    const isTaskRow = rowAL.includes("task dự án") || rowAL.includes("task du an");
    const owner = row[6] ? String(row[6]).trim() : "";
    if (!isTaskRow && !(rowA === "" && owner)) continue;
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
  const tokens = PREV_TOKENS;
  const results = {};

  process.stderr.write("Discovering week tabs...\n");
  const tabs = {};
  for (const [name, id] of Object.entries(SHEETS)) {
    process.stderr.write(`  ${name}...\n`);
    tabs[name] = await discoverWeekTab(api, id, TARGET_DATE, FALLBACK_TABS[name]);
    process.stderr.write(`  ${name} → ${tabs[name]}\n`);
  }

  // TuanNT — 5 sheets
  process.stderr.write("TuanNT...\n");
  let jyH = {}, jyL = {}, jyE = null;
  if (tabs.JohnYi) ({ ownerHours: jyH, leaveNotes: jyL, err: jyE } = extractDailyHoursByOwner(await fetchRange(api, SHEETS.JohnYi, `${tabs.JohnYi}!A:I`), tokens));
  let rbH = {}, rbL = {}, rbE = null;
  if (tabs.Rebecca) ({ ownerHours: rbH, leaveNotes: rbL, err: rbE } = extractDailyHoursByOwner(await fetchRange(api, SHEETS.Rebecca, `${tabs.Rebecca}!A:I`), tokens));
  let patAll = {}, patL = {}, patE = null;
  if (tabs.Paturevision) ({ ownerHours: patAll, leaveNotes: patL, err: patE } = extractDailyHoursByOwner(await fetchRange(api, SHEETS.Paturevision, `${tabs.Paturevision}!A:I`), tokens));
  const patTuant = Object.fromEntries(Object.entries(patAll).filter(([k]) => k.includes("TuanNT")));
  let neuralH = {}, neuralE = null;
  if (tabs.TuanNT_Neural) ({ ownerHours: neuralH, err: neuralE } = extractDailyHoursByOwner(await fetchRange(api, SHEETS.TuanNT_Neural, `${tabs.TuanNT_Neural}!A:I`), tokens));
  const neuralTuant = Object.fromEntries(Object.entries(neuralH).filter(([k]) => k.includes("TuanNT")));
  let ccH = {}, ccE = null;
  if (tabs.CharlesChang) ({ ownerHours: ccH, err: ccE } = extractDailyHoursByOwner(await fetchRange(api, SHEETS.CharlesChang, `${tabs.CharlesChang}!A:I`), tokens));
  const ccTuant = Object.fromEntries(Object.entries(ccH).filter(([k]) => k.includes("TuanNT")));
  results.TuanNT = {
    johnyiHours: sum(jyH), rebeccaHours: sum(rbH), paturevisionHours: sum(patTuant), neuralHours: sum(neuralTuant), charlesChangHours: sum(ccTuant),
    totalHours: sum(jyH) + sum(rbH) + sum(patTuant) + sum(neuralTuant) + sum(ccTuant),
    johnyiLeave: jyL, rebeccaLeave: rbL,
    johnyiOwners: jyH, rebeccaOwners: rbH, patOwners: patTuant, neuralOwners: neuralTuant, ccOwners: ccTuant,
  };

  // PhucVT (JamesDiamond sheet)
  let jdH = {}, jdL = {}, jdE = null;
  if (tabs.JamesDiamond) ({ ownerHours: jdH, leaveNotes: jdL, err: jdE } = extractDailyHoursByOwner(await fetchRange(api, SHEETS.JamesDiamond, `${tabs.JamesDiamond}!A:I`), tokens));
  results.PhucVT = { todayHours: sum(jdH), leave: jdL, err: jdE, owners: jdH };

  // VietPH (Paturevision, already fetched) — filter by owner only, no fallback
  const vietphH = Object.fromEntries(Object.entries(patAll).filter(([k]) => k.toLowerCase().includes("vietph")));
  results.VietPH = {
    todayHours: sum(vietphH),
    leave: patL, err: patE, allOwners: patAll,
  };

  // KhanhHH — scan ALL sheets
  process.stderr.write("KhanhHH...\n");
  let genH = {}, genL = {}, genE = null;
  if (tabs.Generator) ({ ownerHours: genH, leaveNotes: genL, err: genE } = extractDailyHoursByOwner(await fetchRange(api, SHEETS.Generator, `${tabs.Generator}!A:I`), tokens));
  let aysarAllH = {}, aysarL = {}, aysarE = null;
  if (tabs.Aysar) ({ ownerHours: aysarAllH, leaveNotes: aysarL, err: aysarE } = extractDailyHoursByOwner(await fetchRange(api, SHEETS.Aysar, `${tabs.Aysar}!A:I`), tokens));
  let elenaAll = {}, elenaL = {}, elenaE = null;
  if (tabs.Elena) ({ ownerHours: elenaAll, leaveNotes: elenaL, err: elenaE } = extractDailyHoursByOwner(await fetchRange(api, SHEETS.Elena, `${tabs.Elena}!A:I`), tokens));
  const khAllSheets = {};
  const khAllLeave = {};
  for (const [sname, sid] of Object.entries(SHEETS)) {
    if (!tabs[sname]) continue;
    const { ownerHours, leaveNotes } = extractDailyHoursByOwner(
      await fetchRange(api, sid, `${tabs[sname]}!A:I`), tokens);
    Object.entries(ownerHours).filter(([k]) => k.includes("KhanhHH"))
      .forEach(([k, v]) => { khAllSheets[sname] = (khAllSheets[sname] || 0) + v; });
    Object.entries(leaveNotes).filter(([k]) => k.includes("KhanhHH") || k === "ALL")
      .forEach(([k, v]) => { khAllLeave[`${sname}:${k}`] = v; });
  }
  const khTotalHours = Object.values(khAllSheets).reduce((a, b) => a + b, 0);
  const [khGenWeekly, khAysarWeekly] = await Promise.all([
    getOwnerWeeklyTotal(api, SHEETS.Generator, tabs.Generator, "KhanhHH"),
    getOwnerWeeklyTotal(api, SHEETS.Aysar, tabs.Aysar, "KhanhHH"),
  ]);
  results.KhanhHH = {
    totalHours: khTotalHours,
    bySheet: khAllSheets,
    weeklyTotal: (khGenWeekly || 0) + (khAysarWeekly || 0),
    leave: khAllLeave,
    err: genE || aysarE || null,
  };
  results.Elena = { tab: tabs.Elena, todayHours: sum(elenaAll), owners: elenaAll, leave: elenaL, err: elenaE };

  // LeNH — 3 sheets (Rory + Franc + Rebecca Q-T)
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
  results.LeNH = {
    roryHours: sum(roryLeNH), francHours: sum(francLeNH), rebeccaLeNHHours: rbLeNH,
    totalHours: sum(roryLeNH) + sum(francLeNH) + rbLeNH,
    leave: { ...roryL, ...francL },
    errors: { rory: roryE, franc: francE, rebecca: rbLeNHE },
    roryOwners: roryH, francOwners: francH,
  };

  // LongVV (Maddy sheet, part-time 16h/wk)
  let longvvH = {}, maddyL = {}, maddyE = null;
  if (tabs.Maddy) ({ ownerHours: longvvH, leaveNotes: maddyL, err: maddyE } = extractDailyHoursByOwner(await fetchRange(api, SHEETS.Maddy, `${tabs.Maddy}!A:I`), tokens));
  const longvvWeekly = await getOwnerWeeklyTotal(api, SHEETS.Maddy, tabs.Maddy, "LongVV");
  results.LongVV = {
    todayHours: sum(longvvH), weeklyTotal: longvvWeekly,
    weeklyTarget: 16, leave: maddyL, err: maddyE, owners: longvvH,
  };

  results._tabs = tabs;
  console.log(JSON.stringify(results, null, 2));
}

main().catch(e => { console.error("FATAL:", e.message); process.exit(1); });
