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

// ── Alerts (layer A: periodic read-only daily-report scan) ──
db.exec(`CREATE TABLE IF NOT EXISTS alerts (
  key TEXT PRIMARY KEY, project TEXT, source TEXT, severity TEXT, title TEXT, detail TEXT,
  link TEXT, suggested_action TEXT, status TEXT NOT NULL, first_seen TEXT NOT NULL,
  updated_at TEXT NOT NULL, notified_hash TEXT)`);

function getAlert(key) { return db.prepare('SELECT * FROM alerts WHERE key=?').get(key); }
function openAlerts() { return db.prepare("SELECT * FROM alerts WHERE status='open' ORDER BY updated_at DESC").all(); }
function listAlerts(limit = 200) { return db.prepare('SELECT * FROM alerts ORDER BY status=\'open\' DESC, updated_at DESC LIMIT ?').all(limit); }
function upsertAlert(a, now) {
  db.prepare(`INSERT INTO alerts (key, project, source, severity, title, detail, link, suggested_action, status, first_seen, updated_at)
    VALUES (?,?,?,?,?,?,?,?,?,?,?) ON CONFLICT(key) DO UPDATE SET project=excluded.project, source=excluded.source,
    severity=excluded.severity, title=excluded.title, detail=excluded.detail, link=excluded.link,
    suggested_action=excluded.suggested_action, status=excluded.status, updated_at=excluded.updated_at`).run(
    a.key, a.project, a.source, a.severity, a.title, a.detail, a.link || '', a.suggested_action || '', a.status, now, now);
}
function setAlertNotified(key, hash) { db.prepare('UPDATE alerts SET notified_hash=? WHERE key=?').run(hash, key); }
Object.assign(module.exports, { getAlert, openAlerts, listAlerts, upsertAlert, setAlertNotified });
