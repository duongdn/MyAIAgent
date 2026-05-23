#!/usr/bin/env node
/**
 * Send a message to a Matrix room using browser session.
 * Clears session lock, reloads with networkidle2, captures token,
 * then sends message via fetch() within the same browser context.
 *
 * Usage: node scripts/matrix-send-message.js <room_id> <message>
 */

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const fs = require('fs');
const path = require('path');
const https = require('https');

const CONFIG_PATH = path.join(__dirname, '..', 'config', '.matrix-config.json');
const PROFILE_DIR = path.join(__dirname, '..', 'tmp', 'matrix-browser-profile');

const roomId = process.argv[2];
const message = process.argv[3];

if (!roomId || !message) {
  console.error('Usage: node scripts/matrix-send-message.js <room_id> <message>');
  process.exit(1);
}

function httpRequest(url, options = {}, body = null) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const req = https.request(parsed, options, (res) => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        try { resolve({ data: JSON.parse(d), status: res.statusCode }); }
        catch { resolve({ data: { raw: d }, status: res.statusCode }); }
      });
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

async function tryDirectSend(config, token) {
  const txnId = `m${Date.now()}`;
  const encodedRoom = encodeURIComponent(roomId);
  const url = `${config.homeserver}/_matrix/client/v3/rooms/${encodedRoom}/send/m.room.message/${txnId}`;
  const body = JSON.stringify({ msgtype: 'm.text', body: message });
  return httpRequest(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(body),
    }
  }, body);
}

async function extractToken(page) {
  // Method 1: MatrixClient
  let token = await page.evaluate(() => {
    const client = window.mxMatrixClientPeg?.get?.();
    return client?.getAccessToken?.() || null;
  }).catch(() => null);
  if (token && token.startsWith('mat_')) { console.log('[matrix-send] Got token from MatrixClient'); return token; }

  // Method 2: localStorage scan
  token = await page.evaluate(() => {
    for (let i = 0; i < localStorage.length; i++) {
      const val = localStorage.getItem(localStorage.key(i));
      if (val && val.startsWith('mat_') && val.length > 20) return val;
      if (val) {
        try {
          const obj = JSON.parse(val);
          if (obj.access_token && obj.access_token.startsWith('mat_')) return obj.access_token;
        } catch {}
      }
    }
    return null;
  }).catch(() => null);
  if (token) { console.log('[matrix-send] Got token from localStorage'); return token; }

  return null;
}

async function main() {
  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));

  // Try current token first
  console.log('[matrix-send] Checking current token...');
  const whoami = await httpRequest(`${config.homeserver}/_matrix/client/v3/account/whoami`, {
    headers: { Authorization: `Bearer ${config.access_token}` }
  }).catch(() => null);

  if (whoami && whoami.data && whoami.data.user_id) {
    console.log(`[matrix-send] Token valid (${whoami.data.user_id}). Sending directly...`);
    const result = await tryDirectSend(config, config.access_token);
    if (result.status === 200 && result.data && result.data.event_id) {
      console.log(`[matrix-send] Sent! event_id=${result.data.event_id}`);
      return;
    }
    console.log(`[matrix-send] Direct send failed (${result.status}). Falling back to browser.`);
  } else {
    console.log('[matrix-send] Token expired. Using browser...');
  }

  if (!fs.existsSync(PROFILE_DIR)) {
    fs.mkdirSync(PROFILE_DIR, { recursive: true });
  }

  const browser = await puppeteer.launch({
    headless: false,
    userDataDir: PROFILE_DIR,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1280,900'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  let capturedToken = null;

  // Intercept BEFORE navigation
  await page.setRequestInterception(true);
  page.on('request', (req) => {
    const auth = req.headers()['authorization'] || '';
    if (auth.startsWith('Bearer mat_') && !capturedToken) {
      capturedToken = auth.replace('Bearer ', '');
      console.log('[matrix-send] Captured token from request header');
    }
    req.continue();
  });

  const chatUrl = config.chat_url || 'https://chat.nustechnology.com';
  console.log('[matrix-send] Navigating to Element...');
  await page.goto(chatUrl, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});

  // Clear session lock
  await page.evaluate(() => {
    localStorage.removeItem('react_sdk_session_lock_owner');
    localStorage.removeItem('react_sdk_session_lock_claimant');
  }).catch(() => {});
  console.log('[matrix-send] Session lock cleared. Reloading...');

  await page.reload({ waitUntil: 'networkidle2', timeout: 120000 }).catch(() => {});

  // Wait up to 30s for token
  const deadline = Date.now() + 30000;
  while (Date.now() < deadline && !capturedToken) {
    await new Promise(r => setTimeout(r, 2000));
    const t = await extractToken(page);
    if (t) capturedToken = t;
  }

  if (!capturedToken) {
    // Check what page we're on
    const url = page.url();
    const title = await page.title().catch(() => '');
    console.log(`[matrix-send] Current URL: ${url}, title: ${title}`);

    // If on login page, wait longer for manual login
    if (url.includes('login') || title.toLowerCase().includes('sign in')) {
      console.log('[matrix-send] Not logged in. Please log in manually. Waiting 3 minutes...');
      const loginDeadline = Date.now() + 180000;
      while (Date.now() < loginDeadline && !capturedToken) {
        await new Promise(r => setTimeout(r, 3000));
        const t = await extractToken(page);
        if (t) { capturedToken = t; break; }
        if (Date.now() - (loginDeadline - 180000) > 15000) {
          process.stdout.write(`\r[matrix-send] Waiting for login... ${Math.round((loginDeadline - Date.now()) / 1000)}s   `);
        }
      }
      console.log('');
    }
  }

  if (!capturedToken) {
    await browser.close();
    console.error('[matrix-send] Could not capture token.');
    process.exit(1);
  }

  // Send via in-browser fetch
  console.log('[matrix-send] Sending message via browser fetch...');
  const txnId = `m${Date.now()}`;
  const encodedRoom = encodeURIComponent(roomId);
  const sendUrl = `${config.homeserver}/_matrix/client/v3/rooms/${encodedRoom}/send/m.room.message/${txnId}`;

  const sendResult = await page.evaluate(async (url, token, body) => {
    try {
      const resp = await fetch(url, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await resp.json().catch(() => ({}));
      return { status: resp.status, data };
    } catch (e) {
      return { status: 0, error: e.message };
    }
  }, sendUrl, capturedToken, { msgtype: 'm.text', body: message });

  // Save fresh token
  config.access_token = capturedToken;
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
  console.log('[matrix-send] Token saved to config.');

  await browser.close();

  if (sendResult.status === 200 && sendResult.data && sendResult.data.event_id) {
    console.log(`[matrix-send] Message sent! event_id=${sendResult.data.event_id}`);
  } else {
    console.error(`[matrix-send] Send failed (${sendResult.status}):`, JSON.stringify(sendResult.data || sendResult.error));
    process.exit(1);
  }
}

main().catch(err => {
  console.error('[matrix-send] Fatal:', err.message);
  process.exit(1);
});
