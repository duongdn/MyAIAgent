#!/usr/bin/env node
/**
 * Monitor Zalo personal messages via Chrome Remote Debugging.
 * Attaches to the chat.zalo.me tab in the dedicated monitor Chrome, brings it to
 * the foreground (background tabs are throttled → Zalo's message sync stalls),
 * waits for the sync to complete, then for each recent conversation opens it and
 * reads the actual message content (sender + body + time) since `since`.
 *
 * Prerequisites:
 *   - Monitor Chrome running: google-chrome-stable --remote-debugging-port=9222
 *     --user-data-dir=/home/nus/chrome-monitor-data "https://web.whatsapp.com" "https://chat.zalo.me"
 *     (autostart entry: ~/.config/autostart/whatsapp-zalo-monitor.desktop)
 *   - chat.zalo.me open + logged in once
 *
 * Usage: node scripts/zalo-monitor.js [--since=ISO8601]
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

/** Parse Zalo Web list-level relative time label (VN) into epoch ms (null if unknown). */
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
  m = label.match(/^th[uứư]\s*(\d)/);
  if (m) {
    const dow = (+m[1] - 1 + 7) % 7; // Thứ 2 → Monday(1)
    const todayDow = new Date(nowMs).getDay();
    let diff = (todayDow - dow + 7) % 7; if (diff === 0) diff = 7;
    d.setDate(d.getDate() - diff); return d.getTime();
  }
  if (label.includes('chủ nhật') || label.includes('chu nhat') || label.includes('cn')) {
    const todayDow = new Date(nowMs).getDay();
    let diff = (todayDow - 0 + 7) % 7; if (diff === 0) diff = 7;
    d.setDate(d.getDate() - diff); return d.getTime();
  }
  m = label.match(/^(\d{1,2})\/(\d{1,2})(?:\/(\d{4}))?/);
  if (m) { const y = m[3] ? +m[3] : d.getFullYear(); d.setFullYear(y, +m[2] - 1, +m[1]); return d.getTime(); }
  return null;
}

/**
 * Parse a Zalo message-pane day separator into midnight ms (null if unknown).
 * Labels: "Hôm nay" | "Hôm qua" | "Thứ X"/"Thứ 2" | "Chủ nhật" | "DD/MM/YYYY" |
 * "DD tháng M, YYYY" | weekday EN.
 */
function parseDayLabel(label, nowMs) {
  const s = (label || '').trim().toLowerCase();
  const d = new Date(nowMs); d.setHours(0, 0, 0, 0);
  if (s.includes('hôm nay') || s.includes('hom nay') || s === 'today') return d.getTime();
  if (s.includes('hôm qua') || s.includes('hom qua') || s === 'yesterday') {
    d.setDate(d.getDate() - 1); return d.getTime();
  }
  // "thứ 2".."thứ 7" (digit) or "thứ hai".."thứ bảy" (word)
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
  // "DD/MM/YYYY" or "DD/MM"
  let dm = s.match(/^(\d{1,2})\/(\d{1,2})(?:\/(\d{4}))?$/);
  if (dm) { const y = dm[3] ? +dm[3] : d.getFullYear(); d.setFullYear(y, +dm[2] - 1, +dm[1]); return d.getTime(); }
  // "DD tháng M, YYYY"
  dm = s.match(/^(\d{1,2})\s+th[aá]ng\s+(\d{1,2})(?:,?\s*(\d{4}))?$/);
  if (dm) { const y = dm[3] ? +dm[3] : d.getFullYear(); d.setFullYear(y, +dm[2] - 1, +dm[1]); return d.getTime(); }
  return null;
}

/** Combine day (midnight ms) + "HH:MM" into a full epoch ms. */
function resolveMsgTs(dayMs, hhmm) {
  const hm = (hhmm || '').match(/^(\d{1,2}):(\d{2})$/);
  if (!dayMs) return null;
  if (!hm) return dayMs;
  const d = new Date(dayMs);
  d.setHours(+hm[1], +hm[2], 0, 0);
  return d.getTime();
}

