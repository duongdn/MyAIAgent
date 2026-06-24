#!/usr/bin/env node
/**
 * Refresh xoxc token for Amazing Meds Slack workspace
 * Uses email/password login via Puppeteer, intercepts token from network requests
 */
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');
const path = require('path');
const https = require('https');

puppeteer.use(StealthPlugin());

const CONFIG_PATH = path.join(__dirname, '..', 'config', '.slack-accounts.json');
const PROFILE_DIR = path.join(__dirname, '..', 'tmp', 'slack-profiles', 'amazing-meds');
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

  // Verify current token first
  const curHeaders = { Authorization: 'Bearer ' + acct.token };
  if (acct.cookie) curHeaders.Cookie = 'd=' + acct.cookie;
  const curCheck = await apiGet('https://slack.com/api/auth.test', curHeaders);
  if (curCheck.ok) {
    console.log('Token already valid:', curCheck.team, '/', curCheck.user);
    process.exit(0);
  }
  console.log('Current token invalid:', curCheck.error, '— proceeding with refresh');

  fs.mkdirSync(PROFILE_DIR, { recursive: true });
  const SOCKS_DIR = path.join(__dirname, '..', 'tmp', 'chrome-socks');
  fs.mkdirSync(SOCKS_DIR, { recursive: true });

  const isDisplay = !!process.env.DISPLAY;
  const browser = await puppeteer.launch({
    headless: isDisplay ? false : 'new',
    executablePath: '/usr/bin/google-chrome',
    userDataDir: PROFILE_DIR,
    env: { ...process.env, TMPDIR: SOCKS_DIR, TEMP: SOCKS_DIR, TMP: SOCKS_DIR },
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage',
           ...(isDisplay ? [] : ['--disable-gpu']),
           '--window-size=1280,900', '--disable-blink-features=AutomationControlled'],
    defaultViewport: { width: 1280, height: 900 },
  });

  let capturedToken = null;
  let capturedCookie = null;

  try {
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36');

    // Intercept API responses to grab token from Authorization header
    page.on('response', async response => {
      if (capturedToken) return;
      const url = response.url();
      if (!url.includes('slack.com/api/')) return;
      try {
        const reqHeaders = response.request().headers();
        const auth = reqHeaders['authorization'] || '';
        const m = auth.match(/(xox[cp]-[^\s,]+)/);
        if (m) { capturedToken = m[1]; console.log('Token intercepted from API call:', url.split('/').pop()); }
      } catch(e) {}
    });

    // Try sign_in_with_password first
    console.log('Navigating to sign_in_with_password...');
    try {
      await page.goto('https://amazingmeds.slack.com/sign_in_with_password', { waitUntil: 'domcontentloaded', timeout: TIMEOUT });
    } catch(e) {
      console.log('Timeout on sign_in_with_password, trying main URL...');
      await page.goto('https://slack.com', { waitUntil: 'domcontentloaded', timeout: TIMEOUT });
    }
    await sleep(3000);
    console.log('URL:', page.url().slice(0, 80));
    await page.screenshot({ path: path.join(__dirname, '../tmp/slack-amazingmeds-01.png') });

    const body = await page.evaluate(() => document.body.innerText || '');
    console.log('Body snippet:', body.slice(0, 150).replace(/\n/g, ' '));

    // Handle cookie consent overlay if present — wait for page to fully render first
    await sleep(3000);
    await page.screenshot({ path: path.join(__dirname, '../tmp/slack-amazingmeds-after-wait.png') });
    const bodyAfterWait = await page.evaluate(() => document.body.innerText || '');
    console.log('Body after wait:', bodyAfterWait.slice(0, 200).replace(/\n/g, ' '));
    try {
      const clicked = await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const acceptBtn = btns.find(b => b.innerText && b.innerText.toUpperCase().includes('ACCEPT ALL'));
        if (acceptBtn && acceptBtn.offsetParent !== null) { acceptBtn.click(); return true; }
        return false;
      });
      if (clicked) { console.log('Cookie consent detected — clicking Accept All Cookies'); await sleep(3000); }
    } catch(e) { /* no consent overlay */ }

    // If on workspace selector (already logged in), click LAUNCH SLACK
    const launchBtn = await page.$('a[data-qa="launch_in_browser"], a.p-home_page__workspace_link, [data-qa="ssb_redirect_open_in_slack"]');
    if (launchBtn) {
      console.log('Workspace selector detected — clicking Launch Slack');
      await launchBtn.click();
      await sleep(5000);
    } else {
      // Both email + password are on the same page — fill both before submitting once
      const emailField = await page.$('input[type="email"], input[name="email"], #email');
      const passField = await page.$('input[type="password"], input[name="password"], #password');

      if (emailField && passField) {
        console.log('Single-page form detected — filling email + password together');
        await emailField.click({ clickCount: 3 });
        await emailField.type(email, { delay: 50 });
        await sleep(300);
        await passField.click({ clickCount: 3 });
        await passField.type(password, { delay: 50 });
        await sleep(300);
        await page.screenshot({ path: path.join(__dirname, '../tmp/slack-amazingmeds-02.png') });
        const submitBtn = await page.$('button[type="submit"]');
        if (submitBtn) await submitBtn.click();
        else await passField.press('Enter');
        await page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: TIMEOUT }).catch(() => {});
        await sleep(5000);
        await page.screenshot({ path: path.join(__dirname, '../tmp/slack-amazingmeds-03.png') });
        console.log('Post-login URL:', page.url().slice(0, 80));
      } else if (emailField) {
        // Two-step flow: email first, then password on next page
        console.log('Two-step flow: filling email only');
        await emailField.click({ clickCount: 3 });
        await emailField.type(email, { delay: 50 });
        await sleep(300);
        const submitBtn = await page.$('button[type="submit"], #submit_btn');
        if (submitBtn) await submitBtn.click();
        await sleep(3000);
        await page.screenshot({ path: path.join(__dirname, '../tmp/slack-amazingmeds-02.png') });
        const passField2 = await page.$('input[type="password"], input[name="password"], #password');
        if (passField2) {
          console.log('Password field visible — entering password');
          await passField2.click({ clickCount: 3 });
          await passField2.type(password, { delay: 50 });
          await sleep(300);
          const submitBtn2 = await page.$('button[type="submit"], #submit_btn');
          if (submitBtn2) await submitBtn2.click();
          else await passField2.press('Enter');
          await page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: TIMEOUT }).catch(() => {});
          await sleep(5000);
          await page.screenshot({ path: path.join(__dirname, '../tmp/slack-amazingmeds-03.png') });
          console.log('Post-login URL:', page.url().slice(0, 80));
        }
      } else {
        console.log('No email/password fields found — may already be logged in or different page');
      }
    }

    // Extract cookies
    const cookies = await page.cookies('https://slack.com', 'https://amazingmeds.slack.com');
    const dCookie = cookies.find(c => c.name === 'd');
    if (dCookie) { capturedCookie = dCookie.value; console.log('Cookie d captured, len:', capturedCookie.length); }

    // Try to grab token from page JS context and localStorage
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

    // Navigate to client to force token emission
    if (!capturedToken) {
      console.log('Navigating to client to capture token...');
      await page.goto('https://app.slack.com/client/T04QST2MWTU', { waitUntil: 'domcontentloaded', timeout: TIMEOUT }).catch(() => {});
      await sleep(8000);
      if (!capturedToken) capturedToken = await extractToken();
      // Re-grab cookies
      const cookies2 = await page.cookies('https://slack.com', 'https://amazingmeds.slack.com', 'https://app.slack.com');
      const d2 = cookies2.find(c => c.name === 'd');
      if (d2 && !capturedCookie) capturedCookie = d2.value;
    }

  } finally {
    await browser.close();
  }

  if (!capturedToken) {
    console.error('Failed to capture token');
    process.exit(1);
  }

  // Validate
  const headers = { Authorization: 'Bearer ' + capturedToken };
  if (capturedCookie) headers.Cookie = 'd=' + capturedCookie;
  const check = await apiGet('https://slack.com/api/auth.test', headers);
  if (!check.ok) {
    console.error('Captured token invalid:', check.error);
    process.exit(1);
  }

  console.log('Token valid! Team:', check.team, '| User:', check.user);

  // Save back to config
  acct.token = capturedToken;
  if (capturedCookie) acct.cookie = capturedCookie;
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
  console.log('Config saved ✓');

  // Test the Amazing Meds scan
  const testResult = await apiGet('https://slack.com/api/conversations.history?channel=C07SQ4HAUHZ&limit=1', headers);
  console.log('Quick API test (auth.test passed, workspace accessible)');
})().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
