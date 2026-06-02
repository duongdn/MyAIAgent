// Refresh Amazing Meds xoxc token using a fresh tmp profile directory
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');
const path = require('path');
const https = require('https');
const os = require('os');

puppeteer.use(StealthPlugin());

const CONFIG_PATH = path.join(__dirname, '..', 'config', '.slack-accounts.json');
const TMP_BASE = path.join(__dirname, '..', 'tmp');
fs.mkdirSync(TMP_BASE, { recursive: true });
const PROFILE_DIR = fs.mkdtempSync(path.join(TMP_BASE, 'amazing-meds-tmp-'));
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
  const acct = config.accounts.find(a => (a.workspace || '').toLowerCase().includes('amazing'));
  if (!acct) throw new Error('Amazing Meds account not found');

  const { email, password } = acct.login;
  console.log('Account:', acct.workspace, '|', email);

  const curHeaders = { Authorization: 'Bearer ' + acct.token };
  if (acct.cookie) curHeaders.Cookie = 'd=' + acct.cookie;
  const curCheck = await apiGet('https://slack.com/api/auth.test', curHeaders);
  if (curCheck.ok) {
    console.log('Token already valid:', curCheck.team, '/', curCheck.user);
    fs.rmSync(PROFILE_DIR, { recursive: true, force: true });
    process.exit(0);
  }
  console.log('Refreshing with tmp dir:', PROFILE_DIR);

  const SOCKS_DIR = path.join(__dirname, '..', 'tmp', 'chrome-socks');
  fs.mkdirSync(SOCKS_DIR, { recursive: true });
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

    page.on('response', async response => {
      if (capturedToken) return;
      const url = response.url();
      if (!url.includes('slack.com/api/')) return;
      try {
        const reqHeaders = response.request().headers();
        const auth = reqHeaders['authorization'] || '';
        const m = auth.match(/(xox[cp]-[^\s,]+)/);
        if (m) { capturedToken = m[1]; console.log('Token from:', url.split('/').pop()); }
      } catch(e) {}
    });

    await page.goto('https://amazingmeds.slack.com/sign_in_with_password', { waitUntil: 'domcontentloaded', timeout: TIMEOUT }).catch(() => {});
    await sleep(3000);
    console.log('URL:', page.url().slice(0, 80));

    const emailField = await page.$('input[type="email"], input[name="email"], #email');
    if (emailField) {
      await emailField.click({ clickCount: 3 });
      await emailField.type(email, { delay: 50 });
      await sleep(500);
      const btn = await page.$('button[type="submit"], #submit_btn, .c-button--primary');
      if (btn) await btn.click();
      await sleep(2000);
    }

    const passField = await page.$('input[type="password"], input[name="password"], #password');
    if (passField) {
      await passField.click({ clickCount: 3 });
      await passField.type(password, { delay: 50 });
      const btn2 = await page.$('button[type="submit"], #submit_btn, .c-button--primary');
      if (btn2) await btn2.click();
      else await page.keyboard.press('Enter');
      await page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: TIMEOUT }).catch(() => {});
      await sleep(4000);
      console.log('Post-login:', page.url().slice(0, 80));
    }

    const cookies = await page.cookies('https://slack.com', 'https://amazingmeds.slack.com');
    const dCookie = cookies.find(c => c.name === 'd');
    if (dCookie) capturedCookie = dCookie.value;

    if (!capturedToken) {
      capturedToken = await page.evaluate(() => {
        try {
          for (let i = 0; i < localStorage.length; i++) {
            const val = localStorage.getItem(localStorage.key(i));
            if (val && (val.includes('xoxc-') || val.includes('xoxp-'))) {
              const m = val.match(/xox[cp]-[\w-]+/);
              if (m) return m[0];
            }
          }
        } catch(e) {}
        return null;
      }).catch(() => null);
    }

    if (!capturedToken) {
      await page.goto('https://app.slack.com/client/T04QST2MWTU', { waitUntil: 'domcontentloaded', timeout: TIMEOUT }).catch(() => {});
      await sleep(8000);
      capturedToken = await page.evaluate(() => {
        try {
          const boot = window.boot_data || {};
          if (boot.token) return boot.token;
          for (let i = 0; i < localStorage.length; i++) {
            const val = localStorage.getItem(localStorage.key(i));
            if (val && (val.includes('xoxc-') || val.includes('xoxp-'))) {
              const m = val.match(/xox[cp]-[\w-]+/);
              if (m) return m[0];
            }
          }
        } catch(e) {}
        return null;
      }).catch(() => null);
      const c2 = await page.cookies('https://slack.com', 'https://amazingmeds.slack.com', 'https://app.slack.com');
      const d2 = c2.find(c => c.name === 'd');
      if (d2) capturedCookie = d2.value;
    }
  } finally {
    await browser.close();
    fs.rmSync(PROFILE_DIR, { recursive: true, force: true });
  }

  if (!capturedToken) { console.error('Failed to capture token'); process.exit(1); }

  const headers = { Authorization: 'Bearer ' + capturedToken };
  if (capturedCookie) headers.Cookie = 'd=' + capturedCookie;
  const check = await apiGet('https://slack.com/api/auth.test', headers);
  if (!check.ok) { console.error('Captured token invalid:', check.error); process.exit(1); }

  console.log('Token valid! Team:', check.team, '/', check.user);
  acct.token = capturedToken;
  if (capturedCookie) acct.cookie = capturedCookie;
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
  console.log('Config saved ✓');
})().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
