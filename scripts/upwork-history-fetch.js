#!/usr/bin/env node
/**
 * Fetch historical Upwork timesheet hours for 3-month audit (Mar-May 2026).
 * Navigates to each week's timesheet URL and intercepts the providerTimeReport GraphQL.
 * Usage: node scripts/upwork-history-fetch.js [--account=carrick|vinn|david2] [--workroom=NAME]
 * Output: JSON to stdout
 */

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const fs = require('fs');
const path = require('path');

const CONFIG_PATH = path.join(__dirname, '..', 'config', '.upwork-config.json');
const SCREENSHOT_DIR = path.join(__dirname, '..', 'tmp');

// Weeks to fetch: Monday dates from W10 (Mar 2) to W21 (May 18)
// ISO week 2026
function isoWeekMonday(weekNum, year = 2026) {
  // Jan 4 is always in ISO week 1
  const jan4 = new Date(year, 0, 4);
  const dayOfWeek = jan4.getDay() || 7; // 1=Mon, 7=Sun
  const week1Monday = new Date(jan4);
  week1Monday.setDate(jan4.getDate() - (dayOfWeek - 1));
  const target = new Date(week1Monday);
  target.setDate(week1Monday.getDate() + (weekNum - 1) * 7);
  return target;
}

function toYMD(d) {
  return d.toISOString().split('T')[0];
}

const WEEKS = [];
for (let w = 10; w <= 21; w++) {
  const monday = isoWeekMonday(w);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  WEEKS.push({ week: w, startDate: toYMD(monday), endDate: toYMD(sunday) });
}

console.error('Weeks to fetch:');
WEEKS.forEach(w => console.error(`  W${w.week}: ${w.startDate} to ${w.endDate}`));

const accountArg = process.argv.find(a => a.startsWith('--account='));
const workroomArg = process.argv.find(a => a.startsWith('--workroom='));
const accountFilter = accountArg ? accountArg.split('=')[1] : null;
const workroomFilter = workroomArg ? workroomArg.split('=')[1] : null;

const wait = ms => new Promise(r => setTimeout(r, ms));

async function fetchWeekHours(page, workroomId, startDate) {
  const url = `https://www.upwork.com/nx/wm/workroom/${workroomId}/timesheet?timesheetDate=${startDate}`;

  let apiData = null;
  const handler = async (response) => {
    if (response.url().includes('providerTimeReport')) {
      try { apiData = await response.json(); } catch (_) {}
    }
  };
  page.on('response', handler);

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 35000 });
  } catch (e) {
    // domcontentloaded may timeout on SPA but page still loads
  }
  await wait(7000);
  page.off('response', handler);

  const currentUrl = page.url();
  if (currentUrl.includes('login') || currentUrl.includes('account-security')) {
    return { status: 'session_expired' };
  }

  const pageText = await page.evaluate(() => document.body.innerText);

  if (pageText.length < 300 && (pageText.includes('Cloudflare') || pageText.includes('Ray ID'))) {
    return { status: 'cloudflare_blocked' };
  }

  let totalHours = 0;
  const dailyHours = {};

  // Primary: GraphQL API response
  if (apiData?.data?.providerTimeReport?.rows?.length) {
    for (const row of apiData.data.providerTimeReport.rows) {
      const cols = row.columnValue;
      const ds = cols[0].value; // YYYYMMDD
      const hrs = Math.round((parseFloat(cols[1].value || 0) + parseFloat(cols[2].value || 0)) * 100) / 100;
      dailyHours[ds] = hrs;
      totalHours += hrs;
    }
    totalHours = Math.round(totalHours * 100) / 100;
    return { status: 'success', totalHours, dailyHours, source: 'graphql' };
  }

  // Fallback: parse "This week\nX:XX hrs" from page text
  const thisWeekMatch = pageText.match(/This week\n([\d]+):([\d]{2})\s*hrs/);
  if (thisWeekMatch) {
    totalHours = parseInt(thisWeekMatch[1]) + parseInt(thisWeekMatch[2]) / 60;
    totalHours = Math.round(totalHours * 100) / 100;
    return { status: 'success_text', totalHours, dailyHours: {}, source: 'page_text' };
  }

  // Check if page shows 0:00 for this week (no work done)
  const zeroMatch = pageText.match(/This week\n0:00/);
  if (zeroMatch) {
    return { status: 'success', totalHours: 0, dailyHours: {}, source: 'page_text_zero' };
  }

  // Save screenshot for debugging
  try {
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, `upwork-debug-${workroomId}-${startDate}.png`) });
  } catch (_) {}

  return { status: 'unknown', totalHours: 0, pageTextSample: pageText.substring(0, 300) };
}

