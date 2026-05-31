#!/usr/bin/env node
// Fetch today's Zoho Calendar events via CalDAV (app password — no OAuth needed)
// Usage: node scripts/fetch-zoho-calendar.js [account1] [account2] ...
//   e.g. node scripts/fetch-zoho-calendar.js duongdn carrick
//   No args = all accounts in config/.email-accounts.json
// Output: JSON array of { email, events[], error? }

const https = require("https");
const fs = require("fs");
const path = require("path");

const EMAIL_CONFIG = path.resolve(__dirname, "../config/.email-accounts.json");
const CALDAV_HOST = "calendar.zoho.com";

// YYYYMMDD in UTC+7
function todayLocalStr() {
  const d = new Date(Date.now() + 7 * 3600_000);
  return d.toISOString().replace(/-/g, "").slice(0, 8);
}

// "20260531T000000Z" format
function toUtcStamp(yyyymmdd, time = "000000") {
  // Convert YYYY-MM-DD 00:00 UTC+7 → UTC
  const y = yyyymmdd.slice(0, 4), mo = yyyymmdd.slice(4, 6), dd = yyyymmdd.slice(6, 8);
  const local = new Date(`${y}-${mo}-${dd}T${time.slice(0,2)}:${time.slice(2,4)}:${time.slice(4,6)}+07:00`);
  return local.toISOString().replace(/[-:]/g, "").replace(/\.\d+/, "");
}

function basicAuth(email, password) {
  return "Basic " + Buffer.from(`${email}:${password}`).toString("base64");
}

function caldavRequest(method, path, auth, body, extraHeaders = {}) {
  return new Promise((resolve, reject) => {
    const headers = {
      Authorization: auth,
      "Content-Type": "application/xml; charset=utf-8",
      Depth: "1",
      ...extraHeaders,
    };
    if (body) headers["Content-Length"] = Buffer.byteLength(body);

    const req = https.request(
      { hostname: CALDAV_HOST, path, method, headers },
      (res) => {
        let raw = "";
        res.on("data", (c) => (raw += c));
        res.on("end", () => resolve({ status: res.statusCode, body: raw }));
      }
    );
    req.on("error", reject);
    if (body) req.write(body);
    req.end();
  });
}

// Extract VEVENT fields from iCalendar text
function parseVEvents(icalText) {
  const events = [];
  const blocks = icalText.match(/BEGIN:VEVENT[\s\S]*?END:VEVENT/g) || [];
  for (const block of blocks) {
    const get = (key) => {
      const m = block.match(new RegExp(`^${key}(?:;[^:]+)?:(.+)$`, "m"));
      return m ? m[1].trim().replace(/\\n/g, " ").replace(/\\,/g, ",") : "";
    };
    const getAll = (key) => {
      const re = new RegExp(`^${key}(?:;[^:]+)?:(.+)$`, "gm");
      const vals = [];
      let m;
      while ((m = re.exec(block))) vals.push(m[1].trim());
      return vals;
    };

    const dtstart = get("DTSTART");
    const dtend = get("DTEND");
    const allday = /^\d{8}$/.test(dtstart); // no time component = all-day

    // Parse attendee emails from ATTENDEE:mailto:xxx lines
    const attendees = getAll("ATTENDEE")
      .map((v) => v.replace(/^mailto:/i, ""))
      .filter((v) => v.includes("@"));

    events.push({
      title: get("SUMMARY") || "(no title)",
      start: dtstart,
      end: dtend,
      allday,
      location: get("LOCATION"),
      description: get("DESCRIPTION").slice(0, 200),
      attendees,
    });
  }
  return events;
}

