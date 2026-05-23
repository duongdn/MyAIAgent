#!/usr/bin/env node
/**
 * Automated Matrix Token Refresh
 *
 * Opens browser with saved profile → Element auto-loads with SSO session →
 * captures fresh access_token from request headers → saves to config.
 *
 * Requires DISPLAY env var (runs visible browser briefly).
 * Skips refresh if current token is still valid.
 *
 * Usage:
 *   node scripts/matrix-token-refresh.js
 */

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const fs = require('fs');
const path = require('path');
const https = require('https');

const CONFIG_PATH = path.join(__dirname, '..', 'config', '.matrix-config.json');
const PROFILE_DIR = path.join(__dirname, '..', 'tmp', 'matrix-browser-profile');

function get(url, headers = {}) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    https.get(parsed, { headers }, (res) => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        try { resolve(JSON.parse(d)); }
        catch { resolve({ raw: d, status: res.statusCode }); }
      });
    }).on('error', reject);
  });
}

async function main() {
  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));

  // Quick check — skip if token still valid
  console.log('[matrix-refresh] Checking current token...');
  const whoami = await get(`${config.homeserver}/_matrix/client/v3/account/whoami`, {
    Authorization: `Bearer ${config.access_token}`,
  }).catch(() => null);

  if (whoami && whoami.user_id) {
    console.log(`[matrix-refresh] Token valid (${whoami.user_id}). Skipping.`);
    return;
  }
  console.log('[matrix-refresh] Token expired. Opening browser...');

  if (!fs.existsSync(PROFILE_DIR)) {
    fs.mkdirSync(PROFILE_DIR, { recursive: true });
  }

  const browser = await puppeteer.launch({
    headless: false,
    userDataDir: PROFILE_DIR,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--window-size=1280,900',
    ],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  let capturedAccessToken = null;
  let capturedRefreshToken = null;

  // Capture Bearer token from request headers
  await page.setRequestInterception(true);
  page.on('request', (req) => {
    const auth = req.headers()['authorization'];
    if (auth && auth.startsWith('Bearer mat_') && !capturedAccessToken) {
      capturedAccessToken = auth.replace('Bearer ', '');
      console.log(`[matrix-refresh] Captured access_token from header`);
    }
    req.continue();
  });

  // Capture refresh token from token endpoint responses
  page.on('response', async (res) => {
    try {
      const url = res.url();
      if (url.includes('/oauth2/token') || (url.includes('/_matrix/client') && res.request().method() === 'POST')) {
        const text = await res.text().catch(() => '');
        if (text.includes('refresh_token')) {
          const data = JSON.parse(text);
          if (data.access_token) capturedAccessToken = data.access_token;
          if (data.refresh_token) capturedRefreshToken = data.refresh_token;
          console.log('[matrix-refresh] Captured tokens from response');
        }
      }
    } catch {}
  });

  const chatUrl = config.chat_url || 'https://chat.nustechnology.com';
  console.log(`[matrix-refresh] Navigating to ${chatUrl}...`);
  console.log(`[matrix-refresh] >>> A browser window is opening. Please log in if prompted. <<<`);
  await page.goto(chatUrl, { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});

  // Wait up to 5 minutes for user to login
  const deadline = Date.now() + 300000;
  let lastPrint = 0;
  while (Date.now() < deadline) {
    await new Promise(r => setTimeout(r, 2000));
    if (Date.now() - lastPrint > 15000) {
      console.log(`[matrix-refresh] Waiting for login... ${Math.round((deadline - Date.now()) / 1000)}s remaining`);
      lastPrint = Date.now();
    }

    // Try localStorage extraction
    if (!capturedAccessToken) {
      const stored = await page.evaluate(() => {
        const result = {};
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          const val = localStorage.getItem(key);
          if (val && val.startsWith('mat_')) result.access_token = val;
          if (val && val.startsWith('mar_')) result.refresh_token = val;
        }
        return result;
      }).catch(() => ({}));

      if (stored.access_token) capturedAccessToken = stored.access_token;
      if (stored.refresh_token) capturedRefreshToken = stored.refresh_token;
    }

    // Try MatrixClient instance
    if (!capturedAccessToken) {
      const clientToken = await page.evaluate(() => {
        const client = window.mxMatrixClientPeg?.get?.();
        return client?.getAccessToken?.() || null;
      }).catch(() => null);
      if (clientToken && clientToken.startsWith('mat_')) {
        capturedAccessToken = clientToken;
        console.log('[matrix-refresh] Captured from MatrixClient');
      }
    }

    if (capturedAccessToken) break;
  }

  await browser.close();

  if (!capturedAccessToken) {
    console.error('[matrix-refresh] Failed to capture token. Manual login needed.');
    process.exit(1);
  }

  // Save
  config.access_token = capturedAccessToken;
  if (capturedRefreshToken) config.refresh_token = capturedRefreshToken;
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));

  // Verify
  const verify = await get(`${config.homeserver}/_matrix/client/v3/account/whoami`, {
    Authorization: `Bearer ${capturedAccessToken}`,
  }).catch(() => null);

  if (verify && verify.user_id) {
    console.log(`[matrix-refresh] Verified: ${verify.user_id}`);
  } else {
    console.log('[matrix-refresh] Token saved but verification failed.');
  }
}

main().catch(err => {
  console.error('[matrix-refresh] Fatal:', err.message);
  process.exit(1);
});
