#!/usr/bin/env node
/**
 * Send a WhatsApp message to an existing chat via the dedicated monitor Chrome (CDP, port 9222).
 * Only run when the user explicitly approved the message — never auto-send.
 *
 * Usage: node scripts/whatsapp-send-message.js "<chat name>" <message-file>
 *   Newlines in the file are sent as Shift+Enter line breaks within ONE message.
 */
const fs = require('fs');
const { findTab } = require('./chrome-remote-connect');

const [chatName, msgFile] = process.argv.slice(2);
if (!chatName || !msgFile) {
  console.error('Usage: node scripts/whatsapp-send-message.js "<chat name>" <message-file>');
  process.exit(1);
}
const text = fs.readFileSync(msgFile, 'utf8').trim();

async function main() {
  const { browser, page } = await findTab('web.whatsapp.com');
  try {
    await page.bringToFront();
    // Open the chat with a real mouse click (JS .click() does not open WhatsApp conversations)
    const box = await page.evaluate(async (name) => {
      const el = Array.from(document.querySelectorAll('[data-testid="cell-frame-title"]'))
        .find(e => (e.innerText || '').includes(name));
      if (!el) return null;
      el.scrollIntoView({ block: 'center' });
      await new Promise(r => setTimeout(r, 350));
      const r = el.getBoundingClientRect();
      return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
    }, chatName);
    if (!box) throw new Error(`Chat not found in list: ${chatName}`);
    await page.mouse.click(box.x, box.y);
    await new Promise(r => setTimeout(r, 2000));

    // Verify the open conversation header matches before typing anything
    const header = await page.evaluate(() =>
      document.querySelector('#main header')?.innerText || '');
    if (!header.includes(chatName)) throw new Error(`Opened chat header mismatch: "${header.slice(0, 60)}"`);

    const composer = await page.$('#main footer [contenteditable="true"]');
    if (!composer) throw new Error('Compose box not found');
    await composer.click();

    const lines = text.split('\n');
    for (let i = 0; i < lines.length; i++) {
      if (lines[i]) await page.keyboard.type(lines[i], { delay: 5 });
      if (i < lines.length - 1) {
        await page.keyboard.down('Shift'); await page.keyboard.press('Enter'); await page.keyboard.up('Shift');
      }
    }
    await page.keyboard.press('Enter');
    await new Promise(r => setTimeout(r, 2500));

    // Confirm: last outgoing message contains the first line of our text
    const firstLine = lines[0].slice(0, 40);
    // Chat-list preview reflects the last sent message (`.message-out` selector is not stable)
    const ok = await page.evaluate((name, needle) => {
      const cell = Array.from(document.querySelectorAll('[data-testid="cell-frame-container"]'))
        .find(el => (el.querySelector('[data-testid="cell-frame-title"]')?.innerText || '').includes(name));
      return !!cell && (cell.innerText || '').includes(needle);
    }, chatName, firstLine);
    console.log(ok ? `SENT to ${chatName}` : `UNCONFIRMED — check ${chatName} manually`);
    if (!ok) process.exitCode = 2;
  } finally {
    await browser.disconnect(); // detach only — never close the monitor Chrome
  }
}

main().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
