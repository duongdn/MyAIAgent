#!/usr/bin/env node
// Quick test — login carrick + check Neural workroom
process.env.TMPDIR = '/tmp/chrome-tmp';
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
const fs = require('fs');

(async () => {
  const PROFILE = 'tmp/upwork-neural-test-' + Date.now();
  console.log('Profile:', PROFILE);

  const b = await puppeteer.launch({
    headless: false,
    userDataDir: PROFILE,
    executablePath: '/usr/bin/google-chrome',
    args: ['--no-sandbox'],
  });
  const p = await b.newPage();

  const cfg = JSON.parse(fs.readFileSync('config/.upwork-config.json'));
  const carrick = cfg.accounts.find(a => a.name === 'carrick');

  // Go to workroom - will redirect to login
  await p.goto('https://www.upwork.com/nx/wm/workroom/38901192/messages', { timeout: 20000 }).catch(() => {});
  await new Promise(r => setTimeout(r, 5000));

  let url = p.url();
  console.log('1. URL:', url);

  // Fill email
  const emailInput = await p.$('input[name="login"]');
  if (!emailInput) { console.log('no email input - page may not be login'); await p.screenshot({ path: 'tmp/neu-step1.png' }); await b.close(); process.exit(1); }
  await emailInput.type(carrick.username, { delay: 15 });
  const btns = await p.$$('button');
  for (const btn of btns) {
    const t = await btn.evaluate(el => el.textContent);
    if (t.includes('Continue')) { await btn.click(); break; }
  }
  await new Promise(r => setTimeout(r, 3000));
  console.log('2. URL:', p.url());

  // Fill password
  const pwInput = await p.$('input[name="password"]');
  if (!pwInput) { console.log('no pw input'); await p.screenshot({ path: 'tmp/neu-step2.png' }); await b.close(); process.exit(1); }
  await pwInput.type(carrick.password, { delay: 15 });
  const pBtns = await p.$$('button');
  for (const btn of pBtns) {
    const t = await btn.evaluate(el => el.textContent);
    if (t.includes('Log In') || t.includes('Sign in')) { await btn.click(); break; }
  }
  await new Promise(r => setTimeout(r, 8000));
  console.log('3. URL:', p.url());

  const body = await p.evaluate(() => document.body.innerText).catch(() => '');
  if (body.includes('Authenticator') || body.includes('Verify') || body.includes('verification') || body.includes('Security')) {
    console.log('2FA/CAPTCHA hit');
    await p.screenshot({ path: 'tmp/neural-2fa.png' });
    await b.close();
    process.exit(2);
  }

  // Navigate to workroom
  await p.goto('https://www.upwork.com/nx/wm/workroom/38901192/messages', { timeout: 25000 }).catch(() => {});
  await new Promise(r => setTimeout(r, 5000));

  const fUrl = p.url();
  const fBody = await p.evaluate(() => document.body.innerText).catch(() => '');
  console.log('4. Final URL:', fUrl);
  console.log('CF:', fBody.includes('Cloudflare'));

  if (fUrl.includes('workroom')) {
    console.log('IN WORKROOM');
    const lines = fBody.split('\n').filter(l => l.trim()).slice(0, 40);
    lines.forEach(l => console.log(l));
    await p.screenshot({ path: 'tmp/neural-workroom.png' });
  } else {
    console.log('Body:', fBody.substring(0, 500));
    await p.screenshot({ path: 'tmp/neural-step4.png' });
  }
  await b.close();
})();
