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

    for (const room of rooms) {
      try {
        const data = await fetchWorkroomHours(page, room);
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

async function fetchWorkroomHours(page, room) {
  const timesheetUrl = `https://www.upwork.com/nx/wm/workroom/${room.workroom_id}/timesheet`;
  console.error(`Fetching ${room.name} (${room.workroom_id})...`);

  await page.goto(timesheetUrl, { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 5000));

  const url = page.url();
  if (url.includes('login') || url.includes('account-security')) {
    return { workroom: room.name, status: 'session_expired' };
  }

  // Extract summary stats from the page
  const pageText = await page.evaluate(() => document.body.innerText);

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
