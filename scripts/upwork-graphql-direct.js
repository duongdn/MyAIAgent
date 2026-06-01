#!/usr/bin/env node
/**
 * Fetch Upwork timesheet data via direct GraphQL API call using saved session cookies.
 * Requests a custom date range (2026-03-01 to 2026-05-31) for each workroom.
 *
 * The providerTimeReport GraphQL query accepts startDate/endDate params.
 * We extract cookies from the saved Chrome profile's cookies SQLite DB.
 */

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const fs = require('fs');
const path = require('path');

const CONFIG_PATH = path.join(__dirname, '..', 'config', '.upwork-config.json');
const SCREENSHOT_DIR = path.join(__dirname, '..', 'tmp');

const wait = ms => new Promise(r => setTimeout(r, ms));

const DATE_START = '2026-03-01';
const DATE_END = '2026-05-31';

/**
 * Make a GraphQL call from within the browser page context (uses browser's session cookies)
 * This avoids CORS and cookie extraction issues.
 */
async function fetchTimesheetViaPageContext(page, workroomId, contractId) {
  // Upwork's providerTimeReport GraphQL query
  // contractId is needed — we get it from the workroom page URL or API
  const query = `
    query providerTimeReport($contractId: ID!, $startDate: String!, $endDate: String!) {
      providerTimeReport(contractId: $contractId, startDate: $startDate, endDate: $endDate) {
        cols { label type }
        rows { columnValue { value } }
      }
    }
  `;

  const result = await page.evaluate(async ({ query, contractId, startDate, endDate }) => {
    try {
      const resp = await fetch('https://www.upwork.com/api/graphql/v1', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'x-upwork-accept-language': 'en-US',
        },
        body: JSON.stringify({
          query,
          variables: { contractId, startDate, endDate }
        })
      });
      const data = await resp.json();
      return { ok: true, data };
    } catch (e) {
      return { ok: false, error: e.message };
    }
  }, { query, contractId, startDate: DATE_START, endDate: DATE_END });

  return result;
}

/**
 * Alternative: intercept the request the page makes and replay it with different date params.
 * Load the timesheet page, capture the XSRF token and request format, then replay.
 */
async function fetchTimesheetByInterceptingAndReplaying(page, workroomId) {
  const timesheetUrl = `https://www.upwork.com/nx/wm/workroom/${workroomId}/timesheet`;

  let capturedRequest = null;
  let capturedResponse = null;

  const reqHandler = async (request) => {
    if (request.url().includes('providerTimeReport') && request.method() === 'POST') {
      capturedRequest = {
        url: request.url(),
        headers: request.headers(),
        postData: request.postData(),
      };
    }
  };

  const respHandler = async (response) => {
    if (response.url().includes('providerTimeReport')) {
      try {
        capturedResponse = await response.json();
      } catch (_) {}
    }
  };

  page.on('request', reqHandler);
  page.on('response', respHandler);

  try {
    await page.goto(timesheetUrl, { waitUntil: 'domcontentloaded', timeout: 40000 });
  } catch (_) {}
  await wait(10000);

  page.off('request', reqHandler);
  page.off('response', respHandler);

  const currentUrl = page.url();
  if (currentUrl.includes('login') || currentUrl.includes('account-security')) {
    return { status: 'session_expired' };
  }

  const pageText = await page.evaluate(() => document.body.innerText);
  if (pageText.length < 300 && pageText.includes('Cloudflare')) {
    return { status: 'cloudflare_blocked' };
  }

  if (!capturedRequest) {
    // Still try a page-context fetch with xsrf token
    const xsrfToken = await page.evaluate(() => {
      const cookies = document.cookie.split(';');
      for (const c of cookies) {
        const [k, v] = c.trim().split('=');
        if (k === 'XSRF-TOKEN') return decodeURIComponent(v);
      }
      return null;
    });

    console.error(`  No GraphQL request captured for ${workroomId}, xsrf: ${xsrfToken ? 'present' : 'absent'}`);

    // Try in-page fetch with the custom date range
    if (xsrfToken) {
      const result = await page.evaluate(async ({ xsrfToken, startDate, endDate }) => {
        const query = `query providerTimeReport {
          providerTimeReport(startDate: "${startDate}", endDate: "${endDate}") {
            cols { label type }
            rows { columnValue { value } }
          }
        }`;
        try {
          const resp = await fetch('https://www.upwork.com/api/graphql/v1?alias=providerTimeReport', {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
              'x-odesk-csrf-token': xsrfToken,
              'X-XSRF-TOKEN': xsrfToken,
            },
            body: JSON.stringify({ query })
          });
          const text = await resp.text();
          return { ok: true, text: text.substring(0, 2000) };
        } catch (e) {
          return { ok: false, error: e.message };
        }
      }, { xsrfToken, startDate: DATE_START, endDate: DATE_END });
      console.error(`  In-page fetch result: ${JSON.stringify(result).substring(0, 300)}`);
    }

    return { status: 'no_graphql_request', currentResponse: capturedResponse };
  }

  // We have the captured request — replay it with modified date variables
  console.error(`  Captured request, replaying with custom date range...`);

  // Parse the original request body
  let originalBody;
  try {
    originalBody = JSON.parse(capturedRequest.postData);
  } catch (_) {
    return { status: 'parse_error', rawData: capturedRequest.postData?.substring(0, 200) };
  }

  console.error(`  Original query alias: ${originalBody.operationName || 'unknown'}`);
  console.error(`  Original variables: ${JSON.stringify(originalBody.variables)}`);

  // Modify dates in the variables
  const modifiedBody = {
    ...originalBody,
    variables: {
      ...originalBody.variables,
      startDate: DATE_START,
      endDate: DATE_END,
    }
  };

  // Replay via page.evaluate to keep session cookies
  const replayResult = await page.evaluate(async ({ url, headers, body, xsrfToken }) => {
    try {
      const reqHeaders = { 'Content-Type': 'application/json' };
      if (xsrfToken) {
        reqHeaders['X-XSRF-TOKEN'] = xsrfToken;
        reqHeaders['x-odesk-csrf-token'] = xsrfToken;
      }
      const resp = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: reqHeaders,
        body: JSON.stringify(body),
      });
      const data = await resp.json();
      return { ok: true, data };
    } catch (e) {
      return { ok: false, error: e.message };
    }
  }, {
    url: capturedRequest.url,
    headers: capturedRequest.headers,
    body: modifiedBody,
    xsrfToken: capturedRequest.headers['x-xsrf-token'] || capturedRequest.headers['x-odesk-csrf-token'],
  });

  return {
    status: 'replayed',
    originalResponse: capturedResponse,
    replayResult,
    capturedVariables: originalBody.variables,
  };
}

