#!/usr/bin/env node
/**
 * Monitor WhatsApp personal messages via Chrome Remote Debugging.
 * Attaches to the existing WhatsApp Web tab in the dedicated monitor Chrome.
 *
 * Prerequisites:
 *   - Monitor Chrome running: google-chrome-stable --remote-debugging-port=9222
 *     --user-data-dir=/home/nus/chrome-monitor-data "https://web.whatsapp.com" "https://chat.zalo.me"
 *     (autostart entry: ~/.config/autostart/whatsapp-zalo-monitor.desktop)
 *   - web.whatsapp.com open + QR-scanned once
 *
 * Usage: node scripts/whatsapp-monitor.js [--since=ISO8601]
 * Output: JSON to stdout — conversations with recent activity (last message since `since`).
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

/**
 * Parse WhatsApp Web's relative time label into an approximate epoch ms (or null if old/unknown).
 * Labels: "HH:MM" (today) | "Yesterday" | weekday name (e.g. "Saturday") | "DD/MM/YYYY".
 */
function parseWaTime(label, nowMs) {
  label = (label || '').trim();
  const d = new Date(nowMs);
  const hm = label.match(/^(\d{1,2}):(\d{2})$/);
  if (hm) { d.setHours(+hm[1], +hm[2], 0, 0); return d.getTime(); }
  if (/^yesterday$/i.test(label)) { d.setDate(d.getDate() - 1); return d.getTime(); }
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const di = days.indexOf(label.toLowerCase());
  if (di >= 0) {
    const todayDow = new Date(nowMs).getDay();
    let diff = (todayDow - di + 7) % 7; if (diff === 0) diff = 7;
    d.setDate(d.getDate() - diff);
    return d.getTime();
  }
  const dm = label.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (dm) { d.setFullYear(+dm[3], +dm[2] - 1, +dm[1]); return d.getTime(); }
  return null;
}

async function main() {
  const since = getSince();
  process.stderr.write(`[whatsapp] Window from ${new Date(since).toISOString()}\n`);

  const { browser, page } = await findTab('web.whatsapp.com');

  try {
    const isReady = await page.evaluate(() =>
      !!document.querySelector('#pane-side, [data-testid="chat-list"]')
    );
    if (!isReady) throw new Error('WhatsApp Web not logged in — open web.whatsapp.com and scan QR');

    process.stderr.write('[whatsapp] Tab ready, extracting recent chats\n');

    const chats = await page.evaluate((sinceMs) => {
      const items = document.querySelectorAll('[data-testid="cell-frame-container"]');
      const out = [];
      for (const el of items) {
        const name = el.querySelector('[data-testid="cell-frame-title"]')?.innerText?.trim() || '';
        const time = el.querySelector('[data-testid="cell-frame-primary-detail"]')?.innerText?.trim() || '';
        const preview =
          el.querySelector('[data-testid="cell-frame-secondary"]')?.innerText?.trim() ||
          el.querySelector('[data-testid="last-msg-status"] ~ span')?.innerText?.trim() || '';
        const unread = el.querySelector('[data-testid="icon-unread-count"]')?.innerText?.trim() || '';
        if (!name) continue;
        out.push({ name, preview, time, unread });
      }
      return out;
    }, since);

    // Filter to chats whose last message is within the window (relative labels are parsed in Node)
    const now = Date.now();
    const recent = chats.filter(c => {
      const ts = parseWaTime(c.time, now);
      return ts != null && ts >= since;
    });

    await browser.disconnect(); // detach only — do NOT close Chrome

    console.log(JSON.stringify({
      since: new Date(since).toISOString(),
      scanned_at: new Date().toISOString(),
      total_chats: chats.length,
      recent_count: recent.length,
      chats: recent,
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
