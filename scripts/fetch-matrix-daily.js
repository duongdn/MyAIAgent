#!/usr/bin/env node
/**
 * fetch-matrix-daily.js
 * Fetch ALL joined Matrix rooms for messages since last daily report run.
 * Handles thread replies: timeline events + explicit /relations for thread roots.
 *
 * Usage:
 *   node scripts/fetch-matrix-daily.js
 *   node scripts/fetch-matrix-daily.js --since 2026-06-04T01:00:00Z
 *   node scripts/fetch-matrix-daily.js --room "!roomId:nustechnology.com"
 */

const fs = require('fs');
const https = require('https');

const CONFIG_PATH = 'config/.matrix-config.json';
const TIMELINES_PATH = 'config/.monitoring-timelines.json';

// ── HTTP helper ───────────────────────────────────────────────────────────────
function get(url, token) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { Authorization: `Bearer ${token}` }, timeout: 15000 }, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode}: ${data.slice(0, 200)}`));
        try { resolve(JSON.parse(data)); } catch (e) { reject(new Error(`JSON parse: ${e.message}`)); }
      });
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('Timeout')); });
  });
}

// ── Cutoff: yesterday 8:00 AM UTC+7 (or daily_report.last_run) ───────────────
function getCutoffMs() {
  try {
    const timelines = JSON.parse(fs.readFileSync(TIMELINES_PATH, 'utf8'));
    const lastRun = timelines.daily_report?.last_run;
    if (lastRun) return new Date(lastRun).getTime();
  } catch {}
  // Fallback: yesterday 8:00 AM UTC+7 = yesterday 01:00 UTC
  const nowUTC7 = new Date(Date.now() + 7 * 3600000);
  const yest = new Date(nowUTC7);
  yest.setUTCDate(yest.getUTCDate() - 1);
  yest.setUTCHours(8, 0, 0, 0);
  return yest.getTime() - 7 * 3600000;
}

// ── Discover all joined rooms, resolve display names ─────────────────────────
async function getJoinedRooms(homeserver, token) {
  const resp = await get(`${homeserver}/_matrix/client/v3/joined_rooms`, token);
  const ids = resp.joined_rooms || [];

  const rooms = await Promise.all(ids.map(async id => {
    let name = id; // fallback: use room ID as name
    try {
      const state = await get(
        `${homeserver}/_matrix/client/v3/rooms/${encodeURIComponent(id)}/state/m.room.name`,
        token
      );
      if (state.name) name = state.name;
    } catch {}
    return { id, name };
  }));

  return rooms.sort((a, b) => a.name.localeCompare(b.name));
}

// ── Fetch timeline messages going backward until cutoff ───────────────────────
async function fetchTimeline(homeserver, token, roomId, cutoffMs) {
  const events = [];
  let from = '';
  const filter = encodeURIComponent(JSON.stringify({ types: ['m.room.message'] }));

  for (let page = 0; page < 20; page++) {
    const fromParam = from ? `&from=${encodeURIComponent(from)}` : '';
    const url = `${homeserver}/_matrix/client/v3/rooms/${encodeURIComponent(roomId)}/messages?dir=b&limit=50&filter=${filter}${fromParam}`;
    const resp = await get(url, token);
    const chunk = resp.chunk || [];
    if (!chunk.length) break;

    for (const ev of chunk) {
      if (ev.origin_server_ts >= cutoffMs) events.push(ev);
    }

    // Stop paginating when oldest event in chunk predates cutoff
    if (chunk[chunk.length - 1]?.origin_server_ts < cutoffMs) break;
    from = resp.end;
    if (!from) break;
  }

  return events;
}

// ── Fetch thread replies via /relations (catches replies not in main timeline) ─
async function fetchThreadReplies(homeserver, token, roomId, eventId, cutoffMs) {
  const replies = [];
  let from = '';

  for (let page = 0; page < 5; page++) {
    const fromParam = from ? `&from=${encodeURIComponent(from)}` : '';
    const url = `${homeserver}/_matrix/client/v3/rooms/${encodeURIComponent(roomId)}/relations/${encodeURIComponent(eventId)}/m.thread?limit=50${fromParam}`;
    try {
      const resp = await get(url, token);
      const chunk = resp.chunk || [];
      replies.push(...chunk.filter(e => e.origin_server_ts >= cutoffMs));
      if (!resp.next_batch || !chunk.length) break;
      from = resp.next_batch;
    } catch {
      break; // /relations may 404 on old servers — not fatal
    }
  }

  return replies;
}

// ── Formatting helpers ────────────────────────────────────────────────────────
function fmtTs(ms) {
  const d = new Date(ms + 7 * 3600000);
  return `${String(d.getUTCHours()).padStart(2,'0')}:${String(d.getUTCMinutes()).padStart(2,'0')}`;
}

function fmtSender(sender) {
  return (sender || '').replace(/^@/, '').split(':')[0];
}

function fmtBody(body, maxLen) {
  return (body || '').replace(/\n+/g, ' ').trim().slice(0, maxLen);
}

// ── Process a single room ─────────────────────────────────────────────────────
async function processRoom(homeserver, token, room, cutoffMs) {
  const timeline = await fetchTimeline(homeserver, token, room.id, cutoffMs);

  // Partition: thread replies vs root messages
  const replyMap   = new Map(); // rootEventId → Map<eventId, event>
  const rootEvents = [];

  for (const ev of timeline) {
    const rel = ev.content?.['m.relates_to'];
    if (rel?.rel_type === 'm.thread' && rel.event_id) {
      if (!replyMap.has(rel.event_id)) replyMap.set(rel.event_id, new Map());
      replyMap.get(rel.event_id).set(ev.event_id, ev);
    } else {
      rootEvents.push(ev);
    }
  }

  // For roots with thread aggregation, fetch via /relations to catch non-timeline replies
  for (const ev of rootEvents) {
    const threadAgg = ev.unsigned?.relations?.['m.thread'];
    if (threadAgg?.count > 0) {
      const fetched = await fetchThreadReplies(homeserver, token, room.id, ev.event_id, cutoffMs);
      if (!replyMap.has(ev.event_id)) replyMap.set(ev.event_id, new Map());
      for (const rep of fetched) replyMap.get(ev.event_id).set(rep.event_id, rep);
    }
  }

  rootEvents.sort((a, b) => a.origin_server_ts - b.origin_server_ts);

  const replyCount = [...replyMap.values()].reduce((s, m) => s + m.size, 0);
  const total = rootEvents.length + replyCount;

  console.log(`### ${room.name} — ${total} message${total !== 1 ? 's' : ''}`);

  if (!rootEvents.length) {
    console.log('  (no messages)\n');
    return total;
  }

  for (const ev of rootEvents) {
    const replies = [...(replyMap.get(ev.event_id)?.values() || [])];
    const threadTag = replies.length ? ` [thread: ${replies.length} repl${replies.length === 1 ? 'y' : 'ies'}]` : '';
    console.log(`  [${fmtTs(ev.origin_server_ts)}] ${fmtSender(ev.sender)}: ${fmtBody(ev.content?.body, 120)}${threadTag}`);

    for (const rep of replies.sort((a, b) => a.origin_server_ts - b.origin_server_ts)) {
      console.log(`    └ [${fmtTs(rep.origin_server_ts)}] ${fmtSender(rep.sender)}: ${fmtBody(rep.content?.body, 100)}`);
    }
  }
  console.log('');
  return total;
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  const args = process.argv.slice(2);
  const sinceArg = args[args.indexOf('--since') + 1];
  const roomArg  = args[args.indexOf('--room')  + 1];

  const cutoffMs = sinceArg ? new Date(sinceArg).getTime() : getCutoffMs();

  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
  const { homeserver, access_token: token } = config;

  const sinceLabel = new Date(cutoffMs + 7 * 3600000).toISOString().slice(0, 16).replace('T', ' ') + ' +07:00';
  console.log(`Matrix daily check | since: ${sinceLabel}`);
  console.log('Discovering joined rooms...\n');

  const allRooms = await getJoinedRooms(homeserver, token);
  const rooms = roomArg ? allRooms.filter(r => r.id === roomArg) : allRooms;

  if (!rooms.length) {
    console.error(roomArg ? `Room not found: ${roomArg}` : 'No joined rooms found.');
    process.exit(1);
  }

  let grandTotal = 0;
  for (const room of rooms) {
    try {
      grandTotal += await processRoom(homeserver, token, room, cutoffMs);
    } catch (err) {
      console.log(`### ${room.name} — ERROR: ${err.message}\n`);
    }
  }

  console.log(`Total: ${grandTotal} message${grandTotal !== 1 ? 's' : ''} across ${rooms.length} room${rooms.length !== 1 ? 's' : ''}`);
}

main().catch(err => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
