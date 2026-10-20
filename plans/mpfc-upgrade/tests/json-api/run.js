#!/usr/bin/env node
/**
 * json-api endpoint test runner (upgrade TEST server only).
 * Usage: node plans/mpfc-upgrade/tests/json-api/run.js [controller ...]   (default: all cases-*.js)
 * Then:  bash plans/mpfc-upgrade/tests/json-api/coverage.sh   -> line coverage of the json-api plugins
 * Creds: config/.mpfc-upgrade-test-config.json (run scripts/decrypt-secrets.sh first).
 */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
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
// endpoint-specific error shapes ({error,status:400}, {status:'error',message}, {response:'ERROR'}, ...): match the whole body
const bad = (re) => (r) => [!!r.json && /error/i.test(JSON.stringify(r.json)) && (!re || re.test(r.text)), 'expected error body ' + (re || '')];
const any = () => (r) => [r.status < 500 && !/Fatal error/.test(r.text), 'expected no fatal'];

async function check(name, req, expect) {
  let r;
  try { r = await req; } catch (e) { r = { status: 0, text: String(e), json: null }; }
  const [good, why] = expect(r);
  if (good) { pass++; console.log(`ok   ${name}`); }
  else { fail++; failures.push(name); console.log(`BAD  ${name}: ${why} — HTTP ${r.status} ${r.text.slice(0, 250).replace(/\s+/g, ' ')}`); }
  return r;
}

// fixtures.php runs on the TEST server via wp-cli: creates fixture rows/users and returns their auth cookies
const TEST_SSH = ['-i', `${process.env.HOME}/.ssh/carrick/id_rsa`, 'root@144.126.236.208'];
function fixtures(mode) {
  execFileSync('scp', ['-q', TEST_SSH[0], TEST_SSH[1], path.join(__dirname, 'fixtures.php'), `${TEST_SSH[2]}:/tmp/nus-fixtures.php`]);
  const out = execFileSync('ssh', [...TEST_SSH, `cd /var/www/mypersonalfootballcoach.com && sudo -u www-data wp eval-file /tmp/nus-fixtures.php ${mode} 2>/dev/null`]).toString();
  const line = out.split('\n').find((l) => l.startsWith('{'));
  return line ? JSON.parse(line) : out.trim();
}

(async () => {
  const fx = fixtures('setup');
  const u = cfg.test_users;
  await login('member', u.member.user, u.member.password);   // real login: also gives cookie_name
  const cookieName = sessions.member.cookie_name;
  for (const [k, v] of Object.entries(fx.users)) {
    if (k !== 'member') sessions[k] = { cookie: v.cookie, cookie_name: cookieName, id: v.id };
  }
  const t = { call, check, err, ok, bad, httpErr, any, sessions, cfg, login, fx, dir: __dirname };

  const only = process.argv.slice(2);
  const files = fs.readdirSync(__dirname).filter((f) => /^cases-.*\.js$/.test(f))
    .filter((f) => !only.length || only.includes(f.replace(/^cases-|\.js$/g, '')));
  for (const f of files) {
    console.log(`\n### ${f}`);
    try { await require(path.join(__dirname, f))(t); } catch (e) { fail++; failures.push(`${f} crashed`); console.log(`BAD  ${f} crashed: ${e.stack}`); }
  }
  if (!process.env.KEEP_FIXTURES) console.log('\nfixtures: ' + fixtures('teardown'));
  console.log(`\nPASS=${pass} FAIL=${fail}${failures.length ? '\nFailed: ' + failures.join(' | ') : ''}`);
  process.exit(fail ? 1 : 0);
})();
