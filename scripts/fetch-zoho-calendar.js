#!/usr/bin/env node
// Fetch today's Zoho Calendar events for each email account
// Usage: node scripts/fetch-zoho-calendar.js [account1] [account2] ...
//   e.g. node scripts/fetch-zoho-calendar.js duongdn carrick
//   No args = all 6 accounts
// Output: JSON array of { email, events[], error? }

const https = require("https");
const fs = require("fs");
const path = require("path");

const CONFIG_PATH = path.resolve(__dirname, "../config/.zoho-calendar-config.json");

function httpsGet(hostname, pathname, token) {
  return new Promise((resolve, reject) => {
    const req = https.request(
      { hostname, path: pathname, method: "GET",
        headers: { Authorization: `Zoho-oauthtoken ${token}` } },
      (res) => {
        let raw = "";
        res.on("data", (c) => (raw += c));
        res.on("end", () => {
          try { resolve({ status: res.statusCode, body: JSON.parse(raw) }); }
          catch { resolve({ status: res.statusCode, body: raw }); }
        });
      }
    );
    req.on("error", reject);
    req.end();
  });
}

function httpsPost(hostname, pathname, formBody) {
  return new Promise((resolve, reject) => {
    const data = new URLSearchParams(formBody).toString();
    const req = https.request(
      { hostname, path: pathname, method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded",
                   "Content-Length": Buffer.byteLength(data) } },
      (res) => {
        let raw = "";
        res.on("data", (c) => (raw += c));
        res.on("end", () => {
          try { resolve(JSON.parse(raw)); } catch { resolve({ error: raw }); }
        });
      }
    );
    req.on("error", reject);
    req.write(data);
    req.end();
  });
}

async function ensureAccessToken(acct, clientId, clientSecret, region) {
  if (acct.access_token && acct.access_token_expiry > Date.now() + 60_000) {
    return acct.access_token;
  }
  if (!acct.refresh_token) {
    throw new Error("no_refresh_token — run zoho-calendar-oauth-setup.js first");
  }
  const resp = await httpsPost(`accounts.zoho.${region}`, "/oauth/v2/token", {
    grant_type: "refresh_token",
    client_id: clientId,
    client_secret: clientSecret,
    refresh_token: acct.refresh_token,
  });
  if (!resp.access_token) {
    throw new Error(`token_refresh_failed: ${JSON.stringify(resp)}`);
  }
  acct.access_token = resp.access_token;
  acct.access_token_expiry = Date.now() + (resp.expires_in || 3600) * 1000;
  return acct.access_token;
}

// YYYYMMDD string in UTC+7
function todayLocal() {
  const now = new Date(Date.now() + 7 * 3600_000);
  return now.toISOString().replace(/-/g, "").slice(0, 8);
}

async function fetchAccountCalendar(acct, clientId, clientSecret, region, dateStr) {
  const token = await ensureAccessToken(acct, clientId, clientSecret, region);
  const calHost = `calendar.zoho.${region}`;

  // 1. List calendars — pick primary
  const calsResp = await httpsGet(calHost, "/api/v1/calendars", token);
  if (calsResp.status !== 200 || !calsResp.body.calendars) {
    return { email: acct.email, events: [], error: `calendars_fetch_failed: ${calsResp.status}` };
  }

  const primaryCal = calsResp.body.calendars.find(
    (c) => c.isprimary === true || c.caltype === "own"
  ) || calsResp.body.calendars[0];

  if (!primaryCal) {
    return { email: acct.email, events: [], error: "no_primary_calendar" };
  }

  // 2. Fetch today's events
  const calUid = encodeURIComponent(primaryCal.uid);
  const eventsPath =
    `/api/v1/calendars/${calUid}/events?range_start=${dateStr}&range_end=${dateStr}`;
  const evResp = await httpsGet(calHost, eventsPath, token);

  if (evResp.status !== 200) {
    return { email: acct.email, events: [], error: `events_fetch_failed: ${evResp.status}` };
  }

  const raw = evResp.body.events || [];
  const events = raw.map((e) => ({
    title: e.title || "(no title)",
    start: e.starttime || "",
    end: e.endtime || "",
    allday: !!e.isallday,
    location: e.location || "",
    description: (e.description || "").slice(0, 200),
    attendees: (e.attendees || []).map((a) => a.email || a.name || "").filter(Boolean),
  }));

  return { email: acct.email, calendar: primaryCal.calname, events };
}

async function main() {
  if (!fs.existsSync(CONFIG_PATH)) {
    console.error("ERROR: config/.zoho-calendar-config.json not found");
    process.exit(1);
  }

  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf8"));
  const { client_id, client_secret, region = "com" } = config;

  if (!client_id || !client_secret) {
    console.error("ERROR: client_id / client_secret not set in config/.zoho-calendar-config.json");
    console.error("Run zoho-calendar-oauth-setup.js first.");
    process.exit(1);
  }

  const args = process.argv.slice(2);
  const targets = args.length > 0
    ? config.accounts.filter((a) => args.some((arg) => a.email.startsWith(arg)))
    : config.accounts;

  if (targets.length === 0) {
    console.error(`No accounts match: ${args.join(", ")}`);
    process.exit(1);
  }

  const dateStr = todayLocal(); // YYYYMMDD
  const results = await Promise.all(
    targets.map((acct) =>
      fetchAccountCalendar(acct, client_id, client_secret, region, dateStr).catch((e) => ({
        email: acct.email,
        events: [],
        error: e.message,
      }))
    )
  );

  // Persist refreshed tokens
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));

  console.log(JSON.stringify(results, null, 2));
}

main().catch((e) => { console.error(e); process.exit(1); });
