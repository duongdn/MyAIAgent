const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: 'new', executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox','--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  const errors = [];
  const cspErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      const t = msg.text();
      errors.push(t);
      if (/Content Security Policy|CSP/i.test(t)) cspErrors.push(t);
    }
  });
  page.on('pageerror', err => errors.push('pageerror: ' + err.message));
  try {
    await page.goto('https://samguard.co', { waitUntil: 'networkidle2', timeout: 30000 });
  } catch(e) { console.log('NAV_ERR:', e.message); }
  console.log('ERROR_COUNT:', errors.length);
  console.log('CSP_COUNT:', cspErrors.length);
  errors.slice(0,15).forEach((e,i) => console.log(`[${i}]`, e.slice(0,200)));
  await browser.close();
})();
