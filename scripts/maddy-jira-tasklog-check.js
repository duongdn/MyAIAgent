#!/usr/bin/env node
/**
 * Daily check: extract JIRA tickets from Maddy task log, verify each ticket has:
 *   1. Original estimate set
 *   2. Actual time logged on JIRA
 *   3. est >= actual (not over-budget)
 *
 * Usage:
 *   node scripts/maddy-jira-tasklog-check.js [YYYY-MM-DD]
 *   Date defaults to yesterday (PREV_DATE). Output: JSON to stdout.
 */

const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');

const SHEET_ID  = '1PHW76CuJ7nEJ3bU150iIVFsVXrQOmP5lVKgfI4ESR7I';
const SA_KEY    = path.join(__dirname, '..', 'config', 'daily-agent-490610-7eb7985b33e3.json');
const JIRA_CFG  = path.join(__dirname, '..', 'config', '.jira-config.json');

// ── helpers ──────────────────────────────────────────────────────────────────

function prevDate() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

function parseDate(s) {
  // "2026-06-10" → { day:"10", month:"06", year:"26" }
  const [y, m, d] = s.split('-');
  return { day: d, month: m, year: y.slice(2) };
}

function fmtDuration(seconds) {
  if (!seconds) return '0h';
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return m ? `${h}h ${m}m` : `${h}h`;
}

// Extract all JIRA ticket keys from a string (e.g. "LIFM2-442: ..." or URL)
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

// ── main ─────────────────────────────────────────────────────────────────────

async function main() {
  const targetDate = process.argv[2] || prevDate();
  const { day, month, year } = parseDate(targetDate);
  // Sheet date header format: "Mon, 10/06/26"
  const datePattern = new RegExp(`${day}/${month}/${year}`, 'i');

  // Read JIRA config
  const jiraConfig = JSON.parse(fs.readFileSync(JIRA_CFG, 'utf8'));
  const inst = jiraConfig.instances.madhuraka;

  // Auth Google Sheets
  const creds = JSON.parse(fs.readFileSync(SA_KEY, 'utf8'));
  const auth = new google.auth.GoogleAuth({ credentials: creds, scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'] });
  const sheets = google.sheets({ version: 'v4', auth });

  // Find correct week tab via Summary
  const summaryRes = await sheets.spreadsheets.values.get({ spreadsheetId: SHEET_ID, range: 'Summary!A1:D60' });
  const summaryRows = summaryRes.data.values || [];

  let weekTab = null;
  const target = new Date(targetDate);
  for (const row of summaryRows) {
    if (!row[0] || !row[0].match(/^W\d+$/)) continue;
    const start = new Date(row[1]);
    const end   = new Date(row[2]);
    if (target >= start && target <= end) { weekTab = row[0]; break; }
  }

  if (!weekTab) {
    console.log(JSON.stringify({ error: `No week tab found for ${targetDate}`, date: targetDate, tickets: [] }));
    return;
  }

  // Fetch week tab rows
  const weekRes = await sheets.spreadsheets.values.get({ spreadsheetId: SHEET_ID, range: `${weekTab}!A1:K200` });
  const rows = weekRes.data.values || [];

  // Find rows belonging to targetDate
  let inTargetDay = false;
  const dayTickets = []; // { ticket, description, hours, owner }

  for (const row of rows) {
    const cell = (row[0] || '').trim();
    if (datePattern.test(cell)) { inTargetDay = true; continue; }
    // Stop at next day header (contains a date pattern like "Tue," or "Wed," etc.)
    if (inTargetDay && /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun),/.test(cell)) break;
    if (!inTargetDay) continue;
    if (cell !== 'Task dự án') continue;

    const description = (row[2] || '').trim();
    const reference   = (row[3] || '').trim();
    const owner       = (row[6] || '').trim();
    const hours       = parseFloat(row[7]) || 0;

    const tickets = [...extractTickets(description), ...extractTickets(reference)];
    for (const t of tickets) {
      dayTickets.push({ ticket: t, description, hours, owner });
    }
  }

  if (dayTickets.length === 0) {
    console.log(JSON.stringify({ date: targetDate, week: weekTab, tickets: [], summary: 'No ticket entries found for this date' }));
    return;
  }

  // Deduplicate tickets but keep all hours entries
  const uniqueTickets = [...new Set(dayTickets.map(e => e.ticket))];

  // Fetch JIRA for each unique ticket
  const results = [];
  for (const ticketKey of uniqueTickets) {
    const logEntries = dayTickets.filter(e => e.ticket === ticketKey);
    const totalHoursLogged = logEntries.reduce((sum, e) => sum + e.hours, 0);

    let jiraData = null;
    let jiraError = null;
    try {
      const fields = 'summary,timeoriginalestimate,timespent,timetracking,status,assignee';
      jiraData = await jiraGet(`${inst.url}/rest/api/3/issue/${ticketKey}?fields=${fields}`, inst.email, inst.api_token);
    } catch (e) {
      jiraError = e.message;
    }

    if (jiraError || !jiraData || jiraData.errorMessages) {
      results.push({ ticket: ticketKey, error: jiraError || JSON.stringify(jiraData?.errorMessages), loggedHours: totalHoursLogged, checks: { hasEst: false, hasActual: false, estGteActual: false } });
      continue;
    }

    const f              = jiraData.fields;
    const estSeconds     = f.timeoriginalestimate || 0;
    const actualSeconds  = f.timespent || 0;
    const estHours       = estSeconds / 3600;
    const actualHours    = actualSeconds / 3600;
    const hasEst         = estSeconds > 0;
    const hasActual      = actualSeconds > 0;
    const estGteActual   = hasEst && estSeconds >= actualSeconds;

    results.push({
      ticket:       ticketKey,
      summary:      f.summary,
      status:       f.status?.name,
      est:          fmtDuration(estSeconds),
      actual:       fmtDuration(actualSeconds),
      estHours,
      actualHours,
      loggedHours:  totalHoursLogged,  // hours written in task log today
      overBudget:   hasEst && actualSeconds > estSeconds,
      overBy:       hasEst ? fmtDuration(Math.max(0, actualSeconds - estSeconds)) : null,
      checks: {
        hasEst,
        hasActual,
        estGteActual,
      },
      taskLogEntries: logEntries.map(e => ({ owner: e.owner, hours: e.hours, description: e.description })),
    });
  }

  // Summary flags
  const missing_est    = results.filter(r => !r.error && !r.checks.hasEst);
  const missing_actual = results.filter(r => !r.error && !r.checks.hasActual);
  const over_budget    = results.filter(r => !r.error && r.overBudget);
  const ok             = results.filter(r => !r.error && r.checks.hasEst && r.checks.hasActual && r.checks.estGteActual);
  const errors         = results.filter(r => r.error);

  console.log(JSON.stringify({
    date:    targetDate,
    week:    weekTab,
    tickets: results,
    summary: {
      total:          results.length,
      ok:             ok.length,
      missing_est:    missing_est.map(r => r.ticket),
      missing_actual: missing_actual.map(r => r.ticket),
      over_budget:    over_budget.map(r => ({ ticket: r.ticket, est: r.est, actual: r.actual, over: r.overBy })),
      errors:         errors.map(r => ({ ticket: r.ticket, error: r.error })),
    }
  }, null, 2));
}

main().catch(e => { console.error(e.message); process.exit(1); });
