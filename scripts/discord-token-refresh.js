#!/usr/bin/env node
/**
 * Discord Token Refresh Script
 *
 * Extracts Discord tokens from Chrome profiles using Puppeteer.
 * Works whether Chrome is already running or not.
 *
 * Usage:
 *   node discord-token-refresh.js [profile_name]
 *   node discord-token-refresh.js nusvinn
 *   node discord-token-refresh.js nuscarrick
 *   node discord-token-refresh.js all
 *
 * Requires: puppeteer-core (globally installed)
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync, spawn } = require('child_process');

// Chrome paths
const CHROME_PATH = '/opt/google/chrome/chrome';
const CHROME_USER_DATA = path.join(os.homedir(), '.config/google-chrome');
const LOCAL_STATE = path.join(CHROME_USER_DATA, 'Local State');

// Profile mapping: discord account name → Chrome profile directory
const PROFILE_MAP = {
  nusvinn: 'Profile 19',
  nuscarrick: 'Profile 1',
};

// Config file
const CONFIG_PATH = path.join(os.homedir(), 'projects/My-AI-Agent/.discord-accounts.json');

function isChromeRunning() {
  try {
    const result = execSync('pgrep -x chrome 2>/dev/null', { encoding: 'utf8' });
    return result.trim().length > 0;
  } catch {
    return false;
  }
}

function getChromeDebugPort() {
  try {
    const result = execSync(
      "ss -tlnp 2>/dev/null | grep chrome | grep -oP ':\\K[0-9]+' | head -1",
      { encoding: 'utf8' }
    );
    return result.trim() || null;
  } catch {
    return null;
  }
}

async function extractTokenFromPage(page) {
  // Wait for Discord to fully load
  await page.waitForSelector('[class*="app-"]', { timeout: 30000 }).catch(() => {});

  // Small delay to let webpack modules initialize
  await new Promise(r => setTimeout(r, 3000));

  // Try multiple extraction methods
  const token = await page.evaluate(() => {
    // Method 1: webpack module cache — find the token store specifically
    // Discord token is a base64-ish string like "MTEwNjAz..."
    const tokenPattern = /^[A-Za-z0-9_\-]{24,}\.[A-Za-z0-9_\-]{6}\.[A-Za-z0-9_\-]{20,}$/;

    try {
      const wpRequire = typeof webpackChunkdiscord_app !== 'undefined'
        ? webpackChunkdiscord_app.push([[Symbol()], {}, r => r])
        : null;
      if (wpRequire) {
        for (const m of Object.values(wpRequire.c || {})) {
          try {
            // Look for the auth token store specifically
            const exp = m?.exports;
            if (!exp) continue;

            // Check default export
            if (exp.default?.getToken) {
              const t = exp.default.getToken();
              if (typeof t === 'string' && tokenPattern.test(t)) return t;
            }
            // Check named export
            if (exp.getToken) {
              const t = exp.getToken();
              if (typeof t === 'string' && tokenPattern.test(t)) return t;
            }
            // Check Z export (common in Discord's bundled code)
            if (exp.Z?.getToken) {
              const t = exp.Z.getToken();
              if (typeof t === 'string' && tokenPattern.test(t)) return t;
            }
          } catch {}
        }
      }
    } catch {}

    // Method 2: iframe trick to access localStorage
    try {
      const iframe = document.createElement('iframe');
      document.body.appendChild(iframe);
      const token = iframe.contentWindow.localStorage.getItem('token');
      iframe.remove();
      if (token) {
        const parsed = JSON.parse(token);
        if (typeof parsed === 'string' && tokenPattern.test(parsed)) return parsed;
      }
    } catch {}

    // Method 3: direct localStorage
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const parsed = JSON.parse(token);
        if (typeof parsed === 'string' && tokenPattern.test(parsed)) return parsed;
      }
    } catch {}

    // Method 4: Scan all localStorage for token-like values
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const val = localStorage.getItem(key);
        if (val && tokenPattern.test(val)) return val;
        try {
          const parsed = JSON.parse(val);
          if (typeof parsed === 'string' && tokenPattern.test(parsed)) return parsed;
        } catch {}
      }
    } catch {}

    return null;
  });

  return token;
}

async function extractWithTempProfile(profileDir, accountName) {
  const puppeteer = require('puppeteer-core');

  // Copy profile to temp dir so we don't conflict with running Chrome
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'discord-token-'));
  const tempProfile = path.join(tempDir, 'Default');

  console.log(`[${accountName}] Chrome is running — copying profile to temp dir...`);

  // Copy essential dirs from Chrome profile
  const srcProfile = path.join(CHROME_USER_DATA, profileDir);
  execSync(`cp -r "${srcProfile}" "${tempProfile}"`, { stdio: 'pipe' });

  // Also copy root-level files needed (Cookies encryption key, etc.)
  for (const f of ['Local State']) {
    const src = path.join(CHROME_USER_DATA, f);
    if (fs.existsSync(src)) {
      execSync(`cp "${src}" "${tempDir}/"`, { stdio: 'pipe' });
    }
  }

  let browser;
  try {
    browser = await puppeteer.launch({
      executablePath: CHROME_PATH,
      headless: 'new',
      userDataDir: tempDir,
      args: [
        '--no-first-run',
        '--no-default-browser-check',
        '--disable-extensions',
        '--disable-sync',
        '--disable-gpu',
      ],
    });

    const page = await browser.newPage();

    // Use CDP to capture network requests (more reliable than puppeteer interception)
    const client = await page.target().createCDPSession();
    await client.send('Network.enable');

    let capturedToken = null;
    client.on('Network.requestWillBeSent', (params) => {
      const authHeader = (params.request.headers || {})['Authorization'] || (params.request.headers || {})['authorization'];
      if (authHeader && !authHeader.startsWith('Bot ') && !capturedToken) {
        capturedToken = authHeader;
        console.log(`[${accountName}] CDP captured token from: ${params.request.url.substring(0, 80)}`);
      }
    });

    console.log(`[${accountName}] Navigating to Discord...`);
    await page.goto('https://discord.com/channels/@me', { waitUntil: 'networkidle0', timeout: 60000 });

    const url = page.url();
    console.log(`[${accountName}] Final URL: ${url}`);

    if (url.includes('/login')) {
      console.log(`[${accountName}] Session expired — Discord showing login page. Need manual login.`);
      return null;
    }

    // Wait for Discord to fully initialize and make API calls
    await new Promise(r => setTimeout(r, 8000));

    // If CDP didn't capture, try webpack extraction
    if (!capturedToken) {
      console.log(`[${accountName}] CDP capture missed, trying webpack extraction...`);
      capturedToken = await extractTokenFromPage(page);
    }

    return capturedToken;
  } finally {
    if (browser) await browser.close().catch(() => {});
    // Cleanup temp dir
    execSync(`rm -rf "${tempDir}"`, { stdio: 'pipe' });
  }
}

async function extractWithDirectLaunch(profileDir, accountName) {
  const puppeteer = require('puppeteer-core');

  console.log(`[${accountName}] Chrome not running — launching directly with profile...`);

  let browser;
  try {
    browser = await puppeteer.launch({
      executablePath: CHROME_PATH,
      headless: 'new',
      userDataDir: CHROME_USER_DATA,
      args: [
        `--profile-directory=${profileDir}`,
        '--no-first-run',
        '--no-default-browser-check',
        '--disable-extensions',
        '--disable-sync',
        '--disable-gpu',
      ],
    });

    const page = await browser.newPage();

    // Intercept network requests to capture the Authorization header
    let capturedToken = null;
    await page.setRequestInterception(true);
    page.on('request', (request) => {
      const authHeader = request.headers()['authorization'];
      if (authHeader && !authHeader.startsWith('Bot ') && !capturedToken) {
        capturedToken = authHeader;
        console.log(`[${accountName}] Captured token from request to: ${request.url().substring(0, 80)}`);
      }
      request.continue();
    });

    console.log(`[${accountName}] Navigating to Discord...`);
    await page.goto('https://discord.com/channels/@me', { waitUntil: 'networkidle2', timeout: 45000 });

    const url = page.url();
    console.log(`[${accountName}] Final URL: ${url}`);

    if (url.includes('/login')) {
      console.log(`[${accountName}] Session expired — Discord showing login page. Need manual login.`);
      return null;
    }

    // Wait a bit more for API calls to fire
    if (!capturedToken) {
      await new Promise(r => setTimeout(r, 5000));
    }

    return capturedToken;
  } finally {
    if (browser) await browser.close().catch(() => {});
  }
}

async function refreshToken(accountName) {
  const profileDir = PROFILE_MAP[accountName];
  if (!profileDir) {
    console.error(`Unknown account: ${accountName}. Available: ${Object.keys(PROFILE_MAP).join(', ')}`);
    return null;
  }

  console.log(`\n=== Refreshing token for ${accountName} (${profileDir}) ===`);

  let token;
  if (isChromeRunning()) {
    token = await extractWithTempProfile(profileDir, accountName);
  } else {
    token = await extractWithDirectLaunch(profileDir, accountName);
  }

  if (token) {
    const tokenStr = typeof token === 'string' ? token : JSON.stringify(token);
    console.log(`[${accountName}] Token extracted: ${tokenStr.substring(0, 30)}...`);
  } else {
    console.log(`[${accountName}] Failed to extract token.`);
  }

  return token;
}

function updateConfig(accountName, newToken) {
  if (!fs.existsSync(CONFIG_PATH)) {
    console.error(`Config file not found: ${CONFIG_PATH}`);
    return false;
  }

  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
  const account = config.accounts.find(a => a.user === accountName || a.name === accountName);
  if (!account) {
    console.error(`Account ${accountName} not found in config.`);
    return false;
  }

  account.token = typeof newToken === 'string' ? newToken : String(newToken);
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2) + '\n');
  console.log(`[${accountName}] Config updated.`);
  return true;
}

async function main() {
  const target = process.argv[2] || 'all';
  const accounts = target === 'all' ? Object.keys(PROFILE_MAP) : [target];

  const results = {};

  for (const name of accounts) {
    const token = await refreshToken(name);
    if (token) {
      updateConfig(name, token);
      results[name] = 'success';
    } else {
      results[name] = 'failed';
    }
  }

  console.log('\n=== Results ===');
  for (const [name, status] of Object.entries(results)) {
    console.log(`  ${name}: ${status}`);
  }

  // Output JSON for programmatic use
  console.log('\n' + JSON.stringify(results));
}

main().catch(err => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
