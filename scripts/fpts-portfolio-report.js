/**
 * FPTS EzTrade — fetch stock portfolio (Báo cáo tài sản / AssetReport2).
 *
 * Auth strategy: persistent Chrome profile in tmp/fpts-chrome-profile/
 *   - First run: opens headed Chrome, auto-fills account number + password
 *     from config/.broker-accounts.json, user enters OTP manually.
 *   - The portfolio page (report/AssetReport2) is server-rendered HTML,
 *     not a JSON API — so this script scrapes the DOM table directly
 *     instead of intercepting XHR/fetch calls.
 *
 * Usage:
 *   node scripts/fpts-portfolio-report.js              # fetch & print data JSON
 *   node scripts/fpts-portfolio-report.js --headed      # force visible browser (for OTP/login)
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const PROFILE_DIR = path.join(__dirname, '../tmp/fpts-chrome-profile');
const REPORT_URL = 'https://eztrade.fpts.com.vn/report/AssetReport2';
const FORCE_HEADED = process.argv.includes('--headed');

function loadCreds() {
  try {
    const cfg = JSON.parse(fs.readFileSync(path.join(__dirname, '../config/.broker-accounts.json'), 'utf8'));
    return cfg.fpts || null;
  } catch (e) {
    return null;
  }
}

async function tryAutofill(page, creds) {
  if (!creds) return false;
  await new Promise((r) => setTimeout(r, 1500));
  return page.evaluate((accountNumber, password) => {
    const inputs = Array.from(document.querySelectorAll('input'));
    const textInput = inputs.find(i => (i.type === 'text' || i.type === 'tel' || i.type === '') && i.offsetParent !== null);
    const passInput = inputs.find(i => i.type === 'password' && i.offsetParent !== null);
    if (!textInput || !passInput) return false;
    const setVal = (el, val) => {
      const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
      setter.call(el, val);
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
    };
    setVal(textInput, accountNumber);
    setVal(passInput, password);
    return true;
  }, creds.accountNumber, creds.password);
}

async function scrapeAssetReport(page) {
  return page.evaluate(() => {
    const text = (el) => (el ? el.textContent.trim() : null);
    const num = (s) => {
      if (s == null) return null;
      const n = parseFloat(s.replace(/[^0-9.-]/g, ''));
      return Number.isNaN(n) ? null : n;
    };

    // Summary panel (left column): "GIÁ TRỊ TÀI SẢN RÒNG", "CHỨNG KHOÁN", "TIỀN", "DƯ NỢ VAY KÝ QUỸ"
    const summary = {};
    document.querySelectorAll('*').forEach((el) => {
      if (el.children.length === 0) return; // leaf-only skip handled below via row scan
    });

    // Holdings table: header row has "Mã CK" — find that table.
    let holdingsTable = null;
    document.querySelectorAll('table').forEach((t) => {
      if (t.innerText.includes('Mã CK') && t.innerText.includes('Giá TT')) holdingsTable = t;
    });

    const holdings = [];
    if (holdingsTable) {
      const rows = Array.from(holdingsTable.querySelectorAll('tbody tr, tr'));
      rows.forEach((row) => {
        const cells = Array.from(row.querySelectorAll('td')).map((td) => text(td));
        if (cells.length < 5) return;
        const symbol = cells[0];
        if (!symbol || symbol.toUpperCase() === 'TỔNG' || /mã ck/i.test(symbol)) return;
        // Table uses colspan to collapse the zero-value "CK mua chờ về/quyền/cầm cố/hạn chế"
        // sub-columns into one cell when they're all 0 — so a normal row has 10 cells:
        // [symbol, CK có sẵn, <collapsed 0>, Tổng KL, Giá TT, Thành tiền, Giá vốn TB, Tổng giá vốn, Lãi/Lỗ, % Lãi/Lỗ]
        holdings.push({
          symbol,
          quantityAvailable: num(cells[1]),
          totalQuantity: num(cells[3]),
          marketPrice: num(cells[4]),
          marketValue: num(cells[5]),
          avgCost: num(cells[6]),
          totalCost: num(cells[7]),
          unrealizedPL: num(cells[8]),
          unrealizedPLPercent: cells[9] || null,
          raw: cells,
        });
      });
    }

    // Net asset value line
    const bodyText = document.body.innerText;
    const navMatch = bodyText.match(/GIÁ TRỊ TÀI SẢN RÒNG[\s\S]*?([\d]{1,3}(?:,\d{3})+)/i);
    const cashMatch = bodyText.match(/Tiền trong tài khoản[\s\S]*?([\d]{1,3}(?:,\d{3})*|\d+)/i);
    const stockValueMatch = bodyText.match(/Chứng khoán có sẵn[\s\S]*?([\d]{1,3}(?:,\d{3})+)/i);
    const marginDebtMatch = bodyText.match(/DƯ NỢ VAY KÝ QUỸ[\s\S]*?(\d+)/i);

    return {
      netAssetValue: navMatch ? num(navMatch[1]) : null,
      cashInAccount: cashMatch ? num(cashMatch[1]) : null,
      stockValueAvailable: stockValueMatch ? num(stockValueMatch[1]) : null,
      marginDebt: marginDebtMatch ? num(marginDebtMatch[1]) : null,
      holdings,
      bodyTextSnippet: bodyText.slice(0, 2000),
    };
  });
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
  await page.goto(REPORT_URL, { waitUntil: 'networkidle2', timeout: 60000 }).catch((e) => console.error('goto error:', e.message));

  const url = page.url();
  if (url.includes('Login') || url.includes('login')) {
    console.error('[fpts] Not authenticated — session expired or first run. Re-launching headed for manual login.');
    await tryAutofill(page, loadCreds());
    console.error('[fpts] Log in (incl. OTP) in the opened browser, then navigate to the asset report page. Waiting 90s...');
    await new Promise((r) => setTimeout(r, 90000));
  }

  await page.waitForSelector('table', { timeout: 15000 }).catch(() => {});
  const data = await scrapeAssetReport(page);

  console.log(JSON.stringify(data, null, 2));
  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
