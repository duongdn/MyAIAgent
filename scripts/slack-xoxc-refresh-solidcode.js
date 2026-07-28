#!/usr/bin/env node
/**
 * Refresh xoxc token for Solid Code Team Slack workspace.
 *
 * Chrome Profile 15 (David's Google account: davidztv19@gmail.com).
 * This workspace uses Google OAuth — Profile 15's cookies handle the session.
 * Launching with the real profile avoids the DBSC/cookie-copy failures that
 * plague the OhCleo extraction pattern.
 *
 * Usage:
 *   DISPLAY=:0 node scripts/slack-xoxc-refresh-solidcode.js
 *
 * If Chrome is running: copies profile to tmp. May fail Google OAuth re-check.
 * If Chrome is NOT running: launches Profile 15 directly — most reliable.
 */
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');
const path = require('path');
const os = require('os');
const https = require('https');
const { execSync } = require('child_process');
const { saveSecretConfig } = require('./lib/save-secret-config');

puppeteer.use(StealthPlugin());

const CONFIG_PATH = path.join(__dirname, '..', 'config', '.slack-accounts.json');
const WORKSPACE = 'solid-code-team.slack.com';
const ACCOUNT_NAME = 'Solid Code';
const EMAIL = 'davidztv19@gmail.com';
const CHROME_USER_DATA = path.join(os.homedir(), '.config/google-chrome');
const PROFILE_NAME = 'Profile 15';
const TIMEOUT = 90000;
const sleep = ms => new Promise(r => setTimeout(r, ms));

function isChromeRunning() {
  try {
    const result = execSync('pgrep -x chrome 2>/dev/null', { encoding: 'utf8' });
    return result.trim().length > 0;
  } catch { return false; }
}

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
  let acct = config.accounts.find(a => a.workspace === 'Solid Code');

  if (!acct) {
    console.log('Solid Code account not in config — creating entry');
    acct = { workspace: 'Solid Code', email: EMAIL, token: '', cookie: '' };
    config.accounts.push(acct);
  }

  // Check if current token is still valid
  if (acct.token) {
    const headers = { Authorization: 'Bearer ' + acct.token };
    if (acct.cookie) headers.Cookie = 'd=' + acct.cookie;
    const check = await apiGet('https://slack.com/api/auth.test', headers);
    if (check.ok) {
      console.log('Token already valid:', check.team, '/', check.user);
      process.exit(0);
    }
    console.log('Token invalid:', check.error, '— refreshing');
  }

  const chromeRunning = isChromeRunning();
  let useUserDataDir = CHROME_USER_DATA;
  let profileArg = `--profile-directory=${PROFILE_NAME}`;

  if (chromeRunning) {
    console.log('⚠️  Chrome IS running. Copying profile to tmp to avoid lock conflict.');
    console.log('   If Google blocks the OAuth mid-session, close Chrome and re-run.');
    const tmpDir = path.join(__dirname, '..', 'tmp', 'slack-profiles', 'solidcode');
    execSync(`rm -rf "${tmpDir}" 2>/dev/null; mkdir -p "${tmpDir}"`);
    try {
      execSync(`cp -a "${CHROME_USER_DATA}/${PROFILE_NAME}" "${tmpDir}/${PROFILE_NAME}" 2>/dev/null`, { timeout: 15000 });
      // Also copy Local State (needed for profile discovery)
      execSync(`cp "${CHROME_USER_DATA}/Local State" "${tmpDir}/" 2>/dev/null`);
    } catch (e) {
      console.log('   Profile copy partial — proceeding anyway (some files may be locked)');
    }
    useUserDataDir = tmpDir;
  } else {
    console.log('Chrome NOT running — launching Profile 15 directly ✅');
  }

  const SOCKS_DIR = path.join(__dirname, '..', 'tmp', 'chrome-socks');
  fs.mkdirSync(SOCKS_DIR, { recursive: true });

  let capturedToken = null, capturedCookie = null;

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: '/usr/bin/google-chrome',
    userDataDir: useUserDataDir,
    env: { ...process.env, TMPDIR: SOCKS_DIR },
    args: [
      '--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage',
      '--window-size=1280,900', profileArg,
    ],
    defaultViewport: { width: 1280, height: 900 },
  });

  try {
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36');

    // Intercept xoxc from Authorization header on API requests
    page.on('response', async response => {
      if (capturedToken) return;
      if (!response.url().includes('slack.com/api/')) return;
      try {
        const auth = response.request().headers()['authorization'] || '';
        const m = auth.match(/(xox[cp]-[\w-]+)/);
        if (m) { capturedToken = m[1]; console.log('  Token intercepted from:', response.url().split('/').pop()); }
      } catch(e) {}
    });

    console.log('Navigating to workspace...');
    await page.goto(`https://${WORKSPACE}/`, { waitUntil: 'domcontentloaded', timeout: TIMEOUT }).catch(() => {});
    await sleep(5000);
    console.log('Page URL:', page.url().slice(0, 100));

    // Google OAuth may redirect — wait for it to complete
    if (page.url().includes('accounts.google.com')) {
      console.log('Google OAuth in progress — waiting...');
      await sleep(15000);
      console.log('Post-OAuth URL:', page.url().slice(0, 100));
    }

    await page.screenshot({ path: path.join(__dirname, '..', 'tmp', 'slack-solidcode-01.png') });

    // Extract d cookie
    const cookies = await page.cookies('https://slack.com', `https://${WORKSPACE}`, 'https://app.slack.com');
    const dCookie = cookies.find(c => c.name === 'd');
    if (dCookie) { capturedCookie = dCookie.value; console.log('  Cookie captured, len:', capturedCookie.length); }

    // Try localStorage extraction as fallback
    if (!capturedToken) {
      console.log('No token intercepted — trying localStorage...');
      capturedToken = await page.evaluate(() => {
        try {
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
    }

  } finally {
    await browser.close();
  }

  if (!capturedToken) {
    console.error('\n❌ Failed to capture token.');
    console.error('   Solid Code uses Google OAuth — you may need to:');
    console.error('   1. Close ALL Chrome windows');
    console.error('   2. Re-run this script (Profile 15 launches fresh, Google session intact)');
    console.error('   3. If that fails: open Chrome manually, login to solid-code-team.slack.com, then re-run');
    process.exit(1);
  }

  // Validate
  const headers = { Authorization: 'Bearer ' + capturedToken };
  if (capturedCookie) headers.Cookie = 'd=' + capturedCookie;
  const check = await apiGet('https://slack.com/api/auth.test', headers);
  if (!check.ok) {
    console.error('❌ Captured token invalid:', check.error);
    process.exit(1);
  }
  console.log('✅ Token valid! Team:', check.team, '| User:', check.user);

  // Save
  acct.token = capturedToken;
  if (capturedCookie) acct.cookie = capturedCookie;
  if (!acct.email) acct.email = EMAIL;
  saveSecretConfig(CONFIG_PATH, config);
  console.log('Config saved ✓ (Solid Code added to .slack-accounts.json)');

})().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
