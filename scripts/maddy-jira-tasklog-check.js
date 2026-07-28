#!/usr/bin/env node
/**
 * Maddy JIRA × Workstream task log cross-check.
 *
 * For each ticket Kai (LongVV) logged in Workstream this week, verifies:
 *   1. Original estimate set on JIRA
 *   2. Actual time logged on JIRA
 *   3. est >= actual (not over-budget)
 *
 * Data source: Workstream /review/week API (NOT the stale Google Sheet).
 * The Sheet was abandoned 2026-07-13 after full migration to Workstream;
 * reverted to Workstream live data 2026-07-28.
 *
 * Usage:
 *   node scripts/maddy-jira-tasklog-check.js [YYYY-MM-DD]       # one day, JSON
 *   node scripts/maddy-jira-tasklog-check.js --week [YYYY-MM-DD] # full week, md table
 *   Date defaults to yesterday.
 */

const fs = require('fs');
const path = require('path');

const MADDY_PROJECT_ID = 'cmpqc1v7v00ahtk1vs1817xt8';
const WS_CONFIG = path.join(__dirname, '..', 'config', '.workstream-config.json');
const JIRA_CFG = path.join(__dirname, '..', 'config', '.jira-config.json');

// ── helpers ──────────────────────────────────────────────────────────────────

function prevDate() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

function parseHoursHM(s) {
  if (!s) return 0;
  const [h, m] = s.split(':').map(Number);
  return h + (m || 0) / 60;
}

function fmtDuration(seconds) {
  if (!seconds) return '0h';
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return m ? `${h}h ${m}m` : `${h}h`;
}

function extractTickets(str) {
  if (!str) return [];
  return [...new Set((str.match(/[A-Z][A-Z0-9]+-\d+/g) || []))];
}

async function jiraGet(url, email, token) {
  const { default: fetch } = await import('node-fetch');
  const creds = Buffer.from(`${email}:${token}`).toString('base64');
  const res = await fetch(url, { headers: { Authorization: `Basic ${creds}`, Accept: 'application/json' } });
  if (!res.ok) throw new Error(`JIRA ${res.status}: ${url}`);
  return res.json();
}

// ── Workstream auth ──────────────────────────────────────────────────────────

async function ensureWorkstreamToken() {
  const { default: fetch } = await import('node-fetch');
  const config = JSON.parse(fs.readFileSync(WS_CONFIG, 'utf8'));
  const res = await fetch(config.api_base + '/me', { headers: { Authorization: 'Bearer ' + config.access_token } });
  if (res.status === 200) return config;
  process.stderr.write('[workstream] token expired, refreshing via SSO...\n');
  const { execSync } = require('child_process');
  execSync(`DISPLAY=:1 node ${path.join(__dirname, 'workstream-login.js')}`, { stdio: 'inherit', timeout: 60000 });
  return JSON.parse(fs.readFileSync(WS_CONFIG, 'utf8'));
}

// ── main ─────────────────────────────────────────────────────────────────────

