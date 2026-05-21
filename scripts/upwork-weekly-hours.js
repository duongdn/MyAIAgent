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

    const browser = await puppeteer.launch({
      headless: 'new',
      userDataDir: profileDir,
      args: [
        '--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage',
        '--disable-blink-features=AutomationControlled', '--window-size=1280,900',
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

  // Intercept Upwork API timesheet response for reliable data extraction
  let interceptedData = null;
  const responseHandler = async (response) => {
    const url = response.url();
    if (url.includes('/api/v3/contractors/reports/hours/summary') ||
        url.includes('/api/v2/workrooms') && url.includes('timesheet') ||
        url.includes('/timereports/v1') ||
        url.includes('timesheet') && url.includes('json')) {
      try {
        const json = await response.json();
        interceptedData = json;
      } catch (_) {}
    }
  };
  page.on('response', responseHandler);

  await page.goto(timesheetUrl, { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 5000));
  page.off('response', responseHandler);

  const currentUrl = page.url();
  if (currentUrl.includes('login') || currentUrl.includes('account-security')) {
    return { workroom: room.name, status: 'session_expired' };
  }

  // Cloudflare challenge detection — page too short or contains CF challenge text
  const pageText = await page.evaluate(() => document.body.innerText);
  if (pageText.length < 200 && (pageText.includes('Cloudflare') || pageText.includes('Ray ID') || currentUrl.includes('__cf_chl'))) {
    console.error(`Cloudflare challenge detected for ${room.name}, waiting 10s and retrying...`);
    await new Promise(r => setTimeout(r, 10000));
    const retryText = await page.evaluate(() => document.body.innerText);
    if (retryText.length < 200) {
      return { workroom: room.name, status: 'cloudflare_blocked', error: 'Cloudflare challenge not resolved. Try running during off-peak hours or use --login to refresh session.' };
    }
  }

  // Extract summary stats from the page

  // Parse summary stats
  const thisWeekMatch = pageText.match(/This week\n([\d:]+)\s*hrs/);
  const lastWeekMatch = pageText.match(/Last week\n([\d:]+)\s*hrs/);
  const sinceStartMatch = pageText.match(/Since start\n([\d:]+)\s*hrs/);
  const weeklyLimitMatch = pageText.match(/of (\d+)\s*hrs weekly limit/);

  // Parse daily breakdown (current selected week)
  const dayPattern = /(\d+)\s+(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\n([\d:]+)\s*hrs/g;
  const dailyHours = {};
  let match;
  while ((match = dayPattern.exec(pageText)) !== null) {
    dailyHours[match[2]] = match[3];
  }

  // Parse week date range
  const weekRangeMatch = pageText.match(/((?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d+)\s*-\s*((?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d+)/);

  // If user wants last week, try clicking previous week in calendar
  let weekData = {
    range: weekRangeMatch ? `${weekRangeMatch[1]} - ${weekRangeMatch[2]}` : 'unknown',
    daily: dailyHours,
  };

  // Note: Upwork SPA calendar is difficult to navigate headlessly.
  // We extract daily breakdown for the selected (current) week,
  // and use summary stats for last week total.

  // Convert H:MM to decimal hours
  const toDecimal = (hhmm) => {
    const [h, m] = hhmm.split(':').map(Number);
    return Math.round((h + m / 60) * 100) / 100;
  };

  const dailyDecimal = {};
  let totalHrs = 0;
  for (const [day, time] of Object.entries(weekData.daily)) {
    const dec = toDecimal(time);
    dailyDecimal[day] = dec;
    totalHrs += dec;
  }

  await page.screenshot({ path: path.join(SCREENSHOT_DIR, `upwork-${room.name.toLowerCase()}-weekly.png`) });

  return {
    workroom: room.name,
    client: room.client,
    developer: room.developer,
    contract: room.contract_title,
    status: 'success',
    week: weekData.range,
    weekly_limit: room.weekly_limit,
    summary: {
      this_week: thisWeekMatch ? thisWeekMatch[1] : null,
      last_week: lastWeekMatch ? lastWeekMatch[1] : null,
      since_start: sinceStartMatch ? sinceStartMatch[1] : null,
    },
    daily_hours: dailyDecimal,
    total_hours: Math.round(totalHrs * 100) / 100,
  };
}

main();
