/**
 * Final batch: Sacombank, TPBank, Techcombank app, and a few others
 * that are known for prominent online rate promotion.
 */
const path = require('path');
const os   = require('os');

let puppeteer;
try { puppeteer = require('puppeteer'); }
catch { puppeteer = require(path.join(os.homedir(), 'projects/My-AI-Agent/node_modules/puppeteer')); }

const CHROME = '/usr/bin/google-chrome';

const TARGETS = [
  // Sacombank has a dedicated online savings page
  { name: 'Sacombank-online', url: 'https://www.sacombank.com.vn/ca-nhan/tiet-kiem/tiet-kiem-online' },
  { name: 'Sacombank-rates',  url: 'https://www.sacombank.com.vn/ca-nhan/tiet-kiem/lai-suat' },
  // TPBank with app/digital URL
  { name: 'TPBank-online',    url: 'https://tpbank.com.vn/ca-nhan/tiet-kiem/lai-suat-tiet-kiem' },
  // Vietbank (small, simpler site)
  { name: 'Vietbank-rates',   url: 'https://vietbank.com.vn/lai-suat-tiet-kiem' },
  // Bac A Bank rate table
  { name: 'BacABank-rates',   url: 'https://www.baca-bank.vn/lai-suat/lai-suat-tiet-kiem' },
  // Orient Commercial Bank
  { name: 'OCB-rates',        url: 'https://www.ocb.com.vn/lai-suat/tiet-kiem' },
  // IVB (IndoVina Bank)
  { name: 'IVB',              url: 'https://www.indovinabank.com.vn/ca-nhan/tiet-kiem/lai-suat' },
  // Woori Bank Vietnam
  { name: 'Woori',            url: 'https://www.wooribank.com.vn/ca-nhan/tiet-kiem/lai-suat-tiet-kiem' },
  // CIMB Vietnam
  { name: 'CIMB-VN',          url: 'https://www.cimb.com.vn/vn/ca-nhan/tiet-kiem/lai-suat' },
  // Shinhan Bank Vietnam
  { name: 'Shinhan-VN',       url: 'https://www.shinhan.com.vn/ca-nhan/tiet-kiem/lai-suat' },
];

function extractRates(rows) {
  function toFloat(s) {
    const v = parseFloat(String(s || '').replace(',', '.').replace('%', '').trim());
    return (v >= 2.5 && v <= 12.0) ? v : null;
  }
  const TERM_RE = [
    [/^1\s*tháng/i, 'm1'], [/^3\s*tháng/i, 'm3'],
    [/^6\s*tháng/i, 'm6'], [/^12\s*tháng|^1\s*năm/i, 'm12'],
  ];
  const result = {};
  for (const row of rows) {
    for (const [re, field] of TERM_RE) {
      if (re.test(row[0])) {
        const v = toFloat(row[1]);
        if (v) result[field] = v;
      }
    }
  }
  if (Object.keys(result).length >= 3) return result;
  const colMap = {};
  for (let i = 0; i < rows.length; i++) {
    rows[i].forEach((cell, idx) => {
      for (const [re, field] of TERM_RE) {
        if (re.test(cell)) colMap[idx] = field;
      }
    });
    if (Object.keys(colMap).length >= 3 && i + 1 < rows.length) {
      const r = {};
      for (const [col, field] of Object.entries(colMap)) {
        const v = toFloat(rows[i + 1][col]);
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
           '--ignore-certificate-errors'],
    headless: true,
  });
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/120.0 Safari/537.36');
  await page.setViewport({ width: 1280, height: 900 });

  let tableCount = 0, textLen = 0, foundRates = null, err = null, hasTerm = false;
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
    try {
      await page.waitForFunction(
        () => Array.from(document.querySelectorAll('table')).some(t => {
          const text = t.innerText || '';
          return /[3456789]\.\d{1,2}/.test(text) && /tháng|năm/i.test(text);
        }),
        { timeout: 30000 }
      );
    } catch (_) {}
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
      const body = document.body.innerText;
      return {
        tableCount: tables.length,
        textLen: body.length,
        hasTerm: /1\s*tháng|3\s*tháng|6\s*tháng|12\s*tháng|1\s*năm/i.test(body),
        allRows,
      };
    });
    tableCount = info.tableCount;
    textLen = info.textLen;
    hasTerm = info.hasTerm;
    foundRates = extractRates(info.allRows);
  } catch (e) {
    err = e.message.slice(0, 80);
  }
  await browser.close();
  return { name, tableCount, textLen, hasTerm, foundRates, err };
}

(async () => {
  console.log('Final batch probe:\n');
  for (const target of TARGETS) {
    process.stdout.write(`  ${target.name.padEnd(18)} → `);
    const r = await probe(target);
    if (r.err) {
      console.log(`ERROR: ${r.err}`);
    } else {
      const rateStr = r.foundRates ? JSON.stringify(r.foundRates) : 'none';
      console.log(`tables=${r.tableCount} text=${r.textLen} term=${r.hasTerm} rates=${rateStr}`);
    }
  }
})();
