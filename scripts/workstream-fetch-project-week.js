#!/usr/bin/env node
/**
 * Fetch Workstream project week data.
 * Supports manager projects (Maddy, Rebecca) via /review/week (all-member view),
 * and techLead-only projects (Blair Brown) via /time/projects/{id}/week (self view).
 *
 * Usage:
 *   node scripts/workstream-fetch-project-week.js [date]                  # all projects
 *   node scripts/workstream-fetch-project-week.js [date] maddy            # Maddy only
 *   node scripts/workstream-fetch-project-week.js [date] rebecca          # Rebecca only
 *   node scripts/workstream-fetch-project-week.js [date] blair_brown      # Blair Brown only
 *   node scripts/workstream-fetch-project-week.js [date] james_diamond    # James Diamond only
 *   node scripts/workstream-fetch-project-week.js [date] generator        # Generator only
 *   node scripts/workstream-fetch-project-week.js [date] fountain         # Fountain only
 *
 * Date defaults to today (YYYY-MM-DD). Output is JSON to stdout.
 * Errors exit 1. Token auto-refreshed if expired.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const CONFIG_PATH = path.join(__dirname, '..', 'config', '.workstream-config.json');

// manager: true  → uses /review/week (all members visible)
// manager: false → uses /time/projects/{id}/week (self hours only, works for techLead)
const PROJECTS = {
  maddy:          { id: 'cmpqc1v7v00ahtk1vs1817xt8', name: 'Xtreme Soft Solutions',     client: 'Maddy',          manager: true  },
  rebecca:        { id: 'cmpqcflkx00litk1vic3vki6j', name: 'MissSwimwear',               client: 'Rebecca',        manager: true  },
  blair_brown:    { id: 'cmqj4tj6v01gfm81vgx7ipkov', name: 'WordPress Update',           client: 'Blair Brown',    manager: true  },
  baamboozle:     { id: 'cmqez93ka07q8p81v7035l3td', name: 'Baamboozle',                 client: 'Baamboozle',     manager: true  },
  colin_etz:      { id: 'cmqezatb807qvp81vpnzzimmp', name: 'Colin/ETZ',                  client: 'Colin',          manager: true  },
  james_diamond:  { id: 'cmqook9vf0kl8m81vusyo8ppt', name: 'Portfolio - James Diamond',  client: 'James Diamond',  manager: true  },
  family_app:     { id: 'cmqezfyzv07z6p81vf403t9lp', name: 'Family App',                 client: 'Charles Chang',  manager: true  },
  generator:      { id: 'cmqoou4h10kzum81vovi8rrsk', name: 'Generator',                  client: 'Elliott',        manager: true  },
  fountain:       { id: 'cmpqcjojh00q2tk1v2qi7gs0j', name: 'Fountain Greetings',         client: 'Kunal',          manager: true  },
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
    const test = await fetchWithToken(config.api_base + '/me', config.access_token);
    if (!test._expired && (test.user || test.id)) return config;
  }

  // Token invalid — refresh
  process.stderr.write('[workstream] Token expired, refreshing...\n');
  execSync('DISPLAY=:1 node ' + path.join(__dirname, 'workstream-login.js'), { stdio: 'inherit' });
  return JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
}

// Manager endpoint: /review/week — shows all team members
async function fetchProjectWeekManager(config, projectId, date) {
  const url = config.api_base + '/review/week?projectId=' + projectId + '&date=' + date;
  return fetchWithToken(url, config.access_token);
}

// TechLead endpoint: /time/projects/{id}/week — shows self hours only
async function fetchProjectWeekSelf(config, projectId, date) {
  const url = config.api_base + '/time/projects/' + projectId + '/week?date=' + date;
  return fetchWithToken(url, config.access_token);
}

function summarizeWeekManager(weekData, projectLabel) {
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

// For self-view (techLead): wraps into same output shape with a single member entry
function summarizeWeekSelf(weekData, projectLabel, selfName) {
  const stats = weekData.weekStats || {};
  // API returns 'actual'/'charged' (minutes), not 'totalActualMinutes'/'totalChargedMinutes'
  const totalMins = stats.actual || stats.totalActualMinutes || 0;
  const chargedMins = stats.charged || stats.totalChargedMinutes || 0;
  const days = {};
  for (const day of (weekData.weekDays || [])) {
    // Per-day: sum from tasks array (no day.stats on self-view endpoint)
    const dayTaskMins = (day.tasks || []).reduce((sum, t) => {
      const [h, m] = (t.actual || '0:0').split(':').map(Number);
      return sum + h * 60 + (m || 0);
    }, 0);
    const mins = dayTaskMins || (day.stats || {}).totalActualMinutes || 0;
    if (mins > 0) days[day.date] = parseFloat((mins / 60).toFixed(2));
  }
  return {
    project: projectLabel,
    weekStart: weekData.weekStart,
    weekEnd: weekData.weekEnd,
    missingReportDays: [],
    members: [{
      name: selfName || 'DuongDN',
      weekTotal: parseFloat((totalMins / 60).toFixed(2)),
      weekCharged: parseFloat((chargedMins / 60).toFixed(2)),
      isPt: false,
      days,
    }],
  };
}

async function main() {
  const args = process.argv.slice(2);
  const date = args.find(a => /^\d{4}-\d{2}-\d{2}$/.test(a))
    || new Date(Date.now() + 7 * 3600 * 1000).toISOString().slice(0, 10);
  const filter = args.find(a => Object.keys(PROJECTS).includes(a.toLowerCase()))?.toLowerCase();

  const config = await ensureToken();
  const selfName = config.user?.name || 'DuongDN';
  const results = {};

  const targets = filter ? { [filter]: PROJECTS[filter] } : PROJECTS;
  for (const [key, proj] of Object.entries(targets)) {
    if (proj.manager) {
      const data = await fetchProjectWeekManager(config, proj.id, date);
      if (data._expired) { process.stderr.write('[workstream] Token still invalid after refresh\n'); process.exit(1); }
      results[key] = summarizeWeekManager(data, proj.client);
    } else {
      const data = await fetchProjectWeekSelf(config, proj.id, date);
      if (data._expired) { process.stderr.write('[workstream] Token still invalid after refresh\n'); process.exit(1); }
      results[key] = summarizeWeekSelf(data, proj.client, selfName);
    }
  }

  console.log(JSON.stringify(results, null, 2));
}

main().catch(e => { process.stderr.write('[workstream] Error: ' + e.message + '\n'); process.exit(1); });
