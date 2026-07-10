const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    userDataDir: path.join(__dirname, '..', 'tmp', 'workstream-browser-profile'),
    env: { ...process.env, DISPLAY: ':1', TMPDIR: '/var/tmp' },
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--window-size=1280,900', '--crash-dumps-dir=/var/tmp'],
  });
  const page = await browser.newPage();
  await page.goto('https://workstream.nustechnology.com', { waitUntil: 'networkidle2', timeout: 30000 }).catch(e => console.log('goto err', e.message));
  await new Promise(r => setTimeout(r, 3000));
  console.log('URL before click:', page.url());
  try {
    const clicked = await page.evaluate(() => {
      const els = Array.from(document.querySelectorAll('button, a'));
      const el = els.find(e => e.textContent && e.textContent.includes('Sign in with SSO'));
      if (el) { el.click(); return true; }
      return false;
    });
    console.log('clicked SSO button:', clicked);
  } catch (e) { console.log('click err', e.message); }
  await new Promise(r => setTimeout(r, 8000));
  console.log('URL after click:', page.url());
  await page.screenshot({ path: path.join(__dirname, '..', 'tmp', 'ws-visual-check.png') });
  await browser.close();
})();
