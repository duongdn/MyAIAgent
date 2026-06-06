#!/usr/bin/env node
/**
 * fetch-msteams-customer-messages.js
 * Log into MS Teams via Puppeteer and extract recent messages from a customer chat.
 *
 * Usage: node scripts/fetch-msteams-customer-messages.js [account] [customerName] [--clear-profile]
 * Credentials: config/.msteams-accounts.json
 * Profile:     tmp/msteams-{account}-profile/  (persists login session)
 */

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');
const path = require('path');

puppeteer.use(StealthPlugin());

const ACCOUNT_KEY    = process.argv[2] || 'will';
const CUSTOMER_NAME  = process.argv[3] || 'Philip';
const PROFILE_DIR    = path.resolve(__dirname, `../tmp/msteams-${ACCOUNT_KEY}-profile`);
const SCREENSHOT_DIR = path.resolve(__dirname, '../tmp');
const CONFIG_PATH    = path.resolve(__dirname, '../config/.msteams-accounts.json');
const CLEAR_PROFILE  = process.argv.includes('--clear-profile');
const TIMEOUT = 60000;

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
function isTeamsHost(url) {
  try { return ['teams.microsoft.com', 'teams.live.com'].includes(new URL(url).hostname); }
  catch { return false; }
}
function screenshot(page, name) {
  return page.screenshot({ path: path.join(SCREENSHOT_DIR, `msteams-${name}.png`) }).catch(() => {});
}

async function clickByText(page, pattern) {
  const handles = await page.$$('a, button, input[type="button"], input[type="submit"], div[role="button"], li[role="option"], span[tabindex]');
  const re = typeof pattern === 'string' ? new RegExp(pattern, 'i') : pattern;
  for (const el of handles) {
    const t = await el.evaluate(n => (n.innerText || n.value || n.textContent || '').trim());
    if (re.test(t)) { await el.click(); return t; }
  }
  return null;
}

async function isVisibleInViewport(el) {
  return el.evaluate(node => {
    const r = node.getBoundingClientRect(), s = window.getComputedStyle(node);
    return r.width > 0 && r.height > 0 &&
           r.top < window.innerHeight && r.bottom > 0 &&
           r.left < window.innerWidth && r.right > 0 &&
           s.display !== 'none' && s.visibility !== 'hidden' &&
           parseFloat(s.opacity || '1') > 0;
  });
}

