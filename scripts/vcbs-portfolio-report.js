/**
 * VCBS (Vietcombank Securities) — fetch stock portfolio via invest.vcbs.com.vn's own JSON APIs.
 *
 * Auth strategy: persistent Chrome profile in tmp/vcbs-chrome-profile/
 *   - First run: opens headed Chrome, user manually clicks "Đăng nhập", enters
 *     account/password/OTP once (VCBS's React SPA login form proved too fragile
 *     to reliably automate via coordinate-clicking — see memory
 *     feedback_vcbs_automation_abandoned_use_fpts_pattern_only).
 *   - Subsequent runs: headless, session persists via saved cookies — no login needed.
 *
 * Unlike FPTS (server-rendered HTML report), VCBS's platform is a React SPA backed
 * by real JSON REST APIs under connect.vcbs.com.vn — much easier to parse once past login:
 *   - GET /inquiry/custodyAccounts/{custodyId}/accounts           -> trading account id(s)
 *   - GET /inquiry/custodyAccounts/{custodyId}/accounts/{id}/positions -> stock holdings
 *   - GET /inquiry/custodyAccounts/{custodyId}/accounts/{id}/state     -> NAV, cash, liabilities
 *
 * Usage:
 *   node scripts/vcbs-portfolio-report.js              # fetch & print data JSON
 *   node scripts/vcbs-portfolio-report.js --headed      # force visible browser (for first login)
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const PROFILE_DIR = path.join(__dirname, '../tmp/vcbs-chrome-profile');
const ASSET_URL = 'https://invest.vcbs.com.vn/#/asset';
const FORCE_HEADED = process.argv.includes('--headed');

function loadCreds() {
  try {
    const cfg = JSON.parse(fs.readFileSync(path.join(__dirname, '../config/.broker-accounts.json'), 'utf8'));
    return cfg.vcbs || null;
  } catch (e) {
    return null;
  }
}

async function getAccessToken(page) {
  return page.evaluate(() => {
    try {
      const raw = localStorage.getItem('token_VCBS');
      if (!raw) return null;
      const parsed = JSON.parse(JSON.parse(raw));
      return parsed.access_token || null;
    } catch (e) {
      return null;
    }
  });
}

async function fetchJson(page, url, token) {
  return page.evaluate(async (u, t) => {
    const res = await fetch(u, {
      credentials: 'include',
      headers: t ? { Authorization: `Bearer ${t}` } : {},
    });
    return res.json();
  }, url, token);
}

async function main() {
  fs.mkdirSync(PROFILE_DIR, { recursive: true });
  const browser = await puppeteer.launch({
    headless: !FORCE_HEADED ? 'new' : false,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-blink-features=AutomationControlled',
      `--user-data-dir=${PROFILE_DIR}`,
    ],
    defaultViewport: null,
  });

  const page = (await browser.pages())[0] || (await browser.newPage());
  await page.goto(ASSET_URL, { waitUntil: 'networkidle2', timeout: 60000 }).catch((e) => console.error('goto error:', e.message));
  await new Promise((r) => setTimeout(r, 2500));

  const creds = loadCreds();
  const bodyText = await page.evaluate(() => document.body.innerText);
  const loggedIn = /Tổng quan tài sản|Danh mục/i.test(bodyText) && !/Đăng nhập\s*$/.test(bodyText.trim());

  if (!loggedIn) {
    console.error('[vcbs] Not authenticated — session expired or first run.');
    if (FORCE_HEADED) {
      console.error('[vcbs] Log in manually (click "Đăng nhập", enter account/password/OTP), then re-run this script (headless will then work).');
      await new Promise((r) => setTimeout(r, 120000));
    } else {
      console.error('[vcbs] Re-run with --headed to log in manually once.');
      await browser.close();
      process.exit(1);
    }
  }

  if (!creds || !creds.accountNumber) {
    console.error('[vcbs] No custody account number in config/.broker-accounts.json — cannot query APIs.');
    await browser.close();
    process.exit(1);
  }
  const custodyId = creds.accountNumber;
  const token = await getAccessToken(page);
  if (!token) {
    console.error('[vcbs] Could not read access_token from localStorage — session may be invalid, re-run with --headed.');
    await browser.close();
    process.exit(1);
  }

  const accountsResp = await fetchJson(page, `https://connect.vcbs.com.vn/inquiry/custodyAccounts/${custodyId}/accounts`, token);
  const accountId = accountsResp?.d?.[0]?.id;
  if (!accountId) {
    console.error('[vcbs] Could not resolve trading accountId from /accounts response:', JSON.stringify(accountsResp));
    await browser.close();
    process.exit(1);
  }

  const [positionsResp, stateResp] = await Promise.all([
    fetchJson(page, `https://connect.vcbs.com.vn/inquiry/custodyAccounts/${custodyId}/accounts/${accountId}/positions`, token),
    fetchJson(page, `https://connect.vcbs.com.vn/inquiry/custodyAccounts/${custodyId}/accounts/${accountId}/state`, token),
  ]);

  const holdings = (positionsResp?.d || []).map((p) => ({
    symbol: p.instrument,
    totalQty: p.totalQty,
    availableQty: p.availableQty,
    avgPrice: p.avgPrice,
    currentPrice: p.currentPrice,
    initialValue: p.initialValue,
    currentValue: p.currentValue,
    unrealizedPl: p.unrealizedPl,
  }));

  const state = stateResp?.d || {};
  const result = {
    custodyAccountId: custodyId,
    accountId,
    nav: state.nav ?? null,
    cash: state.totalCashBal ?? null,
    totalLiabilities: state.totalLiabilitiesBal ?? null,
    availableValue: state.availableValue ?? null,
    holdings,
  };

  console.log(JSON.stringify(result, null, 2));
  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
