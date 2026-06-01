#!/usr/bin/env node
/**
 * Daily sheets scan for 2026-05-30 (Friday) + week W totals.
 * Week May 25-31:
 *   Maddy: W8, JohnYi: W25, Rebecca: W26, JamesDiamond: W27
 *   Rory: W13, Franc: W26, Aysar: W26, Generator: W42, Paturevision: W29
 */

const { google } = require("googleapis");
const fs = require("fs");
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
};

const CURR_TABS = {
  Maddy:        "W8",
  JohnYi:       "W25",
  Rebecca:      "W26",
  JamesDiamond: "W27",
  Rory:         "W13",
  Franc:        "W26",
  Aysar:        "W26",
  Generator:    "W42",
  Paturevision: "W29",
};

// Date tokens for Fri May 30 2026
const FRI_TOKENS = ["Fri, 30/05/26", "30/05/26", "Fri, 30/5/26"];

function parseHours(val) {
  if (!val || ["", "-", "—", "#DIV/0!", "N/A"].includes(String(val).trim())) return 0;
  const s = String(val).trim().replace(",", ".");
  const n = parseFloat(s);
  return isNaN(n) ? 0 : n;
}

function findDayBlock(rows, tokens) {
  for (let i = 0; i < rows.length; i++) {
    const cell = rows[i] && rows[i][0] ? String(rows[i][0]).trim() : "";
    if (tokens.some((t) => cell.includes(t))) return i;
  }
  return -1;
}

const DAY_PATTERN = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s*\d{1,2}\/\d{2}\/\d{2}/;
const DATE_ONLY_PATTERN = /^\d{1,2}\/\d{2}\/\d{2}/;

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

