/**
 * Email realtime listener: one IMAP IDLE connection per account in config/.email-accounts.json.
 * Starts at current UIDNEXT (no backfill); on 'mail' fetches headers + short text of new UIDs.
 * Accounts with `filters` only forward mails whose From/Subject contains a filter term.
 */
const Imap = require('imap');
const { simpleParser } = require('mailparser');
const db = require('../lib/inbox-db');
const { intake } = require('../lib/event-intake');
const { accounts } = require('../../../config/.email-accounts.json');

function matchesFilters(acct, from, subject) {
  if (!acct.filters?.length) return true;
  const hay = `${from} ${subject}`.toLowerCase();
  return acct.filters.some(f => hay.includes(f.toLowerCase()));
}

function fetchNew(imap, acct, key) {
  const last = Number(db.getCursor(key) || 0);
  imap.search([['UID', `${last + 1}:*`]], (err, uids) => {
    uids = (uids || []).filter(u => u > last);
    if (err || !uids.length) return;
    db.setCursor(key, Math.max(...uids));
    const f = imap.fetch(uids, { bodies: '', struct: false });
    f.on('message', (msg, seq) => {
      let uid; msg.on('attributes', a => { uid = a.uid; });
      msg.on('body', stream => simpleParser(stream).then(m => {
        const from = m.from?.text || '', subject = m.subject || '';
        if (!matchesFilters(acct, from, subject)) return;
        return intake({
          source: 'email', account: acct.email, channel: acct.folder || 'INBOX',
          source_msg_id: m.messageId || `${acct.email}:${uid || seq}`, sender: from,
          text: `${subject}\n\n${(m.text || '').replace(/\n{3,}/g, '\n\n').slice(0, 1200)}`,
          ts_utc: (m.date || new Date()).toISOString(),
          meta: { bulk: m.headers.has('list-unsubscribe') || /bulk|list/i.test(m.headers.get('precedence') || '') },
        });
      }).catch(e => console.error(`[email] parse ${acct.email}: ${e.message}`)));
    });
  });
}

function listen(acct) {
  const key = `email:${acct.email}:uid`;
  const imap = new Imap({ user: acct.email, password: acct.app_password, host: acct.imap_server || 'imap.zoho.com',
    port: 993, tls: true,
    // Gmail IMAP fails cert check on this network — same workaround as scripts/email-scan.js
    tlsOptions: { servername: acct.imap_server, rejectUnauthorized: !/gmail/.test(acct.imap_server) }, keepalive: { interval: 10000, idleInterval: 300000, forceNoop: true } });
  imap.once('ready', () => imap.openBox(acct.folder || 'INBOX', true, (err, box) => {
    if (err) return console.error(`[email] openBox ${acct.email}: ${err.message}`);
    if (!db.getCursor(key)) db.setCursor(key, box.uidnext - 1);   // first run: skip history
    console.log(`[email] listening ${acct.email}`);
    fetchNew(imap, acct, key);
    imap.on('mail', () => fetchNew(imap, acct, key));
  }));
  imap.once('error', e => console.error(`[email] ${acct.email}: ${e.message}`));
  imap.once('end', () => { console.error(`[email] ${acct.email} disconnected, reconnecting in 30s`); setTimeout(() => listen(acct), 30000); });
  imap.connect();
}

function run() { accounts.filter(a => a.app_password && (a.imap_server || '').includes('imap')).forEach(listen); }

module.exports = { run };
