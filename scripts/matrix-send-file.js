#!/usr/bin/env node
/**
 * Upload a file to the Matrix media repo and post it to a room as m.file.
 * Usage: node scripts/matrix-send-file.js <room_id> <file_path> [display_name]
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const CONFIG_PATH = path.join(__dirname, '..', 'config', '.matrix-config.json');

const roomId = process.argv[2];
const filePath = process.argv[3];
const displayName = process.argv[4] || path.basename(filePath || '');

if (!roomId || !filePath) {
  console.error('Usage: node scripts/matrix-send-file.js <room_id> <file_path> [display_name]');
  process.exit(1);
}

const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
const homeserver = config.homeserver || config.baseUrl;
const token = config.access_token || config.accessToken || config.compat_token || config.token;

const MIME_BY_EXT = {
  '.zip': 'application/zip',
  '.gz': 'application/gzip',
  '.sql': 'application/sql',
  '.env': 'text/plain',
  '.txt': 'text/plain',
  '.md': 'text/markdown',
  '.json': 'application/json',
};

function request(url, options, body) {
  return new Promise((resolve, reject) => {
    const req = https.request(new URL(url), options, (res) => {
      let d = '';
      res.on('data', c => (d += c));
      res.on('end', () => {
        try { resolve({ status: res.statusCode, data: JSON.parse(d) }); }
        catch { resolve({ status: res.statusCode, data: { raw: d.slice(0, 400) } }); }
      });
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

(async () => {
  const buf = fs.readFileSync(filePath);
  const mime = MIME_BY_EXT[path.extname(displayName).toLowerCase()] || 'application/octet-stream';

  const up = await request(
    `${homeserver}/_matrix/media/v3/upload?filename=${encodeURIComponent(displayName)}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': mime,
        'Content-Length': buf.length,
      },
    },
    buf
  );

  if (up.status !== 200 || !up.data.content_uri) {
    console.error('Upload failed', up.status, JSON.stringify(up.data).slice(0, 400));
    process.exit(1);
  }

  const send = await request(
    `${homeserver}/_matrix/client/v3/rooms/${encodeURIComponent(roomId)}/send/m.room.message/m${Date.now()}`,
    {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    },
    JSON.stringify({
      msgtype: 'm.file',
      body: displayName,
      url: up.data.content_uri,
      info: { size: buf.length, mimetype: mime },
    })
  );

  if (send.status !== 200) {
    console.error('Send failed', send.status, JSON.stringify(send.data).slice(0, 400));
    process.exit(1);
  }
  console.log(`SENT ${displayName} (${buf.length} bytes) event=${send.data.event_id}`);
})();
