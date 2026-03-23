#!/usr/bin/env node
// Upwork login via Puppeteer + stealth + persistent profile
// First run (--login): opens visible browser, auto-fills credentials, user handles CAPTCHA if needed
// Subsequent runs: headless with saved session
// Usage: node scripts/upwork-login.js [--login] [--account=NAME]

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const fs = require('fs');
const path = require('path');

const CONFIG_PATH = path.join(__dirname, '..', 'config', '.upwork-config.json');
const SCREENSHOT_DIR = path.join(__dirname, '..', 'tmp');

const forceLogin = process.argv.includes('--login');
const accountArg = process.argv.find(a => a.startsWith('--account='));
const accountName = accountArg ? accountArg.split('=')[1] : null;

async function main() {
  if (!fs.existsSync(CONFIG_PATH)) {
    console.error('ERROR: config/.upwork-config.json not found');
    process.exit(1);
  }
  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
  const account = accountName
    ? config.accounts.find(a => a.name === accountName)
    : config.accounts[0];

  if (!account) {
    console.error('ERROR: Account not found. Available:', config.accounts.map(a => a.name).join(', '));
    process.exit(1);
  }

  const profileDir = path.join(__dirname, '..', 'tmp', `upwork-profile-${account.name}`);
  if (!fs.existsSync(SCREENSHOT_DIR)) fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

  const hasProfile = fs.existsSync(path.join(profileDir, 'Default'));
  const needsLogin = forceLogin || !hasProfile;

  console.error(needsLogin
    ? `Opening visible browser for Upwork login (${account.name})...`
    : `Using saved session for ${account.name} (headless)...`);

  const browser = await puppeteer.launch({
    headless: needsLogin ? false : 'new',
    userDataDir: profileDir,
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
    const loginUrl = 'https://www.upwork.com/ab/account-security/login';
    console.error('Navigating to Upwork login...');
    await page.goto(loginUrl, { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(r => setTimeout(r, 3000));

    let url = page.url();
    console.error('Current URL:', url);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, `upwork-${account.name}-01.png`) });

    const isLoginPage = url.includes('login') || url.includes('account-security');

    if (!isLoginPage) {
      console.error('Already authenticated!');
    } else if (!needsLogin) {
      console.error('SESSION_EXPIRED: Run with --login flag');
      console.log(JSON.stringify({ status: 'session_expired', message: `Run: node scripts/upwork-login.js --login --account=${account.name}` }));
      await browser.close();
      process.exit(2);
    } else {
      // Step 1: Enter username
      console.error('Filling username...');
      const usernameInput = await page.$('input#login_username');
      if (usernameInput) {
        await usernameInput.click({ clickCount: 3 });
        await usernameInput.type(account.username, { delay: 40 });
        await new Promise(r => setTimeout(r, 500));

        // Click "Continue with Email" button
        const continueBtn = await page.$('button#login_password_continue');
        if (continueBtn) {
          await continueBtn.click();
          console.error('Clicked Continue...');
          await new Promise(r => setTimeout(r, 3000));
        }
      }

      await page.screenshot({ path: path.join(SCREENSHOT_DIR, `upwork-${account.name}-02.png`) });
      url = page.url();
      console.error('After username, URL:', url);

      // Step 2: Enter password (Upwork has a two-step login)
      const passwordInput = await page.$('input#login_password');
      if (passwordInput) {
        console.error('Filling password...');
        await passwordInput.click({ clickCount: 3 });
        await passwordInput.type(account.password, { delay: 40 });
        await new Promise(r => setTimeout(r, 500));

        const loginBtn = await page.$('button#login_control_continue');
        if (loginBtn) {
          await loginBtn.click();
          console.error('Clicked Log In...');
        }
        await new Promise(r => setTimeout(r, 5000));
      }

      await page.screenshot({ path: path.join(SCREENSHOT_DIR, `upwork-${account.name}-03.png`) });
      url = page.url();
      console.error('After password, URL:', url);

      // Step 3: Handle secret answer challenge if present
      const secretInput = await page.$('input#login_answer');
      if (secretInput && account.secret_answer) {
        console.error('Secret answer challenge detected, filling...');
        await secretInput.click({ clickCount: 3 });
        await secretInput.type(account.secret_answer, { delay: 40 });
        await new Promise(r => setTimeout(r, 500));

        const continueBtn2 = await page.$('button#login_control_continue');
        if (continueBtn2) {
          await continueBtn2.click();
          console.error('Submitted secret answer...');
        }
        await new Promise(r => setTimeout(r, 5000));
      }

      await page.screenshot({ path: path.join(SCREENSHOT_DIR, `upwork-${account.name}-04.png`) });
      url = page.url();
      console.error('After auth steps, URL:', url);

      // If still on login page, wait for manual intervention (CAPTCHA, 2FA)
      if (url.includes('login') || url.includes('account-security')) {
        console.error('');
        console.error('=== MANUAL STEP REQUIRED ===');
        console.error('Complete any remaining challenge (CAPTCHA/2FA) in the browser.');
        console.error('Waiting up to 3 minutes...');
        console.error('');

        let attempts = 0;
        while (attempts < 90) {
          await new Promise(r => setTimeout(r, 2000));
          url = page.url();
          if (!url.includes('login') && !url.includes('account-security')) break;
          attempts++;
        }

        if (url.includes('login') || url.includes('account-security')) {
          console.error('Login timeout');
          await page.screenshot({ path: path.join(SCREENSHOT_DIR, `upwork-${account.name}-timeout.png`) });
          console.log(JSON.stringify({ status: 'login_timeout' }));
          await browser.close();
          process.exit(1);
        }
      }

      console.error('Login successful! URL:', url);
      await new Promise(r => setTimeout(r, 3000));
    }

    // Authenticated — take screenshot
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, `upwork-${account.name}-dashboard.png`) });
    console.error('Dashboard screenshot saved');

    // Navigate to time reports
    console.error('Navigating to time reports...');
    await page.goto('https://www.upwork.com/reports/time', { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(r => setTimeout(r, 3000));

    url = page.url();
    console.error('Reports URL:', url);

    if (url.includes('login') || url.includes('account-security')) {
      console.error('Redirected to login — session invalid');
      console.log(JSON.stringify({ status: 'session_invalid', url }));
      await browser.close();
      process.exit(2);
    }

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, `upwork-${account.name}-reports.png`) });

    // Extract page data
    const pageData = await page.evaluate(() => ({
      title: document.title,
      url: window.location.href,
      text: document.body.innerText.substring(0, 10000),
    }));

    console.log(JSON.stringify({
      status: 'success',
      account: account.name,
      url: pageData.url,
      title: pageData.title,
      text_preview: pageData.text.substring(0, 3000),
      screenshots: [
        `tmp/upwork-${account.name}-dashboard.png`,
        `tmp/upwork-${account.name}-reports.png`,
      ],
    }, null, 2));

  } catch (err) {
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, `upwork-${account.name}-error.png`) }).catch(() => {});
    console.error('Error:', err.message);
    console.log(JSON.stringify({ status: 'error', error: err.message }));
    process.exit(1);
  } finally {
    await browser.close();
  }
}

main();
