#!/usr/bin/env node
/**
 * Upwork work-memo validation checker.
 *
 * Upwork's Hourly Payment Protection requires each tracked time segment to carry a
 * memo detailed enough for a reviewer to verify: (1) specific task, (2) feature/page/
 * design element, (3) action taken, (4) relation to contracted work. This script
 * opens each hourly workroom's timesheet for a target day, extracts the per-segment
 * memos (GraphQL work-diary intercept primary, DOM fallback), and classifies each
 * via scripts/upwork-memo-rules.js.
 *
 * Auth: mirrors upwork-weekly-hours.js — live-cookie injection for carrick (Rory/Aysar/
 * Neural), persistent Puppeteer profile for vinn/david2 (Bailey DEV1/DEV3). NEVER
 * attempt the Puppeteer credential-login flow first — Upwork's fraud engine soft-rejects
 * it (see docs/memory/daily-report/upwork/feedback_neural_consolidated.md).
 *
 * Usage:
 *   node scripts/upwork-memo-check.js [--date=YYYY-MM-DD] [--workroom=NAME]
 *   node scripts/upwork-memo-check.js                       # yesterday, all hourly workrooms
 *   node scripts/upwork-memo-check.js --date=2026-08-05
 *   node scripts/upwork-memo-check.js --workroom=Rory
 *
 * Output: JSON per workroom → { workroom, client, developer, status, date, segments:[{time,duration,memo,valid,issues}], summary }
 */
'use strict';

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { classifyMemo } = require('./upwork-memo-rules.js');

const CONFIG_PATH = path.join(__dirname, '..', 'config', '.upwork-config.json');
const SCREENSHOT_DIR = path.join(__dirname, '..', 'tmp');
const LIVE_COOKIE_JSON = '/tmp/carrick-upwork-cookies.json';

// Work-diary GraphQL/API response fragments that may carry per-segment memo text.
// Upwork exposes the work diary via the timesheet SPA; we intercept anything matching.
const MEMO_API_FRAGMENTS = ['providerTimeReport', 'providerDiary', 'workDiary', 'timeActivity', 'diaryEntry', 'memo'];

function argValue(flag) {
  const a = process.argv.find((x) => x.startsWith(`--${flag}=`));
  return a ? a.split('=')[1] : null;
}

// Default: yesterday (the workday after last_run — caller passes explicit date in daily report).
function defaultDate() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

