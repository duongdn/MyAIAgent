#!/usr/bin/env node
/**
 * json-api endpoint test runner (upgrade TEST server only).
 * Usage: node plans/mpfc-upgrade/tests/json-api/run.js [controller ...]   (default: all cases-*.js)
 * Then:  bash plans/mpfc-upgrade/tests/json-api/coverage.sh   -> line coverage of the json-api plugins
 * Creds: config/.mpfc-upgrade-test-config.json (run scripts/decrypt-secrets.sh first).
 */
const fs = require('fs');
const path = require('path');
const { cfg, call, login, sessions } = require('./lib');

let pass = 0, fail = 0;
const failures = [];

// expect helpers: each returns [ok, why]
const err = (re) => (r) => [r.json && r.json.status === 'error' && (!re || re.test(r.json.error || '')), 'expected error ' + (re || '')];
const ok = (fn) => (r) => {
  const good = r.status === 200 && r.json && r.json.status !== 'error' && !/Fatal error|Warning:|Notice:/.test(r.text);
  return [good && (!fn || fn(r.json, r)), 'expected success'];
};
const httpErr = (code, re) => (r) => [r.status === code && (!re || re.test(r.text)), `expected HTTP ${code} ${re || ''}`];
const any = () => (r) => [r.status < 500 && !/Fatal error/.test(r.text), 'expected no fatal'];

async function check(name, req, expect) {
  let r;
  try { r = await req; } catch (e) { r = { status: 0, text: String(e), json: null }; }
  const [good, why] = expect(r);
  if (good) { pass++; console.log(`ok   ${name}`); }
  else { fail++; failures.push(name); console.log(`BAD  ${name}: ${why} — HTTP ${r.status} ${r.text.slice(0, 250).replace(/\s+/g, ' ')}`); }
  return r;
}

(async () => {
  const u = cfg.test_users;
  await login('member', u.member.user, u.member.password);
  await login('team', u.team_member.user, u.team_member.password);
  await login('manager', u.team_manager.user, u.team_manager.password);
  await login('admin', u.admin.user, u.admin.password).catch((e) => console.log('admin login skipped: ' + e.message));
  const t = { call, check, err, ok, httpErr, any, sessions, cfg, login, dir: __dirname };

  const only = process.argv.slice(2);
  const files = fs.readdirSync(__dirname).filter((f) => /^cases-.*\.js$/.test(f))
    .filter((f) => !only.length || only.includes(f.replace(/^cases-|\.js$/g, '')));
  for (const f of files) {
    console.log(`\n### ${f}`);
    try { await require(path.join(__dirname, f))(t); } catch (e) { fail++; failures.push(`${f} crashed`); console.log(`BAD  ${f} crashed: ${e.stack}`); }
  }
  console.log(`\nPASS=${pass} FAIL=${fail}${failures.length ? '\nFailed: ' + failures.join(' | ') : ''}`);
  process.exit(fail ? 1 : 0);
})();
