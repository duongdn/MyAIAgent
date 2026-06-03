#!/usr/bin/env node
/**
 * Fetch Workstream project week data (all members task logs).
 * Supports both Maddy (Xtreme Soft Solutions) and Rebecca (MissSwimwear).
 *
 * Usage:
 *   node scripts/workstream-fetch-project-week.js [date]          # both projects
 *   node scripts/workstream-fetch-project-week.js [date] maddy    # Maddy only
 *   node scripts/workstream-fetch-project-week.js [date] rebecca  # Rebecca only
 *
 * Date defaults to today (YYYY-MM-DD). Output is JSON to stdout.
 * Errors exit 1. Token auto-refreshed if expired.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const CONFIG_PATH = path.join(__dirname, '..', 'config', '.workstream-config.json');

const PROJECTS = {
  maddy:   { id: 'cmpqc1v7v00ahtk1vs1817xt8', name: 'Xtreme Soft Solutions', client: 'Maddy' },
  rebecca: { id: 'cmpqcflkx00litk1vic3vki6j', name: 'MissSwimwear',           client: 'Rebecca' },
};

// Parse hours "H:MM" -> decimal
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

async function ensureToken() {
  let config = {};
  if (fs.existsSync(CONFIG_PATH)) config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));

  if (config.access_token) {
    const test = await fetchWithToken(config.api_base + '/api/me', config.access_token);
    if (!test._expired && (test.user || test.id)) return config;
  }

  // Token invalid — refresh
  process.stderr.write('[workstream] Token expired, refreshing...\n');
  execSync('DISPLAY=:1 node ' + path.join(__dirname, 'workstream-login.js'), { stdio: 'inherit' });
  return JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
}

async function fetchProjectWeek(config, projectId, date) {
  const url = config.api_base + '/api/review/week?projectId=' + projectId + '&date=' + date;
  return fetchWithToken(url, config.access_token);
}

function summarizeWeek(weekData, projectLabel) {
  const byEmployee = {};
  for (const row of (weekData.rows || [])) {
    if (!byEmployee[row.employeeName]) {
      byEmployee[row.employeeName] = { total: 0, totalCharged: 0, isPt: false, days: {} };
    }
    const actual = parseHours(row.actual);
    const charged = parseHours(row.charged);
    byEmployee[row.employeeName].total += actual;
    byEmployee[row.employeeName].totalCharged += charged;
    if (row.isPt) byEmployee[row.employeeName].isPt = true;
    if (!byEmployee[row.employeeName].days[row.date]) byEmployee[row.employeeName].days[row.date] = 0;
    byEmployee[row.employeeName].days[row.date] += actual;
  }

  return {
    project: projectLabel,
    weekStart: weekData.weekStart,
    weekEnd: weekData.weekEnd,
    missingReportDays: (weekData.dayStrips || []).filter(d => d.clientReportMissing).map(d => d.date),
    members: Object.entries(byEmployee).map(([name, d]) => ({
      name,
      weekTotal: parseFloat(d.total.toFixed(2)),
      weekCharged: parseFloat(d.totalCharged.toFixed(2)),
      isPt: d.isPt,
      days: Object.fromEntries(Object.entries(d.days).map(([dt, h]) => [dt, parseFloat(h.toFixed(2))])),
    })),
  };
}

async function main() {
  const args = process.argv.slice(2);
  const date = args.find(a => /^\d{4}-\d{2}-\d{2}$/.test(a))
    || new Date(Date.now() + 7 * 3600 * 1000).toISOString().slice(0, 10);
  const filter = args.find(a => ['maddy', 'rebecca'].includes(a.toLowerCase()))?.toLowerCase();

  const config = await ensureToken();
  const results = {};

  const targets = filter ? { [filter]: PROJECTS[filter] } : PROJECTS;
  for (const [key, proj] of Object.entries(targets)) {
    const data = await fetchProjectWeek(config, proj.id, date);
    if (data._expired) { process.stderr.write('[workstream] Token still invalid after refresh\n'); process.exit(1); }
    results[key] = summarizeWeek(data, proj.client);
  }

  console.log(JSON.stringify(results, null, 2));
}

main().catch(e => { process.stderr.write('[workstream] Error: ' + e.message + '\n'); process.exit(1); });
