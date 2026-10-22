/**
 * Matrix realtime listener via /sync long-poll. Starts from "now" (no backfill) on first run,
 * then resumes from stored next_batch. On 401 re-reads config (token refreshed by other scripts).
 */
const fs = require('fs');
const path = require('path');
const db = require('../lib/inbox-db');
const { intake } = require('../lib/event-intake');

const CONFIG_PATH = path.join(__dirname, '..', '..', '..', 'config', '.matrix-config.json');
const sleep = ms => new Promise(r => setTimeout(r, ms));
const roomNames = new Map();
const roomMembers = new Map(); // roomId -> joined count (sync only sends summary when it changes)

function cfg() { return JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8')); }

async function mget(c, p, timeoutMs = 60000) {
  const res = await fetch(`${c.homeserver}${p}`, {
    headers: { Authorization: `Bearer ${c.access_token}` }, signal: AbortSignal.timeout(timeoutMs) });
  if (!res.ok) { const e = new Error(`HTTP ${res.status}`); e.status = res.status; throw e; }
  return res.json();
}

async function roomName(c, id) {
  if (roomNames.has(id)) return roomNames.get(id);
  let name = id;
  try { name = (await mget(c, `/_matrix/client/v3/rooms/${encodeURIComponent(id)}/state/m.room.name`, 15000)).name || id; } catch {}
  roomNames.set(id, name);
  return name;
}

async function run() {
  let me = null;
  for (;;) {
    const c = cfg();
    try {
      if (!me) me = (await mget(c, '/_matrix/client/v3/account/whoami', 15000)).user_id;
      let since = db.getCursor('matrix:since');
      if (!since) {   // first run: skip history
        const init = await mget(c, `/_matrix/client/v3/sync?filter=${encodeURIComponent('{"room":{"timeline":{"limit":0}}}')}`);
        db.setCursor('matrix:since', init.next_batch);
        console.log('[matrix] initialised, listening as', me);
        continue;
      }
      const s = await mget(c, `/_matrix/client/v3/sync?since=${encodeURIComponent(since)}&timeout=30000`, 60000);
      for (const [roomId, room] of Object.entries(s.rooms?.join || {})) {
        if (room.summary?.['m.joined_member_count']) roomMembers.set(roomId, room.summary['m.joined_member_count']);
        const isDirect = roomMembers.get(roomId) === 2;
        for (const ev of room.timeline?.events || []) {
          if (ev.type !== 'm.room.message' || ev.sender === me || !ev.content?.body) continue;
          await intake({
            source: 'matrix', account: me, channel: await roomName(c, roomId), source_msg_id: ev.event_id,
            thread_id: ev.content['m.relates_to']?.event_id, sender: ev.sender, text: ev.content.body,
            url: `${c.chat_url || 'https://chat.nustechnology.com'}/#/room/${roomId}/${ev.event_id}`,
            ts_utc: new Date(ev.origin_server_ts).toISOString(),
            meta: { isDirect, mentionsMe: /duongdn/i.test(ev.content.body + (ev.content.formatted_body || '')) },
          });
        }
      }
      db.setCursor('matrix:since', s.next_batch);
    } catch (err) {
      console.error(`[matrix] ${err.message}${err.status === 401 ? ' (token expired? waiting for refresh)' : ''}`);
      if (err.status === 401) me = null;
      await sleep(err.status === 401 ? 60000 : 5000);
    }
  }
}

module.exports = { run };
