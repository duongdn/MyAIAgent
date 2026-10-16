// Upwork on the headless cron server (mpfc): a headless Chrome from a datacenter IP is stuck on
// Cloudflare's "Just a moment…" page. A real (non-headless) Chrome on a virtual display (Xvfb)
// with a persistent profile passes once the Turnstile checkbox is clicked, and the profile keeps
// the Upwork session + cf_clearance so it self-renews with daily use (verified 2026-10-16).
// Locally (carrick's real Chrome Profile 1 exists) none of this applies.
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const IS_SERVER = !fs.existsSync('/home/nus/.config/google-chrome/Profile 1/Cookies');
// Same dir upwork-memo-check.js already treats as the "saved profile" for carrick.
const SERVER_PROFILE_DIR = path.join(__dirname, '..', '..', 'tmp', 'upwork-profile-carrick');
const XVFB_DISPLAY = ':99';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Start Xvfb if we're on the server with no display. Idempotent (X lock file check).
async function ensureVirtualDisplay() {
  if (!IS_SERVER || process.env.DISPLAY) return;
  if (!fs.existsSync(`/tmp/.X${XVFB_DISPLAY.slice(1)}-lock`)) {
    spawn('Xvfb', [XVFB_DISPLAY, '-screen', '0', '1280x900x24', '-nolisten', 'tcp'], {
      detached: true, stdio: 'ignore',
    }).unref();
    await sleep(1500);
  }
  process.env.DISPLAY = XVFB_DISPLAY;
}

const isChallenge = async (page) =>
  /just a moment/i.test(await page.title().catch(() => '')) ||
  (await page.evaluate(() => (document.body?.innerText || '').includes('Verify you are human')).catch(() => false));

// Click the Turnstile checkbox like a human (real mouse path). Returns true when past the challenge.
async function passCloudflareTurnstile(page, tries = 3) {
  for (let i = 0; i < tries; i++) {
    await sleep(6000); // let Turnstile render (it may also auto-pass)
    if (!(await isChallenge(page))) return true;
    // The widget's iframe sits in a closed shadow root, so locate its host by Turnstile's fixed
    // 300x65 size; the checkbox is ~21px from its left edge, vertically centred. Position varies
    // with viewport height (seen y=273 and y=295), so never hardcode it.
    const box = await page.evaluate(() => {
      for (const el of document.querySelectorAll('body *')) {
        const r = el.getBoundingClientRect();
        if (r.width >= 290 && r.width <= 310 && r.height >= 60 && r.height <= 70) return { x: r.x, y: r.y, h: r.height };
      }
      return null;
    }).catch(() => null);
    const x = box ? box.x + 21 : 511;
    const y = box ? box.y + box.h / 2 : 295;
    await page.mouse.move(x - 120, y - 80);
    await page.mouse.move(x, y, { steps: 15 });
    await page.mouse.click(x, y, { delay: 80 });
    console.error(`[upwork-server-browser] clicked Turnstile at ${Math.round(x)},${Math.round(y)} (try ${i + 1}${box ? "" : ", fallback coords"})`);
    await sleep(10000);
    if (!(await isChallenge(page))) return true;
  }
  await page.screenshot({ path: path.join(__dirname, '..', '..', 'tmp', 'turnstile-fail.png') }).catch(() => {});
  return false;
}

module.exports = { IS_SERVER, SERVER_PROFILE_DIR, ensureVirtualDisplay, passCloudflareTurnstile };
