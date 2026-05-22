#!/usr/bin/env node
// Refresh expired Slack xoxc session tokens via email/password login
// Usage: node scripts/slack-session-refresh.js --workspace=amazingmeds
//        node scripts/slack-session-refresh.js --workspace=equanimity
//        node scripts/slack-session-refresh.js  (refreshes all expired xoxc accounts)

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const fs = require('fs');
const path = require('path');
const https = require('https');

const CONFIG_PATH = path.join(__dirname, '..', 'config', '.slack-accounts.json');
const PROFILE_BASE = path.join(__dirname, '..', 'tmp', 'slack-profiles');

const wsArg = process.argv.find(a => a.startsWith('--workspace='));
const targetWs = wsArg ? wsArg.split('=')[1].toLowerCase() : null;

function apiGet(url, headers) {
  return new Promise(resolve => {
    https.get(url, { headers }, res => {
      let d = ''; res.on('data', c => d += c);
      res.on('end', () => { try { resolve(JSON.parse(d)); } catch(e) { resolve({}); } });
    }).on('error', () => resolve({}));
  });
}

async function isTokenValid(token, cookie) {
  const headers = { 'Authorization': 'Bearer ' + token };
  if (cookie) headers['Cookie'] = 'd=' + cookie;
  const r = await apiGet('https://slack.com/api/auth.test', headers);
  return r.ok === true;
}

async function refreshAccount(acct) {
  if (!acct.login || !acct.login.email || !acct.login.password) {
    console.error(`[${acct.workspace}] No login credentials — cannot refresh`);
    return false;
  }

  const profileDir = path.join(PROFILE_BASE, acct.workspace.replace(/\s+/g, '-').toLowerCase());
  fs.mkdirSync(profileDir, { recursive: true });

  console.error(`[${acct.workspace}] Launching browser login...`);

  const browser = await puppeteer.launch({
    headless: 'new',
    userDataDir: profileDir,
    args: [
      '--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage',
      '--disable-blink-features=AutomationControlled', '--window-size=1280,900',
    ],
  });

  let capturedToken = null;
  let capturedCookie = null;

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 900 });
    await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36');
    await page.setExtraHTTPHeaders({ 'Accept-Language': 'en-US,en;q=0.9' });

    // Intercept responses to capture the xoxc token from API calls
    page.on('response', async response => {
      const url = response.url();
      if (!capturedToken && (url.includes('/api/') || url.includes('slack.com/api'))) {
        try {
          const reqHeaders = response.request().headers();
          const auth = reqHeaders['authorization'] || '';
          const tokenMatch = auth.match(/(xox[csp]-[^\s]+)/);
          if (tokenMatch) capturedToken = tokenMatch[1];
        } catch(e) {}
      }
    });

    // Navigate to workspace sign-in
    const workspaceUrl = acct.url.replace(/\/$/, '') + '/sign_in_with_password';
    console.error(`[${acct.workspace}] Navigating to ${workspaceUrl}`);
    await page.goto(workspaceUrl, { waitUntil: 'networkidle2', timeout: 30000 });

    // Fill email
    const emailSel = 'input[type="email"], input[name="email"], #email';
    await page.waitForSelector(emailSel, { timeout: 10000 }).catch(() => {});
    await page.type(emailSel, acct.login.email, { delay: 50 });

    // Click continue/next if needed
    const continueSel = 'button[type="submit"], #submit_btn, .c-button--primary';
    await page.click(continueSel).catch(() => {});
    await new Promise(r => setTimeout(r, 1500));

    // Fill password
    const passSel = 'input[type="password"], input[name="password"], #password';
    await page.waitForSelector(passSel, { timeout: 8000 }).catch(() => {});
    await page.type(passSel, acct.login.password, { delay: 50 });
    await page.click(continueSel).catch(() => {});

    // Wait for redirect/login completion
    await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 20000 }).catch(() => {});
    await new Promise(r => setTimeout(r, 3000));

    // Try to grab token from page JS context
    if (!capturedToken) {
      capturedToken = await page.evaluate(() => {
        try {
          const boot = window.boot_data || {};
          return boot.token || boot.api_token || null;
        } catch(e) { return null; }
      }).catch(() => null);
    }

    // Extract cookie from browser
    const cookies = await page.cookies('https://slack.com');
    const dCookie = cookies.find(c => c.name === 'd');
    if (dCookie) capturedCookie = dCookie.value;

    // If no token yet, try bootload intercept
    if (!capturedToken) {
      let bootToken = null;
      page.on('response', async r => {
        if (r.url().includes('bootload')) {
          const text = await r.text().catch(() => '');
          const m = text.match(/\"api_token\":\"([^\"]+)\"/);
          if (m) bootToken = m[1];
        }
      });
      await page.goto('https://app.slack.com/bootload', { waitUntil: 'networkidle2', timeout: 15000 }).catch(() => {});
      await new Promise(r => setTimeout(r, 2000));
      if (bootToken) capturedToken = bootToken;
    }

    // If still no token, try auth.test from page
    if (!capturedToken && capturedCookie) {
      const r = await apiGet('https://slack.com/api/auth.test', {
        'Cookie': 'd=' + capturedCookie,
      });
      if (r.ok && r.token) capturedToken = r.token;
    }

  } finally {
    await browser.close();
  }

  if (!capturedToken) {
    console.error(`[${acct.workspace}] Failed to capture token`);
    return false;
  }

  // Validate the captured token
  const valid = await isTokenValid(capturedToken, capturedCookie);
  if (!valid) {
    console.error(`[${acct.workspace}] Captured token is invalid`);
    return false;
  }

  acct.token = capturedToken;
  if (capturedCookie) acct.cookie = capturedCookie;
  console.error(`[${acct.workspace}] Token refreshed successfully ✓`);
  return true;
}

async function main() {
  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));

  const targets = config.accounts.filter(a => {
    if (targetWs) return a.workspace && a.workspace.toLowerCase().includes(targetWs);
    // Default: only xoxc accounts (session tokens)
    return a.auth_type === 'session' || (a.token && a.token.startsWith('xoxc'));
  });

  console.error(`Refreshing ${targets.length} account(s): ${targets.map(a => a.workspace).join(', ')}`);

  let anyRefreshed = false;
  for (const acct of targets) {
    // Check if already valid
    if (await isTokenValid(acct.token, acct.cookie)) {
      console.error(`[${acct.workspace}] Token still valid, skipping`);
      continue;
    }
    const ok = await refreshAccount(acct);
    if (ok) anyRefreshed = true;
  }

  if (anyRefreshed) {
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
    console.error('Config saved ✓');
  }

  // Output final token status
  targets.forEach(a => {
    const valid = a.token && !a.token.startsWith('xoxc-EXPIRED');
    console.log(JSON.stringify({ workspace: a.workspace, token: a.token?.slice(0, 15), cookie: !!a.cookie }));
  });
}

main().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
