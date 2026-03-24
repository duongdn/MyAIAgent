#!/usr/bin/env node
/**
 * Automated Matrix Token Refresh
 *
 * Uses OIDC device code flow + Puppeteer to auto-approve.
 * No manual interaction needed — browser profile has SSO session cookies.
 *
 * Usage:
 *   node scripts/matrix-token-refresh.js
 *
 * Saves fresh access_token + refresh_token to config/.matrix-config.json
 * Designed to run before each alert scan (cron).
 */

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const CONFIG_PATH = path.join(__dirname, '..', 'config', '.matrix-config.json');
const PROFILE_DIR = path.join(__dirname, '..', 'tmp', 'matrix-browser-profile');

function post(url, data) {
  return new Promise((resolve, reject) => {
    const body = typeof data === 'string' ? data : new URLSearchParams(data).toString();
    const parsed = new URL(url);
    const mod = parsed.protocol === 'https:' ? https : http;
    const req = mod.request(parsed, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(body),
      },
    }, (res) => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        try { resolve(JSON.parse(d)); }
        catch { resolve({ raw: d, status: res.statusCode }); }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

function get(url, headers = {}) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const mod = parsed.protocol === 'https:' ? https : http;
    mod.get(parsed, { headers }, (res) => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        try { resolve(JSON.parse(d)); }
        catch { resolve({ raw: d, status: res.statusCode }); }
      });
    }).on('error', reject);
  });
}

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function main() {
  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
  const homeserver = config.homeserver;
  const clientId = config.oidc_client_id;
  const tokenEndpoint = config.token_endpoint;

  // Step 0: Check if current token is still valid
  console.log('Checking current token...');
  const whoami = await get(`${homeserver}/_matrix/client/v3/account/whoami`, {
    Authorization: `Bearer ${config.access_token}`,
  }).catch(() => null);

  if (whoami && whoami.user_id) {
    console.log(`Current token valid (${whoami.user_id}). Skipping refresh.`);
    process.exit(0);
  }
  console.log('Token expired. Starting refresh...');

  // Step 1: Try refresh_token first (fast path, no browser needed)
  if (config.refresh_token) {
    console.log('Trying refresh_token...');
    const refreshResp = await post(tokenEndpoint, {
      grant_type: 'refresh_token',
      refresh_token: config.refresh_token,
      client_id: clientId,
    });

    if (refreshResp.access_token) {
      console.log('Refresh token worked!');
      config.access_token = refreshResp.access_token;
      if (refreshResp.refresh_token) config.refresh_token = refreshResp.refresh_token;
      fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
      console.log('Tokens saved.');
      process.exit(0);
    }
    console.log('Refresh token expired:', refreshResp.error || 'unknown');
  }

  // Step 2: Device code flow + browser auto-approval
  console.log('Starting device code flow...');
  const deviceResp = await post(`${homeserver}/auth/oauth2/device`, {
    client_id: clientId,
    scope: 'openid urn:matrix:org.matrix.msc2967.client:api:* urn:matrix:org.matrix.msc2967.client:device:auto',
  });

  if (!deviceResp.device_code) {
    console.error('Failed to get device code:', deviceResp);
    process.exit(1);
  }

  const { device_code, user_code, verification_uri_complete, interval } = deviceResp;
  console.log(`Device code obtained. Verification URL: ${verification_uri_complete}`);

  // Step 3: Auto-approve via Puppeteer (uses saved SSO cookies)
  console.log('Opening browser to auto-approve...');

  if (!fs.existsSync(PROFILE_DIR)) {
    fs.mkdirSync(PROFILE_DIR, { recursive: true });
  }

  const browser = await puppeteer.launch({
    headless: false,
    userDataDir: PROFILE_DIR,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--window-position=9999,9999',  // off-screen
      '--window-size=800,600',
    ],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 800, height: 600 });

  try {
    await page.goto(verification_uri_complete, { waitUntil: 'networkidle2', timeout: 30000 });

    // Wait for the approval page and click approve/continue
    let approved = false;
    for (let attempt = 0; attempt < 15; attempt++) {
      const url = page.url();
      const content = await page.content();

      // Look for approve/continue/confirm buttons
      const clicked = await page.evaluate(() => {
        // Try common button patterns
        const selectors = [
          'button[type="submit"]',
          'button:not([disabled])',
          'input[type="submit"]',
          'a.btn',
          '[data-testid="approve"]',
        ];
        for (const sel of selectors) {
          const btns = document.querySelectorAll(sel);
          for (const btn of btns) {
            const text = (btn.textContent || btn.value || '').toLowerCase();
            if (text.includes('approve') || text.includes('continue') ||
                text.includes('confirm') || text.includes('accept') ||
                text.includes('grant') || text.includes('allow') ||
                text.includes('link') || text.includes('submit')) {
              btn.click();
              return text;
            }
          }
        }
        return null;
      });

      if (clicked) {
        console.log(`Clicked: "${clicked}"`);
        await sleep(2000);
        approved = true;
      }

      // Check if we landed on a success page
      const pageText = await page.evaluate(() => document.body?.innerText || '');
      if (pageText.toLowerCase().includes('success') ||
          pageText.toLowerCase().includes('linked') ||
          pageText.toLowerCase().includes('approved') ||
          pageText.toLowerCase().includes('device is now connected')) {
        console.log('Approval successful!');
        approved = true;
        break;
      }

      if (approved && attempt > 2) break;
      await sleep(2000);
    }

    if (!approved) {
      console.log('Could not auto-approve. Page content:');
      const text = await page.evaluate(() => document.body?.innerText?.substring(0, 500));
      console.log(text);
    }
  } catch (err) {
    console.error('Browser error:', err.message);
  } finally {
    await browser.close();
  }

  // Step 4: Poll for token
  console.log('Polling for token...');
  const pollInterval = (interval || 5) * 1000;
  const deadline = Date.now() + 60000; // 1 min timeout

  while (Date.now() < deadline) {
    await sleep(pollInterval);

    const tokenResp = await post(tokenEndpoint, {
      grant_type: 'urn:ietf:params:oauth:grant-type:device_code',
      device_code: device_code,
      client_id: clientId,
    });

    if (tokenResp.access_token) {
      console.log('Got tokens!');
      config.access_token = tokenResp.access_token;
      if (tokenResp.refresh_token) config.refresh_token = tokenResp.refresh_token;
      fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));

      // Verify
      const verify = await get(`${homeserver}/_matrix/client/v3/account/whoami`, {
        Authorization: `Bearer ${config.access_token}`,
      }).catch(() => null);

      if (verify && verify.user_id) {
        console.log(`Verified: ${verify.user_id}`);
      }
      console.log('Tokens saved to config.');
      process.exit(0);
    }

    if (tokenResp.error === 'authorization_pending') {
      process.stdout.write('.');
      continue;
    }

    if (tokenResp.error === 'slow_down') {
      await sleep(5000);
      continue;
    }

    // Other errors (expired, denied, etc.)
    console.error('Token poll failed:', tokenResp.error, tokenResp.error_description);
    break;
  }

  console.error('Failed to obtain tokens within timeout.');
  process.exit(1);
}

main().catch(err => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
