#!/usr/bin/env node
/**
 * Fountain scan for W34 (2026-07-08 daily report run).
 * Part 2+3: Task log actuals from Summary tab.
 * Part 4: Capacity & runway (Est vs Charged tab, Col I+J est, Col K actual).
 * Part 5: Over-estimate tracking (actual > total_est * 1.2).
 */

const { google } = require("googleapis");
const path = require("path");

const SVC = path.join(__dirname, "..", "config", "daily-agent-490610-7eb7985b33e3.json");
const FOUNTAIN_ID = "1iIKfjAh857qzrR2xkUWPcN_9bFAwB1pL8aJWTRk4f4o";
const W33_CAPACITY = 100; // placeholder, recomputed from today's Matrix plan after fetch

const DONE_STATUSES = new Set([
  "Deployed on Live", "Cancelled", "Has Bug on Live", "Tested on Live"
]);
// Orchestrator-requested exclusion for Part 4 is narrower: only these two statuses
const DONE_STATUSES_STRICT = new Set(["Deployed on Live", "Cancelled"]);

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
      // Col B (idx1) holds the week's start date (e.g. "July 6, 2026") — the sheet is
      // pre-templated through W52, so picking max(W-number) grabs a future empty row.
      // Must pick by actual calendar date <= today instead.
      const dateStr = String(summaryRows[i][1] || "").trim();
      const parsed = dateStr ? new Date(dateStr) : null;
      weekRows[parseInt(cell0.slice(1))] = { label: cell0, row: summaryRows[i], date: parsed && !isNaN(parsed) ? parsed : null };
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

  const TODAY = new Date("2026-07-08T00:00:00");
  const withDates = Object.entries(weekRows).filter(([, w]) => w.date && w.date <= TODAY);
  const maxW = withDates.length
    ? Math.max(...withDates.map(([w]) => Number(w)))
    : Math.max(...Object.keys(weekRows).map(Number));
  const currWeek = weekRows[maxW] || null;
  const prevWeek = weekRows[maxW - 1] || null;
  process.stderr.write(`Current: W${maxW} (date=${currWeek && currWeek.date}), prev: W${maxW-1}\n`);

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
    const taskSlug = String(row[0] || "").trim();
    if (!taskSlug || taskSlug === "#" || taskSlug.toLowerCase().startsWith("task")) continue;
    // Task slug is e.g. "2502_update_cart_and_checkout_page" or bare "2615" — id is leading digits, name is the rest
    const slugMatch = taskSlug.match(/^(\d+)[-_ ]?(.*)$/);
    const taskId = slugMatch ? slugMatch[1] : taskSlug;
    const slugName = slugMatch && slugMatch[2] ? slugMatch[2].replace(/[-_]+/g, " ").trim() : "";
    const taskName = slugName || String(row[1] || "").trim();
    const status = String(row[6] || "").trim();  // Col G (idx6) = Status (NOT idx2 — bug fixed 2026-07-04)
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

  // Broad bucket: ALL active (non-excluded) tasks, regardless of status
  const activeBroad = tasks.filter(t => !DONE_STATUSES.has(t.status));
  const remainingBroad = activeBroad.reduce((s, t) => s + Math.max(0, t.totalEst - t.actual), 0);
  const runway60Broad = remainingBroad / 60;
  const runway100Broad = remainingBroad / 100;
  const runway60Narrow = remainingNarrow / 60;
  const runway100Narrow = remainingNarrow / 100;

  // Strict broad bucket (orchestrator spec: exclude ONLY Deployed on Live + Cancelled) — for W32 apples-to-apples comparison
  const activeBroadStrict = tasks.filter(t => !DONE_STATUSES_STRICT.has(t.status));
  const remainingBroadStrict = activeBroadStrict.reduce((s, t) => s + Math.max(0, t.totalEst - t.actual), 0);
  const runway60BroadStrict = remainingBroadStrict / 60;
  const runway100BroadStrict = remainingBroadStrict / 100;
  process.stderr.write(`Active broad (strict, excl only Deployed-on-Live+Cancelled): ${activeBroadStrict.length} tasks, ${remainingBroadStrict.toFixed(1)}h remaining\n`);
  process.stderr.write(`Runway broad strict: 60h/wk=${runway60BroadStrict.toFixed(2)}wk | 100h/wk=${runway100BroadStrict.toFixed(2)}wk\n`);

  // Zero-filter total (matches W32's methodology, which had a status-read bug that excluded nothing)
  const remainingAll = tasks.reduce((s, t) => s + Math.max(0, t.totalEst - t.actual), 0);
  process.stderr.write(`ALL tasks (no status filter, for W32 apples-to-apples): ${tasks.length} tasks, ${remainingAll.toFixed(1)}h remaining\n`);

  process.stderr.write(`NS+IP (narrow): ${nsIpTasks.length} tasks, ${remainingNarrow.toFixed(1)}h remaining\n`);
  process.stderr.write(`Runway narrow: ${runwayWk.toFixed(2)} weeks at ${W33_CAPACITY}h/wk | 60h/wk=${runway60Narrow.toFixed(2)}wk | 100h/wk=${runway100Narrow.toFixed(2)}wk\n`);
  process.stderr.write(`Active broad: ${activeBroad.length} tasks, ${remainingBroad.toFixed(1)}h remaining\n`);
  process.stderr.write(`Runway broad: 60h/wk=${runway60Broad.toFixed(2)}wk | 100h/wk=${runway100Broad.toFixed(2)}wk\n`);

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
      narrow: {
        count: nsIpTasks.length,
        remaining: Math.round(remainingNarrow * 10) / 10,
        runwayAtPlanWk: Math.round(runwayWk * 100) / 100,
        runwayAt60Wk: Math.round(runway60Narrow * 100) / 100,
        runwayAt100Wk: Math.round(runway100Narrow * 100) / 100,
        tasks: nsIpTasks.map(t => ({
          id: t.id, name: t.name, totalEst: t.totalEst, actual: t.actual,
          remain: Math.round(Math.max(0, t.totalEst - t.actual) * 10) / 10,
          status: t.status
        }))
      },
      broad: {
        count: activeBroad.length,
        remaining: Math.round(remainingBroad * 10) / 10,
        runwayAt60Wk: Math.round(runway60Broad * 100) / 100,
        runwayAt100Wk: Math.round(runway100Broad * 100) / 100,
      },
      broadStrict: {
        count: activeBroadStrict.length,
        remaining: Math.round(remainingBroadStrict * 10) / 10,
        runwayAt60Wk: Math.round(runway60BroadStrict * 100) / 100,
        runwayAt100Wk: Math.round(runway100BroadStrict * 100) / 100,
      },
      allTasksNoFilter: {
        count: tasks.length,
        remaining: Math.round(remainingAll * 10) / 10,
      }
    },
    overEstimate: overEst.slice(0, 20),
    keyTasks,
    totalTasks: tasks.length
  }, null, 2));
}

main().catch(e => { process.stderr.write("Fatal: " + e.message + "\n"); process.exit(1); });
