#!/usr/bin/env node
/**
 * Daily sheets scan for 2026-06-02 (Tuesday) — new week June 2-8.
 * Note: LongVV on sick leave today (per email). VuTQ in Paturevision (Bailey).
 * Discovers week tabs dynamically from Summary sheets.
 * Fallback guesses (prev week +1): Maddy W9, JohnYi W26, Rebecca W27,
 *   JamesDiamond W28, Rory W14, Franc W27, Aysar W27, Generator W43, Paturevision W30
 */

const { google } = require("googleapis");
const path = require("path");

const SVC = path.join(__dirname, "..", "config", "daily-agent-490610-7eb7985b33e3.json");

const SHEETS = {
  Maddy:        "1PHW76CuJ7nEJ3bU150iIVFsVXrQOmP5lVKgfI4ESR7I",
  JohnYi:       "1xwimT6AFGfAGpVHlDA2PYxKX405Nu77dNExWBmbnytQ",
  Rebecca:      "1wrsg-lAWDnCEFUNk4YUTcqThMN6hy7GnXWOEW_e8NJ4",
  JamesDiamond: "1XUJ7Ww8dyxv6L42wtQ_7jz4GCGvBzDUXEc7YTHrKgeI",
  Rory:         "1jKz9td9NgC_Iebmr3juD5Usi_7iBTu6psXI7eEuZCm8",
  Franc:        "1RqY8DUQg0OD8wlufOO77Lg7cQ44DyonoArNHSyZztaQ",
  Aysar:        "1DCsXm5SJdIep4qjr_J_tUJPasHxPEc-tzN2q2SGsOq8",
  Generator:    "1LVj66VKCe8ShqR9YNAet-d3EgEBIUWaY0ooYSdHkeEM",
  Paturevision: "1dpFpn8-1AGAcaKczHHoVr1OaIxDQkmUNiN93sa2XBkg",
  Elena:        "1dH14D_XShHiVPReInjZ33YDP27cIBuV0q5BS9Nx-DRQ",
};

const FALLBACK_TABS = {
  Maddy:        "W9",
  JohnYi:       "W26",
  Rebecca:      "W27",
  JamesDiamond: "W28",
  Rory:         "W14",
  Franc:        "W27",
  Aysar:        "W27",
  Generator:    "W43",
  Paturevision: "W30",
  Elena:        null,
};

// Date tokens for Tue June 2 2026
const TUE_TOKENS = ["Tue, 02/06/26", "02/06/26", "Tue, 2/06/26"];
const TARGET_DATE = new Date(2026, 5, 2); // June 2, 2026 (month is 0-indexed)

function parseHours(val) {
  if (!val || ["", "-", "—", "#DIV/0!", "N/A"].includes(String(val).trim())) return 0;
  const s = String(val).trim().replace(",", ".");
  const n = parseFloat(s);
  return isNaN(n) ? 0 : n;
}

function parseDateCell(val) {
  const s = String(val).trim().replace(/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s*/, "");
  const m = s.match(/^(\d{1,2})\/(\d{2})\/(\d{2})/);
  if (!m) return null;
  const [, d, mo, y] = m;
  return new Date(2000 + parseInt(y), parseInt(mo) - 1, parseInt(d));
}

const DAY_PATTERN = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s*\d{1,2}\/\d{2}\/\d{2}/;
const DATE_ONLY_PATTERN = /^\d{1,2}\/\d{2}\/\d{2}/;

function findDayBlock(rows, tokens) {
  for (let i = 0; i < rows.length; i++) {
    const cell = rows[i] && rows[i][0] ? String(rows[i][0]).trim() : "";
    if (tokens.some((t) => cell.includes(t))) return i;
  }
  return -1;
}

