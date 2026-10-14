#!/usr/bin/env node
/**
 * MPFC upgrade smoke test — logs in as admin + member on the upgrade test server
 * (basic auth protected) and visits every admin-menu page, member pages and
 * front-end pages, recording HTTP status + visible PHP errors + JS console errors.
 *
 * Usage: node scripts/mpfc-upgrade-smoke-test.js [baseUrl] > out.json
 * Creds: config/.digitalocean-config.json (basic_auth, test_users) — run decrypt-secrets.sh first.
 */
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const cfg = JSON.parse(fs.readFileSync(path.join(__dirname, '../config/.digitalocean-config.json'), 'utf8'));
const BASE = (process.argv[2] || `https://${cfg.basic_auth.host}`).replace(/\/$/, '');
const LOGIN = BASE + (cfg.test_users.login_path || '/wp-login.php');
const PHP_ERR = /(Fatal error|Parse error|critical error on this website|There has been a critical error|Warning<\/b>:|Uncaught )/i;

async function visit(page, url, results, label) {
  const consoleErrors = [];
  const onConsole = (m) => { if (m.type() === 'error') consoleErrors.push(m.text().slice(0, 200)); };
  page.on('console', onConsole);
  let status = 0, title = '', phpError = null, finalUrl = url;
  try {
    const res = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    status = res ? res.status() : 0;
    finalUrl = page.url();
    title = (await page.title()).slice(0, 80);
    const html = await page.content();
    const m = html.match(PHP_ERR);
    if (m) phpError = html.slice(Math.max(0, m.index - 50), m.index + 250).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ');
  } catch (e) {
    phpError = 'NAV_ERROR: ' + e.message.slice(0, 150);
  }
  page.off('console', onConsole);
  results.push({ label, url: url.replace(BASE, ''), status, finalUrl: finalUrl.replace(BASE, ''), title, phpError, consoleErrors: consoleErrors.slice(0, 5) });
}

// Admin: wp login form (custom slug from wps-hide-login). Member: MemberMouse form on /login/ (needs mm-security nonce).
async function login(page, user, pass, mm = false) {
  await page.goto(mm ? BASE + '/login/' : LOGIN, { waitUntil: 'domcontentloaded', timeout: 60000 });
  const [u, p, btn] = mm ? ['#mm-login-form #log', '#mm-login-form #pwd', '#mm-login-button'] : ['#user_login', '#user_pass', '#wp-submit'];
  await page.type(u, user);
  await page.type(p, pass);
  await Promise.all([page.waitForNavigation({ timeout: 60000 }).catch(() => {}), page.click(btn)]);
  return page.url();
}

// Content has absolute live-domain links -> rewrite to the test base before filtering.
async function collectLinks(page, selector, filter) {
  const hrefs = (await page.$$eval(selector, (as) => as.map((a) => a.href.split('#')[0])))
    .map((h) => h.replace(/^https?:\/\/(www\.)?mypersonalfootballcoach\.com/, BASE));
  return [...new Set(hrefs.filter(filter))];
}

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const results = [];
  const sameSite = (h) => h.startsWith(BASE) && !/logout|action=delete|trash|deactivate|activate=|action=|_wpnonce|customize\.php/.test(h);

  const only = process.env.ONLY ? process.env.ONLY.split(',') : ['admin', 'member', 'guest'];
  // --- Admin ---
  if (only.includes('admin')) {
  const ctx = await browser.createBrowserContext();
  const page = await ctx.newPage();
  await page.authenticate({ username: cfg.basic_auth.user, password: cfg.basic_auth.password });
  const afterAdmin = await login(page, cfg.test_users.admin.user, cfg.test_users.admin.password);
  results.push({ label: 'admin-login', url: LOGIN.replace(BASE, ''), finalUrl: afterAdmin.replace(BASE, '') });
  await page.goto(BASE + '/wp-admin/', { waitUntil: 'domcontentloaded', timeout: 60000 });
  const adminLinks = await collectLinks(page, '#adminmenu a', sameSite);
  for (const u of adminLinks) await visit(page, u, results, 'admin');
  await ctx.close();
  }

  // --- Member: crawl links found on home + my-account + post-login landing page ---
  if (only.includes('member')) {
    const ctx = await browser.createBrowserContext();
    const page = await ctx.newPage();
    await page.authenticate({ username: cfg.basic_auth.user, password: cfg.basic_auth.password });
    const afterMember = await login(page, cfg.test_users.member.user, cfg.test_users.member.password, true);
    results.push({ label: 'member-login', url: '/login/', finalUrl: afterMember.replace(BASE, '') });
    const seen = new Set();
    let found = [];
    for (const u of [afterMember, BASE + '/', BASE + '/my-account/']) {
      if (seen.has(u)) continue; seen.add(u);
      await visit(page, u, results, 'member');
      found = found.concat(await collectLinks(page, 'a', sameSite));
    }
    const memberLinks = [...new Set(found)].filter((u) => !u.includes('/wp-admin') && !seen.has(u)).slice(0, 80);
    for (const u of memberLinks) { seen.add(u); await visit(page, u, results, 'member'); }
    await ctx.close();
  }

  // --- Anonymous front-end (links from home) ---
  if (only.includes('guest')) {
    const ctx = await browser.createBrowserContext();
    const page = await ctx.newPage();
    await page.authenticate({ username: cfg.basic_auth.user, password: cfg.basic_auth.password });
    await visit(page, BASE + '/', results, 'guest');
    const guestLinks = (await collectLinks(page, 'a', sameSite)).slice(0, 60);
    for (const u of guestLinks) await visit(page, u, results, 'guest');
    await ctx.close();
  }

  await browser.close();
  process.stdout.write(JSON.stringify(results, null, 1));
})().catch((e) => { console.error(e); process.exit(1); });
