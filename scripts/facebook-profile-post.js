#!/usr/bin/env node
/**
 * Post to the user's personal Facebook profile (no API exists for profiles → puppeteer).
 * Draft mode = post with audience "Chỉ mình tôi"; submit = change audience later.
 *
 * Usage:
 *   node scripts/facebook-profile-post.js --draft <text-file> [--dry-run]
 *   node scripts/facebook-profile-post.js --submit <post-url> [--audience=public|friends]
 *
 * Outputs a JSON line {ok, mode, postUrl?, audience?} on stdout; screenshots on error
 * go to tmp/fb-post-error-*.png. Never changes the profile's default audience.
 */
const fs = require('fs');
const path = require('path');
const { openFacebookSession, assertLoggedIn } = require('./lib/facebook-browser-session');

const args = process.argv.slice(2);
const flag = name => args.includes(name);
const argAfter = name => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : null; };
const AUDIENCE_LABELS = { onlyme: 'Chỉ mình tôi', public: 'Công khai', friends: 'Bạn bè' };
const sleep = ms => new Promise(r => setTimeout(r, ms));

// Pick a radio in the open "Đối tượng của bài viết" dialog by its row label,
// untick "Đặt làm đối tượng mặc định" so the profile default is never changed, then confirm.
async function chooseAudience(page, label) {
  const picked = await page.$$eval('[role="dialog"] input[type="radio"]', (inputs, label) => {
    const rowOf = e => e.closest('label') || e.parentElement.parentElement.parentElement;
    const input = inputs.find(e => rowOf(e).innerText.split('\n')[0].trim() === label);
    if (!input) return false;
    rowOf(input).scrollIntoView({ block: 'center' });
    rowOf(input).click();
    return true;
  }, label);
  if (!picked) throw new Error(`audience option not found: ${label}`);
  await sleep(800);
  await page.$$eval('[role="dialog"] input[type="checkbox"]', inputs => {
    const def = inputs.find(e => /đối tượng mặc định/.test((e.closest('label') || e.parentElement.parentElement).innerText));
    if (def && def.checked) (def.closest('label') || def.parentElement).click();
  });
  await sleep(500);
  const [done] = await page.$$('xpath/.//div[@role="dialog"]//div[@role="button"][@aria-label="Xong" or @aria-label="Lưu"]');
  if (!done) throw new Error('audience confirm button (Xong/Lưu) not found');
  await done.click();
  await sleep(1500);
}

