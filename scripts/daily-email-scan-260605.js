// Daily email scan for 2026-06-05 — window: 2026-06-04T09:00+07 → now
const tls = require("tls");
const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");
const allAccounts = require("../config/.email-accounts.json").accounts;

// Split accounts by auth method
const accounts = allAccounts.filter(a => !a.gmail_api);
const gmailApiAccounts = allAccounts.filter(a => a.gmail_api);

const WINDOW_START = new Date("2026-06-05T09:00:00+07:00");
const IMAP_SINCE = "5-Jun-2026"; // filter by Date in code

const ALERT_KEYWORDS = [
  "alert", "error", "fail", "down", "urgent", "warning", "critical",
  "incident", "outage", "security", "escalat", "breach", "crash",
  "leave request", "nghỉ phép", "xin nghỉ", "production", "rollbar", "bugsnag",
  "expires", "expir", "deploy", "expired", "new relic", "newrelic",
];

function checkIMAP(acct) {
  return new Promise((resolve) => {
    let buffer = "";
    let step = 0;
    const host = acct.imap_server || "imap.zoho.com";
    const socket = tls.connect({ host, port: 993, servername: host }, () => {});
    socket.setTimeout(30000);
    socket.on("timeout", () => { socket.destroy(); resolve({ email: acct.email, error: "timeout" }); });
    socket.on("error", (e) => resolve({ email: acct.email, error: e.message }));
    socket.on("data", (data) => {
      buffer += data.toString();
      if (step === 0 && buffer.includes("OK")) {
        step = 1; buffer = "";
        socket.write(`A1 LOGIN ${JSON.stringify(acct.email)} ${JSON.stringify(acct.app_password)}\r\n`);
      } else if (step === 1 && buffer.includes("A1 ")) {
        if (!buffer.includes("A1 OK")) {
          socket.destroy(); resolve({ email: acct.email, error: "auth_fail" }); return;
        }
        step = 2; buffer = "";
        const folder = acct.folder || "INBOX";
        socket.write(`A2 SELECT ${JSON.stringify(folder)}\r\n`);
      } else if (step === 2 && buffer.includes("A2 ")) {
        step = 3; buffer = "";
        socket.write(`A3 SEARCH SINCE ${IMAP_SINCE}\r\n`);
      } else if (step === 3 && buffer.includes("A3 ")) {
        const searchLine = buffer.split("\n").find(l => l.startsWith("* SEARCH"));
        const ids = searchLine ? searchLine.replace("* SEARCH", "").trim().split(/\s+/).filter(Boolean) : [];
        if (ids.length === 0) {
          socket.write("A9 LOGOUT\r\n"); socket.destroy();
          resolve({ email: acct.email, count: 0, subjects: [], alerts: [] }); return;
        }
        const range = ids.slice(-50).join(",");
        step = 4; buffer = "";
        socket.write(`A4 FETCH ${range} (BODY.PEEK[HEADER.FIELDS (Subject Date From)])\r\n`);
      } else if (step === 4 && buffer.includes("A4 ")) {
        socket.write("A9 LOGOUT\r\n"); socket.destroy();
        const subjects = [];
        const alerts = [];
        const blocks = buffer.split(/\* \d+ FETCH/).slice(1);
        for (const blk of blocks) {
          const subM = blk.match(/^Subject:\s*(.+)$/im);
          const dateM = blk.match(/^Date:\s*(.+)$/im);
          const fromM = blk.match(/^From:\s*(.+)$/im);
          if (!subM) continue;
          const subj = subM[1].trim();
          const dateStr = dateM ? dateM[1].trim() : "";
          const from = fromM ? fromM[1].trim() : "";
          let emailDate = null;
          try { emailDate = new Date(dateStr); } catch(_) {}
          if (emailDate && emailDate < WINDOW_START) continue;
          subjects.push({ subject: subj, from, date: dateStr });
          const sl = subj.toLowerCase() + " " + from.toLowerCase();
          if (ALERT_KEYWORDS.some(k => sl.includes(k))) alerts.push(subj);
        }
        resolve({ email: acct.email, count: subjects.length, subjects: subjects.slice(0, 20), alerts });
      }
    });
  });
}

async function checkGmailAPI(acct) {
  try {
    const key = JSON.parse(fs.readFileSync(path.join(__dirname, "../config/.gmail-service-account.json"), "utf8"));
    const auth = new google.auth.JWT({
      email: key.client_email,
      key: key.private_key,
      scopes: ["https://www.googleapis.com/auth/gmail.readonly"],
      subject: acct.email,
    });
    const gmail = google.gmail({ version: "v1", auth });
    const afterTs = Math.floor(WINDOW_START.getTime() / 1000);
    const listRes = await gmail.users.messages.list({ userId: "me", q: `after:${afterTs}`, maxResults: 50 });
    const messages = listRes.data.messages || [];
    if (messages.length === 0) return { email: acct.email, count: 0, subjects: [], alerts: [] };
    const batch = messages.slice(0, 20);
    const details = await Promise.all(
      batch.map(m => gmail.users.messages.get({ userId: "me", id: m.id, format: "metadata", metadataHeaders: ["Subject", "From", "Date"] }).catch(() => null))
    );
    const subjects = [], alerts = [];
    for (const msg of details) {
      if (!msg) continue;
      const hdr = msg.data.payload?.headers || [];
      const get = n => hdr.find(h => h.name === n)?.value || "";
      const subject = get("Subject"), from = get("From"), date = get("Date");
      subjects.push({ subject, from, date });
      if (ALERT_KEYWORDS.some(k => (subject + " " + from).toLowerCase().includes(k))) alerts.push(subject);
    }
    return { email: acct.email, count: messages.length, subjects, alerts };
  } catch (err) {
    return { email: acct.email, error: err.message };
  }
}

(async () => {
  const [imapResults, apiResults] = await Promise.all([
    Promise.all(accounts.map(checkIMAP)),
    Promise.all(gmailApiAccounts.map(checkGmailAPI)),
  ]);
  console.log(JSON.stringify([...imapResults, ...apiResults], null, 2));
})();
