#!/usr/bin/env node
// Fetch Neural Contract messages via response intercept
// Usage: node scripts/upwork-neural-messages.js

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const path = require('path');
const fs = require('fs');

const WORKROOM_ID = '38901192';
const ROOM_UUID = 'room_2d2bc33394bb79a64cd3426cb4120aec';
const ACCOUNT = 'carrick';

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

  let capturedStories = null;

  page.on('response', async (response) => {
    const url = response.url();
    if (url.includes(`/api/v3/rooms/rooms/${ROOM_UUID}/stories/simplified`)) {
      try {
        const json = await response.json();
        capturedStories = json;
      } catch (e) {
        console.error('Parse stories error:', e.message);
      }
    }
  });

  const messagesUrl = `https://www.upwork.com/nx/wm/workroom/${WORKROOM_ID}/messages`;
  console.error(`Navigating to ${messagesUrl}...`);
  await page.goto(messagesUrl, { waitUntil: 'networkidle2', timeout: 45000 });

  // Wait for message API response
  const waitStart = Date.now();
  while (!capturedStories && Date.now() - waitStart < 20000) {
    await new Promise(r => setTimeout(r, 500));
  }

  await page.screenshot({ path: path.join(__dirname, '..', 'tmp', 'neural-messages.png') });

  if (!capturedStories) {
    console.error('No stories response captured');
    await browser.close();
    process.exit(2);
  }

  console.log(JSON.stringify(capturedStories, null, 2));
  await browser.close();
}

main().catch(e => { console.error(e); process.exit(1); });
