// Fetch today's calendar events from Zoho Mail CalDAV for all 6 accounts
// Usage: node scripts/fetch-zoho-calendar.js [account]
//   account = duongdn|carrick|nick|rick|kai|ken (optional, default: all)
// Output: JSON array of { email, events: [{summary, start, end, location, description}] }
const https = require("https");
const accounts = require("../config/.email-accounts.json").accounts;

const TARGET_ACCOUNT = process.argv[2] ? process.argv[2].toLowerCase() : null;

// Today's date range in UTC accounting for Asia/Ho_Chi_Minh (UTC+7)
function getTodayRangeUTC() {
  const now = new Date();
  // "Today" in +07:00
  const offset = 7 * 60 * 60 * 1000;
  const localToday = new Date(now.getTime() + offset);
  const y = localToday.getUTCFullYear();
  const m = String(localToday.getUTCMonth() + 1).padStart(2, "0");
  const d = String(localToday.getUTCDate()).padStart(2, "0");
  // Start = today 00:00 +07 = today - 7h in UTC
  const startLocal = new Date(`${y}-${m}-${d}T00:00:00+07:00`);
  const endLocal = new Date(`${y}-${m}-${d}T23:59:59+07:00`);
  const fmt = (dt) => dt.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  return { start: fmt(startLocal), end: fmt(endLocal), dateLabel: `${y}-${m}-${d}` };
}

// HTTP request helper (returns body string)
function request(method, path, auth, body = null, extraHeaders = {}) {
  return new Promise((resolve, reject) => {
    const headers = {
      "Authorization": "Basic " + Buffer.from(auth).toString("base64"),
      "Content-Type": "application/xml",
      ...extraHeaders,
    };
    if (body) headers["Content-Length"] = Buffer.byteLength(body);
    const req = https.request(
      { hostname: "calendar.zoho.com", path, method, headers, timeout: 20000 },
      (res) => {
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => resolve({ status: res.statusCode, body: data }));
      }
    );
    req.on("error", reject);
    req.on("timeout", () => { req.destroy(); reject(new Error("timeout")); });
    if (body) req.write(body);
    req.end();
  });
}

// Discover the CalDAV principal path for an account
async function discoverPrincipal(auth) {
  const body = `<?xml version="1.0" encoding="utf-8"?>
<D:propfind xmlns:D="DAV:"><D:prop><D:current-user-principal/></D:prop></D:propfind>`;
  const res = await request("PROPFIND", "/.well-known/caldav", auth, body, { Depth: "0" });
  const m = res.body.match(/<D:href>([^<]+\/user\/)<\/D:href>/);
  return m ? m[1] : null;
}

// Get calendar home set path
async function getCalendarHome(auth, principalPath) {
  const body = `<?xml version="1.0" encoding="utf-8"?>
<D:propfind xmlns:D="DAV:" xmlns:C="urn:ietf:params:xml:ns:caldav">
  <D:prop><C:calendar-home-set/></D:prop>
</D:propfind>`;
  const res = await request("PROPFIND", principalPath, auth, body, { Depth: "0" });
  const m = res.body.match(/<D:href>([^<]+)<\/D:href>/g);
  // Find the caldav home path (not /user/)
  for (const href of (m || [])) {
    const path = href.replace(/<\/?D:href>/g, "");
    if (path !== principalPath && path.includes("/caldav/") && !path.includes("/user/")) return path;
  }
  return null;
}

// Fetch event hrefs for today via REPORT
async function fetchEventHrefs(auth, calendarPath, startUTC, endUTC) {
  const body = `<?xml version="1.0" encoding="utf-8"?>
<C:calendar-query xmlns:D="DAV:" xmlns:C="urn:ietf:params:xml:ns:caldav">
  <D:prop><D:getetag/></D:prop>
  <C:filter>
    <C:comp-filter name="VCALENDAR">
      <C:comp-filter name="VEVENT">
        <C:time-range start="${startUTC}" end="${endUTC}"/>
      </C:comp-filter>
    </C:comp-filter>
  </C:filter>
</C:calendar-query>`;
  const res = await request("REPORT", calendarPath + "events/", auth, body, { Depth: "1" });
  const hrefs = [];
  const matches = res.body.matchAll(/<D:href>([^<]+\.ics)<\/D:href>/g);
  for (const m of matches) hrefs.push(m[1]);
  return hrefs;
}

