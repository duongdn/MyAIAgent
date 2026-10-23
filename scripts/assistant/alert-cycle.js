#!/usr/bin/env node
/**
 * Layer A — periodic alert cycle (cron, every ~2h in work hours).
 * Runs the read-only `/assistant:alert-scan` via `claude -p` (JSON schema), upserts alerts into the inbox DB,
 * then notifies ONLY new alerts, changed severity/title, or newly resolved ones.
 * policy.dryRun=true → append would-be notifications to tmp/assistant-alerts.log instead of Telegram.
 *
 * Usage: node scripts/assistant/alert-cycle.js [--since ISO]
 */
process.chdir(require('path').join(__dirname, '..', '..'));
const { execFile } = require('child_process');
const crypto = require('crypto');
const fs = require('fs');
const db = require('./lib/inbox-db');
const policy = require('./lib/policy');
const { sendToOwner } = require('./lib/telegram-client');

const LOG = 'tmp/assistant-alerts.log';
const SEV = { high: '🔴', medium: '🟠', low: '⚪' };
const SCHEMA = JSON.stringify({
  type: 'object', required: ['alerts'],
  properties: { alerts: { type: 'array', items: {
    type: 'object', required: ['key', 'project', 'source', 'severity', 'title', 'detail', 'link', 'status', 'suggested_action'],
    properties: {
      key: { type: 'string' }, project: { type: 'string' }, source: { type: 'string' },
      severity: { enum: ['high', 'medium', 'low'] }, title: { type: 'string' }, detail: { type: 'string' },
      link: { type: 'string' }, status: { enum: ['open', 'resolved'] }, suggested_action: { type: 'string' },
    } } } },
});
// Read-only guard on top of the command's own rules.
const DENY = ['Bash(node scripts/matrix-send*)', 'Bash(node scripts/whatsapp-send*)', 'Bash(*trello*)',
  'Bash(*sendMessage*)', 'Bash(*chat.postMessage*)', 'Bash(*--send-reminder*)', 'Bash(git *)', 'Edit', 'NotebookEdit'];

function runScan(since, open) {
  const prompt = `/assistant:alert-scan\n\nsince: ${since}\nopen_alerts: ${JSON.stringify(
    open.map(a => ({ key: a.key, project: a.project, title: a.title, detail: a.detail })))}`;
  return new Promise((resolve, reject) => {
    execFile('claude', ['-p', prompt, '--model', 'sonnet', '--output-format', 'json', '--json-schema', SCHEMA,
      '--dangerously-skip-permissions', '--disallowedTools', ...DENY],
      { timeout: 45 * 60000, maxBuffer: 32 << 20 }, (err, stdout) => {
        try {
          const out = JSON.parse(stdout);
          resolve(out.structured_output || JSON.parse(out.result));
        } catch { reject(new Error(`scan failed: ${err?.message || ''} ${String(stdout).slice(-500)}`)); }
      });
  });
}

const hashOf = a => crypto.createHash('sha1').update(`${a.status}|${a.severity}|${a.title}`).digest('hex');
const fmt = (a, tag) => `${tag} ${SEV[a.severity] || ''} [${a.project}] ${a.title}\n\n${a.detail}` +
  `${a.suggested_action ? '\n\n💡 ' + a.suggested_action : ''}${a.link ? '\n🔗 ' + a.link : ''}`;

async function main() {
  const argSince = process.argv.indexOf('--since');
  const since = argSince > 0 ? process.argv[argSince + 1]
    : db.getCursor('alerts:last_run') || new Date(Date.now() - 3 * 3600000).toISOString();
  const started = new Date().toISOString();
  const { alerts } = await runScan(since, db.openAlerts());
  const p = policy.load();

  for (const a of alerts) {
    const prev = db.getAlert(a.key);
    db.upsertAlert(a, started);
    const h = hashOf(a);
    if (prev?.notified_hash === h) continue;                       // nothing new to tell
    if (!prev && a.status === 'resolved') { db.setAlertNotified(a.key, h); continue; }
    const tag = !prev ? '🆕' : a.status === 'resolved' ? '✅ Đã xử lí:' : '🔄 Cập nhật:';
    const text = fmt(a, tag);
    if (p.dryRun) fs.appendFileSync(LOG, `\n=== ${started}\n${text}\n`);
    else await sendToOwner(text);
    db.setAlertNotified(a.key, h);
  }
  db.setCursor('alerts:last_run', started);
  console.log(`[alert-cycle] ${started} alerts=${alerts.length} open=${alerts.filter(a => a.status === 'open').length} dryRun=${p.dryRun}`);
}

main().catch(e => { console.error('[alert-cycle]', e.message); process.exit(1); });
