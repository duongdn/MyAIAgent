/**
 * Probe smaller/regional VN banks for scrapeable online rate tables.
 */
const path = require('path');
const os   = require('os');

let puppeteer;
try { puppeteer = require('puppeteer'); }
catch { puppeteer = require(path.join(os.homedir(), 'projects/My-AI-Agent/node_modules/puppeteer')); }

const CHROME = '/usr/bin/google-chrome';

const BANKS = [
  { name: 'VIB',          url: 'https://www.vib.com.vn/vn/ca-nhan/tiet-kiem/lai-suat-tiet-kiem' },
  { name: 'SHB',          url: 'https://www.shb.com.vn/ca-nhan/tiet-kiem/lai-suat' },
  { name: 'NCB',          url: 'https://www.ncb-bank.vn/ca-nhan/tiet-kiem/lai-suat-tiet-kiem' },
  { name: 'NamABank',     url: 'https://www.namabank.com.vn/ca-nhan/tiet-kiem/lai-suat' },
  { name: 'Kienlongbank', url: 'https://kienlongbank.com/ca-nhan/tiet-kiem/lai-suat-tiet-kiem' },
  { name: 'PVcomBank',    url: 'https://www.pvcombank.com.vn/ca-nhan/tiet-kiem/lai-suat-tiet-kiem' },
  { name: 'LienVietPost', url: 'https://www.lienvietpostbank.com.vn/ca-nhan/tiet-kiem/lai-suat' },
  { name: 'VietCapital',  url: 'https://www.vietcapitalbank.com.vn/ca-nhan/tiet-kiem/lai-suat' },
  { name: 'OceanBank',    url: 'https://www.oceanbank.vn/ca-nhan/tiet-kiem/lai-suat-tiet-kiem' },
  { name: 'GPBank',       url: 'https://www.gpbank.com.vn/ca-nhan/tiet-kiem/lai-suat' },
  { name: 'Vietbank',     url: 'https://vietbank.com.vn/ca-nhan/tiet-kiem/lai-suat-tiet-kiem' },
  { name: 'MSB',          url: 'https://www.msb.com.vn/ca-nhan/tiet-kiem/lai-suat-tiet-kiem' },
  { name: 'VPBank-online',url: 'https://online.vpbank.com.vn/lai-suat' },
  { name: 'OCB',          url: 'https://www.ocb.com.vn/ca-nhan/tiet-kiem/lai-suat-tiet-kiem' },
  { name: 'SeABank',      url: 'https://www.seabank.com.vn/ca-nhan/tiet-kiem/lai-suat' },
  { name: 'ABBank',       url: 'https://www.abbank.vn/ca-nhan/tiet-kiem/lai-suat-tiet-kiem' },
  { name: 'BacABank',     url: 'https://www.baca-bank.vn/ca-nhan/tiet-kiem/lai-suat' },
  { name: 'VietABank',    url: 'https://www.vietabank.com.vn/ca-nhan/tiet-kiem/lai-suat-tiet-kiem' },
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
  // vertical
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
  // horizontal
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

  let tableCount = 0, textLen = 0, foundRates = null, err = null;
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
      return { tableCount: tables.length, textLen: document.body.innerText.length, allRows };
    });
    tableCount = info.tableCount;
    textLen = info.textLen;
    foundRates = extractRates(info.allRows);
  } catch (e) {
    err = e.message.slice(0, 80);
  }
  await browser.close();
  return { name, tableCount, textLen, foundRates, err };
}

(async () => {
  console.log('Small bank probe:\n');
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
