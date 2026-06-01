#!/usr/bin/env node
/**
 * Extract Philip Briggs chat messages from Teams (uses saved session)
 */
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');
const path = require('path');

puppeteer.use(StealthPlugin());

const PROFILE_DIR = path.resolve(__dirname, '../tmp/msteams-will-profile');
const TIMEOUT = 60000;
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: '/usr/bin/google-chrome',
    userDataDir: PROFILE_DIR,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900'],
    defaultViewport: { width: 1440, height: 900 },
  });
  const page = await browser.newPage();

  console.log('Loading Teams via saved session...');
  await page.goto('https://teams.live.com/v2/', { waitUntil: 'domcontentloaded', timeout: TIMEOUT });
  await sleep(8000);

  const url = page.url();
  const body = await page.evaluate(() => document.body.innerText || '');
  console.log('URL:', url.slice(0, 80), 'body len:', body.length);

  // Find Philip Briggs row in chat list
  const handles = await page.$$('[role="listitem"], [class*="listItem"], [data-tid*="cell"]');
  let philipEl = null;
  for (const el of handles.slice(0, 80)) {
    const t = await el.evaluate(n => (n.innerText || n.textContent || '').trim());
    if (/philip briggs/i.test(t)) {
      philipEl = el;
      console.log('Found Philip in list:', t.slice(0, 120).replace(/\n/g, ' '));
      break;
    }
  }

  if (philipEl) {
    await philipEl.click();
    await sleep(4000);
    await page.screenshot({ path: path.resolve(__dirname, '../tmp/msteams-philip-chat.png') });

    const chatContent = await page.evaluate(() => {
      // Try specific message elements
      const msgs = document.querySelectorAll('[data-tid="message-body"], [class*="messageContent"], [class*="message-body"]');
      if (msgs.length > 0) {
        return Array.from(msgs).slice(-20).map(el => {
          const p = el.closest('[class*="message"], [role="listitem"]') || el.parentElement;
          const sender = p ? (p.querySelector('[class*="author"], [class*="sender"]') || {}).innerText || '' : '';
          const time = p ? (p.querySelector('time, [class*="timestamp"]') || {}).innerText || '' : '';
          return { sender: sender.trim(), time: time.trim(), text: el.innerText?.trim().slice(0, 300) };
        });
      }
      // Fallback: main content area
      const main = document.querySelector('[role="main"], [class*="chatView"], [class*="messageThread"]');
      return [{ sender: '(raw)', time: '', text: (main || document.body).innerText?.slice(0, 3000) }];
    });

    console.log('\n=== PHILIP BRIGGS CHAT ===');
    chatContent.forEach((m, i) => {
      console.log('[' + (i + 1) + '] ' + (m.sender ? m.sender + ' | ' : '') + (m.time ? m.time + ' | ' : '') + m.text);
    });
  } else {
    console.log('Philip Briggs not found in visible chat list');
    // Log visible chat items for debugging
    const items = await page.evaluate(() => {
      const els = document.querySelectorAll('[role="listitem"]');
      return Array.from(els).slice(0, 20).map(el => el.innerText?.trim().slice(0, 80));
    });
    items.forEach((t, i) => t && console.log('  item[' + i + ']:', t.replace(/\n/g, ' ')));
  }

  await browser.close();
})().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
