/**
 * Gmail-API mailboxes (accounts with `gmail_api: true` in config/.email-accounts.json, e.g. freelancer@mpfc)
 * — no IMAP, so poll every policy.pollMinutes.gmailApi min via the service account (same auth as scripts/email-scan.js).
 */
const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');
const db = require('../lib/inbox-db');
const policy = require('../lib/policy');
const { intake } = require('../lib/event-intake');
const { accounts } = require('../../../config/.email-accounts.json');

const KEY_PATH = path.join(__dirname, '..', '..', '..', 'config', '.gmail-service-account.json');
const sleep = ms => new Promise(r => setTimeout(r, ms));

function client(email) {
  const key = JSON.parse(fs.readFileSync(KEY_PATH, 'utf8'));
  const auth = new google.auth.JWT({ email: key.client_email, key: key.private_key,
    scopes: ['https://www.googleapis.com/auth/gmail.readonly'], subject: email });
  return google.gmail({ version: 'v1', auth });
}

async function tick(acct, gmail) {
  const key = `gmail:${acct.email}:since`;
  const since = Number(db.getCursor(key) || Math.floor(Date.now() / 1000) - 600);
  const started = Math.floor(Date.now() / 1000);
  const list = await gmail.users.messages.list({ userId: 'me', q: `after:${since}`, maxResults: 30 });
  for (const { id } of (list.data.messages || []).reverse()) {
    const m = await gmail.users.messages.get({ userId: 'me', id, format: 'full' });
    const h = n => m.data.payload?.headers?.find(x => x.name === n)?.value || '';
    // Body-less mails with a PDF brief look like noise without this (e.g. MPFC "Team Managers update" 2026-10-22).
    const files = [];
    (function walk(part) { if (part?.filename) files.push(part.filename); (part?.parts || []).forEach(walk); })(m.data.payload);
    await intake({
      source: 'email', account: acct.email, channel: 'INBOX', source_msg_id: id, sender: h('From'),
      text: `${h('Subject')}\n\n${m.data.snippet || ''}${files.length ? `\n\n📎 Attachments: ${files.join(', ')}` : ''}`, ts_utc: new Date(Number(m.data.internalDate)).toISOString(),
      meta: { bulk: !!h('List-Unsubscribe') },
    });
  }
  db.setCursor(key, started);
}

async function listen(acct) {
  const gmail = client(acct.email);
  console.log(`[gmail-api] polling ${acct.email}`);
  for (;;) {
    await tick(acct, gmail).catch(e => console.error(`[gmail-api] ${acct.email}: ${e.message}`));
    await sleep((policy.load().pollMinutes?.gmailApi ?? 2) * 60000);
  }
}

function run() { accounts.filter(a => a.gmail_api).forEach(a => listen(a)); }

module.exports = { run };
