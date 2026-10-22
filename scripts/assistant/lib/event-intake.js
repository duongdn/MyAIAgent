/**
 * Single entry point for every listener: relevance gate → (only if relevant) store + notify owner
 * on Telegram + desktop popup. Irrelevant messages are dropped, not stored.
 * policy.dryRun=true → log the decision to tmp/assistant-gate.log instead of sending.
 */
const { execFile } = require('child_process');
const fs = require('fs');
const path = require('path');
const db = require('./inbox-db');
const policy = require('./policy');
const { judge } = require('./relevance-gate');
const { sendToOwner } = require('./telegram-client');

const ICON = { matrix: '💬 Matrix', email: '📧 Email', slack: '🟣 Slack' };
const URG = { high: '🔴', medium: '🟠', low: '⚪' };
const DESKTOP_NOTIFY = path.join(__dirname, '..', '..', 'desktop-notify.js');
const GATE_LOG = path.join(__dirname, '..', '..', '..', 'tmp', 'assistant-gate.log');

function muteKey(e) { return `${e.source}:${e.account || ''}:${e.channel || ''}`; }
function log(line) { fs.appendFile(GATE_LOG, `${new Date().toISOString()} ${line}\n`, () => {}); }

async function intake(e) {
  const p = policy.load();
  if (!p.enabled || policy.isMuted(e)) return;
  const v = await judge(e);
  log(`${v.notify ? 'NOTIFY' : 'drop  '} [${muteKey(e)}] ${e.sender}: ${(e.text || '').slice(0, 100).replace(/\n/g, ' ')} | ${v.reason}`);
  if (!v.notify) return;

  const id = db.addEvent(e);
  if (!id || p.dryRun) return;
  const head = `${URG[v.urgency] || ''} ${ICON[e.source] || e.source} · ${e.channel || e.account || ''}`;
  const body = `${head}\n${v.summary ? '📝 ' + v.summary + '\n' : ''}👤 ${e.sender || '?'}\n\n${(e.text || '').slice(0, 1200)}${e.url ? '\n\n🔗 ' + e.url : ''}`;
  try {
    await sendToOwner(body, [[
      { text: '👀 Đã xem', callback_data: `seen:${id}` },
      { text: '🔇 Mute kênh này', callback_data: `mute:${id}` },
    ]]);
    db.setStatus(id, 'notified');
  } catch (err) { console.error(`[intake] telegram send failed #${id}: ${err.message}`); }

  if (p.desktopPopup) {
    execFile('node', [DESKTOP_NOTIFY, '--title', head, '--body', v.summary || (e.text || '').slice(0, 200),
      '--urgency', v.urgency === 'high' ? 'critical' : 'normal'],
      { env: { ...process.env, DISPLAY: process.env.DISPLAY || ':0' } }, () => {});
  }
}

module.exports = { intake, muteKey };
