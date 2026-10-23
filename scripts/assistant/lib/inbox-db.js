/**
 * Inbox DB — SQLite (node:sqlite built-in) store for normalized incoming events + listener cursors.
 * File: data/assistant.db (gitignored).
 */
process.removeAllListeners('warning'); // silence node:sqlite ExperimentalWarning
const path = require('path');
const fs = require('fs');
const { DatabaseSync } = require('node:sqlite');

const DB_PATH = path.join(__dirname, '..', '..', '..', 'data', 'assistant.db');
fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
const db = new DatabaseSync(DB_PATH);

db.exec(`
CREATE TABLE IF NOT EXISTS events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  source TEXT NOT NULL, account TEXT, channel TEXT, thread_id TEXT,
  source_msg_id TEXT NOT NULL, sender TEXT, text TEXT, url TEXT,
  ts_utc TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'new',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(source, source_msg_id)
);
CREATE TABLE IF NOT EXISTS cursors (key TEXT PRIMARY KEY, value TEXT NOT NULL);
`);

/** Insert event; returns row id if new, null if duplicate. */
function addEvent(e) {
  const r = db.prepare(`INSERT OR IGNORE INTO events
    (source, account, channel, thread_id, source_msg_id, sender, text, url, ts_utc)
    VALUES (?,?,?,?,?,?,?,?,?)`).run(
    e.source, e.account || null, e.channel || null, e.thread_id || null, String(e.source_msg_id),
    e.sender || null, e.text || '', e.url || null, e.ts_utc || new Date().toISOString());
  return r.changes ? Number(r.lastInsertRowid) : null;
}

function setStatus(id, status) { db.prepare('UPDATE events SET status=? WHERE id=?').run(status, id); }
function getEvent(id) { return db.prepare('SELECT * FROM events WHERE id=?').get(id); }
function getCursor(key) { return db.prepare('SELECT value FROM cursors WHERE key=?').get(key)?.value ?? null; }
function setCursor(key, value) {
  db.prepare('INSERT INTO cursors(key,value) VALUES(?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value').run(key, String(value));
}

module.exports = { addEvent, setStatus, getEvent, getCursor, setCursor };

/** Latest relevant events for the web Inbox. */
function listEvents(limit = 200) {
  return db.prepare('SELECT * FROM events ORDER BY ts_utc DESC LIMIT ?').all(limit);
}
module.exports.listEvents = listEvents;


// ── Short-term context (48h, auto-purged): lets the judge see thread history + detect "already answered" ──
db.exec(`CREATE TABLE IF NOT EXISTS recent (
  source TEXT, account TEXT, channel TEXT, thread_id TEXT, sender TEXT, is_ours INTEGER, text TEXT, ts_utc TEXT);
CREATE INDEX IF NOT EXISTS recent_ch ON recent(source, account, channel, ts_utc);
CREATE TABLE IF NOT EXISTS pending_asks (
  id INTEGER PRIMARY KEY AUTOINCREMENT, source TEXT, account TEXT, channel TEXT, thread_id TEXT,
  ts_utc TEXT, due_at TEXT, event_json TEXT, verdict_json TEXT, status TEXT NOT NULL DEFAULT 'waiting');`);

function addRecent(e, isOurs) {
  db.prepare('INSERT INTO recent VALUES (?,?,?,?,?,?,?,?)').run(e.source, e.account || '', e.channel || '',
    e.thread_id || '', e.sender || '', isOurs ? 1 : 0, (e.text || '').slice(0, 600), e.ts_utc);
  db.prepare("DELETE FROM recent WHERE ts_utc < ?").run(new Date(Date.now() - 48 * 3600000).toISOString());
}
function recentInChannel(e, limit = 12) {
  return db.prepare(`SELECT sender, is_ours, text, ts_utc FROM recent WHERE source=? AND account=? AND channel=? AND ts_utc < ?
    ORDER BY ts_utc DESC LIMIT ?`).all(e.source, e.account || '', e.channel || '', e.ts_utc, limit).reverse();
}
/** True if someone on our side posted in the same channel (and thread, if any) after `ts`. */
function oursRepliedSince(a) {
  return !!db.prepare(`SELECT 1 FROM recent WHERE source=? AND account=? AND channel=? AND is_ours=1 AND ts_utc > ?
    AND (?='' OR thread_id=? OR thread_id='') LIMIT 1`).get(a.source, a.account || '', a.channel || '', a.ts_utc, a.thread_id || '', a.thread_id || '');
}
function addPendingAsk(e, verdict, dueAt) {
  db.prepare('INSERT INTO pending_asks (source, account, channel, thread_id, ts_utc, due_at, event_json, verdict_json) VALUES (?,?,?,?,?,?,?,?)')
    .run(e.source, e.account || '', e.channel || '', e.thread_id || '', e.ts_utc, dueAt, JSON.stringify(e), JSON.stringify(verdict));
}
function dueAsks(now) { return db.prepare("SELECT * FROM pending_asks WHERE status='waiting' AND due_at <= ?").all(now); }
function setAskStatus(id, status) { db.prepare('UPDATE pending_asks SET status=? WHERE id=?').run(status, id); }
Object.assign(module.exports, { addRecent, recentInChannel, oursRepliedSince, addPendingAsk, dueAsks, setAskStatus });