// Multiget ICS data for given hrefs, requesting server-side expansion of recurring events
async function fetchICSData(auth, calendarPath, hrefs, startUTC, endUTC) {
  if (!hrefs.length) return [];
  const hrefXml = hrefs.map((h) => `  <D:href>${h}</D:href>`).join("\n");
  // Request expand so recurring events come back with actual occurrence dates
  const body = `<?xml version="1.0" encoding="utf-8"?>
<C:calendar-multiget xmlns:D="DAV:" xmlns:C="urn:ietf:params:xml:ns:caldav">
  <D:prop>
    <C:calendar-data>
      <C:expand start="${startUTC}" end="${endUTC}"/>
    </C:calendar-data>
  </D:prop>
${hrefXml}
</C:calendar-multiget>`;
  const res = await request("REPORT", calendarPath + "events/", auth, body, { Depth: "1" });
  const blocks = [];
  const regex = /<calendar-data[^>]*>([\s\S]*?)<\/calendar-data>/g;
  let m;
  while ((m = regex.exec(res.body)) !== null) blocks.push(m[1]);
  return blocks;
}

// Parse VEVENT blocks. todayDate = "YYYYMMDD" used to fix recurring events if server didn't expand.
function parseVEvents(icsText, todayDate) {
  const events = [];
  const eventBlocks = icsText.match(/BEGIN:VEVENT[\s\S]*?END:VEVENT/g) || [];
  for (const block of eventBlocks) {
    const get = (key) => {
      const m = block.match(new RegExp(`^${key}(?:;[^:]*)?:(.+)$`, "m"));
      return m ? m[1].trim().replace(/\\n/g, "\n").replace(/\\,/g, ",") : "";
    };
    let start = get("DTSTART");
    let end = get("DTEND");
    const isRecurring = /RRULE/.test(block);

    // If server didn't expand (DTSTART date ≠ today) and it's a recurring event,
    // synthesize today's occurrence by swapping the date part — time stays the same.
    if (isRecurring && todayDate && start && !start.startsWith(todayDate)) {
      const timePart = start.replace(/^\d{8}/, "");  // e.g. "T083000" or "T083000Z"
      const endTimePart = end ? end.replace(/^\d{8}/, "") : "";
      start = todayDate + timePart;
      if (end) end = todayDate + endTimePart;
    }

    events.push({
      summary: get("SUMMARY"),
      start,
      end,
      location: get("LOCATION"),
      description: get("DESCRIPTION").slice(0, 200),
      status: get("STATUS"),
      recurring: isRecurring,
    });
  }
  return events;
}

async function fetchCalendarForAccount(acct) {
  const auth = `${acct.email}:${acct.app_password}`;
  try {
    const principal = await discoverPrincipal(auth);
    if (!principal) return { email: acct.email, error: "no_principal" };

    const calHome = await getCalendarHome(auth, principal);
    if (!calHome) return { email: acct.email, error: "no_calendar_home" };

    const { start, end } = getTodayRangeUTC();
    const hrefs = await fetchEventHrefs(auth, calHome, start, end);

    if (!hrefs.length) return { email: acct.email, events: [] };

    const icsBlocks = await fetchICSData(auth, calHome, hrefs);
    const events = icsBlocks.flatMap(parseVEvents);

    return { email: acct.email, events };
  } catch (err) {
    return { email: acct.email, error: err.message };
  }
}

(async () => {
  const filtered = TARGET_ACCOUNT
    ? accounts.filter((a) => a.email.toLowerCase().startsWith(TARGET_ACCOUNT))
    : accounts;

  const results = await Promise.all(filtered.map(fetchCalendarForAccount));
  const { dateLabel } = getTodayRangeUTC();
  console.log(JSON.stringify({ date: dateLabel, accounts: results }, null, 2));
})();
