/**
 * MISA MoneyKeeper — fetch financial data from dashboard
 *
 * Usage:
 *   node scripts/misa-money-report.js              # fetch & print data JSON
 *   node scripts/misa-money-report.js --login      # force re-login (wipe profile)
 *
 * Auth strategy: persistent Chrome profile in tmp/misa-chrome-profile/
 *   - First run: opens headed Chrome → user completes Google OAuth → profile saved
 *   - Subsequent runs: headless with saved profile → already authenticated
 *   - Profile is gitignored (tmp/) so it stays per-machine
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const PROFILE_DIR = path.join(__dirname, '../tmp/misa-chrome-profile');
const DASHBOARD_URL = 'https://moneykeeperapp.misa.vn/management/dashboard';
const CHROME_ARGS = [
  '--no-sandbox',
  '--disable-setuid-sandbox',
  '--disable-blink-features=AutomationControlled',
  `--user-data-dir=${PROFILE_DIR}`,
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function clearProfile() {
  if (fs.existsSync(PROFILE_DIR)) {
    fs.rmSync(PROFILE_DIR, { recursive: true, force: true });
    console.error('[misa] Chrome profile cleared.');
  }
}

async function launchBrowser(headless) {
  return puppeteer.launch({
    headless,
    executablePath: '/usr/bin/google-chrome',
    args: CHROME_ARGS,
    defaultViewport: { width: 1280, height: 800 },
  });
}

/** Poll until page URL matches regex, or timeout */
async function waitForUrl(page, pattern, timeout = 300000) {
  const re = new RegExp(pattern);
  const start = Date.now();
  while (Date.now() - start < timeout) {
    if (re.test(page.url())) return;
    await new Promise(r => setTimeout(r, 800));
  }
  throw new Error(`Timed out waiting for URL to match ${pattern}. Last URL: ${page.url()}`);
}

const wait = ms => new Promise(r => setTimeout(r, ms));

/** Grab full visible text + money elements from current page state */
async function snapPage(page) {
  await wait(2000);
  return page.evaluate(() => {
    const bodyText = document.body.innerText.slice(0, 15000);
    const moneyEls = [];
    document.querySelectorAll('[class*="amount"], [class*="balance"], [class*="total"], [class*="money"], [class*="value"]').forEach(el => {
      const text = el.innerText.trim();
      if (text && text.length < 120) moneyEls.push({ cls: el.className.slice(0, 80), text });
    });
    return { url: location.href, bodyText, moneyEls: moneyEls.slice(0, 80) };
  });
}

/** Click element by exact inner text, return true if found */
async function clickByText(page, text) {
  return page.evaluate((label) => {
    const el = [...document.querySelectorAll('a, button, [role="tab"], li, span, div')]
      .find(e => e.innerText.trim() === label);
    if (el) { el.click(); return true; }
    return false;
  }, text);
}

/** Click "Xem thêm" / "Xem tất cả" buttons until none remain */
async function expandAll(page) {
  for (let i = 0; i < 10; i++) {
    const clicked = await page.evaluate(() => {
      const btn = [...document.querySelectorAll('a, button, span')]
        .find(e => /Xem thêm|Xem tất cả/.test(e.innerText.trim()));
      if (btn) { btn.click(); return true; }
      return false;
    });
    if (!clicked) break;
    await wait(1500);
  }
}

/** Navigate to accounts page via the nav menu link, return actual URL */
async function gotoAccountsPage(page) {
  // Try clicking "Tài khoản" in the sidebar nav to get the real URL
  const BASE = 'https://moneykeeperapp.misa.vn';
  const navClicked = await page.evaluate(() => {
    // Find nav link with exactly "Tài khoản" text (not sub-items)
    const links = [...document.querySelectorAll('nav a, aside a, [class*="nav"] a, [class*="sidebar"] a, [class*="menu"] a')];
    const link = links.find(a => a.innerText.trim() === 'Tài khoản');
    if (link) { link.click(); return link.href || true; }
    return false;
  });

  await wait(2000);
  const currentUrl = page.url();

  // If nav click didn't navigate (SPA might need direct URL), try known routes
  if (!navClicked || currentUrl.includes('/dashboard')) {
    for (const candidate of ['/management/account', '/management/accounts', '/management/wallet']) {
      await page.goto(`${BASE}${candidate}`, { waitUntil: 'networkidle2', timeout: 20000 });
      await wait(1500);
      if (!page.url().includes('/dashboard')) break;
    }
  }

  return page.url();
}

