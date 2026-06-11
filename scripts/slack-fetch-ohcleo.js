#!/usr/bin/env node
/**
 * Fetch OhCleo Slack messages (xoxc session token).
 * Sources: DM with Celine Fierro (customer) + #events-code channel.
 *
 * Usage: node scripts/slack-fetch-ohcleo.js [--since <ISO-date>]
 * Output: JSON to stdout, summary to stderr.
 *
 * Reads credentials from config/.slack-accounts.json (decrypt first).
 */
const https = require('https');
const fs    = require('fs');
const path  = require('path');

const CONFIG_PATH = path.join(__dirname, '..', 'config', '.slack-accounts.json');
const CHANNELS = {
  'C01JDPN0EDQ': '#events-code',
  'D0B6846UN8K': 'DM:Celine Fierro',
};

function slackPost(token, dCookieEncoded, method, params) {
  return new Promise((resolve, reject) => {
    const body = new URLSearchParams({ token, ...params }).toString();
    const req = https.request({
      hostname: 'ohcleo.slack.com',
      path: `/api/${method}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': `d=${dCookieEncoded}`,
        'User-Agent': 'Mozilla/5.0',
      },
    }, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        try { resolve(JSON.parse(d)); } catch { reject(new Error('Invalid JSON')); }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

function encodeD(raw) {
  return encodeURIComponent(raw);
}

(async () => {
  // Load credentials
  const config   = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
  const account  = config.accounts.find(a => a.workspace === 'OhCleo');
  if (!account) { console.error('OhCleo not in .slack-accounts.json'); process.exit(1); }

  const token  = account.token;
  const dEnc   = encodeD(account.cookie);

  // Parse --since argument
  let since = 0;
  const sinceIdx = process.argv.indexOf('--since');
  if (sinceIdx >= 0 && process.argv[sinceIdx + 1]) {
    since = Math.floor(new Date(process.argv[sinceIdx + 1]).getTime() / 1000);
  }
  const sinceStr = since
    ? new Date(since * 1000).toISOString().slice(0, 16)
    : 'all';

  // Verify auth
  const auth = await slackPost(token, dEnc, 'auth.test', {});
  if (!auth.ok) { console.error('auth.test failed:', auth.error); process.exit(1); }

  const result = { workspace: 'OhCleo', user: auth.user, since: sinceStr, channels: [] };

  for (const [channelId, channelName] of Object.entries(CHANNELS)) {
    const params = { channel: channelId, limit: 100 };
    if (since) params.oldest = String(since);

    const history = await slackPost(token, dEnc, 'conversations.history', params);
    if (!history.ok) {
      console.error(`  ${channelName}: ${history.error}`);
      result.channels.push({ id: channelId, name: channelName, error: history.error, messages: [] });
      continue;
    }

    const messages = (history.messages || []).map(m => ({
      ts: m.ts,
      datetime: new Date(parseFloat(m.ts) * 1000).toISOString().slice(0, 16),
      user: m.user || 'bot',
      text: m.text || '',
    }));

    result.channels.push({ id: channelId, name: channelName, count: messages.length, messages });
    console.error(`  ${channelName}: ${messages.length} messages`);
  }

  console.log(JSON.stringify(result, null, 2));
})();
