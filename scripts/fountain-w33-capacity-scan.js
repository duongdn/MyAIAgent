#!/usr/bin/env node
/**
 * Fountain scan for W33 (Jun 29 - Jul 5, 2026).
 * Part 2+3: Task log actuals from Summary tab.
 * Part 4: Capacity & runway (Est vs Charged tab, Col I+J est, Col K actual).
 * Part 5: Over-estimate tracking (actual > total_est * 1.2).
 */

const { google } = require("googleapis");
const path = require("path");

const SVC = path.join(__dirname, "..", "config", "daily-agent-490610-7eb7985b33e3.json");
const FOUNTAIN_ID = "1iIKfjAh857qzrR2xkUWPcN_9bFAwB1pL8aJWTRk4f4o";
const W33_CAPACITY = 88; // ViTHT:36+ThinhT:20+DatNT:24+VuTQ:8

const DONE_STATUSES = new Set([
  "Deployed on Live", "Cancelled", "Has Bug on Live", "Tested on Live"
]);

function parseHours(val) {
  if (!val || ["", "-", "—", "#DIV/0!", "#REF!", "N/A"].includes(String(val).trim())) return 0;
  const n = parseFloat(String(val).trim().replace(",", "."));
  return isNaN(n) ? 0 : n;
}

function isNSOrIP(status) {
  const s = String(status).trim();
  return s === "Not Started" || s.toLowerCase().startsWith("in-progress") || s.toLowerCase().startsWith("in progress");
}

