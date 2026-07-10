const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
const path = require('path');
const fs = require('fs');

const WORKROOM_ID = '38901192';
const ROOM_UUID = 'room_2d2bc33394bb79a64cd3426cb4120aec';
const ACCOUNT = 'carrick';

(async () => {
  const profileDir = path.join('/home/nus/projects/My-AI-Agent', 'tmp', `upwork-profile-${ACCOUNT}`);
  const browser = await puppeteer.launch({
    headless: 'new',
    userDataDir: profileDir,
    args: ['--no-sandbox','--disable-setuid-sandbox','--disable-dev-shm-usage','--disable-blink-features=AutomationControlled','--window-size=1280,900'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36');

  page.on('request', (req) => {
    const url = req.url();
    if (url.includes('stories/simplified')) {
      console.error('REQUEST URL:', url);
      console.error('HEADERS:', JSON.stringify(req.headers(), null, 2));
    }
  });

  await page.goto(`https://www.upwork.com/nx/wm/workroom/${WORKROOM_ID}/messages`, { waitUntil: 'networkidle2', timeout: 45000 });
  await new Promise(r => setTimeout(r, 8000));

  // Try scrolling the actual virtualized message list - look for common Upwork class names
  const info = await page.evaluate(() => {
    const candidates = [...document.querySelectorAll('[class*="scroll"], [class*="message"], [class*="thread"], [class*="story"]')]
      .filter(el => el.scrollHeight > el.clientHeight)
      .map(el => ({ cls: el.className, scrollHeight: el.scrollHeight, clientHeight: el.clientHeight, tag: el.tagName }));
    return candidates.slice(0, 20);
  });
  console.error('SCROLLABLE CANDIDATES:', JSON.stringify(info, null, 2));

  await browser.close();
})();
