#!/usr/bin/env node
// Opens a VISIBLE browser for manual Siteground login.
// After you log in, it saves cookies to tmp/sg-cookies.json.
// Then siteground-storage.js can reuse them without needing to log in again.
//
// Usage: node scripts/siteground-login-once.js

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const fs = require('fs');
const path = require('path');

const CONFIG_PATH = path.join(__dirname, '..', '.bailey-config.json');
const COOKIE_PATH = path.join(__dirname, '..', 'tmp', 'sg-cookies.json');
const TMP_DIR = path.join(__dirname, '..', 'tmp');

async function main() {
  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
  const sg = config.siteground;

  if (!fs.existsSync(TMP_DIR)) fs.mkdirSync(TMP_DIR, { recursive: true });

  console.log('Opening browser — please log in to Siteground manually.');
  console.log('The script will detect when you reach the dashboard and save cookies.');
  console.log('');

  const browser = await puppeteer.launch({
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1280,900'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  // Pre-fill credentials on the login page
  await page.goto('https://login.siteground.com/', { waitUntil: 'networkidle2', timeout: 30000 });

  // Fill username and password to save the user time
  try {
    const usernameInput = await page.$('input[name="username"]');
    const passwordInput = await page.$('input[type="password"]');
    if (usernameInput) await usernameInput.type(sg.username, { delay: 30 });
    if (passwordInput) await passwordInput.type(sg.password, { delay: 30 });
    console.log('Credentials pre-filled. Just click LOGIN and solve CAPTCHA if needed.');
  } catch (e) {
    console.log('Could not pre-fill credentials. Please type them manually.');
  }

  // Poll for successful login (URL changes away from login)
  console.log('Waiting for successful login...');
  let saved = false;
  while (!saved) {
    await new Promise(r => setTimeout(r, 2000));
    try {
      const url = page.url();
      if (url.includes('my.siteground.com') && !url.includes('login')) {
        console.log('Login successful! Saving cookies...');
        const cookies = await page.cookies();
        // Also get cookies from siteground.com domain
        const allCookies = await page.cookies('https://my.siteground.com', 'https://siteground.com', 'https://login.siteground.com');
        fs.writeFileSync(COOKIE_PATH, JSON.stringify(allCookies, null, 2));
        console.log(`Saved ${allCookies.length} cookies to ${COOKIE_PATH}`);
        console.log('You can close the browser now, or it will close in 5 seconds.');
        saved = true;
        await new Promise(r => setTimeout(r, 5000));
        await browser.close();
      }
    } catch (e) {
      // Browser may have been closed manually
      if (e.message.includes('closed') || e.message.includes('detached')) {
        console.log('Browser was closed.');
        break;
      }
    }
  }
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
