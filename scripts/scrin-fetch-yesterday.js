#!/usr/bin/env node
/**
 * Scrin.io: Fetch yesterday's hours via /api/v2/GetReport.
 * 1) GET login page, extract __RequestVerificationToken
 * 2) POST /login with token + creds
 * 3) Extract apiToken from any page (fallback to config api_token)
 * 4) POST /api/v2/GetReport with X-SSM-Token
 */
const fs = require('fs');
const path = require('path');
const https = require('https');
const { URL } = require('url');

const CONFIG_PATH = path.join(__dirname, '..', 'config', '.scrin-config.json');

function request(method, urlStr, headers = {}, body = null) {
  return new Promise((resolve, reject) => {
    const u = new URL(urlStr);
    const opts = {
      method,
      hostname: u.hostname,
      port: u.port || 443,
      path: u.pathname + u.search,
      headers: { 'User-Agent': 'Mozilla/5.0', ...headers },
    };
    const req = https.request(opts, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

function extractCookies(setCookieArr) {
  if (!setCookieArr) return {};
  const out = {};
  for (const sc of setCookieArr) {
    const pair = sc.split(';')[0];
    const eq = pair.indexOf('=');
    if (eq > 0) out[pair.slice(0, eq).trim()] = pair.slice(eq + 1).trim();
  }
  return out;
}

function cookieHeader(jar) {
  return Object.entries(jar).map(([k, v]) => `${k}=${v}`).join('; ');
}

(async () => {
  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
  const { email, password } = config.login;
  const companyId = 266977;
  const employeeId = 453601;

  let jar = {};

  // 1) GET /login
  const loginPage = await request('GET', 'https://scrin.io/login', {});
  Object.assign(jar, extractCookies(loginPage.headers['set-cookie']));
  const tokenMatch = loginPage.body.match(/name="__RequestVerificationToken"[^>]*value="([^"]+)"/);
  if (!tokenMatch) {
    console.log(JSON.stringify({ error: 'No __RequestVerificationToken on login page', status: loginPage.status }));
    process.exit(2);
  }
  const verToken = tokenMatch[1];

  // 2) POST /login
  const formBody =
    `__RequestVerificationToken=${encodeURIComponent(verToken)}` +
    `&Email=${encodeURIComponent(email)}` +
    `&Password=${encodeURIComponent(password)}` +
    `&RememberMe=true`;
  const loginRes = await request(
    'POST',
    'https://scrin.io/login',
    {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(formBody),
      Cookie: cookieHeader(jar),
      Referer: 'https://scrin.io/login',
    },
    formBody
  );
  Object.assign(jar, extractCookies(loginRes.headers['set-cookie']));

  // Follow redirect chain manually
  let nextUrl = loginRes.headers.location;
  let hopCount = 0;
  let lastBody = loginRes.body;
  while (nextUrl && hopCount < 5) {
    if (!nextUrl.startsWith('http')) nextUrl = 'https://scrin.io' + nextUrl;
    const r = await request('GET', nextUrl, { Cookie: cookieHeader(jar) });
    Object.assign(jar, extractCookies(r.headers['set-cookie']));
    lastBody = r.body;
    nextUrl = r.headers.location;
    hopCount++;
  }

  // 3) Extract apiToken
  let apiToken = null;
  const aMatch = lastBody.match(/var\s+apiToken\s*=\s*["']([^"']+)["']/);
  if (aMatch) apiToken = aMatch[1];
  if (!apiToken) {
    // Try home page
    const home = await request('GET', 'https://scrin.io/', { Cookie: cookieHeader(jar) });
    const m = home.body.match(/var\s+apiToken\s*=\s*["']([^"']+)["']/);
    if (m) apiToken = m[1];
  }
  if (!apiToken) {
    apiToken = config.api_token; // fallback
  }

  // 4) POST /api/v2/GetReport
  const reportBody = JSON.stringify({ isYesterday: true, companyId, employeeId });
  const reportRes = await request(
    'POST',
    'https://scrin.io/api/v2/GetReport',
    {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(reportBody),
      'X-SSM-Token': apiToken,
      Cookie: cookieHeader(jar),
      Accept: 'application/json',
    },
    reportBody
  );

  console.log(JSON.stringify({
    apiTokenPrefix: apiToken ? apiToken.slice(0, 12) + '...' : null,
    reportStatus: reportRes.status,
    reportBody: reportRes.body.slice(0, 4000),
  }));
})().catch((e) => {
  console.log(JSON.stringify({ error: String(e) }));
  process.exit(1);
});
