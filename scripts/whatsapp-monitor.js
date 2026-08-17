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

/** Parse WhatsApp Web list-level relative time label into epoch ms (null if unknown). */
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
    d.setDate(d.getDate() - diff); return d.getTime();
  }
  const dm = label.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (dm) { d.setFullYear(+dm[3], +dm[2] - 1, +dm[1]); return d.getTime(); }
  return null;
}

/**
 * Parse a message-pane day separator label (Vietnamese + English) into midnight ms.
 * Labels: "Hôm nay" | "Hôm qua" | "thứ hai".."thứ bảy" | "Chủ nhật" | "DD/MM/YYYY" |
 * "today" | "yesterday" | weekday names.
 */
function parseDayLabel(label, nowMs) {
  const s = (label || '').trim().toLowerCase();
  const d = new Date(nowMs); d.setHours(0, 0, 0, 0);
  if (s.includes('hôm nay') || s === 'today') return d.getTime();
  if (s.includes('hôm qua') || s.includes('hom qua') || s === 'yesterday') {
    d.setDate(d.getDate() - 1); return d.getTime();
  }
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
  const dm = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (dm) { d.setFullYear(+dm[3], +dm[2] - 1, +dm[1]); return d.getTime(); }
  return null;
}

/** Combine day (midnight ms) + "HH:MM" into a full epoch ms (null if either missing). */
function resolveMsgTs(dayMs, hhmm) {
  const hm = (hhmm || '').match(/^(\d{1,2}):(\d{2})$/);
  if (!dayMs) return null;
  if (!hm) return dayMs; // day boundary system message
  const d = new Date(dayMs);
  d.setHours(+hm[1], +hm[2], 0, 0);
  return d.getTime();
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

      // 3) Scroll up to load older messages, then extract since `since`
      chat.messages = await page.evaluate(async (sinceMs) => {
        const pane = () => document.querySelector('[data-testid="conversation-panel-messages"]');
        const dayRe = /^(hôm nay|hom nay|hôm qua|hom qua|thứ [a-zà-ỹ]+|thu [a-zà-ỹ]+|chủ nhật|chu nhat|today|yesterday|monday|tuesday|wednesday|thursday|friday|saturday|sunday|\d{1,2}\/\d{1,2}\/\d{4})$/i;

        // day-label → midnight ms (mirrors Node-side parseDayLabel; needed inside the page for early-stop)
        function dayMs(label) {
          const s = (label || '').trim().toLowerCase();
          const d = new Date(); d.setHours(0, 0, 0, 0);
          if (s.includes('hôm nay') || s === 'today') return d.getTime();
          if (s.includes('hôm qua') || s.includes('hom qua') || s === 'yesterday') { d.setDate(d.getDate() - 1); return d.getTime(); }
          const map = [
            { re: /ch[uủ]\s*nh[aậ]t|^cn$|sunday/, dow: 0 },
            { re: /th[uứư]\s*(hai|\b2\b)|monday/, dow: 1 },
            { re: /th[uứư]\s*(ba|\b3\b)|tuesday/, dow: 2 },
            { re: /th[uứư]\s*(t[uư]|\b4\b)|wednesday/, dow: 3 },
            { re: /th[uứư]\s*(n[aă]m|\b5\b)|thursday/, dow: 4 },
            { re: /th[uứư]\s*(s[aá]u|\b6\b)|friday/, dow: 5 },
            { re: /th[uứư]\s*(b[aả]y|\b7\b)|saturday/, dow: 6 },
          ];
          for (const m of map) if (m.re.test(s)) {
            const todayDow = new Date().getDay();
            let diff = (todayDow - m.dow + 7) % 7; if (diff === 0) diff = 7;
            d.setDate(d.getDate() - diff); return d.getTime();
          }
          const dm = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
          if (dm) { d.setFullYear(+dm[3], +dm[2] - 1, +dm[1]); return d.getTime(); }
          return null;
        }

        function extract() {
          const p = pane();
          if (!p) return [];
          const msgs = [];
          let currentDay = null;
          let lastIncomingAuthor = '';
          const walker = document.createTreeWalker(p, NodeFilter.SHOW_ELEMENT);
          let node;
          while ((node = walker.nextNode())) {
            const el = node;
            const tid = el.getAttribute && el.getAttribute('data-testid');
            if (tid === 'msg-container') {
              const incoming = !!el.querySelector('[data-testid="tail-in"]');
              let author = el.querySelector('[data-testid="author"]')?.innerText?.trim() || '';
              const text = Array.from(el.querySelectorAll('[data-testid*="selectable-text"]'))
                .map(e => e.innerText.trim()).filter(Boolean).join('\n');
              const meta = el.querySelector('[data-testid="msg-meta"]')?.innerText?.trim() || '';
              if (incoming && !author) author = lastIncomingAuthor;
              else if (incoming) lastIncomingAuthor = author;
              if (text || meta) msgs.push({ author, text, meta, day: currentDay, incoming });
            } else if (el.tagName === 'SPAN' && el.children.length === 0) {
              const t = (el.textContent || '').trim();
              if (t && t.length < 25 && dayRe.test(t)) currentDay = t;
            }
          }
          return msgs;
        }

        // scroll up to load history until we pass `sinceMs` or hit the wall
        let prevSh = 0;
        let msgs = extract();
        for (let i = 0; i < 25; i++) {
          const p = pane();
          if (!p) break;
          const sh = p.scrollHeight;
          if (sh === prevSh && i > 0) break; // no more messages loadable
          prevSh = sh;
          p.scrollTop = 0;
          await new Promise(r => setTimeout(r, 700));
          msgs = extract();
          // stop if we already loaded a message older than the window
          const oldest = msgs.reduce((min, m) => {
            const dm = m.day ? dayMs(m.day) : null;
            const hm = (m.meta || '').match(/^(\d{1,2}):(\d{2})$/);
            let t = null;
            if (dm != null && hm) { const dd = new Date(dm); dd.setHours(+hm[1], +hm[2], 0, 0); t = dd.getTime(); }
            else if (dm != null) t = dm;
            return t != null && t < min ? t : min;
          }, Infinity);
          if (oldest < sinceMs) break;
        }
        return msgs;
      }, since);

      // 4) Resolve each message's full timestamp (carry time forward across collapsed timestamps)
      const rawMsgs = chat.messages || [];
      let lastTime = null, lastDay = null;
      chat.messages = rawMsgs
        .map(m => {
          const dayMs = m.day ? parseDayLabel(m.day, now) : null;
          if (dayMs == null) return null;
          if (m.day !== lastDay) { lastTime = null; lastDay = m.day; }
          const hm = (m.meta || '').match(/^(\d{1,2}):(\d{2})$/);
          if (hm) lastTime = m.meta;
          const ts = hm ? resolveMsgTs(dayMs, m.meta) : (lastTime ? resolveMsgTs(dayMs, lastTime) : dayMs);
          const from = m.incoming ? (m.author || 'unknown') : 'Bạn';
          return { from, text: m.text, ts: new Date(ts).toISOString() };
        })
        .filter(m => m && m.text && m.text.trim())
        .filter(m => new Date(m.ts).getTime() >= since)
        .sort((a, b) => new Date(a.ts) - new Date(b.ts));
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
