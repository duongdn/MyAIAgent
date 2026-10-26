#!/usr/bin/env node
/**
 * MPFC billing monitor — READ-ONLY checks of the MemberMouse/Stripe billing state on the live DB.
 * Catches billing problems before members notice (stuck rebills, dead fixer, charge spikes...).
 *
 * Runs on BOTH the mpfc server (24/7: email + Slack) and the office PC (when on: also Telegram,
 * WhatsApp, assistant inbox, desktop). No duplicates: before sending, each run "claims" (alert, channel)
 * pairs in ONE state file on the mpfc server under flock. A pair is re-sent at most every 24h while the
 * problem persists; resolved alerts are dropped from the state.
 *
 *   node scripts/mpfc-billing-monitor.js            run checks + send alerts
 *   node scripts/mpfc-billing-monitor.js --dry-run  print alerts only
 *   node scripts/mpfc-billing-monitor.js --test-alert  add a fake alert to test channels + dedupe
 *   node scripts/mpfc-billing-monitor.js --claim    (internal, on mpfc) stdin {host, alertIds, channels} -> grants
 */
const fs = require('fs');
const os = require('os');
const path = require('path');
const crypto = require('crypto');
const { execFileSync } = require('child_process');
const { channelsFor } = require('./lib/mpfc-billing-alert-channels');
const { CHECKS } = require('./lib/mpfc-billing-monitor-checks');

const IS_SERVER = os.hostname() === 'mpfc-upgrade-test';
const SSH_HOST = 'mpfc.mpfc.live';
const SERVER_AGENT_DIR = '/var/www/MyDailyAgent';
const WP_PATH = '/var/www/mypersonalfootballcoach.com';
const STATE_FILE = path.join(SERVER_AGENT_DIR, 'data', 'mpfc-billing-monitor-state.json');
const RESEND_MS = 24 * 3600 * 1000;

function onServer(cmd, input) {
  const opts = { input, encoding: 'utf8', timeout: 120000, stdio: ['pipe', 'pipe', 'ignore'] };
  return IS_SERVER ? execFileSync('bash', ['-c', cmd], opts) : execFileSync('ssh', [SSH_HOST, cmd], opts);
}

/** Read-only SQL; returns rows as arrays of strings. */
function query(sql) {
  const out = onServer(`wp --path=${WP_PATH} --skip-plugins --skip-themes db query --skip-column-names`, sql);
  return out.split('\n').filter(Boolean).map(l => l.split('\t'));
}

// ── claim (runs on the server, inside flock) ──
function claim(req) {
  let st = { alerts: {}, lastRun: {} };
  try { st = JSON.parse(fs.readFileSync(STATE_FILE, 'utf8')); } catch {}
  const now = Date.now(), grants = {};
  for (const id of Object.keys(st.alerts)) if (!req.alertIds.includes(id)) delete st.alerts[id]; // resolved
  for (const id of req.alertIds) {
    const sent = st.alerts[id] ||= {};
    grants[id] = req.channels.filter(ch => !sent[ch] || now - sent[ch] >= RESEND_MS);
    for (const ch of grants[id]) sent[ch] = now;
  }
  const otherRun = Object.entries(st.lastRun).filter(([h]) => h !== req.host);
  st.lastRun[req.host] = now;
  fs.mkdirSync(path.dirname(STATE_FILE), { recursive: true });
  fs.writeFileSync(STATE_FILE, JSON.stringify(st, null, 1));
  return { grants, otherRun: Object.fromEntries(otherRun) };
}
function release(req) { // a granted send failed: let the next run (either machine) retry it
  const st = JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
  for (const [id, chs] of Object.entries(req.failed)) for (const ch of chs) if (st.alerts[id]) delete st.alerts[id][ch];
  fs.writeFileSync(STATE_FILE, JSON.stringify(st, null, 1));
  return {};
}
function remote(action, payload) {
  const cmd = `cd ${SERVER_AGENT_DIR} && flock ${STATE_FILE}.lock node scripts/mpfc-billing-monitor.js --${action}`;
  return JSON.parse(onServer(cmd, JSON.stringify(payload)));
}

async function main() {
  const args = process.argv.slice(2);
  if (args.includes('--claim') || args.includes('--release')) {
    const req = JSON.parse(fs.readFileSync(0, 'utf8'));
    process.stdout.write(JSON.stringify(args.includes('--claim') ? claim(req) : release(req)));
    return;
  }
  const alerts = [];
  for (const c of CHECKS) {
    let rows;
    try { rows = query(c.sql); } catch (e) { rows = [[`check failed: ${e.message.split('\n')[0]}`]]; }
    const bad = c.evaluate ? c.evaluate(rows) : rows;
    if (!bad.length) continue;
    const detail = bad.slice(0, 30).map(r => '  ' + r.join(' | ')).join('\n');
    // stable id: column 1 identifies the problem; changing values (ages, counts) must not re-alert
    const id = c.key + '-' + crypto.createHash('md5').update(bad.map(r => r[0]).join(',')).digest('hex').slice(0, 10);
    alerts.push({ id, title: `[MPFC billing] ${c.title}`, body: `${c.why}\n\n${detail}${bad.length > 30 ? `\n  …+${bad.length - 30} more` : ''}` });
  }
  if (args.includes('--test-alert')) alerts.push({ id: 'test-alert', title: '[MPFC billing] TEST alert (ignore)', body: 'Channel/dedupe test of scripts/mpfc-billing-monitor.js. No billing problem.' });
  if (args.includes('--dry-run')) { console.log(alerts.length ? alerts.map(a => `${a.title}\n${a.body}`).join('\n\n') : 'OK — no billing issues'); return; }

  const senders = channelsFor(IS_SERVER);
  const host = IS_SERVER ? 'mpfc' : os.hostname();
  const { grants, otherRun } = remote('claim', { host, alertIds: alerts.map(a => a.id), channels: Object.keys(senders) });
  // The server monitor itself silently dying is also a problem: the PC flags it
  if (!IS_SERVER && (!otherRun.mpfc || Date.now() - otherRun.mpfc > 3600000)) {
    console.log('WARN: mpfc-side monitor has not run for 1h+');
    await senders.desktop?.({ id: 'server-monitor-down', title: '[MPFC billing] server monitor not running', body: 'mpfc cron has not run the billing monitor for 1h+' }).catch(() => {});
  }
  const failed = {};
  for (const a of alerts) for (const ch of grants[a.id] || []) {
    try { await senders[ch](a); console.log(`sent ${a.id} via ${ch}`); }
    catch (e) { console.log(`FAILED ${a.id} via ${ch}: ${e.message}`); (failed[a.id] ||= []).push(ch); }
  }
  if (Object.keys(failed).length) remote('release', { failed });
  console.log(`${new Date().toISOString()} ${host}: ${alerts.length} alert(s)`);
}

main().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
