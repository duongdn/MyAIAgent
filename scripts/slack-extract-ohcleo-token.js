#!/usr/bin/env node
/**
 * Extract OhCleo Slack xoxc token using Tony's existing session (d cookie from Chrome Profile 25).
 * Injects session cookie into headless browser, navigates to workspace, intercepts API token.
 *
 * Prerequisites: run decrypt-secrets.sh first.
 * Usage: node scripts/slack-extract-ohcleo-token.js
 * Output: updates config/.slack-accounts.json with ohcleo entry (then re-encrypt).
 */
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const { spawnSync } = require('child_process');
const fs   = require('fs');
const path = require('path');
const https = require('https');

puppeteer.use(StealthPlugin());

const PROFILE_DIR = path.join(__dirname, '..', 'tmp', 'slack-profiles', 'ohcleo');
const CONFIG_PATH = path.join(__dirname, '..', 'config', '.slack-accounts.json');
const HELPER_PY   = path.join(__dirname, 'get-slack-d-cookie.py');
const PYTHON      = path.join(__dirname, '..', '.claude', 'skills', '.venv', 'bin', 'python3');
const sleep       = ms => new Promise(r => setTimeout(r, ms));

function getDCookie() {
  const res = spawnSync(PYTHON, [HELPER_PY], { encoding: 'utf8' });
  if (res.status !== 0) throw new Error('get-slack-d-cookie.py failed: ' + res.stderr);
  return res.stdout.trim();
}

function apiTest(token, dCookie) {
  return new Promise(resolve => {
    https.get({
      hostname: 'slack.com',
      path: '/api/auth.test',
      headers: { Authorization: 'Bearer ' + token, Cookie: 'd=' + dCookie },
    }, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => { try { resolve(JSON.parse(d)); } catch { resolve({}); } });
    }).on('error', () => resolve({}));
  });
}

(async () => {
  const dCookie = getDCookie();
  if (!dCookie.startsWith('xoxd-')) {
    console.error('Invalid d cookie:', dCookie.slice(0, 20));
    process.exit(1);
  }
  console.log('d cookie:', dCookie.slice(0, 25) + '...');

  fs.mkdirSync(PROFILE_DIR, { recursive: true });

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: '/usr/bin/google-chrome',
    userDataDir: PROFILE_DIR,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--window-size=1280,900'],
    defaultViewport: { width: 1280, height: 900 },
  });

  let xoxcToken = null;

  try {
    const page = await browser.newPage();

    // Inject Tony's session cookie
    await page.setCookie(
      { name: 'd',   value: dCookie,       domain: '.slack.com', path: '/', secure: true, httpOnly: true },
      { name: 'd-s', value: '1781147530',  domain: '.slack.com', path: '/', secure: true },
    );

    // Intercept requests to capture workspace-specific xoxc token
    await page.setRequestInterception(true);
    page.on('request', req => {
      const auth = req.headers()['authorization'] || '';
      if (req.url().includes('ohcleo.slack.com/api/') && auth.startsWith('Bearer xoxc-') && !xoxcToken) {
        xoxcToken = auth.replace('Bearer ', '');
        console.log('Intercepted xoxc:', xoxcToken.slice(0, 35) + '...');
      }
      req.continue();
    });

    console.log('Navigating to https://ohcleo.slack.com/ ...');
    await page.goto('https://ohcleo.slack.com/', {
      waitUntil: 'domcontentloaded',
      timeout: 30000,
    }).catch(e => console.log('Nav note:', e.message.slice(0, 60)));

    // Wait up to 15s for API calls to fire
    for (let i = 0; i < 15 && !xoxcToken; i++) await sleep(1000);

    if (!xoxcToken) {
      // Fallback: try page source and localStorage
      xoxcToken = await page.evaluate(() => {
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
    console.error('\n❌ Could not extract xoxc token — session may not have OhCleo Slack access');
    console.error('   Tony may need to open ohcleo.slack.com in Chrome first to refresh the session.');
    process.exit(1);
  }

  // Verify token
  const check = await apiTest(xoxcToken, dCookie);
  if (!check.ok) {
    console.error('Token verification failed:', check.error);
    process.exit(1);
  }
  console.log(`\n✅ Token verified: workspace=${check.team}, user=${check.user}`);

  // Update config/.slack-accounts.json
  const config   = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
  const accounts = config.accounts;
  const idx      = accounts.findIndex(a => (a.workspace || '').toLowerCase().includes('ohcleo'));
  const entry    = {
    workspace: 'OhCleo',
    url:       'https://ohcleo.slack.com/',
    token:     xoxcToken,
    cookie:    dCookie,
    auth_type: 'session',
    login:     { note: 'Tony Profile 25 — refresh via: node scripts/slack-extract-ohcleo-token.js' },
  };

  if (idx >= 0) {
    accounts[idx] = entry;
    console.log('Updated existing OhCleo entry in config');
  } else {
    accounts.push(entry);
    console.log('Added new OhCleo entry to config');
  }

  fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
  console.log('Saved. Re-encrypt: bash scripts/encrypt-secrets.sh');
})();
