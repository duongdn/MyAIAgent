#!/usr/bin/env node
/**
 * Fetch Upwork "Since Start" hours and current week data for each workroom.
 * Also tries to navigate to the Reports page for historical totals.
 * For the carrick session (if CF-blocked), notes it clearly.
 *
 * For Bailey-VietPH: The timesheet page shows "Since Start" total + current week daily breakdown.
 * We need to collect week-by-week data via the "Previous Week" button click approach.
 *
 * Strategy:
 * 1. Load timesheet page
 * 2. Intercept GraphQL providerTimeReport for current week
 * 3. Click "Previous week" arrow multiple times to collect history
 * 4. Each click triggers a new providerTimeReport response
 */

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const fs = require('fs');
const path = require('path');

const CONFIG_PATH = path.join(__dirname, '..', 'config', '.upwork-config.json');
const SCREENSHOT_DIR = path.join(__dirname, '..', 'tmp');

const wait = ms => new Promise(r => setTimeout(r, ms));

// We need weeks going back to Mar 2026
// Today = 2026-05-28 → current ISO week ≈ W22
// We need W10 (Mar 2) through W21 (May 18) = 12 weeks back from W22
// From current week, we need to go back:
// W22 = current, W21=1 back, W20=2 back, ..., W10=12 back
// But we're fetching from the page today (W22), going back 12 clicks

const WEEKS_NEEDED = 12; // go back 12 previous-week clicks

async function fetchAllWeeksViaNavigation(page, room) {
  const timesheetUrl = `https://www.upwork.com/nx/wm/workroom/${room.workroom_id}/timesheet`;
  console.error(`\nFetching ${room.name} (${room.workroom_id}) via navigation...`);

  const capturedWeeks = [];

  const responseHandler = async (response) => {
    if (response.url().includes('providerTimeReport')) {
      try {
        const data = await response.json();
        if (data?.data?.providerTimeReport) {
          capturedWeeks.push({ url: response.url(), data: data.data.providerTimeReport });
        }
      } catch (_) {}
    }
  };
  page.on('response', responseHandler);

  // Load initial timesheet (current week)
  try {
    await page.goto(timesheetUrl, { waitUntil: 'domcontentloaded', timeout: 40000 });
  } catch (e) {}
  await wait(8000);

  const currentUrl = page.url();
  if (currentUrl.includes('login') || currentUrl.includes('account-security')) {
    page.off('response', responseHandler);
    return { workroom: room.name, status: 'session_expired', weeks: [] };
  }

  const pageText = await page.evaluate(() => document.body.innerText);
  if (pageText.length < 300 && pageText.includes('Cloudflare')) {
    page.off('response', responseHandler);
    return { workroom: room.name, status: 'cloudflare_blocked', weeks: [] };
  }

  await page.screenshot({ path: path.join(SCREENSHOT_DIR, `upwork-${room.name}-w0.png`) });
  console.error(`  Current week loaded, captured so far: ${capturedWeeks.length}`);

  // Try to find and click the "Previous week" (left arrow) button
  // Upwork UI has a left chevron to go to previous week
  for (let i = 0; i < WEEKS_NEEDED; i++) {
    const before = capturedWeeks.length;

    // Look for the prev-week navigation button
    const clicked = await page.evaluate(() => {
      // Try various selectors for the previous-week arrow
      const selectors = [
        'button[aria-label="Previous week"]',
        'button[aria-label="previous week"]',
        'button[data-qa="prev-week"]',
        '[data-qa="timesheet-prev-week"]',
        'button.air3-icon-button:first-of-type',
        // Look for left arrow icon buttons near week display
        'span[data-testid="icon-arrow-left"]',
        'i.icon-arrow-left',
      ];

      for (const sel of selectors) {
        const el = document.querySelector(sel);
        if (el) {
          const btn = el.closest('button') || el;
          btn.click();
          return `clicked: ${sel}`;
        }
      }

      // Fallback: find all buttons and look for left-pointing arrow near date display
      const allBtns = [...document.querySelectorAll('button')];
      for (const btn of allBtns) {
        const text = btn.textContent.trim();
        const ariaLabel = btn.getAttribute('aria-label') || '';
        if (ariaLabel.toLowerCase().includes('prev') || ariaLabel.toLowerCase().includes('previous') || ariaLabel.toLowerCase().includes('back')) {
          btn.click();
          return `clicked aria: ${ariaLabel}`;
        }
      }

      // Try clicking by position - week navigation is usually in the header
      // Look for SVG chevron-left
      const svgs = [...document.querySelectorAll('svg')];
      for (const svg of svgs) {
        const use = svg.querySelector('use');
        if (use) {
          const href = use.getAttribute('href') || use.getAttribute('xlink:href') || '';
          if (href.includes('chevron-left') || href.includes('arrow-left') || href.includes('prev')) {
            const btn = svg.closest('button');
            if (btn) { btn.click(); return `svg btn: ${href}`; }
          }
        }
      }

      return null;
    });

    console.error(`  Week nav click ${i + 1}: ${clicked}`);
    await wait(5000);

    const after = capturedWeeks.length;
    if (after === before) {
      console.error(`  No new API response after click ${i + 1}, trying keyboard...`);
      // Try keyboard navigation or direct URL approach
      await page.keyboard.press('ArrowLeft');
      await wait(3000);
    }

    if (i < 2) {
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, `upwork-${room.name}-w${i+1}.png`) });
    }
  }

  page.off('response', responseHandler);
  console.error(`  Total weeks captured: ${capturedWeeks.length}`);

  return {
    workroom: room.name,
    workroom_id: room.workroom_id,
    developer: room.developer,
    status: 'success',
    weeks: capturedWeeks,
  };
}