function extractDailyHoursByOwner(rows, tokens, hoursCol = 7) {
  const startIdx = findDayBlock(rows, tokens);
  if (startIdx === -1) return { ownerHours: {}, leaveNotes: {}, err: "DATE_NOT_FOUND" };

  const ownerHours = {};
  const leaveNotes = {};
  let globalLeave = null;

  const headerCell = rows[startIdx] && rows[startIdx][0] ? String(rows[startIdx][0]).trim() : "";
  if (headerCell.includes("Nghỉ cả ngày")) globalLeave = "Nghỉ cả ngày";
  else if (headerCell.includes("Nghỉ nửa ngày")) globalLeave = "Nghỉ nửa ngày";

  for (let i = startIdx + 1; i < rows.length; i++) {
    const row = rows[i];
    if (!row) continue;
    const rowA = row[0] ? String(row[0]).trim() : "";

    if (DAY_PATTERN.test(rowA)) break;
    if (DATE_ONLY_PATTERN.test(rowA) && !tokens.some((t) => rowA.includes(t))) break;

    if (rowA.includes("Nghỉ cả ngày") || rowA.includes("Nghỉ nửa ngày")) {
      const owner = (row[6] ? String(row[6]).trim() : "") || "ALL";
      leaveNotes[owner] = rowA;
      if (owner === "ALL") globalLeave = rowA;
      continue;
    }

    const rowALower = rowA.toLowerCase();
    if (!rowALower.includes("task dự án") && !rowALower.includes("task du an")) continue;

    const owner = row[6] ? String(row[6]).trim() : "";
    if (!owner) continue;

    const hrs = parseHours(row[hoursCol] || "");
    ownerHours[owner] = (ownerHours[owner] || 0) + hrs;
  }

  if (globalLeave && Object.keys(leaveNotes).length === 0) {
    leaveNotes["ALL"] = globalLeave;
  }

  return { ownerHours, leaveNotes, err: null };
}

async function fetchRange(sheetsApi, spreadsheetId, range) {
  try {
    const res = await sheetsApi.spreadsheets.values.get({ spreadsheetId, range });
    return res.data.values || [];
  } catch (e) {
    return [["ERROR: " + e.message]];
  }
}

async function discoverWeekTab(sheetsApi, spreadsheetId, targetDate, fallback) {
  try {
    const rows = await fetchRange(sheetsApi, spreadsheetId, "Summary!A:E");
    for (const row of rows) {
      if (!row || !row[0]) continue;
      const tab = String(row[0]).trim();
      if (!/^W\d+/.test(tab)) continue;
      const startD = parseDateCell(String(row[1] || ""));
      const endD = parseDateCell(String(row[2] || ""));
      if (startD && endD && startD <= targetDate && targetDate <= endD) {
        process.stderr.write(`  ${tab}: ${startD.toISOString().slice(0,10)} → ${endD.toISOString().slice(0,10)} ✓\n`);
        return tab;
      }
    }
  } catch (e) {
    process.stderr.write(`  Summary discovery error: ${e.message}\n`);
  }
  // Try fallback
  if (fallback) {
    try {
      const test = await fetchRange(sheetsApi, spreadsheetId, `${fallback}!A1:A3`);
      if (test.length && !String(test[0]).includes("ERROR")) {
        process.stderr.write(`  Using fallback tab: ${fallback}\n`);
        return fallback;
      }
    } catch (e) {}
  }
  return null;
}

async function getWeeklySummary(sheetsApi, spreadsheetId, weekTab) {
  try {
    const rows = await fetchRange(sheetsApi, spreadsheetId, "Summary!A1:E100");
    for (const row of rows) {
      if (row && String(row[0]).trim() === weekTab) {
        return parseHours(row[3] || "");
      }
    }
  } catch (e) {}
  return null;
}

async function checkRebeccaLeNH(sheetsApi, spreadsheetId, weekTab, tokens) {
  const rows = await fetchRange(sheetsApi, spreadsheetId, `${weekTab}!A:T`);
  if (!rows.length || (rows[0] && String(rows[0][0]).includes("ERROR"))) {
    return { leNHHours: 0, ownerHours: {}, leaveNotes: {}, err: String(rows[0] || "empty") };
  }

  const startIdx = findDayBlock(rows, tokens);
  if (startIdx === -1) return { leNHHours: 0, ownerHours: {}, leaveNotes: {}, err: "DATE_NOT_FOUND" };

  let leNHHours = 0;
  const ownerHours = {};
  const leaveNotes = {};

  for (let i = startIdx + 1; i < rows.length; i++) {
    const row = rows[i];
    if (!row) continue;
    const rowA = row[0] ? String(row[0]).trim() : "";

    if (DAY_PATTERN.test(rowA)) break;
    if (DATE_ONLY_PATTERN.test(rowA) && !tokens.some((t) => rowA.includes(t))) break;

    if (rowA.includes("Nghỉ cả ngày") || rowA.includes("Nghỉ nửa ngày")) {
      const owner = row[6] ? String(row[6]).trim() : "";
      if (owner) leaveNotes[owner] = rowA;
      continue;
    }

    const rowALower = rowA.toLowerCase();
    if (!rowALower.includes("task dự án") && !rowALower.includes("task du an")) continue;

    const owner = row[6] ? String(row[6]).trim() : "";
    const hrsH = parseHours(row[7] || "");
    if (owner && hrsH > 0) ownerHours[owner] = (ownerHours[owner] || 0) + hrsH;

    for (let ci = 16; ci <= 19; ci++) {
      leNHHours += parseHours(row[ci] || "");
    }
  }

  return { leNHHours, ownerHours, leaveNotes, err: null };
}

