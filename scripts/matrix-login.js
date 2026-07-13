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

  // Hook XHR setRequestHeader early (before any page script runs) to catch the
  // Authorization header for XHR-based requests that Puppeteer's network
  // interception might miss/mis-timestamp relative to page navigation.
  await page.evaluateOnNewDocument(() => {
    const orig = XMLHttpRequest.prototype.setRequestHeader;
    window.__auth = null;
    XMLHttpRequest.prototype.setRequestHeader = function (k, v) {
      if (k.toLowerCase() === 'authorization') window.__auth = v;
      return orig.apply(this, arguments);
    };
  });

  // A real Matrix/OIDC token is a non-trivial opaque string — reject
  // booleans/short placeholders (e.g. some capability responses literally
  // contain {"access_token": true} as a feature flag, not a real token;
  // this previously got captured verbatim as the literal string "true").
  const looksLikeToken = (v) => typeof v === 'string' && v.length >= 20;

  // Intercept requests to capture Bearer tokens
  await page.setRequestInterception(true);
  page.on('request', (req) => {
    const auth = req.headers()['authorization'];
    if (auth && auth.startsWith('Bearer ') && !capturedAccessToken) {
      const candidate = auth.replace('Bearer ', '');
      if (looksLikeToken(candidate)) {
        capturedAccessToken = candidate;
        console.log(`Captured access_token: ${capturedAccessToken.substring(0, 20)}...`);
      }
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
          if (looksLikeToken(data.access_token)) capturedAccessToken = data.access_token;
          if (looksLikeToken(data.refresh_token)) capturedRefreshToken = data.refresh_token;
          if (looksLikeToken(data.access_token) || looksLikeToken(data.refresh_token)) {
            console.log('Captured tokens from token response.');
          }
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

    // Dismiss the "Element is open in another window" session-lock prompt —
    // a stale lock from a prior hard-killed (pkill -9) run blocks the actual
    // app from loading, and the profile is otherwise already logged in.
    // Use a real Puppeteer ElementHandle.click() (dispatches actual CDP mouse
    // events) — React's synthetic event system doesn't reliably respond to
    // an in-page DOM element.click() call.
    try {
      const buttons = await page.$$('button');
      for (const b of buttons) {
        const text = await page.evaluate(el => el.textContent.trim(), b);
        if (text === 'Continue') {
          await b.click();
          console.log('Dismissed stale session-lock prompt ("Continue" clicked via real mouse event).');
          await new Promise(r => setTimeout(r, 3000));
          break;
        }
      }
    } catch (e) {
      console.log('Continue-click attempt error:', e.message);
    }

    const url = page.url();

    // Try extracting from localStorage
    if (!capturedAccessToken || !capturedRefreshToken) {
      const stored = await page.evaluate(() => {
        const result = {};
        // Literal key 'token' holds a JSON blob {access_token, refresh_token, ...}
        const tokenBlob = localStorage.getItem('token');
        if (tokenBlob) {
          try {
            const parsed = JSON.parse(tokenBlob);
            if (parsed.access_token) result.access_token = parsed.access_token;
            if (parsed.refresh_token) result.refresh_token = parsed.refresh_token;
          } catch {}
        }
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          const val = localStorage.getItem(key);
          if (!result.access_token && (key.includes('access_token') || (val && val.startsWith('mat_')))) result.access_token = val;
          if (!result.refresh_token && (key.includes('refresh_token') || (val && val.startsWith('mar_')))) result.refresh_token = val;
        }
        return result;
      }).catch(() => ({}));

      if (looksLikeToken(stored.access_token)) {
        capturedAccessToken = stored.access_token;
      }
      if (looksLikeToken(stored.refresh_token)) {
        capturedRefreshToken = stored.refresh_token;
      }
    }

    // Check the injected XHR Authorization header hook
    if (!capturedAccessToken) {
      const hookedAuth = await page.evaluate(() => window.__auth).catch(() => null);
      if (hookedAuth && hookedAuth.startsWith('Bearer ')) {
        const candidate = hookedAuth.replace('Bearer ', '');
        if (looksLikeToken(candidate)) {
          capturedAccessToken = candidate;
          console.log(`Captured access_token via XHR hook: ${capturedAccessToken.substring(0, 20)}...`);
        }
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

  if (!capturedAccessToken) {
    // Debug aid: dump current URL, page title, and localStorage keys before closing
    try {
      const debugInfo = await page.evaluate(() => ({
        url: location.href,
        title: document.title,
        keys: Object.keys(localStorage),
      }));
      console.error('DEBUG: url=', debugInfo.url, 'title=', debugInfo.title, 'localStorage keys=', debugInfo.keys);
      await page.screenshot({ path: path.join(__dirname, '..', 'tmp', 'matrix-login-debug.png') });
      console.error('DEBUG: screenshot saved to tmp/matrix-login-debug.png');
    } catch (e) {
      console.error('DEBUG: could not capture debug info:', e.message);
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
