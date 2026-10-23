/**
 * WhatsApp / Zalo listener — every policy.pollMinutes.<app> min runs the existing monitor script
 * (scripts/whatsapp-monitor.js | zalo-monitor.js, via the dedicated monitor Chrome on :9222) and feeds new messages to intake.
 * Both scripts share one Chrome, so runs are serialized through a shared promise chain.
 * "Bạn" (= me) messages are context only (isOurs).
 */
const { execFile } = require('child_process');
const path = require('path');
const db = require('../lib/inbox-db');
const policy = require('../lib/policy');
const { intake } = require('../lib/event-intake');

const SCRIPTS = { whatsapp: 'whatsapp-monitor.js', zalo: 'zalo-monitor.js' };
let chromeChain = Promise.resolve();
const sleep = ms => new Promise(r => setTimeout(r, ms));
const intervalMs = app => (policy.load().pollMinutes?.[app] ?? 30) * 60000;

function runScript(app, since) {
  const job = chromeChain.then(() => new Promise((resolve, reject) =>
    execFile('node', [path.join(__dirname, '..', '..', SCRIPTS[app]), `--since=${since}`],
      { timeout: 5 * 60000, maxBuffer: 16 << 20, env: { ...process.env, DISPLAY: process.env.DISPLAY || ':0' } },
      (err, stdout) => { try { resolve(JSON.parse(stdout)); } catch { reject(new Error(err?.message || 'bad json')); } })));
  chromeChain = job.catch(() => {});
  return job;
}

async function tick(app) {
  const key = `${app}:since`;
  const since = db.getCursor(key) || new Date(Date.now() - intervalMs(app)).toISOString();
  const started = new Date().toISOString();
  const out = await runScript(app, since);
  const msgs = (out.chats || []).flatMap(c => (c.messages || []).map(m => ({ chat: c.name, ...m })))
    .filter(m => m.ts && m.ts >= since).sort((a, b) => a.ts.localeCompare(b.ts));
  for (const m of msgs) {
    await intake({
      source: app, account: app, channel: m.chat, sender: m.from, text: m.text,
      source_msg_id: `${m.chat}:${m.ts}:${m.from}:${(m.text || '').slice(0, 40)}`, ts_utc: m.ts,
      meta: { isOurs: m.from === 'Bạn' || m.from === 'You' },
    });
  }
  db.setCursor(key, started);
  console.log(`[${app}] polled ${msgs.length} msgs since ${since}`);
}

async function run(app) {
  // Respect spacing across daemon restarts.
  const wait = Date.parse(db.getCursor(`${app}:since`) || 0) + intervalMs(app) - Date.now();
  if (wait > 0) await sleep(wait);
  for (;;) {
    await tick(app).catch(e => console.error(`[${app}] ${e.message}`));
    await sleep(intervalMs(app));
  }
}

module.exports = { run };
