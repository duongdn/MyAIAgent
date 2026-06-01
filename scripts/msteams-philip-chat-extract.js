#!/usr/bin/env node
/**
 * Navigate to Teams chat list and extract Philip Briggs messages
 * Uses existing saved session profile
 */
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const path = require('path');

puppeteer.use(StealthPlugin());

const PROFILE_DIR = path.resolve(__dirname, '../tmp/msteams-will-profile');
const TIMEOUT = 60000;
const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: '/usr/bin/google-chrome',
    userDataDir: PROFILE_DIR,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900'],
    defaultViewport: { width: 1440, height: 900 },
  });
  const page = await browser.newPage();
  await page.goto('https://teams.live.com/v2/', { waitUntil: 'domcontentloaded', timeout: TIMEOUT });
  await sleep(10000);

  // Dismiss any open search/overlay
  await page.keyboard.press('Escape');
  await sleep(2000);

  // Click Chat icon in sidebar
  const chatSel = '[data-tid="app-bar-chat"], [aria-label="Chat"], [data-tid="leftnav-chat"]';
  const chatBtn = await page.$(chatSel);
  if (chatBtn) { await chatBtn.click(); await sleep(3000); }

  const body = await page.evaluate(() => document.body.innerText || '');
  console.log('Body len:', body.length);
  await page.screenshot({ path: path.resolve(__dirname, '../tmp/msteams-chat-list.png') });

  // Find Philip Briggs in chat list
  const allItems = await page.$$('[role="listitem"]');
  let philipEl = null;
  for (const el of allItems.slice(0, 100)) {
    const text = await el.evaluate(n => (n.innerText || '').trim());
    if (/philip briggs/i.test(text)) {
      philipEl = el;
      console.log('Found Philip:', text.slice(0, 120).replace(/\n/g, ' '));
      break;
    }
  }

  if (!philipEl) {
    // Search for Philip in the search box
    console.log('Philip not in list, opening chat via search...');
    await page.keyboard.down('Control');
    await page.keyboard.press('e');
    await page.keyboard.up('Control');
    await sleep(1000);
    await page.keyboard.type('Philip Briggs', { delay: 80 });
    await sleep(3000);
    await page.screenshot({ path: path.resolve(__dirname, '../tmp/msteams-philip-search2.png') });

    // Look for Philip Briggs in results and click Messages tab
    const msgTab = await page.$('[aria-label="Messages"], button[data-tid="messages-tab"]');
    if (msgTab) { await msgTab.click(); await sleep(2000); }

    const pbEl = await page.$('[title*="Philip Briggs"], [aria-label*="Philip Briggs"]');
    if (pbEl) { await pbEl.click(); philipEl = pbEl; }
  }

  if (philipEl) {
    await philipEl.click();
    await sleep(4000);
    await page.screenshot({ path: path.resolve(__dirname, '../tmp/msteams-philip-opened.png') });

    const messages = await page.evaluate(() => {
      // Try message-specific selectors
      const msgEls = document.querySelectorAll('[data-tid="message-body"], [class*="messageContent"], [class*="message-body"]');
      if (msgEls.length > 0) {
        return Array.from(msgEls).slice(-15).map(el => {
          const container = el.closest('[class*="message"], [role="listitem"]') || el.parentElement;
          const sender = container ? (container.querySelector('[class*="author"], [class*="sender"]') || {}).innerText || '' : '';
          const time = container ? (container.querySelector('time, [class*="timestamp"]') || {}).innerText || '' : '';
          return { sender: sender.trim(), time: time.trim(), text: el.innerText?.trim().slice(0, 400) };
        });
      }
      // Fallback
      const main = document.querySelector('[role="main"], [class*="chatView"]');
      return [{ sender: 'raw', time: '', text: (main || document.body).innerText?.slice(0, 3000) }];
    });

    console.log('\n=== PHILIP BRIGGS MESSAGES ===');
    messages.forEach((m, i) => console.log('[' + (i + 1) + '] ' + (m.sender || '') + (m.time ? ' (' + m.time + ')' : '') + ': ' + m.text));
  } else {
    console.log('Could not open Philip Briggs chat');
    console.log('Body snippet:', body.slice(0, 600).replace(/\n/g, '|'));
  }

  await browser.close();
})().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
