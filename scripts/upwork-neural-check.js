#!/usr/bin/env node
// Upwork Neural workroom check — injects a real, human-authenticated session
// (extracted from carrick's actual Chrome profile via get-carrick-upwork-cookies.py)
// instead of driving a Puppeteer login, which Upwork's fraud-detection engine
// soft-rejects ("technical difficulties") before password submit, every time,
// regardless of stealth plugin / profile-reuse tricks (see docs/memory/daily-report/upwork).
//
// carrick's real session tokens are short-lived and rotate while he's actively
// using that Chrome profile, so a single snapshot can be stale by the time
// Puppeteer uses it — retries with a fresh extraction each time.
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const _tmpDir = path.join(__dirname, '..', 'tmp', 'chrome-tmp');
fs.mkdirSync(_tmpDir, { recursive: true });
process.env.TMPDIR = _tmpDir;

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const SCREENSHOT_DIR = path.join(__dirname, '..', 'tmp');
const COOKIE_JSON = '/tmp/carrick-upwork-cookies.json';
const WORKROOM_URL = 'https://www.upwork.com/nx/wm/workroom/38901192/messages';
const MESSAGES_API_FRAGMENT = '/stories/simplified';
const MAX_ATTEMPTS = 4;

function extractFreshCookies() {
  execSync('.claude/skills/.venv/bin/python3 scripts/get-carrick-upwork-cookies.py', {
    cwd: path.join(__dirname, '..'),
    stdio: 'inherit',
  });
  return JSON.parse(fs.readFileSync(COOKIE_JSON, 'utf8'))
    .filter(c => c.name && c.value && c.domain && /^[!#-+\--:<-\[\]-~]+$/.test(c.value))
    .map(c => ({ name: c.name, value: c.value, domain: c.domain, path: c.path, secure: c.secure }));
}

async function attempt(browser) {
  const page = await browser.newPage();
  await page.setCookie(...extractFreshCookies());

  let apiMessages = null;
  page.on('response', async (res) => {
    if (apiMessages || res.request().method() !== 'GET' || !res.url().includes(MESSAGES_API_FRAGMENT)) return;
    try {
      const json = await res.json();
      if (json && json.stories) apiMessages = json.stories;
    } catch (_) {}
  });

  await page.goto(WORKROOM_URL, { waitUntil: 'networkidle2', timeout: 30000 }).catch(() => {});
  await new Promise(r => setTimeout(r, 4000));

  const url = page.url();
  const loggedOut = url.includes('login') || url.includes('account-security');
  await page.close();
  return { loggedOut, apiMessages };
}

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: '/usr/bin/google-chrome',
    defaultViewport: { width: 1280, height: 900 },
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  let result = null;
  for (let i = 1; i <= MAX_ATTEMPTS; i++) {
    console.log(`[NEURAL] Attempt ${i}/${MAX_ATTEMPTS}: fresh cookie extraction + navigate...`);
    result = await attempt(browser);
    if (!result.loggedOut && result.apiMessages) break;
    console.log(`[NEURAL] Attempt ${i} ${result.loggedOut ? 'hit login redirect (session snapshot stale)' : 'no messages captured'} — retrying...`);
    await new Promise(r => setTimeout(r, 2000));
  }
  await browser.close();

  if (!result || result.loggedOut || !result.apiMessages) {
    console.log(`[NEURAL] All ${MAX_ATTEMPTS} attempts failed to get a stable authenticated session.`);
    console.log('[NEURAL] carrick\'s real Chrome (Profile 1) session may be logged out — needs a real login there once, not a Puppeteer login.');
    process.exit(2);
  }

  const messages = result.apiMessages
    .filter(m => !m.isSystemStory)
    .sort((a, b) => b.created - a.created)
    .slice(0, 20);

  console.log(`[NEURAL] ${messages.length} recent messages (newest first):`);
  messages.forEach(m => {
    const ts = new Date(m.created).toISOString();
    const text = (m.message || '').replace(/<@\d+:\d+\|([^>]+)>/g, '@$1');
    console.log(`  [${ts}] user ${m.userId}: ${text.slice(0, 300)}`);
  });

  process.exit(0);
})().catch(e => {
  console.error('Fatal:', e.message);
  process.exit(1);
});
