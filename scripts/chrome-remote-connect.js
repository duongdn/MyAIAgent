/**
 * Shared utility: connect to the already-running Chrome via CDP remote debugging.
 * Chrome must be started with --remote-debugging-port=9222 (handled by .desktop override).
 *
 * Usage:
 *   const { findTab, connectToChrome } = require('./chrome-remote-connect');
 *   const { browser, page } = await findTab('web.whatsapp.com');
 *   // ... use page ...
 *   await browser.disconnect(); // disconnect, don't close Chrome!
 */

const https = require('https');
const http = require('http');

const DEBUG_PORT = 9222;
const DEBUG_HOST = '127.0.0.1';

function httpGet(url) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    const req = mod.get(url, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(new Error('JSON parse failed: ' + data.slice(0, 100))); }
      });
    });
    req.on('error', reject);
    req.setTimeout(5000, () => { req.destroy(); reject(new Error('timeout')); });
  });
}

/**
 * List all open Chrome tabs via CDP /json endpoint.
 */
async function listTabs() {
  try {
    return await httpGet(`http://${DEBUG_HOST}:${DEBUG_PORT}/json`);
  } catch (e) {
    throw new Error(
      `Cannot connect to Chrome debug port ${DEBUG_PORT}.\n` +
      `Chrome must be restarted once for the --remote-debugging-port flag to take effect.\n` +
      `Close and reopen Chrome, then retry.`
    );
  }
}

/**
 * Connect Puppeteer to the running Chrome and return the tab matching urlPattern.
 * Returns { browser, page } — call browser.disconnect() when done (never close!).
 */
async function findTab(urlPattern) {
  const puppeteer = require('puppeteer-extra');
  const StealthPlugin = require('puppeteer-extra-plugin-stealth');
  puppeteer.use(StealthPlugin());

  const tabs = await listTabs();
  const tab = tabs.find(t => t.type === 'page' && t.url && t.url.includes(urlPattern));

  if (!tab) {
    throw new Error(
      `No tab found matching "${urlPattern}".\n` +
      `Open ${urlPattern} in Chrome (Profile 9) and retry.`
    );
  }

  process.stderr.write(`[chrome-remote] Attaching to tab: ${tab.url}\n`);

  const browser = await puppeteer.connect({
    browserWSEndpoint: tab.webSocketDebuggerUrl,
    defaultViewport: null,
  });

  const pages = await browser.pages();
  // puppeteer.connect with a tab WS endpoint gives us that specific page
  const page = pages[0] || (await browser.newPage());

  return { browser, page, tab };
}

module.exports = { listTabs, findTab };
