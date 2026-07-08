#!/usr/bin/env node
/**
 * Matrix Device Code Authentication
 *
 * Use when the Matrix access_token + refresh_token are both expired (browser SSO
 * is unavailable in cron). This initiates the RFC 8628 device authorization grant:
 *   1. Gets a user_code + verification URL (no browser on server needed)
 *   2. Prints the URL for the user to visit on any device
 *   3. Polls until approved (or timeout)
 *   4. Saves the new access_token + refresh_token to config
 *
 * Usage:
 *   node scripts/matrix-device-auth.js
 *
 * After running, the new refresh_token is stored. Future cron runs that call
 * matrix-token-refresh.js will use it to get fresh access_tokens automatically.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const { saveSecretConfig } = require('./lib/save-secret-config');

const CONFIG_PATH = path.join(__dirname, '..', 'config', '.matrix-config.json');

function post(url, body) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const data = Buffer.from(body, 'utf8');
    const req = https.request({
      hostname: u.hostname,
      path: u.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': data.length,
      },
    }, (res) => {
      let buf = '';
      res.on('data', c => buf += c);
      res.on('end', () => {
        try { resolve(JSON.parse(buf)); }
        catch { resolve({ raw: buf }); }
      });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function main() {
  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
  const clientId = config.oidc_client_id;
  const tokenEndpoint = config.token_endpoint;

  // Step 1: Try refresh_token first (fast path)
  if (config.refresh_token) {
    console.log('[matrix-device-auth] Trying refresh_token first...');
    const r = await post(tokenEndpoint, `grant_type=refresh_token&refresh_token=${encodeURIComponent(config.refresh_token)}&client_id=${encodeURIComponent(clientId)}`);
    if (r.access_token) {
      config.access_token = r.access_token;
      if (r.refresh_token) config.refresh_token = r.refresh_token;
      saveSecretConfig(CONFIG_PATH, config);
      console.log('[matrix-device-auth] Refreshed via refresh_token. Done.');
      return;
    }
    console.log('[matrix-device-auth] Refresh token expired:', r.error);
  }

  // Step 2: Device code flow
  const deviceEndpoint = tokenEndpoint.replace('/oauth2/token', '/oauth2/device');
  const scope = 'openid urn:matrix:org.matrix.msc2967.client:api:*';

  const dev = await post(deviceEndpoint, `client_id=${encodeURIComponent(clientId)}&scope=${encodeURIComponent(scope)}`);
  if (!dev.user_code) {
    console.error('[matrix-device-auth] Failed to get device code:', JSON.stringify(dev));
    process.exit(1);
  }

  console.log('\n=== Matrix Device Authorization ===');
  console.log('Visit this URL to authorize:');
  console.log('  ' + dev.verification_uri_complete);
  console.log('\nOr go to:', dev.verification_uri, 'and enter code:', dev.user_code);
  console.log('Expires in:', Math.floor(dev.expires_in / 60), 'minutes\n');

  // Step 3: Poll until approved
  const interval = (dev.interval || 5) * 1000;
  const expiresAt = Date.now() + dev.expires_in * 1000;

  while (Date.now() < expiresAt) {
    await new Promise(r => setTimeout(r, interval));
    const tok = await post(tokenEndpoint, `grant_type=urn:ietf:params:oauth:grant-type:device_code&device_code=${encodeURIComponent(dev.device_code)}&client_id=${encodeURIComponent(clientId)}`);

    if (tok.access_token) {
      config.access_token = tok.access_token;
      if (tok.refresh_token) config.refresh_token = tok.refresh_token;
      saveSecretConfig(CONFIG_PATH, config);
      console.log('[matrix-device-auth] SUCCESS! Tokens saved to config.');
      console.log('Access token:', tok.access_token.substring(0, 30) + '...');
      if (tok.refresh_token) console.log('Refresh token saved (persists across cron runs).');
      return;
    }

    if (tok.error === 'authorization_pending') {
      process.stdout.write('.');
      continue;
    }
    if (tok.error === 'slow_down') {
      await new Promise(r => setTimeout(r, 5000));
      continue;
    }
    if (tok.error === 'expired_token') {
      console.error('\n[matrix-device-auth] Code expired. Run this script again.');
      process.exit(1);
    }
    console.error('\n[matrix-device-auth] Error:', JSON.stringify(tok));
    process.exit(1);
  }

  console.error('\n[matrix-device-auth] Timed out. Run this script again.');
  process.exit(1);
}

main().catch(err => { console.error(err); process.exit(1); });
