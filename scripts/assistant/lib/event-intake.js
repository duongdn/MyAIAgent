/**
 * Single entry point for every listener.
 *  - Every non-muted message goes into the 48h context buffer (history for the judge, "answered?" detection).
 *  - Our own messages stop there. Others go through the relevance gate:
 *      urgent      → store + notify now
 *      await_reply → pending ask; notified only if our side hasn't replied after policy.replyWaitMin (checked every 60s)
 *      none        → dropped (not stored in the inbox)
 * policy.dryRun=true → relevant events still go to the web Inbox; nothing sent to Telegram/desktop.
 */
const { execFile } = require('child_process');
const fs = require('fs');
const path = require('path');
const db = require('./inbox-db');
const policy = require('./policy');
const { judge } = require('./relevance-gate');
const { sendToOwner } = require('./telegram-client');

const ICON = { matrix: '💬 Matrix', email: '📧 Email', slack: '🟣 Slack', discord: '🎮 Discord', whatsapp: '🟢 WhatsApp', zalo: '🔵 Zalo' };
const URG = { high: '🔴', medium: '🟠', low: '⚪' };
const DESKTOP_NOTIFY = path.join(__dirname, '..', '..', 'desktop-notify.js');
const GATE_LOG = path.join(__dirname, '..', '..', '..', 'tmp', 'assistant-gate.log');

const URGENT_REPEAT_MS = 6 * 3600e3;
const lastUrgent = new Map();

function where(e) {
  if (e.source === 'email') return `→ ${e.account || '?'}`;
  if (e.source === 'slack' || e.source === 'discord') return [e.account, e.channel].filter(Boolean).join(' · ');
  return e.channel || e.account || '';
}
function muteKey(e) { return `${e.source}:${e.account || ''}:${e.channel || ''}`; }
function log(tag, e, why) {
  fs.appendFile(GATE_LOG, `${new Date().toISOString()} ${tag.padEnd(6)} [${muteKey(e)}] ${e.sender}: ${(e.text || '').slice(0, 100).replace(/\n/g, ' ')} | ${why}\n`, () => {});
}

async function notify(e, v, prefix = '') {
  const id = db.addEvent(e);
  if (!id) return;
  if (policy.load().dryRun) return db.setStatus(id, 'dryrun'); // inbox only, no Telegram/popup
  const head = `${URG[v.urgency] || ''} ${prefix}${ICON[e.source] || e.source} · ${where(e)}`;
  const body = `${head}\n${v.summary ? '📝 ' + v.summary + '\n' : ''}👤 ${e.sender || '?'}\n\n${(e.text || '').slice(0, 1200)}${e.url ? '\n\n🔗 ' + e.url : ''}`;
  try {
    await sendToOwner(body, [[
      { text: '👀 Đã xem', callback_data: `seen:${id}` },
      { text: '🔇 Mute kênh này', callback_data: `mute:${id}` },
    ]]);
    db.setStatus(id, 'notified');
  } catch (err) { console.error(`[intake] telegram send failed #${id}: ${err.message}`); }
  if (policy.load().desktopPopup) {
    execFile('node', [DESKTOP_NOTIFY, '--title', head, '--body', v.summary || (e.text || '').slice(0, 200),
      '--urgency', v.urgency === 'high' ? 'critical' : 'normal'],
      { env: { ...process.env, DISPLAY: process.env.DISPLAY || ':0' } }, () => {});
  }
}

async function intake(e) {
  const p = policy.load();
  if (!p.enabled || policy.isMuted(e)) return;
  if (!e.meta?.isEdit) db.addRecent(e, e.meta?.isOurs);
  if (e.meta?.isOurs) return;

  const v = await judge(e);
  // Named ask to DuongDN never waits in the queue, whatever the judge said (2026-10-26 Kunal-Fountain miss).
  if (e.meta?.mentionsMe && v.action === 'await_reply') Object.assign(v, { action: 'urgent', urgency: 'high' });
  // Matrix is internal: if DuongDN isn't named, the team handles it ("Duy Vo: ...", leave notices) — only real urgents pass.
  else if (e.source === 'matrix' && !e.meta?.mentionsMe && !e.meta?.isDirect && v.action === 'await_reply') Object.assign(v, { action: 'none', reason: `matrix, not addressed to DuongDN (${v.reason})` });
  if (v.action === 'none') return log('drop', e, v.reason);
  if (v.action === 'await_reply') {
    const due = new Date(Math.max(Date.now(), Date.parse(e.ts_utc)) + (p.replyWaitMin ?? 30) * 60000).toISOString();
    if (db.hasWaitingAsk(e)) return log('WAIT=', e, 'same sender already waiting in channel');
    db.addPendingAsk(e, v, due);
    return log('WAIT', e, v.reason);
  }
  // Repeating alerts (same sender + first line) notify at most once per URGENT_REPEAT_MS.
  const rk = `${muteKey(e)}|${e.sender}|${(e.text || '').split('\n')[0].slice(0, 120)}`;
  if (Date.now() - (lastUrgent.get(rk) || 0) < URGENT_REPEAT_MS) return log('URG=', e, 'repeat suppressed');
  lastUrgent.set(rk, Date.now());
  log('URGENT', e, v.reason);
  await notify(e, v);
}

/** Every 60s: pending asks past their wait time → answered by us? drop : notify. */
async function checkPendingAsks() {
  const p = policy.load();
  for (const a of db.dueAsks(new Date().toISOString())) {
    const e = JSON.parse(a.event_json);
    if (db.oursRepliedSince(a)) { db.setAskStatus(a.id, 'answered'); log('ANSWRD', e, 'our side replied in time'); continue; }
    db.setAskStatus(a.id, 'notified');
    log('NOTIFY', e, `no reply after ${p.replyWaitMin ?? 30} min`);
    await notify(e, JSON.parse(a.verdict_json), `⏳ chưa ai trả lời ${p.replyWaitMin ?? 30}' · `);
  }
}
setInterval(() => checkPendingAsks().catch(err => console.error('[intake] pending', err.message)), 60000);

module.exports = { intake, muteKey };