function extractWeeklyHours(rows) {
  // Convert raw GraphQL rows to daily hours map
  const daily = {};
  let total = 0;
  for (const row of (rows || [])) {
    const cols = row.columnValue;
    const ds = cols[0].value; // YYYYMMDD
    const hrs = Math.round((parseFloat(cols[1]?.value || 0) + parseFloat(cols[2]?.value || 0)) * 100) / 100;
    if (hrs > 0) {
      daily[ds] = hrs;
      total += hrs;
    }
  }
  return { daily, total: Math.round(total * 100) / 100 };
}

function aggregateByMonth(daily) {
  const months = { March: 0, April: 0, May: 0 };
  const monthRanges = {
    March: ['20260301', '20260331'],
    April: ['20260401', '20260430'],
    May:   ['20260501', '20260531'],
  };
  for (const [ds, hrs] of Object.entries(daily)) {
    for (const [mname, [ms, me]] of Object.entries(monthRanges)) {
      if (ds >= ms && ds <= me) {
        months[mname] += hrs;
        break;
      }
    }
  }
  for (const m of Object.keys(months)) {
    months[m] = Math.round(months[m] * 100) / 100;
  }
  return months;
}

async function processAccount(accountName, workrooms) {
  const profileDir = path.join(__dirname, '..', 'tmp', `upwork-profile-${accountName}`);
  if (!fs.existsSync(path.join(profileDir, 'Default'))) {
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
      '--disable-blink-features=AutomationControlled', '--window-size=1280,900', '--disable-gpu',
    ],
    env: { ...process.env, DISPLAY: process.env.DISPLAY || ':99' },
  });

  const results = [];
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 900 });
    await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36');

    for (const room of workrooms) {
      console.error(`\n--- ${room.name} (${room.workroom_id}) [${accountName}] ---`);
      const result = await fetchTimesheetByInterceptingAndReplaying(page, room.workroom_id);
      console.error(`  Status: ${result.status}`);

      let daily = {};
      let source = result.status;

      if (result.status === 'replayed' && result.replayResult?.ok) {
        const rows = result.replayResult.data?.data?.providerTimeReport?.rows;
        if (rows) {
          const extracted = extractWeeklyHours(rows);
          daily = extracted.daily;
          console.error(`  Replayed data: ${extracted.total}h total, ${Object.keys(daily).length} days`);
          source = 'replayed_custom_range';
        }
      } else if (result.status === 'no_graphql_request' && result.currentResponse) {
        const rows = result.currentResponse?.data?.providerTimeReport?.rows;
        if (rows) {
          const extracted = extractWeeklyHours(rows);
          daily = extracted.daily;
          console.error(`  Fallback current response: ${extracted.total}h, ${Object.keys(daily).length} days`);
          source = 'current_period_only';
        }
      }

      const monthly = aggregateByMonth(daily);
      results.push({
        workroom: room.name,
        workroom_id: room.workroom_id,
        developer: room.developer,
        account: accountName,
        status: result.status,
        source,
        monthly,
        daily,
      });
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

  console.log(JSON.stringify(allResults, null, 2));
}

main().catch(e => { console.error('FATAL:', e.message, e.stack); process.exit(1); });
