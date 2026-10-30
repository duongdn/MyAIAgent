/**
 * Runs scripts/mpfc-billing-monitor.js every 3 hours inside the assistant daemon (office PC).
 * The mpfc server keeps its own cron (every 3h at 00:00/03:00/... UTC); this side runs 1h07 later
 * (01:07/04:07/... UTC) so the two don't overlap. Duplicates are prevented anyway by the per-channel
 * claim on the mpfc server.
 */
const { execFile } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..', '..');
const LOG = path.join(ROOT, 'tmp', 'alert-logs', 'mpfc-billing-monitor.log');
const EVERY_H = 3, OFFSET_H = 1, OFFSET_MIN = 7; // UTC hours 1,4,7,...,22 at :07

function runOnce() {
  execFile(process.execPath, [path.join(ROOT, 'scripts', 'mpfc-billing-monitor.js')], { cwd: ROOT, timeout: 10 * 60e3 }, (err, out, errOut) => {
    fs.mkdirSync(path.dirname(LOG), { recursive: true });
    fs.appendFileSync(LOG, (out || '') + (errOut || '') + (err && !out ? `ERROR: ${err.message}\n` : ''));
  });
}

function msUntilNextSlot(now = new Date()) {
  const t = new Date(now);
  t.setUTCMinutes(OFFSET_MIN, 0, 0);
  while (t <= now || (t.getUTCHours() - OFFSET_H + 24) % EVERY_H !== 0) t.setUTCHours(t.getUTCHours() + 1);
  return t - now;
}

function run() {
  const tick = () => { runOnce(); setTimeout(tick, msUntilNextSlot()); };
  setTimeout(tick, msUntilNextSlot());
  console.log('[mpfc-billing] monitor scheduled every 3h (UTC 1,4,7,...,22 at :07)');
}

module.exports = { run };
