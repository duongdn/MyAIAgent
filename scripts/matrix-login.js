#!/usr/bin/env node
/**
 * Matrix Token Refresh
 *
 * Opens a visible browser to chat.nustechnology.com.
 * Intercepts network requests to capture access_token + refresh_token.
 * Saves tokens to config/.matrix-config.json
 *
 * Usage:
 *   node scripts/matrix-login.js
 */

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const fs = require('fs');
const path = require('path');

const CONFIG_PATH = path.join(__dirname, '..', 'config', '.matrix-config.json');
const PROFILE_DIR = path.join(__dirname, '..', 'tmp', 'matrix-browser-profile');

async function main() {
  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
  const chatUrl = config.chat_url || 'https://chat.nustechnology.com';

  if (!fs.existsSync(path.dirname(PROFILE_DIR))) {
    fs.mkdirSync(path.dirname(PROFILE_DIR), { recursive: true });
  }

  console.log('Opening browser for Matrix login...');
  console.log('Please log in if prompted.\n');

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

  // Intercept requests to capture Bearer tokens
  await page.setRequestInterception(true);
  page.on('request', (req) => {
    const auth = req.headers()['authorization'];
    if (auth && auth.startsWith('Bearer mat_') && !capturedAccessToken) {
      capturedAccessToken = auth.replace('Bearer ', '');
      console.log(`Captured access_token: ${capturedAccessToken.substring(0, 20)}...`);
    }
    req.continue();
  });

  // Also intercept responses for refresh tokens (token refresh responses)
  page.on('response', async (res) => {
    try {
      const url = res.url();
      if (url.includes('/oauth2/token') || url.includes('/_matrix/client') && res.request().method() === 'POST') {
        const text = await res.text().catch(() => '');
        if (text.includes('refresh_token')) {
          const data = JSON.parse(text);
          if (data.access_token) capturedAccessToken = data.access_token;
          if (data.refresh_token) capturedRefreshToken = data.refresh_token;
          console.log('Captured tokens from token response.');
        }
      }
    } catch {}
  });

  console.log(`Navigating to ${chatUrl} ...`);
  await page.goto(chatUrl, { waitUntil: 'networkidle2', timeout: 30000 });

  // Wait for login to complete (poll until we have a token or URL leaves login page)
  console.log('Waiting for you to log in (up to 3 minutes)...');
  const deadline = Date.now() + 3 * 60 * 1000;

  while (Date.now() < deadline) {
    await new Promise(r => setTimeout(r, 2000));

    const url = page.url();

    // Try extracting from localStorage
    if (!capturedAccessToken || !capturedRefreshToken) {
      const stored = await page.evaluate(() => {
        const result = {};
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          const val = localStorage.getItem(key);
          if (key.includes('access_token') || (val && val.startsWith('mat_'))) result.access_token = val;
          if (key.includes('refresh_token') || (val && val.startsWith('mar_'))) result.refresh_token = val;
        }
        return result;
      }).catch(() => ({}));

      if (stored.access_token && stored.access_token.startsWith('mat_')) {
        capturedAccessToken = stored.access_token;
      }
      if (stored.refresh_token && stored.refresh_token.startsWith('mar_')) {
        capturedRefreshToken = stored.refresh_token;
      }
    }

    if (capturedAccessToken) {
      console.log('Token captured! Verifying...');
      break;
    }

    if (!url.includes('login') && !url.includes('welcome')) {
      // Logged in — trigger an API call to get token via network intercept
      await page.evaluate(() => {
        fetch('/_matrix/client/v3/account/whoami', {
          headers: { Authorization: `Bearer ${window.mxMatrixClientPeg?.get()?.getAccessToken() || ''}` }
        }).catch(() => {});
      }).catch(() => {});
      await new Promise(r => setTimeout(r, 2000));
    }
  }

  await browser.close();

  if (!capturedAccessToken) {
    console.error('ERROR: Could not capture access token. Try logging in again.');
    process.exit(1);
  }

  // Save to config
  config.access_token = capturedAccessToken;
  if (capturedRefreshToken) {
    config.refresh_token = capturedRefreshToken;
    console.log(`Captured refresh_token: ${capturedRefreshToken.substring(0, 20)}...`);
  } else {
    console.log('Note: refresh_token not captured (will use access_token only).');
    // Keep existing refresh_token if any
  }

  fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
  console.log(`\n✓ Tokens saved to ${CONFIG_PATH}`);

  // Quick verify
  const { default: fetch } = await import('node-fetch').catch(() => ({ default: require('node-fetch') }));
  const r = await fetch(`${config.homeserver}/_matrix/client/v3/account/whoami`, {
    headers: { Authorization: `Bearer ${capturedAccessToken}` }
  }).catch(() => null);

  if (r && r.ok) {
    const data = await r.json();
    console.log(`✓ Verified: logged in as ${data.user_id}`);
  } else {
    console.log('⚠ Token saved but verification request failed.');
  }
}

main().catch(err => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
