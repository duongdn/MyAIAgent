/**
 * Intercept network requests to find rate API endpoints for banks that block DOM scraping.
 * Captures XHR/fetch calls containing rate-related keywords.
 */
const path = require('path');
const os   = require('os');

let puppeteer;
try { puppeteer = require('puppeteer'); }
catch { puppeteer = require(path.join(os.homedir(), 'projects/My-AI-Agent/node_modules/puppeteer')); }

const CHROME = '/usr/bin/google-chrome';

const TARGETS = [
  { name: 'VIB',         url: 'https://www.vib.com.vn/vn/ca-nhan/tiet-kiem/lai-suat-tiet-kiem' },
  { name: 'Techcombank', url: 'https://techcombank.com.vn/ca-nhan/tiet-kiem-va-tich-luy/tiet-kiem-online-techcombank' },
  { name: 'VPBank',      url: 'https://www.vpbank.com.vn/ca-nhan/tiet-kiem-va-dau-tu/tiet-kiem-truc-tuyen' },
  { name: 'MB',          url: 'https://www.mbbank.com.vn/ca-nhan/tiet-kiem/tiet-kiem-online' },
  { name: 'Sacombank',   url: 'https://www.sacombank.com.vn/ca-nhan/tiet-kiem/lai-suat' },
];

async function probe({ name, url }) {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage',
           '--ignore-certificate-errors'],
    headless: true,
  });
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/120.0 Safari/537.36');

  const apiHits = [];
  page.on('response', async resp => {
    const respUrl = resp.url();
    const ct = resp.headers()['content-type'] || '';
    if (!ct.includes('json') && !ct.includes('javascript')) return;
    if (!/lai.su|rate|interest|deposit|saving|tiet.kiem/i.test(respUrl)) return;
    try {
      const text = await resp.text();
      if (/[3456789]\.\d{2}/.test(text) && (/tháng|month|term|kỳ|ky/i.test(text) || /m1|m3|m6|m12/i.test(text))) {
        apiHits.push({ url: respUrl, preview: text.slice(0, 200) });
      }
    } catch (_) {}
  });

  let err = null;
  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(r => setTimeout(r, 3000));
  } catch (e) {
    err = e.message.slice(0, 60);
  }
  await browser.close();
  return { name, apiHits, err };
}

(async () => {
  console.log('Network intercept probe (looking for rate JSON APIs):\n');
  for (const target of TARGETS) {
    console.log(`=== ${target.name} ===`);
    const r = await probe(target);
    if (r.err) console.log(`  ERROR: ${r.err}`);
    if (r.apiHits.length === 0) {
      console.log('  No rate API calls detected');
    } else {
      for (const h of r.apiHits) {
        console.log(`  API: ${h.url}`);
        console.log(`  Preview: ${h.preview}`);
      }
    }
    console.log();
  }
})();