async function getWeeklyFromTab(sheetsApi, spreadsheetId, weekTab, ownerFilter = null) {
  const rows = await fetchRange(sheetsApi, spreadsheetId, `${weekTab}!A:I`);
  let total = 0;
  for (const row of rows) {
    if (!row) continue;
    const rowALower = (row[0] || "").toString().toLowerCase();
    if (!rowALower.includes("task dự án") && !rowALower.includes("task du an")) continue;
    const owner = row[6] ? String(row[6]).trim() : "";
    if (ownerFilter && !owner.includes(ownerFilter)) continue;
    total += parseHours(row[7] || "");
  }
  return total;
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

  const tokens = FRI_TOKENS;
  const results = {};

  // --- TuanNT: JohnYi ---
  process.stderr.write("Checking TuanNT (JohnYi)...\n");
  const rowsJY = await fetchRange(sheetsApi, SHEETS.JohnYi, `${CURR_TABS.JohnYi}!A:I`);
  const { ownerHours: tuantJY, leaveNotes: jyLeave, err: jyErr } = extractDailyHoursByOwner(rowsJY, tokens);
  const jyWeekly = await getWeeklySummary(sheetsApi, SHEETS.JohnYi, CURR_TABS.JohnYi);

  // --- TuanNT: Rebecca ---
  process.stderr.write("Checking TuanNT (Rebecca)...\n");
  const rowsRB = await fetchRange(sheetsApi, SHEETS.Rebecca, `${CURR_TABS.Rebecca}!A:I`);
  const { ownerHours: tuantRB, leaveNotes: rbLeave, err: rbErr } = extractDailyHoursByOwner(rowsRB, tokens);
  const rbWeekly = await getWeeklySummary(sheetsApi, SHEETS.Rebecca, CURR_TABS.Rebecca);

  results.TuanNT = {
    johnyiFriHours: Object.values(tuantJY).reduce((a, b) => a + b, 0),
    rebeccaFriHours: Object.values(tuantRB).reduce((a, b) => a + b, 0),
    get totalFriHours() { return this.johnyiFriHours + this.rebeccaFriHours; },
    johnyiWeekly: jyWeekly,
    rebeccaWeekly: rbWeekly,
    johnyiLeave: jyLeave,
    rebeccaLeave: rbLeave,
    johnyiErr: jyErr,
    rebeccaErr: rbErr,
    johnyiOwners: tuantJY,
    rebeccaOwners: tuantRB,
  };

  // --- PhucVT: JamesDiamond ---
  process.stderr.write("Checking PhucVT (JamesDiamond)...\n");
  const rowsJD = await fetchRange(sheetsApi, SHEETS.JamesDiamond, `${CURR_TABS.JamesDiamond}!A:I`);
  const { ownerHours: phucvtHours, leaveNotes: jdLeave, err: jdErr } = extractDailyHoursByOwner(rowsJD, tokens);
  const jdWeekly = await getWeeklySummary(sheetsApi, SHEETS.JamesDiamond, CURR_TABS.JamesDiamond);
  results.PhucVT = {
    friHours: Object.values(phucvtHours).reduce((a, b) => a + b, 0),
    weeklyTotal: jdWeekly,
    leave: jdLeave,
    err: jdErr,
    owners: phucvtHours,
  };

  // --- VietPH + VuTQ: Paturevision ---
  process.stderr.write("Checking VietPH+VuTQ (Paturevision)...\n");
  const rowsPat = await fetchRange(sheetsApi, SHEETS.Paturevision, `${CURR_TABS.Paturevision}!A:I`);
  const { ownerHours: patHours, leaveNotes: patLeave, err: patErr } = extractDailyHoursByOwner(rowsPat, tokens);
  const patWeekly = await getWeeklySummary(sheetsApi, SHEETS.Paturevision, CURR_TABS.Paturevision);

  // Try to separate VietPH vs VuTQ by owner name
  let vietphFri = 0, vutqFri = 0;
  for (const [owner, hrs] of Object.entries(patHours)) {
    const ownerLower = owner.toLowerCase();
    if (ownerLower.includes("vietph") || ownerLower.includes("viet")) vietphFri += hrs;
    else if (ownerLower.includes("vutq") || ownerLower.includes("vu")) vutqFri += hrs;
    else vietphFri += hrs; // default attribute to VietPH if unclear
  }
  const allPatHrs = Object.values(patHours).reduce((a, b) => a + b, 0);
  // If separation failed (all 0 but total > 0), show total under VietPH
  if (vietphFri === 0 && vutqFri === 0 && allPatHrs > 0) vietphFri = allPatHrs;

  results.VietPH = {
    friHours: vietphFri,
    weeklyTotal: patWeekly,
    leave: patLeave,
    err: patErr,
    allOwners: patHours,
  };
  results.VuTQ = {
    friHours: vutqFri,
    weeklyTotal: patWeekly,
    leave: patLeave,
    err: patErr,
    allOwners: patHours,
    note: "Paturevision sheet shared with VietPH",
  };

  // --- KhanhHH: Generator ---
  process.stderr.write("Checking KhanhHH (Generator)...\n");
  const rowsGen = await fetchRange(sheetsApi, SHEETS.Generator, `${CURR_TABS.Generator}!A:I`);
  const { ownerHours: khanhHours, leaveNotes: genLeave, err: genErr } = extractDailyHoursByOwner(rowsGen, tokens);
  const genWeekly = await getWeeklySummary(sheetsApi, SHEETS.Generator, CURR_TABS.Generator);
  results.KhanhHH = {
    friHours: Object.values(khanhHours).reduce((a, b) => a + b, 0),
    weeklyTotal: genWeekly,
    leave: genLeave,
    err: genErr,
    owners: khanhHours,
  };

  // --- LeNH: Rory + Franc + Aysar + Rebecca ---
  process.stderr.write("Checking LeNH (Rory+Franc+Aysar+Rebecca)...\n");
  const rowsRory = await fetchRange(sheetsApi, SHEETS.Rory, `${CURR_TABS.Rory}!A:I`);
  const { ownerHours: leNHRory, leaveNotes: roryLeave, err: roryErr } = extractDailyHoursByOwner(rowsRory, tokens);
  const roryWeekly = await getWeeklySummary(sheetsApi, SHEETS.Rory, CURR_TABS.Rory);

  const rowsFranc = await fetchRange(sheetsApi, SHEETS.Franc, `${CURR_TABS.Franc}!A:I`);
  const { ownerHours: leNHFranc, leaveNotes: francLeave, err: francErr } = extractDailyHoursByOwner(rowsFranc, tokens);
  const francWeekly = await getWeeklySummary(sheetsApi, SHEETS.Franc, CURR_TABS.Franc);

  const rowsAysar = await fetchRange(sheetsApi, SHEETS.Aysar, `${CURR_TABS.Aysar}!A:I`);
  const { ownerHours: leNHAysar, leaveNotes: aysarLeave, err: aysarErr } = extractDailyHoursByOwner(rowsAysar, tokens);
  const aysarWeekly = await getWeeklySummary(sheetsApi, SHEETS.Aysar, CURR_TABS.Aysar);

  const { leNHHours: rebeccaLeNHFri, leaveNotes: rbLeNHLeave, err: rbLeNHErr } =
    await checkRebeccaLeNH(sheetsApi, SHEETS.Rebecca, CURR_TABS.Rebecca, tokens);

  const leNHFriTotal =
    Object.values(leNHRory).reduce((a, b) => a + b, 0) +
    Object.values(leNHFranc).reduce((a, b) => a + b, 0) +
    Object.values(leNHAysar).reduce((a, b) => a + b, 0) +
    rebeccaLeNHFri;

  results.LeNH = {
    roryFriHours: Object.values(leNHRory).reduce((a, b) => a + b, 0),
    francFriHours: Object.values(leNHFranc).reduce((a, b) => a + b, 0),
    aysarFriHours: Object.values(leNHAysar).reduce((a, b) => a + b, 0),
    rebeccaLeNHFriHours: rebeccaLeNHFri,
    totalFriHours: leNHFriTotal,
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

  // --- LongVV: Maddy (part-time 16h/wk) ---
  process.stderr.write("Checking LongVV (Maddy)...\n");
  const rowsMaddy = await fetchRange(sheetsApi, SHEETS.Maddy, `${CURR_TABS.Maddy}!A:I`);
  const { ownerHours: longvvToday, leaveNotes: maddyLeave, err: maddyErr } = extractDailyHoursByOwner(rowsMaddy, tokens);
  const longvvWeekly = await getWeeklySummary(sheetsApi, SHEETS.Maddy, CURR_TABS.Maddy);
  results.LongVV = {
    friHours: Object.values(longvvToday).reduce((a, b) => a + b, 0),
    weeklyTotal: longvvWeekly,
    weeklyTarget: 16,
    leave: maddyLeave,
    err: maddyErr,
    owners: longvvToday,
    note: "Part-time 16h/wk — 0h days normal; weekly total matters",
  };

  console.log(JSON.stringify(results, null, 2));
}

main().catch((e) => {
  console.error("FATAL:", e.message);
  process.exit(1);
});
