#!/usr/bin/env node
/**
 * Monitor Zalo personal messages via Chrome Remote Debugging.
 * Attaches to the existing chat.zalo.me tab in the dedicated monitor Chrome.
 *
 * Prerequisites:
 *   - Monitor Chrome running: google-chrome-stable --remote-debugging-port=9222
 *     --user-data-dir=/home/nus/chrome-monitor-data "https://web.whatsapp.com" "https://chat.zalo.me"
 *     (autostart entry: ~/.config/autostart/whatsapp-zalo-monitor.desktop)
 *   - chat.zalo.me open + logged in once
 *
 * Usage: node scripts/zalo-monitor.js [--since=ISO8601]
 * Output: JSON to stdout — conversations with recent activity (name + last-activity time).
 *
 * LIMITATION (hard constraint, do not re-investigate):
 *   - Zalo is end-to-end encrypted (Signal protocol); message bodies are base64
 *     ciphertext in IndexedDB (`zdb` `message`/`preview_message` stores) — not readable.
 *   - The Web UI (chat.zalo.me) stays in a perpetual "Đang đồng bộ tin nhắn…" sync state
 *     in this dedicated Chrome: `z-conv-message` (preview) is always empty, no unread
 *     badge renders, and clicking a conversation never opens a message pane.
 *   - Therefore ONLY conversation name + last-activity time is available. No content.
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
 * Parse Zalo Web's relative time label (Vietnamese) into approximate epoch ms (or null if old/unknown).
 * Labels: "X phút" | "X giờ" | "hôm qua" | "Thứ X" | "Chủ nhật" | "X ngày" | "DD/MM/YYYY".
 */
function parseZaloTime(label, nowMs) {
  label = (label || '').trim().toLowerCase();
  const d = new Date(nowMs);
  let m = label.match(/^(\d+)\s*ph[uú]t/);
  if (m) { d.setMinutes(d.getMinutes() - +m[1]); return d.getTime(); }
  m = label.match(/^(\d+)\s*gi[oờờ]/);
  if (m) { d.setHours(d.getHours() - +m[1]); return d.getTime(); }
  m = label.match(/^(\d+)\s*ng[aà]y/);
  if (m) { d.setDate(d.getDate() - +m[1]); return d.getTime(); }
  if (label.includes('hôm qua') || label.includes('hom qua')) { d.setDate(d.getDate() - 1); return d.getTime(); }
  // "Thứ 2" (Monday) ... "Thứ 7" (Saturday). Zalo: Thứ 2=Mon, ... Thứ 6=Fri, Thứ 7=Sat, Chủ nhật=Sun.
  m = label.match(/^th[uứư]\s*(\d)/);
  if (m) {
    const targetDow = +m[1] % 7; // Thứ 2 → 2 % 7 = 2? map: Thứ 2 = Monday(1). So target = (n - 1)
    const dow = (+m[1] - 1 + 7) % 7; // Thứ 2 → 1, ... Thứ 7 → 6, Chủ nhật handled below
    const todayDow = new Date(nowMs).getDay();
    let diff = (todayDow - dow + 7) % 7; if (diff === 0) diff = 7;
    d.setDate(d.getDate() - diff);
    return d.getTime();
  }
  if (label.includes('chủ nhật') || label.includes('chu nhat') || label.includes('cn')) {
    const todayDow = new Date(nowMs).getDay();
    let diff = (todayDow - 0 + 7) % 7; if (diff === 0) diff = 7;
    d.setDate(d.getDate() - diff);
    return d.getTime();
  }
  m = label.match(/^(\d{1,2})\/(\d{1,2})(?:\/(\d{4}))?/);
  if (m) { const y = m[3] ? +m[3] : d.getFullYear(); d.setFullYear(y, +m[2] - 1, +m[1]); return d.getTime(); }
  return null;
}

async function main() {
  const since = getSince();
  process.stderr.write(`[zalo] Window from ${new Date(since).toISOString()}\n`);

  const { browser, page } = await findTab('chat.zalo.me');

  try {
    const isLoggedIn = await page.evaluate(() =>
      !document.querySelector('.zLogin-layout') &&
      !window.location.href.includes('id.zalo.me')
    );
    if (!isLoggedIn) throw new Error('Zalo not logged in — ensure chat.zalo.me is open and authenticated');

    process.stderr.write('[zalo] Tab ready, extracting recent conversations\n');

    const conversations = await page.evaluate(() => {
      // Exact .conv-item containers (not sub-elements matched by [class*="conv-item"])
      const items = document.querySelectorAll('.conv-item');
      const out = [];
      for (const el of items) {
        // NBSP → space, collapse whitespace (Zalo renders names with &nbsp;)
        const name = (el.querySelector('.conv-item-title__name')?.innerText || '')
          .replace(/ /g, ' ').replace(/\s+/g, ' ').trim();
        const time = (el.querySelector('.preview-time')?.innerText || '')
          .replace(/ /g, ' ').replace(/\s+/g, ' ').trim();
        if (!name) continue;
        out.push({ name, time });
      }
      return out;
    });

    const now = Date.now();
    const recent = conversations
      .map(c => ({ ...c, _ts: parseZaloTime(c.time, now) }))
      .filter(c => c._ts != null && c._ts >= since)
      .sort((a, b) => b._ts - a._ts) // most recent first
      .map(({ _ts, ...c }) => c);

    await browser.disconnect(); // detach only — do NOT close Chrome

    console.log(JSON.stringify({
      since: new Date(since).toISOString(),
      scanned_at: new Date().toISOString(),
      total_conversations: conversations.length,
      recent_count: recent.length,
      content_available: false,
      note: 'Zalo is E2E-encrypted; Web UI stuck in sync state. Name + last-activity time only.',
      conversations: recent,
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
