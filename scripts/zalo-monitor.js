#!/usr/bin/env node
/**
 * Monitor Zalo personal messages (DuongDN).
 * Restores session from config/.zalo-session/ (created by zalo-setup.js).
 *
 * Usage:
 *   node scripts/zalo-monitor.js [--since=ISO8601]
 *
 * First run: node scripts/zalo-setup.js  (scan QR once to save session)
 * Output: JSON to stdout
 */

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const path = require('path');
const fs = require('fs');

puppeteer.use(StealthPlugin());

const ROOT = path.resolve(__dirname, '..');
const TIMELINES_PATH = path.join(ROOT, 'config', '.monitoring-timelines.json');
const SESSION_DIR = path.join(ROOT, 'config', '.zalo-session');

function getSince() {
  const sinceArg = process.argv.find(a => a.startsWith('--since='));
  if (sinceArg) return new Date(sinceArg.split('=')[1]).getTime();
  const timelines = JSON.parse(fs.readFileSync(TIMELINES_PATH, 'utf8'));
  return new Date(timelines.daily_report?.last_run || Date.now() - 86400000).getTime();
}

function loadSession() {
  const cookiePath = path.join(SESSION_DIR, 'cookies.json');
  const lsPath = path.join(SESSION_DIR, 'localstorage.json');
  if (!fs.existsSync(cookiePath)) {
    throw new Error(`No Zalo session found. Run first: DISPLAY=:1 node scripts/zalo-setup.js`);
  }
  return {
    cookies: JSON.parse(fs.readFileSync(cookiePath, 'utf8')),
    localStorage: JSON.parse(fs.readFileSync(lsPath, 'utf8') || '{}'),
  };
}

async function main() {
  const since = getSince();
  process.stderr.write(`[zalo] Window from ${new Date(since).toISOString()}\n`);

  const session = loadSession();
  process.stderr.write(`[zalo] Loaded session (${session.cookies.length} cookies)\n`);

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
  });

  const captured = [];

  try {
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36');
    await page.setCookie(...session.cookies);

    // Restore localStorage before navigation
    await page.evaluateOnNewDocument((ls) => {
      try { Object.entries(JSON.parse(ls)).forEach(([k, v]) => localStorage.setItem(k, v)); }
      catch {}
    }, JSON.stringify(session.localStorage));

    // Intercept Zalo API JSON responses
    page.on('response', async (res) => {
      const url = res.url();
      const ct = res.headers()['content-type'] || '';
      if (!ct.includes('json')) return;
      if (!url.includes('zalo.me') && !url.includes('zadn.vn')) return;
      try {
        const body = await res.json();
        if (body?.data && (body.data.msgs || body.data.convs || body.data.conversations ||
            body.data.threads || body.data.msgList || body.data.threadList)) {
          captured.push({ url, data: body.data });
        }
      } catch {}
    });

    await page.goto('https://chat.zalo.me', { waitUntil: 'networkidle2', timeout: 30000 });

    // Check if we ended up on login page (session expired)
    const currentUrl = page.url();
    if (currentUrl.includes('id.zalo.me')) {
      await browser.close();
      throw new Error('Zalo session expired. Re-run: DISPLAY=:1 node scripts/zalo-setup.js');
    }

    await new Promise(r => setTimeout(r, 5000)); // let React render

    // Update saved cookies (refresh session)
    const freshCookies = await page.cookies();
    fs.writeFileSync(path.join(SESSION_DIR, 'cookies.json'), JSON.stringify(freshCookies, null, 2));

    // Extract conversation list from DOM (try multiple selectors)
    const domConversations = await page.evaluate(() => {
      const selectors = ['[data-key]', '[class*="conv-item"]', '[class*="ConversationItem"]',
                         '[class*="conversation-item"]', '.conv-item'];
      for (const sel of selectors) {
        const items = document.querySelectorAll(sel);
        if (items.length > 0) {
          return Array.from(items).slice(0, 30).map(el => ({
            id: el.dataset.key || el.dataset.id || '',
            name: (el.querySelector('[class*="name"],[class*="Name"],strong')?.innerText || '').trim(),
            preview: (el.querySelector('[class*="preview"],[class*="Preview"],[class*="message"],p')?.innerText || '').trim(),
            unread: (el.querySelector('[class*="unread"],[class*="badge"],[class*="count"]')?.innerText || '0').trim(),
          })).filter(c => c.name);
        }
      }
      return [];
    });

    await browser.close();

    console.log(JSON.stringify({
      since: new Date(since).toISOString(),
      scanned_at: new Date().toISOString(),
      conversations: domConversations,
      api_captures: captured.length,
      api_data: captured.slice(0, 3),
    }, null, 2));

  } catch (e) {
    await browser.close().catch(() => {});
    throw e;
  }
}

main().catch(e => {
  process.stderr.write('[zalo] Error: ' + e.message + '\n');
  process.exit(1);
});
