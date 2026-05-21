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

/** Extract financial data from the dashboard page */
async function extractData(page) {
  // Give the SPA time to render fully
  await new Promise(r => setTimeout(r, 3500));

  return page.evaluate(() => {
    // Full visible text — primary source for AI parsing
    const bodyText = document.body.innerText.slice(0, 10000);

    // Elements with monetary CSS class hints
    const amountEls = [];
    document.querySelectorAll('[class*="amount"], [class*="balance"], [class*="total"], [class*="money"], [class*="value"], [class*="Price"], [class*="Revenue"]').forEach(el => {
      const text = el.innerText.trim();
      if (text && text.length < 100) amountEls.push({ cls: el.className.slice(0, 80), text });
    });

    // Table data
    const tables = [];
    document.querySelectorAll('table').forEach(table => {
      const rows = [];
      table.querySelectorAll('tr').forEach(row => {
        const cells = [...row.querySelectorAll('td, th')].map(c => c.innerText.trim());
        if (cells.some(c => c.length > 0)) rows.push(cells);
      });
      if (rows.length > 0) tables.push(rows);
    });

    // Card / widget blocks (deduplicated, capped)
    const seen = new Set();
    const cards = [];
    document.querySelectorAll('[class*="card"], [class*="widget"], [class*="panel"], [class*="summary"]').forEach(el => {
      const text = el.innerText.trim().slice(0, 300);
      if (text.length > 10 && !seen.has(text)) { seen.add(text); cards.push(text); }
    });

    return {
      url: location.href,
      bodyText,
      amountEls: amountEls.slice(0, 50),
      tables: tables.slice(0, 10),
      cards: cards.slice(0, 25),
    };
  });
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
        console.log(JSON.stringify(data, null, 2));
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

    console.log(JSON.stringify(data, null, 2));
  } catch (err) {
    if (browser) await browser.close().catch(() => {});
    console.error('[misa] Error:', err.message);
    process.exit(1);
  }
})();
