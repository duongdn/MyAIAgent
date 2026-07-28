#!/usr/bin/env node
// Generic Upwork messages check for the carrick account — find a conversation by
// contact/company name in the inbox and dump its recent messages.
//
// Auth: same real-session cookie injection as upwork-neural-check.js (Puppeteer-driven
// login is permanently non-viable on this host — see docs/memory/daily-report/upwork).
//
// Inbox lives at /ab/messages/ (NOT /nx/wm/, which 404s). Room list is only in the
// sidebar DOM, so rooms are discovered from the sidebar links, not from an API.
//
// Usage:
//   node scripts/upwork-room-messages.js --list
//   node scripts/upwork-room-messages.js "Brad Ballantine" [--limit 40]
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const _tmpDir = path.join(__dirname, '..', 'tmp', 'chrome-tmp');
fs.mkdirSync(_tmpDir, { recursive: true });
process.env.TMPDIR = _tmpDir;

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const COOKIE_JSON = '/tmp/carrick-upwork-cookies.json';
const INBOX_URL = 'https://www.upwork.com/ab/messages/';
const MAX_ATTEMPTS = 3;
const OUR_ORG_ID = '676959530288324609'; // carrick@nustechnology.com org

function extractFreshCookies() {
  try {
    execSync('.claude/skills/.venv/bin/python3 scripts/get-carrick-upwork-cookies.py',
      { cwd: path.join(__dirname, '..'), stdio: ['ignore', 'ignore', 'ignore'] });
  } catch (venvErr) {
    execSync('python3 scripts/get-carrick-upwork-cookies.py',
      { cwd: path.join(__dirname, '..'), stdio: ['ignore', 'ignore', 'ignore'] });
  }
  return JSON.parse(fs.readFileSync(COOKIE_JSON, 'utf8'))
    .filter(c => c.name && c.value && c.domain && /^[!#-+\--:<-\[\]-~]+$/.test(c.value))
    .map(c => ({ name: c.name, value: c.value, domain: c.domain, path: c.path, secure: c.secure }));
}

async function newAuthedPage(browser) {
  const page = await browser.newPage();
  await page.setCookie(...extractFreshCookies());
  return page;
}

async function listRooms(browser) {
  for (let i = 1; i <= MAX_ATTEMPTS; i++) {
    const page = await newAuthedPage(browser);
    await page.goto(INBOX_URL, { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
    await new Promise(r => setTimeout(r, 7000));
    const rooms = await page.$$eval('a[href*="/rooms/room_"]', as => as.map(a => {
      const href = a.getAttribute('href');
      const key = (href.match(/room_[0-9a-f]+/) || [])[0];
      const title = decodeURIComponent((href.match(/pageTitle=([^&]+)/) || [, ''])[1]).replace(/\+/g, ' ');
      return { key, title, preview: a.innerText.replace(/\s*\n+\s*/g, ' | ').slice(0, 200) };
    })).catch(() => []);
    const unique = [...new Map(rooms.filter(r => r.key).map(r => [r.key, r])).values()];
    await page.close();
    if (unique.length) return unique;
    console.error(`[UPWORK] attempt ${i}/${MAX_ATTEMPTS}: no rooms in sidebar — retrying...`);
  }
  return [];
}

async function fetchRoom(browser, roomKey) {
  for (let i = 1; i <= MAX_ATTEMPTS; i++) {
    const page = await newAuthedPage(browser);
    let stories = null, users = null;
    page.on('response', async (res) => {
      const url = res.url();
      if (res.request().method() !== 'GET' || !url.includes(roomKey)) return;
      try {
        if (url.includes('/stories/simplified')) {
          const j = await res.json();
          if (j && j.stories) stories = (stories || []).concat(j.stories);
        } else if (/\/users\?limit/.test(url)) {
          const j = await res.json();
          if (j) users = j.users || j;
        }
      } catch (_) {}
    });
    await page.goto(`${INBOX_URL}rooms/${roomKey}`, { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
    await new Promise(r => setTimeout(r, 6000));
    await page.close();
    if (stories) return { stories, users };
    console.error(`[UPWORK] attempt ${i}/${MAX_ATTEMPTS}: no messages captured for ${roomKey} — retrying...`);
  }
  return null;
}

// The room /users endpoint returns userId + orgId only — no display names. The one
// whose orgId matches our own caller org is us (carrick); everyone else is the client.
function nameFor(users, userId, roomTitle) {
  const list = (users && (users.users || users)) || [];
  if (!Array.isArray(list)) return `user ${userId}`;
  const me = list.find(u => u.role === 'admin' && u.orgId === OUR_ORG_ID);
  if (me && String(me.userId) === String(userId)) return 'us (carrick)';
  return roomTitle ? roomTitle.split(',')[0] : `user ${userId}`;
}

(async () => {
  const args = process.argv.slice(2);
  const listOnly = args.includes('--list');
  const limitIdx = args.indexOf('--limit');
  const limit = limitIdx >= 0 ? parseInt(args[limitIdx + 1], 10) : 30;
  const query = args.filter((a, i) => !a.startsWith('--') && i !== limitIdx + 1)[0];

  if (!listOnly && !query) {
    console.error('Usage: upwork-room-messages.js "<contact or company name>" [--limit N] | --list');
    process.exit(1);
  }

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: '/usr/bin/google-chrome',
    defaultViewport: { width: 1500, height: 1000 },
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  try {
    const rooms = await listRooms(browser);
    if (!rooms.length) {
      console.error('[UPWORK] could not load the inbox with an authenticated session.');
      process.exit(2);
    }

    if (listOnly) {
      rooms.forEach(r => console.log(`${r.key}\t${r.title}\t${r.preview}`));
      return;
    }

    const q = query.toLowerCase();
    const matches = rooms.filter(r => `${r.title} ${r.preview}`.toLowerCase().includes(q));
    if (!matches.length) {
      console.error(`[UPWORK] no conversation matched "${query}". Available:`);
      rooms.forEach(r => console.error(`  ${r.key}\t${r.title}`));
      process.exit(3);
    }

    for (const room of matches) {
      console.log(`\n=== ${room.title} (${room.key}) ===`);
      console.log(`${INBOX_URL}rooms/${room.key}`);
      const data = await fetchRoom(browser, room.key);
      if (!data) { console.log('  (no messages captured)'); continue; }
      const seen = new Set();
      data.stories
        .filter(m => !m.isSystemStory && !seen.has(m.storyId) && seen.add(m.storyId))
        .sort((a, b) => b.created - a.created)
        .slice(0, limit)
        .forEach(m => {
          const ts = new Date(m.created).toISOString();
          const text = (m.message || '')
            .replace(/<@\d+:\d+\|([^>]+)>/g, '@$1')
            .replace(/<br\s*\/?>/gi, '\n    ')
            .replace(/<[^>]+>/g, ' ')
            .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&');
          console.log(`  [${ts}] ${nameFor(data.users, m.userId, room.title)}: ${text.trim().slice(0, 1500)}`);
        });
    }
  } finally {
    await browser.close();
  }
})().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
