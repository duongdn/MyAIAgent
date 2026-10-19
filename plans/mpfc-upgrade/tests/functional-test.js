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

// POST to the theme's team ajax endpoint from inside the logged-in page (same as the UI's $.post)
async function teamAjax(page, data) {
  return page.evaluate(async (d) => {
    const body = new URLSearchParams(d);
    const r = await fetch(team_ajax.team_ajaxurl, { method: 'POST', body, credentials: 'same-origin' });
    return `${r.status} ${(await r.text()).slice(0, 300)}`;
  }, data);
}

const CASES = {
  // team-stats: video active toggle shows a spinner (switch hidden) during the request, then restores; toggled twice => unchanged
  async toggle(browser, log) {
    const page = await newPage(browser, log);
    await mmLogin(page, 'team_manager');
    await page.goto(BASE + '/team-stats/', { waitUntil: 'networkidle2', timeout: 180000 }).catch(() => {});
    let ok = true;
    for (let i = 0; i < 2; i++) {
      const before = await page.$eval('.vlm-toggle-status', (b) => `${b.dataset.vid} status=${jQuery(b).data('status')}`);
      await page.click('.vlm-toggle-status');
      await sleep(150);
      const during = await page.evaluate(() => ({ spinner: !!document.querySelector('.vlm-toggle-loading'), switchHidden: jQuery('.vlm-toggle-status').first().is(':hidden') }));
      await page.waitForFunction(() => !document.querySelector('.vlm-toggle-loading'), { timeout: 120000 }).catch(() => {});
      const after = await page.$eval('.vlm-toggle-status', (b) => `status=${jQuery(b).data('status')} visible=${jQuery(b).is(':visible')}`);
      if (i === 1) await page.screenshot({ path: `${SHOTS}/toggle.png` });
      const pass = during.spinner && during.switchHidden && /visible=true/.test(after);
      ok = ok && pass;
      log(`${pass ? 'ok ' : 'BAD'} click ${i + 1}: before ${before} | during ${JSON.stringify(during)} | after ${after}`);
    }
    return ok;
  },
  // E6: admin edits a DRAFT test page in the Elementor editor (adds a heading widget) and saves it
  async elementor(browser, log, postId = process.env.POST_ID) {
    const page = await newPage(browser, log);
    page.on('console', (m) => { if (m.type() === 'error') log('console: ' + m.text().slice(0, 150)); });
    await adminLogin(page);
    await page.goto(`${BASE}/wp-admin/post.php?post=${postId}&action=elementor`, { waitUntil: 'domcontentloaded', timeout: 180000 });
    await page.waitForFunction(() => window.$e && window.elementor && elementor.documents && elementor.documents.getCurrent(), { timeout: 240000 });
    log('editor loaded, elementor ' + (await page.evaluate(() => elementor.config.version)));
    const prev = await page.waitForFunction(() => elementor.getPreviewContainer && elementor.getPreviewContainer(), { timeout: 240000 }).then(() => 'ready').catch(() => 'NOT READY');
    log('preview: ' + prev + ' | ' + (await page.evaluate(() => { const f = document.querySelector('#elementor-preview-iframe'); return f ? f.src.replace(location.origin, '') + ' loaded=' + !!(f.contentDocument && f.contentDocument.body && f.contentDocument.body.className) : 'no iframe'; })));
    await page.screenshot({ path: `${SHOTS}/elementor.png` });
    const res = await page.evaluate(async (txt) => {
      const root = elementor.getPreviewContainer ? elementor.getPreviewContainer() : elementor.documents.getCurrent().container;
      if (!root) return 'no root container';
      const cont = elementor.config.experimentalFeatures && elementor.config.experimentalFeatures.container;
      let box = $e.run('document/elements/create', { container: root, model: { elType: cont ? 'container' : 'section' }, columns: 1 });
      if (Array.isArray(box)) box = box[0];
      if (box && !cont && box.children && box.children.length) box = box.children[0]; // section -> column
      if (!box) return 'create returned ' + typeof box + ' (container exp=' + cont + ')';
      $e.run('document/elements/create', { container: box, model: { elType: 'widget', widgetType: 'heading', settings: { title: txt } } });
      const r = await $e.run('document/save/publish').then(() => 'saved').catch((e) => 'err ' + (e.message || JSON.stringify(e)).slice(0, 200));
      return r;
    }, `NUS upgrade test ${Date.now()}`);
    log('save: ' + res);
    return res === 'saved';
  },
  // C5 + C6: course unit — Vimeo player loads & plays; mark an unfinished unit complete (WP Courseware ajax)
  async unit(browser, log, unitId = process.env.UNIT || '7202') {
    const page = await newPage(browser, log);
    await mmLogin(page, 'member');
    await page.goto(`${BASE}/?p=${unitId}`, { waitUntil: 'networkidle2', timeout: 180000 }).catch(() => {});
    log('unit url: ' + page.url().replace(BASE, ''));
    const vf = page.frames().find((f) => f.url().includes('player.vimeo.com'));
    let played = false;
    if (vf) {
      await vf.waitForSelector('video', { timeout: 60000 }).catch(() => {});
      played = await Promise.race([sleep(60000).then(() => 'timeout'), vf.evaluate(async () => {
        const v = document.querySelector('video'); if (!v) return 'no video: ' + document.body.innerText.slice(0, 150);
        v.muted = true; v.play().catch(() => {});
        await new Promise((r) => setTimeout(r, 10000));
        return v.currentTime > 0 ? `playing t=${v.currentTime.toFixed(1)}s` : `not playing t=${v.currentTime} ready=${v.readyState} err=${v.error && v.error.code} src=${(v.currentSrc || '').slice(0, 40)} text=${document.body.innerText.slice(0, 120).replace(/\s+/g, ' ')}`;
      })]).catch((e) => 'err ' + e.message);
    }
    log('vimeo frames: ' + page.frames().filter((f) => f.url().includes('vimeo')).length + ', play: ' + played);
    const before = await page.evaluate(() => (document.querySelector('.wpcw_fe_progress_box_text') || {}).innerText || '');
    log('progress before: ' + before.trim().slice(0, 120));
    const clicked = await page.evaluate(() => {
      const b = document.querySelector('.wpcw_fe_progress_box_mark a, .wpcw_fe_progress_box_mark input, a[id^="wpcw_fe_unit_complete"], #wpcw_fe_unit_complete');
      if (b) { b.click(); return b.outerHTML.slice(0, 120); } return null;
    });
    log('complete button: ' + clicked);
    await sleep(15000);
    const after = await page.evaluate(() => (document.querySelector('.wpcw_fe_progress_box_text') || {}).innerText || '');
    log('progress after: ' + after.trim().slice(0, 120));
    return /^playing/.test(String(played)) && /completed/i.test(after);
  },
  // B6: Contact Form 7 front-end submit (mail is blocked on test => 'mail_failed' still proves PHP path ran)
  async cf7(browser, log) {
    const page = await newPage(browser, log);
    page.on('response', async (r) => { if (r.url().includes('/contact-form-7/')) log(`cf7 ${r.status()} ${(await r.text().catch(() => '')).slice(0, 250)}`); });
    await page.goto(BASE + '/contact/', { waitUntil: 'networkidle2' }).catch(() => {});
    await page.evaluate(() => {
      const f = document.querySelector('form.wpcf7-form');
      f.querySelectorAll('input[type=text],input[type=email],input[type=tel],textarea').forEach((i) => {
        i.value = i.type === 'email' ? 'nus.upgrade.cf7@example.com' : 'NUS upgrade test';
      });
      f.querySelectorAll('input[type=checkbox]').forEach((c) => { c.checked = true; });
    });
    await page.click('form.wpcf7-form input[type=submit]');
    await page.waitForFunction(() => !/submitting|resetting|init/.test(document.querySelector('form.wpcf7-form').dataset.status), { timeout: 120000 }).catch(() => {});
    const st = await page.evaluate(() => document.querySelector('form.wpcf7-form').dataset.status + ' | ' + (document.querySelector('.wpcf7-response-output') || {}).innerText);
    log('status: ' + st);
    return /^(sent|mail_failed)/.test(st);
  },

  // C11: member logout link ends the session
  async logout(browser, log) {
    const page = await newPage(browser, log);
    await mmLogin(page, 'member');
    const href = await page.evaluate(() => (document.querySelector('a[href*="action=logout"]') || {}).href);
    log('logout link: ' + (href || '').replace(BASE, '').replace(/_wpnonce=\w+/, '_wpnonce=…'));
    await page.goto(href, { waitUntil: 'domcontentloaded' });
    log('after logout: ' + page.url().replace(BASE, ''));
    const cookies = (await page.cookies()).filter((c) => c.name.startsWith('wordpress_logged_in'));
    await page.goto(BASE + '/team-library/', { waitUntil: 'domcontentloaded' });
    log('member page after logout -> ' + page.url().replace(BASE, '') + `, logged_in cookies=${cookies.length}`);
    return cookies.length === 0;
  },
  // D4: team manager — team key create/rename, add member, key add/remove, remove from team, delete key
  async team(browser, log) {
    const page = await newPage(browser, log);
    await mmLogin(page, 'team_manager');
    await page.goto(BASE + '/team-manager/', { waitUntil: 'domcontentloaded' });
    const ts = Date.now().toString().slice(-6);
    let ok = true;
    const step = async (name, data, expect) => {
      const r = await teamAjax(page, data);
      const pass = expect.test(r); ok = ok && pass;
      log(`${pass ? 'ok  ' : 'BAD '}${name}: ${r}`);
      return r;
    };
    const k = await step('add_new_team_key', { action: 'add_new_team_key', key_name: `NUS-UPG-${ts}` }, /success"?:\s*true/);
    const keyId = (k.match(/"(?:key_id|id)"\s*:\s*"?(\d+)/) || [])[1];
    log('new key id: ' + keyId);
    await step('edit_team_key', { action: 'edit_team_key', key_id: keyId, key_name: `NUS-UPG-${ts}-R` }, /success"?:\s*true/);
    const m = await step('add_team_member', { action: 'add_team_member', email: `nus.upgrade.${ts}@example.com`, first_name: 'Nus', last_name: `Upg${ts}`,
      username: `nus_upg_${ts}`, password: `Tmp-${ts}-Aa9!x`, team_key_id: keyId, status: '1', phone: '0123456789', bundles: '' }, /success"?:\s*true/);
    const uid = (m.match(/"(?:user_id|member_id|id)"\s*:\s*"?(\d+)/) || [])[1];
    log('new member id: ' + uid);
    const teamKey = cfg.test_users.team_key.match(/id (\d+)/)[1];
    await step('add_user_to_team_key', { action: 'add_user_to_team_key', user_id: uid, key_id: teamKey }, /success"?:\s*true/);
    await step('remove_user_from_team_key', { action: 'remove_user_from_team_key', user_id: uid, key_id: teamKey }, /success"?:\s*true/);
    await step('remove_user_from_team', { action: 'remove_user_from_team', user_id: uid, team_key_id: keyId }, /success|ok/i);
    await step('get_team_invite_link', { action: 'get_team_invite_link' }, /http|success/i);
    await step('delete_team_key', { action: 'delete_team_key', key_id: keyId }, /success"?:\s*true/);
    log(`cleanup: wp user delete ${uid} (test only)`);
    return ok;
  },
  // exploration helper: list forms/buttons on pages for a role (PAGES=comma list, ROLE=member|team_manager|admin)
  async probe(browser, log) {
    const page = await newPage(browser, log);
    const role = process.env.ROLE || 'member';
    if (role === 'admin') await adminLogin(page); else await mmLogin(page, role);
    for (const u of (process.env.PAGES || '/my-account/').split(',')) {
      await page.goto(BASE + u, { waitUntil: 'domcontentloaded' }).catch((e) => log('goto ' + e.message));
      await sleep(3000);
      const info = await page.evaluate((SEL) => [...document.querySelectorAll(SEL || 'form,a[onclick],a[href^="javascript"],button,input[type=submit],video,iframe,[class*=fvplayer],[class*=wpcw]')]
        .filter((e) => SEL || e.offsetParent || e.tagName === 'FORM').map((e) => e.outerHTML.replace(/\s+/g, ' ').slice(0, 160)).slice(0, 40).join('\n    '), process.env.SEL || '');
      log(`${u} -> ${page.url().replace(BASE, '')}\n    ${info}`);
    }
    return true;
  },
  // B5/C10: buy a product with Stripe test card as the test member
  async checkout(browser, log, rid = process.env.RID || 'pPMb9k') {
    const page = await newPage(browser, log);
    await mmLogin(page, 'member');
    await page.goto(`${BASE}/checkout/?rid=${rid}`, { waitUntil: 'networkidle2', timeout: 180000 }).catch(() => {});
    await sleep(5000);
    for (const [n, v] of [['cardnumber', '4242424242424242'], ['exp-date', '1234'], ['cvc', '123'], ['postal', '12345']]) {
      const r = await Promise.race([stripeType(page, n, v), sleep(45000).then(() => 'timeout')]).catch((e) => 'err ' + e.message.slice(0, 80));
      log(`stripe ${n}: ${r}`);
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
        .find((e) => /mmjs\.checkout\(/.test((e.getAttribute('onclick') || '') + (e.getAttribute('href') || '')) && !/paypal/i.test(e.outerHTML));
      if (b) { b.click(); return b.outerHTML.slice(0, 80); }
      return null;
    });
    log('clicked: ' + btn);
    if (!btn) log('buttons: ' + (await page.evaluate(() => [...document.querySelectorAll('a,button,input[type=submit],input[type=button],img')]
      .filter((e) => /training|checkout|submit/i.test(e.outerHTML)).map((e) => e.outerHTML.slice(0, 200)).join(' || '))).slice(0, 1500));
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
