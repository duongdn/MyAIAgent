#!/usr/bin/env node
/**
 * Monitor Zalo personal messages via Chrome Remote Debugging.
 * Attaches to the existing chat.zalo.me tab in Chrome Profile 9 — no QR needed.
 *
 * Prerequisites:
 *   - Chrome must be running with --remote-debugging-port=9222
 *     (automatic after restarting Chrome once — .desktop file already updated)
 *   - chat.zalo.me must be open in a Chrome tab
 *
 * Usage: node scripts/zalo-monitor.js [--since=ISO8601]
 * Output: JSON to stdout
 */

const path = require('path');
const fs = require('fs');
const { findTab } = require('./chrome-remote-connect');

const ROOT = path.resolve(__dirname, '..');
const TIMELINES_PATH = path.join(ROOT, 'config', '.monitoring-timelines.json');

function getSince() {
  const sinceArg = process.argv.find(a => a.startsWith('--since='));
  if (sinceArg) return new Date(sinceArg.split('=')[1]).getTime();
  const timelines = JSON.parse(fs.readFileSync(TIMELINES_PATH, 'utf8'));
  return new Date(timelines.daily_report?.last_run || Date.now() - 86400000).getTime();
}

async function main() {
  const since = getSince();
  process.stderr.write(`[zalo] Window from ${new Date(since).toISOString()}\n`);

  const { browser, page } = await findTab('chat.zalo.me');

  try {
    // Verify logged in (not on login/QR page)
    const isLoggedIn = await page.evaluate(() =>
      !document.querySelector('.zLogin-layout, [class*="login"]') &&
      !window.location.href.includes('id.zalo.me')
    );
    if (!isLoggedIn) throw new Error('Zalo not logged in — ensure chat.zalo.me is open and authenticated in Chrome');

    process.stderr.write('[zalo] Tab ready, extracting conversations\n');

    // Intercept is not possible on an already-loaded page, so read from DOM
    const conversations = await page.evaluate(() => {
      // Try multiple selectors — Zalo updates class names periodically
      const selectors = [
        '[data-key]',
        '[class*="conv-item"]',
        '[class*="ConversationItem"]',
        '[class*="conversation-item"]',
        '[class*="thread-item"]',
        '.conv-item',
      ];
      for (const sel of selectors) {
        const items = document.querySelectorAll(sel);
        if (items.length > 0) {
          return Array.from(items).slice(0, 40).map(el => ({
            id: el.dataset.key || el.dataset.id || '',
            name: (el.querySelector('[class*="name"],[class*="Name"],strong')?.innerText || '').trim(),
            preview: (el.querySelector('[class*="preview"],[class*="Preview"],[class*="message"],p')?.innerText || '').trim(),
            unread: (el.querySelector('[class*="unread"],[class*="badge"],[class*="count"]')?.innerText || '').trim(),
          })).filter(c => c.name);
        }
      }
      return [];
    });

    // Filter to only chats with unread count
    const withUnread = conversations.filter(c => c.unread && c.unread !== '0' && c.unread !== '');

    await browser.disconnect(); // detach only — do NOT close Chrome

    console.log(JSON.stringify({
      since: new Date(since).toISOString(),
      scanned_at: new Date().toISOString(),
      conversations_total: conversations.length,
      conversations_with_unread: withUnread.length,
      conversations: withUnread,
    }, null, 2));

  } catch (e) {
    await browser.disconnect().catch(() => {});
    throw e;
  }
}

main().catch(e => {
  process.stderr.write('[zalo] Error: ' + e.message + '\n');
  process.exit(1);
});
