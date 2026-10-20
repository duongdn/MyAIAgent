/**
 * Shared helpers for the json-api endpoint tests (upgrade TEST server only).
 * call(ep, opts) hits https://<host>/api/<controller>/<method>/ and returns { status, text, json }.
 *   opts.q      query params (GET)            opts.form   POST form fields (urlencoded or multipart with files)
 *   opts.files  { field: localPath }          opts.body   raw POST body (JSON string, for php://input endpoints)
 *   opts.as     test user key -> adds its auth cookie as ?cookie= (and as the WP logged_in cookie when opts.wpCookie)
 */
const fs = require('fs');
const path = require('path');

const cfg = JSON.parse(fs.readFileSync(path.join(__dirname, '../../../../config/.mpfc-upgrade-test-config.json'), 'utf8'));
const BASE = `https://${cfg.basic_auth.host}`;
if (!/upgrade-test\./.test(BASE)) throw new Error('Refusing: not the upgrade test host');
const AUTH = 'Basic ' + Buffer.from(`${cfg.basic_auth.user}:${cfg.basic_auth.password}`).toString('base64');

const sessions = {};   // user key -> { cookie, cookie_name, id }

async function call(ep, opts = {}) {
  const q = new URLSearchParams({ nc: Date.now() + Math.random(), ...(opts.q || {}) });  // nc: bypass WP-Optimize page cache
  const headers = { Authorization: AUTH };
  if (opts.as) {
    const s = sessions[opts.as];
    if (!s) throw new Error(`no session for ${opts.as}`);
    if (!opts.noCookieParam) q.set('cookie', s.cookie);
    if (opts.wpCookie) headers.Cookie = `${s.cookie_name}=${encodeURIComponent(s.cookie)}`;
  }
  let body;
  if (opts.files) {
    body = new FormData();
    for (const [k, v] of Object.entries(opts.form || {})) body.append(k, v);
    for (const [k, p] of Object.entries(opts.files)) {
      const type = { '.mp4': 'video/mp4', '.jpg': 'image/jpeg' }[path.extname(p)] || 'application/octet-stream';
      body.append(k, new Blob([fs.readFileSync(p)], { type }), path.basename(p));
    }
  } else if (opts.form) {
    body = new URLSearchParams(opts.form);
  } else if (opts.body !== undefined) {
    body = opts.body;
    headers['Content-Type'] = 'application/json';
  }
  const res = await fetch(`${BASE}/api/${ep}/?${q}`, { method: body !== undefined ? 'POST' : 'GET', headers, body });
  const text = await res.text();
  let json = null;
  try { json = JSON.parse(text); } catch (e) { /* not JSON */ }
  return { status: res.status, text, json };
}

async function login(key, username, password) {
  const r = await call('auth/generate_auth_cookie', { form: { username, password } });
  if (!r.json || !r.json.cookie) throw new Error(`login ${key} failed: ${r.text.slice(0, 200)}`);
  sessions[key] = { cookie: r.json.cookie, cookie_name: r.json.cookie_name, id: r.json.user.id };
  return sessions[key];
}

module.exports = { cfg, BASE, call, login, sessions };
