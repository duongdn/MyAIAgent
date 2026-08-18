#!/usr/bin/env node
/**
 * Extract Solid Code Team Slack xoxc token — fully headless, isolated tmp profile,
 * no live-desktop interaction. Injects David's (Profile 15) cookies extracted via
 * get-david-slack-cookies.py, same pattern as slack-extract-ohcleo-token.js.
 *
 * Usage: node scripts/slack-extract-solidcode-token.js
 * Output: updates config/.slack-accounts.json with Solid Code entry.
 */
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const { spawnSync } = require('child_process');
const fs = require('fs');
const { saveSecretConfig } = require('./lib/save-secret-config');
const path = require('path');
const https = require('https');

puppeteer.use(StealthPlugin());

const PROFILE_DIR = path.join(__dirname, '..', 'tmp', 'slack-profiles', 'solidcode');
const CONFIG_PATH = path.join(__dirname, '..', 'config', '.slack-accounts.json');
const COOKIES_FILE = '/tmp/david-slack-cookies.json';
const PYTHON = 'python3';
const COOKIE_PY = path.join(__dirname, 'get-david-slack-cookies.py');
const WORKSPACE_HOST = 'solid-code-team.slack.com';
const sleep = ms => new Promise(r => setTimeout(r, ms));

function extractCookies() {
  const res = spawnSync(PYTHON, [COOKIE_PY], { encoding: 'utf8' });
  if (res.status !== 0) throw new Error('Cookie extraction failed: ' + res.stderr);
  return JSON.parse(fs.readFileSync(COOKIES_FILE, 'utf8'));
}

function apiTest(token, dCookie) {
  const body = `token=${encodeURIComponent(token)}`;
  const dEnc = encodeURIComponent(dCookie);
  return new Promise(resolve => {
    const req = https.request({
      hostname: WORKSPACE_HOST,
      path: '/api/auth.test',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'd=' + dEnc,
        'Content-Length': Buffer.byteLength(body),
      },
    }, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => { try { resolve(JSON.parse(d)); } catch { resolve({}); } });
    }).on('error', () => resolve({}));
    req.write(body);
    req.end();
  });
}

(async () => {
  console.log('Extracting Solid Code cookies from Chrome Profile 15...');
  const cookies = extractCookies();
  const dCookie = cookies.find(c => c.name === 'd')?.value || '';
  if (!dCookie.startsWith('xoxd-')) {
    console.error('No valid d cookie found'); process.exit(1);
  }
  console.log(`Got ${cookies.length} cookies. d=${dCookie.slice(0, 25)}...`);

  fs.mkdirSync(PROFILE_DIR, { recursive: true });

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: '/usr/bin/google-chrome',
    userDataDir: PROFILE_DIR,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-blink-features=AutomationControlled',
      '--window-size=1280,900',
    ],
    defaultViewport: { width: 1280, height: 900 },
    ignoreDefaultArgs: ['--enable-automation'],
  });

  let xoxcToken = null;

  try {
    const page = await browser.newPage();

    await page.evaluateOnNewDocument(() => {
      Object.defineProperty(navigator, 'webdriver', { get: () => false });
    });

    await page.setCookie(...cookies.map(c => ({
      name: c.name,
      value: c.value,
      domain: c.domain,
      path: c.path,
      secure: c.secure,
      httpOnly: c.httpOnly,
      sameSite: 'None',
    })));

    await page.setRequestInterception(true);
    page.on('request', req => {
      const auth = req.headers()['authorization'] || '';
      if (req.url().includes(WORKSPACE_HOST + '/api/') && auth.startsWith('Bearer xoxc-') && !xoxcToken) {
        xoxcToken = auth.replace('Bearer ', '');
        console.log('Intercepted xoxc:', xoxcToken.slice(0, 35) + '...');
      }
      req.continue();
    });

    console.log(`Navigating to https://${WORKSPACE_HOST}/ ...`);
    await page.goto(`https://${WORKSPACE_HOST}/`, {
      waitUntil: 'domcontentloaded',
      timeout: 30000,
    }).catch(e => console.log('Nav note:', e.message.slice(0, 60)));

    for (let i = 0; i < 20 && !xoxcToken; i++) {
      await sleep(1000);
      if (i % 5 === 4) console.log(`Waiting... ${i + 1}s | URL: ${page.url().slice(0, 70)}`);
    }

    if (!xoxcToken) {
      xoxcToken = await page.evaluate(() => {
        if (typeof TS !== 'undefined' && TS.boot_data?.api_token) return TS.boot_data.api_token;
        for (const s of document.querySelectorAll('script')) {
          const m = s.textContent.match(/"token":"(xoxc-[^"]+)"/);
          if (m) return m[1];
        }
        try {
          for (const k of Object.keys(localStorage)) {
            const v = localStorage.getItem(k) || '';
            const m = v.match(/(xoxc-[\w-]+)/);
            if (m) return m[1];
          }
        } catch {}
        return null;
      }).catch(() => null);
    }

    console.log('Final URL:', page.url());

  } finally {
    await browser.close();
  }

  if (!xoxcToken) {
    console.error('\n❌ Could not extract xoxc token');
    console.error('   Slack may still require device verification for this profile copy.');
    process.exit(1);
  }

  const check = await apiTest(xoxcToken, dCookie);
  if (!check.ok) {
    console.error('Token verification failed:', check.error);
    process.exit(1);
  }
  console.log(`\n✅ Token verified: workspace=${check.team}, user=${check.user}`);

  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
  const accounts = config.accounts;
  const idx = accounts.findIndex(a => (a.workspace || '').toLowerCase().includes('solid code'));
  const entry = {
    workspace: 'Solid Code',
    url: `https://${WORKSPACE_HOST}/`,
    token: xoxcToken,
    cookie: dCookie,
    auth_type: 'session',
    login: { note: 'David Profile 15 — refresh via: node scripts/slack-extract-solidcode-token.js' },
  };

  if (idx >= 0) { accounts[idx] = entry; console.log('Updated existing Solid Code entry'); }
  else { accounts.push(entry); console.log('Added new Solid Code entry'); }

  saveSecretConfig(CONFIG_PATH, config);
  console.log('Saved. Re-encrypt: bash scripts/encrypt-secrets.sh');
})();
