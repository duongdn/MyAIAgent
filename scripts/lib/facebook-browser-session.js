/**
 * Shared Facebook browser session: launches Chrome (headful under Xvfb) with the
 * logged-in profile at tmp/facebook-profile. Never touches the user's real desktop —
 * always uses a private Xvfb display (:90).
 */
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const fs = require('fs');
const path = require('path');
const { spawn, spawnSync } = require('child_process');

const FB_PROFILE_DIR = path.join(__dirname, '..', '..', 'tmp', 'facebook-profile');
const PRIVATE_DISPLAY = ':90';

function cleanSingletons() {
  ['SingletonLock', 'SingletonCookie', 'SingletonSocket'].forEach(f => {
    try { fs.unlinkSync(path.join(FB_PROFILE_DIR, f)); } catch {}
  });
}

// Always use our own Xvfb so automation can't send input into the user's live desktop
async function ensurePrivateDisplay() {
  process.env.DISPLAY = PRIVATE_DISPLAY;
  if (fs.existsSync('/tmp/.X11-unix/X90')) return;
  const xvfb = spawn('Xvfb', [PRIVATE_DISPLAY, '-screen', '0', '1280x900x24', '-ac'], { stdio: 'ignore', detached: true });
  xvfb.unref();
  for (let i = 0; i < 20 && !fs.existsSync('/tmp/.X11-unix/X90'); i++) {
    await new Promise(r => setTimeout(r, 150));
  }
}

// FB periodically logs the automation profile out ("Continue / Use another profile").
// The user stays logged in in their real Chrome (Profile 9), so copy those cookies in on
// every launch. If that fails we fall back to whatever session the profile still has.
async function seedCookiesFromRealChrome(page) {
  const root = path.join(__dirname, '..', '..');
  // miniconda python has browser_cookie3; system/venv pythons break on lz4 (3.12 vs 3.13 build)
  const py = ['/home/nus/miniconda3/bin/python3'].find(p => fs.existsSync(p)) || 'python3';
  const exported = spawnSync(py, [path.join(root, 'scripts', 'get-chrome-profile9-site-cookies.py'), 'facebook'], { encoding: 'utf-8' });
  const file = path.join(root, 'tmp', 'facebook-cookies.json');
  if (exported.status !== 0 || !fs.existsSync(file)) {
    console.error(`[facebook] Profile 9 cookie export failed: ${(exported.stderr || '').trim()}`);
    return;
  }
  await page.setCookie(...JSON.parse(fs.readFileSync(file, 'utf-8')));
}

async function openFacebookSession() {
  await ensurePrivateDisplay();
  cleanSingletons();
  const browser = await puppeteer.launch({
    executablePath: fs.existsSync('/opt/google/chrome/chrome') ? '/opt/google/chrome/chrome' : '/usr/bin/google-chrome',
    headless: false,
    args: [
      `--user-data-dir=${FB_PROFILE_DIR}`,
      '--window-size=1280,900',
      '--no-sandbox',
      '--disable-dev-shm-usage',
      '--disable-blink-features=AutomationControlled',
      '--disable-notifications',
    ],
    env: { ...process.env },
    ignoreDefaultArgs: ['--enable-automation'],
    defaultViewport: { width: 1280, height: 900 },
  });
  const page = await browser.newPage();
  await page.evaluateOnNewDocument(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
  });
  await seedCookiesFromRealChrome(page);
  return { browser, page };
}

// Also catches the "Continue / Use another profile" saved-account screen, which keeps the /me URL
async function assertLoggedIn(page) {
  const url = page.url();
  const savedAccountScreen = await page.evaluate(() => /Use another profile|Dùng trang cá nhân khác/.test(document.body.innerText)).catch(() => false);
  if (url.includes('/login') || url.includes('/checkpoint') || savedAccountScreen) {
    throw new Error(`not_logged_in (${url}) — run: node scripts/facebook-page-scraper.js --login`);
  }
}

module.exports = { openFacebookSession, assertLoggedIn };
