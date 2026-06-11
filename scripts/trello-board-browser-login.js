#!/usr/bin/env node
/**
 * Trello board monitor via browser session.
 * First run: opens visible browser for interactive login, then scrapes board.
 * Subsequent runs: headless scrape using saved profile.
 *
 * Usage:
 *   node scripts/trello-board-browser-login.js [boardUrl] [--login]
 *
 * Profile: tmp/trello-browser-profile/ (persists login session)
 */
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');
const path = require('path');

puppeteer.use(StealthPlugin());

const BOARD_URL  = process.argv[2] || 'https://trello.com/b/Fv7eDVgT/app-20';
const FORCE_LOGIN = process.argv.includes('--login');
const PROFILE_DIR = path.resolve(__dirname, '../tmp/trello-browser-profile');
const SCREENSHOT  = path.resolve(__dirname, '../tmp/trello-board-scan.png');
const RESULT_FILE = '/tmp/trello-scan-result.json';

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function isLoggedIn(page) {
  const url = page.url();
  return !url.includes('id.atlassian') && !url.includes('/login') && url.includes('trello.com');
}

async function scrapeBoardViaApi(page, boardId) {
  return page.evaluate(async (id) => {
    const url = `/1/boards/${id}?lists=open&cards=visible&card_fields=name,idList,dateLastActivity,labels,shortUrl&fields=name,desc,url`;
    const r = await fetch(url, { credentials: 'include' });
    if (r.ok) return { ok: true, data: await r.json() };
    return { ok: false, status: r.status };
  }, boardId);
}

async function formatResult(apiData, boardId) {
  if (!apiData?.ok || !apiData.data?.name) return null;
  const d = apiData.data;
  const now = Date.now();
  const listMap = {};
  (d.lists || []).forEach(l => { listMap[l.id] = l.name; });
  return {
    boardName: d.name,
    boardId,
    boardUrl: `https://trello.com/b/${boardId}`,
    lists: (d.lists || []).map(l => ({ id: l.id, name: l.name })),
    cards: (d.cards || []).map(c => ({
      name: c.name,
      list: listMap[c.idList] || 'Unknown',
      daysInactive: Math.floor((now - new Date(c.dateLastActivity)) / 86400000),
      labels: (c.labels || []).map(l => l.name || l.color).filter(Boolean),
      url: c.shortUrl,
    })),
    scannedAt: new Date().toISOString(),
  };
}

async function main() {
  if (!fs.existsSync(PROFILE_DIR)) fs.mkdirSync(PROFILE_DIR, { recursive: true });

  const boardId = BOARD_URL.match(/\/b\/([^/]+)/)?.[1];
  if (!boardId) { console.error('Cannot parse board ID from URL:', BOARD_URL); process.exit(1); }

  // Check if session exists
  const hasSession = fs.existsSync(path.join(PROFILE_DIR, 'Default', 'Cookies'));
  const needsLogin = FORCE_LOGIN || !hasSession;

  console.log(needsLogin
    ? '🔐 Opening browser for login — please log in to Trello when prompted'
    : '🔄 Using saved session (headless)...'
  );

  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    headless: needsLogin ? false : 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--window-size=1400,900',
    ],
    userDataDir: PROFILE_DIR,
    defaultViewport: { width: 1400, height: 900 },
  });

  let result = null;

  try {
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    console.log('Navigating to board:', BOARD_URL);
    await page.goto(BOARD_URL, { waitUntil: 'domcontentloaded', timeout: 30000 }).catch(e => {
      console.log('Nav note:', e.message.slice(0, 60));
    });
    await sleep(3000);

    // Interactive login flow
    if (needsLogin) {
      console.log('\n👆 Please log in to Trello in the browser window.');
      console.log('   Waiting up to 3 minutes for you to complete login...\n');

      const deadline = Date.now() + 3 * 60 * 1000;
      while (Date.now() < deadline) {
        await sleep(3000);
        const url = page.url();
        console.log('  Current URL:', url.slice(0, 80));
        if (url.includes(`/b/${boardId}`)) {
          console.log('\n✅ Board detected — logged in successfully!');
          await sleep(2000);
          break;
        }
        if (url.includes('trello.com') && !url.includes('id.atlassian') && !url.includes('/login')) {
          // On Trello but not on board — navigate there
          await page.goto(BOARD_URL, { waitUntil: 'domcontentloaded', timeout: 20000 }).catch(() => {});
          await sleep(2000);
        }
      }
    }

    // Take screenshot
    await page.screenshot({ path: SCREENSHOT });
    console.log('Screenshot:', SCREENSHOT);

    // Scrape board
    const url = page.url();
    console.log('Final URL:', url);

    if (url.includes(`/b/${boardId}`) || (url.includes('trello.com') && !url.includes('login'))) {
      const apiData = await scrapeBoardViaApi(page, boardId);
      console.log('API response:', JSON.stringify(apiData).slice(0, 100));
      result = await formatResult(apiData, boardId);
      if (result) {
        console.log(`\n✅ Board: "${result.boardName}" | ${result.lists.length} lists | ${result.cards.length} cards`);
      } else {
        console.log('API failed — session may not have access to this board');
      }
    } else {
      console.log('Not on board page — session may have expired');
      if (needsLogin) console.log('Hint: re-run with --login flag to force re-authentication');
    }

  } finally {
    await browser.close();
  }

  if (result) {
    fs.writeFileSync(RESULT_FILE, JSON.stringify(result, null, 2));
    console.log('\n=== BOARD SUMMARY ===');
    console.log(`Board: ${result.boardName} (${result.boardUrl})`);
    console.log(`Lists (${result.lists.length}):`);
    result.lists.forEach(l => {
      const cards = result.cards.filter(c => c.list === l.name);
      console.log(`  ${l.name}: ${cards.length} cards`);
    });
    const stuck = result.cards.filter(c => c.daysInactive >= 5);
    if (stuck.length) {
      console.log(`\nStuck cards (>5d inactive): ${stuck.length}`);
      stuck.slice(0, 5).forEach(c => console.log(`  [${c.list}] ${c.name.slice(0,60)} (${c.daysInactive}d)`));
    }
  } else {
    fs.writeFileSync(RESULT_FILE, JSON.stringify({ error: 'no data', boardId, boardUrl: BOARD_URL }, null, 2));
  }

  return result;
}

main().catch(e => {
  console.error('Fatal:', e.message);
  process.exit(1);
});
