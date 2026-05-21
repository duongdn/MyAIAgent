/**
 * MISA MoneyKeeper — fetch financial data from dashboard
 *
 * Usage:
 *   node scripts/misa-money-report.js              # fetch & print data JSON
 *   node scripts/misa-money-report.js --login      # force re-login (clear session)
 *
 * Auth:
 *   Session cookies stored in config/.misa-session.json (gitignored).
 *   On first run (or expired session), opens headed browser for Google OAuth.
 *   Session reused on subsequent runs until expiry.
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const SESSION_FILE = path.join(__dirname, '../config/.misa-session.json');
const BASE_URL = 'https://moneykeeperapp.misa.vn';
const DASHBOARD_URL = `${BASE_URL}/management/dashboard`;
const CHROME_ARGS = ['--no-sandbox', '--disable-setuid-sandbox', '--disable-blink-features=AutomationControlled'];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function loadSession() {
  if (!fs.existsSync(SESSION_FILE)) return null;
  try {
    const data = JSON.parse(fs.readFileSync(SESSION_FILE, 'utf8'));
    // Treat session as expired if saved more than 12 hours ago
    if (Date.now() - (data.savedAt || 0) > 12 * 60 * 60 * 1000) return null;
    return data.cookies || null;
  } catch { return null; }
}

function saveSession(cookies) {
  const dir = path.dirname(SESSION_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(SESSION_FILE, JSON.stringify({ savedAt: Date.now(), cookies }, null, 2));
}

function clearSession() {
  if (fs.existsSync(SESSION_FILE)) fs.unlinkSync(SESSION_FILE);
}

/** Wait up to `timeout` ms for URL to match pattern */
async function waitForRedirect(page, pattern, timeout = 300000) {
  const re = typeof pattern === 'string' ? new RegExp(pattern) : pattern;
  return new Promise((resolve, reject) => {
    const deadline = setTimeout(() => reject(new Error(`Login timeout after ${timeout}ms`)), timeout);
    const check = async () => {
      if (re.test(page.url())) { clearTimeout(deadline); return resolve(); }
      setTimeout(check, 500);
    };
    check();
  });
}

// ─── Browser ─────────────────────────────────────────────────────────────────

async function launchBrowser(headless) {
  return puppeteer.launch({
    headless,
    executablePath: '/usr/bin/google-chrome',
    args: CHROME_ARGS,
    defaultViewport: { width: 1280, height: 800 },
  });
}

// ─── Login ───────────────────────────────────────────────────────────────────

async function interactiveLogin() {
  console.error('[misa] No valid session — opening browser for Google OAuth login...');
  console.error('[misa] Complete the login in the browser window, then wait.');

  const browser = await launchBrowser(false); // headed for OAuth
  const page = await browser.newPage();

  await page.goto(DASHBOARD_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });

  // Wait for user to complete Google OAuth and land back on dashboard
  await waitForRedirect(page, /\/management\/(dashboard|overview|home)/, 300000);

  const cookies = await page.cookies();
  await browser.close();

  if (!cookies.length) throw new Error('No cookies after login — something went wrong');
  saveSession(cookies);
  console.error('[misa] Login successful, session saved.');
  return cookies;
}

// ─── Scrape ──────────────────────────────────────────────────────────────────

async function scrapeDashboard(cookies) {
  const browser = await launchBrowser(true); // headless for data fetch
  const page = await browser.newPage();

  // Inject saved session cookies
  await page.setCookie(...cookies);
  await page.goto(DASHBOARD_URL, { waitUntil: 'networkidle2', timeout: 45000 });

  // Check if still on dashboard (not redirected to login)
  if (!page.url().includes('/management/')) {
    await browser.close();
    return null; // session expired
  }

  // Give JS-rendered content time to load
  await new Promise(r => setTimeout(r, 3000));

  // Extract financial data from the DOM
  const data = await page.evaluate(() => {
    const getText = sel => {
      const el = document.querySelector(sel);
      return el ? el.innerText.trim() : null;
    };
    const getAll = sel => [...document.querySelectorAll(sel)].map(el => el.innerText.trim());

    // Capture full visible text for fallback analysis
    const bodyText = document.body.innerText.slice(0, 8000);

    // Try to extract structured data via common patterns
    // MISA renders tables and cards — grab any monetary values visible
    const allNumbers = [];
    document.querySelectorAll('[class*="amount"], [class*="balance"], [class*="total"], [class*="money"], [class*="value"]').forEach(el => {
      const text = el.innerText.trim();
      if (text) allNumbers.push({ class: el.className.slice(0, 60), text });
    });

    // Grab table rows if any
    const tableData = [];
    document.querySelectorAll('table tr').forEach(row => {
      const cells = [...row.querySelectorAll('td, th')].map(c => c.innerText.trim());
      if (cells.length > 0 && cells.some(c => c.length > 0)) tableData.push(cells);
    });

    // Grab card/widget titles with their values
    const cards = [];
    document.querySelectorAll('[class*="card"], [class*="widget"], [class*="panel"], [class*="box"]').forEach(el => {
      const text = el.innerText.trim().slice(0, 200);
      if (text.length > 5) cards.push(text);
    });

    return { url: location.href, bodyText, allNumbers, tableData, cards: [...new Set(cards)].slice(0, 20) };
  });

  // Take screenshot for visual reference
  const screenshotPath = path.join(__dirname, '../tmp/misa-dashboard.png');
  await page.screenshot({ path: screenshotPath, fullPage: false });

  await browser.close();
  return { ...data, screenshotPath };
}

// ─── Main ─────────────────────────────────────────────────────────────────────

(async () => {
  const forceLogin = process.argv.includes('--login');

  if (forceLogin) {
    clearSession();
    console.error('[misa] Cleared session for fresh login.');
  }

  let cookies = loadSession();

  try {
    if (!cookies) {
      cookies = await interactiveLogin();
    }

    let data = await scrapeDashboard(cookies);

    if (!data) {
      // Session was stale — re-login once
      console.error('[misa] Session expired, re-authenticating...');
      clearSession();
      cookies = await interactiveLogin();
      data = await scrapeDashboard(cookies);
    }

    if (!data) throw new Error('Failed to fetch dashboard data after re-login');

    console.log(JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('[misa] Error:', err.message);
    process.exit(1);
  }
})();