// FB only fills the timestamp permalink href on hover, so locate the post card by
// its opening text, hover each of its links, then read back the /posts/ href.
async function findOwnPostUrl(page, snippet) {
  await page.goto('https://www.facebook.com/me', { waitUntil: 'networkidle2', timeout: 45000 });
  await sleep(3000);
  for (let i = 0; i < 6; i++) {
    const marked = await page.evaluate(snippet => {
      const cards = [...document.querySelectorAll('[role="main"] div[aria-posinset], [role="main"] [role="article"]')];
      const card = cards.find(c => c.innerText.includes(snippet));
      if (!card) return false;
      card.querySelectorAll('a').forEach((a, idx) => a.setAttribute('data-fbpost-link', idx));
      return true;
    }, snippet);
    if (marked) break;
    await page.evaluate(() => window.scrollBy(0, 700));
    await sleep(1500);
  }
  for (const link of await page.$$('a[data-fbpost-link]')) {
    try { await link.hover(); } catch { continue; }
    await sleep(300);
    const href = await link.evaluate(a => a.href);
    if (/\/posts\/|story_fbid=|\/permalink\//.test(href)) return href.split(/[?&]__cft__/)[0].split('?comment_id')[0];
  }
  return null;
}

async function createDraft(page, text, dryRun) {
  await page.goto('https://www.facebook.com/me', { waitUntil: 'networkidle2', timeout: 45000 });
  assertLoggedIn(page);
  await sleep(2000);
  const [opener] = await page.$$('xpath/.//div[@role="button"][.//span[text()="Bạn đang nghĩ gì?"]]');
  if (!opener) throw new Error('composer opener "Bạn đang nghĩ gì?" not found');
  await opener.click();
  await page.waitForSelector('[role="dialog"] [role="textbox"]', { timeout: 15000 });
  await sleep(1500);

  const [privacyBtn] = await page.$$('xpath/.//div[@role="dialog"]//div[@role="button"][starts-with(@aria-label,"Chỉnh sửa quyền riêng tư")]');
  if (!privacyBtn) throw new Error('privacy button not found in composer');
  await privacyBtn.click();
  await sleep(2000);
  await chooseAudience(page, AUDIENCE_LABELS.onlyme);

  // Hard gate: refuse to post unless the composer now says "Chỉ mình tôi"
  const privacyLabel = await page.$eval('[role="dialog"] [role="button"][aria-label^="Chỉnh sửa quyền riêng tư"]', e => e.getAttribute('aria-label'));
  if (!privacyLabel.includes(AUDIENCE_LABELS.onlyme)) throw new Error(`audience not Only-me after select: ${privacyLabel}`);

  await page.click('[role="dialog"] [role="textbox"]');
  for (const [i, line] of text.split('\n').entries()) {
    if (i > 0) { await page.keyboard.down('Shift'); await page.keyboard.press('Enter'); await page.keyboard.up('Shift'); }
    if (line) await page.keyboard.type(line, { delay: 5 });
  }
  await sleep(1500);

  if (dryRun) {
    const shot = path.join(__dirname, '..', 'tmp', 'fb-post-dry-run.png');
    await page.screenshot({ path: shot });
    return { ok: true, mode: 'dry-run', audience: privacyLabel, screenshot: shot };
  }

  const [postBtn] = await page.$$('xpath/.//div[@role="dialog"]//div[@role="button"][@aria-label="Đăng"]');
  if (!postBtn) throw new Error('"Đăng" button not found');
  await postBtn.click();
  await page.waitForFunction(() => !document.querySelector('[role="dialog"] [role="textbox"]'), { timeout: 30000 });
  await sleep(4000);
  return { ok: true, mode: 'draft', audience: AUDIENCE_LABELS.onlyme, postUrl: await findOwnPostUrl(page, text.slice(0, 40)) };
}

async function submitPost(page, postUrl, audienceKey) {
  const label = AUDIENCE_LABELS[audienceKey];
  if (!label || audienceKey === 'onlyme') throw new Error(`invalid --audience=${audienceKey}`);
  await page.goto(postUrl, { waitUntil: 'networkidle2', timeout: 45000 });
  assertLoggedIn(page);
  await sleep(3000);
  // A permalink opens the post as a dialog over the feed — use that dialog's own "..." menu
  const [menu] = await page.$$('xpath/.//div[@role="dialog"]//div[@role="button"][starts-with(@aria-label,"Hành động đối với bài viết này")]');
  if (!menu) throw new Error('post actions menu not found');
  await menu.click();
  await sleep(1500);
  const [item] = await page.$$('xpath/.//div[@role="menuitem"][.//span[text()="Chỉnh sửa đối tượng"]]');
  if (!item) throw new Error('"Chỉnh sửa đối tượng" menu item not found');
  await item.click();
  await sleep(2000);
  await chooseAudience(page, label);
  return { ok: true, mode: 'submit', postUrl, audience: label };
}

(async () => {
  const draftFile = argAfter('--draft');
  const submitUrl = argAfter('--submit');
  if (!draftFile && !submitUrl) {
    console.error('Usage: --draft <text-file> [--dry-run] | --submit <post-url> [--audience=public|friends]');
    process.exit(2);
  }
  const audienceArg = (args.find(a => a.startsWith('--audience=')) || '--audience=public').split('=')[1];
  const { browser, page } = await openFacebookSession();
  try {
    const result = draftFile
      ? await createDraft(page, fs.readFileSync(draftFile, 'utf-8').trim(), flag('--dry-run'))
      : await submitPost(page, submitUrl, audienceArg);
    console.log(JSON.stringify(result));
  } catch (err) {
    const shot = path.join(__dirname, '..', 'tmp', `fb-post-error-${Date.now()}.png`);
    try { await page.screenshot({ path: shot }); } catch {}
    console.log(JSON.stringify({ ok: false, error: err.message, screenshot: shot }));
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
})();
