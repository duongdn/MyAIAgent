#!/usr/bin/env node
/**
 * Scrin.io Login + Data Fetch (Browser-based)
 *
 * API token broken — uses Puppeteer to scrape timeline page directly.
 *
 * Usage:
 *   node scripts/scrin-login.js --login                    # Login (visible browser)
 *   node scripts/scrin-login.js --fetch                    # Fetch today's hours
 *   node scripts/scrin-login.js --fetch --date=2026-03-20  # Specific date
 *   node scripts/scrin-login.js --fetch --week             # Mon-Fri of current week
 */

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const fs = require('fs');
const path = require('path');

const CONFIG_PATH = path.join(__dirname, '..', 'config', '.scrin-config.json');
const PROFILE_DIR = path.join(__dirname, '..', 'tmp', 'scrin-browser-profile');

// Auto-login if on login page
async function ensureLoggedIn(page) {
  if (!page.url().includes('login') && !page.url().includes('signin')) return true;

  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
  console.error('Session expired, auto-logging in...');

  const emailInput = await page.$('input[type="email"]') || await page.$('input[name="email"]') || await page.$('input[type="text"]');
  const passwordInput = await page.$('input[type="password"]');
  if (!emailInput || !passwordInput) return false;

  await emailInput.click({ clickCount: 3 });
  await emailInput.type(config.login.email, { delay: 30 });
  await passwordInput.click({ clickCount: 3 });
  await passwordInput.type(config.login.password, { delay: 30 });

  const btn = await page.$('button[type="submit"]') || await page.$('input[type="submit"]');
  if (btn) await btn.click();
  await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 15000 }).catch(() => {});
  console.error('Login done, now at:', page.url());
  return !page.url().includes('login');
}

// Parse "Xh Ym" to decimal hours
function parseHM(str) {
  const m = str.match(/(\d+)h\s*(\d+)m/);
  if (m) return parseInt(m[1]) + parseInt(m[2]) / 60;
  const hOnly = str.match(/(\d+)h/);
  if (hOnly) return parseInt(hOnly[1]);
  const mOnly = str.match(/(\d+)m/);
  if (mOnly) return parseInt(mOnly[1]) / 60;
  return 0;
}

// Scrape a single day's timeline
async function scrapeDayTimeline(page, employeeId, dateStr) {
  const url = `https://scrin.io/timeline/${employeeId}/${dateStr}`;
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 20000 }).catch(() => {});

  if (!await ensureLoggedIn(page)) return null;
  // If redirected after login, navigate again
  if (!page.url().includes('timeline')) {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 20000 }).catch(() => {});
  }

  await new Promise(r => setTimeout(r, 1500));

  return page.evaluate(() => {
    const body = document.body?.innerText || '';

    // Extract day total: pattern "Xh Ym" right after date line
    const dayMatch = body.match(/\n(\d+h\s*\d+m)\n/);
    const dayTotal = dayMatch ? dayMatch[1] : '0h 00m';

    // Extract week + month totals
    const weekMatch = body.match(/Week\s+(\d+h\s*\d+m)/);
    const monthMatch = body.match(/Month\s+(\d+h\s*\d+m)/);

    // Extract task breakdown from the Tasks tab
    const taskRows = [...document.querySelectorAll('table tr')];
    const tasks = [];
    for (const row of taskRows) {
      const cells = [...row.querySelectorAll('td')];
      if (cells.length >= 2) {
        const name = cells[0]?.innerText?.trim();
        const time = cells[1]?.innerText?.trim();
        // Only accept clean task rows: short name + simple time format
        if (name && time && !name.includes('\n') && time.match(/^\d+h\s*\d+m$|^\d+m$/)) {
          tasks.push({ name, time });
        }
      }
    }

    return {
      url: window.location.href,
      title: document.title,
      dayTotal,
      weekTotal: weekMatch ? weekMatch[1] : null,
      monthTotal: monthMatch ? monthMatch[1] : null,
      tasks,
    };
  });
}