async function processAccount(accountName, workrooms, config) {
  const profileDir = path.join(__dirname, '..', 'tmp', `upwork-profile-${accountName}`);
  if (!fs.existsSync(path.join(profileDir, 'Default'))) {
    console.error(`No saved session for ${accountName}`);
    return workrooms.map(r => ({ workroom: r.name, status: 'no_session', weeks: {} }));
  }

  // Remove lock files
  ['SingletonLock', 'SingletonCookie', 'SingletonSocket'].forEach(f => {
    try { fs.unlinkSync(path.join(profileDir, f)); } catch (_) {}
  });

  const browser = await puppeteer.launch({
    headless: false,
    userDataDir: profileDir,
    args: [
      '--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage',
      '--disable-blink-features=AutomationControlled', '--window-size=1280,900',
      '--disable-gpu',
    ],
    env: { ...process.env, DISPLAY: process.env.DISPLAY || ':99' },
  });

  const results = [];

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 900 });
    await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36');

    for (const room of workrooms) {
      console.error(`\nFetching ${room.name} (workroom ${room.workroom_id})...`);
      const weekResults = {};
      let sessionExpired = false;

      for (const weekInfo of WEEKS) {
        if (sessionExpired) {
          weekResults[weekInfo.week] = { status: 'skipped_session_expired' };
          continue;
        }

        console.error(`  W${weekInfo.week} (${weekInfo.startDate})...`);
        const data = await fetchWeekHours(page, room.workroom_id, weekInfo.startDate);

        if (data.status === 'session_expired') {
          console.error(`  Session expired for ${accountName}`);
          sessionExpired = true;
          weekResults[weekInfo.week] = { status: 'session_expired' };
          continue;
        }

        weekResults[weekInfo.week] = {
          startDate: weekInfo.startDate,
          endDate: weekInfo.endDate,
          ...data,
        };
        console.error(`    -> ${data.totalHours}h [${data.status}]`);

        await wait(2000); // be polite
      }

      results.push({
        workroom: room.name,
        workroom_id: room.workroom_id,
        developer: room.developer,
        account: accountName,
        weeks: weekResults,
      });
    }
  } finally {
    await browser.close();
  }

  return results;
}

async function main() {
  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
  const targetWorkrooms = workroomFilter
    ? config.workrooms.filter(w => w.name.toLowerCase().includes(workroomFilter.toLowerCase()) && w.workroom_id !== '38901192')
    : config.workrooms.filter(w => w.workroom_id !== '38901192'); // skip Neural Contract (messages only)

  // Group by account
  const byAccount = {};
  for (const room of targetWorkrooms) {
    const acc = room.account || config.accounts[0].name;
    if (accountFilter && acc !== accountFilter) continue;
    if (!byAccount[acc]) byAccount[acc] = [];
    byAccount[acc].push(room);
  }

  const allResults = [];

  for (const [accountName, rooms] of Object.entries(byAccount)) {
    const roomResults = await processAccount(accountName, rooms, config);
    allResults.push(...roomResults);
  }

  // Compute monthly totals using same day-overlap logic as tasklog script
  const MONTHS = {
    March: { start: '2026-03-01', end: '2026-03-31' },
    April: { start: '2026-04-01', end: '2026-04-30' },
    May:   { start: '2026-05-01', end: '2026-05-31' },
  };

  function daysOverlap(ws, we, ms, me) {
    const start = ws > ms ? ws : ms;
    const end = we < me ? we : me;
    if (end < start) return 0;
    return Math.round((new Date(end) - new Date(start)) / 86400000) + 1;
  }

  for (const r of allResults) {
    r.monthly = {};
    for (const [mname, { start, end }] of Object.entries(MONTHS)) {
      let total = 0;
      for (const [wnum, wdata] of Object.entries(r.weeks)) {
        if (!wdata.startDate || wdata.totalHours == null) continue;
        const overlap = daysOverlap(wdata.startDate, wdata.endDate, start, end);
        if (overlap > 0) {
          total += (wdata.totalHours * overlap) / 7;
        }
      }
      r.monthly[mname] = Math.round(total * 100) / 100;
    }
  }

  console.log(JSON.stringify(allResults, null, 2));
}

main().catch(e => { console.error('FATAL:', e.message, e.stack); process.exit(1); });
