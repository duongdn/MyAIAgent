/**
 * Discord listener — polls every policy.pollMinutes.discord min (default 30) by running the existing scripts/discord-monitor.js
 * (REST, AirAgri + Bizurk only). No gateway websocket: user tokens on a persistent gateway = selfbot ban risk.
 * Messages come oldest-first per run; own account messages are marked isOurs (context only).
 */
const { execFile } = require('child_process');
const path = require('path');
const db = require('../lib/inbox-db');
const { intake } = require('../lib/event-intake');

const policy = require('../lib/policy');
const pollMs = () => (policy.load().pollMinutes?.discord ?? 30) * 60000;
const SCRIPT = path.join(__dirname, '..', '..', 'discord-monitor.js');
const OWN_RE = /^nus/i; // our Discord accounts are nusvinn / nuscarrick

function runMonitor(since) {
  return new Promise((resolve, reject) => execFile('node', [SCRIPT, `--since=${since}`], { timeout: 5 * 60000, maxBuffer: 16 << 20 },
    (err, stdout) => { try { resolve(JSON.parse(stdout)); } catch { reject(new Error(err?.message || 'bad json')); } }));
}

async function tick() {
  const since = db.getCursor('discord:since') || new Date(Date.now() - pollMs()).toISOString();
  const started = new Date().toISOString();
  const out = await runMonitor(since);
  const msgs = [];
  for (const [acct, r] of Object.entries(out)) {
    if (r.tokenValid === false) console.error(`[discord] ${acct}: token invalid (verify 3-step before reporting)`);
    for (const m of r.messages || []) msgs.push({ acct, channel: `${m.guild} #${m.channel}`, ...m });
    for (const m of r.andrewDMs || []) msgs.push({ acct, channel: `DM ${m.recipient}`, ...m });
  }
  msgs.sort((a, b) => a.ts.localeCompare(b.ts));
  for (const m of msgs) {
    await intake({
      source: 'discord', account: m.acct, channel: m.channel, sender: m.author, text: m.content,
      source_msg_id: `${m.channel}:${m.ts}:${m.author}`, ts_utc: new Date(m.ts).toISOString(),
      meta: { isOurs: OWN_RE.test(m.author), isDirect: m.channel.startsWith('DM ') },
    });
  }
  db.setCursor('discord:since', started);
  console.log(`[discord] polled ${msgs.length} msgs since ${since}`);
}

async function run() {
  // Respect the 30-min spacing across daemon restarts too.
  const last = Date.parse(db.getCursor('discord:since') || 0);
  const wait = last + pollMs() - Date.now();
  if (wait > 0) await new Promise(r => setTimeout(r, wait));
  for (;;) {
    await tick().catch(e => console.error(`[discord] ${e.message}`));
    await new Promise(r => setTimeout(r, pollMs()));
  }
}

module.exports = { run };