async function doLogin(page, email, password) {
  console.log('[login] Starting Microsoft login flow...');

  // Disable WebAuthn so any FIDO page that loads can't block on credentials.get().
  await page.setRequestInterception(true);
  page.on('request', (req) => {
    req.continue();
  });

  await page.evaluateOnNewDocument(() => {
    try {
      Object.defineProperty(navigator, 'credentials', {
        get: () => ({
          get: () => Promise.reject(new DOMException('Not supported by this browser.', 'NotSupportedError')),
          create: () => Promise.reject(new DOMException('Not supported by this browser.', 'NotSupportedError')),
          store: () => Promise.reject(new DOMException('Not supported by this browser.', 'NotSupportedError')),
        }),
        configurable: true,
      });
    } catch (e) { /* ignore if already defined */ }
  });

  // Navigate to Teams — will redirect to Microsoft OAuth if no session
  await page.goto('https://teams.microsoft.com', { waitUntil: 'domcontentloaded', timeout: TIMEOUT });
  await sleep(10000); // Teams app needs time to load and redirect to auth
  await screenshot(page, '01-teams-start');
  console.log('[login] URL:', page.url().slice(0, 120));

  // Check if Teams UI already loaded (cached session)
  const alreadyLoaded = await page.evaluate(() => !!(
    document.querySelector('[data-tid="app-bar"]') || document.querySelector('[data-tid="chat-list"]')
  ));
  if (alreadyLoaded) { console.log('[login] Teams already loaded'); return true; }

  let fidoSeen = 0;
  let signInOptionsClicked = false;

  // Main auth loop
  for (let attempt = 0; attempt < 25; attempt++) {
    const url = page.url();
    const bodyText = await page.evaluate(() => document.body.innerText || '').catch(() => '');
    await screenshot(page, `loop-${attempt}`);
    console.log(`[login] Loop ${attempt} | ${url.slice(0, 80)} | ${bodyText.slice(0, 70).replace(/\n/g, ' ')}`);

    // Teams UI loaded — done (works for both teams.microsoft.com and teams.live.com)
    const isTeamsUrl = isTeamsHost(url);
    const teamsUi = isTeamsUrl && await page.evaluate(() => !!(
      document.querySelector('[data-tid="app-bar"]') ||
      document.querySelector('[data-tid="chat-list"]') ||
      document.querySelector('[class*="ts-app-bar"]') ||
      document.querySelector('#teams-app-bar') ||
      document.querySelector('[data-tid="chat-pane-list"]') ||
      document.querySelector('[class*="chatList"]')
    )).catch(() => false);
    // Fallback: if on Teams URL with substantial content (chat list visible), consider loaded
    const teamsBodyReady = isTeamsUrl && bodyText.length > 200 && !/sign in|stay signed in/i.test(bodyText.slice(0, 50));
    if (teamsUi || teamsBodyReady) { console.log('[login] Teams UI confirmed (teamsUi=' + teamsUi + ', bodyReady=' + teamsBodyReady + ')'); break; }

    // Rate-limited — wait 45s then restart from Teams
    if (/try again later|we can't sign you in right now/i.test(bodyText)) {
      console.log('[login] Rate-limited — waiting 45s...');
      await sleep(45000);
      fidoSeen = 0;
      signInOptionsClicked = false;
      await page.goto('https://teams.microsoft.com', { waitUntil: 'domcontentloaded', timeout: TIMEOUT });
      await sleep(5000);
      continue;
    }

    // "Use your password" / "Sign in another way" — pick password
    if (/use your password|sign in another way|other ways to sign in/i.test(bodyText)) {
      console.log('[login] Password option visible — clicking');
      const c = await clickByText(page, /use your password/i) ||
                await clickByText(page, /password/i);
      if (c) { fidoSeen = 0; await sleep(3000); continue; }
    }

    // "Use a password instead" link
    if (/use a password instead/i.test(bodyText)) {
      console.log('[login] "Use a password instead" — clicking');
      const c = await clickByText(page, /use a password instead/i);
      if (c) { await sleep(3000); continue; }
    }

    // Sign-in options selection page (contains FIDO as a menu item to choose, NOT a challenge)
    // Look for a "Use your password" option on this page
    if (/sign.?in options/i.test(bodyText) && /face, fingerprint|security key/i.test(bodyText)) {
      console.log('[login] Sign-in options selection page — looking for password option');
      const c = await clickByText(page, /use your password/i) ||
                await clickByText(page, /^password$/i);
      if (c) { console.log('[login] Clicked password option'); fidoSeen = 0; await sleep(3000); continue; }
      // No password option — enter email and click Next to proceed
      console.log('[login] No password option on sign-in options page — going back to email');
      const backClicked = await clickByText(page, /^back$/i);
      signInOptionsClicked = true; // Don't click sign-in options again
      await sleep(3000);
      continue;
    }

    // FIDO challenge page (actual biometric/key prompt, not a menu) — look for password fallback
    if (url.includes('/fido/') || url.includes('fido?') ||
        /face, fingerprint, pin or security key|windows hello|passkey/i.test(bodyText)) {
      fidoSeen++;
      // First try to find password/other-way option before clicking Back
      const pwOpt = await clickByText(page, /use your password/i) ||
                    await clickByText(page, /sign in another way/i) ||
                    await clickByText(page, /other ways to sign in/i);
      if (pwOpt) { console.log('[login] Found password alt on FIDO page'); fidoSeen = 0; await sleep(3000); continue; }

      if (fidoSeen > 4) {
        console.log('[login] Too many FIDO pages — waiting 45s to clear rate-limit');
        await sleep(45000);
        fidoSeen = 0;
        signInOptionsClicked = false;
        await page.goto('https://teams.microsoft.com', { waitUntil: 'domcontentloaded', timeout: TIMEOUT });
        await sleep(5000);
        continue;
      }
      console.log(`[login] FIDO challenge #${fidoSeen} — clicking Back`);
      await sleep(2000);
      const backClicked = await clickByText(page, /^back$/i);
      console.log('[login] Back clicked:', !!backClicked);
      await sleep(4000);
      continue;
    }

    // Email entry page — enter email and click Next (skip Sign-in options, go directly to password)
    const hasEmailField = await page.$('#i0116, input[name="loginfmt"]').then(el =>
      el ? isVisibleInViewport(el) : false
    ).catch(() => false);

    if (hasEmailField) {
      const emailField = await page.$('#i0116, input[name="loginfmt"]');
      const currentVal = await emailField.evaluate(el => el.value || '');
      if (!currentVal.includes('@')) {
        console.log('[login] Email field — entering email');
        await emailField.click({ clickCount: 3 });
        await emailField.type(email, { delay: 60 });
        await sleep(300);
      } else {
        console.log('[login] Email field — already filled');
      }
      const nb = await page.$('#idSIButton9, input[type="submit"][value="Next"], button[type="submit"]');
      if (nb) await nb.click(); else await page.keyboard.press('Enter');
      await sleep(5000);
      continue;
    }

    // Password field visible — only if body indicates we're on password step (not email step)
    const onPasswordStep = /^enter password|^password/i.test(bodyText.trim().slice(0, 30)) ||
                           (url.includes('ppsecure') || /enter the password/i.test(bodyText));
    if (onPasswordStep || (!hasEmailField && !/no account|sign-in options|create one/i.test(bodyText))) {
      const passField = await page.$('input[type="password"], input[name="passwd"], #i0118');
      if (passField) {
        const pVis = await isVisibleInViewport(passField);
        if (pVis) {
          console.log('[login] Password field — entering password');
          await passField.click({ clickCount: 3 });
          await passField.type(password, { delay: 60 });
          await sleep(300);
          const sb = await page.$('#idSIButton9, input[type="submit"], button[type="submit"]');
          if (sb) await sb.click(); else await page.keyboard.press('Enter');
          await sleep(6000);
          continue;
        }
      }
    }

    // "Stay signed in?" prompt
    if (/stay signed in|keep me signed in/i.test(bodyText)) {
      console.log('[login] "Stay signed in" — clicking Yes');
      await clickByText(page, /^yes$/i);
      await sleep(3000);
      continue;
    }

    // On Teams URL but UI not loaded yet — wait
    if (isTeamsHost(url)) {
      await sleep(5000);
      continue;
    }

    // On auth pages — wait
    if (url.includes('login.') || url.includes('microsoftonline') || url.includes('live.com')) {
      await sleep(4000);
      continue;
    }

    await sleep(2000);
  }

  // Final navigation to Teams if not there yet
  const currentUrl = page.url();
  if (!isTeamsHost(currentUrl)) {
    console.log('[login] Final navigate to Teams...');
    await page.goto('https://teams.microsoft.com', { waitUntil: 'domcontentloaded', timeout: TIMEOUT });
    await sleep(10000);
  }

  // Wait up to 30s for Teams UI to appear after final navigation
  for (let i = 0; i < 6; i++) {
    const url = page.url();
    const body = await page.evaluate(() => document.body.innerText || '').catch(() => '');
    await screenshot(page, `post-${i}`);
    console.log(`[login] Post-nav ${i} | ${url.slice(0, 80)}`);

    const isTeamsUrl2 = isTeamsHost(url);
    const hasUi = isTeamsUrl2 && (await page.evaluate(() => !!(
      document.querySelector('[data-tid="app-bar"]') || document.querySelector('[data-tid="chat-list"]') ||
      document.querySelector('[class*="chatList"]')
    )).catch(() => false));
    const bodyReady2 = isTeamsUrl2 && body.length > 200 && !/sign in|stay signed in/i.test(body.slice(0, 50));
    if (hasUi || bodyReady2) { console.log('[login] Post-nav Teams ready'); break; }

    if (url.includes('fido')) {
      await sleep(3000);
      await clickByText(page, /^back$/i);
      await sleep(3000);
      continue;
    }

    const pf = await page.$('input[type="password"], #i0118').catch(() => null);
    if (pf && !/no account|sign-in options/i.test(body)) {
      const pVis = await isVisibleInViewport(pf).catch(() => false);
      if (pVis) {
        await pf.click({ clickCount: 3 });
        await pf.type(password, { delay: 60 });
        const sb = await page.$('#idSIButton9, input[type="submit"], button[type="submit"]');
        if (sb) await sb.click(); else await page.keyboard.press('Enter');
        await sleep(6000);
        continue;
      }
    }

    if (/stay signed in/i.test(body)) {
      await clickByText(page, /^yes$/i);
      await sleep(3000);
      continue;
    }

    await sleep(4000);
  }

  await screenshot(page, '05-post-login');
  const finalUrl = page.url();
  console.log('[login] Final URL:', finalUrl.slice(0, 120));

  if (!isTeamsHost(finalUrl)) {
    await screenshot(page, '05b-load-failed');
    throw new Error('Teams did not load after login. Check screenshot msteams-05b-load-failed.png');
  }

  return true;
}