async function main() {
  const auth = new google.auth.GoogleAuth({
    keyFile: SVC,
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });
  const authClient = await auth.getClient();
  const sheetsApi = google.sheets({ version: "v4", auth: authClient });

  const tokens = TUE_TOKENS;
  const results = {};

  // --- Discover week tabs ---
  process.stderr.write("Discovering week tabs...\n");
  const currTabs = {};
  for (const [name, id] of Object.entries(SHEETS)) {
    process.stderr.write(`  ${name}...\n`);
    currTabs[name] = await discoverWeekTab(sheetsApi, id, TARGET_DATE, FALLBACK_TABS[name]);
    process.stderr.write(`  ${name} → ${currTabs[name]}\n`);
  }
  process.stderr.write(`\nTabs: ${JSON.stringify(currTabs)}\n\n`);

  // --- TuanNT: JohnYi + Rebecca + Paturevision ---
  process.stderr.write("Checking TuanNT...\n");
  let tuantJY = {}, jyLeave = {}, jyErr = null, jyWeekly = null;
  if (currTabs.JohnYi) {
    const rowsJY = await fetchRange(sheetsApi, SHEETS.JohnYi, `${currTabs.JohnYi}!A:I`);
    ({ ownerHours: tuantJY, leaveNotes: jyLeave, err: jyErr } = extractDailyHoursByOwner(rowsJY, tokens));
    jyWeekly = await getWeeklySummary(sheetsApi, SHEETS.JohnYi, currTabs.JohnYi);
  }

  let tuantRB = {}, rbLeave = {}, rbErr = null, rbWeekly = null;
  if (currTabs.Rebecca) {
    const rowsRB = await fetchRange(sheetsApi, SHEETS.Rebecca, `${currTabs.Rebecca}!A:I`);
    ({ ownerHours: tuantRB, leaveNotes: rbLeave, err: rbErr } = extractDailyHoursByOwner(rowsRB, tokens));
    rbWeekly = await getWeeklySummary(sheetsApi, SHEETS.Rebecca, currTabs.Rebecca);
  }

  let patAll = {}, patLeave = {}, patErr = null;
  if (currTabs.Paturevision) {
    const rowsPat = await fetchRange(sheetsApi, SHEETS.Paturevision, `${currTabs.Paturevision}!A:I`);
    ({ ownerHours: patAll, leaveNotes: patLeave, err: patErr } = extractDailyHoursByOwner(rowsPat, tokens));
  }
  const tuantPat = Object.fromEntries(Object.entries(patAll).filter(([k]) => k.includes("TuanNT")));

  const tuantJYTotal = Object.values(tuantJY).reduce((a, b) => a + b, 0);
  const tuantRBTotal = Object.values(tuantRB).reduce((a, b) => a + b, 0);
  const tuantPatTotal = Object.values(tuantPat).reduce((a, b) => a + b, 0);

  results.TuanNT = {
    johnyiHours: tuantJYTotal,
    rebeccaHours: tuantRBTotal,
    paturevisionHours: tuantPatTotal,
    totalHours: tuantJYTotal + tuantRBTotal + tuantPatTotal,
    johnyiWeekly: jyWeekly,
    rebeccaWeekly: rbWeekly,
    johnyiLeave: jyLeave,
    rebeccaLeave: rbLeave,
    johnyiErr: jyErr,
    rebeccaErr: rbErr,
    johnyiOwners: tuantJY,
    rebeccaOwners: tuantRB,
    patOwners: tuantPat,
  };

  // --- PhucVT: JamesDiamond ---
  process.stderr.write("Checking PhucVT (JamesDiamond)...\n");
  let phucvtHours = {}, jdLeave = {}, jdErr = null, jdWeekly = null;
  if (currTabs.JamesDiamond) {
    const rowsJD = await fetchRange(sheetsApi, SHEETS.JamesDiamond, `${currTabs.JamesDiamond}!A:I`);
    ({ ownerHours: phucvtHours, leaveNotes: jdLeave, err: jdErr } = extractDailyHoursByOwner(rowsJD, tokens));
    jdWeekly = await getWeeklySummary(sheetsApi, SHEETS.JamesDiamond, currTabs.JamesDiamond);
  }
  results.PhucVT = {
    todayHours: Object.values(phucvtHours).reduce((a, b) => a + b, 0),
    weeklyTotal: jdWeekly,
    leave: jdLeave,
    err: jdErr,
    owners: phucvtHours,
  };

  // --- VietPH + VuTQ: Paturevision (already fetched) ---
  process.stderr.write("Checking VietPH+VuTQ (Paturevision already fetched)...\n");
  let vietphHrs = 0, vutqHrs = 0;
  for (const [owner, hrs] of Object.entries(patAll)) {
    const ownerLower = owner.toLowerCase();
    if (ownerLower.includes("vietph") || ownerLower.includes("viet")) vietphHrs += hrs;
    else if (ownerLower.includes("vutq") || ownerLower.includes("vutq")) vutqHrs += hrs;
  }
  const allPatHrs = Object.values(patAll).reduce((a, b) => a + b, 0);
  // Subtract TuanNT hours if any were included
  const tuantInPat = tuantPatTotal;
  const nonTuantHrs = allPatHrs - tuantInPat;
  if (vietphHrs === 0 && vutqHrs === 0 && nonTuantHrs > 0) vietphHrs = nonTuantHrs;
  const patWeekly = currTabs.Paturevision
    ? await getWeeklySummary(sheetsApi, SHEETS.Paturevision, currTabs.Paturevision) : null;
  results.VietPH = {
    todayHours: vietphHrs,
    weeklyTotal: patWeekly,
    leave: patLeave,
    err: patErr,
    allOwners: patAll,
  };
  results.VuTQ = {
    todayHours: vutqHrs,
    weeklyTotal: patWeekly,
    note: "Moved to Bailey/Paturevision as of 2026-05-13. 0h in Fountain expected.",
    allOwners: patAll,
  };

  // --- KhanhHH: Generator + Elena (flexible) ---
  process.stderr.write("Checking KhanhHH (Generator+Elena)...\n");
  let khanhHours = {}, genLeave = {}, genErr = null, genWeekly = null;
  if (currTabs.Generator) {
    const rowsGen = await fetchRange(sheetsApi, SHEETS.Generator, `${currTabs.Generator}!A:I`);
    ({ ownerHours: khanhHours, leaveNotes: genLeave, err: genErr } = extractDailyHoursByOwner(rowsGen, tokens));
    genWeekly = await getWeeklySummary(sheetsApi, SHEETS.Generator, currTabs.Generator);
  }

  let elenaAllHours = {}, elenaLeave = {}, elenaErr = null;
  if (currTabs.Elena) {
    const rowsElena = await fetchRange(sheetsApi, SHEETS.Elena, `${currTabs.Elena}!A:I`);
    ({ ownerHours: elenaAllHours, leaveNotes: elenaLeave, err: elenaErr } = extractDailyHoursByOwner(rowsElena, tokens));
  }

  const khanhGen = Object.fromEntries(Object.entries(khanhHours).filter(([k]) => k.includes("KhanhHH")));
  const khanhElena = Object.fromEntries(Object.entries(elenaAllHours).filter(([k]) => k.includes("KhanhHH")));
  const khanhGenTotal = Object.values(khanhGen).reduce((a, b) => a + b, 0);
  const khanhElenaTotal = Object.values(khanhElena).reduce((a, b) => a + b, 0);
  const khanhTotal = khanhGenTotal + khanhElenaTotal ||
    Object.values(khanhHours).reduce((a, b) => a + b, 0); // fallback: all gen rows

  results.KhanhHH = {
    generatorHours: khanhGen && Object.keys(khanhGen).length ? khanhGenTotal
      : Object.values(khanhHours).reduce((a, b) => a + b, 0),
    elenaHours: khanhElenaTotal,
    totalHours: khanhTotal,
    weeklyTotal: genWeekly,
    leave: genLeave,
    err: genErr,
    generatorOwners: khanhHours,
    elenaOwners: elenaAllHours,
  };

  // Elena sheet summary
  results.Elena = {
    tab: currTabs.Elena,
    todayHours: Object.values(elenaAllHours).reduce((a, b) => a + b, 0),
    owners: elenaAllHours,
    leave: elenaLeave,
    err: elenaErr,
  };

  // --- LeNH: Rory + Franc + Aysar + Rebecca ---
  process.stderr.write("Checking LeNH (Rory+Franc+Aysar+Rebecca)...\n");
  let leNHRory = {}, roryLeave = {}, roryErr = null, roryWeekly = null;
  if (currTabs.Rory) {
    const rowsRory = await fetchRange(sheetsApi, SHEETS.Rory, `${currTabs.Rory}!A:I`);
    ({ ownerHours: leNHRory, leaveNotes: roryLeave, err: roryErr } = extractDailyHoursByOwner(rowsRory, tokens));
    roryWeekly = await getWeeklySummary(sheetsApi, SHEETS.Rory, currTabs.Rory);
  }

  let leNHFranc = {}, francLeave = {}, francErr = null, francWeekly = null;
  if (currTabs.Franc) {
    const rowsFranc = await fetchRange(sheetsApi, SHEETS.Franc, `${currTabs.Franc}!A:I`);
    ({ ownerHours: leNHFranc, leaveNotes: francLeave, err: francErr } = extractDailyHoursByOwner(rowsFranc, tokens));
    francWeekly = await getWeeklySummary(sheetsApi, SHEETS.Franc, currTabs.Franc);
  }

  let leNHAysar = {}, aysarLeave = {}, aysarErr = null, aysarWeekly = null;
  if (currTabs.Aysar) {
    const rowsAysar = await fetchRange(sheetsApi, SHEETS.Aysar, `${currTabs.Aysar}!A:I`);
    ({ ownerHours: leNHAysar, leaveNotes: aysarLeave, err: aysarErr } = extractDailyHoursByOwner(rowsAysar, tokens));
    aysarWeekly = await getWeeklySummary(sheetsApi, SHEETS.Aysar, currTabs.Aysar);
  }

  let rebeccaLeNHHrs = 0, rbLeNHErr = null;
  if (currTabs.Rebecca) {
    const { leNHHours, err: rbErr2 } = await checkRebeccaLeNH(sheetsApi, SHEETS.Rebecca, currTabs.Rebecca, tokens);
    rebeccaLeNHHrs = leNHHours;
    rbLeNHErr = rbErr2;
  }

  const leNHRoryTotal = Object.values(leNHRory).reduce((a, b) => a + b, 0);
  const leNHFrancTotal = Object.values(leNHFranc).reduce((a, b) => a + b, 0);
  const leNHAysarTotal = Object.values(leNHAysar).reduce((a, b) => a + b, 0);
  const leNHTotal = leNHRoryTotal + leNHFrancTotal + leNHAysarTotal + rebeccaLeNHHrs;

  results.LeNH = {
    roryHours: leNHRoryTotal,
    francHours: leNHFrancTotal,
    aysarHours: leNHAysarTotal,
    rebeccaLeNHHours: rebeccaLeNHHrs,
    totalHours: leNHTotal,
    roryWeekly,
    francWeekly,
    aysarWeekly,
    weeklyTotal: (roryWeekly || 0) + (francWeekly || 0) + (aysarWeekly || 0),
    leave: { ...roryLeave, ...francLeave, ...aysarLeave },
    errors: { rory: roryErr, franc: francErr, aysar: aysarErr, rebecca: rbLeNHErr },
    roryOwners: leNHRory,
    francOwners: leNHFranc,
    aysarOwners: leNHAysar,
  };

  // --- LongVV: Maddy (part-time 16h/wk) — sick leave today ---
  process.stderr.write("Checking LongVV (Maddy, sick leave today)...\n");
  let longvvToday = {}, maddyLeave = {}, maddyErr = null, longvvWeekly = null;
  if (currTabs.Maddy) {
    const rowsMaddy = await fetchRange(sheetsApi, SHEETS.Maddy, `${currTabs.Maddy}!A:I`);
    ({ ownerHours: longvvToday, leaveNotes: maddyLeave, err: maddyErr } = extractDailyHoursByOwner(rowsMaddy, tokens));
    longvvWeekly = await getWeeklySummary(sheetsApi, SHEETS.Maddy, currTabs.Maddy);
  }
  results.LongVV = {
    todayHours: Object.values(longvvToday).reduce((a, b) => a + b, 0),
    weeklyTotal: longvvWeekly,
    weeklyTarget: 16,
    leave: maddyLeave,
    err: maddyErr,
    owners: longvvToday,
    note: "Sick leave today per email — 0h expected. Part-time 16h/wk target.",
  };

  results._tabs = currTabs;
  console.log(JSON.stringify(results, null, 2));
}

main().catch((e) => {
  console.error("FATAL:", e.message);
  process.exit(1);
});
