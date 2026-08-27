#!/usr/bin/env node
/**
 * Aggregate per-task actual/charged hours for Bailey/Speedventory from Workstream,
 * from the 2026-08-16 Sheet->Workstream migration baseline through today.
 *
 * Replaces the Paturevision "Est vs Charged" Google Sheet's actual-hours column
 * (stale since dev started logging hours directly in Workstream) — see
 * docs/memory/bailey/feedback_bailey_dev_actuals_now_on_workstream.md
 *
 * Keyed by Workstream tag ID (= Sheet column C "Task ID WS"), NOT by free-text task
 * name — different tasks can share the same display text in the task-log dropdown,
 * while the tag uniquely identifies the task (confirmed 2026-08-25: a TuanNT row typed
 * as "Use Average Purchase Price..." carried tagId "101" = Advanced Split Order, not
 * "104" = the real Use Average Purchase Price task).
 *
 * Usage: node scripts/workstream-fetch-speedventory-task-actuals.js [asOfDate]
 * Output: JSON to stdout — { "<tagId, uppercased>": { actual: H, charged: H, taskTexts: [...] } }
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const CONFIG_PATH = path.join(__dirname, '..', 'config', '.workstream-config.json');
const PROJECT_ID = 'cmqyvio51000vqo0xhocbx5c9'; // speedventory (Bailey)
const MIGRATION_WEEK_START = '2026-08-10'; // Monday of the week containing the 2026-08-16 bulk migration

function parseHours(s) {
  if (!s) return 0;
  const [h, m] = s.split(':').map(Number);
  return h + (m || 0) / 60;
}

async function fetchWithToken(url, token) {
  const { default: fetch } = await import('node-fetch');
  const res = await fetch(url, { headers: { 'Authorization': 'Bearer ' + token } });
  if (res.status === 401) return { _expired: true };
  return res.json();
}

function ensureToken() {
  // Reuse the login/refresh flow from workstream-fetch-project-week.js by shelling out
  // to it once (cheap: date arg not important, just needs a valid token afterward).
  execSync(`node ${path.join(__dirname, 'workstream-fetch-project-week.js')} ${MIGRATION_WEEK_START} speedventory`, { stdio: 'ignore' });
  return JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
}

async function main() {
  const args = process.argv.slice(2);
  const asOf = args.find(a => /^\d{4}-\d{2}-\d{2}$/.test(a)) || new Date().toISOString().slice(0, 10);

  const config = ensureToken();

  const totals = {};
  let weekStart = new Date(MIGRATION_WEEK_START + 'T00:00:00Z');
  const endDate = new Date(asOf + 'T00:00:00Z');

  while (weekStart <= endDate) {
    const dateStr = weekStart.toISOString().slice(0, 10);
    const url = config.api_base + '/review/week?projectId=' + PROJECT_ID + '&date=' + dateStr;
    const data = await fetchWithToken(url, config.access_token);
    for (const row of (data.rows || [])) {
      const tagId = (row.tags && row.tags[0] && row.tags[0].tagId || '').trim().toUpperCase();
      if (!tagId) continue; // untagged rows (meetings, admin, etc.) aren't billable tasks — skip
      if (!totals[tagId]) totals[tagId] = { actual: 0, charged: 0, taskTexts: [] };
      totals[tagId].actual += parseHours(row.actual);
      totals[tagId].charged += parseHours(row.charged);
      const text = (row.task || '').trim();
      if (text && !totals[tagId].taskTexts.includes(text)) totals[tagId].taskTexts.push(text);
    }
    weekStart.setUTCDate(weekStart.getUTCDate() + 7);
  }

  for (const tagId of Object.keys(totals)) {
    totals[tagId].actual = parseFloat(totals[tagId].actual.toFixed(2));
    totals[tagId].charged = parseFloat(totals[tagId].charged.toFixed(2));
  }

  console.log(JSON.stringify(totals, null, 2));
}

main().catch(e => { process.stderr.write('[workstream] Error: ' + e.message + '\n'); process.exit(1); });