// Login mode — visible browser
async function login() {
  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
  fs.mkdirSync(path.dirname(PROFILE_DIR), { recursive: true });

  const browser = await puppeteer.launch({
    headless: false,
    userDataDir: PROFILE_DIR,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1280,900'],
  });

  const page = await browser.newPage();
  await page.goto('https://scrin.io/login', { waitUntil: 'networkidle2', timeout: 30000 });

  if (page.url().includes('login')) {
    const emailInput = await page.$('input[type="email"]') || await page.$('input[name="email"]') || await page.$('input[type="text"]');
    const passwordInput = await page.$('input[type="password"]');
    if (emailInput && passwordInput) {
      await emailInput.click({ clickCount: 3 });
      await emailInput.type(config.login.email, { delay: 50 });
      await passwordInput.click({ clickCount: 3 });
      await passwordInput.type(config.login.password, { delay: 50 });
      const btn = await page.$('button[type="submit"]') || await page.$('input[type="submit"]');
      if (btn) await btn.click();
      await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 15000 }).catch(() => {});
    }
  }

  // Grab API token
  await page.goto('https://scrin.io/account', { waitUntil: 'networkidle2', timeout: 15000 });
  const token = await page.evaluate(() => {
    const input = document.querySelector('#api-content2 input[readonly]');
    return input ? input.value : null;
  });
  if (token) {
    config.api_token = token;
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
    console.log('Token saved:', token.slice(0, 10) + '...');
  }

  console.log('Login complete. Press Ctrl+C to close.');
  await new Promise(r => setTimeout(r, 300000));
  await browser.close();
}

// Fetch mode — headless, structured output
async function fetchHours(dateStr, weekMode) {
  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
  const company = config.companies.find(c => c.active);
  fs.mkdirSync(path.dirname(PROFILE_DIR), { recursive: true });

  const browser = await puppeteer.launch({
    headless: 'new',
    userDataDir: PROFILE_DIR,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  if (weekMode) {
    // Fetch Mon-Fri of the week containing dateStr
    const d = new Date(dateStr + 'T00:00:00');
    const dayOfWeek = d.getDay(); // 0=Sun
    const monday = new Date(d);
    monday.setDate(d.getDate() - ((dayOfWeek + 6) % 7));

    const days = [];
    for (let i = 0; i < 5; i++) {
      const day = new Date(monday);
      day.setDate(monday.getDate() + i);
      const ds = day.toISOString().slice(0, 10);
      const result = await scrapeDayTimeline(page, company.employee_id, ds);
      days.push({
        date: ds,
        dayTotal: result ? result.dayTotal : 'error',
        tasks: result ? result.tasks : [],
      });
    }

    // Get week/month total from the last scraped day
    const lastDay = await scrapeDayTimeline(page, company.employee_id, dateStr);

    console.log(JSON.stringify({
      employee: company.employee_name,
      company: company.name,
      mode: 'week',
      weekOf: monday.toISOString().slice(0, 10),
      weekTotal: lastDay?.weekTotal || null,
      monthTotal: lastDay?.monthTotal || null,
      days,
    }, null, 2));
  } else {
    // Single day
    const result = await scrapeDayTimeline(page, company.employee_id, dateStr);
    if (result) {
      console.log(JSON.stringify({
        employee: company.employee_name,
        company: company.name,
        mode: 'day',
        date: dateStr,
        dayTotal: result.dayTotal,
        dayHours: parseHM(result.dayTotal),
        weekTotal: result.weekTotal,
        monthTotal: result.monthTotal,
        tasks: result.tasks,
      }, null, 2));
    } else {
      console.error('Failed to scrape timeline');
      process.exit(1);
    }
  }

  await browser.close();
}

const args = process.argv.slice(2);
if (args.includes('--login')) {
  login().catch(console.error);
} else if (args.includes('--fetch')) {
  const dateArg = args.find(a => a.startsWith('--date='));
  const dateStr = dateArg ? dateArg.split('=')[1] : new Date().toISOString().slice(0, 10);
  fetchHours(dateStr, args.includes('--week')).catch(console.error);
} else {
  console.log('Usage:');
  console.log('  node scripts/scrin-login.js --login                    # Browser login');
  console.log('  node scripts/scrin-login.js --fetch                    # Today hours');
  console.log('  node scripts/scrin-login.js --fetch --date=2026-03-20  # Specific date');
  console.log('  node scripts/scrin-login.js --fetch --week             # Current week Mon-Fri');
}
