#!/usr/bin/env node
/**
 * Monitor Zalo personal messages (DuongDN).
 * Reuses the persistent browser profile created by zalo-setup.js
 * (config/.zalo-session/) so Zalo treats it as the same device.
 *
 * First run: DISPLAY=:1 node scripts/zalo-setup.js  (scan QR once)
 * Usage:     node scripts/zalo-monitor.js [--since=ISO8601]
 * Output: JSON to stdout
 */

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const path = require('path');
const fs = require('fs');

puppeteer.use(StealthPlugin());

const ROOT = path.resolve(__dirname, '..');
const TIMELINES_PATH = path.join(ROOT, 'config', '.monitoring-timelines.json');
const PROFILE_DIR = path.join(ROOT, 'config', '.zalo-session');

function getSince() {
  const sinceArg = process.argv.find(a => a.startsWith('--since='));
  if (sinceArg) return new Date(sinceArg.split('=')[1]).getTime();
  const timelines = JSON.parse(fs.readFileSync(TIMELINES_PATH, 'utf8'));
  return new Date(timelines.daily_report?.last_run || Date.now() - 86400000).getTime();
}

async function main() {
  if (!fs.existsSync(PROFILE_DIR)) {
    throw new Error('No Zalo session. Run first: DISPLAY=:1 node scripts/zalo-setup.js');
  }

  const since = getSince();
  process.stderr.write(`[zalo] Window from ${new Date(since).toISOString()}\n`);

  const captured = [];

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/usr/bin/google-chrome',
    userDataDir: PROFILE_DIR, // same profile as setup — Zalo recognizes this device
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
  });

  try {
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36');

    // Intercept Zalo API responses
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

    await page.goto('https://chat.zalo.me', { waitUntil: 'domcontentloaded', timeout: 30000 });

    // Wait for app to load past login screen
    try {
      await page.waitForFunction(
        () => !window.location.href.includes('id.zalo.me') &&
              !(document.querySelector('#app')?.innerHTML?.includes('zLogin')),
        { timeout: 20000, polling: 1000 }
      );
    } catch {
      await browser.close();
      throw new Error('Zalo session expired. Re-run: DISPLAY=:1 node scripts/zalo-setup.js');
    }

    process.stderr.write('[zalo] Session restored\n');
    await new Promise(r => setTimeout(r, 5000)); // let conversation list render

    // Extract from DOM (try multiple selectors Zalo may use)
    const conversations = await page.evaluate(() => {
      const selectors = ['[data-key]', '[class*="conv-item"]', '[class*="ConversationItem"]',
                         '[class*="conversation-item"]', '.conv-item', '[class*="thread-item"]'];
      for (const sel of selectors) {
        const items = document.querySelectorAll(sel);
        if (items.length > 0) {
          return Array.from(items).slice(0, 30).map(el => ({
            id: el.dataset.key || el.dataset.id || '',
            name: (el.querySelector('[class*="name"],[class*="Name"],strong')?.innerText || '').trim(),
            preview: (el.querySelector('[class*="preview"],[class*="Preview"],[class*="message"],p')?.innerText || '').trim(),
            unread: (el.querySelector('[class*="unread"],[class*="badge"],[class*="count"]')?.innerText || '').trim(),
          })).filter(c => c.name);
        }
      }
      return [];
    });

    await browser.close();

    console.log(JSON.stringify({
      since: new Date(since).toISOString(),
      scanned_at: new Date().toISOString(),
      conversations,
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
