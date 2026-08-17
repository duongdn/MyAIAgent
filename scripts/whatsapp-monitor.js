#!/usr/bin/env node
/**
 * Monitor WhatsApp personal messages via Chrome Remote Debugging.
 * Attaches to the existing WhatsApp Web tab in Chrome Profile 9 — no QR needed.
 *
 * Prerequisites:
 *   - Chrome must be running with --remote-debugging-port=9222
 *     (automatic after restarting Chrome once — .desktop file already updated)
 *   - web.whatsapp.com must be open in a Chrome tab
 *
 * Usage: node scripts/whatsapp-monitor.js [--since=ISO8601]
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
  process.stderr.write(`[whatsapp] Window from ${new Date(since).toISOString()}\n`);

  const { browser, page } = await findTab('web.whatsapp.com');

  try {
    // Check logged in
    const isReady = await page.evaluate(() =>
      !!document.querySelector('[data-testid="chat-list"], #pane-side, [data-testid="conversation-panel-wrapper"]')
    );
    if (!isReady) throw new Error('WhatsApp Web not logged in — open web.whatsapp.com in Chrome and scan QR');

    process.stderr.write('[whatsapp] Tab ready, extracting chats\n');

    // Extract chats with unread messages from the sidebar
    const chats = await page.evaluate((sinceMs) => {
      const items = document.querySelectorAll(
        '#pane-side [role="listitem"], [data-testid="cell-frame-container"]'
      );
      return Array.from(items).slice(0, 60).map(el => {
        const nameEl = el.querySelector('[data-testid="cell-frame-title"] span, span[title]');
        const previewEl = el.querySelector('[data-testid="last-msg-status"] ~ span, [data-testid="conversation-snippet"] span');
        const unreadEl = el.querySelector('[data-testid="icon-unread-count"], span[aria-label*="unread"]');
        const timeEl = el.querySelector('[data-testid="cell-frame-primary-detail"] span');
        return {
          name: (nameEl?.getAttribute('title') || nameEl?.innerText || '').trim(),
          preview: (previewEl?.innerText || '').trim(),
          unread: (unreadEl?.innerText || '').trim(),
          time: (timeEl?.innerText || '').trim(),
        };
      }).filter(c => c.name && c.unread && c.unread !== '');
    }, since);

    await browser.disconnect(); // detach only — do NOT close Chrome

    console.log(JSON.stringify({
      since: new Date(since).toISOString(),
      scanned_at: new Date().toISOString(),
      chats_with_unread: chats.length,
      chats,
    }, null, 2));

  } catch (e) {
    await browser.disconnect().catch(() => {});
    throw e;
  }
}

main().catch(e => {
  process.stderr.write('[whatsapp] Error: ' + e.message + '\n');
  process.exit(1);
});