async function main() {
  const { default: fetch } = await import('node-fetch');
  const args = process.argv.slice(2);
  const weekMode = args.includes('--week');
  const dateArg = args.find(a => !a.startsWith('--')) || prevDate();
  const targetDate = dateArg;

  // Read JIRA config
  const jiraConfig = JSON.parse(fs.readFileSync(JIRA_CFG, 'utf8'));
  const inst = jiraConfig.instances.madhuraka;

  // Authenticate Workstream
  let wsConfig;
  try {
    wsConfig = await ensureWorkstreamToken();
  } catch (e) {
    const msg = { error: `Workstream auth failed: ${e.message}`, date: targetDate, tickets: [] };
    console.log(JSON.stringify(msg));
    return;
  }

  // Fetch Maddy's week from Workstream
  const wsUrl = `${wsConfig.api_base}/review/week?projectId=${MADDY_PROJECT_ID}&date=${targetDate}`;
  let weekData;
  try {
    const wsRes = await fetch(wsUrl, { headers: { Authorization: 'Bearer ' + wsConfig.access_token } });
    if (wsRes.status !== 200) {
      const msg = { error: `Workstream API ${wsRes.status}`, date: targetDate, tickets: [] };
      console.log(JSON.stringify(msg));
      return;
    }
    weekData = await wsRes.json();
  } catch (e) {
    const msg = { error: `Workstream fetch failed: ${e.message}`, date: targetDate, tickets: [] };
    console.log(JSON.stringify(msg));
    return;
  }

  const allRows = weekData.rows || [];
  if (allRows.length === 0) {
    const msg = weekMode
      ? { week: weekData.weekStart || targetDate, tickets: [], summary: 'No Workstream entries this week' }
      : { date: targetDate, tickets: [], summary: 'No Workstream entries for this date' };
    console.log(JSON.stringify(msg));
    return;
  }

  // Extract ticket entries from Workstream task rows
  // Only Kai/LongVV (employeeName may vary between "LongVV" or "Kai")
  const allEntries = [];
  for (const row of allRows) {
    const name = (row.employeeName || '').trim().toLowerCase();
    if (name !== 'longvv' && name !== 'kai') continue;

    const taskDesc = (row.task || '').trim();
    const actualHours = parseHoursHM(row.actual || '0:00');
    const rowDate = row.date || '';
    const reviewStatus = row.reviewStatus || 'NotRequired';

    // Only include rows in scope
    if (!weekMode && rowDate !== targetDate) continue;

    const tickets = extractTickets(taskDesc);
    for (const t of tickets) {
      allEntries.push({
        date: rowDate,
        ticket: t,
        description: taskDesc,
        hours: actualHours,
        owner: row.employeeName || 'LongVV',
        reviewStatus,
      });
    }
  }

  // Also accept rows with no ticket but that look like task entries (flag them)
  // This catches entries Kai wrote without a ticket key in the task field
  for (const row of allRows) {
    const name = (row.employeeName || '').trim().toLowerCase();
    if (name !== 'longvv' && name !== 'kai') continue;
    const taskDesc = (row.task || '').trim();
    const rowDate = row.date || '';
    if (!weekMode && rowDate !== targetDate) continue;
    if (extractTickets(taskDesc).length > 0) continue; // already captured above

    const actualHours = parseHoursHM(row.actual || '0:00');
    if (actualHours > 0 && taskDesc) {
      // Entry has hours but no recognizable ticket key — flag as untagged
      const tag = taskDesc.length > 50 ? taskDesc.slice(0, 47) + '...' : taskDesc;
      allEntries.push({
        date: rowDate,
        ticket: `(untagged: ${tag})`,
        description: taskDesc,
        hours: actualHours,
        owner: row.employeeName || 'LongVV',
        reviewStatus: row.reviewStatus || 'NotRequired',
      });
    }
  }

  if (allEntries.length === 0) {
    const msg = weekMode
      ? { week: weekData.weekStart || targetDate, tickets: [], summary: 'No JIRA-tagged entries this week (check Workstream for untagged tasks)' }
      : { date: targetDate, tickets: [], summary: 'No JIRA-tagged entries for this date' };
    console.log(JSON.stringify(msg));
    return;
  }

  // Deduplicate tickets but aggregate hours
  const uniqueTickets = [...new Set(allEntries.map(e => e.ticket))];

  // Fetch JIRA for each unique ticket
  const results = [];
  for (const ticketKey of uniqueTickets) {
    const logEntries = allEntries.filter(e => e.ticket === ticketKey);
    const totalHoursLogged = logEntries.reduce((sum, e) => sum + e.hours, 0);

    // Skip JIRA lookup for untagged entries
    if (ticketKey.startsWith('(untagged:')) {
      results.push({
        ticket: ticketKey,
        summary: '(no JIRA ticket key in Workstream task field)',
        status: '—',
        est: '—',
        actual: '—',
        estHours: 0,
        actualHours: 0,
        loggedHours: totalHoursLogged,
        overBudget: false,
        checks: { hasEst: false, hasActual: false, estGteActual: false },
        reviewStatus: logEntries[0]?.reviewStatus || 'NotRequired',
        taskLogEntries: logEntries.map(e => ({ date: e.date, hours: e.hours, description: e.description })),
      });
      continue;
    }

    let jiraData = null, jiraError = null;
    try {
      const fields = 'summary,timeoriginalestimate,timespent,timetracking,status,assignee';
      jiraData = await jiraGet(`${inst.url}/rest/api/3/issue/${ticketKey}?fields=${fields}`, inst.email, inst.api_token);
    } catch (e) {
      jiraError = e.message;
    }

    if (jiraError || !jiraData || jiraData.errorMessages) {
      results.push({
        ticket: ticketKey, error: jiraError || JSON.stringify(jiraData?.errorMessages),
        loggedHours: totalHoursLogged,
        checks: { hasEst: false, hasActual: false, estGteActual: false },
        reviewStatus: logEntries[0]?.reviewStatus || 'NotRequired',
      });
      continue;
    }

    const f = jiraData.fields;
    const estSeconds = f.timeoriginalestimate || 0;
    const actualSeconds = f.timespent || 0;
    const estHours = estSeconds / 3600;
    const actualHours = actualSeconds / 3600;
    const hasEst = estSeconds > 0;
    const hasActual = actualSeconds > 0;
    const estGteActual = hasEst && estSeconds >= actualSeconds;

    results.push({
      ticket: ticketKey,
      summary: f.summary,
      status: f.status?.name,
      est: fmtDuration(estSeconds),
      actual: fmtDuration(actualSeconds),
      estHours,
      actualHours,
      loggedHours: totalHoursLogged,
      overBudget: hasEst && actualSeconds > estSeconds,
      overBy: hasEst ? fmtDuration(Math.max(0, actualSeconds - estSeconds)) : null,
      checks: { hasEst, hasActual, estGteActual },
      reviewStatus: logEntries[0]?.reviewStatus || 'NotRequired',
      taskLogEntries: logEntries.map(e => ({ date: e.date, hours: e.hours, description: e.description })),
    });
  }

  // Summary
  const ok = results.filter(r => !r.error && r.checks.hasEst && r.checks.hasActual && r.checks.estGteActual);
  const missing_est = results.filter(r => !r.error && !r.checks.hasEst);
  const missing_actual = results.filter(r => !r.error && !r.checks.hasActual);
  const over_budget = results.filter(r => !r.error && r.overBudget);
  const errors = results.filter(r => r.error);
  const untagged = results.filter(r => r.ticket.startsWith('(untagged:'));

  if (weekMode) {
    const label = `${weekData.weekStart || targetDate} → ${weekData.weekEnd || targetDate}`;
    console.log(`## Maddy JIRA × Workstream — ${label}\n`);
    if (untagged.length) {
      console.log(`⚠️  **${untagged.length} Workstream entries without JIRA ticket keys** — Kai needs to include ticket ID in task field:\n`);
      for (const u of untagged) {
        console.log(`  - ${u.loggedHours}h — "${u.taskLogEntries[0]?.description || u.ticket.slice(11, -1)}"`);
      }
      console.log('');
    }
    console.log(`| Ticket | Summary | Status | Est | Actual (JIRA) | WS Log | Review | Check |`);
    console.log(`|--------|---------|--------|-----|---------------|--------|--------|-------|`);
    for (const r of results) {
      if (r.error) {
        console.log(`| ${r.ticket} | — | — | — | — | ${r.loggedHours}h | ${r.reviewStatus} | ⚠️ ${r.error} |`);
        continue;
      }
      let check = '✅';
      const flags = [];
      if (!r.checks.hasEst)      flags.push('⚠️ no est');
      if (!r.checks.hasActual)   flags.push('⚠️ no JIRA log');
      if (r.overBudget)          flags.push(`🔴 over ${r.overBy}`);
      if (flags.length)          check = flags.join(' ');
      console.log(`| ${r.ticket} | ${(r.summary||'').slice(0,50)} | ${r.status} | ${r.est} | ${r.actual} | ${r.loggedHours}h | ${r.reviewStatus} | ${check} |`);
    }
    console.log('');
    if (over_budget.length)    console.log(`**Over-budget (${over_budget.length}):** ${over_budget.map(r=>`${r.ticket} est=${r.est} actual=${r.actual} over=${r.overBy}`).join(', ')}`);
    if (missing_est.length)    console.log(`**No estimate (${missing_est.length}):** ${missing_est.map(r=>r.ticket).join(', ')}`);
    if (missing_actual.length) console.log(`**No JIRA log (${missing_actual.length}):** ${missing_actual.map(r=>r.ticket).join(', ')}`);
    if (errors.length)         console.log(`**JIRA errors (${errors.length}):** ${errors.map(r=>r.ticket).join(', ')}`);
    if (!over_budget.length && !missing_est.length && !missing_actual.length && !errors.length) console.log(`All ${ok.length} tickets OK ✅`);
    return;
  }

  console.log(JSON.stringify({
    date: targetDate,
    source: 'Workstream',
    projectId: MADDY_PROJECT_ID,
    tickets: results,
    summary: {
      total: results.length,
      ok: ok.length,
      untagged: untagged.length,
      missing_est: missing_est.map(r => r.ticket),
      missing_actual: missing_actual.map(r => r.ticket),
      over_budget: over_budget.map(r => ({ ticket: r.ticket, est: r.est, actual: r.actual, over: r.overBy })),
      errors: errors.map(r => ({ ticket: r.ticket, error: r.error })),
    }
  }, null, 2));
}

main().catch(e => { console.error(e.message); process.exit(1); });
