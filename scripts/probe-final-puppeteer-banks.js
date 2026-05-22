/**
 * Final Puppeteer probe: BIDV + major banks with 40s waitForSelector.
 * Strategy: wait for tables to appear, then scan for rate values.
 */
const path = require('path');
const os   = require('os');

let puppeteer;
try { puppeteer = require('puppeteer'); }
catch { puppeteer = require(path.join(os.homedir(), 'projects/My-AI-Agent/node_modules/puppeteer')); }

const CHROME = '/usr/bin/google-chrome';

const BANKS = [
  { name: 'BIDV',        url: 'https://bidv.com.vn/ca-nhan/tiet-kiem/tiet-kiem-truc-tuyen' },
  { name: 'Techcombank', url: 'https://techcombank.com.vn/ca-nhan/tiet-kiem-va-tich-luy/tiet-kiem-online-techcombank' },
  { name: 'VPBank',      url: 'https://www.vpbank.com.vn/ca-nhan/tiet-kiem-va-dau-tu/tiet-kiem-truc-tuyen' },
  { name: 'MB',          url: 'https://www.mbbank.com.vn/ca-nhan/tiet-kiem/tiet-kiem-online' },
  { name: 'VCB',         url: 'https://www.vietcombank.com.vn/vi-VN/KHCN/Tien-gui/Lai-suat' },
  { name: 'VietinBank',  url: 'https://www.vietinbank.vn/ca-nhan/tiet-kiem/lai-suat-tiet-kiem.html' },
  { name: 'HDBank',      url: 'https://www.hdbank.com.vn/ca-nhan/tiet-kiem/lai-suat-tiet-kiem' },
  { name: 'Eximbank',    url: 'https://www.eximbank.com.vn/ca-nhan/tiet-kiem-online/lai-suat' },
  { name: 'Agribank',    url: 'https://www.agribank.com.vn/vn/khach-hang-ca-nhan/tiet-kiem/lai-suat' },
];

function extractRates(rows) {
  function toFloat(s) {
    const v = parseFloat(String(s || '').replace(',', '.').replace('%', '').trim());
    return (v >= 2.0 && v <= 12.0) ? v : null;
  }
  const result = {};
  const TERM_RE = [
    [/^1\s*tháng$/i, 'm1'], [/^3\s*tháng$/i, 'm3'],
    [/^6\s*tháng$/i, 'm6'], [/^12\s*tháng$/i, 'm12'],
  ];
  // Try vertical (term in col 0, rate in col 1)
  for (const row of rows) {
    for (const [re, field] of TERM_RE) {
      if (re.test(row[0])) {
        const v = toFloat(row[1]);
        if (v) result[field] = v;
      }
    }
  }
  if (Object.keys(result).length >= 3) return result;
  // Try horizontal (term in header row)
  const colMap = {};
  for (let i = 0; i < rows.length; i++) {
    rows[i].forEach((cell, idx) => {
      if (/^1\s*tháng$/i.test(cell)) colMap[idx] = 'm1';
      else if (/^3\s*tháng$/i.test(cell)) colMap[idx] = 'm3';
      else if (/^6\s*tháng$/i.test(cell)) colMap[idx] = 'm6';
      else if (/^12\s*tháng$/i.test(cell) || /^1\s*năm$/i.test(cell)) colMap[idx] = 'm12';
    });
    if (Object.keys(colMap).length >= 3 && i + 1 < rows.length) {
      const dataRow = rows[i + 1];
      const r = {};
      for (const [col, field] of Object.entries(colMap)) {
        const v = toFloat(dataRow[col]);
        if (v) r[field] = v;
      }
      if (Object.keys(r).length >= 3) return r;
    }
  }
  return null;
}

async function probe({ name, url }) {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage',
           '--ignore-certificate-errors', '--ignore-ssl-errors'],
    headless: true,
  });
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/120.0 Safari/537.36');
  await page.setViewport({ width: 1280, height: 900 });

  let tableCount = 0, textLen = 0, foundRates = null, err = null;
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
    // Wait up to 35s for at least 1 table with rate data to appear
    try {
      await page.waitForFunction(
        () => Array.from(document.querySelectorAll('table')).some(t => {
          const text = t.innerText || '';
          return /[456789]\.\d{2}/.test(text) && /tháng|năm/i.test(text);
        }),
        { timeout: 35000 }
      );
    } catch (_) { /* no rate table appeared */ }
    await new Promise(r => setTimeout(r, 1000));

    const info = await page.evaluate(() => {
      const tables = Array.from(document.querySelectorAll('table'));
      const allRows = [];
      for (const t of tables) {
        for (const tr of t.querySelectorAll('tr')) {
          const cells = Array.from(tr.querySelectorAll('td,th')).map(c => c.innerText.trim());
          if (cells.length >= 2) allRows.push(cells);
        }
      }
      return {
        tableCount: tables.length,
        textLen: document.body.innerText.length,
        hasOnline: /tiết kiệm online|tiết kiệm số|gửi online/i.test(document.body.innerText),
        allRows,
      };
    });
    tableCount = info.tableCount;
    textLen = info.textLen;
    foundRates = extractRates(info.allRows);
    if (info.hasOnline) process.stderr.write(`  [${name}] "online" keyword in DOM\n`);
  } catch (e) {
    err = e.message.slice(0, 80);
  }
  await browser.close();
  return { name, tableCount, textLen, foundRates, err };
}

(async () => {
  console.log('Final Puppeteer probe (40s timeout):\n');
  for (const bank of BANKS) {
    process.stdout.write(`  ${bank.name.padEnd(14)} → `);
    const r = await probe(bank);
    if (r.err) {
      console.log(`ERROR: ${r.err}`);
    } else {
      console.log(`tables=${r.tableCount} text=${r.textLen} rates=${r.foundRates ? JSON.stringify(r.foundRates) : 'none'}`);
    }
  }
})();
