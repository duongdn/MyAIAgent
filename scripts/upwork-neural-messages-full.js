#!/usr/bin/env node
// Fetch Neural Contract messages via response intercept, paginating by scrolling up
// Usage: node scripts/upwork-neural-messages-full.js [maxPages]

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const path = require('path');
const fs = require('fs');

const WORKROOM_ID = '38901192';
const ROOM_UUID = 'room_2d2bc33394bb79a64cd3426cb4120aec';
const ACCOUNT = 'carrick';
const MAX_PAGES = parseInt(process.argv[2] || '15', 10);

const wait = ms => new Promise(r => setTimeout(r, ms));

async function main() {
  const profileDir = path.join(__dirname, '..', 'tmp', `upwork-profile-${ACCOUNT}`);
  if (!fs.existsSync(path.join(profileDir, 'Default'))) {
    console.error(`No saved session for ${ACCOUNT}`);
    process.exit(1);
  }

  const browser = await puppeteer.launch({
    headless: 'new',
    userDataDir: profileDir,
    args: [
      '--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage',
      '--disable-blink-features=AutomationControlled', '--window-size=1280,900',
    ],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36');

  const allStories = new Map();
  let lastBatchSize = 0;

  page.on('response', async (response) => {
    const url = response.url();
    if (url.includes(`/api/v3/rooms/rooms/${ROOM_UUID}/stories/simplified`)) {
      try {
        const json = await response.json();
        const stories = json.stories || json;
        lastBatchSize = Array.isArray(stories) ? stories.length : 0;
        for (const s of stories) allStories.set(s.storyId, s);
      } catch (e) {
        console.error('Parse stories error:', e.message);
      }
    }
  });

  const messagesUrl = `https://www.upwork.com/nx/wm/workroom/${WORKROOM_ID}/messages`;
  console.error(`Navigating to ${messagesUrl}...`);
  await page.goto(messagesUrl, { waitUntil: 'networkidle2', timeout: 45000 });

  const waitStart = Date.now();
  while (allStories.size === 0 && Date.now() - waitStart < 20000) {
    await wait(500);
  }
  console.error(`Initial batch: ${allStories.size} stories`);

  // Scroll up in the message list to trigger pagination, repeatedly
  for (let i = 0; i < MAX_PAGES; i++) {
    const before = allStories.size;
    lastBatchSize = 0;

    await page.evaluate(() => {
      const containers = [...document.querySelectorAll('div')].filter(d => d.scrollHeight > d.clientHeight + 50);
      for (const c of containers) {
        c.scrollTop = 0;
      }
      window.scrollTo(0, 0);
    });

    await wait(2500);
    const after = allStories.size;
    console.error(`Scroll ${i + 1}: total stories = ${after} (batch ${lastBatchSize})`);

    if (after === before) {
      console.error('No new stories loaded, stopping pagination.');
      break;
    }
  }

  await browser.close();

  const sorted = [...allStories.values()].sort((a, b) => a.created - b.created);
  console.log(JSON.stringify({ total: sorted.length, stories: sorted }, null, 2));
}

main().catch(e => { console.error(e); process.exit(1); });
