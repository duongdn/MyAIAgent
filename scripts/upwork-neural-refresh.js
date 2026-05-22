#!/usr/bin/env node
// Re-login to Upwork and fetch Neural Contract messages
// Handles Cloudflare JS challenge by waiting for it to resolve

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const path = require('path');
const fs = require('fs');

const CONFIG_PATH = path.join(__dirname, '..', 'config', '.upwork-config.json');
const PROFILE_DIR = path.join(__dirname, '..', 'tmp', 'upwork-profile-carrick');
const WORKROOM_ID = '38901192';
const ROOM_UUID = 'room_2d2bc33394bb79a64cd3426cb4120aec';

async function wait(ms) { return new Promise(r => setTimeout(r, ms)); }

async function main() {
  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
  const account = config.accounts.find(a => a.name === 'carrick');

  // Remove lock file if exists
  const lockFile = path.join(PROFILE_DIR, 'SingletonLock');
  if (fs.existsSync(lockFile)) fs.unlinkSync(lockFile);

  const browser = await puppeteer.launch({
    headless: 'new',
    userDataDir: PROFILE_DIR,
    args: [
      '--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage',
      '--disable-blink-features=AutomationControlled',
      '--disable-features=IsolateOrigins,site-per-process',
      '--window-size=1280,900',
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
        console.error('Stories captured!');
      } catch (e) {
        console.error('Parse error:', e.message);
      }
    }
  });

  // Step 1: Navigate to upwork.com main page, wait for Cloudflare
  console.error('Navigating to upwork.com...');
  await page.goto('https://www.upwork.com/', { waitUntil: 'networkidle2', timeout: 45000 }).catch(() => {});
  await wait(5000);

  const url1 = page.url();
  console.error('URL after home:', url1);

  // Step 2: Check if we're logged in
  const isLoggedIn = await page.evaluate(() => {
    return document.querySelector('[data-test="UpCIconButton"]') !== null ||
           document.querySelector('.nav-logged-in') !== null ||
           document.title.includes('Home') && !document.querySelector('[data-qa="up-main-nav-login"]');
  }).catch(() => false);

  console.error('Logged in:', isLoggedIn);

  if (!isLoggedIn) {
    // Step 2b: Handle Cloudflare Turnstile on home page
    await page.evaluate(() => {
      document.querySelectorAll('input[type="button"], button, [role="button"]').forEach(b => {
        if ((b.value || b.textContent || '').includes('Verify')) b.click();
      });
    }).catch(() => {});
    await wait(4000);

    // Step 3: Navigate to login
    console.error('Navigating to login page...');
    await page.goto('https://www.upwork.com/ab/account-security/login', { waitUntil: 'networkidle2', timeout: 30000 }).catch(() => {});
    await wait(8000);

    // Wait longer for Cloudflare Turnstile iframe to load
    await wait(8000);
    const frames2 = page.frames();
    console.error('Frames after wait:', frames2.length, frames2.map(f => f.url().slice(0, 80)));

    let cfClicked = false;
    for (const frame of frames2) {
      const url = frame.url();
      if (url.includes('cloudflare.com') || url.includes('turnstile')) {
        console.error('Found CF frame:', url.slice(0, 80));
        try {
          await frame.click('input[type="checkbox"], [role="checkbox"], label, .ctp-checkbox-container, canvas').catch(() => {});
          cfClicked = true;
          console.error('Clicked CF element in frame');
          await wait(5000);
        } catch(e) { console.error('CF frame error:', e.message); }
      }
    }

    if (!cfClicked) {
      // Click by coordinate — checkbox appears at ~(510, 295) in 1280x900
      console.error('No CF frame found — clicking by coordinate');
      await page.mouse.click(510, 295);
      await wait(5000);
    }

    await page.screenshot({ path: path.join(__dirname, '..', 'tmp', 'upwork-login-step1.png') });
    console.error('Login page URL:', page.url());

    // Fill username
    const usernameField = await page.$('#login_username, input[name="username"], input[type="email"]');
    if (usernameField) {
      await usernameField.click({ clickCount: 3 });
      await usernameField.type(account.username, { delay: 60 });
      await wait(800);

      const continueBtn = await page.$('#login_password_continue, button[type="submit"]');
      if (continueBtn) {
        await continueBtn.click();
        console.error('Clicked continue...');
        await wait(3000);
      }
    } else {
      console.error('No username field found');
      await page.screenshot({ path: path.join(__dirname, '..', 'tmp', 'upwork-no-username.png') });
    }

    // Fill password
    const pwField = await page.$('#login_password, input[type="password"]');
    if (pwField) {
      await pwField.click({ clickCount: 3 });
      await pwField.type(account.password, { delay: 60 });
      await wait(800);

      const loginBtn = await page.$('#login_control_continue, button[type="submit"]');
      if (loginBtn) {
        await loginBtn.click();
        console.error('Clicked login...');
        await wait(5000);
      }
    }

    // Handle secret answer if needed
    const secretField = await page.$('#login_answer');
    if (secretField && account.secret_answer) {
      await secretField.click({ clickCount: 3 });
      await secretField.type(account.secret_answer, { delay: 60 });
      await wait(800);
      const btn = await page.$('#login_control_continue');
      if (btn) { await btn.click(); await wait(4000); }
    }

    await page.screenshot({ path: path.join(__dirname, '..', 'tmp', 'upwork-after-login.png') });
    console.error('After login URL:', page.url());
  }

  // Step 4: Navigate to workroom messages
  const messagesUrl = `https://www.upwork.com/nx/wm/workroom/${WORKROOM_ID}/messages`;
  console.error(`Navigating to ${messagesUrl}...`);
  await page.goto(messagesUrl, { waitUntil: 'networkidle2', timeout: 45000 }).catch(() => {});
  await wait(3000);

  await page.screenshot({ path: path.join(__dirname, '..', 'tmp', 'upwork-workroom.png') });
  console.error('Workroom URL:', page.url());

  // Wait for stories API response
  const waitStart = Date.now();
  while (!capturedStories && Date.now() - waitStart < 30000) {
    await wait(500);
  }

  await browser.close();

  if (!capturedStories) {
    console.error('No stories captured');
    process.exit(2);
  }

  console.log(JSON.stringify(capturedStories, null, 2));
}

main().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