// Live cookie extraction from carrick's real Chrome Profile 1 (same as weekly-hours/neural).
// The skills-venv browser_cookie3 can have a broken lz4 module (ModuleNotFoundError:
// lz4._version) — fall back to system python3, which is what upwork-neural-check.js does.
function extractLiveCookies() {
  let result;
  try {
    result = execSync('.claude/skills/.venv/bin/python3 scripts/get-carrick-upwork-cookies.py', {
      cwd: path.join(__dirname, '..'),
      stdio: ['ignore', 'ignore', 'inherit'],
    });
  } catch (venvErr) {
    console.error('Live cookie extraction: venv python3 failed, trying system python3...');
    try {
      result = execSync('python3 scripts/get-carrick-upwork-cookies.py', {
        cwd: path.join(__dirname, '..'),
        stdio: ['ignore', 'ignore', 'inherit'],
      });
    } catch (sysErr) {
      console.error('Live cookie extraction failed (venv + system python3):', sysErr.message);
      return null;
    }
  }
  return JSON.parse(fs.readFileSync(LIVE_COOKIE_JSON, 'utf8'))
    .filter((c) => c.name && c.value && c.domain && /^[!#-+\--:<-\[\]-~]+$/.test(c.value))
    .map((c) => ({ name: c.name, value: c.value, domain: c.domain, path: c.path, secure: c.secure }));
}

async function injectLiveCookies(page) {
  const cookies = extractLiveCookies();
  if (!cookies || !cookies.length) return false;
  await page.setCookie(...cookies);
  await page.goto('https://www.upwork.com/nx/wm/', { waitUntil: 'networkidle2', timeout: 20000 }).catch(() => {});
  const url = page.url();
  const ok = !url.includes('login') && !url.includes('account-security');
  console.error(`Live cookie injection result: ${ok ? 'AUTH' : 'STILL_EXPIRED'} (${url})`);
  return ok;
}

async function injectStoredCookies(page, account) {
  if (!account.session_cookies || !account.session_cookies.length) return false;
  const ageDays = account.session_saved_at
    ? (Date.now() - new Date(account.session_saved_at).getTime()) / 86400000
    : 999;
  if (ageDays > 30) return false;
  try {
    await page.goto('https://www.upwork.com/', { waitUntil: 'networkidle2', timeout: 20000 });
    for (const c of account.session_cookies) {
      try { await page.setCookie({ ...c, domain: '.upwork.com', url: 'https://www.upwork.com' }); } catch (_) {}
    }
    await page.reload({ waitUntil: 'networkidle2', timeout: 20000 });
    await new Promise((r) => setTimeout(r, 2000));
    const url = page.url();
    return !url.includes('login') && !url.includes('account-security');
  } catch (err) {
    console.error('Stored cookie injection error:', err.message);
    return false;
  }
}

async function headlessLogin(page, account) {
  try {
    await page.goto('https://www.upwork.com/nx/login', { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise((r) => setTimeout(r, 2000));
    await page.waitForSelector('input[name="login[username]"]', { timeout: 8000 });
    await page.type('input[name="login[username]"]', account.username, { delay: 50 });
    await page.click('button[data-qa="btn-next"]');
    await new Promise((r) => setTimeout(r, 2000));
    await page.waitForSelector('input[name="login[password]"]', { timeout: 8000 });
    await page.type('input[name="login[password]"]', account.password, { delay: 50 });
    await page.click('button[data-qa="btn-submit"]');
    await new Promise((r) => setTimeout(r, 5000));
    const url = page.url();
    return !url.includes('login') && !url.includes('account-security');
  } catch (err) {
    console.error(`Headless login error for ${account.name}:`, err.message);
    return false;
  }
}

// Parse segments from intercepted GraphQL/API responses. Many shapes; we normalize.
function parseApiMemos(apiData) {
  const memos = [];
  const walk = (node) => {
    if (!node || typeof node !== 'object') return;
    if (Array.isArray(node)) { node.forEach(walk); return; }
    // Heuristic: a node with a memo-like text field + a duration/time field
    if (typeof node.memo === 'string' && node.memo.trim()) {
      memos.push({ memo: node.memo.trim(), duration: node.duration || node.hours || node.seconds || null, time: node.time || node.startTime || node.date || null });
    }
    for (const k of Object.keys(node)) {
      const v = node[k];
      if (v && typeof v === 'object') walk(v);
      else if (typeof v === 'string' && /[a-z]/i.test(v) && /memo/i.test(k)) {
        // fields literally named *memo*
        memos.push({ memo: v.trim(), duration: null, time: null });
      }
    }
  };
  walk(apiData);
  return memos;
}

// Fallback: scrape memo text from the timesheet/work-diary DOM.
// Upwork renders per-segment memo text in the diary view; we look for common
// selectors and any text blocks that look like memos (not labels/navigation).
async function scrapeDomMemos(page) {
  const raw = await page.evaluate(() => {
    const results = [];
    const candidates = [];
    // Common work-diary selectors (best-effort; Upwork SPA classnames drift)
    const sels = [
      '[data-testid="memo-text"]', '[data-test="memo"]', '.memo', '.diary-note',
      '[class*="memo"] [class*="text"]', '[class*="workDiary"] [class*="note"]',
    ];
    for (const s of sels) {
      try {
        document.querySelectorAll(s).forEach((el) => candidates.push(el.innerText));
      } catch (_) {}
    }
    // Fallback: any <textarea>/input with a memo-like value, or paragraph-like text
    // inside the diary container if identifiable.
    document.querySelectorAll('textarea, input[type="text"]').forEach((el) => {
      const v = (el.value || el.placeholder || '').trim();
      if (v.length >= 3) candidates.push(v);
    });
    // De-dupe, filter out nav/button/label noise
    const seen = new Set();
    for (const c of candidates) {
      const t = c.replace(/\s*\n+\s*/g, ' ').trim();
      if (!t || t.length < 3 || /^(edit|add|save|cancel|delete|remove|view|all|today|yesterday|this week|last week)$/i.test(t)) continue;
      if (!seen.has(t)) { seen.add(t); results.push(t); }
    }
    return results;
  });
  return raw.map((memo) => ({ memo, duration: null, time: null }));
}

async function fetchWorkroomMemos(page, room, date) {
  // Timesheet URL supports timesheetDate param to position the week. We also try
  // the diary query on the same page.
  const timesheetUrl = `https://www.upwork.com/nx/wm/workroom/${room.workroom_id}/timesheet?timesheetDate=${date}`;
  console.error(`Fetching memos for ${room.name} (${room.workroom_id}) @ ${date}...`);

  let apiMemos = [];
  const responseHandler = async (response) => {
    const url = response.url();
    if (MEMO_API_FRAGMENTS.some((f) => url.includes(f))) {
      try { apiMemos = apiMemos.concat(parseApiMemos(await response.json())); } catch (_) {}
    }
  };
  page.on('response', responseHandler);

  await page.goto(timesheetUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await new Promise((r) => setTimeout(r, 9000));
  page.off('response', responseHandler);

  const currentUrl = page.url();
  if (currentUrl.includes('login') || currentUrl.includes('account-security')) {
    return { workroom: room.name, client: room.client, developer: room.developer, status: 'session_expired', date };
  }

  const pageText = await page.evaluate(() => document.body.innerText);
  if (pageText.length < 500 && (pageText.includes('Cloudflare') || pageText.includes('Ray ID') || currentUrl.includes('__cf_chl'))) {
    console.error(`Cloudflare challenge detected for ${room.name}, waiting 10s and retrying...`);
    await new Promise((r) => setTimeout(r, 10000));
    const retryText = await page.evaluate(() => document.body.innerText);
    if (retryText.length < 500) {
      return { workroom: room.name, client: room.client, developer: room.developer, status: 'cloudflare_blocked', error: 'Cloudflare challenge not resolved.', date };
    }
  }

  await page.screenshot({ path: path.join(SCREENSHOT_DIR, `upwork-memo-${room.name.toLowerCase()}.png`) });

  // Dedupe API memos, then fall back to DOM if none found.
  const apiSeen = new Set();
  const segments = apiMemos.filter((m) => { if (apiSeen.has(m.memo)) return false; apiSeen.add(m.memo); return true; });
  let domSegments = [];
  if (!segments.length) {
    domSegments = await scrapeDomMemos(page);
  }

  const allSegments = segments.length ? segments : domSegments;
  const classified = allSegments.map((s) => {
    const r = classifyMemo(s.memo);
    return { memo: s.memo, duration: s.duration, time: s.time, valid: r.valid, issues: r.issues };
  });

  const invalid = classified.filter((s) => !s.valid);
  const validCount = classified.length - invalid.length;

  return {
    workroom: room.name,
    client: room.client,
    developer: room.developer,
    status: 'success',
    date,
    source: segments.length ? 'api' : (domSegments.length ? 'dom' : 'none'),
    segments: classified,
    summary: {
      total_memos: classified.length,
      valid: validCount,
      invalid: invalid.length,
    },
  };
}

async function main() {
  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
  const date = argValue('date') || defaultDate();
  const workroomFilter = argValue('workroom');

  // Only hourly workrooms need memos — they have a /timesheet URL (Neural is
  // messages-only, excluded). Filter by needs_memo flag OR by having a timesheet URL.
  const workrooms = config.workrooms.filter((w) => {
    if (workroomFilter && w.name.toLowerCase() !== workroomFilter.toLowerCase()) return false;
    if (w.needs_memo === false) return false;
    return (w.url || '').includes('/timesheet') || w.workroom_id;
  });

  if (!workrooms.length) {
    console.error('No hourly Upwork workrooms found (none with /timesheet URL). Pass --workroom=NAME to force.');
    process.exit(1);
  }

  const byAccount = {};
  for (const w of workrooms) {
    const acc = w.account || config.accounts[0].name;
    if (!byAccount[acc]) byAccount[acc] = [];
    byAccount[acc].push(w);
  }

  const results = [];

  for (const [accountName, rooms] of Object.entries(byAccount)) {
    const account = config.accounts.find((a) => a.name === accountName);
    const profileDir = path.join(__dirname, '..', 'tmp', `upwork-profile-${accountName}`);
    const hasSavedProfile = fs.existsSync(path.join(profileDir, 'Default'));

    if (!hasSavedProfile && accountName !== 'carrick') {
      console.error(`No saved session for ${accountName}. Run: node scripts/upwork-login.js --login --account=${accountName}`);
      continue;
    }

    const SOCKS_DIR = path.join(__dirname, '..', 'tmp', 'chrome-socks');
    fs.mkdirSync(SOCKS_DIR, { recursive: true });

    const useVisibleBrowser = !!process.env.DISPLAY;
    const browser = await puppeteer.launch({
      headless: useVisibleBrowser ? false : 'new',
      ...(hasSavedProfile ? { userDataDir: profileDir } : {}),
      env: { ...process.env, TMPDIR: SOCKS_DIR, DISPLAY: process.env.DISPLAY || ':1' },
      args: [
        '--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage',
        '--disable-blink-features=AutomationControlled', '--window-size=1280,900',
        ...(useVisibleBrowser ? [] : ['--disable-gpu']),
      ],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 900 });
    await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36');

    let loggedIn = false;
    for (const room of rooms) {
      try {
        let data = await fetchWorkroomMemos(page, room, date);
        if (data.status === 'session_expired' && !loggedIn && account) {
          const liveOk = accountName === 'carrick' ? await injectLiveCookies(page) : false;
          if (liveOk) {
            console.error(`Live cookie injection succeeded for ${accountName}`);
            data = await fetchWorkroomMemos(page, room, date);
          }
          if (data.status === 'session_expired') {
            const cookieOk = await injectStoredCookies(page, account);
            if (cookieOk) {
              console.error(`Stored cookie injection succeeded for ${accountName}`);
              data = await fetchWorkroomMemos(page, room, date);
            }
          }
          if (data.status === 'session_expired') {
            console.error(`Session expired for ${accountName}, attempting headless re-login...`);
            const loginOk = await headlessLogin(page, account);
            if (loginOk) {
              data = await fetchWorkroomMemos(page, room, date);
            } else {
              data = { workroom: room.name, client: room.client, developer: room.developer, status: 'login_failed', error: 'Live cookies + stored + headless all failed. Check carrick Chrome Profile 1 session.', date };
            }
          }
          loggedIn = true;
        }
        results.push(data);
      } catch (err) {
        console.error(`Error fetching ${room.name}:`, err.message);
        results.push({ workroom: room.name, client: room.client, developer: room.developer, status: 'error', error: err.message, date });
      }
    }

    await browser.close();
  }

  console.log(JSON.stringify(results, null, 2));
}

main();
