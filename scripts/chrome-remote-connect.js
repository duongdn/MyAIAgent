/**
 * Shared utility: connect to the already-running Chrome via CDP remote debugging.
 * Chrome must be started with --remote-debugging-port=9222 (handled by the autostart entry
 * ~/.config/autostart/whatsapp-zalo-monitor.desktop, which uses --user-data-dir=/home/nus/chrome-monitor-data).
 * NOTE: Chrome 136+ blocks --remote-debugging-port on the DEFAULT user data dir, so a dedicated
 * --user-data-dir is REQUIRED. Do not try to debug the default ~/.config/google-chrome profile.
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
      `The monitor Chrome is not running. Start it via the autostart entry or:\n` +
      `google-chrome-stable --remote-debugging-port=9222 --user-data-dir=/home/nus/chrome-monitor-data "https://web.whatsapp.com" "https://chat.zalo.me"`
    );
  }
}

/**
 * Get the browser-level WebSocket URL (from /json/version).
 */
async function getBrowserWsUrl() {
  const version = await httpGet(`http://${DEBUG_HOST}:${DEBUG_PORT}/json/version`);
  return version.webSocketDebuggerUrl;
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
      `Open ${urlPattern} in the monitor Chrome (--user-data-dir=/home/nus/chrome-monitor-data) and retry.`
    );
  }

  process.stderr.write(`[chrome-remote] Attaching to tab: ${tab.url}\n`);

  // Connect at the browser level, then pick the matching page
  const browserWs = await getBrowserWsUrl();
  const browser = await puppeteer.connect({
    browserWSEndpoint: browserWs,
    defaultViewport: null,
  });

  const pages = await browser.pages();
  const page = pages.find(p => p.url() === tab.url) || pages.find(p => p.url().includes(urlPattern));

  if (!page) {
    await browser.disconnect();
    throw new Error(`Tab found but page object not resolved for "${urlPattern}".`);
  }

  return { browser, page, tab };
}

module.exports = { listTabs, findTab };
