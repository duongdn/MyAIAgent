#!/usr/bin/env node
/**
 * Fountain scan for 2026-06-03 (Wednesday) — W29.
 * Parts 2+3: Summary tab actuals + plan vs actual.
 * Part 4: Capacity & runway (Est vs Charged tab).
 * Part 5: Over-estimate tracking (#2595, #2615, #2735).
 * Part 1 (Matrix plan) handled separately.
 */

const { google } = require("googleapis");
const path = require("path");

const SVC = path.join(__dirname, "..", "config", "daily-agent-490610-7eb7985b33e3.json");
const FOUNTAIN_ID = "1iIKfjAh857qzrR2xkUWPcN_9bFAwB1pL8aJWTRk4f4o";

async function fetchRange(sheets, spreadsheetId, range) {
  try {
    const res = await sheets.spreadsheets.values.get({ spreadsheetId, range });
    return res.data.values || [];
  } catch (e) {
    return [["ERROR: " + e.message]];
  }
}

function parseHours(val) {
  if (!val || ["", "-", "—", "#DIV/0!", "#REF!", "N/A"].includes(String(val).trim())) return 0;
  const n = parseFloat(String(val).trim().replace(",", "."));
  return isNaN(n) ? 0 : n;
}

async function main() {
  const auth = new google.auth.GoogleAuth({
    keyFile: SVC,
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });
  const sheets = google.sheets({ version: "v4", auth });

  const results = { parts: {} };

  // ---- Part 2+3: Summary tab ----
  process.stderr.write("Fetching Fountain Summary tab...\n");
  const summaryRows = await fetchRange(sheets, FOUNTAIN_ID, "Summary!A:AH");

  const DEVS = ["ViTHT", "ThinhT", "VuTQ", "PhatDLT", "HungPN", "HaVS", "TrinhMTT"];
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
      const wnum = parseInt(cell0.slice(1));
      weekRows[wnum] = { label: cell0, row: summaryRows[i] };
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

  const maxW = Math.max(...Object.keys(weekRows).map(Number));
  const currWeek = weekRows[maxW] || null;
  const prevWeek = weekRows[maxW - 1] || null;

  process.stderr.write(`Current week: W${maxW}, prev: W${maxW - 1}\n`);

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

  results.parts["2_actuals"] = {
    week: `W${maxW}`,
    curr_actuals: currActuals,
    prev_actuals: prevActuals,
    prev_week: `W${maxW - 1}`,
    note: "VuTQ returned to Fountain W29. TrinhMTT NOT QC.",
  };

  // ---- Part 4: Capacity & Runway ----
  process.stderr.write("Fetching Est vs Charged tab...\n");
  const estRows = await fetchRange(sheets, FOUNTAIN_ID, "Est vs Charged!A:L");

  let remainingEst = 0;
  let totalEst = 0;
  let totalCharged = 0;
  const keyTasks = {};
  const KEY_IDS = new Set(["2595", "2615", "2735"]);
  const overEstTasks = [];

  for (const row of estRows.slice(1)) {
    if (!row || row.length < 2) continue;
    const taskId = String(row[0] || "").trim();
    const taskName = String(row[1] || "").trim();
    const status = String(row[2] || "").trim().toLowerCase();
    const estI = parseHours(row[8]);
    const estJ = parseHours(row[9]);
    const estTotal = estI + estJ;
    const charged = parseHours(row[10]);

    totalEst += estTotal;
    totalCharged += charged;

    if (["not started", "in progress", "in-progress"].includes(status)) {
      remainingEst += estTotal;
    }

    if (KEY_IDS.has(taskId)) {
      keyTasks[taskId] = {
        name: taskName,
        status,
        est_total: Math.round(estTotal * 100) / 100,
        charged: Math.round(charged * 100) / 100,
        over_est: estTotal > 0 && charged > estTotal * 1.2,
      };
    }

    if (estTotal > 0 && charged > estTotal * 1.2) {
      overEstTasks.push({
        task_id: taskId,
        name: taskName.slice(0, 60),
        est: Math.round(estTotal * 100) / 100,
        charged: Math.round(charged * 100) / 100,
        over_pct: Math.round((charged - estTotal) / estTotal * 1000) / 10,
      });
    }
  }

  const devCapacity = 90;
  const runwayWeeks = devCapacity > 0 ? Math.round(remainingEst / devCapacity * 100) / 100 : 0;

  results.parts["4_capacity"] = {
    total_est: Math.round(totalEst * 100) / 100,
    total_charged: Math.round(totalCharged * 100) / 100,
    remaining_est: Math.round(remainingEst * 100) / 100,
    dev_capacity_per_week: devCapacity,
    runway_weeks: runwayWeeks,
  };

  results.parts["5_over_estimate"] = {
    key_tasks: keyTasks,
    all_over_est: overEstTasks.slice(0, 15),
    total_count: overEstTasks.length,
  };

  console.log(JSON.stringify(results, null, 2));
}

main().catch(e => { process.stderr.write("Fatal: " + e.message + "\n"); process.exit(1); });
