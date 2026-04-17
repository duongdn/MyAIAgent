#!/usr/bin/env node
// Verify all Slack tokens in config/.slack-accounts.json.
// xoxc tokens MUST get both Authorization and Cookie headers —
// missing Cookie returns invalid_auth and looks like expiry but isn't.
// This script removes that trap for any caller.
//
// Exit code 0 = all OK; non-zero = count of failing workspaces.
// Output: JSON array per workspace with {workspace, token_type, ok, error?, team?, user?}.

const fs = require('fs');
const path = require('path');
const https = require('https');

const CFG = path.resolve(__dirname, '..', 'config', '.slack-accounts.json');

function post(url, body, headers) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, { method: 'POST', headers }, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (e) { reject(e); }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function verify(acc) {
  const ws = acc.workspace || '?';
  const tok = acc.token || '';
  const type = tok.startsWith('xoxc-') ? 'xoxc' : tok.startsWith('xoxp-') ? 'xoxp' : 'unknown';
  const cookie = acc.cookie || acc.d_cookie || '';
  const cookieHdr = cookie.includes('d=') ? cookie : (cookie ? `d=${cookie}` : '');

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': `Bearer ${tok}`,
  };
  if (type === 'xoxc') {
    if (!cookieHdr) return { workspace: ws, token_type: type, ok: false, error: 'missing_cookie_in_config' };
    headers['Cookie'] = cookieHdr;
  }

  try {
    const r = await post('https://slack.com/api/auth.test', `token=${encodeURIComponent(tok)}`, headers);
    if (r.ok) return { workspace: ws, token_type: type, ok: true, team: r.team, user: r.user };
    return { workspace: ws, token_type: type, ok: false, error: r.error || 'unknown' };
  } catch (e) {
    return { workspace: ws, token_type: type, ok: false, error: String(e.message || e) };
  }
}

(async () => {
  const raw = JSON.parse(fs.readFileSync(CFG, 'utf8'));
  const accounts = Array.isArray(raw) ? raw : (raw.accounts || []);
  const results = [];
  for (const a of accounts) results.push(await verify(a));

  const fails = results.filter((r) => !r.ok);
  const ok = results.filter((r) => r.ok);

  // Human summary
  console.log(`Slack token verification — ${ok.length}/${results.length} OK`);
  for (const r of results) {
    const tag = r.ok ? 'OK ' : 'FAIL';
    const extra = r.ok ? `${r.team}/${r.user}` : r.error;
    console.log(`  [${tag}] ${r.workspace.padEnd(28)} ${r.token_type.padEnd(5)} ${extra}`);
  }
  if (fails.length) console.log(`\n${fails.length} workspace(s) failing — investigate before re-scanning.`);

  // Machine output on stderr for piping
  process.stderr.write(JSON.stringify(results) + '\n');
  process.exit(fails.length);
})();
