// Upwork Neural workroom check - login + fetch messages in one session
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const SCREENSHOT_DIR = path.join(__dirname, '..', 'tmp');
const PROFILE_DIR = path.join(__dirname, '..', 'tmp', 'upwork-neural-session');
const WORKROOM_URL = 'https://www.upwork.com/nx/wm/workroom/38901192/messages';

(async () => {
  // Clean profile to avoid Cloudflare issues
  if (fs.existsSync(PROFILE_DIR)) {
    fs.rmSync(PROFILE_DIR, { recursive: true, force: true });
  }

  const browser = await puppeteer.launch({
    headless: false,
    executablePath: '/usr/bin/google-chrome',
    defaultViewport: { width: 1280, height: 900 },
    args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
    userDataDir: PROFILE_DIR,
  });
  const page = (await browser.pages())[0];

  // Step 1: Go to workroom (will redirect to login)
  console.log('[1] Navigating to Neural workroom...');
  await page.goto(WORKROOM_URL, { waitUntil: 'domcontentloaded', timeout: 25000 });
  await new Promise(r => setTimeout(r, 3000));

  let url = await page.evaluate(() => window.location.href);
  console.log('[1] URL:', url);

  // Step 2: If login page, fill credentials
  if (url.includes('login')) {
    console.log('[2] Login required, filling credentials...');

    // Wait for page to fully render
    await new Promise(r => setTimeout(r, 2000));

    // Check what login form elements are present
    const html = await page.evaluate(() => document.body.innerHTML.substring(0, 3000));
    console.log('[2] Login HTML sample:', html.substring(0, 500));

    // There's a "Continue" button but no username field yet - might need SSO
    // Try clicking the Continue button first
    const buttons = await page.$$('button');
    console.log('[2] Buttons found:', buttons.length);
    for (const btn of buttons) {
      const text = await btn.evaluate(el => el.textContent);
      console.log('  button text:', text);
      if (text.includes('Continue') || text.includes('continue')) {
        console.log('[2] Clicking Continue...');
        await btn.click();
        await new Promise(r => setTimeout(r, 3000));
        break;
      }
    }

    // Try finding the email/password login form
    const cfg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'config', '.upwork-config.json'), 'utf8'));
    const carrick = cfg.accounts.find(a => a.name === 'carrick');

    // Try different selectors for the login form
    const selectors = ['input[name="login"]', 'input[type="email"]', '#login_username', 'input[autocomplete="username"]'];
    let filled = false;
    for (const sel of selectors) {
      const el = await page.$(sel);
      if (el) {
        console.log('[2] Found input:', sel);
        await el.type(carrick.username, { delay: 20 });
        filled = true;
        break;
      }
    }

    if (filled) {
      // Click submit
      const submitBtns = await page.$$('button[type="submit"], button:has-text("Continue")');
      for (const btn of submitBtns) {
        await btn.click().catch(() => {});
      }
      await new Promise(r => setTimeout(r, 3000));

      // Fill password
      const passSels = ['input[name="password"]', 'input[type="password"]', '#login_password'];
      for (const sel of passSels) {
        const el = await page.$(sel);
        if (el) {
          console.log('[2] Found password field:', sel);
          await el.type(carrick.password, { delay: 20 });
          break;
        }
      }

      // Submit password
      const submitBtns2 = await page.$$('button[type="submit"], button:has-text("Log")');
      for (const btn of submitBtns2) {
        await btn.click().catch(() => {});
      }
      await new Promise(r => setTimeout(r, 8000));
    }

    console.log('[2] After login URL:', await page.evaluate(() => window.location.href));

    // Navigate to workroom
    await page.goto(WORKROOM_URL, { waitUntil: 'domcontentloaded', timeout: 25000 });
    await new Promise(r => setTimeout(r, 6000));
  }

  // Step 3: Check result
  url = await page.evaluate(() => window.location.href);
  console.log('[3] Final URL:', url);

  const body = await page.evaluate(() => document.body.innerText);
  const lines = body.split('\n').filter(l => l.trim());

  if (url.includes('workroom') && !url.includes('login')) {
    console.log('[3] ✅ In Neural workroom!');
    console.log('[3] Page content (first 30 lines):');
    lines.slice(0, 30).forEach(l => console.log(' ', l));

    // Save screenshot
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'upwork-neural-workroom.png') });
    console.log('[3] Screenshot saved');
  } else if (body.includes('Cloudflare')) {
    console.log('[3] ❌ Cloudflare block');
    console.log('[3] Body:', lines.slice(0, 5).join('\n'));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'upwork-cf-block.png') });
  } else {
    console.log('[3] ❌ Unknown state');
    console.log('[3] Body:', lines.slice(0, 10).join('\n'));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'upwork-unknown.png') });
  }

  await browser.close();
  process.exit(0);
})().catch(e => {
  console.error('Fatal:', e.message);
  process.exit(1);
});
