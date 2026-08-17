#!/usr/bin/env node
/**
 * Zalo one-time QR setup — opens chat.zalo.me in a PERSISTENT headless browser
 * profile at config/.zalo-session/. Subsequent zalo-monitor.js runs reuse the
 * same browser profile, so Zalo sees the same "device" and restores the session.
 *
 * Usage (run once with visible display so QR is visible):
 *   DISPLAY=:1 node scripts/zalo-setup.js
 */

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const path = require('path');
const fs = require('fs');

puppeteer.use(StealthPlugin());

const ROOT = path.resolve(__dirname, '..');
// Persistent profile dir — Zalo session lives here indefinitely
const PROFILE_DIR = path.join(ROOT, 'config', '.zalo-session');

async function main() {
  fs.mkdirSync(PROFILE_DIR, { recursive: true });
  process.stderr.write(`[zalo-setup] Profile dir: ${PROFILE_DIR}\n`);
  process.stderr.write('[zalo-setup] Opening chat.zalo.me — scan QR with Zalo mobile app\n');

  const browser = await puppeteer.launch({
    headless: false, // must be visible so user can scan QR
    executablePath: '/usr/bin/google-chrome',
    userDataDir: PROFILE_DIR, // persistent — Zalo session stays here
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    defaultViewport: { width: 1280, height: 800 },
  });

  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36');
  await page.goto('https://chat.zalo.me', { waitUntil: 'domcontentloaded', timeout: 30000 });

  process.stderr.write('[zalo-setup] Waiting for QR scan (up to 3 min)...\n');

  // Wait until app loads past the login page
  await page.waitForFunction(
    () => !window.location.href.includes('id.zalo.me') &&
          !(document.querySelector('#app')?.innerHTML?.includes('zLogin')),
    { timeout: 180000, polling: 2000 }
  );

  process.stderr.write('[zalo-setup] QR scanned — waiting for app to fully load...\n');
  await new Promise(r => setTimeout(r, 4000));

  process.stderr.write(`[zalo-setup] Done. Session saved in ${PROFILE_DIR}/\n`);
  process.stderr.write('[zalo-setup] Closing browser — future runs use headless mode.\n');
  console.log(JSON.stringify({ setup: 'complete', profile_dir: PROFILE_DIR }));

  await browser.close();
}

main().catch(e => {
  process.stderr.write('[zalo-setup] Error: ' + e.message + '\n');
  process.exit(1);
});
