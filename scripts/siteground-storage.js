#!/usr/bin/env node
// Fetch Siteground storage statistics via Puppeteer + stealth + persistent profile
// First run: opens visible browser for manual login. Subsequent runs: headless with saved session.
// Usage: node scripts/siteground-storage.js [--login]
// --login: force visible browser for re-authentication

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const fs = require('fs');
const path = require('path');

const CONFIG_PATH = path.join(__dirname, '..', 'config', '.bailey-config.json');
const SCREENSHOT_DIR = path.join(__dirname, '..', 'tmp');
const PROFILE_DIR = path.join(__dirname, '..', 'tmp', 'sg-browser-profile');

const forceLogin = process.argv.includes('--login');

async function main() {
  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
  const sg = config.siteground;
  if (!sg) {
    console.error('ERROR: No "siteground" section in .bailey-config.json');
    process.exit(1);
  }

  if (!fs.existsSync(SCREENSHOT_DIR)) fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

  const hasProfile = fs.existsSync(path.join(PROFILE_DIR, 'Default'));
  const needsLogin = forceLogin || !hasProfile;

  const browser = await puppeteer.launch({
    headless: needsLogin ? false : 'new',
    userDataDir: PROFILE_DIR,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-blink-features=AutomationControlled',
      '--window-size=1280,900',
    ],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36');

  try {
    // Navigate to statistics page
    console.error('Navigating to statistics page...');
    await page.goto(sg.statistics_url, { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(r => setTimeout(r, 3000));

    let url = page.url();
    console.error('Current URL:', url);

    // If redirected to login, handle authentication
    if (url.includes('login.siteground.com')) {
      if (!needsLogin) {
        // Session expired in headless mode — re-run with --login
        console.error('SESSION_EXPIRED: Run with --login flag to re-authenticate');
        console.log(JSON.stringify({ status: 'session_expired', message: 'Run: node scripts/siteground-storage.js --login' }));
        await browser.close();
        process.exit(2);
      }

      // Visible browser — fill credentials and let user solve CAPTCHA
      console.error('Login required. Filling credentials...');
      const usernameInput = await page.$('input[name="username"]');
      const passwordInput = await page.$('input[type="password"]');
      if (usernameInput) {
        await usernameInput.click({ clickCount: 3 });
        await usernameInput.type(sg.username, { delay: 50 });
      }
      if (passwordInput) {
        await passwordInput.click({ clickCount: 3 });
        await passwordInput.type(sg.password, { delay: 50 });
      }

      console.error('Credentials filled. Click LOGIN and solve CAPTCHA if needed...');

      // Wait for user to log in (poll until URL changes)
      let attempts = 0;
      while (url.includes('login.siteground.com') && attempts < 60) {
        await new Promise(r => setTimeout(r, 2000));
        url = page.url();
        attempts++;
      }

      if (url.includes('login.siteground.com')) {
        console.error('Login timeout');
        console.log(JSON.stringify({ status: 'login_timeout' }));
        await browser.close();
        process.exit(1);
      }

      console.error('Login successful! URL:', url);
      // Wait for any post-login redirects to complete
      await new Promise(r => setTimeout(r, 5000));
      url = page.url();
      console.error('After redirect settle, URL:', url);

      // Only navigate to statistics if not already there
      if (!url.includes('statistics')) {
        console.error('Navigating to statistics...');
        await page.goto(sg.statistics_url, { waitUntil: 'networkidle2', timeout: 30000 });
        await new Promise(r => setTimeout(r, 5000));
      }
    }

    // Dismiss cookie consent banner if present
    try {
      const acceptBtn = await page.$('button[class*="accept"], a[class*="accept"], [id*="accept"]');
      if (acceptBtn) {
        await acceptBtn.click();
        console.error('Dismissed cookie consent banner');
        await new Promise(r => setTimeout(r, 2000));
      } else {
        // Try finding by text content
        const buttons = await page.$$('button, a');
        for (const btn of buttons) {
          const text = await btn.evaluate(el => el.textContent.trim().toLowerCase());
          if (text.includes('accept all') || text.includes('accept cookies') || text === 'reject all') {
            await btn.click();
            console.error('Dismissed cookie banner via text match:', text);
            await new Promise(r => setTimeout(r, 2000));
            break;
          }
        }
      }
    } catch (e) {
      console.error('Cookie banner dismiss failed (non-critical):', e.message);
    }

    // Click STATISTICS tab if not already active
    try {
      const tabs = await page.$$('a, button, [role="tab"]');
      for (const tab of tabs) {
        const text = await tab.evaluate(el => el.textContent.trim().toUpperCase());
        if (text === 'STATISTICS') {
          await tab.click();
          console.error('Clicked STATISTICS tab');
          await new Promise(r => setTimeout(r, 5000));
          break;
        }
      }
    } catch (e) {
      console.error('Tab click failed:', e.message);
    }

    // Wait for SPA content to load
    await new Promise(r => setTimeout(r, 5000));

    // We should now be on the statistics page
    await extractAndOutput(page);

  } catch (err) {
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'sg-error.png') }).catch(() => {});
    console.error('Error:', err.message);
    console.log(JSON.stringify({ status: 'error', error: err.message, screenshot: 'tmp/sg-error.png' }));
    process.exit(1);
  } finally {
    await browser.close();
  }
}

async function extractAndOutput(page) {
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'sg-04-statistics.png') });
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'sg-05-full.png'), fullPage: true });

  const storageData = await page.evaluate(() => {
    const result = {};
    const allText = document.body.innerText;
    result.page_title = document.title;
    result.raw_text = allText.substring(0, 8000);

    // Find GB values
    const gbPattern = /(\d+\.?\d*)\s*GB/gi;
    const matches = allText.match(gbPattern);
    if (matches) result.gb_values = [...new Set(matches)];

    // Find percentage values
    const pctPattern = /(\d+\.?\d*)%/gi;
    const pctMatches = allText.match(pctPattern);
    if (pctMatches) result.pct_values = [...new Set(pctMatches)];

    // Try progress bars
    const progressBars = document.querySelectorAll('[role="progressbar"], progress, [class*="progress"]');
    if (progressBars.length > 0) {
      result.progress_bars = Array.from(progressBars).map(el => ({
        value: el.getAttribute('value') || el.getAttribute('aria-valuenow'),
        max: el.getAttribute('max') || el.getAttribute('aria-valuemax'),
        text: el.textContent.trim().substring(0, 200)
      }));
    }

    return result;
  });

  console.log(JSON.stringify({
    status: 'success',
    url: page.url(),
    storage: storageData,
    screenshots: ['tmp/sg-04-statistics.png', 'tmp/sg-05-full.png']
  }, null, 2));
}

main();