async function searchAndExtractMessages(page, customerName) {
  console.log(`[search] Looking for customer: ${customerName}`);

  console.log('[search] Waiting for Teams UI...');
  try {
    await page.waitForSelector(
      '[data-tid="app-bar"], [aria-label="Teams"], [class*="ts-app-bar"], [class*="chatList"], [data-tid="chat-list"]',
      { timeout: 30000 }
    );
    console.log('[search] Teams UI loaded');
  } catch (e) {
    console.log('[search] Teams UI not detected in 30s, continuing anyway');
    await screenshot(page, '06-teams-load-timeout');
  }

  await sleep(3000);
  await screenshot(page, '06-teams-home');

  // Open search bar
  const searchSelectors = [
    '[data-tid="app-bar-search"]', '[aria-label="Search"]',
    'button[id*="search"]', '[data-tid="top-search-bar"]',
    'input[placeholder*="Search"]', '[role="search"] input',
  ];

  let searchOpened = false;
  for (const sel of searchSelectors) {
    try {
      const el = await page.$(sel);
      if (el) { await el.click(); await sleep(1000); searchOpened = true; console.log(`[search] Opened search: ${sel}`); break; }
    } catch (e) { /* continue */ }
  }
  if (!searchOpened) {
    console.log('[search] Trying Ctrl+E');
    await page.keyboard.down('Control');
    await page.keyboard.press('e');
    await page.keyboard.up('Control');
    await sleep(1000);
  }

  await screenshot(page, '07-search-open');

  // Type customer name
  const inputSelectors = [
    'input[data-tid="search-box"]', 'input[placeholder*="Search"]',
    'input[aria-label*="Search"]', '[data-tid="top-search-bar"] input', '[role="combobox"]',
  ];
  let typed = false;
  for (const sel of inputSelectors) {
    try {
      const el = await page.$(sel);
      if (el) { await el.click({ clickCount: 3 }); await el.type(customerName, { delay: 80 }); typed = true; console.log(`[search] Typed via: ${sel}`); break; }
    } catch (e) { /* continue */ }
  }
  if (!typed) { await page.keyboard.type(customerName, { delay: 80 }); }

  await sleep(3000);
  await screenshot(page, '08-search-results');

  const rawText = await page.evaluate(() => {
    const nodes = document.querySelectorAll(
      '[role="listitem"], [data-tid*="chat"], [data-tid*="message"], ' +
      '[class*="message"], [class*="chat-item"], [class*="chat-list-item"], ' +
      '[class*="searchResult"], [class*="search-result"]'
    );
    return Array.from(nodes).map(n => n.innerText?.trim()).filter(Boolean);
  });
  console.log(`[search] Found ${rawText.length} items`);

  // Click matching result
  let clicked = false;
  for (const sel of [`[title*="${customerName}"]`, `[aria-label*="${customerName}"]`, `[data-tid*="${customerName.toLowerCase()}"]`]) {
    try {
      const el = await page.$(sel);
      if (el) { await el.click(); clicked = true; console.log(`[search] Clicked: ${sel}`); break; }
    } catch (e) { /* continue */ }
  }
  if (!clicked) {
    try { await page.keyboard.press('ArrowDown'); await sleep(500); await page.keyboard.press('Enter'); clicked = true; } catch (e) {}
  }

  await sleep(3000);
  await screenshot(page, '09-chat-open');

  const messages = await page.evaluate(() => {
    const results = [];
    const msgSelectors = [
      '[data-tid="message-body"]', '[class*="messageContent"]', '[class*="message-body"]',
      '[role="listitem"] [class*="body"]', '[data-tid*="message"]',
      'div[class*="bubble"]', '[class*="chatMessage"]',
    ];
    for (const sel of msgSelectors) {
      const els = document.querySelectorAll(sel);
      if (els.length > 0) {
        els.forEach(el => {
          const text = el.innerText?.trim();
          if (text && text.length > 3) {
            const p = el.closest('[data-tid*="chat"], [class*="message"], [role="listitem"]') || el.parentElement?.parentElement;
            const sender = p?.querySelector('[class*="author"], [class*="sender"], [data-tid*="author"]')?.innerText?.trim() || '';
            const time = p?.querySelector('[class*="timestamp"], [class*="time"], time')?.innerText?.trim() || '';
            results.push({ sender, time, text: text.slice(0, 500) });
          }
        });
        if (results.length > 0) break;
      }
    }
    if (results.length === 0) {
      const main = document.querySelector('[role="main"], #app-main, [class*="chatView"]');
      if (main) results.push({ sender: '(raw)', time: '', text: main.innerText?.slice(0, 2000) });
    }
    return results;
  });

  return { rawText, messages, clicked };
}

