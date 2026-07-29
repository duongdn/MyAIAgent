#!/usr/bin/env node
/**
 * List Matrix rooms the account has joined, optionally filtered by name substring.
 * Usage: node scripts/matrix-find-room.js [filter]
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const CONFIG_PATH = path.join(__dirname, '..', 'config', '.matrix-config.json');
const filter = (process.argv[2] || '').toLowerCase();

const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
const homeserver = config.homeserver || config.baseUrl;
const token = config.access_token || config.accessToken || config.compat_token || config.token;

if (!homeserver || !token) {
  console.error('Missing homeserver or access token in config');
  process.exit(1);
}

function api(pathname) {
  return new Promise((resolve, reject) => {
    const url = new URL(homeserver + pathname);
    https.get(url, { headers: { Authorization: `Bearer ${token}` } }, (res) => {
      let d = '';
      res.on('data', c => (d += c));
      res.on('end', () => {
        try { resolve({ status: res.statusCode, data: JSON.parse(d) }); }
        catch { resolve({ status: res.statusCode, data: { raw: d.slice(0, 300) } }); }
      });
    }).on('error', reject);
  });
}

(async () => {
  const joined = await api('/_matrix/client/v3/joined_rooms');
  if (joined.status !== 200) {
    console.error('joined_rooms failed', joined.status, JSON.stringify(joined.data).slice(0, 300));
    process.exit(1);
  }
  const rooms = joined.data.joined_rooms || [];
  console.log(`Joined rooms: ${rooms.length}`);

  // Resolve names in small batches to avoid hammering the homeserver.
  const out = [];
  for (let i = 0; i < rooms.length; i += 10) {
    const batch = rooms.slice(i, i + 10);
    const results = await Promise.all(batch.map(async (id) => {
      const n = await api(`/_matrix/client/v3/rooms/${encodeURIComponent(id)}/state/m.room.name/`);
      return { id, name: (n.data && n.data.name) || '' };
    }));
    out.push(...results);
  }

  for (const r of out) {
    if (!filter || r.name.toLowerCase().includes(filter) || r.id.toLowerCase().includes(filter)) {
      console.log(`${r.id}\t${r.name || '(no name)'}`);
    }
  }
})();
