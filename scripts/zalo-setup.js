#!/usr/bin/env node
/**
 * Zalo first-time QR setup — opens chat.zalo.me, shows QR, waits for scan,
 * then saves session state (cookies + localStorage) to config/.zalo-session/.
 *
 * Usage:
 *   DISPLAY=:1 node scripts/zalo-setup.js
 *
 * After scanning: session saved → subsequent zalo-monitor.js runs auto-restore it.
 */

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const path = require('path');
const fs = require('fs');

puppeteer.use(StealthPlugin());

const ROOT = path.resolve(__dirname, '..');
const SESSION_DIR = path.join(ROOT, 'config', '.zalo-session');

async function main() {
  if (!fs.existsSync(SESSION_DIR)) fs.mkdirSync(SESSION_DIR, { recursive: true });

  console.error('[zalo-setup] Opening chat.zalo.me — scan QR with Zalo mobile app...');

  const browser = await puppeteer.launch({
    headless: false, // must be visible to show QR clearly
    executablePath: '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    defaultViewport: { width: 1280, height: 800 },
  });

  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36');

  await page.goto('https://chat.zalo.me', { waitUntil: 'domcontentloaded', timeout: 30000 });
  console.error('[zalo-setup] Page loaded — scan the QR code shown in the browser window');
  console.error('[zalo-setup] Waiting up to 120s for scan...');

  // Wait until redirected away from login page (i.e., QR was scanned successfully)
  await page.waitForFunction(
    () => !window.location.href.includes('id.zalo.me'),
    { timeout: 120000, polling: 2000 }
  );

  console.error('[zalo-setup] QR scanned! Waiting for app to load...');
  await new Promise(r => setTimeout(r, 3000));

  // Save session state
  const cookies = await page.cookies();
  const localStorage = await page.evaluate(() => JSON.stringify(window.localStorage));

  fs.writeFileSync(path.join(SESSION_DIR, 'cookies.json'), JSON.stringify(cookies, null, 2));
  fs.writeFileSync(path.join(SESSION_DIR, 'localstorage.json'), localStorage);

  console.error(`[zalo-setup] Session saved to ${SESSION_DIR}/`);
  console.log(JSON.stringify({ setup: 'complete', session_dir: SESSION_DIR, cookies_count: cookies.length }));

  await browser.close();
}

main().catch(e => {
  process.stderr.write('[zalo-setup] Error: ' + e.message + '\n');
  process.exit(1);
});
