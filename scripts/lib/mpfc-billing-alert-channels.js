/**
 * Alert senders for scripts/mpfc-billing-monitor.js.
 * Each sender: async (alert) => void, throws on failure. alert = { id, title, body }.
 * Which senders exist depends on the machine (the mpfc server has no Telegram/WhatsApp/desktop).
 * Secrets come from gitignored config/ files only.
 */
const fs = require('fs');
const os = require('os');
const path = require('path');
const https = require('https');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..', '..');
const readJson = (f) => { try { return JSON.parse(fs.readFileSync(path.join(ROOT, 'config', f), 'utf8')); } catch { return null; } };
// The MPFC working mailbox. Sent through the live site's wp_mail (same as the server-side fixer alerts):
// the Gmail service account for this mailbox is read-only.
const ALERT_EMAIL = 'freelancer@mypersonalfootballcoach.com';
const SSH_HOST = 'mpfc.mpfc.live';
const WP_PATH = '/var/www/mypersonalfootballcoach.com';
const IS_SERVER = os.hostname() === 'mpfc-upgrade-test';

function postJson(hostname, urlPath, body, headers = {}) {
  const data = Buffer.from(JSON.stringify(body));
  return new Promise((resolve, reject) => {
    const req = https.request({ hostname, path: urlPath, method: 'POST', timeout: 20000,
      headers: { 'Content-Type': 'application/json; charset=utf-8', 'Content-Length': data.length, ...headers } }, (res) => {
      let d = ''; res.on('data', c => d += c); res.on('end', () => { try { resolve(JSON.parse(d)); } catch { resolve({ raw: d }); } });
    });
    req.on('timeout', () => req.destroy(new Error('timeout')));
    req.on('error', reject); req.end(data);
  });
}

async function sendEmail(alert) {
  const php = `$m = json_decode(file_get_contents('php://stdin'), true);
    $ok = wp_mail('${ALERT_EMAIL}', $m['title'], $m['body'], ['From: MPFC Billing Monitor <${ALERT_EMAIL}>']);
    echo $ok ? 'MAIL_OK' : 'MAIL_FAIL';`;
  const cmd = `wp --path=${WP_PATH} eval ${JSON.stringify(php).replace(/\$/g, '\\$')}`;
  const opts = { input: JSON.stringify({ title: alert.title, body: alert.body }), encoding: 'utf8', timeout: 120000, stdio: ['pipe', 'pipe', 'ignore'] };
  const out = IS_SERVER ? execFileSync('bash', ['-c', cmd], opts) : execFileSync('ssh', [SSH_HOST, cmd], opts);
  if (!out.includes('MAIL_OK')) throw new Error(`wp_mail failed: ${out.slice(-200)}`);
}

// DM to ourselves in the MPFC Slack workspace (never a client-visible channel)
async function sendSlack(alert) {
  const ws = (readJson('.slack-accounts.json')?.accounts || []).find(w => w.workspace === 'MyPersonalFootballCoach' || w.name === 'MyPersonalFootballCoach');
  if (!ws?.token) throw new Error('no MPFC Slack token');
  const auth = { Authorization: `Bearer ${ws.token}` };
  const me = await postJson('slack.com', '/api/auth.test', {}, auth);
  if (!me.ok) throw new Error(`slack auth: ${me.error}`);
  const r = await postJson('slack.com', '/api/chat.postMessage', { channel: me.user_id, text: `*${alert.title}*\n${alert.body}` }, auth);
  if (!r.ok) throw new Error(`slack post: ${r.error}`);
}

async function sendTelegram(alert) {
  const { sendToOwner } = require('../assistant/lib/telegram-client');
  await sendToOwner(`${alert.title}\n\n${alert.body}`);
}

// Chat name from config/.mpfc-billing-monitor.json {"whatsappChat": "..."}; skipped until configured
async function sendWhatsApp(alert) {
  const chat = readJson('.mpfc-billing-monitor.json')?.whatsappChat;
  if (!chat) throw new Error('whatsappChat not configured');
  const f = path.join(os.tmpdir(), `mpfc-billing-alert-${process.pid}.txt`);
  fs.writeFileSync(f, `${alert.title}\n${alert.body}`);
  try { execFileSync('node', [path.join(ROOT, 'scripts', 'whatsapp-send-message.js'), chat, f], { timeout: 90000 }); }
  finally { fs.rmSync(f, { force: true }); }
}

// Shows in http://assistant.local/inbox.html
async function sendInbox(alert) {
  const db = require('../assistant/lib/inbox-db');
  db.addEvent({ source: 'mpfc-billing', account: 'MPFC', channel: 'billing-monitor', source_msg_id: `${alert.id}-${Date.now()}`,
    sender: 'MPFC billing monitor', text: `${alert.title}\n${alert.body}`, ts_utc: new Date().toISOString() });
}

async function sendDesktop(alert) {
  execFileSync('node', [path.join(ROOT, 'scripts', 'desktop-notify.js'), '--title', alert.title, '--body', alert.body.slice(0, 300), '--urgency', 'critical'], { timeout: 15000 });
}

/** Senders usable on this machine. */
function channelsFor(isServer) {
  const all = { email: sendEmail, slack: sendSlack };
  if (!isServer) Object.assign(all, { telegram: sendTelegram, whatsapp: sendWhatsApp, inbox: sendInbox, desktop: sendDesktop });
  return all;
}

module.exports = { channelsFor };
