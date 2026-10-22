'use strict';
/**
 * Inbox API for MyDailyAssistant (page: /inbox.html).
 *  GET  /api/inbox            relevant events stored by the daemon
 *  GET  /api/inbox/gate-log   last relevance-gate decisions (NOTIFY + drop) from tmp/assistant-gate.log
 *  POST /api/inbox/:id/seen   mark event seen
 *  POST /api/inbox/:id/mute   mute the event's channel in config/assistant-policy.json
 */
const fs = require('fs');
const path = require('path');
const db = require('../scripts/assistant/lib/inbox-db');
const policy = require('../scripts/assistant/lib/policy');
const { muteKey } = require('../scripts/assistant/lib/event-intake');

const GATE_LOG = path.join(__dirname, '..', 'tmp', 'assistant-gate.log');
// "<iso> NOTIFY|drop   [key] sender: text | reason"
const LINE_RE = /^(\S+) (NOTIFY|drop)\s+\[([^\]]*)\] (.*?): (.*) \| (.*)$/;

function mount(app) {
  app.get('/api/inbox', (_req, res) => {
    res.json({ policy: policy.load(), events: db.listEvents() });
  });

  app.get('/api/inbox/gate-log', (_req, res) => {
    let lines = [];
    try { lines = fs.readFileSync(GATE_LOG, 'utf8').trim().split('\n').slice(-300).reverse(); } catch {}
    res.json(lines.map(l => {
      const m = l.match(LINE_RE);
      return m ? { ts: m[1], decision: m[2], key: m[3], sender: m[4], text: m[5], reason: m[6] } : { raw: l };
    }));
  });

  app.post('/api/inbox/:id/:action(seen|mute)', (req, res) => {
    const ev = db.getEvent(Number(req.params.id));
    if (!ev) return res.status(404).json({ error: 'not found' });
    if (req.params.action === 'mute') policy.mute(muteKey(ev));
    db.setStatus(ev.id, 'seen');
    res.json({ ok: true });
  });
}

module.exports = { mount };
