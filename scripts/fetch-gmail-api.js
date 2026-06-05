/**
 * Fetch emails via Gmail API using service account + domain-wide delegation.
 * Usage: node scripts/fetch-gmail-api.js <email> [windowStartISO]
 * Example: node scripts/fetch-gmail-api.js freelancer@mypersonalfootballcoach.com 2026-06-04T08:00:00+07:00
 */
const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");

const SERVICE_ACCOUNT_PATH = path.join(__dirname, "../config/.gmail-service-account.json");

const ALERT_KEYWORDS = [
  "alert", "error", "fail", "down", "urgent", "warning", "critical",
  "incident", "outage", "security", "escalat", "breach", "crash",
  "leave request", "nghỉ phép", "xin nghỉ", "production", "rollbar", "bugsnag",
  "expires", "expir", "deploy", "expired", "new relic", "newrelic",
];

async function fetchGmailMessages(email, windowStart) {
  const key = JSON.parse(fs.readFileSync(SERVICE_ACCOUNT_PATH, "utf8"));

  const auth = new google.auth.JWT(
    key.client_email,
    null,
    key.private_key,
    ["https://www.googleapis.com/auth/gmail.readonly"],
    email  // impersonate this user
  );

  const gmail = google.gmail({ version: "v1", auth });

  // Build query: emails after windowStart date
  const afterDate = Math.floor(new Date(windowStart).getTime() / 1000);
  const query = `after:${afterDate}`;

  const listRes = await gmail.users.messages.list({
    userId: "me",
    q: query,
    maxResults: 50,
  });

  const messages = listRes.data.messages || [];
  if (messages.length === 0) {
    return { email, count: 0, subjects: [], alerts: [] };
  }

  // Fetch headers for each message (in parallel, up to 20)
  const batch = messages.slice(0, 20);
  const details = await Promise.all(
    batch.map(m =>
      gmail.users.messages.get({
        userId: "me",
        id: m.id,
        format: "metadata",
        metadataHeaders: ["Subject", "From", "Date"],
      }).catch(() => null)
    )
  );

  const subjects = [];
  const alerts = [];

  for (const msg of details) {
    if (!msg) continue;
    const headers = msg.data.payload?.headers || [];
    const get = name => headers.find(h => h.name === name)?.value || "";
    const subject = get("Subject");
    const from = get("From");
    const date = get("Date");

    subjects.push({ subject, from, date });

    const sl = (subject + " " + from).toLowerCase();
    if (ALERT_KEYWORDS.some(k => sl.includes(k))) alerts.push(subject);
  }

  return { email, count: messages.length, subjects, alerts };
}

(async () => {
  const email = process.argv[2];
  const windowStart = process.argv[3] || new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  if (!email) {
    console.error("Usage: node fetch-gmail-api.js <email> [windowStartISO]");
    process.exit(1);
  }

  try {
    const result = await fetchGmailMessages(email, windowStart);
    console.log(JSON.stringify(result, null, 2));
  } catch (err) {
    console.log(JSON.stringify({ email, error: err.message }));
  }
})();
