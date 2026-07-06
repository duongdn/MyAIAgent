#!/usr/bin/env node
/**
 * Extract Solid Code Team Slack xoxc token — runs fully headless, no screen interaction.
 * Injects Chrome Profile 15 (David, davidztv19@gmail.com) Slack cookies AND Google account
 * session cookies, since David has never opened this workspace before and Slack requires a
 * "Sign in with Google" round-trip through accounts.google.com. Intercepts the xoxc token
 * from API requests made by the Slack web app after sign-in completes.
 *
 * __Host- prefixed Google cookies (e.g. __Host-1PLSID, __Host-GAPS) must NOT carry a Domain
 * attribute per spec, so they're injected via `url` instead of `domain`, or CDP rejects the
 * whole batch with "Invalid cookie fields".
 *
 * Prerequisites: run decrypt-secrets.sh first, and:
 *   .claude/skills/.venv/bin/python3 scripts/get-david-slack-cookies.py
 *   .claude/skills/.venv/bin/python3 scripts/get-david-google-cookies.py
 * Usage: node scripts/slack-extract-solid-code-team-token.js
 * Output: updates config/.slack-accounts.json with a "Solid Code Team" entry (then re-encrypt).
 */
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs   = require('fs');
const path = require('path');
const https = require('https');

puppeteer.use(StealthPlugin());

const WORKSPACE_HOST     = 'solid-code-team.slack.com';
const PROFILE_DIR        = path.join(__dirname, '..', 'tmp', 'slack-profiles', 'solid-code-team');
const CONFIG_PATH        = path.join(__dirname, '..', 'config', '.slack-accounts.json');
const SLACK_COOKIES_FILE  = '/tmp/david-slack-cookies.json';
const GOOGLE_COOKIES_FILE = '/tmp/david-google-cookies.json';
const sleep = ms => new Promise(r => setTimeout(r, ms));

function toPuppeteerCookie(c) {
  const base = { name: c.name, value: c.value, path: c.path, secure: c.secure, httpOnly: c.httpOnly, sameSite: 'None' };
  if (c.name.startsWith('__Host-')) {
    base.url = 'https://' + c.domain.replace(/^\./, '') + '/';
  } else {
    base.domain = c.domain;
  }
  return base;
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
  const slackCookies  = JSON.parse(fs.readFileSync(SLACK_COOKIES_FILE, 'utf8'));
  const googleCookies = JSON.parse(fs.readFileSync(GOOGLE_COOKIES_FILE, 'utf8'));
  const dCookie = slackCookies.find(c => c.name === 'd')?.value || '';
  if (!dCookie.startsWith('xoxd-')) {
    console.error('No valid d cookie found in Slack cookies'); process.exit(1);
  }
  const allCookies = [...slackCookies, ...googleCookies].map(toPuppeteerCookie);

  fs.rmSync(PROFILE_DIR, { recursive: true, force: true });
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
    await page.setCookie(...allCookies);

    await page.setRequestInterception(true);
    page.on('request', req => {
      const auth = req.headers()['authorization'] || '';
      if (req.url().includes(`${WORKSPACE_HOST}/api/`) && auth.startsWith('Bearer xoxc-') && !xoxcToken) {
        xoxcToken = auth.replace('Bearer ', '');
        console.log('Intercepted xoxc:', xoxcToken.slice(0, 35) + '...');
      }
      req.continue();
    });

    console.log(`Navigating to https://${WORKSPACE_HOST}/ ...`);
    await page.goto(`https://${WORKSPACE_HOST}/`, { waitUntil: 'networkidle2', timeout: 30000 })
      .catch(e => console.log('Nav note:', e.message.slice(0, 60)));
    await sleep(2000);

    // If a fresh sign-in wall shows up, drive "Sign in with Google" using David's Google session
    const buttons = await page.$$('button, a');
    for (const b of buttons) {
      const txt = await page.evaluate(el => el.innerText, b);
      if (txt && txt.trim().toLowerCase() === 'google') {
        console.log('Sign-in wall detected — clicking "Sign in with Google"...');
        await Promise.all([
          page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 20000 }).catch(() => {}),
          b.click(),
        ]);
        break;
      }
    }
    await sleep(2000);

    // Account chooser: click the David account entry if Google shows one
    await page.evaluate(() => {
      const els = Array.from(document.querySelectorAll('div, li, span'));
      const target = els.find(e => e.textContent && e.textContent.trim() === 'davidztv19@gmail.com');
      if (target) {
        let clickable = target;
        while (clickable && clickable.tagName !== 'LI' && clickable.tagName !== 'BUTTON' && clickable.parentElement) {
          clickable = clickable.parentElement;
        }
        (clickable || target).click();
      }
    }).catch(() => {});
    await sleep(3000);

    // Wait up to 20s total for API calls to surface the token
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
    console.log('Final title:', await page.title());
    if (!xoxcToken) {
      const bodyText = await page.evaluate(() => document.body.innerText.slice(0, 500)).catch(() => '');
      console.log('BODY:', bodyText);
      await page.screenshot({ path: '/tmp/solid-code-team-final.png', fullPage: true }).catch(() => {});
    }

  } finally {
    await browser.close();
  }

  if (!xoxcToken) {
    console.error('\n❌ Could not extract xoxc token. See /tmp/solid-code-team-final.png');
    process.exit(1);
  }

  const check = await apiTest(xoxcToken, dCookie);
  if (!check.ok) {
    console.error('Token verification failed:', check.error);
    process.exit(1);
  }
  console.log(`\n✅ Token verified: workspace=${check.team}, user=${check.user}`);

  const config   = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
  const accounts = config.accounts;
  const idx      = accounts.findIndex(a => (a.workspace || '').toLowerCase().includes('solid code team'));
  const entry    = {
    workspace: 'Solid Code Team',
    url:       `https://${WORKSPACE_HOST}/`,
    token:     xoxcToken,
    cookie:    dCookie,
    auth_type: 'session',
    login:     { note: 'David Profile 15 (davidztv19@gmail.com) — refresh via: node scripts/slack-extract-solid-code-team-token.js (needs get-david-slack-cookies.py + get-david-google-cookies.py re-run first)' },
  };

  if (idx >= 0) { accounts[idx] = entry; console.log('Updated existing Solid Code Team entry'); }
  else          { accounts.push(entry);   console.log('Added new Solid Code Team entry'); }

  fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
  console.log('Saved. Re-encrypt: bash scripts/encrypt-secrets.sh');
})();