async function main() {
  const since = getSince();
  process.stderr.write(`[zalo] Window from ${new Date(since).toISOString()}\n`);

  const { browser, page } = await findTab('chat.zalo.me');

  try {
    // CRITICAL: bring to foreground — background tabs are throttled and Zalo's
    // "Đang đồng bộ tin nhắn…" sync never completes in the background.
    await page.bringToFront();

    const isLoggedIn = await page.evaluate(() =>
      !document.querySelector('.zLogin-layout') &&
      !(location.href || '').includes('id.zalo.me')
    );
    if (!isLoggedIn) throw new Error('Zalo not logged in — open chat.zalo.me and scan QR');

    // wait for conversation list + previews to populate (sync completes)
    let convCount = 0, previewCount = 0;
    for (let i = 0; i < 30; i++) {
      const st = await page.evaluate(() => ({
        convs: document.querySelectorAll('.conv-item').length,
        previews: Array.from(document.querySelectorAll('.z-conv-message')).filter(e => (e.innerText || '').trim()).length,
      }));
      convCount = st.convs; previewCount = st.previews;
      if (st.convs > 0 && st.previews >= st.convs - 1) break;
      await new Promise(r => setTimeout(r, 1000));
    }
    process.stderr.write(`[zalo] ${convCount} convs, ${previewCount} previews synced\n`);

    // 1) conversation list
    const chats = await page.evaluate(() => {
      const items = document.querySelectorAll('.conv-item');
      const out = [];
      for (const el of items) {
        const clean = (t) => (t || '').replace(/ /g, ' ').replace(/\s+/g, ' ').trim();
        const name = clean(el.querySelector('.conv-item-title__name')?.innerText);
        const time = clean(el.querySelector('.preview-time')?.innerText);
        const preview = clean(el.querySelector('.z-conv-message')?.innerText);
        const unread = clean(el.querySelector('.z-noti-badge__content')?.innerText);
        if (!name) continue;
        out.push({ name, time, preview, unread });
      }
      return out;
    });

    const now = Date.now();
    const recent = chats.filter(c => {
      const ts = parseZaloTime(c.time, now);
      return ts != null && ts >= since;
    });
    process.stderr.write(`[zalo] ${recent.length}/${chats.length} recent chats, reading messages\n`);

    // 2) for each recent chat, open it and read message content since `since`
    for (const chat of recent) {
      const box = await page.evaluate(async (chatName) => {
        const clean = (t) => (t || '').replace(/ /g, ' ').replace(/\s+/g, ' ').trim();
        const items = Array.from(document.querySelectorAll('.conv-item'));
        const el = items.find(e => clean(e.querySelector('.conv-item-title__name')?.innerText) === chatName) ||
                   items.find(e => clean(e.innerText).includes(chatName));
        if (!el) return null;
        el.scrollIntoView({ block: 'center' });
        await new Promise(r => setTimeout(r, 350));
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) return null;
        if (r.left < 0 || r.right > window.innerWidth || r.top < 0 || r.bottom > window.innerHeight) return null;
        return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
      }, chat.name);
      if (!box) { chat.messages = []; continue; }
      await page.mouse.click(box.x, box.y);
      await new Promise(r => setTimeout(r, 2500));

      // 3) extract messages (sender + text + time + day) via TreeWalker
      chat.messages = await page.evaluate(async (sinceMs) => {
        const scrollEl = () => document.querySelector('.message-view__scroll') || document.getElementById('messageViewScroll');
        const dayRe = /^(hôm nay|hom nay|hôm qua|hom qua|thứ [a-zà-ỹ]+|thu [a-zà-ỹ]+|chủ nhật|chu nhat|today|yesterday|monday|tuesday|wednesday|thursday|friday|saturday|sunday|\d{1,2}\/\d{1,2}\/\d{4}|\d{1,2}\s+th[aá]ng\s+\d{1,2}(?:,\s*\d{4})?)$/i;

        function dayMs(label) {
          const s = (label || '').trim().toLowerCase();
          const d = new Date(); d.setHours(0, 0, 0, 0);
          if (s.includes('hôm nay') || s.includes('hom nay') || s === 'today') return d.getTime();
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
          const dm = s.match(/^(\d{1,2})\/(\d{1,2})(?:\/(\d{4}))?$/);
          if (dm) { const y = dm[3] ? +dm[3] : d.getFullYear(); d.setFullYear(y, +dm[2] - 1, +dm[1]); return d.getTime(); }
          return null;
        }

        function extract() {
          const sc = scrollEl();
          if (!sc) return [];
          const msgs = [];
          let currentDay = null;
          const walker = document.createTreeWalker(sc, NodeFilter.SHOW_ELEMENT);
          let node;
          while ((node = walker.nextNode())) {
            const el = node;
            const cls = typeof el.className === 'string' ? el.className : '';
            if (cls.includes('block-date')) {
              const label = (el.querySelector('.chat-date .content, .content')?.innerText || '').replace(/\s+/g, ' ').trim();
              if (label && label.length < 30 && dayRe.test(label)) currentDay = label;
            }
            if (cls.includes('chat-message')) {
              const incoming = !!el.querySelector('.avatar--overlay');
              const sender = el.querySelector('.message-sender-name-content')?.innerText?.trim() || '';
              const text = el.querySelector('.text-message__container .text, .text-message__container')?.innerText?.trim() || '';
              const file = el.querySelector('.file-message__content-title')?.innerText?.trim() || '';
              const time = el.querySelector('.card-send-time__sendTime')?.innerText?.trim() || '';
              const body = [text, file ? '[File] ' + file : ''].filter(Boolean).join('\n');
              if (body || sender || time) msgs.push({ sender, text: body, time, day: currentDay, incoming });
            }
          }
          return msgs;
        }

        // scroll up to load older history until we pass `sinceMs`
        let msgs = extract();
        let prevCount = 0;
        for (let i = 0; i < 25; i++) {
          const sc = scrollEl();
          if (!sc) break;
          sc.scrollTop = 0;
          await new Promise(r => setTimeout(r, 700));
          msgs = extract();
          if (msgs.length === prevCount && i > 0) break;
          prevCount = msgs.length;
          const oldest = msgs.reduce((min, m) => {
            const dm = m.day ? dayMs(m.day) : null;
            const hm = (m.time || '').match(/^(\d{1,2}):(\d{2})$/);
            let t = null;
            if (dm != null && hm) { const dd = new Date(dm); dd.setHours(+hm[1], +hm[2], 0, 0); t = dd.getTime(); }
            else if (dm != null) t = dm;
            return t != null && t < min ? t : min;
          }, Infinity);
          if (oldest < sinceMs) break;
        }
        return msgs;
      }, since);

      // 4) resolve timestamps (carry time forward across collapsed timestamps)
      const rawMsgs = chat.messages || [];
      let lastTime = null, lastDay = null;
      chat.messages = rawMsgs
        .map(m => {
          const dm = m.day ? parseDayLabel(m.day, now) : null;
          if (dm == null) return null;
          if (m.day !== lastDay) { lastTime = null; lastDay = m.day; }
          const hm = (m.time || '').match(/^(\d{1,2}):(\d{2})$/);
          if (hm) lastTime = m.time;
          const ts = hm ? resolveMsgTs(dm, m.time) : (lastTime ? resolveMsgTs(dm, lastTime) : dm);
          const from = m.sender || (m.incoming ? chat.name : 'Bạn');
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
      total_conversations: chats.length,
      recent_count: recent.length,
      content_available: true,
      chats: recent,
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
