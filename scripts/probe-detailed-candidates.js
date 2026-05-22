/**
 * Deep-dive probe: inspect actual text content for banks that rendered
 * substantial text but no rate tables, plus try aggregator sites.
 */
const path = require('path');
const os   = require('os');

let puppeteer;
try { puppeteer = require('puppeteer'); }
catch { puppeteer = require(path.join(os.homedir(), 'projects/My-AI-Agent/node_modules/puppeteer')); }

const CHROME = '/usr/bin/google-chrome';

const TARGETS = [
  // Banks with substantial rendered text — check for div-based layouts
  { name: 'PVcomBank',    url: 'https://www.pvcombank.com.vn/ca-nhan/tiet-kiem/lai-suat-tiet-kiem' },
  { name: 'VIB',          url: 'https://www.vib.com.vn/vn/ca-nhan/tiet-kiem/lai-suat-tiet-kiem' },
  { name: 'SHB',          url: 'https://www.shb.com.vn/ca-nhan/tiet-kiem/lai-suat' },
  { name: 'SeABank',      url: 'https://www.seabank.com.vn/ca-nhan/tiet-kiem/lai-suat' },
  { name: 'ABBank',       url: 'https://www.abbank.vn/ca-nhan/tiet-kiem/lai-suat-tiet-kiem' },
  // Aggregator / comparison sites
  { name: 'CafeF-rates',  url: 'https://cafef.vn/lai-suat-ngan-hang.chn' },
  { name: 'Timo',         url: 'https://timo.vn/rates' },
  { name: 'laisuat-vn',   url: 'https://laisuat.vn/' },
  { name: 'nganhang-vn',  url: 'https://www.nganhang.vn/lai-suat' },
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

  let err = null, summary = null;
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
    try {
      await page.waitForFunction(
        () => Array.from(document.querySelectorAll('table,div')).some(el => {
          const text = el.innerText || '';
          return /[3456789]\.\d{1,2}/.test(text) && /tháng|năm/i.test(text);
        }),
        { timeout: 25000 }
      );
    } catch (_) {}
    await new Promise(r => setTimeout(r, 1000));

    summary = await page.evaluate(() => {
      function toFloat(s) {
        const v = parseFloat(String(s || '').replace(',', '.').replace('%', '').trim());
        return (v >= 2.5 && v <= 12.0) ? v : null;
      }
      // Table rows
      const tables = Array.from(document.querySelectorAll('table'));
      const tableRows = [];
      for (const t of tables) {
        for (const tr of t.querySelectorAll('tr')) {
          const cells = Array.from(tr.querySelectorAll('td,th')).map(c => c.innerText.trim());
          if (cells.length >= 2) tableRows.push(cells);
        }
      }
      // Look for rate-like numbers in all text
      const body = document.body.innerText;
      const rateMatches = [...body.matchAll(/[3456789]\.\d{2}/g)].map(m => m[0]).slice(0, 20);
      const hasTerm = /1 tháng|3 tháng|6 tháng|12 tháng|1 năm/i.test(body);
      // Snippet around first rate
      let snippet = '';
      const firstRate = body.match(/[3456789]\.\d{2}/);
      if (firstRate) {
        const idx = body.indexOf(firstRate[0]);
        snippet = body.slice(Math.max(0, idx - 60), idx + 60).replace(/\n/g, ' ').trim();
      }
      return {
        tableCount: tables.length,
        textLen: body.length,
        hasTerm,
        rateMatches,
        snippet,
        tableRows: tableRows.slice(0, 10),
      };
    });
  } catch (e) {
    err = e.message.slice(0, 80);
  }
  await browser.close();
  return { name, summary, err };
}

(async () => {
  for (const target of TARGETS) {
    console.log(`\n=== ${target.name} ===`);
    const r = await probe(target);
    if (r.err) {
      console.log(`  ERROR: ${r.err}`);
    } else {
      const s = r.summary;
      console.log(`  tables=${s.tableCount} text=${s.textLen} hasTerm=${s.hasTerm}`);
      console.log(`  rateNums=[${s.rateMatches.join(', ')}]`);
      if (s.snippet) console.log(`  context: "${s.snippet}"`);
      if (s.tableRows.length > 0) {
        console.log(`  table rows (first 5):`);
        s.tableRows.slice(0, 5).forEach(r => console.log(`    ${JSON.stringify(r)}`));
      }
    }
  }
})();
