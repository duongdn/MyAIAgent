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
