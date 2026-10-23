/**
 * Slack listener per workspace in config/.slack-accounts.json:
 *  - RTM websocket (realtime) when rtm.connect is allowed (xoxc session tokens)
 *  - otherwise poll search.messages every POLL_MS (xoxp tokens lack RTM scope)
 * Own messages skipped (auth.test user_id). First run starts from "now".
 */
const WebSocket = require('ws');
const db = require('../lib/inbox-db');
const { intake } = require('../lib/event-intake');
const policy = require('../lib/policy');
const { accounts } = require('../../../config/.slack-accounts.json');

const POLL_MS = 60000;
const sleep = ms => new Promise(r => setTimeout(r, ms));
// xoxc session tokens need token in the form body + URL-encoded d cookie (same as slack-fetch-ohcleo.js); works for xoxp too.
const cookieOf = a => (a.cookie ? { Cookie: `d=${encodeURIComponent(decodeURIComponent(a.cookie))}` } : {});
const headersOf = a => ({ Authorization: `Bearer ${a.token}`, ...cookieOf(a) });

async function slack(a, method, params = {}) {
  const res = await fetch(`https://slack.com/api/${method}`, {
    method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded', ...cookieOf(a) },
    body: new URLSearchParams({ token: a.token, ...params }), signal: AbortSignal.timeout(20000) });
  return res.json();
}

function toEvent(a, m, channelName, permalink, me) {
  return {
    source: 'slack', account: a.workspace, channel: channelName, source_msg_id: `${a.workspace}:${m.channel?.id || m.channel}:${m.ts}`,
    thread_id: m.thread_ts, sender: m.username || m.user_profile?.real_name || m.user, text: m.text,
    url: permalink, ts_utc: new Date(parseFloat(m.ts) * 1000).toISOString(),
    meta: { isOurs: m.user === me || policy.load().ourSlackNames?.some(n => (m.username || m.user_profile?.real_name || '').toLowerCase().includes(n.toLowerCase())), isBot: !!(m.bot_id || m.subtype === 'bot_message'), isDirect: !!(m.channel?.is_im || String(m.channel).startsWith('D')), mentionsMe: me && (m.text || '').includes(`<@${me}>`) },
  };
}

async function pollLoop(a, me) {
  const key = `slack:${a.workspace}:ts`;
  if (!db.getCursor(key)) db.setCursor(key, Date.now() / 1000);
  for (;;) {
    try {
      const after = new Date(Date.now() - 2 * 86400000).toISOString().slice(0, 10);
      const r = await slack(a, 'search.messages', { query: `after:${after}`, count: 50, sort: 'timestamp', sort_dir: 'desc' });
      if (!r.ok) throw new Error(r.error);
      const last = parseFloat(db.getCursor(key));
      const fresh = (r.messages?.matches || []).filter(m => parseFloat(m.ts) > last).reverse();
      for (const m of fresh) {
        await intake(toEvent(a, m, m.channel?.is_im ? `DM:${m.channel.id}` : `#${m.channel?.name}`, m.permalink, me));
        db.setCursor(key, m.ts);
      }
    } catch (err) { console.error(`[slack] poll ${a.workspace}: ${err.message}`); }
    await sleep(POLL_MS);
  }
}

async function rtmLoop(a, me) {
  const names = new Map();
  const chName = async id => {
    if (!names.has(id)) {
      const r = await slack(a, 'conversations.info', { channel: id }).catch(() => ({}));
      names.set(id, r.channel?.is_im ? `DM:${id}` : `#${r.channel?.name || id}`);
    }
    return names.get(id);
  };
  for (;;) {
    const c = await slack(a, 'rtm.connect').catch(e => ({ error: e.message }));
    if (!c.ok) { console.error(`[slack] rtm ${a.workspace}: ${c.error}`); await sleep(60000); continue; }
    console.log(`[slack] RTM listening ${a.workspace}`);
    await new Promise(resolve => {
      const ws = new WebSocket(c.url, { headers: headersOf(a) });
      const ping = setInterval(() => ws.readyState === 1 && ws.send(JSON.stringify({ id: Date.now(), type: 'ping' })), 30000);
      ws.on('message', async raw => {
        const m = JSON.parse(raw);
        if (m.type !== 'message' || (m.subtype && m.subtype !== 'thread_broadcast') || !m.text) return;
        await intake(toEvent(a, m, await chName(m.channel), `${a.url.replace(/\/$/, '')}/archives/${m.channel}/p${m.ts.replace('.', '')}`, me));
      });
      ws.on('close', () => { clearInterval(ping); resolve(); });
      ws.on('error', e => console.error(`[slack] ws ${a.workspace}: ${e.message}`));
    });
    await sleep(5000);
  }
}

async function listen(a) {
  if (policy.isMuted({ source: 'slack', account: a.workspace })) return console.log(`[slack] ${a.workspace}: muted in policy — skipped`);
  // Retry auth forever (network may be down at boot); a truly dead token just logs every 10 min.
  let auth;
  for (;;) {
    auth = await slack(a, 'auth.test').catch(e => ({ error: e.message }));
    if (auth.ok) break;
    console.error(`[slack] ${a.workspace}: auth ${auth.error} — retry in 10 min`);
    await sleep(600000);
  }
  const rtm = await slack(a, 'rtm.connect').catch(() => ({}));
  if (rtm.ok) return rtmLoop(a, auth.user_id);
  console.log(`[slack] polling ${a.workspace} every ${POLL_MS / 1000}s`);
  return pollLoop(a, auth.user_id);
}

function run() { accounts.forEach(a => listen(a).catch(e => console.error(`[slack] ${a.workspace}: ${e.message}`))); }

module.exports = { run };