/** Extract data from dashboard + full accounts page (all tabs + expanded) */
async function extractData(page) {
  // 1. Dashboard snapshot
  await wait(3500);
  const dashboard = await snapPage(page);

  // 2. Navigate to dedicated accounts page
  const accountsUrl = await gotoAccountsPage(page);
  console.error(`[misa] Accounts page: ${accountsUrl}`);

  // Expand all "Xem thêm" on the default tab first
  await expandAll(page);
  const regularAccounts = await snapPage(page);

  // 3. Click "Sổ tiết kiệm" tab and expand
  const hasSavings = await clickByText(page, 'Sổ tiết kiệm');
  await wait(2000);
  if (hasSavings) await expandAll(page);
  const savings = hasSavings ? await snapPage(page) : null;

  // 4. Click "Tích lũy" tab and expand
  await clickByText(page, 'Tích lũy');
  await wait(2000);
  await expandAll(page);
  const accumulation = await snapPage(page);

  return {
    dashboard,
    accountsPage: { url: accountsUrl, regularAccounts, savings, accumulation },
  };
}

// ─── Main ─────────────────────────────────────────────────────────────────────

(async () => {
  const forceLogin = process.argv.includes('--login');
  if (forceLogin) clearProfile();

  // Ensure profile dir exists (puppeteer needs the parent to exist)
  fs.mkdirSync(path.dirname(PROFILE_DIR), { recursive: true });

  // First attempt: headless with saved profile (fast path for repeat runs)
  const hasProfile = fs.existsSync(PROFILE_DIR) && fs.readdirSync(PROFILE_DIR).length > 0;

  let browser;
  let data;

  try {
    if (hasProfile && !forceLogin) {
      // Try headless — profile may have a valid Google session
      console.error('[misa] Trying headless with saved profile...');
      browser = await launchBrowser(true);
      const page = await browser.newPage();
      await page.goto(DASHBOARD_URL, { waitUntil: 'networkidle2', timeout: 40000 });

      if (page.url().includes('/management/')) {
        // Already authenticated
        console.error('[misa] Session valid — scraping headlessly.');
        data = await extractData(page);
        const screenshotPath = path.join(__dirname, '../tmp/misa-dashboard.png');
        await page.screenshot({ path: screenshotPath, fullPage: false });
        data.screenshotPath = screenshotPath;
        await browser.close();
        process.stdout.write(JSON.stringify(data, null, 2));
        return;
      }

      // Redirected to login — fall through to headed login
      console.error(`[misa] Headless redirected to: ${page.url()} — switching to headed login.`);
      await browser.close();
    }

    // Headed login — opens visible Chrome for Google OAuth
    console.error('[misa] Opening browser for Google OAuth login...');
    console.error('[misa] Log in with Google, then the window will close automatically.');

    browser = await launchBrowser(false);
    const page = await browser.newPage();
    await page.goto(DASHBOARD_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });

    // Wait for user to finish OAuth and land on dashboard
    if (!page.url().includes('/management/')) {
      await waitForUrl(page, '/management/', 300000);
    }

    console.error('[misa] Login detected — scraping data...');
    data = await extractData(page);

    const screenshotPath = path.join(__dirname, '../tmp/misa-dashboard.png');
    await page.screenshot({ path: screenshotPath, fullPage: false });
    data.screenshotPath = screenshotPath;

    await browser.close();

    process.stdout.write(JSON.stringify(data, null, 2));
  } catch (err) {
    if (browser) await browser.close().catch(() => {});
    console.error('[misa] Error:', err.message);
    process.exit(1);
  }
})();