function parseWeekData(weekEntry) {
  const report = weekEntry.data;
  const rows = report.rows || [];

  let totalHours = 0;
  const dailyHours = {};

  for (const row of rows) {
    const cols = row.columnValue;
    const ds = cols[0].value; // YYYYMMDD
    const hrs = Math.round((parseFloat(cols[1].value || 0) + parseFloat(cols[2].value || 0)) * 100) / 100;
    if (hrs > 0) {
      dailyHours[ds] = hrs;
      totalHours += hrs;
    }
  }

  // Determine week date range from the data
  const dates = Object.keys(dailyHours).sort();
  const weekStart = dates.length > 0 ? dates[0] : null;
  const weekEnd = dates.length > 0 ? dates[dates.length - 1] : null;

  // Also check if we can get date range from report metadata
  let reportStart = null;
  let reportEnd = null;
  if (report.date_range_start) {
    reportStart = report.date_range_start;
    reportEnd = report.date_range_end;
  }

  return {
    totalHours: Math.round(totalHours * 100) / 100,
    dailyHours,
    weekStart: reportStart || weekStart,
    weekEnd: reportEnd || weekEnd,
    rowCount: rows.length,
  };
}

async function processAccount(accountName, workrooms) {
  const profileDir = path.join(__dirname, '..', 'tmp', `upwork-profile-${accountName}`);
  if (!fs.existsSync(path.join(profileDir, 'Default'))) {
    console.error(`No session for ${accountName}`);
    return workrooms.map(r => ({ workroom: r.name, status: 'no_session' }));
  }

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
      const result = await fetchAllWeeksViaNavigation(page, room);
      results.push(result);
    }
  } finally {
    await browser.close();
  }

  return results;
}

async function main() {
  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
  const rooms = config.workrooms.filter(w => w.workroom_id !== '38901192');

  const byAccount = {};
  for (const room of rooms) {
    const acc = room.account || config.accounts[0].name;
    if (!byAccount[acc]) byAccount[acc] = [];
    byAccount[acc].push(room);
  }

  const allResults = [];
  for (const [accountName, accountRooms] of Object.entries(byAccount)) {
    const results = await processAccount(accountName, accountRooms);
    allResults.push(...results);
  }

  // Parse weeks and organize by date
  const parsed = allResults.map(r => {
    if (r.status !== 'success' || !r.weeks?.length) {
      return { ...r, parsedWeeks: [] };
    }
    const parsedWeeks = r.weeks.map(w => parseWeekData(w)).filter(w => w.rowCount > 0 || w.totalHours > 0);
    return { ...r, parsedWeeks };
  });

  console.log(JSON.stringify(parsed, null, 2));
}

main().catch(e => { console.error('FATAL:', e.message, e.stack); process.exit(1); });
