#!/usr/bin/env node
// Upwork Neural workroom check — reuse carrick's saved stealth session
const fs = require('fs');
const path = require('path');

// TMPDIR before puppeteer loads
const _tmpDir = path.join(__dirname, '..', 'tmp', 'chrome-tmp');
fs.mkdirSync(_tmpDir, { recursive: true });
process.env.TMPDIR = _tmpDir;

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const CONFIG_PATH = path.join(__dirname, '..', 'config', '.upwork-config.json');
const SCREENSHOT_DIR = path.join(__dirname, '..', 'tmp');
const PROFILE_DIR = path.join(__dirname, '..', 'tmp', 'upwork-profile-carrick');
const WORKROOM_URL = 'https://www.upwork.com/nx/wm/workroom/38901192/messages';

(async () => {
  if (!fs.existsSync(PROFILE_DIR)) {
    console.log('[NEURAL] No saved session found. Run upwork-login.js --login --account=carrick first');
    process.exit(1);
  }

  const browser = await puppeteer.launch({
    headless: 'new',
    userDataDir: PROFILE_DIR,
    executablePath: '/usr/bin/google-chrome',
    defaultViewport: { width: 1280, height: 900 },
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-blink-features=AutomationControlled',
    ],
  });
  const page = await browser.newPage();

  // Step 1: Navigate to workroom
  console.log('[1] Navigating to Neural workroom...');
  await page.goto(WORKROOM_URL, { waitUntil: 'networkidle2', timeout: 30000 }).catch(() => {});
  await new Promise(r => setTimeout(r, 4000));

  let url = page.url();
  console.log('[1] URL:', url);

  // Step 2: Check if we hit login redirect or Cloudflare
  const bodyText = await page.evaluate(() => document.body.innerText).catch(() => '');
  const bodyHTML = await page.evaluate(() => document.body.innerHTML.substring(0, 500)).catch(() => '');

  if (url.includes('workroom') && url.includes('38901192')) {
    console.log('[2] ✅ In Neural workroom!');
    // Extract recent messages
    const lines = bodyText.split('\n').filter(l => l.trim());
    const msgLines = lines.slice(0, 60);
    msgLines.forEach(l => console.log(' ', l));

    // Extract timestamp of latest message
    const dateMatch = bodyText.match(/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{1,2}\b/g);
    if (dateMatch) {
      const latest = dateMatch[dateMatch.length - 1];
      console.log(`\n[2] Latest message date: ${latest}`);
    }

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'neural-workroom.png') });
    console.log('[2] Screenshot: tmp/neural-workroom.png');

    // Check for new messages since last run
    // Look for message content specifically (identify sender + message)
    console.log('\n[2] --- MESSAGES ---');

    // Try to get structured messages from the page
    const messages = await page.evaluate(() => {
      const items = document.querySelectorAll('[data-test="message-item"], [data-qa="message-text"], .message-item');
      return Array.from(items).slice(-15).map(el => el.textContent.trim()).filter(Boolean);
    });
    if (messages.length) {
      messages.forEach(m => console.log(' ', m));
    } else {
      // Just print first meaningful lines
      const meaningful = lines.filter(l => l.length > 10 && !l.includes('workroom') && !l.includes('Upwork')).slice(0, 15);
      if (meaningful.length) {
        meaningful.forEach(l => console.log(' ', l));
      } else {
        console.log('  (no readable messages extracted)');
      }
    }
  } else if (bodyText.includes('Cloudflare') || bodyHTML.includes('Cloudflare')) {
    console.log('[2] ❌ Cloudflare block');
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'neural-cf-block.png') });
    console.log('[2] Trying stealth bypass — wait + retry...');
    await new Promise(r => setTimeout(r, 5000));
    await page.goto(WORKROOM_URL, { waitUntil: 'networkidle2', timeout: 30000 }).catch(() => {});
    await new Promise(r => setTimeout(r, 5000));
    const url2 = page.url();
    const body2 = await page.evaluate(() => document.body.innerText).catch(() => '');
    if (url2.includes('workroom') && !body2.includes('Cloudflare')) {
      console.log('[2] ✅ Retry succeeded!');
      const lines = body2.split('\n').filter(l => l.trim()).slice(0, 40);
      lines.forEach(l => console.log(' ', l));
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'neural-workroom-retry.png') });
    } else {
      console.log('[2] Still blocked after retry');
    }
  } else if (url.includes('login') || bodyText.includes('Sign in') || bodyText.includes('sign-in')) {
    console.log('[2] ❌ Session expired — needs re-login');
    console.log('[2] Run: DISPLAY=:1 node scripts/upwork-login.js --login --account=carrick');
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'neural-needs-login.png') });
  } else {
    console.log('[2] Unknown state. URL:', url);
    console.log('[2] Body preview:', bodyText.substring(0, 300));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'neural-unknown.png') });
  }

  await browser.close();
  process.exit(0);
})().catch(e => {
  console.error('Fatal:', e.message);
  process.exit(1);
});
