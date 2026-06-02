#!/usr/bin/env node
// Fetch weekly hours from Upwork workrooms for comparison with task logs
// Uses saved browser session (run upwork-login.js --login first)
// Usage: node scripts/upwork-weekly-hours.js [--week=current|last] [--workroom=NAME]
// Output: JSON with daily hours per workroom

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const fs = require('fs');
const path = require('path');

const CONFIG_PATH = path.join(__dirname, '..', 'config', '.upwork-config.json');
const SCREENSHOT_DIR = path.join(__dirname, '..', 'tmp');

const workroomArg = process.argv.find(a => a.startsWith('--workroom='));
const workroomFilter = workroomArg ? workroomArg.split('=')[1] : null;

async function main() {
  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
  const workrooms = workroomFilter
    ? config.workrooms.filter(w => w.name.toLowerCase() === workroomFilter.toLowerCase())
    : config.workrooms;

  if (!workrooms.length) {
    console.error('No workrooms found');
    process.exit(1);
  }

  // Group by account to share browser sessions
  const byAccount = {};
  for (const w of workrooms) {
    const acc = w.account || config.accounts[0].name;
    if (!byAccount[acc]) byAccount[acc] = [];
    byAccount[acc].push(w);
  }

  const results = [];

  for (const [accountName, rooms] of Object.entries(byAccount)) {
    const profileDir = path.join(__dirname, '..', 'tmp', `upwork-profile-${accountName}`);
    if (!fs.existsSync(path.join(profileDir, 'Default'))) {
      console.error(`No saved session for ${accountName}. Run: node scripts/upwork-login.js --login --account=${accountName}`);
      continue;
    }

    const account = config.accounts.find(a => a.name === accountName);

    const SOCKS_DIR = path.join(__dirname, '..', 'tmp', 'chrome-socks');
    fs.mkdirSync(SOCKS_DIR, { recursive: true });

    // Run headless (no X server in cron). Session may fail Cloudflare fingerprint check.
    const browser = await puppeteer.launch({
      headless: 'new',
      userDataDir: profileDir,
      env: { ...process.env, TMPDIR: SOCKS_DIR },
      args: [
        '--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage',
        '--disable-blink-features=AutomationControlled', '--window-size=1280,900',
        '--disable-gpu',
      ],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 900 });
    await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36');

    // Attempt headless re-login once if session expired
    let loggedIn = false;
    for (const room of rooms) {
      try {
        let data = await fetchWorkroomHours(page, room);
        if (data.status === 'session_expired' && !loggedIn && account) {
          console.error(`Session expired for ${accountName}, attempting headless re-login...`);
          const loginOk = await headlessLogin(page, account);
          loggedIn = true;
          if (loginOk) {
            data = await fetchWorkroomHours(page, room);
          } else {
            data = { workroom: room.name, status: 'login_failed', error: 'Headless re-login failed (CAPTCHA/2FA needed). Run: node scripts/upwork-login.js --login --account=' + accountName };
          }
        }
        results.push(data);
      } catch (err) {
        console.error(`Error fetching ${room.name}:`, err.message);
        results.push({ workroom: room.name, status: 'error', error: err.message });
      }
    }

    await browser.close();
  }

  console.log(JSON.stringify(results, null, 2));
}