(async () => {
  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
  const account = config.accounts[ACCOUNT_KEY];
  if (!account) throw new Error(`No "${ACCOUNT_KEY}" account in config/.msteams-accounts.json`);

  const { email, password } = account;

  if (CLEAR_PROFILE && fs.existsSync(PROFILE_DIR)) {
    fs.rmSync(PROFILE_DIR, { recursive: true });
    console.log('[start] Profile cleared');
  }
  fs.mkdirSync(PROFILE_DIR, { recursive: true });

  console.log(`[start] Launching browser for ${email}`);
  console.log(`[start] Looking for customer: ${CUSTOMER_NAME}`);

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: process.platform === 'darwin'
      ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
      : '/usr/bin/google-chrome',
    userDataDir: PROFILE_DIR,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-blink-features=AutomationControlled',
      '--window-size=1440,900',
    ],
    defaultViewport: { width: 1440, height: 900 },
  });

  const page = await browser.newPage();
  page.setDefaultTimeout(TIMEOUT);

  try {
    await doLogin(page, email, password);
    const result = await searchAndExtractMessages(page, CUSTOMER_NAME);

    console.log('\n=== RESULTS ===');
    console.log(`Customer: ${CUSTOMER_NAME}`);
    console.log(`Chat clicked: ${result.clicked}`);
    console.log(`Messages found: ${result.messages.length}`);

    if (result.messages.length > 0) {
      console.log('\n--- Messages ---');
      result.messages.slice(0, 20).forEach((m, i) => {
        console.log(`[${i + 1}] ${m.sender ? m.sender + ' | ' : ''}${m.time ? m.time + ' | ' : ''}${m.text}`);
      });
    } else {
      console.log('\n--- Raw search result items ---');
      result.rawText.slice(0, 30).forEach((t, i) => console.log(`[${i + 1}] ${t}`));
    }

    console.log('\n[done] Screenshots saved to tmp/msteams-*.png');
  } catch (err) {
    console.error('[ERROR]', err.message);
    await screenshot(page, 'error');
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
