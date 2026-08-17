#!/usr/bin/env node
/**
 * Monitor WhatsApp personal messages via Chrome Remote Debugging.
 * Attaches to the existing WhatsApp Web tab in the dedicated monitor Chrome,
 * then for each conversation with recent activity opens it and reads the actual
 * message content (sender + body + time) since `since`.
 *
 * Prerequisites:
 *   - Monitor Chrome running: google-chrome-stable --remote-debugging-port=9222
 *     --user-data-dir=/home/nus/chrome-monitor-data "https://web.whatsapp.com" "https://chat.zalo.me"
 *     (autostart entry: ~/.config/autostart/whatsapp-zalo-monitor.desktop)
 *   - web.whatsapp.com open + QR-scanned once
 *
 * Usage: node scripts/whatsapp-monitor.js [--since=ISO8601]
 * Output: JSON to stdout — recent conversations + their messages since `since`.
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

/** Parse WhatsApp Web list-level relative time label into epoch ms (null if unknown).
 *  Handles both Vietnamese ("Hôm qua", "thứ sáu", "chủ nhật") and English labels. */
function parseWaTime(label, nowMs) {
  label = (label || '').trim();
  const d = new Date(nowMs);
  const hm = label.match(/^(\d{1,2}):(\d{2})$/);
  if (hm) { d.setHours(+hm[1], +hm[2], 0, 0); return d.getTime(); }
  const s = label.toLowerCase();
  if (s.includes('hôm nay') || s.includes('hom nay') || s === 'today') return d.getTime();
  if (s.includes('hôm qua') || s.includes('hom qua') || s === 'yesterday') { d.setDate(d.getDate() - 1); return d.getTime(); }
  const dowMap = [
    { re: /ch[uủ]\s*nh[aậ]t|^cn$|sunday/, dow: 0 },
    { re: /th[uứư]\s*(hai|\b2\b)|monday/, dow: 1 },
    { re: /th[uứư]\s*(ba|\b3\b)|tuesday/, dow: 2 },
    { re: /th[uứư]\s*(t[uư]|\b4\b)|wednesday/, dow: 3 },
    { re: /th[uứư]\s*(n[aă]m|\b5\b)|thursday/, dow: 4 },
    { re: /th[uứư]\s*(s[aá]u|\b6\b)|friday/, dow: 5 },
    { re: /th[uứư]\s*(b[aả]y|\b7\b)|saturday/, dow: 6 },
  ];
  for (const m of dowMap) {
    if (m.re.test(s)) {
      const todayDow = new Date(nowMs).getDay();
      let diff = (todayDow - m.dow + 7) % 7; if (diff === 0) diff = 7;
      d.setDate(d.getDate() - diff); return d.getTime();
    }
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

    // 1) Conversation list
    const chats = await page.evaluate(() => {
      const items = document.querySelectorAll('[data-testid="cell-frame-container"]');
      const out = [];
      for (const el of items) {
        // strip the unread-count prefix (e.g. "3 tin nhắn chưa đọc\n") from the title
        let name = el.querySelector('[data-testid="cell-frame-title"]')?.innerText?.trim() || '';
        name = name.replace(/^\d+\s*(tin nhắn chưa đọc|unread messages?)[\s\n]*/i, '');
        const time = el.querySelector('[data-testid="cell-frame-primary-detail"]')?.innerText?.trim() || '';
        const preview =
          el.querySelector('[data-testid="cell-frame-secondary"]')?.innerText?.trim() ||
          el.querySelector('[data-testid="last-msg-status"] ~ span')?.innerText?.trim() || '';
        const unread = el.querySelector('[data-testid="icon-unread-count"]')?.innerText?.trim() || '';
        if (!name) continue;
        out.push({ name, time, preview, unread });
      }
      return out;
    });

    const now = Date.now();
    const recent = chats.filter(c => {
      const ts = parseWaTime(c.time, now);
      return ts != null && ts >= since;
    });

    process.stderr.write(`[whatsapp] ${recent.length}/${chats.length} recent chats, reading messages\n`);

    // 2) For each recent chat, open it and read message content since `since`
    for (const chat of recent) {
      // real mouse click (CDP input events) opens the conversation — JS .click()/dispatchEvent do not
      const box = await page.evaluate(async (chatName) => {
        const clean = (t) => (t || '').replace(/^\d+\s*(tin nhắn chưa đọc|unread messages?)[\s\n]*/i, '').trim();
        const titleEl = Array.from(document.querySelectorAll('[data-testid="cell-frame-title"]'))
          .find(e => clean(e.innerText) === chatName) ||
          Array.from(document.querySelectorAll('[data-testid="cell-frame-title"]'))
            .find(e => (e.innerText || '').includes(chatName));
        if (!titleEl) return null;
        titleEl.scrollIntoView({ block: 'center', inline: 'nearest' });
        await new Promise(r => setTimeout(r, 350));
        const r = titleEl.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) return null;
        if (r.left < 0 || r.right > window.innerWidth || r.top < 0 || r.bottom > window.innerHeight) return null;
        return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
      }, chat.name);
      if (!box) { chat.messages = []; continue; }
      await page.mouse.click(box.x, box.y);
      await new Promise(r => setTimeout(r, 2500));

      // 3) Collect messages across WhatsApp's virtualized list. Use the authoritative
      //    `data-pre-plain-text` attribute ("[HH:MM, D/M/YYYY] author: ") which carries
      //    the FULL timestamp — no day-separator carry-forward (unreliable under
      //    virtualization). Scroll from bottom up, accumulating + deduping by ts+author+text.
      chat.messages = await page.evaluate(async (sinceMs) => {
        const pane = () => document.querySelector('[data-testid="conversation-panel-messages"]');
        const seen = new Map(); // key -> { ts, author, text, incoming }

        function collect() {
          const p = pane();
          if (!p) return;
          for (const el of p.querySelectorAll('[data-testid="msg-container"]')) {
            const pre = (el.querySelector('[data-pre-plain-text]')?.getAttribute('data-pre-plain-text') || '').trim();
            const m = pre.match(/^\[(\d{1,2}):(\d{2}),\s*(\d{1,2})\/(\d{1,2})\/(\d{4})\]/);
            if (!m) continue; // no full timestamp (rare) — skip
            const ts = new Date(+m[5], +m[4] - 1, +m[3], +m[1], +m[2]).getTime();
            const incoming = !!el.querySelector('[data-testid="tail-in"]');
            const author = el.querySelector('[data-testid="author"]')?.innerText?.trim() || '';
            const text = Array.from(el.querySelectorAll('[data-testid*="selectable-text"]'))
              .map(e => e.innerText.trim()).filter(Boolean).join('\n');
            if (!text) continue;
            const key = ts + '|' + author + '|' + text;
            if (!seen.has(key)) seen.set(key, { ts, author, text, incoming });
          }
        }

        // scroll to the true bottom first (loop: scrollHeight grows as the latest
        // messages lazy-load, so a single jump can land short of the newest message)
        for (let i = 0; i < 8; i++) {
          const el = pane();
          if (!el) break;
          const sh = el.scrollHeight;
          el.scrollTop = sh;
          await new Promise(r => setTimeout(r, 500));
          if (el.scrollHeight === sh) break;
        }

        let noGrowth = 0;
        for (let i = 0; i < 60; i++) {
          const el = pane();
          if (!el) break;
          collect();
          let oldest = Infinity;
          for (const v of seen.values()) if (v.ts < oldest) oldest = v.ts;
          if (oldest < sinceMs) break; // already past the window
          const before = seen.size;
          const prevTop = el.scrollTop;
          el.scrollTop = Math.max(0, el.scrollTop - el.clientHeight * 0.8);
          await new Promise(r => setTimeout(r, 800));
          collect();
          if (seen.size === before && el.scrollTop === prevTop) {
            if (++noGrowth >= 2) break; // reached the top — no more loadable
          } else {
            noGrowth = 0;
          }
        }
        return Array.from(seen.values()).sort((a, b) => a.ts - b.ts);
      }, since);

      // 4) Filter to the window + shape output (timestamps are already exact)
      chat.messages = (chat.messages || [])
        .filter(m => m.ts >= since)
        .map(m => ({ from: m.incoming ? (m.author || 'unknown') : 'Bạn', text: m.text, ts: new Date(m.ts).toISOString() }));
    }

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