async function fetchAccountCalendar(acct, dateStr) {
  const auth = basicAuth(acct.email, acct.app_password);
  const rangeStart = toUtcStamp(dateStr, "000000");
  const rangeEnd = toUtcStamp(dateStr, "235959");

  // 1. Discover calendar home set for this user
  const principalPath = `/principals/${encodeURIComponent(acct.email)}/`;
  const propfindBody = `<?xml version="1.0" encoding="utf-8"?>
<D:propfind xmlns:D="DAV:" xmlns:C="urn:ietf:params:xml:ns:caldav">
  <D:prop><C:calendar-home-set/></D:prop>
</D:propfind>`;

  const discoverResp = await caldavRequest("PROPFIND", principalPath, auth, propfindBody);

  // Extract calendar-home-set href
  let homeSetMatch = discoverResp.body.match(/<[^>]*:?calendar-home-set[^>]*>[\s\S]*?<[^>]*:?href[^>]*>(.*?)<\/[^>]*:?href>/i);
  let homePath = homeSetMatch ? homeSetMatch[1].trim() : `/home/${encodeURIComponent(acct.email)}/`;

  // 2. List calendars in home set
  const calListResp = await caldavRequest("PROPFIND", homePath, auth, `<?xml version="1.0" encoding="utf-8"?>
<D:propfind xmlns:D="DAV:">
  <D:prop>
    <D:resourcetype/>
    <D:displayname/>
  </D:prop>
</D:propfind>`);

  // Extract calendar hrefs (paths with resourcetype = calendar)
  const calHrefs = [];
  const hrefBlocks = calListResp.body.match(/<D:response>[\s\S]*?<\/D:response>/g) || [];
  for (const block of hrefBlocks) {
    if (block.includes("calendar") && block.includes("<D:href>")) {
      const hrefMatch = block.match(/<D:href>(.*?)<\/D:href>/);
      if (hrefMatch) calHrefs.push(hrefMatch[1].trim());
    }
  }

  // Fall back to default calendar path if discovery failed
  const calPaths = calHrefs.length > 0 ? calHrefs : [`${homePath}Calendar/`];

  // 3. Fetch events from each calendar for today
  const reportBody = `<?xml version="1.0" encoding="utf-8"?>
<C:calendar-query xmlns:D="DAV:" xmlns:C="urn:ietf:params:xml:ns:caldav">
  <D:prop>
    <D:getetag/>
    <C:calendar-data/>
  </D:prop>
  <C:filter>
    <C:comp-filter name="VCALENDAR">
      <C:comp-filter name="VEVENT">
        <C:time-range start="${rangeStart}" end="${rangeEnd}"/>
      </C:comp-filter>
    </C:comp-filter>
  </C:filter>
</C:calendar-query>`;

  const allEvents = [];
  for (const calPath of calPaths) {
    const reportResp = await caldavRequest("REPORT", calPath, auth, reportBody, { Depth: "1" });
    if (reportResp.status === 207 || reportResp.status === 200) {
      // Extract calendar-data from each response block
      const calDataBlocks = reportResp.body.match(/<[^>]*:?calendar-data[^>]*>([\s\S]*?)<\/[^>]*:?calendar-data>/gi) || [];
      for (const block of calDataBlocks) {
        const ical = block.replace(/<[^>]+>/g, "").trim();
        allEvents.push(...parseVEvents(ical));
      }
    }
  }

  return { email: acct.email, events: allEvents };
}

async function main() {
  const config = JSON.parse(fs.readFileSync(EMAIL_CONFIG, "utf8"));
  const args = process.argv.slice(2);
  const targets = args.length > 0
    ? config.accounts.filter((a) => args.some((arg) => a.email.startsWith(arg)))
    : config.accounts;

  if (targets.length === 0) {
    console.error(`No accounts match: ${args.join(", ")}`);
    process.exit(1);
  }

  const dateStr = todayLocalStr();
  const results = await Promise.all(
    targets.map((acct) =>
      fetchAccountCalendar(acct, dateStr).catch((e) => ({
        email: acct.email,
        events: [],
        error: e.message,
      }))
    )
  );

  console.log(JSON.stringify(results, null, 2));
}

main().catch((e) => { console.error(e); process.exit(1); });
