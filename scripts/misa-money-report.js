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

/** Navigate to the accounts page, return actual URL */
async function gotoAccountsPage(page) {
  const BASE = 'https://moneykeeperapp.misa.vn';
  // Direct known URL first (discovered from previous run)
  for (const candidate of ['/management/wallet', '/management/account', '/management/accounts']) {
    await page.goto(`${BASE}${candidate}`, { waitUntil: 'networkidle2', timeout: 20000 });
    await wait(1500);
    if (!page.url().includes('/dashboard')) return page.url();
  }
  return page.url();
}

/** Expand rows-per-page to 50 to show all records on fewer pages */
async function expandRowsPerPage(page) {
  // Click the combobox border to open the dropdown
  await page.evaluate(() => {
    const combo = document.querySelector('.combo-pageSize .border');
    if (combo) combo.click();
  });
  await wait(800);

  // Click the "50" option (largest available)
  const picked = await page.evaluate(() => {
    const li = [...document.querySelectorAll('li')].find(el => el.innerText.trim() === '50');
    if (li) { li.click(); return true; }
    return false;
  });

  if (picked) {
    await wait(2000);
    console.error('[misa] Set rows/page to 50');
  }
  return picked;
}

/** Paginate through all pages of a tab and collect all bodyText snapshots */
async function scrapeAllPages(page) {
  // First try to expand rows per page to show all at once
  await expandRowsPerPage(page);
  await wait(1500);

  const pages = [];
  for (let i = 0; i < 30; i++) { // max 30 pages guard
    await wait(1500);
    const snap = await page.evaluate(() => {
      const bodyText = document.body.innerText.slice(0, 20000);
      const moneyEls = [];
      document.querySelectorAll('[class*="amount"], [class*="balance"], [class*="total"], [class*="money"], [class*="value"]').forEach(el => {
        const text = el.innerText.trim();
        if (text && text.length < 120) moneyEls.push({ cls: el.className.slice(0, 80), text });
      });
      return { url: location.href, bodyText, moneyEls: moneyEls.slice(0, 80) };
    });
    pages.push(snap);

    // Click next page arrow (icon-arrow-next, enabled only when not on last page)
    const hasNext = await page.evaluate(() => {
      const btn = document.querySelector('i.icon-arrow-next:not([disabled="true"])');
      if (btn) {
        const wrapper = btn.closest('[class*="ms-icon"]') || btn.parentElement;
        if (wrapper && wrapper.getAttribute('disabled') !== 'true') {
          wrapper.click();
          return true;
        }
      }
      return false;
    });
    if (!hasNext) break;
  }
  return pages;
}

/** Filter by status "Đang hoạt động" to reduce result set */
async function filterActiveOnly(page) {
  // Click the Trạng thái combobox (Status filter)
  const opened = await page.evaluate(() => {
    const combos = [...document.querySelectorAll('.ms-combobox .border')];
    // Find the one with "Tất cả" related to Trạng thái
    const label = [...document.querySelectorAll('label, span, div')]
      .find(el => el.innerText.trim() === 'Trạng thái:');
    if (label) {
      const combo = label.parentElement?.querySelector?.('.border') ||
                    label.nextElementSibling?.querySelector?.('.border');
      if (combo) { combo.click(); return true; }
    }
    // Fallback: click second combobox (Status is usually 2nd filter)
    if (combos[1]) { combos[1].click(); return true; }
    return false;
  });
  if (!opened) return false;
  await wait(800);

  // Click "Đang hoạt động" option
  const picked = await page.evaluate(() => {
    const li = [...document.querySelectorAll('li')]
      .find(el => el.innerText.trim() === 'Đang hoạt động');
    if (li) { li.click(); return true; }
    return false;
  });
  if (picked) await wait(2000);
  return picked;
}

/** Intercept the JWT bearer token via CDP Network events (no interception needed) */
async function captureAuthToken(page, timeoutMs = 15000) {
  const client = await page.createCDPSession();
  await client.send('Network.enable');

  return new Promise((resolve) => {
    const timer = setTimeout(async () => {
      await client.detach().catch(() => {});
      resolve(null);
    }, timeoutMs);

    client.on('Network.requestWillBeSent', async (event) => {
      const url = event.request.url;
      if (url.includes('/api/v1/') || url.includes('/api/business/')) {
        const auth = event.request.headers?.['Authorization'] || event.request.headers?.['authorization'];
        if (auth && auth.startsWith('Bearer ')) {
          clearTimeout(timer);
          await client.detach().catch(() => {});
          resolve(auth);
        }
      }
    });
  });
}

/** Fetch all data via the app's internal API using captured JWT */
async function fetchViaApi(page, authToken) {
  const BASE_API = 'https://moneykeeperapp.misa.vn/g1/api/business/api/v1';

  return page.evaluate(async (baseApi, token) => {
    const post = async (path, body = {}) => {
      const res = await fetch(baseApi + path, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify(body),
      });
      if (!res.ok) return null;
      return res.json();
    };

    const listBody = { searchText: '', walletType: null, inActive: null, excludeReport: null, skip: 0, take: 200 };

    // All regular accounts
    const accounts = await post('/wallets/accounts', listBody);
    const accountSummary = await post('/wallets/account/summary', {});

    // All savings books
    const savings = await post('/wallets/savings', listBody);
    const savingsSummary = await post('/wallets/saving/summary', {});

    // Monthly summary (current month)
    const now = new Date();
    const fromDate = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().slice(0, 10);
    const toDate = now.toISOString().slice(0, 10);
    const monthlySummary = await post('/records/summary', { fromDate, toDate });

    return { accounts, accountSummary, savings, savingsSummary, monthlySummary };
  }, BASE_API, authToken);
}

/** Extract data from dashboard + API */
async function extractData(page) {
  // 1. Dashboard snapshot (for context + recent transactions)
  await wait(3500);
  const dashboard = await snapPage(page);

  // 2. Start listening for JWT before navigating (CDP sees headers of outgoing requests)
  const tokenPromise = captureAuthToken(page, 20000);
  await gotoAccountsPage(page);
  let capturedToken = await tokenPromise;

  if (!capturedToken) {
    // Fallback: reload to trigger the app's own API calls
    console.error('[misa] Token not captured, reloading to trigger API calls...');
    const retryPromise = captureAuthToken(page, 15000);
    await page.reload({ waitUntil: 'networkidle2' });
    capturedToken = await retryPromise;
  }

  if (!capturedToken) throw new Error('Failed to capture auth token — cannot call API');
  console.error('[misa] Auth token captured. Fetching data via API...');

  // 3. Fetch all data via internal API
  const apiData = await fetchViaApi(page, capturedToken);

  return { dashboard, apiData };
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
