/**
 * Discovery helper for FPTS EzTrade / VCBS Trade Pro portfolio APIs.
 *
 * Opens a headed Chrome with a persistent profile, lets you log in manually
 * (OTP etc.), then captures every JSON response the page makes while you
 * navigate to the "Danh mục đầu tư" / holdings screen. Dumps captured
 * responses to tmp/broker-discover-{fpts|vcbs}.json for inspection so we can
 * find the real portfolio endpoint and build a proper fetch script next,
 * same pattern as scripts/misa-money-report.js.
 *
 * Usage:
 *   node scripts/broker-portfolio-discover.js fpts
 *   node scripts/broker-portfolio-discover.js vcbs
 *
 * Keeps the browser open for 3 minutes (or until you press Ctrl+C) so you
 * have time to log in and click into the portfolio page yourself.
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const BROKER = process.argv[2];
if (!['fpts', 'vcbs'].includes(BROKER)) {
  console.error('Usage: node scripts/broker-portfolio-discover.js <fpts|vcbs>');
  process.exit(1);
}

const URLS = {
  fpts: 'https://eztrade.fpts.com.vn/',
  vcbs: 'https://invest.vcbs.com.vn/#/asset',
};

const PROFILE_DIR = path.join(__dirname, `../tmp/${BROKER}-chrome-profile`);
const OUT_FILE = path.join(__dirname, `../tmp/broker-discover-${BROKER}.json`);
const CAPTURE_MS = 30 * 60 * 1000;
const FLUSH_MS = 10 * 1000;

function loadCreds(broker) {
  try {
    const cfg = JSON.parse(fs.readFileSync(path.join(__dirname, '../config/.broker-accounts.json'), 'utf8'));
    return cfg[broker] || null;
  } catch (e) {
    return null;
  }
}

async function tryAutofill(page, creds) {
  if (!creds) return false;
  await new Promise((r) => setTimeout(r, 2000));
  const filled = await page.evaluate((accountNumber, password) => {
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
  if (filled) {
    console.log('[autofill] account number + password filled — submit manually if needed, then enter OTP.');
  } else {
    console.log('[autofill] could not find login inputs — fill manually.');
  }
  return filled;
}

async function main() {
  fs.mkdirSync(PROFILE_DIR, { recursive: true });
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-blink-features=AutomationControlled',
      `--user-data-dir=${PROFILE_DIR}`,
    ],
    defaultViewport: null,
  });

  const page = (await browser.pages())[0] || (await browser.newPage());
  const captured = [];
  const wsFrames = [];

  const cdp = await page.target().createCDPSession();
  await cdp.send('Network.enable');
  cdp.on('Network.webSocketFrameReceived', (params) => {
    const payload = params.response.payloadData;
    if (payload && payload.length < 20000) {
      wsFrames.push({ requestId: params.requestId, payload });
    }
  });

  page.on('response', async (res) => {
    try {
      const url = res.url();
      if (url.includes('signalr') || url.includes('pusher.fpts') || url.includes('.js') || url.includes('.css')
          || url.includes('.png') || url.includes('.svg') || url.includes('.woff')) return;
      const body = await res.text().catch(() => '');
      if (!body || body.length > 500000) return;
      const looksJson = /^[\[{]/.test(body.trim());
      const ct = res.headers()['content-type'] || '';
      if (!looksJson && !ct.includes('json')) return;
      captured.push({ url, method: res.request().method(), status: res.status(), resourceType: res.request().resourceType(), body: body.slice(0, 30000) });
      console.log(`[capture] ${res.status()} ${res.request().method()} ${url}`);
    } catch (e) {
      // response body may not be available (redirects etc.) — ignore
    }
  });

  console.log(`Opening ${URLS[BROKER]} — will try to auto-fill account/password, then you enter OTP manually, then navigate to your portfolio/holdings page.`);
  console.log(`Capturing all JSON XHR/fetch responses for up to ${CAPTURE_MS / 1000}s, flushing to disk every ${FLUSH_MS / 1000}s...`);
  await page.goto(URLS[BROKER], { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(e => console.error('goto error:', e.message));

  const creds = loadCreds(BROKER);
  await tryAutofill(page, creds);

  const WS_OUT_FILE = path.join(__dirname, `../tmp/broker-discover-${BROKER}-ws.json`);
  const flushInterval = setInterval(() => {
    fs.writeFileSync(OUT_FILE, JSON.stringify(captured, null, 2));
    fs.writeFileSync(WS_OUT_FILE, JSON.stringify(wsFrames, null, 2));
    console.log(`[flush] ${captured.length} HTTP, ${wsFrames.length} WS frames written`);
  }, FLUSH_MS);

  await new Promise((resolve) => setTimeout(resolve, CAPTURE_MS));
  clearInterval(flushInterval);

  fs.writeFileSync(OUT_FILE, JSON.stringify(captured, null, 2));
  fs.writeFileSync(WS_OUT_FILE, JSON.stringify(wsFrames, null, 2));
  console.log(`\nSaved ${captured.length} captured HTTP responses to ${OUT_FILE}`);
  console.log(`Saved ${wsFrames.length} captured WebSocket frames to ${WS_OUT_FILE}`);
  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
