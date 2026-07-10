#!/usr/bin/env node
/**
 * Workstream login via Puppeteer + Keycloak SSO.
 * Opens browser with saved profile → SSO auto-authenticates (same realm as Matrix) →
 * captures Bearer token from API requests → saves to config/.workstream-config.json.
 *
 * Usage: DISPLAY=:1 node scripts/workstream-login.js
 */

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const fs = require('fs');
const path = require('path');
const https = require('https');

const CONFIG_PATH = path.join(__dirname, '..', 'config', '.workstream-config.json');
const PROFILE_DIR = path.join(__dirname, '..', 'tmp', 'workstream-browser-profile');
const BASE_URL = 'https://workstream.nustechnology.com';

async function apiGet(url, token) {
  const { default: fetch } = await import('node-fetch').catch(() => ({ default: require('node-fetch') }));
  try {
    const res = await fetch(url, { headers: { 'Authorization': 'Bearer ' + token } });
    const text = await res.text();
    try { return JSON.parse(text); } catch { return { raw: text.substring(0, 200), status: res.status }; }
  } catch (e) { return { error: e.message }; }
}

async function main() {
  // Load or init config
  let config = {};
  if (fs.existsSync(CONFIG_PATH)) {
    config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
  }

  // Check if existing token is still valid
  if (config.access_token) {
    const me = await apiGet(BASE_URL + '/api/me', config.access_token);
    if (me && me.id) {
      console.log('[workstream-login] Token valid for:', me.email || me.id);
      return;
    }
  }

  console.log('[workstream-login] Token invalid/missing. Opening browser...');
  fs.mkdirSync(PROFILE_DIR, { recursive: true });
  ['SingletonLock', 'SingletonCookie', 'SingletonSocket'].forEach(f => {
    try { fs.unlinkSync(path.join(PROFILE_DIR, f)); } catch {}
  });

  const browser = await puppeteer.launch({
    headless: false,
    userDataDir: PROFILE_DIR,
    env: { ...process.env, DISPLAY: process.env.DISPLAY || ':1', TMPDIR: '/var/tmp' },
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--window-size=1280,900',
      '--crash-dumps-dir=/var/tmp',
    ],
  });

  const page = await browser.newPage();
  let capturedToken = null;

  let capturedRefreshToken = null;

  // Intercept Bearer tokens from API requests AND refresh_token from Keycloak responses.
  // Storing the refresh_token means future runs can get new access_tokens via API (no browser).
  await page.setRequestInterception(true);
  page.on('request', (req) => {
    const url = req.url();
    const auth = req.headers()['authorization'];
    if (auth && auth.startsWith('Bearer ') && url.startsWith(BASE_URL + '/api/') && !capturedToken) {
      capturedToken = auth.replace('Bearer ', '');
      console.log('[workstream-login] Token captured from API request:', url.replace(BASE_URL, ''));
    }
    req.continue();
  });

  // Capture refresh_token from Keycloak token endpoint response
  page.on('response', async (res) => {
    try {
      const url = res.url();
      if (url.includes('/protocol/openid-connect/token') && !capturedRefreshToken) {
        const text = await res.text().catch(() => '');
        if (text.includes('refresh_token')) {
          const data = JSON.parse(text);
          if (data.refresh_token) {
            capturedRefreshToken = data.refresh_token;
            console.log('[workstream-login] Captured refresh_token from Keycloak response');
          }
        }
      }
    } catch {}
  });

  console.log('[workstream-login] Navigating to', BASE_URL);
  await page.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: 30000 }).catch(() => {});

  // Wait up to 5 minutes for SSO auto-login (or manual credential entry) to complete and API calls to fire
  const deadline = Date.now() + 300000;
  while (!capturedToken && Date.now() < deadline) {
    await new Promise(r => setTimeout(r, 1000));
    // Trigger an API call to force token emission
    if (!capturedToken) {
      await page.evaluate(() => {
        fetch('/api/me', { credentials: 'include' }).catch(() => {});
      }).catch(() => {});
    }
  }

  await browser.close();

  if (!capturedToken) {
    console.error('[workstream-login] Failed to capture token.');
    process.exit(1);
  }

  config.access_token = capturedToken;
  if (capturedRefreshToken) config.refresh_token = capturedRefreshToken;
  config.base_url = BASE_URL;
  config.updated_at = new Date().toISOString();
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
  console.log('[workstream-login] Token saved. Verifying...');

  const me = await apiGet(BASE_URL + '/api/me', capturedToken);
  const user = me.user || me;
  if (!user || !user.id) {
    console.error('[workstream-login] Verify failed:', JSON.stringify(me));
    process.exit(1);
  }
  config.user = { id: user.id, email: user.email, name: user.fullName };
  config.api_base = BASE_URL + '/api';
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
  console.log('[workstream-login] Verified. Logged in as:', me.email || me.name);
}

main().catch(e => { console.error('[workstream-login] Fatal:', e.message); process.exit(1); });