async function main() {
  const auth = new google.auth.GoogleAuth({
    keyFile: SVC,
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });
  const sheets = google.sheets({ version: "v4", auth });

  async function fetchRange(range) {
    try {
      const res = await sheets.spreadsheets.values.get({ spreadsheetId: FOUNTAIN_ID, range });
      return res.data.values || [];
    } catch (e) {
      process.stderr.write(`ERROR fetching ${range}: ${e.message}\n`);
      return [];
    }
  }

  // ---- Part 2+3: Summary tab ----
  process.stderr.write("Fetching Fountain Summary tab...\n");
  const summaryRows = await fetchRange("Summary!A:AM");

  const DEVS = ["ViTHT", "ThinhT", "VuTQ", "PhatDLT", "HungPN", "HaVS", "DatNT", "LamLQ"];
  let namesRowIdx = -1;
  let namesRowData = null;
  const weekRows = {};

  for (let i = 0; i < summaryRows.length; i++) {
    const rowStr = summaryRows[i].join(" ");
    if (DEVS.some(d => rowStr.includes(d)) && namesRowIdx === -1) {
      namesRowIdx = i;
      namesRowData = summaryRows[i];
    }
    const cell0 = String(summaryRows[i][0] || "").trim();
    if (cell0.startsWith("W") && /^\d+$/.test(cell0.slice(1))) {
      weekRows[parseInt(cell0.slice(1))] = { label: cell0, row: summaryRows[i] };
    }
  }

  const colMap = {};
  if (namesRowData) {
    namesRowData.forEach((cell, ci) => {
      const name = String(cell).trim();
      if (DEVS.includes(name) && !(name in colMap)) colMap[name] = ci;
    });
  }

  process.stderr.write(`Column map: ${JSON.stringify(colMap)}\n`);
  process.stderr.write(`Week rows found: ${Object.keys(weekRows).sort((a,b)=>a-b).join(", ")}\n`);

  const maxW = Math.max(...Object.keys(weekRows).map(Number));
  const currWeek = weekRows[maxW] || null;
  const prevWeek = weekRows[maxW - 1] || null;
  process.stderr.write(`Current: W${maxW}, prev: W${maxW-1}\n`);

  const currActuals = {};
  const prevActuals = {};
  if (currWeek) {
    for (const [dev, col] of Object.entries(colMap)) {
      currActuals[dev] = parseHours(currWeek.row[col]);
    }
  }
  if (prevWeek) {
    for (const [dev, col] of Object.entries(colMap)) {
      prevActuals[dev] = parseHours(prevWeek.row[col]);
    }
  }
  process.stderr.write(`W${maxW} actuals: ${JSON.stringify(currActuals)}\n`);

  // ---- Parts 4+5: Est vs Charged tab ----
  process.stderr.write("Fetching Est vs Charged tab...\n");
  const estRows = await fetchRange("Est vs Charged!A:M");

  const tasks = [];
  let headerFound = false;

  for (const row of estRows) {
    if (!row || row.length < 2) continue;
    if (!headerFound) {
      const rowText = row.join(" ").toLowerCase();
      if (rowText.includes("task") || rowText.includes("estimated") || rowText.includes("actual")) {
        headerFound = true;
        process.stderr.write(`Header: ${row.slice(0,12).join(" | ")}\n`);
      }
      continue;
    }
    if (row.length < 9) continue;
    const taskId = String(row[0] || "").trim();
    if (!taskId || taskId === "#" || taskId.toLowerCase().startsWith("task")) continue;

    const taskName = String(row[1] || "").trim();
    const status = String(row[2] || "").trim();
    const estRaw = parseHours(row[8]);   // Col I = Estimated Dev Raw
    const cr = parseHours(row[9]);       // Col J = CR
    const actual = parseHours(row[10]);  // Col K = Actual

    const totalEst = estRaw + cr;
    if (totalEst === 0 && actual === 0) continue;

    tasks.push({ id: taskId, name: taskName.slice(0, 60), status, est: estRaw, cr, totalEst, actual });
  }

  process.stderr.write(`Total tasks with data: ${tasks.length}\n`);

  const nsIpTasks = tasks.filter(t => !DONE_STATUSES.has(t.status) && isNSOrIP(t.status));
  const remainingNarrow = nsIpTasks.reduce((s, t) => s + Math.max(0, t.totalEst - t.actual), 0);
  const runwayWk = W33_CAPACITY > 0 ? remainingNarrow / W33_CAPACITY : 0;

  process.stderr.write(`NS+IP: ${nsIpTasks.length} tasks, ${remainingNarrow.toFixed(1)}h remaining\n`);
  process.stderr.write(`Runway: ${runwayWk.toFixed(2)} weeks at ${W33_CAPACITY}h/wk\n`);

  for (const t of nsIpTasks) {
    process.stderr.write(`  #${t.id}: est=${t.totalEst}h actual=${t.actual}h rem=${Math.max(0,t.totalEst-t.actual).toFixed(1)}h | ${t.status}\n`);
  }

  const overEst = tasks
    .filter(t => t.totalEst > 0 && t.actual > t.totalEst * 1.2)
    .map(t => ({ ...t, overPct: Math.round((t.actual / t.totalEst - 1) * 1000) / 10 }))
    .sort((a, b) => b.overPct - a.overPct);

  process.stderr.write(`Over-estimate (>20%): ${overEst.length}\n`);
  for (const t of overEst.slice(0, 15)) {
    process.stderr.write(`  #${t.id}: ${t.overPct}% | actual=${t.actual}h | est+cr=${t.totalEst}h | ${t.status}\n`);
  }

  const KEY_IDS = new Set(["2595", "2615", "2702", "2735", "2872", "2912", "2885", "2870", "2869", "2775", "1178", "2524"]);
  const keyTasks = Object.fromEntries(tasks.filter(t => KEY_IDS.has(t.id)).map(t => [t.id, t]));

  console.log(JSON.stringify({
    week: `W${maxW}`,
    devActuals: { current: currActuals, previous: prevActuals, prevWeek: `W${maxW-1}` },
    capacity: {
      wkCapacity: W33_CAPACITY,
      nsIpCount: nsIpTasks.length,
      nsIpRemaining: Math.round(remainingNarrow * 10) / 10,
      runwayWk: Math.round(runwayWk * 100) / 100,
      tasks: nsIpTasks.map(t => ({
        id: t.id, totalEst: t.totalEst, actual: t.actual,
        remain: Math.round(Math.max(0, t.totalEst - t.actual) * 10) / 10,
        status: t.status
      }))
    },
    overEstimate: overEst.slice(0, 20),
    keyTasks,
    totalTasks: tasks.length
  }, null, 2));
}

main().catch(e => { process.stderr.write("Fatal: " + e.message + "\n"); process.exit(1); });
