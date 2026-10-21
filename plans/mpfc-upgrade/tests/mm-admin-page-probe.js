#!/usr/bin/env node
// Debug: log in as the test admin and dump a wp-admin page (text + screenshot). Usage: node mm-admin-page-probe.js "<admin path>"
const puppeteer = require('puppeteer');
const cfg = require('../../../config/.mpfc-upgrade-test-config.json');
(async () => {
  const B = `https://${cfg.basic_auth.host}`;
  const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const p = await b.newPage();
  p.setDefaultTimeout(120000);
  p.on('pageerror', (e) => console.log('pageerror:', e.message.slice(0, 200)));
  await p.authenticate({ username: cfg.basic_auth.user, password: cfg.basic_auth.password });
  await p.goto(`${B}/old-login`, { waitUntil: 'domcontentloaded' });
  await p.type('#user_login', cfg.test_users.admin.user);
  await p.type('#user_pass', cfg.test_users.admin.password);
  await Promise.all([p.waitForNavigation(), p.click('#wp-submit')]);
  const r = await p.goto(B + (process.argv[2] || '/wp-admin/'), { waitUntil: 'networkidle2' });
  console.log('HTTP', r.status(), p.url());
  console.log((await p.evaluate(() => (document.querySelector('#wpbody-content') || document.body).innerText)).slice(0, +(process.env.MAX || 1500)));
  await p.screenshot({ path: process.env.SHOT || '/tmp/admin-page.png' });
  await b.close();
})();
