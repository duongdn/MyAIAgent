// TEMP: reproduce MemberMouse checkout with Stripe test card on the upgrade test server. Delete after use.
const fs = require('fs');
const puppeteer = require('puppeteer');
const cfg = JSON.parse(fs.readFileSync(__dirname + '/../config/.mpfc-upgrade-test-config.json', 'utf8'));
const BASE = `https://${cfg.basic_auth.host}`;
const RID = process.argv[2] || 'pPMb9k';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'], protocolTimeout: 180000 });
  const page = await browser.newPage();
  await page.authenticate({ username: cfg.basic_auth.user, password: cfg.basic_auth.password });
  const logs = [];
  page.on('console', (m) => { if (['error', 'warning'].includes(m.type())) logs.push(`console.${m.type()}: ${m.text().slice(0, 300)}`); });
  page.on('dialog', async (d) => { logs.push(`DIALOG ${d.type()}: ${d.message().slice(0, 500)}`); await d.dismiss().catch(() => {}); });
  page.on('pageerror', (e) => logs.push('pageerror: ' + e.message.slice(0, 300)));
  page.on('response', async (r) => {
    if (r.request().method() === 'POST' && /admin-ajax|stripe|checkout/.test(r.url())) {
      let body = ''; try { body = (await r.text()).slice(0, 400); } catch (e) {}
      logs.push(`POST ${r.status()} ${r.url().replace(BASE, '').slice(0, 120)} => ${body.replace(/\s+/g, ' ')}`);
    }
  });
  // member login (MemberMouse form)
  await page.goto(BASE + '/login/', { waitUntil: 'domcontentloaded', timeout: 120000 });
  await page.type('#mm-login-form #log', cfg.test_users.member.user);
  await page.type('#mm-login-form #pwd', cfg.test_users.member.password);
  await Promise.all([page.waitForNavigation({ timeout: 120000 }).catch(() => {}), page.click('#mm-login-button')]);
  await page.goto(`${BASE}/checkout/?rid=${RID}`, { waitUntil: 'domcontentloaded', timeout: 180000 });
  await new Promise((r) => setTimeout(r, 20000));
  // fill Stripe Elements card iframe(s)
  const frames = page.frames().filter((f) => f.url().includes('js.stripe.com'));
  logs.push(`stripe frames: ${frames.length}`);
  const vals = { cardnumber: '4242424242424242', exp: '12/34', 'exp-date': '12/34', cvc: '123', postal: '12345' };
  for (const f of frames) {
    for (const [name, v] of Object.entries(vals)) {
      const el = await f.$(`input[name="${name}"]`);
      if (el) { await el.type(v, { delay: 30 }); logs.push(`typed ${name}`); }
    }
  }
  // fill any empty visible required text fields on the MM form (billing info)
  await page.evaluate(() => {
    document.querySelectorAll('input[type=text], input[type=email], input[type=tel]').forEach((i) => {
      if (i.offsetParent && !i.value && /mm|billing|first|last|address|city|zip|phone|state/i.test(i.id + i.name)) i.value = i.id.includes('zip') ? '12345' : 'Test';
    });
  });
  await page.evaluate(() => document.querySelectorAll('input[type=checkbox]').forEach((c) => { if (/term|agree|tos|policy|mm_custom_field/i.test(c.id + c.name) && !c.checked) c.click(); }));
  const hasFn = await page.evaluate(() => typeof mmjs !== 'undefined' && typeof mmjs.checkout === 'function');
  logs.push('mmjs.checkout available: ' + hasFn);
  if (hasFn) { await page.evaluate(() => { setTimeout(() => mmjs.checkout(), 0); }); await new Promise((r) => setTimeout(r, 60000)); }
  const msg = await page.evaluate(() => [...document.querySelectorAll('.mm-error, .mm-dialog, #mm-error-messages, .mm-status, .mm-error-message, [class*=error]')]
    .map((e) => e.innerText.trim()).filter((t) => t).join(' | ').slice(0, 800));
  logs.push('final url: ' + page.url().replace(BASE, ''));
  logs.push('page messages: ' + msg);
  await page.screenshot({ path: process.env.SHOT || '/tmp/checkout.png', fullPage: false });
  console.log(logs.join('\n'));
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
