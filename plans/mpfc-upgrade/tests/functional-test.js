#!/usr/bin/env node
/**
 * MPFC upgrade functional tests (write actions) on the upgrade TEST server only.
 * Each case logs in through the MemberMouse form, performs the action, prints PASS/FAIL + evidence.
 *
 * Usage: node plans/mpfc-upgrade/tests/functional-test.js <case> [case...]   (cases: see CASES below)
 * Creds: config/.mpfc-upgrade-test-config.json — run decrypt-secrets.sh first.
 */
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const cfg = JSON.parse(fs.readFileSync(path.join(__dirname, '../../../config/.mpfc-upgrade-test-config.json'), 'utf8'));
const BASE = `https://${cfg.basic_auth.host}`;
const SHOTS = process.env.SHOTS || '/tmp';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
if (!/upgrade-test\./.test(BASE)) throw new Error('Refusing: not the upgrade test host');

async function newPage(browser, log) {
  const page = await browser.newPage();
  page.setDefaultTimeout(120000);
  await page.authenticate({ username: cfg.basic_auth.user, password: cfg.basic_auth.password });
  page.on('pageerror', (e) => log('pageerror: ' + e.message.slice(0, 200)));
  page.on('dialog', async (d) => { log(`dialog: ${d.message().slice(0, 300)}`); await d.accept().catch(() => {}); });
  page.on('response', async (r) => {
    if (r.request().method() !== 'POST' || !r.url().includes('admin-ajax')) return;
    const post = (r.request().postData() || '').match(/action=([\w-]+)/);
    let body = ''; try { body = (await r.text()).slice(0, 300).replace(/\s+/g, ' '); } catch (e) { /* ignore */ }
    log(`ajax ${post ? post[1] : '?'} ${r.status()} => ${body}`);
  });
  return page;
}

async function mmLogin(page, who) {
  const u = cfg.test_users[who];
  await page.goto(BASE + '/login/', { waitUntil: 'domcontentloaded' });
  await page.type('#mm-login-form #log', u.user);
  await page.type('#mm-login-form #pwd', u.password);
  await Promise.all([page.waitForNavigation().catch(() => {}), page.click('#mm-login-button')]);
}

async function adminLogin(page) {
  const u = cfg.test_users.admin;
  await page.goto(BASE + (cfg.test_users.login_path || '/old-login'), { waitUntil: 'domcontentloaded' });
  await page.type('#user_login', u.user);
  await page.type('#user_pass', u.password);
  await Promise.all([page.waitForNavigation().catch(() => {}), page.click('#wp-submit')]);
}

// Type into the first Stripe iframe input with this name (several hidden frames share names).
async function stripeType(page, name, value) {
  for (const f of page.frames().filter((x) => x.url().includes('js.stripe.com'))) {
    const el = await f.$(`input[name="${name}"]`);
    if (el && (await el.boundingBox())) {
      await el.evaluate((e) => e.focus());
      await page.keyboard.type(value, { delay: 60 });
      return true;
    }
  }
  return false;
}

const CASES = {
  // B5/C10: buy a product with Stripe test card as the test member
  async checkout(browser, log, rid = process.env.RID || 'pPMb9k') {
    const page = await newPage(browser, log);
    await mmLogin(page, 'member');
    await page.goto(`${BASE}/checkout/?rid=${rid}`, { waitUntil: 'networkidle2', timeout: 180000 }).catch(() => {});
    await sleep(5000);
    for (const [n, v] of [['cardnumber', '4242424242424242'], ['exp-date', '1234'], ['cvc', '123'], ['postal', '12345']]) {
      log(`stripe ${n}: ${await stripeType(page, n, v)}`);
    }
    await page.evaluate(() => {
      document.querySelectorAll('#mm_checkout_form input[type=checkbox], form input[type=checkbox]').forEach((c) => {
        if (/term|mm_custom_field/i.test(c.id + c.name) && !c.checked) c.click();
      });
      document.querySelectorAll('select').forEach((s) => { if (!s.value && s.options.length > 1 && s.offsetParent) s.selectedIndex = 1; });
    });
    // click the real submit button (it calls mmjs.checkout(true) — calling it bare never submits)
    const btn = await page.evaluate(() => {
      const b = [...document.querySelectorAll('a,button,input[type=submit],input[type=button]')]
        .find((e) => /mmjs\.checkout\(/.test(e.getAttribute('onclick') || '') && e.offsetParent && !/paypal/i.test(e.outerHTML));
      if (b) { b.click(); return b.getAttribute('onclick'); }
      return null;
    });
    log('clicked: ' + btn);
    await page.waitForFunction(() => !location.pathname.startsWith('/checkout'), { timeout: 180000 }).catch(() => {});
    log('final url: ' + page.url().replace(BASE, ''));
    log('errors on page: ' + (await page.evaluate(() => [...document.querySelectorAll('.mm-error,.mm-error-message,#mm-dialog,.mm-dialog-container')].map((e) => e.innerText.trim()).filter(Boolean).join(' | '))).slice(0, 400));
    await page.screenshot({ path: `${SHOTS}/checkout.png` });
    return !page.url().includes('/checkout');
  },
};

(async () => {
  const names = process.argv.slice(2);
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'], protocolTimeout: 300000 });
  for (const n of names) {
    const lines = []; const log = (s) => lines.push('  ' + s);
    let ok = false;
    try { ok = await CASES[n](browser, log); } catch (e) { log('EXCEPTION ' + e.message.slice(0, 300)); }
    console.log(`${ok ? 'PASS' : 'FAIL'} ${n}\n${lines.join('\n')}`);
  }
  await browser.close();
})();
