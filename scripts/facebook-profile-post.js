#!/usr/bin/env node
/**
 * Post to the user's personal Facebook profile (no API exists for profiles → puppeteer).
 * Draft mode = post with audience "Chỉ mình tôi"; submit = change audience later.
 *
 * Usage:
 *   node scripts/facebook-profile-post.js --draft <text-file> [--image <png>] [--feeling "hết tiền"] [--dry-run]
 *   node scripts/facebook-profile-post.js --submit <post-url> [--audience=public|friends]
 *   node scripts/facebook-profile-post.js --find-url "<first words of post>"   (permalink lookup retry)
 *   node scripts/facebook-profile-post.js --list-own-posts [--limit=15]   (recent timeline posts, topic rotation)
 *   node scripts/facebook-profile-post.js --list-memories   (today's "Ngày này năm xưa")
 *   node scripts/facebook-profile-post.js --draft <caption-file> --share-memory <index> [--dry-run]
 *   node scripts/facebook-profile-post.js --delete <post-url>   (only if still Only-me)
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
  await page.goto('https://www.facebook.com/me', { waitUntil: 'domcontentloaded', timeout: 60000 });
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

async function attachImage(page, imagePath) {
  const input = await page.$('[role="dialog"] input[type="file"]');
  if (!input) throw new Error('image file input not found in composer');
  await input.uploadFile(path.resolve(imagePath));
  await page.waitForSelector('[role="dialog"] img[src^="blob:"]', { timeout: 20000 });
  await sleep(1500);
}

// "Cảm xúc/hoạt động" → search the feeling (e.g. "hết tiền") → click the exact match
async function pickFeeling(page, feeling) {
  await page.click('[role="dialog"] [aria-label="Cảm xúc/hoạt động"]');
  await page.waitForSelector('[role="dialog"] input[aria-label="Tìm kiếm cảm xúc"], [role="dialog"] input[placeholder="Tìm kiếm cảm xúc"]', { timeout: 10000 });
  await page.type('[role="dialog"] input[aria-label="Tìm kiếm cảm xúc"], [role="dialog"] input[placeholder="Tìm kiếm cảm xúc"]', feeling, { delay: 30 });
  await sleep(2000);
  const clicked = await page.$$eval('[role="dialog"] [role="button"]', (els, feeling) => {
    const el = els.find(e => e.innerText.trim() === feeling);
    if (el) el.click();
    return !!el;
  }, feeling);
  if (!clicked) throw new Error(`feeling not found: ${feeling}`);
  await page.waitForSelector('[role="dialog"] [role="textbox"]', { timeout: 10000 });
  await sleep(1500);
}

const MEMORY_SHARE_XPATH = 'xpath/.//div[@role="main"]//div[@role="button"][@aria-label="Gửi nội dung này cho bạn bè hoặc đăng lên trang cá nhân của bạn." or .//span[text()="Chia sẻ"]]';

// Open the composer: a blank new post on the profile, or the share composer of
// "Ngày này năm xưa" memory #memoryIndex on facebook.com/memories
async function openComposer(page, memoryIndex) {
  if (memoryIndex == null) {
    await page.goto('https://www.facebook.com/me', { waitUntil: 'domcontentloaded', timeout: 60000 });
    await assertLoggedIn(page);
    // FB never goes network-idle; wait for the composer opener itself
    const OPENER = 'xpath/.//div[@role="button"][.//span[text()="Bạn đang nghĩ gì?"]]';
    await page.waitForSelector(OPENER, { timeout: 30000 }).catch(() => {});
    await sleep(1500);
    await assertLoggedIn(page);
    const [opener] = await page.$$(OPENER);
    if (!opener) throw new Error('composer opener "Bạn đang nghĩ gì?" not found');
    await opener.click();
  } else {
    await page.goto('https://www.facebook.com/memories', { waitUntil: 'domcontentloaded', timeout: 60000 });
    await assertLoggedIn(page);
    await sleep(4000);
    const shareBtns = await page.$$(MEMORY_SHARE_XPATH);
    if (!shareBtns[memoryIndex]) throw new Error(`memory #${memoryIndex} not found (${shareBtns.length} today)`);
    await shareBtns[memoryIndex].click();
  }
  await page.waitForSelector('[role="dialog"] [role="textbox"]', { timeout: 15000 });
  await sleep(1500);
}

// Today's "Ngày này năm xưa" memories: index (for --share-memory), "N năm trước" label, text
async function listMemories(page) {
  await page.goto('https://www.facebook.com/memories', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await assertLoggedIn(page);
  await sleep(4000);
  const memories = [];
  for (const [index, btn] of (await page.$$(MEMORY_SHARE_XPATH)).entries()) {
    memories.push(await btn.evaluate((b, index) => {
      let card = b;
      while (card.parentElement && !/năm trước/.test(card.innerText)) card = card.parentElement;
      const lines = card.innerText.split('\n').map(l => l.trim()).filter(l => l.length > 1 && l !== 'Facebook');
      const ago = lines.find(l => /^\d+ năm trước$/.test(l)) || '';
      const text = lines.filter(l => l.length > 25 && !/^(Đoàn Nguyên Dương|Tất cả cảm xúc)/.test(l)).slice(0, 2).join(' / ');
      return { index, ago, text };
    }, index));
  }
  return { ok: true, mode: 'list-memories', memories };
}

// Recent posts on the user's own timeline (theirs and ours), so candidates can rotate topics.
// FB virtualizes the feed, so collect at every scroll step and dedupe by text.
async function listOwnPosts(page, limit) {
  await page.goto('https://www.facebook.com/me', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForSelector('[role="main"]', { timeout: 30000 }).catch(() => {});
  await sleep(3000);
  await assertLoggedIn(page);
  const posts = new Map();
  for (let i = 0; i < 15 && posts.size < limit; i++) {
    const found = await page.$$eval('[role="main"] div[aria-posinset]', cards => cards.map(card => {
      const lines = card.innerText.split('\n').map(l => l.trim()).filter(l => l && l !== 'Facebook' && l !== '·');
      const audience = card.querySelector('[aria-label^="Đã chia sẻ với"], [aria-label*="Chỉ mình tôi"], [aria-label*="Công khai"]');
      return {
        author: lines[0] || '',
        when: lines.find(l => /^(\d+ (phút|giờ|ngày|tuần)|Hôm qua|\d+ tháng \d+)/.test(l)) || '',
        audience: audience ? audience.getAttribute('aria-label') : '',
        text: lines.filter(l => l.length > 15 && !/^(Tất cả cảm xúc|Bình luận dưới tên|Đoàn Nguyên Dương$)/.test(l)).slice(0, 3).join(' / '),
      };
    }));
    for (const p of found) if (p.text && !posts.has(p.text)) posts.set(p.text, p);
    await page.evaluate(() => window.scrollBy(0, 900));
    await sleep(1500);
  }
  return { ok: true, mode: 'list-own-posts', posts: [...posts.values()].slice(0, limit) };
}

async function createDraft(page, text, dryRun, options = {}) {
  await openComposer(page, options.memoryIndex);

  const [privacyBtn] = await page.$$('xpath/.//div[@role="dialog"]//div[@role="button"][starts-with(@aria-label,"Chỉnh sửa quyền riêng tư")]');
  if (!privacyBtn) throw new Error('privacy button not found in composer');
  await privacyBtn.click();
  await sleep(2000);
  await chooseAudience(page, AUDIENCE_LABELS.onlyme);

  // Hard gate: refuse to post unless the composer now says "Chỉ mình tôi"
  const privacyLabel = await page.$eval('[role="dialog"] [role="button"][aria-label^="Chỉnh sửa quyền riêng tư"]', e => e.getAttribute('aria-label'));
  if (!privacyLabel.includes(AUDIENCE_LABELS.onlyme)) throw new Error(`audience not Only-me after select: ${privacyLabel}`);

  if (options.image) await attachImage(page, options.image);
  if (options.feeling) await pickFeeling(page, options.feeling);

  await page.click('[role="dialog"] [role="textbox"]');
  for (const [i, line] of text.split('\n').entries()) {
    // insertText (sendCharacter) avoids emoji typeahead swallowing the following newline
    if (i > 0) { await page.keyboard.down('Shift'); await page.keyboard.press('Enter'); await page.keyboard.up('Shift'); await sleep(200); }
    if (line) { await page.keyboard.sendCharacter(line); await sleep(200); }
  }
  await sleep(1500);

  if (dryRun) {
    const shot = path.join(__dirname, '..', 'tmp', 'fb-post-dry-run.png');
    await page.screenshot({ path: shot });
    return { ok: true, mode: 'dry-run', audience: privacyLabel, screenshot: shot };
  }

  // New post → "Đăng"; sharing a memory → "Chia sẻ"
  const submitLabel = options.memoryIndex == null ? 'Đăng' : 'Chia sẻ';
  const [postBtn] = await page.$$(`xpath/.//div[@role="dialog"]//div[@role="button"][@aria-label="${submitLabel}"]`);
  if (!postBtn) throw new Error(`"${submitLabel}" button not found`);
  await postBtn.click();
  await page.waitForFunction(() => !document.querySelector('[role="dialog"] [role="textbox"]'), { timeout: 30000 });
  await sleep(4000);
  return { ok: true, mode: 'draft', audience: AUDIENCE_LABELS.onlyme, postUrl: await findOwnPostUrl(page, text.slice(0, 40)) };
}

async function submitPost(page, postUrl, audienceKey) {
  const label = AUDIENCE_LABELS[audienceKey];
  if (!label || audienceKey === 'onlyme') throw new Error(`invalid --audience=${audienceKey}`);
  await page.goto(postUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await assertLoggedIn(page);
  await sleep(3000);
  await openPostMenuItem(page, 'Chỉnh sửa đối tượng');
  await chooseAudience(page, label);
  return { ok: true, mode: 'submit', postUrl, audience: label };
}

// A permalink opens the post as a dialog over the feed — use that dialog's own "..." menu
async function openPostMenuItem(page, itemText) {
  const [menu] = await page.$$('xpath/.//div[@role="dialog"]//div[@role="button"][starts-with(@aria-label,"Hành động đối với bài viết này")]');
  if (!menu) throw new Error('post actions menu not found');
  await menu.click();
  await sleep(1500);
  const [item] = await page.$$(`xpath/.//div[@role="menuitem"][.//span[text()="${itemText}"]]`);
  if (!item) throw new Error(`"${itemText}" menu item not found`);
  await item.click();
  await sleep(2000);
}

// Only deletes posts still on "Chỉ mình tôi" — a rejected draft, never a published post
async function deleteDraft(page, postUrl) {
  await page.goto(postUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await assertLoggedIn(page);
  await sleep(3000);
  await openPostMenuItem(page, 'Chỉnh sửa đối tượng');
  const onlyMe = await page.$$eval('[role="dialog"] input[type="radio"]', inputs => {
    const rowOf = e => e.closest('label') || e.parentElement.parentElement.parentElement;
    const checked = inputs.find(e => e.checked);
    return !!checked && rowOf(checked).innerText.split('\n')[0].trim() === 'Chỉ mình tôi';
  });
  if (!onlyMe) throw new Error('refusing to delete: post audience is not "Chỉ mình tôi"');
  await page.keyboard.press('Escape');
  await page.goto(postUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sleep(3000);
  await openPostMenuItem(page, 'Xóa bài viết');
  const [confirm] = await page.$$('xpath/.//div[@role="dialog"]//div[@role="button"][@aria-label="Xóa"]');
  if (!confirm) throw new Error('delete confirm button not found');
  await confirm.click();
  await sleep(3000);
  return { ok: true, mode: 'delete', postUrl };
}

(async () => {
  const draftFile = argAfter('--draft');
  const submitUrl = argAfter('--submit');
  const deleteUrl = argAfter('--delete');
  if (argAfter('--find-url')) {
    // Retry permalink lookup for a post whose URL wasn't captured right after posting
    const { browser, page } = await openFacebookSession();
    try {
      const postUrl = await findOwnPostUrl(page, argAfter('--find-url'));
      console.log(JSON.stringify({ ok: !!postUrl, mode: 'find-url', postUrl }));
    } finally { await browser.close(); }
    return;
  }
  if (flag('--list-memories') || flag('--list-own-posts')) {
    const limit = parseInt((args.find(a => a.startsWith('--limit=')) || '--limit=15').split('=')[1], 10);
    const { browser, page } = await openFacebookSession();
    try {
      console.log(JSON.stringify(flag('--list-memories') ? await listMemories(page) : await listOwnPosts(page, limit)));
    } finally { await browser.close(); }
    return;
  }
  if (!draftFile && !submitUrl && !deleteUrl) {
    console.error('Usage: --draft <text-file> [--dry-run] | --submit <post-url> [--audience=public|friends]');
    process.exit(2);
  }
  const audienceArg = (args.find(a => a.startsWith('--audience=')) || '--audience=public').split('=')[1];
  const { browser, page } = await openFacebookSession();
  try {
    const result = draftFile
      ? await createDraft(page, fs.readFileSync(draftFile, 'utf-8').trim(), flag('--dry-run'), { image: argAfter('--image'), feeling: argAfter('--feeling'), memoryIndex: argAfter('--share-memory') == null ? null : Number(argAfter('--share-memory')) })
      : deleteUrl ? await deleteDraft(page, deleteUrl)
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
