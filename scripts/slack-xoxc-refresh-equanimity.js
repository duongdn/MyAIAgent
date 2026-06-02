#!/usr/bin/env node
/**
 * Refresh xoxc token for Equanimity Slack workspace
 * Same pattern as slack-xoxc-refresh-amazingmeds.js
 */
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');
const path = require('path');
const https = require('https');

puppeteer.use(StealthPlugin());

const CONFIG_PATH = path.join(__dirname, '..', 'config', '.slack-accounts.json');
const PROFILE_DIR = path.join(__dirname, '..', 'tmp', 'slack-profiles', 'equanimity');
const TIMEOUT = 60000;
const sleep = ms => new Promise(r => setTimeout(r, ms));

function apiGet(url, headers) {
  return new Promise(resolve => {
    https.get(url, { headers }, res => {
      let d = ''; res.on('data', c => d += c);
      res.on('end', () => { try { resolve(JSON.parse(d)); } catch(e) { resolve({}); } });
    }).on('error', () => resolve({}));
  });
}

(async () => {
  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
  const acct = config.accounts.find(a => (a.workspace || '').toLowerCase().includes('equanimity'));
  if (!acct) throw new Error('Equanimity account not found');

  const { email, password } = acct.login;
  console.log('Refreshing:', acct.workspace, '|', email);

  // Check if already valid
  const curHeaders = { Authorization: 'Bearer ' + acct.token };
  if (acct.cookie) curHeaders.Cookie = 'd=' + acct.cookie;
  const curCheck = await apiGet('https://slack.com/api/auth.test', curHeaders);
  if (curCheck.ok) {
    console.log('Token already valid:', curCheck.team, '/', curCheck.user);
    process.exit(0);
  }
  console.log('Token invalid:', curCheck.error, '— refreshing');

  fs.mkdirSync(PROFILE_DIR, { recursive: true });

  const SOCKS_DIR = path.join(__dirname, '..', 'tmp', 'chrome-socks');
  fs.mkdirSync(SOCKS_DIR, { recursive: true });
  // TMPDIR required: sandbox restricts writes to /tmp, Chrome needs writable socket dir
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: '/usr/bin/google-chrome',
    userDataDir: PROFILE_DIR,
    env: { ...process.env, TMPDIR: SOCKS_DIR },
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--window-size=1280,900'],
    defaultViewport: { width: 1280, height: 900 },
  });

  let capturedToken = null;
  let capturedCookie = null;

  try {
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36');

    // Intercept API requests to grab xoxc token
    page.on('response', async response => {
      if (capturedToken) return;
      if (!response.url().includes('slack.com/api/')) return;
      try {
        const auth = response.request().headers()['authorization'] || '';
        const m = auth.match(/(xox[cp]-[\w-]+)/);
        if (m) { capturedToken = m[1]; console.log('Token intercepted from:', response.url().split('/').pop()); }
      } catch(e) {}
    });

    console.log('Navigating to sign_in_with_password...');
    await page.goto('https://equanimity-talk.slack.com/sign_in_with_password', { waitUntil: 'domcontentloaded', timeout: TIMEOUT }).catch(() => {});
    await sleep(3000);
    console.log('URL:', page.url().slice(0, 80));
    await page.screenshot({ path: path.join(__dirname, '../tmp/slack-equanimity-01.png') });

    // Email field
    const emailSel = 'input[type="email"], input[name="email"], #email';
    const emailField = await page.$(emailSel);
    if (emailField) {
      await emailField.click({ clickCount: 3 });
      await emailField.type(email, { delay: 50 });
      const submitSel = 'button[type="submit"], #submit_btn, .c-button--primary';
      const btn = await page.$(submitSel);
      if (btn) await btn.click();
      await sleep(2000);
    }

    // Password field
    const passSel = 'input[type="password"], input[name="password"], #password';
    const passField = await page.$(passSel);
    if (passField) {
      console.log('Password field — entering');
      await passField.click({ clickCount: 3 });
      await passField.type(password, { delay: 50 });
      const submitSel = 'button[type="submit"], #submit_btn, .c-button--primary';
      const btn2 = await page.$(submitSel);
      if (btn2) await btn2.click(); else await page.keyboard.press('Enter');
      await page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: TIMEOUT }).catch(() => {});
      await sleep(4000);
      console.log('Post-login URL:', page.url().slice(0, 80));
      await page.screenshot({ path: path.join(__dirname, '../tmp/slack-equanimity-02.png') });
    }

    // Grab cookie
    const cookies = await page.cookies('https://slack.com', 'https://equanimity-talk.slack.com');
    const dCookie = cookies.find(c => c.name === 'd');
    if (dCookie) { capturedCookie = dCookie.value; console.log('Cookie captured, len:', capturedCookie.length); }

    // Try boot_data and localStorage
    const extractToken = async () => {
      return page.evaluate(() => {
        try {
          const boot = window.boot_data || window.BOOT_DATA || {};
          const t1 = boot.token || boot.api_token;
          if (t1) return t1;
          for (let i = 0; i < localStorage.length; i++) {
            const val = localStorage.getItem(localStorage.key(i));
            if (val && val.includes('xoxc-')) {
              const m = val.match(/xoxc-[\w-]+/);
              if (m) return m[0];
            }
          }
          return null;
        } catch(e) { return null; }
      }).catch(() => null);
    };

    if (!capturedToken) capturedToken = await extractToken();

    // Navigate to equanimity workspace to force token emission
    if (!capturedToken) {
      console.log('Navigating to workspace to force token...');
      await page.goto('https://equanimity-talk.slack.com/', { waitUntil: 'domcontentloaded', timeout: TIMEOUT }).catch(() => {});
      await sleep(8000);
      capturedToken = await extractToken();
      const cookies2 = await page.cookies('https://slack.com', 'https://equanimity-talk.slack.com', 'https://app.slack.com');
      const d2 = cookies2.find(c => c.name === 'd');
      if (d2 && !capturedCookie) capturedCookie = d2.value;
    }

  } finally {
    await browser.close();
  }

  if (!capturedToken) { console.error('Failed to capture token'); process.exit(1); }

  // Validate
  const headers = { Authorization: 'Bearer ' + capturedToken };
  if (capturedCookie) headers.Cookie = 'd=' + capturedCookie;
  const check = await apiGet('https://slack.com/api/auth.test', headers);
  if (!check.ok) { console.error('Captured token invalid:', check.error); process.exit(1); }
  console.log('Token valid! Team:', check.team, '| User:', check.user);

  // Save to config
  acct.token = capturedToken;
  if (capturedCookie) acct.cookie = capturedCookie;
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
  console.log('Config saved ✓');

  // Scan for messages in monitoring window
  const OLDEST = Math.floor(new Date('2026-05-27T01:56:29Z').getTime() / 1000);
  const sres = await apiGet('https://slack.com/api/search.messages?query=after:2026-05-26&count=20', headers);
  const total = sres.messages?.total || 0;
  console.log('\nMessages in workspace (total):', total);
  if (sres.messages?.matches) {
    const inWindow = sres.messages.matches.filter(m => parseFloat(m.ts) >= OLDEST);
    console.log('In monitoring window:', inWindow.length);
    inWindow.forEach(m => {
      const ts = new Date(parseFloat(m.ts) * 1000).toISOString();
      console.log(' ', ts, '#' + (m.channel?.name || '?'), '@' + (m.username || m.user), (m.text || '').slice(0, 120));
    });
    if (inWindow.length === 0) console.log('  → Quiet. No messages since window start.');
  }
})().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
