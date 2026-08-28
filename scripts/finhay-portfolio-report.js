/**
 * Finhay Securities (invest.fhsc.com.vn, backed by VinaSecurities API) —
 * fetch fund/asset summary. Finhay's value here is a FUND holding (VCBF/etc
 * distributed via Finhay), not individual stocks — the stock sub-accounts
 * are near-zero.
 *
 * Auth strategy: persistent Chrome profile in tmp/finhay-chrome-profile/
 *   - First run: opens headed Chrome, user manually logs in (email/password,
 *     possibly OTP) — no autofill attempted (no saved creds, and per the
 *     VCBS lesson, don't automate login clicks on unfamiliar SPAs).
 *   - Subsequent runs: headless, session persists via cookies/localStorage.
 *
 * Unlike VCBS, api.vinasecurities.com's endpoints could NOT be called via a
 * manual page.evaluate(fetch(...)) injection — every attempt returned
 * "Failed to fetch", even with the Authorization bearer token from
 * localStorage.access_token attached. This is almost certainly a CORS
 * preflight rejection (adding a custom Authorization header turns a simple
 * GET into a preflighted request, and the API's CORS policy apparently
 * doesn't allow that from an injected/non-bundled context). Workaround:
 * PASSIVELY intercept the response the SPA's own bundled JS makes when the
 * page loads (same technique as the discovery tool), instead of firing our
 * own fetch.
 *
 * Endpoint captured this way: GET
 * https://api.vinasecurities.com/accounts/v3/users/{userId}/assets/summary
 * -> { net_asset_value, products: {fund, stock, bond, ...}, pnl: {fund: {pnl, pnl_rate}, ...} }
 * No itemized per-fund-certificate breakdown found yet (clicking into fund
 * detail on web redirects to app-store deep link, dead end on web) — total +
 * P/L only for now.
 *
 * Usage:
 *   node scripts/finhay-portfolio-report.js              # fetch & print data JSON
 *   node scripts/finhay-portfolio-report.js --headed      # force visible browser (for first login)
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const PROFILE_DIR = path.join(__dirname, '../tmp/finhay-chrome-profile');
const ASSET_URL = 'https://invest.fhsc.com.vn/tai-san';
const FORCE_HEADED = process.argv.includes('--headed');

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

  let assetSummary = null;
  page.on('response', async (res) => {
    try {
      const url = res.url();
      if (!url.includes('/assets/summary')) return;
      const json = await res.json().catch(() => null);
      if (json && json.data) assetSummary = json.data;
    } catch (e) {
      // ignore
    }
  });

  await page.goto(ASSET_URL, { waitUntil: 'networkidle2', timeout: 60000 }).catch((e) => console.error('goto error:', e.message));
  await new Promise((r) => setTimeout(r, 4000));

  if (!assetSummary) {
    const bodyText = await page.evaluate(() => document.body.innerText).catch(() => '');
    const loggedIn = /Đăng xuất|Tài sản ròng|NAV/i.test(bodyText);
    if (!loggedIn) {
      console.error('[finhay] Not authenticated or assets/summary not captured.');
      if (FORCE_HEADED) {
        console.error('[finhay] Log in manually (email/password/OTP), then navigate to "Tài sản" tab. Waiting 90s...');
        await new Promise((r) => setTimeout(r, 90000));
      } else {
        console.error('[finhay] Re-run with --headed to log in manually once.');
        await browser.close();
        process.exit(1);
      }
    }
  }

  if (!assetSummary) {
    console.error('[finhay] Could not capture assets/summary response — check tmp/finhay-chrome-profile session or page structure may have changed.');
    await browser.close();
    process.exit(1);
  }

  const result = {
    netAssetValue: assetSummary.net_asset_value,
    fundValue: assetSummary.products?.fund ?? null,
    stockValue: assetSummary.products?.stock ?? null,
    cash: assetSummary.money?.total ?? null,
    fundPnl: assetSummary.pnl?.fund?.pnl ?? null,
    fundPnlRate: assetSummary.pnl?.fund?.pnl_rate ?? null,
  };

  console.log(JSON.stringify(result, null, 2));
  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
