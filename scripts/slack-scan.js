#!/usr/bin/env node
// Canonical Slack scan — search.messages (xoxp) or conversations.history (xoxc) per workspace.
// Usage: node scripts/slack-scan.js <sinceISO> [workspaceSubstr]
const fs = require('fs');
const https = require('https');

const cfg = JSON.parse(fs.readFileSync('config/.slack-accounts.json', 'utf8'));
const sinceArg = process.argv[2];
const filterArg = (process.argv[3] || '').toLowerCase();
const since = new Date(sinceArg);
const sinceEpoch = since.getTime() / 1000;
const dayBefore = new Date(since.getTime() - 24 * 3600 * 1000).toISOString().slice(0, 10);

function apiGet(url, headers) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers }, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
}

async function searchMessages(acc) {
  const headers = { Authorization: `Bearer ${acc.token}` };
  if (acc.cookie) headers['Cookie'] = `d=${acc.cookie}`;
  const url = `https://slack.com/api/search.messages?query=${encodeURIComponent('after:' + dayBefore)}&count=100&sort=timestamp&sort_dir=desc`;
  const resp = await apiGet(url, headers);
  if (!resp.ok) return { error: resp.error, raw: resp };
  const matches = (resp.messages && resp.messages.matches) || [];
  const filtered = matches.filter((m) => parseFloat(m.ts) >= sinceEpoch);
  return { matches: filtered };
}

async function conversationsHistory(acc) {
  const headers = { Authorization: `Bearer ${acc.token}` };
  if (acc.cookie) headers['Cookie'] = `d=${acc.cookie}`;
  const convUrl = `https://slack.com/api/conversations.list?types=public_channel,private_channel&limit=200`;
  const convResp = await apiGet(convUrl, headers);
  if (!convResp.ok) return { error: convResp.error };
  const results = [];
  for (const ch of convResp.channels || []) {
    if (!ch.is_member) continue;
    const histUrl = `https://slack.com/api/conversations.history?channel=${ch.id}&oldest=${sinceEpoch}&limit=100`;
    const hist = await apiGet(histUrl, headers);
    if (hist.ok && hist.messages && hist.messages.length) {
      results.push({ channel: ch.name, messages: hist.messages });
    }
  }
  return { channels: results };
}

async function main() {
  const out = {};
  for (const acc of cfg.accounts) {
    if (acc.workspace === 'OhCleo') continue; // Piece 12 handles separately
    if (filterArg && !acc.workspace.toLowerCase().includes(filterArg)) continue;
    try {
      let result;
      if (acc.auth_type === 'session') {
        result = await searchMessages(acc);
        if (result.error) result = await conversationsHistory(acc);
      } else {
        result = await searchMessages(acc);
      }
      out[acc.workspace] = result;
    } catch (e) {
      out[acc.workspace] = { error: String(e) };
    }
  }
  console.log(JSON.stringify(out, null, 2));
}
main();
