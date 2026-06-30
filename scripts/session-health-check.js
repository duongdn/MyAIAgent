#!/usr/bin/env node
/**
 * Session Health Check
 *
 * Checks all session-based integrations before the daily cron runs.
 * Sends a Slack DM to the GGS #maintenance channel if any session needs re-auth.
 *
 * Usage: node scripts/session-health-check.js
 * Exit 0: all sessions OK (or degraded but daily cron can proceed)
 * Exit 1: critical sessions failed
 *
 * Sessions checked:
 *   - Matrix (access_token + refresh_token via API)
 *   - Workstream (JWT via API)
 *   - Upwork carrick (Puppeteer page load)
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');

const ROOT = path.join(__dirname, '..');

function readJson(p) {
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch { return null; }
}

function apiGet(url, headers = {}) {
  return new Promise((resolve) => {
    const parsed = new URL(url);
    const req = https.request({ hostname: parsed.hostname, path: parsed.pathname + parsed.search, headers }, (res) => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        try { resolve({ status: res.statusCode, body: JSON.parse(d) }); }
        catch { resolve({ status: res.statusCode, body: d }); }
      });
    });
    req.on('error', () => resolve({ status: 0, body: null }));
    req.end();
  });
}

function post(url, body) {
  return new Promise((resolve) => {
    const u = new URL(url);
    const data = Buffer.from(body, 'utf8');
    const req = https.request({
      hostname: u.hostname, path: u.pathname, method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Content-Length': data.length },
    }, (res) => {
      let buf = '';
      res.on('data', c => buf += c);
      res.on('end', () => { try { resolve(JSON.parse(buf)); } catch { resolve({}); } });
    });
    req.on('error', () => resolve({}));
    req.write(data);
    req.end();
  });
}

async function checkMatrix() {
  const config = readJson(path.join(ROOT, 'config', '.matrix-config.json'));
  if (!config) return { ok: false, note: 'config missing' };

  // Try current access_token
  const r = await apiGet(`${config.homeserver}/_matrix/client/v3/account/whoami`, {
    Authorization: `Bearer ${config.access_token}`,
  });
  if (r.body && r.body.user_id) return { ok: true };

  // Try refresh_token
  if (config.refresh_token && config.token_endpoint && config.oidc_client_id) {
    const r2 = await post(config.token_endpoint,
      `grant_type=refresh_token&refresh_token=${encodeURIComponent(config.refresh_token)}&client_id=${encodeURIComponent(config.oidc_client_id)}`
    );
    if (r2.access_token) {
      config.access_token = r2.access_token;
      if (r2.refresh_token) config.refresh_token = r2.refresh_token;
      fs.writeFileSync(path.join(ROOT, 'config', '.matrix-config.json'), JSON.stringify(config, null, 2));
      return { ok: true, note: 'refreshed via refresh_token' };
    }
    return { ok: false, note: `access_token + refresh_token both expired. Fix: node scripts/matrix-device-auth.js` };
  }
  return { ok: false, note: 'access_token expired, no refresh_token stored. Fix: node scripts/matrix-device-auth.js' };
}

async function checkWorkstream() {
  const config = readJson(path.join(ROOT, 'config', '.workstream-config.json'));
  if (!config || !config.access_token) return { ok: false, note: 'config missing' };

  const r = await apiGet(`${config.api_base || config.base_url + '/api'}/me`, {
    Authorization: `Bearer ${config.access_token}`,
  });
  if (r.body && r.body.id) return { ok: true };
  if (r.body && r.body.error && r.body.error.includes('exp')) {
    return { ok: false, note: 'JWT expired. Fix: DISPLAY=:1 node scripts/workstream-login.js' };
  }
  return { ok: false, note: `API returned ${r.status}. Fix: DISPLAY=:1 node scripts/workstream-login.js` };
}

async function checkUpwork() {
  const config = readJson(path.join(ROOT, 'config', '.upwork-config.json'));
  if (!config) return { ok: false, note: 'config missing' };

  // Check if profile exists (necessary condition)
  const profileDir = path.join(ROOT, 'tmp', 'upwork-profile-carrick');
  if (!fs.existsSync(path.join(profileDir, 'Default'))) {
    return { ok: false, note: 'no saved session. Fix: DISPLAY=:1 node scripts/upwork-login.js --login --account=carrick' };
  }

  // Profile exists — try a quick headless page load to validate
  try {
    execSync(`timeout 20 node ${path.join(__dirname, 'upwork-weekly-hours.js')} --workroom=Rory 2>/dev/null`, {
      env: { ...process.env, DISPLAY: ':1' }, timeout: 25000,
    });
    return { ok: true };
  } catch {
    return { ok: false, note: 'session expired. Fix: DISPLAY=:1 node scripts/upwork-login.js --login --account=carrick' };
  }
}

async function sendSlackAlert(message) {
  const slackConfig = readJson(path.join(ROOT, 'config', '.slack-accounts.json'));
  if (!slackConfig) return;

  // Use GGS workspace (Nick's account) to post to a channel or DM
  const ws = slackConfig.find ? slackConfig.find(w => w.name && w.name.toLowerCase().includes('global grazing')) : null;
  if (!ws || !ws.token) return;

  const payload = JSON.stringify({
    channel: 'C0338NXK3SB', // #maintenance
    text: message,
    mrkdwn: true,
  });
  const data = Buffer.from(payload, 'utf8');
  const req = https.request({
    hostname: 'slack.com',
    path: '/api/chat.postMessage',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${ws.token}`,
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': data.length,
    },
  }, (res) => {
    let d = '';
    res.on('data', c => d += c);
    res.on('end', () => {
      try { const r = JSON.parse(d); if (!r.ok) console.error('Slack alert failed:', r.error); }
      catch {}
    });
  });
  req.on('error', () => {});
  req.write(data);
  req.end();
}

async function main() {
  const results = {
    matrix: await checkMatrix(),
    workstream: await checkWorkstream(),
    upwork: await checkUpwork(),
  };

  const failed = Object.entries(results).filter(([, r]) => !r.ok);
  const ok = Object.entries(results).filter(([, r]) => r.ok);

  // Print status
  ok.forEach(([name, r]) => console.log(`✅ ${name}${r.note ? ' (' + r.note + ')' : ''}`));
  failed.forEach(([name, r]) => console.error(`❌ ${name}: ${r.note}`));

  if (failed.length > 0) {
    const lines = failed.map(([name, r]) => `• *${name}*: ${r.note}`).join('\n');
    const msg = `⚠️ *Daily Cron Session Alert* — ${failed.length} session(s) need re-auth before next run:\n${lines}`;
    console.log('\nSending Slack alert...');
    await sendSlackAlert(msg);
  }

  process.exit(failed.length > 0 ? 1 : 0);
}

main().catch(err => { console.error('Fatal:', err.message); process.exit(1); });
