#!/usr/bin/env node
// Fetch Siteground storage statistics via Puppeteer + stealth
// Usage: node scripts/siteground-storage.js
// Reads credentials from .bailey-config.json (siteground section)
// Outputs JSON with storage breakdown

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const fs = require('fs');
const path = require('path');

const CONFIG_PATH = path.join(__dirname, '..', '.bailey-config.json');
const SCREENSHOT_DIR = path.join(__dirname, '..', 'tmp');
const COOKIE_PATH = path.join(__dirname, '..', 'tmp', 'sg-cookies.json');

async function main() {
  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
  const sg = config.siteground;
  if (!sg) {
    console.error('ERROR: No "siteground" section in .bailey-config.json');
    process.exit(1);
  }

  if (!fs.existsSync(SCREENSHOT_DIR)) fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

  const browser = await puppeteer.launch({
    headless: 'new',
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
  // Set a real user agent
  await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36');

  try {
    // Try to restore saved cookies first
    if (fs.existsSync(COOKIE_PATH)) {
      console.error('Restoring saved cookies...');
      const cookies = JSON.parse(fs.readFileSync(COOKIE_PATH, 'utf8'));
      await page.setCookie(...cookies);

      // Try going directly to statistics page
      await page.goto(sg.statistics_url, { waitUntil: 'networkidle2', timeout: 30000 });
      await new Promise(r => setTimeout(r, 2000));

      const url = page.url();
      if (!url.includes('login')) {
        console.error('Cookie session valid, on statistics page');
        return await extractAndOutput(page);
      }
      console.error('Cookies expired, proceeding with login...');
    }

    // Step 1: Navigate to login
    console.error('Navigating to Siteground login...');
    await page.goto('https://login.siteground.com/', { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'sg-01-login.png') });

    // Step 2: Fill login form
    console.error('Filling credentials...');
    const usernameInput = await page.$('input[name="username"]');
    const passwordInput = await page.$('input[type="password"]');

    if (!usernameInput || !passwordInput) {
      throw new Error('Could not find login form inputs');
    }

    // Clear and type with human-like delays
    await usernameInput.click({ clickCount: 3 });
    await usernameInput.type(sg.username, { delay: 80 });
    await new Promise(r => setTimeout(r, 500));
    await passwordInput.click({ clickCount: 3 });
    await passwordInput.type(sg.password, { delay: 80 });
    await new Promise(r => setTimeout(r, 1000));

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'sg-02-filled.png') });

    // Step 3: Click login button
    console.error('Clicking login...');
    const loginBtn = await page.$('button');
    // Find the LOGIN button specifically
    const buttons = await page.$$('button');
    for (const btn of buttons) {
      const text = await btn.evaluate(el => el.textContent.trim());
      if (text.toUpperCase() === 'LOGIN') {
        await btn.click();
        break;
      }
    }

    // Wait for navigation
    await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 30000 }).catch(() => {});
    await new Promise(r => setTimeout(r, 5000));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'sg-03-after-login.png') });

    const currentUrl = page.url();
    console.error('Current URL after login:', currentUrl);

    // Check for 2FA
    const pageContent = await page.content();
    if (pageContent.toLowerCase().includes('two-factor') || pageContent.toLowerCase().includes('2fa') ||
        pageContent.toLowerCase().includes('verification code') || pageContent.toLowerCase().includes('authenticator') ||
        pageContent.toLowerCase().includes('verify your identity')) {
      console.error('2FA_REQUIRED');
      console.log(JSON.stringify({ status: '2fa_required', url: currentUrl, screenshot: 'tmp/sg-03-after-login.png' }));
      await browser.close();
      process.exit(2);
    }

    // Check if still on login page (reCAPTCHA blocked)
    if (currentUrl.includes('login.siteground.com')) {
      // Check for CAPTCHA challenge
      const hasCaptcha = await page.evaluate(() => {
        return document.querySelector('iframe[src*="recaptcha"]') !== null ||
               document.querySelector('[class*="captcha"]') !== null ||
               document.body.innerText.includes('verify you are human');
      });

      if (hasCaptcha) {
        console.error('CAPTCHA_BLOCKED');
        console.log(JSON.stringify({ status: 'captcha_blocked', url: currentUrl, screenshot: 'tmp/sg-03-after-login.png' }));
        await browser.close();
        process.exit(3);
      }

      // Maybe wrong credentials or other error
      const errorText = await page.evaluate(() => {
        const err = document.querySelector('[class*="error"], [class*="alert"]');
        return err ? err.textContent.trim() : null;
      });

      console.log(JSON.stringify({
        status: 'login_failed',
        url: currentUrl,
        error: errorText || 'Still on login page after submit',
        screenshot: 'tmp/sg-03-after-login.png'
      }));
      await browser.close();
      process.exit(1);
    }

    // Save cookies for future use
    const cookies = await page.cookies();
    fs.writeFileSync(COOKIE_PATH, JSON.stringify(cookies, null, 2));
    console.error('Cookies saved for future sessions');

    // Step 4: Navigate to statistics
    console.error('Navigating to statistics page...');
    await page.goto(sg.statistics_url, { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(r => setTimeout(r, 3000));

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

    // Get all text for parsing
    const allText = document.body.innerText;
    result.raw_text = allText.substring(0, 8000);

    // Find GB values
    const gbPattern = /(\d+\.?\d*)\s*GB/gi;
    const matches = allText.match(gbPattern);
    if (matches) result.gb_values = [...new Set(matches)];

    // Find percentage values near storage context
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

  // Save cookies for reuse
  const cookies = await page.browser().pages().then(pages => pages[0].cookies());

  console.log(JSON.stringify({
    status: 'success',
    url: page.url(),
    storage: storageData,
    screenshots: ['tmp/sg-04-statistics.png', 'tmp/sg-05-full.png']
  }, null, 2));
}

main();
