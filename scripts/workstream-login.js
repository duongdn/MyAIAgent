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
const { saveSecretConfig } = require('./lib/save-secret-config');
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

  // Use headless:'new' so this works on cron servers without a display.
  // Keycloak session cookies in the saved profile handle SSO — no interaction needed.
  const headlessMode = process.env.WORKSTREAM_HEADFUL === '1' ? false : 'new';

  // Outer retry loop: if full browser session fails, try again with fresh profile
  for (let browserAttempt = 1; browserAttempt <= 2; browserAttempt++) {
    const browser = await puppeteer.launch({
      headless: headlessMode,
      userDataDir: PROFILE_DIR,
      env: { ...process.env, TMPDIR: '/var/tmp' },
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--window-size=1280,900',
        '--crash-dumps-dir=/var/tmp',
        '--ignore-certificate-errors',
      ],
    });

    const page = await browser.newPage();
    let capturedToken = null;
    let capturedRefreshToken = null;
    let keycloakRedirected = false;

    // Intercept Bearer tokens from API requests AND refresh_token from Keycloak responses.
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      const url = req.url();
      const auth = req.headers()['authorization'];
      if (auth && auth.startsWith('Bearer ') && url.startsWith(BASE_URL + '/api/') && !capturedToken) {
        capturedToken = auth.replace('Bearer ', '');
        console.log('[workstream-login] Token captured from API request:', url.replace(BASE_URL, ''));
      }
      // Detect Keycloak redirect — means SSO cookies are alive
      if (url.includes('auth.nustechnology.com') && !keycloakRedirected) {
        keycloakRedirected = true;
        console.log('[workstream-login] SSO redirect detected — Keycloak cookies alive');
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

    console.log(`[workstream-login] Attempt ${browserAttempt}: Navigating to ${BASE_URL}`);
    await page.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: 30000 }).catch(() => {});

    // Click SSO button up to 3 times with 2s gap
    for (let i = 0; i < 3 && !capturedToken; i++) {
      const clicked = await page.evaluate(() => {
        const btn = Array.from(document.querySelectorAll('button, a')).find(el =>
          /sign in with sso/i.test(el.textContent || '')
        );
        if (btn) { btn.click(); return true; }
        return false;
      }).catch(() => false);
      if (clicked) console.log('[workstream-login] Clicked "Sign in with SSO"');
      await new Promise(r => setTimeout(r, 2000));

      // After clicking SSO, check if we landed on Keycloak — trigger API call to force token
      if (keycloakRedirected || clicked) {
        await page.evaluate(() => {
          fetch('/api/me', { credentials: 'include' }).catch(() => {});
        }).catch(() => {});
      }
    }

    // If SSO redirect happened, we should get a token fast. Wait up to 90s (not 5 min).
    // If no SSO redirect after 15s, assume session cookies are dead — restart browser.
    const waitTimeout = keycloakRedirected ? 90000 : 15000;
    const deadline = Date.now() + waitTimeout;
    while (!capturedToken && Date.now() < deadline) {
      await new Promise(r => setTimeout(r, 1000));
      if (!capturedToken) {
        await page.evaluate(() => {
          fetch('/api/me', { credentials: 'include' }).catch(() => {});
        }).catch(() => {});
      }
    }

    await browser.close();

    if (capturedToken) {
      config.access_token = capturedToken;
      if (capturedRefreshToken) config.refresh_token = capturedRefreshToken;
      config.base_url = BASE_URL;
      config.updated_at = new Date().toISOString();
      saveSecretConfig(CONFIG_PATH, config);
      console.log('[workstream-login] Token saved. Verifying...');

      const me = await apiGet(BASE_URL + '/api/me', capturedToken);
      const user = me.user || me;
      if (!user || !user.id) {
        console.error('[workstream-login] Verify failed:', JSON.stringify(me));
        process.exit(1);
      }
      config.user = { id: user.id, email: user.email, name: user.fullName };
      config.api_base = BASE_URL + '/api';
      saveSecretConfig(CONFIG_PATH, config);
      console.log('[workstream-login] Verified. Logged in as:', me.email || me.fullName);
      return;
    }

    console.log(`[workstream-login] Browser attempt ${browserAttempt}: no token captured${keycloakRedirected ? ' (SSO redirected but API never fired)' : ' (no SSO redirect — cookies likely expired)'}`);
    // Before next attempt, clear profile to force fresh session
    try { fs.rmSync(PROFILE_DIR, { recursive: true }); } catch {}
  }
}

main().catch(e => { console.error('[workstream-login] Fatal:', e.message); process.exit(1); });