// Attempt headless credential login. Returns true if landed on authenticated page.
// Only works if Upwork doesn't challenge with CAPTCHA/2FA (common for short-expiry sessions).
async function headlessLogin(page, account) {
  try {
    await page.goto('https://www.upwork.com/nx/login', { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(r => setTimeout(r, 2000));

    // Fill username
    await page.waitForSelector('input[name="login[username]"]', { timeout: 8000 });
    await page.type('input[name="login[username]"]', account.username, { delay: 50 });
    await page.click('button[data-qa="btn-next"]');
    await new Promise(r => setTimeout(r, 2000));

    // Fill password
    await page.waitForSelector('input[name="login[password]"]', { timeout: 8000 });
    await page.type('input[name="login[password]"]', account.password, { delay: 50 });
    await page.click('button[data-qa="btn-submit"]');
    await new Promise(r => setTimeout(r, 5000));

    const url = page.url();
    const authenticated = !url.includes('login') && !url.includes('account-security');
    console.error(`Headless login result for ${account.name}: ${authenticated ? 'SUCCESS' : 'NEEDS_CAPTCHA'} (${url})`);
    return authenticated;
  } catch (err) {
    console.error(`Headless login error for ${account.name}:`, err.message);
    return false;
  }
}

async function fetchWorkroomHours(page, room) {
  const timesheetUrl = `https://www.upwork.com/nx/wm/workroom/${room.workroom_id}/timesheet`;
  console.error(`Fetching ${room.name} (${room.workroom_id})...`);

  // Primary data source: intercept GraphQL providerTimeReport (structured YYYYMMDD + decimal hours)
  let apiTimeReport = null;
  const responseHandler = async (response) => {
    if (response.url().includes('providerTimeReport')) {
      try { apiTimeReport = await response.json(); } catch (_) {}
    }
  };
  page.on('response', responseHandler);

  // domcontentloaded required — Upwork SPA never reaches networkidle2 reliably
  await page.goto(timesheetUrl, { waitUntil: 'domcontentloaded', timeout: 40000 });
  await new Promise(r => setTimeout(r, 8000));
  page.off('response', responseHandler);

  const currentUrl = page.url();
  if (currentUrl.includes('login') || currentUrl.includes('account-security')) {
    return { workroom: room.name, status: 'session_expired' };
  }

  const pageText = await page.evaluate(() => document.body.innerText);

  // Cloudflare challenge: text too short with CF markers
  if (pageText.length < 500 && (pageText.includes('Cloudflare') || pageText.includes('Ray ID') || currentUrl.includes('__cf_chl'))) {
    console.error(`Cloudflare challenge detected for ${room.name}, waiting 10s and retrying...`);
    await new Promise(r => setTimeout(r, 10000));
    const retryText = await page.evaluate(() => document.body.innerText);
    if (retryText.length < 500) {
      return { workroom: room.name, status: 'cloudflare_blocked', error: 'Cloudflare challenge not resolved. Try --login to refresh session.' };
    }
  }

  await page.screenshot({ path: path.join(SCREENSHOT_DIR, `upwork-${room.name.toLowerCase()}-weekly.png`) });

  // Parse summary stats from page text
  const thisWeekMatch = pageText.match(/This week\n([\d:]+)\s*hrs/);
  const lastWeekMatch = pageText.match(/Last week\n([\d:]+)\s*hrs/);
  const sinceStartMatch = pageText.match(/Since start\n([\d:]+)\s*hrs/);
  const weekRangeMatch = pageText.match(/((?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d+)\s*-\s*((?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d+)/);
  const weekRange = weekRangeMatch ? `${weekRangeMatch[1]} - ${weekRangeMatch[2]}` : 'unknown';

  const hmmToDecimal = (hmm) => {
    const parts = hmm.split(':').map(Number);
    return Math.round((parts[0] + (parts[1] || 0) / 60) * 100) / 100;
  };

  const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let dailyDecimal = {};

  // Primary: build from GraphQL providerTimeReport rows (most accurate)
  if (apiTimeReport?.data?.providerTimeReport?.rows?.length) {
    const timesheetDateMatch = currentUrl.match(/timesheetDate=(\d{4}-\d{2}-\d{2})/);
    const weekStart = timesheetDateMatch ? new Date(timesheetDateMatch[1] + 'T00:00:00') : null;
    for (const row of apiTimeReport.data.providerTimeReport.rows) {
      const cols = row.columnValue;
      const ds = cols[0].value; // YYYYMMDD
      const hrs = Math.round((parseFloat(cols[1].value) + parseFloat(cols[2].value)) * 100) / 100;
      const d = new Date(`${ds.slice(0,4)}-${ds.slice(4,6)}-${ds.slice(6,8)}T00:00:00`);
      if (weekStart) {
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        if (d >= weekStart && d <= weekEnd) dailyDecimal[DAY_NAMES[d.getDay()]] = hrs;
      }
    }
  }

  // Fallback: parse daily breakdown from page text
  if (Object.keys(dailyDecimal).length === 0) {
    const dayPattern = /(\d+)\s+(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\n([\d:]+)\s*hrs/g;
    let m;
    while ((m = dayPattern.exec(pageText)) !== null) {
      dailyDecimal[m[2]] = hmmToDecimal(m[3]);
    }
  }

  const totalHrs = Math.round(Object.values(dailyDecimal).reduce((a, b) => a + b, 0) * 100) / 100;

  return {
    workroom: room.name,
    client: room.client,
    developer: room.developer,
    contract: room.contract_title,
    status: 'success',
    week: weekRange,
    weekly_limit: room.weekly_limit,
    summary: {
      this_week: thisWeekMatch ? thisWeekMatch[1] : null,
      last_week: lastWeekMatch ? lastWeekMatch[1] : null,
      since_start: sinceStartMatch ? sinceStartMatch[1] : null,
    },
    daily_hours: dailyDecimal,
    total_hours: totalHrs,
  };
}

main();
